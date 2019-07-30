/* IRIXUI initializer & loader (IRIXUI ILo)
 * http://labs.iraxis.ru/irix/ui
 * ver. 0.7.6 / Red Machine
 * 
 * Copyright 2012-2013, Vasiliy Isaichkin
 * Released under the MIT, BSD, and GPL Licenses.
 */

IRIXUI_ILO = {};
IRIXUI_ILO.config_file = '/js/config.js';
/** yepnope 1.5.4 | WTFPL */
(function(a, b, c) {
    function d(a) {
        return"[object Function]" == o.call(a)
    }
    function e(a) {
        return"string" == typeof a
    }
    function f() {
    }
    function g(a) {
        return!a || "loaded" == a || "complete" == a || "uninitialized" == a
    }
    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function() {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c])
                    y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }
        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {t: d, s: c, e: f, a: i, x: j};
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }
    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }
    function k() {
        var a = B;
        return a.loader = {load: j, i: 0}, a
    }
    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance"in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function(a) {
        return"[object Array]" == o.call(a)
    }, x = [], y = {}, z = {timeout: function(a, b) {
            return b.length && (a.timeout = b[0]), a
        }}, A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {url: c, origUrl: c, prefixes: a}, e, f, g;
            for (f = 0; f < d; f++)
                g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++)
                c = x[f](c);
            return c
        }
        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))
                        c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        }), g(a, j, b, 0, h);
                    else if (Object(a) === a)
                        for (n in m = function() {
                            var b = 0, c;
                            for (c in a)
                                a.hasOwnProperty(c) && b++;
                            return b
                        }(), a)
                            a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                var a = [].slice.call(arguments);
                                k.apply(this, a), l()
                            } : j[n] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), l()
                                }
                            }(k[n])), g(a[n], j, b, n, h))
                } else
                    !c && l()
            }
            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a))
            g(a, 0, l, 0);
        else if (w(a))
            for (i = 0; i < a.length; i++)
                j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
        else
            Object(a) === a && h(a, l)
    }, B.addPrefix = function(a, b) {
        z[a] = b
    }, B.addFilter = function(a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d)
            k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function() {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d)
            e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
})(this, document);
/** Heartcode CanvasLoader */
(function(w) {
    var k = function(b, c) {
        typeof c == "undefined" && (c = {});
        this.init(b, c)
    }, a = k.prototype, o, p = ["canvas", "vml"], f = ["oval", "spiral", "square", "rect", "roundRect"], x = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, v = navigator.appVersion.indexOf("MSIE") !== -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) === 8 ? true : false, y = !!document.createElement("canvas").getContext, q = true, n = function(b, c, a) {
        var b = document.createElement(b), d;
        for (d in a)
            b[d] = a[d];
        typeof c !== "undefined" && c.appendChild(b);
        return b
    }, m = function(b, c) {
        for (var a in c)
            b.style[a] = c[a];
        return b
    }, t = function(b, c) {
        for (var a in c)
            b.setAttribute(a, c[a]);
        return b
    }, u = function(b, c, a, d) {
        b.save();
        b.translate(c, a);
        b.rotate(d);
        b.translate(-c, -a);
        b.beginPath()
    };
    a.init = function(b, c) {
        if (typeof c.safeVML === "boolean")
            q = c.safeVML;
        try {
            this.mum = document.getElementById(b) !== void 0 ? document.getElementById(b) : document.body
        } catch (a) {
            this.mum = document.body
        }
        c.id = typeof c.id !== "undefined" ? c.id : "canvasLoader";
        this.cont = n("div", this.mum, {id: c.id});
        if (y)
            o = p[0], this.can = n("canvas", this.cont), this.con = this.can.getContext("2d"), this.cCan = m(n("canvas", this.cont), {display: "none"}), this.cCon = this.cCan.getContext("2d");
        else {
            o = p[1];
            if (typeof k.vmlSheet === "undefined") {
                document.getElementsByTagName("head")[0].appendChild(n("style"));
                k.vmlSheet = document.styleSheets[document.styleSheets.length - 1];
                var d = ["group", "oval", "roundrect", "fill"], e;
                for (e in d)
                    k.vmlSheet.addRule(d[e], "behavior:url(#default#VML); position:absolute;")
            }
            this.vml = n("group", this.cont)
        }
        this.setColor(this.color);
        this.draw();
        m(this.cont, {display: "none"})
    };
    a.cont = {};
    a.can = {};
    a.con = {};
    a.cCan = {};
    a.cCon = {};
    a.timer = {};
    a.activeId = 0;
    a.diameter = 40;
    a.setDiameter = function(b) {
        this.diameter = Math.round(Math.abs(b));
        this.redraw()
    };
    a.getDiameter = function() {
        return this.diameter
    };
    a.cRGB = {};
    a.color = "#000000";
    a.setColor = function(b) {
        this.color = x.test(b) ? b : "#000000";
        this.cRGB = this.getRGB(this.color);
        this.redraw()
    };
    a.getColor = function() {
        return this.color
    };
    a.shape = f[0];
    a.setShape = function(b) {
        for (var c in f)
            if (b === f[c]) {
                this.shape = b;
                this.redraw();
                break
            }
    };
    a.getShape = function() {
        return this.shape
    };
    a.density = 40;
    a.setDensity = function(b) {
        this.density = q && o === p[1] ? Math.round(Math.abs(b)) <= 40 ? Math.round(Math.abs(b)) : 40 : Math.round(Math.abs(b));
        if (this.density > 360)
            this.density = 360;
        this.activeId = 0;
        this.redraw()
    };
    a.getDensity = function() {
        return this.density
    };
    a.range = 1.3;
    a.setRange = function(b) {
        this.range = Math.abs(b);
        this.redraw()
    };
    a.getRange = function() {
        return this.range
    };
    a.speed = 2;
    a.setSpeed = function(b) {
        this.speed = Math.round(Math.abs(b))
    };
    a.getSpeed = function() {
        return this.speed
    };
    a.fps = 24;
    a.setFPS = function(b) {
        this.fps = Math.round(Math.abs(b));
        this.reset()
    };
    a.getFPS = function() {
        return this.fps
    };
    a.getRGB = function(b) {
        b = b.charAt(0) === "#" ? b.substring(1, 7) : b;
        return{r: parseInt(b.substring(0, 2), 16), g: parseInt(b.substring(2, 4), 16), b: parseInt(b.substring(4, 6), 16)}
    };
    a.draw = function() {
        var b = 0, c, a, d, e, h, k, j, r = this.density, s = Math.round(r * this.range), l, i, q = 0;
        i = this.cCon;
        var g = this.diameter;
        if (o === p[0]) {
            i.clearRect(0, 0, 1E3, 1E3);
            t(this.can, {width: g, height: g});
            for (t(this.cCan, {width: g, height: g}); b < r; ) {
                l = b <= s ? 1 - 1 / s * b : l = 0;
                k = 270 - 360 / r * b;
                j = k / 180 * Math.PI;
                i.fillStyle = "rgba(" + this.cRGB.r + "," + this.cRGB.g + "," + this.cRGB.b + "," + l.toString() + ")";
                switch (this.shape) {
                    case f[0]:
                    case f[1]:
                        c = g * 0.07;
                        e = g * 0.47 + Math.cos(j) * (g * 0.47 - c) - g * 0.47;
                        h = g * 0.47 + Math.sin(j) * (g * 0.47 - c) - g * 0.47;
                        i.beginPath();
                        this.shape === f[1] ? i.arc(g * 0.5 + e, g * 0.5 + h, c * l, 0, Math.PI * 2, false) : i.arc(g * 0.5 + e, g * 0.5 + h, c, 0, Math.PI * 2, false);
                        break;
                    case f[2]:
                        c = g * 0.12;
                        e = Math.cos(j) * (g * 0.47 - c) + g * 0.5;
                        h = Math.sin(j) * (g * 0.47 - c) + g * 0.5;
                        u(i, e, h, j);
                        i.fillRect(e, h - c * 0.5, c, c);
                        break;
                    case f[3]:
                    case f[4]:
                        a = g * 0.3, d = a * 0.27, e = Math.cos(j) * (d + (g - d) * 0.13) + g * 0.5, h = Math.sin(j) * (d + (g - d) * 0.13) + g * 0.5, u(i, e, h, j), this.shape === f[3] ? i.fillRect(e, h - d * 0.5, a, d) : (c = d * 0.55, i.moveTo(e + c, h - d * 0.5), i.lineTo(e + a - c, h - d * 0.5), i.quadraticCurveTo(e + a, h - d * 0.5, e + a, h - d * 0.5 + c), i.lineTo(e + a, h - d * 0.5 + d - c), i.quadraticCurveTo(e + a, h - d * 0.5 + d, e + a - c, h - d * 0.5 + d), i.lineTo(e + c, h - d * 0.5 + d), i.quadraticCurveTo(e, h - d * 0.5 + d, e, h - d * 0.5 + d - c), i.lineTo(e, h - d * 0.5 + c), i.quadraticCurveTo(e, h - d * 0.5, e + c, h - d * 0.5))
                }
                i.closePath();
                i.fill();
                i.restore();
                ++b
            }
        } else {
            m(this.cont, {width: g, height: g});
            m(this.vml, {width: g, height: g});
            switch (this.shape) {
                case f[0]:
                case f[1]:
                    j = "oval";
                    c = 140;
                    break;
                case f[2]:
                    j = "roundrect";
                    c = 120;
                    break;
                case f[3]:
                case f[4]:
                    j = "roundrect", c = 300
            }
            a = d = c;
            e = 500 - d;
            for (h = -d * 0.5; b < r; ) {
                l = b <= s ? 1 - 1 / s * b : l = 0;
                k = 270 - 360 / r * b;
                switch (this.shape) {
                    case f[1]:
                        a = d = c * l;
                        e = 500 - c * 0.5 - c * l * 0.5;
                        h = (c - c * l) * 0.5;
                        break;
                    case f[0]:
                    case f[2]:
                        v && (h = 0, this.shape === f[2] && (e = 500 - d * 0.5));
                        break;
                    case f[3]:
                    case f[4]:
                        a = c * 0.95, d = a * 0.28, v ? (e = 0, h = 500 - d * 0.5) : (e = 500 - a, h = -d * 0.5), q = this.shape === f[4] ? 0.6 : 0
                }
                i = t(m(n("group", this.vml), {width: 1E3, height: 1E3, rotation: k}), {coordsize: "1000,1000", coordorigin: "-500,-500"});
                i = m(n(j, i, {stroked: false, arcSize: q}), {width: a, height: d, top: h, left: e});
                n("fill", i, {color: this.color, opacity: l});
                ++b
            }
        }
        this.tick(true)
    };
    a.clean = function() {
        if (o === p[0])
            this.con.clearRect(0, 0, 1E3, 1E3);
        else {
            var b = this.vml;
            if (b.hasChildNodes())
                for (; b.childNodes.length >= 1; )
                    b.removeChild(b.firstChild)
        }
    };
    a.redraw = function() {
        this.clean();
        this.draw()
    };
    a.reset = function() {
        typeof this.timer === "number" && (this.hide(), this.show())
    };
    a.tick = function(b) {
        var a = this.con, f = this.diameter;
        b || (this.activeId += 360 / this.density * this.speed);
        o === p[0] ? (a.clearRect(0, 0, f, f), u(a, f * 0.5, f * 0.5, this.activeId / 180 * Math.PI), a.drawImage(this.cCan, 0, 0, f, f), a.restore()) : (this.activeId >= 360 && (this.activeId -= 360), m(this.vml, {rotation: this.activeId}))
    };
    a.show = function() {
        if (typeof this.timer !== "number") {
            var a = this;
            this.timer = self.setInterval(function() {
                a.tick()
            }, Math.round(1E3 / this.fps));
            m(this.cont, {display: "block"})
        }
    };
    a.hide = function() {
        typeof this.timer === "number" && (clearInterval(this.timer), delete this.timer, m(this.cont, {display: "none"}))
    };
    a.kill = function() {
        var a = this.cont;
        typeof this.timer === "number" && this.hide();
        o === p[0] ? (a.removeChild(this.can), a.removeChild(this.cCan)) : a.removeChild(this.vml);
        for (var c in this)
            delete this[c]
    };
    w.CanvasLoader = k
})(window);

