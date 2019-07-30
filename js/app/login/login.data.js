/* TopTai.ru EMS front-end application
 * http://visuallogic.iraxis.ru/
 * 
 * Copyright 2013, TopTai llc.
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */

irixui.data.AddModel({
    user: {
        server: {
            get: 'islogin'
        },
        override: {
            'avatar-mini': function(cols) {
                return '/storage/avatars/' + cols('user') + '.mini.png';
            },
            'fullname': function(cols) {
                return cols('surname') + ' ' + cols('family');
            }
        },
        services: {
            'check': function(ctx) {
                if (ctx.Renew().Kind() === 'ok') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
});
