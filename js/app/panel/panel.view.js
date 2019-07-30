/* TopTai.ru EMS front-end application
 * http://visuallogic.iraxis.ru/
 * 
 * Copyright 2013, TopTai llc.
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */

irixui.router.AddView('panel', [
    {
        ui: 'header',
        name: 'header',
        logo: {url: '/img/toptaiems_mini.png', alt: 'TopTai EMS'}
    }, {
        ui: 'content',
        name: 'page',
        menu: {
            items: [
                {
                    text: 'Заказы',
                    name: 'mmOreders',
                    icon: 'tasks',
                    sub: [{
                            text: 'Архив',
                            icon: 'time',
                            name: 'mmOredersArchive'
                        }]
                },
                {
                    text: 'Клиенты',
                    name: 'mmCustomers',
                    icon: 'group'
                },
                {
                    text: 'Недвижимость',
                    icon: 'home',
                    name: 'mmRealEstate',
                    active: true,
                    sub: [{
                            text: 'Аренда',
                            icon: 'book',
                            name: 'mmRealEstateRent'
                        }, {
                            text: 'Продажа',
                            icon: 'money',
                            name: 'mmRealEstateSell'
                        }, {
                            text: 'В управлении',
                            icon: 'legal',
                            name: 'mmRealEstateManagement'
                        }, {
                            text: 'База данных',
                            icon: 'map-marker',
                            name: 'mmRealEstateBD'
                        }]
                }
                , {
                    text: 'Транспорт',
                    name: 'mmTransport',
                    icon: 'truck',
                    sub: [{
                            text: 'Аренда',
                            icon: 'book',
                            name: 'mmTransportRent'
                        }, {
                            text: 'Продажа',
                            icon: 'money',
                            name: 'mmTransportSell'
                        }, {
                            text: 'Трансферт',
                            icon: 'truck',
                            name: 'mmTransefert'
                        }]
                }, {
                    text: 'События',
                    name: 'mmEvents',
                    icon: 'glass'
                }, {
                    text: 'Финансы',
                    name: 'mmFinance',
                    icon: 'money'
                }, {
                    text: 'Портал',
                    name: 'mmPortal',
                    icon: 'globe',
                    sub: [{
                            text: 'Социальные сети',
                            name: 'mmSocialNetworks',
                            icon: 'bullhorn'
                        }, {
                            text: 'Статьи',
                            icon: 'edit',
                            name: 'mmArticles'
                        }, {
                            text: 'База Знаний',
                            icon: 'star',
                            name: 'mmKB'
                        }, {
                            text: 'Почта',
                            icon: 'envelope',
                            name: 'mmMail'
                        }]
                }, {
                    text: 'Call-центр',
                    name: 'mmCallCenter',
                    icon: 'phone'
                },
                {
                    text: 'Статистика',
                    name: 'mmStatistics',
                    icon: 'bar-chart'
                }
            ]
        },
        copyright: {
            year: '2013',
            text: 'TopTai plc., Ko Samui, Thailand'
        },
        pages: {
            mmOreders: [{
                    ui: 'block',
                    title: 'Заказы',
                    path: [{text: 'Заказы'}],
                    name: 'frmOreders',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmOredersArchive: [{
                    ui: 'block',
                    title: 'Архив заказов',
                    path: [{text: 'Заказы'}, {text: 'Архив'}],
                    name: 'frmOredersArchive',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmCustomers: [{
                    ui: 'block',
                    title: 'Клиенты',
                    path: [{text: 'Клиенты'}],
                    name: 'frmCustomers',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmRealEstate: [{
                    ui: 'block',
                    title: 'Недвижимость',
                    path: [{text: 'Недвижимость'}],
                    name: 'frmRealEstate',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmRealEstateRent: [{
                    ui: 'block',
                    title: 'Аренда недвижимости',
                    path: [{text: 'Недвижимость'}, {text: 'Аренда'}],
                    name: 'frmRealEstateRent',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmRealEstateSell: [{
                    ui: 'block',
                    title: 'Продажа недвижимости',
                    path: [{text: 'Недвижимость'}, {text: 'Продажа'}],
                    name: 'frmRealEstateSell',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmRealEstateManagement: [{
                    ui: 'block',
                    title: 'Недвижимость в управлении',
                    path: [{text: 'Недвижимость'}, {text: 'В управлении'}],
                    name: 'frmRealEstateManagement',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmRealEstateBD: [{
                    ui: 'block',
                    title: 'Управлениение базой данных',
                    path: [{text: 'Недвижимость'}, {text: 'База данных'}],
                    name: 'frmRealEstateBD',
                    content: [{
                            ui: 'portlet',
                            title: 'Общая карта',
                            icon: 'map-marker',
                            content: [{
                                    ui: 'map',
                                    name: 'mapLocationList',
                                    setup: {lat: 9.494306, lng: 99.998792, zoom: 13, mode: 'hybrid'},
                                    showWhereI: true,
                                    draggable: false,
                                    showDragControl: true,
                                    markers: 're_locations!/markers'
                                }]
                        }, {
                            ui: 'portlet',
                            title: 'Объекты',
                            icon: 'screenshot',
                            content: [
                                {
                                    ui: 'table',
                                    name: 'tblLocationList',
                                    columns: {
                                        city_name: {title: 'Остров', width: 80, hidden_phone: true},
                                        district_name: {title: 'Район', width: 100, hidden_480: true},
                                        name: {title: 'Название'},
                                        type: {title: 'Тип', width: 100, algin: 'center', hidden_tablet: true},
                                        geo: {title: 'На карте', width: 80, algin: 'center', type: 'button', btn_icon: 'pushpin', color: 'blue', text: ' Показать'},
                                        to_sea: {title: 'До моря', width: 120, hidden_phone: true},
                                        road_type: {title: 'Дорога', width: 160, hidden_phone: true, hidden_tablet: true},
                                        mountan: {title: 'В горах?', width: 70, algin: 'center', hidden_phone: false, hidden_tablet: true},
                                        manager_f: {title: 'Ответственный', width: 100, hidden_480: true},
                                        id: {title: {type: 'button', btn_icon: 'plus', text: ' Добавить', color: 'green'}, type: 'button', btn_icon: 'pencil', width: 120, algin: 'center', text: ' Изменить'}
                                    },
                                    rows: 're_locations'
                                }
                            ]
                        }]
                }],
            mmRealEstateBDLocation: [{
                    ui: 'block',
                    title: 'Редактирование локации',
                    path: [],
                    content: [{
                            ui: 'portlet',
                            title: 'Навигация',
                            icon: 'map-marker',
                            content: [{
                                    ui: 'map',
                                    name: 'mapLocationElement',
                                    setup: {lat: 9.494306, lng: 99.998792, zoom: 15, mode: 'hybrid'},
                                    showWhereI: true,
                                    draggable: false,
                                    showDragControl: true,
                                    marker: 're_locations/current_marker'
                                }]
                        }, {
                            ui: 'portlet',
                            title: 'Недвижимость локации',
                            icon: 'home',
                            name: 'tblLocationBuildingsList_block',
                            content: [{
                                    ui: 'table',
                                    name: 'tblLocationBuildingsList',
                                    columns: {
                                        type: {title: 'Тип', width: 100},
                                        name: {title: 'Название'},
                                        floors: {title: 'Этажей'},
                                        price_text: {title: 'Стоимость'},
                                        updated_text: {title: 'Обновленно'},
                                        id: {title: {type: 'button', btn_icon: 'plus', text: ' Добавить', color: 'green'}, type: 'button', btn_icon: 'pencil', width: 120, algin: 'center', text: ' Изменить'}
                                    },
                                    rows: 're_buildings/table'
                                }]
                        }, {
                            ui: 'portlet',
                            title: 'Локация',
                            icon: 'screenshot',
                            content: [{
                                    ui: 'form',
                                    name: 'frmRealEstateBDLocation',
                                    key: 'id',
                                    fill: 're_locations/current',
                                    content: [{
                                            ui: 'fieldset',
                                            content: [{
                                                    ui: 'select',
                                                    field: 'type',
                                                    title: 'Вид',
                                                    load: '#re_locations/type'
                                                }, {
                                                    ui: 'input',
                                                    field: 'name',
                                                    title: 'Навзание'
                                                }, {
                                                    ui: 'select',
                                                    field: 'district_id',
                                                    title: 'Остров / район',
                                                    load: 'districts'
                                                }, {
                                                    ui: 'select',
                                                    field: 'road_type',
                                                    title: 'Дорога',
                                                    load: '#re_locations/road_type'
                                                }, {
                                                    ui: 'select',
                                                    field: 'to_sea_t',
                                                    title: 'До моря, словами',
                                                    load: '#re_locations/to_sea_t'
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'to_sea',
                                                    title: 'До моря, расстояние',
                                                    tag: 'м',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'to_shop',
                                                    title: 'До магазина, расстояние',
                                                    tag: 'м',
                                                    integer: true
                                                }, {
                                                    ui: 'select',
                                                    field: 'mountan',
                                                    title: 'Горы',
                                                    load: '#re_locations/mountan'
                                                }, {
                                                    ui: 'select',
                                                    field: 'manager',
                                                    title: 'Ответственный',
                                                    field_text: 'fullname_position',
                                                    load: 'users'
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 5,
                                                    title: 'Описание',
                                                    field: 'description'
                                                }, {
                                                    ui: 'input',
                                                    field: 'contact_name',
                                                    title: 'Контакты, имя'
                                                }, {
                                                    ui: 'input',
                                                    field: 'contact_phone',
                                                    title: 'Контакты, телефон'
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 5,
                                                    field: 'contact_description',
                                                    title: 'Контакты, описание'
                                                }, {
                                                    ui: 'input',
                                                    size: 'medium',
                                                    name: 'inRealEstateBDLocation_lat',
                                                    field: 'lat',
                                                    title: 'Координаты, широта',
                                                    tag: 'º',
                                                    readonly: true
                                                }, {
                                                    ui: 'input',
                                                    size: 'medium',
                                                    field: 'lng',
                                                    name: 'inRealEstateBDLocation_lng',
                                                    title: 'Координаты, догота',
                                                    tag: 'º',
                                                    readonly: true
                                                }
                                            ]
                                        }, {
                                            ui: 'form_actions',
                                            content: [
                                                {
                                                    name: 'frmRealEstateBDLocation_btnSave',
                                                    ui: 'button',
                                                    icon: 'save',
                                                    caption: 'Сохранить',
                                                    color: 'green',
                                                    algin_right: true
                                                }, {
                                                    name: 'frmRealEstateBDLocation_btnBack',
                                                    ui: 'button',
                                                    icon: 'chevron-left',
                                                    caption: 'Назад',
                                                    color: 'black',
                                                    separator_right: true,
                                                    algin_right: true
                                                }
                                            ]
                                        }]
                                }]
                        }]
                }],
            mmRealEstateBDLocationBuilding: [{
                    ui: 'block',
                    title: 'Редактирование строения',
                    name: 'blkRealEstateBDLocationBuilding',
                    path: [],
                    content: [{
                            ui: 'portlet',
                            title: 'Комнаты строения',
                            icon: 'home',
                            name: 'tblLocationBuildingsListRooms_block',
                            content: [{
                                    ui: 'table',
                                    name: 'tblLocationBuildingsListRooms',
                                    columns: {
                                        type: {title: 'Тип', width: 150},
                                        floor: {title: 'Этаж', algin: 'center', width: 70},
                                        description: {title: 'Описание'},
                                        windows: {title: 'Окон', algin: 'center', width: 70},
                                        square: {title: 'Площадь', algin: 'center', width: 70},
                                        x: {title: 'Длинна', algin: 'center', width: 70},
                                        y: {title: 'Ширина', algin: 'center', width: 70},
                                        opt_conditioner: {title: 'Кондиционер', algin: 'center', width: 70},
                                        id: {title: {type: 'button', btn_icon: 'plus', text: ' Добавить', color: 'green'}, type: 'button', btn_icon: 'pencil', width: 120, algin: 'center', text: ' Изменить'}
                                    },
                                    rows: 're_building_rooms/table'
                                }]
                        }, {
                            ui: 'portlet',
                            title: 'Строение',
                            icon: 'screenshot',
                            content: [{
                                    ui: 'form',
                                    name: 'frmRealEstateBDLocationBuilding',
                                    key: 'id',
                                    fill: 're_buildings/form',
                                    content: [{
                                            ui: 'fieldset',
                                            content: [{
                                                    ui: 'select',
                                                    field: 'type',
                                                    title: 'Вид',
                                                    load: '#re_buildings/type'
                                                }, {
                                                    ui: 'input',
                                                    field: 'name',
                                                    title: 'Навзание'
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'floors',
                                                    title: 'Этажей',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'count',
                                                    title: 'Количество',
                                                    integer: true
                                                }, {
                                                    ui: 'select',
                                                    field: 'price_mode',
                                                    title: 'Показывать стоимость',
                                                    load: '#re_buildings/price_mode'
                                                }, {
                                                    ui: 'select',
                                                    field: 'wearout',
                                                    title: 'Износ',
                                                    load: '#re_buildings/wearout'
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_day_h',
                                                    size: 'medium',
                                                    title: 'За день, выс. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_day_m',
                                                    size: 'medium',
                                                    title: 'За день, ср. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_day_l',
                                                    size: 'medium',
                                                    title: 'За день, низ. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_week_h',
                                                    size: 'medium',
                                                    title: 'За неделю, выс. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_week_m',
                                                    size: 'medium',
                                                    title: 'За неделю, ср. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_week_l',
                                                    size: 'medium',
                                                    title: 'За неделю, низ. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_month_h',
                                                    size: 'medium',
                                                    title: 'За месяц, выс. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_month_m',
                                                    size: 'medium',
                                                    title: 'За месяц, ср. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    field: 'price_month_l',
                                                    size: 'medium',
                                                    title: 'За месяц, низ. сезон',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_territory',
                                                    title: 'Территория',
                                                    load: '#re_buildings/opt_territory'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_pool',
                                                    title: 'Бассейн',
                                                    load: '#re_buildings/opt_pool'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_security',
                                                    title: 'Безопасность',
                                                    load: '#re_buildings/opt_security'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_safe',
                                                    title: 'Сейф',
                                                    load: '#re_buildings/opt_safe'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_internet',
                                                    title: 'Интернет',
                                                    load: '#re_buildings/opt_internet'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_cleaning',
                                                    title: 'Уборка/Смена белья',
                                                    load: '#re_buildings/opt_cleaning'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_kitchen',
                                                    title: 'Кухня',
                                                    load: '#re_buildings/opt_kitchen'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_dishes',
                                                    title: 'Посуда',
                                                    load: '#re_buildings/opt_dishes'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_washer',
                                                    title: 'Стиральная машина',
                                                    load: '#re_buildings/opt_washer'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_refrigerator',
                                                    title: 'Холодильник',
                                                    load: '#re_buildings/opt_refrigerator'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_microwave',
                                                    title: 'Микроволновка',
                                                    load: '#re_buildings/opt_microwave'
                                                }, {
                                                    ui: 'select',
                                                    field: 'opt_stove',
                                                    title: 'Плита',
                                                    load: '#re_buildings/opt_stove'
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 5,
                                                    title: 'Описание',
                                                    field: 'description'
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 5,
                                                    title: 'Описание (непубл.)',
                                                    field: 'description_int'
                                                }, {
                                                    ui: 'var',
                                                    data: 're_buildings/location_id',
                                                    field: 'location_id'
                                                }
                                            ]
                                        }, {
                                            ui: 'form_actions',
                                            content: [
                                                {
                                                    name: 'frmRealEstateBDLocationBuilding_btnSave',
                                                    ui: 'button',
                                                    icon: 'save',
                                                    caption: 'Сохранить',
                                                    color: 'green',
                                                    algin_right: true
                                                }, {
                                                    name: 'frmRealEstateBDLocationBuilding_btnBack',
                                                    ui: 'button',
                                                    icon: 'chevron-left',
                                                    caption: 'Назад',
                                                    color: 'black',
                                                    separator_right: true,
                                                    algin_right: true
                                                }
                                            ]
                                        }]
                                }]
                        }]
                }],
            mmRealEstateBDLocationBuildingRoom: [{
                    ui: 'block',
                    title: 'Редактирование команты',
                    path: [],
                    content: [{
                            ui: 'portlet',
                            title: 'Строение',
                            icon: 'screenshot',
                            content: [{
                                    ui: 'form',
                                    name: 'frmRealEstateBDLocationBuildingRoom',
                                    key: 'id',
                                    fill: 're_building_rooms/form',
                                    content: [{
                                            ui: 'fieldset',
                                            content: [{
                                                    ui: 'select',
                                                    field: 'type',
                                                    title: 'Вид',
                                                    load: '#re_building_rooms/type'
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'floor',
                                                    title: 'Этаж',
                                                    integer: true
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 2,
                                                    title: 'Фотографии',
                                                    readonly:true,
                                                    field: 'photos'
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'square',
                                                    title: 'Площадь',
                                                    tag: 'м²',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'x',
                                                    title: 'Длинна',
                                                    tag: 'м',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'y',
                                                    title: 'Ширина',
                                                    tag: 'м',
                                                    integer: true
                                                }, {
                                                    ui: 'input',
                                                    size: 'small',
                                                    field: 'windows',
                                                    title: 'Окон',
                                                    integer: true
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 2,
                                                    title: 'Двери',
                                                    readonly:true,
                                                    field: 'doors'
                                                },{
                                                    ui: 'select',
                                                    field: 'opt_conditioner',
                                                    title: 'Кондиционер',
                                                    load: '#re_building_rooms/opt_conditioner'
                                                },{
                                                    ui: 'select',
                                                    field: 'opt_tv',
                                                    title: 'Телевизор',
                                                    load: '#re_building_rooms/opt_tv'
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 5,
                                                    title: 'Описание',
                                                    field: 'description'
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 5,
                                                    title: 'Мебель',
                                                    field: 'furniture'
                                                }, {
                                                    ui: 'var',
                                                    data: 're_building_rooms/building_id',
                                                    field: 'building_id'
                                                }
                                            ]
                                        }, {
                                            ui: 'form_actions',
                                            content: [
                                                {
                                                    name: 'frmRealEstateBDLocationBuildingRoom_btnSave',
                                                    ui: 'button',
                                                    icon: 'save',
                                                    caption: 'Сохранить',
                                                    color: 'green',
                                                    algin_right: true
                                                }, {
                                                    name: 'frmRealEstateBDLocationBuildingRoom_btnBack',
                                                    ui: 'button',
                                                    icon: 'chevron-left',
                                                    caption: 'Назад',
                                                    color: 'black',
                                                    separator_right: true,
                                                    algin_right: true
                                                }
                                            ]
                                        }]
                                }]
                        }]
                }],
            mmTransport: [{
                    ui: 'block',
                    title: 'Транспортные услуги',
                    path: [{text: 'Транспорт'}],
                    name: 'frmTransport',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmTransportRent: [{
                    ui: 'block',
                    title: 'Аренда транспорта',
                    path: [{text: 'Транспорт'}, {text: 'Аренда'}],
                    name: 'frmTransportRent',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmTransportSell: [{
                    ui: 'block',
                    title: 'Продажа транспорта',
                    path: [{text: 'Транспорт'}, {text: 'Продажа'}],
                    name: 'frmRealEstate',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmTransefert: [{
                    ui: 'block',
                    title: 'Трансферт',
                    path: [{text: 'Транспорт'}, {text: 'Трансферт'}],
                    name: 'frmTransefert',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmEvents: [{
                    ui: 'block',
                    title: 'События',
                    path: [{text: 'События'}],
                    name: 'frmEvents',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmFinance: [{
                    ui: 'block',
                    title: 'Финансы',
                    path: [{text: 'Финансы'}],
                    content: [{
                            ui: 'portlet',
                            title: 'Журналы учета',
                            icon: 'book',
                            content: [{
                                    ui: 'table',
                                    name: 'tblFinanceJournals',
                                    columns: {
                                        type: {title: 'Тип журнала', width: 120},
                                        name: {title: 'Журнал', width: 200},
                                        desription: {title: 'Описание журнала'},
                                        manager_f: {title: 'Ответственный', width: 140},
                                        id: {title: '', type: 'button', btn_icon: 'eye-open', width: 120, algin: 'center', text: ' Просмотр', color: 'green'}
                                    },
                                    rows: 'finance_journals'
                                }]
                        }]
                }],
            mmFinanceOperations: [{
                    ui: 'block',
                    title: 'Финансы',
                    path: [{text: 'Финансы'}, {text: 'Операции'}],
                    content: [{
                            ui: 'portlet',
                            title: 'Журналы учета',
                            icon: 'book',
                            content: [{
                                    ui: 'table',
                                    name: 'tblFinanceOperations',
                                    columns: {
                                        kind: {title: '', width: 6},
                                        type: {title: 'Тип операции', width: 120},
                                        summ_real_tbl: {title: 'Сумма', width: 120},
                                        description: {title: 'Описание операции'},
                                        author_f: {title: 'Добавил', width: 120},
                                        date_text: {title: 'Когда', width: 120, algin: 'center'},
                                        empty: {title: {type: 'button', btn_icon: 'plus', text: ' Добавить', color: 'green'}, width: 80}
                                    },
                                    managed: {},
                                    rows: 'finance_operations?<jid=curr_jid!/+curr'
                                }, {
                                    ui: 'caption',
                                    data_prefix: 'Итого остаток: ',
                                    data: 'finance_operations?<jid=curr_jid!/calc_summ',
                                    data_postfix: ' батт',
                                    font_size: '1.1em'
                                }]
                        }]
                }],
            mmFinanceOperationAdd: [{
                    ui: 'block',
                    title: 'Финансы',
                    path: [{text: 'Финансы'}, {text: 'Операции'}, {text: 'Добавление'}],
                    content: [{
                            ui: 'portlet',
                            title: 'Журналы учета',
                            icon: 'book',
                            content: [{
                                    ui: 'form',
                                    name: 'frmFinanceOperationAdd',
                                    key: 'id',
                                    fill: 'finance_operations/newel',
                                    content: [{
                                            ui: 'fieldset',
                                            content: [{
                                                    ui: 'select',
                                                    field: 'type',
                                                    title: 'Тип',
                                                    load: '#finance_operations/type'
                                                }, {
                                                    ui: 'input',
                                                    field: 'summ',
                                                    size: 'medium',
                                                    title: 'Сумма',
                                                    tag: 'бат',
                                                    integer: true
                                                }, {
                                                    ui: 'textarea',
                                                    size: 'large',
                                                    rows: 5,
                                                    title: 'Описание',
                                                    field: 'description'
                                                }, {
                                                    ui: 'var',
                                                    data: 'finance_operations/curr_jid',
                                                    field: 'jid'
                                                }
                                            ]
                                        }, {
                                            ui: 'form_actions',
                                            content: [
                                                {
                                                    name: 'frmFinanceOperationAdd_btnSave',
                                                    ui: 'button',
                                                    icon: 'save',
                                                    caption: 'Сохранить',
                                                    color: 'green',
                                                    algin_right: true
                                                }, {
                                                    name: 'frmFinanceOperationAdd_btnBack',
                                                    ui: 'button',
                                                    icon: 'chevron-left',
                                                    caption: 'Назад',
                                                    color: 'black',
                                                    separator_right: true,
                                                    algin_right: true
                                                }
                                            ]
                                        }]
                                }]
                        }]
                }],
            mmPortal: [{
                    ui: 'block',
                    title: 'Портал',
                    path: [{text: 'Портал'}],
                    name: 'frmPortal',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmSocialNetworks: [{
                    ui: 'block',
                    title: 'Управление социальныит сетями',
                    path: [{text: 'Портал'}, {text: 'Социальные сети'}],
                    name: 'frmSocialNetworks',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmArticles: [{
                    ui: 'block',
                    title: 'Управление статьями',
                    path: [{text: 'Портал'}, {text: 'Статьи'}],
                    name: 'frmArticles',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmKB: [{
                    ui: 'block',
                    title: 'Управление Базой Знаний',
                    path: [{text: 'Портал'}, {text: 'База Знаний'}],
                    name: 'frmKB',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmMail: [{
                    ui: 'block',
                    title: 'Почта',
                    path: [{text: 'Портал'}, {text: 'Почта'}],
                    name: 'frmMail',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmCallCenter: [{
                    ui: 'block',
                    title: 'Call-центр',
                    path: [{text: 'Call-центр'}],
                    name: 'frmCallCenter',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }],
            mmStatistics: [{
                    ui: 'block',
                    title: 'Статистика',
                    path: [{text: 'Статистика'}],
                    name: 'frmStatistics',
                    content: [{
                            ui: 'alert',
                            type: 'warning',
                            text: '<strong>Внимание!</strong> Страница временно не работает!',
                            close: false
                        }]
                }]
        },
        content: []
    }
]);