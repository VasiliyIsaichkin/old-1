<?php
/* IrixDB v 2.5.2-DEV
 * http://irixdb.iraxis.ru/
 *
 * Copyright 2011-2013, Vasiliy Isaichkin (Iraxis group)
 * PROHIBIT TO DISTRIBUTE, MODIFY OR USE SEPARATELY.
 */
define('IRIX_DEBUG', true);

define('IRIX_KIND_ERROR', 'error');
define('IRIX_KIND_INTERNAL_ERROR', 'ierror');
define('IRIX_KIND_VALIDATE_ERROR', 'verror');
define('IRIX_KIND_LOGIC_ERROR', 'lerror');
define('IRIX_KIND_OK', 'ok');
define('IRIX_ACTION_VAR', '__irix_action');
require_once 'irixdb.driver.mysqli.php';
require_once 'irixdb.driver.null.php';
require_once 'irixdb.query.php';
require_once 'irixdb.select.php';
require_once 'irixdb.write.php';
require_once 'irixdb.insert.php';
require_once 'irixdb.update.php';
require_once 'irixdb.macro.php';
require_once 'irixdb.access.php';
require_once 'irixdb.copy.php';
require_once 'irixdb.flow.php';

if (IRIX_DEBUG) {
    require_once 'ChromePhp.php';
    //ChromePhp::groupCollapsed('IRIX DB');
}

function toLog($type = false, $log = '') {
    ChromePhp::log($log);
}

//toLog(true, 'IRIXDB Started');

function toSignedBase64($string) {
    $base64 = base64_encode($string . md5($string));
    return $base64;
}

function fromSignedBase64($string) {
    $base64 = base64_decode($string);
    $hash = substr($base64, strlen($base64) - 32, 32);
    $str = substr($base64, 0, strlen($base64) - 32);
    if (md5($str) == strtolower($hash)) {
        return $str;
    } else {
        return false;
    }
}

class IRIX_DB {

    private $flwos = Array();
    private $active_flow = Array();
    public $flow;
    public $source;
    public $comm_proto;

    public function __construct($db) {
        if (!is_object($db)) {
            die('Error in IRIRX_DB constructor param');
        }
        $this->source = array_merge($_GET, $_POST);
        /* if (isset($_GET['action'])) {
          $this->source = $_GET;
          } else {
          $this->source = $_POST;
          } */
        session_start();
        $this->db = $db;
        $this->init();
    }

    public function index($file) {
        if (!isset($this->source[IRIX_ACTION_VAR])) {
            echo file_get_contents($file);
            die();
        }
        return $this;
    }

    public function to_json(array $data) {
        $isArray = true;
        $keys = array_keys($data);
        $prevKey = -1;
        foreach ($keys as $key)
            if (!is_numeric($key) || $prevKey + 1 != $key) {
                $isArray = false;
                break;
            }
            else
                $prevKey++;
        unset($keys);
        $items = array();
        foreach ($data as $key => $value) {
            $item = (!$isArray ? "\"$key\":" : '');
            if (is_array($value))
                $item .= $this->to_json($value);
            elseif (is_null($value))
                $item .= 'null';
            elseif (is_bool($value))
                $item .= $value ? 'true' : 'false';
            elseif (is_string($value))
                $item .= '"' . preg_replace('%([\\x00-\\x1f\\x22\\x5c])%e', 'sprintf("\\\\u%04X", ord("$1"))', $value) . '"';
            elseif (is_numeric($value))
                $item .= $value;
            else
                throw new Exception('Wrong argument.');
            $items[] = $item;
        }
        return ($isArray ? '[' : '{') . implode(',', $items) . ($isArray ? ']' : '}');
    }

    public function call($flow_name, $result_to_user = false) {
        if ($result_to_user) {
            if (!isset($this->flwos[$flow_name])) {
                if (isset($this->flwos['*'])) {
                    $this->flwos['*']->run();
                    return;
                } else {
                    $this->user_error('not_found', $flow_name);
                }
            }
            $this->flwos[$flow_name]->run();
        }
    }

    //TEMPORARY

    public function setCommuicationProtocol($protocol_instance) {
        if (isset($protocol_instance->_comm_protocol)) {
            $this->comm_proto = $protocol_instance;
        }
    }

    public function answer($kind = null, $status = null, $data = null, $model = false, $data_only = false) {
        if ($kind == null) {
            die('GENERAL_ERROR');
        } else {
            if (IRIX_DEBUG) {
                ChromePhp::groupEnd();
            }
            if (isset($this->source['_compat'])) {
                $data_only = true;
            }
            if ($data_only) {
                header("Content-Type:application/json; charset=UTF-8");
                if (!is_array($data)) {
                    $data = Array($data);
                }
                die($this->to_json($data));
            } else {
                header("Content-Type:application/json; charset=UTF-8");
                $ans['kind'] = $kind;
                $ans['status'] = $status;
                $ans['timestamp'] = time();
                $ans['data'] = $data;
                $ans['model'] = $model;
                die($this->to_json($ans));
            }
        }
    }

    public function init() {
        $this->flows = Array();
        $this->active_flow = null;
        return $this;
    }

    public function logic_error($err_code, $module_name = 'unknown module', $err_text = 'unknown error') {
        $err_ext['module'] = $module_name;
        $err_ext['text'] = $err_text;
        $this->answer(IRIX_KIND_LOGIC_ERROR, $err_code, $err_ext);
    }

    public function user_error($err_status, $data = '') {
        $this->answer(IRIX_KIND_ERROR, $err_status, $data);
    }

    public function ok($ok_status, $data = '', $model = false) {
        $this->answer(IRIX_KIND_OK, $ok_status, $data, $model);
    }

    public function validate_error($validate_msg, $value = '', $need = '') {
        $data['value'] = $value;
        $data['need'] = $need;
        $this->answer(IRIX_KIND_VALIDATE_ERROR, $validate_msg, $data);
    }

    public function internal_error($err_code, $module_name = 'unknown module', $err_text = 'unknown error') {
        $err_ext['module'] = $module_name;
        $err_ext['text'] = $err_text;
        $this->answer(IRIX_KIND_INTERNAL_ERROR, $err_code, $err_ext);
    }

    public function flow($flow_name, $funct, $prototype = false) {
        $this->active_flow = $flow_name;
        if (isset($this->flwos[$flow_name])) {
            //
        } else {
            $this->flwos[$flow_name] = new IRIX_DB_FLOW($this, $this->active_flow, $funct, $prototype);
        }
        return $this;
    }

    public function make() {
        if (!isset($this->source[IRIX_ACTION_VAR])) {
            $this->source[IRIX_ACTION_VAR] = '*';
        }
        $this->call($this->source[IRIX_ACTION_VAR], true);
        return $this;
    }

}