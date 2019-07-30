<?php
class ChromePhp
{
    const VERSION = '4.0.0';
    const HEADER_NAME = 'X-ChromeLogger-Data';
    const BACKTRACE_LEVEL = 'backtrace_level';
    const LOG = 'log';
    const WARN = 'warn';
    const ERROR = 'error';
    const GROUP = 'group';
    const INFO = 'info';
    const GROUP_END = 'groupEnd';
    const GROUP_COLLAPSED = 'groupCollapsed';
    protected $_php_version;
    protected $_timestamp;
    protected $_json = array(
        'version' => self::VERSION,
        'columns' => array('log', 'backtrace', 'type'),
        'rows' => array()
    );
    protected $_backtraces = array();
    protected $_error_triggered = false;
    protected $_settings = array(
        self::BACKTRACE_LEVEL => 1
    );
    protected static $_instance;
    protected $_processed = array();
    private function __construct()
    {
        $this->_php_version = phpversion();
        $this->_timestamp = $this->_php_version >= 5.1 ? $_SERVER['REQUEST_TIME'] : time();
        $this->_json['request_uri'] = $_SERVER['REQUEST_URI'];
    }
    public static function getInstance()
    {
        if (self::$_instance === null) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public static function log()
    {
        $args = func_get_args();
        return self::_log('', $args);
    }
    public static function warn()
    {
        $args = func_get_args();
        return self::_log(self::WARN, $args);
    }
    public static function error()
    {
        $args = func_get_args();
        return self::_log(self::ERROR, $args);
    }
    public static function group()
    {
        $args = func_get_args();
        return self::_log(self::GROUP, $args);
    }
    public static function info()
    {
        $args = func_get_args();
        return self::_log(self::INFO, $args);
    }
    public static function groupCollapsed()
    {
        $args = func_get_args();
        return self::_log(self::GROUP_COLLAPSED, $args);
    }
    public static function groupEnd()
    {
        $args = func_get_args();
        return self::_log(self::GROUP_END, $args);
    }
    protected static function _log($type, array $args)
    {
        if (count($args) == 0 && $type != self::GROUP_END) {
            return;
        }
        $logger = self::getInstance();
        $logger->_processed = array();
        $logs = array();
        foreach ($args as $arg) {
            $logs[] = $logger->_convert($arg);
        }
        $backtrace = debug_backtrace(false);
        $level = $logger->getSetting(self::BACKTRACE_LEVEL);
        $backtrace_message = 'unknown';
        if (isset($backtrace[$level]['file']) && isset($backtrace[$level]['line'])) {
            $backtrace_message = $backtrace[$level]['file'] . ' : ' . $backtrace[$level]['line'];
        }
        $logger->_addRow($logs, $backtrace_message, $type);
    }
    protected function _convert($object)
    {
        if (!is_object($object)) {
            return $object;
        }
        $this->_processed[] = $object;
        $object_as_array = array();
        $object_as_array['___class_name'] = get_class($object);
        $object_vars = get_object_vars($object);
        foreach ($object_vars as $key => $value) {
            if ($value === $object || in_array($value, $this->_processed, true)) {
                $value = 'recursion - parent object [' . get_class($value) . ']';
            }
            $object_as_array[$key] = $this->_convert($value);
        }

        $reflection = new ReflectionClass($object);

        foreach ($reflection->getProperties() as $property) {
            if (array_key_exists($property->getName(), $object_vars)) {
                continue;
            }
            $type = $this->_getPropertyKey($property);

            if ($this->_php_version >= 5.3) {
                $property->setAccessible(true);
            }

            try {
                $value = $property->getValue($object);
            } catch (ReflectionException $e) {
                $value = 'only PHP 5.3 can access private/protected properties';
            }

            if ($value === $object || in_array($value, $this->_processed, true)) {
                $value = 'recursion - parent object [' . get_class($value) . ']';
            }

            $object_as_array[$type] = $this->_convert($value);
        }
        return $object_as_array;
    }

    protected function _getPropertyKey(ReflectionProperty $property)
    {
        $static = $property->isStatic() ? ' static' : '';
        if ($property->isPublic()) {
            return 'public' . $static . ' ' . $property->getName();
        }

        if ($property->isProtected()) {
            return 'protected' . $static . ' ' . $property->getName();
        }

        if ($property->isPrivate()) {
            return 'private' . $static . ' ' . $property->getName();
        }
    }

    protected function _addRow(array $logs, $backtrace, $type)
    {
        if (in_array($backtrace, $this->_backtraces)) {
            $backtrace = null;
        }

        if ($type == self::GROUP || $type == self::GROUP_END || $type == self::GROUP_COLLAPSED) {
            $backtrace = null;
        }

        if ($backtrace !== null) {
            $this->_backtraces[] = $backtrace;
        }

        $row = array($logs, $backtrace, $type);

        $this->_json['rows'][] = $row;
        $this->_writeHeader($this->_json);
    }

    protected function _writeHeader($data)
    {
        header(self::HEADER_NAME . ': ' . $this->_encode($data));
    }

    protected function _encode($data)
    {
        return base64_encode(utf8_encode(json_encode($data)));
    }

    public function addSetting($key, $value)
    {
        $this->_settings[$key] = $value;
    }

    public function addSettings(array $settings)
    {
        foreach ($settings as $key => $value) {
            $this->addSetting($key, $value);
        }
    }

    public function getSetting($key)
    {
        if (!isset($this->_settings[$key])) {
            return null;
        }
        return $this->_settings[$key];
    }
}
