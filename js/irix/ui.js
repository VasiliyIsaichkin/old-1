/* IRIXUI Main implementation file
 * http://labs.iraxis.ru/irix/ui
 * ver. 0.7.6 / Red Machine
 * 
 * Copyright 2012-2013, Vasiliy Isaichkin
 * Prohibited the use, distribution and modification of the file separately from the product.
 * For this file applicable license of product (which this file is included)
 */

function IRIXUI_DATA_MODEL(ctx, model, name) {
    var self = this;
    self.ctx = ctx;
    self.irix = ctx.irix;
    self.raw = false;
    self.vars = {};
    self.last_load = false;
    self.name = name;
    self.model = model;
    self.services = model.services || {};
    self.service_result = false;
    self.tables = {};
    self.SetVar = function(name, what) {
        self.vars[name] = what;
    };
    self.GetVar = function(name, subparam) {
        if (Object.has(self.vars, name)) {
            if (typeof(subparam) === 'string') {
                return self.vars[name][subparam];
            } else {
                return self.vars[name];
            }
        }
    };
    self.DelVar = function(name) {
        if (Object.has(self.vars, name)) {
            self.vars = Object.reject(self.vars, name);
            return true;
        } else {
            return false;
        }
    };
    self.LoadData = function(url, args) {
        args = args || {};
        $('body').addClass('hidden');
        toLog('>>>>>>>>>>>>>>>>');
        var out = $.ajax({
            type: "POST",
            url: url,
            data: args,
            async: false
        }).responseText;
        toLog('<<<<<<<<<<<<<<<<<<<<');
        $('body').removeClass('hidden');
        return out;
    };
    self.Override = function(override) {
        if (self.Check()) {
            if (self.Get().length !== 0) {
                var new_data = Array();
                var vGetAll = self.GetOverrided(self.Get(), 'overrided');
                vGetAll.forEach(function(data_row_r) {
                    var data_row = Object.clone(data_row_r);
                    Object.keys(override, function(field, override_model) {
                        var out_var;
                        if (typeof(override_model) === 'function') {
                            var col = function(col_name, original) {
                                if (original) {
                                    return self.GetOverrided(data_row[col_name], 'original');
                                } else {
                                    return self.GetOverrided(data_row[col_name], 'overrided');
                                }
                            };
                            out_var = {overrided: override_model(col, self), original: data_row[field]};
                        } else
                        if (typeof(override_model) === 'object') {
                            if (Object.has(override_model, data_row[field].toString())) {
                                var founded = false;
                                Object.keys(override_model, function(override_model_field, override_model_val) {
                                    if (data_row[field].toString() === override_model_field.toString()) {
                                        out_var = {overrided: override_model_val, original: data_row[field]};
                                        founded = true;
                                    }
                                });
                                if (!founded && Object.has(override_model, '_$')) {
                                    out_var = {overrided: override_model['_$'], original: data_row[field]};
                                }
                            } else {
                                toLog('Cant find value [' + data_row[field] + '] in override model for field [' + field + ']', 'e');
                            }
                        } else {
                            out_var = override_modedl;
                        }
                        data_row[field] = out_var;
                    });
                    new_data.push(data_row);
                });
            }
            self.raw.data = new_data;
        }
    };
    self.MakeTables = function(tables) {
        if (self.Check()) {
            var source = self.GetOverrided(self.Get(), 'overrided');
            Object.keys(tables, function(new_table_name, table) {
                var new_table = [];
                source.forEach(function(source_row) {
                    var new_row = {};
                    Object.keys(table, function(table_field, table_field_model) {
                        if (table_field_model === true) {
                            if (Object.has(source_row, table_field)) {
                                new_row[table_field] = source_row[table_field];
                            }
                        } else
                        if (typeof(table_field_model) === 'function') {
                            var col = function(col_name) {
                                return source_row[col_name];
                            };
                            new_row[table_field] = table_field_model(col, self);
                        } else
                        if (typeof(table_field_model) === 'string') {
                            var fres = table_field_model.match(/%%(.*?)%%/);
                            if (typeof(fres) === 'object') {
                                if (Object.has(source_row, fres[1])) {
                                    table_field_model = table_field_model.split('%%' + fres[1] + '%%').join(source_row[fres[1]]);
                                }
                            }
                            new_row[table_field] = self.ctx.DX(table_field_model);
                        }

                    });
                    new_table.push(Object.clone(new_row));
                });
                self.tables[new_table_name] = new_table;
            });
        } else {
            return [];
        }
    };
    self.Renew = function() {
        self.Flush();
        if (typeof(model['server']) === 'undefined') {
            toLog('Dont know how get model [' + self.name + ']', 'e');
            return self;
        }
        var server_model = model.server;
        var server_arg = model.server.arg || {};
        var url = false;
        if (typeof(server_model['get']) !== 'undefined') {
            url = '/!' + server_model['get'];
        }
        if (url === false) {
            toLog('Dont know where get model [' + self.name + ']', 'e');
            return self;
        }
        var raw = self.LoadData(url, server_arg);
        if (raw === false) {
            return false;
        }
        raw.kind = raw.kind || 'null';
        raw.data = raw.data || [];
        raw.model = raw.model || [];
        self.raw = raw;
        self.last_load = Object.clone(self.raw);
        if (raw.kind !== 'ok') {
            return self;
        }
        self.Override(model['override'] || []);
        self.MakeTables(model['tables'] || []);
        return self;
    };
    self.Check = function() {
        if ((self.raw === false)) {
            self.Renew();
            if (self.raw === false) {
                return false;
            }
        }
        return true;
    };
    self.Flush = function() {
        self.raw = false;
        self.last_load = false;
    };
    self.Kind = function() {
        if (self.Check()) {
            return self.raw.kind;
        } else {
            return false;
        }
    };

    /** Universal table getter
     filter > filter variable [string or object (use keys enumiration) for column filtering] or ['' or false for dont use column filtering]
     field > field (only with val) 
     val > field (only with field) search [only one row where field=val] or [all rows if undefined] */
    self.Get = function(filter, field, val, param2) {
        if (self.Check()) {
            if (self.Kind() !== 'ok') {
                return [];
            }
            var table = self.irix.toArray(self.raw.data);
            if (table.length === 0) {
                return [];
            }
            if ((typeof(filter) !== 'undefined') && (filter !== false) && (filter !== '')) {
                if (!Object.has(table[0], filter)) {
                    self.MakeTables(self.model['tables'] || []);
                    if (Object.has(self.tables, filter)) {
                        table = self.tables[filter];
                        if (typeof(param2) === 'string') {
                            filter = param2;
                        } else {
                            filter = false;
                        }
                    }
                }
            }

            //filter prepare
            if ((filter === '') || (filter === false) || (typeof(filter) === 'undefined')) {
                filter = false;
            }
            if (typeof(filter) === 'string') {
                var new_filter = {};
                new_filter[filter] = '';
                filter = new_filter;
            }
            var new_table = [];
            var out_object = {};
            //Process table

            var use_row_search = false;
            var founded = false;
            if (typeof(val) !== 'undefined') {
                use_row_search = true;
            }
            table.forEach(function(row) {
                if (founded)
                    return;
                if (Object.has(row, field)) {
                    if (row[field].toString() === val.toString()) {
                        use_row_search = true;
                        founded = true;
                        if (filter !== false) {
                            out_object = Object.select(row, filter);
                        } else {
                            out_object = Object.clone(row);
                        }
                    }
                }
                if (filter !== false) {
                    var ppush = Object.clone(Object.select(row, filter));
                    if (Object.size(ppush) > 0) {
                        new_table.push(ppush);
                    }
                } else {
                    if (Object.size(Object.clone(row)) > 0) {
                        new_table.push(Object.clone(row));
                    }
                }
            });
            if (use_row_search) {
                if (founded === false) {
                    return {};
                }
                if (filter === false) {
                    return out_object;
                }
                if (Object.size(filter) === 1) {
                    var pout = {};
                    Object.keys(out_object, function(key, value) {
                        pout = value;
                    });
                    return pout;
                } else {
                    return out_object;
                }
            } else {
                if (filter === false) {
                    return new_table;
                }
                if ((Object.size(filter) === 1) && (new_table.length === 1)) {
                    var pout = {};
                    Object.keys(new_table[0], function(key, value) {
                        pout = value;
                    });
                } else {
                    return new_table;
                }
            }
        } else {
            return false;
        }
    };
    self.DataModel = function() {
        if (self.Check()) {
            return self.raw.model;
        } else {
            return false;
        }
    };
    self.RunService = function(name) {
        if (Object.has(self.services, name)) {
            self.service_result = self.services[name](self, self.ctx);
            return true;
        } else {
            self.service_result = false;
            return false;
        }
    };
    self.ProcessOverrided = function(what, key) {
        var new_obj = {};
        Object.keys(what, function(el, val) {
            if (typeof(val) === 'object') {
                new_obj[el] = val[key];
            } else {
                new_obj[el] = val;
            }
        });
        return new_obj;
    };
    self.GetOverrided = function(what, key) {
        if (typeof(what) !== 'object') {
            return what;
        }
        if (typeof(what.length) !== 'undefined') {
            var out_arr = [];
            what.forEach(function(row) {
                var new_row = {};
                Object.keys(row, function(field, value) {
                    if (typeof(value) === 'object') {
                        new_row[field] = value[key];
                    } else {
                        new_row[field] = value;
                    }
                });
                out_arr.push(new_row);
            });
            return out_arr;
        } else {
            if ((Object.has(what, 'overrided')) && (Object.has(what, 'original')) && (Object.size(what) === 2)) {
                return what[key];
            } else {
                var new_row = {};
                Object.keys(what, function(field, value) {
                    if (typeof(value) === 'object') {
                        new_row[field] = value[key];
                    } else {
                        new_row[field] = value;
                    }
                });
                return new_row;
            }
            return what[key];
        }
    };
    self.Query = function(query, doupdate) {
        doupdate = doupdate || false;
        self.model.override = self.model.override || {};
        var query_exploded = String.explode('/', query);
        var target_exploded = String.explode('?', query_exploded[0]);
        var param = query_exploded[1] || false;
        var target = target_exploded[0];
        var fquery = target_exploded[1];
        var use_external_key = false;
        if (fquery) {
            if (fquery.first() === '<') {
                fquery = fquery.remove('<');
                use_external_key = true;
            } else {
                use_external_key = false;
            }
            var togetvar = String.explode('=', fquery)[1]
            if (self.GetVar(togetvar)) {
                fquery = String.explode('=', fquery)[0] + '=' + self.GetVar(togetvar);
            }
        }
        var param2;
        if (query_exploded[2]) {
            var param2 = query_exploded[2];
        }
        var fold_to_array = false;
        var qusrch = String.explode('?', param)[1];
        if (qusrch) {
            param = String.explode('?', param)[0];
        }
        if (typeof(param) === 'string') {
            if (qusrch) {
                var param2p = param2;
                param2 = false;
            }
            if (typeof(self.GetVar(param, param2)) !== 'undefined') {
                var pxresult = self.GetVar(param, param2);
                if (qusrch) {
                    if (pxresult.forEach) {
                        var newv = pxresult;
                        pxresult.forEach(function(pxresult_el) {
                            if (Object.has(pxresult_el, String.explode('=', qusrch)[0])) {
                                if (pxresult_el[String.explode('=', qusrch)[0]].toString() === String.explode('=', qusrch)[1].toString()) {
                                    newv = pxresult_el;
                                }
                            }
                        });
                        if (param2p)
                            if (param2p.first() === '+') {
                                param2p = param2p.remove('+');
                                self.SetVar(param2p, newv);
                            }
                        return newv;
                    }
                }
                return pxresult;
            }
            if (param.first() === '#') {
                fold_to_array = true;
                param = param.remove('#');
            }
        }
        if (query_exploded[2]) {
            var param2 = query_exploded[2];
        } else {
            var param2;
        }
        var selector_value;
        var selector_column;
        if (fquery) {
            var selector_exploded = String.explode('=', fquery);
            if (use_external_key) {
                self.model.server.arg = {};
                self.model.server.arg[selector_exploded[0]] = selector_exploded[1];
            } else {
                self.model.server.arg = {};
                selector_column = selector_exploded[0];
                selector_value = selector_exploded[1];
            }
        }
        if (self.RunService(param)) {
            return self.service_result;
        }
        if (self.Check()) {
            //@todo: if first&nocache twisted load
            if ((self.model.nocache === true) || doupdate) {
                self.Renew();
            }
            var get_res = self.Get(param, selector_column, selector_value, param2);
            //fold_to_array
            if (target.first() === '#') {
                if (!param) {
                    return self.model.override;
                } else {
                    if (Object.has(self.model.override, param)) {
                        if (Object.has(self.model.override[param], '_$')) {
                            delete self.model.override[param]['_$'];
                        }
                        if (typeof(self.model.override[param]) === 'object') {
                            return self.model.override[param];
                        } else {
                            return {};
                        }
                    } else {
                        return {};
                    }
                }
                return self.GetOverrided(get_res, 'original');
            }
            if (target.first() === '@') {
                return get_res;
            }
            if (target.first() === '^') {
                return self.GetOverrided(get_res, 'original');
            }
            //query
            return self.GetOverrided(get_res, 'overrided');

        }

    };
    return self;
}

