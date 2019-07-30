/* TopTai.ru EMS front-end application
 * http://visuallogic.iraxis.ru/
 * 
 * Copyright 2013, TopTai llc.
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */

irixui.data.AddModel({
    re_locations: {
        server: {
            get: 'realestate!location!all',
            add: 'realestate!location!add',
            update: 'realestate!location'
        },
        override: {
            type: {
                _$: 'Неизвестно',
                1: 'Дом',
                3: 'Вилла',
                4: 'Ресорт',
                5: 'Отель',
                6: 'Аппартаменты',
                7: 'Кондо',
                8: 'Гестхаус',
                9: 'Поселок'
            },
            to_sea_t: {
                _$: 'Неизвестно',
                1: 'На пляже',
                2: 'Пара минут пешком',
                3: 'Пешком',
                4: 'На транспорте',
                5: 'В горах',
                6: 'Далеко'
            },
            road_type: {
                _$: 'Неизвестно',
                1: 'Майн роад',
                2: 'Асфальт',
                3: 'Бетон',
                4: 'Бетон, плохой',
                5: 'Бетон, горы',
                6: 'Бетон, серьезные горы',
                7: 'Гравий',
                8: 'Гравий плохой',
                9: 'Гравий, горы',
                10: 'Гравий, серьезные горы',
                11: 'Очень плохая',
                12: 'Опасная'
            },
            mountan: {
                _$: 'Неизвестно',
                0: 'Нет',
                1: 'Да'
            },
            geo: function(v) {
                return v('id');
            },
            to_sea: function(v) {
                return v('to_sea_t') + ' (' + v('to_sea') + ' м)';
            },
            to_shop: function(v) {
                return v('to_shop') + ' м';
            },
            author: function(v) {
                return v('author_family') + ' ' + v('author_surname').first() + '.';
            },
            manager_f: function(v) {
                return v('manager_family') + ' ' + v('manager_surname').first() + '.';
            }
        },
        tables: {
            markers: {
                lat: true,
                lng: true,
                id: true,
                title: 're_locations?id=%%id%%/name'
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
    },
    re_buildings: {
        server: {
            add: 'realestate!buildings!add',
            update: 'realestate!buildings',
            get: 'realestate!buildings!get'
        },
        override: {
            type: {
                1: 'Вилла',
                2: 'Апартаменты',
                3: 'Комната(ы)',
                4: 'Бунагало',
                5: 'Дом',
                6: 'Отдельностоящий дом',
                7: 'Номер'
            },
            opt_pool: {
                1: 'Нет',
                2: 'Приватный, маленький',
                3: 'Приватный, средний',
                4: 'Приватный, большой',
                5: 'Общий, маленький',
                6: 'Общий, средний',
                7: 'Общий, большой',
                8: 'Детский'
            },
            opt_security: {
                1: 'Нет',
                2: 'Охранник',
                3: 'Сигнализация',
                4: 'Комплексная'
            },
            opt_internet: {
                1: 'Нет',
                2: 'Плохой',
                3: 'Хороший',
                4: 'Отличный'
            },
            opt_dishes: {
                1: 'Нет',
                2: 'Две персоны',
                3: 'Несколько человек',
                4: 'Много'
            },
            opt_territory: {
                1: 'Нет',
                2: 'Общая',
                3: 'Своя, маленькая',
                4: 'Своя, большая'
            },
            opt_cleaning: {
                1: 'Нет',
                2: 'Включенна в стоимость',
                3: 'За деньги'
            },
            opt_kitchen: {
                1: 'Нет',
                2: 'Минимальная',
                3: 'Полностью оборудованная'
            },
            opt_safe: {
                1: 'Нет', 2: 'Да'
            },
            opt_washer: {
                1: 'Нет',
                2: 'Да'
            },
            opt_refrigerator: {
                1: 'Нет',
                2: 'Да'
            },
            opt_microwave: {
                1: 'Нет',
                2: 'Да'
            },
            opt_stove: {
                1: 'Нет',
                2: 'Газовая с балоном',
                3: 'Газовая с балоном и духовкой',
                4: 'Газовая протативная',
                5: 'Электрическая',
                6: 'Электрическая маленькая',
                7: 'Электрическая с духовкой'
            },
            price_mode: {
                1: 'День',
                2: 'День+Неделя',
                3: 'День+Месяц',
                4: 'День+Неделя+Месяц',
                5: 'Неделя',
                6: 'Неделя+Месяц',
                7: 'Месяц'
            },
            wearout: {
                1: 'Новый',
                2: 'Обжитый',
                3: 'Небольшой',
                4: 'Средний',
                5: 'Сильный',
                6: 'Развалюха',
            },
            updated_text: function(v) {
                return  Date.create(parseInt(v('updated')) * 1000, 'ru').format('{dd}.{MM}.{yy} {24hr}:{mm}');
            },
            price_text: function(v) {
                var pm = parseInt(v('price_mode', true));
                var vres = '';
                var day = 0;
                var day_s = '';
                if (parseInt(v('price_day_h')) > 0) {
                    day = parseInt(v('price_day_h'));
                    day_s = ' выс. сезон';
                } else if (parseInt(v('price_day_m')) > 0) {
                    day = parseInt(v('price_day_m'));
                    day_s = ' ср. сезон';
                } else if (parseInt(v('price_day_l')) > 0) {
                    day = parseInt(v('price_day_l'));
                    day_s = ' низк. сезон';
                }

                var week = 0;
                var week_s = '';
                if (parseInt(v('price_week_h')) > 0) {
                    week = parseInt(v('price_week_h'));
                    week_s = ' выс. сезон';
                } else if (parseInt(v('price_week_m')) > 0) {
                    week = parseInt(v('price_week_m'));
                    week_s = ' ср. сезон';
                } else if (parseInt(v('price_week_l')) > 0) {
                    week = parseInt(v('price_week_l'));
                    week_s = ' низк. сезон';
                }
                var month = 0;
                var month_s = '';
                if (parseInt(v('price_month_h')) > 0) {
                    month = parseInt(v('price_month_h'));
                    month_s = ' выс. сезон';
                } else if (parseInt(v('price_month_m')) > 0) {
                    month = parseInt(v('price_month_m'));
                    month_s = ' ср. сезон';
                } else if (parseInt(v('price_month_l')) > 0) {
                    month = parseInt(v('price_month_l'));
                    month_s = ' низк. сезон';
                }
                if (pm === 1) {
                    if (day > 0) {
                        vres = vres + 'День: ' + day + day_s + '<BR>';
                    }
                } else if (pm === 2) {
                    if (day > 0) {
                        vres = vres + 'День: ' + day + day_s + '<BR>';
                    }
                    if (week > 0) {
                        vres = vres + 'Неделя: ' + week + week_s + '<BR>';
                    }

                } else if (pm === 3) {
                    if (day > 0) {
                        vres = vres + 'День: ' + day + day_s + '<BR>';
                    }
                    if (month > 0) {
                        vres = vres + 'Месяц: ' + month + month_s + '<BR>';
                    }
                } else if (pm === 4) {
                    if (day > 0) {
                        vres = vres + 'День: ' + day + day_s + '<BR>';
                    }
                    if (week > 0) {
                        vres = vres + 'Неделя: ' + week + week_s + '<BR>';
                    }
                    if (month > 0) {
                        vres = vres + 'Месяц: ' + month + month_s + '<BR>';
                    }
                } else if (pm === 5) {
                    if (week > 0) {
                        vres = vres + 'Неделя: ' + week + week_s + '<BR>';
                    }
                } else if (pm === 6) {
                    if (week > 0) {
                        vres = vres + 'Неделя: ' + week + week_s + '<BR>';
                    }
                    if (month > 0) {
                        vres = vres + 'Месяц: ' + month + month_s + '<BR>';
                    }
                } else if (pm === 7) {
                    if (month > 0) {
                        vres = vres + 'Месяц ' + month + month_s + '<BR>';
                    }
                }
                if (vres === '') {
                    return  'не установленно';
                } else {
                    return vres.substring(0, vres.length - 4);
                }
            }
        }
    },
    re_building_rooms: {
        server: {
            get: 'realestate!building_rooms!get',
            update: 'realestate!building_rooms',
            add: 'realestate!building_rooms!add'                    
        },
        override: {
            type: {
                1: 'Общая комната',
                2: 'Спальня',
                3: 'Ванная',
                4: 'Комната-студия',
                5: 'Туалет',
                6: 'Кухня',
                7: 'Соловая',
                8: 'Прихожая',
                9: 'Спортзал',
                10: 'Балкон/Терраса'
            },
            opt_conditioner: {
                1: 'Нет',
                2: 'Да'
            },
            opt_tv: {
                1: 'Нет',
                2: 'Маленький',
                3: 'Большой',
                4: 'Несколько'
            }
        }
    },
    districts: {
        server: {
            get: 'districts!all'
        },
        override: {
            title: function(v) {
                return v('city_name') + ' > ' + v('district_name');
            }
        }
    },
    users: {
        server: {
            get: 'users!all'
        },
        override: {
            'fullname': function(cols) {
                return cols('surname') + ' ' + cols('family');
            },
            'fullname_position': function(cols) {
                return cols('surname') + ' ' + cols('family') + ' / ' + cols('position');
            }
        }
    },
    finance_journals: {
        server: {
            get: 'finance!journals!all'
        },
        override: {
            type: {
                1: 'Оперативный учет',
                2: 'Инвестиции'
            },
            manager_f: function(v) {
                return v('manager_family') + ' ' + v('manager_surname').first() + '.';
            }
        }
    },
    finance_operations: {
        server: {
            get: 'finance!operations!all',
            add: 'finance!operations!add'
        },
        override: {
            type: {
                1: 'Приход - Заказ',
                2: 'Приход - Маржа',
                3: 'Приход - Инвестиции',
                10: 'Расход - По заказу',
                11: 'Расход - З/П',
                12: 'Расход - Возврат'
            },
            author_f: function(v) {
                return v('author_family') + ' ' + v('author_surname').first() + '.';
            },
            date_text: function(v) {
                return  Date.create(parseInt(v('date')) * 1000, 'ru').format('{dd}.{MM}.{yy} {24hr}:{mm}');
            },
            summ_real: function(v) {
                if (parseInt(v('type', true)) > 9) {
                    return parseInt(v('summ')) * -1;
                } else {
                    return parseInt(v('summ'));
                }
            },
            summ_real_tbl: function(v) {
                if (parseInt(v('type', true)) > 9) {
                    return parseInt(v('summ')) * -1 + ' бат';
                } else {
                    return parseInt(v('summ')) + ' бат';
                }
            },
            empty: function() {
                return '';
            },
            kind: function(v) {
                if (parseInt(v('type', true)) > 9) {
                    return '<i class="icon-minus-sign" style="font-size: 13pt; color: #D84A38;"></i>';
                } else {
                    return '<i class="icon-plus-sign" style="font-size: 13pt; color: #35AA47;"></i>';
                }
            }
        },
        services: {
            'calc_summ': function(ctx) {
                var out = 0;
                var trg = ctx.ctx.DX('finance_operations?<jid=curr_jid!');
                if (trg)
                    if (trg.length > 0) {
                        trg.forEach(function(el) {
                            out += el.summ_real;
                        });
                    }
                return out;
            }
        }
    }
});