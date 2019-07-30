<?php

/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

class IRIX_DB_SELECT extends IRIX_DB_QUERY {

    private $addtional_tables = Array();
    private $conditions = Array();
    private $excludes = Array();
    public $rows = 0;
    public $raw_resutl = null;
    public $resutl = null;
    public $model = false;

    //Добавить в выборку столбец, если ни одного не вызванно то используется *
    //get(имя_столбца) - из главной таблицы
    //get(имя_таблицы,имя_столбца) - из имя_таблицы
    //get(имя_таблицы,имя_столбца,новое_навзание) - из имя_таблицы переиминовав в новое_название
    public function get($table, $column = null, $new_name = null) {
        if ($column == null) {
            $column = $table;
            $table = $this->main_table;
        }
        if ($new_name == null) {
            $new_name = $this->clear_string($column);
        }
        $strcut_el['column'] = $column;
        $strcut_el['table'] = $table;
        $strcut_el['alias'] = $new_name;
        $this->structure[] = $strcut_el;
        $this->db->schema[$table][$new_name] = $this->db->schema[$table][$column];
        return $this;
    }

    //Добавить таблицу в выборку таблицу
    //add(имя_таблицы,имя_столбца_в_добавляемой_таблице,имя_таблицы_и_столбца_ранее_добавленной_таблицы,?условие,?тип_связи)
    public function add($table, $column, $into, $alias = false, $condition = '=', $type = 'inner') {
        $table_row['name'] = $table;
        $table_row['column'] = $column;
        $table_row['into'] = $into;
        $table_row['condition'] = $condition;
        $table_row['alias'] = $alias;
        $table_row['type'] = $type;
        $this->addtional_tables[] = $table_row;
        if ($alias === false) {
            $this->tables[] = $table;
        } else {
            $this->tables[] = $alias;
            $this->db->schema[$alias] = $this->db->schema[$table];
        }
        return $this;
    }

    //Добавить условие
    //where(имя_таблицы_и_поля_а_также_условие,значение)
    //where(имя_таблицы_и_поля_а_также_условие,имя_входной_переменной,true)
    public function where($what, $value = null, $use_data = false) {
        if ($value === null) {
            $value = $this->full_clear_string($what);
            $use_data = true;
        }
        if (sizeof(explode('.', $what)) != 2) {
            $what = $this->clear_string($what);
            $what = $this->main_table . '.' . $what;
        }
        $condition_row['what'] = $what;
        $condition_row['extra'] = Array();
        $condition_row['value'] = $value;
        $condition_row['use_data'] = $use_data;
        $this->conditions[] = $condition_row;
        return $this;
    }

    public function exclude($what) {
        $this->excludes[] = $what;
        return $this;
    }

    //Макрос
    public function where_enabled($table = null) {
        if ($table == null) {
            $table = $this->main_table;
        }
        $this->where($this->main_table . '.`enabled`=', 1);
        return $this;
    }

    public function where_md5($what, $value = null, $use_data = false) {
        $this->where($what, $value, $use_data);
        $el = end($this->conditions);
        $el['extra']['md5'] = true;
        $this->conditions[sizeof($this->conditions) - 1] = $el;
        return $this;
    }

