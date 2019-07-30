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


define('IRIX_STR', 'S');
define('IRIX_TEXT', 'T');
define('IRIX_INT', 'I');
define('IRIX_PKEY', 'N');
define('IRIX_PKEY_AI', 'A');
define('IRIX_INT_AI', 'D');

class IRIX_MYSQLI_DRIVER {

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

    public function __construct($user, $password = null, $db_name = null, $host = null) {
        $this->user = $user;
        if ($password != null) {
            $this->pass = $password;
        }
        if ($db_name == null) {
            $this->db = $user;
        } else {
            $this->db = $db_name;
        }
        if ($host != null) {
            $this->host = $host;
        }
        $this->db_link = new mysqli($this->host, $this->user, $this->pass, $this->db);
        if ($this->db_link->connect_errno) {
            echo("MySQL Connect failed: " . $this->db_link->connect_error);
            die();
        }
        $this->db_schema_file = "irix.$this->db.schema.php";
        $this->db_schema_dir = __DIR__ . '/../cache/';
        $this->db_link->query("SET NAMES 'utf8';");
        $this->load_db_schema();
    }

    public function __destruct() {
        if (is_object($this->db_link)) {
            $this->db_link->close();
        }
    }

    public function query($query) {
        if ($result = $this->db_link->query($query)) {
            $this->last_query = $query;
            $this->last_result = $result;
            return $result;
        } else {
            return false;
        }
    }

    public function get_affected_rows() {
        return $this->last_result->num_rows;
    }

    public function fetch($query) {
        if ($this->last_query !== $query) {
            $ret = $this->query($query);
        }
        if ($this->last_result == null) {
            return null;
        } else if ($this->last_result == false) {
            return false;
        }
        return $this->last_result->fetch_array();
    }

    public function fetch_all($query) {
        $ret = $this->query($query);
        if ($this->last_result == null) {
            return null;
        } else if ($this->last_result == false) {
            return false;
        }
        if (method_exists('mysqli_result', 'fetch_all')) {
            $res = $this->last_result->fetch_all(MYSQLI_ASSOC);
        } else {
            for ($res = array(); $tmp = $this->last_result->fetch_array(MYSQLI_ASSOC);) {
                $res[] = $tmp;
            }
        }
        return $res;
    }

    public function insert_id() {
        return $this->db_link->insert_id;
    }

    public function fetch_alias_all($query, $symb = '.') {
        $this->query($query);
        if ($this->last_result == null) {
            return null;
        } else if ($this->last_result == false) {
            return false;
        }
        for ($res = array(); $tmp = $this->last_result->fetch_array(MYSQLI_ASSOC);) {
            $ret = Array();
            foreach ($this->last_result->fetch_fields() as $meta) {
                $ret[$meta->table . $symb . $meta->name] = $tmp[$meta->name];
            }
            $res[] = $ret;
        }
        return $res;
    }

    public function fetch_alias($query, $symb = '.') {
        if ($this->last_query !== $query) {
            $ret = $this->query($query);
        }
        if ($this->last_result == null) {
            return null;
        } else if ($this->last_result == false) {
            return false;
        }
        $tmp = $this->last_result->fetch_array(MYSQLI_ASSOC);
        $ret = Array();
        foreach ($this->last_result->fetch_fields() as $meta) {
            $ret[$meta->table . $symb . $meta->name] = $tmp[$meta->name];
        }
        return $ret;
    }

    public function es($string) {
        return $this->db_link->escape_string($string);
    }

    private function _parse_raw_column_type($raw) {
        $tmp = explode('(', $raw['Type']);
        switch ($tmp[0]) {
            case 'varchar': $type = IRIX_STR;
                break;
            case 'text': $type = IRIX_TEXT;
                break;
            case 'int': $type = IRIX_INT;
                break;
            default: return false;
                break;
        }
        if ($raw['Key'] == 'PRI') {
            $type = IRIX_PKEY;
        }
        if ($raw['Extra'] == 'auto_increment') {
            if ($type == IRIX_INT) {
                $type = IRIX_INT_AI;
            }
            if ($type == IRIX_PKEY) {
                $type = IRIX_PKEY_AI;
            }
        }
        return $type;
    }

    public function fetch_table_schema($table_name) {
        $ret = null;
        foreach ($this->fetch_all("SHOW COLUMNS FROM $table_name;") as $column) {
            $res = $this->_parse_raw_column_type($column);
            if ($res === false) {
                return false;
            }
            $ret[$column['Field']] = $res;
        }
        return $ret;
    }

    public function fetch_db_tablelist() {
        $el = null;
        $ret=Array();
        foreach ($this->fetch_all('SHOW TABLES') as $el) {
            reset($el);
            $ret[] = $el[key($el)];
        }
        return $ret;
    }

    public function ftech_db_schema() {
        $ret = null;
        foreach ($this->fetch_db_tablelist() as $table) {
            $ret[$table] = $this->fetch_table_schema($table);
        }
        $this->schema = $ret;
        return $ret;
    }

    public function save_db_schema() {
        $this->ftech_db_schema();
        $filestruct[] = "<?php die('Error 403'); /*";
        $filestruct[] = json_encode($this->schema);
        if (!file_exists($this->db_schema_dir)) {
            mkdir($this->db_schema_dir, 0777, true);
        }
        $fname = $this->db_schema_dir . $this->db_schema_file;
        return file_put_contents($fname, join("\n", $filestruct));
    }
    
    public function load_db_schema() {
        $fname=$this->db_schema_dir . $this->db_schema_file;
        if (file_exists($fname)){
            $tmp=explode("\n",file_get_contents($fname));
            $this->schema=json_decode($tmp[1],true);
            return $this->schema;
        }else {
            return false;
        }
        
    }

    /** @todo: have to be reworked */
    public function error($type = '') {
        if (empty($type)) {
            return false;
        } else {
            if ($type == 1)
                die("<strong>Database could not connect</strong> ");
            else if ($type == 2)
                die("<strong>mysql error</strong> " . mysql_error());
            else if ($type == 3)
                die("<strong>error </strong>, Proses has been stopped");
            else if ($type == 4)
                die("<strong>Fail select DB </strong>");
            else if ($type == 5)
                die("<strong>MySQL fail to switch in utf8 codepage</strong>");
            else
                die("<strong>error </strong>, no connection !!!");
        }
    }

}
