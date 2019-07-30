<?php
/* IrixDB MySQL Driver v 1.8
 * http://irixdb.iraxis.ru/
 * Warning! Deprecated element
 * 
 * Part of IRIXDB 2.x 
 *
 * Copyright 2011-2012, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

class DB {

    var $host='localhost';
    var $user='irixdb';
    var $pass='';
    var $db='irixdb';
    var $db_link;
    var $conn = false;
    var $persistant = false;
    var $result;
    var $last_query='';

    public $error = false;

    public function __construct($user,$password=null,$db_name=null) {
        $this->user=$user;
        if ($password==null){
            $this->pass='';
        } else {
            $this->pass=$password;
        }
        if ($db_name==null){
            $this->db=$user;
        } else {
            $this->db=$db_name;
        }
        $this->error = true;
        $this->persistant = false;
        $this->connect();
    }
    function connect(){ 
        if ($this->persistant)
           @$this->db_link = mysql_pconnect($this->host, $this->user, $this->pass, true);
        else
           @$this->db_link = mysql_connect($this->host, $this->user, $this->pass, true);

        if (!$this->db_link) {
            if ($this->error) {
                $this->error($type=1);
            }
            return false;
        }
        else {
        if (empty($this->db)) {
            if ($this->error) {
                $this->error($type=4);
            }
        }
        else {
            $db = mysql_select_db($this->db, $this->db_link); // select db
            if (!$db) {
                if ($this->error) {
                    $this->error($type=4);
                }
            return false;
            }
            @mysql_query("SET NAMES 'utf8'",$this->db_link) or $this->error($type=5);
            $this -> conn = true;
        }
            return $this->db_link;
        }
    }

    function close() { // close connection
        if ($this ->conn){ // check connection
            if ($this->persistant) {
                $this ->conn = false;
            }
            else {
                mysql_close($this->db_link);
                $this ->conn = false;
            }
        }
        else {
            if ($this->error) {
                return $this->error($type=4);
            }
        }
    }
    public function query($query){
        if ($this->conn) {
            $this->result=mysql_query($query,  $this->db_link);
            $this->last_query=$query;
            return $this->result;
        } else {
           if ($this->connect()){
               $this->result=mysql_query($query,  $this->db_link);
               $this->last_query=$query;
               return $this->result;
           }
        }
    }
    public function get_affected_rows(){
        return mysql_affected_rows($this->db_link);
    }
    
    public function fquery($query){
        $qret=$this->query($query);
        if ($qret==false){
            return false;
        } else {
            return $this->fetch($qret);
        }
    }

    public function fetch_all_query($query){
        return $this->faquery($query);
    }

    public function faquery($query){
        $qret=$this->query($query);
        if ($qret==false){
            return false;
        } else {
            return $this->fetch_all($qret);
        }
    }
    
    public function fetch($query_result){
        return mysql_fetch_array($query_result, MYSQL_ASSOC);
    }
    public function insert_id(){
        return mysql_insert_id($this->db_link);
    }
    public function fetch_all($query_result){
        $result=null;
        while ($row = $this->fetch($query_result)) {
            $result[]=$row;
        }
        return $result;
    }

    public function fetch_alias_query($query,$symb='.'){
        return $this->fetch_alias($this->query($query), $symb);
    }
    
    public function fetch_all_alias_query($query,$symb='.'){
        $result=null;
        $query_result=$this->query($query);
        while ($row = $this->fetch_alias($query_result,$symb)) {
            $result[]=$row;
        }
        return $result;    
    }
    
    public function fetch_alias($result,$symb='.'){
        if ($result===false) {return false;}
        if ($result===true) {return false;}
        if ($result===null) {return null;}
        if (!($row = mysql_fetch_array($result))){
            return false;
        }
        $assoc = Array();
        $rowCount = mysql_num_fields($result);

        for ($idx = 0; $idx < $rowCount; $idx++){
            $table = mysql_field_table($result, $idx);
            $field = mysql_field_name($result, $idx);
            $assoc["$table$symb$field"] = $row[$idx];
        }
        return $assoc;
    }
    
    public function es($string){
        if (!$this->conn) {
            $this->connect();
        }
        return mysql_real_escape_string($string,  $this->db_link);
    }
    public function get_table_cols($table_name) {
        if (is_array($table_name)){
            foreach ($table_name as $table) {
                $res=$this->faquery("SHOW COLUMNS FROM $table;");
                if(!$res){return false;}
                $outx=null;
                foreach ($res as $value) {
                    $r=explode('(',$value['Type']);
                    switch ($r[0]) {
                        case 'varchar': $type='S';  break;
                        case 'text': $type='S';  break;
                        case 'int': $type='I';  break;
                        default: return false;  break;
                    }
                    if ($value['Key']=='PRI') {$type='N';}
                    $outx[$value['Field']]=$type;
                }
                $out[$table]=$outx;
            }
        } else {
            $res=$this->faquery("SHOW COLUMNS FROM $table_name;");
            if(!$res){return false;}
            $out=null;
            foreach ($res as $value) {
                $r=explode('(',$value['Type']);
                switch ($r[0]) {
                    case 'varchar': $type='S';  break;
                    case 'text': $type='S';  break;
                    case 'int': $type='I';  break;
                    default: return false;  break;
                }
                if ($value['Key']=='PRI') {$type='N';}
                $out[$value['Field']]=$type;
            }
        }
        return $out;
    }
    
    /** @todo: have to be reworked */
    public function error($type=''){
        if (empty($type)) {
            return false;
        }
        else {
            if ($type==1)
                die("<strong>Database could not connect</strong> ");
            else if ($type==2)
                die("<strong>mysql error</strong> " . mysql_error());
            else if ($type==3)
                die("<strong>error </strong>, Proses has been stopped");
            else if ($type==4)
                die("<strong>Fail select DB </strong>");
            else if ($type==5)
                die("<strong>MySQL fail to switch in utf8 codepage</strong>");
            else
                die("<strong>error </strong>, no connection !!!");
        }
    }
}
