/* TopTai.ru EMS front-end initializer & loader configuration
 * http://ems.toptai.ru/
 * 
 * Copyright 2013, TopTai plc.
 * Copyright 2012-13, Iraxis llc. / Iridium Research labs.
 * PROHIBITED TO DISTRIBUTE, MODIFY, OR USE SEPARATELY FROM THE SITE EMS.TOPTAI.RU
 */

/** MAIN CONFIGURATION **/
IRIXUI_ILO.config = {
    app_prefix: 'ems',
    pages: [
        'login',
        'panel',
        'unlogin'
    ],
    default_page: 'panel',
    debug: true,
    css: [
        'radiant_xt-fix.css',
        'bootstrap-2.3.1.min.css',
        'bootstrap-2.3.1.responsive.min.css',
        'uniform.default.css',
        'DT_bootstrap.css',
        'imgareaselect.css',
        'font-awesome.min.css',
        'radiant_xt-metro.css',
        'radiant_xt-default.css',
        'radiant_xt-login.css',
        'radiant_xt-responsive.css',
        'radiant_xt.css'
    ],
    jquery: ['/js/libs/jquery/jquery-1.9.1.min.js'],
    js: [
        'jquery/jquery-ui-1.10.1.nv.min.js',
        'jquery/jquery.blockui.js',
        'jquery/jquery.cookie.js',
        'jquery/jquery.pulsate.min.js',
        'jquery/jquery.sparkline.min.js',
        'jquery/jquery.inputmask.bundle.min.js',
        'jquery/jquery.uniform.min.css',
        'jquery/breakpoints.js',
        'sugar/sugar-1.3.9-all.min.js',
        'sugar/sugar.ru.js',
        'data_tables/jquery.dataTables.js',
        'data_tables/DT_bootstrap.js',
        'bootstrap/bootstrap-2.3.1.min.js',
        'GMaps.js'
    ],
    cache_css: false,
    cache_irix: false,
    cache_app: false
};