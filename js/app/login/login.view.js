/* TopTai.ru EMS front-end application
 * http://visuallogic.iraxis.ru/
 * 
 * Copyright 2013, TopTai llc.
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */

irixui.router.AddView('login',[
    {
        ui: 'content',
        style: 'login',
        logo: {url: '/img/toptaiems.png', alt: 'TopTai EMS'},
        name: 'appLogin',
        copyright: {
            year: '2013',
            text: 'TopTai plc., Ko Samui, Thailand'
        },
        content: [{
                ui: 'form',
                title: 'Вход в систему',
                name: 'frmAuth',
                style: 'login',
                content: [
                    {
                        ui: 'input',
                        placeholder: 'Логин',
                        icon: 'user',
                        name: 'user',
                        size: false,
                        max_chars: 36
                    }, {
                        ui: 'input',
                        icon: 'lock',
                        password: true,
                        size: false,
                        placeholder: 'Пароль',
                        name: 'password',
                        max_chars: 36
                    }, {
                        ui: 'form_actions',
                        content: [
                            {
                                name: 'btnLogin',
                                ui: 'button',
                                icon_right: 'circle-arrow-right',
                                position: 'left',
                                caption: 'Вход',
                                color: 'green',
                                algin_right: true
                            }
                        ]
                    }
                ]
            }]
    }
]);
