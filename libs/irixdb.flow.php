<?php
/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

class IRIX_DB_FLOW {

    public $irixdb;
    public $db;
    public $name;
    public $result;
    public $results = Array();
    public $model;
    public $models = Array();
    public $func;
    public $access;
    public $source;
    public $queries = Array();

    public function logic_error($err_code, $module_name = 'unknown module', $err_text = 'unknown error') {
        $this->irixdb->logic_error($err_code, $module_name, $err_text);
    }

    public function __construct($irixdb, $name, $func, $prototype) {
        if (!is_object($irixdb)) {
            die('This is private class, please use IRIX_DB');
        }
        if (!is_object($irixdb->db)) {
            die('This is private class, please use IRIX_DB');
        }
        $this->source = $irixdb->source;
        $this->irixdb = $irixdb;
        $this->db = $irixdb->db;
        $this->name = $name;
        $this->func = $func;
        $this->prototype = $prototype;
        $this->access = new IRIX_DB_ACCESS($this);
        if ($this->db->schema == false) {
            $this->db->save_db_schema();
        }
    }

    public function detect_type($src) {
        if (is_int($src)) {
            return IRIX_INT;
        }
        else
            return IRIX_STR;
    }

    public function get_in_type($src, $type = null) {
        if ($type === null) {
            $type = $this->detect_type($src);
        }
        $ret['default'] = false;
        $ret['type'] = $type;
        if (($type == IRIX_STR) || ($type == IRIX_TEXT)) {
            if ($src === null) {
                $src = '';
                $ret['default'] = true;
            }
            $src = $this->db->es($src);
            $ret['value'] = $src;
            $ret['value_sql'] = "'$src'";
            return $ret;
        } else
        if (($type == IRIX_INT) || ($type == IRIX_INT_AI) || ($type == IRIX_PKEY) || ($type == IRIX_PKEY_AI)) {
            if ($src === null) {
                $src = 0;
                $ret['default'] = true;
            }
            $src = filter_var($src, FILTER_VALIDATE_INT);
            if ($src !== false) {
                $ret['value'] = $src;
                $ret['value_sql'] = $src;
                return $ret;
            } else {
                $eout=[];
                $eout['type']=$type;
                $eout['data']=$src;
                $this->user_error('prarm_type_not_valid', $eout);
            }
        } else {
            $this->internal_error(172201, 'query:get_in_type:incorrect_type', $type);
        }
    }

    public function extract_value($value, $column_name, $param_need = true) {
        if ($param_need === null) {
            $param_need = false;
        }
        if (!is_array($this->source)) {
            $this->internal_error('param source incorrect', 'extract_value', $this->source);
        }
        if (!isset($this->source[$value])) {
            if ($param_need) {
                $this->user_error('miss param', $value);
            } else {
                $param = null;
            }
        } else {
            $param = $this->source[$value];
        }
        $column_name = $this->full_clear_string($column_name);
        $resc = explode('.', $column_name);
        if (sizeof($resc) == 2) {
            $table_name = $resc[0];
            $column_name = $resc[1];
            if ($this->db->schema == false) {
                $this->db->save_db_schema();
            }
            $validate_structure = $this->db->schema;
            if ($validate_structure == false) {
                $this->internal_error('column type in schema is unknown', 'extract_value', $column_name);
            }
            if (isset($validate_structure[$table_name][$column_name])) {
                return $this->get_in_type($param, $validate_structure[$table_name][$column_name]);
            } else {
                //var_dump($validate_structure);
                $this->internal_error('column not found in table schema', 'extract_value', $resc);
            };
        } else {
            $this->internal_error('column name incorrect', 'extract_value', $column_name);
        }
    }

    public function clear_string($str) {
        $str = str_replace('`', '', $str);
        $str = str_replace(' ', '', $str);
        return $str;
    }

    public function full_clear_string($str) {
        $str = str_replace('`', '', $str);
        $str = str_replace(' ', '', $str);
        $str = str_replace('<', '', $str);
        $str = str_replace('>', '', $str);
        $str = str_replace('=', '', $str);
        return $str;
    }

    public function user_error($err_status, $data = '') {
        $this->irixdb->user_error($err_status, $data);
    }

    public function ok($ok_status, $data = '', $model = false) {
        $this->irixdb->ok($ok_status, $data, $model);
    }

    public function validate_error($validate_msg, $value = '', $need = '') {
        return $this->irixdb->validate_error($validate_msg, $value, $need);
    }

    public function internal_error($err_code, $module_name = 'unknown module', $err_text = 'unknown error') {
        $this->irixdb->internal_error($err_code, $module_name, $err_text);
    }

    public function run() {
        $func = $this->func;
        if (!$this->prototype) {
            $arg = $this;
        } else {
            $arg = $this->prototype;
        }
        $func($arg);
        return $this->irixdb;
    }

