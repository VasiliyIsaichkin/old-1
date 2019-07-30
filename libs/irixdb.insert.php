<?php

/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

class IRIX_DB_INSERT extends IRIX_DB_WRITE {

    public $insert_id = null;
    public function check_sets() {
        unset($this->source[IRIX_ACTION_VAR]);
        foreach ($this->source as $key => $value) {
            if (isset($this->db->schema[$this->main_table][$key])) {
                if (!isset($this->sets[$key])) {
                    $this->set($key);
                }
            }
        }
    }

    public function make($dont_stop = true) {
        $table_name = "`$this->main_table`";
        $columns = '';
        $values = '';
        $this->check_sets();
        foreach ($this->db->schema[$this->main_table] as $column => $type) {
            $columns.=", `$column`";
            if (isset($this->sets[$column])) {
                $values.=", " . $this->sets[$column]['value_sql'];
            } else {
                $values.=", NULL";
            }
        }
        $columns = substr($columns, 1);
        $values = substr($values, 1);
        $result_sql = "INSERT INTO $table_name ($columns) VALUES ($values);";
        //die($result_sql);
        $this->db->query($result_sql);
        $last_id = $this->db->insert_id();
        if ($dont_stop) {
            $this->insert_id = $last_id;
            return $this;
        } else {
            $this->ok('ok', $last_id);
        }
    }

}