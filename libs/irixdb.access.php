<?php
/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */

define('IRIX_ACCESS_MINIMAL',10);
define('IRIX_ACCESS_READ',20);
define('IRIX_ACCESS_UPDATE',40);
define('IRIX_ACCESS_INSERT',60);
define('IRIX_ACCESS_ADMIN',90);
define('IRIX_ACCESS_OWNER',100);

class IRIX_DB_ACCESS extends IRIX_DB_MACRO {
    public $access_prefix='_access';
    
    public function check_auth() {
        if (isset($_SESSION['irxi_db_auth'])){
            $result = $_SESSION['irxi_db_auth'];
        } else {
            $result = false;
        }
        return $this->ret($result); 
    }

    public function is_auth($success,$fail=null) {
        return $this->flow->check_auth()->if_false($fail,$success);    
    }
    
    
    public function auth(){
        unset($_SESSION['irxi_db_auth']);
        $this->flow
                -> select('users')
                -> exclude('password')
                -> where('user=')
                -> where_md5('password=')
                -> where_enabled()
                -> make()
                -> if_null(function($f){$f
                        ->validate_error('login','fail');
                },function($f){
                    $_SESSION['irxi_db_auth']=$f->result[0];
                    $f->ok('authed',$f->result[0],$f->model);
                });

        return $this->flow->ok('authed'); 
    }

    public function unauth(){
        unset($_SESSION['irxi_db_auth']);
        return $this->flow->ok('unauthed'); 
    }
    
    public function check_access($table,$obj_id,$min_access){
        $this->flow->_acc_table_name=$table.$this->access_prefix;
        $this->flow->_acc_min_access=$min_access;
        $this->tables[]=$table.$this->access_prefix;
        $this->flow->_acc_obj_id=$this->flow->extract_value($obj_id,$table.$this->access_prefix.'.obj_id');
        $this->flow->_acc_obj_id=$this->flow->_acc_obj_id['value_sql'];
        $this->flow
                -> is_auth(function($f){$f
                    -> select($f->_acc_table_name)
                    -> where('user_id=',$f->result)
                    -> where('obj_id=',$f->_acc_obj_id)                            
                    -> where('access>=',$f->_acc_min_access)
                    -> make()
                    -> if_null(function($f){$f
                         ->validate_error('permission','invalid');
                    });
                },function($f){$f
                    ->validate_error('login','fail');
                });
         $this->ret(true);
        return $this->ret(true);
    }
}