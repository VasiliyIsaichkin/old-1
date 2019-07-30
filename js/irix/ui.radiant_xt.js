/* IRIXUI RadiantXT UI-pack
 * http://labs.iraxis.ru/irix/radiantxt
 * Version 0.7.6
 * Good for IRIXUI version 0.7.6
 * 
 * Copyright 2013, Vasiliy Isaichkin
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */
irixui.collections.Register({
    ui_contols: {
        dummy: {
            render: function(ctx) {
                return  '<div id="' + ctx.name + '"></div>';
            }
        },
        header: {
            properties: {
                logo: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('.container-fluid > .brand').remove();
                        if (param !== false) {
                            param.href = param.href || '#';
                            param.url = param.url || '';
                            param.alt = param.alt || '';
                            ctx.find('.container-fluid').prepend('<a class="brand" href="' + param.href + '"><img src="' + param.url + '" alt="' + param.alt + '" /></a>');
                        }
                    }
                },
                menu: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('.container-fluid > .nav').remove();
                        if (param !== false) {
                            ctx.find('.container-fluid').append('<ul class="nav pull-right"></ul>');
                            var target = ctx.find('.container-fluid > .nav');
                            ctx.irix.toArray(param).forEach(function(curr_menu) {
                                if (curr_menu.style === 'user') {
                                    curr_menu.avatar = curr_menu.avatar || false;
                                    curr_menu.text = curr_menu.text || '';
                                    curr_menu.name = curr_menu.name || GUID();
                                    curr_menu.dropdown = curr_menu.dropdown || [];
                                    target.append('<li id="' + curr_menu.name + '" class="dropdown user"></div>');
                                    $('#' + curr_menu.name).append('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="username">' + curr_menu.text + '</span></a>');
                                    if (curr_menu.avatar !== false) {
                                        $('#' + curr_menu.name + ' > A').prepend('<img alt="' + curr_menu.text + '" src="' + curr_menu.avatar + '" />');
                                    }
                                    if (ctx.irix.toArray(curr_menu.dropdown).length !== 0) {
                                        $('#' + curr_menu.name + ' > A').append('<i class="icon-angle-down"></i>');
                                        $('#' + curr_menu.name).append('<ul class="dropdown-menu"></ul>');
                                    }
                                    ctx.irix.toArray(curr_menu.dropdown).forEach(function(dropdown_element) {
                                        dropdown_element.name = dropdown_element.name || GUID();
                                        dropdown_element.text = dropdown_element.text || false;
                                        dropdown_element.icon = dropdown_element.icon || false;
                                        dropdown_element.href = dropdown_element.href || 'javascript:;';
                                        dropdown_element.open = dropdown_element.open || false;
                                        if (dropdown_element.text === false) {
                                            $('#' + curr_menu.name + ' > UL.dropdown-menu').append('<li class="divider"></li>');
                                        } else {
                                            var icon_out = '';
                                            if (dropdown_element.icon !== false) {
                                                icon_out = '<i class="icon-' + dropdown_element.icon + '"></i>';
                                            }
                                            $('#' + curr_menu.name + ' > UL.dropdown-menu').append('<li><a href="' + dropdown_element.href + '">' + icon_out + dropdown_element.text + '</a></li>');
                                            if (dropdown_element.open !== false) {
                                                $('#' + curr_menu.name + ' > UL.dropdown-menu > LI').on('click', function() {
                                                    ctx.irix.Open(dropdown_element.open);
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                },
                fixed_top: {
                    default: true,
                    set: function(ctx, param) {
                        if (param === true) {
                            $('body').addClass('fixed-top');
                            ctx.dom.addClass('navbar-fixed-top');
                        } else {
                            $('body').removeClass('fixed-top');
                            ctx.dom.removeClass('navbar-fixed-top');
                        }
                    }
                }
            },
            render: function(ctx) {
                return  '<div id="' + ctx.name + '" class="header navbar navbar-inverse"><div class="navbar-inner"><div class="container-fluid"><a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse"><img src="/img/menu-toggler.png" alt=""></a></div></div></div>';
            }
        },
        content: {
            child: {'content': '.irix-content'},
            properties: {
                style: {
                    default: 'page',
                    set: function(ctx, param) {
                        if (param === 'login') {
                            $('body').addClass('login');
                            ctx.dom.addClass('content').addClass('content');
                        }
                        if (param === 'page') {
                            ctx.dom.addClass('page-container').addClass('row-fluid');
                            ctx.dom.append('<div class="page-sidebar nav-collapse collapse"></div><div class="page-content"><div class="container-fluid irix-content"></div></div>');
                        }
                    },
                    remove: function(ctx, value) {
                        $('body').removeClass('login');
                    }
                },
                menu: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            ctx.find('.page-sidebar').prepend('<ul></ul>');
                            ctx.find('.page-sidebar > ul').prepend('<li><div class="sidebar-toggler hidden-phone"></div></li>');
                            param.items = param.items || []
                            var menu_first_element = true;
                            ctx.irix.toArray(param.items).forEach(function(menu_item) {
                                menu_item.name = menu_item.name || GUID();
                                menu_item.text = menu_item.text || '';
                                menu_item.icon = menu_item.icon || false;
                                menu_item.href = menu_item.href || 'javascript:;';
                                menu_item.sub = menu_item.sub || [];
                                menu_item.active = menu_item.active || false;
                                var item_icon = '';
                                if (menu_item.icon !== false) {
                                    item_icon = '<i class="icon-' + menu_item.icon + '"></i>';
                                }
                                ctx.find('.page-sidebar > ul').append('<li id="' + menu_item.name + '" class=" "><a href="' + menu_item.href + '">' + item_icon + '<span class="title">' + menu_item.text + '</span><span class="selected"></span></a></li>');
                                if (menu_item.active !== false) {
                                    if (menu_first_element) {
                                        $('#' + menu_item.name).addClass('start');
                                        menu_first_element = false;
                                    }
                                    $('#' + menu_item.name).addClass('active');
                                }
                                if (ctx.irix.toArray(menu_item.sub).length > 0) {
                                    $('#' + menu_item.name).append('<ul class="sub-menu"></ul>');
                                }
                                ctx.irix.toArray(menu_item.sub).forEach(function(sub_el) {
                                    sub_el.href = sub_el.href || 'javascript:;';
                                    sub_el.name = sub_el.name || GUID();
                                    sub_el.icon = sub_el.icon || false;
                                    sub_el.text = sub_el.text || '';
                                    var sel_icon = '';
                                    if (sub_el.icon !== false) {
                                        sel_icon = '<i class="icon-' + sub_el.icon + '"></i>';
                                    }
                                    $('#' + menu_item.name + ' > UL.sub-menu').append('<li id="' + sub_el.name + '" ><a href="' + sub_el.href + '">' + sel_icon + sub_el.text + '</a><li>');
                                });
                            });
                            ctx.find('.page-sidebar > ul > li > a').off('click').on('click', function(e) {
                                e.preventDefault();
                                $('.page-sidebar > ul > li').removeClass('active');
                                $('.sub-menu > li').removeClass('active');
                                $(this).parent().addClass('active');
                            });
                            ctx.find('.sub-menu >  li > a').off('click').on('click', function(e) {
                                e.preventDefault();
                                $('.sub-menu > li').removeClass('active');
                                $(this).parent().addClass('active');
                            });
                        }
                    }
                },
                width: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            ctx.dom.css('width', param + 'px');
                        }
                    }
                },
                logo: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            if (typeof(param) === 'object') {
                                var url = param.url || '';
                                var alt = param.alt || '';
                            } else {
                                var url = param;
                                var alt = '';
                            }
                            ctx.dom.parent().prepend('<div class="logo"><img src="' + url + '" alt="' + alt + '" /></div>');
                        } else {
                            ctx.dom.parent().find('div.logo').remove();
                        }
                    }
                },
                copyright: {
                    default: false,
                    set: function(ctx, value) {
                        var el = $('#' + ctx.name + '-footer .copyright');
                        if (value === false) {
                            el.addClass('hide');
                        } else {
                            el.removeClass('hide');
                            el.find('span.year').text(value.year || '');
                            el.find('span.text').text(value.text || '');
                        }
                    }
                }
            },
            render: function(ctx) {
                var out = '<div id="' + ctx.name + '"></div>';
                out += '<div class="footer" id="' + ctx.name + '-footer"><div class="copyright"><span class="year"></span> &copy; <span class="text"></span></div></div>';
                return out;
            },
            remove: function(ctx) {
                $('#' + ctx.name + '-footer').remove();
            }

        },
        block: {
            child: {'content': '.irix-block'},
            properties: {
                path: {
                    default: false,
                    set: function(ctx, param) {
                        param = param || false;
                        var header = $('#' + ctx.name + '-header');
                        header.find('.breadcrumb').remove();
                        if (param !== false) {
                            header.append('<ul class="breadcrumb"></ul>');
                            if (Array.isArray(param)) {
                                var first_el = true;
                                param.forEach(function(el) {
                                    el.text = el.text || '';
                                    el.icon = el.icon || false;
                                    el.href = el.href || 'javascript:;';
                                    el.open = el.open || false;
                                    el.name = el.name || GUID();
                                    var start_icon = '';
                                    if ((el.icon !== false) && (first_el)) {
                                        var start_icon = '<i class="icon-' + el.icon + '"></i>';
                                        first_el = false;
                                    }
                                    header.find('ul.breadcrumb').append('<li>' + start_icon + '<a id="' + el.name + '" href="' + el.href + '">' + el.text + '</a><i class="icon-angle-right"></i></li>');
                                    if (el.open !== false) {
                                        $('#' + el.name).off('click').on('click', function() {
                                            ctx.irix.Open(el.open);
                                        });
                                    }
                                });
                                header.find('ul.breadcrumb>li>i.icon-angle-right').last().remove();
                            }
                        }
                    }
                },
                title: {
                    default: false,
                    set: function(ctx, param) {
                        var header = $('#' + ctx.name + '-header');
                        header.find('h3.page-title').remove();
                        if (param !== false) {
                            if (typeof(param) === 'object') {
                                var text = param.text || '';
                                var small = param.small || '';
                            } else {
                                var text = param || '';
                                var small = '';
                            }
                            header.prepend('<h3 class="page-title">' + text + '<small>' + small + '</small></h3>');
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div class="row-fluid" id="' + ctx.name + '-header"></div><div class="row-fluid" id="' + ctx.name + '"><div class="span12 irix-block"></div></div>';
            },
            remove: function(ctx) {
                $('#' + ctx.name + '-header').remove();
            }
        },
        portlet: {
            child: {'content': '.portlet-body'},
            properties: {
                title: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('.portlet-title > h4').empty();
                        if (param !== false) {
                            ctx.find('.portlet-title > h4').text(param);
                        }
                    }
                },
                icon: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('.portlet-title H4 > I').remove();
                        if (param !== false) {
                            ctx.find('.portlet-title H4').prepend('<i style="font-size: 18px;" class="icon-' + param + '"></i>');
                        }
                    }
                },
                buttons: {
                    default: {minimize: true, config: false, renew: false, close: false},
                    set: function(ctx, param) {
                        ctx.find('.portlet-title .tools').empty();
                        if (param !== false) {
                            param.minimize = param.minimize || true;
                            param.config = param.config || false;
                            param.renew = param.renew || false;
                            param.close = param.close || false;
                            var cobj = ctx.find('.portlet-title .tools');
                            if (param.minimize) {
                                cobj.append('<a href="javascript:;" class="collapse"></a>');
                                cobj.find('.collapse').on('click', function() {
                                    var el = $(this).parents(".portlet").children(".portlet-body");
                                    if (jQuery(this).hasClass("collapse")) {
                                        jQuery(this).removeClass("collapse").addClass("expand");
                                        el.slideUp(200);
                                    } else {
                                        jQuery(this).removeClass("expand").addClass("collapse");
                                        el.slideDown(200);
                                    }
                                });
                            }
                            if (param.config) {
                                cobj.append('<a href="javascript:;" data-toggle="modal" class="config"></a>');

                            }
                            if (param.renew) {
                                cobj.append('<a href="javascript:;" class="reload"></a>');
                            }
                            if (param.close) {
                                cobj.append('<a href="javascript:;" class="remove"></a>');
                            }
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div class="portlet" id="' + ctx.name + '"><div class="portlet-title"><h4></h4><div class="tools"></div></div><div class="portlet-body"></div></div>';
            }
        },
        form: {
            child: {'content': '.form-vertical'},
            get: function(ctx) {
                var key = ctx.p('key');
                if (key === false) {
                    return false;
                }
                var ret = {};
                ctx.find('[data-irix-field]').each(function() {
                    var curr_el = ctx.IX($(this).attr('data-irixui-uid'));
                    var curr_field = $(this).attr('data-irix-field');
                    if (curr_el !== false) {
                        ret[curr_field] = curr_el.get();
                    }
                });
                var out = {key: key, data: ret, val: ctx.p('key_val')};
                return out;
            },
            properties: {
                title: {
                    default: '',
                    set: function(ctx, param) {
                        ctx.find('h3.form-title').text(param);
                    }
                },
                key: {
                    default: false
                },
                key_val: {
                    default: false
                },
                save: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            toLog(ctx.DX(param, ctx.get()));
                            ctx.p('save', false);
                        }
                    }
                },
                fill: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            ctx.dom.on('onAfterShow', function(a) {
                                if (a.ctx.name === ctx.name) {
                                    var data = ctx.DX(param);
                                    var key = ctx.p('key');
                                    if (key !== false) {
                                        if (Object.has(data, key)) {
                                            ctx.p('key_val', data[key]);
                                        } else {
                                            ctx.p('key_val', false);
                                        }
                                    }
                                    ctx.find('[data-irix-field]').each(function() {
                                        var curr_el = ctx.IX($(this).attr('data-irixui-uid'));
                                        var curr_field = $(this).attr('data-irix-field');
                                        if ((curr_el !== false) && (Object.has(data, curr_field))) {
                                            curr_el.set(data[curr_field]);
                                        }
                                    });
                                }
                            });
                        }
                    }
                },
                style: {
                    default: 'normal',
                    set: function(ctx, param) {
                        ctx.dom.removeClass();
                        if (param === 'login') {
                            ctx.dom.addClass('form-vertical login-form');
                        }
                        if (param === 'vertical') {
                            ctx.dom.addClass('form-vertical');
                        }
                        if (param === 'horizontal') {
                            ctx.dom.addClass('form-horizontal');
                        }
                        if (param === 'borderd') {
                            ctx.dom.addClass('form-horizontal form-bordered');
                        }
                        if (param === 'normal') {
                            ctx.dom.addClass('form-horizontal form-row-seperated');
                        }
                        if (param === 'bordered-stripped') {
                            ctx.dom.addClass('form-horizontal form-bordered form-row-stripped');
                        }
                    }
                }
            },
            render: function(ctx) {
                return "<form id='" + ctx.name + "'>" +
                        "<h3 class='form-title'></h3>" +
                        "</form>";
            }
        },
        form_actions: {
            child: {'content': '.form-actions'},
            properties: {
                _onShow: {
                    set: function(ctx) {
                        ctx.dom.prev().addClass('last');
                    }
                }
            },
            render: function(ctx) {
                return '<div class="form-actions" id="' + ctx.name + '"></div>';
            }
        },
        table: {
            properties: {
                striped: {
                    default: true,
                    set: function(ctx, param) {
                        ctx.dom.removeClass('table-striped');
                        if (param === true) {
                            ctx.dom.addClass('table-striped');
                        }
                    }
                },
                bordered: {
                    default: true,
                    set: function(ctx, param) {
                        ctx.dom.removeClass('table-bordered');
                        if (param === true) {
                            ctx.dom.addClass('table-bordered');
                        }
                    }
                },
                hover: {
                    default: true,
                    set: function(ctx, param) {
                        ctx.dom.removeClass('table-hover');
                        if (param === true) {
                            ctx.dom.addClass('table-hover');
                        }
                    }
                },
                advance: {
                    default: true,
                    set: function(ctx, param) {
                        ctx.dom.removeClass('table-advance');
                        if (param === true) {
                            ctx.dom.addClass('table-advance');
                        }
                    }
                },
                compact: {
                    default: false
                },
                columns: {
                    default: [],
                    set: function(ctx, param) {
                        ctx.dom.empty();
                        ctx.dom.append('<thead><tr></tr></thead>');
                        Object.keys(param, function(column_name, column) {
                            column.title = column.title || '';
                            column.name = column_name;
                            column.hidden_desktop = column.hidden_desktop || false;
                            column.hidden_tablet = column.hidden_tablet || column.hidden_desktop;
                            column.hidden_phone = column.hidden_phone || column.hidden_tablet;
                            column.hidden_480 = column.hidden_480 || column.hidden_phone;
                            column.icon = column.icon || false;
                            column.width = column.width || false;
                            column.algin = column.algin || 'left';
                            var ricon = '';
                            if (column.icon !== false) {
                                ricon = '<i class="icon-' + column.icon + '"></i>';
                            }
                            var cwidth = '';
                            if (column.width !== false) {
                                cwidth = ' width: ' + column.width + 'px;';
                            }
                            var column_title = '';
                            if (typeof(column.title) === 'string') {
                                column_title = column.title;
                            } else {
                                column.title.type = column.title.type || 'button';
                                column_title = '';

                                if (column.title.type === 'button') {
                                    column.title.btn_icon = column.title.btn_icon || false;
                                    column.title.color = column.title.color || '';
                                    var bicon = '';
                                    if (column.title.btn_icon !== false) {
                                        bicon = '<i class="icon-' + column.title.btn_icon + '"></i> ';
                                    }
                                    column.title.text = column.title.text || '';
                                    column_title = '<a href="javascript:;" data-table-btn="' + column.name + '" class="btn mini ' + column.title.color + '">' + bicon + column.title.text + '</a>';
                                }
                            }
                            var elclass = '';
                            if (column.hidden_phone) {
                                elclass += 'hidden-phone ';
                            }
                            if (column.hidden_desktop) {
                                elclass += 'hidden-desktop ';
                            }
                            if (column.hidden_tablet) {
                                elclass += 'hidden-tablet ';
                            }
                            if (column.hidden_480) {
                                elclass += 'hidden-480 ';
                            }

                            ctx.find('thead > tr').append('<th class="' + elclass + '" style="text-align: ' + column.algin + ';' + cwidth + '" data-table-col="' + column.name + '" ' + '>' + ricon + column_title + '</th>');
                        });
                    }
                },
                rows: {
                    default: [],
                    set: function(ctx, param) {
                        ctx.find('tbody').remove();
                        ctx.dom.append('<tbody></tbody>');
                        if (typeof(param) === 'string') {
                            param = ctx.DX(param);
                        }
                        var compact = ctx.p('compact');
                        var compacted = {};
                        ctx.toArray(param).forEach(function(row, idx) {
                            var out = '';
                            if (compact !== false) {
                                if (Object.has(row, compact)) {
                                    if (Object.has(compacted, row[compact])) {
                                        return;
                                    }
                                    compacted[row[compact]] = true;
                                }
                            }
                            Object.keys(ctx.p('columns'), function(column_name, column) {
                                if (Object.has(row, column_name)) {
                                    var field = row[column_name];
                                    column.name = column_name;
                                    column.type = column.type || 'string';
                                    column.algin = column.algin || 'left';
                                    var elclass = '';
                                    if (column.hidden_phone) {
                                        elclass += 'hidden-phone ';
                                    }
                                    if (column.hidden_desktop) {
                                        elclass += 'hidden-desktop ';
                                    }
                                    if (column.hidden_tablet) {
                                        elclass += 'hidden-tablet ';
                                    }
                                    if (column.hidden_480) {
                                        elclass += 'hidden-480 ';
                                    }
                                    out += '<td  class="' + elclass + '" style="text-align: ' + column.algin + '; " data-table-col="' + column.name + '">'
                                    if (column.type === 'string') {
                                        out += field;
                                    }
                                    if (column.type === 'button') {
                                        var bicon = '';
                                        column.btn_icon = column.btn_icon || false;
                                        if (column.btn_icon !== false) {
                                            bicon = '<i class="icon-' + column.btn_icon + '"></i> ';
                                        }
                                        column.color = column.color || '';
                                        column.text = column.text || field;
                                        var btnlnk = '';
                                        if (column.text !== field) {
                                            btnlnk = ' data-table-btn="' + field + '" ';
                                        }
                                        out += '<a href="javascript:;" ' + btnlnk + ' class="btn mini ' + column.color + '">' + bicon + column.text + '</a>';
                                    }
                                    out += '</td>';
                                }
                            });
                            ctx.find('tbody').append('<tr>' + out + '</tr>')
                        });
                    }
                },
                managed: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                            return;
                        }
                        ctx.dom.dataTable({"bFilter": true, "oLanguage": {"sProcessing": "Подождите...", "sLengthMenu": "Показать _MENU_ записей", "sZeroRecords": "Записи отсутствуют.", "sInfo": "Записи с _START_ до _END_ из _TOTAL_ записей", "sInfoEmpty": "Записи с 0 до 0 из 0 записей", "sInfoFiltered": "(отфильтровано из _MAX_ записей)", "sInfoPostFix": "", "sSearch": "Поиск:", "sUrl": "", "oPaginate": {"sFirst": "Первая", "sPrevious": "Предыдущая", "sNext": "Следующая", "sLast": "Последняя"}, "oAria": {"sSortAscending": ": активировать для сортировки столбца по возрастанию", "sSortDescending": ": активировать для сортировки столбцов по убыванию"}}});
                    }
                }
            },
            render: function(ctx) {
                return '<table class="table" id="' + ctx.name + '"></table>';
            }
        },
        textarea: {
            get: function(ctx) {
                return ctx.find('textarea').val();
            },
            set: function(ctx, val) {
                return ctx.find('textarea').val(val);
            },
            properties: {
                title: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('label.control-label').remove();
                        if (param !== false) {
                            ctx.dom.prepend('<label class="control-label" >' + param + '</label>');
                        }
                    }
                },
                rows: {
                    default: 3,
                    set: function(ctx, param) {
                        ctx.find('textarea').attr('rows', param);
                    }
                },
                wrap: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('textarea').removeClass('span12');
                        if (param === true) {
                            ctx.find('textarea').addClass('span12');
                        }
                    }
                },
                size: {
                    default: 'large',
                    set: function(ctx, param) {
                        ctx.find('textarea').removeClass('small medium large');
                        if (param !== false) {
                            ctx.find('textarea').addClass(param);
                        }
                    }
                },
                help: {
                    default: false,
                    set: function(ctx, param) {
                        if (typeof(param) === 'object') {
                            var text = param.text || param;
                            var delay = param.hide || false;
                            var kind = param.kind || false;
                        } else {
                            var text = param || false;
                        }
                        if (text !== false) {
                            ctx.find('textarea').after('<span class="help-block">' + text + '</span>');
                            if (delay !== false) {
                                ctx.find('span.help-block').delay(delay).fadeOut(400);
                            }
                        } else {
                            ctx.find('span.help-block').remove();
                        }
                        if (kind !== false) {
                            ctx.p('kind', {kind: kind, hide: delay});
                        }
                    },
                    remove: function(ctx) {
                        ctx.find('span.help-block').remove();
                    }
                },
                kind: {
                    default: false,
                    remove: function(ctx, param) {
                        if (typeof(param) === 'object') {
                            var kind = param.kind || false;
                        } else {
                            var kind = param || false;
                        }
                        if (kind !== false) {
                            ctx.dom.removeClass(kind);
                        }
                    },
                    set: function(ctx, param) {
                        var hide = false;
                        var kind = param || false;
                        if (typeof(param) === 'object') {
                            hide = param.hide || false;
                            var kind = param.kind || false;
                        }
                        if (kind === false) {
                            ctx.dom.removeClass(kind);
                        } else {
                            ctx.dom.addClass(kind);
                            if (hide !== false) {
                                setTimeout(function() {
                                    ctx.dom.removeClass(kind);
                                }, hide + 200);
                            }
                        }
                    }
                },
                field_value: {
                    default: 'id',
                    set: function(ctx, param) {
                    }
                },
                field_text: {
                    default: 'text',
                    set: function(ctx, param) {
                    }
                },
                readonly: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === true) {
                            ctx.find('textarea').attr('disabled','disabled');
                        } else {
                            ctx.find('textarea').removeAttr('disabled');
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div class="control-group" id="' + ctx.name + '"><div class="controls"><textarea name="' + ctx.name + '" class="large m-wrap"></textarea></div></div>'
            }
        },
        select: {
            get: function(ctx) {
                return ctx.find('select').val();
            },
            set: function(ctx, val) {
                return ctx.find('select').val(val);
            },
            properties: {
                title: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('label.control-label').remove();
                        if (param !== false) {
                            ctx.dom.prepend('<label class="control-label" >' + param + '</label>');
                        }
                    }
                },
                wrap: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('select').removeClass('span12');
                        if (param === true) {
                            ctx.find('select').addClass('span12');
                        }
                    }
                },
                size: {
                    default: 'large',
                    set: function(ctx, param) {
                        ctx.find('select').removeClass('small medium large');
                        if (param !== false) {
                            ctx.find('select').addClass(param);
                        }
                    }
                },
                help: {
                    default: false,
                    set: function(ctx, param) {
                        if (typeof(param) === 'object') {
                            var text = param.text || param;
                            var delay = param.hide || false;
                            var kind = param.kind || false;
                        } else {
                            var text = param || false;
                        }
                        if (text !== false) {
                            ctx.find('select').after('<span class="help-block">' + text + '</span>');
                            if (delay !== false) {
                                ctx.find('span.help-block').delay(delay).fadeOut(400);
                            }
                        } else {
                            ctx.find('span.help-block').remove();
                        }
                        if (kind !== false) {
                            ctx.p('kind', {kind: kind, hide: delay});
                        }
                    },
                    remove: function(ctx) {
                        ctx.find('span.help-block').remove();
                    }
                },
                kind: {
                    default: false,
                    remove: function(ctx, param) {
                        if (typeof(param) === 'object') {
                            var kind = param.kind || false;
                        } else {
                            var kind = param || false;
                        }
                        if (kind !== false) {
                            ctx.dom.removeClass(kind);
                        }
                    },
                    set: function(ctx, param) {
                        var hide = false;
                        var kind = param || false;
                        if (typeof(param) === 'object') {
                            hide = param.hide || false;
                            var kind = param.kind || false;
                        }
                        if (kind === false) {
                            ctx.dom.removeClass(kind);
                        } else {
                            ctx.dom.addClass(kind);
                            if (hide !== false) {
                                setTimeout(function() {
                                    ctx.dom.removeClass(kind);
                                }, hide + 200);
                            }
                        }
                    }
                },
                separator_right: {
                    default: false,
                    set: function(ctx, param) {
                        if (param) {
                            ctx.find('select').css('margin-right', '10px');
                        } else {
                            ctx.find('select').css('margin-right', '0px');
                        }
                    }
                },
                field_value: {
                    default: 'id',
                    set: function(ctx, param) {
                    }
                },
                field_text: {
                    default: 'title',
                    set: function(ctx, param) {
                    }
                },
                content: {
                    default: [],
                    set: function(ctx, param) {
                        if (typeof(param.length) === 'undefined') {
                            Object.keys(param, function(id, val) {
                                ctx.find('.controls > select').append('<option value="' + id + '">' + val + '</option>');
                            });
                        } else {
                            param.forEach(function(param_el) {
                                ctx.find('.controls > select').append('<option value="' + param_el[ctx.p('field_value')] + '">' + param_el[ctx.p('field_text')] + '</option>');
                            });
                        }
                    }
                },
                load: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                            return false;
                        }
                        ctx.p('content', ctx.DX(param));
                    }
                },
                readonly: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === true) {
                            ctx.find('select').attr('disabled','disabled');
                        } else {
                            ctx.find('select').removeAttr('disabled');
                        }
                    }
                },
            },
            render: function(ctx) {
                return '<div class="control-group" id="' + ctx.name + '"><div class="controls"><select class="m-wrap" name="' + ctx.name + '"></select></div></div>'
            }
        },
        input: {
            child: {content: '.input-content'},
            get: function(ctx) {
                return ctx.find('input').val();
            },
            set: function(ctx, val) {
                return ctx.find('input').val(val);
            },
            properties: {
                placeholder: {
                    default: '',
                    set: function(ctx, param) {
                        ctx.find('label').text(param);
                        ctx.find('input').attr('placeholder', param);
                    }
                },
                title: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('label.control-label').remove();
                        if (param !== false) {
                            ctx.dom.prepend('<label class="control-label" >' + param + '</label>');
                        }
                    }
                },
                wrap: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('input').removeClass('span12');
                        if (param === true) {
                            ctx.find('input').addClass('span12');
                        }
                    }
                },
                size: {
                    default: 'large',
                    set: function(ctx, param) {
                        ctx.find('input').removeClass('small medium large');
                        if (param !== false) {
                            ctx.find('input').addClass(param);
                        }
                    }
                },
                icon: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                            ctx.find('div.left').removeClass('input-icon');
                            ctx.find('i').remove();
                        } else {
                            ctx.find('div.left').addClass('input-icon');
                            if (ctx.find('i').length === 0) {
                                ctx.find('div.left').prepend('<i class="icon-' + param + '"></i>');
                            } else {
                                ctx.find('i').removeClass().addClass('icon-' + param);
                            }
                        }
                    }
                },
                value: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            ctx.find('input').val(param);
                        }
                    }
                },
                password: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                            ctx.find('input').attr('type', 'text');
                        } else {
                            ctx.find('input').attr('type', 'password');
                        }

                    }
                },
                max_chars: {
                    defalut: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            ctx.find('input').attr('maxlength', param);
                        } else {
                            ctx.find('input').removeAttr('maxlength');
                        }
                    }
                },
                readonly: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === true) {
                            ctx.find('input').attr('disabled','disabled');
                        } else {
                            ctx.find('input').removeAttr('disabled');
                        }
                    }
                },
                help: {
                    default: false,
                    set: function(ctx, param) {
                        if (typeof(param) === 'object') {
                            var text = param.text || param;
                            var delay = param.hide || false;
                            var kind = param.kind || false;
                        } else {
                            var text = param || false;
                        }
                        if (text !== false) {
                            ctx.find('input').after('<span class="help-block">' + text + '</span>');
                            if (delay !== false) {
                                ctx.find('span.help-block').delay(delay).fadeOut(400);
                            }
                        } else {
                            ctx.find('span.help-block').remove();
                        }
                        if (kind !== false) {
                            ctx.p('kind', {kind: kind, hide: delay});
                        }
                    },
                    remove: function(ctx) {
                        ctx.find('span.help-block').remove();
                    }
                },
                kind: {
                    default: false,
                    remove: function(ctx, param) {
                        if (typeof(param) === 'object') {
                            var kind = param.kind || false;
                        } else {
                            var kind = param || false;
                        }
                        if (kind !== false) {
                            ctx.dom.removeClass(kind);
                        }
                    },
                    set: function(ctx, param) {
                        var hide = false;
                        var kind = param || false;
                        if (typeof(param) === 'object') {
                            hide = param.hide || false;
                            var kind = param.kind || false;
                        }
                        if (kind === false) {
                            ctx.dom.removeClass(kind);
                        } else {
                            ctx.dom.addClass(kind);
                            if (hide !== false) {
                                setTimeout(function() {
                                    if (ctx.dom) {
                                        ctx.dom.removeClass(kind);
                                    }
                                }, hide + 200);
                            }
                        }
                    }
                },
                integer: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === true) {
                            ctx.p('mask', {mask: 'integer', options: {rightAlignNumerics: false}});
                        } else {
                            ctx.p('mask', 'remove');
                        }
                    }
                },
                tag: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('.controls .left').removeClass('input-append');
                        ctx.find('span.add-on').remove();
                        if (param !== false) {
                            ctx.find('.controls .left').addClass('input-append');
                            ctx.find('input').after('<span class="add-on">' + param + '</span>');
                        }
                    }
                },
                mask: {
                    default: false,
                    set: function(ctx, param) {
                        //https://github.com/RobinHerbots/jquery.inputmask
                        if (param === false) {
                            ctx.find('input').inputmask('remove');
                        } else {
                            if (typeof(param) === 'string') {
                                ctx.find('input').inputmask(param);
                            } else {
                                param.mask = param.mask || '';
                                param.options = param.options || {};
                                ctx.find('input').inputmask(param.mask, param.options);
                            }
                        }
                    }
                },
                separator_right: {
                    default: false,
                    set: function(ctx, param) {
                        if (param) {
                            ctx.find('input').css('margin-right', '10px');
                        } else {
                            ctx.find('input').css('margin-right', '0px');
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div class="control-group" id="' + ctx.name + '">' +
                        '<div class="controls"><div class="left input-content">' +
                        '<input class="m-wrap" type="text" placeholder=" "  name="' + ctx.name + '"/></div></div></div>';
            }
        },
        fieldset: {
            child: {content: '.fieldset-content'},
            render: function(ctx) {
                return '<fieldset id="' + ctx.name + '"></fieldset>';
            }
        },
        caption: {
            set: function(ctx, val) {
                ctx.dom.html(val);
            },
            properties: {
                data_prefix: {default: ''},
                data_postfix: {default: ''},
                data: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                            return;
                        }
                        ctx.set(ctx.p('data_prefix') + ctx.DX(param) + ctx.p('data_postfix'));
                    }
                },
                font_size: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                            return;
                        }
                        ctx.dom.css('font-size', param);
                    }
                }
            },
            render: function(ctx) {
                return '<p id="' + ctx.name + '"></p>';
            }
        },
        var : {
            set: function(ctx, val) {
                ctx.vvalue = val;
            },
            get: function(ctx) {
                return ctx.vvalue;
            },
            properties: {
                value: {
                    default: '',
                    set: function(ctx, param) {
                        ctx.set(param);
                    }
                },
                data: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            ctx.set(ctx.DX(param));
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div id="' + ctx.name + '" class="hide"></div>';
            }
        },
        map: {
            properties: {
                setup: {
                    default: {lat: 0, lng: 0},
                    set: function(ctx, param) {
                        if (param === false) {
                            return;
                        }
                        param.lat = param.lat || 0;
                        param.lng = param.lng || 0;
                        param.zoom = param.zoom || 15;
                        param.mode = param.mode || 'roadmap';
                        ctx.map.setMapTypeId(param.mode);
                        ctx.map.setCenter(param.lat, param.lng);
                        ctx.map.setZoom(param.zoom);
                        ctx.map.refresh();
                    }
                },
                draggable: {
                    default: true,
                    set: function(ctx, param) {
                        ctx.map.map.setOptions({draggable: param, scrollwheel: param});
                    }
                },
                markers: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            if (typeof(param) === 'string') {
                                param = ctx.DX(param);
                            }
                            param.flat = true;
                            ctx.map.removeMarkers();
                            ctx.map.addMarkers(param);
                            ctx.map.refresh();
                        }
                    }
                },
                marker: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            if (typeof(param) === 'string') {
                                param = ctx.DX(param);
                            }
                            if (Object.size(param) === 0) {
                                var msetup = ctx.p('setup');
                                param.title = 'Новый объект';
                                param.lat = msetup.lat;
                                param.lng = msetup.lng;
                            }
                            ctx.map.removeMarkers();
                            param.flat = true;
                            param.draggable = true;
                            param.position_changed = function(marker) {
                                if (typeof(marker) !== 'undefined') {
                                    ctx.dom.trigger({
                                        type: "onMapMakerPostionChanged",
                                        marker: marker,
                                        lat: marker.position.lat(),
                                        lng: marker.position.lng(),
                                        ctx: ctx
                                    });
                                }
                            };
                            ctx.map.addMarker(Object.clone(param));
                            ctx.map.setCenter(param.lat, param.lng);
                        }
                    }
                },
                showWhereI: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                        } else {
                            ctx.map.addControl({
                                position: 'top_right',
                                content: 'Где я?',
                                style: {
                                    margin: '5px',
                                    padding: '1px 6px',
                                    border: 'solid 1px #717B87',
                                    background: '#fff'
                                },
                                events: {
                                    click: function() {
                                        GMaps.geolocate({
                                            success: function(position) {
                                                if (ctx.p('markers') === false) {
                                                    if (ctx.p('marker') === false) {
                                                        ctx.map.removeMarkers();
                                                        ctx.map.addMarker({lat: position.coords.latitude, lng: position.coords.longitude, flat: true, title: 'Я', icon: '/img/map/i.png'});
                                                    } else {
                                                        ctx.map.markers[0].setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                                                    }
                                                } else {
                                                    var markers_ctx = ctx.p('markers');
                                                    if (typeof(markers_ctx) === 'string') {
                                                        markers_ctx = ctx.DX(markers_ctx);
                                                    }
                                                    var mrks = ctx.copyArray(markers_ctx);
                                                    mrks.push({lat: position.coords.latitude, lng: position.coords.longitude, flat: true, title: 'Я', icon: '/img/map/i.png'});
                                                    ctx.map.removeMarkers();
                                                    ctx.map.addMarkers(mrks);
                                                }
                                                ctx.map.setCenter(position.coords.latitude, position.coords.longitude);
                                                ctx.map.refresh();
                                            },
                                            error: function(error) {
                                                alert('Ошибка геолокации: ' + error.message);
                                            },
                                            not_supported: function() {
                                                alert("Ваш браузер не поддерживает геолокацию");
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                },
                showDragControl: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {
                        } else {
                            var cid = GUID();
                            ctx.map.addControl({
                                position: 'top_right',
                                content: 'Управление',
                                style: {
                                    margin: '5px',
                                    padding: '1px 6px',
                                    border: 'solid 1px #717B87',
                                    background: '#fff',
                                },
                                id: cid,
                                events: {
                                    click: function() {
                                        $('#' + cid).toggleClass('clicked');
                                        if ($('#' + cid).hasClass('clicked')) {
                                            $('#' + cid).html('Блокировка');
                                        } else {
                                            $('#' + cid).html('Управление');
                                        }
                                        ctx.p('draggable', !ctx.p('draggable'));
                                    }
                                }
                            });
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div id="' + ctx.name + '" class="gmaps"></div>';
            },
            remove: function(ctx) {

            },
            draw: function(ctx) {
                ctx.map = new GMaps({
                    div: '#' + ctx.name,
                    lat: 0,
                    lng: 0
                });
                ctx.map.map.setOptions({streetViewControl: false});
                ctx.map.refresh();
            }
        },
        alert: {
            properties: {
                type: {
                    default: 'error',
                    set: function(ctx, param) {
                        ctx.dom.removeClass();
                        if (param === 'warning') {
                            ctx.dom.addClass('alert');
                        }
                        if (param === 'info') {
                            ctx.dom.addClass('alert alert-info');
                        }
                        if ((param === 'success') || (param === 'ok')) {
                            ctx.dom.addClass('alert alert-success');
                        }
                        if (param === 'error') {
                            ctx.dom.addClass('alert alert-error');
                        }
                    }
                },
                title: {
                    default: '',
                    set: function(ctx, param) {
                        ctx.dom.find('strong').html(param);
                    }
                },
                text: {
                    default: '',
                    set: function(ctx, param) {
                        ctx.dom.find('span').html(param);
                    }
                },
                close: {
                    default: true,
                    set: function(ctx, param) {
                        ctx.dom.find('button').remove();
                        if (param) {
                            ctx.dom.prepend('<button class="close" data-dismiss="alert"></button>')
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div id="' + ctx.name + '"><span></span></div>';
            }
        },
        legend: {
            properties: {
                text: {
                    default: '',
                    set: function(ctx, param) {
                        ctx.dom.html(param);
                    }
                }
            },
            render: function(ctx) {
                return '<legend id="' + ctx.name + '"></legend>';
            }
        },
        button: {
            properties: {
                caption: {
                    default: '',
                    set: function(ctx, param) {
                        ctx.find('span').text(' ' + param);
                    }
                },
                color: {
                    default: 'gray',
                    set: function(ctx, param) {
                        if (param === 'gray') {
                            ctx.dom.removeClass('red blue green black purple yellow');
                        } else {
                            ctx.dom.addClass(param);
                        }
                    }
                },
                separator_right: {
                    default: false,
                    set: function(ctx, param) {
                        if (param) {
                            ctx.dom.css('margin-right', '10px');
                        } else {
                            ctx.dom.css('margin-right', '0px');
                        }
                    }
                },
                icon_right: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('i.m-icon-r').remove();
                        if (param !== false) {
                            ctx.dom.append(' <i class="icon-' + param + ' m-icon-white m-icon-r"></i> ');
                        }
                    }
                },
                icon: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.find('i.m-icon-l').remove();
                        if (param !== false) {
                            ctx.dom.prepend('<i class="icon-' + param + ' m-icon-white m-icon-l"></i> ');
                        }
                    }
                },
                algin_right: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.dom.removeClass('pull-right');
                        if (param) {
                            ctx.dom.addClass('pull-right');
                        }
                    }
                },
                shake: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {
                            ctx.p('enabled', false);
                            ctx.dom.css('position', 'relative');
                            ctx.dom.animate({'left': "-=10px"}, 60).animate({'left': "+=20px"}, 120).animate({'left': "-=10px"}, 60).animate({'left': "-=10px"}, 60).animate({'left': "+=20px"}, 120).animate({'left': "-=10px"}, 60).animate({'left': "-=10px"}, 60).animate({'left': "+=20px"}, 120).animate({'left': "-=10px"}, 60);
                            ctx.p('enabled', true);
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<button id="' + ctx.name + '" type="button" class="btn"><span></span> </button>';
            }
        },
        iterator: {
            child: {'content': '.irix-iterator'},
            properties: {
                add: {
                    default: false,
                    set: function(ctx, param) {
                    }
                },
                remove: {
                    default: false,
                    set: function(ctx, param) {
                    }
                },
                count: {
                    default: false,
                    set: function(ctx, param) {
                        if (param === false) {

                        }
                    }
                },
                dynamic: {
                    default: false,
                    set: function(ctx, param) {
                        if (param !== false) {

                        } else {

                        }
                    }
                },
                template: {
                    default: false,
                    set: function(ctx, param) {
                        ctx.RemoveChilds();
                        if (param !== false) {
                            var count = ctx.p('count');
                            var dynamic = ctx.p('dynamic');
                            var out = [];
                            if (dynamic) {
                                for (var i = 1; i <= count; i++) {
                                    ctx.toArray(param).forEach(function(tpl_el) {
                                        var new_el = {};
                                        new_el = Object.clone(tpl_el);
                                        new_el.html_attr = {'data-iteration-round': i};
                                        new_el.name = new_el.name || GUID();
                                        new_el.basic_name = new_el.name;
                                        new_el.name += '_' + i;
                                        new_el.name_postfix = '_' + i;
                                        out.push(new_el);
                                    });
                                }
                                ctx.model.content = out;
                                ctx.RenderChilds();
                            }
                        }
                    }
                }
            },
            render: function(ctx) {
                return '<div class="irix-iterator" id="' + ctx.name + '"></div>';
            }
        }
    }
});
irixui.router.AddAfterOpen('radiantxt', function(ctx) {
    var radiantxt = {
        isIE8: false,
        isIE9: false,
        isIE10: false,
        responsiveHandlers: [],
        layoutColorCodes: {'blue': '#4b8df8', 'red': '#e02222', 'green': '#35aa47', 'purple': '#852b99', 'grey': '#555555', 'yellow': '#ffb848'},
        isTouchDevice: function() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },
        handlePortletTools: function() {
            $(document).on('.portlet .tools a.remove', 'click', function() {
                var removable = jQuery(this).parents(".portlet");
                if (removable.next().hasClass('portlet') || removable.prev().hasClass('portlet')) {
                    jQuery(this).parents(".portlet").remove();
                } else {
                    jQuery(this).parents(".portlet").parent().remove();
                }
            });

            $(document).on('.portlet .tools a.reload', 'click', function() {
                var el = jQuery(this).parents(".portlet");
                //App.blockUI(el);
                window.setTimeout(function() {
                    //App.unblockUI(el);
                }, 1000);
            });
        },
        handleTooltip: function() {
            if (radiantxt.isTouchDevice()) {
                jQuery('.tooltips:not(.no-tooltip-on-touch-device)').tooltip();
            } else {
                jQuery('.tooltips').tooltip();
            }
        },
        handleElements: function() {
            radiantxt.handleTooltip();
            radiantxt._handleSidebar();
            radiantxt._handleTabletElements();
            radiantxt._handleDesktopElements();
            radiantxt.handleSidenarAndContentHeight();//!
            for (var i in radiantxt.responsiveHandlers) {
                var each = radiantxt.responsiveHandlers[i];
                each.call();
            }
        },
        handleSidenarAndContentHeight: function() {
            var content = $('.page-content');
            var sidebar = $('.page-sidebar');
            if (!content.attr("data-height")) {
                content.attr("data-height", content.height());
            }
            if (sidebar.height() > content.height()) {
                content.css("min-height", sidebar.height() + 20);
            } else {
                content.css("min-height", content.attr("data-height"));
            }
        },
        _handleTabletElements: function() {
            if ($(window).width() <= 1280) {
                $(".responsive").each(function() {
                    var forTablet = $(this).attr('data-tablet');
                    var forDesktop = $(this).attr('data-desktop');
                    if (forTablet) {
                        $(this).removeClass(forDesktop);
                        $(this).addClass(forTablet);
                    }
                });
            }
        },
        _handleDesktopElements: function() {
            if ($(window).width() > 1280) {
                $(".responsive").each(function() {
                    var forTablet = $(this).attr('data-tablet');
                    var forDesktop = $(this).attr('data-desktop');
                    if (forTablet) {
                        $(this).removeClass(forTablet);
                        $(this).addClass(forDesktop);
                    }
                });
            }
        },
        _handleSidebar: function() {
            if ($(window).width() < 900) {
                $.cookie('sidebar-closed', null);
                $('.page-container').removeClass("sidebar-closed");
            }
        },
        handleResponsive: function() {
            radiantxt.isIE10 = !!navigator.userAgent.match(/MSIE 10/);
            if (radiantxt.isIE10) {
                jQuery('html').addClass('ie10');
            }
            $(window).setBreakpoints({
                breakpoints: [320, 480, 768, 900, 1024, 1280]
            });
            $(window).bind('exitBreakpoint320', function() {
                radiantxt.handleElements();
            });
            $(window).bind('enterBreakpoint320', function() {
                radiantxt.handleElements();
            });
            $(window).bind('exitBreakpoint480', function() {
                radiantxt.handleElements();
            });
            $(window).bind('enterBreakpoint480', function() {
                radiantxt.handleElements();
            });
            $(window).bind('exitBreakpoint768', function() {
                radiantxt.handleElements();
            });
            $(window).bind('enterBreakpoint768', function() {
                radiantxt.handleElements();
            });
            $(window).bind('exitBreakpoint900', function() {
                radiantxt.handleElements();
            });
            $(window).bind('enterBreakpoint900', function() {
                radiantxt.handleElements();
            });
            $(window).bind('exitBreakpoint1024', function() {
                radiantxt.handleElements();
            });
            $(window).bind('enterBreakpoint1024', function() {
                radiantxt.handleElements();
            });
            $(window).bind('exitBreakpoint1280', function() {
                radiantxt.handleElements();
            });
            $(window).bind('enterBreakpoint1280', function() {
                radiantxt.handleElements();
            });
        },
        handleSidebarMenu: function() {
            $(document).on('.page-sidebar li > a', 'click', function(e) {
                if ($(this).next().hasClass('sub-menu') == false) {
                    return;
                }
                var parent = $(this).parent().parent();
                parent.children('li.open').children('a').children('.arrow').removeClass('open');
                parent.children('li.open').children('.sub-menu').slideUp(200);
                parent.children('li.open').removeClass('open');
                var sub = jQuery(this).next();
                if (sub.is(":visible")) {
                    jQuery('.arrow', jQuery(this)).removeClass("open");
                    jQuery(this).parent().removeClass("open");
                    sub.slideUp(200, function() {
                        radiantxt.handleSidenarAndContentHeight();
                    });
                } else {
                    jQuery('.arrow', jQuery(this)).addClass("open");
                    jQuery(this).parent().addClass("open");
                    sub.slideDown(200, function() {
                        radiantxt.handleSidenarAndContentHeight();
                    });
                }
                e.preventDefault();
            });
        },
        handleHorizontalMenu: function() {
            var source = $('.navbar .hor-menu .nav');
            var target = $('.full-width-page .page-sidebar');
            if (source.size() > 0 && target.size() > 0) {
                if (target.children().size() == 0) {
                    var html = source.html();
                    html = html.replace(new RegExp('data-toggle="dropdown"', 'g'), '');
                    html = html.replace(new RegExp('dropdown-menu', 'g'), 'sub-menu');
                    html = html.replace(new RegExp('dropdown-submenu', 'g'), '');
                    target.html('<ul>' + html + '</ul>');
                }
            }
            $(document).on('.header .hor-menu .hor-menu-search-form-toggler', 'click', function(e) {
                if ($(this).hasClass('hide')) {
                    $(this).removeClass('hide');
                    $('.header .hor-menu .search-form').hide();
                } else {
                    $(this).addClass('hide');
                    $('.header .hor-menu .search-form').show();
                }
                e.preventDefault();
            });
        },
        handleSidebarToggler: function() {
            var container = $(".page-container");
            if ($.cookie('sidebar-closed') === 1) {
                container.addClass("sidebar-closed");
            }
            $('.page-sidebar .sidebar-toggler').click(function(e) {
                $(".sidebar-search").removeClass("open");
                var container = $(".page-container");
                if (container.hasClass("sidebar-closed") === true) {
                    container.removeClass("sidebar-closed");
                    $.cookie('sidebar-closed', null);
                } else {
                    container.addClass("sidebar-closed");
                    $.cookie('sidebar-closed', 1);
                }
                e.preventDefault();
            });
        },
        handleUniform: function() {
            if (!jQuery().uniform) {
                return;
            }
            var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
            if (test.size() > 0) {
                test.each(function() {
                    if ($(this).parents(".checker").size() === 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            }
        },
        handleInputMasks: function() {
            $.extend($.inputmask.defaults, {
                'autounmask': true
            });
        }
    };
    radiantxt.handleResponsive();
    radiantxt.handleSidebarMenu();
    radiantxt.handleHorizontalMenu();
    radiantxt.handleSidebarToggler();
    radiantxt.handlePortletTools();
    radiantxt.handleUniform();
    radiantxt.handleInputMasks();
});
toLog('RadiantXT ready', false, 'color:#04AC13;font-weight: bold;');