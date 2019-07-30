<?php

/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

abstract class IRIX_DB_WRITE extends IRIX_DB_QUERY {

    public $sets = Array();
    public $last_set = null;

    protected function _check_last_set() {
        if ($this->last_set == null) {
            $this->internal_error(45050, 'IRIX_DB_WRITE::_check_last_set', 'sets is empty');
        }
    }

    protected function _set_last($new_value) {
        $this->_check_last_set();
        $value_source_name = $this->sets[$this->last_set]['value_source_name'];
        $from_source = $this->sets[$this->last_set]['from_source'];
        $this->sets[$this->last_set] = $this->get_in_type($new_value);
        $this->sets[$this->last_set]['value_source_name'] = $value_source_name;
        $this->sets[$this->last_set]['from_source'] = $from_source;
    }

    protected function _last_value() {
        return $this->sets[$this->last_set]['value'];
    }

    protected function _last_value_default() {
        return $this->sets[$this->last_set]['default'];
    }

    protected function _last_value_sql() {
        return $this->sets[$this->last_set]['value_sql'];
    }

    /*
      -> set('name')
      -> set('description',false)
      -> set('enabled','1')
      -> set('enabled','ebabled',true)
     */

    public function set($value_name, $value = null, $other_name = false) {
        $param_need = true;
        $read_from_source = false;
        if ($value === null) {
            $read_from_source = true;
        }
        if ($value === true) {
            $read_from_source = true;
            $param_need = false;
        }
        if ($read_from_source) {
            if ($other_name) {
                $extract_name = $value;
            } else {
                $extract_name = $value_name;
            }
            $readed_value = $this->extract_value($extract_name, $this->main_table . '.' . $value_name, $param_need);
            $this->sets[$value_name] = $readed_value;
        } else {
            $this->sets[$value_name] = $this->get_in_type($value);
        }
        $this->sets[$value_name]['value_source_name'] = $value_name;
        $this->sets[$value_name]['from_source'] = $read_from_source;
        $this->last_set = $value_name;
        return $this;
    }

    public function unique() {
        $this->_check_last_set();
        if ($this->_last_value_default()) {
            return $this;
        }
        $sql = "SELECT " . $this->last_set . " FROM " . $this->main_table . " WHERE " . $this->last_set . " = " . $this->_last_value_sql() . " ;";
        if ($this->db->fetch_alias_all($sql) !== null) {
            $this->validate_error('unique', $this->main_table, $this->_last_value());
        };
        return $this;
    }

    public function to_md5() {
        $this->_check_last_set();
        if ($this->_last_value_default()) {
            return $this;
        }
        $this->_set_last(md5($this->_last_value()));
        return $this;
    }

    public function min_length($min_length) {
        $this->_check_last_set();
        if ($this->_last_value_default()) {
            return $this;
        }
        if (strlen($this->_last_value()) < $min_length) {
            $this->validate_error('min_length', $this->_last_value(), $min_length);
        }
        return $this;
    }
}