    public function json($structure) {
        header("Content-Type:application/json; charset=UTF-8");
        echo json_encode($structure);
        die;
    }

    public function page($file_name, $stop = true, $header = false, $footer = false) {
        if (file_exists($file_name)) {
            if (file_exists($header)) {
                echo file_get_contents($header);
            }
            echo file_get_contents($file_name);
            if (file_exists($footer)) {
                echo file_get_contents($footer);
            }
        }
        if ($stop) {
            die;
        }
        return $this;
    }

    public function select($table) {
        return $this->new_query(new IRIX_DB_SELECT($this->irixdb, $this, $table));
    }

    public function update($table) {
        return $this->new_query(new IRIX_DB_UPDATE($this->irixdb, $this, $table));
    }

    public function insert($table) {
        return $this->new_query(new IRIX_DB_INSERT($this->irixdb, $this, $table));
    }

    public function delete($table) {
        return $this->new_query(new IRIX_DB_DELETE($this->irixdb, $this, $table));
    }

    public function copy($table) {
        return $this->new_query(new IRIX_DB_COPY($this->irixdb, $this, $table));
    }

    public function check_access($table, $obj_id, $min_access) {
        return $this->new_query(new IRIX_DB_ACCESS($this, $table))->check_access($table, $obj_id, $min_access);
    }

    public function is_auth($success, $fail = null) {
        return $this->new_query(new IRIX_DB_ACCESS($this))->is_auth($success, $fail);
    }

    public function check_auth() {
        return $this->new_query(new IRIX_DB_ACCESS($this))->check_auth();
    }

    public function auth() {
        return $this->new_query(new IRIX_DB_ACCESS($this))->auth();
    }

    public function unauth() {
        return $this->new_query(new IRIX_DB_ACCESS($this))->unauth();
    }

    public function if_($expression, $funct_if = null, $funct_else = null, $inversion = false) {
        if (!$inversion) {
            if ($this->result === $expression) {
                if ($funct_if !== null) {
                    return $funct_if($this);
                } else {
                    return $this;
                }
            } else {
                if ($funct_else !== null) {
                    return $funct_else($this);
                } else {
                    return $this;
                }
            }
        } else {
            if ($this->result !== $expression) {
                if ($funct_if !== null) {
                    return $funct_if($this);
                } else {
                    return $this;
                }
            } else {
                if ($funct_else !== null) {
                    return $funct_else($this);
                } else {
                    return $this;
                }
            }
        }
    }

    public function if_true($funct_if = null, $funct_else = null) {
        return $this->if_(true, $funct_if, $funct_else);
    }

    public function if_false($funct_if = null, $funct_else = null) {
        return $this->if_(false, $funct_if, $funct_else);
    }

    public function if_null($funct_if = null, $funct_else = null) {
        return $this->if_(null, $funct_if, $funct_else);
    }

    public function if_null_result($funct_if = null, $funct_else = null) {
        return $this->if_(Array(), $funct_if, $funct_else);
    }

    public function if_not_null($funct_if = null, $funct_else = null) {
        return $this->if_(null, $funct_if, $funct_else, true);
    }

    public function new_query($obj) {
        $this->queries[] = $obj;
        return $obj;
    }

    //do not use separatly
    public function _ret($query) {
        $this->results[] = $query->result;
        $this->result = $query->result;
        $this->models[] = $query->model;
        $this->model = $query->model;
        return $this;
    }

    public function ret() {
        return $this;
    }

    private function array2tree($source_arr, $parent_key = 'root_id', $id_key = 'id', $child_key = 'items', $root_level = 0) {
        $out = Array();
        if ($source_arr == null) {
            $source_arr = Array();
        }
        foreach ($source_arr as $key => $value) {
            if ($value[$parent_key] == $root_level) {
                foreach ($source_arr as $child) {
                    if ($child[$parent_key] == $value[$id_key]) {
                        $child = $this->array2tree($source_arr, $parent_key, $id_key, $child_key, $value[$id_key]);
                        $value[$child_key] = $child;
                    }
                }
                $out[] = $value;
            }
        }
        return $out;
    }

    //?!!!!
    public function treeview() {
        $this->irixdb->answer(IRIX_KIND_OK, 'ok', $this->array2tree($this->result), $this->model);
    }

    public function replace_if_null($what, $new) {
        foreach ($this->result as $key => $value) {
            if (@$value[$what] == null) {
                $this->result[$key][$what] = $new;
            }
        }
        return $this;
    }

    public function say() {
        $this->ok('ok', $this->result, $this->model);
    }

    public function say_to_page_end($path, $var_name) {
        $page = file_get_contents($path);
        $page = str_ireplace('</body>', '', $page);
        $page = str_ireplace('</html>', '', $page);
        echo $page . '<script type="text/javascript">' . $var_name . ' = "' . base64_encode(json_encode($this->result)) . '";' . "\n</script>\n</body></html>";
        die;
    }

}