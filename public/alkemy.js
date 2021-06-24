(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Popper = t());
})(this, function () {
  "use strict";
  function e(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = e.ownerDocument.defaultView,
      n = o.getComputedStyle(e, null);
    return t ? n[t] : n;
  }
  function o(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function n(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
  }
  function i(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }
  function r(e) {
    return 11 === e ? re : 10 === e ? pe : re || pe;
  }
  function p(e) {
    if (!e) return document.documentElement;
    for (
      var o = r(10) ? document.body : null, n = e.offsetParent || null;
      n === o && e.nextElementSibling;

    )
      n = (e = e.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
        "static" === t(n, "position")
        ? p(n)
        : n
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement;
  }
  function s(e) {
    var t = e.nodeName;
    return "BODY" !== t && ("HTML" === t || p(e.firstElementChild) === e);
  }
  function d(e) {
    return null === e.parentNode ? e : d(e.parentNode);
  }
  function a(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      n = o ? e : t,
      i = o ? t : e,
      r = document.createRange();
    r.setStart(n, 0), r.setEnd(i, 0);
    var l = r.commonAncestorContainer;
    if ((e !== l && t !== l) || n.contains(i)) return s(l) ? l : p(l);
    var f = d(e);
    return f.host ? a(f.host, t) : a(e, d(t).host);
  }
  function l(e) {
    var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      o = "top" === t ? "scrollTop" : "scrollLeft",
      n = e.nodeName;
    if ("BODY" === n || "HTML" === n) {
      var i = e.ownerDocument.documentElement,
        r = e.ownerDocument.scrollingElement || i;
      return r[o];
    }
    return e[o];
  }
  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      n = l(t, "top"),
      i = l(t, "left"),
      r = o ? -1 : 1;
    return (
      (e.top += n * r),
      (e.bottom += n * r),
      (e.left += i * r),
      (e.right += i * r),
      e
    );
  }
  function m(e, t) {
    var o = "x" === t ? "Left" : "Top",
      n = "Left" == o ? "Right" : "Bottom";
    return (
      parseFloat(e["border" + o + "Width"]) +
      parseFloat(e["border" + n + "Width"])
    );
  }
  function h(e, t, o, n) {
    return ee(
      t["offset" + e],
      t["scroll" + e],
      o["client" + e],
      o["offset" + e],
      o["scroll" + e],
      r(10)
        ? parseInt(o["offset" + e]) +
            parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) +
            parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")])
        : 0
    );
  }
  function c(e) {
    var t = e.body,
      o = e.documentElement,
      n = r(10) && getComputedStyle(o);
    return { height: h("Height", t, o, n), width: h("Width", t, o, n) };
  }
  function g(e) {
    return le({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function u(e) {
    var o = {};
    try {
      if (r(10)) {
        o = e.getBoundingClientRect();
        var n = l(e, "top"),
          i = l(e, "left");
        (o.top += n), (o.left += i), (o.bottom += n), (o.right += i);
      } else o = e.getBoundingClientRect();
    } catch (t) {}
    var p = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top,
      },
      s = "HTML" === e.nodeName ? c(e.ownerDocument) : {},
      d = s.width || e.clientWidth || p.width,
      a = s.height || e.clientHeight || p.height,
      f = e.offsetWidth - d,
      h = e.offsetHeight - a;
    if (f || h) {
      var u = t(e);
      (f -= m(u, "x")), (h -= m(u, "y")), (p.width -= f), (p.height -= h);
    }
    return g(p);
  }
  function b(e, o) {
    var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      p = r(10),
      s = "HTML" === o.nodeName,
      d = u(e),
      a = u(o),
      l = n(e),
      m = t(o),
      h = parseFloat(m.borderTopWidth),
      c = parseFloat(m.borderLeftWidth);
    i && s && ((a.top = ee(a.top, 0)), (a.left = ee(a.left, 0)));
    var b = g({
      top: d.top - a.top - h,
      left: d.left - a.left - c,
      width: d.width,
      height: d.height,
    });
    if (((b.marginTop = 0), (b.marginLeft = 0), !p && s)) {
      var w = parseFloat(m.marginTop),
        y = parseFloat(m.marginLeft);
      (b.top -= h - w),
        (b.bottom -= h - w),
        (b.left -= c - y),
        (b.right -= c - y),
        (b.marginTop = w),
        (b.marginLeft = y);
    }
    return (
      (p && !i ? o.contains(l) : o === l && "BODY" !== l.nodeName) &&
        (b = f(b, o)),
      b
    );
  }
  function w(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = e.ownerDocument.documentElement,
      n = b(e, o),
      i = ee(o.clientWidth, window.innerWidth || 0),
      r = ee(o.clientHeight, window.innerHeight || 0),
      p = t ? 0 : l(o),
      s = t ? 0 : l(o, "left"),
      d = {
        top: p - n.top + n.marginTop,
        left: s - n.left + n.marginLeft,
        width: i,
        height: r,
      };
    return g(d);
  }
  function y(e) {
    var n = e.nodeName;
    if ("BODY" === n || "HTML" === n) return !1;
    if ("fixed" === t(e, "position")) return !0;
    var i = o(e);
    return !!i && y(i);
  }
  function E(e) {
    if (!e || !e.parentElement || r()) return document.documentElement;
    for (var o = e.parentElement; o && "none" === t(o, "transform"); )
      o = o.parentElement;
    return o || document.documentElement;
  }
  function v(e, t, r, p) {
    var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
      d = { top: 0, left: 0 },
      l = s ? E(e) : a(e, i(t));
    if ("viewport" === p) d = w(l, s);
    else {
      var f;
      "scrollParent" === p
        ? ((f = n(o(t))),
          "BODY" === f.nodeName && (f = e.ownerDocument.documentElement))
        : "window" === p
        ? (f = e.ownerDocument.documentElement)
        : (f = p);
      var m = b(f, l, s);
      if ("HTML" === f.nodeName && !y(l)) {
        var h = c(e.ownerDocument),
          g = h.height,
          u = h.width;
        (d.top += m.top - m.marginTop),
          (d.bottom = g + m.top),
          (d.left += m.left - m.marginLeft),
          (d.right = u + m.left);
      } else d = m;
    }
    r = r || 0;
    var v = "number" == typeof r;
    return (
      (d.left += v ? r : r.left || 0),
      (d.top += v ? r : r.top || 0),
      (d.right -= v ? r : r.right || 0),
      (d.bottom -= v ? r : r.bottom || 0),
      d
    );
  }
  function x(e) {
    var t = e.width,
      o = e.height;
    return t * o;
  }
  function O(e, t, o, n, i) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var p = v(o, n, r, i),
      s = {
        top: { width: p.width, height: t.top - p.top },
        right: { width: p.right - t.right, height: p.height },
        bottom: { width: p.width, height: p.bottom - t.bottom },
        left: { width: t.left - p.left, height: p.height },
      },
      d = Object.keys(s)
        .map(function (e) {
          return le({ key: e }, s[e], { area: x(s[e]) });
        })
        .sort(function (e, t) {
          return t.area - e.area;
        }),
      a = d.filter(function (e) {
        var t = e.width,
          n = e.height;
        return t >= o.clientWidth && n >= o.clientHeight;
      }),
      l = 0 < a.length ? a[0].key : d[0].key,
      f = e.split("-")[1];
    return l + (f ? "-" + f : "");
  }
  function L(e, t, o) {
    var n =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
      r = n ? E(t) : a(t, i(o));
    return b(o, r, n);
  }
  function S(e) {
    var t = e.ownerDocument.defaultView,
      o = t.getComputedStyle(e),
      n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
      i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
      r = { width: e.offsetWidth + i, height: e.offsetHeight + n };
    return r;
  }
  function T(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function C(e, t, o) {
    o = o.split("-")[0];
    var n = S(e),
      i = { width: n.width, height: n.height },
      r = -1 !== ["right", "left"].indexOf(o),
      p = r ? "top" : "left",
      s = r ? "left" : "top",
      d = r ? "height" : "width",
      a = r ? "width" : "height";
    return (
      (i[p] = t[p] + t[d] / 2 - n[d] / 2),
      (i[s] = o === s ? t[s] - n[a] : t[T(s)]),
      i
    );
  }
  function D(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function N(e, t, o) {
    if (Array.prototype.findIndex)
      return e.findIndex(function (e) {
        return e[t] === o;
      });
    var n = D(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(n);
  }
  function P(t, o, n) {
    var i = void 0 === n ? t : t.slice(0, N(t, "name", n));
    return (
      i.forEach(function (t) {
        t["function"] &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var n = t["function"] || t.fn;
        t.enabled &&
          e(n) &&
          ((o.offsets.popper = g(o.offsets.popper)),
          (o.offsets.reference = g(o.offsets.reference)),
          (o = n(o, t)));
      }),
      o
    );
  }
  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (e.offsets.reference = L(
        this.state,
        this.popper,
        this.reference,
        this.options.positionFixed
      )),
        (e.placement = O(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.positionFixed = this.options.positionFixed),
        (e.offsets.popper = C(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = this.options.positionFixed
          ? "fixed"
          : "absolute"),
        (e = P(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e));
    }
  }
  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
        n = e.enabled;
      return n && o === t;
    });
  }
  function B(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        o = e.charAt(0).toUpperCase() + e.slice(1),
        n = 0;
      n < t.length;
      n++
    ) {
      var i = t[n],
        r = i ? "" + i + o : e;
      if ("undefined" != typeof document.body.style[r]) return r;
    }
    return null;
  }
  function H() {
    return (
      (this.state.isDestroyed = !0),
      W(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style.left = ""),
        (this.popper.style.right = ""),
        (this.popper.style.bottom = ""),
        (this.popper.style.willChange = ""),
        (this.popper.style[B("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function A(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function M(e, t, o, i) {
    var r = "BODY" === e.nodeName,
      p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, { passive: !0 }),
      r || M(n(p.parentNode), t, o, i),
      i.push(p);
  }
  function F(e, t, o, i) {
    (o.updateBound = i),
      A(e).addEventListener("resize", o.updateBound, { passive: !0 });
    var r = n(e);
    return (
      M(r, "scroll", o.updateBound, o.scrollParents),
      (o.scrollElement = r),
      (o.eventsEnabled = !0),
      o
    );
  }
  function I() {
    this.state.eventsEnabled ||
      (this.state = F(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function R(e, t) {
    return (
      A(e).removeEventListener("resize", t.updateBound),
      t.scrollParents.forEach(function (e) {
        e.removeEventListener("scroll", t.updateBound);
      }),
      (t.updateBound = null),
      (t.scrollParents = []),
      (t.scrollElement = null),
      (t.eventsEnabled = !1),
      t
    );
  }
  function U() {
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state = R(this.reference, this.state)));
  }
  function Y(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function V(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) &&
        Y(t[o]) &&
        (n = "px"),
        (e.style[o] = t[o] + n);
    });
  }
  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = t[o];
      !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }
  function q(e, t) {
    var o = e.offsets,
      n = o.popper,
      i = o.reference,
      r = $,
      p = function (e) {
        return e;
      },
      s = r(i.width),
      d = r(n.width),
      a = -1 !== ["left", "right"].indexOf(e.placement),
      l = -1 !== e.placement.indexOf("-"),
      f = t ? (a || l || s % 2 == d % 2 ? r : Z) : p,
      m = t ? r : p;
    return {
      left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
      top: m(n.top),
      bottom: m(n.bottom),
      right: f(n.right),
    };
  }
  function K(e, t, o) {
    var n = D(e, function (e) {
        var o = e.name;
        return o === t;
      }),
      i =
        !!n &&
        e.some(function (e) {
          return e.name === o && e.enabled && e.order < n.order;
        });
    if (!i) {
      var r = "`" + t + "`";
      console.warn(
        "`" +
          o +
          "`" +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return i;
  }
  function z(e) {
    return "end" === e ? "start" : "start" === e ? "end" : e;
  }
  function G(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = he.indexOf(e),
      n = he.slice(o + 1).concat(he.slice(0, o));
    return t ? n.reverse() : n;
  }
  function _(e, t, o, n) {
    var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +i[1],
      p = i[2];
    if (!r) return e;
    if (0 === p.indexOf("%")) {
      var s;
      switch (p) {
        case "%p":
          s = o;
          break;
        case "%":
        case "%r":
        default:
          s = n;
      }
      var d = g(s);
      return (d[t] / 100) * r;
    }
    if ("vh" === p || "vw" === p) {
      var a;
      return (
        (a =
          "vh" === p
            ? ee(document.documentElement.clientHeight, window.innerHeight || 0)
            : ee(document.documentElement.clientWidth, window.innerWidth || 0)),
        (a / 100) * r
      );
    }
    return r;
  }
  function X(e, t, o, n) {
    var i = [0, 0],
      r = -1 !== ["right", "left"].indexOf(n),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      s = p.indexOf(
        D(p, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    p[s] &&
      -1 === p[s].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var d = /\s*,\s*|\s+/,
      a =
        -1 === s
          ? [p]
          : [
              p.slice(0, s).concat([p[s].split(d)[0]]),
              [p[s].split(d)[1]].concat(p.slice(s + 1)),
            ];
    return (
      (a = a.map(function (e, n) {
        var i = (1 === n ? !r : r) ? "height" : "width",
          p = !1;
        return e
          .reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (p = !0), e)
              : p
              ? ((e[e.length - 1] += t), (p = !1), e)
              : e.concat(t);
          }, [])
          .map(function (e) {
            return _(e, i, t, o);
          });
      })),
      a.forEach(function (e, t) {
        e.forEach(function (o, n) {
          Y(o) && (i[t] += o * ("-" === e[n - 1] ? -1 : 1));
        });
      }),
      i
    );
  }
  function J(e, t) {
    var o,
      n = t.offset,
      i = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = i.split("-")[0];
    return (
      (o = Y(+n) ? [+n, 0] : X(n, p, s, d)),
      "left" === d
        ? ((p.top += o[0]), (p.left -= o[1]))
        : "right" === d
        ? ((p.top += o[0]), (p.left += o[1]))
        : "top" === d
        ? ((p.left += o[0]), (p.top -= o[1]))
        : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
      (e.popper = p),
      e
    );
  }
  var Q = Math.min,
    Z = Math.floor,
    $ = Math.round,
    ee = Math.max,
    te =
      "undefined" != typeof window &&
      "undefined" != typeof document &&
      "undefined" != typeof navigator,
    oe = (function () {
      for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
        if (te && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
      return 0;
    })(),
    ne = te && window.Promise,
    ie = ne
      ? function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              window.Promise.resolve().then(function () {
                (t = !1), e();
              }));
          };
        }
      : function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              setTimeout(function () {
                (t = !1), e();
              }, oe));
          };
        },
    re = te && !!(window.MSInputMethodContext && document.documentMode),
    pe = te && /MSIE 10/.test(navigator.userAgent),
    se = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    de = (function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++)
          (o = t[n]),
            (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
      }
      return function (t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
      };
    })(),
    ae = function (e, t, o) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: o,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = o),
        e
      );
    },
    le =
      Object.assign ||
      function (e) {
        for (var t, o = 1; o < arguments.length; o++)
          for (var n in ((t = arguments[o]), t))
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e;
      },
    fe = te && /Firefox/i.test(navigator.userAgent),
    me = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    he = me.slice(3),
    ce = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise",
    },
    ge = (function () {
      function t(o, n) {
        var i = this,
          r =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        se(this, t),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(i.update);
          }),
          (this.update = ie(this.update.bind(this))),
          (this.options = le({}, t.Defaults, r)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = o && o.jquery ? o[0] : o),
          (this.popper = n && n.jquery ? n[0] : n),
          (this.options.modifiers = {}),
          Object.keys(le({}, t.Defaults.modifiers, r.modifiers)).forEach(
            function (e) {
              i.options.modifiers[e] = le(
                {},
                t.Defaults.modifiers[e] || {},
                r.modifiers ? r.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (e) {
              return le({ name: e }, i.options.modifiers[e]);
            })
            .sort(function (e, t) {
              return e.order - t.order;
            })),
          this.modifiers.forEach(function (t) {
            t.enabled &&
              e(t.onLoad) &&
              t.onLoad(i.reference, i.popper, i.options, t, i.state);
          }),
          this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), (this.state.eventsEnabled = p);
      }
      return (
        de(t, [
          {
            key: "update",
            value: function () {
              return k.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return H.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return I.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return U.call(this);
            },
          },
        ]),
        t
      );
    })();
  return (
    (ge.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
    (ge.placements = me),
    (ge.Defaults = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              n = t.split("-")[1];
            if (n) {
              var i = e.offsets,
                r = i.reference,
                p = i.popper,
                s = -1 !== ["bottom", "top"].indexOf(o),
                d = s ? "left" : "top",
                a = s ? "width" : "height",
                l = {
                  start: ae({}, d, r[d]),
                  end: ae({}, d, r[d] + r[a] - p[a]),
                };
              e.offsets.popper = le({}, p, l[n]);
            }
            return e;
          },
        },
        offset: { order: 200, enabled: !0, fn: J, offset: 0 },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (e, t) {
            var o = t.boundariesElement || p(e.instance.popper);
            e.instance.reference === o && (o = p(o));
            var n = B("transform"),
              i = e.instance.popper.style,
              r = i.top,
              s = i.left,
              d = i[n];
            (i.top = ""), (i.left = ""), (i[n] = "");
            var a = v(
              e.instance.popper,
              e.instance.reference,
              t.padding,
              o,
              e.positionFixed
            );
            (i.top = r), (i.left = s), (i[n] = d), (t.boundaries = a);
            var l = t.priority,
              f = e.offsets.popper,
              m = {
                primary: function (e) {
                  var o = f[e];
                  return (
                    f[e] < a[e] &&
                      !t.escapeWithReference &&
                      (o = ee(f[e], a[e])),
                    ae({}, e, o)
                  );
                },
                secondary: function (e) {
                  var o = "right" === e ? "left" : "top",
                    n = f[o];
                  return (
                    f[e] > a[e] &&
                      !t.escapeWithReference &&
                      (n = Q(
                        f[o],
                        a[e] - ("right" === e ? f.width : f.height)
                      )),
                    ae({}, o, n)
                  );
                },
              };
            return (
              l.forEach(function (e) {
                var t =
                  -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                f = le({}, f, m[t](e));
              }),
              (e.offsets.popper = f),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (e) {
            var t = e.offsets,
              o = t.popper,
              n = t.reference,
              i = e.placement.split("-")[0],
              r = Z,
              p = -1 !== ["top", "bottom"].indexOf(i),
              s = p ? "right" : "bottom",
              d = p ? "left" : "top",
              a = p ? "width" : "height";
            return (
              o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]),
              o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])),
              e
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (e, o) {
            var n;
            if (!K(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var i = o.element;
            if ("string" == typeof i) {
              if (((i = e.instance.popper.querySelector(i)), !i)) return e;
            } else if (!e.instance.popper.contains(i))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var r = e.placement.split("-")[0],
              p = e.offsets,
              s = p.popper,
              d = p.reference,
              a = -1 !== ["left", "right"].indexOf(r),
              l = a ? "height" : "width",
              f = a ? "Top" : "Left",
              m = f.toLowerCase(),
              h = a ? "left" : "top",
              c = a ? "bottom" : "right",
              u = S(i)[l];
            d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)),
              d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]),
              (e.offsets.popper = g(e.offsets.popper));
            var b = d[m] + d[l] / 2 - u / 2,
              w = t(e.instance.popper),
              y = parseFloat(w["margin" + f]),
              E = parseFloat(w["border" + f + "Width"]),
              v = b - e.offsets.popper[m] - y - E;
            return (
              (v = ee(Q(s[l] - u, v), 0)),
              (e.arrowElement = i),
              (e.offsets.arrow = ((n = {}), ae(n, m, $(v)), ae(n, h, ""), n)),
              e
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (e, t) {
            if (W(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var o = v(
                e.instance.popper,
                e.instance.reference,
                t.padding,
                t.boundariesElement,
                e.positionFixed
              ),
              n = e.placement.split("-")[0],
              i = T(n),
              r = e.placement.split("-")[1] || "",
              p = [];
            switch (t.behavior) {
              case ce.FLIP:
                p = [n, i];
                break;
              case ce.CLOCKWISE:
                p = G(n);
                break;
              case ce.COUNTERCLOCKWISE:
                p = G(n, !0);
                break;
              default:
                p = t.behavior;
            }
            return (
              p.forEach(function (s, d) {
                if (n !== s || p.length === d + 1) return e;
                (n = e.placement.split("-")[0]), (i = T(n));
                var a = e.offsets.popper,
                  l = e.offsets.reference,
                  f = Z,
                  m =
                    ("left" === n && f(a.right) > f(l.left)) ||
                    ("right" === n && f(a.left) < f(l.right)) ||
                    ("top" === n && f(a.bottom) > f(l.top)) ||
                    ("bottom" === n && f(a.top) < f(l.bottom)),
                  h = f(a.left) < f(o.left),
                  c = f(a.right) > f(o.right),
                  g = f(a.top) < f(o.top),
                  u = f(a.bottom) > f(o.bottom),
                  b =
                    ("left" === n && h) ||
                    ("right" === n && c) ||
                    ("top" === n && g) ||
                    ("bottom" === n && u),
                  w = -1 !== ["top", "bottom"].indexOf(n),
                  y =
                    !!t.flipVariations &&
                    ((w && "start" === r && h) ||
                      (w && "end" === r && c) ||
                      (!w && "start" === r && g) ||
                      (!w && "end" === r && u)),
                  E =
                    !!t.flipVariationsByContent &&
                    ((w && "start" === r && c) ||
                      (w && "end" === r && h) ||
                      (!w && "start" === r && u) ||
                      (!w && "end" === r && g)),
                  v = y || E;
                (m || b || v) &&
                  ((e.flipped = !0),
                  (m || b) && (n = p[d + 1]),
                  v && (r = z(r)),
                  (e.placement = n + (r ? "-" + r : "")),
                  (e.offsets.popper = le(
                    {},
                    e.offsets.popper,
                    C(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = P(e.instance.modifiers, e, "flip")));
              }),
              e
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              n = e.offsets,
              i = n.popper,
              r = n.reference,
              p = -1 !== ["left", "right"].indexOf(o),
              s = -1 === ["top", "left"].indexOf(o);
            return (
              (i[p ? "left" : "top"] =
                r[o] - (s ? i[p ? "width" : "height"] : 0)),
              (e.placement = T(t)),
              (e.offsets.popper = g(i)),
              e
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (e) {
            if (!K(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
              o = D(e.instance.modifiers, function (e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              t.bottom < o.top ||
              t.left > o.right ||
              t.top > o.bottom ||
              t.right < o.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (e, t) {
            var o = t.x,
              n = t.y,
              i = e.offsets.popper,
              r = D(e.instance.modifiers, function (e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== r &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s,
              d,
              a = void 0 === r ? t.gpuAcceleration : r,
              l = p(e.instance.popper),
              f = u(l),
              m = { position: i.position },
              h = q(e, 2 > window.devicePixelRatio || !fe),
              c = "bottom" === o ? "top" : "bottom",
              g = "right" === n ? "left" : "right",
              b = B("transform");
            if (
              ((d =
                "bottom" == c
                  ? "HTML" === l.nodeName
                    ? -l.clientHeight + h.bottom
                    : -f.height + h.bottom
                  : h.top),
              (s =
                "right" == g
                  ? "HTML" === l.nodeName
                    ? -l.clientWidth + h.right
                    : -f.width + h.right
                  : h.left),
              a && b)
            )
              (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                (m[c] = 0),
                (m[g] = 0),
                (m.willChange = "transform");
            else {
              var w = "bottom" == c ? -1 : 1,
                y = "right" == g ? -1 : 1;
              (m[c] = d * w), (m[g] = s * y), (m.willChange = c + ", " + g);
            }
            var E = { "x-placement": e.placement };
            return (
              (e.attributes = le({}, E, e.attributes)),
              (e.styles = le({}, m, e.styles)),
              (e.arrowStyles = le({}, e.offsets.arrow, e.arrowStyles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (e) {
            return (
              V(e.instance.popper, e.styles),
              j(e.instance.popper, e.attributes),
              e.arrowElement &&
                Object.keys(e.arrowStyles).length &&
                V(e.arrowElement, e.arrowStyles),
              e
            );
          },
          onLoad: function (e, t, o, n, i) {
            var r = L(i, t, e, o.positionFixed),
              p = O(
                o.placement,
                r,
                t,
                e,
                o.modifiers.flip.boundariesElement,
                o.modifiers.flip.padding
              );
            return (
              t.setAttribute("x-placement", p),
              V(t, { position: o.positionFixed ? "fixed" : "absolute" }),
              o
            );
          },
          gpuAcceleration: void 0,
        },
      },
    }),
    ge
  );
}); /*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */
!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (C, e) {
  "use strict";
  var t = [],
    E = C.document,
    r = Object.getPrototypeOf,
    s = t.slice,
    g = t.concat,
    u = t.push,
    i = t.indexOf,
    n = {},
    o = n.toString,
    v = n.hasOwnProperty,
    a = v.toString,
    l = a.call(Object),
    y = {},
    m = function (e) {
      return "function" == typeof e && "number" != typeof e.nodeType;
    },
    x = function (e) {
      return null != e && e === e.window;
    },
    c = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function b(e, t, n) {
    var r,
      i,
      o = (n = n || E).createElement("script");
    if (((o.text = e), t))
      for (r in c)
        (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
          o.setAttribute(r, i);
    n.head.appendChild(o).parentNode.removeChild(o);
  }
  function w(e) {
    return null == e
      ? e + ""
      : "object" == typeof e || "function" == typeof e
      ? n[o.call(e)] || "object"
      : typeof e;
  }
  var f = "3.4.1",
    k = function (e, t) {
      return new k.fn.init(e, t);
    },
    p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  function d(e) {
    var t = !!e && "length" in e && e.length,
      n = w(e);
    return (
      !m(e) &&
      !x(e) &&
      ("array" === n ||
        0 === t ||
        ("number" == typeof t && 0 < t && t - 1 in e))
    );
  }
  (k.fn = k.prototype =
    {
      jquery: f,
      constructor: k,
      length: 0,
      toArray: function () {
        return s.call(this);
      },
      get: function (e) {
        return null == e
          ? s.call(this)
          : e < 0
          ? this[e + this.length]
          : this[e];
      },
      pushStack: function (e) {
        var t = k.merge(this.constructor(), e);
        return (t.prevObject = this), t;
      },
      each: function (e) {
        return k.each(this, e);
      },
      map: function (n) {
        return this.pushStack(
          k.map(this, function (e, t) {
            return n.call(e, t, e);
          })
        );
      },
      slice: function () {
        return this.pushStack(s.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (e < 0 ? t : 0);
        return this.pushStack(0 <= n && n < t ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: u,
      sort: t.sort,
      splice: t.splice,
    }),
    (k.extend = k.fn.extend =
      function () {
        var e,
          t,
          n,
          r,
          i,
          o,
          a = arguments[0] || {},
          s = 1,
          u = arguments.length,
          l = !1;
        for (
          "boolean" == typeof a && ((l = a), (a = arguments[s] || {}), s++),
            "object" == typeof a || m(a) || (a = {}),
            s === u && ((a = this), s--);
          s < u;
          s++
        )
          if (null != (e = arguments[s]))
            for (t in e)
              (r = e[t]),
                "__proto__" !== t &&
                  a !== r &&
                  (l && r && (k.isPlainObject(r) || (i = Array.isArray(r)))
                    ? ((n = a[t]),
                      (o =
                        i && !Array.isArray(n)
                          ? []
                          : i || k.isPlainObject(n)
                          ? n
                          : {}),
                      (i = !1),
                      (a[t] = k.extend(l, o, r)))
                    : void 0 !== r && (a[t] = r));
        return a;
      }),
    k.extend({
      expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isPlainObject: function (e) {
        var t, n;
        return (
          !(!e || "[object Object]" !== o.call(e)) &&
          (!(t = r(e)) ||
            ("function" ==
              typeof (n = v.call(t, "constructor") && t.constructor) &&
              a.call(n) === l))
        );
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function (e, t) {
        b(e, { nonce: t && t.nonce });
      },
      each: function (e, t) {
        var n,
          r = 0;
        if (d(e)) {
          for (n = e.length; r < n; r++)
            if (!1 === t.call(e[r], r, e[r])) break;
        } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        return e;
      },
      trim: function (e) {
        return null == e ? "" : (e + "").replace(p, "");
      },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (d(Object(e))
              ? k.merge(n, "string" == typeof e ? [e] : e)
              : u.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        return null == t ? -1 : i.call(t, e, n);
      },
      merge: function (e, t) {
        for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
        return (e.length = i), e;
      },
      grep: function (e, t, n) {
        for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
          !t(e[i], i) !== a && r.push(e[i]);
        return r;
      },
      map: function (e, t, n) {
        var r,
          i,
          o = 0,
          a = [];
        if (d(e))
          for (r = e.length; o < r; o++)
            null != (i = t(e[o], o, n)) && a.push(i);
        else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
        return g.apply([], a);
      },
      guid: 1,
      support: y,
    }),
    "function" == typeof Symbol && (k.fn[Symbol.iterator] = t[Symbol.iterator]),
    k.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (e, t) {
        n["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var h = (function (n) {
    var e,
      d,
      b,
      o,
      i,
      h,
      f,
      g,
      w,
      u,
      l,
      T,
      C,
      a,
      E,
      v,
      s,
      c,
      y,
      k = "sizzle" + 1 * new Date(),
      m = n.document,
      S = 0,
      r = 0,
      p = ue(),
      x = ue(),
      N = ue(),
      A = ue(),
      D = function (e, t) {
        return e === t && (l = !0), 0;
      },
      j = {}.hasOwnProperty,
      t = [],
      q = t.pop,
      L = t.push,
      H = t.push,
      O = t.slice,
      P = function (e, t) {
        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
        return -1;
      },
      R =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      M = "[\\x20\\t\\r\\n\\f]",
      I = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
      W =
        "\\[" +
        M +
        "*(" +
        I +
        ")(?:" +
        M +
        "*([*^$|!~]?=)" +
        M +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        I +
        "))|)" +
        M +
        "*\\]",
      $ =
        ":(" +
        I +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        W +
        ")*)|.*)\\)|)",
      F = new RegExp(M + "+", "g"),
      B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
      _ = new RegExp("^" + M + "*," + M + "*"),
      z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
      U = new RegExp(M + "|>"),
      X = new RegExp($),
      V = new RegExp("^" + I + "$"),
      G = {
        ID: new RegExp("^#(" + I + ")"),
        CLASS: new RegExp("^\\.(" + I + ")"),
        TAG: new RegExp("^(" + I + "|[*])"),
        ATTR: new RegExp("^" + W),
        PSEUDO: new RegExp("^" + $),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            M +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            M +
            "*(?:([+-]|)" +
            M +
            "*(\\d+)|))" +
            M +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + R + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            M +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            M +
            "*((?:-\\d)?\\d*)" +
            M +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      Y = /HTML$/i,
      Q = /^(?:input|select|textarea|button)$/i,
      J = /^h\d$/i,
      K = /^[^{]+\{\s*\[native \w/,
      Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ee = /[+~]/,
      te = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
      ne = function (e, t, n) {
        var r = "0x" + t - 65536;
        return r != r || n
          ? t
          : r < 0
          ? String.fromCharCode(r + 65536)
          : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
      },
      re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      ie = function (e, t) {
        return t
          ? "\0" === e
            ? "\ufffd"
            : e.slice(0, -1) +
              "\\" +
              e.charCodeAt(e.length - 1).toString(16) +
              " "
          : "\\" + e;
      },
      oe = function () {
        T();
      },
      ae = be(
        function (e) {
          return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
        },
        { dir: "parentNode", next: "legend" }
      );
    try {
      H.apply((t = O.call(m.childNodes)), m.childNodes),
        t[m.childNodes.length].nodeType;
    } catch (e) {
      H = {
        apply: t.length
          ? function (e, t) {
              L.apply(e, O.call(t));
            }
          : function (e, t) {
              var n = e.length,
                r = 0;
              while ((e[n++] = t[r++]));
              e.length = n - 1;
            },
      };
    }
    function se(t, e, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = e && e.ownerDocument,
        p = e ? e.nodeType : 9;
      if (
        ((n = n || []),
        "string" != typeof t || !t || (1 !== p && 9 !== p && 11 !== p))
      )
        return n;
      if (
        !r &&
        ((e ? e.ownerDocument || e : m) !== C && T(e), (e = e || C), E)
      ) {
        if (11 !== p && (u = Z.exec(t)))
          if ((i = u[1])) {
            if (9 === p) {
              if (!(a = e.getElementById(i))) return n;
              if (a.id === i) return n.push(a), n;
            } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i)
              return n.push(a), n;
          } else {
            if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
            if (
              (i = u[3]) &&
              d.getElementsByClassName &&
              e.getElementsByClassName
            )
              return H.apply(n, e.getElementsByClassName(i)), n;
          }
        if (
          d.qsa &&
          !A[t + " "] &&
          (!v || !v.test(t)) &&
          (1 !== p || "object" !== e.nodeName.toLowerCase())
        ) {
          if (((c = t), (f = e), 1 === p && U.test(t))) {
            (s = e.getAttribute("id"))
              ? (s = s.replace(re, ie))
              : e.setAttribute("id", (s = k)),
              (o = (l = h(t)).length);
            while (o--) l[o] = "#" + s + " " + xe(l[o]);
            (c = l.join(",")), (f = (ee.test(t) && ye(e.parentNode)) || e);
          }
          try {
            return H.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            A(t, !0);
          } finally {
            s === k && e.removeAttribute("id");
          }
        }
      }
      return g(t.replace(B, "$1"), e, n, r);
    }
    function ue() {
      var r = [];
      return function e(t, n) {
        return (
          r.push(t + " ") > b.cacheLength && delete e[r.shift()],
          (e[t + " "] = n)
        );
      };
    }
    function le(e) {
      return (e[k] = !0), e;
    }
    function ce(e) {
      var t = C.createElement("fieldset");
      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), (t = null);
      }
    }
    function fe(e, t) {
      var n = e.split("|"),
        r = n.length;
      while (r--) b.attrHandle[n[r]] = t;
    }
    function pe(e, t) {
      var n = t && e,
        r =
          n &&
          1 === e.nodeType &&
          1 === t.nodeType &&
          e.sourceIndex - t.sourceIndex;
      if (r) return r;
      if (n) while ((n = n.nextSibling)) if (n === t) return -1;
      return e ? 1 : -1;
    }
    function de(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }
    function he(n) {
      return function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t || "button" === t) && e.type === n;
      };
    }
    function ge(t) {
      return function (e) {
        return "form" in e
          ? e.parentNode && !1 === e.disabled
            ? "label" in e
              ? "label" in e.parentNode
                ? e.parentNode.disabled === t
                : e.disabled === t
              : e.isDisabled === t || (e.isDisabled !== !t && ae(e) === t)
            : e.disabled === t
          : "label" in e && e.disabled === t;
      };
    }
    function ve(a) {
      return le(function (o) {
        return (
          (o = +o),
          le(function (e, t) {
            var n,
              r = a([], e.length, o),
              i = r.length;
            while (i--) e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
          })
        );
      });
    }
    function ye(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }
    for (e in ((d = se.support = {}),
    (i = se.isXML =
      function (e) {
        var t = e.namespaceURI,
          n = (e.ownerDocument || e).documentElement;
        return !Y.test(t || (n && n.nodeName) || "HTML");
      }),
    (T = se.setDocument =
      function (e) {
        var t,
          n,
          r = e ? e.ownerDocument || e : m;
        return (
          r !== C &&
            9 === r.nodeType &&
            r.documentElement &&
            ((a = (C = r).documentElement),
            (E = !i(C)),
            m !== C &&
              (n = C.defaultView) &&
              n.top !== n &&
              (n.addEventListener
                ? n.addEventListener("unload", oe, !1)
                : n.attachEvent && n.attachEvent("onunload", oe)),
            (d.attributes = ce(function (e) {
              return (e.className = "i"), !e.getAttribute("className");
            })),
            (d.getElementsByTagName = ce(function (e) {
              return (
                e.appendChild(C.createComment("")),
                !e.getElementsByTagName("*").length
              );
            })),
            (d.getElementsByClassName = K.test(C.getElementsByClassName)),
            (d.getById = ce(function (e) {
              return (
                (a.appendChild(e).id = k),
                !C.getElementsByName || !C.getElementsByName(k).length
              );
            })),
            d.getById
              ? ((b.filter.ID = function (e) {
                  var t = e.replace(te, ne);
                  return function (e) {
                    return e.getAttribute("id") === t;
                  };
                }),
                (b.find.ID = function (e, t) {
                  if ("undefined" != typeof t.getElementById && E) {
                    var n = t.getElementById(e);
                    return n ? [n] : [];
                  }
                }))
              : ((b.filter.ID = function (e) {
                  var n = e.replace(te, ne);
                  return function (e) {
                    var t =
                      "undefined" != typeof e.getAttributeNode &&
                      e.getAttributeNode("id");
                    return t && t.value === n;
                  };
                }),
                (b.find.ID = function (e, t) {
                  if ("undefined" != typeof t.getElementById && E) {
                    var n,
                      r,
                      i,
                      o = t.getElementById(e);
                    if (o) {
                      if ((n = o.getAttributeNode("id")) && n.value === e)
                        return [o];
                      (i = t.getElementsByName(e)), (r = 0);
                      while ((o = i[r++]))
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                          return [o];
                    }
                    return [];
                  }
                })),
            (b.find.TAG = d.getElementsByTagName
              ? function (e, t) {
                  return "undefined" != typeof t.getElementsByTagName
                    ? t.getElementsByTagName(e)
                    : d.qsa
                    ? t.querySelectorAll(e)
                    : void 0;
                }
              : function (e, t) {
                  var n,
                    r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                  if ("*" === e) {
                    while ((n = o[i++])) 1 === n.nodeType && r.push(n);
                    return r;
                  }
                  return o;
                }),
            (b.find.CLASS =
              d.getElementsByClassName &&
              function (e, t) {
                if ("undefined" != typeof t.getElementsByClassName && E)
                  return t.getElementsByClassName(e);
              }),
            (s = []),
            (v = []),
            (d.qsa = K.test(C.querySelectorAll)) &&
              (ce(function (e) {
                (a.appendChild(e).innerHTML =
                  "<a id='" +
                  k +
                  "'></a><select id='" +
                  k +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  e.querySelectorAll("[msallowcapture^='']").length &&
                    v.push("[*^$]=" + M + "*(?:''|\"\")"),
                  e.querySelectorAll("[selected]").length ||
                    v.push("\\[" + M + "*(?:value|" + R + ")"),
                  e.querySelectorAll("[id~=" + k + "-]").length || v.push("~="),
                  e.querySelectorAll(":checked").length || v.push(":checked"),
                  e.querySelectorAll("a#" + k + "+*").length ||
                    v.push(".#.+[+~]");
              }),
              ce(function (e) {
                e.innerHTML =
                  "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = C.createElement("input");
                t.setAttribute("type", "hidden"),
                  e.appendChild(t).setAttribute("name", "D"),
                  e.querySelectorAll("[name=d]").length &&
                    v.push("name" + M + "*[*^$|!~]?="),
                  2 !== e.querySelectorAll(":enabled").length &&
                    v.push(":enabled", ":disabled"),
                  (a.appendChild(e).disabled = !0),
                  2 !== e.querySelectorAll(":disabled").length &&
                    v.push(":enabled", ":disabled"),
                  e.querySelectorAll("*,:x"),
                  v.push(",.*:");
              })),
            (d.matchesSelector = K.test(
              (c =
                a.matches ||
                a.webkitMatchesSelector ||
                a.mozMatchesSelector ||
                a.oMatchesSelector ||
                a.msMatchesSelector)
            )) &&
              ce(function (e) {
                (d.disconnectedMatch = c.call(e, "*")),
                  c.call(e, "[s!='']:x"),
                  s.push("!=", $);
              }),
            (v = v.length && new RegExp(v.join("|"))),
            (s = s.length && new RegExp(s.join("|"))),
            (t = K.test(a.compareDocumentPosition)),
            (y =
              t || K.test(a.contains)
                ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                      r = t && t.parentNode;
                    return (
                      e === r ||
                      !(
                        !r ||
                        1 !== r.nodeType ||
                        !(n.contains
                          ? n.contains(r)
                          : e.compareDocumentPosition &&
                            16 & e.compareDocumentPosition(r))
                      )
                    );
                  }
                : function (e, t) {
                    if (t) while ((t = t.parentNode)) if (t === e) return !0;
                    return !1;
                  }),
            (D = t
              ? function (e, t) {
                  if (e === t) return (l = !0), 0;
                  var n =
                    !e.compareDocumentPosition - !t.compareDocumentPosition;
                  return (
                    n ||
                    (1 &
                      (n =
                        (e.ownerDocument || e) === (t.ownerDocument || t)
                          ? e.compareDocumentPosition(t)
                          : 1) ||
                    (!d.sortDetached && t.compareDocumentPosition(e) === n)
                      ? e === C || (e.ownerDocument === m && y(m, e))
                        ? -1
                        : t === C || (t.ownerDocument === m && y(m, t))
                        ? 1
                        : u
                        ? P(u, e) - P(u, t)
                        : 0
                      : 4 & n
                      ? -1
                      : 1)
                  );
                }
              : function (e, t) {
                  if (e === t) return (l = !0), 0;
                  var n,
                    r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                  if (!i || !o)
                    return e === C
                      ? -1
                      : t === C
                      ? 1
                      : i
                      ? -1
                      : o
                      ? 1
                      : u
                      ? P(u, e) - P(u, t)
                      : 0;
                  if (i === o) return pe(e, t);
                  n = e;
                  while ((n = n.parentNode)) a.unshift(n);
                  n = t;
                  while ((n = n.parentNode)) s.unshift(n);
                  while (a[r] === s[r]) r++;
                  return r
                    ? pe(a[r], s[r])
                    : a[r] === m
                    ? -1
                    : s[r] === m
                    ? 1
                    : 0;
                })),
          C
        );
      }),
    (se.matches = function (e, t) {
      return se(e, null, null, t);
    }),
    (se.matchesSelector = function (e, t) {
      if (
        ((e.ownerDocument || e) !== C && T(e),
        d.matchesSelector &&
          E &&
          !A[t + " "] &&
          (!s || !s.test(t)) &&
          (!v || !v.test(t)))
      )
        try {
          var n = c.call(e, t);
          if (
            n ||
            d.disconnectedMatch ||
            (e.document && 11 !== e.document.nodeType)
          )
            return n;
        } catch (e) {
          A(t, !0);
        }
      return 0 < se(t, C, null, [e]).length;
    }),
    (se.contains = function (e, t) {
      return (e.ownerDocument || e) !== C && T(e), y(e, t);
    }),
    (se.attr = function (e, t) {
      (e.ownerDocument || e) !== C && T(e);
      var n = b.attrHandle[t.toLowerCase()],
        r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
      return void 0 !== r
        ? r
        : d.attributes || !E
        ? e.getAttribute(t)
        : (r = e.getAttributeNode(t)) && r.specified
        ? r.value
        : null;
    }),
    (se.escape = function (e) {
      return (e + "").replace(re, ie);
    }),
    (se.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }),
    (se.uniqueSort = function (e) {
      var t,
        n = [],
        r = 0,
        i = 0;
      if (
        ((l = !d.detectDuplicates),
        (u = !d.sortStable && e.slice(0)),
        e.sort(D),
        l)
      ) {
        while ((t = e[i++])) t === e[i] && (r = n.push(i));
        while (r--) e.splice(n[r], 1);
      }
      return (u = null), e;
    }),
    (o = se.getText =
      function (e) {
        var t,
          n = "",
          r = 0,
          i = e.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
          } else if (3 === i || 4 === i) return e.nodeValue;
        } else while ((t = e[r++])) n += o(t);
        return n;
      }),
    ((b = se.selectors =
      {
        cacheLength: 50,
        createPseudo: le,
        match: G,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (e) {
            return (
              (e[1] = e[1].replace(te, ne)),
              (e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne)),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
              e.slice(0, 4)
            );
          },
          CHILD: function (e) {
            return (
              (e[1] = e[1].toLowerCase()),
              "nth" === e[1].slice(0, 3)
                ? (e[3] || se.error(e[0]),
                  (e[4] = +(e[4]
                    ? e[5] + (e[6] || 1)
                    : 2 * ("even" === e[3] || "odd" === e[3]))),
                  (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                : e[3] && se.error(e[0]),
              e
            );
          },
          PSEUDO: function (e) {
            var t,
              n = !e[6] && e[2];
            return G.CHILD.test(e[0])
              ? null
              : (e[3]
                  ? (e[2] = e[4] || e[5] || "")
                  : n &&
                    X.test(n) &&
                    (t = h(n, !0)) &&
                    (t = n.indexOf(")", n.length - t) - n.length) &&
                    ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                e.slice(0, 3));
          },
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(te, ne).toLowerCase();
            return "*" === e
              ? function () {
                  return !0;
                }
              : function (e) {
                  return e.nodeName && e.nodeName.toLowerCase() === t;
                };
          },
          CLASS: function (e) {
            var t = p[e + " "];
            return (
              t ||
              ((t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) &&
                p(e, function (e) {
                  return t.test(
                    ("string" == typeof e.className && e.className) ||
                      ("undefined" != typeof e.getAttribute &&
                        e.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (n, r, i) {
            return function (e) {
              var t = se.attr(e, n);
              return null == t
                ? "!=" === r
                : !r ||
                    ((t += ""),
                    "=" === r
                      ? t === i
                      : "!=" === r
                      ? t !== i
                      : "^=" === r
                      ? i && 0 === t.indexOf(i)
                      : "*=" === r
                      ? i && -1 < t.indexOf(i)
                      : "$=" === r
                      ? i && t.slice(-i.length) === i
                      : "~=" === r
                      ? -1 < (" " + t.replace(F, " ") + " ").indexOf(i)
                      : "|=" === r &&
                        (t === i || t.slice(0, i.length + 1) === i + "-"));
            };
          },
          CHILD: function (h, e, t, g, v) {
            var y = "nth" !== h.slice(0, 3),
              m = "last" !== h.slice(-4),
              x = "of-type" === e;
            return 1 === g && 0 === v
              ? function (e) {
                  return !!e.parentNode;
                }
              : function (e, t, n) {
                  var r,
                    i,
                    o,
                    a,
                    s,
                    u,
                    l = y !== m ? "nextSibling" : "previousSibling",
                    c = e.parentNode,
                    f = x && e.nodeName.toLowerCase(),
                    p = !n && !x,
                    d = !1;
                  if (c) {
                    if (y) {
                      while (l) {
                        a = e;
                        while ((a = a[l]))
                          if (
                            x
                              ? a.nodeName.toLowerCase() === f
                              : 1 === a.nodeType
                          )
                            return !1;
                        u = l = "only" === h && !u && "nextSibling";
                      }
                      return !0;
                    }
                    if (((u = [m ? c.firstChild : c.lastChild]), m && p)) {
                      (d =
                        (s =
                          (r =
                            (i =
                              (o = (a = c)[k] || (a[k] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[h] || [])[0] === S &&
                          r[1]) && r[2]),
                        (a = s && c.childNodes[s]);
                      while ((a = (++s && a && a[l]) || (d = s = 0) || u.pop()))
                        if (1 === a.nodeType && ++d && a === e) {
                          i[h] = [S, s, d];
                          break;
                        }
                    } else if (
                      (p &&
                        (d = s =
                          (r =
                            (i =
                              (o = (a = e)[k] || (a[k] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1]),
                      !1 === d)
                    )
                      while ((a = (++s && a && a[l]) || (d = s = 0) || u.pop()))
                        if (
                          (x
                            ? a.nodeName.toLowerCase() === f
                            : 1 === a.nodeType) &&
                          ++d &&
                          (p &&
                            ((i =
                              (o = a[k] || (a[k] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[h] = [S, d]),
                          a === e)
                        )
                          break;
                    return (d -= v) === g || (d % g == 0 && 0 <= d / g);
                  }
                };
          },
          PSEUDO: function (e, o) {
            var t,
              a =
                b.pseudos[e] ||
                b.setFilters[e.toLowerCase()] ||
                se.error("unsupported pseudo: " + e);
            return a[k]
              ? a(o)
              : 1 < a.length
              ? ((t = [e, e, "", o]),
                b.setFilters.hasOwnProperty(e.toLowerCase())
                  ? le(function (e, t) {
                      var n,
                        r = a(e, o),
                        i = r.length;
                      while (i--) e[(n = P(e, r[i]))] = !(t[n] = r[i]);
                    })
                  : function (e) {
                      return a(e, 0, t);
                    })
              : a;
          },
        },
        pseudos: {
          not: le(function (e) {
            var r = [],
              i = [],
              s = f(e.replace(B, "$1"));
            return s[k]
              ? le(function (e, t, n, r) {
                  var i,
                    o = s(e, null, r, []),
                    a = e.length;
                  while (a--) (i = o[a]) && (e[a] = !(t[a] = i));
                })
              : function (e, t, n) {
                  return (r[0] = e), s(r, null, n, i), (r[0] = null), !i.pop();
                };
          }),
          has: le(function (t) {
            return function (e) {
              return 0 < se(t, e).length;
            };
          }),
          contains: le(function (t) {
            return (
              (t = t.replace(te, ne)),
              function (e) {
                return -1 < (e.textContent || o(e)).indexOf(t);
              }
            );
          }),
          lang: le(function (n) {
            return (
              V.test(n || "") || se.error("unsupported lang: " + n),
              (n = n.replace(te, ne).toLowerCase()),
              function (e) {
                var t;
                do {
                  if (
                    (t = E
                      ? e.lang
                      : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                  )
                    return (
                      (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                    );
                } while ((e = e.parentNode) && 1 === e.nodeType);
                return !1;
              }
            );
          }),
          target: function (e) {
            var t = n.location && n.location.hash;
            return t && t.slice(1) === e.id;
          },
          root: function (e) {
            return e === a;
          },
          focus: function (e) {
            return (
              e === C.activeElement &&
              (!C.hasFocus || C.hasFocus()) &&
              !!(e.type || e.href || ~e.tabIndex)
            );
          },
          enabled: ge(!1),
          disabled: ge(!0),
          checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return (
              ("input" === t && !!e.checked) || ("option" === t && !!e.selected)
            );
          },
          selected: function (e) {
            return (
              e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
            );
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6) return !1;
            return !0;
          },
          parent: function (e) {
            return !b.pseudos.empty(e);
          },
          header: function (e) {
            return J.test(e.nodeName);
          },
          input: function (e) {
            return Q.test(e.nodeName);
          },
          button: function (e) {
            var t = e.nodeName.toLowerCase();
            return ("input" === t && "button" === e.type) || "button" === t;
          },
          text: function (e) {
            var t;
            return (
              "input" === e.nodeName.toLowerCase() &&
              "text" === e.type &&
              (null == (t = e.getAttribute("type")) ||
                "text" === t.toLowerCase())
            );
          },
          first: ve(function () {
            return [0];
          }),
          last: ve(function (e, t) {
            return [t - 1];
          }),
          eq: ve(function (e, t, n) {
            return [n < 0 ? n + t : n];
          }),
          even: ve(function (e, t) {
            for (var n = 0; n < t; n += 2) e.push(n);
            return e;
          }),
          odd: ve(function (e, t) {
            for (var n = 1; n < t; n += 2) e.push(n);
            return e;
          }),
          lt: ve(function (e, t, n) {
            for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
            return e;
          }),
          gt: ve(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
            return e;
          }),
        },
      }).pseudos.nth = b.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      b.pseudos[e] = de(e);
    for (e in { submit: !0, reset: !0 }) b.pseudos[e] = he(e);
    function me() {}
    function xe(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
      return r;
    }
    function be(s, e, t) {
      var u = e.dir,
        l = e.next,
        c = l || u,
        f = t && "parentNode" === c,
        p = r++;
      return e.first
        ? function (e, t, n) {
            while ((e = e[u])) if (1 === e.nodeType || f) return s(e, t, n);
            return !1;
          }
        : function (e, t, n) {
            var r,
              i,
              o,
              a = [S, p];
            if (n) {
              while ((e = e[u]))
                if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
            } else
              while ((e = e[u]))
                if (1 === e.nodeType || f)
                  if (
                    ((i =
                      (o = e[k] || (e[k] = {}))[e.uniqueID] ||
                      (o[e.uniqueID] = {})),
                    l && l === e.nodeName.toLowerCase())
                  )
                    e = e[u] || e;
                  else {
                    if ((r = i[c]) && r[0] === S && r[1] === p)
                      return (a[2] = r[2]);
                    if (((i[c] = a)[2] = s(e, t, n))) return !0;
                  }
            return !1;
          };
    }
    function we(i) {
      return 1 < i.length
        ? function (e, t, n) {
            var r = i.length;
            while (r--) if (!i[r](e, t, n)) return !1;
            return !0;
          }
        : i[0];
    }
    function Te(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
        (o = e[s]) && ((n && !n(o, r, i)) || (a.push(o), l && t.push(s)));
      return a;
    }
    function Ce(d, h, g, v, y, e) {
      return (
        v && !v[k] && (v = Ce(v)),
        y && !y[k] && (y = Ce(y, e)),
        le(function (e, t, n, r) {
          var i,
            o,
            a,
            s = [],
            u = [],
            l = t.length,
            c =
              e ||
              (function (e, t, n) {
                for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                return n;
              })(h || "*", n.nodeType ? [n] : n, []),
            f = !d || (!e && h) ? c : Te(c, s, d, n, r),
            p = g ? (y || (e ? d : l || v) ? [] : t) : f;
          if ((g && g(f, p, n, r), v)) {
            (i = Te(p, u)), v(i, [], n, r), (o = i.length);
            while (o--) (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
          }
          if (e) {
            if (y || d) {
              if (y) {
                (i = []), (o = p.length);
                while (o--) (a = p[o]) && i.push((f[o] = a));
                y(null, (p = []), i, r);
              }
              o = p.length;
              while (o--)
                (a = p[o]) &&
                  -1 < (i = y ? P(e, a) : s[o]) &&
                  (e[i] = !(t[i] = a));
            }
          } else (p = Te(p === t ? p.splice(l, p.length) : p)), y ? y(null, t, p, r) : H.apply(t, p);
        })
      );
    }
    function Ee(e) {
      for (
        var i,
          t,
          n,
          r = e.length,
          o = b.relative[e[0].type],
          a = o || b.relative[" "],
          s = o ? 1 : 0,
          u = be(
            function (e) {
              return e === i;
            },
            a,
            !0
          ),
          l = be(
            function (e) {
              return -1 < P(i, e);
            },
            a,
            !0
          ),
          c = [
            function (e, t, n) {
              var r =
                (!o && (n || t !== w)) ||
                ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
              return (i = null), r;
            },
          ];
        s < r;
        s++
      )
        if ((t = b.relative[e[s].type])) c = [be(we(c), t)];
        else {
          if ((t = b.filter[e[s].type].apply(null, e[s].matches))[k]) {
            for (n = ++s; n < r; n++) if (b.relative[e[n].type]) break;
            return Ce(
              1 < s && we(c),
              1 < s &&
                xe(
                  e
                    .slice(0, s - 1)
                    .concat({ value: " " === e[s - 2].type ? "*" : "" })
                ).replace(B, "$1"),
              t,
              s < n && Ee(e.slice(s, n)),
              n < r && Ee((e = e.slice(n))),
              n < r && xe(e)
            );
          }
          c.push(t);
        }
      return we(c);
    }
    return (
      (me.prototype = b.filters = b.pseudos),
      (b.setFilters = new me()),
      (h = se.tokenize =
        function (e, t) {
          var n,
            r,
            i,
            o,
            a,
            s,
            u,
            l = x[e + " "];
          if (l) return t ? 0 : l.slice(0);
          (a = e), (s = []), (u = b.preFilter);
          while (a) {
            for (o in ((n && !(r = _.exec(a))) ||
              (r && (a = a.slice(r[0].length) || a), s.push((i = []))),
            (n = !1),
            (r = z.exec(a)) &&
              ((n = r.shift()),
              i.push({ value: n, type: r[0].replace(B, " ") }),
              (a = a.slice(n.length))),
            b.filter))
              !(r = G[o].exec(a)) ||
                (u[o] && !(r = u[o](r))) ||
                ((n = r.shift()),
                i.push({ value: n, type: o, matches: r }),
                (a = a.slice(n.length)));
            if (!n) break;
          }
          return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
        }),
      (f = se.compile =
        function (e, t) {
          var n,
            v,
            y,
            m,
            x,
            r,
            i = [],
            o = [],
            a = N[e + " "];
          if (!a) {
            t || (t = h(e)), (n = t.length);
            while (n--) (a = Ee(t[n]))[k] ? i.push(a) : o.push(a);
            (a = N(
              e,
              ((v = o),
              (m = 0 < (y = i).length),
              (x = 0 < v.length),
              (r = function (e, t, n, r, i) {
                var o,
                  a,
                  s,
                  u = 0,
                  l = "0",
                  c = e && [],
                  f = [],
                  p = w,
                  d = e || (x && b.find.TAG("*", i)),
                  h = (S += null == p ? 1 : Math.random() || 0.1),
                  g = d.length;
                for (
                  i && (w = t === C || t || i);
                  l !== g && null != (o = d[l]);
                  l++
                ) {
                  if (x && o) {
                    (a = 0), t || o.ownerDocument === C || (T(o), (n = !E));
                    while ((s = v[a++]))
                      if (s(o, t || C, n)) {
                        r.push(o);
                        break;
                      }
                    i && (S = h);
                  }
                  m && ((o = !s && o) && u--, e && c.push(o));
                }
                if (((u += l), m && l !== u)) {
                  a = 0;
                  while ((s = y[a++])) s(c, f, t, n);
                  if (e) {
                    if (0 < u) while (l--) c[l] || f[l] || (f[l] = q.call(r));
                    f = Te(f);
                  }
                  H.apply(r, f),
                    i &&
                      !e &&
                      0 < f.length &&
                      1 < u + y.length &&
                      se.uniqueSort(r);
                }
                return i && ((S = h), (w = p)), c;
              }),
              m ? le(r) : r)
            )).selector = e;
          }
          return a;
        }),
      (g = se.select =
        function (e, t, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l = "function" == typeof e && e,
            c = !r && h((e = l.selector || e));
          if (((n = n || []), 1 === c.length)) {
            if (
              2 < (o = c[0] = c[0].slice(0)).length &&
              "ID" === (a = o[0]).type &&
              9 === t.nodeType &&
              E &&
              b.relative[o[1].type]
            ) {
              if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0]))
                return n;
              l && (t = t.parentNode), (e = e.slice(o.shift().value.length));
            }
            i = G.needsContext.test(e) ? 0 : o.length;
            while (i--) {
              if (((a = o[i]), b.relative[(s = a.type)])) break;
              if (
                (u = b.find[s]) &&
                (r = u(
                  a.matches[0].replace(te, ne),
                  (ee.test(o[0].type) && ye(t.parentNode)) || t
                ))
              ) {
                if ((o.splice(i, 1), !(e = r.length && xe(o))))
                  return H.apply(n, r), n;
                break;
              }
            }
          }
          return (
            (l || f(e, c))(
              r,
              t,
              !E,
              n,
              !t || (ee.test(e) && ye(t.parentNode)) || t
            ),
            n
          );
        }),
      (d.sortStable = k.split("").sort(D).join("") === k),
      (d.detectDuplicates = !!l),
      T(),
      (d.sortDetached = ce(function (e) {
        return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
      })),
      ce(function (e) {
        return (
          (e.innerHTML = "<a href='#'></a>"),
          "#" === e.firstChild.getAttribute("href")
        );
      }) ||
        fe("type|href|height|width", function (e, t, n) {
          if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }),
      (d.attributes &&
        ce(function (e) {
          return (
            (e.innerHTML = "<input/>"),
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
          );
        })) ||
        fe("value", function (e, t, n) {
          if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }),
      ce(function (e) {
        return null == e.getAttribute("disabled");
      }) ||
        fe(R, function (e, t, n) {
          var r;
          if (!n)
            return !0 === e[t]
              ? t.toLowerCase()
              : (r = e.getAttributeNode(t)) && r.specified
              ? r.value
              : null;
        }),
      se
    );
  })(C);
  (k.find = h),
    (k.expr = h.selectors),
    (k.expr[":"] = k.expr.pseudos),
    (k.uniqueSort = k.unique = h.uniqueSort),
    (k.text = h.getText),
    (k.isXMLDoc = h.isXML),
    (k.contains = h.contains),
    (k.escapeSelector = h.escape);
  var T = function (e, t, n) {
      var r = [],
        i = void 0 !== n;
      while ((e = e[t]) && 9 !== e.nodeType)
        if (1 === e.nodeType) {
          if (i && k(e).is(n)) break;
          r.push(e);
        }
      return r;
    },
    S = function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    N = k.expr.match.needsContext;
  function A(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function j(e, n, r) {
    return m(n)
      ? k.grep(e, function (e, t) {
          return !!n.call(e, t, e) !== r;
        })
      : n.nodeType
      ? k.grep(e, function (e) {
          return (e === n) !== r;
        })
      : "string" != typeof n
      ? k.grep(e, function (e) {
          return -1 < i.call(n, e) !== r;
        })
      : k.filter(n, e, r);
  }
  (k.filter = function (e, t, n) {
    var r = t[0];
    return (
      n && (e = ":not(" + e + ")"),
      1 === t.length && 1 === r.nodeType
        ? k.find.matchesSelector(r, e)
          ? [r]
          : []
        : k.find.matches(
            e,
            k.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    k.fn.extend({
      find: function (e) {
        var t,
          n,
          r = this.length,
          i = this;
        if ("string" != typeof e)
          return this.pushStack(
            k(e).filter(function () {
              for (t = 0; t < r; t++) if (k.contains(i[t], this)) return !0;
            })
          );
        for (n = this.pushStack([]), t = 0; t < r; t++) k.find(e, i[t], n);
        return 1 < r ? k.uniqueSort(n) : n;
      },
      filter: function (e) {
        return this.pushStack(j(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(j(this, e || [], !0));
      },
      is: function (e) {
        return !!j(this, "string" == typeof e && N.test(e) ? k(e) : e || [], !1)
          .length;
      },
    });
  var q,
    L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((k.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;
    if (((n = n || q), "string" == typeof e)) {
      if (
        !(r =
          "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
            ? [null, e, null]
            : L.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (
          ((t = t instanceof k ? t[0] : t),
          k.merge(
            this,
            k.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)
          ),
          D.test(r[1]) && k.isPlainObject(t))
        )
          for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (
        (i = E.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : m(e)
      ? void 0 !== n.ready
        ? n.ready(e)
        : e(k)
      : k.makeArray(e, this);
  }).prototype = k.fn),
    (q = k(E));
  var H = /^(?:parents|prev(?:Until|All))/,
    O = { children: !0, contents: !0, next: !0, prev: !0 };
  function P(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType);
    return e;
  }
  k.fn.extend({
    has: function (e) {
      var t = k(e, this),
        n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) if (k.contains(this, t[e])) return !0;
      });
    },
    closest: function (e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        a = "string" != typeof e && k(e);
      if (!N.test(e))
        for (; r < i; r++)
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (a
                ? -1 < a.index(n)
                : 1 === n.nodeType && k.find.matchesSelector(n, e))
            ) {
              o.push(n);
              break;
            }
      return this.pushStack(1 < o.length ? k.uniqueSort(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? i.call(k(e), this[0])
          : i.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    k.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return T(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return T(e, "parentNode", n);
        },
        next: function (e) {
          return P(e, "nextSibling");
        },
        prev: function (e) {
          return P(e, "previousSibling");
        },
        nextAll: function (e) {
          return T(e, "nextSibling");
        },
        prevAll: function (e) {
          return T(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return T(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return T(e, "previousSibling", n);
        },
        siblings: function (e) {
          return S((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return S(e.firstChild);
        },
        contents: function (e) {
          return "undefined" != typeof e.contentDocument
            ? e.contentDocument
            : (A(e, "template") && (e = e.content || e),
              k.merge([], e.childNodes));
        },
      },
      function (r, i) {
        k.fn[r] = function (e, t) {
          var n = k.map(this, i, e);
          return (
            "Until" !== r.slice(-5) && (t = e),
            t && "string" == typeof t && (n = k.filter(t, n)),
            1 < this.length &&
              (O[r] || k.uniqueSort(n), H.test(r) && n.reverse()),
            this.pushStack(n)
          );
        };
      }
    );
  var R = /[^\x20\t\r\n\f]+/g;
  function M(e) {
    return e;
  }
  function I(e) {
    throw e;
  }
  function W(e, t, n, r) {
    var i;
    try {
      e && m((i = e.promise))
        ? i.call(e).done(t).fail(n)
        : e && m((i = e.then))
        ? i.call(e, t, n)
        : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }
  (k.Callbacks = function (r) {
    var e, n;
    r =
      "string" == typeof r
        ? ((e = r),
          (n = {}),
          k.each(e.match(R) || [], function (e, t) {
            n[t] = !0;
          }),
          n)
        : k.extend({}, r);
    var i,
      t,
      o,
      a,
      s = [],
      u = [],
      l = -1,
      c = function () {
        for (a = a || r.once, o = i = !0; u.length; l = -1) {
          t = u.shift();
          while (++l < s.length)
            !1 === s[l].apply(t[0], t[1]) &&
              r.stopOnFalse &&
              ((l = s.length), (t = !1));
        }
        r.memory || (t = !1), (i = !1), a && (s = t ? [] : "");
      },
      f = {
        add: function () {
          return (
            s &&
              (t && !i && ((l = s.length - 1), u.push(t)),
              (function n(e) {
                k.each(e, function (e, t) {
                  m(t)
                    ? (r.unique && f.has(t)) || s.push(t)
                    : t && t.length && "string" !== w(t) && n(t);
                });
              })(arguments),
              t && !i && c()),
            this
          );
        },
        remove: function () {
          return (
            k.each(arguments, function (e, t) {
              var n;
              while (-1 < (n = k.inArray(t, s, n)))
                s.splice(n, 1), n <= l && l--;
            }),
            this
          );
        },
        has: function (e) {
          return e ? -1 < k.inArray(e, s) : 0 < s.length;
        },
        empty: function () {
          return s && (s = []), this;
        },
        disable: function () {
          return (a = u = []), (s = t = ""), this;
        },
        disabled: function () {
          return !s;
        },
        lock: function () {
          return (a = u = []), t || i || (s = t = ""), this;
        },
        locked: function () {
          return !!a;
        },
        fireWith: function (e, t) {
          return (
            a ||
              ((t = [e, (t = t || []).slice ? t.slice() : t]),
              u.push(t),
              i || c()),
            this
          );
        },
        fire: function () {
          return f.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!o;
        },
      };
    return f;
  }),
    k.extend({
      Deferred: function (e) {
        var o = [
            [
              "notify",
              "progress",
              k.Callbacks("memory"),
              k.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              k.Callbacks("once memory"),
              k.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              k.Callbacks("once memory"),
              k.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          i = "pending",
          a = {
            state: function () {
              return i;
            },
            always: function () {
              return s.done(arguments).fail(arguments), this;
            },
            catch: function (e) {
              return a.then(null, e);
            },
            pipe: function () {
              var i = arguments;
              return k
                .Deferred(function (r) {
                  k.each(o, function (e, t) {
                    var n = m(i[t[4]]) && i[t[4]];
                    s[t[1]](function () {
                      var e = n && n.apply(this, arguments);
                      e && m(e.promise)
                        ? e
                            .promise()
                            .progress(r.notify)
                            .done(r.resolve)
                            .fail(r.reject)
                        : r[t[0] + "With"](this, n ? [e] : arguments);
                    });
                  }),
                    (i = null);
                })
                .promise();
            },
            then: function (t, n, r) {
              var u = 0;
              function l(i, o, a, s) {
                return function () {
                  var n = this,
                    r = arguments,
                    e = function () {
                      var e, t;
                      if (!(i < u)) {
                        if ((e = a.apply(n, r)) === o.promise())
                          throw new TypeError("Thenable self-resolution");
                        (t =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          m(t)
                            ? s
                              ? t.call(e, l(u, o, M, s), l(u, o, I, s))
                              : (u++,
                                t.call(
                                  e,
                                  l(u, o, M, s),
                                  l(u, o, I, s),
                                  l(u, o, M, o.notifyWith)
                                ))
                            : (a !== M && ((n = void 0), (r = [e])),
                              (s || o.resolveWith)(n, r));
                      }
                    },
                    t = s
                      ? e
                      : function () {
                          try {
                            e();
                          } catch (e) {
                            k.Deferred.exceptionHook &&
                              k.Deferred.exceptionHook(e, t.stackTrace),
                              u <= i + 1 &&
                                (a !== I && ((n = void 0), (r = [e])),
                                o.rejectWith(n, r));
                          }
                        };
                  i
                    ? t()
                    : (k.Deferred.getStackHook &&
                        (t.stackTrace = k.Deferred.getStackHook()),
                      C.setTimeout(t));
                };
              }
              return k
                .Deferred(function (e) {
                  o[0][3].add(l(0, e, m(r) ? r : M, e.notifyWith)),
                    o[1][3].add(l(0, e, m(t) ? t : M)),
                    o[2][3].add(l(0, e, m(n) ? n : I));
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? k.extend(e, a) : a;
            },
          },
          s = {};
        return (
          k.each(o, function (e, t) {
            var n = t[2],
              r = t[5];
            (a[t[1]] = n.add),
              r &&
                n.add(
                  function () {
                    i = r;
                  },
                  o[3 - e][2].disable,
                  o[3 - e][3].disable,
                  o[0][2].lock,
                  o[0][3].lock
                ),
              n.add(t[3].fire),
              (s[t[0]] = function () {
                return (
                  s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                );
              }),
              (s[t[0] + "With"] = n.fireWith);
          }),
          a.promise(s),
          e && e.call(s, s),
          s
        );
      },
      when: function (e) {
        var n = arguments.length,
          t = n,
          r = Array(t),
          i = s.call(arguments),
          o = k.Deferred(),
          a = function (t) {
            return function (e) {
              (r[t] = this),
                (i[t] = 1 < arguments.length ? s.call(arguments) : e),
                --n || o.resolveWith(r, i);
            };
          };
        if (
          n <= 1 &&
          (W(e, o.done(a(t)).resolve, o.reject, !n),
          "pending" === o.state() || m(i[t] && i[t].then))
        )
          return o.then();
        while (t--) W(i[t], a(t), o.reject);
        return o.promise();
      },
    });
  var $ = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (k.Deferred.exceptionHook = function (e, t) {
    C.console &&
      C.console.warn &&
      e &&
      $.test(e.name) &&
      C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }),
    (k.readyException = function (e) {
      C.setTimeout(function () {
        throw e;
      });
    });
  var F = k.Deferred();
  function B() {
    E.removeEventListener("DOMContentLoaded", B),
      C.removeEventListener("load", B),
      k.ready();
  }
  (k.fn.ready = function (e) {
    return (
      F.then(e)["catch"](function (e) {
        k.readyException(e);
      }),
      this
    );
  }),
    k.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (!0 === e ? --k.readyWait : k.isReady) ||
          ((k.isReady = !0) !== e && 0 < --k.readyWait) ||
          F.resolveWith(E, [k]);
      },
    }),
    (k.ready.then = F.then),
    "complete" === E.readyState ||
    ("loading" !== E.readyState && !E.documentElement.doScroll)
      ? C.setTimeout(k.ready)
      : (E.addEventListener("DOMContentLoaded", B),
        C.addEventListener("load", B));
  var _ = function (e, t, n, r, i, o, a) {
      var s = 0,
        u = e.length,
        l = null == n;
      if ("object" === w(n))
        for (s in ((i = !0), n)) _(e, t, s, n[s], !0, o, a);
      else if (
        void 0 !== r &&
        ((i = !0),
        m(r) || (a = !0),
        l &&
          (a
            ? (t.call(e, r), (t = null))
            : ((l = t),
              (t = function (e, t, n) {
                return l.call(k(e), n);
              }))),
        t)
      )
        for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    },
    z = /^-ms-/,
    U = /-([a-z])/g;
  function X(e, t) {
    return t.toUpperCase();
  }
  function V(e) {
    return e.replace(z, "ms-").replace(U, X);
  }
  var G = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function Y() {
    this.expando = k.expando + Y.uid++;
  }
  (Y.uid = 1),
    (Y.prototype = {
      cache: function (e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            G(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function (e, t, n) {
        var r,
          i = this.cache(e);
        if ("string" == typeof t) i[V(t)] = n;
        else for (r in t) i[V(r)] = t[r];
        return i;
      },
      get: function (e, t) {
        return void 0 === t
          ? this.cache(e)
          : e[this.expando] && e[this.expando][V(t)];
      },
      access: function (e, t, n) {
        return void 0 === t || (t && "string" == typeof t && void 0 === n)
          ? this.get(e, t)
          : (this.set(e, t, n), void 0 !== n ? n : t);
      },
      remove: function (e, t) {
        var n,
          r = e[this.expando];
        if (void 0 !== r) {
          if (void 0 !== t) {
            n = (t = Array.isArray(t)
              ? t.map(V)
              : (t = V(t)) in r
              ? [t]
              : t.match(R) || []).length;
            while (n--) delete r[t[n]];
          }
          (void 0 === t || k.isEmptyObject(r)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function (e) {
        var t = e[this.expando];
        return void 0 !== t && !k.isEmptyObject(t);
      },
    });
  var Q = new Y(),
    J = new Y(),
    K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Z = /[A-Z]/g;
  function ee(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType)
      if (
        ((r = "data-" + t.replace(Z, "-$&").toLowerCase()),
        "string" == typeof (n = e.getAttribute(r)))
      ) {
        try {
          n =
            "true" === (i = n) ||
            ("false" !== i &&
              ("null" === i
                ? null
                : i === +i + ""
                ? +i
                : K.test(i)
                ? JSON.parse(i)
                : i));
        } catch (e) {}
        J.set(e, t, n);
      } else n = void 0;
    return n;
  }
  k.extend({
    hasData: function (e) {
      return J.hasData(e) || Q.hasData(e);
    },
    data: function (e, t, n) {
      return J.access(e, t, n);
    },
    removeData: function (e, t) {
      J.remove(e, t);
    },
    _data: function (e, t, n) {
      return Q.access(e, t, n);
    },
    _removeData: function (e, t) {
      Q.remove(e, t);
    },
  }),
    k.fn.extend({
      data: function (n, e) {
        var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;
        if (void 0 === n) {
          if (
            this.length &&
            ((i = J.get(o)), 1 === o.nodeType && !Q.get(o, "hasDataAttrs"))
          ) {
            t = a.length;
            while (t--)
              a[t] &&
                0 === (r = a[t].name).indexOf("data-") &&
                ((r = V(r.slice(5))), ee(o, r, i[r]));
            Q.set(o, "hasDataAttrs", !0);
          }
          return i;
        }
        return "object" == typeof n
          ? this.each(function () {
              J.set(this, n);
            })
          : _(
              this,
              function (e) {
                var t;
                if (o && void 0 === e)
                  return void 0 !== (t = J.get(o, n))
                    ? t
                    : void 0 !== (t = ee(o, n))
                    ? t
                    : void 0;
                this.each(function () {
                  J.set(this, n, e);
                });
              },
              null,
              e,
              1 < arguments.length,
              null,
              !0
            );
      },
      removeData: function (e) {
        return this.each(function () {
          J.remove(this, e);
        });
      },
    }),
    k.extend({
      queue: function (e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (r = Q.get(e, t)),
            n &&
              (!r || Array.isArray(n)
                ? (r = Q.access(e, t, k.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = k.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = k._queueHooks(e, t);
        "inprogress" === i && ((i = n.shift()), r--),
          i &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(
              e,
              function () {
                k.dequeue(e, t);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          Q.get(e, n) ||
          Q.access(e, n, {
            empty: k.Callbacks("once memory").add(function () {
              Q.remove(e, [t + "queue", n]);
            }),
          })
        );
      },
    }),
    k.fn.extend({
      queue: function (t, n) {
        var e = 2;
        return (
          "string" != typeof t && ((n = t), (t = "fx"), e--),
          arguments.length < e
            ? k.queue(this[0], t)
            : void 0 === n
            ? this
            : this.each(function () {
                var e = k.queue(this, t, n);
                k._queueHooks(this, t),
                  "fx" === t && "inprogress" !== e[0] && k.dequeue(this, t);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          k.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var n,
          r = 1,
          i = k.Deferred(),
          o = this,
          a = this.length,
          s = function () {
            --r || i.resolveWith(o, [o]);
          };
        "string" != typeof e && ((t = e), (e = void 0)), (e = e || "fx");
        while (a--)
          (n = Q.get(o[a], e + "queueHooks")) &&
            n.empty &&
            (r++, n.empty.add(s));
        return s(), i.promise(t);
      },
    });
  var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ne = new RegExp("^(?:([+-])=|)(" + te + ")([a-z%]*)$", "i"),
    re = ["Top", "Right", "Bottom", "Left"],
    ie = E.documentElement,
    oe = function (e) {
      return k.contains(e.ownerDocument, e);
    },
    ae = { composed: !0 };
  ie.getRootNode &&
    (oe = function (e) {
      return (
        k.contains(e.ownerDocument, e) || e.getRootNode(ae) === e.ownerDocument
      );
    });
  var se = function (e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display && oe(e) && "none" === k.css(e, "display"))
      );
    },
    ue = function (e, t, n, r) {
      var i,
        o,
        a = {};
      for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
      for (o in ((i = n.apply(e, r || [])), t)) e.style[o] = a[o];
      return i;
    };
  function le(e, t, n, r) {
    var i,
      o,
      a = 20,
      s = r
        ? function () {
            return r.cur();
          }
        : function () {
            return k.css(e, t, "");
          },
      u = s(),
      l = (n && n[3]) || (k.cssNumber[t] ? "" : "px"),
      c =
        e.nodeType &&
        (k.cssNumber[t] || ("px" !== l && +u)) &&
        ne.exec(k.css(e, t));
    if (c && c[3] !== l) {
      (u /= 2), (l = l || c[3]), (c = +u || 1);
      while (a--)
        k.style(e, t, c + l),
          (1 - o) * (1 - (o = s() / u || 0.5)) <= 0 && (a = 0),
          (c /= o);
      (c *= 2), k.style(e, t, c + l), (n = n || []);
    }
    return (
      n &&
        ((c = +c || +u || 0),
        (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
        r && ((r.unit = l), (r.start = c), (r.end = i))),
      i
    );
  }
  var ce = {};
  function fe(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
      (r = e[c]).style &&
        ((n = r.style.display),
        t
          ? ("none" === n &&
              ((l[c] = Q.get(r, "display") || null),
              l[c] || (r.style.display = "")),
            "" === r.style.display &&
              se(r) &&
              (l[c] =
                ((u = a = o = void 0),
                (a = (i = r).ownerDocument),
                (s = i.nodeName),
                (u = ce[s]) ||
                  ((o = a.body.appendChild(a.createElement(s))),
                  (u = k.css(o, "display")),
                  o.parentNode.removeChild(o),
                  "none" === u && (u = "block"),
                  (ce[s] = u)))))
          : "none" !== n && ((l[c] = "none"), Q.set(r, "display", n)));
    for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
    return e;
  }
  k.fn.extend({
    show: function () {
      return fe(this, !0);
    },
    hide: function () {
      return fe(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            se(this) ? k(this).show() : k(this).hide();
          });
    },
  });
  var pe = /^(?:checkbox|radio)$/i,
    de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    he = /^$|^module$|\/(?:java|ecma)script/i,
    ge = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
  function ve(e, t) {
    var n;
    return (
      (n =
        "undefined" != typeof e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : "undefined" != typeof e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : []),
      void 0 === t || (t && A(e, t)) ? k.merge([e], n) : n
    );
  }
  function ye(e, t) {
    for (var n = 0, r = e.length; n < r; n++)
      Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"));
  }
  (ge.optgroup = ge.option),
    (ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead),
    (ge.th = ge.td);
  var me,
    xe,
    be = /<|&#?\w+;/;
  function we(e, t, n, r, i) {
    for (
      var o,
        a,
        s,
        u,
        l,
        c,
        f = t.createDocumentFragment(),
        p = [],
        d = 0,
        h = e.length;
      d < h;
      d++
    )
      if ((o = e[d]) || 0 === o)
        if ("object" === w(o)) k.merge(p, o.nodeType ? [o] : o);
        else if (be.test(o)) {
          (a = a || f.appendChild(t.createElement("div"))),
            (s = (de.exec(o) || ["", ""])[1].toLowerCase()),
            (u = ge[s] || ge._default),
            (a.innerHTML = u[1] + k.htmlPrefilter(o) + u[2]),
            (c = u[0]);
          while (c--) a = a.lastChild;
          k.merge(p, a.childNodes), ((a = f.firstChild).textContent = "");
        } else p.push(t.createTextNode(o));
    (f.textContent = ""), (d = 0);
    while ((o = p[d++]))
      if (r && -1 < k.inArray(o, r)) i && i.push(o);
      else if (
        ((l = oe(o)), (a = ve(f.appendChild(o), "script")), l && ye(a), n)
      ) {
        c = 0;
        while ((o = a[c++])) he.test(o.type || "") && n.push(o);
      }
    return f;
  }
  (me = E.createDocumentFragment().appendChild(E.createElement("div"))),
    (xe = E.createElement("input")).setAttribute("type", "radio"),
    xe.setAttribute("checked", "checked"),
    xe.setAttribute("name", "t"),
    me.appendChild(xe),
    (y.checkClone = me.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (me.innerHTML = "<textarea>x</textarea>"),
    (y.noCloneChecked = !!me.cloneNode(!0).lastChild.defaultValue);
  var Te = /^key/,
    Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Ee = /^([^.]*)(?:\.(.+)|)/;
  function ke() {
    return !0;
  }
  function Se() {
    return !1;
  }
  function Ne(e, t) {
    return (
      (e ===
        (function () {
          try {
            return E.activeElement;
          } catch (e) {}
        })()) ==
      ("focus" === t)
    );
  }
  function Ae(e, t, n, r, i, o) {
    var a, s;
    if ("object" == typeof t) {
      for (s in ("string" != typeof n && ((r = r || n), (n = void 0)), t))
        Ae(e, s, n, r, t[s], o);
      return e;
    }
    if (
      (null == r && null == i
        ? ((i = n), (r = n = void 0))
        : null == i &&
          ("string" == typeof n
            ? ((i = r), (r = void 0))
            : ((i = r), (r = n), (n = void 0))),
      !1 === i)
    )
      i = Se;
    else if (!i) return e;
    return (
      1 === o &&
        ((a = i),
        ((i = function (e) {
          return k().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = k.guid++))),
      e.each(function () {
        k.event.add(this, t, i, r, n);
      })
    );
  }
  function De(e, i, o) {
    o
      ? (Q.set(e, i, !1),
        k.event.add(e, i, {
          namespace: !1,
          handler: function (e) {
            var t,
              n,
              r = Q.get(this, i);
            if (1 & e.isTrigger && this[i]) {
              if (r.length)
                (k.event.special[i] || {}).delegateType && e.stopPropagation();
              else if (
                ((r = s.call(arguments)),
                Q.set(this, i, r),
                (t = o(this, i)),
                this[i](),
                r !== (n = Q.get(this, i)) || t ? Q.set(this, i, !1) : (n = {}),
                r !== n)
              )
                return (
                  e.stopImmediatePropagation(), e.preventDefault(), n.value
                );
            } else
              r.length &&
                (Q.set(this, i, {
                  value: k.event.trigger(
                    k.extend(r[0], k.Event.prototype),
                    r.slice(1),
                    this
                  ),
                }),
                e.stopImmediatePropagation());
          },
        }))
      : void 0 === Q.get(e, i) && k.event.add(e, i, ke);
  }
  (k.event = {
    global: {},
    add: function (t, e, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = Q.get(t);
      if (v) {
        n.handler && ((n = (o = n).handler), (i = o.selector)),
          i && k.find.matchesSelector(ie, i),
          n.guid || (n.guid = k.guid++),
          (u = v.events) || (u = v.events = {}),
          (a = v.handle) ||
            (a = v.handle =
              function (e) {
                return "undefined" != typeof k && k.event.triggered !== e.type
                  ? k.event.dispatch.apply(t, arguments)
                  : void 0;
              }),
          (l = (e = (e || "").match(R) || [""]).length);
        while (l--)
          (d = g = (s = Ee.exec(e[l]) || [])[1]),
            (h = (s[2] || "").split(".").sort()),
            d &&
              ((f = k.event.special[d] || {}),
              (d = (i ? f.delegateType : f.bindType) || d),
              (f = k.event.special[d] || {}),
              (c = k.extend(
                {
                  type: d,
                  origType: g,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: i,
                  needsContext: i && k.expr.match.needsContext.test(i),
                  namespace: h.join("."),
                },
                o
              )),
              (p = u[d]) ||
                (((p = u[d] = []).delegateCount = 0),
                (f.setup && !1 !== f.setup.call(t, r, h, a)) ||
                  (t.addEventListener && t.addEventListener(d, a))),
              f.add &&
                (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)),
              i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
              (k.event.global[d] = !0));
      }
    },
    remove: function (e, t, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = Q.hasData(e) && Q.get(e);
      if (v && (u = v.events)) {
        l = (t = (t || "").match(R) || [""]).length;
        while (l--)
          if (
            ((d = g = (s = Ee.exec(t[l]) || [])[1]),
            (h = (s[2] || "").split(".").sort()),
            d)
          ) {
            (f = k.event.special[d] || {}),
              (p = u[(d = (r ? f.delegateType : f.bindType) || d)] || []),
              (s =
                s[2] &&
                new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")),
              (a = o = p.length);
            while (o--)
              (c = p[o]),
                (!i && g !== c.origType) ||
                  (n && n.guid !== c.guid) ||
                  (s && !s.test(c.namespace)) ||
                  (r && r !== c.selector && ("**" !== r || !c.selector)) ||
                  (p.splice(o, 1),
                  c.selector && p.delegateCount--,
                  f.remove && f.remove.call(e, c));
            a &&
              !p.length &&
              ((f.teardown && !1 !== f.teardown.call(e, h, v.handle)) ||
                k.removeEvent(e, d, v.handle),
              delete u[d]);
          } else for (d in u) k.event.remove(e, d + t[l], n, r, !0);
        k.isEmptyObject(u) && Q.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = k.event.fix(e),
        u = new Array(arguments.length),
        l = (Q.get(this, "events") || {})[s.type] || [],
        c = k.event.special[s.type] || {};
      for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
      if (
        ((s.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, s))
      ) {
        (a = k.event.handlers.call(this, s, l)), (t = 0);
        while ((i = a[t++]) && !s.isPropagationStopped()) {
          (s.currentTarget = i.elem), (n = 0);
          while ((o = i.handlers[n++]) && !s.isImmediatePropagationStopped())
            (s.rnamespace &&
              !1 !== o.namespace &&
              !s.rnamespace.test(o.namespace)) ||
              ((s.handleObj = o),
              (s.data = o.data),
              void 0 !==
                (r = (
                  (k.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, u)) &&
                !1 === (s.result = r) &&
                (s.preventDefault(), s.stopPropagation()));
        }
        return c.postDispatch && c.postDispatch.call(this, s), s.result;
      }
    },
    handlers: function (e, t) {
      var n,
        r,
        i,
        o,
        a,
        s = [],
        u = t.delegateCount,
        l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
        for (; l !== this; l = l.parentNode || this)
          if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
            for (o = [], a = {}, n = 0; n < u; n++)
              void 0 === a[(i = (r = t[n]).selector + " ")] &&
                (a[i] = r.needsContext
                  ? -1 < k(i, this).index(l)
                  : k.find(i, this, null, [l]).length),
                a[i] && o.push(r);
            o.length && s.push({ elem: l, handlers: o });
          }
      return (
        (l = this), u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s
      );
    },
    addProp: function (t, e) {
      Object.defineProperty(k.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: m(e)
          ? function () {
              if (this.originalEvent) return e(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[t];
            },
        set: function (e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e,
          });
        },
      });
    },
    fix: function (e) {
      return e[k.expando] ? e : new k.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (e) {
          var t = this || e;
          return (
            pe.test(t.type) && t.click && A(t, "input") && De(t, "click", ke),
            !1
          );
        },
        trigger: function (e) {
          var t = this || e;
          return (
            pe.test(t.type) && t.click && A(t, "input") && De(t, "click"), !0
          );
        },
        _default: function (e) {
          var t = e.target;
          return (
            (pe.test(t.type) &&
              t.click &&
              A(t, "input") &&
              Q.get(t, "click")) ||
            A(t, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (k.removeEvent = function (e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n);
    }),
    (k.Event = function (e, t) {
      if (!(this instanceof k.Event)) return new k.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (void 0 === e.defaultPrevented && !1 === e.returnValue)
              ? ke
              : Se),
          (this.target =
            e.target && 3 === e.target.nodeType
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && k.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[k.expando] = !0);
    }),
    (k.Event.prototype = {
      constructor: k.Event,
      isDefaultPrevented: Se,
      isPropagationStopped: Se,
      isImmediatePropagationStopped: Se,
      isSimulated: !1,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = ke),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = ke),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = ke),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    k.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (e) {
          var t = e.button;
          return null == e.which && Te.test(e.type)
            ? null != e.charCode
              ? e.charCode
              : e.keyCode
            : !e.which && void 0 !== t && Ce.test(e.type)
            ? 1 & t
              ? 1
              : 2 & t
              ? 3
              : 4 & t
              ? 2
              : 0
            : e.which;
        },
      },
      k.event.addProp
    ),
    k.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
      k.event.special[e] = {
        setup: function () {
          return De(this, e, Ne), !1;
        },
        trigger: function () {
          return De(this, e), !0;
        },
        delegateType: t,
      };
    }),
    k.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, i) {
        k.event.special[e] = {
          delegateType: i,
          bindType: i,
          handle: function (e) {
            var t,
              n = e.relatedTarget,
              r = e.handleObj;
            return (
              (n && (n === this || k.contains(this, n))) ||
                ((e.type = r.origType),
                (t = r.handler.apply(this, arguments)),
                (e.type = i)),
              t
            );
          },
        };
      }
    ),
    k.fn.extend({
      on: function (e, t, n, r) {
        return Ae(this, e, t, n, r);
      },
      one: function (e, t, n, r) {
        return Ae(this, e, t, n, r, 1);
      },
      off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            k(e.delegateTarget).off(
              r.namespace ? r.origType + "." + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (i in e) this.off(i, t, e[i]);
          return this;
        }
        return (
          (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
          !1 === n && (n = Se),
          this.each(function () {
            k.event.remove(this, e, n, t);
          })
        );
      },
    });
  var je =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    qe = /<script|<style|<link/i,
    Le = /checked\s*(?:[^=]|=\s*.checked.)/i,
    He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function Oe(e, t) {
    return (
      (A(e, "table") &&
        A(11 !== t.nodeType ? t : t.firstChild, "tr") &&
        k(e).children("tbody")[0]) ||
      e
    );
  }
  function Pe(e) {
    return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
  }
  function Re(e) {
    return (
      "true/" === (e.type || "").slice(0, 5)
        ? (e.type = e.type.slice(5))
        : e.removeAttribute("type"),
      e
    );
  }
  function Me(e, t) {
    var n, r, i, o, a, s, u, l;
    if (1 === t.nodeType) {
      if (
        Q.hasData(e) &&
        ((o = Q.access(e)), (a = Q.set(t, o)), (l = o.events))
      )
        for (i in (delete a.handle, (a.events = {}), l))
          for (n = 0, r = l[i].length; n < r; n++) k.event.add(t, i, l[i][n]);
      J.hasData(e) && ((s = J.access(e)), (u = k.extend({}, s)), J.set(t, u));
    }
  }
  function Ie(n, r, i, o) {
    r = g.apply([], r);
    var e,
      t,
      a,
      s,
      u,
      l,
      c = 0,
      f = n.length,
      p = f - 1,
      d = r[0],
      h = m(d);
    if (h || (1 < f && "string" == typeof d && !y.checkClone && Le.test(d)))
      return n.each(function (e) {
        var t = n.eq(e);
        h && (r[0] = d.call(this, e, t.html())), Ie(t, r, i, o);
      });
    if (
      f &&
      ((t = (e = we(r, n[0].ownerDocument, !1, n, o)).firstChild),
      1 === e.childNodes.length && (e = t),
      t || o)
    ) {
      for (s = (a = k.map(ve(e, "script"), Pe)).length; c < f; c++)
        (u = e),
          c !== p &&
            ((u = k.clone(u, !0, !0)), s && k.merge(a, ve(u, "script"))),
          i.call(n[c], u, c);
      if (s)
        for (l = a[a.length - 1].ownerDocument, k.map(a, Re), c = 0; c < s; c++)
          (u = a[c]),
            he.test(u.type || "") &&
              !Q.access(u, "globalEval") &&
              k.contains(l, u) &&
              (u.src && "module" !== (u.type || "").toLowerCase()
                ? k._evalUrl &&
                  !u.noModule &&
                  k._evalUrl(u.src, {
                    nonce: u.nonce || u.getAttribute("nonce"),
                  })
                : b(u.textContent.replace(He, ""), u, l));
    }
    return n;
  }
  function We(e, t, n) {
    for (var r, i = t ? k.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || k.cleanData(ve(r)),
        r.parentNode &&
          (n && oe(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
    return e;
  }
  k.extend({
    htmlPrefilter: function (e) {
      return e.replace(je, "<$1></$2>");
    },
    clone: function (e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c = e.cloneNode(!0),
        f = oe(e);
      if (
        !(
          y.noCloneChecked ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          k.isXMLDoc(e)
        )
      )
        for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++)
          (s = o[r]),
            (u = a[r]),
            void 0,
            "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type)
              ? (u.checked = s.checked)
              : ("input" !== l && "textarea" !== l) ||
                (u.defaultValue = s.defaultValue);
      if (t)
        if (n)
          for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++)
            Me(o[r], a[r]);
        else Me(e, c);
      return (
        0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c
      );
    },
    cleanData: function (e) {
      for (var t, n, r, i = k.event.special, o = 0; void 0 !== (n = e[o]); o++)
        if (G(n)) {
          if ((t = n[Q.expando])) {
            if (t.events)
              for (r in t.events)
                i[r] ? k.event.remove(n, r) : k.removeEvent(n, r, t.handle);
            n[Q.expando] = void 0;
          }
          n[J.expando] && (n[J.expando] = void 0);
        }
    },
  }),
    k.fn.extend({
      detach: function (e) {
        return We(this, e, !0);
      },
      remove: function (e) {
        return We(this, e);
      },
      text: function (e) {
        return _(
          this,
          function (e) {
            return void 0 === e
              ? k.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return Ie(this, arguments, function (e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            Oe(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return Ie(this, arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = Oe(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return Ie(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return Ie(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (k.cleanData(ve(e, !1)), (e.textContent = ""));
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return k.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return _(
          this,
          function (e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              "string" == typeof e &&
              !qe.test(e) &&
              !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = k.htmlPrefilter(e);
              try {
                for (; n < r; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (k.cleanData(ve(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var n = [];
        return Ie(
          this,
          arguments,
          function (e) {
            var t = this.parentNode;
            k.inArray(this, n) < 0 &&
              (k.cleanData(ve(this)), t && t.replaceChild(e, this));
          },
          n
        );
      },
    }),
    k.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, a) {
        k.fn[e] = function (e) {
          for (var t, n = [], r = k(e), i = r.length - 1, o = 0; o <= i; o++)
            (t = o === i ? this : this.clone(!0)),
              k(r[o])[a](t),
              u.apply(n, t.get());
          return this.pushStack(n);
        };
      }
    );
  var $e = new RegExp("^(" + te + ")(?!px)[a-z%]+$", "i"),
    Fe = function (e) {
      var t = e.ownerDocument.defaultView;
      return (t && t.opener) || (t = C), t.getComputedStyle(e);
    },
    Be = new RegExp(re.join("|"), "i");
  function _e(e, t, n) {
    var r,
      i,
      o,
      a,
      s = e.style;
    return (
      (n = n || Fe(e)) &&
        ("" !== (a = n.getPropertyValue(t) || n[t]) ||
          oe(e) ||
          (a = k.style(e, t)),
        !y.pixelBoxStyles() &&
          $e.test(a) &&
          Be.test(t) &&
          ((r = s.width),
          (i = s.minWidth),
          (o = s.maxWidth),
          (s.minWidth = s.maxWidth = s.width = a),
          (a = n.width),
          (s.width = r),
          (s.minWidth = i),
          (s.maxWidth = o))),
      void 0 !== a ? a + "" : a
    );
  }
  function ze(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function e() {
      if (u) {
        (s.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (u.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          ie.appendChild(s).appendChild(u);
        var e = C.getComputedStyle(u);
        (n = "1%" !== e.top),
          (a = 12 === t(e.marginLeft)),
          (u.style.right = "60%"),
          (o = 36 === t(e.right)),
          (r = 36 === t(e.width)),
          (u.style.position = "absolute"),
          (i = 12 === t(u.offsetWidth / 3)),
          ie.removeChild(s),
          (u = null);
      }
    }
    function t(e) {
      return Math.round(parseFloat(e));
    }
    var n,
      r,
      i,
      o,
      a,
      s = E.createElement("div"),
      u = E.createElement("div");
    u.style &&
      ((u.style.backgroundClip = "content-box"),
      (u.cloneNode(!0).style.backgroundClip = ""),
      (y.clearCloneStyle = "content-box" === u.style.backgroundClip),
      k.extend(y, {
        boxSizingReliable: function () {
          return e(), r;
        },
        pixelBoxStyles: function () {
          return e(), o;
        },
        pixelPosition: function () {
          return e(), n;
        },
        reliableMarginLeft: function () {
          return e(), a;
        },
        scrollboxSize: function () {
          return e(), i;
        },
      }));
  })();
  var Ue = ["Webkit", "Moz", "ms"],
    Xe = E.createElement("div").style,
    Ve = {};
  function Ge(e) {
    var t = k.cssProps[e] || Ve[e];
    return (
      t ||
      (e in Xe
        ? e
        : (Ve[e] =
            (function (e) {
              var t = e[0].toUpperCase() + e.slice(1),
                n = Ue.length;
              while (n--) if ((e = Ue[n] + t) in Xe) return e;
            })(e) || e))
    );
  }
  var Ye = /^(none|table(?!-c[ea]).+)/,
    Qe = /^--/,
    Je = { position: "absolute", visibility: "hidden", display: "block" },
    Ke = { letterSpacing: "0", fontWeight: "400" };
  function Ze(e, t, n) {
    var r = ne.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }
  function et(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
      s = 0,
      u = 0;
    if (n === (r ? "border" : "content")) return 0;
    for (; a < 4; a += 2)
      "margin" === n && (u += k.css(e, n + re[a], !0, i)),
        r
          ? ("content" === n && (u -= k.css(e, "padding" + re[a], !0, i)),
            "margin" !== n &&
              (u -= k.css(e, "border" + re[a] + "Width", !0, i)))
          : ((u += k.css(e, "padding" + re[a], !0, i)),
            "padding" !== n
              ? (u += k.css(e, "border" + re[a] + "Width", !0, i))
              : (s += k.css(e, "border" + re[a] + "Width", !0, i)));
    return (
      !r &&
        0 <= o &&
        (u +=
          Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - 0.5
            )
          ) || 0),
      u
    );
  }
  function tt(e, t, n) {
    var r = Fe(e),
      i =
        (!y.boxSizingReliable() || n) &&
        "border-box" === k.css(e, "boxSizing", !1, r),
      o = i,
      a = _e(e, t, r),
      s = "offset" + t[0].toUpperCase() + t.slice(1);
    if ($e.test(a)) {
      if (!n) return a;
      a = "auto";
    }
    return (
      ((!y.boxSizingReliable() && i) ||
        "auto" === a ||
        (!parseFloat(a) && "inline" === k.css(e, "display", !1, r))) &&
        e.getClientRects().length &&
        ((i = "border-box" === k.css(e, "boxSizing", !1, r)),
        (o = s in e) && (a = e[s])),
      (a = parseFloat(a) || 0) +
        et(e, t, n || (i ? "border" : "content"), o, r, a) +
        "px"
    );
  }
  function nt(e, t, n, r, i) {
    return new nt.prototype.init(e, t, n, r, i);
  }
  k.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = _e(e, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
          o,
          a,
          s = V(t),
          u = Qe.test(t),
          l = e.style;
        if (
          (u || (t = Ge(s)), (a = k.cssHooks[t] || k.cssHooks[s]), void 0 === n)
        )
          return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = typeof n) &&
          (i = ne.exec(n)) &&
          i[1] &&
          ((n = le(e, t, i)), (o = "number")),
          null != n &&
            n == n &&
            ("number" !== o ||
              u ||
              (n += (i && i[3]) || (k.cssNumber[s] ? "" : "px")),
            y.clearCloneStyle ||
              "" !== n ||
              0 !== t.indexOf("background") ||
              (l[t] = "inherit"),
            (a && "set" in a && void 0 === (n = a.set(e, n, r))) ||
              (u ? l.setProperty(t, n) : (l[t] = n)));
      }
    },
    css: function (e, t, n, r) {
      var i,
        o,
        a,
        s = V(t);
      return (
        Qe.test(t) || (t = Ge(s)),
        (a = k.cssHooks[t] || k.cssHooks[s]) &&
          "get" in a &&
          (i = a.get(e, !0, n)),
        void 0 === i && (i = _e(e, t, r)),
        "normal" === i && t in Ke && (i = Ke[t]),
        "" === n || n
          ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
          : i
      );
    },
  }),
    k.each(["height", "width"], function (e, u) {
      k.cssHooks[u] = {
        get: function (e, t, n) {
          if (t)
            return !Ye.test(k.css(e, "display")) ||
              (e.getClientRects().length && e.getBoundingClientRect().width)
              ? tt(e, u, n)
              : ue(e, Je, function () {
                  return tt(e, u, n);
                });
        },
        set: function (e, t, n) {
          var r,
            i = Fe(e),
            o = !y.scrollboxSize() && "absolute" === i.position,
            a = (o || n) && "border-box" === k.css(e, "boxSizing", !1, i),
            s = n ? et(e, u, n, a, i) : 0;
          return (
            a &&
              o &&
              (s -= Math.ceil(
                e["offset" + u[0].toUpperCase() + u.slice(1)] -
                  parseFloat(i[u]) -
                  et(e, u, "border", !1, i) -
                  0.5
              )),
            s &&
              (r = ne.exec(t)) &&
              "px" !== (r[3] || "px") &&
              ((e.style[u] = t), (t = k.css(e, u))),
            Ze(0, t, s)
          );
        },
      };
    }),
    (k.cssHooks.marginLeft = ze(y.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(_e(e, "marginLeft")) ||
            e.getBoundingClientRect().left -
              ue(e, { marginLeft: 0 }, function () {
                return e.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    k.each({ margin: "", padding: "", border: "Width" }, function (i, o) {
      (k.cssHooks[i + o] = {
        expand: function (e) {
          for (
            var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e];
            t < 4;
            t++
          )
            n[i + re[t] + o] = r[t] || r[t - 2] || r[0];
          return n;
        },
      }),
        "margin" !== i && (k.cssHooks[i + o].set = Ze);
    }),
    k.fn.extend({
      css: function (e, t) {
        return _(
          this,
          function (e, t, n) {
            var r,
              i,
              o = {},
              a = 0;
            if (Array.isArray(t)) {
              for (r = Fe(e), i = t.length; a < i; a++)
                o[t[a]] = k.css(e, t[a], !1, r);
              return o;
            }
            return void 0 !== n ? k.style(e, t, n) : k.css(e, t);
          },
          e,
          t,
          1 < arguments.length
        );
      },
    }),
    (((k.Tween = nt).prototype = {
      constructor: nt,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || k.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (k.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = nt.propHooks[this.prop];
        return e && e.get ? e.get(this) : nt.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = nt.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t =
                k.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : nt.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = nt.prototype),
    ((nt.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return 1 !== e.elem.nodeType ||
            (null != e.elem[e.prop] && null == e.elem.style[e.prop])
            ? e.elem[e.prop]
            : (t = k.css(e.elem, e.prop, "")) && "auto" !== t
            ? t
            : 0;
        },
        set: function (e) {
          k.fx.step[e.prop]
            ? k.fx.step[e.prop](e)
            : 1 !== e.elem.nodeType ||
              (!k.cssHooks[e.prop] && null == e.elem.style[Ge(e.prop)])
            ? (e.elem[e.prop] = e.now)
            : k.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }).scrollTop = nt.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (k.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (k.fx = nt.prototype.init),
    (k.fx.step = {});
  var rt,
    it,
    ot,
    at,
    st = /^(?:toggle|show|hide)$/,
    ut = /queueHooks$/;
  function lt() {
    it &&
      (!1 === E.hidden && C.requestAnimationFrame
        ? C.requestAnimationFrame(lt)
        : C.setTimeout(lt, k.fx.interval),
      k.fx.tick());
  }
  function ct() {
    return (
      C.setTimeout(function () {
        rt = void 0;
      }),
      (rt = Date.now())
    );
  }
  function ft(e, t) {
    var n,
      r = 0,
      i = { height: e };
    for (t = t ? 1 : 0; r < 4; r += 2 - t)
      i["margin" + (n = re[r])] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function pt(e, t, n) {
    for (
      var r,
        i = (dt.tweeners[t] || []).concat(dt.tweeners["*"]),
        o = 0,
        a = i.length;
      o < a;
      o++
    )
      if ((r = i[o].call(n, t, e))) return r;
  }
  function dt(o, e, t) {
    var n,
      a,
      r = 0,
      i = dt.prefilters.length,
      s = k.Deferred().always(function () {
        delete u.elem;
      }),
      u = function () {
        if (a) return !1;
        for (
          var e = rt || ct(),
            t = Math.max(0, l.startTime + l.duration - e),
            n = 1 - (t / l.duration || 0),
            r = 0,
            i = l.tweens.length;
          r < i;
          r++
        )
          l.tweens[r].run(n);
        return (
          s.notifyWith(o, [l, n, t]),
          n < 1 && i
            ? t
            : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
        );
      },
      l = s.promise({
        elem: o,
        props: k.extend({}, e),
        opts: k.extend(!0, { specialEasing: {}, easing: k.easing._default }, t),
        originalProperties: e,
        originalOptions: t,
        startTime: rt || ct(),
        duration: t.duration,
        tweens: [],
        createTween: function (e, t) {
          var n = k.Tween(
            o,
            l.opts,
            e,
            t,
            l.opts.specialEasing[e] || l.opts.easing
          );
          return l.tweens.push(n), n;
        },
        stop: function (e) {
          var t = 0,
            n = e ? l.tweens.length : 0;
          if (a) return this;
          for (a = !0; t < n; t++) l.tweens[t].run(1);
          return (
            e
              ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e]))
              : s.rejectWith(o, [l, e]),
            this
          );
        },
      }),
      c = l.props;
    for (
      !(function (e, t) {
        var n, r, i, o, a;
        for (n in e)
          if (
            ((i = t[(r = V(n))]),
            (o = e[n]),
            Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
            n !== r && ((e[r] = o), delete e[n]),
            (a = k.cssHooks[r]) && ("expand" in a))
          )
            for (n in ((o = a.expand(o)), delete e[r], o))
              (n in e) || ((e[n] = o[n]), (t[n] = i));
          else t[r] = i;
      })(c, l.opts.specialEasing);
      r < i;
      r++
    )
      if ((n = dt.prefilters[r].call(l, o, c, l.opts)))
        return (
          m(n.stop) &&
            (k._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
          n
        );
    return (
      k.map(c, pt, l),
      m(l.opts.start) && l.opts.start.call(o, l),
      l
        .progress(l.opts.progress)
        .done(l.opts.done, l.opts.complete)
        .fail(l.opts.fail)
        .always(l.opts.always),
      k.fx.timer(k.extend(u, { elem: o, anim: l, queue: l.opts.queue })),
      l
    );
  }
  (k.Animation = k.extend(dt, {
    tweeners: {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t);
          return le(n.elem, e, ne.exec(t), n), n;
        },
      ],
    },
    tweener: function (e, t) {
      m(e) ? ((t = e), (e = ["*"])) : (e = e.match(R));
      for (var n, r = 0, i = e.length; r < i; r++)
        (n = e[r]),
          (dt.tweeners[n] = dt.tweeners[n] || []),
          dt.tweeners[n].unshift(t);
    },
    prefilters: [
      function (e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = "width" in t || "height" in t,
          p = this,
          d = {},
          h = e.style,
          g = e.nodeType && se(e),
          v = Q.get(e, "fxshow");
        for (r in (n.queue ||
          (null == (a = k._queueHooks(e, "fx")).unqueued &&
            ((a.unqueued = 0),
            (s = a.empty.fire),
            (a.empty.fire = function () {
              a.unqueued || s();
            })),
          a.unqueued++,
          p.always(function () {
            p.always(function () {
              a.unqueued--, k.queue(e, "fx").length || a.empty.fire();
            });
          })),
        t))
          if (((i = t[r]), st.test(i))) {
            if (
              (delete t[r],
              (o = o || "toggle" === i),
              i === (g ? "hide" : "show"))
            ) {
              if ("show" !== i || !v || void 0 === v[r]) continue;
              g = !0;
            }
            d[r] = (v && v[r]) || k.style(e, r);
          }
        if ((u = !k.isEmptyObject(t)) || !k.isEmptyObject(d))
          for (r in (f &&
            1 === e.nodeType &&
            ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
            null == (l = v && v.display) && (l = Q.get(e, "display")),
            "none" === (c = k.css(e, "display")) &&
              (l
                ? (c = l)
                : (fe([e], !0),
                  (l = e.style.display || l),
                  (c = k.css(e, "display")),
                  fe([e]))),
            ("inline" === c || ("inline-block" === c && null != l)) &&
              "none" === k.css(e, "float") &&
              (u ||
                (p.done(function () {
                  h.display = l;
                }),
                null == l && ((c = h.display), (l = "none" === c ? "" : c))),
              (h.display = "inline-block"))),
          n.overflow &&
            ((h.overflow = "hidden"),
            p.always(function () {
              (h.overflow = n.overflow[0]),
                (h.overflowX = n.overflow[1]),
                (h.overflowY = n.overflow[2]);
            })),
          (u = !1),
          d))
            u ||
              (v
                ? "hidden" in v && (g = v.hidden)
                : (v = Q.access(e, "fxshow", { display: l })),
              o && (v.hidden = !g),
              g && fe([e], !0),
              p.done(function () {
                for (r in (g || fe([e]), Q.remove(e, "fxshow"), d))
                  k.style(e, r, d[r]);
              })),
              (u = pt(g ? v[r] : 0, r, p)),
              r in v ||
                ((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
      },
    ],
    prefilter: function (e, t) {
      t ? dt.prefilters.unshift(e) : dt.prefilters.push(e);
    },
  })),
    (k.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? k.extend({}, e)
          : {
              complete: n || (!n && t) || (m(e) && e),
              duration: e,
              easing: (n && t) || (t && !m(t) && t),
            };
      return (
        k.fx.off
          ? (r.duration = 0)
          : "number" != typeof r.duration &&
            (r.duration in k.fx.speeds
              ? (r.duration = k.fx.speeds[r.duration])
              : (r.duration = k.fx.speeds._default)),
        (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          m(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue);
        }),
        r
      );
    }),
    k.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(se)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (t, e, n, r) {
        var i = k.isEmptyObject(t),
          o = k.speed(e, n, r),
          a = function () {
            var e = dt(this, k.extend({}, t), o);
            (i || Q.get(this, "finish")) && e.stop(!0);
          };
        return (
          (a.finish = a),
          i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        );
      },
      stop: function (i, e, o) {
        var a = function (e) {
          var t = e.stop;
          delete e.stop, t(o);
        };
        return (
          "string" != typeof i && ((o = e), (e = i), (i = void 0)),
          e && !1 !== i && this.queue(i || "fx", []),
          this.each(function () {
            var e = !0,
              t = null != i && i + "queueHooks",
              n = k.timers,
              r = Q.get(this);
            if (t) r[t] && r[t].stop && a(r[t]);
            else for (t in r) r[t] && r[t].stop && ut.test(t) && a(r[t]);
            for (t = n.length; t--; )
              n[t].elem !== this ||
                (null != i && n[t].queue !== i) ||
                (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
            (!e && o) || k.dequeue(this, i);
          })
        );
      },
      finish: function (a) {
        return (
          !1 !== a && (a = a || "fx"),
          this.each(function () {
            var e,
              t = Q.get(this),
              n = t[a + "queue"],
              r = t[a + "queueHooks"],
              i = k.timers,
              o = n ? n.length : 0;
            for (
              t.finish = !0,
                k.queue(this, a, []),
                r && r.stop && r.stop.call(this, !0),
                e = i.length;
              e--;

            )
              i[e].elem === this &&
                i[e].queue === a &&
                (i[e].anim.stop(!0), i.splice(e, 1));
            for (e = 0; e < o; e++)
              n[e] && n[e].finish && n[e].finish.call(this);
            delete t.finish;
          })
        );
      },
    }),
    k.each(["toggle", "show", "hide"], function (e, r) {
      var i = k.fn[r];
      k.fn[r] = function (e, t, n) {
        return null == e || "boolean" == typeof e
          ? i.apply(this, arguments)
          : this.animate(ft(r, !0), e, t, n);
      };
    }),
    k.each(
      {
        slideDown: ft("show"),
        slideUp: ft("hide"),
        slideToggle: ft("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, r) {
        k.fn[e] = function (e, t, n) {
          return this.animate(r, e, t, n);
        };
      }
    ),
    (k.timers = []),
    (k.fx.tick = function () {
      var e,
        t = 0,
        n = k.timers;
      for (rt = Date.now(); t < n.length; t++)
        (e = n[t])() || n[t] !== e || n.splice(t--, 1);
      n.length || k.fx.stop(), (rt = void 0);
    }),
    (k.fx.timer = function (e) {
      k.timers.push(e), k.fx.start();
    }),
    (k.fx.interval = 13),
    (k.fx.start = function () {
      it || ((it = !0), lt());
    }),
    (k.fx.stop = function () {
      it = null;
    }),
    (k.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (k.fn.delay = function (r, e) {
      return (
        (r = (k.fx && k.fx.speeds[r]) || r),
        (e = e || "fx"),
        this.queue(e, function (e, t) {
          var n = C.setTimeout(e, r);
          t.stop = function () {
            C.clearTimeout(n);
          };
        })
      );
    }),
    (ot = E.createElement("input")),
    (at = E.createElement("select").appendChild(E.createElement("option"))),
    (ot.type = "checkbox"),
    (y.checkOn = "" !== ot.value),
    (y.optSelected = at.selected),
    ((ot = E.createElement("input")).value = "t"),
    (ot.type = "radio"),
    (y.radioValue = "t" === ot.value);
  var ht,
    gt = k.expr.attrHandle;
  k.fn.extend({
    attr: function (e, t) {
      return _(this, k.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function (e) {
      return this.each(function () {
        k.removeAttr(this, e);
      });
    },
  }),
    k.extend({
      attr: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return "undefined" == typeof e.getAttribute
            ? k.prop(e, t, n)
            : ((1 === o && k.isXMLDoc(e)) ||
                (i =
                  k.attrHooks[t.toLowerCase()] ||
                  (k.expr.match.bool.test(t) ? ht : void 0)),
              void 0 !== n
                ? null === n
                  ? void k.removeAttr(e, t)
                  : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e.setAttribute(t, n + ""), n)
                : i && "get" in i && null !== (r = i.get(e, t))
                ? r
                : null == (r = k.find.attr(e, t))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!y.radioValue && "radio" === t && A(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var n,
          r = 0,
          i = t && t.match(R);
        if (i && 1 === e.nodeType) while ((n = i[r++])) e.removeAttribute(n);
      },
    }),
    (ht = {
      set: function (e, t, n) {
        return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n;
      },
    }),
    k.each(k.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var a = gt[t] || k.find.attr;
      gt[t] = function (e, t, n) {
        var r,
          i,
          o = t.toLowerCase();
        return (
          n ||
            ((i = gt[o]),
            (gt[o] = r),
            (r = null != a(e, t, n) ? o : null),
            (gt[o] = i)),
          r
        );
      };
    });
  var vt = /^(?:input|select|textarea|button)$/i,
    yt = /^(?:a|area)$/i;
  function mt(e) {
    return (e.match(R) || []).join(" ");
  }
  function xt(e) {
    return (e.getAttribute && e.getAttribute("class")) || "";
  }
  function bt(e) {
    return Array.isArray(e) ? e : ("string" == typeof e && e.match(R)) || [];
  }
  k.fn.extend({
    prop: function (e, t) {
      return _(this, k.prop, e, t, 1 < arguments.length);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[k.propFix[e] || e];
      });
    },
  }),
    k.extend({
      prop: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && k.isXMLDoc(e)) ||
              ((t = k.propFix[t] || t), (i = k.propHooks[t])),
            void 0 !== n
              ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                ? r
                : (e[t] = n)
              : i && "get" in i && null !== (r = i.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = k.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : vt.test(e.nodeName) || (yt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    y.optSelected ||
      (k.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    k.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        k.propFix[this.toLowerCase()] = this;
      }
    ),
    k.fn.extend({
      addClass: function (t) {
        var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
        if (m(t))
          return this.each(function (e) {
            k(this).addClass(t.call(this, e, xt(this)));
          });
        if ((e = bt(t)).length)
          while ((n = this[u++]))
            if (((i = xt(n)), (r = 1 === n.nodeType && " " + mt(i) + " "))) {
              a = 0;
              while ((o = e[a++]))
                r.indexOf(" " + o + " ") < 0 && (r += o + " ");
              i !== (s = mt(r)) && n.setAttribute("class", s);
            }
        return this;
      },
      removeClass: function (t) {
        var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
        if (m(t))
          return this.each(function (e) {
            k(this).removeClass(t.call(this, e, xt(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ((e = bt(t)).length)
          while ((n = this[u++]))
            if (((i = xt(n)), (r = 1 === n.nodeType && " " + mt(i) + " "))) {
              a = 0;
              while ((o = e[a++]))
                while (-1 < r.indexOf(" " + o + " "))
                  r = r.replace(" " + o + " ", " ");
              i !== (s = mt(r)) && n.setAttribute("class", s);
            }
        return this;
      },
      toggleClass: function (i, t) {
        var o = typeof i,
          a = "string" === o || Array.isArray(i);
        return "boolean" == typeof t && a
          ? t
            ? this.addClass(i)
            : this.removeClass(i)
          : m(i)
          ? this.each(function (e) {
              k(this).toggleClass(i.call(this, e, xt(this), t), t);
            })
          : this.each(function () {
              var e, t, n, r;
              if (a) {
                (t = 0), (n = k(this)), (r = bt(i));
                while ((e = r[t++]))
                  n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
              } else (void 0 !== i && "boolean" !== o) || ((e = xt(this)) && Q.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Q.get(this, "__className__") || ""));
            });
      },
      hasClass: function (e) {
        var t,
          n,
          r = 0;
        t = " " + e + " ";
        while ((n = this[r++]))
          if (1 === n.nodeType && -1 < (" " + mt(xt(n)) + " ").indexOf(t))
            return !0;
        return !1;
      },
    });
  var wt = /\r/g;
  k.fn.extend({
    val: function (n) {
      var r,
        e,
        i,
        t = this[0];
      return arguments.length
        ? ((i = m(n)),
          this.each(function (e) {
            var t;
            1 === this.nodeType &&
              (null == (t = i ? n.call(this, e, k(this).val()) : n)
                ? (t = "")
                : "number" == typeof t
                ? (t += "")
                : Array.isArray(t) &&
                  (t = k.map(t, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((r =
                k.valHooks[this.type] ||
                k.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in r &&
                void 0 !== r.set(this, t, "value")) ||
                (this.value = t));
          }))
        : t
        ? (r = k.valHooks[t.type] || k.valHooks[t.nodeName.toLowerCase()]) &&
          "get" in r &&
          void 0 !== (e = r.get(t, "value"))
          ? e
          : "string" == typeof (e = t.value)
          ? e.replace(wt, "")
          : null == e
          ? ""
          : e
        : void 0;
    },
  }),
    k.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = k.find.attr(e, "value");
            return null != t ? t : mt(k.text(e));
          },
        },
        select: {
          get: function (e) {
            var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;
            for (r = o < 0 ? u : a ? o : 0; r < u; r++)
              if (
                ((n = i[r]).selected || r === o) &&
                !n.disabled &&
                (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))
              ) {
                if (((t = k(n).val()), a)) return t;
                s.push(t);
              }
            return s;
          },
          set: function (e, t) {
            var n,
              r,
              i = e.options,
              o = k.makeArray(t),
              a = i.length;
            while (a--)
              ((r = i[a]).selected =
                -1 < k.inArray(k.valHooks.option.get(r), o)) && (n = !0);
            return n || (e.selectedIndex = -1), o;
          },
        },
      },
    }),
    k.each(["radio", "checkbox"], function () {
      (k.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t))
            return (e.checked = -1 < k.inArray(k(e).val(), t));
        },
      }),
        y.checkOn ||
          (k.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    }),
    (y.focusin = "onfocusin" in C);
  var Tt = /^(?:focusinfocus|focusoutblur)$/,
    Ct = function (e) {
      e.stopPropagation();
    };
  k.extend(k.event, {
    trigger: function (e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        p = [n || E],
        d = v.call(e, "type") ? e.type : e,
        h = v.call(e, "namespace") ? e.namespace.split(".") : [];
      if (
        ((o = f = a = n = n || E),
        3 !== n.nodeType &&
          8 !== n.nodeType &&
          !Tt.test(d + k.event.triggered) &&
          (-1 < d.indexOf(".") && ((d = (h = d.split(".")).shift()), h.sort()),
          (u = d.indexOf(":") < 0 && "on" + d),
          ((e = e[k.expando]
            ? e
            : new k.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3),
          (e.namespace = h.join(".")),
          (e.rnamespace = e.namespace
            ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (e.result = void 0),
          e.target || (e.target = n),
          (t = null == t ? [e] : k.makeArray(t, [e])),
          (c = k.event.special[d] || {}),
          r || !c.trigger || !1 !== c.trigger.apply(n, t)))
      ) {
        if (!r && !c.noBubble && !x(n)) {
          for (
            s = c.delegateType || d, Tt.test(s + d) || (o = o.parentNode);
            o;
            o = o.parentNode
          )
            p.push(o), (a = o);
          a === (n.ownerDocument || E) &&
            p.push(a.defaultView || a.parentWindow || C);
        }
        i = 0;
        while ((o = p[i++]) && !e.isPropagationStopped())
          (f = o),
            (e.type = 1 < i ? s : c.bindType || d),
            (l = (Q.get(o, "events") || {})[e.type] && Q.get(o, "handle")) &&
              l.apply(o, t),
            (l = u && o[u]) &&
              l.apply &&
              G(o) &&
              ((e.result = l.apply(o, t)),
              !1 === e.result && e.preventDefault());
        return (
          (e.type = d),
          r ||
            e.isDefaultPrevented() ||
            (c._default && !1 !== c._default.apply(p.pop(), t)) ||
            !G(n) ||
            (u &&
              m(n[d]) &&
              !x(n) &&
              ((a = n[u]) && (n[u] = null),
              (k.event.triggered = d),
              e.isPropagationStopped() && f.addEventListener(d, Ct),
              n[d](),
              e.isPropagationStopped() && f.removeEventListener(d, Ct),
              (k.event.triggered = void 0),
              a && (n[u] = a))),
          e.result
        );
      }
    },
    simulate: function (e, t, n) {
      var r = k.extend(new k.Event(), n, { type: e, isSimulated: !0 });
      k.event.trigger(r, null, t);
    },
  }),
    k.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          k.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        if (n) return k.event.trigger(e, t, n, !0);
      },
    }),
    y.focusin ||
      k.each({ focus: "focusin", blur: "focusout" }, function (n, r) {
        var i = function (e) {
          k.event.simulate(r, e.target, k.event.fix(e));
        };
        k.event.special[r] = {
          setup: function () {
            var e = this.ownerDocument || this,
              t = Q.access(e, r);
            t || e.addEventListener(n, i, !0), Q.access(e, r, (t || 0) + 1);
          },
          teardown: function () {
            var e = this.ownerDocument || this,
              t = Q.access(e, r) - 1;
            t
              ? Q.access(e, r, t)
              : (e.removeEventListener(n, i, !0), Q.remove(e, r));
          },
        };
      });
  var Et = C.location,
    kt = Date.now(),
    St = /\?/;
  k.parseXML = function (e) {
    var t;
    if (!e || "string" != typeof e) return null;
    try {
      t = new C.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {
      t = void 0;
    }
    return (
      (t && !t.getElementsByTagName("parsererror").length) ||
        k.error("Invalid XML: " + e),
      t
    );
  };
  var Nt = /\[\]$/,
    At = /\r?\n/g,
    Dt = /^(?:submit|button|image|reset|file)$/i,
    jt = /^(?:input|select|textarea|keygen)/i;
  function qt(n, e, r, i) {
    var t;
    if (Array.isArray(e))
      k.each(e, function (e, t) {
        r || Nt.test(n)
          ? i(n, t)
          : qt(
              n + "[" + ("object" == typeof t && null != t ? e : "") + "]",
              t,
              r,
              i
            );
      });
    else if (r || "object" !== w(e)) i(n, e);
    else for (t in e) qt(n + "[" + t + "]", e[t], r, i);
  }
  (k.param = function (e, t) {
    var n,
      r = [],
      i = function (e, t) {
        var n = m(t) ? t() : t;
        r[r.length] =
          encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
      };
    if (null == e) return "";
    if (Array.isArray(e) || (e.jquery && !k.isPlainObject(e)))
      k.each(e, function () {
        i(this.name, this.value);
      });
    else for (n in e) qt(n, e[n], t, i);
    return r.join("&");
  }),
    k.fn.extend({
      serialize: function () {
        return k.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = k.prop(this, "elements");
          return e ? k.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !k(this).is(":disabled") &&
              jt.test(this.nodeName) &&
              !Dt.test(e) &&
              (this.checked || !pe.test(e))
            );
          })
          .map(function (e, t) {
            var n = k(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? k.map(n, function (e) {
                  return { name: t.name, value: e.replace(At, "\r\n") };
                })
              : { name: t.name, value: n.replace(At, "\r\n") };
          })
          .get();
      },
    });
  var Lt = /%20/g,
    Ht = /#.*$/,
    Ot = /([?&])_=[^&]*/,
    Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Rt = /^(?:GET|HEAD)$/,
    Mt = /^\/\//,
    It = {},
    Wt = {},
    $t = "*/".concat("*"),
    Ft = E.createElement("a");
  function Bt(o) {
    return function (e, t) {
      "string" != typeof e && ((t = e), (e = "*"));
      var n,
        r = 0,
        i = e.toLowerCase().match(R) || [];
      if (m(t))
        while ((n = i[r++]))
          "+" === n[0]
            ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t))
            : (o[n] = o[n] || []).push(t);
    };
  }
  function _t(t, i, o, a) {
    var s = {},
      u = t === Wt;
    function l(e) {
      var r;
      return (
        (s[e] = !0),
        k.each(t[e] || [], function (e, t) {
          var n = t(i, o, a);
          return "string" != typeof n || u || s[n]
            ? u
              ? !(r = n)
              : void 0
            : (i.dataTypes.unshift(n), l(n), !1);
        }),
        r
      );
    }
    return l(i.dataTypes[0]) || (!s["*"] && l("*"));
  }
  function zt(e, t) {
    var n,
      r,
      i = k.ajaxSettings.flatOptions || {};
    for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && k.extend(!0, e, r), e;
  }
  (Ft.href = Et.href),
    k.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Et.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            Et.protocol
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": $t,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": k.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? zt(zt(e, k.ajaxSettings), t) : zt(k.ajaxSettings, e);
      },
      ajaxPrefilter: Bt(It),
      ajaxTransport: Bt(Wt),
      ajax: function (e, t) {
        "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
        var c,
          f,
          p,
          n,
          d,
          r,
          h,
          g,
          i,
          o,
          v = k.ajaxSetup({}, t),
          y = v.context || v,
          m = v.context && (y.nodeType || y.jquery) ? k(y) : k.event,
          x = k.Deferred(),
          b = k.Callbacks("once memory"),
          w = v.statusCode || {},
          a = {},
          s = {},
          u = "canceled",
          T = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (h) {
                if (!n) {
                  n = {};
                  while ((t = Pt.exec(p)))
                    n[t[1].toLowerCase() + " "] = (
                      n[t[1].toLowerCase() + " "] || []
                    ).concat(t[2]);
                }
                t = n[e.toLowerCase() + " "];
              }
              return null == t ? null : t.join(", ");
            },
            getAllResponseHeaders: function () {
              return h ? p : null;
            },
            setRequestHeader: function (e, t) {
              return (
                null == h &&
                  ((e = s[e.toLowerCase()] = s[e.toLowerCase()] || e),
                  (a[e] = t)),
                this
              );
            },
            overrideMimeType: function (e) {
              return null == h && (v.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (h) T.always(e[T.status]);
                else for (t in e) w[t] = [w[t], e[t]];
              return this;
            },
            abort: function (e) {
              var t = e || u;
              return c && c.abort(t), l(0, t), this;
            },
          };
        if (
          (x.promise(T),
          (v.url = ((e || v.url || Et.href) + "").replace(
            Mt,
            Et.protocol + "//"
          )),
          (v.type = t.method || t.type || v.method || v.type),
          (v.dataTypes = (v.dataType || "*").toLowerCase().match(R) || [""]),
          null == v.crossDomain)
        ) {
          r = E.createElement("a");
          try {
            (r.href = v.url),
              (r.href = r.href),
              (v.crossDomain =
                Ft.protocol + "//" + Ft.host != r.protocol + "//" + r.host);
          } catch (e) {
            v.crossDomain = !0;
          }
        }
        if (
          (v.data &&
            v.processData &&
            "string" != typeof v.data &&
            (v.data = k.param(v.data, v.traditional)),
          _t(It, v, t, T),
          h)
        )
          return T;
        for (i in ((g = k.event && v.global) &&
          0 == k.active++ &&
          k.event.trigger("ajaxStart"),
        (v.type = v.type.toUpperCase()),
        (v.hasContent = !Rt.test(v.type)),
        (f = v.url.replace(Ht, "")),
        v.hasContent
          ? v.data &&
            v.processData &&
            0 ===
              (v.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            (v.data = v.data.replace(Lt, "+"))
          : ((o = v.url.slice(f.length)),
            v.data &&
              (v.processData || "string" == typeof v.data) &&
              ((f += (St.test(f) ? "&" : "?") + v.data), delete v.data),
            !1 === v.cache &&
              ((f = f.replace(Ot, "$1")),
              (o = (St.test(f) ? "&" : "?") + "_=" + kt++ + o)),
            (v.url = f + o)),
        v.ifModified &&
          (k.lastModified[f] &&
            T.setRequestHeader("If-Modified-Since", k.lastModified[f]),
          k.etag[f] && T.setRequestHeader("If-None-Match", k.etag[f])),
        ((v.data && v.hasContent && !1 !== v.contentType) || t.contentType) &&
          T.setRequestHeader("Content-Type", v.contentType),
        T.setRequestHeader(
          "Accept",
          v.dataTypes[0] && v.accepts[v.dataTypes[0]]
            ? v.accepts[v.dataTypes[0]] +
                ("*" !== v.dataTypes[0] ? ", " + $t + "; q=0.01" : "")
            : v.accepts["*"]
        ),
        v.headers))
          T.setRequestHeader(i, v.headers[i]);
        if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
          return T.abort();
        if (
          ((u = "abort"),
          b.add(v.complete),
          T.done(v.success),
          T.fail(v.error),
          (c = _t(Wt, v, t, T)))
        ) {
          if (((T.readyState = 1), g && m.trigger("ajaxSend", [T, v]), h))
            return T;
          v.async &&
            0 < v.timeout &&
            (d = C.setTimeout(function () {
              T.abort("timeout");
            }, v.timeout));
          try {
            (h = !1), c.send(a, l);
          } catch (e) {
            if (h) throw e;
            l(-1, e);
          }
        } else l(-1, "No Transport");
        function l(e, t, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l = t;
          h ||
            ((h = !0),
            d && C.clearTimeout(d),
            (c = void 0),
            (p = r || ""),
            (T.readyState = 0 < e ? 4 : 0),
            (i = (200 <= e && e < 300) || 304 === e),
            n &&
              (s = (function (e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s = e.contents,
                  u = e.dataTypes;
                while ("*" === u[0])
                  u.shift(),
                    void 0 === r &&
                      (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                  for (i in s)
                    if (s[i] && s[i].test(r)) {
                      u.unshift(i);
                      break;
                    }
                if (u[0] in n) o = u[0];
                else {
                  for (i in n) {
                    if (!u[0] || e.converters[i + " " + u[0]]) {
                      o = i;
                      break;
                    }
                    a || (a = i);
                  }
                  o = o || a;
                }
                if (o) return o !== u[0] && u.unshift(o), n[o];
              })(v, T, n)),
            (s = (function (e, t, n, r) {
              var i,
                o,
                a,
                s,
                u,
                l = {},
                c = e.dataTypes.slice();
              if (c[1])
                for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
              o = c.shift();
              while (o)
                if (
                  (e.responseFields[o] && (n[e.responseFields[o]] = t),
                  !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                  (u = o),
                  (o = c.shift()))
                )
                  if ("*" === o) o = u;
                  else if ("*" !== u && u !== o) {
                    if (!(a = l[u + " " + o] || l["* " + o]))
                      for (i in l)
                        if (
                          (s = i.split(" "))[1] === o &&
                          (a = l[u + " " + s[0]] || l["* " + s[0]])
                        ) {
                          !0 === a
                            ? (a = l[i])
                            : !0 !== l[i] && ((o = s[0]), c.unshift(s[1]));
                          break;
                        }
                    if (!0 !== a)
                      if (a && e["throws"]) t = a(t);
                      else
                        try {
                          t = a(t);
                        } catch (e) {
                          return {
                            state: "parsererror",
                            error: a
                              ? e
                              : "No conversion from " + u + " to " + o,
                          };
                        }
                  }
              return { state: "success", data: t };
            })(v, s, T, i)),
            i
              ? (v.ifModified &&
                  ((u = T.getResponseHeader("Last-Modified")) &&
                    (k.lastModified[f] = u),
                  (u = T.getResponseHeader("etag")) && (k.etag[f] = u)),
                204 === e || "HEAD" === v.type
                  ? (l = "nocontent")
                  : 304 === e
                  ? (l = "notmodified")
                  : ((l = s.state), (o = s.data), (i = !(a = s.error))))
              : ((a = l), (!e && l) || ((l = "error"), e < 0 && (e = 0))),
            (T.status = e),
            (T.statusText = (t || l) + ""),
            i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
            T.statusCode(w),
            (w = void 0),
            g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]),
            b.fireWith(y, [T, l]),
            g &&
              (m.trigger("ajaxComplete", [T, v]),
              --k.active || k.event.trigger("ajaxStop")));
        }
        return T;
      },
      getJSON: function (e, t, n) {
        return k.get(e, t, n, "json");
      },
      getScript: function (e, t) {
        return k.get(e, void 0, t, "script");
      },
    }),
    k.each(["get", "post"], function (e, i) {
      k[i] = function (e, t, n, r) {
        return (
          m(t) && ((r = r || n), (n = t), (t = void 0)),
          k.ajax(
            k.extend(
              { url: e, type: i, dataType: r, data: t, success: n },
              k.isPlainObject(e) && e
            )
          )
        );
      };
    }),
    (k._evalUrl = function (e, t) {
      return k.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (e) {
          k.globalEval(e, t);
        },
      });
    }),
    k.fn.extend({
      wrapAll: function (e) {
        var t;
        return (
          this[0] &&
            (m(e) && (e = e.call(this[0])),
            (t = k(e, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (n) {
        return m(n)
          ? this.each(function (e) {
              k(this).wrapInner(n.call(this, e));
            })
          : this.each(function () {
              var e = k(this),
                t = e.contents();
              t.length ? t.wrapAll(n) : e.append(n);
            });
      },
      wrap: function (t) {
        var n = m(t);
        return this.each(function (e) {
          k(this).wrapAll(n ? t.call(this, e) : t);
        });
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not("body")
            .each(function () {
              k(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (k.expr.pseudos.hidden = function (e) {
      return !k.expr.pseudos.visible(e);
    }),
    (k.expr.pseudos.visible = function (e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (k.ajaxSettings.xhr = function () {
      try {
        return new C.XMLHttpRequest();
      } catch (e) {}
    });
  var Ut = { 0: 200, 1223: 204 },
    Xt = k.ajaxSettings.xhr();
  (y.cors = !!Xt && "withCredentials" in Xt),
    (y.ajax = Xt = !!Xt),
    k.ajaxTransport(function (i) {
      var o, a;
      if (y.cors || (Xt && !i.crossDomain))
        return {
          send: function (e, t) {
            var n,
              r = i.xhr();
            if (
              (r.open(i.type, i.url, i.async, i.username, i.password),
              i.xhrFields)
            )
              for (n in i.xhrFields) r[n] = i.xhrFields[n];
            for (n in (i.mimeType &&
              r.overrideMimeType &&
              r.overrideMimeType(i.mimeType),
            i.crossDomain ||
              e["X-Requested-With"] ||
              (e["X-Requested-With"] = "XMLHttpRequest"),
            e))
              r.setRequestHeader(n, e[n]);
            (o = function (e) {
              return function () {
                o &&
                  ((o =
                    a =
                    r.onload =
                    r.onerror =
                    r.onabort =
                    r.ontimeout =
                    r.onreadystatechange =
                      null),
                  "abort" === e
                    ? r.abort()
                    : "error" === e
                    ? "number" != typeof r.status
                      ? t(0, "error")
                      : t(r.status, r.statusText)
                    : t(
                        Ut[r.status] || r.status,
                        r.statusText,
                        "text" !== (r.responseType || "text") ||
                          "string" != typeof r.responseText
                          ? { binary: r.response }
                          : { text: r.responseText },
                        r.getAllResponseHeaders()
                      ));
              };
            }),
              (r.onload = o()),
              (a = r.onerror = r.ontimeout = o("error")),
              void 0 !== r.onabort
                ? (r.onabort = a)
                : (r.onreadystatechange = function () {
                    4 === r.readyState &&
                      C.setTimeout(function () {
                        o && a();
                      });
                  }),
              (o = o("abort"));
            try {
              r.send((i.hasContent && i.data) || null);
            } catch (e) {
              if (o) throw e;
            }
          },
          abort: function () {
            o && o();
          },
        };
    }),
    k.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1);
    }),
    k.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return k.globalEval(e), e;
        },
      },
    }),
    k.ajaxPrefilter("script", function (e) {
      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }),
    k.ajaxTransport("script", function (n) {
      var r, i;
      if (n.crossDomain || n.scriptAttrs)
        return {
          send: function (e, t) {
            (r = k("<script>")
              .attr(n.scriptAttrs || {})
              .prop({ charset: n.scriptCharset, src: n.url })
              .on(
                "load error",
                (i = function (e) {
                  r.remove(),
                    (i = null),
                    e && t("error" === e.type ? 404 : 200, e.type);
                })
              )),
              E.head.appendChild(r[0]);
          },
          abort: function () {
            i && i();
          },
        };
    });
  var Vt,
    Gt = [],
    Yt = /(=)\?(?=&|$)|\?\?/;
  k.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Gt.pop() || k.expando + "_" + kt++;
      return (this[e] = !0), e;
    },
  }),
    k.ajaxPrefilter("json jsonp", function (e, t, n) {
      var r,
        i,
        o,
        a =
          !1 !== e.jsonp &&
          (Yt.test(e.url)
            ? "url"
            : "string" == typeof e.data &&
              0 ===
                (e.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              Yt.test(e.data) &&
              "data");
      if (a || "jsonp" === e.dataTypes[0])
        return (
          (r = e.jsonpCallback =
            m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
          a
            ? (e[a] = e[a].replace(Yt, "$1" + r))
            : !1 !== e.jsonp &&
              (e.url += (St.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
          (e.converters["script json"] = function () {
            return o || k.error(r + " was not called"), o[0];
          }),
          (e.dataTypes[0] = "json"),
          (i = C[r]),
          (C[r] = function () {
            o = arguments;
          }),
          n.always(function () {
            void 0 === i ? k(C).removeProp(r) : (C[r] = i),
              e[r] && ((e.jsonpCallback = t.jsonpCallback), Gt.push(r)),
              o && m(i) && i(o[0]),
              (o = i = void 0);
          }),
          "script"
        );
    }),
    (y.createHTMLDocument =
      (((Vt = E.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      2 === Vt.childNodes.length)),
    (k.parseHTML = function (e, t, n) {
      return "string" != typeof e
        ? []
        : ("boolean" == typeof t && ((n = t), (t = !1)),
          t ||
            (y.createHTMLDocument
              ? (((r = (t =
                  E.implementation.createHTMLDocument("")).createElement(
                  "base"
                )).href = E.location.href),
                t.head.appendChild(r))
              : (t = E)),
          (o = !n && []),
          (i = D.exec(e))
            ? [t.createElement(i[1])]
            : ((i = we([e], t, o)),
              o && o.length && k(o).remove(),
              k.merge([], i.childNodes)));
      var r, i, o;
    }),
    (k.fn.load = function (e, t, n) {
      var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
      return (
        -1 < s && ((r = mt(e.slice(s))), (e = e.slice(0, s))),
        m(t)
          ? ((n = t), (t = void 0))
          : t && "object" == typeof t && (i = "POST"),
        0 < a.length &&
          k
            .ajax({ url: e, type: i || "GET", dataType: "html", data: t })
            .done(function (e) {
              (o = arguments),
                a.html(r ? k("<div>").append(k.parseHTML(e)).find(r) : e);
            })
            .always(
              n &&
                function (e, t) {
                  a.each(function () {
                    n.apply(this, o || [e.responseText, t, e]);
                  });
                }
            ),
        this
      );
    }),
    k.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        k.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    (k.expr.pseudos.animated = function (t) {
      return k.grep(k.timers, function (e) {
        return t === e.elem;
      }).length;
    }),
    (k.offset = {
      setOffset: function (e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u,
          l = k.css(e, "position"),
          c = k(e),
          f = {};
        "static" === l && (e.style.position = "relative"),
          (s = c.offset()),
          (o = k.css(e, "top")),
          (u = k.css(e, "left")),
          ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto")
            ? ((a = (r = c.position()).top), (i = r.left))
            : ((a = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
          m(t) && (t = t.call(e, n, k.extend({}, s))),
          null != t.top && (f.top = t.top - s.top + a),
          null != t.left && (f.left = t.left - s.left + i),
          "using" in t ? t.using.call(e, f) : c.css(f);
      },
    }),
    k.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function (e) {
                k.offset.setOffset(this, t, e);
              });
        var e,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? ((e = r.getBoundingClientRect()),
              (n = r.ownerDocument.defaultView),
              { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            n,
            r = this[0],
            i = { top: 0, left: 0 };
          if ("fixed" === k.css(r, "position")) t = r.getBoundingClientRect();
          else {
            (t = this.offset()),
              (n = r.ownerDocument),
              (e = r.offsetParent || n.documentElement);
            while (
              e &&
              (e === n.body || e === n.documentElement) &&
              "static" === k.css(e, "position")
            )
              e = e.parentNode;
            e &&
              e !== r &&
              1 === e.nodeType &&
              (((i = k(e).offset()).top += k.css(e, "borderTopWidth", !0)),
              (i.left += k.css(e, "borderLeftWidth", !0)));
          }
          return {
            top: t.top - i.top - k.css(r, "marginTop", !0),
            left: t.left - i.left - k.css(r, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var e = this.offsetParent;
          while (e && "static" === k.css(e, "position")) e = e.offsetParent;
          return e || ie;
        });
      },
    }),
    k.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (t, i) {
        var o = "pageYOffset" === i;
        k.fn[t] = function (e) {
          return _(
            this,
            function (e, t, n) {
              var r;
              if (
                (x(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView),
                void 0 === n)
              )
                return r ? r[i] : e[t];
              r
                ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset)
                : (e[t] = n);
            },
            t,
            e,
            arguments.length
          );
        };
      }
    ),
    k.each(["top", "left"], function (e, n) {
      k.cssHooks[n] = ze(y.pixelPosition, function (e, t) {
        if (t)
          return (t = _e(e, n)), $e.test(t) ? k(e).position()[n] + "px" : t;
      });
    }),
    k.each({ Height: "height", Width: "width" }, function (a, s) {
      k.each(
        { padding: "inner" + a, content: s, "": "outer" + a },
        function (r, o) {
          k.fn[o] = function (e, t) {
            var n = arguments.length && (r || "boolean" != typeof e),
              i = r || (!0 === e || !0 === t ? "margin" : "border");
            return _(
              this,
              function (e, t, n) {
                var r;
                return x(e)
                  ? 0 === o.indexOf("outer")
                    ? e["inner" + a]
                    : e.document.documentElement["client" + a]
                  : 9 === e.nodeType
                  ? ((r = e.documentElement),
                    Math.max(
                      e.body["scroll" + a],
                      r["scroll" + a],
                      e.body["offset" + a],
                      r["offset" + a],
                      r["client" + a]
                    ))
                  : void 0 === n
                  ? k.css(e, t, i)
                  : k.style(e, t, n, i);
              },
              s,
              n ? e : void 0,
              n
            );
          };
        }
      );
    }),
    k.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (e, n) {
        k.fn[n] = function (e, t) {
          return 0 < arguments.length
            ? this.on(n, null, e, t)
            : this.trigger(n);
        };
      }
    ),
    k.fn.extend({
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
    }),
    k.fn.extend({
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
    }),
    (k.proxy = function (e, t) {
      var n, r, i;
      if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), m(e)))
        return (
          (r = s.call(arguments, 2)),
          ((i = function () {
            return e.apply(t || this, r.concat(s.call(arguments)));
          }).guid = e.guid =
            e.guid || k.guid++),
          i
        );
    }),
    (k.holdReady = function (e) {
      e ? k.readyWait++ : k.ready(!0);
    }),
    (k.isArray = Array.isArray),
    (k.parseJSON = JSON.parse),
    (k.nodeName = A),
    (k.isFunction = m),
    (k.isWindow = x),
    (k.camelCase = V),
    (k.type = w),
    (k.now = Date.now),
    (k.isNumeric = function (e) {
      var t = k.type(e);
      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return k;
      });
  var Qt = C.jQuery,
    Jt = C.$;
  return (
    (k.noConflict = function (e) {
      return C.$ === k && (C.$ = Jt), e && C.jQuery === k && (C.jQuery = Qt), k;
    }),
    e || (C.jQuery = C.$ = k),
    k
  );
});
(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["jquery", "popper.js"], t)
    : t(e.jQuery, e.Popper);
})(this, function (e, t) {
  "use strict";
  function n(e, t) {
    for (var n, o = 0; o < t.length; o++)
      (n = t[o]),
        (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
  }
  function o(e, t, o) {
    return t && n(e.prototype, t), o && n(e, o), e;
  }
  function a() {
    return (
      (a =
        Object.assign ||
        function (e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var o in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        }),
      a.apply(this, arguments)
    );
  }
  function r(e, t) {
    (e.prototype = Object.create(t.prototype)),
      (e.prototype.constructor = e),
      (e.__proto__ = t);
  }
  var i = Math.max;
  (e = e && e.hasOwnProperty("default") ? e["default"] : e),
    (t = t && t.hasOwnProperty("default") ? t["default"] : t);
  var l = (function (e) {
      function t(e) {
        return {}.toString
          .call(e)
          .match(/\s([a-zA-Z]+)/)[1]
          .toLowerCase();
      }
      function n() {
        return {
          bindType: i.end,
          delegateType: i.end,
          handle: function (t) {
            return e(t.target).is(this)
              ? t.handleObj.handler.apply(this, arguments)
              : void 0;
          },
        };
      }
      function o() {
        return "undefined" != typeof window && window.QUnit
          ? !1
          : { end: "transitionend" };
      }
      function a(t) {
        var n = this,
          o = !1;
        return (
          e(this).one(l.TRANSITION_END, function () {
            o = !0;
          }),
          setTimeout(function () {
            o || l.triggerTransitionEnd(n);
          }, t),
          this
        );
      }
      function r(t) {
        return (
          (t =
            "function" == typeof e.escapeSelector
              ? e.escapeSelector(t).substr(1)
              : t.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")),
          t
        );
      }
      var i = !1,
        l = {
          TRANSITION_END: "bsTransitionEnd",
          getUID: function (e) {
            do e += ~~(Math.random() * 1e6);
            while (document.getElementById(e));
            return e;
          },
          getSelectorFromElement: function (t) {
            var n = t.getAttribute("data-target");
            (n && "#" !== n) || (n = t.getAttribute("href") || ""),
              "#" === n.charAt(0) && (n = r(n));
            try {
              var o = e(document).find(n);
              return 0 < o.length ? n : null;
            } catch (e) {
              return null;
            }
          },
          reflow: function (e) {
            return e.offsetHeight;
          },
          triggerTransitionEnd: function (t) {
            e(t).trigger(i.end);
          },
          supportsTransitionEnd: function () {
            return !!i;
          },
          isElement: function (e) {
            return (e[0] || e).nodeType;
          },
          typeCheckConfig: function (e, n, o) {
            for (var a in o)
              if (Object.prototype.hasOwnProperty.call(o, a)) {
                var r = o[a],
                  i = n[a],
                  s = i && l.isElement(i) ? "element" : t(i);
                if (!new RegExp(r).test(s))
                  throw new Error(
                    e.toUpperCase() +
                      ": " +
                      ('Option "' + a + '" provided type "' + s + '" ') +
                      ('but expected type "' + r + '".')
                  );
              }
          },
        };
      return (
        (function () {
          (i = o()),
            (e.fn.emulateTransitionEnd = a),
            l.supportsTransitionEnd() &&
              (e.event.special[l.TRANSITION_END] = n());
        })(),
        l
      );
    })(e),
    s = (function (e) {
      var t = "alert",
        n = "bs.alert",
        a = "." + n,
        r = e.fn[t],
        i = {
          CLOSE: "close" + a,
          CLOSED: "closed" + a,
          CLICK_DATA_API: "click" + a + ".data-api",
        },
        s = { ALERT: "alert", FADE: "fade", SHOW: "show" },
        d = (function () {
          function t(e) {
            this._element = e;
          }
          var a = t.prototype;
          return (
            (a.close = function (e) {
              e = e || this._element;
              var t = this._getRootElement(e),
                n = this._triggerCloseEvent(t);
              n.isDefaultPrevented() || this._removeElement(t);
            }),
            (a.dispose = function () {
              e.removeData(this._element, n), (this._element = null);
            }),
            (a._getRootElement = function (t) {
              var n = l.getSelectorFromElement(t),
                o = !1;
              return (
                n && (o = e(n)[0]), o || (o = e(t).closest("." + s.ALERT)[0]), o
              );
            }),
            (a._triggerCloseEvent = function (t) {
              var n = e.Event(i.CLOSE);
              return e(t).trigger(n), n;
            }),
            (a._removeElement = function (t) {
              var n = this;
              return (
                e(t).removeClass(s.SHOW),
                l.supportsTransitionEnd() && e(t).hasClass(s.FADE)
                  ? void e(t)
                      .one(l.TRANSITION_END, function (e) {
                        return n._destroyElement(t, e);
                      })
                      .emulateTransitionEnd(150)
                  : void this._destroyElement(t)
              );
            }),
            (a._destroyElement = function (t) {
              e(t).detach().trigger(i.CLOSED).remove();
            }),
            (t._jQueryInterface = function (o) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new t(this)), a.data(n, r)),
                  "close" === o && r[o](this);
              });
            }),
            (t._handleDismiss = function (e) {
              return function (t) {
                t && t.preventDefault(), e.close(this);
              };
            }),
            o(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
            ]),
            t
          );
        })();
      return (
        e(document).on(
          i.CLICK_DATA_API,
          { DISMISS: '[data-dismiss="alert"]' }.DISMISS,
          d._handleDismiss(new d())
        ),
        (e.fn[t] = d._jQueryInterface),
        (e.fn[t].Constructor = d),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = r), d._jQueryInterface;
        }),
        d
      );
    })(e),
    d = (function (e) {
      var t = "button",
        n = "bs.button",
        a = "." + n,
        r = ".data-api",
        i = e.fn[t],
        l = { ACTIVE: "active", BUTTON: "btn", FOCUS: "focus" },
        s = {
          DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
          DATA_TOGGLE: '[data-toggle="buttons"]',
          INPUT: "input",
          ACTIVE: ".active",
          BUTTON: ".btn",
        },
        d = {
          CLICK_DATA_API: "click" + a + r,
          FOCUS_BLUR_DATA_API: "focus" + a + r + " " + ("blur" + a + r),
        },
        c = (function () {
          function t(e) {
            this._element = e;
          }
          var a = t.prototype;
          return (
            (a.toggle = function () {
              var t = !0,
                n = !0,
                o = e(this._element).closest(s.DATA_TOGGLE)[0];
              if (o) {
                var a = e(this._element).find(s.INPUT)[0];
                if (a) {
                  if ("radio" === a.type)
                    if (a.checked && e(this._element).hasClass(l.ACTIVE))
                      t = !1;
                    else {
                      var r = e(o).find(s.ACTIVE)[0];
                      r && e(r).removeClass(l.ACTIVE);
                    }
                  if (t) {
                    if (
                      a.hasAttribute("disabled") ||
                      o.hasAttribute("disabled") ||
                      a.classList.contains("disabled") ||
                      o.classList.contains("disabled")
                    )
                      return;
                    (a.checked = !e(this._element).hasClass(l.ACTIVE)),
                      e(a).trigger("change");
                  }
                  a.focus(), (n = !1);
                }
              }
              n &&
                this._element.setAttribute(
                  "aria-pressed",
                  !e(this._element).hasClass(l.ACTIVE)
                ),
                t && e(this._element).toggleClass(l.ACTIVE);
            }),
            (a.dispose = function () {
              e.removeData(this._element, n), (this._element = null);
            }),
            (t._jQueryInterface = function (o) {
              return this.each(function () {
                var a = e(this).data(n);
                a || ((a = new t(this)), e(this).data(n, a)),
                  "toggle" === o && a[o]();
              });
            }),
            o(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
            ]),
            t
          );
        })();
      return (
        e(document)
          .on(d.CLICK_DATA_API, s.DATA_TOGGLE_CARROT, function (t) {
            t.preventDefault();
            var n = t.target;
            e(n).hasClass(l.BUTTON) || (n = e(n).closest(s.BUTTON)),
              c._jQueryInterface.call(e(n), "toggle");
          })
          .on(d.FOCUS_BLUR_DATA_API, s.DATA_TOGGLE_CARROT, function (t) {
            var n = e(t.target).closest(s.BUTTON)[0];
            e(n).toggleClass(l.FOCUS, /^focus(in)?$/.test(t.type));
          }),
        (e.fn[t] = c._jQueryInterface),
        (e.fn[t].Constructor = c),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = i), c._jQueryInterface;
        }),
        c
      );
    })(e),
    c = (function (e) {
      var t = "carousel",
        n = "bs.carousel",
        r = "." + n,
        i = ".data-api",
        s = e.fn[t],
        d = {
          interval: 5e3,
          keyboard: !0,
          slide: !1,
          pause: "hover",
          wrap: !0,
        },
        c = {
          interval: "(number|boolean)",
          keyboard: "boolean",
          slide: "(boolean|string)",
          pause: "(string|boolean)",
          wrap: "boolean",
        },
        _ = { NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right" },
        p = {
          SLIDE: "slide" + r,
          SLID: "slid" + r,
          KEYDOWN: "keydown" + r,
          MOUSEENTER: "mouseenter" + r,
          MOUSELEAVE: "mouseleave" + r,
          TOUCHEND: "touchend" + r,
          LOAD_DATA_API: "load" + r + i,
          CLICK_DATA_API: "click" + r + i,
        },
        m = {
          CAROUSEL: "carousel",
          ACTIVE: "active",
          SLIDE: "slide",
          RIGHT: "carousel-item-right",
          LEFT: "carousel-item-left",
          NEXT: "carousel-item-next",
          PREV: "carousel-item-prev",
          ITEM: "carousel-item",
        },
        g = {
          ACTIVE: ".active",
          ACTIVE_ITEM: ".active.carousel-item",
          ITEM: ".carousel-item",
          NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
          INDICATORS: ".carousel-indicators",
          DATA_SLIDE: "[data-slide], [data-slide-to]",
          DATA_RIDE: '[data-ride="carousel"]',
        },
        f = (function () {
          function i(t, n) {
            (this._items = null),
              (this._interval = null),
              (this._activeElement = null),
              (this._isPaused = !1),
              (this._isSliding = !1),
              (this.touchTimeout = null),
              (this._config = this._getConfig(n)),
              (this._element = e(t)[0]),
              (this._indicatorsElement = e(this._element).find(
                g.INDICATORS
              )[0]),
              this._addEventListeners();
          }
          var s = i.prototype;
          return (
            (s.next = function () {
              this._isSliding || this._slide(_.NEXT);
            }),
            (s.nextWhenVisible = function () {
              !document.hidden &&
                e(this._element).is(":visible") &&
                "hidden" !== e(this._element).css("visibility") &&
                this.next();
            }),
            (s.prev = function () {
              this._isSliding || this._slide(_.PREV);
            }),
            (s.pause = function (t) {
              t || (this._isPaused = !0),
                e(this._element).find(g.NEXT_PREV)[0] &&
                  l.supportsTransitionEnd() &&
                  (l.triggerTransitionEnd(this._element), this.cycle(!0)),
                clearInterval(this._interval),
                (this._interval = null);
            }),
            (s.cycle = function (e) {
              e || (this._isPaused = !1),
                this._interval &&
                  (clearInterval(this._interval), (this._interval = null)),
                this._config.interval &&
                  !this._isPaused &&
                  (this._interval = setInterval(
                    (document.visibilityState
                      ? this.nextWhenVisible
                      : this.next
                    ).bind(this),
                    this._config.interval
                  ));
            }),
            (s.to = function (t) {
              var n = this;
              this._activeElement = e(this._element).find(g.ACTIVE_ITEM)[0];
              var o = this._getItemIndex(this._activeElement);
              if (!(t > this._items.length - 1 || 0 > t)) {
                if (this._isSliding)
                  return void e(this._element).one(p.SLID, function () {
                    return n.to(t);
                  });
                if (o === t) return this.pause(), void this.cycle();
                var a = t > o ? _.NEXT : _.PREV;
                this._slide(a, this._items[t]);
              }
            }),
            (s.dispose = function () {
              e(this._element).off(r),
                e.removeData(this._element, n),
                (this._items = null),
                (this._config = null),
                (this._element = null),
                (this._interval = null),
                (this._isPaused = null),
                (this._isSliding = null),
                (this._activeElement = null),
                (this._indicatorsElement = null);
            }),
            (s._getConfig = function (e) {
              return (e = a({}, d, e)), l.typeCheckConfig(t, e, c), e;
            }),
            (s._addEventListeners = function () {
              var t = this;
              this._config.keyboard &&
                e(this._element).on(p.KEYDOWN, function (e) {
                  return t._keydown(e);
                }),
                "hover" === this._config.pause &&
                  (e(this._element)
                    .on(p.MOUSEENTER, function (e) {
                      return t.pause(e);
                    })
                    .on(p.MOUSELEAVE, function (e) {
                      return t.cycle(e);
                    }),
                  "ontouchstart" in document.documentElement &&
                    e(this._element).on(p.TOUCHEND, function () {
                      t.pause(),
                        t.touchTimeout && clearTimeout(t.touchTimeout),
                        (t.touchTimeout = setTimeout(function (e) {
                          return t.cycle(e);
                        }, 500 + t._config.interval));
                    }));
            }),
            (s._keydown = function (e) {
              if (!/input|textarea/i.test(e.target.tagName))
                switch (e.which) {
                  case 37:
                    e.preventDefault(), this.prev();
                    break;
                  case 39:
                    e.preventDefault(), this.next();
                    break;
                  default:
                }
            }),
            (s._getItemIndex = function (t) {
              return (
                (this._items = e.makeArray(e(t).parent().find(g.ITEM))),
                this._items.indexOf(t)
              );
            }),
            (s._getItemByDirection = function (e, t) {
              var n = e === _.NEXT,
                o = e === _.PREV,
                a = this._getItemIndex(t),
                r = this._items.length - 1;
              if (((o && 0 === a) || (n && a === r)) && !this._config.wrap)
                return t;
              var i = e === _.PREV ? -1 : 1,
                l = (a + i) % this._items.length;
              return -1 == l
                ? this._items[this._items.length - 1]
                : this._items[l];
            }),
            (s._triggerSlideEvent = function (t, n) {
              var o = this._getItemIndex(t),
                a = this._getItemIndex(e(this._element).find(g.ACTIVE_ITEM)[0]),
                r = e.Event(p.SLIDE, {
                  relatedTarget: t,
                  direction: n,
                  from: a,
                  to: o,
                });
              return e(this._element).trigger(r), r;
            }),
            (s._setActiveIndicatorElement = function (t) {
              if (this._indicatorsElement) {
                e(this._indicatorsElement).find(g.ACTIVE).removeClass(m.ACTIVE);
                var n = this._indicatorsElement.children[this._getItemIndex(t)];
                n && e(n).addClass(m.ACTIVE);
              }
            }),
            (s._slide = function (t, n) {
              var o,
                a,
                r,
                i = this,
                s = e(this._element).find(g.ACTIVE_ITEM)[0],
                d = this._getItemIndex(s),
                c = n || (s && this._getItemByDirection(t, s)),
                f = this._getItemIndex(c),
                u = !!this._interval;
              if (
                (t === _.NEXT
                  ? ((o = m.LEFT), (a = m.NEXT), (r = _.LEFT))
                  : ((o = m.RIGHT), (a = m.PREV), (r = _.RIGHT)),
                c && e(c).hasClass(m.ACTIVE))
              )
                return void (this._isSliding = !1);
              var E = this._triggerSlideEvent(c, r);
              if (!E.isDefaultPrevented() && s && c) {
                (this._isSliding = !0),
                  u && this.pause(),
                  this._setActiveIndicatorElement(c);
                var h = e.Event(p.SLID, {
                  relatedTarget: c,
                  direction: r,
                  from: d,
                  to: f,
                });
                l.supportsTransitionEnd() && e(this._element).hasClass(m.SLIDE)
                  ? (e(c).addClass(a),
                    l.reflow(c),
                    e(s).addClass(o),
                    e(c).addClass(o),
                    e(s)
                      .one(l.TRANSITION_END, function () {
                        e(c)
                          .removeClass(o + " " + a)
                          .addClass(m.ACTIVE),
                          e(s).removeClass(m.ACTIVE + " " + a + " " + o),
                          (i._isSliding = !1),
                          setTimeout(function () {
                            return e(i._element).trigger(h);
                          }, 0);
                      })
                      .emulateTransitionEnd(600))
                  : (e(s).removeClass(m.ACTIVE),
                    e(c).addClass(m.ACTIVE),
                    (this._isSliding = !1),
                    e(this._element).trigger(h)),
                  u && this.cycle();
              }
            }),
            (i._jQueryInterface = function (t) {
              return this.each(function () {
                var o = e(this).data(n),
                  r = a({}, d, e(this).data());
                "object" == typeof t && (r = a({}, r, t));
                var l = "string" == typeof t ? t : r.slide;
                if (
                  (o || ((o = new i(this, r)), e(this).data(n, o)),
                  "number" == typeof t)
                )
                  o.to(t);
                else if ("string" == typeof l) {
                  if ("undefined" == typeof o[l])
                    throw new TypeError('No method named "' + l + '"');
                  o[l]();
                } else r.interval && (o.pause(), o.cycle());
              });
            }),
            (i._dataApiClickHandler = function (t) {
              var o = l.getSelectorFromElement(this);
              if (o) {
                var r = e(o)[0];
                if (r && e(r).hasClass(m.CAROUSEL)) {
                  var s = a({}, e(r).data(), e(this).data()),
                    d = this.getAttribute("data-slide-to");
                  d && (s.interval = !1),
                    i._jQueryInterface.call(e(r), s),
                    d && e(r).data(n).to(d),
                    t.preventDefault();
                }
              }
            }),
            o(i, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return d;
                },
              },
            ]),
            i
          );
        })();
      return (
        e(document).on(p.CLICK_DATA_API, g.DATA_SLIDE, f._dataApiClickHandler),
        e(window).on(p.LOAD_DATA_API, function () {
          e(g.DATA_RIDE).each(function () {
            var t = e(this);
            f._jQueryInterface.call(t, t.data());
          });
        }),
        (e.fn[t] = f._jQueryInterface),
        (e.fn[t].Constructor = f),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = s), f._jQueryInterface;
        }),
        f
      );
    })(e),
    _ = (function (e) {
      var t = "collapse",
        n = "bs.collapse",
        r = "." + n,
        i = e.fn[t],
        s = 600,
        d = { toggle: !0, parent: "" },
        c = { toggle: "boolean", parent: "(string|element)" },
        _ = {
          SHOW: "show" + r,
          SHOWN: "shown" + r,
          HIDE: "hide" + r,
          HIDDEN: "hidden" + r,
          CLICK_DATA_API: "click" + r + ".data-api",
        },
        p = {
          SHOW: "show",
          COLLAPSE: "collapse",
          COLLAPSING: "collapsing",
          COLLAPSED: "collapsed",
        },
        m = { WIDTH: "width", HEIGHT: "height" },
        g = {
          ACTIVES: ".show, .collapsing",
          DATA_TOGGLE: '[data-toggle="collapse"]',
        },
        f = (function () {
          function r(t, n) {
            (this._isTransitioning = !1),
              (this._element = t),
              (this._config = this._getConfig(n)),
              (this._triggerArray = e.makeArray(
                e(
                  '[data-toggle="collapse"][href="#' +
                    t.id +
                    '"],' +
                    ('[data-toggle="collapse"][data-target="#' + t.id + '"]')
                )
              ));
            for (var o = e(g.DATA_TOGGLE), a = 0; a < o.length; a++) {
              var r = o[a],
                i = l.getSelectorFromElement(r);
              null !== i &&
                0 < e(i).filter(t).length &&
                ((this._selector = i), this._triggerArray.push(r));
            }
            (this._parent = this._config.parent ? this._getParent() : null),
              this._config.parent ||
                this._addAriaAndCollapsedClass(
                  this._element,
                  this._triggerArray
                ),
              this._config.toggle && this.toggle();
          }
          var i = r.prototype;
          return (
            (i.toggle = function () {
              e(this._element).hasClass(p.SHOW) ? this.hide() : this.show();
            }),
            (i.show = function () {
              var t = this;
              if (
                !(this._isTransitioning || e(this._element).hasClass(p.SHOW))
              ) {
                var o, a;
                if (
                  (this._parent &&
                    ((o = e.makeArray(
                      e(this._parent)
                        .find(g.ACTIVES)
                        .filter('[data-parent="' + this._config.parent + '"]')
                    )),
                    0 === o.length && (o = null)),
                  !(
                    o &&
                    ((a = e(o).not(this._selector).data(n)),
                    a && a._isTransitioning)
                  ))
                ) {
                  var i = e.Event(_.SHOW);
                  if ((e(this._element).trigger(i), !i.isDefaultPrevented())) {
                    o &&
                      (r._jQueryInterface.call(
                        e(o).not(this._selector),
                        "hide"
                      ),
                      !a && e(o).data(n, null));
                    var d = this._getDimension();
                    e(this._element)
                      .removeClass(p.COLLAPSE)
                      .addClass(p.COLLAPSING),
                      (this._element.style[d] = 0),
                      0 < this._triggerArray.length &&
                        e(this._triggerArray)
                          .removeClass(p.COLLAPSED)
                          .attr("aria-expanded", !0),
                      this.setTransitioning(!0);
                    var c = function () {
                      e(t._element)
                        .removeClass(p.COLLAPSING)
                        .addClass(p.COLLAPSE)
                        .addClass(p.SHOW),
                        (t._element.style[d] = ""),
                        t.setTransitioning(!1),
                        e(t._element).trigger(_.SHOWN);
                    };
                    if (!l.supportsTransitionEnd()) return void c();
                    var m = d[0].toUpperCase() + d.slice(1);
                    e(this._element)
                      .one(l.TRANSITION_END, c)
                      .emulateTransitionEnd(s),
                      (this._element.style[d] =
                        this._element["scroll" + m] + "px");
                  }
                }
              }
            }),
            (i.hide = function () {
              var t = this;
              if (!this._isTransitioning && e(this._element).hasClass(p.SHOW)) {
                var n = e.Event(_.HIDE);
                if ((e(this._element).trigger(n), !n.isDefaultPrevented())) {
                  var o = this._getDimension();
                  if (
                    ((this._element.style[o] =
                      this._element.getBoundingClientRect()[o] + "px"),
                    l.reflow(this._element),
                    e(this._element)
                      .addClass(p.COLLAPSING)
                      .removeClass(p.COLLAPSE)
                      .removeClass(p.SHOW),
                    0 < this._triggerArray.length)
                  )
                    for (var a = 0; a < this._triggerArray.length; a++) {
                      var r = this._triggerArray[a],
                        i = l.getSelectorFromElement(r);
                      if (null !== i) {
                        var d = e(i);
                        d.hasClass(p.SHOW) ||
                          e(r).addClass(p.COLLAPSED).attr("aria-expanded", !1);
                      }
                    }
                  this.setTransitioning(!0);
                  var c = function () {
                    t.setTransitioning(!1),
                      e(t._element)
                        .removeClass(p.COLLAPSING)
                        .addClass(p.COLLAPSE)
                        .trigger(_.HIDDEN);
                  };
                  return (
                    (this._element.style[o] = ""),
                    l.supportsTransitionEnd()
                      ? void e(this._element)
                          .one(l.TRANSITION_END, c)
                          .emulateTransitionEnd(s)
                      : void c()
                  );
                }
              }
            }),
            (i.setTransitioning = function (e) {
              this._isTransitioning = e;
            }),
            (i.dispose = function () {
              e.removeData(this._element, n),
                (this._config = null),
                (this._parent = null),
                (this._element = null),
                (this._triggerArray = null),
                (this._isTransitioning = null);
            }),
            (i._getConfig = function (e) {
              return (
                (e = a({}, d, e)),
                (e.toggle = !!e.toggle),
                l.typeCheckConfig(t, e, c),
                e
              );
            }),
            (i._getDimension = function () {
              var t = e(this._element).hasClass(m.WIDTH);
              return t ? m.WIDTH : m.HEIGHT;
            }),
            (i._getParent = function () {
              var t = this,
                n = null;
              l.isElement(this._config.parent)
                ? ((n = this._config.parent),
                  "undefined" != typeof this._config.parent.jquery &&
                    (n = this._config.parent[0]))
                : (n = e(this._config.parent)[0]);
              var o =
                '[data-toggle="collapse"][data-parent="' +
                this._config.parent +
                '"]';
              return (
                e(n)
                  .find(o)
                  .each(function (e, n) {
                    t._addAriaAndCollapsedClass(r._getTargetFromElement(n), [
                      n,
                    ]);
                  }),
                n
              );
            }),
            (i._addAriaAndCollapsedClass = function (t, n) {
              if (t) {
                var o = e(t).hasClass(p.SHOW);
                0 < n.length &&
                  e(n).toggleClass(p.COLLAPSED, !o).attr("aria-expanded", o);
              }
            }),
            (r._getTargetFromElement = function (t) {
              var n = l.getSelectorFromElement(t);
              return n ? e(n)[0] : null;
            }),
            (r._jQueryInterface = function (t) {
              return this.each(function () {
                var o = e(this),
                  i = o.data(n),
                  l = a({}, d, o.data(), "object" == typeof t && t);
                if (
                  (!i && l.toggle && /show|hide/.test(t) && (l.toggle = !1),
                  i || ((i = new r(this, l)), o.data(n, i)),
                  "string" == typeof t)
                ) {
                  if ("undefined" == typeof i[t])
                    throw new TypeError('No method named "' + t + '"');
                  i[t]();
                }
              });
            }),
            o(r, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return d;
                },
              },
            ]),
            r
          );
        })();
      return (
        e(document).on(_.CLICK_DATA_API, g.DATA_TOGGLE, function (t) {
          "A" === t.currentTarget.tagName && t.preventDefault();
          var o = e(this),
            a = l.getSelectorFromElement(this);
          e(a).each(function () {
            var t = e(this),
              a = t.data(n),
              r = a ? "toggle" : o.data();
            f._jQueryInterface.call(t, r);
          });
        }),
        (e.fn[t] = f._jQueryInterface),
        (e.fn[t].Constructor = f),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = i), f._jQueryInterface;
        }),
        f
      );
    })(e),
    p = (function (e) {
      var t = "modal",
        n = "bs.modal",
        r = "." + n,
        i = e.fn[t],
        s = 300,
        d = 150,
        c = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
        _ = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          focus: "boolean",
          show: "boolean",
        },
        p = {
          HIDE: "hide" + r,
          HIDDEN: "hidden" + r,
          SHOW: "show" + r,
          SHOWN: "shown" + r,
          FOCUSIN: "focusin" + r,
          RESIZE: "resize" + r,
          CLICK_DISMISS: "click.dismiss" + r,
          KEYDOWN_DISMISS: "keydown.dismiss" + r,
          MOUSEUP_DISMISS: "mouseup.dismiss" + r,
          MOUSEDOWN_DISMISS: "mousedown.dismiss" + r,
          CLICK_DATA_API: "click" + r + ".data-api",
        },
        m = {
          SCROLLBAR_MEASURER: "modal-scrollbar-measure",
          BACKDROP: "modal-backdrop",
          OPEN: "modal-open",
          FADE: "fade",
          SHOW: "show",
        },
        g = {
          DIALOG: ".modal-dialog",
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          STICKY_CONTENT: ".sticky-top",
          NAVBAR_TOGGLER: ".navbar-toggler",
        },
        f = (function () {
          function i(t, n) {
            (this._config = this._getConfig(n)),
              (this._element = t),
              (this._dialog = e(t).find(g.DIALOG)[0]),
              (this._backdrop = null),
              (this._isShown = !1),
              (this._isBodyOverflowing = !1),
              (this._ignoreBackdropClick = !1),
              (this._originalBodyPadding = 0),
              (this._scrollbarWidth = 0);
          }
          var f = i.prototype;
          return (
            (f.toggle = function (e) {
              return this._isShown ? this.hide() : this.show(e);
            }),
            (f.show = function (t) {
              var n = this;
              if (!(this._isTransitioning || this._isShown)) {
                l.supportsTransitionEnd() &&
                  e(this._element).hasClass(m.FADE) &&
                  (this._isTransitioning = !0);
                var o = e.Event(p.SHOW, { relatedTarget: t });
                e(this._element).trigger(o),
                  this._isShown ||
                    o.isDefaultPrevented() ||
                    ((this._isShown = !0),
                    this._checkScrollbar(),
                    this._setScrollbar(),
                    this._adjustDialog(),
                    e(document.body).addClass(m.OPEN),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    e(this._element).on(
                      p.CLICK_DISMISS,
                      g.DATA_DISMISS,
                      function (e) {
                        return n.hide(e);
                      }
                    ),
                    e(this._dialog).on(p.MOUSEDOWN_DISMISS, function () {
                      e(n._element).one(p.MOUSEUP_DISMISS, function (t) {
                        e(t.target).is(n._element) &&
                          (n._ignoreBackdropClick = !0);
                      });
                    }),
                    this._showBackdrop(function () {
                      return n._showElement(t);
                    }));
              }
            }),
            (f.hide = function (t) {
              var n = this;
              if (
                (t && t.preventDefault(),
                !this._isTransitioning && this._isShown)
              ) {
                var o = e.Event(p.HIDE);
                if (
                  (e(this._element).trigger(o),
                  this._isShown && !o.isDefaultPrevented())
                ) {
                  this._isShown = !1;
                  var a =
                    l.supportsTransitionEnd() &&
                    e(this._element).hasClass(m.FADE);
                  a && (this._isTransitioning = !0),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    e(document).off(p.FOCUSIN),
                    e(this._element).removeClass(m.SHOW),
                    e(this._element).off(p.CLICK_DISMISS),
                    e(this._dialog).off(p.MOUSEDOWN_DISMISS),
                    a
                      ? e(this._element)
                          .one(l.TRANSITION_END, function (e) {
                            return n._hideModal(e);
                          })
                          .emulateTransitionEnd(s)
                      : this._hideModal();
                }
              }
            }),
            (f.dispose = function () {
              e.removeData(this._element, n),
                e(window, document, this._element, this._backdrop).off(r),
                (this._config = null),
                (this._element = null),
                (this._dialog = null),
                (this._backdrop = null),
                (this._isShown = null),
                (this._isBodyOverflowing = null),
                (this._ignoreBackdropClick = null),
                (this._scrollbarWidth = null);
            }),
            (f.handleUpdate = function () {
              this._adjustDialog();
            }),
            (f._getConfig = function (e) {
              return (e = a({}, c, e)), l.typeCheckConfig(t, e, _), e;
            }),
            (f._showElement = function (t) {
              var n = this,
                o =
                  l.supportsTransitionEnd() &&
                  e(this._element).hasClass(m.FADE);
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                document.body.appendChild(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                (this._element.scrollTop = 0),
                o && l.reflow(this._element),
                e(this._element).addClass(m.SHOW),
                this._config.focus && this._enforceFocus();
              var a = e.Event(p.SHOWN, { relatedTarget: t }),
                r = function () {
                  n._config.focus && n._element.focus(),
                    (n._isTransitioning = !1),
                    e(n._element).trigger(a);
                };
              o
                ? e(this._dialog)
                    .one(l.TRANSITION_END, r)
                    .emulateTransitionEnd(s)
                : r();
            }),
            (f._enforceFocus = function () {
              var t = this;
              e(document)
                .off(p.FOCUSIN)
                .on(p.FOCUSIN, function (n) {
                  document !== n.target &&
                    t._element !== n.target &&
                    0 === e(t._element).has(n.target).length &&
                    t._element.focus();
                });
            }),
            (f._setEscapeEvent = function () {
              var t = this;
              this._isShown && this._config.keyboard
                ? e(this._element).on(p.KEYDOWN_DISMISS, function (e) {
                    e.which === 27 && (e.preventDefault(), t.hide());
                  })
                : !this._isShown && e(this._element).off(p.KEYDOWN_DISMISS);
            }),
            (f._setResizeEvent = function () {
              var t = this;
              this._isShown
                ? e(window).on(p.RESIZE, function (e) {
                    return t.handleUpdate(e);
                  })
                : e(window).off(p.RESIZE);
            }),
            (f._hideModal = function () {
              var t = this;
              (this._element.style.display = "none"),
                this._element.setAttribute("aria-hidden", !0),
                (this._isTransitioning = !1),
                this._showBackdrop(function () {
                  e(document.body).removeClass(m.OPEN),
                    t._resetAdjustments(),
                    t._resetScrollbar(),
                    e(t._element).trigger(p.HIDDEN);
                });
            }),
            (f._removeBackdrop = function () {
              this._backdrop &&
                (e(this._backdrop).remove(), (this._backdrop = null));
            }),
            (f._showBackdrop = function (t) {
              var n = this,
                o = e(this._element).hasClass(m.FADE) ? m.FADE : "";
              if (this._isShown && this._config.backdrop) {
                var a = l.supportsTransitionEnd() && o;
                if (
                  ((this._backdrop = document.createElement("div")),
                  (this._backdrop.className = m.BACKDROP),
                  o && e(this._backdrop).addClass(o),
                  e(this._backdrop).appendTo(document.body),
                  e(this._element).on(p.CLICK_DISMISS, function (e) {
                    return n._ignoreBackdropClick
                      ? void (n._ignoreBackdropClick = !1)
                      : void (
                          e.target !== e.currentTarget ||
                          ("static" === n._config.backdrop
                            ? n._element.focus()
                            : n.hide())
                        );
                  }),
                  a && l.reflow(this._backdrop),
                  e(this._backdrop).addClass(m.SHOW),
                  !t)
                )
                  return;
                if (!a) return void t();
                e(this._backdrop)
                  .one(l.TRANSITION_END, t)
                  .emulateTransitionEnd(d);
              } else if (!this._isShown && this._backdrop) {
                e(this._backdrop).removeClass(m.SHOW);
                var r = function () {
                  n._removeBackdrop(), t && t();
                };
                l.supportsTransitionEnd() && e(this._element).hasClass(m.FADE)
                  ? e(this._backdrop)
                      .one(l.TRANSITION_END, r)
                      .emulateTransitionEnd(d)
                  : r();
              } else t && t();
            }),
            (f._adjustDialog = function () {
              var e =
                this._element.scrollHeight >
                document.documentElement.clientHeight;
              !this._isBodyOverflowing &&
                e &&
                (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
                this._isBodyOverflowing &&
                  !e &&
                  (this._element.style.paddingRight =
                    this._scrollbarWidth + "px");
            }),
            (f._resetAdjustments = function () {
              (this._element.style.paddingLeft = ""),
                (this._element.style.paddingRight = "");
            }),
            (f._checkScrollbar = function () {
              var e = document.body.getBoundingClientRect();
              (this._isBodyOverflowing = e.left + e.right < window.innerWidth),
                (this._scrollbarWidth = this._getScrollbarWidth());
            }),
            (f._setScrollbar = function () {
              var t = this;
              if (this._isBodyOverflowing) {
                e(g.FIXED_CONTENT).each(function (n, o) {
                  var a = e(o)[0].style.paddingRight,
                    r = e(o).css("padding-right");
                  e(o)
                    .data("padding-right", a)
                    .css(
                      "padding-right",
                      parseFloat(r) + t._scrollbarWidth + "px"
                    );
                }),
                  e(g.STICKY_CONTENT).each(function (n, o) {
                    var a = e(o)[0].style.marginRight,
                      r = e(o).css("margin-right");
                    e(o)
                      .data("margin-right", a)
                      .css(
                        "margin-right",
                        parseFloat(r) - t._scrollbarWidth + "px"
                      );
                  }),
                  e(g.NAVBAR_TOGGLER).each(function (n, o) {
                    var a = e(o)[0].style.marginRight,
                      r = e(o).css("margin-right");
                    e(o)
                      .data("margin-right", a)
                      .css(
                        "margin-right",
                        parseFloat(r) + t._scrollbarWidth + "px"
                      );
                  });
                var n = document.body.style.paddingRight,
                  o = e("body").css("padding-right");
                e("body")
                  .data("padding-right", n)
                  .css(
                    "padding-right",
                    parseFloat(o) + this._scrollbarWidth + "px"
                  );
              }
            }),
            (f._resetScrollbar = function () {
              e(g.FIXED_CONTENT).each(function (t, n) {
                var o = e(n).data("padding-right");
                "undefined" != typeof o &&
                  e(n).css("padding-right", o).removeData("padding-right");
              }),
                e(g.STICKY_CONTENT + ", " + g.NAVBAR_TOGGLER).each(function (
                  t,
                  n
                ) {
                  var o = e(n).data("margin-right");
                  "undefined" != typeof o &&
                    e(n).css("margin-right", o).removeData("margin-right");
                });
              var t = e("body").data("padding-right");
              "undefined" != typeof t &&
                e("body").css("padding-right", t).removeData("padding-right");
            }),
            (f._getScrollbarWidth = function () {
              var e = document.createElement("div");
              (e.className = m.SCROLLBAR_MEASURER),
                document.body.appendChild(e);
              var t = e.getBoundingClientRect().width - e.clientWidth;
              return document.body.removeChild(e), t;
            }),
            (i._jQueryInterface = function (t, o) {
              return this.each(function () {
                var r = e(this).data(n),
                  l = a(
                    {},
                    i.Default,
                    e(this).data(),
                    "object" == typeof t && t
                  );
                if (
                  (r || ((r = new i(this, l)), e(this).data(n, r)),
                  "string" == typeof t)
                ) {
                  if ("undefined" == typeof r[t])
                    throw new TypeError('No method named "' + t + '"');
                  r[t](o);
                } else l.show && r.show(o);
              });
            }),
            o(i, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return c;
                },
              },
            ]),
            i
          );
        })();
      return (
        e(document).on(p.CLICK_DATA_API, g.DATA_TOGGLE, function (t) {
          var o,
            r = this,
            i = l.getSelectorFromElement(this);
          i && (o = e(i)[0]);
          var s = e(o).data(n) ? "toggle" : a({}, e(o).data(), e(this).data());
          ("A" === this.tagName || "AREA" === this.tagName) &&
            t.preventDefault();
          var d = e(o).one(p.SHOW, function (t) {
            t.isDefaultPrevented() ||
              d.one(p.HIDDEN, function () {
                e(r).is(":visible") && r.focus();
              });
          });
          f._jQueryInterface.call(e(o), s, this);
        }),
        (e.fn[t] = f._jQueryInterface),
        (e.fn[t].Constructor = f),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = i), f._jQueryInterface;
        }),
        f
      );
    })(e),
    m = (function (e) {
      var n = "tooltip",
        r = "bs.tooltip",
        i = "." + r,
        s = e.fn[n],
        d = /(^|\s)bs-tooltip\S+/g,
        c = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)",
        },
        _ = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left",
        },
        p = {
          animation: !0,
          template:
            '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: "hover focus",
          title: "",
          delay: 0,
          html: !1,
          selector: !1,
          placement: "top",
          offset: 0,
          container: !1,
          fallbackPlacement: "flip",
          boundary: "scrollParent",
        },
        m = { SHOW: "show", OUT: "out" },
        g = {
          HIDE: "hide" + i,
          HIDDEN: "hidden" + i,
          SHOW: "show" + i,
          SHOWN: "shown" + i,
          INSERTED: "inserted" + i,
          CLICK: "click" + i,
          FOCUSIN: "focusin" + i,
          FOCUSOUT: "focusout" + i,
          MOUSEENTER: "mouseenter" + i,
          MOUSELEAVE: "mouseleave" + i,
        },
        f = { FADE: "fade", SHOW: "show" },
        u = {
          TOOLTIP: ".tooltip",
          TOOLTIP_INNER: ".tooltip-inner",
          ARROW: ".arrow",
        },
        E = {
          HOVER: "hover",
          FOCUS: "focus",
          CLICK: "click",
          MANUAL: "manual",
        },
        h = (function () {
          function s(e, n) {
            if ("undefined" == typeof t)
              throw new TypeError(
                "Bootstrap tooltips require Popper.js (https://popper.js.org)"
              );
            (this._isEnabled = !0),
              (this._timeout = 0),
              (this._hoverState = ""),
              (this._activeTrigger = {}),
              (this._popper = null),
              (this.element = e),
              (this.config = this._getConfig(n)),
              (this.tip = null),
              this._setListeners();
          }
          var h = s.prototype;
          return (
            (h.enable = function () {
              this._isEnabled = !0;
            }),
            (h.disable = function () {
              this._isEnabled = !1;
            }),
            (h.toggleEnabled = function () {
              this._isEnabled = !this._isEnabled;
            }),
            (h.toggle = function (t) {
              if (this._isEnabled)
                if (t) {
                  var n = this.constructor.DATA_KEY,
                    o = e(t.currentTarget).data(n);
                  o ||
                    ((o = new this.constructor(
                      t.currentTarget,
                      this._getDelegateConfig()
                    )),
                    e(t.currentTarget).data(n, o)),
                    (o._activeTrigger.click = !o._activeTrigger.click),
                    o._isWithActiveTrigger()
                      ? o._enter(null, o)
                      : o._leave(null, o);
                } else {
                  if (e(this.getTipElement()).hasClass(f.SHOW))
                    return void this._leave(null, this);
                  this._enter(null, this);
                }
            }),
            (h.dispose = function () {
              clearTimeout(this._timeout),
                e.removeData(this.element, this.constructor.DATA_KEY),
                e(this.element).off(this.constructor.EVENT_KEY),
                e(this.element).closest(".modal").off("hide.bs.modal"),
                this.tip && e(this.tip).remove(),
                (this._isEnabled = null),
                (this._timeout = null),
                (this._hoverState = null),
                (this._activeTrigger = null),
                null !== this._popper && this._popper.destroy(),
                (this._popper = null),
                (this.element = null),
                (this.config = null),
                (this.tip = null);
            }),
            (h.show = function () {
              var n = this;
              if ("none" === e(this.element).css("display"))
                throw new Error("Please use show on visible elements");
              var o = e.Event(this.constructor.Event.SHOW);
              if (this.isWithContent() && this._isEnabled) {
                e(this.element).trigger(o);
                var a = e.contains(
                  this.element.ownerDocument.documentElement,
                  this.element
                );
                if (o.isDefaultPrevented() || !a) return;
                var r = this.getTipElement(),
                  i = l.getUID(this.constructor.NAME);
                r.setAttribute("id", i),
                  this.element.setAttribute("aria-describedby", i),
                  this.setContent(),
                  this.config.animation && e(r).addClass(f.FADE);
                var d =
                    "function" == typeof this.config.placement
                      ? this.config.placement.call(this, r, this.element)
                      : this.config.placement,
                  c = this._getAttachment(d);
                this.addAttachmentClass(c);
                var _ =
                  !1 === this.config.container
                    ? document.body
                    : e(this.config.container);
                e(r).data(this.constructor.DATA_KEY, this),
                  e.contains(
                    this.element.ownerDocument.documentElement,
                    this.tip
                  ) || e(r).appendTo(_),
                  e(this.element).trigger(this.constructor.Event.INSERTED),
                  (this._popper = new t(this.element, r, {
                    placement: c,
                    modifiers: {
                      offset: { offset: this.config.offset },
                      flip: { behavior: this.config.fallbackPlacement },
                      arrow: { element: u.ARROW },
                      preventOverflow: {
                        boundariesElement: this.config.boundary,
                      },
                    },
                    onCreate: function (e) {
                      e.originalPlacement !== e.placement &&
                        n._handlePopperPlacementChange(e);
                    },
                    onUpdate: function (e) {
                      n._handlePopperPlacementChange(e);
                    },
                  })),
                  e(r).addClass(f.SHOW),
                  "ontouchstart" in document.documentElement &&
                    e("body").children().on("mouseover", null, e.noop);
                var p = function () {
                  n.config.animation && n._fixTransition();
                  var t = n._hoverState;
                  (n._hoverState = null),
                    e(n.element).trigger(n.constructor.Event.SHOWN),
                    t === m.OUT && n._leave(null, n);
                };
                l.supportsTransitionEnd() && e(this.tip).hasClass(f.FADE)
                  ? e(this.tip)
                      .one(l.TRANSITION_END, p)
                      .emulateTransitionEnd(s._TRANSITION_DURATION)
                  : p();
              }
            }),
            (h.hide = function (t) {
              var n = this,
                o = this.getTipElement(),
                a = e.Event(this.constructor.Event.HIDE),
                r = function () {
                  n._hoverState !== m.SHOW &&
                    o.parentNode &&
                    o.parentNode.removeChild(o),
                    n._cleanTipClass(),
                    n.element.removeAttribute("aria-describedby"),
                    e(n.element).trigger(n.constructor.Event.HIDDEN),
                    null !== n._popper && n._popper.destroy(),
                    t && t();
                };
              e(this.element).trigger(a),
                a.isDefaultPrevented() ||
                  (e(o).removeClass(f.SHOW),
                  "ontouchstart" in document.documentElement &&
                    e("body").children().off("mouseover", null, e.noop),
                  (this._activeTrigger[E.CLICK] = !1),
                  (this._activeTrigger[E.FOCUS] = !1),
                  (this._activeTrigger[E.HOVER] = !1),
                  l.supportsTransitionEnd() && e(this.tip).hasClass(f.FADE)
                    ? e(o).one(l.TRANSITION_END, r).emulateTransitionEnd(150)
                    : r(),
                  (this._hoverState = ""));
            }),
            (h.update = function () {
              null !== this._popper && this._popper.scheduleUpdate();
            }),
            (h.isWithContent = function () {
              return !!this.getTitle();
            }),
            (h.addAttachmentClass = function (t) {
              e(this.getTipElement()).addClass("bs-tooltip" + "-" + t);
            }),
            (h.getTipElement = function () {
              return (
                (this.tip = this.tip || e(this.config.template)[0]), this.tip
              );
            }),
            (h.setContent = function () {
              var t = e(this.getTipElement());
              this.setElementContent(t.find(u.TOOLTIP_INNER), this.getTitle()),
                t.removeClass(f.FADE + " " + f.SHOW);
            }),
            (h.setElementContent = function (t, n) {
              var o = this.config.html;
              "object" == typeof n && (n.nodeType || n.jquery)
                ? o
                  ? !e(n).parent().is(t) && t.empty().append(n)
                  : t.text(e(n).text())
                : t[o ? "html" : "text"](n);
            }),
            (h.getTitle = function () {
              var e = this.element.getAttribute("data-original-title");
              return (
                e ||
                  (e =
                    "function" == typeof this.config.title
                      ? this.config.title.call(this.element)
                      : this.config.title),
                e
              );
            }),
            (h._getAttachment = function (e) {
              return _[e.toUpperCase()];
            }),
            (h._setListeners = function () {
              var t = this,
                n = this.config.trigger.split(" ");
              n.forEach(function (n) {
                if ("click" === n)
                  e(t.element).on(
                    t.constructor.Event.CLICK,
                    t.config.selector,
                    function (e) {
                      return t.toggle(e);
                    }
                  );
                else if (n !== E.MANUAL) {
                  var o =
                      n === E.HOVER
                        ? t.constructor.Event.MOUSEENTER
                        : t.constructor.Event.FOCUSIN,
                    a =
                      n === E.HOVER
                        ? t.constructor.Event.MOUSELEAVE
                        : t.constructor.Event.FOCUSOUT;
                  e(t.element)
                    .on(o, t.config.selector, function (e) {
                      return t._enter(e);
                    })
                    .on(a, t.config.selector, function (e) {
                      return t._leave(e);
                    });
                }
                e(t.element)
                  .closest(".modal")
                  .on("hide.bs.modal", function () {
                    return t.hide();
                  });
              }),
                this.config.selector
                  ? (this.config = a({}, this.config, {
                      trigger: "manual",
                      selector: "",
                    }))
                  : this._fixTitle();
            }),
            (h._fixTitle = function () {
              var e = typeof this.element.getAttribute("data-original-title");
              (this.element.getAttribute("title") || "string" != e) &&
                (this.element.setAttribute(
                  "data-original-title",
                  this.element.getAttribute("title") || ""
                ),
                this.element.setAttribute("title", ""));
            }),
            (h._enter = function (t, n) {
              var o = this.constructor.DATA_KEY;
              return ((n = n || e(t.currentTarget).data(o)),
              n ||
                ((n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                e(t.currentTarget).data(o, n)),
              t &&
                (n._activeTrigger["focusin" === t.type ? E.FOCUS : E.HOVER] =
                  !0),
              e(n.getTipElement()).hasClass(f.SHOW) || n._hoverState === m.SHOW)
                ? void (n._hoverState = m.SHOW)
                : (clearTimeout(n._timeout),
                  (n._hoverState = m.SHOW),
                  n.config.delay && n.config.delay.show
                    ? void (n._timeout = setTimeout(function () {
                        n._hoverState === m.SHOW && n.show();
                      }, n.config.delay.show))
                    : void n.show());
            }),
            (h._leave = function (t, n) {
              var o = this.constructor.DATA_KEY;
              if (
                ((n = n || e(t.currentTarget).data(o)),
                n ||
                  ((n = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  e(t.currentTarget).data(o, n)),
                t &&
                  (n._activeTrigger["focusout" === t.type ? E.FOCUS : E.HOVER] =
                    !1),
                !n._isWithActiveTrigger())
              )
                return (
                  clearTimeout(n._timeout),
                  (n._hoverState = m.OUT),
                  n.config.delay && n.config.delay.hide
                    ? void (n._timeout = setTimeout(function () {
                        n._hoverState === m.OUT && n.hide();
                      }, n.config.delay.hide))
                    : void n.hide()
                );
            }),
            (h._isWithActiveTrigger = function () {
              for (var e in this._activeTrigger)
                if (this._activeTrigger[e]) return !0;
              return !1;
            }),
            (h._getConfig = function (t) {
              return (
                (t = a(
                  {},
                  this.constructor.Default,
                  e(this.element).data(),
                  t
                )),
                "number" == typeof t.delay &&
                  (t.delay = { show: t.delay, hide: t.delay }),
                "number" == typeof t.title && (t.title = t.title.toString()),
                "number" == typeof t.content &&
                  (t.content = t.content.toString()),
                l.typeCheckConfig(n, t, this.constructor.DefaultType),
                t
              );
            }),
            (h._getDelegateConfig = function () {
              var e = {};
              if (this.config)
                for (var t in this.config)
                  this.constructor.Default[t] !== this.config[t] &&
                    (e[t] = this.config[t]);
              return e;
            }),
            (h._cleanTipClass = function () {
              var t = e(this.getTipElement()),
                n = t.attr("class").match(d);
              null !== n && 0 < n.length && t.removeClass(n.join(""));
            }),
            (h._handlePopperPlacementChange = function (e) {
              this._cleanTipClass(),
                this.addAttachmentClass(this._getAttachment(e.placement));
            }),
            (h._fixTransition = function () {
              var t = this.getTipElement(),
                n = this.config.animation;
              null !== t.getAttribute("x-placement") ||
                (e(t).removeClass(f.FADE),
                (this.config.animation = !1),
                this.hide(),
                this.show(),
                (this.config.animation = n));
            }),
            (s._jQueryInterface = function (t) {
              return this.each(function () {
                var n = e(this).data(r);
                if (
                  (n || !/dispose|hide/.test(t)) &&
                  (n ||
                    ((n = new s(this, "object" == typeof t && t)),
                    e(this).data(r, n)),
                  "string" == typeof t)
                ) {
                  if ("undefined" == typeof n[t])
                    throw new TypeError('No method named "' + t + '"');
                  n[t]();
                }
              });
            }),
            o(s, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return p;
                },
              },
              {
                key: "NAME",
                get: function () {
                  return n;
                },
              },
              {
                key: "DATA_KEY",
                get: function () {
                  return r;
                },
              },
              {
                key: "Event",
                get: function () {
                  return g;
                },
              },
              {
                key: "EVENT_KEY",
                get: function () {
                  return i;
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return c;
                },
              },
            ]),
            s
          );
        })();
      return (
        (e.fn[n] = h._jQueryInterface),
        (e.fn[n].Constructor = h),
        (e.fn[n].noConflict = function () {
          return (e.fn[n] = s), h._jQueryInterface;
        }),
        h
      );
    })(e, t),
    g = (function (e) {
      var t = "popover",
        n = "bs.popover",
        i = "." + n,
        l = e.fn[t],
        s = /(^|\s)bs-popover\S+/g,
        d = a({}, m.Default, {
          placement: "right",
          trigger: "click",
          content: "",
          template:
            '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        }),
        c = a({}, m.DefaultType, { content: "(string|element|function)" }),
        _ = { FADE: "fade", SHOW: "show" },
        p = { TITLE: ".popover-header", CONTENT: ".popover-body" },
        g = {
          HIDE: "hide" + i,
          HIDDEN: "hidden" + i,
          SHOW: "show" + i,
          SHOWN: "shown" + i,
          INSERTED: "inserted" + i,
          CLICK: "click" + i,
          FOCUSIN: "focusin" + i,
          FOCUSOUT: "focusout" + i,
          MOUSEENTER: "mouseenter" + i,
          MOUSELEAVE: "mouseleave" + i,
        },
        f = (function (a) {
          function l() {
            return a.apply(this, arguments) || this;
          }
          r(l, a);
          var m = l.prototype;
          return (
            (m.isWithContent = function () {
              return this.getTitle() || this._getContent();
            }),
            (m.addAttachmentClass = function (t) {
              e(this.getTipElement()).addClass("bs-popover" + "-" + t);
            }),
            (m.getTipElement = function () {
              return (
                (this.tip = this.tip || e(this.config.template)[0]), this.tip
              );
            }),
            (m.setContent = function () {
              var t = e(this.getTipElement());
              this.setElementContent(t.find(p.TITLE), this.getTitle());
              var n = this._getContent();
              "function" == typeof n && (n = n.call(this.element)),
                this.setElementContent(t.find(p.CONTENT), n),
                t.removeClass(_.FADE + " " + _.SHOW);
            }),
            (m._getContent = function () {
              return (
                this.element.getAttribute("data-content") || this.config.content
              );
            }),
            (m._cleanTipClass = function () {
              var t = e(this.getTipElement()),
                n = t.attr("class").match(s);
              null !== n && 0 < n.length && t.removeClass(n.join(""));
            }),
            (l._jQueryInterface = function (t) {
              return this.each(function () {
                var o = e(this).data(n),
                  a = "object" == typeof t ? t : null;
                if (
                  (o || !/destroy|hide/.test(t)) &&
                  (o || ((o = new l(this, a)), e(this).data(n, o)),
                  "string" == typeof t)
                ) {
                  if ("undefined" == typeof o[t])
                    throw new TypeError('No method named "' + t + '"');
                  o[t]();
                }
              });
            }),
            o(l, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return d;
                },
              },
              {
                key: "NAME",
                get: function () {
                  return t;
                },
              },
              {
                key: "DATA_KEY",
                get: function () {
                  return n;
                },
              },
              {
                key: "Event",
                get: function () {
                  return g;
                },
              },
              {
                key: "EVENT_KEY",
                get: function () {
                  return i;
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return c;
                },
              },
            ]),
            l
          );
        })(m);
      return (
        (e.fn[t] = f._jQueryInterface),
        (e.fn[t].Constructor = f),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = l), f._jQueryInterface;
        }),
        f
      );
    })(e),
    f = (function (e) {
      var t = "scrollspy",
        n = "bs.scrollspy",
        r = "." + n,
        s = e.fn[t],
        d = { offset: 10, method: "auto", target: "" },
        c = { offset: "number", method: "string", target: "(string|element)" },
        _ = {
          ACTIVATE: "activate" + r,
          SCROLL: "scroll" + r,
          LOAD_DATA_API: "load" + r + ".data-api",
        },
        p = {
          DROPDOWN_ITEM: "dropdown-item",
          DROPDOWN_MENU: "dropdown-menu",
          ACTIVE: "active",
        },
        m = {
          DATA_SPY: '[data-spy="scroll"]',
          ACTIVE: ".active",
          NAV_LIST_GROUP: ".nav, .list-group",
          NAV_LINKS: ".nav-link",
          NAV_ITEMS: ".nav-item",
          LIST_ITEMS: ".list-group-item",
          DROPDOWN: ".dropdown",
          DROPDOWN_ITEMS: ".dropdown-item",
          DROPDOWN_TOGGLE: ".dropdown-toggle",
        },
        g = { OFFSET: "offset", POSITION: "position" },
        f = (function () {
          function s(t, n) {
            var o = this;
            (this._element = t),
              (this._scrollElement = "BODY" === t.tagName ? window : t),
              (this._config = this._getConfig(n)),
              (this._selector =
                this._config.target +
                " " +
                m.NAV_LINKS +
                "," +
                (this._config.target + " " + m.LIST_ITEMS + ",") +
                (this._config.target + " " + m.DROPDOWN_ITEMS)),
              (this._offsets = []),
              (this._targets = []),
              (this._activeTarget = null),
              (this._scrollHeight = 0),
              e(this._scrollElement).on(_.SCROLL, function (e) {
                return o._process(e);
              }),
              this.refresh(),
              this._process();
          }
          var f = s.prototype;
          return (
            (f.refresh = function () {
              var t = this,
                n =
                  this._scrollElement === this._scrollElement.window
                    ? g.OFFSET
                    : g.POSITION,
                o = "auto" === this._config.method ? n : this._config.method,
                a = o === g.POSITION ? this._getScrollTop() : 0;
              (this._offsets = []),
                (this._targets = []),
                (this._scrollHeight = this._getScrollHeight());
              var r = e.makeArray(e(this._selector));
              r.map(function (t) {
                var n,
                  r = l.getSelectorFromElement(t);
                if ((r && (n = e(r)[0]), n)) {
                  var i = n.getBoundingClientRect();
                  if (i.width || i.height) return [e(n)[o]().top + a, r];
                }
                return null;
              })
                .filter(function (e) {
                  return e;
                })
                .sort(function (e, t) {
                  return e[0] - t[0];
                })
                .forEach(function (e) {
                  t._offsets.push(e[0]), t._targets.push(e[1]);
                });
            }),
            (f.dispose = function () {
              e.removeData(this._element, n),
                e(this._scrollElement).off(r),
                (this._element = null),
                (this._scrollElement = null),
                (this._config = null),
                (this._selector = null),
                (this._offsets = null),
                (this._targets = null),
                (this._activeTarget = null),
                (this._scrollHeight = null);
            }),
            (f._getConfig = function (n) {
              if (((n = a({}, d, n)), "string" != typeof n.target)) {
                var o = e(n.target).attr("id");
                o || ((o = l.getUID(t)), e(n.target).attr("id", o)),
                  (n.target = "#" + o);
              }
              return l.typeCheckConfig(t, n, c), n;
            }),
            (f._getScrollTop = function () {
              return this._scrollElement === window
                ? this._scrollElement.pageYOffset
                : this._scrollElement.scrollTop;
            }),
            (f._getScrollHeight = function () {
              return (
                this._scrollElement.scrollHeight ||
                i(
                  document.body.scrollHeight,
                  document.documentElement.scrollHeight
                )
              );
            }),
            (f._getOffsetHeight = function () {
              return this._scrollElement === window
                ? window.innerHeight
                : this._scrollElement.getBoundingClientRect().height;
            }),
            (f._process = function () {
              var e = this._getScrollTop() + this._config.offset,
                t = this._getScrollHeight(),
                n = this._config.offset + t - this._getOffsetHeight();
              if ((this._scrollHeight !== t && this.refresh(), e >= n)) {
                var o = this._targets[this._targets.length - 1];
                return void (this._activeTarget !== o && this._activate(o));
              }
              if (
                this._activeTarget &&
                e < this._offsets[0] &&
                0 < this._offsets[0]
              )
                return (this._activeTarget = null), void this._clear();
              for (var a, r = this._offsets.length; r--; )
                (a =
                  this._activeTarget !== this._targets[r] &&
                  e >= this._offsets[r] &&
                  ("undefined" == typeof this._offsets[r + 1] ||
                    e < this._offsets[r + 1])),
                  a && this._activate(this._targets[r]);
            }),
            (f._activate = function (t) {
              (this._activeTarget = t), this._clear();
              var n = this._selector.split(",");
              n = n.map(function (e) {
                return (
                  e + '[data-target="' + t + '"],' + (e + '[href="' + t + '"]')
                );
              });
              var o = e(n.join(","));
              o.hasClass(p.DROPDOWN_ITEM)
                ? (o
                    .closest(m.DROPDOWN)
                    .find(m.DROPDOWN_TOGGLE)
                    .addClass(p.ACTIVE),
                  o.addClass(p.ACTIVE))
                : (o.addClass(p.ACTIVE),
                  o
                    .parents(m.NAV_LIST_GROUP)
                    .prev(m.NAV_LINKS + ", " + m.LIST_ITEMS)
                    .addClass(p.ACTIVE),
                  o
                    .parents(m.NAV_LIST_GROUP)
                    .prev(m.NAV_ITEMS)
                    .children(m.NAV_LINKS)
                    .addClass(p.ACTIVE)),
                e(this._scrollElement).trigger(_.ACTIVATE, {
                  relatedTarget: t,
                });
            }),
            (f._clear = function () {
              e(this._selector).filter(m.ACTIVE).removeClass(p.ACTIVE);
            }),
            (s._jQueryInterface = function (t) {
              return this.each(function () {
                var o = e(this).data(n);
                if (
                  (o ||
                    ((o = new s(this, "object" == typeof t && t)),
                    e(this).data(n, o)),
                  "string" == typeof t)
                ) {
                  if ("undefined" == typeof o[t])
                    throw new TypeError('No method named "' + t + '"');
                  o[t]();
                }
              });
            }),
            o(s, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return d;
                },
              },
            ]),
            s
          );
        })();
      return (
        e(window).on(_.LOAD_DATA_API, function () {
          for (var t, n = e.makeArray(e(m.DATA_SPY)), o = n.length; o--; )
            (t = e(n[o])), f._jQueryInterface.call(t, t.data());
        }),
        (e.fn[t] = f._jQueryInterface),
        (e.fn[t].Constructor = f),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = s), f._jQueryInterface;
        }),
        f
      );
    })(e),
    u = (function (e) {
      var t = "tab",
        n = "bs.tab",
        a = "." + n,
        r = e.fn[t],
        i = {
          HIDE: "hide" + a,
          HIDDEN: "hidden" + a,
          SHOW: "show" + a,
          SHOWN: "shown" + a,
          CLICK_DATA_API: "click" + a + ".data-api",
        },
        s = {
          DROPDOWN_MENU: "dropdown-menu",
          ACTIVE: "active",
          DISABLED: "disabled",
          FADE: "fade",
          SHOW: "show",
        },
        d = {
          DROPDOWN: ".dropdown",
          NAV_LIST_GROUP: ".nav, .list-group",
          ACTIVE: ".active",
          ACTIVE_UL: "> li > .active",
          DATA_TOGGLE:
            '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
          DROPDOWN_TOGGLE: ".dropdown-toggle",
          DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active",
        },
        c = (function () {
          function t(e) {
            this._element = e;
          }
          var a = t.prototype;
          return (
            (a.show = function () {
              var t = this;
              if (
                !(
                  (this._element.parentNode &&
                    this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                    e(this._element).hasClass(s.ACTIVE)) ||
                  e(this._element).hasClass(s.DISABLED)
                )
              ) {
                var n,
                  o,
                  a = e(this._element).closest(d.NAV_LIST_GROUP)[0],
                  r = l.getSelectorFromElement(this._element);
                if (a) {
                  var c = "UL" === a.nodeName ? d.ACTIVE_UL : d.ACTIVE;
                  (o = e.makeArray(e(a).find(c))), (o = o[o.length - 1]);
                }
                var _ = e.Event(i.HIDE, { relatedTarget: this._element }),
                  p = e.Event(i.SHOW, { relatedTarget: o });
                if (
                  (o && e(o).trigger(_),
                  e(this._element).trigger(p),
                  !(p.isDefaultPrevented() || _.isDefaultPrevented()))
                ) {
                  r && (n = e(r)[0]), this._activate(this._element, a);
                  var m = function () {
                    var n = e.Event(i.HIDDEN, { relatedTarget: t._element }),
                      a = e.Event(i.SHOWN, { relatedTarget: o });
                    e(o).trigger(n), e(t._element).trigger(a);
                  };
                  n ? this._activate(n, n.parentNode, m) : m();
                }
              }
            }),
            (a.dispose = function () {
              e.removeData(this._element, n), (this._element = null);
            }),
            (a._activate = function (t, n, o) {
              var a,
                r = this;
              a =
                "UL" === n.nodeName
                  ? e(n).find(d.ACTIVE_UL)
                  : e(n).children(d.ACTIVE);
              var i = a[0],
                c =
                  o && l.supportsTransitionEnd() && i && e(i).hasClass(s.FADE),
                _ = function () {
                  return r._transitionComplete(t, i, o);
                };
              i && c
                ? e(i).one(l.TRANSITION_END, _).emulateTransitionEnd(150)
                : _();
            }),
            (a._transitionComplete = function (t, n, o) {
              if (n) {
                e(n).removeClass(s.SHOW + " " + s.ACTIVE);
                var a = e(n.parentNode).find(d.DROPDOWN_ACTIVE_CHILD)[0];
                a && e(a).removeClass(s.ACTIVE),
                  "tab" === n.getAttribute("role") &&
                    n.setAttribute("aria-selected", !1);
              }
              if (
                (e(t).addClass(s.ACTIVE),
                "tab" === t.getAttribute("role") &&
                  t.setAttribute("aria-selected", !0),
                l.reflow(t),
                e(t).addClass(s.SHOW),
                t.parentNode && e(t.parentNode).hasClass(s.DROPDOWN_MENU))
              ) {
                var r = e(t).closest(d.DROPDOWN)[0];
                r && e(r).find(d.DROPDOWN_TOGGLE).addClass(s.ACTIVE),
                  t.setAttribute("aria-expanded", !0);
              }
              o && o();
            }),
            (t._jQueryInterface = function (o) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                if (
                  (r || ((r = new t(this)), a.data(n, r)), "string" == typeof o)
                ) {
                  if ("undefined" == typeof r[o])
                    throw new TypeError('No method named "' + o + '"');
                  r[o]();
                }
              });
            }),
            o(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
            ]),
            t
          );
        })();
      return (
        e(document).on(i.CLICK_DATA_API, d.DATA_TOGGLE, function (t) {
          t.preventDefault(), c._jQueryInterface.call(e(this), "show");
        }),
        (e.fn[t] = c._jQueryInterface),
        (e.fn[t].Constructor = c),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = r), c._jQueryInterface;
        }),
        c
      );
    })(e),
    E = (function () {
      function e() {
        if (window.QUnit) return !1;
        var e = document.createElement("bmd");
        for (var t in o) if (void 0 !== e.style[t]) return o[t];
        return !1;
      }
      var t = !1,
        n = "",
        o = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      return (
        (function () {
          for (var a in ((t = e()), o)) n += " " + o[a];
        })(),
        {
          transitionEndSupported: function () {
            return t;
          },
          transitionEndSelector: function () {
            return n;
          },
          isChar: function (e) {
            return (
              !("undefined" != typeof e.which) ||
              ("number" == typeof e.which &&
                0 < e.which &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.altKey &&
                8 !== e.which &&
                9 !== e.which &&
                13 !== e.which &&
                16 !== e.which &&
                17 !== e.which &&
                20 !== e.which &&
                27 !== e.which)
            );
          },
          assert: function (e, t, n) {
            if (t)
              throw (
                (void 0 === !e && e.css("border", "1px solid red"),
                console.error(n, e),
                n)
              );
          },
          describe: function (e) {
            return void 0 === e
              ? "undefined"
              : 0 === e.length
              ? "(no matching elements)"
              : e[0].outerHTML.split(">")[0] + ">";
          },
        }
      );
    })(jQuery),
    h = (function (e) {
      var t = {
          BMD_FORM_GROUP: "bmd-form-group",
          IS_FILLED: "is-filled",
          IS_FOCUSED: "is-focused",
        },
        n = { BMD_FORM_GROUP: "." + t.BMD_FORM_GROUP },
        o = {},
        a = (function () {
          function a(t, n, a) {
            for (var r in (void 0 === a && (a = {}),
            (this.$element = t),
            (this.config = e.extend(!0, {}, o, n)),
            a))
              this[r] = a[r];
          }
          var r = a.prototype;
          return (
            (r.dispose = function (e) {
              this.$element.data(e, null),
                (this.$element = null),
                (this.config = null);
            }),
            (r.addFormGroupFocus = function () {
              this.$element.prop("disabled") ||
                this.$bmdFormGroup.addClass(t.IS_FOCUSED);
            }),
            (r.removeFormGroupFocus = function () {
              this.$bmdFormGroup.removeClass(t.IS_FOCUSED);
            }),
            (r.removeIsFilled = function () {
              this.$bmdFormGroup.removeClass(t.IS_FILLED);
            }),
            (r.addIsFilled = function () {
              this.$bmdFormGroup.addClass(t.IS_FILLED);
            }),
            (r.findMdbFormGroup = function (t) {
              void 0 === t && (t = !0);
              var o = this.$element.closest(n.BMD_FORM_GROUP);
              return (
                0 === o.length &&
                  t &&
                  e.error(
                    "Failed to find " +
                      n.BMD_FORM_GROUP +
                      " for " +
                      E.describe(this.$element)
                  ),
                o
              );
            }),
            a
          );
        })();
      return a;
    })(jQuery),
    A = (function (e) {
      var t = {
          FORM_GROUP: "form-group",
          BMD_FORM_GROUP: "bmd-form-group",
          BMD_LABEL: "bmd-label",
          BMD_LABEL_STATIC: "bmd-label-static",
          BMD_LABEL_PLACEHOLDER: "bmd-label-placeholder",
          BMD_LABEL_FLOATING: "bmd-label-floating",
          HAS_DANGER: "has-danger",
          IS_FILLED: "is-filled",
          IS_FOCUSED: "is-focused",
          INPUT_GROUP: "input-group",
        },
        n = {
          FORM_GROUP: "." + t.FORM_GROUP,
          BMD_FORM_GROUP: "." + t.BMD_FORM_GROUP,
          BMD_LABEL_WILDCARD:
            "label[class^='" +
            t.BMD_LABEL +
            "'], label[class*=' " +
            t.BMD_LABEL +
            "']",
        },
        o = {
          validate: !1,
          formGroup: { required: !1 },
          bmdFormGroup: {
            template: "<span class='" + t.BMD_FORM_GROUP + "'></span>",
            create: !0,
            required: !0,
          },
          label: {
            required: !1,
            selectors: [".form-control-label", "> label"],
            className: t.BMD_LABEL_STATIC,
          },
          requiredClasses: [],
          invalidComponentMatches: [],
          convertInputSizeVariations: !0,
        },
        a = {
          "form-control-lg": "bmd-form-group-lg",
          "form-control-sm": "bmd-form-group-sm",
        },
        i = (function (i) {
          function l(t, n, a) {
            var r;
            return (
              void 0 === a && (a = {}),
              (r = i.call(this, t, e.extend(!0, {}, o, n), a) || this),
              r._rejectInvalidComponentMatches(),
              r.rejectWithoutRequiredStructure(),
              r._rejectWithoutRequiredClasses(),
              (r.$formGroup = r.findFormGroup(r.config.formGroup.required)),
              (r.$bmdFormGroup = r.resolveMdbFormGroup()),
              (r.$bmdLabel = r.resolveMdbLabel()),
              r.resolveMdbFormGroupSizing(),
              r.addFocusListener(),
              r.addChangeListener(),
              "" != r.$element.val() && r.addIsFilled(),
              r
            );
          }
          r(l, i);
          var s = l.prototype;
          return (
            (s.dispose = function (e) {
              i.prototype.dispose.call(this, e),
                (this.$bmdFormGroup = null),
                (this.$formGroup = null);
            }),
            (s.rejectWithoutRequiredStructure = function () {}),
            (s.addFocusListener = function () {
              var e = this;
              this.$element
                .on("focus", function () {
                  e.addFormGroupFocus();
                })
                .on("blur", function () {
                  e.removeFormGroupFocus();
                });
            }),
            (s.addChangeListener = function () {
              var e = this;
              this.$element
                .on("keydown paste", function (t) {
                  E.isChar(t) && e.addIsFilled();
                })
                .on("keyup change", function () {
                  if (
                    (e.isEmpty() ? e.removeIsFilled() : e.addIsFilled(),
                    e.config.validate)
                  ) {
                    var t =
                      "undefined" == typeof e.$element[0].checkValidity ||
                      e.$element[0].checkValidity();
                    t ? e.removeHasDanger() : e.addHasDanger();
                  }
                });
            }),
            (s.addHasDanger = function () {
              this.$bmdFormGroup.addClass(t.HAS_DANGER);
            }),
            (s.removeHasDanger = function () {
              this.$bmdFormGroup.removeClass(t.HAS_DANGER);
            }),
            (s.isEmpty = function () {
              return (
                null === this.$element.val() ||
                void 0 === this.$element.val() ||
                "" === this.$element.val()
              );
            }),
            (s.resolveMdbFormGroup = function () {
              var e = this.findMdbFormGroup(!1);
              return (
                (void 0 === e || 0 === e.length) &&
                  (this.config.bmdFormGroup.create &&
                  (void 0 === this.$formGroup || 0 === this.$formGroup.length)
                    ? this.outerElement().parent().hasClass(t.INPUT_GROUP)
                      ? this.outerElement()
                          .parent()
                          .wrap(this.config.bmdFormGroup.template)
                      : this.outerElement().wrap(
                          this.config.bmdFormGroup.template
                        )
                    : this.$formGroup.addClass(t.BMD_FORM_GROUP),
                  (e = this.findMdbFormGroup(
                    this.config.bmdFormGroup.required
                  ))),
                e
              );
            }),
            (s.outerElement = function () {
              return this.$element;
            }),
            (s.resolveMdbLabel = function () {
              var e = this.$bmdFormGroup.find(n.BMD_LABEL_WILDCARD);
              return (
                (void 0 === e || 0 === e.length) &&
                  ((e = this.findMdbLabel(this.config.label.required)),
                  void 0 === e ||
                    0 === e.length ||
                    e.addClass(this.config.label.className)),
                e
              );
            }),
            (s.findMdbLabel = function (t) {
              void 0 === t && (t = !0);
              for (
                var o = null,
                  a = this.config.label.selectors,
                  r = Array.isArray(a),
                  i = 0,
                  a = r ? a : a[Symbol.iterator]();
                ;

              ) {
                var l;
                if (r) {
                  if (i >= a.length) break;
                  l = a[i++];
                } else {
                  if (((i = a.next()), i.done)) break;
                  l = i.value;
                }
                var s = l;
                if (
                  ((o = e.isFunction(s) ? s(this) : this.$bmdFormGroup.find(s)),
                  void 0 !== o && 0 < o.length)
                )
                  break;
              }
              return (
                0 === o.length &&
                  t &&
                  e.error(
                    "Failed to find " +
                      n.BMD_LABEL_WILDCARD +
                      " within form-group for " +
                      E.describe(this.$element)
                  ),
                o
              );
            }),
            (s.findFormGroup = function (t) {
              void 0 === t && (t = !0);
              var o = this.$element.closest(n.FORM_GROUP);
              return (
                0 === o.length &&
                  t &&
                  e.error(
                    "Failed to find " +
                      n.FORM_GROUP +
                      " for " +
                      E.describe(this.$element)
                  ),
                o
              );
            }),
            (s.resolveMdbFormGroupSizing = function () {
              if (this.config.convertInputSizeVariations)
                for (var e in a)
                  this.$element.hasClass(e) &&
                    this.$bmdFormGroup.addClass(a[e]);
            }),
            (s._rejectInvalidComponentMatches = function () {
              for (
                var e = this.config.invalidComponentMatches,
                  t = Array.isArray(e),
                  n = 0,
                  e = t ? e : e[Symbol.iterator]();
                ;

              ) {
                var o;
                if (t) {
                  if (n >= e.length) break;
                  o = e[n++];
                } else {
                  if (((n = e.next()), n.done)) break;
                  o = n.value;
                }
                var a = o;
                a.rejectMatch(this.constructor.name, this.$element);
              }
            }),
            (s._rejectWithoutRequiredClasses = function () {
              for (
                var e = this.config.requiredClasses,
                  t = Array.isArray(e),
                  n = 0,
                  e = t ? e : e[Symbol.iterator]();
                ;

              ) {
                var o;
                if (t) {
                  if (n >= e.length) break;
                  o = e[n++];
                } else {
                  if (((n = e.next()), n.done)) break;
                  o = n.value;
                }
                var a = o;
                if (-1 !== a.indexOf("||"))
                  for (
                    var r = a.split("||"),
                      i = r,
                      l = Array.isArray(i),
                      s = 0,
                      i = l ? i : i[Symbol.iterator]();
                    ;

                  ) {
                    var d;
                    if (l) {
                      if (s >= i.length) break;
                      d = i[s++];
                    } else {
                      if (((s = i.next()), s.done)) break;
                      d = s.value;
                    }
                    var c = d;
                    if (this.$element.hasClass(c)) break;
                  }
                else if (this.$element.hasClass(a));
              }
            }),
            l
          );
        })(h);
      return i;
    })(jQuery),
    C = (function (e) {
      var t = { label: { required: !1 } },
        n = { LABEL: "label" },
        o = (function (o) {
          function a(n, a, r) {
            var i;
            return (
              (i = o.call(this, n, e.extend(!0, {}, t, a), r) || this),
              i.decorateMarkup(),
              i
            );
          }
          r(a, o);
          var i = a.prototype;
          return (
            (i.decorateMarkup = function () {
              var t = e(this.config.template);
              this.$element.after(t),
                !1 !== this.config.ripples && t.bmdRipples();
            }),
            (i.outerElement = function () {
              return this.$element.parent().closest("." + this.outerClass);
            }),
            (i.rejectWithoutRequiredStructure = function () {
              E.assert(
                this.$element,
                "label" === !this.$element.parent().prop("tagName"),
                this.constructor.name +
                  "'s " +
                  E.describe(this.$element) +
                  " parent element should be <label>."
              ),
                E.assert(
                  this.$element,
                  !this.outerElement().hasClass(this.outerClass),
                  this.constructor.name +
                    "'s " +
                    E.describe(this.$element) +
                    " outer element should have class " +
                    this.outerClass +
                    "."
                );
            }),
            (i.addFocusListener = function () {
              var e = this;
              this.$element.closest(n.LABEL).hover(
                function () {
                  e.addFormGroupFocus();
                },
                function () {
                  e.removeFormGroupFocus();
                }
              );
            }),
            (i.addChangeListener = function () {
              var e = this;
              this.$element.change(function () {
                e.$element.blur();
              });
            }),
            a
          );
        })(A);
      return o;
    })(jQuery),
    I = (function (e) {
      var t = "checkbox",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = {
          template:
            "<span class='checkbox-decorator'><span class='check'></span></span>",
        },
        l = (function (o) {
          function a(n, a, r) {
            return (
              void 0 === r && (r = { inputType: t, outerClass: t }),
              o.call(this, n, e.extend(!0, i, a), r) || this
            );
          }
          r(a, o);
          var l = a.prototype;
          return (
            (l.dispose = function (e) {
              void 0 === e && (e = n), o.prototype.dispose.call(this, e);
            }),
            (a.matches = function (e) {
              return "checkbox" === e.attr("type");
            }),
            (a.rejectMatch = function (e, t) {
              E.assert(
                this.$element,
                this.matches(t),
                e +
                  " component element " +
                  E.describe(t) +
                  " is invalid for type='checkbox'."
              );
            }),
            (a._jQueryInterface = function (t) {
              return this.each(function () {
                var o = e(this),
                  r = o.data(n);
                r || ((r = new a(o, t)), o.data(n, r));
              });
            }),
            a
          );
        })(C);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    T = (function (e) {
      var t = "checkboxInline",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = { bmdFormGroup: { create: !1, required: !1 } },
        l = (function (t) {
          function o(n, o, a) {
            return (
              void 0 === a &&
                (a = { inputType: "checkbox", outerClass: "checkbox-inline" }),
              t.call(this, n, e.extend(!0, {}, i, o), a) || this
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n);
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(I);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    N = (function (e) {
      var t = "collapseInline",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = { ANY_INPUT: "input, select, textarea" },
        l = {
          IN: "in",
          COLLAPSE: "collapse",
          COLLAPSING: "collapsing",
          COLLAPSED: "collapsed",
          WIDTH: "width",
        },
        s = {},
        d = (function (t) {
          function o(n, o) {
            var a;
            (a = t.call(this, n, e.extend(!0, {}, s, o)) || this),
              (a.$bmdFormGroup = a.findMdbFormGroup(!0));
            var r = n.data("target");
            (a.$collapse = e(r)),
              E.assert(
                n,
                0 === a.$collapse.length,
                "Cannot find collapse target for " + E.describe(n)
              ),
              E.assert(
                a.$collapse,
                !a.$collapse.hasClass(l.COLLAPSE),
                E.describe(a.$collapse) +
                  " is expected to have the '" +
                  l.COLLAPSE +
                  "' class.  It is being targeted by " +
                  E.describe(n)
              );
            var d = a.$bmdFormGroup.find(i.ANY_INPUT);
            return (
              0 < d.length && (a.$input = d.first()),
              a.$collapse.hasClass(l.WIDTH) || a.$collapse.addClass(l.WIDTH),
              a.$input &&
                (a.$collapse.on("shown.bs.collapse", function () {
                  a.$input.focus();
                }),
                a.$input.blur(function () {
                  a.$collapse.collapse("hide");
                })),
              a
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n),
                (this.$bmdFormGroup = null),
                (this.$collapse = null),
                (this.$input = null);
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(h);
      return (
        (e.fn[o] = d._jQueryInterface),
        (e.fn[o].Constructor = d),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), d._jQueryInterface;
        }),
        d
      );
    })(jQuery),
    b = (function (e) {
      var t = "file",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = {},
        l = { FILE: t, IS_FILE: "is-file" },
        s = { FILENAMES: "input.form-control[readonly]" },
        d = (function (t) {
          function o(n, o) {
            var a;
            return (
              (a = t.call(this, n, e.extend(!0, i, o)) || this),
              a.$bmdFormGroup.addClass(l.IS_FILE),
              a
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n);
            }),
            (o.matches = function (e) {
              return "file" === e.attr("type");
            }),
            (o.rejectMatch = function (e, t) {
              E.assert(
                this.$element,
                this.matches(t),
                e +
                  " component element " +
                  E.describe(t) +
                  " is invalid for type='file'."
              );
            }),
            (a.outerElement = function () {
              return this.$element.parent().closest("." + l.FILE);
            }),
            (a.rejectWithoutRequiredStructure = function () {
              E.assert(
                this.$element,
                "label" === !this.outerElement().prop("tagName"),
                this.constructor.name +
                  "'s " +
                  E.describe(this.$element) +
                  " parent element " +
                  E.describe(this.outerElement()) +
                  " should be <label>."
              ),
                E.assert(
                  this.$element,
                  !this.outerElement().hasClass(l.FILE),
                  this.constructor.name +
                    "'s " +
                    E.describe(this.$element) +
                    " parent element " +
                    E.describe(this.outerElement()) +
                    " should have class ." +
                    l.FILE +
                    "."
                );
            }),
            (a.addFocusListener = function () {
              var e = this;
              this.$bmdFormGroup
                .on("focus", function () {
                  e.addFormGroupFocus();
                })
                .on("blur", function () {
                  e.removeFormGroupFocus();
                });
            }),
            (a.addChangeListener = function () {
              var t = this;
              this.$element.on("change", function () {
                var n = "";
                e.each(t.$element.files, function (e, t) {
                  n += t.name + "  , ";
                }),
                  (n = n.substring(0, n.length - 2)),
                  n ? t.addIsFilled() : t.removeIsFilled(),
                  t.$bmdFormGroup.find(s.FILENAMES).val(n);
              });
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(A);
      return (
        (e.fn[o] = d._jQueryInterface),
        (e.fn[o].Constructor = d),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), d._jQueryInterface;
        }),
        d
      );
    })(jQuery),
    O = (function (e) {
      var t = "radio",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = { template: "<span class='bmd-radio'></span>" },
        l = (function (o) {
          function a(n, a, r) {
            return (
              void 0 === r && (r = { inputType: t, outerClass: t }),
              o.call(this, n, e.extend(!0, i, a), r) || this
            );
          }
          r(a, o);
          var l = a.prototype;
          return (
            (l.dispose = function (e) {
              void 0 === e && (e = n), o.prototype.dispose.call(this, e);
            }),
            (a.matches = function (e) {
              return "radio" === e.attr("type");
            }),
            (a.rejectMatch = function (e, t) {
              E.assert(
                this.$element,
                this.matches(t),
                e +
                  " component element " +
                  E.describe(t) +
                  " is invalid for type='radio'."
              );
            }),
            (a._jQueryInterface = function (t) {
              return this.each(function () {
                var o = e(this),
                  r = o.data(n);
                r || ((r = new a(o, t)), o.data(n, r));
              });
            }),
            a
          );
        })(C);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    y = (function (e) {
      var t = "radioInline",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = { bmdFormGroup: { create: !1, required: !1 } },
        l = (function (t) {
          function o(n, o, a) {
            return (
              void 0 === a &&
                (a = { inputType: "radio", outerClass: "radio-inline" }),
              t.call(this, n, e.extend(!0, {}, i, o), a) || this
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n);
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(O);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    D = (function (e) {
      var t = { requiredClasses: ["form-control"] },
        n = (function (n) {
          function o(o, a) {
            var r;
            return (
              (r = n.call(this, o, e.extend(!0, t, a)) || this),
              r.isEmpty() && r.removeIsFilled(),
              r
            );
          }
          return r(o, n), o;
        })(A);
      return n;
    })(jQuery),
    S = (function (e) {
      var t = "select",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = { requiredClasses: ["form-control||custom-select"] },
        l = (function (t) {
          function o(n, o) {
            var a;
            return (
              (a = t.call(this, n, e.extend(!0, i, o)) || this),
              a.addIsFilled(),
              a
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n);
            }),
            (o.matches = function (e) {
              return "select" === e.prop("tagName");
            }),
            (o.rejectMatch = function (e, t) {
              E.assert(
                this.$element,
                this.matches(t),
                e +
                  " component element " +
                  E.describe(t) +
                  " is invalid for <select>."
              );
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(D);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    v = (function (e) {
      var t = "switch",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = { template: "<span class='bmd-switch-track'></span>" },
        l = (function (t) {
          function o(n, o, a) {
            return (
              void 0 === a &&
                (a = { inputType: "checkbox", outerClass: "switch" }),
              t.call(this, n, e.extend(!0, {}, i, o), a) || this
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n);
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(I);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    R = (function (e) {
      var t = "text",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = {},
        l = (function (t) {
          function o(n, o) {
            return t.call(this, n, e.extend(!0, i, o)) || this;
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function (e) {
              void 0 === e && (e = n), t.prototype.dispose.call(this, e);
            }),
            (o.matches = function (e) {
              return "text" === e.attr("type");
            }),
            (o.rejectMatch = function (e, t) {
              E.assert(
                this.$element,
                this.matches(t),
                e +
                  " component element " +
                  E.describe(t) +
                  " is invalid for type='text'."
              );
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(D);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    M = (function (e) {
      var t = "textarea",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = {},
        l = (function (t) {
          function o(n, o) {
            return t.call(this, n, e.extend(!0, i, o)) || this;
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n);
            }),
            (o.matches = function (e) {
              return "textarea" === e.prop("tagName");
            }),
            (o.rejectMatch = function (e, t) {
              E.assert(
                this.$element,
                this.matches(t),
                e +
                  " component element " +
                  E.describe(t) +
                  " is invalid for <textarea>."
              );
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(D);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery),
    L = (function (e) {
      if ("undefined" == typeof Popper)
        throw new Error(
          "Bootstrap dropdown require Popper.js (https://popper.js.org)"
        );
      var t = "dropdown",
        n = "bs.dropdown",
        a = "." + n,
        r = ".data-api",
        i = e.fn[t],
        s = 27,
        d = 32,
        c = 9,
        _ = /38|40|27/,
        p = {
          HIDE: "hide" + a,
          HIDDEN: "hidden" + a,
          SHOW: "show" + a,
          SHOWN: "shown" + a,
          CLICK: "click" + a,
          CLICK_DATA_API: "click" + a + r,
          KEYDOWN_DATA_API: "keydown" + a + r,
          KEYUP_DATA_API: "keyup" + a + r,
          TRANSITION_END:
            "transitionend webkitTransitionEnd oTransitionEnd animationend webkitAnimationEnd oAnimationEnd",
        },
        m = {
          DISABLED: "disabled",
          SHOW: "show",
          SHOWING: "showing",
          HIDING: "hiding",
          DROPUP: "dropup",
          MENURIGHT: "dropdown-menu-right",
          MENULEFT: "dropdown-menu-left",
        },
        g = {
          DATA_TOGGLE: '[data-toggle="dropdown"]',
          FORM_CHILD: ".dropdown form",
          MENU: ".dropdown-menu",
          NAVBAR_NAV: ".navbar-nav",
          VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)",
        },
        f = {
          TOP: "top-start",
          TOPEND: "top-end",
          BOTTOM: "bottom-start",
          BOTTOMEND: "bottom-end",
        },
        u = { placement: f.BOTTOM, offset: 0, flip: !0 },
        E = { placement: "string", offset: "(number|string)", flip: "boolean" },
        h = (function () {
          function r(e, t) {
            (this._element = e),
              (this._popper = null),
              (this._config = this._getConfig(t)),
              (this._menu = this._getMenuElement()),
              (this._inNavbar = this._detectNavbar()),
              this._addEventListeners();
          }
          var i = r.prototype;
          return (
            (i.toggle = function () {
              var t = this;
              if (
                !(
                  this._element.disabled ||
                  e(this._element).hasClass(m.DISABLED)
                )
              ) {
                var n = r._getParentFromElement(this._element),
                  o = e(this._menu).hasClass(m.SHOW);
                if ((r._clearMenus(), !o)) {
                  var a = { relatedTarget: this._element },
                    i = e.Event(p.SHOW, a);
                  if ((e(n).trigger(i), !i.isDefaultPrevented())) {
                    var l = this._element;
                    e(n).hasClass(m.DROPUP) &&
                      (e(this._menu).hasClass(m.MENULEFT) ||
                        e(this._menu).hasClass(m.MENURIGHT)) &&
                      (l = n),
                      (this._popper = new Popper(
                        l,
                        this._menu,
                        this._getPopperConfig()
                      )),
                      "ontouchstart" in document.documentElement &&
                        !e(n).closest(g.NAVBAR_NAV).length &&
                        e("body").children().on("mouseover", null, e.noop),
                      this._element.focus(),
                      this._element.setAttribute("aria-expanded", !0),
                      e(this._menu).one(p.TRANSITION_END, function () {
                        e(n).trigger(e.Event(p.SHOWN, a)),
                          e(t._menu).removeClass(m.SHOWING);
                      }),
                      e(this._menu).addClass(m.SHOW + " " + m.SHOWING),
                      e(n).addClass(m.SHOW);
                  }
                }
              }
            }),
            (i.dispose = function () {
              e.removeData(this._element, n),
                e(this._element).off(a),
                (this._element = null),
                (this._menu = null),
                null !== this._popper && this._popper.destroy(),
                (this._popper = null);
            }),
            (i.update = function () {
              (this._inNavbar = this._detectNavbar()),
                null !== this._popper && this._popper.scheduleUpdate();
            }),
            (i._addEventListeners = function () {
              var t = this;
              e(this._element).on(p.CLICK, function (e) {
                e.preventDefault(), e.stopPropagation(), t.toggle();
              });
            }),
            (i._getConfig = function (n) {
              var o = e(this._element).data();
              return (
                void 0 !== o.placement &&
                  (o.placement = f[o.placement.toUpperCase()]),
                (n = e.extend(
                  {},
                  this.constructor.Default,
                  e(this._element).data(),
                  n
                )),
                l.typeCheckConfig(t, n, this.constructor.DefaultType),
                n
              );
            }),
            (i._getMenuElement = function () {
              if (!this._menu) {
                var t = r._getParentFromElement(this._element);
                this._menu = e(t).find(g.MENU)[0];
              }
              return this._menu;
            }),
            (i._getPlacement = function () {
              var t = e(this._element).parent(),
                n = this._config.placement;
              return (
                t.hasClass(m.DROPUP) || this._config.placement === f.TOP
                  ? ((n = f.TOP),
                    e(this._menu).hasClass(m.MENURIGHT) && (n = f.TOPEND))
                  : e(this._menu).hasClass(m.MENURIGHT) && (n = f.BOTTOMEND),
                n
              );
            }),
            (i._detectNavbar = function () {
              return 0 < e(this._element).closest(".navbar").length;
            }),
            (i._getPopperConfig = function () {
              var e = {
                placement: this._getPlacement(),
                modifiers: {
                  offset: { offset: this._config.offset },
                  flip: { enabled: this._config.flip },
                },
              };
              return (
                this._inNavbar &&
                  (e.modifiers.applyStyle = { enabled: !this._inNavbar }),
                e
              );
            }),
            (r._jQueryInterface = function (t) {
              return this.each(function () {
                var o = e(this).data(n),
                  a = "object" == typeof t ? t : null;
                if (
                  (o || ((o = new r(this, a)), e(this).data(n, o)),
                  "string" == typeof t)
                ) {
                  if (void 0 === o[t])
                    throw new Error('No method named "' + t + '"');
                  o[t]();
                }
              });
            }),
            (r._clearMenus = function (t) {
              if (
                !(t && (t.which === 3 || ("keyup" === t.type && t.which !== c)))
              )
                for (
                  var o,
                    a = e.makeArray(e(g.DATA_TOGGLE)),
                    l = function (o) {
                      var i = r._getParentFromElement(a[o]),
                        l = e(a[o]).data(n),
                        s = { relatedTarget: a[o] };
                      if (!l) return "continue";
                      var d = l._menu;
                      if (!e(i).hasClass(m.SHOW)) return "continue";
                      if (
                        t &&
                        (("click" === t.type &&
                          /input|textarea/i.test(t.target.tagName)) ||
                          ("keyup" === t.type && t.which === c)) &&
                        e.contains(i, t.target)
                      )
                        return "continue";
                      var _ = e.Event(p.HIDE, s);
                      return (
                        e(i).trigger(_),
                        _.isDefaultPrevented()
                          ? "continue"
                          : void (("ontouchstart" in
                              document.documentElement) &&
                              e("body")
                                .children()
                                .off("mouseover", null, e.noop),
                            a[o].setAttribute("aria-expanded", "false"),
                            e(d).addClass(m.HIDING).removeClass(m.SHOW),
                            e(i).removeClass(m.SHOW),
                            e(d).one(p.TRANSITION_END, function () {
                              e(i).trigger(e.Event(p.HIDDEN, s)),
                                e(d).removeClass(m.HIDING);
                            }))
                      );
                    },
                    s = 0;
                  s < a.length;
                  s++
                )
                  (o = l(s)), "continue" === o;
            }),
            (r._getParentFromElement = function (t) {
              var n,
                o = l.getSelectorFromElement(t);
              return o && (n = e(o)[0]), n || t.parentNode;
            }),
            (r._dataApiKeydownHandler = function (t) {
              if (
                !(
                  !_.test(t.which) ||
                  (/button/i.test(t.target.tagName) && t.which === d) ||
                  /input|textarea/i.test(t.target.tagName)
                ) &&
                (t.preventDefault(),
                t.stopPropagation(),
                !(this.disabled || e(this).hasClass(m.DISABLED)))
              ) {
                var n = r._getParentFromElement(this),
                  o = e(n).hasClass(m.SHOW);
                if (
                  (!o && (t.which !== s || t.which !== d)) ||
                  (o && (t.which === s || t.which === d))
                ) {
                  if (t.which === s) {
                    var a = e(n).find(g.DATA_TOGGLE)[0];
                    e(a).trigger("focus");
                  }
                  return void e(this).trigger("click");
                }
                var i = e(n).find(g.VISIBLE_ITEMS).get();
                if (i.length) {
                  var l = i.indexOf(t.target);
                  t.which === 38 && 0 < l && l--,
                    t.which === 40 && l < i.length - 1 && l++,
                    0 > l && (l = 0),
                    i[l].focus();
                }
              }
            }),
            o(r, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.1.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return u;
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return E;
                },
              },
            ]),
            r
          );
        })();
      return (
        e(document)
          .on(p.KEYDOWN_DATA_API, g.DATA_TOGGLE, h._dataApiKeydownHandler)
          .on(p.KEYDOWN_DATA_API, g.MENU, h._dataApiKeydownHandler)
          .on(p.CLICK_DATA_API + " " + p.KEYUP_DATA_API, h._clearMenus)
          .on(p.CLICK_DATA_API, g.DATA_TOGGLE, function (t) {
            t.preventDefault(),
              t.stopPropagation(),
              h._jQueryInterface.call(e(this), "toggle");
          })
          .on(p.CLICK_DATA_API, g.FORM_CHILD, function (t) {
            t.stopPropagation();
          }),
        (e.fn[t] = h._jQueryInterface),
        (e.fn[t].Constructor = h),
        (e.fn[t].noConflict = function () {
          return (e.fn[t] = i), h._jQueryInterface;
        }),
        h
      );
    })(jQuery),
    U = (function (e) {
      var t = {
          CANVAS: "bmd-layout-canvas",
          CONTAINER: "bmd-layout-container",
          BACKDROP: "bmd-layout-backdrop",
        },
        n = {
          CANVAS: "." + t.CANVAS,
          CONTAINER: "." + t.CONTAINER,
          BACKDROP: "." + t.BACKDROP,
        },
        o = {
          canvas: {
            create: !0,
            required: !0,
            template: '<div class="' + t.CANVAS + '"></div>',
          },
          backdrop: {
            create: !0,
            required: !0,
            template: '<div class="' + t.BACKDROP + '"></div>',
          },
        },
        a = (function (t) {
          function a(n, a, r) {
            var i;
            return (
              void 0 === r && (r = {}),
              (i = t.call(this, n, e.extend(!0, {}, o, a), r) || this),
              (i.$container = i.findContainer(!0)),
              (i.$backdrop = i.resolveBackdrop()),
              i.resolveCanvas(),
              i
            );
          }
          r(a, t);
          var i = a.prototype;
          return (
            (i.dispose = function (e) {
              t.prototype.dispose.call(this, e),
                (this.$container = null),
                (this.$backdrop = null);
            }),
            (i.resolveCanvas = function () {
              var e = this.findCanvas(!1);
              return (
                (void 0 === e || 0 === e.length) &&
                  (this.config.canvas.create &&
                    this.$container.wrap(this.config.canvas.template),
                  (e = this.findCanvas(this.config.canvas.required))),
                e
              );
            }),
            (i.findCanvas = function (t, o) {
              void 0 === t && (t = !0), void 0 === o && (o = this.$container);
              var a = o.closest(n.CANVAS);
              return (
                0 === a.length &&
                  t &&
                  e.error(
                    "Failed to find " + n.CANVAS + " for " + E.describe(o)
                  ),
                a
              );
            }),
            (i.resolveBackdrop = function () {
              var e = this.findBackdrop(!1);
              return (
                (void 0 === e || 0 === e.length) &&
                  (this.config.backdrop.create &&
                    this.$container.append(this.config.backdrop.template),
                  (e = this.findBackdrop(this.config.backdrop.required))),
                e
              );
            }),
            (i.findBackdrop = function (t, o) {
              void 0 === t && (t = !0), void 0 === o && (o = this.$container);
              var a = o.find("> " + n.BACKDROP);
              return (
                0 === a.length &&
                  t &&
                  e.error(
                    "Failed to find " + n.BACKDROP + " for " + E.describe(o)
                  ),
                a
              );
            }),
            (i.findContainer = function (t, o) {
              void 0 === t && (t = !0), void 0 === o && (o = this.$element);
              var a = o.closest(n.CONTAINER);
              return (
                0 === a.length &&
                  t &&
                  e.error(
                    "Failed to find " + n.CONTAINER + " for " + E.describe(o)
                  ),
                a
              );
            }),
            a
          );
        })(h);
      return a;
    })(jQuery),
    P = (function (e) {
      var t = "drawer",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = { ESCAPE: 27 },
        l = {
          IN: "in",
          DRAWER_IN: "bmd-drawer-in",
          DRAWER_OUT: "bmd-drawer-out",
          DRAWER: "bmd-layout-drawer",
          CONTAINER: "bmd-layout-container",
        },
        s = { focusSelector: "a, button, input" },
        d = (function (t) {
          function o(n, o) {
            var a;
            return (
              (a = t.call(this, n, e.extend(!0, {}, s, o)) || this),
              (a.$toggles = e(
                '[data-toggle="drawer"][href="#' +
                  a.$element[0].id +
                  '"], [data-toggle="drawer"][data-target="#' +
                  a.$element[0].id +
                  '"]'
              )),
              a._addAria(),
              a.$backdrop
                .keydown(function (e) {
                  e.which === i.ESCAPE && a.hide();
                })
                .click(function () {
                  a.hide();
                }),
              a.$element.keydown(function (e) {
                e.which === i.ESCAPE && a.hide();
              }),
              a.$toggles.click(function () {
                a.toggle();
              }),
              a
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n), (this.$toggles = null);
            }),
            (a.toggle = function () {
              this._isOpen() ? this.hide() : this.show();
            }),
            (a.show = function () {
              if (!(this._isForcedClosed() || this._isOpen())) {
                this.$toggles.attr("aria-expanded", !0),
                  this.$element.attr("aria-expanded", !0),
                  this.$element.attr("aria-hidden", !1);
                var e = this.$element.find(this.config.focusSelector);
                0 < e.length && e.first().focus(),
                  this.$container.addClass(l.DRAWER_IN),
                  this.$backdrop.addClass(l.IN);
              }
            }),
            (a.hide = function () {
              this._isOpen() &&
                (this.$toggles.attr("aria-expanded", !1),
                this.$element.attr("aria-expanded", !1),
                this.$element.attr("aria-hidden", !0),
                this.$container.removeClass(l.DRAWER_IN),
                this.$backdrop.removeClass(l.IN));
            }),
            (a._isOpen = function () {
              return this.$container.hasClass(l.DRAWER_IN);
            }),
            (a._isForcedClosed = function () {
              return this.$container.hasClass(l.DRAWER_OUT);
            }),
            (a._addAria = function () {
              var e = this._isOpen();
              this.$element.attr("aria-expanded", e),
                this.$element.attr("aria-hidden", e),
                this.$toggles.length && this.$toggles.attr("aria-expanded", e);
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(U);
      return (
        (e.fn[o] = d._jQueryInterface),
        (e.fn[o].Constructor = d),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), d._jQueryInterface;
        }),
        d
      );
    })(jQuery),
    w = (function (e) {
      var t = "ripples",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        r = { CONTAINER: "ripple-container", DECORATOR: "ripple-decorator" },
        l = { CONTAINER: "." + r.CONTAINER, DECORATOR: "." + r.DECORATOR },
        s = {
          container: { template: "<div class='" + r.CONTAINER + "'></div>" },
          decorator: { template: "<div class='" + r.DECORATOR + "'></div>" },
          trigger: {
            start: "mousedown touchstart",
            end: "mouseup mouseleave touchend",
          },
          touchUserAgentRegex:
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
          duration: 500,
        },
        d = (function () {
          function t(t, n) {
            var o = this;
            (this.$element = t),
              (this.config = e.extend(!0, {}, s, n)),
              this.$element.on(this.config.trigger.start, function (e) {
                o._onStartRipple(e);
              });
          }
          var o = t.prototype;
          return (
            (o.dispose = function () {
              this.$element.data(n, null),
                (this.$element = null),
                (this.$container = null),
                (this.$decorator = null),
                (this.config = null);
            }),
            (o._onStartRipple = function (e) {
              var t = this;
              if (!(this._isTouch() && "mousedown" === e.type)) {
                this._findOrCreateContainer();
                var n = this._getRelY(e),
                  o = this._getRelX(e);
                (n || o) &&
                  (this.$decorator.css({
                    left: o,
                    top: n,
                    "background-color": this._getRipplesColor(),
                  }),
                  this._forceStyleApplication(),
                  this.rippleOn(),
                  setTimeout(function () {
                    t.rippleEnd();
                  }, this.config.duration),
                  this.$element.on(this.config.trigger.end, function () {
                    t.$decorator &&
                      (t.$decorator.data("mousedown", "off"),
                      "off" === t.$decorator.data("animating") &&
                        t.rippleOut());
                  }));
              }
            }),
            (o._findOrCreateContainer = function () {
              (!this.$container || 0 < !this.$container.length) &&
                (this.$element.append(this.config.container.template),
                (this.$container = this.$element.find(l.CONTAINER))),
                this.$container.append(this.config.decorator.template),
                (this.$decorator = this.$container.find(l.DECORATOR));
            }),
            (o._forceStyleApplication = function () {
              return window.getComputedStyle(this.$decorator[0]).opacity;
            }),
            (o._getRelX = function (e) {
              var t = this.$container.offset(),
                n = null;
              return (
                this._isTouch()
                  ? ((e = e.originalEvent),
                    (n = 1 === e.touches.length && e.touches[0].pageX - t.left))
                  : (n = e.pageX - t.left),
                n
              );
            }),
            (o._getRelY = function (e) {
              var t = this.$container.offset(),
                n = null;
              return (
                this._isTouch()
                  ? ((e = e.originalEvent),
                    (n = 1 === e.touches.length && e.touches[0].pageY - t.top))
                  : (n = e.pageY - t.top),
                n
              );
            }),
            (o._getRipplesColor = function () {
              var e = this.$element.data("ripple-color")
                ? this.$element.data("ripple-color")
                : window.getComputedStyle(this.$element[0]).color;
              return e;
            }),
            (o._isTouch = function () {
              return this.config.touchUserAgentRegex.test(navigator.userAgent);
            }),
            (o.rippleEnd = function () {
              this.$decorator &&
                (this.$decorator.data("animating", "off"),
                "off" === this.$decorator.data("mousedown") &&
                  this.rippleOut(this.$decorator));
            }),
            (o.rippleOut = function () {
              var e = this;
              this.$decorator.off(),
                E.transitionEndSupported()
                  ? this.$decorator.addClass("ripple-out")
                  : this.$decorator.animate({ opacity: 0 }, 100, function () {
                      e.$decorator.trigger("transitionend");
                    }),
                this.$decorator.on(E.transitionEndSelector(), function () {
                  e.$decorator &&
                    (e.$decorator.remove(), (e.$decorator = null));
                });
            }),
            (o.rippleOn = function () {
              var e = this,
                t = this._getNewSize();
              E.transitionEndSupported()
                ? this.$decorator
                    .css({
                      "-ms-transform": "scale(" + t + ")",
                      "-moz-transform": "scale(" + t + ")",
                      "-webkit-transform": "scale(" + t + ")",
                      transform: "scale(" + t + ")",
                    })
                    .addClass("ripple-on")
                    .data("animating", "on")
                    .data("mousedown", "on")
                : this.$decorator.animate(
                    {
                      width:
                        2 *
                        i(
                          this.$element.outerWidth(),
                          this.$element.outerHeight()
                        ),
                      height:
                        2 *
                        i(
                          this.$element.outerWidth(),
                          this.$element.outerHeight()
                        ),
                      "margin-left":
                        -1 *
                        i(
                          this.$element.outerWidth(),
                          this.$element.outerHeight()
                        ),
                      "margin-top":
                        -1 *
                        i(
                          this.$element.outerWidth(),
                          this.$element.outerHeight()
                        ),
                      opacity: 0.2,
                    },
                    this.config.duration,
                    function () {
                      e.$decorator.trigger("transitionend");
                    }
                  );
            }),
            (o._getNewSize = function () {
              return (
                2.5 *
                (i(this.$element.outerWidth(), this.$element.outerHeight()) /
                  this.$decorator.outerWidth())
              );
            }),
            (t._jQueryInterface = function (o) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new t(a, o)), a.data(n, r));
              });
            }),
            t
          );
        })();
      return (
        (e.fn[o] = d._jQueryInterface),
        (e.fn[o].Constructor = d),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), d._jQueryInterface;
        }),
        d
      );
    })(jQuery),
    k = (function (e) {
      var t = "autofill",
        n = "bmd." + t,
        o = "bmd" + (t.charAt(0).toUpperCase() + t.slice(1)),
        a = e.fn[o],
        i = {},
        l = (function (t) {
          function o(n, o) {
            var a;
            return (
              (a = t.call(this, n, e.extend(!0, {}, i, o)) || this),
              a._watchLoading(),
              a._attachEventHandlers(),
              a
            );
          }
          r(o, t);
          var a = o.prototype;
          return (
            (a.dispose = function () {
              t.prototype.dispose.call(this, n);
            }),
            (a._watchLoading = function () {
              var e = this;
              setTimeout(function () {
                clearInterval(e._onLoading);
              }, 1e4);
            }),
            (a._onLoading = function () {
              setInterval(function () {
                e("input[type!=checkbox]").each(function (t, n) {
                  var o = e(n);
                  o.val() && o.val() !== o.attr("value") && o.trigger("change");
                });
              }, 100);
            }),
            (a._attachEventHandlers = function () {
              var t = null;
              e(document)
                .on("focus", "input", function (n) {
                  var o = e(n.currentTarget)
                    .closest("form")
                    .find("input")
                    .not("[type=file]");
                  t = setInterval(function () {
                    o.each(function (t, n) {
                      var o = e(n);
                      o.val() !== o.attr("value") && o.trigger("change");
                    });
                  }, 100);
                })
                .on("blur", ".form-group input", function () {
                  clearInterval(t);
                });
            }),
            (o._jQueryInterface = function (t) {
              return this.each(function () {
                var a = e(this),
                  r = a.data(n);
                r || ((r = new o(a, t)), a.data(n, r));
              });
            }),
            o
          );
        })(h);
      return (
        (e.fn[o] = l._jQueryInterface),
        (e.fn[o].Constructor = l),
        (e.fn[o].noConflict = function () {
          return (e.fn[o] = a), l._jQueryInterface;
        }),
        l
      );
    })(jQuery);
  Popper.Defaults.modifiers.computeStyle.gpuAcceleration = !1;
  (function (t) {
    var e = "bootstrapMaterialDesign",
      n = "bmd." + e,
      o = e,
      a = t.fn[o],
      r = {
        global: { validate: !1, label: { className: "bmd-label-static" } },
        autofill: { selector: "body" },
        checkbox: { selector: ".checkbox > label > input[type=checkbox]" },
        checkboxInline: {
          selector: "label.checkbox-inline > input[type=checkbox]",
        },
        collapseInline: {
          selector: '.bmd-collapse-inline [data-toggle="collapse"]',
        },
        drawer: { selector: ".bmd-layout-drawer" },
        file: { selector: "input[type=file]" },
        radio: { selector: ".radio > label > input[type=radio]" },
        radioInline: { selector: "label.radio-inline > input[type=radio]" },
        ripples: {
          selector: [
            ".btn:not(.btn-link):not(.ripple-none)",
            ".card-image:not(.ripple-none)",
            ".navbar a:not(.ripple-none)",
            ".dropdown-menu a:not(.ripple-none)",
            ".nav-tabs a:not(.ripple-none)",
            ".pagination li:not(.active):not(.disabled) a:not(.ripple-none)",
            ".ripple",
          ],
        },
        select: { selector: ["select"] },
        switch: { selector: ".switch > label > input[type=checkbox]" },
        text: {
          selector: [
            "input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])",
          ],
        },
        textarea: { selector: ["textarea"] },
        arrive: !0,
        instantiation: [
          "ripples",
          "checkbox",
          "checkboxInline",
          "collapseInline",
          "drawer",
          "radio",
          "radioInline",
          "switch",
          "text",
          "textarea",
          "select",
          "autofill",
        ],
      },
      i = (function () {
        function e(e, n) {
          var o = this;
          (this.$element = e), (this.config = t.extend(!0, {}, r, n));
          for (
            var a = t(document),
              i = function (e) {
                var n = o.config[e];
                if (n) {
                  var r = o._resolveSelector(n);
                  n = t.extend(!0, {}, o.config.global, n);
                  var i = "" + (e.charAt(0).toUpperCase() + e.slice(1)),
                    l = "bmd" + i;
                  try {
                    t(r)[l](n),
                      document.arrive &&
                        o.config.arrive &&
                        a.arrive(r, function () {
                          t(this)[l](n);
                        });
                  } catch (o) {
                    var s =
                      "Failed to instantiate component: $('" +
                      r +
                      "')[" +
                      l +
                      "](" +
                      n +
                      ")";
                    throw (
                      (console.error(s, o, "\nSelected elements: ", t(r)), o)
                    );
                  }
                }
              },
              l = this.config.instantiation,
              s = Array.isArray(l),
              d = 0,
              l = s ? l : l[Symbol.iterator]();
            ;

          ) {
            var c;
            if (s) {
              if (d >= l.length) break;
              c = l[d++];
            } else {
              if (((d = l.next()), d.done)) break;
              c = d.value;
            }
            var _ = c;
            i(_);
          }
        }
        var o = e.prototype;
        return (
          (o.dispose = function () {
            this.$element.data(n, null),
              (this.$element = null),
              (this.config = null);
          }),
          (o._resolveSelector = function (e) {
            var t = e.selector;
            return Array.isArray(t) && (t = t.join(", ")), t;
          }),
          (e._jQueryInterface = function (o) {
            return this.each(function () {
              var a = t(this),
                r = a.data(n);
              r || ((r = new e(a, o)), a.data(n, r));
            });
          }),
          e
        );
      })();
    return (
      (t.fn[o] = i._jQueryInterface),
      (t.fn[o].Constructor = i),
      (t.fn[o].noConflict = function () {
        return (t.fn[o] = a), i._jQueryInterface;
      }),
      i
    );
  })(jQuery);
});
$(document).ready(function () {
  $("body").bootstrapMaterialDesign();
  for (let btn of document.querySelectorAll("button")) {
    btn.classList.add("ripple");
  }
});
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Sweetalert2 = t());
})(this, function () {
  "use strict";
  const l = Object.freeze({
      cancel: "cancel",
      backdrop: "backdrop",
      close: "close",
      esc: "esc",
      timer: "timer",
    }),
    t = "SweetAlert2:",
    o = (e) => e.charAt(0).toUpperCase() + e.slice(1),
    a = (e) => Array.prototype.slice.call(e),
    s = (e) => {
      console.warn(
        "".concat(t, " ").concat("object" == typeof e ? e.join(" ") : e)
      );
    },
    r = (e) => {
      console.error("".concat(t, " ").concat(e));
    },
    n = [],
    i = (e, t) => {
      (t = '"'
        .concat(
          e,
          '" is deprecated and will be removed in the next major release. Please use "'
        )
        .concat(t, '" instead.')),
        n.includes(t) || (n.push(t), s(t));
    },
    c = (e) => ("function" == typeof e ? e() : e),
    u = (e) => e && "function" == typeof e.toPromise,
    d = (e) => (u(e) ? e.toPromise() : Promise.resolve(e)),
    p = (e) => e && Promise.resolve(e) === e,
    m = (e) =>
      e instanceof Element || ((e) => "object" == typeof e && e.jquery)(e);
  var e = (e) => {
    const t = {};
    for (const n in e) t[e[n]] = "swal2-" + e[n];
    return t;
  };
  const h = e([
      "container",
      "shown",
      "height-auto",
      "iosfix",
      "popup",
      "modal",
      "no-backdrop",
      "no-transition",
      "toast",
      "toast-shown",
      "show",
      "hide",
      "close",
      "title",
      "html-container",
      "actions",
      "confirm",
      "deny",
      "cancel",
      "default-outline",
      "footer",
      "icon",
      "icon-content",
      "image",
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "label",
      "textarea",
      "inputerror",
      "input-label",
      "validation-message",
      "progress-steps",
      "active-progress-step",
      "progress-step",
      "progress-step-line",
      "loader",
      "loading",
      "styled",
      "top",
      "top-start",
      "top-end",
      "top-left",
      "top-right",
      "center",
      "center-start",
      "center-end",
      "center-left",
      "center-right",
      "bottom",
      "bottom-start",
      "bottom-end",
      "bottom-left",
      "bottom-right",
      "grow-row",
      "grow-column",
      "grow-fullscreen",
      "rtl",
      "timer-progress-bar",
      "timer-progress-bar-container",
      "scrollbar-measure",
      "icon-success",
      "icon-warning",
      "icon-info",
      "icon-question",
      "icon-error",
    ]),
    g = e(["success", "warning", "info", "question", "error"]),
    b = () => document.body.querySelector(".".concat(h.container)),
    f = (e) => {
      const t = b();
      return t ? t.querySelector(e) : null;
    },
    y = (e) => f(".".concat(e)),
    v = () => y(h.popup),
    w = () => y(h.icon),
    C = () => y(h.title),
    k = () => y(h["html-container"]),
    A = () => y(h.image),
    B = () => y(h["progress-steps"]),
    x = () => y(h["validation-message"]),
    E = () => f(".".concat(h.actions, " .").concat(h.confirm)),
    P = () => f(".".concat(h.actions, " .").concat(h.deny));
  const S = () => f(".".concat(h.loader)),
    T = () => f(".".concat(h.actions, " .").concat(h.cancel)),
    L = () => y(h.actions),
    O = () => y(h.footer),
    j = () => y(h["timer-progress-bar"]),
    M = () => y(h.close),
    D = () => {
      const e = a(
        v().querySelectorAll(
          '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
        )
      ).sort(
        (e, t) => (
          (e = parseInt(e.getAttribute("tabindex"))),
          (t = parseInt(t.getAttribute("tabindex"))) < e ? 1 : e < t ? -1 : 0
        )
      );
      var t = a(
        v().querySelectorAll(
          '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
        )
      ).filter((e) => "-1" !== e.getAttribute("tabindex"));
      return ((t) => {
        const n = [];
        for (let e = 0; e < t.length; e++)
          -1 === n.indexOf(t[e]) && n.push(t[e]);
        return n;
      })(e.concat(t)).filter((e) => G(e));
    },
    I = () => !H() && !document.body.classList.contains(h["no-backdrop"]),
    H = () => document.body.classList.contains(h["toast-shown"]);
  const q = { previousBodyPadding: null },
    V = (t, e) => {
      if (((t.textContent = ""), e)) {
        const n = new DOMParser(),
          o = n.parseFromString(e, "text/html");
        a(o.querySelector("head").childNodes).forEach((e) => {
          t.appendChild(e);
        }),
          a(o.querySelector("body").childNodes).forEach((e) => {
            t.appendChild(e);
          });
      }
    },
    N = (t, e) => {
      if (!e) return !1;
      var n = e.split(/\s+/);
      for (let e = 0; e < n.length; e++)
        if (!t.classList.contains(n[e])) return !1;
      return !0;
    },
    U = (e, t, n) => {
      var o, i;
      if (
        ((o = e),
        (i = t),
        a(o.classList).forEach((e) => {
          Object.values(h).includes(e) ||
            Object.values(g).includes(e) ||
            Object.values(i.showClass).includes(e) ||
            o.classList.remove(e);
        }),
        t.customClass && t.customClass[n])
      ) {
        if ("string" != typeof t.customClass[n] && !t.customClass[n].forEach)
          return s(
            "Invalid type of customClass."
              .concat(n, '! Expected string or iterable object, got "')
              .concat(typeof t.customClass[n], '"')
          );
        W(e, t.customClass[n]);
      }
    },
    F = (e, t) => {
      if (!t) return null;
      switch (t) {
        case "select":
        case "textarea":
        case "file":
          return K(e, h[t]);
        case "checkbox":
          return e.querySelector(".".concat(h.checkbox, " input"));
        case "radio":
          return (
            e.querySelector(".".concat(h.radio, " input:checked")) ||
            e.querySelector(".".concat(h.radio, " input:first-child"))
          );
        case "range":
          return e.querySelector(".".concat(h.range, " input"));
        default:
          return K(e, h.input);
      }
    },
    R = (e) => {
      var t;
      e.focus(),
        "file" !== e.type && ((t = e.value), (e.value = ""), (e.value = t));
    },
    z = (e, t, n) => {
      e &&
        t &&
        (t = "string" == typeof t ? t.split(/\s+/).filter(Boolean) : t).forEach(
          (t) => {
            e.forEach
              ? e.forEach((e) => {
                  n ? e.classList.add(t) : e.classList.remove(t);
                })
              : n
              ? e.classList.add(t)
              : e.classList.remove(t);
          }
        );
    },
    W = (e, t) => {
      z(e, t, !0);
    },
    _ = (e, t) => {
      z(e, t, !1);
    },
    K = (t, n) => {
      for (let e = 0; e < t.childNodes.length; e++)
        if (N(t.childNodes[e], n)) return t.childNodes[e];
    },
    Y = (e, t, n) => {
      (n = n === "".concat(parseInt(n)) ? parseInt(n) : n) || 0 === parseInt(n)
        ? (e.style[t] = "number" == typeof n ? "".concat(n, "px") : n)
        : e.style.removeProperty(t);
    },
    Z = (e, t = "flex") => {
      e.style.display = t;
    },
    J = (e) => {
      e.style.display = "none";
    },
    X = (e, t, n, o) => {
      const i = e.querySelector(t);
      i && (i.style[n] = o);
    },
    $ = (e, t, n) => {
      t ? Z(e, n) : J(e);
    },
    G = (e) =>
      !(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
    Q = () => !G(E()) && !G(P()) && !G(T()),
    ee = (e) => !!(e.scrollHeight > e.clientHeight),
    te = (e) => {
      const t = window.getComputedStyle(e);
      var n = parseFloat(t.getPropertyValue("animation-duration") || "0"),
        e = parseFloat(t.getPropertyValue("transition-duration") || "0");
      return 0 < n || 0 < e;
    },
    ne = (e, t = !1) => {
      const n = j();
      G(n) &&
        (t && ((n.style.transition = "none"), (n.style.width = "100%")),
        setTimeout(() => {
          (n.style.transition = "width ".concat(e / 1e3, "s linear")),
            (n.style.width = "0%");
        }, 10));
    },
    oe = () => "undefined" == typeof window || "undefined" == typeof document,
    ie = '\n <div aria-labelledby="'
      .concat(h.title, '" aria-describedby="')
      .concat(h["html-container"], '" class="')
      .concat(h.popup, '" tabindex="-1">\n   <button type="button" class="')
      .concat(h.close, '"></button>\n   <ul class="')
      .concat(h["progress-steps"], '"></ul>\n   <div class="')
      .concat(h.icon, '"></div>\n   <img class="')
      .concat(h.image, '" />\n   <h2 class="')
      .concat(h.title, '" id="')
      .concat(h.title, '"></h2>\n   <div class="')
      .concat(h["html-container"], '" id="')
      .concat(h["html-container"], '"></div>\n   <input class="')
      .concat(h.input, '" />\n   <input type="file" class="')
      .concat(h.file, '" />\n   <div class="')
      .concat(
        h.range,
        '">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="'
      )
      .concat(h.select, '"></select>\n   <div class="')
      .concat(h.radio, '"></div>\n   <label for="')
      .concat(h.checkbox, '" class="')
      .concat(
        h.checkbox,
        '">\n     <input type="checkbox" />\n     <span class="'
      )
      .concat(h.label, '"></span>\n   </label>\n   <textarea class="')
      .concat(h.textarea, '"></textarea>\n   <div class="')
      .concat(h["validation-message"], '" id="')
      .concat(h["validation-message"], '"></div>\n   <div class="')
      .concat(h.actions, '">\n     <div class="')
      .concat(h.loader, '"></div>\n     <button type="button" class="')
      .concat(h.confirm, '"></button>\n     <button type="button" class="')
      .concat(h.deny, '"></button>\n     <button type="button" class="')
      .concat(h.cancel, '"></button>\n   </div>\n   <div class="')
      .concat(h.footer, '"></div>\n   <div class="')
      .concat(h["timer-progress-bar-container"], '">\n     <div class="')
      .concat(h["timer-progress-bar"], '"></div>\n   </div>\n </div>\n')
      .replace(/(^|\n)\s*/g, ""),
    ae = () => {
      cn.isVisible() && cn.resetValidationMessage();
    },
    se = (e) => {
      var t = (() => {
        const e = b();
        return (
          !!e &&
          (e.remove(),
          _(
            [document.documentElement, document.body],
            [h["no-backdrop"], h["toast-shown"], h["has-column"]]
          ),
          !0)
        );
      })();
      if (oe()) r("SweetAlert2 requires document to initialize");
      else {
        const n = document.createElement("div");
        (n.className = h.container), t && W(n, h["no-transition"]), V(n, ie);
        const o =
          "string" == typeof (t = e.target) ? document.querySelector(t) : t;
        o.appendChild(n),
          ((e) => {
            const t = v();
            t.setAttribute("role", e.toast ? "alert" : "dialog"),
              t.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
              e.toast || t.setAttribute("aria-modal", "true");
          })(e),
          (e = o),
          "rtl" === window.getComputedStyle(e).direction && W(b(), h.rtl),
          (() => {
            const e = v(),
              t = K(e, h.input),
              n = K(e, h.file),
              o = e.querySelector(".".concat(h.range, " input")),
              i = e.querySelector(".".concat(h.range, " output")),
              a = K(e, h.select),
              s = e.querySelector(".".concat(h.checkbox, " input")),
              r = K(e, h.textarea);
            (t.oninput = ae),
              (n.onchange = ae),
              (a.onchange = ae),
              (s.onchange = ae),
              (r.oninput = ae),
              (o.oninput = () => {
                ae(), (i.value = o.value);
              }),
              (o.onchange = () => {
                ae(), (o.nextSibling.value = o.value);
              });
          })();
      }
    },
    re = (e, t) => {
      e instanceof HTMLElement
        ? t.appendChild(e)
        : "object" == typeof e
        ? ce(e, t)
        : e && V(t, e);
    },
    ce = (e, t) => {
      e.jquery ? le(t, e) : V(t, e.toString());
    },
    le = (t, n) => {
      if (((t.textContent = ""), 0 in n))
        for (let e = 0; e in n; e++) t.appendChild(n[e].cloneNode(!0));
      else t.appendChild(n.cloneNode(!0));
    },
    ue = (() => {
      if (oe()) return !1;
      var e = document.createElement("div"),
        t = {
          WebkitAnimation: "webkitAnimationEnd",
          OAnimation: "oAnimationEnd oanimationend",
          animation: "animationend",
        };
      for (const n in t)
        if (Object.prototype.hasOwnProperty.call(t, n) && void 0 !== e.style[n])
          return t[n];
      return !1;
    })(),
    de = (e, t) => {
      const n = L();
      var o = S(),
        i = E(),
        a = P(),
        s = T();
      t.showConfirmButton || t.showDenyButton || t.showCancelButton || J(n),
        U(n, t, "actions"),
        pe(i, "confirm", t),
        pe(a, "deny", t),
        pe(s, "cancel", t),
        (function (e, t, n, o) {
          if (!o.buttonsStyling) return _([e, t, n], h.styled);
          W([e, t, n], h.styled),
            o.confirmButtonColor &&
              ((e.style.backgroundColor = o.confirmButtonColor),
              W(e, h["default-outline"]));
          o.denyButtonColor &&
            ((t.style.backgroundColor = o.denyButtonColor),
            W(t, h["default-outline"]));
          o.cancelButtonColor &&
            ((n.style.backgroundColor = o.cancelButtonColor),
            W(n, h["default-outline"]));
        })(i, a, s, t),
        t.reverseButtons &&
          (n.insertBefore(s, o), n.insertBefore(a, o), n.insertBefore(i, o)),
        V(o, t.loaderHtml),
        U(o, t, "loader");
    };
  function pe(e, t, n) {
    $(e, n["show".concat(o(t), "Button")], "inline-block"),
      V(e, n["".concat(t, "ButtonText")]),
      e.setAttribute("aria-label", n["".concat(t, "ButtonAriaLabel")]),
      (e.className = h[t]),
      U(e, n, "".concat(t, "Button")),
      W(e, n["".concat(t, "ButtonClass")]);
  }
  const me = (e, t) => {
    var n,
      o,
      i = b();
    i &&
      ((o = i),
      "string" == typeof (n = t.backdrop)
        ? (o.style.background = n)
        : n || W([document.documentElement, document.body], h["no-backdrop"]),
      (o = i),
      (n = t.position) in h
        ? W(o, h[n])
        : (s('The "position" parameter is not valid, defaulting to "center"'),
          W(o, h.center)),
      (n = i),
      !(o = t.grow) ||
        "string" != typeof o ||
        ((o = "grow-".concat(o)) in h && W(n, h[o])),
      U(i, t, "container"));
  };
  var he = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
  };
  const ge = [
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "textarea",
    ],
    be = (e) => {
      if (!ke[e.input])
        return r(
          'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(
            e.input,
            '"'
          )
        );
      var t = Ce(e.input);
      const n = ke[e.input](t, e);
      Z(n),
        setTimeout(() => {
          R(n);
        });
    },
    fe = (e, t) => {
      const n = F(v(), e);
      if (n) {
        ((t) => {
          for (let e = 0; e < t.attributes.length; e++) {
            var n = t.attributes[e].name;
            ["type", "value", "style"].includes(n) || t.removeAttribute(n);
          }
        })(n);
        for (const o in t) n.setAttribute(o, t[o]);
      }
    },
    ye = (e) => {
      var t = Ce(e.input);
      e.customClass && W(t, e.customClass.input);
    },
    ve = (e, t) => {
      (e.placeholder && !t.inputPlaceholder) ||
        (e.placeholder = t.inputPlaceholder);
    },
    we = (e, t, n) => {
      if (n.inputLabel) {
        e.id = h.input;
        const i = document.createElement("label");
        var o = h["input-label"];
        i.setAttribute("for", e.id),
          (i.className = o),
          W(i, n.customClass.inputLabel),
          (i.innerText = n.inputLabel),
          t.insertAdjacentElement("beforebegin", i);
      }
    },
    Ce = (e) => {
      e = h[e] || h.input;
      return K(v(), e);
    },
    ke = {};
  (ke.text =
    ke.email =
    ke.password =
    ke.number =
    ke.tel =
    ke.url =
      (e, t) => (
        "string" == typeof t.inputValue || "number" == typeof t.inputValue
          ? (e.value = t.inputValue)
          : p(t.inputValue) ||
            s(
              'Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(
                typeof t.inputValue,
                '"'
              )
            ),
        we(e, e, t),
        ve(e, t),
        (e.type = t.input),
        e
      )),
    (ke.file = (e, t) => (we(e, e, t), ve(e, t), e)),
    (ke.range = (e, t) => {
      const n = e.querySelector("input"),
        o = e.querySelector("output");
      return (
        (n.value = t.inputValue),
        (n.type = t.input),
        (o.value = t.inputValue),
        we(n, e, t),
        e
      );
    }),
    (ke.select = (e, t) => {
      if (((e.textContent = ""), t.inputPlaceholder)) {
        const n = document.createElement("option");
        V(n, t.inputPlaceholder),
          (n.value = ""),
          (n.disabled = !0),
          (n.selected = !0),
          e.appendChild(n);
      }
      return we(e, e, t), e;
    }),
    (ke.radio = (e) => ((e.textContent = ""), e)),
    (ke.checkbox = (e, t) => {
      const n = F(v(), "checkbox");
      (n.value = 1), (n.id = h.checkbox), (n.checked = Boolean(t.inputValue));
      var o = e.querySelector("span");
      return V(o, t.inputPlaceholder), e;
    }),
    (ke.textarea = (t, e) => {
      (t.value = e.inputValue), ve(t, e), we(t, t, e);
      if ("MutationObserver" in window) {
        const n = parseInt(window.getComputedStyle(v()).width);
        new MutationObserver(() => {
          var e,
            e =
              t.offsetWidth +
              ((e = t),
              parseInt(window.getComputedStyle(e).marginLeft) +
                parseInt(window.getComputedStyle(e).marginRight));
          e > n
            ? (v().style.width = "".concat(e, "px"))
            : (v().style.width = null);
        }).observe(t, { attributes: !0, attributeFilter: ["style"] });
      }
      return t;
    });
  const Ae = (e, t) => {
      const n = k();
      U(n, t, "htmlContainer"),
        t.html
          ? (re(t.html, n), Z(n, "block"))
          : t.text
          ? ((n.textContent = t.text), Z(n, "block"))
          : J(n),
        ((e, o) => {
          const i = v();
          e = he.innerParams.get(e);
          const a = !e || o.input !== e.input;
          ge.forEach((e) => {
            var t = h[e];
            const n = K(i, t);
            fe(e, o.inputAttributes), (n.className = t), a && J(n);
          }),
            o.input && (a && be(o), ye(o));
        })(e, t);
    },
    Be = (e, t) => {
      for (const n in g) t.icon !== n && _(e, g[n]);
      W(e, g[t.icon]), Pe(e, t), xe(), U(e, t, "icon");
    },
    xe = () => {
      const e = v();
      var t = window.getComputedStyle(e).getPropertyValue("background-color");
      const n = e.querySelectorAll(
        "[class^=swal2-success-circular-line], .swal2-success-fix"
      );
      for (let e = 0; e < n.length; e++) n[e].style.backgroundColor = t;
    },
    Ee = (e, t) => {
      var n;
      (e.textContent = ""),
        t.iconHtml
          ? V(e, Se(t.iconHtml))
          : "success" === t.icon
          ? V(
              e,
              '\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    '
            )
          : "error" === t.icon
          ? V(
              e,
              '\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    '
            )
          : ((n = { question: "?", warning: "!", info: "i" }),
            V(e, Se(n[t.icon])));
    },
    Pe = (e, t) => {
      if (t.iconColor) {
        (e.style.color = t.iconColor), (e.style.borderColor = t.iconColor);
        for (const n of [
          ".swal2-success-line-tip",
          ".swal2-success-line-long",
          ".swal2-x-mark-line-left",
          ".swal2-x-mark-line-right",
        ])
          X(e, n, "backgroundColor", t.iconColor);
        X(e, ".swal2-success-ring", "borderColor", t.iconColor);
      }
    },
    Se = (e) =>
      '<div class="'.concat(h["icon-content"], '">').concat(e, "</div>"),
    Te = (e, o) => {
      const i = B();
      if (!o.progressSteps || 0 === o.progressSteps.length) return J(i);
      Z(i),
        (i.textContent = ""),
        o.currentProgressStep >= o.progressSteps.length &&
          s(
            "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
          ),
        o.progressSteps.forEach((e, t) => {
          var n,
            e =
              ((n = e),
              (e = document.createElement("li")),
              W(e, h["progress-step"]),
              V(e, n),
              e);
          i.appendChild(e),
            t === o.currentProgressStep && W(e, h["active-progress-step"]),
            t !== o.progressSteps.length - 1 &&
              ((t = ((e) => {
                const t = document.createElement("li");
                return (
                  W(t, h["progress-step-line"]),
                  e.progressStepsDistance &&
                    (t.style.width = e.progressStepsDistance),
                  t
                );
              })(o)),
              i.appendChild(t));
        });
    },
    Le = (e, t) => {
      (e.className = ""
        .concat(h.popup, " ")
        .concat(G(e) ? t.showClass.popup : "")),
        t.toast
          ? (W([document.documentElement, document.body], h["toast-shown"]),
            W(e, h.toast))
          : W(e, h.modal),
        U(e, t, "popup"),
        "string" == typeof t.customClass && W(e, t.customClass),
        t.icon && W(e, h["icon-".concat(t.icon)]);
    },
    Oe = (e, t) => {
      var n, o, i;
      ((e) => {
        var t = b();
        const n = v();
        e.toast
          ? (Y(t, "width", e.width),
            (n.style.width = "100%"),
            n.insertBefore(S(), w()))
          : Y(n, "width", e.width),
          Y(n, "padding", e.padding),
          e.background && (n.style.background = e.background),
          J(x()),
          Le(n, e);
      })(t),
        me(0, t),
        Te(0, t),
        (i = e),
        (n = t),
        (o = he.innerParams.get(i)),
        (i = w()),
        o && n.icon === o.icon
          ? (Ee(i, n), Be(i, n))
          : n.icon || n.iconHtml
          ? n.icon && -1 === Object.keys(g).indexOf(n.icon)
            ? (r(
                'Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(
                  n.icon,
                  '"'
                )
              ),
              J(i))
            : (Z(i), Ee(i, n), Be(i, n), W(i, n.showClass.icon))
          : J(i),
        ((e) => {
          const t = A();
          if (!e.imageUrl) return J(t);
          Z(t, ""),
            t.setAttribute("src", e.imageUrl),
            t.setAttribute("alt", e.imageAlt),
            Y(t, "width", e.imageWidth),
            Y(t, "height", e.imageHeight),
            (t.className = h.image),
            U(t, e, "image");
        })(t),
        ((e) => {
          const t = C();
          $(t, e.title || e.titleText, "block"),
            e.title && re(e.title, t),
            e.titleText && (t.innerText = e.titleText),
            U(t, e, "title");
        })(t),
        ((e) => {
          const t = M();
          V(t, e.closeButtonHtml),
            U(t, e, "closeButton"),
            $(t, e.showCloseButton),
            t.setAttribute("aria-label", e.closeButtonAriaLabel);
        })(t),
        Ae(e, t),
        de(0, t),
        (i = t),
        (e = O()),
        $(e, i.footer),
        i.footer && re(i.footer, e),
        U(e, i, "footer"),
        "function" == typeof t.didRender && t.didRender(v());
    };
  const je = () => E() && E().click();
  const Me = (e) => {
      let t = v();
      t || cn.fire(), (t = v());
      var n = S();
      H() ? J(w()) : De(t, e),
        Z(n),
        t.setAttribute("data-loading", !0),
        t.setAttribute("aria-busy", !0),
        t.focus();
    },
    De = (e, t) => {
      var n = L();
      const o = S();
      !t && G(E()) && (t = E()),
        Z(n),
        t && (J(t), o.setAttribute("data-button-to-replace", t.className)),
        o.parentNode.insertBefore(o, t),
        W([e, n], h.loading);
    },
    Ie = {},
    He = (o) =>
      new Promise((e) => {
        if (!o) return e();
        var t = window.scrollX,
          n = window.scrollY;
        (Ie.restoreFocusTimeout = setTimeout(() => {
          Ie.previousActiveElement && Ie.previousActiveElement.focus
            ? (Ie.previousActiveElement.focus(),
              (Ie.previousActiveElement = null))
            : document.body && document.body.focus(),
            e();
        }, 100)),
          window.scrollTo(t, n);
      });
  const qe = () => {
      if (Ie.timeout)
        return (
          (() => {
            const e = j();
            var t = parseInt(window.getComputedStyle(e).width);
            e.style.removeProperty("transition"), (e.style.width = "100%");
            var n = parseInt(window.getComputedStyle(e).width),
              n = parseInt((t / n) * 100);
            e.style.removeProperty("transition"),
              (e.style.width = "".concat(n, "%"));
          })(),
          Ie.timeout.stop()
        );
    },
    Ve = () => {
      if (Ie.timeout) {
        var e = Ie.timeout.start();
        return ne(e), e;
      }
    };
  let Ne = !1;
  const Ue = {};
  const Fe = (t) => {
      for (let e = t.target; e && e !== document; e = e.parentNode)
        for (const o in Ue) {
          var n = e.getAttribute(o);
          if (n) return void Ue[o].fire({ template: n });
        }
    },
    Re = {
      title: "",
      titleText: "",
      text: "",
      html: "",
      footer: "",
      icon: void 0,
      iconColor: void 0,
      iconHtml: void 0,
      template: void 0,
      toast: !1,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide",
      },
      customClass: {},
      target: "body",
      backdrop: !0,
      heightAuto: !0,
      allowOutsideClick: !0,
      allowEscapeKey: !0,
      allowEnterKey: !0,
      stopKeydownPropagation: !0,
      keydownListenerCapture: !1,
      showConfirmButton: !0,
      showDenyButton: !1,
      showCancelButton: !1,
      preConfirm: void 0,
      preDeny: void 0,
      confirmButtonText: "OK",
      confirmButtonAriaLabel: "",
      confirmButtonColor: void 0,
      denyButtonText: "No",
      denyButtonAriaLabel: "",
      denyButtonColor: void 0,
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "",
      cancelButtonColor: void 0,
      buttonsStyling: !0,
      reverseButtons: !1,
      focusConfirm: !0,
      focusDeny: !1,
      focusCancel: !1,
      returnFocus: !0,
      showCloseButton: !1,
      closeButtonHtml: "&times;",
      closeButtonAriaLabel: "Close this dialog",
      loaderHtml: "",
      showLoaderOnConfirm: !1,
      showLoaderOnDeny: !1,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: "",
      timer: void 0,
      timerProgressBar: !1,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: "",
      inputLabel: "",
      inputValue: "",
      inputOptions: {},
      inputAutoTrim: !0,
      inputAttributes: {},
      inputValidator: void 0,
      returnInputValueOnDeny: !1,
      validationMessage: void 0,
      grow: !1,
      position: "center",
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      willOpen: void 0,
      didOpen: void 0,
      didRender: void 0,
      willClose: void 0,
      didClose: void 0,
      didDestroy: void 0,
      scrollbarPadding: !0,
    },
    ze = [
      "allowEscapeKey",
      "allowOutsideClick",
      "background",
      "buttonsStyling",
      "cancelButtonAriaLabel",
      "cancelButtonColor",
      "cancelButtonText",
      "closeButtonAriaLabel",
      "closeButtonHtml",
      "confirmButtonAriaLabel",
      "confirmButtonColor",
      "confirmButtonText",
      "currentProgressStep",
      "customClass",
      "denyButtonAriaLabel",
      "denyButtonColor",
      "denyButtonText",
      "didClose",
      "didDestroy",
      "footer",
      "hideClass",
      "html",
      "icon",
      "iconColor",
      "iconHtml",
      "imageAlt",
      "imageHeight",
      "imageUrl",
      "imageWidth",
      "progressSteps",
      "returnFocus",
      "reverseButtons",
      "showCancelButton",
      "showCloseButton",
      "showConfirmButton",
      "showDenyButton",
      "text",
      "title",
      "titleText",
      "willClose",
    ],
    We = {},
    _e = [
      "allowOutsideClick",
      "allowEnterKey",
      "backdrop",
      "focusConfirm",
      "focusDeny",
      "focusCancel",
      "returnFocus",
      "heightAuto",
      "keydownListenerCapture",
    ],
    Ke = (e) => Object.prototype.hasOwnProperty.call(Re, e);
  const Ye = (e) => We[e],
    Ze = (e) => {
      !e.backdrop &&
        e.allowOutsideClick &&
        s(
          '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
        );
      for (const o in e)
        (n = o),
          Ke(n) || s('Unknown parameter "'.concat(n, '"')),
          e.toast &&
            ((t = o),
            _e.includes(t) &&
              s('The parameter "'.concat(t, '" is incompatible with toasts'))),
          (t = o),
          Ye(t) && i(t, Ye(t));
      var t, n;
    };
  var Je = Object.freeze({
    isValidParameter: Ke,
    isUpdatableParameter: (e) => -1 !== ze.indexOf(e),
    isDeprecatedParameter: Ye,
    argsToParams: (n) => {
      const o = {};
      return (
        "object" != typeof n[0] || m(n[0])
          ? ["title", "html", "icon"].forEach((e, t) => {
              t = n[t];
              "string" == typeof t || m(t)
                ? (o[e] = t)
                : void 0 !== t &&
                  r(
                    "Unexpected type of "
                      .concat(e, '! Expected "string" or "Element", got ')
                      .concat(typeof t)
                  );
            })
          : Object.assign(o, n[0]),
        o
      );
    },
    isVisible: () => G(v()),
    clickConfirm: je,
    clickDeny: () => P() && P().click(),
    clickCancel: () => T() && T().click(),
    getContainer: b,
    getPopup: v,
    getTitle: C,
    getHtmlContainer: k,
    getImage: A,
    getIcon: w,
    getInputLabel: () => y(h["input-label"]),
    getCloseButton: M,
    getActions: L,
    getConfirmButton: E,
    getDenyButton: P,
    getCancelButton: T,
    getLoader: S,
    getFooter: O,
    getTimerProgressBar: j,
    getFocusableElements: D,
    getValidationMessage: x,
    isLoading: () => v().hasAttribute("data-loading"),
    fire: function (...e) {
      return new this(...e);
    },
    mixin: function (n) {
      class e extends this {
        _main(e, t) {
          return super._main(e, Object.assign({}, n, t));
        }
      }
      return e;
    },
    showLoading: Me,
    enableLoading: Me,
    getTimerLeft: () => Ie.timeout && Ie.timeout.getTimerLeft(),
    stopTimer: qe,
    resumeTimer: Ve,
    toggleTimer: () => {
      var e = Ie.timeout;
      return e && (e.running ? qe : Ve)();
    },
    increaseTimer: (e) => {
      if (Ie.timeout) {
        e = Ie.timeout.increase(e);
        return ne(e, !0), e;
      }
    },
    isTimerRunning: () => Ie.timeout && Ie.timeout.isRunning(),
    bindClickHandler: function (e = "data-swal-template") {
      (Ue[e] = this),
        Ne || (document.body.addEventListener("click", Fe), (Ne = !0));
    },
  });
  function Xe() {
    var e = he.innerParams.get(this);
    if (e) {
      const t = he.domCache.get(this);
      J(t.loader),
        H()
          ? e.icon && Z(w())
          : ((e) => {
              const t = e.popup.getElementsByClassName(
                e.loader.getAttribute("data-button-to-replace")
              );
              if (t.length) Z(t[0], "inline-block");
              else if (Q()) J(e.actions);
            })(t),
        _([t.popup, t.actions], h.loading),
        t.popup.removeAttribute("aria-busy"),
        t.popup.removeAttribute("data-loading"),
        (t.confirmButton.disabled = !1),
        (t.denyButton.disabled = !1),
        (t.cancelButton.disabled = !1);
    }
  }
  const $e = () => {
      null === q.previousBodyPadding &&
        document.body.scrollHeight > window.innerHeight &&
        ((q.previousBodyPadding = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("padding-right")
        )),
        (document.body.style.paddingRight = "".concat(
          q.previousBodyPadding +
            (() => {
              const e = document.createElement("div");
              (e.className = h["scrollbar-measure"]),
                document.body.appendChild(e);
              var t = e.getBoundingClientRect().width - e.clientWidth;
              return document.body.removeChild(e), t;
            })(),
          "px"
        )));
    },
    Ge = () => {
      navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i) ||
        (v().scrollHeight > window.innerHeight - 44 &&
          (b().style.paddingBottom = "".concat(44, "px")));
    },
    Qe = () => {
      const e = b();
      let t;
      (e.ontouchstart = (e) => {
        t = et(e);
      }),
        (e.ontouchmove = (e) => {
          t && (e.preventDefault(), e.stopPropagation());
        });
    },
    et = (e) => {
      var t = e.target,
        n = b();
      return (
        !tt(e) &&
        !nt(e) &&
        (t === n ||
          !(
            ee(n) ||
            "INPUT" === t.tagName ||
            "TEXTAREA" === t.tagName ||
            (ee(k()) && k().contains(t))
          ))
      );
    },
    tt = (e) =>
      e.touches && e.touches.length && "stylus" === e.touches[0].touchType,
    nt = (e) => e.touches && 1 < e.touches.length;
  var ot = { swalPromiseResolve: new WeakMap() };
  function it(e, t, n, o) {
    H()
      ? rt(e, o)
      : (He(n).then(() => rt(e, o)),
        Ie.keydownTarget.removeEventListener("keydown", Ie.keydownHandler, {
          capture: Ie.keydownListenerCapture,
        }),
        (Ie.keydownHandlerAdded = !1)),
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        ? (t.setAttribute("style", "display:none !important"),
          t.removeAttribute("class"),
          (t.innerHTML = ""))
        : t.remove(),
      I() &&
        (null !== q.previousBodyPadding &&
          ((document.body.style.paddingRight = "".concat(
            q.previousBodyPadding,
            "px"
          )),
          (q.previousBodyPadding = null)),
        N(document.body, h.iosfix) &&
          ((t = parseInt(document.body.style.top, 10)),
          _(document.body, h.iosfix),
          (document.body.style.top = ""),
          (document.body.scrollTop = -1 * t)),
        (() => {
          const e = a(document.body.children);
          e.forEach((e) => {
            e.hasAttribute("data-previous-aria-hidden")
              ? (e.setAttribute(
                  "aria-hidden",
                  e.getAttribute("data-previous-aria-hidden")
                ),
                e.removeAttribute("data-previous-aria-hidden"))
              : e.removeAttribute("aria-hidden");
          });
        })()),
      _(
        [document.documentElement, document.body],
        [h.shown, h["height-auto"], h["no-backdrop"], h["toast-shown"]]
      );
  }
  function at(e) {
    var t = v();
    if (t) {
      e =
        void 0 !== (o = e)
          ? Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, o)
          : { isConfirmed: !1, isDenied: !1, isDismissed: !0 };
      var n = he.innerParams.get(this);
      if (n && !N(t, n.hideClass.popup)) {
        const i = ot.swalPromiseResolve.get(this);
        _(t, n.showClass.popup), W(t, n.hideClass.popup);
        var o = b();
        _(o, n.showClass.backdrop),
          W(o, n.hideClass.backdrop),
          ((e, t, n) => {
            const o = b(),
              i = ue && te(t);
            if (typeof n.willClose === "function") n.willClose(t);
            if (i) st(e, t, o, n.returnFocus, n.didClose);
            else it(e, o, n.returnFocus, n.didClose);
          })(this, t, n),
          i(e);
      }
    }
  }
  const st = (e, t, n, o, i) => {
      (Ie.swalCloseEventFinishedCallback = it.bind(null, e, n, o, i)),
        t.addEventListener(ue, function (e) {
          e.target === t &&
            (Ie.swalCloseEventFinishedCallback(),
            delete Ie.swalCloseEventFinishedCallback);
        });
    },
    rt = (e, t) => {
      setTimeout(() => {
        "function" == typeof t && t.bind(e.params)(), e._destroy();
      });
    };
  function ct(e, t, n) {
    const o = he.domCache.get(e);
    t.forEach((e) => {
      o[e].disabled = n;
    });
  }
  function lt(e, t) {
    if (!e) return !1;
    if ("radio" === e.type) {
      const n = e.parentNode.parentNode,
        o = n.querySelectorAll("input");
      for (let e = 0; e < o.length; e++) o[e].disabled = t;
    } else e.disabled = t;
  }
  class ut {
    constructor(e, t) {
      (this.callback = e),
        (this.remaining = t),
        (this.running = !1),
        this.start();
    }
    start() {
      return (
        this.running ||
          ((this.running = !0),
          (this.started = new Date()),
          (this.id = setTimeout(this.callback, this.remaining))),
        this.remaining
      );
    }
    stop() {
      return (
        this.running &&
          ((this.running = !1),
          clearTimeout(this.id),
          (this.remaining -= new Date() - this.started)),
        this.remaining
      );
    }
    increase(e) {
      var t = this.running;
      return (
        t && this.stop(),
        (this.remaining += e),
        t && this.start(),
        this.remaining
      );
    }
    getTimerLeft() {
      return this.running && (this.stop(), this.start()), this.remaining;
    }
    isRunning() {
      return this.running;
    }
  }
  var dt = {
    email: (e, t) =>
      /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid email address"),
    url: (e, t) =>
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
        e
      )
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid URL"),
  };
  function pt(e) {
    var t, n;
    (t = e).inputValidator ||
      Object.keys(dt).forEach((e) => {
        t.input === e && (t.inputValidator = dt[e]);
      }),
      e.showLoaderOnConfirm &&
        !e.preConfirm &&
        s(
          "showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
        ),
      ((n = e).target &&
        ("string" != typeof n.target || document.querySelector(n.target)) &&
        ("string" == typeof n.target || n.target.appendChild)) ||
        (s('Target parameter is not valid, defaulting to "body"'),
        (n.target = "body")),
      "string" == typeof e.title &&
        (e.title = e.title.split("\n").join("<br />")),
      se(e);
  }
  const mt = ["swal-title", "swal-html", "swal-footer"],
    ht = (e) => {
      e =
        "string" == typeof e.template
          ? document.querySelector(e.template)
          : e.template;
      if (!e) return {};
      e = e.content;
      return Ct(e), Object.assign(gt(e), bt(e), ft(e), yt(e), vt(e), wt(e, mt));
    },
    gt = (e) => {
      const o = {};
      return (
        a(e.querySelectorAll("swal-param")).forEach((e) => {
          kt(e, ["name", "value"]);
          var t = e.getAttribute("name");
          let n = e.getAttribute("value");
          "boolean" == typeof Re[t] && "false" === n && (n = !1),
            "object" == typeof Re[t] && (n = JSON.parse(n)),
            (o[t] = n);
        }),
        o
      );
    },
    bt = (e) => {
      const n = {};
      return (
        a(e.querySelectorAll("swal-button")).forEach((e) => {
          kt(e, ["type", "color", "aria-label"]);
          var t = e.getAttribute("type");
          (n["".concat(t, "ButtonText")] = e.innerHTML),
            (n["show".concat(o(t), "Button")] = !0),
            e.hasAttribute("color") &&
              (n["".concat(t, "ButtonColor")] = e.getAttribute("color")),
            e.hasAttribute("aria-label") &&
              (n["".concat(t, "ButtonAriaLabel")] =
                e.getAttribute("aria-label"));
        }),
        n
      );
    },
    ft = (e) => {
      const t = {},
        n = e.querySelector("swal-image");
      return (
        n &&
          (kt(n, ["src", "width", "height", "alt"]),
          n.hasAttribute("src") && (t.imageUrl = n.getAttribute("src")),
          n.hasAttribute("width") && (t.imageWidth = n.getAttribute("width")),
          n.hasAttribute("height") &&
            (t.imageHeight = n.getAttribute("height")),
          n.hasAttribute("alt") && (t.imageAlt = n.getAttribute("alt"))),
        t
      );
    },
    yt = (e) => {
      const t = {},
        n = e.querySelector("swal-icon");
      return (
        n &&
          (kt(n, ["type", "color"]),
          n.hasAttribute("type") && (t.icon = n.getAttribute("type")),
          n.hasAttribute("color") && (t.iconColor = n.getAttribute("color")),
          (t.iconHtml = n.innerHTML)),
        t
      );
    },
    vt = (e) => {
      const n = {},
        t = e.querySelector("swal-input");
      t &&
        (kt(t, ["type", "label", "placeholder", "value"]),
        (n.input = t.getAttribute("type") || "text"),
        t.hasAttribute("label") && (n.inputLabel = t.getAttribute("label")),
        t.hasAttribute("placeholder") &&
          (n.inputPlaceholder = t.getAttribute("placeholder")),
        t.hasAttribute("value") && (n.inputValue = t.getAttribute("value")));
      e = e.querySelectorAll("swal-input-option");
      return (
        e.length &&
          ((n.inputOptions = {}),
          a(e).forEach((e) => {
            kt(e, ["value"]);
            var t = e.getAttribute("value"),
              e = e.innerHTML;
            n.inputOptions[t] = e;
          })),
        n
      );
    },
    wt = (e, t) => {
      const n = {};
      for (const o in t) {
        const i = t[o],
          a = e.querySelector(i);
        a && (kt(a, []), (n[i.replace(/^swal-/, "")] = a.innerHTML.trim()));
      }
      return n;
    },
    Ct = (e) => {
      const t = mt.concat([
        "swal-param",
        "swal-button",
        "swal-image",
        "swal-icon",
        "swal-input",
        "swal-input-option",
      ]);
      a(e.children).forEach((e) => {
        e = e.tagName.toLowerCase();
        -1 === t.indexOf(e) && s("Unrecognized element <".concat(e, ">"));
      });
    },
    kt = (t, n) => {
      a(t.attributes).forEach((e) => {
        -1 === n.indexOf(e.name) &&
          s([
            'Unrecognized attribute "'
              .concat(e.name, '" on <')
              .concat(t.tagName.toLowerCase(), ">."),
            "".concat(
              n.length
                ? "Allowed attributes are: ".concat(n.join(", "))
                : "To set the value, use HTML within the element."
            ),
          ]);
      });
    },
    At = (e) => {
      const t = b(),
        n = v();
      "function" == typeof e.willOpen && e.willOpen(n);
      var o = window.getComputedStyle(document.body).overflowY;
      Pt(t, n, e),
        setTimeout(() => {
          xt(t, n);
        }, 10),
        I() &&
          (Et(t, e.scrollbarPadding, o),
          (() => {
            const e = a(document.body.children);
            e.forEach((e) => {
              e === b() ||
                e.contains(b()) ||
                (e.hasAttribute("aria-hidden") &&
                  e.setAttribute(
                    "data-previous-aria-hidden",
                    e.getAttribute("aria-hidden")
                  ),
                e.setAttribute("aria-hidden", "true"));
            });
          })()),
        H() ||
          Ie.previousActiveElement ||
          (Ie.previousActiveElement = document.activeElement),
        "function" == typeof e.didOpen && setTimeout(() => e.didOpen(n)),
        _(t, h["no-transition"]);
    },
    Bt = (e) => {
      const t = v();
      if (e.target === t) {
        const n = b();
        t.removeEventListener(ue, Bt), (n.style.overflowY = "auto");
      }
    },
    xt = (e, t) => {
      ue && te(t)
        ? ((e.style.overflowY = "hidden"), t.addEventListener(ue, Bt))
        : (e.style.overflowY = "auto");
    },
    Et = (e, t, n) => {
      var o;
      ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
        ("MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints)) &&
        !N(document.body, h.iosfix) &&
        ((o = document.body.scrollTop),
        (document.body.style.top = "".concat(-1 * o, "px")),
        W(document.body, h.iosfix),
        Qe(),
        Ge()),
        t && "hidden" !== n && $e(),
        setTimeout(() => {
          e.scrollTop = 0;
        });
    },
    Pt = (e, t, n) => {
      W(e, n.showClass.backdrop),
        t.style.setProperty("opacity", "0", "important"),
        Z(t, "grid"),
        setTimeout(() => {
          W(t, n.showClass.popup), t.style.removeProperty("opacity");
        }, 10),
        W([document.documentElement, document.body], h.shown),
        n.heightAuto &&
          n.backdrop &&
          !n.toast &&
          W([document.documentElement, document.body], h["height-auto"]);
    },
    St = (e) => (e.checked ? 1 : 0),
    Tt = (e) => (e.checked ? e.value : null),
    Lt = (e) =>
      e.files.length
        ? null !== e.getAttribute("multiple")
          ? e.files
          : e.files[0]
        : null,
    Ot = (t, n) => {
      const o = v(),
        i = (e) => Mt[n.input](o, Dt(e), n);
      u(n.inputOptions) || p(n.inputOptions)
        ? (Me(E()),
          d(n.inputOptions).then((e) => {
            t.hideLoading(), i(e);
          }))
        : "object" == typeof n.inputOptions
        ? i(n.inputOptions)
        : r(
            "Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(
              typeof n.inputOptions
            )
          );
    },
    jt = (t, n) => {
      const o = t.getInput();
      J(o),
        d(n.inputValue)
          .then((e) => {
            (o.value =
              "number" === n.input ? parseFloat(e) || 0 : "".concat(e)),
              Z(o),
              o.focus(),
              t.hideLoading();
          })
          .catch((e) => {
            r("Error in inputValue promise: ".concat(e)),
              (o.value = ""),
              Z(o),
              o.focus(),
              t.hideLoading();
          });
    },
    Mt = {
      select: (e, t, i) => {
        const a = K(e, h.select),
          s = (e, t, n) => {
            const o = document.createElement("option");
            (o.value = n),
              V(o, t),
              (o.selected = It(n, i.inputValue)),
              e.appendChild(o);
          };
        t.forEach((e) => {
          var t = e[0];
          const n = e[1];
          if (Array.isArray(n)) {
            const o = document.createElement("optgroup");
            (o.label = t),
              (o.disabled = !1),
              a.appendChild(o),
              n.forEach((e) => s(o, e[1], e[0]));
          } else s(a, n, t);
        }),
          a.focus();
      },
      radio: (e, t, a) => {
        const s = K(e, h.radio);
        t.forEach((e) => {
          var t = e[0],
            e = e[1];
          const n = document.createElement("input"),
            o = document.createElement("label");
          (n.type = "radio"),
            (n.name = h.radio),
            (n.value = t),
            It(t, a.inputValue) && (n.checked = !0);
          const i = document.createElement("span");
          V(i, e),
            (i.className = h.label),
            o.appendChild(n),
            o.appendChild(i),
            s.appendChild(o);
        });
        const n = s.querySelectorAll("input");
        n.length && n[0].focus();
      },
    },
    Dt = (n) => {
      const o = [];
      return (
        "undefined" != typeof Map && n instanceof Map
          ? n.forEach((e, t) => {
              let n = e;
              "object" == typeof n && (n = Dt(n)), o.push([t, n]);
            })
          : Object.keys(n).forEach((e) => {
              let t = n[e];
              "object" == typeof t && (t = Dt(t)), o.push([e, t]);
            }),
        o
      );
    },
    It = (e, t) => t && t.toString() === e.toString(),
    Ht = (e, t, n) => {
      var o = ((e, t) => {
        const n = e.getInput();
        if (!n) return null;
        switch (t.input) {
          case "checkbox":
            return St(n);
          case "radio":
            return Tt(n);
          case "file":
            return Lt(n);
          default:
            return t.inputAutoTrim ? n.value.trim() : n.value;
        }
      })(e, t);
      t.inputValidator
        ? qt(e, t, o, n)
        : e.getInput().checkValidity()
        ? ("deny" === n ? Vt : Ut)(e, t, o)
        : (e.enableButtons(), e.showValidationMessage(t.validationMessage));
    },
    qt = (t, n, o, i) => {
      t.disableInput();
      const e = Promise.resolve().then(() =>
        d(n.inputValidator(o, n.validationMessage))
      );
      e.then((e) => {
        t.enableButtons(),
          t.enableInput(),
          e ? t.showValidationMessage(e) : ("deny" === i ? Vt : Ut)(t, n, o);
      });
    },
    Vt = (t, e, n) => {
      if ((e.showLoaderOnDeny && Me(P()), e.preDeny)) {
        const o = Promise.resolve().then(() =>
          d(e.preDeny(n, e.validationMessage))
        );
        o.then((e) => {
          !1 === e
            ? t.hideLoading()
            : t.closePopup({ isDenied: !0, value: void 0 === e ? n : e });
        });
      } else t.closePopup({ isDenied: !0, value: n });
    },
    Nt = (e, t) => {
      e.closePopup({ isConfirmed: !0, value: t });
    },
    Ut = (t, e, n) => {
      if ((e.showLoaderOnConfirm && Me(), e.preConfirm)) {
        t.resetValidationMessage();
        const o = Promise.resolve().then(() =>
          d(e.preConfirm(n, e.validationMessage))
        );
        o.then((e) => {
          G(x()) || !1 === e ? t.hideLoading() : Nt(t, void 0 === e ? n : e);
        });
      } else Nt(t, n);
    },
    Ft = (e, t, n) => {
      const o = D();
      if (o.length)
        return (
          (t += n) === o.length ? (t = 0) : -1 === t && (t = o.length - 1),
          o[t].focus()
        );
      v().focus();
    },
    Rt = ["ArrowRight", "ArrowDown"],
    zt = ["ArrowLeft", "ArrowUp"],
    Wt = (e, t, n) => {
      var o = he.innerParams.get(e);
      o &&
        (o.stopKeydownPropagation && t.stopPropagation(),
        "Enter" === t.key
          ? _t(e, t, o)
          : "Tab" === t.key
          ? Kt(t, o)
          : [...Rt, ...zt].includes(t.key)
          ? Yt(t.key)
          : "Escape" === t.key && Zt(t, o, n));
    },
    _t = (e, t, n) => {
      t.isComposing ||
        (t.target &&
          e.getInput() &&
          t.target.outerHTML === e.getInput().outerHTML &&
          (["textarea", "file"].includes(n.input) ||
            (je(), t.preventDefault())));
    },
    Kt = (e, t) => {
      var n = e.target,
        o = D();
      let i = -1;
      for (let e = 0; e < o.length; e++)
        if (n === o[e]) {
          i = e;
          break;
        }
      e.shiftKey ? Ft(0, i, -1) : Ft(0, i, 1),
        e.stopPropagation(),
        e.preventDefault();
    },
    Yt = (e) => {
      const t = E(),
        n = P(),
        o = T();
      if ([t, n, o].includes(document.activeElement)) {
        e = Rt.includes(e) ? "nextElementSibling" : "previousElementSibling";
        const i = document.activeElement[e];
        i && i.focus();
      }
    },
    Zt = (e, t, n) => {
      c(t.allowEscapeKey) && (e.preventDefault(), n(l.esc));
    },
    Jt = (t, e, n) => {
      e.popup.onclick = () => {
        var e = he.innerParams.get(t);
        e.showConfirmButton ||
          e.showDenyButton ||
          e.showCancelButton ||
          e.showCloseButton ||
          e.timer ||
          e.input ||
          n(l.close);
      };
    };
  let Xt = !1;
  const $t = (t) => {
      t.popup.onmousedown = () => {
        t.container.onmouseup = function (e) {
          (t.container.onmouseup = void 0),
            e.target === t.container && (Xt = !0);
        };
      };
    },
    Gt = (t) => {
      t.container.onmousedown = () => {
        t.popup.onmouseup = function (e) {
          (t.popup.onmouseup = void 0),
            (e.target !== t.popup && !t.popup.contains(e.target)) || (Xt = !0);
        };
      };
    },
    Qt = (n, o, i) => {
      o.container.onclick = (e) => {
        var t = he.innerParams.get(n);
        Xt
          ? (Xt = !1)
          : e.target === o.container && c(t.allowOutsideClick) && i(l.backdrop);
      };
    };
  const en = (e, t, n) => {
      var o = j();
      J(o),
        t.timer &&
          ((e.timeout = new ut(() => {
            n("timer"), delete e.timeout;
          }, t.timer)),
          t.timerProgressBar &&
            (Z(o),
            setTimeout(() => {
              e.timeout && e.timeout.running && ne(t.timer);
            })));
    },
    tn = (e, t) => {
      if (!t.toast)
        return c(t.allowEnterKey) ? void (nn(e, t) || Ft(0, -1, 1)) : on();
    },
    nn = (e, t) =>
      t.focusDeny && G(e.denyButton)
        ? (e.denyButton.focus(), !0)
        : t.focusCancel && G(e.cancelButton)
        ? (e.cancelButton.focus(), !0)
        : !(!t.focusConfirm || !G(e.confirmButton)) &&
          (e.confirmButton.focus(), !0),
    on = () => {
      document.activeElement &&
        "function" == typeof document.activeElement.blur &&
        document.activeElement.blur();
    };
  const an = (e) => {
    for (const t in e) e[t] = new WeakMap();
  };
  e = Object.freeze({
    hideLoading: Xe,
    disableLoading: Xe,
    getInput: function (e) {
      var t = he.innerParams.get(e || this);
      return (e = he.domCache.get(e || this)) ? F(e.popup, t.input) : null;
    },
    close: at,
    closePopup: at,
    closeModal: at,
    closeToast: at,
    enableButtons: function () {
      ct(this, ["confirmButton", "denyButton", "cancelButton"], !1);
    },
    disableButtons: function () {
      ct(this, ["confirmButton", "denyButton", "cancelButton"], !0);
    },
    enableInput: function () {
      return lt(this.getInput(), !1);
    },
    disableInput: function () {
      return lt(this.getInput(), !0);
    },
    showValidationMessage: function (e) {
      const t = he.domCache.get(this);
      var n = he.innerParams.get(this);
      V(t.validationMessage, e),
        (t.validationMessage.className = h["validation-message"]),
        n.customClass &&
          n.customClass.validationMessage &&
          W(t.validationMessage, n.customClass.validationMessage),
        Z(t.validationMessage);
      const o = this.getInput();
      o &&
        (o.setAttribute("aria-invalid", !0),
        o.setAttribute("aria-describedby", h["validation-message"]),
        R(o),
        W(o, h.inputerror));
    },
    resetValidationMessage: function () {
      var e = he.domCache.get(this);
      e.validationMessage && J(e.validationMessage);
      const t = this.getInput();
      t &&
        (t.removeAttribute("aria-invalid"),
        t.removeAttribute("aria-describedby"),
        _(t, h.inputerror));
    },
    getProgressSteps: function () {
      return he.domCache.get(this).progressSteps;
    },
    _main: function (e, t = {}) {
      Ze(Object.assign({}, t, e)),
        Ie.currentInstance && Ie.currentInstance._destroy(),
        (Ie.currentInstance = this),
        pt(
          (e = ((e, t) => {
            const n = ht(e),
              o = Object.assign({}, Re, t, n, e);
            return (
              (o.showClass = Object.assign({}, Re.showClass, o.showClass)),
              (o.hideClass = Object.assign({}, Re.hideClass, o.hideClass)),
              o
            );
          })(e, t))
        ),
        Object.freeze(e),
        Ie.timeout && (Ie.timeout.stop(), delete Ie.timeout),
        clearTimeout(Ie.restoreFocusTimeout);
      var s,
        r,
        c,
        t = ((e) => {
          const t = {
            popup: v(),
            container: b(),
            actions: L(),
            confirmButton: E(),
            denyButton: P(),
            cancelButton: T(),
            loader: S(),
            closeButton: M(),
            validationMessage: x(),
            progressSteps: B(),
          };
          return he.domCache.set(e, t), t;
        })(this);
      return (
        Oe(this, e),
        he.innerParams.set(this, e),
        (s = this),
        (r = t),
        (c = e),
        new Promise((e) => {
          const t = (e) => {
            s.closePopup({ isDismissed: !0, dismiss: e });
          };
          var n, o, i, a;
          ot.swalPromiseResolve.set(s, e),
            (r.confirmButton.onclick = () =>
              ((e, t) => {
                e.disableButtons(),
                  t.input ? Ht(e, t, "confirm") : Ut(e, t, !0);
              })(s, c)),
            (r.denyButton.onclick = () =>
              ((e, t) => {
                e.disableButtons(),
                  t.returnInputValueOnDeny ? Ht(e, t, "deny") : Vt(e, t, !1);
              })(s, c)),
            (r.cancelButton.onclick = () =>
              ((e, t) => {
                e.disableButtons(), t(l.cancel);
              })(s, t)),
            (r.closeButton.onclick = () => t(l.close)),
            (n = s),
            (a = r),
            (e = t),
            he.innerParams.get(n).toast
              ? Jt(n, a, e)
              : ($t(a), Gt(a), Qt(n, a, e)),
            (o = s),
            (a = Ie),
            (e = c),
            (i = t),
            a.keydownTarget &&
              a.keydownHandlerAdded &&
              (a.keydownTarget.removeEventListener(
                "keydown",
                a.keydownHandler,
                { capture: a.keydownListenerCapture }
              ),
              (a.keydownHandlerAdded = !1)),
            e.toast ||
              ((a.keydownHandler = (e) => Wt(o, e, i)),
              (a.keydownTarget = e.keydownListenerCapture ? window : v()),
              (a.keydownListenerCapture = e.keydownListenerCapture),
              a.keydownTarget.addEventListener("keydown", a.keydownHandler, {
                capture: a.keydownListenerCapture,
              }),
              (a.keydownHandlerAdded = !0)),
            (e = s),
            "select" === (a = c).input || "radio" === a.input
              ? Ot(e, a)
              : ["text", "email", "number", "tel", "textarea"].includes(
                  a.input
                ) &&
                (u(a.inputValue) || p(a.inputValue)) &&
                (Me(E()), jt(e, a)),
            At(c),
            en(Ie, c, t),
            tn(r, c),
            setTimeout(() => {
              r.container.scrollTop = 0;
            });
        })
      );
    },
    update: function (t) {
      var e = v(),
        n = he.innerParams.get(this);
      if (!e || N(e, n.hideClass.popup))
        return s(
          "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
        );
      const o = {};
      Object.keys(t).forEach((e) => {
        cn.isUpdatableParameter(e)
          ? (o[e] = t[e])
          : s(
              'Invalid parameter to update: "'.concat(
                e,
                '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'
              )
            );
      }),
        (n = Object.assign({}, n, o)),
        Oe(this, n),
        he.innerParams.set(this, n),
        Object.defineProperties(this, {
          params: {
            value: Object.assign({}, this.params, t),
            writable: !1,
            enumerable: !0,
          },
        });
    },
    _destroy: function () {
      var e = he.domCache.get(this);
      const t = he.innerParams.get(this);
      t &&
        (e.popup &&
          Ie.swalCloseEventFinishedCallback &&
          (Ie.swalCloseEventFinishedCallback(),
          delete Ie.swalCloseEventFinishedCallback),
        Ie.deferDisposalTimer &&
          (clearTimeout(Ie.deferDisposalTimer), delete Ie.deferDisposalTimer),
        "function" == typeof t.didDestroy && t.didDestroy(),
        delete this.params,
        delete Ie.keydownHandler,
        delete Ie.keydownTarget,
        an(he),
        an(ot));
    },
  });
  let sn;
  class rn {
    constructor(...e) {
      "undefined" != typeof window &&
        ((sn = this),
        (e = Object.freeze(this.constructor.argsToParams(e))),
        Object.defineProperties(this, {
          params: { value: e, writable: !1, enumerable: !0, configurable: !0 },
        }),
        (e = this._main(this.params)),
        he.promise.set(this, e));
    }
    then(e) {
      const t = he.promise.get(this);
      return t.then(e);
    }
    finally(e) {
      const t = he.promise.get(this);
      return t.finally(e);
    }
  }
  Object.assign(rn.prototype, e),
    Object.assign(rn, Je),
    Object.keys(e).forEach((t) => {
      rn[t] = function (...e) {
        if (sn) return sn[t](...e);
      };
    }),
    (rn.DismissReason = l),
    (rn.version = "11.0.17");
  const cn = rn;
  return (cn.default = cn), cn;
}),
  void 0 !== this &&
    this.Sweetalert2 &&
    (this.swal =
      this.sweetAlert =
      this.Swal =
      this.SweetAlert =
        this.Sweetalert2);
"undefined" != typeof document &&
  (function (e, t) {
    var n = e.createElement("style");
    if ((e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet))
      n.styleSheet.disabled || (n.styleSheet.cssText = t);
    else
      try {
        n.innerHTML = t;
      } catch (e) {
        n.innerText = t;
      }
  })(
    document,
    '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.3125em;padding:0}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(100,150,200,.5)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end" "gap gap gap";grid-template-rows:auto auto auto .625em;height:100%;padding:.625em .625em 0;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container::after{content:"";grid-column:1/4;grid-row:4;height:.625em}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7367f0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(115,103,240,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#ea5455;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(234,84,85,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7d88;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,125,136,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:0;padding:1em 1.6em .3em;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 0}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 0;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}'
  );

document.addEventListener("DOMContentLoaded", function (event) {
  const spinners = document.querySelectorAll(".alkemy-spinner");
  for (let spinner of spinners) {
    spinner.classList.add("spinnerContainer");
    spinner.innerHTML = ` <svg class="spinner" width="66px" height="66px" view-box="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" strokelinecap="round" cx="33" cy="33" r="30"></circle>
    </svg>`;
  }
});
