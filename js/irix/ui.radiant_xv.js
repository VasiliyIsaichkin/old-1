/* IRIXUI RadiantXV BL-pack
 * http://labs.iraxis.ru/radiantx
 * Version 0.7.6
 * Good for IRIXUI version 0.7.6
 * 
 * Copyright 2013, Vasiliy Isaichkin
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */
irixui.collections.Register(
        {
            events: {
                onMapMakerPostionChanged: {
                    set: function(ctx, data) {
                        ctx.dom.on('onMapMakerPostionChanged', function(param) {
                            ctx.onEvent(data,param);
                        });
                    }
                },
                onClick: {
                    set: function(ctx, data) {
                        ctx.dom.on('click', function() {
                            ctx.onEvent(data);
                        });
                    }
                },
                onMenuClick: {
                    set: function(ctx, data) {
                        ctx.find('.page-sidebar > UL > LI > A').on('click', function() {
                            ctx.onEvent(data, $(this).parent().attr('id'));
                        });
                        ctx.find('.sub-menu >  LI > A').on('click', function() {
                            ctx.onEvent(data, $(this).parent().attr('id'));
                        });
                    }
                },
                onShow: {
                    set: function(ctx, data) {
                        ctx.dom.on('onShow', function(target) {
                            if (ctx.name === target.ctx.name) {
                                ctx.onEvent(data, target.ctx);
                            }
                        });
                    }
                },
                onAfterShow: {
                    set: function(ctx, data) {
                        ctx.dom.on('onAfterShow', function(target) {
                            if (ctx.name === target.ctx.name) {
                                ctx.onEvent(data, target.ctx);
                            }
                        });
                    }
                },
                onChildsShow: {
                    set: function(ctx, data) {
                        ctx.dom.on('onChildsShow', function(target) {
                            if (ctx.name === target.ctx.name) {
                                ctx.onEvent(data, target.ctx);
                            }
                        });
                    }
                },
                onEnter: {
                    set: function(ctx, data) {
                        ctx.dom.keyup(function(e) {
                            if (e.keyCode === 13) {
                                ctx.onEvent(data);
                            }
                        });
                    }
                },
                onChange: {
                    set: function(ctx, data) {
                        ctx.dom.on('change', function() {
                            ctx.onEvent(data);
                        });
                    }
                },
                onResultOk: {
                    set: function(ctx, data) {
                        ctx.dom.off('onResultOk').on('onResultOk', function(ev) {
                            ctx.onEvent(data, ev.message);
                        });
                    }
                },
                onResultError: {
                    set: function(ctx, data) {
                        ctx.dom.off('onResultError').on('onResultError', function(ev) {
                            ctx.onEvent(data, ev.message);
                        });
                    }
                },
                onResultNull: {
                    set: function(ctx, data) {
                        ctx.dom.off('onResultNull').on('onResultNull', function(ev) {
                            ctx.onEvent(data, ev.message);
                        });
                    }
                },
                onTableClick: {
                    set: function(ctx, data) {
                        ctx.find('');
                    }
                },
                onTableBtnClick: {
                    set: function(ctx, data) {
                        ctx.find('thead > tr > th > a.btn, tbody > tr > td > a.btn').on('click', function() {
                            var out = {};
                            out.btn = $(this).attr('data-table-btn');
                            out.col = $(this).parent().attr('data-table-col');
                            if (out.col === out.btn) {
                                out.head = true;
                            } else {
                                out.head = false;
                            }
                            ctx.onEvent(data, out);
                        });
                    }
                }
            },
            actions: {
                fn: {
                    fn: function(ctx, action, result) {
                        if (typeof(action) === 'function') {
                            action(ctx, result);
                        }
                    }
                },
                open_content: {
                    fn: function(ctx, action, result) {
                        action.from = action.from || false;
                        action.target = action.target || ctx.name;
                        var tctx = ctx.IX(action.target);
                        tctx.RemoveChilds();
                        result = result || 'unknown';
                        if ((action.from === false) || (tctx === false)) {
                            return;
                        }
                        if ((!Object.has(tctx.model, action.from))) {
                            return;
                        }
                        if (!Object.has(tctx.prototype, 'child')) {
                            return;
                        }
                        var obj = [];
                        if (Object.has(tctx.model[action.from], result)) {
                            obj = tctx.model[action.from][result];
                        }
                        Object.keys(tctx.prototype.child, function(name, target) {
                            tctx.model[name] = obj;
                        });
                        tctx.RenderChilds();
                    }
                },
                call: {
                    fn: function(ctx, action) {
                        ctx.irix.toArray(action).forEach(function(call_event) {
                            Object.keys(call_event, function(component_name, event_name) {
                                var data = undefined;
                                if (typeof(event_name) === 'object') {
                                    data = event_name.data;
                                    event_name = event_name.name;
                                }
                                var curr_component = ctx.irix.IX(component_name);
                                if (!curr_component) {
                                    return;
                                }
                                var trg = ctx.IX(curr_component.name);
                                if (trg !== false) {
                                    if (trg.events[event_name] !== 'undefined') {
                                        trg.onEvent(trg.events[event_name], data);
                                    }
                                }
                            });
                        });
                    }
                },
                post: {
                    fn: function(ctx, action) {
                        var url = action.url || '/';
                        var params = ctx.toArray(action.send || []);
                        var send_params = {};
                        params.forEach(function(param) {
                            var res = ctx.IX(param);
                            if (!res) {
                                send_params[param] = null;
                            } else {
                                send_params[param] = res.get();
                            }
                        });
                        ctx.p('enabled', false);
                        $.post(url, send_params, function(response) {
                            ctx.p('enabled', true);
                            var kind = response.kind || false;
                            var status = response.status || false;
                            if (!kind) {
                                ctx.dom.trigger({
                                    type: "onConnectionError",
                                    message: response,
                                    ctx: ctx
                                });
                            }

                            if (kind === 'ok') {
                                ctx.dom.trigger({
                                    type: "onResultOk",
                                    message: response,
                                    ctx: ctx
                                });
                            } else {
                                if (status === 'return_is_null') {
                                    ctx.dom.trigger({
                                        type: "onResultNull",
                                        message: response,
                                        ctx: ctx
                                    });
                                } else {
                                    ctx.dom.trigger({
                                        type: "onResultError",
                                        message: response,
                                        ctx: ctx
                                    });
                                }
                            }
                        });
                    }
                },
                validate: {
                    fn: function(ctx, action) {
                        var kind = action.kind || false;
                        var target = action.target || false;
                        var message = action.message || '';
                        var shake = action.shake || false;
                        var clear = action.clear || false;
                        var hide = action.hide || 2000;
                        if (shake !== false) {
                            ctx.IX(shake).p('shake', true);
                        }
                        if (target !== false) {
                            if (clear === true) {
                                ctx.IX(target).set('');
                            }
                            ctx.IX(target).p('help', {
                                text: message,
                                hide: hide,
                                kind: kind
                            });
                        }
                    }
                }
            }
        }
);
toLog('RadiantXV ready', false, 'color:#04AC13;font-weight: bold;');