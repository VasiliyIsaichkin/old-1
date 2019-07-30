<?php
/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

abstract class IRIX_DB_MACRO {

    public $irixdb;
    public $flow;
    public $model;

    public function ok($ok_status, $data = '', $model = false) {
        $this->irixdb->ok($ok_status, $data, $model);
    }

    public function validate_error($validate_msg, $value = '', $need = '') {
        return $this->irixdb->validate_error($validate_msg, $value, $need);
    }

    public function ret($result) {
        $this->result = $result;
        $this->result_raw = $result;
        return $this->flow->_ret($this);
    }

    public function __construct($flow) {
        $this->flow = $flow;
        $this->irixdb = $flow->irixdb;
    }

}