    public function make($dont_stop = true) {
        //Обработка get'ов
        $out_structure = '';
        $this->result = null;
        $this->raw_result = null;

        //Установка алиасов для полей
        foreach ($this->structure as $structure_value) {
            if ($structure_value['alias'] !== false) {
                $alias = ' AS ' . $structure_value['alias'];
            } else {
                $alias = '';
            }
            $out_structure.=', ' . $structure_value['table'] . '.`' . $structure_value['column'] . '`' . $alias;
        }
        $out_structure = substr($out_structure, 2);

        //Обработка дополнительных таблиц
        $out_tables = '';
        if (count($this->addtional_tables) > 0) {
            foreach ($this->addtional_tables as $tables_value) {
                $type = strtolower($tables_value['type']);
                if ($type == 'inner') {
                    $out_tables.=' INNER JOIN ';
                } elseif ($type == 'left') {
                    $out_tables.=' LEFT JOIN ';
                } elseif ($type == 'right') {
                    $out_tables.=' RIGHT JOIN ';
                } else {
                    $this->answer(IRIX_KIND_INTERNAL_ERROR, 'Unknown join for table: ' . $tables_value['name']);
                }
                if ($tables_value['alias'] !== false) {
                    $alias = ' AS ' . $tables_value['alias'];
                    $table_aliased = $tables_value['alias'];
                } else {
                    $alias = '';
                    $table_aliased = $tables_value['name'];
                }
                $out_tables .= $tables_value['name'] . $alias . ' ON ' . $tables_value['into'] . $tables_value['condition'] . $table_aliased . '.`' . $tables_value['column'] . '` ';
            }
        }

        //Обработка условий
        $out_conditions = '';
        if (is_array($this->conditions))
            if (sizeof($this->conditions) != 0) {
                $out_conditions = 'WHERE ';
                $out_conditions_first = true;
                foreach ($this->conditions as $conditions_value) {
                    if (!$out_conditions_first) {
                        $out_conditions.=' AND ';
                    } else {
                        $out_conditions_first = false;
                    }
                    //Необходимо прочитать условие из параметроы
                    if (is_array($conditions_value['value'])) {
                        $value = ' (';
                        foreach ($conditions_value['value'] as $xkey => $xvalue) {
                            if ($xkey != 0) {
                                $value.=' OR ';
                            }
                            if ($conditions_value['use_data']) {
                                $rval = $this->extract_value($xvalue, $conditions_value['what']);
                                $value.=$conditions_value['what'] . $rval;
                            } else {
                                $value.=$conditions_value['what'] . $xvalue;
                            }
                        }
                        $value.=') ';
                    } else {
                        if ($conditions_value['use_data']) {
                            $value_raw = $this->extract_value($conditions_value['value'], $conditions_value['what']);
                            if (isset($conditions_value['extra']['md5'])) {
                                $value_raw = $this->get_in_type(md5($value_raw['value']), $value_raw['type']);
                            }
                            $value = $conditions_value['what'] . $value_raw['value_sql'];
                        } else {
                            $value = $conditions_value['what'] . $conditions_value['value'];
                        }
                    }
                    $out_conditions.=$value;
                }
            }

        //Если get не установленны - читаем все
        if (count($this->structure) == 0) {
            $out_structure = '*';
        }

        //Окончательный SQL запрос
        $out_sql = "SELECT $out_structure FROM $this->main_table $out_tables $out_conditions;";
        //die($out_sql);
        //Определение режима именования полей при выборке
        if (count($this->structure) == 0) {
            $res = $this->db->fetch_all($out_sql);
        } else {
            $res = $this->db->fetch_alias_all($out_sql);
        }

        //Установка данных о результате операции
        if (is_array($res)) {
            $this->rows = sizeof($res);
        } else {
            $this->rows = 0;
        }
        $result_is_null = false;
        //Обработка нулевого результата
        if ($res === false) {
            if ($dont_stop) {
                $this->rows = 0;
                return $this->flow->_ret($this, $dont_stop);
            } else {
                $this->user_error('return_is_false', Array());
            }
        } else if (($res === true) || ($res === null) || $res === Array()) {
            if ($dont_stop) {
                return $this->flow->_ret($this, $dont_stop);
            } else {
                $result_is_null = true;
            }
        }

        //Реструктуризация и контроль выходного результата
        $ret = Array();
        if (($out_structure != '*')) {
            foreach ($res as $curr_row) {
                if (!is_array($curr_row)) {
                    $this->internal_error('select:make:sql_query_return_anomaly_data_1', $curr_row);
                }
                $rout = Array();
                foreach ($curr_row as $curr_col => $curr_col_val) {
                    $curr_col = explode('.', $curr_col);
                    if (sizeof($curr_col) != 2) {
                        $this->internal_error('select:make:sql_query_return_anomaly_data_2', $curr_row);
                    }
                    $col_table = $curr_col[0];
                    $col_name = $curr_col[1];
                    $tfound = false;
                    foreach ($this->structure as $tkey) {
                        if (($tkey['table'] == $col_table) && ($tkey['alias'] == $col_name)) {
                            $tfound = true;
                            $tvstruct = $this->db->schema[$tkey['table']];
                            $coltype = $tvstruct[$tkey['alias']];
                            if (($coltype == IRIX_INT) || ($coltype == IRIX_INT_AI) || ($coltype == IRIX_PKEY) || ($coltype == IRIX_PKEY_AI)) {
                                $rout[$tkey['alias']] = filter_var($curr_col_val, FILTER_VALIDATE_INT);
                            } else {
                                $rout[$tkey['alias']] = $curr_col_val;
                            }
                        }
                    }
                    if ((!$tfound)) {
                        $rptout['col_table'] = $col_table;
                        $rptout['col_name'] = $col_name;
                        $rptout['structure'] = $this->structure;
                        $this->logic_error('current_col_miss_in_structure', $rptout);
                    }
                }
                $ret[] = $rout;
            }
        } else {
            $ret = $res;
            $this->structure = Array();
            foreach ($ret[0] as $r_column => $r_value) {
                $struct_row['column'] = $r_column;
                $struct_row['table'] = $this->main_table;
                $struct_row['alias'] = $r_column;
                $this->structure[] = $struct_row;
            }
        }

        if ($result_is_null) {
            $model = '';
            $schema = $this->db->schema;
            foreach ($this->structure as $key => $value) {
                if (isset($schema[$value['table']])) {
                    $schema_curr = $schema[$value['table']];
                    if (isset($schema_curr[$value['column']])) {
                        $value['type'] = $schema_curr[$value['column']];
                        $model[$value['alias']] = $value;
                    }
                }
            }
            $this->ok('ok', [], $model);
        }

        //Удаление исключений
        foreach ($this->excludes as $exclude_name) {
            foreach ($ret as $ret_idx => $ret_row) {
                if (isset($ret[$ret_idx][$exclude_name]))
                    unset($ret[$ret_idx][$exclude_name]);
            }
        }
        //Выгрузка модели
        $model_out = Array();
        foreach ($this->structure as $sidx => $structure_row) {
            if (isset($ret[0][$structure_row['alias']])) {
                $this->structure[$sidx]['type'] = $this->db->schema[$structure_row['table']][$structure_row['alias']];
                $model_out[$structure_row['alias']] = $this->structure[$sidx];
                unset($model_out[$structure_row['alias']]['alias']);
            }
        }
        $this->model = $model_out;
        //Завершение работы по select
        if (!$dont_stop) {
            $this->ok('ok', $ret, $this->model);
        } else {
            $this->raw_result = $ret;
            $this->result = $ret;
            return $this->flow->_ret($this); //возврат управления в цепочку flow 
        }
    }

}