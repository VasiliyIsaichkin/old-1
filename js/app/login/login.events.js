/* TopTai.ru EMS front-end application
 * http://visuallogic.iraxis.ru/
 * 
 * Copyright 2013, TopTai llc.
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */

irixui.router.AddEvents('login', {
    btnLogin: {
        onClick: {
            post: {
                url: '/!login',
                send: ['user', 'password'],
                events: {
                    onResultError: {
                        validate: {
                            kind: 'error',
                            target: 'password',
                            clear: true,
                            message: 'Неверный пароль',
                            shake: 'btnLogin'
                        }
                    },
                    onResultOk: [{
                            validate: {
                                target: 'password',
                                kind: 'success',
                                message: 'Авторизация успешна',
                                delay: 1000
                            }
                        }, {
                            fn: function(ctx, result) {
                                ctx.DX('user', result.data);
                                toLog('Login successful [' + ctx.DX('user/fullname') + ']');
                                ctx.Open('panel');
                            }
                        }
                    ]
                }
            }
        }
    },
    password: {
        onEnter: {
            call: {btnLogin: 'onClick'}
        }
    },
    user: {
        onEnter: {
            call: {btnLogin: 'onClick'}
        }
    }
});