function IRIXUI_DATA_MODELS(ctx) {
    var self = this;
    self.irix = ctx;
    self.models = {};
    self.AddModel = function(models) {
        models = models || {};
        Object.keys(models, function(model_name, model) {
            self.models[model_name] = new IRIXUI_DATA_MODEL(self, model, model_name);
        });
    };
    self.GetModel = function(name) {
        if (typeof(self.models[name]) === 'undefined') {
            return false;
        }
        return self.models[name];
    };
    self.DX = function(query, setter) {
        var struct = String.explode('/', query);
        if (typeof(setter) === 'object') {
            if ((setter.data) && (setter.key) && (typeof(setter.val) !== 'undefined')) {
                var curr = self.DX(struct[0] + ':');
                if (typeof(curr.raw) === 'undefined') {
                    return false;
                }
                var send = {};
                Object.keys(setter.data, function(field, value) {
                    if (!Object.has(curr.raw.model, field)) {
                        toLog('Cant find in model [' + field + '] schema', 'e');
                        toLog(curr.raw.model, 'e');
                        return false;
                    }
                    var field_type = curr.raw.model[field].type;
                    if ((field_type === 'I') || (field_type === 'A')) {
                        var number = String(value).match(/\d+$/);
                        send[field] = parseInt(number, 10);
                        if (isNaN(send[field])) {
                            send[field] = 0;
                        }
                    } else {
                        send[field] = String(value);
                    }
                });
                if (setter.val === false) {
                    if (typeof(curr.model.server.add) !== 'string') {
                        return false;
                    }
                    var ret = curr.LoadData('!' + curr.model.server.add, send);
                    return;
                } else {
                    if (typeof(curr.model.server.update) !== 'string') {
                        return false;
                    }
                    send[setter.key] = setter.val;
                    return curr.LoadData('!' + curr.model.server.update, send);
                }
            }
        }
        var do_update = false;
        if (struct[0].last() === '!') {
            struct[0] = struct[0].remove('!');
            do_update = true;
        }
        var model_name = String.explode('?', struct[0])[0];
        var param = struct[1];
        if (model_name.first() === '@') {
            var model_name = model_name.remove('@');
        }
        if (model_name.first() === '^') {
            var model_name = model_name.remove('^');
        }
        if (model_name.first() === '#') {
            var model_name = model_name.remove('#');
        }
        if (model_name.last() === ':') {
            var model_name = model_name.remove(':');
            if (!Object.has(self.models, model_name)) {
                return false;
            } else {
                return self.models[model_name];
            }
        }
        if (!Object.has(self.models, model_name)) {
            return false;
        }
        var new_var;
        var setvar_name = model_name;
        if (typeof(param) !== 'undefined') {
            if (param.first() === '+') {
                new_var = param.remove('+');
                var new_var_exploded = String.explode('.', new_var);
                if (new_var_exploded[1]) {
                    new_var = new_var_exploded[1];
                    setvar_name = new_var_exploded[0];
                } else {
                    new_var = new_var_exploded[0];
                }
                struct.splice(1, 1);
            }
            if (param.first() === '-') {
                var new_var_exploded = String.explode('.', param.substr(1));
                if (new_var_exploded[1]) {
                    var del_var = new_var_exploded[1];
                    setvar_name = new_var_exploded[0];
                } else {
                    var del_var = new_var_exploded[0];
                }
                return self.models[setvar_name].DelVar(del_var);
            }
        }
        var result = self.models[model_name].Query(struct.join('/'), do_update);
        if (typeof(new_var) !== 'undefined') {
            self.models[setvar_name].SetVar(new_var, result);
        }
        return result;
    };
}

