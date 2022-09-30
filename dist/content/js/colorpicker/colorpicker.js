//https://bgrins.github.io/spectrum/
!(function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports && "object" == typeof module ? (module.exports = e(require("jquery"))) : e(jQuery);
})(function (De, qe) {
    "use strict";
    var e,
        Ie = {
            beforeShow: a,
            move: a,
            change: a,
            show: a,
            hide: a,
            color: !1,
            flat: !1,
            type: "",
            showInput: !1,
            allowEmpty: !0,
            showButtons: !0,
            clickoutFiresChange: !0,
            showInitial: !1,
            showPalette: !0,
            showPaletteOnly: !1,
            hideAfterPaletteSelect: !1,
            togglePaletteOnly: !1,
            showSelectionPalette: !0,
            localStorageKey: !1,
            appendTo: "body",
            maxSelectionSize: 8,
            locale: "en",
            cancelText: "Cancel",
            chooseText: "Save",
            titleText: "Elige una muestra:",
            togglePaletteMoreText: "More",
            togglePaletteLessText: "Less",
            clearText: "Clear Color Selection",
            noColorSelectedText: "No Color Selected",
            preferredFormat: "name",
            className: "",
            containerClassName: "",
            replacerClassName: "",
            showAlpha: !0,
            theme: "sp-light",
            palette: [
                ["#000000", "#444444", "#5b5b5b", "#999999", "#bcbcbc", "#eeeeee", "#f3f6f4", "#ffffff"],
                ["#f44336", "#744700", "#ce7e00", "#8fce00", "#2986cc", "#16537e", "#6a329f", "#c90076"],
                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"],
            ],
            selectionPalette: [],
            disabled: !1,
            offset: null,
        },
        Ve = [],
        We = !!/msie/i.exec(window.navigator.userAgent),
        Be = (((e = document.createElement("div").style).cssText = "background-color:rgba(0,0,0,.5)"), t(e.backgroundColor, "rgba") || t(e.backgroundColor, "hsla")),
        Ke = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""),
        $e = (function () {
            var e = "";
            if (We) for (var t = 1; t <= 6; t++) e += "<div class='sp-" + t + "'></div>";
            return [
                "<div class='sp-container sp-hidden'>",
                "<div class='sp-palette-container'>",
                "<h5 class='sp-title'></h5>",
                "<div class='sp-palette sp-thumb sp-cf'></div>",
                "<div class='sp-palette-button-container sp-cf'>",
                "<button type='button' class='sp-palette-toggle'></button>",
                "</div>",
                "</div>",
                "<div class='sp-picker-container'>",
                "<div class='sp-top sp-cf'>",
                "<div class='sp-fill'></div>",
                "<div class='sp-top-inner'>",
                "<div class='sp-color'>",
                "<div class='sp-sat'>",
                "<div class='sp-val'>",
                "<div class='sp-dragger'></div>",
                "</div>",
                "</div>",
                "</div>",
                "<div class='sp-clear sp-clear-display'>",
                "</div>",
                "<div class='sp-hue'>",
                "<div class='sp-slider'></div>",
                e,
                "</div>",
                "</div>",
                "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
                "</div>",
                "<div class='sp-input-container sp-cf'>",
                "<input class='sp-input' type='text' spellcheck='false'  />",
                "</div>",
                "<div class='sp-initial sp-thumb sp-cf'></div>",
                "<div class='sp-button-container sp-cf'>",
                "<button class='sp-cancel default_btn_2' href='#'></button>",
                "<button type='button' class='sp-choose default_btn_1'></button>",
                "</div>",
                "</div>",
                "</div>",
            ].join("");
        })();
    function t(e, t) {
        return !!~("" + e).indexOf(t);
    }
    function Xe(e, t, a, o) {
        for (var r = [], n = 0; n < e.length; n++) {
            var s = e[n];
            if (s) {
                var i = tinycolor(s),
                    l = i.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                l += tinycolor.equals(t, s) ? " sp-thumb-active" : "";
                var c = i.toString(o.preferredFormat || "rgb"),
                    u = Be ? "background-color:" + i.toRgbString() : "filter:" + i.toFilter();
                r.push('<span title="' + c + '" data-color="' + i.toRgbString() + '" class="' + l + '"><span class="sp-thumb-inner" style="' + u + ';" /></span>');
            } else r.push('<span class="sp-thumb-el sp-clear-display" ><span class="sp-clear-palette-only" style="background-color: transparent;" /></span>');
        }
        return "<div class='sp-cf " + a + "'>" + r.join("") + "</div>";
    }
    function n(e, t) {
        var a,
            o,
            r,
            n,
            h = (function (e, t) {
                (e.locale = e.locale || window.navigator.language),
                    e.locale && (e.locale = e.locale.split("-")[0].toLowerCase()),
                    "en" != e.locale && De.spectrum.localization[e.locale] && (e = De.extend({}, De.spectrum.localization[e.locale], e));
                var a = De.extend({}, Ie, e);
                return (a.callbacks = { move: Ge(a.move, t), change: Ge(a.change, t), show: Ge(a.show, t), hide: Ge(a.hide, t), beforeShow: Ge(a.beforeShow, t) }), a;
            })(t, e),
            s = h.type,
            d = "flat" == s,
            i = h.showSelectionPalette,
            l = h.localStorageKey,
            c = h.theme,
            u = h.callbacks,
            f =
                ((a = Qe),
                function () {
                    var e = this,
                        t = arguments;
                    r && clearTimeout(n),
                        (!r && n) ||
                            (n = setTimeout(function () {
                                (n = null), a.apply(e, t);
                            }, o));
                }),
            p = !(o = 10),
            g = !1,
            b = 0,
            m = 0,
            v = 0,
            x = 0,
            y = 0,
            T = 0,
            w = 0,
            _ = 0,
            k = 0,
            P = 0,
            C = 1,
            S = [],
            M = [],
            z = {},
            j = h.selectionPalette.slice(0),
            A = h.maxSelectionSize,
            R = "sp-dragging",
            F = !1,
            H = null,
            L = e.ownerDocument,
            O = (L.body, De(e)),
            Q = !1,
            E = De($e, L).addClass(c),
            N = E.find(".sp-picker-container"),
            D = E.find(".sp-color"),
            q = E.find(".sp-dragger"),
            I = E.find(".sp-hue"),
            V = E.find(".sp-slider"),
            W = E.find(".sp-alpha-inner"),
            B = E.find(".sp-alpha"),
            K = E.find(".sp-alpha-handle"),
            $ = E.find(".sp-input"),
            X = E.find(".sp-palette"),
            Y = E.find(".sp-initial"),
            G = E.find(".sp-cancel"),
            U = E.find(".sp-clear"),
            J = E.find(".sp-choose"),
            JJ = E.find(".sp-title"),
            Z = E.find(".sp-palette-toggle"),
            ee = O.is("input"),
            te = (ee && "color" === O.attr("type") && Je(), ee && "color" == s),
            ae = te ? De(Ke).addClass(c).addClass(h.className).addClass(h.replacerClassName) : De([]),
            oe = te ? ae : O,
            re = ae.find(".sp-preview-inner"),
            ne = h.color || (ee && O.val()),
            se = !1,
            ie = h.preferredFormat,
            le = !h.showButtons || h.clickoutFiresChange,
            ce = !ne,
            ue = h.allowEmpty,
            fe = null,
            he = null,
            de = null,
            pe = null,
            ge = O.attr("id");
        if (ge !== qe && 0 < ge.length) {
            var be = De('label[for="' + ge + '"]');
            be.length &&
                be.on("click", function (e) {
                    return e.preventDefault(), O.spectrum("show"), !1;
                });
        }
        function me() {
            if ((h.showPaletteOnly && (h.showPalette = !0), Z.text(h.showPaletteOnly ? h.togglePaletteMoreText : h.togglePaletteLessText), h.palette)) {
                (S = h.palette.slice(0)), (M = De.isArray(S[0]) ? S : [S]), (z = {});
                for (var e = 0; e < M.length; e++)
                    for (var t = 0; t < M[e].length; t++) {
                        var a = tinycolor(M[e][t]).toRgbString();
                        z[a] = !0;
                    }
                h.showPaletteOnly && !h.color && (ne = "" === S[0][0] ? S[0][0] : Object.keys(z)[0]);
            }
            E.toggleClass("sp-flat", d),
                E.toggleClass("sp-input-disabled", !h.showInput),
                E.toggleClass("sp-alpha-enabled", h.showAlpha),
                E.toggleClass("sp-clear-enabled", ue),
                E.toggleClass("sp-buttons-disabled", !h.showButtons),
                E.toggleClass("sp-palette-buttons-disabled", !h.togglePaletteOnly),
                E.toggleClass("sp-palette-disabled", !h.showPalette),
                E.toggleClass("sp-palette-only", h.showPaletteOnly),
                E.toggleClass("sp-initial-disabled", !h.showInitial),
                E.addClass(h.className).addClass(h.containerClassName),
                Qe();
        }
        function ve() {
            if (l) {
                try {
                    var e = window.localStorage,
                        t = e[l].split(",#");
                    1 < t.length &&
                        (delete e[l],
                        De.each(t, function (e, t) {
                            xe(t);
                        }));
                } catch (e) { }
                try {
                    j = window.localStorage[l].split(";");
                } catch (e) { }
            }
        }
        function xe(e) {
            if (i) {
                var t = tinycolor(e).toRgbString();
                if (!z[t] && -1 === De.inArray(t, j)) for (j.push(t) ; j.length > A;) j.shift();
                if (l)
                    try {
                        window.localStorage[l] = j.join(";");
                    } catch (e) { }
            }
        }
        function ye() {
            var a = Re(),
                e = De.map(M, function (e, t) {
                    return Xe(e, a, "sp-palette-row sp-palette-row-" + t, h);
                });
            ve(),
                j &&
                    e.push(
                        Xe(
                            (function () {
                                var e = [];
                                if (h.showPalette)
                                    for (var t = 0; t < j.length; t++) {
                                        var a = tinycolor(j[t]).toRgbString();
                                        z[a] || e.push(j[t]);
                                    }
                                return e.reverse().slice(0, h.maxSelectionSize);
                            })(),
                            a,
                            "sp-palette-row sp-palette-row-selection",
                            h
                        )
                    ),
                X.html(e.join(""));
        }
        function Te() {
            if (h.showInitial) {
                var e = se,
                    t = Re();
                Y.html(Xe([e, t], t, "sp-palette-row-initial", h));
            }
        }
        function we() {
            (m <= 0 || b <= 0 || x <= 0) && Qe(), (g = !0), E.addClass(R), (H = null), O.trigger("dragstart.spectrum", [Re()]);
        }
        function _e() {
            (g = !1), E.removeClass(R), O.trigger("dragstop.spectrum", [Re()]);
        }
        function ke(e) {
            if (F) F = !1;
            else if ((null !== e && "" !== e) || !ue) {
                var t = tinycolor(e);
                t.isValid() ? (Ae(t), Fe(), Oe()) : $.addClass("sp-validation-error");
            } else Ae(null), Fe(), Oe();
        }
        function Pe() {
            (p ? ze : Ce)();
        }
        function Ce() {
            var e = De.Event("beforeShow.spectrum");
            p
                ? Qe()
                : (O.trigger(e, [Re()]),
                  !1 === u.beforeShow(Re()) ||
                      e.isDefaultPrevented() ||
                      ((function () {
                          for (var e = 0; e < Ve.length; e++) Ve[e] && Ve[e].hide();
                      })(),
                      (p = !0),
                      De(L).on("keydown.spectrum", Se),
                      De(L).on("click.spectrum", Me),
                      De(window).on("resize.spectrum", f),
                      ae.addClass("sp-active"),
                      E.removeClass("sp-hidden"),
                      Qe(),
                      He(),
                      (se = Re()),
                      Te(),
                      u.show(se),
                      O.trigger("show.spectrum", [se])));
        }
        function Se(e) {
            27 === e.keyCode && ze();
        }
        function Me(e) {
            2 != e.button && (g || (le ? Oe(!0) : je(), ze()));
        }
        function ze() {
            p &&
                !d &&
                ((p = !1), De(L).off("keydown.spectrum", Se), De(L).off("click.spectrum", Me), De(window).off("resize.spectrum", f), ae.removeClass("sp-active"), E.addClass("sp-hidden"), u.hide(Re()), O.trigger("hide.spectrum", [Re()]));
        }
        function je() {
            Ae(se, !0), Oe(!0);
        }
        function Ae(e, t) {
            var a, o;
            tinycolor.equals(e, Re())
                ? He()
                : ((e && e !== qe) || !ue ? ((ce = !1), (o = (a = tinycolor(e)).toHsv()), (_ = (o.h % 360) / 360), (k = o.s), (P = o.v), (C = o.a)) : (ce = !0), He(), a && a.isValid() && !t && (ie = h.preferredFormat || a.getFormat()));
        }
        function Re(e) {
            return (e = e || {}), ue && ce ? null : tinycolor.fromRatio({ h: _, s: k, v: P, a: Math.round(1e3 * C) / 1e3 }, { format: e.format || ie });
        }
        function Fe() {
            He(), u.move(Re()), O.trigger("move.spectrum", [Re()]);
        }
        function He() {
            $.removeClass("sp-validation-error"), Le();
            var e = tinycolor.fromRatio({ h: _, s: 1, v: 1 });
            D.css("background-color", e.toHexString());
            var t = ie;
            C < 1 && (0 !== C || "name" !== t) && (("hex" !== t && "hex3" !== t && "hex6" !== t && "name" !== t) || (t = "rgb"));
            var a = Re({ format: t }),
                o = "";
            if ((re.removeClass("sp-clear-display"), re.css("background-color", "transparent"), !a && ue)) re.addClass("sp-clear-display");
            else {
                var r = a.toHexString(),
                    n = a.toRgbString();
                if ((Be || 1 === a.alpha ? re.css("background-color", n) : (re.css("background-color", "transparent"), re.css("filter", a.toFilter())), h.showAlpha)) {
                    var s = a.toRgb();
                    s.a = 0;
                    var i = tinycolor(s).toRgbString(),
                        l = "linear-gradient(left, " + i + ", " + r + ")";
                    We
                        ? W.css("filter", tinycolor(i).toFilter({ gradientType: 1 }, r))
                        : (W.css("background", "-webkit-" + l), W.css("background", "-moz-" + l), W.css("background", "-ms-" + l), W.css("background", "linear-gradient(to right, " + i + ", " + r + ")"));
                }
                o = a.toString(t);
            }
            if ((h.showInput && $.val(o), O.val(o), "text" == h.type || "component" == h.type)) {
                var c = a;
                if (c && he) {
                    var u = c.isLight() || c.getAlpha() < 0.4 ? "black" : "white";
                    he.css("background-color", c.toRgbString()).css("color", u);
                } else he.css("background-color", pe).css("color", de);
            }
            h.showPalette && ye(), Te();
        }
        function Le() {
            var e = k,
                t = P;
            if (ue && ce) K.hide(), V.hide(), q.hide();
            else {
                K.show(), V.show(), q.show();
                var a = e * b,
                    o = m - t * m;
                (a = Math.max(-v, Math.min(b - v, a - v))), (o = Math.max(-v, Math.min(m - v, o - v))), q.css({ top: o + "px", left: a + "px" });
                var r = C * y;
                K.css({ left: r - T / 2 + "px" });
                var n = _ * x;
                V.css({ top: n - w + "px" });
            }
        }
        function Oe(e) {
            var t = Re(),
                a = !tinycolor.equals(t, se);
            t && (t.toString(ie), xe(t)), e && a && (u.change(t), (F = !0), O.trigger("change", [t]));
        }
        function Qe() {
            var e, t, a, o, r, n, s, i, l, c, u, f;
            p &&
                ((b = D.width()),
                (m = D.height()),
                (v = q.height()),
                I.width(),
                (x = I.height()),
                (w = V.height()),
                (y = B.width()),
                (T = K.width()),
                d ||
                    (E.css("position", "absolute"),
                    h.offset
                        ? E.offset(h.offset)
                        : E.offset(
                              ((t = oe),
                              (a = (e = E).outerWidth()),
                              (o = e.outerHeight()),
                              (r = t.outerHeight()),
                              (n = e[0].ownerDocument),
                              (s = n.documentElement),
                              (i = s.clientWidth + De(n).scrollLeft()),
                              (l = s.clientHeight + De(n).scrollTop()),
                              (c = t.offset()),
                              (u = c.left),
                              (f = c.top),
                              (f += r),
                              (u -= Math.min(u, i < u + a && a < i ? Math.abs(u + a - i) : 0)),
                              { top: (f -= Math.min(f, l < f + o && o < l ? Math.abs(+(o + r)) : 0)), bottom: c.bottom, left: u, right: c.right, width: c.width, height: c.height })
                          )),
                Le(),
                h.showPalette && ye(),
                O.trigger("reflow.spectrum"));
        }
        function Ee() {
            ze(), (Q = !0), O.attr("disabled", !0), oe.addClass("sp-disabled");
        }
        !(function () {
            if (
                (We && E.find("*:not(input)").attr("unselectable", "on"),
                me(),
                (fe = De('<span class="sp-original-input-container"></span>')),
                ["margin"].forEach(function (e) {
                    fe.css(e, O.css(e));
            }),
                "block" == O.css("display") && fe.css("display", "flex"),
                te)
            )
                O.after(ae).hide();
            else if ("text" == s) fe.addClass("sp-colorize-container"), O.addClass("spectrum sp-colorize").wrap(fe);
            else if ("component" == s) {
                O.addClass("spectrum").wrap(fe);
                var e = De(["<div class='sp-colorize-container sp-add-on'>", "<div class='sp-colorize'></div> ", "</div>"].join(""));
                e
                    .width(O.outerHeight() + "px")
                    .css("border-radius", O.css("border-radius"))
                    .css("border", O.css("border")),
                    O.addClass("with-add-on").before(e);
            }
            if (((he = O.parent().find(".sp-colorize")), (de = he.css("color")), (pe = he.css("background-color")), ue || U.hide(), d)) O.after(E).hide();
            else {
                var t = "parent" === h.appendTo ? O.parent() : De(h.appendTo);
                1 !== t.length && (t = De("body")), t.append(E);
            }
            function a(e) {
                return e.data && e.data.ignore ? (Ae(De(e.target).closest(".sp-thumb-el").data("color")), Fe()) : (Ae(De(e.target).closest(".sp-thumb-el").data("color")), Fe(), h.hideAfterPaletteSelect ? (Oe(!0), ze()) : Oe()), !1;
            }
            ve(),
                oe.on("click.spectrum touchstart.spectrum", function (e) {
                    Q || Pe(), e.stopPropagation(), De(e.target).is("input") || e.preventDefault();
                }),
                (!O.is(":disabled") && !0 !== h.disabled) || Ee(),
                E.click(Ye),
                [$, O].forEach(function (t) {
                    t.change(function () {
                        ke(t.val());
                    }),
                        t.on("paste", function () {
                            setTimeout(function () {
                                ke(t.val());
                            }, 1);
                        }),
                        t.keydown(function (e) {
                            13 == e.keyCode && (ke(De(t).val()), t == O && ze());
                        });
                }),
                G.text(h.cancelText),
                G.on("click.spectrum", function (e) {
                    e.stopPropagation(), e.preventDefault(), je(), ze();
                }),
                U.attr("title", h.clearText),
                U.on("click.spectrum", function (e) {
                    e.stopPropagation(), e.preventDefault(), (ce = !0), Fe(), d && Oe(!0);
                }),
                JJ.text(h.titleText),
                J.text(h.chooseText),
                J.on("click.spectrum", function (e) {
                    e.stopPropagation(), e.preventDefault(), We && $.is(":focus") && $.trigger("change"), $.hasClass("sp-validation-error") || (Oe(!0), ze());
                }),
                Z.text(h.showPaletteOnly ? h.togglePaletteMoreText : h.togglePaletteLessText),
                Z.on("click.spectrum", function (e) {
                    e.stopPropagation(), e.preventDefault(), (h.showPaletteOnly = !h.showPaletteOnly), h.showPaletteOnly || d || E.css("left", "-=" + (N.outerWidth(!0) + 5)), me();
                }),
                Ue(
                    B,
                    function (e, t, a) {
                        (C = e / y), (ce = !1), a.shiftKey && (C = Math.round(10 * C) / 10), Fe();
                    },
                    we,
                    _e
                ),
                Ue(
                    I,
                    function (e, t) {
                        (_ = parseFloat(t / x)), (ce = !1), h.showAlpha || (C = 1), Fe();
                    },
                    we,
                    _e
                ),
                Ue(
                    D,
                    function (e, t, a) {
                        if (a.shiftKey) {
                            if (!H) {
                                var o = k * b,
                                    r = m - P * m,
                                    n = Math.abs(e - o) > Math.abs(t - r);
                                H = n ? "x" : "y";
                            }
                        } else H = null;
                        var s = !H || "y" === H;
                        (H && "x" !== H) || (k = parseFloat(e / b)), s && (P = parseFloat((m - t) / m)), (ce = !1), h.showAlpha || (C = 1), Fe();
                    },
                    we,
                    _e
                ),
                ne ? (Ae(ne), He(), (ie = tinycolor(ne).format || h.preferredFormat), xe(ne)) : ("" === ne && Ae(ne), He()),
                d && Ce();
            var o = We ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            X.on(o, ".sp-thumb-el", a), Y.on(o, ".sp-thumb-el:nth-child(1)", { ignore: !0 }, a);
        })();
        var Ne = {
            show: Ce,
            hide: ze,
            toggle: Pe,
            reflow: Qe,
            option: function (e, t) {
                return e === qe ? De.extend({}, h) : t === qe ? h[e] : ((h[e] = t), "preferredFormat" === e && (ie = h.preferredFormat), void me());
            },
            enable: function () {
                (Q = !1), O.attr("disabled", !1), oe.removeClass("sp-disabled");
            },
            disable: Ee,
            offset: function (e) {
                (h.offset = e), Qe();
            },
            set: function (e) {
                Ae(e), Oe();
            },
            get: Re,
            destroy: function () {
                O.show().removeClass("spectrum with-add-on sp-colorize"), oe.off("click.spectrum touchstart.spectrum"), E.remove(), ae.remove(), he && he.css("background-color", pe).css("color", de);
                var e = O.closest(".sp-original-input-container");
                0 < e.length && e.after(O).remove(), (Ve[Ne.id] = null);
            },
            container: E,
        };
        return (Ne.id = Ve.push(Ne) - 1), Ne;
    }
    function a() { }
    function Ye(e) {
        e.stopPropagation();
    }
    function Ge(e, t) {
        var a = Array.prototype.slice,
            o = a.call(arguments, 2);
        return function () {
            return e.apply(t, o.concat(a.call(arguments)));
        };
    }
    function Ue(s, i, t, e) {
        (i = i || function () { }), (t = t || function () { }), (e = e || function () { });
        var l = document,
            c = !1,
            u = {},
            f = 0,
            h = 0,
            d = "ontouchstart" in window,
            a = {};
        function p(e) {
            e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), (e.returnValue = !1);
        }
        function o(e) {
            if (c) {
                if (We && l.documentMode < 9 && !e.button) return g();
                var t = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0],
                    a = (t && t.pageX) || e.pageX,
                    o = (t && t.pageY) || e.pageY,
                    r = Math.max(0, Math.min(a - u.left, h)),
                    n = Math.max(0, Math.min(o - u.top, f));
                d && p(e), i.apply(s, [r, n, e]);
            }
        }
        function g() {
            c &&
                (De(l).off(a),
                De(l.body).removeClass("sp-dragging"),
                setTimeout(function () {
                    e.apply(s, arguments);
                }, 0)),
                (c = !1);
        }
        (a.selectstart = p),
            (a.dragstart = p),
            (a["touchmove mousemove"] = o),
            (a["touchend mouseup"] = g),
            De(s).on("touchstart mousedown", function (e) {
                (e.which ? 3 == e.which : 2 == e.button) || c || (!1 !== t.apply(s, arguments) && ((c = !0), (f = De(s).height()), (h = De(s).width()), (u = De(s).offset()), De(l).on(a), De(l.body).addClass("sp-dragging"), o(e), p(e)));
            });
    }
    function Je() {
        return De.fn.spectrum.inputTypeColorSupport();
    }
    var s = "spectrum.id";
    (De.fn.spectrum = function (a, e) {
        if ("string" != typeof a)
            return this.spectrum("destroy").each(function () {
                var e = De.extend({}, De(this).data(), a);
                De(this).is("input") ? (e.flat || "flat" == e.type ? (e.type = "flat") : "color" == De(this).attr("type") ? (e.type = "color") : (e.type = e.type || "component")) : (e.type = "noInput");
                var t = n(this, e);
                De(this).data(s, t.id);
            });
        var o = this,
            r = Array.prototype.slice.call(arguments, 1);
        return (
            this.each(function () {
                var e = Ve[De(this).data(s)];
                if (e) {
                    var t = e[a];
                    if (!t) throw new Error("Spectrum: no such method: '" + a + "'");
                    "get" == a ? (o = e.get()) : "container" == a ? (o = e.container) : "option" == a ? (o = e.option.apply(e, r)) : "destroy" == a ? (e.destroy(), De(this).removeData(s)) : t.apply(e, r);
                }
            }),
            o
        );
    }),
        (De.fn.spectrum.load = !0),
        (De.fn.spectrum.loadOpts = {}),
        (De.fn.spectrum.draggable = Ue),
        (De.fn.spectrum.defaults = Ie),
        (De.fn.spectrum.inputTypeColorSupport = function e() {
            if (void 0 === e._cachedResult) {
                var t = De("<input type='color'/>")[0];
                e._cachedResult = "color" === t.type && "" !== t.value;
            }
            return e._cachedResult;
        }),
        (De.spectrum = {}),
        (De.spectrum.localization = {}),
        (De.spectrum.palettes = {}),
        (De.fn.spectrum.processNativeColorInputs = function () {
            var e = De("input[type=color]");
            e.length && !Je() && e.spectrum({ preferredFormat: "hex6" });
        }),
        (function () {
            var n = /^[\s,#]+/,
                s = /\s+$/,
                o = 0,
                c = Math,
                i = c.round,
                u = c.min,
                f = c.max,
                e = c.random,
                h = function (e, t) {
                    if (((t = t || {}), (e = e || "") instanceof h)) return e;
                    if (!(this instanceof h)) return new h(e, t);
                    var a = (function (e) {
                        var t = { r: 0, g: 0, b: 0 },
                            a = 1,
                            o = !1,
                            r = !1;
                        "string" == typeof e &&
                            (e = (function (e) {
                                e = e.replace(n, "").replace(s, "").toLowerCase();
                                var t,
                                    a = !1;
                                if (C[e]) (e = C[e]), (a = !0);
                                else if ("transparent" == e) return { r: 0, g: 0, b: 0, a: 0, format: "name" };
                                if ((t = Q.rgb.exec(e))) return { r: t[1], g: t[2], b: t[3] };
                                if ((t = Q.rgba.exec(e))) return { r: t[1], g: t[2], b: t[3], a: t[4] };
                                if ((t = Q.hsl.exec(e))) return { h: t[1], s: t[2], l: t[3] };
                                if ((t = Q.hsla.exec(e))) return { h: t[1], s: t[2], l: t[3], a: t[4] };
                                if ((t = Q.hsv.exec(e))) return { h: t[1], s: t[2], v: t[3] };
                                if ((t = Q.hsva.exec(e))) return { h: t[1], s: t[2], v: t[3], a: t[4] };
                                if ((t = Q.hex8.exec(e)))
                                    return {
                                        a: (function (e) {
                                            return A(e) / 255;
                                        })(t[1]),
                                        r: A(t[2]),
                                        g: A(t[3]),
                                        b: A(t[4]),
                                        format: a ? "name" : "hex8",
                                    };
                                if ((t = Q.hex6.exec(e))) return { r: A(t[1]), g: A(t[2]), b: A(t[3]), format: a ? "name" : "hex" };
                                if ((t = Q.hex3.exec(e))) return { r: A(t[1] + "" + t[1]), g: A(t[2] + "" + t[2]), b: A(t[3] + "" + t[3]), format: a ? "name" : "hex" };
                                return !1;
                            })(e));
                        "object" == typeof e &&
                            (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b")
                                ? ((t = (function (e, t, a) {
                                    return { r: 255 * z(e, 255), g: 255 * z(t, 255), b: 255 * z(a, 255) };
                                })(e.r, e.g, e.b)),
                                  (o = !0),
                                  (r = "%" === String(e.r).substr(-1) ? "prgb" : "rgb"))
                                : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("v")
                                ? ((e.s = F(e.s)),
                                  (e.v = F(e.v)),
                                  (t = (function (e, t, a) {
                                      (e = 6 * z(e, 360)), (t = z(t, 100)), (a = z(a, 100));
                                      var o = c.floor(e),
                                          r = e - o,
                                          n = a * (1 - t),
                                          s = a * (1 - r * t),
                                          i = a * (1 - (1 - r) * t),
                                          l = o % 6;
                                      return { r: 255 * [a, s, n, n, i, a][l], g: 255 * [i, a, a, s, n, n][l], b: 255 * [n, n, i, a, a, s][l] };
                                  })(e.h, e.s, e.v)),
                                  (o = !0),
                                  (r = "hsv"))
                                : e.hasOwnProperty("h") &&
                                  e.hasOwnProperty("s") &&
                                  e.hasOwnProperty("l") &&
                                  ((e.s = F(e.s)),
                                  (e.l = F(e.l)),
                                  (t = (function (e, t, a) {
                                      var o, r, n;
                                      function s(e, t, a) {
                                          return a < 0 && (a += 1), 1 < a && --a, a < 1 / 6 ? e + 6 * (t - e) * a : a < 0.5 ? t : a < 2 / 3 ? e + (t - e) * (2 / 3 - a) * 6 : e;
                                      }
                                      if (((e = z(e, 360)), (t = z(t, 100)), (a = z(a, 100)), 0 === t)) o = r = n = a;
                                      else {
                                          var i = a < 0.5 ? a * (1 + t) : a + t - a * t,
                                              l = 2 * a - i;
                                          (o = s(l, i, e + 1 / 3)), (r = s(l, i, e)), (n = s(l, i, e - 1 / 3));
                                      }
                                      return { r: 255 * o, g: 255 * r, b: 255 * n };
                                  })(e.h, e.s, e.l)),
                                  (o = !0),
                                  (r = "hsl")),
                            e.hasOwnProperty("a") && (a = e.a));
                        return (a = M(a)), { ok: o, format: e.format || r, r: u(255, f(t.r, 0)), g: u(255, f(t.g, 0)), b: u(255, f(t.b, 0)), a: a };
                    })(e);
                    (this._originalInput = e),
                        (this._r = a.r),
                        (this._g = a.g),
                        (this._b = a.b),
                        (this._a = a.a),
                        (this._roundA = i(1e3 * this._a) / 1e3),
                        (this._format = t.format || a.format),
                        (this._gradientType = t.gradientType),
                        this._r < 1 && (this._r = i(this._r)),
                        this._g < 1 && (this._g = i(this._g)),
                        this._b < 1 && (this._b = i(this._b)),
                        (this._ok = a.ok),
                        (this._tc_id = o++);
                };
            function r(e, t, a) {
                (e = z(e, 255)), (t = z(t, 255)), (a = z(a, 255));
                var o,
                    r,
                    n = f(e, t, a),
                    s = u(e, t, a),
                    i = (n + s) / 2;
                if (n == s) o = r = 0;
                else {
                    var l = n - s;
                    switch (((r = 0.5 < i ? l / (2 - n - s) : l / (n + s)), n)) {
                        case e:
                            o = (t - a) / l + (t < a ? 6 : 0);
                            break;
                        case t:
                            o = (a - e) / l + 2;
                            break;
                        case a:
                            o = (e - t) / l + 4;
                    }
                    o /= 6;
                }
                return { h: o, s: r, l: i };
            }
            function l(e, t, a) {
                (e = z(e, 255)), (t = z(t, 255)), (a = z(a, 255));
                var o,
                    r,
                    n = f(e, t, a),
                    s = u(e, t, a),
                    i = n,
                    l = n - s;
                if (((r = 0 === n ? 0 : l / n), n == s)) o = 0;
                else {
                    switch (n) {
                        case e:
                            o = (t - a) / l + (t < a ? 6 : 0);
                            break;
                        case t:
                            o = (a - e) / l + 2;
                            break;
                        case a:
                            o = (e - t) / l + 4;
                    }
                    o /= 6;
                }
                return { h: o, s: r, v: i };
            }
            function t(e, t, a, o) {
                var r = [R(i(e).toString(16)), R(i(t).toString(16)), R(i(a).toString(16))];
                return o && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
            }
            function d(e, t, a, o) {
                var r;
                return [R(((r = o), Math.round(255 * parseFloat(r)).toString(16))), R(i(e).toString(16)), R(i(t).toString(16)), R(i(a).toString(16))].join("");
            }
            function a(e, t) {
                t = 0 === t ? 0 : t || 10;
                var a = h(e).toHsl();
                return (a.s -= t / 100), (a.s = j(a.s)), h(a);
            }
            function p(e, t) {
                t = 0 === t ? 0 : t || 10;
                var a = h(e).toHsl();
                return (a.s += t / 100), (a.s = j(a.s)), h(a);
            }
            function g(e) {
                return h(e).desaturate(100);
            }
            function b(e, t) {
                t = 0 === t ? 0 : t || 10;
                var a = h(e).toHsl();
                return (a.l += t / 100), (a.l = j(a.l)), h(a);
            }
            function m(e, t) {
                t = 0 === t ? 0 : t || 10;
                var a = h(e).toRgb();
                return (a.r = f(0, u(255, a.r - i((-t / 100) * 255)))), (a.g = f(0, u(255, a.g - i((-t / 100) * 255)))), (a.b = f(0, u(255, a.b - i((-t / 100) * 255)))), h(a);
            }
            function v(e, t) {
                t = 0 === t ? 0 : t || 10;
                var a = h(e).toHsl();
                return (a.l -= t / 100), (a.l = j(a.l)), h(a);
            }
            function x(e, t) {
                var a = h(e).toHsl(),
                    o = (i(a.h) + t) % 360;
                return (a.h = o < 0 ? 360 + o : o), h(a);
            }
            function y(e) {
                var t = h(e).toHsl();
                return (t.h = (t.h + 180) % 360), h(t);
            }
            function T(e) {
                var t = h(e).toHsl(),
                    a = t.h;
                return [h(e), h({ h: (a + 120) % 360, s: t.s, l: t.l }), h({ h: (a + 240) % 360, s: t.s, l: t.l })];
            }
            function w(e) {
                var t = h(e).toHsl(),
                    a = t.h;
                return [h(e), h({ h: (a + 90) % 360, s: t.s, l: t.l }), h({ h: (a + 180) % 360, s: t.s, l: t.l }), h({ h: (a + 270) % 360, s: t.s, l: t.l })];
            }
            function _(e) {
                var t = h(e).toHsl(),
                    a = t.h;
                return [h(e), h({ h: (a + 72) % 360, s: t.s, l: t.l }), h({ h: (a + 216) % 360, s: t.s, l: t.l })];
            }
            function k(e, t, a) {
                (t = t || 6), (a = a || 30);
                var o = h(e).toHsl(),
                    r = 360 / a,
                    n = [h(e)];
                for (o.h = (o.h - ((r * t) >> 1) + 720) % 360; --t;) (o.h = (o.h + r) % 360), n.push(h(o));
                return n;
            }
            function P(e, t) {
                t = t || 6;
                for (var a = h(e).toHsv(), o = a.h, r = a.s, n = a.v, s = [], i = 1 / t; t--;) s.push(h({ h: o, s: r, v: n })), (n = (n + i) % 1);
                return s;
            }
            (h.prototype = {
                isDark: function () {
                    return this.getBrightness() < 128;
                },
                isLight: function () {
                    return !this.isDark();
                },
                isValid: function () {
                    return this._ok;
                },
                getOriginalInput: function () {
                    return this._originalInput;
                },
                getFormat: function () {
                    return this._format;
                },
                getAlpha: function () {
                    return this._a;
                },
                getBrightness: function () {
                    var e = this.toRgb();
                    return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
                },
                setAlpha: function (e) {
                    return (this._a = M(e)), (this._roundA = i(1e3 * this._a) / 1e3), this;
                },
                toHsv: function () {
                    var e = l(this._r, this._g, this._b);
                    return { h: 360 * e.h, s: e.s, v: e.v, a: this._a };
                },
                toHsvString: function () {
                    var e = l(this._r, this._g, this._b),
                        t = i(360 * e.h),
                        a = i(100 * e.s),
                        o = i(100 * e.v);
                    return 1 == this._a ? "hsv(" + t + ", " + a + "%, " + o + "%)" : "hsva(" + t + ", " + a + "%, " + o + "%, " + this._roundA + ")";
                },
                toHsl: function () {
                    var e = r(this._r, this._g, this._b);
                    return { h: 360 * e.h, s: e.s, l: e.l, a: this._a };
                },
                toHslString: function () {
                    var e = r(this._r, this._g, this._b),
                        t = i(360 * e.h),
                        a = i(100 * e.s),
                        o = i(100 * e.l);
                    return 1 == this._a ? "hsl(" + t + ", " + a + "%, " + o + "%)" : "hsla(" + t + ", " + a + "%, " + o + "%, " + this._roundA + ")";
                },
                toHex: function (e) {
                    return t(this._r, this._g, this._b, e);
                },
                toHexString: function (e) {
                    return "#" + this.toHex(e);
                },
                toHex8: function () {
                    return d(this._r, this._g, this._b, this._a);
                },
                toHex8String: function () {
                    return "#" + this.toHex8();
                },
                toRgb: function () {
                    return { r: i(this._r), g: i(this._g), b: i(this._b), a: this._a };
                },
                toRgbString: function () {
                    return 1 == this._a ? "rgb(" + i(this._r) + ", " + i(this._g) + ", " + i(this._b) + ")" : "rgba(" + i(this._r) + ", " + i(this._g) + ", " + i(this._b) + ", " + this._roundA + ")";
                },
                toPercentageRgb: function () {
                    return { r: i(100 * z(this._r, 255)) + "%", g: i(100 * z(this._g, 255)) + "%", b: i(100 * z(this._b, 255)) + "%", a: this._a };
                },
                toPercentageRgbString: function () {
                    return 1 == this._a
                        ? "rgb(" + i(100 * z(this._r, 255)) + "%, " + i(100 * z(this._g, 255)) + "%, " + i(100 * z(this._b, 255)) + "%)"
                        : "rgba(" + i(100 * z(this._r, 255)) + "%, " + i(100 * z(this._g, 255)) + "%, " + i(100 * z(this._b, 255)) + "%, " + this._roundA + ")";
                },
                toName: function () {
                    return 0 === this._a ? "transparent" : !(this._a < 1) && (S[t(this._r, this._g, this._b, !0)] || !1);
                },
                toFilter: function (e) {
                    var t = "#" + d(this._r, this._g, this._b, this._a),
                        a = t,
                        o = this._gradientType ? "GradientType = 1, " : "";
                    e && (a = h(e).toHex8String());
                    return "progid:DXImageTransform.Microsoft.gradient(" + o + "startColorstr=" + t + ",endColorstr=" + a + ")";
                },
                toString: function (e) {
                    var t = !!e;
                    e = e || this._format;
                    var a = !1,
                        o = this._a < 1 && 0 <= this._a;
                    return t || !o || ("hex" !== e && "hex6" !== e && "hex3" !== e && "name" !== e)
                        ? ("rgb" === e && (a = this.toRgbString()),
                          "prgb" === e && (a = this.toPercentageRgbString()),
                          ("hex" !== e && "hex6" !== e) || (a = this.toHexString()),
                          "hex3" === e && (a = this.toHexString(!0)),
                          "hex8" === e && (a = this.toHex8String()),
                          "name" === e && (a = this.toName()),
                          "hsl" === e && (a = this.toHslString()),
                          "hsv" === e && (a = this.toHsvString()),
                          a || this.toHexString())
                        : "name" === e && 0 === this._a
                        ? this.toName()
                        : this.toRgbString();
                },
                _applyModification: function (e, t) {
                    var a = e.apply(null, [this].concat([].slice.call(t)));
                    return (this._r = a._r), (this._g = a._g), (this._b = a._b), this.setAlpha(a._a), this;
                },
                lighten: function () {
                    return this._applyModification(b, arguments);
                },
                brighten: function () {
                    return this._applyModification(m, arguments);
                },
                darken: function () {
                    return this._applyModification(v, arguments);
                },
                desaturate: function () {
                    return this._applyModification(a, arguments);
                },
                saturate: function () {
                    return this._applyModification(p, arguments);
                },
                greyscale: function () {
                    return this._applyModification(g, arguments);
                },
                spin: function () {
                    return this._applyModification(x, arguments);
                },
                _applyCombination: function (e, t) {
                    return e.apply(null, [this].concat([].slice.call(t)));
                },
                analogous: function () {
                    return this._applyCombination(k, arguments);
                },
                complement: function () {
                    return this._applyCombination(y, arguments);
                },
                monochromatic: function () {
                    return this._applyCombination(P, arguments);
                },
                splitcomplement: function () {
                    return this._applyCombination(_, arguments);
                },
                triad: function () {
                    return this._applyCombination(T, arguments);
                },
                tetrad: function () {
                    return this._applyCombination(w, arguments);
                },
            }),
                (h.fromRatio = function (e, t) {
                    if ("object" == typeof e) {
                        var a = {};
                        for (var o in e) e.hasOwnProperty(o) && (a[o] = "a" === o ? e[o] : F(e[o]));
                        e = a;
                    }
                    return h(e, t);
                }),
                (h.equals = function (e, t) {
                    return !(!e || !t) && h(e).toRgbString() == h(t).toRgbString();
                }),
                (h.random = function () {
                    return h.fromRatio({ r: e(), g: e(), b: e() });
                }),
                (h.mix = function (e, t, a) {
                    a = 0 === a ? 0 : a || 50;
                    var o,
                        r = h(e).toRgb(),
                        n = h(t).toRgb(),
                        s = a / 100,
                        i = 2 * s - 1,
                        l = n.a - r.a,
                        c = 1 - (o = ((o = i * l == -1 ? i : (i + l) / (1 + i * l)) + 1) / 2),
                        u = { r: n.r * o + r.r * c, g: n.g * o + r.g * c, b: n.b * o + r.b * c, a: n.a * s + r.a * (1 - s) };
                    return h(u);
                }),
                (h.readability = function (e, t) {
                    var a = h(e),
                        o = h(t),
                        r = a.toRgb(),
                        n = o.toRgb(),
                        s = a.getBrightness(),
                        i = o.getBrightness(),
                        l = Math.max(r.r, n.r) - Math.min(r.r, n.r) + Math.max(r.g, n.g) - Math.min(r.g, n.g) + Math.max(r.b, n.b) - Math.min(r.b, n.b);
                    return { brightness: Math.abs(s - i), color: l };
                }),
                (h.isReadable = function (e, t) {
                    var a = h.readability(e, t);
                    return 125 < a.brightness && 500 < a.color;
                }),
                (h.mostReadable = function (e, t) {
                    for (var a = null, o = 0, r = !1, n = 0; n < t.length; n++) {
                        var s = h.readability(e, t[n]),
                            i = 125 < s.brightness && 500 < s.color,
                            l = (s.brightness / 125) * 3 + s.color / 500;
                        ((i && !r) || (i && r && o < l) || (!i && !r && o < l)) && ((r = i), (o = l), (a = h(t[n])));
                    }
                    return a;
                });
            var C = (h.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                rebeccapurple: "663399",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32",
            }),
                S = (h.hexNames = (function (e) {
                    var t = {};
                    for (var a in e) e.hasOwnProperty(a) && (t[e[a]] = a);
                    return t;
                })(C));
            function M(e) {
                return (e = parseFloat(e)), (isNaN(e) || e < 0 || 1 < e) && (e = 1), e;
            }
            function z(e, t) {
                var a;
                "string" == typeof (a = e) && -1 != a.indexOf(".") && 1 === parseFloat(a) && (e = "100%");
                var o,
                    r = "string" == typeof (o = e) && -1 != o.indexOf("%");
                return (e = u(t, f(0, parseFloat(e)))), r && (e = parseInt(e * t, 10) / 100), c.abs(e - t) < 1e-6 ? 1 : (e % t) / parseFloat(t);
            }
            function j(e) {
                return u(1, f(0, e));
            }
            function A(e) {
                return parseInt(e, 16);
            }
            function R(e) {
                return 1 == e.length ? "0" + e : "" + e;
            }
            function F(e) {
                return e <= 1 && (e = 100 * e + "%"), e;
            }
            var H,
                L,
                O,
                Q =
                    ((L = "[\\s|\\(]+(" + (H = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + H + ")[,|\\s]+(" + H + ")\\s*\\)?"),
                    (O = "[\\s|\\(]+(" + H + ")[,|\\s]+(" + H + ")[,|\\s]+(" + H + ")[,|\\s]+(" + H + ")\\s*\\)?"),
                    {
                        rgb: new RegExp("rgb" + L),
                        rgba: new RegExp("rgba" + O),
                        hsl: new RegExp("hsl" + L),
                        hsla: new RegExp("hsla" + O),
                        hsv: new RegExp("hsv" + L),
                        hsva: new RegExp("hsva" + O),
                        hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                        hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                        hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    });
            window.tinycolor = h;
        })(),
        De(function () {
            De.fn.spectrum.load && De.fn.spectrum.processNativeColorInputs();
        });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb2xvcnBpY2tlci9jb2xvcnBpY2tlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2h0dHBzOi8vYmdyaW5zLmdpdGh1Yi5pby9zcGVjdHJ1bS9cclxuIShmdW5jdGlvbiAoZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFtcImpxdWVyeVwiXSwgZSkgOiBcIm9iamVjdFwiID09IHR5cGVvZiBleHBvcnRzICYmIFwib2JqZWN0XCIgPT0gdHlwZW9mIG1vZHVsZSA/IChtb2R1bGUuZXhwb3J0cyA9IGUocmVxdWlyZShcImpxdWVyeVwiKSkpIDogZShqUXVlcnkpO1xyXG59KShmdW5jdGlvbiAoRGUsIHFlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBlLFxyXG4gICAgICAgIEllID0ge1xyXG4gICAgICAgICAgICBiZWZvcmVTaG93OiBhLFxyXG4gICAgICAgICAgICBtb3ZlOiBhLFxyXG4gICAgICAgICAgICBjaGFuZ2U6IGEsXHJcbiAgICAgICAgICAgIHNob3c6IGEsXHJcbiAgICAgICAgICAgIGhpZGU6IGEsXHJcbiAgICAgICAgICAgIGNvbG9yOiAhMSxcclxuICAgICAgICAgICAgZmxhdDogITEsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIHNob3dJbnB1dDogITEsXHJcbiAgICAgICAgICAgIGFsbG93RW1wdHk6ICEwLFxyXG4gICAgICAgICAgICBzaG93QnV0dG9uczogITAsXHJcbiAgICAgICAgICAgIGNsaWNrb3V0RmlyZXNDaGFuZ2U6ICEwLFxyXG4gICAgICAgICAgICBzaG93SW5pdGlhbDogITEsXHJcbiAgICAgICAgICAgIHNob3dQYWxldHRlOiAhMCxcclxuICAgICAgICAgICAgc2hvd1BhbGV0dGVPbmx5OiAhMSxcclxuICAgICAgICAgICAgaGlkZUFmdGVyUGFsZXR0ZVNlbGVjdDogITEsXHJcbiAgICAgICAgICAgIHRvZ2dsZVBhbGV0dGVPbmx5OiAhMSxcclxuICAgICAgICAgICAgc2hvd1NlbGVjdGlvblBhbGV0dGU6ICEwLFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VLZXk6ICExLFxyXG4gICAgICAgICAgICBhcHBlbmRUbzogXCJib2R5XCIsXHJcbiAgICAgICAgICAgIG1heFNlbGVjdGlvblNpemU6IDgsXHJcbiAgICAgICAgICAgIGxvY2FsZTogXCJlblwiLFxyXG4gICAgICAgICAgICBjYW5jZWxUZXh0OiBcIkNhbmNlbFwiLFxyXG4gICAgICAgICAgICBjaG9vc2VUZXh0OiBcIlNhdmVcIixcclxuICAgICAgICAgICAgdGl0bGVUZXh0OiBcIkVsaWdlIHVuYSBtdWVzdHJhOlwiLFxyXG4gICAgICAgICAgICB0b2dnbGVQYWxldHRlTW9yZVRleHQ6IFwiTW9yZVwiLFxyXG4gICAgICAgICAgICB0b2dnbGVQYWxldHRlTGVzc1RleHQ6IFwiTGVzc1wiLFxyXG4gICAgICAgICAgICBjbGVhclRleHQ6IFwiQ2xlYXIgQ29sb3IgU2VsZWN0aW9uXCIsXHJcbiAgICAgICAgICAgIG5vQ29sb3JTZWxlY3RlZFRleHQ6IFwiTm8gQ29sb3IgU2VsZWN0ZWRcIixcclxuICAgICAgICAgICAgcHJlZmVycmVkRm9ybWF0OiBcIm5hbWVcIixcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBjb250YWluZXJDbGFzc05hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlcGxhY2VyQ2xhc3NOYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBzaG93QWxwaGE6ICEwLFxyXG4gICAgICAgICAgICB0aGVtZTogXCJzcC1saWdodFwiLFxyXG4gICAgICAgICAgICBwYWxldHRlOiBbXHJcbiAgICAgICAgICAgICAgICBbXCIjMDAwMDAwXCIsIFwiIzQ0NDQ0NFwiLCBcIiM1YjViNWJcIiwgXCIjOTk5OTk5XCIsIFwiI2JjYmNiY1wiLCBcIiNlZWVlZWVcIiwgXCIjZjNmNmY0XCIsIFwiI2ZmZmZmZlwiXSxcclxuICAgICAgICAgICAgICAgIFtcIiNmNDQzMzZcIiwgXCIjNzQ0NzAwXCIsIFwiI2NlN2UwMFwiLCBcIiM4ZmNlMDBcIiwgXCIjMjk4NmNjXCIsIFwiIzE2NTM3ZVwiLCBcIiM2YTMyOWZcIiwgXCIjYzkwMDc2XCJdLFxyXG4gICAgICAgICAgICAgICAgW1wiI2Y0Y2NjY1wiLCBcIiNmY2U1Y2RcIiwgXCIjZmZmMmNjXCIsIFwiI2Q5ZWFkM1wiLCBcIiNkMGUwZTNcIiwgXCIjY2ZlMmYzXCIsIFwiI2Q5ZDJlOVwiLCBcIiNlYWQxZGNcIl0sXHJcbiAgICAgICAgICAgICAgICBbXCIjZWE5OTk5XCIsIFwiI2Y5Y2I5Y1wiLCBcIiNmZmU1OTlcIiwgXCIjYjZkN2E4XCIsIFwiI2EyYzRjOVwiLCBcIiM5ZmM1ZThcIiwgXCIjYjRhN2Q2XCIsIFwiI2Q1YTZiZFwiXSxcclxuICAgICAgICAgICAgICAgIFtcIiNlMDY2NjZcIiwgXCIjZjZiMjZiXCIsIFwiI2ZmZDk2NlwiLCBcIiM5M2M0N2RcIiwgXCIjNzZhNWFmXCIsIFwiIzZmYThkY1wiLCBcIiM4ZTdjYzNcIiwgXCIjYzI3YmEwXCJdLFxyXG4gICAgICAgICAgICAgICAgW1wiI2NjMDAwMFwiLCBcIiNlNjkxMzhcIiwgXCIjZjFjMjMyXCIsIFwiIzZhYTg0ZlwiLCBcIiM0NTgxOGVcIiwgXCIjM2Q4NWM2XCIsIFwiIzY3NGVhN1wiLCBcIiNhNjRkNzlcIl0sXHJcbiAgICAgICAgICAgICAgICBbXCIjOTkwMDAwXCIsIFwiI2I0NWYwNlwiLCBcIiNiZjkwMDBcIiwgXCIjMzg3NjFkXCIsIFwiIzEzNGY1Y1wiLCBcIiMwYjUzOTRcIiwgXCIjMzUxYzc1XCIsIFwiIzc0MWI0N1wiXSxcclxuICAgICAgICAgICAgICAgIFtcIiM2NjAwMDBcIiwgXCIjNzgzZjA0XCIsIFwiIzdmNjAwMFwiLCBcIiMyNzRlMTNcIiwgXCIjMGMzNDNkXCIsIFwiIzA3Mzc2M1wiLCBcIiMyMDEyNGRcIiwgXCIjNGMxMTMwXCJdLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25QYWxldHRlOiBbXSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6ICExLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBWZSA9IFtdLFxyXG4gICAgICAgIFdlID0gISEvbXNpZS9pLmV4ZWMod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpLFxyXG4gICAgICAgIEJlID0gKCgoZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikuc3R5bGUpLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNSlcIiksIHQoZS5iYWNrZ3JvdW5kQ29sb3IsIFwicmdiYVwiKSB8fCB0KGUuYmFja2dyb3VuZENvbG9yLCBcImhzbGFcIikpLFxyXG4gICAgICAgIEtlID0gW1wiPGRpdiBjbGFzcz0nc3AtcmVwbGFjZXInPlwiLCBcIjxkaXYgY2xhc3M9J3NwLXByZXZpZXcnPjxkaXYgY2xhc3M9J3NwLXByZXZpZXctaW5uZXInPjwvZGl2PjwvZGl2PlwiLCBcIjxkaXYgY2xhc3M9J3NwLWRkJz4mIzk2NjA7PC9kaXY+XCIsIFwiPC9kaXY+XCJdLmpvaW4oXCJcIiksXHJcbiAgICAgICAgJGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChXZSkgZm9yICh2YXIgdCA9IDE7IHQgPD0gNjsgdCsrKSBlICs9IFwiPGRpdiBjbGFzcz0nc3AtXCIgKyB0ICsgXCInPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1jb250YWluZXIgc3AtaGlkZGVuJz5cIixcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtcGFsZXR0ZS1jb250YWluZXInPlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8aDUgY2xhc3M9J3NwLXRpdGxlJz48L2g1PlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1wYWxldHRlIHNwLXRodW1iIHNwLWNmJz48L2Rpdj5cIixcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtcGFsZXR0ZS1idXR0b24tY29udGFpbmVyIHNwLWNmJz5cIixcclxuICAgICAgICAgICAgICAgIFwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzcC1wYWxldHRlLXRvZ2dsZSc+PC9idXR0b24+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtcGlja2VyLWNvbnRhaW5lcic+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXRvcCBzcC1jZic+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWZpbGwnPjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC10b3AtaW5uZXInPlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1jb2xvcic+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXNhdCc+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXZhbCc+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWRyYWdnZXInPjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1jbGVhciBzcC1jbGVhci1kaXNwbGF5Jz5cIixcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWh1ZSc+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXNsaWRlcic+PC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBlLFxyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWFscGhhJz48ZGl2IGNsYXNzPSdzcC1hbHBoYS1pbm5lcic+PGRpdiBjbGFzcz0nc3AtYWxwaGEtaGFuZGxlJz48L2Rpdj48L2Rpdj48L2Rpdj5cIixcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWlucHV0LWNvbnRhaW5lciBzcC1jZic+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxpbnB1dCBjbGFzcz0nc3AtaW5wdXQnIHR5cGU9J3RleHQnIHNwZWxsY2hlY2s9J2ZhbHNlJyAgLz5cIixcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWluaXRpYWwgc3AtdGh1bWIgc3AtY2YnPjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1idXR0b24tY29udGFpbmVyIHNwLWNmJz5cIixcclxuICAgICAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz0nc3AtY2FuY2VsIGRlZmF1bHRfYnRuXzInIGhyZWY9JyMnPjwvYnV0dG9uPlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NwLWNob29zZSBkZWZhdWx0X2J0bl8xJz48L2J1dHRvbj5cIixcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcclxuICAgICAgICAgICAgXS5qb2luKFwiXCIpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICBmdW5jdGlvbiB0KGUsIHQpIHtcclxuICAgICAgICByZXR1cm4gISF+KFwiXCIgKyBlKS5pbmRleE9mKHQpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gWGUoZSwgdCwgYSwgbykge1xyXG4gICAgICAgIGZvciAodmFyIHIgPSBbXSwgbiA9IDA7IG4gPCBlLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gZVtuXTtcclxuICAgICAgICAgICAgaWYgKHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gdGlueWNvbG9yKHMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGwgPSBpLnRvSHNsKCkubCA8IDAuNSA/IFwic3AtdGh1bWItZWwgc3AtdGh1bWItZGFya1wiIDogXCJzcC10aHVtYi1lbCBzcC10aHVtYi1saWdodFwiO1xyXG4gICAgICAgICAgICAgICAgbCArPSB0aW55Y29sb3IuZXF1YWxzKHQsIHMpID8gXCIgc3AtdGh1bWItYWN0aXZlXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBpLnRvU3RyaW5nKG8ucHJlZmVycmVkRm9ybWF0IHx8IFwicmdiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHUgPSBCZSA/IFwiYmFja2dyb3VuZC1jb2xvcjpcIiArIGkudG9SZ2JTdHJpbmcoKSA6IFwiZmlsdGVyOlwiICsgaS50b0ZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgci5wdXNoKCc8c3BhbiB0aXRsZT1cIicgKyBjICsgJ1wiIGRhdGEtY29sb3I9XCInICsgaS50b1JnYlN0cmluZygpICsgJ1wiIGNsYXNzPVwiJyArIGwgKyAnXCI+PHNwYW4gY2xhc3M9XCJzcC10aHVtYi1pbm5lclwiIHN0eWxlPVwiJyArIHUgKyAnO1wiIC8+PC9zcGFuPicpO1xyXG4gICAgICAgICAgICB9IGVsc2Ugci5wdXNoKCc8c3BhbiBjbGFzcz1cInNwLXRodW1iLWVsIHNwLWNsZWFyLWRpc3BsYXlcIiA+PHNwYW4gY2xhc3M9XCJzcC1jbGVhci1wYWxldHRlLW9ubHlcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1wiIC8+PC9zcGFuPicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPSdzcC1jZiBcIiArIGEgKyBcIic+XCIgKyByLmpvaW4oXCJcIikgKyBcIjwvZGl2PlwiO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbihlLCB0KSB7XHJcbiAgICAgICAgdmFyIGEsXHJcbiAgICAgICAgICAgIG8sXHJcbiAgICAgICAgICAgIHIsXHJcbiAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgIGggPSAoZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgIChlLmxvY2FsZSA9IGUubG9jYWxlIHx8IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UpLFxyXG4gICAgICAgICAgICAgICAgICAgIGUubG9jYWxlICYmIChlLmxvY2FsZSA9IGUubG9jYWxlLnNwbGl0KFwiLVwiKVswXS50b0xvd2VyQ2FzZSgpKSxcclxuICAgICAgICAgICAgICAgICAgICBcImVuXCIgIT0gZS5sb2NhbGUgJiYgRGUuc3BlY3RydW0ubG9jYWxpemF0aW9uW2UubG9jYWxlXSAmJiAoZSA9IERlLmV4dGVuZCh7fSwgRGUuc3BlY3RydW0ubG9jYWxpemF0aW9uW2UubG9jYWxlXSwgZSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBEZS5leHRlbmQoe30sIEllLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYS5jYWxsYmFja3MgPSB7IG1vdmU6IEdlKGEubW92ZSwgdCksIGNoYW5nZTogR2UoYS5jaGFuZ2UsIHQpLCBzaG93OiBHZShhLnNob3csIHQpLCBoaWRlOiBHZShhLmhpZGUsIHQpLCBiZWZvcmVTaG93OiBHZShhLmJlZm9yZVNob3csIHQpIH0pLCBhO1xyXG4gICAgICAgICAgICB9KSh0LCBlKSxcclxuICAgICAgICAgICAgcyA9IGgudHlwZSxcclxuICAgICAgICAgICAgZCA9IFwiZmxhdFwiID09IHMsXHJcbiAgICAgICAgICAgIGkgPSBoLnNob3dTZWxlY3Rpb25QYWxldHRlLFxyXG4gICAgICAgICAgICBsID0gaC5sb2NhbFN0b3JhZ2VLZXksXHJcbiAgICAgICAgICAgIGMgPSBoLnRoZW1lLFxyXG4gICAgICAgICAgICB1ID0gaC5jYWxsYmFja3MsXHJcbiAgICAgICAgICAgIGYgPVxyXG4gICAgICAgICAgICAgICAgKChhID0gUWUpLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgICAgICAgICByICYmIGNsZWFyVGltZW91dChuKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCFyICYmIG4pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuID0gbnVsbCksIGEuYXBwbHkoZSwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBvKSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcCA9ICEobyA9IDEwKSxcclxuICAgICAgICAgICAgZyA9ICExLFxyXG4gICAgICAgICAgICBiID0gMCxcclxuICAgICAgICAgICAgbSA9IDAsXHJcbiAgICAgICAgICAgIHYgPSAwLFxyXG4gICAgICAgICAgICB4ID0gMCxcclxuICAgICAgICAgICAgeSA9IDAsXHJcbiAgICAgICAgICAgIFQgPSAwLFxyXG4gICAgICAgICAgICB3ID0gMCxcclxuICAgICAgICAgICAgXyA9IDAsXHJcbiAgICAgICAgICAgIGsgPSAwLFxyXG4gICAgICAgICAgICBQID0gMCxcclxuICAgICAgICAgICAgQyA9IDEsXHJcbiAgICAgICAgICAgIFMgPSBbXSxcclxuICAgICAgICAgICAgTSA9IFtdLFxyXG4gICAgICAgICAgICB6ID0ge30sXHJcbiAgICAgICAgICAgIGogPSBoLnNlbGVjdGlvblBhbGV0dGUuc2xpY2UoMCksXHJcbiAgICAgICAgICAgIEEgPSBoLm1heFNlbGVjdGlvblNpemUsXHJcbiAgICAgICAgICAgIFIgPSBcInNwLWRyYWdnaW5nXCIsXHJcbiAgICAgICAgICAgIEYgPSAhMSxcclxuICAgICAgICAgICAgSCA9IG51bGwsXHJcbiAgICAgICAgICAgIEwgPSBlLm93bmVyRG9jdW1lbnQsXHJcbiAgICAgICAgICAgIE8gPSAoTC5ib2R5LCBEZShlKSksXHJcbiAgICAgICAgICAgIFEgPSAhMSxcclxuICAgICAgICAgICAgRSA9IERlKCRlLCBMKS5hZGRDbGFzcyhjKSxcclxuICAgICAgICAgICAgTiA9IEUuZmluZChcIi5zcC1waWNrZXItY29udGFpbmVyXCIpLFxyXG4gICAgICAgICAgICBEID0gRS5maW5kKFwiLnNwLWNvbG9yXCIpLFxyXG4gICAgICAgICAgICBxID0gRS5maW5kKFwiLnNwLWRyYWdnZXJcIiksXHJcbiAgICAgICAgICAgIEkgPSBFLmZpbmQoXCIuc3AtaHVlXCIpLFxyXG4gICAgICAgICAgICBWID0gRS5maW5kKFwiLnNwLXNsaWRlclwiKSxcclxuICAgICAgICAgICAgVyA9IEUuZmluZChcIi5zcC1hbHBoYS1pbm5lclwiKSxcclxuICAgICAgICAgICAgQiA9IEUuZmluZChcIi5zcC1hbHBoYVwiKSxcclxuICAgICAgICAgICAgSyA9IEUuZmluZChcIi5zcC1hbHBoYS1oYW5kbGVcIiksXHJcbiAgICAgICAgICAgICQgPSBFLmZpbmQoXCIuc3AtaW5wdXRcIiksXHJcbiAgICAgICAgICAgIFggPSBFLmZpbmQoXCIuc3AtcGFsZXR0ZVwiKSxcclxuICAgICAgICAgICAgWSA9IEUuZmluZChcIi5zcC1pbml0aWFsXCIpLFxyXG4gICAgICAgICAgICBHID0gRS5maW5kKFwiLnNwLWNhbmNlbFwiKSxcclxuICAgICAgICAgICAgVSA9IEUuZmluZChcIi5zcC1jbGVhclwiKSxcclxuICAgICAgICAgICAgSiA9IEUuZmluZChcIi5zcC1jaG9vc2VcIiksXHJcbiAgICAgICAgICAgIEpKID0gRS5maW5kKFwiLnNwLXRpdGxlXCIpLFxyXG4gICAgICAgICAgICBaID0gRS5maW5kKFwiLnNwLXBhbGV0dGUtdG9nZ2xlXCIpLFxyXG4gICAgICAgICAgICBlZSA9IE8uaXMoXCJpbnB1dFwiKSxcclxuICAgICAgICAgICAgdGUgPSAoZWUgJiYgXCJjb2xvclwiID09PSBPLmF0dHIoXCJ0eXBlXCIpICYmIEplKCksIGVlICYmIFwiY29sb3JcIiA9PSBzKSxcclxuICAgICAgICAgICAgYWUgPSB0ZSA/IERlKEtlKS5hZGRDbGFzcyhjKS5hZGRDbGFzcyhoLmNsYXNzTmFtZSkuYWRkQ2xhc3MoaC5yZXBsYWNlckNsYXNzTmFtZSkgOiBEZShbXSksXHJcbiAgICAgICAgICAgIG9lID0gdGUgPyBhZSA6IE8sXHJcbiAgICAgICAgICAgIHJlID0gYWUuZmluZChcIi5zcC1wcmV2aWV3LWlubmVyXCIpLFxyXG4gICAgICAgICAgICBuZSA9IGguY29sb3IgfHwgKGVlICYmIE8udmFsKCkpLFxyXG4gICAgICAgICAgICBzZSA9ICExLFxyXG4gICAgICAgICAgICBpZSA9IGgucHJlZmVycmVkRm9ybWF0LFxyXG4gICAgICAgICAgICBsZSA9ICFoLnNob3dCdXR0b25zIHx8IGguY2xpY2tvdXRGaXJlc0NoYW5nZSxcclxuICAgICAgICAgICAgY2UgPSAhbmUsXHJcbiAgICAgICAgICAgIHVlID0gaC5hbGxvd0VtcHR5LFxyXG4gICAgICAgICAgICBmZSA9IG51bGwsXHJcbiAgICAgICAgICAgIGhlID0gbnVsbCxcclxuICAgICAgICAgICAgZGUgPSBudWxsLFxyXG4gICAgICAgICAgICBwZSA9IG51bGwsXHJcbiAgICAgICAgICAgIGdlID0gTy5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgaWYgKGdlICE9PSBxZSAmJiAwIDwgZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBiZSA9IERlKCdsYWJlbFtmb3I9XCInICsgZ2UgKyAnXCJdJyk7XHJcbiAgICAgICAgICAgIGJlLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAgICAgYmUub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCksIE8uc3BlY3RydW0oXCJzaG93XCIpLCAhMTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBtZSgpIHtcclxuICAgICAgICAgICAgaWYgKChoLnNob3dQYWxldHRlT25seSAmJiAoaC5zaG93UGFsZXR0ZSA9ICEwKSwgWi50ZXh0KGguc2hvd1BhbGV0dGVPbmx5ID8gaC50b2dnbGVQYWxldHRlTW9yZVRleHQgOiBoLnRvZ2dsZVBhbGV0dGVMZXNzVGV4dCksIGgucGFsZXR0ZSkpIHtcclxuICAgICAgICAgICAgICAgIChTID0gaC5wYWxldHRlLnNsaWNlKDApKSwgKE0gPSBEZS5pc0FycmF5KFNbMF0pID8gUyA6IFtTXSksICh6ID0ge30pO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZSA9IDA7IGUgPCBNLmxlbmd0aDsgZSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgTVtlXS5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHRpbnljb2xvcihNW2VdW3RdKS50b1JnYlN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6W2FdID0gITA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaC5zaG93UGFsZXR0ZU9ubHkgJiYgIWguY29sb3IgJiYgKG5lID0gXCJcIiA9PT0gU1swXVswXSA/IFNbMF1bMF0gOiBPYmplY3Qua2V5cyh6KVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRS50b2dnbGVDbGFzcyhcInNwLWZsYXRcIiwgZCksXHJcbiAgICAgICAgICAgICAgICBFLnRvZ2dsZUNsYXNzKFwic3AtaW5wdXQtZGlzYWJsZWRcIiwgIWguc2hvd0lucHV0KSxcclxuICAgICAgICAgICAgICAgIEUudG9nZ2xlQ2xhc3MoXCJzcC1hbHBoYS1lbmFibGVkXCIsIGguc2hvd0FscGhhKSxcclxuICAgICAgICAgICAgICAgIEUudG9nZ2xlQ2xhc3MoXCJzcC1jbGVhci1lbmFibGVkXCIsIHVlKSxcclxuICAgICAgICAgICAgICAgIEUudG9nZ2xlQ2xhc3MoXCJzcC1idXR0b25zLWRpc2FibGVkXCIsICFoLnNob3dCdXR0b25zKSxcclxuICAgICAgICAgICAgICAgIEUudG9nZ2xlQ2xhc3MoXCJzcC1wYWxldHRlLWJ1dHRvbnMtZGlzYWJsZWRcIiwgIWgudG9nZ2xlUGFsZXR0ZU9ubHkpLFxyXG4gICAgICAgICAgICAgICAgRS50b2dnbGVDbGFzcyhcInNwLXBhbGV0dGUtZGlzYWJsZWRcIiwgIWguc2hvd1BhbGV0dGUpLFxyXG4gICAgICAgICAgICAgICAgRS50b2dnbGVDbGFzcyhcInNwLXBhbGV0dGUtb25seVwiLCBoLnNob3dQYWxldHRlT25seSksXHJcbiAgICAgICAgICAgICAgICBFLnRvZ2dsZUNsYXNzKFwic3AtaW5pdGlhbC1kaXNhYmxlZFwiLCAhaC5zaG93SW5pdGlhbCksXHJcbiAgICAgICAgICAgICAgICBFLmFkZENsYXNzKGguY2xhc3NOYW1lKS5hZGRDbGFzcyhoLmNvbnRhaW5lckNsYXNzTmFtZSksXHJcbiAgICAgICAgICAgICAgICBRZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB2ZSgpIHtcclxuICAgICAgICAgICAgaWYgKGwpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gZVtsXS5zcGxpdChcIiwjXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIDEgPCB0Lmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZGVsZXRlIGVbbF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlLmVhY2godCwgZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhlKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbbF0uc3BsaXQoXCI7XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24geGUoZSkge1xyXG4gICAgICAgICAgICBpZiAoaSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aW55Y29sb3IoZSkudG9SZ2JTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmICghelt0XSAmJiAtMSA9PT0gRGUuaW5BcnJheSh0LCBqKSkgZm9yIChqLnB1c2godCkgOyBqLmxlbmd0aCA+IEE7KSBqLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobClcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlW2xdID0gai5qb2luKFwiO1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB5ZSgpIHtcclxuICAgICAgICAgICAgdmFyIGEgPSBSZSgpLFxyXG4gICAgICAgICAgICAgICAgZSA9IERlLm1hcChNLCBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBYZShlLCBhLCBcInNwLXBhbGV0dGUtcm93IHNwLXBhbGV0dGUtcm93LVwiICsgdCwgaCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmUoKSxcclxuICAgICAgICAgICAgICAgIGogJiZcclxuICAgICAgICAgICAgICAgICAgICBlLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFhlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoLnNob3dQYWxldHRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IGoubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gdGlueWNvbG9yKGpbdF0pLnRvUmdiU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6W2FdIHx8IGUucHVzaChqW3RdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnJldmVyc2UoKS5zbGljZSgwLCBoLm1heFNlbGVjdGlvblNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwLXBhbGV0dGUtcm93IHNwLXBhbGV0dGUtcm93LXNlbGVjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIFguaHRtbChlLmpvaW4oXCJcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBUZSgpIHtcclxuICAgICAgICAgICAgaWYgKGguc2hvd0luaXRpYWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IFJlKCk7XHJcbiAgICAgICAgICAgICAgICBZLmh0bWwoWGUoW2UsIHRdLCB0LCBcInNwLXBhbGV0dGUtcm93LWluaXRpYWxcIiwgaCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHdlKCkge1xyXG4gICAgICAgICAgICAobSA8PSAwIHx8IGIgPD0gMCB8fCB4IDw9IDApICYmIFFlKCksIChnID0gITApLCBFLmFkZENsYXNzKFIpLCAoSCA9IG51bGwpLCBPLnRyaWdnZXIoXCJkcmFnc3RhcnQuc3BlY3RydW1cIiwgW1JlKCldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gX2UoKSB7XHJcbiAgICAgICAgICAgIChnID0gITEpLCBFLnJlbW92ZUNsYXNzKFIpLCBPLnRyaWdnZXIoXCJkcmFnc3RvcC5zcGVjdHJ1bVwiLCBbUmUoKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBrZShlKSB7XHJcbiAgICAgICAgICAgIGlmIChGKSBGID0gITE7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKChudWxsICE9PSBlICYmIFwiXCIgIT09IGUpIHx8ICF1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aW55Y29sb3IoZSk7XHJcbiAgICAgICAgICAgICAgICB0LmlzVmFsaWQoKSA/IChBZSh0KSwgRmUoKSwgT2UoKSkgOiAkLmFkZENsYXNzKFwic3AtdmFsaWRhdGlvbi1lcnJvclwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIEFlKG51bGwpLCBGZSgpLCBPZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBQZSgpIHtcclxuICAgICAgICAgICAgKHAgPyB6ZSA6IENlKSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBDZSgpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSBEZS5FdmVudChcImJlZm9yZVNob3cuc3BlY3RydW1cIik7XHJcbiAgICAgICAgICAgIHBcclxuICAgICAgICAgICAgICAgID8gUWUoKVxyXG4gICAgICAgICAgICAgICAgOiAoTy50cmlnZ2VyKGUsIFtSZSgpXSksXHJcbiAgICAgICAgICAgICAgICAgICExID09PSB1LmJlZm9yZVNob3coUmUoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgIGUuaXNEZWZhdWx0UHJldmVudGVkKCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICgoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgVmUubGVuZ3RoOyBlKyspIFZlW2VdICYmIFZlW2VdLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAocCA9ICEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgIERlKEwpLm9uKFwia2V5ZG93bi5zcGVjdHJ1bVwiLCBTZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICBEZShMKS5vbihcImNsaWNrLnNwZWN0cnVtXCIsIE1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgIERlKHdpbmRvdykub24oXCJyZXNpemUuc3BlY3RydW1cIiwgZiksXHJcbiAgICAgICAgICAgICAgICAgICAgICBhZS5hZGRDbGFzcyhcInNwLWFjdGl2ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgIEUucmVtb3ZlQ2xhc3MoXCJzcC1oaWRkZW5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICBRZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgSGUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgIChzZSA9IFJlKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgVGUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHUuc2hvdyhzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICBPLnRyaWdnZXIoXCJzaG93LnNwZWN0cnVtXCIsIFtzZV0pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIFNlKGUpIHtcclxuICAgICAgICAgICAgMjcgPT09IGUua2V5Q29kZSAmJiB6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBNZShlKSB7XHJcbiAgICAgICAgICAgIDIgIT0gZS5idXR0b24gJiYgKGcgfHwgKGxlID8gT2UoITApIDogamUoKSwgemUoKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB6ZSgpIHtcclxuICAgICAgICAgICAgcCAmJlxyXG4gICAgICAgICAgICAgICAgIWQgJiZcclxuICAgICAgICAgICAgICAgICgocCA9ICExKSwgRGUoTCkub2ZmKFwia2V5ZG93bi5zcGVjdHJ1bVwiLCBTZSksIERlKEwpLm9mZihcImNsaWNrLnNwZWN0cnVtXCIsIE1lKSwgRGUod2luZG93KS5vZmYoXCJyZXNpemUuc3BlY3RydW1cIiwgZiksIGFlLnJlbW92ZUNsYXNzKFwic3AtYWN0aXZlXCIpLCBFLmFkZENsYXNzKFwic3AtaGlkZGVuXCIpLCB1LmhpZGUoUmUoKSksIE8udHJpZ2dlcihcImhpZGUuc3BlY3RydW1cIiwgW1JlKCldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGplKCkge1xyXG4gICAgICAgICAgICBBZShzZSwgITApLCBPZSghMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIEFlKGUsIHQpIHtcclxuICAgICAgICAgICAgdmFyIGEsIG87XHJcbiAgICAgICAgICAgIHRpbnljb2xvci5lcXVhbHMoZSwgUmUoKSlcclxuICAgICAgICAgICAgICAgID8gSGUoKVxyXG4gICAgICAgICAgICAgICAgOiAoKGUgJiYgZSAhPT0gcWUpIHx8ICF1ZSA/ICgoY2UgPSAhMSksIChvID0gKGEgPSB0aW55Y29sb3IoZSkpLnRvSHN2KCkpLCAoXyA9IChvLmggJSAzNjApIC8gMzYwKSwgKGsgPSBvLnMpLCAoUCA9IG8udiksIChDID0gby5hKSkgOiAoY2UgPSAhMCksIEhlKCksIGEgJiYgYS5pc1ZhbGlkKCkgJiYgIXQgJiYgKGllID0gaC5wcmVmZXJyZWRGb3JtYXQgfHwgYS5nZXRGb3JtYXQoKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBSZShlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZSA9IGUgfHwge30pLCB1ZSAmJiBjZSA/IG51bGwgOiB0aW55Y29sb3IuZnJvbVJhdGlvKHsgaDogXywgczogaywgdjogUCwgYTogTWF0aC5yb3VuZCgxZTMgKiBDKSAvIDFlMyB9LCB7IGZvcm1hdDogZS5mb3JtYXQgfHwgaWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIEZlKCkge1xyXG4gICAgICAgICAgICBIZSgpLCB1Lm1vdmUoUmUoKSksIE8udHJpZ2dlcihcIm1vdmUuc3BlY3RydW1cIiwgW1JlKCldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gSGUoKSB7XHJcbiAgICAgICAgICAgICQucmVtb3ZlQ2xhc3MoXCJzcC12YWxpZGF0aW9uLWVycm9yXCIpLCBMZSgpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IHRpbnljb2xvci5mcm9tUmF0aW8oeyBoOiBfLCBzOiAxLCB2OiAxIH0pO1xyXG4gICAgICAgICAgICBELmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgZS50b0hleFN0cmluZygpKTtcclxuICAgICAgICAgICAgdmFyIHQgPSBpZTtcclxuICAgICAgICAgICAgQyA8IDEgJiYgKDAgIT09IEMgfHwgXCJuYW1lXCIgIT09IHQpICYmICgoXCJoZXhcIiAhPT0gdCAmJiBcImhleDNcIiAhPT0gdCAmJiBcImhleDZcIiAhPT0gdCAmJiBcIm5hbWVcIiAhPT0gdCkgfHwgKHQgPSBcInJnYlwiKSk7XHJcbiAgICAgICAgICAgIHZhciBhID0gUmUoeyBmb3JtYXQ6IHQgfSksXHJcbiAgICAgICAgICAgICAgICBvID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKChyZS5yZW1vdmVDbGFzcyhcInNwLWNsZWFyLWRpc3BsYXlcIiksIHJlLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKSwgIWEgJiYgdWUpKSByZS5hZGRDbGFzcyhcInNwLWNsZWFyLWRpc3BsYXlcIik7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSBhLnRvSGV4U3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IGEudG9SZ2JTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmICgoQmUgfHwgMSA9PT0gYS5hbHBoYSA/IHJlLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgbikgOiAocmUuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpLCByZS5jc3MoXCJmaWx0ZXJcIiwgYS50b0ZpbHRlcigpKSksIGguc2hvd0FscGhhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gYS50b1JnYigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuYSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aW55Y29sb3IocykudG9SZ2JTdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IFwibGluZWFyLWdyYWRpZW50KGxlZnQsIFwiICsgaSArIFwiLCBcIiArIHIgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICBXZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFcuY3NzKFwiZmlsdGVyXCIsIHRpbnljb2xvcihpKS50b0ZpbHRlcih7IGdyYWRpZW50VHlwZTogMSB9LCByKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoVy5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiLXdlYmtpdC1cIiArIGwpLCBXLmNzcyhcImJhY2tncm91bmRcIiwgXCItbW96LVwiICsgbCksIFcuY3NzKFwiYmFja2dyb3VuZFwiLCBcIi1tcy1cIiArIGwpLCBXLmNzcyhcImJhY2tncm91bmRcIiwgXCJsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIFwiICsgaSArIFwiLCBcIiArIHIgKyBcIilcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbyA9IGEudG9TdHJpbmcodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKChoLnNob3dJbnB1dCAmJiAkLnZhbChvKSwgTy52YWwobyksIFwidGV4dFwiID09IGgudHlwZSB8fCBcImNvbXBvbmVudFwiID09IGgudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjID0gYTtcclxuICAgICAgICAgICAgICAgIGlmIChjICYmIGhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBjLmlzTGlnaHQoKSB8fCBjLmdldEFscGhhKCkgPCAwLjQgPyBcImJsYWNrXCIgOiBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaGUuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBjLnRvUmdiU3RyaW5nKCkpLmNzcyhcImNvbG9yXCIsIHUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGhlLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgcGUpLmNzcyhcImNvbG9yXCIsIGRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBoLnNob3dQYWxldHRlICYmIHllKCksIFRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIExlKCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IGssXHJcbiAgICAgICAgICAgICAgICB0ID0gUDtcclxuICAgICAgICAgICAgaWYgKHVlICYmIGNlKSBLLmhpZGUoKSwgVi5oaWRlKCksIHEuaGlkZSgpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEsuc2hvdygpLCBWLnNob3coKSwgcS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGUgKiBiLFxyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBtIC0gdCAqIG07XHJcbiAgICAgICAgICAgICAgICAoYSA9IE1hdGgubWF4KC12LCBNYXRoLm1pbihiIC0gdiwgYSAtIHYpKSksIChvID0gTWF0aC5tYXgoLXYsIE1hdGgubWluKG0gLSB2LCBvIC0gdikpKSwgcS5jc3MoeyB0b3A6IG8gKyBcInB4XCIsIGxlZnQ6IGEgKyBcInB4XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IEMgKiB5O1xyXG4gICAgICAgICAgICAgICAgSy5jc3MoeyBsZWZ0OiByIC0gVCAvIDIgKyBcInB4XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IF8gKiB4O1xyXG4gICAgICAgICAgICAgICAgVi5jc3MoeyB0b3A6IG4gLSB3ICsgXCJweFwiIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIE9lKGUpIHtcclxuICAgICAgICAgICAgdmFyIHQgPSBSZSgpLFxyXG4gICAgICAgICAgICAgICAgYSA9ICF0aW55Y29sb3IuZXF1YWxzKHQsIHNlKTtcclxuICAgICAgICAgICAgdCAmJiAodC50b1N0cmluZyhpZSksIHhlKHQpKSwgZSAmJiBhICYmICh1LmNoYW5nZSh0KSwgKEYgPSAhMCksIE8udHJpZ2dlcihcImNoYW5nZVwiLCBbdF0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gUWUoKSB7XHJcbiAgICAgICAgICAgIHZhciBlLCB0LCBhLCBvLCByLCBuLCBzLCBpLCBsLCBjLCB1LCBmO1xyXG4gICAgICAgICAgICBwICYmXHJcbiAgICAgICAgICAgICAgICAoKGIgPSBELndpZHRoKCkpLFxyXG4gICAgICAgICAgICAgICAgKG0gPSBELmhlaWdodCgpKSxcclxuICAgICAgICAgICAgICAgICh2ID0gcS5oZWlnaHQoKSksXHJcbiAgICAgICAgICAgICAgICBJLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAoeCA9IEkuaGVpZ2h0KCkpLFxyXG4gICAgICAgICAgICAgICAgKHcgPSBWLmhlaWdodCgpKSxcclxuICAgICAgICAgICAgICAgICh5ID0gQi53aWR0aCgpKSxcclxuICAgICAgICAgICAgICAgIChUID0gSy53aWR0aCgpKSxcclxuICAgICAgICAgICAgICAgIGQgfHxcclxuICAgICAgICAgICAgICAgICAgICAoRS5jc3MoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGgub2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gRS5vZmZzZXQoaC5vZmZzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogRS5vZmZzZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgodCA9IG9lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGEgPSAoZSA9IEUpLm91dGVyV2lkdGgoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvID0gZS5vdXRlckhlaWdodCgpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHIgPSB0Lm91dGVySGVpZ2h0KCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobiA9IGVbMF0ub3duZXJEb2N1bWVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzID0gbi5kb2N1bWVudEVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSA9IHMuY2xpZW50V2lkdGggKyBEZShuKS5zY3JvbGxMZWZ0KCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobCA9IHMuY2xpZW50SGVpZ2h0ICsgRGUobikuc2Nyb2xsVG9wKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYyA9IHQub2Zmc2V0KCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodSA9IGMubGVmdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmID0gYy50b3ApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZiArPSByKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHUgLT0gTWF0aC5taW4odSwgaSA8IHUgKyBhICYmIGEgPCBpID8gTWF0aC5hYnModSArIGEgLSBpKSA6IDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3A6IChmIC09IE1hdGgubWluKGYsIGwgPCBmICsgbyAmJiBvIDwgbCA/IE1hdGguYWJzKCsobyArIHIpKSA6IDApKSwgYm90dG9tOiBjLmJvdHRvbSwgbGVmdDogdSwgcmlnaHQ6IGMucmlnaHQsIHdpZHRoOiBjLndpZHRoLCBoZWlnaHQ6IGMuaGVpZ2h0IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSksXHJcbiAgICAgICAgICAgICAgICBMZSgpLFxyXG4gICAgICAgICAgICAgICAgaC5zaG93UGFsZXR0ZSAmJiB5ZSgpLFxyXG4gICAgICAgICAgICAgICAgTy50cmlnZ2VyKFwicmVmbG93LnNwZWN0cnVtXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gRWUoKSB7XHJcbiAgICAgICAgICAgIHplKCksIChRID0gITApLCBPLmF0dHIoXCJkaXNhYmxlZFwiLCAhMCksIG9lLmFkZENsYXNzKFwic3AtZGlzYWJsZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICEoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAoV2UgJiYgRS5maW5kKFwiKjpub3QoaW5wdXQpXCIpLmF0dHIoXCJ1bnNlbGVjdGFibGVcIiwgXCJvblwiKSxcclxuICAgICAgICAgICAgICAgIG1lKCksXHJcbiAgICAgICAgICAgICAgICAoZmUgPSBEZSgnPHNwYW4gY2xhc3M9XCJzcC1vcmlnaW5hbC1pbnB1dC1jb250YWluZXJcIj48L3NwYW4+JykpLFxyXG4gICAgICAgICAgICAgICAgW1wibWFyZ2luXCJdLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZS5jc3MoZSwgTy5jc3MoZSkpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIFwiYmxvY2tcIiA9PSBPLmNzcyhcImRpc3BsYXlcIikgJiYgZmUuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIiksXHJcbiAgICAgICAgICAgICAgICB0ZSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgTy5hZnRlcihhZSkuaGlkZSgpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChcInRleHRcIiA9PSBzKSBmZS5hZGRDbGFzcyhcInNwLWNvbG9yaXplLWNvbnRhaW5lclwiKSwgTy5hZGRDbGFzcyhcInNwZWN0cnVtIHNwLWNvbG9yaXplXCIpLndyYXAoZmUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChcImNvbXBvbmVudFwiID09IHMpIHtcclxuICAgICAgICAgICAgICAgIE8uYWRkQ2xhc3MoXCJzcGVjdHJ1bVwiKS53cmFwKGZlKTtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gRGUoW1wiPGRpdiBjbGFzcz0nc3AtY29sb3JpemUtY29udGFpbmVyIHNwLWFkZC1vbic+XCIsIFwiPGRpdiBjbGFzcz0nc3AtY29sb3JpemUnPjwvZGl2PiBcIiwgXCI8L2Rpdj5cIl0uam9pbihcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICBlXHJcbiAgICAgICAgICAgICAgICAgICAgLndpZHRoKE8ub3V0ZXJIZWlnaHQoKSArIFwicHhcIilcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKFwiYm9yZGVyLXJhZGl1c1wiLCBPLmNzcyhcImJvcmRlci1yYWRpdXNcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyhcImJvcmRlclwiLCBPLmNzcyhcImJvcmRlclwiKSksXHJcbiAgICAgICAgICAgICAgICAgICAgTy5hZGRDbGFzcyhcIndpdGgtYWRkLW9uXCIpLmJlZm9yZShlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKChoZSA9IE8ucGFyZW50KCkuZmluZChcIi5zcC1jb2xvcml6ZVwiKSksIChkZSA9IGhlLmNzcyhcImNvbG9yXCIpKSwgKHBlID0gaGUuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKSksIHVlIHx8IFUuaGlkZSgpLCBkKSkgTy5hZnRlcihFKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBcInBhcmVudFwiID09PSBoLmFwcGVuZFRvID8gTy5wYXJlbnQoKSA6IERlKGguYXBwZW5kVG8pO1xyXG4gICAgICAgICAgICAgICAgMSAhPT0gdC5sZW5ndGggJiYgKHQgPSBEZShcImJvZHlcIikpLCB0LmFwcGVuZChFKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlLmRhdGEgJiYgZS5kYXRhLmlnbm9yZSA/IChBZShEZShlLnRhcmdldCkuY2xvc2VzdChcIi5zcC10aHVtYi1lbFwiKS5kYXRhKFwiY29sb3JcIikpLCBGZSgpKSA6IChBZShEZShlLnRhcmdldCkuY2xvc2VzdChcIi5zcC10aHVtYi1lbFwiKS5kYXRhKFwiY29sb3JcIikpLCBGZSgpLCBoLmhpZGVBZnRlclBhbGV0dGVTZWxlY3QgPyAoT2UoITApLCB6ZSgpKSA6IE9lKCkpLCAhMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2ZSgpLFxyXG4gICAgICAgICAgICAgICAgb2Uub24oXCJjbGljay5zcGVjdHJ1bSB0b3VjaHN0YXJ0LnNwZWN0cnVtXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUSB8fCBQZSgpLCBlLnN0b3BQcm9wYWdhdGlvbigpLCBEZShlLnRhcmdldCkuaXMoXCJpbnB1dFwiKSB8fCBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICghTy5pcyhcIjpkaXNhYmxlZFwiKSAmJiAhMCAhPT0gaC5kaXNhYmxlZCkgfHwgRWUoKSxcclxuICAgICAgICAgICAgICAgIEUuY2xpY2soWWUpLFxyXG4gICAgICAgICAgICAgICAgWyQsIE9dLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0LmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlKHQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Lm9uKFwicGFzdGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2UodC52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQua2V5ZG93bihmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTMgPT0gZS5rZXlDb2RlICYmIChrZShEZSh0KS52YWwoKSksIHQgPT0gTyAmJiB6ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIEcudGV4dChoLmNhbmNlbFRleHQpLFxyXG4gICAgICAgICAgICAgICAgRy5vbihcImNsaWNrLnNwZWN0cnVtXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKSwgZS5wcmV2ZW50RGVmYXVsdCgpLCBqZSgpLCB6ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBVLmF0dHIoXCJ0aXRsZVwiLCBoLmNsZWFyVGV4dCksXHJcbiAgICAgICAgICAgICAgICBVLm9uKFwiY2xpY2suc3BlY3RydW1cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpLCBlLnByZXZlbnREZWZhdWx0KCksIChjZSA9ICEwKSwgRmUoKSwgZCAmJiBPZSghMCk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIEpKLnRleHQoaC50aXRsZVRleHQpLFxyXG4gICAgICAgICAgICAgICAgSi50ZXh0KGguY2hvb3NlVGV4dCksXHJcbiAgICAgICAgICAgICAgICBKLm9uKFwiY2xpY2suc3BlY3RydW1cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpLCBlLnByZXZlbnREZWZhdWx0KCksIFdlICYmICQuaXMoXCI6Zm9jdXNcIikgJiYgJC50cmlnZ2VyKFwiY2hhbmdlXCIpLCAkLmhhc0NsYXNzKFwic3AtdmFsaWRhdGlvbi1lcnJvclwiKSB8fCAoT2UoITApLCB6ZSgpKTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgWi50ZXh0KGguc2hvd1BhbGV0dGVPbmx5ID8gaC50b2dnbGVQYWxldHRlTW9yZVRleHQgOiBoLnRvZ2dsZVBhbGV0dGVMZXNzVGV4dCksXHJcbiAgICAgICAgICAgICAgICBaLm9uKFwiY2xpY2suc3BlY3RydW1cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpLCBlLnByZXZlbnREZWZhdWx0KCksIChoLnNob3dQYWxldHRlT25seSA9ICFoLnNob3dQYWxldHRlT25seSksIGguc2hvd1BhbGV0dGVPbmx5IHx8IGQgfHwgRS5jc3MoXCJsZWZ0XCIsIFwiLT1cIiArIChOLm91dGVyV2lkdGgoITApICsgNSkpLCBtZSgpO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBVZShcclxuICAgICAgICAgICAgICAgICAgICBCLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlLCB0LCBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChDID0gZSAvIHkpLCAoY2UgPSAhMSksIGEuc2hpZnRLZXkgJiYgKEMgPSBNYXRoLnJvdW5kKDEwICogQykgLyAxMCksIEZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB3ZSxcclxuICAgICAgICAgICAgICAgICAgICBfZVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIFVlKFxyXG4gICAgICAgICAgICAgICAgICAgIEksXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKF8gPSBwYXJzZUZsb2F0KHQgLyB4KSksIChjZSA9ICExKSwgaC5zaG93QWxwaGEgfHwgKEMgPSAxKSwgRmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdlLFxyXG4gICAgICAgICAgICAgICAgICAgIF9lXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgVWUoXHJcbiAgICAgICAgICAgICAgICAgICAgRCxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZSwgdCwgYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFIKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBrICogYixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgciA9IG0gLSBQICogbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IE1hdGguYWJzKGUgLSBvKSA+IE1hdGguYWJzKHQgLSByKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIID0gbiA/IFwieFwiIDogXCJ5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBIID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSAhSCB8fCBcInlcIiA9PT0gSDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKEggJiYgXCJ4XCIgIT09IEgpIHx8IChrID0gcGFyc2VGbG9hdChlIC8gYikpLCBzICYmIChQID0gcGFyc2VGbG9hdCgobSAtIHQpIC8gbSkpLCAoY2UgPSAhMSksIGguc2hvd0FscGhhIHx8IChDID0gMSksIEZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB3ZSxcclxuICAgICAgICAgICAgICAgICAgICBfZVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIG5lID8gKEFlKG5lKSwgSGUoKSwgKGllID0gdGlueWNvbG9yKG5lKS5mb3JtYXQgfHwgaC5wcmVmZXJyZWRGb3JtYXQpLCB4ZShuZSkpIDogKFwiXCIgPT09IG5lICYmIEFlKG5lKSwgSGUoKSksXHJcbiAgICAgICAgICAgICAgICBkICYmIENlKCk7XHJcbiAgICAgICAgICAgIHZhciBvID0gV2UgPyBcIm1vdXNlZG93bi5zcGVjdHJ1bVwiIDogXCJjbGljay5zcGVjdHJ1bSB0b3VjaHN0YXJ0LnNwZWN0cnVtXCI7XHJcbiAgICAgICAgICAgIFgub24obywgXCIuc3AtdGh1bWItZWxcIiwgYSksIFkub24obywgXCIuc3AtdGh1bWItZWw6bnRoLWNoaWxkKDEpXCIsIHsgaWdub3JlOiAhMCB9LCBhKTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHZhciBOZSA9IHtcclxuICAgICAgICAgICAgc2hvdzogQ2UsXHJcbiAgICAgICAgICAgIGhpZGU6IHplLFxyXG4gICAgICAgICAgICB0b2dnbGU6IFBlLFxyXG4gICAgICAgICAgICByZWZsb3c6IFFlLFxyXG4gICAgICAgICAgICBvcHRpb246IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZSA9PT0gcWUgPyBEZS5leHRlbmQoe30sIGgpIDogdCA9PT0gcWUgPyBoW2VdIDogKChoW2VdID0gdCksIFwicHJlZmVycmVkRm9ybWF0XCIgPT09IGUgJiYgKGllID0gaC5wcmVmZXJyZWRGb3JtYXQpLCB2b2lkIG1lKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIChRID0gITEpLCBPLmF0dHIoXCJkaXNhYmxlZFwiLCAhMSksIG9lLnJlbW92ZUNsYXNzKFwic3AtZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpc2FibGU6IEVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAoaC5vZmZzZXQgPSBlKSwgUWUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgQWUoZSksIE9lKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldDogUmUsXHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIE8uc2hvdygpLnJlbW92ZUNsYXNzKFwic3BlY3RydW0gd2l0aC1hZGQtb24gc3AtY29sb3JpemVcIiksIG9lLm9mZihcImNsaWNrLnNwZWN0cnVtIHRvdWNoc3RhcnQuc3BlY3RydW1cIiksIEUucmVtb3ZlKCksIGFlLnJlbW92ZSgpLCBoZSAmJiBoZS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIHBlKS5jc3MoXCJjb2xvclwiLCBkZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IE8uY2xvc2VzdChcIi5zcC1vcmlnaW5hbC1pbnB1dC1jb250YWluZXJcIik7XHJcbiAgICAgICAgICAgICAgICAwIDwgZS5sZW5ndGggJiYgZS5hZnRlcihPKS5yZW1vdmUoKSwgKFZlW05lLmlkXSA9IG51bGwpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb250YWluZXI6IEUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gKE5lLmlkID0gVmUucHVzaChOZSkgLSAxKSwgTmU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhKCkgeyB9XHJcbiAgICBmdW5jdGlvbiBZZShlKSB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIEdlKGUsIHQpIHtcclxuICAgICAgICB2YXIgYSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcclxuICAgICAgICAgICAgbyA9IGEuY2FsbChhcmd1bWVudHMsIDIpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLmFwcGx5KHQsIG8uY29uY2F0KGEuY2FsbChhcmd1bWVudHMpKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIFVlKHMsIGksIHQsIGUpIHtcclxuICAgICAgICAoaSA9IGkgfHwgZnVuY3Rpb24gKCkgeyB9KSwgKHQgPSB0IHx8IGZ1bmN0aW9uICgpIHsgfSksIChlID0gZSB8fCBmdW5jdGlvbiAoKSB7IH0pO1xyXG4gICAgICAgIHZhciBsID0gZG9jdW1lbnQsXHJcbiAgICAgICAgICAgIGMgPSAhMSxcclxuICAgICAgICAgICAgdSA9IHt9LFxyXG4gICAgICAgICAgICBmID0gMCxcclxuICAgICAgICAgICAgaCA9IDAsXHJcbiAgICAgICAgICAgIGQgPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdyxcclxuICAgICAgICAgICAgYSA9IHt9O1xyXG4gICAgICAgIGZ1bmN0aW9uIHAoZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpLCBlLnByZXZlbnREZWZhdWx0ICYmIGUucHJldmVudERlZmF1bHQoKSwgKGUucmV0dXJuVmFsdWUgPSAhMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG8oZSkge1xyXG4gICAgICAgICAgICBpZiAoYykge1xyXG4gICAgICAgICAgICAgICAgaWYgKFdlICYmIGwuZG9jdW1lbnRNb2RlIDwgOSAmJiAhZS5idXR0b24pIHJldHVybiBnKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQudG91Y2hlcyAmJiBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSxcclxuICAgICAgICAgICAgICAgICAgICBhID0gKHQgJiYgdC5wYWdlWCkgfHwgZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICBvID0gKHQgJiYgdC5wYWdlWSkgfHwgZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICByID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYSAtIHUubGVmdCwgaCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvIC0gdS50b3AsIGYpKTtcclxuICAgICAgICAgICAgICAgIGQgJiYgcChlKSwgaS5hcHBseShzLCBbciwgbiwgZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGcoKSB7XHJcbiAgICAgICAgICAgIGMgJiZcclxuICAgICAgICAgICAgICAgIChEZShsKS5vZmYoYSksXHJcbiAgICAgICAgICAgICAgICBEZShsLmJvZHkpLnJlbW92ZUNsYXNzKFwic3AtZHJhZ2dpbmdcIiksXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLmFwcGx5KHMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9LCAwKSksXHJcbiAgICAgICAgICAgICAgICAoYyA9ICExKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGEuc2VsZWN0c3RhcnQgPSBwKSxcclxuICAgICAgICAgICAgKGEuZHJhZ3N0YXJ0ID0gcCksXHJcbiAgICAgICAgICAgIChhW1widG91Y2htb3ZlIG1vdXNlbW92ZVwiXSA9IG8pLFxyXG4gICAgICAgICAgICAoYVtcInRvdWNoZW5kIG1vdXNldXBcIl0gPSBnKSxcclxuICAgICAgICAgICAgRGUocykub24oXCJ0b3VjaHN0YXJ0IG1vdXNlZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgKGUud2hpY2ggPyAzID09IGUud2hpY2ggOiAyID09IGUuYnV0dG9uKSB8fCBjIHx8ICghMSAhPT0gdC5hcHBseShzLCBhcmd1bWVudHMpICYmICgoYyA9ICEwKSwgKGYgPSBEZShzKS5oZWlnaHQoKSksIChoID0gRGUocykud2lkdGgoKSksICh1ID0gRGUocykub2Zmc2V0KCkpLCBEZShsKS5vbihhKSwgRGUobC5ib2R5KS5hZGRDbGFzcyhcInNwLWRyYWdnaW5nXCIpLCBvKGUpLCBwKGUpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gSmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIERlLmZuLnNwZWN0cnVtLmlucHV0VHlwZUNvbG9yU3VwcG9ydCgpO1xyXG4gICAgfVxyXG4gICAgdmFyIHMgPSBcInNwZWN0cnVtLmlkXCI7XHJcbiAgICAoRGUuZm4uc3BlY3RydW0gPSBmdW5jdGlvbiAoYSwgZSkge1xyXG4gICAgICAgIGlmIChcInN0cmluZ1wiICE9IHR5cGVvZiBhKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcGVjdHJ1bShcImRlc3Ryb3lcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IERlLmV4dGVuZCh7fSwgRGUodGhpcykuZGF0YSgpLCBhKTtcclxuICAgICAgICAgICAgICAgIERlKHRoaXMpLmlzKFwiaW5wdXRcIikgPyAoZS5mbGF0IHx8IFwiZmxhdFwiID09IGUudHlwZSA/IChlLnR5cGUgPSBcImZsYXRcIikgOiBcImNvbG9yXCIgPT0gRGUodGhpcykuYXR0cihcInR5cGVcIikgPyAoZS50eXBlID0gXCJjb2xvclwiKSA6IChlLnR5cGUgPSBlLnR5cGUgfHwgXCJjb21wb25lbnRcIikpIDogKGUudHlwZSA9IFwibm9JbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gbih0aGlzLCBlKTtcclxuICAgICAgICAgICAgICAgIERlKHRoaXMpLmRhdGEocywgdC5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBvID0gdGhpcyxcclxuICAgICAgICAgICAgciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gVmVbRGUodGhpcykuZGF0YShzKV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZVthXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXQpIHRocm93IG5ldyBFcnJvcihcIlNwZWN0cnVtOiBubyBzdWNoIG1ldGhvZDogJ1wiICsgYSArIFwiJ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBcImdldFwiID09IGEgPyAobyA9IGUuZ2V0KCkpIDogXCJjb250YWluZXJcIiA9PSBhID8gKG8gPSBlLmNvbnRhaW5lcikgOiBcIm9wdGlvblwiID09IGEgPyAobyA9IGUub3B0aW9uLmFwcGx5KGUsIHIpKSA6IFwiZGVzdHJveVwiID09IGEgPyAoZS5kZXN0cm95KCksIERlKHRoaXMpLnJlbW92ZURhdGEocykpIDogdC5hcHBseShlLCByKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG9cclxuICAgICAgICApO1xyXG4gICAgfSksXHJcbiAgICAgICAgKERlLmZuLnNwZWN0cnVtLmxvYWQgPSAhMCksXHJcbiAgICAgICAgKERlLmZuLnNwZWN0cnVtLmxvYWRPcHRzID0ge30pLFxyXG4gICAgICAgIChEZS5mbi5zcGVjdHJ1bS5kcmFnZ2FibGUgPSBVZSksXHJcbiAgICAgICAgKERlLmZuLnNwZWN0cnVtLmRlZmF1bHRzID0gSWUpLFxyXG4gICAgICAgIChEZS5mbi5zcGVjdHJ1bS5pbnB1dFR5cGVDb2xvclN1cHBvcnQgPSBmdW5jdGlvbiBlKCkge1xyXG4gICAgICAgICAgICBpZiAodm9pZCAwID09PSBlLl9jYWNoZWRSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gRGUoXCI8aW5wdXQgdHlwZT0nY29sb3InLz5cIilbMF07XHJcbiAgICAgICAgICAgICAgICBlLl9jYWNoZWRSZXN1bHQgPSBcImNvbG9yXCIgPT09IHQudHlwZSAmJiBcIlwiICE9PSB0LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlLl9jYWNoZWRSZXN1bHQ7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgKERlLnNwZWN0cnVtID0ge30pLFxyXG4gICAgICAgIChEZS5zcGVjdHJ1bS5sb2NhbGl6YXRpb24gPSB7fSksXHJcbiAgICAgICAgKERlLnNwZWN0cnVtLnBhbGV0dGVzID0ge30pLFxyXG4gICAgICAgIChEZS5mbi5zcGVjdHJ1bS5wcm9jZXNzTmF0aXZlQ29sb3JJbnB1dHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gRGUoXCJpbnB1dFt0eXBlPWNvbG9yXVwiKTtcclxuICAgICAgICAgICAgZS5sZW5ndGggJiYgIUplKCkgJiYgZS5zcGVjdHJ1bSh7IHByZWZlcnJlZEZvcm1hdDogXCJoZXg2XCIgfSk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG4gPSAvXltcXHMsI10rLyxcclxuICAgICAgICAgICAgICAgIHMgPSAvXFxzKyQvLFxyXG4gICAgICAgICAgICAgICAgbyA9IDAsXHJcbiAgICAgICAgICAgICAgICBjID0gTWF0aCxcclxuICAgICAgICAgICAgICAgIGkgPSBjLnJvdW5kLFxyXG4gICAgICAgICAgICAgICAgdSA9IGMubWluLFxyXG4gICAgICAgICAgICAgICAgZiA9IGMubWF4LFxyXG4gICAgICAgICAgICAgICAgZSA9IGMucmFuZG9tLFxyXG4gICAgICAgICAgICAgICAgaCA9IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgodCA9IHQgfHwge30pLCAoZSA9IGUgfHwgXCJcIikgaW5zdGFuY2VvZiBoKSkgcmV0dXJuIGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIGgpKSByZXR1cm4gbmV3IGgoZSwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSAoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9ICExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgciA9ICExO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0cmluZ1wiID09IHR5cGVvZiBlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZSA9IChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUgPSBlLnJlcGxhY2UobiwgXCJcIikucmVwbGFjZShzLCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gITE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENbZV0pIChlID0gQ1tlXSksIChhID0gITApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwidHJhbnNwYXJlbnRcIiA9PSBlKSByZXR1cm4geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAwLCBmb3JtYXQ6IFwibmFtZVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0ID0gUS5yZ2IuZXhlYyhlKSkpIHJldHVybiB7IHI6IHRbMV0sIGc6IHRbMl0sIGI6IHRbM10gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHQgPSBRLnJnYmEuZXhlYyhlKSkpIHJldHVybiB7IHI6IHRbMV0sIGc6IHRbMl0sIGI6IHRbM10sIGE6IHRbNF0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHQgPSBRLmhzbC5leGVjKGUpKSkgcmV0dXJuIHsgaDogdFsxXSwgczogdFsyXSwgbDogdFszXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodCA9IFEuaHNsYS5leGVjKGUpKSkgcmV0dXJuIHsgaDogdFsxXSwgczogdFsyXSwgbDogdFszXSwgYTogdFs0XSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodCA9IFEuaHN2LmV4ZWMoZSkpKSByZXR1cm4geyBoOiB0WzFdLCBzOiB0WzJdLCB2OiB0WzNdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0ID0gUS5oc3ZhLmV4ZWMoZSkpKSByZXR1cm4geyBoOiB0WzFdLCBzOiB0WzJdLCB2OiB0WzNdLCBhOiB0WzRdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0ID0gUS5oZXg4LmV4ZWMoZSkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYTogKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEEoZSkgLyAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSh0WzFdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IEEodFsyXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiBBKHRbM10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogQSh0WzRdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogYSA/IFwibmFtZVwiIDogXCJoZXg4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0ID0gUS5oZXg2LmV4ZWMoZSkpKSByZXR1cm4geyByOiBBKHRbMV0pLCBnOiBBKHRbMl0pLCBiOiBBKHRbM10pLCBmb3JtYXQ6IGEgPyBcIm5hbWVcIiA6IFwiaGV4XCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHQgPSBRLmhleDMuZXhlYyhlKSkpIHJldHVybiB7IHI6IEEodFsxXSArIFwiXCIgKyB0WzFdKSwgZzogQSh0WzJdICsgXCJcIiArIHRbMl0pLCBiOiBBKHRbM10gKyBcIlwiICsgdFszXSksIGZvcm1hdDogYSA/IFwibmFtZVwiIDogXCJoZXhcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJvYmplY3RcIiA9PSB0eXBlb2YgZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUuaGFzT3duUHJvcGVydHkoXCJyXCIpICYmIGUuaGFzT3duUHJvcGVydHkoXCJnXCIpICYmIGUuaGFzT3duUHJvcGVydHkoXCJiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoKHQgPSAoZnVuY3Rpb24gKGUsIHQsIGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcjogMjU1ICogeihlLCAyNTUpLCBnOiAyNTUgKiB6KHQsIDI1NSksIGI6IDI1NSAqIHooYSwgMjU1KSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKGUuciwgZS5nLCBlLmIpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvID0gITApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHIgPSBcIiVcIiA9PT0gU3RyaW5nKGUucikuc3Vic3RyKC0xKSA/IFwicHJnYlwiIDogXCJyZ2JcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBlLmhhc093blByb3BlcnR5KFwiaFwiKSAmJiBlLmhhc093blByb3BlcnR5KFwic1wiKSAmJiBlLmhhc093blByb3BlcnR5KFwidlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKChlLnMgPSBGKGUucykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUudiA9IEYoZS52KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodCA9IChmdW5jdGlvbiAoZSwgdCwgYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlID0gNiAqIHooZSwgMzYwKSksICh0ID0geih0LCAxMDApKSwgKGEgPSB6KGEsIDEwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gYy5mbG9vcihlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgciA9IGUgLSBvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gYSAqICgxIC0gdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBhICogKDEgLSByICogdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBhICogKDEgLSAoMSAtIHIpICogdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBvICUgNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByOiAyNTUgKiBbYSwgcywgbiwgbiwgaSwgYV1bbF0sIGc6IDI1NSAqIFtpLCBhLCBhLCBzLCBuLCBuXVtsXSwgYjogMjU1ICogW24sIG4sIGksIGEsIGEsIHNdW2xdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShlLmgsIGUucywgZS52KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobyA9ICEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyID0gXCJoc3ZcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBlLmhhc093blByb3BlcnR5KFwiaFwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5oYXNPd25Qcm9wZXJ0eShcInNcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuaGFzT3duUHJvcGVydHkoXCJsXCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGUucyA9IEYoZS5zKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZS5sID0gRihlLmwpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0ID0gKGZ1bmN0aW9uIChlLCB0LCBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8sIHIsIG47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcyhlLCB0LCBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhIDwgMCAmJiAoYSArPSAxKSwgMSA8IGEgJiYgLS1hLCBhIDwgMSAvIDYgPyBlICsgNiAqICh0IC0gZSkgKiBhIDogYSA8IDAuNSA/IHQgOiBhIDwgMiAvIDMgPyBlICsgKHQgLSBlKSAqICgyIC8gMyAtIGEpICogNiA6IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKGUgPSB6KGUsIDM2MCkpLCAodCA9IHoodCwgMTAwKSksIChhID0geihhLCAxMDApKSwgMCA9PT0gdCkpIG8gPSByID0gbiA9IGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gYSA8IDAuNSA/IGEgKiAoMSArIHQpIDogYSArIHQgLSBhICogdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSAyICogYSAtIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvID0gcyhsLCBpLCBlICsgMSAvIDMpKSwgKHIgPSBzKGwsIGksIGUpKSwgKG4gPSBzKGwsIGksIGUgLSAxIC8gMykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByOiAyNTUgKiBvLCBnOiAyNTUgKiByLCBiOiAyNTUgKiBuIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShlLmgsIGUucywgZS5sKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobyA9ICEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyID0gXCJoc2xcIikpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5oYXNPd25Qcm9wZXJ0eShcImFcIikgJiYgKGEgPSBlLmEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChhID0gTShhKSksIHsgb2s6IG8sIGZvcm1hdDogZS5mb3JtYXQgfHwgciwgcjogdSgyNTUsIGYodC5yLCAwKSksIGc6IHUoMjU1LCBmKHQuZywgMCkpLCBiOiB1KDI1NSwgZih0LmIsIDApKSwgYTogYSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9vcmlnaW5hbElucHV0ID0gZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9yID0gYS5yKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2cgPSBhLmcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fYiA9IGEuYiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9hID0gYS5hKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3JvdW5kQSA9IGkoMWUzICogdGhpcy5fYSkgLyAxZTMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fZm9ybWF0ID0gdC5mb3JtYXQgfHwgYS5mb3JtYXQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fZ3JhZGllbnRUeXBlID0gdC5ncmFkaWVudFR5cGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yIDwgMSAmJiAodGhpcy5fciA9IGkodGhpcy5fcikpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nIDwgMSAmJiAodGhpcy5fZyA9IGkodGhpcy5fZykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iIDwgMSAmJiAodGhpcy5fYiA9IGkodGhpcy5fYikpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fb2sgPSBhLm9rKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3RjX2lkID0gbysrKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHIoZSwgdCwgYSkge1xyXG4gICAgICAgICAgICAgICAgKGUgPSB6KGUsIDI1NSkpLCAodCA9IHoodCwgMjU1KSksIChhID0geihhLCAyNTUpKTtcclxuICAgICAgICAgICAgICAgIHZhciBvLFxyXG4gICAgICAgICAgICAgICAgICAgIHIsXHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IGYoZSwgdCwgYSksXHJcbiAgICAgICAgICAgICAgICAgICAgcyA9IHUoZSwgdCwgYSksXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IChuICsgcykgLyAyO1xyXG4gICAgICAgICAgICAgICAgaWYgKG4gPT0gcykgbyA9IHIgPSAwO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBuIC0gcztcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKCgociA9IDAuNSA8IGkgPyBsIC8gKDIgLSBuIC0gcykgOiBsIC8gKG4gKyBzKSksIG4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSAodCAtIGEpIC8gbCArICh0IDwgYSA/IDYgOiAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gKGEgLSBlKSAvIGwgKyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSAoZSAtIHQpIC8gbCArIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG8gLz0gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGg6IG8sIHM6IHIsIGw6IGkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsKGUsIHQsIGEpIHtcclxuICAgICAgICAgICAgICAgIChlID0geihlLCAyNTUpKSwgKHQgPSB6KHQsIDI1NSkpLCAoYSA9IHooYSwgMjU1KSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbyxcclxuICAgICAgICAgICAgICAgICAgICByLFxyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBmKGUsIHQsIGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHMgPSB1KGUsIHQsIGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBuLFxyXG4gICAgICAgICAgICAgICAgICAgIGwgPSBuIC0gcztcclxuICAgICAgICAgICAgICAgIGlmICgoKHIgPSAwID09PSBuID8gMCA6IGwgLyBuKSwgbiA9PSBzKSkgbyA9IDA7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9ICh0IC0gYSkgLyBsICsgKHQgPCBhID8gNiA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSAoYSAtIGUpIC8gbCArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBhOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9IChlIC0gdCkgLyBsICsgNDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbyAvPSA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaDogbywgczogciwgdjogaSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHQoZSwgdCwgYSwgbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSBbUihpKGUpLnRvU3RyaW5nKDE2KSksIFIoaSh0KS50b1N0cmluZygxNikpLCBSKGkoYSkudG9TdHJpbmcoMTYpKV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbyAmJiByWzBdLmNoYXJBdCgwKSA9PSByWzBdLmNoYXJBdCgxKSAmJiByWzFdLmNoYXJBdCgwKSA9PSByWzFdLmNoYXJBdCgxKSAmJiByWzJdLmNoYXJBdCgwKSA9PSByWzJdLmNoYXJBdCgxKSA/IHJbMF0uY2hhckF0KDApICsgclsxXS5jaGFyQXQoMCkgKyByWzJdLmNoYXJBdCgwKSA6IHIuam9pbihcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkKGUsIHQsIGEsIG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciByO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtSKCgociA9IG8pLCBNYXRoLnJvdW5kKDI1NSAqIHBhcnNlRmxvYXQocikpLnRvU3RyaW5nKDE2KSkpLCBSKGkoZSkudG9TdHJpbmcoMTYpKSwgUihpKHQpLnRvU3RyaW5nKDE2KSksIFIoaShhKS50b1N0cmluZygxNikpXS5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGEoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgdCA9IDAgPT09IHQgPyAwIDogdCB8fCAxMDtcclxuICAgICAgICAgICAgICAgIHZhciBhID0gaChlKS50b0hzbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhLnMgLT0gdCAvIDEwMCksIChhLnMgPSBqKGEucykpLCBoKGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHAoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgdCA9IDAgPT09IHQgPyAwIDogdCB8fCAxMDtcclxuICAgICAgICAgICAgICAgIHZhciBhID0gaChlKS50b0hzbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhLnMgKz0gdCAvIDEwMCksIChhLnMgPSBqKGEucykpLCBoKGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGcoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGgoZSkuZGVzYXR1cmF0ZSgxMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGIoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgdCA9IDAgPT09IHQgPyAwIDogdCB8fCAxMDtcclxuICAgICAgICAgICAgICAgIHZhciBhID0gaChlKS50b0hzbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhLmwgKz0gdCAvIDEwMCksIChhLmwgPSBqKGEubCkpLCBoKGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG0oZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgdCA9IDAgPT09IHQgPyAwIDogdCB8fCAxMDtcclxuICAgICAgICAgICAgICAgIHZhciBhID0gaChlKS50b1JnYigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhLnIgPSBmKDAsIHUoMjU1LCBhLnIgLSBpKCgtdCAvIDEwMCkgKiAyNTUpKSkpLCAoYS5nID0gZigwLCB1KDI1NSwgYS5nIC0gaSgoLXQgLyAxMDApICogMjU1KSkpKSwgKGEuYiA9IGYoMCwgdSgyNTUsIGEuYiAtIGkoKC10IC8gMTAwKSAqIDI1NSkpKSksIGgoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gdihlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICB0ID0gMCA9PT0gdCA/IDAgOiB0IHx8IDEwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBoKGUpLnRvSHNsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGEubCAtPSB0IC8gMTAwKSwgKGEubCA9IGooYS5sKSksIGgoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24geChlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGgoZSkudG9Ic2woKSxcclxuICAgICAgICAgICAgICAgICAgICBvID0gKGkoYS5oKSArIHQpICUgMzYwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhLmggPSBvIDwgMCA/IDM2MCArIG8gOiBvKSwgaChhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB5KGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gaChlKS50b0hzbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0LmggPSAodC5oICsgMTgwKSAlIDM2MCksIGgodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gVChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGgoZSkudG9Ic2woKSxcclxuICAgICAgICAgICAgICAgICAgICBhID0gdC5oO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtoKGUpLCBoKHsgaDogKGEgKyAxMjApICUgMzYwLCBzOiB0LnMsIGw6IHQubCB9KSwgaCh7IGg6IChhICsgMjQwKSAlIDM2MCwgczogdC5zLCBsOiB0LmwgfSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHcoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBoKGUpLnRvSHNsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgYSA9IHQuaDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbaChlKSwgaCh7IGg6IChhICsgOTApICUgMzYwLCBzOiB0LnMsIGw6IHQubCB9KSwgaCh7IGg6IChhICsgMTgwKSAlIDM2MCwgczogdC5zLCBsOiB0LmwgfSksIGgoeyBoOiAoYSArIDI3MCkgJSAzNjAsIHM6IHQucywgbDogdC5sIH0pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBfKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gaChlKS50b0hzbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGEgPSB0Lmg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2goZSksIGgoeyBoOiAoYSArIDcyKSAlIDM2MCwgczogdC5zLCBsOiB0LmwgfSksIGgoeyBoOiAoYSArIDIxNikgJSAzNjAsIHM6IHQucywgbDogdC5sIH0pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBrKGUsIHQsIGEpIHtcclxuICAgICAgICAgICAgICAgICh0ID0gdCB8fCA2KSwgKGEgPSBhIHx8IDMwKTtcclxuICAgICAgICAgICAgICAgIHZhciBvID0gaChlKS50b0hzbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHIgPSAzNjAgLyBhLFxyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBbaChlKV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKG8uaCA9IChvLmggLSAoKHIgKiB0KSA+PiAxKSArIDcyMCkgJSAzNjA7IC0tdDspIChvLmggPSAoby5oICsgcikgJSAzNjApLCBuLnB1c2goaChvKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBQKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgIHQgPSB0IHx8IDY7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhID0gaChlKS50b0hzdigpLCBvID0gYS5oLCByID0gYS5zLCBuID0gYS52LCBzID0gW10sIGkgPSAxIC8gdDsgdC0tOykgcy5wdXNoKGgoeyBoOiBvLCBzOiByLCB2OiBuIH0pKSwgKG4gPSAobiArIGkpICUgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAoaC5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgICAgICAgICBpc0Rhcms6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlnaHRuZXNzKCkgPCAxMjg7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaXNMaWdodDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc0RhcmsoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29rO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGdldE9yaWdpbmFsSW5wdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luYWxJbnB1dDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBnZXRGb3JtYXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGdldEFscGhhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2E7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ2V0QnJpZ2h0bmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcy50b1JnYigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMjk5ICogZS5yICsgNTg3ICogZS5nICsgMTE0ICogZS5iKSAvIDFlMztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXRBbHBoYTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2EgPSBNKGUpKSwgKHRoaXMuX3JvdW5kQSA9IGkoMWUzICogdGhpcy5fYSkgLyAxZTMpLCB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRvSHN2OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBsKHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGg6IDM2MCAqIGUuaCwgczogZS5zLCB2OiBlLnYsIGE6IHRoaXMuX2EgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b0hzdlN0cmluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gbCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IGkoMzYwICogZS5oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYSA9IGkoMTAwICogZS5zKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbyA9IGkoMTAwICogZS52KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMSA9PSB0aGlzLl9hID8gXCJoc3YoXCIgKyB0ICsgXCIsIFwiICsgYSArIFwiJSwgXCIgKyBvICsgXCIlKVwiIDogXCJoc3ZhKFwiICsgdCArIFwiLCBcIiArIGEgKyBcIiUsIFwiICsgbyArIFwiJSwgXCIgKyB0aGlzLl9yb3VuZEEgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b0hzbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gcih0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBoOiAzNjAgKiBlLmgsIHM6IGUucywgbDogZS5sLCBhOiB0aGlzLl9hIH07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdG9Ic2xTdHJpbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHIodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBpKDM2MCAqIGUuaCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSBpKDEwMCAqIGUucyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBpKDEwMCAqIGUubCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgPT0gdGhpcy5fYSA/IFwiaHNsKFwiICsgdCArIFwiLCBcIiArIGEgKyBcIiUsIFwiICsgbyArIFwiJSlcIiA6IFwiaHNsYShcIiArIHQgKyBcIiwgXCIgKyBhICsgXCIlLCBcIiArIG8gKyBcIiUsIFwiICsgdGhpcy5fcm91bmRBICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdG9IZXg6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdG9IZXhTdHJpbmc6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiI1wiICsgdGhpcy50b0hleChlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b0hleDg6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iLCB0aGlzLl9hKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b0hleDhTdHJpbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIjXCIgKyB0aGlzLnRvSGV4OCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRvUmdiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcjogaSh0aGlzLl9yKSwgZzogaSh0aGlzLl9nKSwgYjogaSh0aGlzLl9iKSwgYTogdGhpcy5fYSB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRvUmdiU3RyaW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgPT0gdGhpcy5fYSA/IFwicmdiKFwiICsgaSh0aGlzLl9yKSArIFwiLCBcIiArIGkodGhpcy5fZykgKyBcIiwgXCIgKyBpKHRoaXMuX2IpICsgXCIpXCIgOiBcInJnYmEoXCIgKyBpKHRoaXMuX3IpICsgXCIsIFwiICsgaSh0aGlzLl9nKSArIFwiLCBcIiArIGkodGhpcy5fYikgKyBcIiwgXCIgKyB0aGlzLl9yb3VuZEEgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b1BlcmNlbnRhZ2VSZ2I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByOiBpKDEwMCAqIHoodGhpcy5fciwgMjU1KSkgKyBcIiVcIiwgZzogaSgxMDAgKiB6KHRoaXMuX2csIDI1NSkpICsgXCIlXCIsIGI6IGkoMTAwICogeih0aGlzLl9iLCAyNTUpKSArIFwiJVwiLCBhOiB0aGlzLl9hIH07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdG9QZXJjZW50YWdlUmdiU3RyaW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgPT0gdGhpcy5fYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwicmdiKFwiICsgaSgxMDAgKiB6KHRoaXMuX3IsIDI1NSkpICsgXCIlLCBcIiArIGkoMTAwICogeih0aGlzLl9nLCAyNTUpKSArIFwiJSwgXCIgKyBpKDEwMCAqIHoodGhpcy5fYiwgMjU1KSkgKyBcIiUpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcInJnYmEoXCIgKyBpKDEwMCAqIHoodGhpcy5fciwgMjU1KSkgKyBcIiUsIFwiICsgaSgxMDAgKiB6KHRoaXMuX2csIDI1NSkpICsgXCIlLCBcIiArIGkoMTAwICogeih0aGlzLl9iLCAyNTUpKSArIFwiJSwgXCIgKyB0aGlzLl9yb3VuZEEgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0b05hbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMCA9PT0gdGhpcy5fYSA/IFwidHJhbnNwYXJlbnRcIiA6ICEodGhpcy5fYSA8IDEpICYmIChTW3QodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgITApXSB8fCAhMSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdG9GaWx0ZXI6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBcIiNcIiArIGQodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgdGhpcy5fYSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvID0gdGhpcy5fZ3JhZGllbnRUeXBlID8gXCJHcmFkaWVudFR5cGUgPSAxLCBcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZSAmJiAoYSA9IGgoZSkudG9IZXg4U3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChcIiArIG8gKyBcInN0YXJ0Q29sb3JzdHI9XCIgKyB0ICsgXCIsZW5kQ29sb3JzdHI9XCIgKyBhICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAhIWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZSA9IGUgfHwgdGhpcy5fZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gITEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSB0aGlzLl9hIDwgMSAmJiAwIDw9IHRoaXMuX2E7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQgfHwgIW8gfHwgKFwiaGV4XCIgIT09IGUgJiYgXCJoZXg2XCIgIT09IGUgJiYgXCJoZXgzXCIgIT09IGUgJiYgXCJuYW1lXCIgIT09IGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKFwicmdiXCIgPT09IGUgJiYgKGEgPSB0aGlzLnRvUmdiU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJnYlwiID09PSBlICYmIChhID0gdGhpcy50b1BlcmNlbnRhZ2VSZ2JTdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFwiaGV4XCIgIT09IGUgJiYgXCJoZXg2XCIgIT09IGUpIHx8IChhID0gdGhpcy50b0hleFN0cmluZygpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImhleDNcIiA9PT0gZSAmJiAoYSA9IHRoaXMudG9IZXhTdHJpbmcoITApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImhleDhcIiA9PT0gZSAmJiAoYSA9IHRoaXMudG9IZXg4U3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiID09PSBlICYmIChhID0gdGhpcy50b05hbWUoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoc2xcIiA9PT0gZSAmJiAoYSA9IHRoaXMudG9Ic2xTdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoc3ZcIiA9PT0gZSAmJiAoYSA9IHRoaXMudG9Ic3ZTdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYSB8fCB0aGlzLnRvSGV4U3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJuYW1lXCIgPT09IGUgJiYgMCA9PT0gdGhpcy5fYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMudG9OYW1lKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnRvUmdiU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgX2FwcGx5TW9kaWZpY2F0aW9uOiBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gZS5hcHBseShudWxsLCBbdGhpc10uY29uY2F0KFtdLnNsaWNlLmNhbGwodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX3IgPSBhLl9yKSwgKHRoaXMuX2cgPSBhLl9nKSwgKHRoaXMuX2IgPSBhLl9iKSwgdGhpcy5zZXRBbHBoYShhLl9hKSwgdGhpcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsaWdodGVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKGIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnJpZ2h0ZW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24obSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXJrZW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24odiwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkZXNhdHVyYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKGEsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2F0dXJhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24ocCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBncmV5c2NhbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oZywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzcGluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKHgsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgX2FwcGx5Q29tYmluYXRpb246IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChbXS5zbGljZS5jYWxsKHQpKSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYW5hbG9nb3VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oaywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGVtZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oeSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtb25vY2hyb21hdGljOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oUCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzcGxpdGNvbXBsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbihfLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRyaWFkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oVCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZXRyYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbih3LCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAoaC5mcm9tUmF0aW8gPSBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcIm9iamVjdFwiID09IHR5cGVvZiBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG8gaW4gZSkgZS5oYXNPd25Qcm9wZXJ0eShvKSAmJiAoYVtvXSA9IFwiYVwiID09PSBvID8gZVtvXSA6IEYoZVtvXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gYTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGgoZSwgdCk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIChoLmVxdWFscyA9IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEoIWUgfHwgIXQpICYmIGgoZSkudG9SZ2JTdHJpbmcoKSA9PSBoKHQpLnRvUmdiU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIChoLnJhbmRvbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaC5mcm9tUmF0aW8oeyByOiBlKCksIGc6IGUoKSwgYjogZSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAoaC5taXggPSBmdW5jdGlvbiAoZSwgdCwgYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGEgPSAwID09PSBhID8gMCA6IGEgfHwgNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIgPSBoKGUpLnRvUmdiKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBoKHQpLnRvUmdiKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBhIC8gMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMiAqIHMgLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsID0gbi5hIC0gci5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gMSAtIChvID0gKChvID0gaSAqIGwgPT0gLTEgPyBpIDogKGkgKyBsKSAvICgxICsgaSAqIGwpKSArIDEpIC8gMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHUgPSB7IHI6IG4uciAqIG8gKyByLnIgKiBjLCBnOiBuLmcgKiBvICsgci5nICogYywgYjogbi5iICogbyArIHIuYiAqIGMsIGE6IG4uYSAqIHMgKyByLmEgKiAoMSAtIHMpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGgodSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIChoLnJlYWRhYmlsaXR5ID0gZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IGgoZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBoKHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByID0gYS50b1JnYigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gby50b1JnYigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gYS5nZXRCcmlnaHRuZXNzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBvLmdldEJyaWdodG5lc3MoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IE1hdGgubWF4KHIuciwgbi5yKSAtIE1hdGgubWluKHIuciwgbi5yKSArIE1hdGgubWF4KHIuZywgbi5nKSAtIE1hdGgubWluKHIuZywgbi5nKSArIE1hdGgubWF4KHIuYiwgbi5iKSAtIE1hdGgubWluKHIuYiwgbi5iKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBicmlnaHRuZXNzOiBNYXRoLmFicyhzIC0gaSksIGNvbG9yOiBsIH07XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIChoLmlzUmVhZGFibGUgPSBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gaC5yZWFkYWJpbGl0eShlLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTI1IDwgYS5icmlnaHRuZXNzICYmIDUwMCA8IGEuY29sb3I7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIChoLm1vc3RSZWFkYWJsZSA9IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSA9IG51bGwsIG8gPSAwLCByID0gITEsIG4gPSAwOyBuIDwgdC5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IGgucmVhZGFiaWxpdHkoZSwgdFtuXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMTI1IDwgcy5icmlnaHRuZXNzICYmIDUwMCA8IHMuY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gKHMuYnJpZ2h0bmVzcyAvIDEyNSkgKiAzICsgcy5jb2xvciAvIDUwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKChpICYmICFyKSB8fCAoaSAmJiByICYmIG8gPCBsKSB8fCAoIWkgJiYgIXIgJiYgbyA8IGwpKSAmJiAoKHIgPSBpKSwgKG8gPSBsKSwgKGEgPSBoKHRbbl0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBDID0gKGgubmFtZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBhbGljZWJsdWU6IFwiZjBmOGZmXCIsXHJcbiAgICAgICAgICAgICAgICBhbnRpcXVld2hpdGU6IFwiZmFlYmQ3XCIsXHJcbiAgICAgICAgICAgICAgICBhcXVhOiBcIjBmZlwiLFxyXG4gICAgICAgICAgICAgICAgYXF1YW1hcmluZTogXCI3ZmZmZDRcIixcclxuICAgICAgICAgICAgICAgIGF6dXJlOiBcImYwZmZmZlwiLFxyXG4gICAgICAgICAgICAgICAgYmVpZ2U6IFwiZjVmNWRjXCIsXHJcbiAgICAgICAgICAgICAgICBiaXNxdWU6IFwiZmZlNGM0XCIsXHJcbiAgICAgICAgICAgICAgICBibGFjazogXCIwMDBcIixcclxuICAgICAgICAgICAgICAgIGJsYW5jaGVkYWxtb25kOiBcImZmZWJjZFwiLFxyXG4gICAgICAgICAgICAgICAgYmx1ZTogXCIwMGZcIixcclxuICAgICAgICAgICAgICAgIGJsdWV2aW9sZXQ6IFwiOGEyYmUyXCIsXHJcbiAgICAgICAgICAgICAgICBicm93bjogXCJhNTJhMmFcIixcclxuICAgICAgICAgICAgICAgIGJ1cmx5d29vZDogXCJkZWI4ODdcIixcclxuICAgICAgICAgICAgICAgIGJ1cm50c2llbm5hOiBcImVhN2U1ZFwiLFxyXG4gICAgICAgICAgICAgICAgY2FkZXRibHVlOiBcIjVmOWVhMFwiLFxyXG4gICAgICAgICAgICAgICAgY2hhcnRyZXVzZTogXCI3ZmZmMDBcIixcclxuICAgICAgICAgICAgICAgIGNob2NvbGF0ZTogXCJkMjY5MWVcIixcclxuICAgICAgICAgICAgICAgIGNvcmFsOiBcImZmN2Y1MFwiLFxyXG4gICAgICAgICAgICAgICAgY29ybmZsb3dlcmJsdWU6IFwiNjQ5NWVkXCIsXHJcbiAgICAgICAgICAgICAgICBjb3Juc2lsazogXCJmZmY4ZGNcIixcclxuICAgICAgICAgICAgICAgIGNyaW1zb246IFwiZGMxNDNjXCIsXHJcbiAgICAgICAgICAgICAgICBjeWFuOiBcIjBmZlwiLFxyXG4gICAgICAgICAgICAgICAgZGFya2JsdWU6IFwiMDAwMDhiXCIsXHJcbiAgICAgICAgICAgICAgICBkYXJrY3lhbjogXCIwMDhiOGJcIixcclxuICAgICAgICAgICAgICAgIGRhcmtnb2xkZW5yb2Q6IFwiYjg4NjBiXCIsXHJcbiAgICAgICAgICAgICAgICBkYXJrZ3JheTogXCJhOWE5YTlcIixcclxuICAgICAgICAgICAgICAgIGRhcmtncmVlbjogXCIwMDY0MDBcIixcclxuICAgICAgICAgICAgICAgIGRhcmtncmV5OiBcImE5YTlhOVwiLFxyXG4gICAgICAgICAgICAgICAgZGFya2toYWtpOiBcImJkYjc2YlwiLFxyXG4gICAgICAgICAgICAgICAgZGFya21hZ2VudGE6IFwiOGIwMDhiXCIsXHJcbiAgICAgICAgICAgICAgICBkYXJrb2xpdmVncmVlbjogXCI1NTZiMmZcIixcclxuICAgICAgICAgICAgICAgIGRhcmtvcmFuZ2U6IFwiZmY4YzAwXCIsXHJcbiAgICAgICAgICAgICAgICBkYXJrb3JjaGlkOiBcIjk5MzJjY1wiLFxyXG4gICAgICAgICAgICAgICAgZGFya3JlZDogXCI4YjAwMDBcIixcclxuICAgICAgICAgICAgICAgIGRhcmtzYWxtb246IFwiZTk5NjdhXCIsXHJcbiAgICAgICAgICAgICAgICBkYXJrc2VhZ3JlZW46IFwiOGZiYzhmXCIsXHJcbiAgICAgICAgICAgICAgICBkYXJrc2xhdGVibHVlOiBcIjQ4M2Q4YlwiLFxyXG4gICAgICAgICAgICAgICAgZGFya3NsYXRlZ3JheTogXCIyZjRmNGZcIixcclxuICAgICAgICAgICAgICAgIGRhcmtzbGF0ZWdyZXk6IFwiMmY0ZjRmXCIsXHJcbiAgICAgICAgICAgICAgICBkYXJrdHVycXVvaXNlOiBcIjAwY2VkMVwiLFxyXG4gICAgICAgICAgICAgICAgZGFya3Zpb2xldDogXCI5NDAwZDNcIixcclxuICAgICAgICAgICAgICAgIGRlZXBwaW5rOiBcImZmMTQ5M1wiLFxyXG4gICAgICAgICAgICAgICAgZGVlcHNreWJsdWU6IFwiMDBiZmZmXCIsXHJcbiAgICAgICAgICAgICAgICBkaW1ncmF5OiBcIjY5Njk2OVwiLFxyXG4gICAgICAgICAgICAgICAgZGltZ3JleTogXCI2OTY5NjlcIixcclxuICAgICAgICAgICAgICAgIGRvZGdlcmJsdWU6IFwiMWU5MGZmXCIsXHJcbiAgICAgICAgICAgICAgICBmaXJlYnJpY2s6IFwiYjIyMjIyXCIsXHJcbiAgICAgICAgICAgICAgICBmbG9yYWx3aGl0ZTogXCJmZmZhZjBcIixcclxuICAgICAgICAgICAgICAgIGZvcmVzdGdyZWVuOiBcIjIyOGIyMlwiLFxyXG4gICAgICAgICAgICAgICAgZnVjaHNpYTogXCJmMGZcIixcclxuICAgICAgICAgICAgICAgIGdhaW5zYm9ybzogXCJkY2RjZGNcIixcclxuICAgICAgICAgICAgICAgIGdob3N0d2hpdGU6IFwiZjhmOGZmXCIsXHJcbiAgICAgICAgICAgICAgICBnb2xkOiBcImZmZDcwMFwiLFxyXG4gICAgICAgICAgICAgICAgZ29sZGVucm9kOiBcImRhYTUyMFwiLFxyXG4gICAgICAgICAgICAgICAgZ3JheTogXCI4MDgwODBcIixcclxuICAgICAgICAgICAgICAgIGdyZWVuOiBcIjAwODAwMFwiLFxyXG4gICAgICAgICAgICAgICAgZ3JlZW55ZWxsb3c6IFwiYWRmZjJmXCIsXHJcbiAgICAgICAgICAgICAgICBncmV5OiBcIjgwODA4MFwiLFxyXG4gICAgICAgICAgICAgICAgaG9uZXlkZXc6IFwiZjBmZmYwXCIsXHJcbiAgICAgICAgICAgICAgICBob3RwaW5rOiBcImZmNjliNFwiLFxyXG4gICAgICAgICAgICAgICAgaW5kaWFucmVkOiBcImNkNWM1Y1wiLFxyXG4gICAgICAgICAgICAgICAgaW5kaWdvOiBcIjRiMDA4MlwiLFxyXG4gICAgICAgICAgICAgICAgaXZvcnk6IFwiZmZmZmYwXCIsXHJcbiAgICAgICAgICAgICAgICBraGFraTogXCJmMGU2OGNcIixcclxuICAgICAgICAgICAgICAgIGxhdmVuZGVyOiBcImU2ZTZmYVwiLFxyXG4gICAgICAgICAgICAgICAgbGF2ZW5kZXJibHVzaDogXCJmZmYwZjVcIixcclxuICAgICAgICAgICAgICAgIGxhd25ncmVlbjogXCI3Y2ZjMDBcIixcclxuICAgICAgICAgICAgICAgIGxlbW9uY2hpZmZvbjogXCJmZmZhY2RcIixcclxuICAgICAgICAgICAgICAgIGxpZ2h0Ymx1ZTogXCJhZGQ4ZTZcIixcclxuICAgICAgICAgICAgICAgIGxpZ2h0Y29yYWw6IFwiZjA4MDgwXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodGN5YW46IFwiZTBmZmZmXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogXCJmYWZhZDJcIixcclxuICAgICAgICAgICAgICAgIGxpZ2h0Z3JheTogXCJkM2QzZDNcIixcclxuICAgICAgICAgICAgICAgIGxpZ2h0Z3JlZW46IFwiOTBlZTkwXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodGdyZXk6IFwiZDNkM2QzXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodHBpbms6IFwiZmZiNmMxXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodHNhbG1vbjogXCJmZmEwN2FcIixcclxuICAgICAgICAgICAgICAgIGxpZ2h0c2VhZ3JlZW46IFwiMjBiMmFhXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodHNreWJsdWU6IFwiODdjZWZhXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodHNsYXRlZ3JheTogXCI3ODlcIixcclxuICAgICAgICAgICAgICAgIGxpZ2h0c2xhdGVncmV5OiBcIjc4OVwiLFxyXG4gICAgICAgICAgICAgICAgbGlnaHRzdGVlbGJsdWU6IFwiYjBjNGRlXCIsXHJcbiAgICAgICAgICAgICAgICBsaWdodHllbGxvdzogXCJmZmZmZTBcIixcclxuICAgICAgICAgICAgICAgIGxpbWU6IFwiMGYwXCIsXHJcbiAgICAgICAgICAgICAgICBsaW1lZ3JlZW46IFwiMzJjZDMyXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5lbjogXCJmYWYwZTZcIixcclxuICAgICAgICAgICAgICAgIG1hZ2VudGE6IFwiZjBmXCIsXHJcbiAgICAgICAgICAgICAgICBtYXJvb246IFwiODAwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBtZWRpdW1hcXVhbWFyaW5lOiBcIjY2Y2RhYVwiLFxyXG4gICAgICAgICAgICAgICAgbWVkaXVtYmx1ZTogXCIwMDAwY2RcIixcclxuICAgICAgICAgICAgICAgIG1lZGl1bW9yY2hpZDogXCJiYTU1ZDNcIixcclxuICAgICAgICAgICAgICAgIG1lZGl1bXB1cnBsZTogXCI5MzcwZGJcIixcclxuICAgICAgICAgICAgICAgIG1lZGl1bXNlYWdyZWVuOiBcIjNjYjM3MVwiLFxyXG4gICAgICAgICAgICAgICAgbWVkaXVtc2xhdGVibHVlOiBcIjdiNjhlZVwiLFxyXG4gICAgICAgICAgICAgICAgbWVkaXVtc3ByaW5nZ3JlZW46IFwiMDBmYTlhXCIsXHJcbiAgICAgICAgICAgICAgICBtZWRpdW10dXJxdW9pc2U6IFwiNDhkMWNjXCIsXHJcbiAgICAgICAgICAgICAgICBtZWRpdW12aW9sZXRyZWQ6IFwiYzcxNTg1XCIsXHJcbiAgICAgICAgICAgICAgICBtaWRuaWdodGJsdWU6IFwiMTkxOTcwXCIsXHJcbiAgICAgICAgICAgICAgICBtaW50Y3JlYW06IFwiZjVmZmZhXCIsXHJcbiAgICAgICAgICAgICAgICBtaXN0eXJvc2U6IFwiZmZlNGUxXCIsXHJcbiAgICAgICAgICAgICAgICBtb2NjYXNpbjogXCJmZmU0YjVcIixcclxuICAgICAgICAgICAgICAgIG5hdmFqb3doaXRlOiBcImZmZGVhZFwiLFxyXG4gICAgICAgICAgICAgICAgbmF2eTogXCIwMDAwODBcIixcclxuICAgICAgICAgICAgICAgIG9sZGxhY2U6IFwiZmRmNWU2XCIsXHJcbiAgICAgICAgICAgICAgICBvbGl2ZTogXCI4MDgwMDBcIixcclxuICAgICAgICAgICAgICAgIG9saXZlZHJhYjogXCI2YjhlMjNcIixcclxuICAgICAgICAgICAgICAgIG9yYW5nZTogXCJmZmE1MDBcIixcclxuICAgICAgICAgICAgICAgIG9yYW5nZXJlZDogXCJmZjQ1MDBcIixcclxuICAgICAgICAgICAgICAgIG9yY2hpZDogXCJkYTcwZDZcIixcclxuICAgICAgICAgICAgICAgIHBhbGVnb2xkZW5yb2Q6IFwiZWVlOGFhXCIsXHJcbiAgICAgICAgICAgICAgICBwYWxlZ3JlZW46IFwiOThmYjk4XCIsXHJcbiAgICAgICAgICAgICAgICBwYWxldHVycXVvaXNlOiBcImFmZWVlZVwiLFxyXG4gICAgICAgICAgICAgICAgcGFsZXZpb2xldHJlZDogXCJkYjcwOTNcIixcclxuICAgICAgICAgICAgICAgIHBhcGF5YXdoaXA6IFwiZmZlZmQ1XCIsXHJcbiAgICAgICAgICAgICAgICBwZWFjaHB1ZmY6IFwiZmZkYWI5XCIsXHJcbiAgICAgICAgICAgICAgICBwZXJ1OiBcImNkODUzZlwiLFxyXG4gICAgICAgICAgICAgICAgcGluazogXCJmZmMwY2JcIixcclxuICAgICAgICAgICAgICAgIHBsdW06IFwiZGRhMGRkXCIsXHJcbiAgICAgICAgICAgICAgICBwb3dkZXJibHVlOiBcImIwZTBlNlwiLFxyXG4gICAgICAgICAgICAgICAgcHVycGxlOiBcIjgwMDA4MFwiLFxyXG4gICAgICAgICAgICAgICAgcmViZWNjYXB1cnBsZTogXCI2NjMzOTlcIixcclxuICAgICAgICAgICAgICAgIHJlZDogXCJmMDBcIixcclxuICAgICAgICAgICAgICAgIHJvc3licm93bjogXCJiYzhmOGZcIixcclxuICAgICAgICAgICAgICAgIHJveWFsYmx1ZTogXCI0MTY5ZTFcIixcclxuICAgICAgICAgICAgICAgIHNhZGRsZWJyb3duOiBcIjhiNDUxM1wiLFxyXG4gICAgICAgICAgICAgICAgc2FsbW9uOiBcImZhODA3MlwiLFxyXG4gICAgICAgICAgICAgICAgc2FuZHlicm93bjogXCJmNGE0NjBcIixcclxuICAgICAgICAgICAgICAgIHNlYWdyZWVuOiBcIjJlOGI1N1wiLFxyXG4gICAgICAgICAgICAgICAgc2Vhc2hlbGw6IFwiZmZmNWVlXCIsXHJcbiAgICAgICAgICAgICAgICBzaWVubmE6IFwiYTA1MjJkXCIsXHJcbiAgICAgICAgICAgICAgICBzaWx2ZXI6IFwiYzBjMGMwXCIsXHJcbiAgICAgICAgICAgICAgICBza3libHVlOiBcIjg3Y2VlYlwiLFxyXG4gICAgICAgICAgICAgICAgc2xhdGVibHVlOiBcIjZhNWFjZFwiLFxyXG4gICAgICAgICAgICAgICAgc2xhdGVncmF5OiBcIjcwODA5MFwiLFxyXG4gICAgICAgICAgICAgICAgc2xhdGVncmV5OiBcIjcwODA5MFwiLFxyXG4gICAgICAgICAgICAgICAgc25vdzogXCJmZmZhZmFcIixcclxuICAgICAgICAgICAgICAgIHNwcmluZ2dyZWVuOiBcIjAwZmY3ZlwiLFxyXG4gICAgICAgICAgICAgICAgc3RlZWxibHVlOiBcIjQ2ODJiNFwiLFxyXG4gICAgICAgICAgICAgICAgdGFuOiBcImQyYjQ4Y1wiLFxyXG4gICAgICAgICAgICAgICAgdGVhbDogXCIwMDgwODBcIixcclxuICAgICAgICAgICAgICAgIHRoaXN0bGU6IFwiZDhiZmQ4XCIsXHJcbiAgICAgICAgICAgICAgICB0b21hdG86IFwiZmY2MzQ3XCIsXHJcbiAgICAgICAgICAgICAgICB0dXJxdW9pc2U6IFwiNDBlMGQwXCIsXHJcbiAgICAgICAgICAgICAgICB2aW9sZXQ6IFwiZWU4MmVlXCIsXHJcbiAgICAgICAgICAgICAgICB3aGVhdDogXCJmNWRlYjNcIixcclxuICAgICAgICAgICAgICAgIHdoaXRlOiBcImZmZlwiLFxyXG4gICAgICAgICAgICAgICAgd2hpdGVzbW9rZTogXCJmNWY1ZjVcIixcclxuICAgICAgICAgICAgICAgIHllbGxvdzogXCJmZjBcIixcclxuICAgICAgICAgICAgICAgIHllbGxvd2dyZWVuOiBcIjlhY2QzMlwiLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIFMgPSAoaC5oZXhOYW1lcyA9IChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSBpbiBlKSBlLmhhc093blByb3BlcnR5KGEpICYmICh0W2VbYV1dID0gYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgICAgICB9KShDKSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIE0oZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChlID0gcGFyc2VGbG9hdChlKSksIChpc05hTihlKSB8fCBlIDwgMCB8fCAxIDwgZSkgJiYgKGUgPSAxKSwgZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB6KGUsIHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhO1xyXG4gICAgICAgICAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2YgKGEgPSBlKSAmJiAtMSAhPSBhLmluZGV4T2YoXCIuXCIpICYmIDEgPT09IHBhcnNlRmxvYXQoYSkgJiYgKGUgPSBcIjEwMCVcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbyxcclxuICAgICAgICAgICAgICAgICAgICByID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgKG8gPSBlKSAmJiAtMSAhPSBvLmluZGV4T2YoXCIlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChlID0gdSh0LCBmKDAsIHBhcnNlRmxvYXQoZSkpKSksIHIgJiYgKGUgPSBwYXJzZUludChlICogdCwgMTApIC8gMTAwKSwgYy5hYnMoZSAtIHQpIDwgMWUtNiA/IDEgOiAoZSAlIHQpIC8gcGFyc2VGbG9hdCh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBqKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1KDEsIGYoMCwgZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIEEoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGUsIDE2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBSKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxID09IGUubGVuZ3RoID8gXCIwXCIgKyBlIDogXCJcIiArIGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gRihlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZSA8PSAxICYmIChlID0gMTAwICogZSArIFwiJVwiKSwgZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgSCxcclxuICAgICAgICAgICAgICAgIEwsXHJcbiAgICAgICAgICAgICAgICBPLFxyXG4gICAgICAgICAgICAgICAgUSA9XHJcbiAgICAgICAgICAgICAgICAgICAgKChMID0gXCJbXFxcXHN8XFxcXChdKyhcIiArIChIID0gXCIoPzpbLVxcXFwrXT9cXFxcZCpcXFxcLlxcXFxkKyU/KXwoPzpbLVxcXFwrXT9cXFxcZCslPylcIikgKyBcIilbLHxcXFxcc10rKFwiICsgSCArIFwiKVssfFxcXFxzXSsoXCIgKyBIICsgXCIpXFxcXHMqXFxcXCk/XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIChPID0gXCJbXFxcXHN8XFxcXChdKyhcIiArIEggKyBcIilbLHxcXFxcc10rKFwiICsgSCArIFwiKVssfFxcXFxzXSsoXCIgKyBIICsgXCIpWyx8XFxcXHNdKyhcIiArIEggKyBcIilcXFxccypcXFxcKT9cIiksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZ2I6IG5ldyBSZWdFeHAoXCJyZ2JcIiArIEwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZ2JhOiBuZXcgUmVnRXhwKFwicmdiYVwiICsgTyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhzbDogbmV3IFJlZ0V4cChcImhzbFwiICsgTCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhzbGE6IG5ldyBSZWdFeHAoXCJoc2xhXCIgKyBPKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHN2OiBuZXcgUmVnRXhwKFwiaHN2XCIgKyBMKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHN2YTogbmV3IFJlZ0V4cChcImhzdmFcIiArIE8pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXgzOiAvXihbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXg2OiAvXihbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KSQvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXg4OiAvXihbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgd2luZG93LnRpbnljb2xvciA9IGg7XHJcbiAgICAgICAgfSkoKSxcclxuICAgICAgICBEZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIERlLmZuLnNwZWN0cnVtLmxvYWQgJiYgRGUuZm4uc3BlY3RydW0ucHJvY2Vzc05hdGl2ZUNvbG9ySW5wdXRzKCk7XHJcbiAgICAgICAgfSk7XHJcbn0pOyJdLCJmaWxlIjoiY29sb3JwaWNrZXIvY29sb3JwaWNrZXIuanMifQ==
