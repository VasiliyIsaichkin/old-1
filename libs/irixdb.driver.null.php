<?php
/* IrixDB MySQLi Driver v 0.8.2-PRE
 * Implements IrixDB DB Driver API v. 2
 * http://irixdb.iraxis.ru/
 * 
 * Part of IRIXDB > 2.4 
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

class IRIX_NULL_DRIVER {

    private $host = 'localhost';
    public $user = 'irixdb';
    private $pass = '';
    public $db = 'irixdb';
    private $db_link;
    public $last_query = null;
    private $last_result = null;
    public $error = false;
    public $db_schema_file = null;
    public $db_schema_dir = null;
    public $schema = null;

    public function __construct() {

    }

    public function __destruct() {
    }

    public function query($query) {
        return true;
    }

    public function get_affected_rows() {
        return 0;
    }

    public function fetch($query) {
        return null;
    }

    public function fetch_all($query) {
        return null;
    }

    public function insert_id() {
        return 0;
    }

    public function fetch_alias_all($query, $symb = '.') {
        return null;
    }

    public function fetch_alias($query, $symb = '.') {
        return null;
    }

    public function es($string) {
        return $string; //@TODO: rework
    }

    public function fetch_table_schema($table_name) {
        return null;
    }

    public function fetch_db_tablelist() {
        return Array();;
    }

    public function ftech_db_schema() {
        return null;
    }

    public function save_db_schema() {
        return null;
    }
    
    public function load_db_schema() {
        return false;
    }

    public function error($type = '') {
        return false;
    }

}