IRIXUI_ILO.isChrome = !!(window.chrome && chrome.webstore && chrome.webstore.install);
function toLog(msg, type, css) {
    if (IRIXUI_ILO.debug) {
        css = css || '';
        if (IRIXUI_ILO.isChrome && (css !== '')) {
            msg = '%c' + msg;
        }
        type = type || false;
        if (type === false) {
            console.log(msg, css);
        } else {
            if (type === 'w') {
                console.warn(msg, css);
            }
            if (type === 'e') {
                console.error(msg, css);
            }
            if (type === 'i') {
                console.info(msg, css);
            }
        }
    }
}
function toLogGroup(name, collapsed) {
    if (IRIXUI_ILO.debug && IRIXUI_ILO.isChrome) {
        if (collapsed || false) {
            console.groupCollapsed(name);
        } else {
            console.group(name);
        }
    }
}
function toLogGroupEnd() {
    if (IRIXUI_ILO.debug && IRIXUI_ILO.isChrome) {
        console.groupEnd();
    }
}
function GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
IRIXUI_ILO.ShowLogo = function() {
    toLog('IRIX.UI', false, 'background-color: #169BCF;font-size: x-large;padding-left: 6px;padding-right: 6px;font-weight: bold;color: #FFFFFF;-webkit-border-radius: 4px;border-radius: 4px;');
    toLog('RadiantX', false, 'background-color: #FFB815;font-size: x-large;padding-left: 6px;padding-right: 6px;font-weight: bold;color: #FFFFFF;-webkit-border-radius: 4px;border-radius: 4px;');
    toLog(' ');
};
IRIXUI_ILO.Uncache = function(arr, test, prefix) {
    if (!test) {
        arr.forEach(function(el, i) {
            arr[i] = prefix + el + '?ver=' + GUID();
        });
    } else {
        arr.forEach(function(el, i) {
            arr[i] = prefix + el;
        });
    }
    return arr;
};
IRIXUI_ILO.Start = function() {
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fn, scope) {
            for (var i = 0, len = this.length; i < len; ++i) {
                fn.call(scope, this[i], i, this);
            }
        };
    }
    String.explode = function(delimiter, string) {
        return string.toString().split(delimiter.toString());
    };
    IRIXUI_ILO.LOADER = new CanvasLoader('irix-loader');
    IRIXUI_ILO.LOADER.setColor('#ffffff');
    IRIXUI_ILO.LOADER.setShape('rect');
    IRIXUI_ILO.LOADER.setDiameter(33);
    IRIXUI_ILO.LOADER.setDensity(9);
    IRIXUI_ILO.LOADER.setRange(0.8);
    IRIXUI_ILO.LOADER.setSpeed(1);
    IRIXUI_ILO.LOADER.setFPS(20);
    IRIXUI_ILO.LOADER.show();
    // This bit is only for positioning - not necessary
    var loaderObj = document.getElementById("canvasLoader");
    loaderObj.style.position = "absolute";
    loaderObj.style["top"] = IRIXUI_ILO.LOADER.getDiameter() * -0.5 + "px";
    loaderObj.style["left"] = IRIXUI_ILO.LOADER.getDiameter() * -0.5 + "px";
    //loaderObj.innerHTML = loaderObj.innerHTML + '<div>Загрузка</div>';
    yepnope({
        load: IRIXUI_ILO.config_file,
        complete: function() {
            if (typeof(IRIXUI_ILO.config) === 'object') {
                IRIXUI_ILO.config.debug = IRIXUI_ILO.config.debug || false;
                IRIXUI_ILO.debug = IRIXUI_ILO.config.debug;
                IRIXUI_ILO.ShowLogo();
                IRIXUI_ILO.Init();
            } else {
                console.error('iLO Master error: IRIX_ILO.config not setted, loading terminated !');
            }
        }
    });
};
IRIXUI_ILO.InitConfig = function() {
    IRIXUI_ILO.config.background_color = IRIXUI_ILO.config.background_color || '4d4d4d';
    IRIXUI_ILO.config.cache_css = IRIXUI_ILO.config.cache_css || true;
    IRIXUI_ILO.config.cache_less = IRIXUI_ILO.config.cache_less || true;
    IRIXUI_ILO.config.cache_js = IRIXUI_ILO.config.cache_js || true;
    IRIXUI_ILO.config.cache_irix = IRIXUI_ILO.config.cache_irix || false;
    IRIXUI_ILO.config.cache_app = IRIXUI_ILO.config.cache_app || false;
    IRIXUI_ILO.config.css_path = IRIXUI_ILO.config.css_path || '/css/';
    IRIXUI_ILO.config.less_path = IRIXUI_ILO.config.less_path || '/css/';
    IRIXUI_ILO.config.js_path = IRIXUI_ILO.config.js_path || '/js/libs/';
    IRIXUI_ILO.config.irix_path = IRIXUI_ILO.config.irix_path || '/js/irix/';
    IRIXUI_ILO.config.app_path = IRIXUI_ILO.config.app_path || '/js/app/';
    IRIXUI_ILO.config.app_prefix = IRIXUI_ILO.config.app_prefix || '';
    IRIXUI_ILO.config.default_page = IRIXUI_ILO.config.default_page || 'default';
    IRIXUI_ILO.config.css = IRIXUI_ILO.Uncache(IRIXUI_ILO.config.css || [], IRIXUI_ILO.config.cache_css, IRIXUI_ILO.config.css_path);
    IRIXUI_ILO.config.less = IRIXUI_ILO.Uncache(IRIXUI_ILO.config.less || [], IRIXUI_ILO.config.cache_less, 'less!' + IRIXUI_ILO.config.less_path);
    IRIXUI_ILO.config.js = IRIXUI_ILO.Uncache(IRIXUI_ILO.config.js || [], IRIXUI_ILO.config.cache_js, IRIXUI_ILO.config.js_path);
    IRIXUI_ILO.config.irix = IRIXUI_ILO.Uncache(IRIXUI_ILO.config.irix || [
        'ui.base64.js',
        'ui.history.min.js',
        'ui.js',
        'ui.radiant_xt.js',
        'ui.radiant_xv.js'
    ], IRIXUI_ILO.config.cache_irix, IRIXUI_ILO.config.irix_path);
    IRIXUI_ILO.config.pages = IRIXUI_ILO.config.pages || [];
    var pages = ['common.js'];
    IRIXUI_ILO.config.pages.forEach(function(page) {
        pages.push(page + '/' + page + '.data.js');
        pages.push(page + '/' + page + '.events.js');
        pages.push(page + '/' + page + '.view.js');
    });
    IRIXUI_ILO.config.pages = IRIXUI_ILO.Uncache(pages, IRIXUI_ILO.config.cache_app, IRIXUI_ILO.config.app_path);
};
IRIXUI_ILO.Init = function() {
    toLogGroup('IRIX.UI iLO');
    toLog('Initialization and loading');
    IRIXUI_ILO.InitConfig();
    document.getElementsByTagName("BODY")[0].setAttribute("background-color", "#" + IRIXUI_ILO.config.background_color);
    IRIXUI_ILO.LoadCSS();
};
IRIXUI_ILO.LoadCSS = function() {
    toLogGroup('CSS', true);
    if (IRIXUI_ILO.config.css.length === 0) {
        toLog('- not loaded -', false, 'color:#888888');
        IRIXUI_ILO.LoadLESS();
    } else {
        toLog('Loading css files:');
        yepnope({
            load: IRIXUI_ILO.config.css,
            callback: function(url) {
                toLog(url, false, 'color:#888888;text-decoration: underline;padding-left:16px;');
            },
            complete: function() {
                toLog('Total css loaded: ' + IRIXUI_ILO.config.css.length, false, 'color:#04AC13;');
                IRIXUI_ILO.LoadLESS();
            }
        });
    }
};
IRIXUI_ILO.LoadLESS = function() {
    toLogGroupEnd();
    toLogGroup('LESS', true);
    yepnope.addPrefix('less', function(resourceObj) {
        resourceObj.forceCSS = true;
        resourceObj.attrs = {
            'rel': "stylesheet/less",
            'type': "text/css"
        };
        return resourceObj;
    });
    if (IRIXUI_ILO.config.less.length === 0) {
        toLog('- not loaded -', false, 'color:#888888');
        IRIXUI_ILO.LoadJQuery();
    } else {
        yepnope({
            load: IRIXUI_ILO.config.less,
            callback: function(url) {
                toLog(url, false, 'color:#888888;text-decoration: underline;padding-left:16px;');
            },
            complete: function() {
                toLog('Total less loaded: ' + IRIXUI_ILO.config.less.length, false, 'color:#04AC13;');
                IRIXUI_ILO.LoadJQuery();
            }
        });
    }
};
IRIXUI_ILO.LoadJQuery = function() {
    toLogGroupEnd();
    toLogGroup('jQuery', true);
    if (IRIXUI_ILO.config.jquery === false) {
        toLog('iLO Master error, IRIXUI_ILO.config.jquery not setted, loading terminated', 'e');
        toLogGroupEnd();
        toLogGroupEnd();
        return;
    } else {
        yepnope({
            load: IRIXUI_ILO.config.jquery,
            callback: function(url) {
                toLog(url, false, 'color:#888888;text-decoration: underline;padding-left:16px;');
            },
            complete: function() {
                if (typeof jQuery === 'undefined') {
                    toLog('iLO Master error, jQuery loaded, but jQuery object is not found. Loading terminated', 'e');
                    toLogGroupEnd();
                    toLogGroupEnd();
                    return;
                }
                toLog('jQuery loaded successfully, ver: ' + $().jquery, false, 'color:#04AC13;');
                IRIXUI_ILO.LoadJS();
            }
        });
    }
};
IRIXUI_ILO.LoadJS = function() {
    toLogGroupEnd();
    toLogGroup('JavaScript', true);
    if (IRIXUI_ILO.config.js.length === 0) {
        toLog('- not loaded -', false, 'color:#888888');
        IRIXUI_ILO.LoadIRIXUI();
    } else {
        yepnope({
            load: IRIXUI_ILO.config.js,
            callback: function(url) {
                toLog(url, false, 'color:#888888;text-decoration: underline;padding-left:16px;');
            },
            complete: function() {
                toLog("Total javascript files loaded: " + IRIXUI_ILO.config.js.length, false, 'color:#04AC13;');
                IRIXUI_ILO.LoadIRIXUI();
            }
        });
    }
};
IRIXUI_ILO.LoadIRIXUI = function() {
    toLogGroupEnd();
    toLogGroup('IRIX.UI', true);
    if (IRIXUI_ILO.config.irix.length === 0) {
        toLog('iLO Master error, IRIX.UI library not found', 'e');
        toLogGroupEnd();
        toLogGroupEnd();
        return;
    } else {
        yepnope({
            load: IRIXUI_ILO.config.irix,
            callback: function(url) {
                toLog(url, false, 'color:#888888;text-decoration: underline;padding-left:16px;');
            },
            complete: function() {
                if (typeof IRIXUI === 'undefined') {
                    toLog('iLO Master error, IRIX.UI loaded, but IRIXUI object is not found. Loading terminated', 'e');
                    toLogGroupEnd();
                    toLogGroupEnd();
                    return;
                }
                toLog("Total IRIX.UI files loaded: " + IRIXUI_ILO.config.irix.length, false, 'color:#04AC13;');
                IRIXUI_ILO.LoadApplications();
            }
        });
    }

};
IRIXUI_ILO.LoadApplications = function() {
    toLogGroupEnd();
    toLogGroup('Loading applications', true);
    if (IRIXUI_ILO.config.pages.length === 0) {
        toLogGroupEnd();
        toLog('iLO Master error, no pages defined. Loading terminated', 'e');
        return;
    }
    yepnope({
        load: IRIXUI_ILO.config.pages,
        callback: function(url) {
            toLog(url, false, 'color:#888888;text-decoration: underline;padding-left:16px;');
        },
        complete: function() {
            toLog('Total application count: ' + IRIXUI_ILO.config.pages.length, false, 'color:#04AC13;');
            IRIXUI_ILO.WaitJQuery();
        }
    });
};
IRIXUI_ILO.WaitJQuery = function() {
    toLogGroupEnd();
    toLogGroup('Wait jQuery for ready', true);
    $(function() {
        toLog("jQuery ready", false, 'color:#04AC13;font-weight: bold;');
        Date.addLocale('ru');
        toLogGroupEnd();
        IRIXUI_ILO.RunIRIXUI();
    });
};
IRIXUI_ILO.RunIRIXUI = function() {
    toLogGroupEnd();
    toLogGroup('Run IRIX.UI applications');
    IRIXUI_ILO.LOADER.hide();
    IRIXUI_ILO.LOADER.kill();
    $('body').prepend('<div class="loading-modal hidden"></div>');
    $('#irix-loader').remove();
    irixui.router.default_page = IRIXUI_ILO.config.default_page;
    irixui.router.OpenUrl(document.location);
};

IRIXUI_ILO.Start();