function IRIXUI_CONTROL_PROPERTIES(ctx) {
    var self = this;

    // Properties stack
    self.items = {};

    /** Get - Get property value by name
     * @param {string} name - Property name
     * @returns {any} - Property value 
     */
    self.Get = function(name) {
        //Search in stack
        var ret;
        if (!Object.has(self.items, name)) {
            return undefined;
        }
        var item = self.items[name];
        if (typeof(item.get) === 'function') {
            //If property has getter return dynamic value
            ret = item.get(ctx);
        } else {
            //else return static
            ret = item.value;
        }
        return ret;
    };

    /** Set - Set value of property by name
     * @param {string} name - Property name
     * @param {any} value - Property value, if argument not defined will be used value saved in property object
     * @returns {undefined}
     */
    self.Set = function(name, value) {
        //Search in stack
        if (!Object.has(self.items, name)) {
            toLog('Cant set value [' + value + '] for [' + name + ']', 'e');
            return false;
        }
        var item = self.items[name];
        if (typeof(value) === 'undefined') {
            value = item.value; //if value unundefined use saved value
        }
        //if property has remove function call her
        if (typeof(item.remove) === 'function') {
            item.remove(ctx, item.value); //call with old value
        }
        item.value = value; // save new value
        //if property has set function call her
        if (typeof(item.set) === 'function') {
            item.set(ctx, value); //call with new value
        }
    };

    /** Load - Add all properties protoptypes into stack
     * @param {Array} properties - properties protoptypes
     */
    self.Load = function(properties) {
        Object.keys(properties, function(property_name, property) {
            var new_property = Object.clone(property);
            if (!Object.has(ctx.model, property_name)) {
                //If the current model of this control not have value for this property - use default value from prototype
                new_property.value = new_property.default;
            } else {
                //else use value from model
                new_property.value = ctx.model[property_name];
            }
            new_property.uid = GUID();
            self.items[property_name] = new_property;
        });
    };

    /** Apply - Set all values from saved in stack
     */
    self.Apply = function() {
        Object.keys(self.items, function(name) {
            self.Set(name);
        });
    };
    return self;
}
function IRIXUI_COLLECTIONS() {
    var self = this;
    self.ui_contols = {};
    self.events = {};
    self.actions = {};
    self.Get = function(from, name, error_cb) {
        if (!Object.has(from, name)) {
            if (typeof(error_cb) === 'function') {
                error_cb(self);
            }
            return false;
        } else {
            return from[name];
        }
    };
    self.GetControl = function(name, error_cb) {
        return self.Get(self.ui_contols, name, error_cb);
    };
    this.GetEvent = function(name, error_cb) {
        return self.Get(self.events, name, error_cb);
    };
    this.GetAction = function(name, error_cb) {
        return self.Get(self.actions, name, error_cb);
    };
    this.Register = function(collection_model) {
        Object.keys(collection_model, function(type, model) {
            if (Object.has(self, type)) {
                self[type] = Object.merge(self[type], model, false, false);
            } else {
                toLog('Fail to register unknown [' + type + '] type', 'e');
            }
        });
    };
    return this;
}
function IRIXUI_CONTROL(control, ctx, dom, parent) {
    var self = this;
    //Basic properties
    self.parent = parent;
    self.uid = control.uid || GUID();
    self.name = control.name || self.uid;
    self.basic_name = self.name;
    if (typeof(self.parent.name_postfix) !== 'undefined') {
        self.name_postfix = self.parent.name_postfix;
        self.name = self.name + self.name_postfix;
    }
    self.name_postfix = control.name_postfix || '';

    self.dom_point = dom;
    self.draw_point = dom;
    self.dom = false;
    self.model = control;
    self.ui = control.ui || 'unknown';
    self.irix = ctx;
    self.IX = self.irix.IX;
    self.DX = self.irix.DX;
    self.events = {};
    self.prototype = ctx.collections.GetControl(self.ui);
    self.toArray = function(item) {
        if (!Array.isArray(item)) {
            item = item || {};
            item = [item];
        }
        return item;
    };
    self.copyArray = function(item) {
        var out = [];
        if (Array.isArray(item)) {
            item.forEach(function(el) {
                out.push(Object.clone(el));
            });
        }
        return out;
    };
    if (self.prototype === false) {
        toLog('Cant find prototype [' + self.ui + '] for control [' + self.name + ']', 'e');
        return false;
    }
    self.common_properties = {
        render: {
            default: 'jquery'
        },
        html_attr: {
            default: false,
            set: function(ctx, params) {
                if (typeof(params) === 'object') {
                    Object.keys(params, function(name, param) {
                        ctx.dom.attr(name, param);
                    });
                }
            }
        },
        field: {
            default: false,
            set: function(ctx, param) {
                ctx.dom.removeAttr('data-irix-field');
                if (param !== false) {
                    ctx.dom.attr('data-irix-field', param);
                }
            },
            get: function(ctx) {
                return ctx.dom.attr('data-irix-field');
            }
        },
        enabled: {
            default: true,
            set: function(ctx, param) {
                if (param === false) {
                    ctx.dom.attr("disabled", "disabled");
                } else {
                    ctx.dom.removeAttr("disabled");
                }
            }
        },
        visible: {
            default: null,
            set: function(ctx, param) {
                if (param === false) {
                    ctx.dom.addClass("hide");
                }
                if (param === true) {
                    ctx.dom.removeClass("hide");
                }
            }
        }
    };
    self.properties = new IRIXUI_CONTROL_PROPERTIES(self);
    self.p = function(name, value) {
        if (typeof(value) === 'undefined') {
            return self.properties.Get(name);
        }
        self.properties.Set(name, value);
        return self;
    };
    self.find = function(filter) {
        return self.dom.find(filter);
    };

    self.get = function() {
        if (typeof(self.prototype.get) === 'function') {
            return self.prototype.get(self);
        } else {
            toLog('Cant get [' + self.name + '] value, in prototype [' + self.ui + '] miss get function', 'e');
            return null;
        }
    };

    self.set = function(value) {
        if (typeof(self.prototype.set) === 'function') {
            self.prototype.set(self, value);
            return self;
        } else {
            toLog('Cant set to [' + self.name + '] value [' + value + '], in prototype [' + self.ui + ']   miss set function', 'e');
        }
    };

    self.properties.Load(self.common_properties);
    self.properties.Load(self.prototype.properties || {});

    //Rendring
    self.html = '';
    if (typeof(self.prototype.render) === 'function') {
        self.html = self.prototype.render(self);
    }

    self.Draw = function() {
        if (self.parent === false) {
            self.draw_point = $(self.dom_point);
        } else {
            var selc = self.parent.find(dom);
            if (selc.length > 0) {
                self.draw_point = selc;
            } else {
                self.draw_point = selc.andSelf();
            }
        }
        if (self.p('render') === 'jquery') {
            self.draw_point.append(self.html);
        }
        self.dom = $('#' + self.name);
        self.dom.attr('data-irixui-uid', self.uid);
        self.dom.attr('data-basic-name', self.basic_name);
        if (typeof(self.prototype.draw) === 'function') {
            self.html = self.prototype.draw(self);
        }
        self.properties.Apply();
    };

    self.RenderChilds = function() {
        var prototype_childs = self.prototype.child || {};
        self.RemoveChilds();
        Object.keys(prototype_childs, function(child_name, dom) {
            if (typeof(self.model[child_name]) !== 'undefined') {
                self.toArray(self.model[child_name]).forEach(function(child) {
                    self.irix.AddControl(child, dom, self);
                });
            }
        });
        self.dom.trigger({
            type: "onChildsShow",
            ctx: self
        });
    };
    self.GetChilds = function() {
        var out = {};
        if (typeof(self.dom.find) === 'undefined') {
            return out;
        }
        self.dom.find('[data-irixui-uid]').each(function(el) {
            var curr_id = $(this).attr('data-irixui-uid');
            var curr = self.IX(curr_id);
            if (curr !== false) {
                out[curr_id] = curr;
            }
        });
        return out;
    };
    self.Call = function(action, param) {
        self.onEvent({call: action}, param);
    };
    self.onEvent = function(actions, result) {
        self.irix.toArray(actions).forEach(function(action_model) {
            self.irix.toArray(action_model).forEach(function(actions_set) {
                Object.keys(actions_set, function(action_name, action_model) {
                    var action = self.irix.collections.GetAction(action_name, function() {
                        toLog('Action [' + action_name + '] for control [' + self.name + '] not found in collections', 'e');
                    });
                    //Run included events
                    if (typeof(action_model.events) === 'object') {
                        self.irix.Events(self, action_model.events);
                    }
                    //Run action
                    if (typeof(action.fn) === 'function') {
                        action.fn(self, action_model, result);
                    }
                });
            });
        });

    };

    self.Open = function(page_name, params) {
        return self.irix.router.Open(page_name, params);
    };

    self.RemoveChilds = function() {
        Object.keys(self.GetChilds(), function(uid, obj) {
            self.irix.RemoveControl(uid);
        });
    };

    self.Remove = function() {
        self.RemoveChilds();
        if (typeof(self.prototype.remove) === 'function') {
            self.prototype.remove(self);
        }
        self.dom.remove();
        self.dom = false;
        return self.uid;
    };
    return this;
}
function IRIXUI() {
    var self = this;
    self.collections = new IRIXUI_COLLECTIONS();
    self.controls = {};
    self.IX = function(search_string) {
        if (Object.has(self.controls, search_string)) {
            return self.controls[search_string];
        } else {
            var ret;
            Object.keys(self.controls, function(uid, control) {
                if (control.name === search_string) {
                    ret = control;
                }
            });
            return ret;
        }
        return false;
    };
    self.forEach = function(callback) {
        Object.keys(self.controls, function(uid, object) {
            callback(object, uid);
        });
    };
    self.toArray = function(item) {
        if (!Array.isArray(item)) {
            item = item || {};
            item = [item];
        }
        return item;
    };
    self.RemoveControl = function(name) {
        var curr = self.IX(name) || false;
        if (curr !== false) {
            var cuid = curr.Remove();
            delete self.controls[cuid];
        }
    };
    self.AddControl = function(control, dom_point, parent) {
        dom_point = dom_point || 'body';
        parent = parent || false;
        var new_control = new IRIXUI_CONTROL(control, self, dom_point, parent);
        if (new_control !== false) {
            self.controls[new_control.uid] = new_control;
            if (typeof(new_control.Draw) === 'function') {
                new_control.Draw();
            }
            if (Object.has(self.bl_model, new_control.name)) {
                if (Object.has(self.bl_model[new_control.name], 'onShow')) {
                    self.Events(new_control, {onShow: self.bl_model[new_control.name].onShow});
                }
            }
            new_control.dom.trigger({
                type: "onShow",
                ctx: new_control
            });
            new_control.RenderChilds();
            if (Object.has(self.bl_model, new_control.name)) {
                self.Events(new_control, self.bl_model[new_control.name]);
            }
            new_control.dom.trigger({
                type: "onAfterShow",
                ctx: new_control
            });

        }
    };
    self.Render = function(view_model, bl_model, dom_point) {
        self.view_model = self.toArray(view_model);
        self.bl_model = bl_model;
        self.view_model.forEach(function(view_model_element) {
            self.AddControl(view_model_element, dom_point);
        });
    };

    self.Events = function(target, events) {
        Object.keys(events, function(event_name, event_model) {
            var event_proto = self.collections.GetEvent(event_name, function() {
                toLog('Event [' + event_name + '] for control [' + target.name + '] not found in collections', 'e');

            });
            target.events[event_name] = event_model;
            if (typeof(event_proto.set) === 'function') {
                event_proto.set(target, event_model);
            }
        });
    };


    self.ClearAll = function() {
        self.view_model = self.view_model || [];
        self.view_model.forEach(function(el) {
            self.RemoveControl(el.name);
        });
    };
    self.data = new IRIXUI_DATA_MODELS(self);
    self.DX = self.data.DX;
    self.router = new IRIXUI_ROUTER(self);

    self.Add = function(model) {
        self.router.Add(model);
    };

    self.Open = function(page_name, params) {
        return self.router.Open(page_name, params);
    };

    toLog('IRIX.UI ready', false, 'color:#04AC13;font-weight: bold;');
    $(window).bind("popstate", function() {
        self.router.OpenUrl(history.location || document.location);
    });
    return this;
}
function IRIXUI_ROUTER(ctx) {
    var self = this;
    self.irix = ctx;
    self.default_page = 'index';
    self.pages = {};
    self.redirects = {};
    self.prefix = '';
    self.after_show = {};

    self.AddAfterOpen = function(name, fn) {
        self.after_show[name] = fn;
    };

    self.Add = function(model) {
        self.pages = Object.merge(self.pages, model);
    };
    self.AddEvents = function(page_name, model) {
        if (typeof(self.pages[page_name]) !== 'object') {
            self.pages[page_name] = {};
        }
        self.pages[page_name].events = model;
    };
    self.AddView = function(page_name, model) {
        if (typeof(self.pages[page_name]) !== 'object') {
            self.pages[page_name] = {};
        }
        self.pages[page_name].controls = model;
    };
    self.AddFn = function(page_name, fn) {
        if (typeof(self.pages[page_name]) !== 'object') {
            self.pages[page_name] = {};
        }
        self.pages[page_name].fn = fn;
    };

    self.RedirectIf = function(rname, test, exclude, redirect) {
        self.redirects[rname] = {test: test, exclude: exclude, redirect: redirect};
    };


    self.OpenUrl = function(url) {
        if (url.hash.length > 1) {
            return false;
        } else {
            var src = url.pathname;
        }
        src = src.remove(self.prefix);
        if (src.length > 0) {
            if (src.charAt(0) !== '/') {
                src = '/' + src;
            }
        } else {
            src = '/';
        }
        var struct = src.split('/');
        var page_name = struct[1];
        if (page_name.length < 1) {
            page_name = self.default_page;
        }
        delete struct[0];
        delete struct[1];
        self.Open(page_name, struct);
    };

    self.current = {
        page_name: false,
        params: false
    };

    self.Open = function(page_name, params) {
        toLog('Open page [' + self.prefix + page_name + ']');
        self.current.page_name = page_name;
        self.current.params = params;
        var cancel = false;
        Object.keys(self.redirects, function(rname, redir) {
            if (redir.test(self.irix) === true) {
                var pass = false;
                var arr = self.irix.toArray(redir.exclude);
                arr.push(redir.redirect);
                arr.forEach(function(exclude) {
                    if (exclude === page_name) {
                        pass = true;
                    }
                });
                if (!pass) {
                    toLog('Redirect to page [' + self.prefix + redir.redirect + ']');
                    cancel = true;
                    self.Open(redir.redirect);
                }
            }
        });
        if (cancel) {
            return;
        }

        if (!Object.has(self.pages, page_name)) {
            toLog('Cant open page [' + page_name + '], page not found', 'e');
            return false;
        }
        var page = self.pages[page_name];
        if (typeof(page) !== 'object') {
            toLog('Cant open page [' + page_name + '], is not object', 'e');
            return false;
        }
        if (typeof(page.fn) === 'function') {
            page.controls = {
                ui: 'dummy',
                name: 'dummy_fn'
            };
            page.events = {
                dummy_fn: {
                    onShow: {
                        fn: function(ctx, result) {
                            page.fn(ctx, result);
                        }
                    }
                }
            };
        }
        page.target = page.target || 'body';
        if (typeof(page.controls) !== 'object') {
            toLog('Cant open page [' + page_name + '], controls not defined', 'e');
            return false;
        }
        if (typeof(page.events) !== 'object') {
            toLog('Cant open page [' + page_name + '], events not defined', 'e');
            return false;
        }
        self.irix.ClearAll();
        history.pushState(null, null, page_name);
        self.irix.Render(page.controls, page.events, page.target);
        Object.keys(self.after_show, function(curr_as_name, curr_as_fn) {
            curr_as_fn(self.irix, page);
        });
    };
}
toLog('Make IRIXUI global instance');
irixui = new IRIXUI();
