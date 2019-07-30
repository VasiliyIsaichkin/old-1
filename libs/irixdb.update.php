<?php

/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

class IRIX_DB_UPDATE extends IRIX_DB_WRITE {

    public $keys = Array();

    public function check_sets() {
        unset($this->source[IRIX_ACTION_VAR]);
        foreach ($this->keys as $value) {
            unset($this->source[$value]);
        }
        foreach ($this->source as $key => $value) {
            if (isset($this->db->schema[$this->main_table][$key])) {
                if (!isset($this->sets[$key])) {
                    $this->set($key);
                }
            }
        }
    }

    public function key($keyname) {
        $this->keys[] = $keyname;
        return $this;
    }

    public function make($dont_stop = true) {
        if (sizeof($this->keys) < 1) {
            $this->internal_error('update key not setted');
        }
        $this->check_sets();
        $keyfound_flag = false;
        $setfound_flag = false;
        foreach ($this->keys as $key) {
            $keycol = $this->main_table . "." . $key;
            $curr = $this->flow->extract_value($key, $keycol, false);
            if (!$curr['default']) {
                $keyfound_flag = true;
                $key_sql = "`$key` = " . $curr['value_sql'];
            }
        }
        if (!$keyfound_flag) {
            $this->logic_error('no update key');
        }
        $sets_sql = "";
        foreach ($this->sets as $set_name => $set) {
            if (!$set['default']) {
                $setfound_flag = true;
                $setsql = $set['value_sql'];
                $sets_sql.=", `$set_name` = $setsql";
            }
        }
        $sets_sql = substr($sets_sql, 1);
        if (!$setfound_flag) {
            $this->logic_error('nothing update');
        }
        $sql = "UPDATE $this->main_table SET $sets_sql WHERE $key_sql;";
        $this->db->query($sql);
        if ($dont_stop) {
            return $this;
        } else {
            $this->ok('ok', 'updated');
        }
        return $this;
    }

}