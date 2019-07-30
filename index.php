<?php
require_once 'libs/irixdb.php';

$page = new IRIX_DB(new IRIX_MYSQLI_DRIVER('toptai', 'BChJNjWfvYjB5fQc'));
$page -> flow('test',function($f){
      }) -> flow('!login',function($f) {$f
            -> auth();
      }) -> flow('!unlogin',function($f) {$f
            -> unauth();      
      }) -> flow('!islogin', function($f){$f
            ->is_auth(function($f){$f
                 -> ok('authed',$_SESSION['irxi_db_auth']);
            },function($f){$f
                -> user_error('unauthed');
            });
      }) -> flow('!realestate!location',function($f) {$f
                -> update('locations')
                -> key('id')
                -> set('updated',time())
                -> make(false);
      }) -> flow('!realestate!location!add',function($f) {$f
                -> insert('locations')
                -> set('enabled','1')
                -> set('added',time())
                -> set('updated',time())
                -> set('author',(int)$_SESSION['irxi_db_auth']['id'])
                -> make(false);          
      }) -> flow('!realestate!location!all',function($f) {$f
                -> select('locations')
                -> add('districts','id','locations.district_id')
                -> add('users','id','locations.author','author')
                -> add('users','id','locations.manager','manager')
                -> add('cities','id','districts.city_id')
                -> get('locations','id')
                -> get('locations','type')                
                -> get('locations','name')
                -> get('locations','lat')
                -> get('locations','lng')
                -> get('locations','to_sea_t')
                -> get('locations','to_sea')
                -> get('locations','to_sea')
                -> get('locations','to_shop')
                -> get('locations','road_type')
                -> get('locations','mountan')
                -> get('locations','description')
                -> get('locations','contact_name')
                -> get('locations','contact_phone')
                -> get('locations','contact_description')              
                -> get('author','surname','author_surname')
                -> get('author','family','author_family')
                -> get('manager','surname','manager_surname')
                -> get('manager','id','manager')
                -> get('manager','family','manager_family')
                -> get('cities','city_name')
                -> get('districts','name','district_name')
                -> get('districts','id','district_id')
                -> where_enabled()  
                -> make(false);     
      }) -> flow('!realestate!buildings!get',function($f) {$f
                -> select('buildings')
                -> get('buildings','id')
                -> get('buildings','location_id')
                -> get('buildings','count')
                -> get('buildings','price_mode')
                -> get('buildings','price_day_h')
                -> get('buildings','price_day_m')
                -> get('buildings','price_day_l')
                -> get('buildings','price_week_h')
                -> get('buildings','price_week_m')
                -> get('buildings','price_week_l')
                -> get('buildings','price_month_h')
                -> get('buildings','price_month_m')
                -> get('buildings','price_month_l')
                -> get('buildings','type')
                -> get('buildings','name')
                -> get('buildings','floors')
                -> get('buildings','description')
                -> get('buildings','description_int')
                -> get('buildings','opt_pool')
                -> get('buildings','opt_security')
                -> get('buildings','opt_internet')
                -> get('buildings','opt_dishes')
                -> get('buildings','opt_territory')              
                -> get('buildings','opt_cleaning')
                -> get('buildings','opt_kitchen')              
                -> get('buildings','opt_safe')
                -> get('buildings','opt_washer')              
                -> get('buildings','opt_refrigerator')
                -> get('buildings','opt_microwave')              
                -> get('buildings','opt_stove')
                -> get('buildings','wearout')
                -> get('buildings','added')              
                -> get('buildings','updated')
                -> where('buildings.location_id=','location_id',true)              
                -> where_enabled()  
                -> make(false);
      }) -> flow('!realestate!buildings',function($f) {$f
                -> update('buildings')
                -> key('id')
                -> set('updated',time())
                -> make(false);     
      }) -> flow('!realestate!buildings!add',function($f) {$f
                -> insert('buildings')
                -> set('enabled',1)
                -> set('added',time())
                -> set('updated',time())
                -> set('author_id',(int)$_SESSION['irxi_db_auth']['id'])
                -> make(false);     
      }) -> flow('!realestate!building_rooms!get',function($f) {$f
                -> select('building_rooms')
                -> get('building_rooms','id')
                -> get('building_rooms','building_id')
                -> get('building_rooms','type')
                -> get('building_rooms','floor')
                -> get('building_rooms','square')
                -> get('building_rooms','x')
                -> get('building_rooms','y')
                -> get('building_rooms','windows')
                -> get('building_rooms','doors')
                -> get('building_rooms','opt_tv')
                -> get('building_rooms','opt_conditioner')              
                -> get('building_rooms','photos')
                -> get('building_rooms','description')
                -> get('building_rooms','furniture')
                -> get('building_rooms','added')
                -> get('building_rooms','updated')
                -> where('building_rooms.building_id=','building_id',true)              
                -> where_enabled()  
                -> make(false);
      }) -> flow('!realestate!building_rooms',function($f) {$f
                -> update('building_rooms')
                -> key('id')
                -> set('updated',time())
                -> make(false); 
      }) -> flow('!realestate!building_rooms!add',function($f) {$f
                -> insert('building_rooms')
                -> set('enabled',1)
                -> set('added',time())
                -> set('updated',time())
                -> make(false);         
      }) -> flow('!districts!all',function($f) {$f
                -> select('districts')
                -> add('cities','id','districts.city_id')
                -> get('districts','id')
                -> get('districts','name','district_name')                
                -> get('cities','city_name')
                -> where_enabled()  
                -> make(false);
      }) -> flow('!users!all',function($f) {$f
                -> select('users')
                -> exclude('password')              
                -> make(false);
      }) -> flow('!finance!journals!all',function($f) {$f
                -> select('finance_journals')
                -> add('users','id','finance_journals.manager_id','manager')
                -> get('finance_journals','id')
                -> get('finance_journals','name')
                -> get('finance_journals','manager_id')
                -> get('finance_journals','type')
                -> get('finance_journals','desription')
                -> get('manager','surname','manager_surname')
                -> get('manager','family','manager_family')
                -> where_enabled()  
                -> make(false);        
      }) -> flow('!finance!operations!all',function($f) {$f
                -> select('finance_operations')
                -> add('users','id','finance_operations.author_id','author')
                -> get('finance_operations','id')
                -> get('finance_operations','jid')
                -> get('finance_operations','type')
                -> get('finance_operations','author_id')
                -> get('finance_operations','summ')
                -> get('finance_operations','description')
                -> get('finance_operations','date')
                -> get('author','surname','author_surname')
                -> get('author','family','author_family')
                -> where('finance_operations.jid=','jid',true)
                -> where_enabled()  
                -> make(false);              
       }) -> flow('!finance!operations!add',function($f) {$f
                -> insert('finance_operations')
                -> set('enabled','1')
                -> set('date',time())
                -> set('author_id',(int)$_SESSION['irxi_db_auth']['id'])
                -> make(false); 
      }) -> flow('*',function($f) {$f
            -> page('htmls/index.html');
      }) -> make();