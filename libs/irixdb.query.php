<?php
/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

abstract class IRIX_DB_QUERY {
    public $irixdb;
    public $db;
    public $flow;
    public $main_table;
    public $results;
    public $res;
    public $tables=Array();
    protected $structure=Array();
    public $source;
    public $model;

    public function __construct($irixdb, $iridb_flow, $table_name){
        if (!is_object($irixdb)) {die('This is private class, please use IRIX_DB');}
        if (!is_object($irixdb->db)) {die('This is private class, please use IRIX_DB');}
        if (!is_object($iridb_flow)) {die('This is private class, please use IRIX_DB');}
        $this->irixdb=$irixdb;
        $this->db=$irixdb->db;
        $this->flow=$iridb_flow;
        $this->main_table=$table_name;
        $this->tables[]=$table_name;
        $this->source=$irixdb->source;
    }    
    
    public function logic_error($err_code,$module_name='unknown module',$err_text='unknown error'){
        $this->irixdb->logic_error($err_code,$module_name,$err_text);
    }
    
    public function user_error($err_status,$data=''){
        $this->irixdb->user_error($err_status,$data);
    }
    
    public function validate_error($validate_msg,$value,$need){
        $this->irixdb->validate_error($validate_msg,$value,$need);
    }
    
    public function internal_error($err_code,$module_name='unknown module',$err_text='unknown error'){
        $this->irixdb->internal_error($err_code,$module_name,$err_text);
    }

    public function ok($ok_status,$data='', $model=false){
        $this->irixdb->ok($ok_status,$data, $model);
    }
    
    
    public function clear_string($str) {
        return $this->flow->clear_string($str);
    }
    
    public function full_clear_string($str) {
        return $this->flow->full_clear_string($str);
    }

    public function detect_type_for_sql($val){
        if (is_int($val)){return $val;} else {return "'$val'";}
        
    }

    public function detect_type($src) {
        return $this->flow->detect_type($src);
    }
    
    public function get_in_type($src, $type=null) {
        return $this->flow->get_in_type($src, $type);
    }
    public function ret(){
        return $this->flow->_ret($this);
    }
    
    public function extract_value($value, $column_name, $param_need = true) {
        return $this->flow->extract_value($value, $column_name, $param_need);
    }
    
    

}