var e = Object.create;
var t = Object.defineProperty;
var n = Object.getOwnPropertyDescriptor;
var r = Object.getOwnPropertyNames;
var i = Object.getPrototypeOf;
var a = Object.prototype.hasOwnProperty;
var o = (e, t) => () => {
  if (!t) {
    e(
      (t = {
        exports: {},
      }).exports,
      t,
    );
    e = null;
  }
  return t.exports;
};
var s = (e, i, o, s) => {
  if ((i && typeof i == `object`) || typeof i == `function`) {
    var c = r(i);
    for (var l = 0, u = c.length, d; l < u; l++) {
      d = c[l];
      if (!a.call(e, d) && d !== o) {
        t(e, d, {
          get: ((e) => i[e]).bind(null, d),
          enumerable: !(s = n(i, d)) || s.enumerable,
        });
      }
    }
  }
  return e;
};
var c = (n, r, a) => {
  a = n == null ? {} : e(i(n));
  return s(
    r || !n || !n.__esModule
      ? t(a, `default`, {
          value: n,
          enumerable: true,
        })
      : a,
    n,
  );
};
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) {
    return;
  }
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) {
    n(e);
  }
  new MutationObserver((e) => {
    for (let t of e) {
      if (t.type === `childList`) {
        for (let e of t.addedNodes) {
          if (e.tagName === `LINK` && e.rel === `modulepreload`) {
            n(e);
          }
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true,
  });
  function t(e) {
    let t = {};
    if (e.integrity) {
      t.integrity = e.integrity;
    }
    if (e.referrerPolicy) {
      t.referrerPolicy = e.referrerPolicy;
    }
    if (e.crossOrigin === `use-credentials`) {
      t.credentials = `include`;
    } else if (e.crossOrigin === `anonymous`) {
      t.credentials = `omit`;
    } else {
      t.credentials = `same-origin`;
    }
    return t;
  }
  function n(e) {
    if (e.ep) {
      return;
    }
    e.ep = true;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var l = o((e) => {
  var t = Symbol.for(`react.transitional.element`);
  var n = Symbol.for(`react.portal`);
  var r = Symbol.for(`react.fragment`);
  var i = Symbol.for(`react.strict_mode`);
  var a = Symbol.for(`react.profiler`);
  var o = Symbol.for(`react.consumer`);
  var s = Symbol.for(`react.context`);
  var c = Symbol.for(`react.forward_ref`);
  var l = Symbol.for(`react.suspense`);
  var u = Symbol.for(`react.memo`);
  var d = Symbol.for(`react.lazy`);
  var f = Symbol.for(`react.activity`);
  var p = Symbol.iterator;
  function m(e) {
    if (typeof e != `object` || !e) {
      return null;
    } else {
      e = (p && e[p]) || e[`@@iterator`];
      if (typeof e == `function`) {
        return e;
      } else {
        return null;
      }
    }
  }
  var h = {
    isMounted: function () {
      return false;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  };
  var g = Object.assign;
  var _ = {};
  function v(e, t, n) {
    this.props = e;
    this.context = t;
    this.refs = _;
    this.updater = n || h;
  }
  v.prototype.isReactComponent = {};
  v.prototype.setState = function (e, t) {
    if (typeof e != `object` && typeof e != `function` && e != null) {
      throw Error(
        `takes an object of state variables to update or a function which returns an object of state variables.`,
      );
    }
    this.updater.enqueueSetState(this, e, t, `setState`);
  };
  v.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
  };
  function y() {}
  y.prototype = v.prototype;
  function b(e, t, n) {
    this.props = e;
    this.context = t;
    this.refs = _;
    this.updater = n || h;
  }
  var x = (b.prototype = new y());
  x.constructor = b;
  g(x, v.prototype);
  x.isPureReactComponent = true;
  var ee = Array.isArray;
  function S() {}
  var C = {
    H: null,
    A: null,
    T: null,
    S: null,
  };
  var te = Object.prototype.hasOwnProperty;
  function ne(e, n, r) {
    var i = r.ref;
    return {
      $$typeof: t,
      type: e,
      key: n,
      ref: i === undefined ? null : i,
      props: r,
    };
  }
  function re(e, t) {
    return ne(e.type, t, e.props);
  }
  function w(e) {
    return typeof e == `object` && !!e && e.$$typeof === t;
  }
  function ie(e) {
    var t = {
      '=': `=0`,
      ':': `=2`,
    };
    return `$${e.replace(/[=:]/g, function (e) {
      return t[e];
    })}`;
  }
  var ae = /\/+/g;
  function oe(e, t) {
    if (typeof e == `object` && e && e.key != null) {
      return ie(`${e.key}`);
    } else {
      return t.toString(36);
    }
  }
  function se(e) {
    switch (e.status) {
      case `fulfilled`:
        return e.value;
      case `rejected`:
        throw e.reason;
      default:
        if (typeof e.status == `string`) {
          e.then(S, S);
        } else {
          e.status = `pending`;
          e.then(
            function (t) {
              if (e.status === `pending`) {
                e.status = `fulfilled`;
                e.value = t;
              }
            },
            function (t) {
              if (e.status === `pending`) {
                e.status = `rejected`;
                e.reason = t;
              }
            },
          );
        }
        switch (e.status) {
          case `fulfilled`:
            return e.value;
          case `rejected`:
            throw e.reason;
        }
    }
    throw e;
  }
  function ce(e, r, i, a, o) {
    var s = typeof e;
    if (s === `undefined` || s === `boolean`) {
      e = null;
    }
    var c = false;
    if (e === null) {
      c = true;
    } else {
      switch (s) {
        case `bigint`:
        case `string`:
        case `number`:
          c = true;
          break;
        case `object`:
          switch (e.$$typeof) {
            case t:
            case n:
              c = true;
              break;
            case d:
              c = e._init;
              return ce(c(e._payload), r, i, a, o);
          }
      }
    }
    if (c) {
      o = o(e);
      c = a === `` ? `.${oe(e, 0)}` : a;
      if (ee(o)) {
        i = ``;
        if (c != null) {
          i = `${c.replace(ae, `$&/`)}/`;
        }
        ce(o, r, i, ``, function (e) {
          return e;
        });
      } else if (o != null) {
        if (w(o)) {
          o = re(
            o,
            i + (o.key == null || (e && e.key === o.key) ? `` : `${`${o.key}`.replace(ae, `$&/`)}/`) + c,
          );
        }
        r.push(o);
      }
      return 1;
    }
    c = 0;
    var l = a === `` ? `.` : `${a}:`;
    if (ee(e)) {
      for (var u = 0; u < e.length; u++) {
        a = e[u];
        s = l + oe(a, u);
        c += ce(a, r, i, s, o);
      }
    } else {
      u = m(e);
      if (typeof u == `function`) {
        e = u.call(e);
        u = 0;
        while (!(a = e.next()).done) {
          a = a.value;
          s = l + oe(a, u++);
          c += ce(a, r, i, s, o);
        }
      } else if (s === `object`) {
        if (typeof e.then == `function`) {
          return ce(se(e), r, i, a, o);
        }
        r = String(e);
        throw Error(
          `Objects are not valid as a React child (found: ${r === `[object Object]` ? `object with keys {${Object.keys(e).join(`, `)}}` : r}). If you meant to render a collection of children, use an array instead.`,
        );
      }
    }
    return c;
  }
  function le(e, t, n) {
    if (e == null) {
      return e;
    }
    var r = [];
    var i = 0;
    ce(e, r, ``, ``, function (e) {
      return t.call(n, e, i++);
    });
    return r;
  }
  function ue(e) {
    if (e._status === -1) {
      var t = e._result;
      t = t();
      t.then(
        function (t) {
          if (e._status === 0 || e._status === -1) {
            e._status = 1;
            e._result = t;
          }
        },
        function (t) {
          if (e._status === 0 || e._status === -1) {
            e._status = 2;
            e._result = t;
          }
        },
      );
      if (e._status === -1) {
        e._status = 0;
        e._result = t;
      }
    }
    if (e._status === 1) {
      return e._result.default;
    }
    throw e._result;
  }
  var T =
    typeof reportError == `function`
      ? reportError
      : function (e) {
          if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
            var t = new window.ErrorEvent(`error`, {
              bubbles: true,
              cancelable: true,
              message:
                typeof e == `object` && e && typeof e.message == `string` ? String(e.message) : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) {
              return;
            }
          } else if (typeof process == `object` && typeof process.emit == `function`) {
            process.emit(`uncaughtException`, e);
            return;
          }
          console.error(e);
        };
  var E = {
    map: le,
    forEach: function (e, t, n) {
      le(
        e,
        function () {
          t.apply(this, arguments);
        },
        n,
      );
    },
    count: function (e) {
      var t = 0;
      le(e, function () {
        t++;
      });
      return t;
    },
    toArray: function (e) {
      return (
        le(e, function (e) {
          return e;
        }) || []
      );
    },
    only: function (e) {
      if (!w(e)) {
        throw Error(`React.Children.only expected to receive a single React element child.`);
      }
      return e;
    },
  };
  e.Activity = f;
  e.Children = E;
  e.Component = v;
  e.Fragment = r;
  e.Profiler = a;
  e.PureComponent = b;
  e.StrictMode = i;
  e.Suspense = l;
  e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C;
  e.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (e) {
      return C.H.useMemoCache(e);
    },
  };
  e.cache = function (e) {
    return function () {
      return e.apply(null, arguments);
    };
  };
  e.cacheSignal = function () {
    return null;
  };
  e.cloneElement = function (e, t, n) {
    if (e == null) {
      throw Error(`The argument must be a React element, but you passed ${e}.`);
    }
    var r = g({}, e.props);
    var i = e.key;
    if (t != null) {
      if (t.key !== undefined) {
        i = `${t.key}`;
      }
      for (a in t) {
        if (
          !!te.call(t, a) &&
          a !== `key` &&
          a !== `__self` &&
          a !== `__source` &&
          (a !== `ref` || t.ref !== undefined)
        ) {
          r[a] = t[a];
        }
      }
    }
    var a = arguments.length - 2;
    if (a === 1) {
      r.children = n;
    } else if (a > 1) {
      var o = Array(a);
      for (var s = 0; s < a; s++) {
        o[s] = arguments[s + 2];
      }
      r.children = o;
    }
    return ne(e.type, i, r);
  };
  e.createContext = function (e) {
    e = {
      $$typeof: s,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    };
    e.Provider = e;
    e.Consumer = {
      $$typeof: o,
      _context: e,
    };
    return e;
  };
  e.createElement = function (e, t, n) {
    var r;
    var i = {};
    var a = null;
    if (t != null) {
      if (t.key !== undefined) {
        a = `${t.key}`;
      }
      for (r in t) {
        if (te.call(t, r) && r !== `key` && r !== `__self` && r !== `__source`) {
          i[r] = t[r];
        }
      }
    }
    var o = arguments.length - 2;
    if (o === 1) {
      i.children = n;
    } else if (o > 1) {
      var s = Array(o);
      for (var c = 0; c < o; c++) {
        s[c] = arguments[c + 2];
      }
      i.children = s;
    }
    if (e && e.defaultProps) {
      o = e.defaultProps;
      for (r in o) {
        if (i[r] === undefined) {
          i[r] = o[r];
        }
      }
    }
    return ne(e, a, i);
  };
  e.createRef = function () {
    return {
      current: null,
    };
  };
  e.forwardRef = function (e) {
    return {
      $$typeof: c,
      render: e,
    };
  };
  e.isValidElement = w;
  e.lazy = function (e) {
    return {
      $$typeof: d,
      _payload: {
        _status: -1,
        _result: e,
      },
      _init: ue,
    };
  };
  e.memo = function (e, t) {
    return {
      $$typeof: u,
      type: e,
      compare: t === undefined ? null : t,
    };
  };
  e.startTransition = function (e) {
    var t = C.T;
    var n = {};
    C.T = n;
    try {
      var r = e();
      var i = C.S;
      if (i !== null) {
        i(n, r);
      }
      if (typeof r == `object` && r && typeof r.then == `function`) {
        r.then(S, T);
      }
    } catch (e) {
      T(e);
    } finally {
      if (t !== null && n.types !== null) {
        t.types = n.types;
      }
      C.T = t;
    }
  };
  e.unstable_useCacheRefresh = function () {
    return C.H.useCacheRefresh();
  };
  e.use = function (e) {
    return C.H.use(e);
  };
  e.useActionState = function (e, t, n) {
    return C.H.useActionState(e, t, n);
  };
  e.useCallback = function (e, t) {
    return C.H.useCallback(e, t);
  };
  e.useContext = function (e) {
    return C.H.useContext(e);
  };
  e.useDebugValue = function () {};
  e.useDeferredValue = function (e, t) {
    return C.H.useDeferredValue(e, t);
  };
  e.useEffect = function (e, t) {
    return C.H.useEffect(e, t);
  };
  e.useEffectEvent = function (e) {
    return C.H.useEffectEvent(e);
  };
  e.useId = function () {
    return C.H.useId();
  };
  e.useImperativeHandle = function (e, t, n) {
    return C.H.useImperativeHandle(e, t, n);
  };
  e.useInsertionEffect = function (e, t) {
    return C.H.useInsertionEffect(e, t);
  };
  e.useLayoutEffect = function (e, t) {
    return C.H.useLayoutEffect(e, t);
  };
  e.useMemo = function (e, t) {
    return C.H.useMemo(e, t);
  };
  e.useOptimistic = function (e, t) {
    return C.H.useOptimistic(e, t);
  };
  e.useReducer = function (e, t, n) {
    return C.H.useReducer(e, t, n);
  };
  e.useRef = function (e) {
    return C.H.useRef(e);
  };
  e.useState = function (e) {
    return C.H.useState(e);
  };
  e.useSyncExternalStore = function (e, t, n) {
    return C.H.useSyncExternalStore(e, t, n);
  };
  e.useTransition = function () {
    return C.H.useTransition();
  };
  e.version = `19.2.5`;
});
var u = o((e, t) => {
  t.exports = l();
});
var d = o((e) => {
  function t(e, t) {
    var n = e.length;
    e.push(t);
    a: while (n > 0) {
      var r = (n - 1) >>> 1;
      var a = e[r];
      if (i(a, t) > 0) {
        e[r] = t;
        e[n] = a;
        n = r;
      } else {
        break a;
      }
    }
  }
  function n(e) {
    if (e.length === 0) {
      return null;
    } else {
      return e[0];
    }
  }
  function r(e) {
    if (e.length === 0) {
      return null;
    }
    var t = e[0];
    var n = e.pop();
    if (n !== t) {
      e[0] = n;
      a: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
        var s = (r + 1) * 2 - 1;
        var c = e[s];
        var l = s + 1;
        var u = e[l];
        if (i(c, n) < 0) {
          if (l < a && i(u, c) < 0) {
            e[r] = u;
            e[l] = n;
            r = l;
          } else {
            e[r] = c;
            e[s] = n;
            r = s;
          }
        } else if (l < a && i(u, n) < 0) {
          e[r] = u;
          e[l] = n;
          r = l;
        } else {
          break a;
        }
      }
    }
    return t;
  }
  function i(e, t) {
    var n = e.sortIndex - t.sortIndex;
    if (n === 0) {
      return e.id - t.id;
    } else {
      return n;
    }
  }
  e.unstable_now = undefined;
  if (typeof performance == `object` && typeof performance.now == `function`) {
    var a = performance;
    e.unstable_now = function () {
      return a.now();
    };
  } else {
    var o = Date;
    var s = o.now();
    e.unstable_now = function () {
      return o.now() - s;
    };
  }
  var c = [];
  var l = [];
  var u = 1;
  var d = null;
  var f = 3;
  var p = false;
  var m = false;
  var h = false;
  var g = false;
  var _ = typeof setTimeout == `function` ? setTimeout : null;
  var v = typeof clearTimeout == `function` ? clearTimeout : null;
  var y = typeof setImmediate < `u` ? setImmediate : null;
  function b(e) {
    for (var i = n(l); i !== null; ) {
      if (i.callback === null) {
        r(l);
      } else if (i.startTime <= e) {
        r(l);
        i.sortIndex = i.expirationTime;
        t(c, i);
      } else {
        break;
      }
      i = n(l);
    }
  }
  function x(e) {
    h = false;
    b(e);
    if (!m) {
      if (n(c) !== null) {
        m = true;
        if (!ee) {
          ee = true;
          w();
        }
      } else {
        var t = n(l);
        if (t !== null) {
          oe(x, t.startTime - e);
        }
      }
    }
  }
  var ee = false;
  var S = -1;
  var C = 5;
  var te = -1;
  function ne() {
    if (g) {
      return true;
    } else {
      return !(e.unstable_now() - te < C);
    }
  }
  function re() {
    g = false;
    if (ee) {
      var t = e.unstable_now();
      te = t;
      var i = true;
      try {
        a: {
          m = false;
          if (h) {
            h = false;
            v(S);
            S = -1;
          }
          p = true;
          var a = f;
          try {
            b: {
              b(t);
              d = n(c);
              while (d !== null && (!(d.expirationTime > t) || !ne())) {
                var o = d.callback;
                if (typeof o == `function`) {
                  d.callback = null;
                  f = d.priorityLevel;
                  var s = o(d.expirationTime <= t);
                  t = e.unstable_now();
                  if (typeof s == `function`) {
                    d.callback = s;
                    b(t);
                    i = true;
                    break b;
                  }
                  if (d === n(c)) {
                    r(c);
                  }
                  b(t);
                } else {
                  r(c);
                }
                d = n(c);
              }
              if (d !== null) {
                i = true;
              } else {
                var u = n(l);
                if (u !== null) {
                  oe(x, u.startTime - t);
                }
                i = false;
              }
            }
            break a;
          } finally {
            d = null;
            f = a;
            p = false;
          }
          i = undefined;
        }
      } finally {
        if (i) {
          w();
        } else {
          ee = false;
        }
      }
    }
  }
  var w;
  if (typeof y == `function`) {
    w = function () {
      y(re);
    };
  } else if (typeof MessageChannel < `u`) {
    var ie = new MessageChannel();
    var ae = ie.port2;
    ie.port1.onmessage = re;
    w = function () {
      ae.postMessage(null);
    };
  } else {
    w = function () {
      _(re, 0);
    };
  }
  function oe(t, n) {
    S = _(function () {
      t(e.unstable_now());
    }, n);
  }
  e.unstable_IdlePriority = 5;
  e.unstable_ImmediatePriority = 1;
  e.unstable_LowPriority = 4;
  e.unstable_NormalPriority = 3;
  e.unstable_Profiling = null;
  e.unstable_UserBlockingPriority = 2;
  e.unstable_cancelCallback = function (e) {
    e.callback = null;
  };
  e.unstable_forceFrameRate = function (e) {
    if (e < 0 || e > 125) {
      console.error(
        `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
      );
    } else {
      C = e > 0 ? Math.floor(1000 / e) : 5;
    }
  };
  e.unstable_getCurrentPriorityLevel = function () {
    return f;
  };
  e.unstable_next = function (e) {
    switch (f) {
      case 1:
      case 2:
      case 3:
        var t = 3;
        break;
      default:
        t = f;
    }
    var n = f;
    f = t;
    try {
      return e();
    } finally {
      f = n;
    }
  };
  e.unstable_requestPaint = function () {
    g = true;
  };
  e.unstable_runWithPriority = function (e, t) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var n = f;
    f = e;
    try {
      return t();
    } finally {
      f = n;
    }
  };
  e.unstable_scheduleCallback = function (r, i, a) {
    var o = e.unstable_now();
    if (typeof a == `object` && a) {
      a = a.delay;
      a = typeof a == `number` && a > 0 ? o + a : o;
    } else {
      a = o;
    }
    switch (r) {
      case 1:
        var s = -1;
        break;
      case 2:
        s = 250;
        break;
      case 5:
        s = 1073741823;
        break;
      case 4:
        s = 10000;
        break;
      default:
        s = 5000;
    }
    s = a + s;
    r = {
      id: u++,
      callback: i,
      priorityLevel: r,
      startTime: a,
      expirationTime: s,
      sortIndex: -1,
    };
    if (a > o) {
      r.sortIndex = a;
      t(l, r);
      if (n(c) === null && r === n(l)) {
        if (h) {
          v(S);
          S = -1;
        } else {
          h = true;
        }
        oe(x, a - o);
      }
    } else {
      r.sortIndex = s;
      t(c, r);
      if (!m && !p) {
        m = true;
        if (!ee) {
          ee = true;
          w();
        }
      }
    }
    return r;
  };
  e.unstable_shouldYield = ne;
  e.unstable_wrapCallback = function (e) {
    var t = f;
    return function () {
      var n = f;
      f = t;
      try {
        return e.apply(this, arguments);
      } finally {
        f = n;
      }
    };
  };
});
var f = o((e, t) => {
  t.exports = d();
});
var p = o((e) => {
  var t = u();
  function n(e) {
    var t = `https://react.dev/errors/${e}`;
    if (arguments.length > 1) {
      t += `?args[]=${encodeURIComponent(arguments[1])}`;
      for (var n = 2; n < arguments.length; n++) {
        t += `&args[]=${encodeURIComponent(arguments[n])}`;
      }
    }
    return `Minified React error #${e}; visit ${t} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
  }
  function r() {}
  var i = {
    d: {
      f: r,
      r: function () {
        throw Error(n(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r,
    },
    p: 0,
    findDOMNode: null,
  };
  var a = Symbol.for(`react.portal`);
  function o(e, t, n, r = null) {
    return {
      $$typeof: a,
      key: r == null ? null : `${r}`,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function c(e, t) {
    if (e === `font`) {
      return ``;
    }
    if (typeof t == `string`) {
      if (t === `use-credentials`) {
        return t;
      } else {
        return ``;
      }
    }
  }
  e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i;
  e.createPortal = function (e, t, r = null) {
    if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)) {
      throw Error(n(299));
    }
    return o(e, t, null, r);
  };
  e.flushSync = function (e) {
    var t = s.T;
    var n = i.p;
    try {
      s.T = null;
      i.p = 2;
      if (e) {
        return e();
      }
    } finally {
      s.T = t;
      i.p = n;
      i.d.f();
    }
  };
  e.preconnect = function (e, t) {
    if (typeof e == `string`) {
      if (t) {
        t = t.crossOrigin;
        t = typeof t == `string` ? (t === `use-credentials` ? t : ``) : undefined;
      } else {
        t = null;
      }
      i.d.C(e, t);
    }
  };
  e.prefetchDNS = function (e) {
    if (typeof e == `string`) {
      i.d.D(e);
    }
  };
  e.preinit = function (e, t) {
    if (typeof e == `string` && t && typeof t.as == `string`) {
      var n = t.as;
      var r = c(n, t.crossOrigin);
      var a = typeof t.integrity == `string` ? t.integrity : undefined;
      var o = typeof t.fetchPriority == `string` ? t.fetchPriority : undefined;
      if (n === `style`) {
        i.d.S(e, typeof t.precedence == `string` ? t.precedence : undefined, {
          crossOrigin: r,
          integrity: a,
          fetchPriority: o,
        });
      } else if (n === `script`) {
        i.d.X(e, {
          crossOrigin: r,
          integrity: a,
          fetchPriority: o,
          nonce: typeof t.nonce == `string` ? t.nonce : undefined,
        });
      }
    }
  };
  e.preinitModule = function (e, t) {
    if (typeof e == `string`) {
      if (typeof t == `object` && t) {
        if (t.as == null || t.as === `script`) {
          var n = c(t.as, t.crossOrigin);
          i.d.M(e, {
            crossOrigin: n,
            integrity: typeof t.integrity == `string` ? t.integrity : undefined,
            nonce: typeof t.nonce == `string` ? t.nonce : undefined,
          });
        }
      } else {
        t ?? i.d.M(e);
      }
    }
  };
  e.preload = function (e, t) {
    if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
      var n = t.as;
      var r = c(n, t.crossOrigin);
      i.d.L(e, n, {
        crossOrigin: r,
        integrity: typeof t.integrity == `string` ? t.integrity : undefined,
        nonce: typeof t.nonce == `string` ? t.nonce : undefined,
        type: typeof t.type == `string` ? t.type : undefined,
        fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : undefined,
        referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : undefined,
        imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : undefined,
        imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : undefined,
        media: typeof t.media == `string` ? t.media : undefined,
      });
    }
  };
  e.preloadModule = function (e, t) {
    if (typeof e == `string`) {
      if (t) {
        var n = c(t.as, t.crossOrigin);
        i.d.m(e, {
          as: typeof t.as == `string` && t.as !== `script` ? t.as : undefined,
          crossOrigin: n,
          integrity: typeof t.integrity == `string` ? t.integrity : undefined,
        });
      } else {
        i.d.m(e);
      }
    }
  };
  e.requestFormReset = function (e) {
    i.d.r(e);
  };
  e.unstable_batchedUpdates = function (e, t) {
    return e(t);
  };
  e.useFormState = function (e, t, n) {
    return s.H.useFormState(e, t, n);
  };
  e.useFormStatus = function () {
    return s.H.useHostTransitionStatus();
  };
  e.version = `19.2.5`;
});
var m = o((e, t) => {
  function n() {
    if (
      !(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u`) &&
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == `function`
    ) {
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (e) {
        console.error(e);
      }
    }
  }
  n();
  t.exports = p();
});
var h = o((e) => {
  var t = f();
  var n = u();
  var r = m();
  function i(e) {
    var t = `https://react.dev/errors/${e}`;
    if (arguments.length > 1) {
      t += `?args[]=${encodeURIComponent(arguments[1])}`;
      for (var n = 2; n < arguments.length; n++) {
        t += `&args[]=${encodeURIComponent(arguments[n])}`;
      }
    }
    return `Minified React error #${e}; visit ${t} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
  }
  function a(e) {
    return !!e && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11);
  }
  function o(e) {
    var t = e;
    var n = e;
    if (e.alternate) {
      while (t.return) {
        t = t.return;
      }
    } else {
      e = t;
      do {
        t = e;
        if (t.flags & 4098) {
          n = t.return;
        }
        e = t.return;
      } while (e);
    }
    if (t.tag === 3) {
      return n;
    } else {
      return null;
    }
  }
  function s(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null) {
        e = e.alternate;
        if (e !== null) {
          t = e.memoizedState;
        }
      }
      if (t !== null) {
        return t.dehydrated;
      }
    }
    return null;
  }
  function c(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null) {
        e = e.alternate;
        if (e !== null) {
          t = e.memoizedState;
        }
      }
      if (t !== null) {
        return t.dehydrated;
      }
    }
    return null;
  }
  function l(e) {
    if (o(e) !== e) {
      throw Error(i(188));
    }
  }
  function d(e) {
    var t = e.alternate;
    if (!t) {
      t = o(e);
      if (t === null) {
        throw Error(i(188));
      }
      if (t === e) {
        return e;
      } else {
        return null;
      }
    }
    var n = e;
    var r = t;
    while (true) {
      var a = n.return;
      if (a === null) {
        break;
      }
      var s = a.alternate;
      if (s === null) {
        r = a.return;
        if (r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (a.child === s.child) {
        for (s = a.child; s; ) {
          if (s === n) {
            l(a);
            return e;
          }
          if (s === r) {
            l(a);
            return t;
          }
          s = s.sibling;
        }
        throw Error(i(188));
      }
      if (n.return !== r.return) {
        n = a;
        r = s;
      } else {
        var c = false;
        for (var u = a.child; u; ) {
          if (u === n) {
            c = true;
            n = a;
            r = s;
            break;
          }
          if (u === r) {
            c = true;
            r = a;
            n = s;
            break;
          }
          u = u.sibling;
        }
        if (!c) {
          for (u = s.child; u; ) {
            if (u === n) {
              c = true;
              n = s;
              r = a;
              break;
            }
            if (u === r) {
              c = true;
              r = s;
              n = a;
              break;
            }
            u = u.sibling;
          }
          if (!c) {
            throw Error(i(189));
          }
        }
      }
      if (n.alternate !== r) {
        throw Error(i(190));
      }
    }
    if (n.tag !== 3) {
      throw Error(i(188));
    }
    if (n.stateNode.current === n) {
      return e;
    } else {
      return t;
    }
  }
  function p(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) {
      return e;
    }
    for (e = e.child; e !== null; ) {
      t = p(e);
      if (t !== null) {
        return t;
      }
      e = e.sibling;
    }
    return null;
  }
  var h = Object.assign;
  var g = Symbol.for(`react.element`);
  var _ = Symbol.for(`react.transitional.element`);
  var v = Symbol.for(`react.portal`);
  var y = Symbol.for(`react.fragment`);
  var b = Symbol.for(`react.strict_mode`);
  var x = Symbol.for(`react.profiler`);
  var ee = Symbol.for(`react.consumer`);
  var S = Symbol.for(`react.context`);
  var C = Symbol.for(`react.forward_ref`);
  var te = Symbol.for(`react.suspense`);
  var ne = Symbol.for(`react.suspense_list`);
  var re = Symbol.for(`react.memo`);
  var w = Symbol.for(`react.lazy`);
  var ie = Symbol.for(`react.activity`);
  var ae = Symbol.for(`react.memo_cache_sentinel`);
  var oe = Symbol.iterator;
  function se(e) {
    if (typeof e != `object` || !e) {
      return null;
    } else {
      e = (oe && e[oe]) || e[`@@iterator`];
      if (typeof e == `function`) {
        return e;
      } else {
        return null;
      }
    }
  }
  var ce = Symbol.for(`react.client.reference`);
  function le(e) {
    if (e == null) {
      return null;
    }
    if (typeof e == `function`) {
      if (e.$$typeof === ce) {
        return null;
      } else {
        return e.displayName || e.name || null;
      }
    }
    if (typeof e == `string`) {
      return e;
    }
    switch (e) {
      case y:
        return `Fragment`;
      case x:
        return `Profiler`;
      case b:
        return `StrictMode`;
      case te:
        return `Suspense`;
      case ne:
        return `SuspenseList`;
      case ie:
        return `Activity`;
    }
    if (typeof e == `object`) {
      switch (e.$$typeof) {
        case v:
          return `Portal`;
        case S:
          return e.displayName || `Context`;
        case ee:
          return `${e._context.displayName || `Context`}.Consumer`;
        case C:
          var t = e.render;
          e = e.displayName;
          e ||= ((e = t.displayName || t.name || ``), e === `` ? `ForwardRef` : `ForwardRef(${e})`);
          return e;
        case re:
          t = e.displayName || null;
          if (t === null) {
            return le(e.type) || `Memo`;
          } else {
            return t;
          }
        case w:
          t = e._payload;
          e = e._init;
          try {
            return le(e(t));
          } catch {}
      }
    }
    return null;
  }
  var ue = Array.isArray;
  var T = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var E = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var de = {
    pending: false,
    data: null,
    method: null,
    action: null,
  };
  var fe = [];
  var pe = -1;
  function me(e) {
    return {
      current: e,
    };
  }
  function D(e) {
    if (!(pe < 0)) {
      e.current = fe[pe];
      fe[pe] = null;
      pe--;
    }
  }
  function O(e, t) {
    pe++;
    fe[pe] = e.current;
    e.current = t;
  }
  var he = me(null);
  var ge = me(null);
  var _e = me(null);
  var ve = me(null);
  function ye(e, t) {
    O(_e, t);
    O(ge, e);
    O(he, null);
    switch (t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
        break;
      default:
        e = t.tagName;
        if ((t = t.namespaceURI)) {
          t = Vd(t);
          e = Hd(t, e);
        } else {
          switch (e) {
            case `svg`:
              e = 1;
              break;
            case `math`:
              e = 2;
              break;
            default:
              e = 0;
          }
        }
    }
    D(he);
    O(he, e);
  }
  function be() {
    D(he);
    D(ge);
    D(_e);
  }
  function xe(e) {
    if (e.memoizedState !== null) {
      O(ve, e);
    }
    var t = he.current;
    var n = Hd(t, e.type);
    if (t !== n) {
      O(ge, e);
      O(he, n);
    }
  }
  function Se(e) {
    if (ge.current === e) {
      D(he);
      D(ge);
    }
    if (ve.current === e) {
      D(ve);
      Qf._currentValue = de;
    }
  }
  var Ce;
  var we;
  function Te(e) {
    if (Ce === undefined) {
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        Ce = (t && t[1]) || ``;
        we =
          e.stack.indexOf(`
    at`) > -1
            ? ` (<anonymous>)`
            : e.stack.indexOf(`@`) > -1
              ? `@unknown:0:0`
              : ``;
      }
    }
    return `
${Ce}${e}${we}`;
  }
  var Ee = false;
  function De(e, t) {
    if (!e || Ee) {
      return ``;
    }
    Ee = true;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = undefined;
    try {
      var r = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              function n() {
                throw Error();
              }
              Object.defineProperty(n.prototype, `props`, {
                set: function () {
                  throw Error();
                },
              });
              if (typeof Reflect == `object` && Reflect.construct) {
                try {
                  Reflect.construct(n, []);
                } catch (e) {
                  var r = e;
                }
                Reflect.construct(e, [], n);
              } else {
                try {
                  n.call();
                } catch (e) {
                  r = e;
                }
                e.call(n.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (e) {
                r = e;
              }
              if ((n = e()) && typeof n.catch == `function`) {
                n.catch(function () {});
              }
            }
          } catch (e) {
            if (e && r && typeof e.stack == `string`) {
              return [e.stack, r.stack];
            }
          }
          return [null, null];
        },
      };
      r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
      var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, `name`);
      if (i && i.configurable) {
        Object.defineProperty(r.DetermineComponentFrameRoot, `name`, {
          value: `DetermineComponentFrameRoot`,
        });
      }
      var a = r.DetermineComponentFrameRoot();
      var o = a[0];
      var s = a[1];
      if (o && s) {
        var c = o.split(`
`);
        var l = s.split(`
`);
        for (i = r = 0; r < c.length && !c[r].includes(`DetermineComponentFrameRoot`); ) {
          r++;
        }
        while (i < l.length && !l[i].includes(`DetermineComponentFrameRoot`)) {
          i++;
        }
        if (r === c.length || i === l.length) {
          r = c.length - 1;
          i = l.length - 1;
          while (r >= 1 && i >= 0 && c[r] !== l[i]) {
            i--;
          }
        }
        for (; r >= 1 && i >= 0; r--, i--) {
          if (c[r] !== l[i]) {
            if (r !== 1 || i !== 1) {
              do {
                r--;
                i--;
                if (i < 0 || c[r] !== l[i]) {
                  var u = `
${c[r].replace(` at new `, ` at `)}`;
                  if (e.displayName && u.includes(`<anonymous>`)) {
                    u = u.replace(`<anonymous>`, e.displayName);
                  }
                  return u;
                }
              } while (r >= 1 && i >= 0);
            }
            break;
          }
        }
      }
    } finally {
      Ee = false;
      Error.prepareStackTrace = n;
    }
    if ((n = e ? e.displayName || e.name : ``)) {
      return Te(n);
    } else {
      return ``;
    }
  }
  function Oe(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Te(e.type);
      case 16:
        return Te(`Lazy`);
      case 13:
        if (e.child !== t && t !== null) {
          return Te(`Suspense Fallback`);
        } else {
          return Te(`Suspense`);
        }
      case 19:
        return Te(`SuspenseList`);
      case 0:
      case 15:
        return De(e.type, false);
      case 11:
        return De(e.type.render, false);
      case 1:
        return De(e.type, true);
      case 31:
        return Te(`Activity`);
      default:
        return ``;
    }
  }
  function ke(e) {
    try {
      var t = ``;
      var n = null;
      do {
        t += Oe(e, n);
        n = e;
        e = e.return;
      } while (e);
      return t;
    } catch (e) {
      return `
Error generating stack: ${e.message}
${e.stack}`;
    }
  }
  var Ae = Object.prototype.hasOwnProperty;
  var je = t.unstable_scheduleCallback;
  var Me = t.unstable_cancelCallback;
  var Ne = t.unstable_shouldYield;
  var Pe = t.unstable_requestPaint;
  var Fe = t.unstable_now;
  var Ie = t.unstable_getCurrentPriorityLevel;
  var Le = t.unstable_ImmediatePriority;
  var Re = t.unstable_UserBlockingPriority;
  var ze = t.unstable_NormalPriority;
  var Be = t.unstable_LowPriority;
  var Ve = t.unstable_IdlePriority;
  var He = t.log;
  var Ue = t.unstable_setDisableYieldValue;
  var We = null;
  var Ge = null;
  function Ke(e) {
    if (typeof He == `function`) {
      Ue(e);
    }
    if (Ge && typeof Ge.setStrictMode == `function`) {
      try {
        Ge.setStrictMode(We, e);
      } catch {}
    }
  }
  var qe = Math.clz32 ? Math.clz32 : Xe;
  var Je = Math.log;
  var Ye = Math.LN2;
  function Xe(e) {
    e >>>= 0;
    if (e === 0) {
      return 32;
    } else {
      return (31 - ((Je(e) / Ye) | 0)) | 0;
    }
  }
  var Ze = 256;
  var Qe = 262144;
  var $e = 4194304;
  function et(e) {
    var t = e & 42;
    if (t !== 0) {
      return t;
    }
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function tt(e, t, n) {
    var r = e.pendingLanes;
    if (r === 0) {
      return 0;
    }
    var i = 0;
    var a = e.suspendedLanes;
    var o = e.pingedLanes;
    e = e.warmLanes;
    var s = r & 134217727;
    if (s === 0) {
      s = r & ~a;
      if (s === 0) {
        if (o === 0) {
          if (!n) {
            n = r & ~e;
            if (n !== 0) {
              i = et(n);
            }
          }
        } else {
          i = et(o);
        }
      } else {
        i = et(s);
      }
    } else {
      r = s & ~a;
      if (r === 0) {
        o &= s;
        if (o === 0) {
          if (!n) {
            n = s & ~e;
            if (n !== 0) {
              i = et(n);
            }
          }
        } else {
          i = et(o);
        }
      } else {
        i = et(r);
      }
    }
    if (i === 0) {
      return 0;
    } else if (
      t !== 0 &&
      t !== i &&
      (t & a) === 0 &&
      ((a = i & -i), (n = t & -t), a >= n || (a === 32 && n & 4194048))
    ) {
      return t;
    } else {
      return i;
    }
  }
  function nt(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function rt(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5000;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function it() {
    var e = $e;
    $e <<= 1;
    if (!($e & 62914560)) {
      $e = 4194304;
    }
    return e;
  }
  function at(e) {
    var t = [];
    for (var n = 0; n < 31; n++) {
      t.push(e);
    }
    return t;
  }
  function ot(e, t) {
    e.pendingLanes |= t;
    if (t !== 268435456) {
      e.suspendedLanes = 0;
      e.pingedLanes = 0;
      e.warmLanes = 0;
    }
  }
  function st(e, t, n, r, i, a) {
    var o = e.pendingLanes;
    e.pendingLanes = n;
    e.suspendedLanes = 0;
    e.pingedLanes = 0;
    e.warmLanes = 0;
    e.expiredLanes &= n;
    e.entangledLanes &= n;
    e.errorRecoveryDisabledLanes &= n;
    e.shellSuspendCounter = 0;
    var s = e.entanglements;
    var c = e.expirationTimes;
    var l = e.hiddenUpdates;
    for (n = o & ~n; n > 0; ) {
      var u = 31 - qe(n);
      var d = 1 << u;
      s[u] = 0;
      c[u] = -1;
      var f = l[u];
      if (f !== null) {
        l[u] = null;
        u = 0;
        for (; u < f.length; u++) {
          var p = f[u];
          if (p !== null) {
            p.lane &= -536870913;
          }
        }
      }
      n &= ~d;
    }
    if (r !== 0) {
      ct(e, r, 0);
    }
    if (a !== 0 && i === 0 && e.tag !== 0) {
      e.suspendedLanes |= a & ~(o & ~t);
    }
  }
  function ct(e, t, n) {
    e.pendingLanes |= t;
    e.suspendedLanes &= ~t;
    var r = 31 - qe(t);
    e.entangledLanes |= t;
    e.entanglements[r] = e.entanglements[r] | 1073741824 | (n & 261930);
  }
  function lt(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - qe(n);
      var i = 1 << r;
      if ((i & t) | (e[r] & t)) {
        e[r] |= t;
      }
      n &= ~i;
    }
  }
  function ut(e, t) {
    var n = t & -t;
    n = n & 42 ? 1 : dt(n);
    if ((n & (e.suspendedLanes | t)) === 0) {
      return n;
    } else {
      return 0;
    }
  }
  function dt(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function ft(e) {
    e &= -e;
    if (e > 2) {
      if (e > 8) {
        if (e & 134217727) {
          return 32;
        } else {
          return 268435456;
        }
      } else {
        return 8;
      }
    } else {
      return 2;
    }
  }
  function pt() {
    var e = E.p;
    if (e === 0) {
      e = window.event;
      if (e === undefined) {
        return 32;
      } else {
        return mp(e.type);
      }
    } else {
      return e;
    }
  }
  function mt(e, t) {
    var n = E.p;
    try {
      E.p = e;
      return t();
    } finally {
      E.p = n;
    }
  }
  var ht = Math.random().toString(36).slice(2);
  var gt = `__reactFiber$${ht}`;
  var _t = `__reactProps$${ht}`;
  var vt = `__reactContainer$${ht}`;
  var yt = `__reactEvents$${ht}`;
  var bt = `__reactListeners$${ht}`;
  var xt = `__reactHandles$${ht}`;
  var St = `__reactResources$${ht}`;
  var Ct = `__reactMarker$${ht}`;
  function wt(e) {
    delete e[gt];
    delete e[_t];
    delete e[yt];
    delete e[bt];
    delete e[xt];
  }
  function Tt(e) {
    var t = e[gt];
    if (t) {
      return t;
    }
    for (var n = e.parentNode; n; ) {
      if ((t = n[vt] || n[gt])) {
        n = t.alternate;
        if (t.child !== null || (n !== null && n.child !== null)) {
          for (e = df(e); e !== null; ) {
            if ((n = e[gt])) {
              return n;
            }
            e = df(e);
          }
        }
        return t;
      }
      e = n;
      n = e.parentNode;
    }
    return null;
  }
  function Et(e) {
    if ((e = e[gt] || e[vt])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) {
        return e;
      }
    }
    return null;
  }
  function Dt(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) {
      return e.stateNode;
    }
    throw Error(i(33));
  }
  function Ot(e) {
    var t = e[St];
    t ||= e[St] = {
      hoistableStyles: new Map(),
      hoistableScripts: new Map(),
    };
    return t;
  }
  function k(e) {
    e[Ct] = true;
  }
  var kt = new Set();
  var At = {};
  function jt(e, t) {
    Mt(e, t);
    Mt(`${e}Capture`, t);
  }
  function Mt(e, t) {
    At[e] = t;
    e = 0;
    for (; e < t.length; e++) {
      kt.add(t[e]);
    }
  }
  var Nt = RegExp(
    `^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`,
  );
  var Pt = {};
  var Ft = {};
  function It(e) {
    if (Ae.call(Ft, e)) {
      return true;
    } else if (Ae.call(Pt, e)) {
      return false;
    } else if (Nt.test(e)) {
      return (Ft[e] = true);
    } else {
      Pt[e] = true;
      return false;
    }
  }
  function Lt(e, t, n) {
    if (It(t)) {
      if (n === null) {
        e.removeAttribute(t);
      } else {
        switch (typeof n) {
          case `undefined`:
          case `function`:
          case `symbol`:
            e.removeAttribute(t);
            return;
          case `boolean`:
            var r = t.toLowerCase().slice(0, 5);
            if (r !== `data-` && r !== `aria-`) {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, `${n}`);
      }
    }
  }
  function Rt(e, t, n) {
    if (n === null) {
      e.removeAttribute(t);
    } else {
      switch (typeof n) {
        case `undefined`:
        case `function`:
        case `symbol`:
        case `boolean`:
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, `${n}`);
    }
  }
  function zt(e, t, n, r) {
    if (r === null) {
      e.removeAttribute(n);
    } else {
      switch (typeof r) {
        case `undefined`:
        case `function`:
        case `symbol`:
        case `boolean`:
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, `${r}`);
    }
  }
  function Bt(e) {
    switch (typeof e) {
      case `bigint`:
      case `boolean`:
      case `number`:
      case `string`:
      case `undefined`:
        return e;
      case `object`:
        return e;
      default:
        return ``;
    }
  }
  function Vt(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === `input` && (t === `checkbox` || t === `radio`);
  }
  function Ht(e, t, n) {
    var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (!e.hasOwnProperty(t) && r !== undefined && typeof r.get == `function` && typeof r.set == `function`) {
      var i = r.get;
      var a = r.set;
      Object.defineProperty(e, t, {
        configurable: true,
        get: function () {
          return i.call(this);
        },
        set: function (e) {
          n = `${e}`;
          a.call(this, e);
        },
      });
      Object.defineProperty(e, t, {
        enumerable: r.enumerable,
      });
      return {
        getValue: function () {
          return n;
        },
        setValue: function (e) {
          n = `${e}`;
        },
        stopTracking: function () {
          e._valueTracker = null;
          delete e[t];
        },
      };
    }
  }
  function Ut(e) {
    if (!e._valueTracker) {
      var t = Vt(e) ? `checked` : `value`;
      e._valueTracker = Ht(e, t, `${e[t]}`);
    }
  }
  function Wt(e) {
    if (!e) {
      return false;
    }
    var t = e._valueTracker;
    if (!t) {
      return true;
    }
    var n = t.getValue();
    var r = ``;
    if (e) {
      r = Vt(e) ? (e.checked ? `true` : `false`) : e.value;
    }
    e = r;
    if (e === n) {
      return false;
    } else {
      t.setValue(e);
      return true;
    }
  }
  function Gt(e) {
    e ||= typeof document < `u` ? document : undefined;
    if (e === undefined) {
      return null;
    }
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Kt = /[\n"\\]/g;
  function qt(e) {
    return e.replace(Kt, function (e) {
      return `\\${e.charCodeAt(0).toString(16)} `;
    });
  }
  function Jt(e, t, n, r, i, a, o, s) {
    e.name = ``;
    if (o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean`) {
      e.type = o;
    } else {
      e.removeAttribute(`type`);
    }
    if (t == null) {
      if (o === `submit` || o === `reset`) {
        e.removeAttribute(`value`);
      }
    } else if (o === `number`) {
      if ((t === 0 && e.value === ``) || e.value != t) {
        e.value = `${Bt(t)}`;
      }
    } else if (e.value !== `${Bt(t)}`) {
      e.value = `${Bt(t)}`;
    }
    if (t == null) {
      if (n == null) {
        if (r != null) {
          e.removeAttribute(`value`);
        }
      } else {
        Xt(e, o, Bt(n));
      }
    } else {
      Xt(e, o, Bt(t));
    }
    if (i == null && a != null) {
      e.defaultChecked = !!a;
    }
    if (i != null) {
      e.checked = i && typeof i != `function` && typeof i != `symbol`;
    }
    if (s != null && typeof s != `function` && typeof s != `symbol` && typeof s != `boolean`) {
      e.name = `${Bt(s)}`;
    } else {
      e.removeAttribute(`name`);
    }
  }
  function Yt(e, t, n, r, i, a, o, s) {
    if (a != null && typeof a != `function` && typeof a != `symbol` && typeof a != `boolean`) {
      e.type = a;
    }
    if (t != null || n != null) {
      if ((a === `submit` || a === `reset`) && t == null) {
        Ut(e);
        return;
      }
      n = n == null ? `` : `${Bt(n)}`;
      t = t == null ? n : `${Bt(t)}`;
      if (!s && t !== e.value) {
        e.value = t;
      }
      e.defaultValue = t;
    }
    r ??= i;
    r = typeof r != `function` && typeof r != `symbol` && !!r;
    e.checked = s ? e.checked : !!r;
    e.defaultChecked = !!r;
    if (o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean`) {
      e.name = o;
    }
    Ut(e);
  }
  function Xt(e, t, n) {
    if ((t !== `number` || Gt(e.ownerDocument) !== e) && e.defaultValue !== `${n}`) {
      e.defaultValue = `${n}`;
    }
  }
  function Zt(e, t, n, r) {
    e = e.options;
    if (t) {
      t = {};
      for (var i = 0; i < n.length; i++) {
        t[`$${n[i]}`] = true;
      }
      for (n = 0; n < e.length; n++) {
        i = t.hasOwnProperty(`$${e[n].value}`);
        if (e[n].selected !== i) {
          e[n].selected = i;
        }
        if (i && r) {
          e[n].defaultSelected = true;
        }
      }
    } else {
      n = `${Bt(n)}`;
      t = null;
      i = 0;
      for (; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = true;
          if (r) {
            e[i].defaultSelected = true;
          }
          return;
        }
        if (t === null && !e[i].disabled) {
          t = e[i];
        }
      }
      if (t !== null) {
        t.selected = true;
      }
    }
  }
  function Qt(e, t, n) {
    if (t != null && ((t = `${Bt(t)}`), t !== e.value && (e.value = t), n == null)) {
      if (e.defaultValue !== t) {
        e.defaultValue = t;
      }
      return;
    }
    e.defaultValue = n == null ? `` : `${Bt(n)}`;
  }
  function $t(e, t, n, r) {
    if (t == null) {
      if (r != null) {
        if (n != null) {
          throw Error(i(92));
        }
        if (ue(r)) {
          if (r.length > 1) {
            throw Error(i(93));
          }
          r = r[0];
        }
        n = r;
      }
      n ??= ``;
      t = n;
    }
    n = Bt(t);
    e.defaultValue = n;
    r = e.textContent;
    if (r === n && r !== `` && r !== null) {
      e.value = r;
    }
    Ut(e);
  }
  function en(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var tn = new Set(
    `animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(
      ` `,
    ),
  );
  function nn(e, t, n) {
    var r = t.indexOf(`--`) === 0;
    if (n == null || typeof n == `boolean` || n === ``) {
      if (r) {
        e.setProperty(t, ``);
      } else if (t === `float`) {
        e.cssFloat = ``;
      } else {
        e[t] = ``;
      }
    } else if (r) {
      e.setProperty(t, n);
    } else if (typeof n != `number` || n === 0 || tn.has(t)) {
      if (t === `float`) {
        e.cssFloat = n;
      } else {
        e[t] = `${n}`.trim();
      }
    } else {
      e[t] = `${n}px`;
    }
  }
  function rn(e, t, n) {
    if (t != null && typeof t != `object`) {
      throw Error(i(62));
    }
    e = e.style;
    if (n != null) {
      for (var r in n) {
        if (!!n.hasOwnProperty(r) && (t == null || !t.hasOwnProperty(r))) {
          if (r.indexOf(`--`) === 0) {
            e.setProperty(r, ``);
          } else if (r === `float`) {
            e.cssFloat = ``;
          } else {
            e[r] = ``;
          }
        }
      }
      for (var a in t) {
        r = t[a];
        if (t.hasOwnProperty(a) && n[a] !== r) {
          nn(e, a, r);
        }
      }
    } else {
      for (var o in t) {
        if (t.hasOwnProperty(o)) {
          nn(e, o, t[o]);
        }
      }
    }
  }
  function an(e) {
    if (e.indexOf(`-`) === -1) {
      return false;
    }
    switch (e) {
      case `annotation-xml`:
      case `color-profile`:
      case `font-face`:
      case `font-face-src`:
      case `font-face-uri`:
      case `font-face-format`:
      case `font-face-name`:
      case `missing-glyph`:
        return false;
      default:
        return true;
    }
  }
  var on = new Map([
    [`acceptCharset`, `accept-charset`],
    [`htmlFor`, `for`],
    [`httpEquiv`, `http-equiv`],
    [`crossOrigin`, `crossorigin`],
    [`accentHeight`, `accent-height`],
    [`alignmentBaseline`, `alignment-baseline`],
    [`arabicForm`, `arabic-form`],
    [`baselineShift`, `baseline-shift`],
    [`capHeight`, `cap-height`],
    [`clipPath`, `clip-path`],
    [`clipRule`, `clip-rule`],
    [`colorInterpolation`, `color-interpolation`],
    [`colorInterpolationFilters`, `color-interpolation-filters`],
    [`colorProfile`, `color-profile`],
    [`colorRendering`, `color-rendering`],
    [`dominantBaseline`, `dominant-baseline`],
    [`enableBackground`, `enable-background`],
    [`fillOpacity`, `fill-opacity`],
    [`fillRule`, `fill-rule`],
    [`floodColor`, `flood-color`],
    [`floodOpacity`, `flood-opacity`],
    [`fontFamily`, `font-family`],
    [`fontSize`, `font-size`],
    [`fontSizeAdjust`, `font-size-adjust`],
    [`fontStretch`, `font-stretch`],
    [`fontStyle`, `font-style`],
    [`fontVariant`, `font-variant`],
    [`fontWeight`, `font-weight`],
    [`glyphName`, `glyph-name`],
    [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
    [`glyphOrientationVertical`, `glyph-orientation-vertical`],
    [`horizAdvX`, `horiz-adv-x`],
    [`horizOriginX`, `horiz-origin-x`],
    [`imageRendering`, `image-rendering`],
    [`letterSpacing`, `letter-spacing`],
    [`lightingColor`, `lighting-color`],
    [`markerEnd`, `marker-end`],
    [`markerMid`, `marker-mid`],
    [`markerStart`, `marker-start`],
    [`overlinePosition`, `overline-position`],
    [`overlineThickness`, `overline-thickness`],
    [`paintOrder`, `paint-order`],
    [`panose-1`, `panose-1`],
    [`pointerEvents`, `pointer-events`],
    [`renderingIntent`, `rendering-intent`],
    [`shapeRendering`, `shape-rendering`],
    [`stopColor`, `stop-color`],
    [`stopOpacity`, `stop-opacity`],
    [`strikethroughPosition`, `strikethrough-position`],
    [`strikethroughThickness`, `strikethrough-thickness`],
    [`strokeDasharray`, `stroke-dasharray`],
    [`strokeDashoffset`, `stroke-dashoffset`],
    [`strokeLinecap`, `stroke-linecap`],
    [`strokeLinejoin`, `stroke-linejoin`],
    [`strokeMiterlimit`, `stroke-miterlimit`],
    [`strokeOpacity`, `stroke-opacity`],
    [`strokeWidth`, `stroke-width`],
    [`textAnchor`, `text-anchor`],
    [`textDecoration`, `text-decoration`],
    [`textRendering`, `text-rendering`],
    [`transformOrigin`, `transform-origin`],
    [`underlinePosition`, `underline-position`],
    [`underlineThickness`, `underline-thickness`],
    [`unicodeBidi`, `unicode-bidi`],
    [`unicodeRange`, `unicode-range`],
    [`unitsPerEm`, `units-per-em`],
    [`vAlphabetic`, `v-alphabetic`],
    [`vHanging`, `v-hanging`],
    [`vIdeographic`, `v-ideographic`],
    [`vMathematical`, `v-mathematical`],
    [`vectorEffect`, `vector-effect`],
    [`vertAdvY`, `vert-adv-y`],
    [`vertOriginX`, `vert-origin-x`],
    [`vertOriginY`, `vert-origin-y`],
    [`wordSpacing`, `word-spacing`],
    [`writingMode`, `writing-mode`],
    [`xmlnsXlink`, `xmlns:xlink`],
    [`xHeight`, `x-height`],
  ]);
  var sn =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function cn(e) {
    if (sn.test(`${e}`)) {
      return `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`;
    } else {
      return e;
    }
  }
  function ln() {}
  var un = null;
  function dn(e) {
    e = e.target || e.srcElement || window;
    if (e.correspondingUseElement) {
      e = e.correspondingUseElement;
    }
    if (e.nodeType === 3) {
      return e.parentNode;
    } else {
      return e;
    }
  }
  var fn = null;
  var pn = null;
  function mn(e) {
    var t = Et(e);
    if (t && (e = t.stateNode)) {
      var n = e[_t] || null;
      e = t.stateNode;
      a: switch (t.type) {
        case `input`:
          Jt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
          t = n.name;
          if (n.type === `radio` && t != null) {
            for (n = e; n.parentNode; ) {
              n = n.parentNode;
            }
            n = n.querySelectorAll(`input[name="${qt(`${t}`)}"][type="radio"]`);
            t = 0;
            for (; t < n.length; t++) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var a = r[_t] || null;
                if (!a) {
                  throw Error(i(90));
                }
                Jt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
              }
            }
            for (t = 0; t < n.length; t++) {
              r = n[t];
              if (r.form === e.form) {
                Wt(r);
              }
            }
          }
          break a;
        case `textarea`:
          Qt(e, n.value, n.defaultValue);
          break a;
        case `select`:
          t = n.value;
          if (t != null) {
            Zt(e, !!n.multiple, t, false);
          }
      }
    }
  }
  var hn = false;
  function gn(e, t, n) {
    if (hn) {
      return e(t, n);
    }
    hn = true;
    try {
      return e(t);
    } finally {
      hn = false;
      if ((fn !== null || pn !== null) && (bu(), fn && ((t = fn), (e = pn), (pn = fn = null), mn(t), e))) {
        for (t = 0; t < e.length; t++) {
          mn(e[t]);
        }
      }
    }
  }
  function _n(e, t) {
    var n = e.stateNode;
    if (n === null) {
      return null;
    }
    var r = n[_t] || null;
    if (r === null) {
      return null;
    }
    n = r[t];
    a: switch (t) {
      case `onClick`:
      case `onClickCapture`:
      case `onDoubleClick`:
      case `onDoubleClickCapture`:
      case `onMouseDown`:
      case `onMouseDownCapture`:
      case `onMouseMove`:
      case `onMouseMoveCapture`:
      case `onMouseUp`:
      case `onMouseUpCapture`:
      case `onMouseEnter`:
        if (!(r = !r.disabled)) {
          e = e.type;
          r = e !== `button` && e !== `input` && e !== `select` && e !== `textarea`;
        }
        e = !r;
        break a;
      default:
        e = false;
    }
    if (e) {
      return null;
    }
    if (n && typeof n != `function`) {
      throw Error(i(231, t, typeof n));
    }
    return n;
  }
  var vn =
    !(typeof window > `u`) && window.document !== undefined && window.document.createElement !== undefined;
  var yn = false;
  if (vn) {
    try {
      var bn = {};
      Object.defineProperty(bn, `passive`, {
        get: function () {
          yn = true;
        },
      });
      window.addEventListener(`test`, bn, bn);
      window.removeEventListener(`test`, bn, bn);
    } catch {
      yn = false;
    }
  }
  var xn = null;
  var Sn = null;
  var Cn = null;
  function wn() {
    if (Cn) {
      return Cn;
    }
    var e;
    var t = Sn;
    var n = t.length;
    var r;
    var i = `value` in xn ? xn.value : xn.textContent;
    var a = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
    return (Cn = i.slice(e, r > 1 ? 1 - r : undefined));
  }
  function Tn(e) {
    var t = e.keyCode;
    if (`charCode` in e) {
      e = e.charCode;
      if (e === 0 && t === 13) {
        e = 13;
      }
    } else {
      e = t;
    }
    if (e === 10) {
      e = 13;
    }
    if (e >= 32 || e === 13) {
      return e;
    } else {
      return 0;
    }
  }
  function En() {
    return true;
  }
  function Dn() {
    return false;
  }
  function On(e) {
    function t(t, n, r, i, a) {
      this._reactName = t;
      this._targetInst = r;
      this.type = n;
      this.nativeEvent = i;
      this.target = a;
      this.currentTarget = null;
      for (var o in e) {
        if (e.hasOwnProperty(o)) {
          t = e[o];
          this[o] = t ? t(i) : i[o];
        }
      }
      this.isDefaultPrevented = (i.defaultPrevented == null ? i.returnValue === false : i.defaultPrevented)
        ? En
        : Dn;
      this.isPropagationStopped = Dn;
      return this;
    }
    h(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var e = this.nativeEvent;
        if (e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else if (typeof e.returnValue != `unknown`) {
            e.returnValue = false;
          }
          this.isDefaultPrevented = En;
        }
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        if (e) {
          if (e.stopPropagation) {
            e.stopPropagation();
          } else if (typeof e.cancelBubble != `unknown`) {
            e.cancelBubble = true;
          }
          this.isPropagationStopped = En;
        }
      },
      persist: function () {},
      isPersistent: En,
    });
    return t;
  }
  var kn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  };
  var An = On(kn);
  var jn = h({}, kn, {
    view: 0,
    detail: 0,
  });
  var Mn = On(jn);
  var Nn;
  var Pn;
  var Fn;
  var In = h({}, jn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: qn,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      if (e.relatedTarget === undefined) {
        if (e.fromElement === e.srcElement) {
          return e.toElement;
        } else {
          return e.fromElement;
        }
      } else {
        return e.relatedTarget;
      }
    },
    movementX: function (e) {
      if (`movementX` in e) {
        return e.movementX;
      } else {
        if (e !== Fn) {
          if (Fn && e.type === `mousemove`) {
            Nn = e.screenX - Fn.screenX;
            Pn = e.screenY - Fn.screenY;
          } else {
            Pn = Nn = 0;
          }
          Fn = e;
        }
        return Nn;
      }
    },
    movementY: function (e) {
      if (`movementY` in e) {
        return e.movementY;
      } else {
        return Pn;
      }
    },
  });
  var Ln = On(In);
  var Rn = On(
    h({}, In, {
      dataTransfer: 0,
    }),
  );
  var zn = On(
    h({}, jn, {
      relatedTarget: 0,
    }),
  );
  var Bn = On(
    h({}, kn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0,
    }),
  );
  var Vn = On(
    h({}, kn, {
      clipboardData: function (e) {
        if (`clipboardData` in e) {
          return e.clipboardData;
        } else {
          return window.clipboardData;
        }
      },
    }),
  );
  var Hn = On(
    h({}, kn, {
      data: 0,
    }),
  );
  var Un = {
    Esc: `Escape`,
    Spacebar: ` `,
    Left: `ArrowLeft`,
    Up: `ArrowUp`,
    Right: `ArrowRight`,
    Down: `ArrowDown`,
    Del: `Delete`,
    Win: `OS`,
    Menu: `ContextMenu`,
    Apps: `ContextMenu`,
    Scroll: `ScrollLock`,
    MozPrintableKey: `Unidentified`,
  };
  var Wn = {
    8: `Backspace`,
    9: `Tab`,
    12: `Clear`,
    13: `Enter`,
    16: `Shift`,
    17: `Control`,
    18: `Alt`,
    19: `Pause`,
    20: `CapsLock`,
    27: `Escape`,
    32: ` `,
    33: `PageUp`,
    34: `PageDown`,
    35: `End`,
    36: `Home`,
    37: `ArrowLeft`,
    38: `ArrowUp`,
    39: `ArrowRight`,
    40: `ArrowDown`,
    45: `Insert`,
    46: `Delete`,
    112: `F1`,
    113: `F2`,
    114: `F3`,
    115: `F4`,
    116: `F5`,
    117: `F6`,
    118: `F7`,
    119: `F8`,
    120: `F9`,
    121: `F10`,
    122: `F11`,
    123: `F12`,
    144: `NumLock`,
    145: `ScrollLock`,
    224: `Meta`,
  };
  var Gn = {
    Alt: `altKey`,
    Control: `ctrlKey`,
    Meta: `metaKey`,
    Shift: `shiftKey`,
  };
  function Kn(e) {
    var t = this.nativeEvent;
    if (t.getModifierState) {
      return t.getModifierState(e);
    } else if ((e = Gn[e])) {
      return !!t[e];
    } else {
      return false;
    }
  }
  function qn() {
    return Kn;
  }
  var Jn = On(
    h({}, jn, {
      key: function (e) {
        if (e.key) {
          var t = Un[e.key] || e.key;
          if (t !== `Unidentified`) {
            return t;
          }
        }
        if (e.type === `keypress`) {
          e = Tn(e);
          if (e === 13) {
            return `Enter`;
          } else {
            return String.fromCharCode(e);
          }
        } else if (e.type === `keydown` || e.type === `keyup`) {
          return Wn[e.keyCode] || `Unidentified`;
        } else {
          return ``;
        }
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: qn,
      charCode: function (e) {
        if (e.type === `keypress`) {
          return Tn(e);
        } else {
          return 0;
        }
      },
      keyCode: function (e) {
        if (e.type === `keydown` || e.type === `keyup`) {
          return e.keyCode;
        } else {
          return 0;
        }
      },
      which: function (e) {
        if (e.type === `keypress`) {
          return Tn(e);
        } else if (e.type === `keydown` || e.type === `keyup`) {
          return e.keyCode;
        } else {
          return 0;
        }
      },
    }),
  );
  var Yn = On(
    h({}, In, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
  );
  var Xn = On(
    h({}, jn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: qn,
    }),
  );
  var Zn = On(
    h({}, kn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0,
    }),
  );
  var Qn = On(
    h({}, In, {
      deltaX: function (e) {
        if (`deltaX` in e) {
          return e.deltaX;
        } else if (`wheelDeltaX` in e) {
          return -e.wheelDeltaX;
        } else {
          return 0;
        }
      },
      deltaY: function (e) {
        if (`deltaY` in e) {
          return e.deltaY;
        } else if (`wheelDeltaY` in e) {
          return -e.wheelDeltaY;
        } else if (`wheelDelta` in e) {
          return -e.wheelDelta;
        } else {
          return 0;
        }
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
  );
  var $n = On(
    h({}, kn, {
      newState: 0,
      oldState: 0,
    }),
  );
  var er = [9, 13, 27, 32];
  var tr = vn && `CompositionEvent` in window;
  var nr = null;
  if (vn && `documentMode` in document) {
    nr = document.documentMode;
  }
  var rr = vn && `TextEvent` in window && !nr;
  var ir = vn && (!tr || (nr && nr > 8 && nr <= 11));
  var ar = ` `;
  var or = false;
  function sr(e, t) {
    switch (e) {
      case `keyup`:
        return er.indexOf(t.keyCode) !== -1;
      case `keydown`:
        return t.keyCode !== 229;
      case `keypress`:
      case `mousedown`:
      case `focusout`:
        return true;
      default:
        return false;
    }
  }
  function cr(e) {
    e = e.detail;
    if (typeof e == `object` && `data` in e) {
      return e.data;
    } else {
      return null;
    }
  }
  var lr = false;
  function ur(e, t) {
    switch (e) {
      case `compositionend`:
        return cr(t);
      case `keypress`:
        if (t.which === 32) {
          or = true;
          return ar;
        } else {
          return null;
        }
      case `textInput`:
        e = t.data;
        if (e === ar && or) {
          return null;
        } else {
          return e;
        }
      default:
        return null;
    }
  }
  function dr(e, t) {
    if (lr) {
      if (e === `compositionend` || (!tr && sr(e, t))) {
        e = wn();
        Cn = Sn = xn = null;
        lr = false;
        return e;
      } else {
        return null;
      }
    }
    switch (e) {
      case `paste`:
        return null;
      case `keypress`:
        if ((!t.ctrlKey && !t.altKey && !t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && t.char.length > 1) {
            return t.char;
          }
          if (t.which) {
            return String.fromCharCode(t.which);
          }
        }
        return null;
      case `compositionend`:
        if (ir && t.locale !== `ko`) {
          return null;
        } else {
          return t.data;
        }
      default:
        return null;
    }
  }
  var fr = {
    color: true,
    date: true,
    datetime: true,
    'datetime-local': true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
  };
  function pr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    if (t === `input`) {
      return !!fr[e.type];
    } else {
      return t === `textarea`;
    }
  }
  function mr(e, t, n, r) {
    if (fn) {
      if (pn) {
        pn.push(r);
      } else {
        pn = [r];
      }
    } else {
      fn = r;
    }
    t = Ed(t, `onChange`);
    if (t.length > 0) {
      n = new An(`onChange`, `change`, null, n, r);
      e.push({
        event: n,
        listeners: t,
      });
    }
  }
  var hr = null;
  var gr = null;
  function _r(e) {
    yd(e, 0);
  }
  function vr(e) {
    if (Wt(Dt(e))) {
      return e;
    }
  }
  function yr(e, t) {
    if (e === `change`) {
      return t;
    }
  }
  var br = false;
  if (vn) {
    var xr;
    if (vn) {
      var Sr = `oninput` in document;
      if (!Sr) {
        var Cr = document.createElement(`div`);
        Cr.setAttribute(`oninput`, `return;`);
        Sr = typeof Cr.oninput == `function`;
      }
      xr = Sr;
    } else {
      xr = false;
    }
    br = xr && (!document.documentMode || document.documentMode > 9);
  }
  function wr() {
    if (hr) {
      hr.detachEvent(`onpropertychange`, Tr);
      gr = hr = null;
    }
  }
  function Tr(e) {
    if (e.propertyName === `value` && vr(gr)) {
      var t = [];
      mr(t, gr, e, dn(e));
      gn(_r, t);
    }
  }
  function Er(e, t, n) {
    if (e === `focusin`) {
      wr();
      hr = t;
      gr = n;
      hr.attachEvent(`onpropertychange`, Tr);
    } else if (e === `focusout`) {
      wr();
    }
  }
  function Dr(e) {
    if (e === `selectionchange` || e === `keyup` || e === `keydown`) {
      return vr(gr);
    }
  }
  function Or(e, t) {
    if (e === `click`) {
      return vr(t);
    }
  }
  function kr(e, t) {
    if (e === `input` || e === `change`) {
      return vr(t);
    }
  }
  function Ar(e, t) {
    return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
  }
  var jr = typeof Object.is == `function` ? Object.is : Ar;
  function Mr(e, t) {
    if (jr(e, t)) {
      return true;
    }
    if (typeof e != `object` || !e || typeof t != `object` || !t) {
      return false;
    }
    var n = Object.keys(e);
    var r = Object.keys(t);
    if (n.length !== r.length) {
      return false;
    }
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Ae.call(t, i) || !jr(e[i], t[i])) {
        return false;
      }
    }
    return true;
  }
  function Nr(e) {
    while (e && e.firstChild) {
      e = e.firstChild;
    }
    return e;
  }
  function Pr(e, t) {
    var n = Nr(e);
    e = 0;
    var r;
    for (; n; ) {
      if (n.nodeType === 3) {
        r = e + n.textContent.length;
        if (e <= t && r >= t) {
          return {
            node: n,
            offset: t - e,
          };
        }
        e = r;
      }
      a: {
        while (n) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break a;
          }
          n = n.parentNode;
        }
        n = undefined;
      }
      n = Nr(n);
    }
  }
  function Fr(e, t) {
    if (e && t) {
      if (e === t) {
        return true;
      } else if (e && e.nodeType === 3) {
        return false;
      } else if (t && t.nodeType === 3) {
        return Fr(e, t.parentNode);
      } else if (`contains` in e) {
        return e.contains(t);
      } else if (e.compareDocumentPosition) {
        return !!(e.compareDocumentPosition(t) & 16);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function Ir(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Gt(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == `string`;
      } catch {
        n = false;
      }
      if (n) {
        e = t.contentWindow;
      } else {
        break;
      }
      t = Gt(e.document);
    }
    return t;
  }
  function Lr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === `input` &&
        (e.type === `text` ||
          e.type === `search` ||
          e.type === `tel` ||
          e.type === `url` ||
          e.type === `password`)) ||
        t === `textarea` ||
        e.contentEditable === `true`)
    );
  }
  var Rr = vn && `documentMode` in document && document.documentMode <= 11;
  var zr = null;
  var Br = null;
  var Vr = null;
  var Hr = false;
  function Ur(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    if (!Hr && zr != null && zr === Gt(r)) {
      r = zr;
      if (`selectionStart` in r && Lr(r)) {
        r = {
          start: r.selectionStart,
          end: r.selectionEnd,
        };
      } else {
        r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection();
        r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        };
      }
      if (!Vr || !Mr(Vr, r)) {
        Vr = r;
        r = Ed(Br, `onSelect`);
        if (r.length > 0) {
          t = new An(`onSelect`, `select`, null, t, n);
          e.push({
            event: t,
            listeners: r,
          });
          t.target = zr;
        }
      }
    }
  }
  function Wr(e, t) {
    var n = {};
    n[e.toLowerCase()] = t.toLowerCase();
    n[`Webkit${e}`] = `webkit${t}`;
    n[`Moz${e}`] = `moz${t}`;
    return n;
  }
  var Gr = {
    animationend: Wr(`Animation`, `AnimationEnd`),
    animationiteration: Wr(`Animation`, `AnimationIteration`),
    animationstart: Wr(`Animation`, `AnimationStart`),
    transitionrun: Wr(`Transition`, `TransitionRun`),
    transitionstart: Wr(`Transition`, `TransitionStart`),
    transitioncancel: Wr(`Transition`, `TransitionCancel`),
    transitionend: Wr(`Transition`, `TransitionEnd`),
  };
  var Kr = {};
  var qr = {};
  if (vn) {
    qr = document.createElement(`div`).style;
    if (!(`AnimationEvent` in window)) {
      delete Gr.animationend.animation;
      delete Gr.animationiteration.animation;
      delete Gr.animationstart.animation;
    }
    if (!(`TransitionEvent` in window)) {
      delete Gr.transitionend.transition;
    }
  }
  function Jr(e) {
    if (Kr[e]) {
      return Kr[e];
    }
    if (!Gr[e]) {
      return e;
    }
    var t = Gr[e];
    var n;
    for (n in t) {
      if (t.hasOwnProperty(n) && n in qr) {
        return (Kr[e] = t[n]);
      }
    }
    return e;
  }
  var Yr = Jr(`animationend`);
  var Xr = Jr(`animationiteration`);
  var Zr = Jr(`animationstart`);
  var Qr = Jr(`transitionrun`);
  var $r = Jr(`transitionstart`);
  var ei = Jr(`transitioncancel`);
  var ti = Jr(`transitionend`);
  var ni = new Map();
  var ri =
    `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
      ` `,
    );
  ri.push(`scrollEnd`);
  function ii(e, t) {
    ni.set(e, t);
    jt(t, [e]);
  }
  var ai =
    typeof reportError == `function`
      ? reportError
      : function (e) {
          if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
            var t = new window.ErrorEvent(`error`, {
              bubbles: true,
              cancelable: true,
              message:
                typeof e == `object` && e && typeof e.message == `string` ? String(e.message) : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) {
              return;
            }
          } else if (typeof process == `object` && typeof process.emit == `function`) {
            process.emit(`uncaughtException`, e);
            return;
          }
          console.error(e);
        };
  var oi = [];
  var si = 0;
  var ci = 0;
  function li() {
    for (var e = si, t = (ci = si = 0); t < e; ) {
      var n = oi[t];
      oi[t++] = null;
      var r = oi[t];
      oi[t++] = null;
      var i = oi[t];
      oi[t++] = null;
      var a = oi[t];
      oi[t++] = null;
      if (r !== null && i !== null) {
        var o = r.pending;
        if (o === null) {
          i.next = i;
        } else {
          i.next = o.next;
          o.next = i;
        }
        r.pending = i;
      }
      if (a !== 0) {
        pi(n, i, a);
      }
    }
  }
  function ui(e, t, n, r) {
    oi[si++] = e;
    oi[si++] = t;
    oi[si++] = n;
    oi[si++] = r;
    ci |= r;
    e.lanes |= r;
    e = e.alternate;
    if (e !== null) {
      e.lanes |= r;
    }
  }
  function di(e, t, n, r) {
    ui(e, t, n, r);
    return mi(e);
  }
  function fi(e, t) {
    ui(e, null, null, t);
    return mi(e);
  }
  function pi(e, t, n) {
    e.lanes |= n;
    var r = e.alternate;
    if (r !== null) {
      r.lanes |= n;
    }
    var i = false;
    for (var a = e.return; a !== null; ) {
      a.childLanes |= n;
      r = a.alternate;
      if (r !== null) {
        r.childLanes |= n;
      }
      if (a.tag === 22) {
        e = a.stateNode;
        if (e !== null && !(e._visibility & 1)) {
          i = true;
        }
      }
      e = a;
      a = a.return;
    }
    if (e.tag === 3) {
      a = e.stateNode;
      if (i && t !== null) {
        i = 31 - qe(n);
        e = a.hiddenUpdates;
        r = e[i];
        if (r === null) {
          e[i] = [t];
        } else {
          r.push(t);
        }
        t.lane = n | 536870912;
      }
      return a;
    } else {
      return null;
    }
  }
  function mi(e) {
    if (du > 50) {
      du = 0;
      fu = null;
      throw Error(i(185));
    }
    for (var t = e.return; t !== null; ) {
      e = t;
      t = e.return;
    }
    if (e.tag === 3) {
      return e.stateNode;
    } else {
      return null;
    }
  }
  var hi = {};
  function gi(e, t, n, r) {
    this.tag = e;
    this.key = n;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = t;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = r;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function _i(e, t, n, r) {
    return new gi(e, t, n, r);
  }
  function vi(e) {
    e = e.prototype;
    return !!e && !!e.isReactComponent;
  }
  function yi(e, t) {
    var n = e.alternate;
    if (n === null) {
      n = _i(e.tag, t, e.key, e.mode);
      n.elementType = e.elementType;
      n.type = e.type;
      n.stateNode = e.stateNode;
      n.alternate = e;
      e.alternate = n;
    } else {
      n.pendingProps = t;
      n.type = e.type;
      n.flags = 0;
      n.subtreeFlags = 0;
      n.deletions = null;
    }
    n.flags = e.flags & 65011712;
    n.childLanes = e.childLanes;
    n.lanes = e.lanes;
    n.child = e.child;
    n.memoizedProps = e.memoizedProps;
    n.memoizedState = e.memoizedState;
    n.updateQueue = e.updateQueue;
    t = e.dependencies;
    n.dependencies =
      t === null
        ? null
        : {
            lanes: t.lanes,
            firstContext: t.firstContext,
          };
    n.sibling = e.sibling;
    n.index = e.index;
    n.ref = e.ref;
    n.refCleanup = e.refCleanup;
    return n;
  }
  function bi(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    if (n === null) {
      e.childLanes = 0;
      e.lanes = t;
      e.child = null;
      e.subtreeFlags = 0;
      e.memoizedProps = null;
      e.memoizedState = null;
      e.updateQueue = null;
      e.dependencies = null;
      e.stateNode = null;
    } else {
      e.childLanes = n.childLanes;
      e.lanes = n.lanes;
      e.child = n.child;
      e.subtreeFlags = 0;
      e.deletions = null;
      e.memoizedProps = n.memoizedProps;
      e.memoizedState = n.memoizedState;
      e.updateQueue = n.updateQueue;
      e.type = n.type;
      t = n.dependencies;
      e.dependencies =
        t === null
          ? null
          : {
              lanes: t.lanes,
              firstContext: t.firstContext,
            };
    }
    return e;
  }
  function xi(e, t, n, r, a, o) {
    var s = 0;
    r = e;
    if (typeof e == `function`) {
      if (vi(e)) {
        s = 1;
      }
    } else if (typeof e == `string`) {
      s = Uf(e, n, he.current) ? 26 : e === `html` || e === `head` || e === `body` ? 27 : 5;
    } else {
      a: switch (e) {
        case ie:
          e = _i(31, n, t, a);
          e.elementType = ie;
          e.lanes = o;
          return e;
        case y:
          return Si(n.children, a, o, t);
        case b:
          s = 8;
          a |= 24;
          break;
        case x:
          e = _i(12, n, t, a | 2);
          e.elementType = x;
          e.lanes = o;
          return e;
        case te:
          e = _i(13, n, t, a);
          e.elementType = te;
          e.lanes = o;
          return e;
        case ne:
          e = _i(19, n, t, a);
          e.elementType = ne;
          e.lanes = o;
          return e;
        default:
          if (typeof e == `object` && e) {
            switch (e.$$typeof) {
              case S:
                s = 10;
                break a;
              case ee:
                s = 9;
                break a;
              case C:
                s = 11;
                break a;
              case re:
                s = 14;
                break a;
              case w:
                s = 16;
                r = null;
                break a;
            }
          }
          s = 29;
          n = Error(i(130, e === null ? `null` : typeof e, ``));
          r = null;
      }
    }
    t = _i(s, n, t, a);
    t.elementType = e;
    t.type = r;
    t.lanes = o;
    return t;
  }
  function Si(e, t, n, r) {
    e = _i(7, e, r, t);
    e.lanes = n;
    return e;
  }
  function Ci(e, t, n) {
    e = _i(6, e, null, t);
    e.lanes = n;
    return e;
  }
  function wi(e) {
    var t = _i(18, null, null, 0);
    t.stateNode = e;
    return t;
  }
  function Ti(e, t, n) {
    t = _i(4, e.children === null ? [] : e.children, e.key, t);
    t.lanes = n;
    t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    };
    return t;
  }
  var Ei = new WeakMap();
  function Di(e, t) {
    if (typeof e == `object` && e) {
      var n = Ei.get(e);
      if (n === undefined) {
        t = {
          value: e,
          source: t,
          stack: ke(t),
        };
        Ei.set(e, t);
        return t;
      } else {
        return n;
      }
    }
    return {
      value: e,
      source: t,
      stack: ke(t),
    };
  }
  var Oi = [];
  var ki = 0;
  var Ai = null;
  var ji = 0;
  var Mi = [];
  var Ni = 0;
  var Pi = null;
  var Fi = 1;
  var Ii = ``;
  function Li(e, t) {
    Oi[ki++] = ji;
    Oi[ki++] = Ai;
    Ai = e;
    ji = t;
  }
  function Ri(e, t, n) {
    Mi[Ni++] = Fi;
    Mi[Ni++] = Ii;
    Mi[Ni++] = Pi;
    Pi = e;
    var r = Fi;
    e = Ii;
    var i = 32 - qe(r) - 1;
    r &= ~(1 << i);
    n += 1;
    var a = 32 - qe(t) + i;
    if (a > 30) {
      var o = i - (i % 5);
      a = (r & ((1 << o) - 1)).toString(32);
      r >>= o;
      i -= o;
      Fi = (1 << (32 - qe(t) + i)) | (n << i) | r;
      Ii = a + e;
    } else {
      Fi = (1 << a) | (n << i) | r;
      Ii = e;
    }
  }
  function zi(e) {
    if (e.return !== null) {
      Li(e, 1);
      Ri(e, 1, 0);
    }
  }
  function Bi(e) {
    while (e === Ai) {
      Ai = Oi[--ki];
      Oi[ki] = null;
      ji = Oi[--ki];
      Oi[ki] = null;
    }
    while (e === Pi) {
      Pi = Mi[--Ni];
      Mi[Ni] = null;
      Ii = Mi[--Ni];
      Mi[Ni] = null;
      Fi = Mi[--Ni];
      Mi[Ni] = null;
    }
  }
  function Vi(e, t) {
    Mi[Ni++] = Fi;
    Mi[Ni++] = Ii;
    Mi[Ni++] = Pi;
    Fi = t.id;
    Ii = t.overflow;
    Pi = e;
  }
  var Hi = null;
  var A = null;
  var j = false;
  var Ui = null;
  var Wi = false;
  var Gi = Error(i(519));
  function Ki(e) {
    Qi(
      Di(
        Error(
          i(418, arguments.length > 1 && arguments[1] !== undefined && arguments[1] ? `text` : `HTML`, ``),
        ),
        e,
      ),
    );
    throw Gi;
  }
  function qi(e) {
    var t = e.stateNode;
    var n = e.type;
    var r = e.memoizedProps;
    t[gt] = e;
    t[_t] = r;
    switch (n) {
      case `dialog`:
        Q(`cancel`, t);
        Q(`close`, t);
        break;
      case `iframe`:
      case `object`:
      case `embed`:
        Q(`load`, t);
        break;
      case `video`:
      case `audio`:
        for (n = 0; n < _d.length; n++) {
          Q(_d[n], t);
        }
        break;
      case `source`:
        Q(`error`, t);
        break;
      case `img`:
      case `image`:
      case `link`:
        Q(`error`, t);
        Q(`load`, t);
        break;
      case `details`:
        Q(`toggle`, t);
        break;
      case `input`:
        Q(`invalid`, t);
        Yt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, true);
        break;
      case `select`:
        Q(`invalid`, t);
        break;
      case `textarea`:
        Q(`invalid`, t);
        $t(t, r.value, r.defaultValue, r.children);
    }
    n = r.children;
    if (
      (typeof n != `string` && typeof n != `number` && typeof n != `bigint`) ||
      t.textContent === `${n}` ||
      r.suppressHydrationWarning === true ||
      Md(t.textContent, n)
    ) {
      if (r.popover != null) {
        Q(`beforetoggle`, t);
        Q(`toggle`, t);
      }
      if (r.onScroll != null) {
        Q(`scroll`, t);
      }
      if (r.onScrollEnd != null) {
        Q(`scrollend`, t);
      }
      if (r.onClick != null) {
        t.onclick = ln;
      }
      t = true;
    } else {
      t = false;
    }
    if (!t) {
      Ki(e, true);
    }
  }
  function Ji(e) {
    for (Hi = e.return; Hi; ) {
      switch (Hi.tag) {
        case 5:
        case 31:
        case 13:
          Wi = false;
          return;
        case 27:
        case 3:
          Wi = true;
          return;
        default:
          Hi = Hi.return;
      }
    }
  }
  function Yi(e) {
    if (e !== Hi) {
      return false;
    }
    if (!j) {
      Ji(e);
      j = true;
      return false;
    }
    var t = e.tag;
    var n;
    if ((n = t !== 3 && t !== 27)) {
      if ((n = t === 5)) {
        n = e.type;
        n = n === `form` || n === `button` || Ud(e.type, e.memoizedProps);
      }
      n = !n;
    }
    if (n && A) {
      Ki(e);
    }
    Ji(e);
    if (t === 13) {
      e = e.memoizedState;
      e = e === null ? null : e.dehydrated;
      if (!e) {
        throw Error(i(317));
      }
      A = uf(e);
    } else if (t === 31) {
      e = e.memoizedState;
      e = e === null ? null : e.dehydrated;
      if (!e) {
        throw Error(i(317));
      }
      A = uf(e);
    } else if (t === 27) {
      t = A;
      if (Zd(e.type)) {
        e = lf;
        lf = null;
        A = e;
      } else {
        A = t;
      }
    } else {
      A = Hi ? cf(e.stateNode.nextSibling) : null;
    }
    return true;
  }
  function Xi() {
    A = Hi = null;
    j = false;
  }
  function Zi() {
    var e = Ui;
    if (e !== null) {
      if (Ql === null) {
        Ql = e;
      } else {
        Ql.push.apply(Ql, e);
      }
      Ui = null;
    }
    return e;
  }
  function Qi(e) {
    if (Ui === null) {
      Ui = [e];
    } else {
      Ui.push(e);
    }
  }
  var $i = me(null);
  var ea = null;
  var ta = null;
  function na(e, t, n) {
    O($i, t._currentValue);
    t._currentValue = n;
  }
  function ra(e) {
    e._currentValue = $i.current;
    D($i);
  }
  function ia(e, t, n) {
    while (e !== null) {
      var r = e.alternate;
      if ((e.childLanes & t) === t) {
        if (r !== null && (r.childLanes & t) !== t) {
          r.childLanes |= t;
        }
      } else {
        e.childLanes |= t;
        if (r !== null) {
          r.childLanes |= t;
        }
      }
      if (e === n) {
        break;
      }
      e = e.return;
    }
  }
  function aa(e, t, n, r) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var o = a.dependencies;
      if (o !== null) {
        var s = a.child;
        o = o.firstContext;
        a: while (o !== null) {
          var c = o;
          o = a;
          for (var l = 0; l < t.length; l++) {
            if (c.context === t[l]) {
              o.lanes |= n;
              c = o.alternate;
              if (c !== null) {
                c.lanes |= n;
              }
              ia(o.return, n, e);
              if (!r) {
                s = null;
              }
              break a;
            }
          }
          o = c.next;
        }
      } else if (a.tag === 18) {
        s = a.return;
        if (s === null) {
          throw Error(i(341));
        }
        s.lanes |= n;
        o = s.alternate;
        if (o !== null) {
          o.lanes |= n;
        }
        ia(s, n, e);
        s = null;
      } else {
        s = a.child;
      }
      if (s !== null) {
        s.return = a;
      } else {
        for (s = a; s !== null; ) {
          if (s === e) {
            s = null;
            break;
          }
          a = s.sibling;
          if (a !== null) {
            a.return = s.return;
            s = a;
            break;
          }
          s = s.return;
        }
      }
      a = s;
    }
  }
  function oa(e, t, n, r) {
    e = null;
    for (var a = t, o = false; a !== null; ) {
      if (!o) {
        if (a.flags & 524288) {
          o = true;
        } else if (a.flags & 262144) {
          break;
        }
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) {
          throw Error(i(387));
        }
        s = s.memoizedProps;
        if (s !== null) {
          var c = a.type;
          if (!jr(a.pendingProps.value, s.value)) {
            if (e === null) {
              e = [c];
            } else {
              e.push(c);
            }
          }
        }
      } else if (a === ve.current) {
        s = a.alternate;
        if (s === null) {
          throw Error(i(387));
        }
        if (s.memoizedState.memoizedState !== a.memoizedState.memoizedState) {
          if (e === null) {
            e = [Qf];
          } else {
            e.push(Qf);
          }
        }
      }
      a = a.return;
    }
    if (e !== null) {
      aa(t, e, n, r);
    }
    t.flags |= 262144;
  }
  function sa(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!jr(e.context._currentValue, e.memoizedValue)) {
        return true;
      }
      e = e.next;
    }
    return false;
  }
  function ca(e) {
    ea = e;
    ta = null;
    e = e.dependencies;
    if (e !== null) {
      e.firstContext = null;
    }
  }
  function la(e) {
    return da(ea, e);
  }
  function ua(e, t) {
    if (ea === null) {
      ca(e);
    }
    return da(e, t);
  }
  function da(e, t) {
    var n = t._currentValue;
    t = {
      context: t,
      memoizedValue: n,
      next: null,
    };
    if (ta === null) {
      if (e === null) {
        throw Error(i(308));
      }
      ta = t;
      e.dependencies = {
        lanes: 0,
        firstContext: t,
      };
      e.flags |= 524288;
    } else {
      ta = ta.next = t;
    }
    return n;
  }
  var fa =
    typeof AbortController < `u`
      ? AbortController
      : function () {
          var e = [];
          var t = (this.signal = {
            aborted: false,
            addEventListener: function (t, n) {
              e.push(n);
            },
          });
          this.abort = function () {
            t.aborted = true;
            e.forEach(function (e) {
              return e();
            });
          };
        };
  var pa = t.unstable_scheduleCallback;
  var ma = t.unstable_NormalPriority;
  var M = {
    $$typeof: S,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
  function ha() {
    return {
      controller: new fa(),
      data: new Map(),
      refCount: 0,
    };
  }
  function ga(e) {
    e.refCount--;
    if (e.refCount === 0) {
      pa(ma, function () {
        e.controller.abort();
      });
    }
  }
  var _a = null;
  var va = 0;
  var ya = 0;
  var ba = null;
  function xa(e, t) {
    if (_a === null) {
      var n = (_a = []);
      va = 0;
      ya = dd();
      ba = {
        status: `pending`,
        value: undefined,
        then: function (e) {
          n.push(e);
        },
      };
    }
    va++;
    t.then(Sa, Sa);
    return t;
  }
  function Sa() {
    if (--va === 0 && _a !== null) {
      if (ba !== null) {
        ba.status = `fulfilled`;
      }
      var e = _a;
      _a = null;
      ya = 0;
      ba = null;
      for (var t = 0; t < e.length; t++) {
        (0, e[t])();
      }
    }
  }
  function Ca(e, t) {
    var n = [];
    var r = {
      status: `pending`,
      value: null,
      reason: null,
      then: function (e) {
        n.push(e);
      },
    };
    e.then(
      function () {
        r.status = `fulfilled`;
        r.value = t;
        for (var e = 0; e < n.length; e++) {
          (0, n[e])(t);
        }
      },
      function (e) {
        r.status = `rejected`;
        r.reason = e;
        e = 0;
        for (; e < n.length; e++) {
          (0, n[e])(undefined);
        }
      },
    );
    return r;
  }
  var wa = T.S;
  T.S = function (e, t) {
    tu = Fe();
    if (typeof t == `object` && t && typeof t.then == `function`) {
      xa(e, t);
    }
    if (wa !== null) {
      wa(e, t);
    }
  };
  var Ta = me(null);
  function Ea() {
    var e = Ta.current;
    if (e === null) {
      return G.pooledCache;
    } else {
      return e;
    }
  }
  function Da(e, t) {
    if (t === null) {
      O(Ta, Ta.current);
    } else {
      O(Ta, t.pool);
    }
  }
  function Oa() {
    var e = Ea();
    if (e === null) {
      return null;
    } else {
      return {
        parent: M._currentValue,
        pool: e,
      };
    }
  }
  var ka = Error(i(460));
  var Aa = Error(i(474));
  var ja = Error(i(542));
  var Ma = {
    then: function () {},
  };
  function Na(e) {
    e = e.status;
    return e === `fulfilled` || e === `rejected`;
  }
  function Pa(e, t, n) {
    n = e[n];
    if (n === undefined) {
      e.push(t);
    } else if (n !== t) {
      t.then(ln, ln);
      t = n;
    }
    switch (t.status) {
      case `fulfilled`:
        return t.value;
      case `rejected`:
        e = t.reason;
        Ra(e);
        throw e;
      default:
        if (typeof t.status == `string`) {
          t.then(ln, ln);
        } else {
          e = G;
          if (e !== null && e.shellSuspendCounter > 100) {
            throw Error(i(482));
          }
          e = t;
          e.status = `pending`;
          e.then(
            function (e) {
              if (t.status === `pending`) {
                var n = t;
                n.status = `fulfilled`;
                n.value = e;
              }
            },
            function (e) {
              if (t.status === `pending`) {
                var n = t;
                n.status = `rejected`;
                n.reason = e;
              }
            },
          );
        }
        switch (t.status) {
          case `fulfilled`:
            return t.value;
          case `rejected`:
            e = t.reason;
            Ra(e);
            throw e;
        }
        Ia = t;
        throw ka;
    }
  }
  function Fa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (e) {
      throw typeof e == `object` && e && typeof e.then == `function` ? ((Ia = e), ka) : e;
    }
  }
  var Ia = null;
  function La() {
    if (Ia === null) {
      throw Error(i(459));
    }
    var e = Ia;
    Ia = null;
    return e;
  }
  function Ra(e) {
    if (e === ka || e === ja) {
      throw Error(i(483));
    }
  }
  var za = null;
  var Ba = 0;
  function Va(e) {
    var t = Ba;
    Ba += 1;
    if (za === null) {
      za = [];
    }
    return Pa(za, e, t);
  }
  function Ha(e, t) {
    t = t.props.ref;
    e.ref = t === undefined ? null : t;
  }
  function Ua(e, t) {
    throw t.$$typeof === g
      ? Error(i(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(i(31, e === `[object Object]` ? `object with keys {${Object.keys(t).join(`, `)}}` : e)));
  }
  function Wa(e) {
    function t(t, n) {
      if (e) {
        var r = t.deletions;
        if (r === null) {
          t.deletions = [n];
          t.flags |= 16;
        } else {
          r.push(n);
        }
      }
    }
    function n(n, r) {
      if (!e) {
        return null;
      }
      while (r !== null) {
        t(n, r);
        r = r.sibling;
      }
      return null;
    }
    function r(e) {
      var t = new Map();
      for (; e !== null; ) {
        if (e.key === null) {
          t.set(e.index, e);
        } else {
          t.set(e.key, e);
        }
        e = e.sibling;
      }
      return t;
    }
    function a(e, t) {
      e = yi(e, t);
      e.index = 0;
      e.sibling = null;
      return e;
    }
    function o(t, n, r) {
      t.index = r;
      if (e) {
        r = t.alternate;
        if (r === null) {
          t.flags |= 67108866;
          return n;
        } else {
          r = r.index;
          if (r < n) {
            t.flags |= 67108866;
            return n;
          } else {
            return r;
          }
        }
      } else {
        t.flags |= 1048576;
        return n;
      }
    }
    function s(t) {
      if (e && t.alternate === null) {
        t.flags |= 67108866;
      }
      return t;
    }
    function c(e, t, n, r) {
      if (t === null || t.tag !== 6) {
        t = Ci(n, e.mode, r);
        t.return = e;
        return t;
      } else {
        t = a(t, n);
        t.return = e;
        return t;
      }
    }
    function l(e, t, n, r) {
      var i = n.type;
      if (i === y) {
        return d(e, t, n.props.children, r, n.key);
      } else if (
        t !== null &&
        (t.elementType === i || (typeof i == `object` && i && i.$$typeof === w && Fa(i) === t.type))
      ) {
        t = a(t, n.props);
        Ha(t, n);
        t.return = e;
        return t;
      } else {
        t = xi(n.type, n.key, n.props, null, e.mode, r);
        Ha(t, n);
        t.return = e;
        return t;
      }
    }
    function u(e, t, n, r) {
      if (
        t === null ||
        t.tag !== 4 ||
        t.stateNode.containerInfo !== n.containerInfo ||
        t.stateNode.implementation !== n.implementation
      ) {
        t = Ti(n, e.mode, r);
        t.return = e;
        return t;
      } else {
        t = a(t, n.children || []);
        t.return = e;
        return t;
      }
    }
    function d(e, t, n, r, i) {
      if (t === null || t.tag !== 7) {
        t = Si(n, e.mode, r, i);
        t.return = e;
        return t;
      } else {
        t = a(t, n);
        t.return = e;
        return t;
      }
    }
    function f(e, t, n) {
      if ((typeof t == `string` && t !== ``) || typeof t == `number` || typeof t == `bigint`) {
        t = Ci(`${t}`, e.mode, n);
        t.return = e;
        return t;
      }
      if (typeof t == `object` && t) {
        switch (t.$$typeof) {
          case _:
            n = xi(t.type, t.key, t.props, null, e.mode, n);
            Ha(n, t);
            n.return = e;
            return n;
          case v:
            t = Ti(t, e.mode, n);
            t.return = e;
            return t;
          case w:
            t = Fa(t);
            return f(e, t, n);
        }
        if (ue(t) || se(t)) {
          t = Si(t, e.mode, n, null);
          t.return = e;
          return t;
        }
        if (typeof t.then == `function`) {
          return f(e, Va(t), n);
        }
        if (t.$$typeof === S) {
          return f(e, ua(e, t), n);
        }
        Ua(e, t);
      }
      return null;
    }
    function p(e, t, n, r) {
      var i = t === null ? null : t.key;
      if ((typeof n == `string` && n !== ``) || typeof n == `number` || typeof n == `bigint`) {
        if (i === null) {
          return c(e, t, `${n}`, r);
        } else {
          return null;
        }
      }
      if (typeof n == `object` && n) {
        switch (n.$$typeof) {
          case _:
            if (n.key === i) {
              return l(e, t, n, r);
            } else {
              return null;
            }
          case v:
            if (n.key === i) {
              return u(e, t, n, r);
            } else {
              return null;
            }
          case w:
            n = Fa(n);
            return p(e, t, n, r);
        }
        if (ue(n) || se(n)) {
          if (i === null) {
            return d(e, t, n, r, null);
          } else {
            return null;
          }
        }
        if (typeof n.then == `function`) {
          return p(e, t, Va(n), r);
        }
        if (n.$$typeof === S) {
          return p(e, t, ua(e, n), r);
        }
        Ua(e, n);
      }
      return null;
    }
    function m(e, t, n, r, i) {
      if ((typeof r == `string` && r !== ``) || typeof r == `number` || typeof r == `bigint`) {
        e = e.get(n) || null;
        return c(t, e, `${r}`, i);
      }
      if (typeof r == `object` && r) {
        switch (r.$$typeof) {
          case _:
            e = e.get(r.key === null ? n : r.key) || null;
            return l(t, e, r, i);
          case v:
            e = e.get(r.key === null ? n : r.key) || null;
            return u(t, e, r, i);
          case w:
            r = Fa(r);
            return m(e, t, n, r, i);
        }
        if (ue(r) || se(r)) {
          e = e.get(n) || null;
          return d(t, e, r, i, null);
        }
        if (typeof r.then == `function`) {
          return m(e, t, n, Va(r), i);
        }
        if (r.$$typeof === S) {
          return m(e, t, n, ua(t, r), i);
        }
        Ua(t, r);
      }
      return null;
    }
    function h(i, a, s, c) {
      var l = null;
      var u = null;
      for (var d = a, h = (a = 0), g = null; d !== null && h < s.length; h++) {
        if (d.index > h) {
          g = d;
          d = null;
        } else {
          g = d.sibling;
        }
        var _ = p(i, d, s[h], c);
        if (_ === null) {
          if (d === null) {
            d = g;
          }
          break;
        }
        if (e && d && _.alternate === null) {
          t(i, d);
        }
        a = o(_, a, h);
        if (u === null) {
          l = _;
        } else {
          u.sibling = _;
        }
        u = _;
        d = g;
      }
      if (h === s.length) {
        n(i, d);
        if (j) {
          Li(i, h);
        }
        return l;
      }
      if (d === null) {
        for (; h < s.length; h++) {
          d = f(i, s[h], c);
          if (d !== null) {
            a = o(d, a, h);
            if (u === null) {
              l = d;
            } else {
              u.sibling = d;
            }
            u = d;
          }
        }
        if (j) {
          Li(i, h);
        }
        return l;
      }
      for (d = r(d); h < s.length; h++) {
        g = m(d, i, h, s[h], c);
        if (g !== null) {
          if (e && g.alternate !== null) {
            d.delete(g.key === null ? h : g.key);
          }
          a = o(g, a, h);
          if (u === null) {
            l = g;
          } else {
            u.sibling = g;
          }
          u = g;
        }
      }
      if (e) {
        d.forEach(function (e) {
          return t(i, e);
        });
      }
      if (j) {
        Li(i, h);
      }
      return l;
    }
    function g(a, s, c, l) {
      if (c == null) {
        throw Error(i(151));
      }
      var u = null;
      var d = null;
      for (var h = s, g = (s = 0), _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
        if (h.index > g) {
          _ = h;
          h = null;
        } else {
          _ = h.sibling;
        }
        var y = p(a, h, v.value, l);
        if (y === null) {
          if (h === null) {
            h = _;
          }
          break;
        }
        if (e && h && y.alternate === null) {
          t(a, h);
        }
        s = o(y, s, g);
        if (d === null) {
          u = y;
        } else {
          d.sibling = y;
        }
        d = y;
        h = _;
      }
      if (v.done) {
        n(a, h);
        if (j) {
          Li(a, g);
        }
        return u;
      }
      if (h === null) {
        for (; !v.done; g++, v = c.next()) {
          v = f(a, v.value, l);
          if (v !== null) {
            s = o(v, s, g);
            if (d === null) {
              u = v;
            } else {
              d.sibling = v;
            }
            d = v;
          }
        }
        if (j) {
          Li(a, g);
        }
        return u;
      }
      for (h = r(h); !v.done; g++, v = c.next()) {
        v = m(h, a, g, v.value, l);
        if (v !== null) {
          if (e && v.alternate !== null) {
            h.delete(v.key === null ? g : v.key);
          }
          s = o(v, s, g);
          if (d === null) {
            u = v;
          } else {
            d.sibling = v;
          }
          d = v;
        }
      }
      if (e) {
        h.forEach(function (e) {
          return t(a, e);
        });
      }
      if (j) {
        Li(a, g);
      }
      return u;
    }
    function b(e, r, o, c) {
      if (typeof o == `object` && o && o.type === y && o.key === null) {
        o = o.props.children;
      }
      if (typeof o == `object` && o) {
        switch (o.$$typeof) {
          case _:
            a: {
              var l = o.key;
              for (; r !== null; ) {
                if (r.key === l) {
                  l = o.type;
                  if (l === y) {
                    if (r.tag === 7) {
                      n(e, r.sibling);
                      c = a(r, o.props.children);
                      c.return = e;
                      e = c;
                      break a;
                    }
                  } else if (
                    r.elementType === l ||
                    (typeof l == `object` && l && l.$$typeof === w && Fa(l) === r.type)
                  ) {
                    n(e, r.sibling);
                    c = a(r, o.props);
                    Ha(c, o);
                    c.return = e;
                    e = c;
                    break a;
                  }
                  n(e, r);
                  break;
                } else {
                  t(e, r);
                }
                r = r.sibling;
              }
              if (o.type === y) {
                c = Si(o.props.children, e.mode, c, o.key);
                c.return = e;
                e = c;
              } else {
                c = xi(o.type, o.key, o.props, null, e.mode, c);
                Ha(c, o);
                c.return = e;
                e = c;
              }
            }
            return s(e);
          case v:
            a: {
              for (l = o.key; r !== null; ) {
                if (r.key === l) {
                  if (
                    r.tag === 4 &&
                    r.stateNode.containerInfo === o.containerInfo &&
                    r.stateNode.implementation === o.implementation
                  ) {
                    n(e, r.sibling);
                    c = a(r, o.children || []);
                    c.return = e;
                    e = c;
                    break a;
                  } else {
                    n(e, r);
                    break;
                  }
                } else {
                  t(e, r);
                }
                r = r.sibling;
              }
              c = Ti(o, e.mode, c);
              c.return = e;
              e = c;
            }
            return s(e);
          case w:
            o = Fa(o);
            return b(e, r, o, c);
        }
        if (ue(o)) {
          return h(e, r, o, c);
        }
        if (se(o)) {
          l = se(o);
          if (typeof l != `function`) {
            throw Error(i(150));
          }
          o = l.call(o);
          return g(e, r, o, c);
        }
        if (typeof o.then == `function`) {
          return b(e, r, Va(o), c);
        }
        if (o.$$typeof === S) {
          return b(e, r, ua(e, o), c);
        }
        Ua(e, o);
      }
      if ((typeof o == `string` && o !== ``) || typeof o == `number` || typeof o == `bigint`) {
        o = `${o}`;
        if (r !== null && r.tag === 6) {
          n(e, r.sibling);
          c = a(r, o);
          c.return = e;
          e = c;
        } else {
          n(e, r);
          c = Ci(o, e.mode, c);
          c.return = e;
          e = c;
        }
        return s(e);
      } else {
        return n(e, r);
      }
    }
    return function (e, t, n, r) {
      try {
        Ba = 0;
        var i = b(e, t, n, r);
        za = null;
        return i;
      } catch (t) {
        if (t === ka || t === ja) {
          throw t;
        }
        var a = _i(29, t, null, e.mode);
        a.lanes = r;
        a.return = e;
        return a;
      }
    };
  }
  var Ga = Wa(true);
  var Ka = Wa(false);
  var qa = false;
  function Ja(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null,
      },
      callbacks: null,
    };
  }
  function Ya(e, t) {
    e = e.updateQueue;
    if (t.updateQueue === e) {
      t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null,
      };
    }
  }
  function Xa(e) {
    return {
      lane: e,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Za(e, t, n) {
    var r = e.updateQueue;
    if (r === null) {
      return null;
    }
    r = r.shared;
    if (W & 2) {
      var i = r.pending;
      if (i === null) {
        t.next = t;
      } else {
        t.next = i.next;
        i.next = t;
      }
      r.pending = t;
      t = mi(e);
      pi(e, null, n);
      return t;
    }
    ui(e, r, t, n);
    return mi(e);
  }
  function Qa(e, t, n) {
    t = t.updateQueue;
    if (t !== null && ((t = t.shared), n & 4194048)) {
      var r = t.lanes;
      r &= e.pendingLanes;
      n |= r;
      t.lanes = n;
      lt(e, n);
    }
  }
  function $a(e, t) {
    var n = e.updateQueue;
    var r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var i = null;
      var a = null;
      n = n.firstBaseUpdate;
      if (n !== null) {
        do {
          var o = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          if (a === null) {
            i = a = o;
          } else {
            a = a.next = o;
          }
          n = n.next;
        } while (n !== null);
        if (a === null) {
          i = a = t;
        } else {
          a = a.next = t;
        }
      } else {
        i = a = t;
      }
      n = {
        baseState: r.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: a,
        shared: r.shared,
        callbacks: r.callbacks,
      };
      e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate;
    if (e === null) {
      n.firstBaseUpdate = t;
    } else {
      e.next = t;
    }
    n.lastBaseUpdate = t;
  }
  var eo = false;
  function to() {
    if (eo) {
      var e = ba;
      if (e !== null) {
        throw e;
      }
    }
  }
  function no(e, t, n, r) {
    eo = false;
    var i = e.updateQueue;
    qa = false;
    var a = i.firstBaseUpdate;
    var o = i.lastBaseUpdate;
    var s = i.shared.pending;
    if (s !== null) {
      i.shared.pending = null;
      var c = s;
      var l = c.next;
      c.next = null;
      if (o === null) {
        a = l;
      } else {
        o.next = l;
      }
      o = c;
      var u = e.alternate;
      if (u !== null) {
        u = u.updateQueue;
        s = u.lastBaseUpdate;
        if (s !== o) {
          if (s === null) {
            u.firstBaseUpdate = l;
          } else {
            s.next = l;
          }
          u.lastBaseUpdate = c;
        }
      }
    }
    if (a !== null) {
      var d = i.baseState;
      o = 0;
      u = l = c = null;
      s = a;
      do {
        var f = s.lane & -536870913;
        var p = f !== s.lane;
        if (p ? (q & f) === f : (r & f) === f) {
          if (f !== 0 && f === ya) {
            eo = true;
          }
          if (u !== null) {
            u = u.next = {
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: null,
              next: null,
            };
          }
          a: {
            var m = e;
            var g = s;
            f = t;
            var _ = n;
            switch (g.tag) {
              case 1:
                m = g.payload;
                if (typeof m == `function`) {
                  d = m.call(_, d, f);
                  break a;
                }
                d = m;
                break a;
              case 3:
                m.flags = (m.flags & -65537) | 128;
              case 0:
                m = g.payload;
                f = typeof m == `function` ? m.call(_, d, f) : m;
                if (f == null) {
                  break a;
                }
                d = h({}, d, f);
                break a;
              case 2:
                qa = true;
            }
          }
          f = s.callback;
          if (f !== null) {
            e.flags |= 64;
            if (p) {
              e.flags |= 8192;
            }
            p = i.callbacks;
            if (p === null) {
              i.callbacks = [f];
            } else {
              p.push(f);
            }
          }
        } else {
          p = {
            lane: f,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null,
          };
          if (u === null) {
            l = u = p;
            c = d;
          } else {
            u = u.next = p;
          }
          o |= f;
        }
        s = s.next;
        if (s === null) {
          s = i.shared.pending;
          if (s === null) {
            break;
          }
          p = s;
          s = p.next;
          p.next = null;
          i.lastBaseUpdate = p;
          i.shared.pending = null;
        }
      } while (1);
      if (u === null) {
        c = d;
      }
      i.baseState = c;
      i.firstBaseUpdate = l;
      i.lastBaseUpdate = u;
      if (a === null) {
        i.shared.lanes = 0;
      }
      Kl |= o;
      e.lanes = o;
      e.memoizedState = d;
    }
  }
  function ro(e, t) {
    if (typeof e != `function`) {
      throw Error(i(191, e));
    }
    e.call(t);
  }
  function io(e, t) {
    var n = e.callbacks;
    if (n !== null) {
      e.callbacks = null;
      e = 0;
      for (; e < n.length; e++) {
        ro(n[e], t);
      }
    }
  }
  var ao = me(null);
  var oo = me(0);
  function so(e, t) {
    e = Gl;
    O(oo, e);
    O(ao, t);
    Gl = e | t.baseLanes;
  }
  function co() {
    O(oo, Gl);
    O(ao, ao.current);
  }
  function lo() {
    Gl = oo.current;
    D(ao);
    D(oo);
  }
  var uo = me(null);
  var fo = null;
  function po(e) {
    var t = e.alternate;
    O(N, N.current & 1);
    O(uo, e);
    if (fo === null && (t === null || ao.current !== null || t.memoizedState !== null)) {
      fo = e;
    }
  }
  function mo(e) {
    O(N, N.current);
    O(uo, e);
    if (fo === null) {
      fo = e;
    }
  }
  function ho(e) {
    if (e.tag === 22) {
      O(N, N.current);
      O(uo, e);
      if (fo === null) {
        fo = e;
      }
    } else {
      go(e);
    }
  }
  function go() {
    O(N, N.current);
    O(uo, uo.current);
  }
  function _o(e) {
    D(uo);
    if (fo === e) {
      fo = null;
    }
    D(N);
  }
  var N = me(0);
  function vo(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || af(n) || of(n))) {
          return t;
        }
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === `forwards` ||
          t.memoizedProps.revealOrder === `backwards` ||
          t.memoizedProps.revealOrder === `unstable_legacy-backwards` ||
          t.memoizedProps.revealOrder === `together`)
      ) {
        if (t.flags & 128) {
          return t;
        }
      } else if (t.child !== null) {
        t.child.return = t;
        t = t.child;
        continue;
      }
      if (t === e) {
        break;
      }
      while (t.sibling === null) {
        if (t.return === null || t.return === e) {
          return null;
        }
        t = t.return;
      }
      t.sibling.return = t.return;
      t = t.sibling;
    }
    return null;
  }
  var yo = 0;
  var P = null;
  var F = null;
  var I = null;
  var bo = false;
  var xo = false;
  var So = false;
  var Co = 0;
  var wo = 0;
  var To = null;
  var Eo = 0;
  function L() {
    throw Error(i(321));
  }
  function Do(e, t) {
    if (t === null) {
      return false;
    }
    for (var n = 0; n < t.length && n < e.length; n++) {
      if (!jr(e[n], t[n])) {
        return false;
      }
    }
    return true;
  }
  function Oo(e, t, n, r, i, a) {
    yo = a;
    P = t;
    t.memoizedState = null;
    t.updateQueue = null;
    t.lanes = 0;
    T.H = e === null || e.memoizedState === null ? Ws : Gs;
    So = false;
    a = n(r, i);
    So = false;
    if (xo) {
      a = Ao(t, n, r, i);
    }
    ko(e);
    return a;
  }
  function ko(e) {
    T.H = Us;
    var t = F !== null && F.next !== null;
    yo = 0;
    I = F = P = null;
    bo = false;
    wo = 0;
    To = null;
    if (t) {
      throw Error(i(300));
    }
    if (e !== null && !z) {
      e = e.dependencies;
      if (e !== null && sa(e)) {
        z = true;
      }
    }
  }
  function Ao(e, t, n, r) {
    P = e;
    var a = 0;
    do {
      if (xo) {
        To = null;
      }
      wo = 0;
      xo = false;
      if (a >= 25) {
        throw Error(i(301));
      }
      a += 1;
      I = F = null;
      if (e.updateQueue != null) {
        var o = e.updateQueue;
        o.lastEffect = null;
        o.events = null;
        o.stores = null;
        if (o.memoCache != null) {
          o.memoCache.index = 0;
        }
      }
      T.H = Ks;
      o = t(n, r);
    } while (xo);
    return o;
  }
  function jo() {
    var e = T.H;
    var t = e.useState()[0];
    t = typeof t.then == `function` ? Lo(t) : t;
    e = e.useState()[0];
    if ((F === null ? null : F.memoizedState) !== e) {
      P.flags |= 1024;
    }
    return t;
  }
  function Mo() {
    var e = Co !== 0;
    Co = 0;
    return e;
  }
  function No(e, t, n) {
    t.updateQueue = e.updateQueue;
    t.flags &= -2053;
    e.lanes &= ~n;
  }
  function Po(e) {
    if (bo) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        if (t !== null) {
          t.pending = null;
        }
        e = e.next;
      }
      bo = false;
    }
    yo = 0;
    I = F = P = null;
    xo = false;
    wo = Co = 0;
    To = null;
  }
  function Fo() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    if (I === null) {
      P.memoizedState = I = e;
    } else {
      I = I.next = e;
    }
    return I;
  }
  function R() {
    if (F === null) {
      var e = P.alternate;
      e = e === null ? null : e.memoizedState;
    } else {
      e = F.next;
    }
    var t = I === null ? P.memoizedState : I.next;
    if (t !== null) {
      I = t;
      F = e;
    } else {
      if (e === null) {
        throw P.alternate === null ? Error(i(467)) : Error(i(310));
      }
      F = e;
      e = {
        memoizedState: F.memoizedState,
        baseState: F.baseState,
        baseQueue: F.baseQueue,
        queue: F.queue,
        next: null,
      };
      if (I === null) {
        P.memoizedState = I = e;
      } else {
        I = I.next = e;
      }
    }
    return I;
  }
  function Io() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null,
    };
  }
  function Lo(e) {
    var t = wo;
    wo += 1;
    if (To === null) {
      To = [];
    }
    e = Pa(To, e, t);
    t = P;
    if ((I === null ? t.memoizedState : I.next) === null) {
      t = t.alternate;
      T.H = t === null || t.memoizedState === null ? Ws : Gs;
    }
    return e;
  }
  function Ro(e) {
    if (typeof e == `object` && e) {
      if (typeof e.then == `function`) {
        return Lo(e);
      }
      if (e.$$typeof === S) {
        return la(e);
      }
    }
    throw Error(i(438, String(e)));
  }
  function zo(e) {
    var t = null;
    var n = P.updateQueue;
    if (n !== null) {
      t = n.memoCache;
    }
    if (t == null) {
      var r = P.alternate;
      if (r !== null) {
        r = r.updateQueue;
        if (r !== null) {
          r = r.memoCache;
          if (r != null) {
            t = {
              data: r.data.map(function (e) {
                return e.slice();
              }),
              index: 0,
            };
          }
        }
      }
    }
    t ??= {
      data: [],
      index: 0,
    };
    if (n === null) {
      n = Io();
      P.updateQueue = n;
    }
    n.memoCache = t;
    n = t.data[t.index];
    if (n === undefined) {
      n = t.data[t.index] = Array(e);
      r = 0;
      for (; r < e; r++) {
        n[r] = ae;
      }
    }
    t.index++;
    return n;
  }
  function Bo(e, t) {
    if (typeof t == `function`) {
      return t(e);
    } else {
      return t;
    }
  }
  function Vo(e) {
    return Ho(R(), F, e);
  }
  function Ho(e, t, n) {
    var r = e.queue;
    if (r === null) {
      throw Error(i(311));
    }
    r.lastRenderedReducer = n;
    var a = e.baseQueue;
    var o = r.pending;
    if (o !== null) {
      if (a !== null) {
        var s = a.next;
        a.next = o.next;
        o.next = s;
      }
      t.baseQueue = a = o;
      r.pending = null;
    }
    o = e.baseState;
    if (a === null) {
      e.memoizedState = o;
    } else {
      t = a.next;
      var c = (s = null);
      var l = null;
      var u = t;
      var d = false;
      do {
        var f = u.lane & -536870913;
        if (f === u.lane ? (yo & f) === f : (q & f) === f) {
          var p = u.revertLane;
          if (p === 0) {
            if (l !== null) {
              l = l.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              };
            }
            if (f === ya) {
              d = true;
            }
          } else if ((yo & p) === p) {
            u = u.next;
            if (p === ya) {
              d = true;
            }
            continue;
          } else {
            f = {
              lane: 0,
              revertLane: u.revertLane,
              gesture: null,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            };
            if (l === null) {
              c = l = f;
              s = o;
            } else {
              l = l.next = f;
            }
            P.lanes |= p;
            Kl |= p;
          }
          f = u.action;
          if (So) {
            n(o, f);
          }
          o = u.hasEagerState ? u.eagerState : n(o, f);
        } else {
          p = {
            lane: f,
            revertLane: u.revertLane,
            gesture: u.gesture,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null,
          };
          if (l === null) {
            c = l = p;
            s = o;
          } else {
            l = l.next = p;
          }
          P.lanes |= f;
          Kl |= f;
        }
        u = u.next;
      } while (u !== null && u !== t);
      if (l === null) {
        s = o;
      } else {
        l.next = c;
      }
      if (!jr(o, e.memoizedState) && ((z = true), d && ((n = ba), n !== null))) {
        throw n;
      }
      e.memoizedState = o;
      e.baseState = s;
      e.baseQueue = l;
      r.lastRenderedState = o;
    }
    if (a === null) {
      r.lanes = 0;
    }
    return [e.memoizedState, r.dispatch];
  }
  function Uo(e) {
    var t = R();
    var n = t.queue;
    if (n === null) {
      throw Error(i(311));
    }
    n.lastRenderedReducer = e;
    var r = n.dispatch;
    var a = n.pending;
    var o = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var s = (a = a.next);
      do {
        o = e(o, s.action);
        s = s.next;
      } while (s !== a);
      if (!jr(o, t.memoizedState)) {
        z = true;
      }
      t.memoizedState = o;
      if (t.baseQueue === null) {
        t.baseState = o;
      }
      n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Wo(e, t, n) {
    var r = P;
    var a = R();
    var o = j;
    if (o) {
      if (n === undefined) {
        throw Error(i(407));
      }
      n = n();
    } else {
      n = t();
    }
    var s = !jr((F || a).memoizedState, n);
    if (s) {
      a.memoizedState = n;
      z = true;
    }
    a = a.queue;
    hs(qo.bind(null, r, a, e), [e]);
    if (a.getSnapshot !== t || s || (I !== null && I.memoizedState.tag & 1)) {
      r.flags |= 2048;
      us(
        9,
        {
          destroy: undefined,
        },
        Ko.bind(null, r, a, n, t),
        null,
      );
      if (G === null) {
        throw Error(i(349));
      }
      if (!o && !(yo & 127)) {
        Go(r, t, n);
      }
    }
    return n;
  }
  function Go(e, t, n) {
    e.flags |= 16384;
    e = {
      getSnapshot: t,
      value: n,
    };
    t = P.updateQueue;
    if (t === null) {
      t = Io();
      P.updateQueue = t;
      t.stores = [e];
    } else {
      n = t.stores;
      if (n === null) {
        t.stores = [e];
      } else {
        n.push(e);
      }
    }
  }
  function Ko(e, t, n, r) {
    t.value = n;
    t.getSnapshot = r;
    if (Jo(t)) {
      Yo(e);
    }
  }
  function qo(e, t, n) {
    return n(function () {
      if (Jo(t)) {
        Yo(e);
      }
    });
  }
  function Jo(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !jr(e, n);
    } catch {
      return true;
    }
  }
  function Yo(e) {
    var t = fi(e, 2);
    if (t !== null) {
      hu(t, e, 2);
    }
  }
  function Xo(e) {
    var t = Fo();
    if (typeof e == `function`) {
      var n = e;
      e = n();
      if (So) {
        Ke(true);
        try {
          n();
        } finally {
          Ke(false);
        }
      }
    }
    t.memoizedState = t.baseState = e;
    t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bo,
      lastRenderedState: e,
    };
    return t;
  }
  function Zo(e, t, n, r) {
    e.baseState = n;
    return Ho(e, F, typeof r == `function` ? r : Bo);
  }
  function Qo(e, t, n, r, a) {
    if (Bs(e)) {
      throw Error(i(485));
    }
    e = t.action;
    if (e !== null) {
      var o = {
        payload: a,
        action: e,
        next: null,
        isTransition: true,
        status: `pending`,
        value: null,
        reason: null,
        listeners: [],
        then: function (e) {
          o.listeners.push(e);
        },
      };
      if (T.T === null) {
        o.isTransition = false;
      } else {
        n(true);
      }
      r(o);
      n = t.pending;
      if (n === null) {
        o.next = t.pending = o;
        $o(t, o);
      } else {
        o.next = n.next;
        t.pending = n.next = o;
      }
    }
  }
  function $o(e, t) {
    var n = t.action;
    var r = t.payload;
    var i = e.state;
    if (t.isTransition) {
      var a = T.T;
      var o = {};
      T.T = o;
      try {
        var s = n(i, r);
        var c = T.S;
        if (c !== null) {
          c(o, s);
        }
        es(e, t, s);
      } catch (n) {
        ns(e, t, n);
      } finally {
        if (a !== null && o.types !== null) {
          a.types = o.types;
        }
        T.T = a;
      }
    } else {
      try {
        a = n(i, r);
        es(e, t, a);
      } catch (n) {
        ns(e, t, n);
      }
    }
  }
  function es(e, t, n) {
    if (typeof n == `object` && n && typeof n.then == `function`) {
      n.then(
        function (n) {
          ts(e, t, n);
        },
        function (n) {
          return ns(e, t, n);
        },
      );
    } else {
      ts(e, t, n);
    }
  }
  function ts(e, t, n) {
    t.status = `fulfilled`;
    t.value = n;
    rs(t);
    e.state = n;
    t = e.pending;
    if (t !== null) {
      n = t.next;
      if (n === t) {
        e.pending = null;
      } else {
        n = n.next;
        t.next = n;
        $o(e, n);
      }
    }
  }
  function ns(e, t, n) {
    var r = e.pending;
    e.pending = null;
    if (r !== null) {
      r = r.next;
      do {
        t.status = `rejected`;
        t.reason = n;
        rs(t);
        t = t.next;
      } while (t !== r);
    }
    e.action = null;
  }
  function rs(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) {
      (0, e[t])();
    }
  }
  function is(e, t) {
    return t;
  }
  function as(e, t) {
    if (j) {
      var n = G.formState;
      if (n !== null) {
        a: {
          var r = P;
          if (j) {
            if (A) {
              b: {
                for (var i = A, a = Wi; i.nodeType !== 8; ) {
                  if (!a) {
                    i = null;
                    break b;
                  }
                  i = cf(i.nextSibling);
                  if (i === null) {
                    i = null;
                    break b;
                  }
                }
                a = i.data;
                i = a === `F!` || a === `F` ? i : null;
              }
              if (i) {
                A = cf(i.nextSibling);
                r = i.data === `F!`;
                break a;
              }
            }
            Ki(r);
          }
          r = false;
        }
        if (r) {
          t = n[0];
        }
      }
    }
    n = Fo();
    n.memoizedState = n.baseState = t;
    r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: is,
      lastRenderedState: t,
    };
    n.queue = r;
    n = Ls.bind(null, P, r);
    r.dispatch = n;
    r = Xo(false);
    a = zs.bind(null, P, false, r.queue);
    r = Fo();
    i = {
      state: t,
      dispatch: null,
      action: e,
      pending: null,
    };
    r.queue = i;
    n = Qo.bind(null, P, i, a, n);
    i.dispatch = n;
    r.memoizedState = e;
    return [t, n, false];
  }
  function os(e) {
    return ss(R(), F, e);
  }
  function ss(e, t, n) {
    t = Ho(e, t, is)[0];
    e = Vo(Bo)[0];
    if (typeof t == `object` && t && typeof t.then == `function`) {
      try {
        var r = Lo(t);
      } catch (e) {
        throw e === ka ? ja : e;
      }
    } else {
      r = t;
    }
    t = R();
    var i = t.queue;
    var a = i.dispatch;
    if (n !== t.memoizedState) {
      P.flags |= 2048;
      us(
        9,
        {
          destroy: undefined,
        },
        cs.bind(null, i, n),
        null,
      );
    }
    return [r, a, e];
  }
  function cs(e, t) {
    e.action = t;
  }
  function ls(e) {
    var t = R();
    var n = F;
    if (n !== null) {
      return ss(t, n, e);
    }
    R();
    t = t.memoizedState;
    n = R();
    var r = n.queue.dispatch;
    n.memoizedState = e;
    return [t, r, false];
  }
  function us(e, t, n, r) {
    e = {
      tag: e,
      create: n,
      deps: r,
      inst: t,
      next: null,
    };
    t = P.updateQueue;
    if (t === null) {
      t = Io();
      P.updateQueue = t;
    }
    n = t.lastEffect;
    if (n === null) {
      t.lastEffect = e.next = e;
    } else {
      r = n.next;
      n.next = e;
      e.next = r;
      t.lastEffect = e;
    }
    return e;
  }
  function ds() {
    return R().memoizedState;
  }
  function fs(e, t, n, r) {
    var i = Fo();
    P.flags |= e;
    i.memoizedState = us(
      t | 1,
      {
        destroy: undefined,
      },
      n,
      r === undefined ? null : r,
    );
  }
  function ps(e, t, n, r) {
    var i = R();
    r = r === undefined ? null : r;
    var a = i.memoizedState.inst;
    if (F !== null && r !== null && Do(r, F.memoizedState.deps)) {
      i.memoizedState = us(t, a, n, r);
    } else {
      P.flags |= e;
      i.memoizedState = us(t | 1, a, n, r);
    }
  }
  function ms(e, t) {
    fs(8390656, 8, e, t);
  }
  function hs(e, t) {
    ps(2048, 8, e, t);
  }
  function gs(e) {
    P.flags |= 4;
    var t = P.updateQueue;
    if (t === null) {
      t = Io();
      P.updateQueue = t;
      t.events = [e];
    } else {
      var n = t.events;
      if (n === null) {
        t.events = [e];
      } else {
        n.push(e);
      }
    }
  }
  function _s(e) {
    var t = R().memoizedState;
    gs({
      ref: t,
      nextImpl: e,
    });
    return function () {
      if (W & 2) {
        throw Error(i(440));
      }
      return t.impl.apply(undefined, arguments);
    };
  }
  function vs(e, t) {
    return ps(4, 2, e, t);
  }
  function ys(e, t) {
    return ps(4, 4, e, t);
  }
  function bs(e, t) {
    if (typeof t == `function`) {
      e = e();
      var n = t(e);
      return function () {
        if (typeof n == `function`) {
          n();
        } else {
          t(null);
        }
      };
    }
    if (t != null) {
      e = e();
      t.current = e;
      return function () {
        t.current = null;
      };
    }
  }
  function xs(e, t, n) {
    n = n == null ? null : n.concat([e]);
    ps(4, 4, bs.bind(null, t, e), n);
  }
  function Ss() {}
  function Cs(e, t) {
    var n = R();
    t = t === undefined ? null : t;
    var r = n.memoizedState;
    if (t !== null && Do(t, r[1])) {
      return r[0];
    } else {
      n.memoizedState = [e, t];
      return e;
    }
  }
  function ws(e, t) {
    var n = R();
    t = t === undefined ? null : t;
    var r = n.memoizedState;
    if (t !== null && Do(t, r[1])) {
      return r[0];
    }
    r = e();
    if (So) {
      Ke(true);
      try {
        e();
      } finally {
        Ke(false);
      }
    }
    n.memoizedState = [r, t];
    return r;
  }
  function Ts(e, t, n) {
    if (n === undefined || (yo & 1073741824 && !(q & 261930))) {
      return (e.memoizedState = t);
    } else {
      e.memoizedState = n;
      e = mu();
      P.lanes |= e;
      Kl |= e;
      return n;
    }
  }
  function Es(e, t, n, r) {
    if (jr(n, t)) {
      return n;
    } else if (ao.current === null) {
      if (!(yo & 42) || (yo & 1073741824 && !(q & 261930))) {
        z = true;
        return (e.memoizedState = n);
      } else {
        e = mu();
        P.lanes |= e;
        Kl |= e;
        return t;
      }
    } else {
      e = Ts(e, n, r);
      if (!jr(e, t)) {
        z = true;
      }
      return e;
    }
  }
  function Ds(e, t, n, r, i) {
    var a = E.p;
    E.p = a !== 0 && a < 8 ? a : 8;
    var o = T.T;
    var s = {};
    T.T = s;
    zs(e, false, t, n);
    try {
      var c = i();
      var l = T.S;
      if (l !== null) {
        l(s, c);
      }
      if (typeof c == `object` && c && typeof c.then == `function`) {
        Rs(e, t, Ca(c, r), pu(e));
      } else {
        Rs(e, t, r, pu(e));
      }
    } catch (n) {
      Rs(
        e,
        t,
        {
          then: function () {},
          status: `rejected`,
          reason: n,
        },
        pu(),
      );
    } finally {
      E.p = a;
      if (o !== null && s.types !== null) {
        o.types = s.types;
      }
      T.T = o;
    }
  }
  function Os() {}
  function ks(e, t, n, r) {
    if (e.tag !== 5) {
      throw Error(i(476));
    }
    var a = As(e).queue;
    Ds(
      e,
      a,
      t,
      de,
      n === null
        ? Os
        : function () {
            js(e);
            return n(r);
          },
    );
  }
  function As(e) {
    var t = e.memoizedState;
    if (t !== null) {
      return t;
    }
    t = {
      memoizedState: de,
      baseState: de,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bo,
        lastRenderedState: de,
      },
      next: null,
    };
    var n = {};
    t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bo,
        lastRenderedState: n,
      },
      next: null,
    };
    e.memoizedState = t;
    e = e.alternate;
    if (e !== null) {
      e.memoizedState = t;
    }
    return t;
  }
  function js(e) {
    var t = As(e);
    if (t.next === null) {
      t = e.alternate.memoizedState;
    }
    Rs(e, t.next.queue, {}, pu());
  }
  function Ms() {
    return la(Qf);
  }
  function Ns() {
    return R().memoizedState;
  }
  function Ps() {
    return R().memoizedState;
  }
  function Fs(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = pu();
          e = Xa(n);
          var r = Za(t, e, n);
          if (r !== null) {
            hu(r, t, n);
            Qa(r, t, n);
          }
          t = {
            cache: ha(),
          };
          e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Is(e, t, n) {
    var r = pu();
    n = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: false,
      eagerState: null,
      next: null,
    };
    if (Bs(e)) {
      Vs(t, n);
    } else {
      n = di(e, t, n, r);
      if (n !== null) {
        hu(n, e, r);
        Hs(n, t, r);
      }
    }
  }
  function Ls(e, t, n) {
    Rs(e, t, n, pu());
  }
  function Rs(e, t, n, r) {
    var i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: false,
      eagerState: null,
      next: null,
    };
    if (Bs(e)) {
      Vs(t, i);
    } else {
      var a = e.alternate;
      if (e.lanes === 0 && (a === null || a.lanes === 0) && ((a = t.lastRenderedReducer), a !== null)) {
        try {
          var o = t.lastRenderedState;
          var s = a(o, n);
          i.hasEagerState = true;
          i.eagerState = s;
          if (jr(s, o)) {
            ui(e, t, i, 0);
            if (G === null) {
              li();
            }
            return false;
          }
        } catch {}
      }
      n = di(e, t, i, r);
      if (n !== null) {
        hu(n, e, r);
        Hs(n, t, r);
        return true;
      }
    }
    return false;
  }
  function zs(e, t, n, r) {
    r = {
      lane: 2,
      revertLane: dd(),
      gesture: null,
      action: r,
      hasEagerState: false,
      eagerState: null,
      next: null,
    };
    if (Bs(e)) {
      if (t) {
        throw Error(i(479));
      }
    } else {
      t = di(e, n, r, 2);
      if (t !== null) {
        hu(t, e, 2);
      }
    }
  }
  function Bs(e) {
    var t = e.alternate;
    return e === P || (t !== null && t === P);
  }
  function Vs(e, t) {
    xo = bo = true;
    var n = e.pending;
    if (n === null) {
      t.next = t;
    } else {
      t.next = n.next;
      n.next = t;
    }
    e.pending = t;
  }
  function Hs(e, t, n) {
    if (n & 4194048) {
      var r = t.lanes;
      r &= e.pendingLanes;
      n |= r;
      t.lanes = n;
      lt(e, n);
    }
  }
  var Us = {
    readContext: la,
    use: Ro,
    useCallback: L,
    useContext: L,
    useEffect: L,
    useImperativeHandle: L,
    useLayoutEffect: L,
    useInsertionEffect: L,
    useMemo: L,
    useReducer: L,
    useRef: L,
    useState: L,
    useDebugValue: L,
    useDeferredValue: L,
    useTransition: L,
    useSyncExternalStore: L,
    useId: L,
    useHostTransitionStatus: L,
    useFormState: L,
    useActionState: L,
    useOptimistic: L,
    useMemoCache: L,
    useCacheRefresh: L,
  };
  Us.useEffectEvent = L;
  var Ws = {
    readContext: la,
    use: Ro,
    useCallback: function (e, t) {
      Fo().memoizedState = [e, t === undefined ? null : t];
      return e;
    },
    useContext: la,
    useEffect: ms,
    useImperativeHandle: function (e, t, n) {
      n = n == null ? null : n.concat([e]);
      fs(4194308, 4, bs.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return fs(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      fs(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Fo();
      t = t === undefined ? null : t;
      var r = e();
      if (So) {
        Ke(true);
        try {
          e();
        } finally {
          Ke(false);
        }
      }
      n.memoizedState = [r, t];
      return r;
    },
    useReducer: function (e, t, n) {
      var r = Fo();
      if (n !== undefined) {
        var i = n(t);
        if (So) {
          Ke(true);
          try {
            n(t);
          } finally {
            Ke(false);
          }
        }
      } else {
        i = t;
      }
      r.memoizedState = r.baseState = i;
      e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: i,
      };
      r.queue = e;
      e = e.dispatch = Is.bind(null, P, e);
      return [r.memoizedState, e];
    },
    useRef: function (e) {
      var t = Fo();
      e = {
        current: e,
      };
      return (t.memoizedState = e);
    },
    useState: function (e) {
      e = Xo(e);
      var t = e.queue;
      var n = Ls.bind(null, P, t);
      t.dispatch = n;
      return [e.memoizedState, n];
    },
    useDebugValue: Ss,
    useDeferredValue: function (e, t) {
      return Ts(Fo(), e, t);
    },
    useTransition: function () {
      var e = Xo(false);
      e = Ds.bind(null, P, e.queue, true, false);
      Fo().memoizedState = e;
      return [false, e];
    },
    useSyncExternalStore: function (e, t, n) {
      var r = P;
      var a = Fo();
      if (j) {
        if (n === undefined) {
          throw Error(i(407));
        }
        n = n();
      } else {
        n = t();
        if (G === null) {
          throw Error(i(349));
        }
        if (!(q & 127)) {
          Go(r, t, n);
        }
      }
      a.memoizedState = n;
      var o = {
        value: n,
        getSnapshot: t,
      };
      a.queue = o;
      ms(qo.bind(null, r, o, e), [e]);
      r.flags |= 2048;
      us(
        9,
        {
          destroy: undefined,
        },
        Ko.bind(null, r, o, n, t),
        null,
      );
      return n;
    },
    useId: function () {
      var e = Fo();
      var t = G.identifierPrefix;
      if (j) {
        var n = Ii;
        var r = Fi;
        n = (r & ~(1 << (32 - qe(r) - 1))).toString(32) + n;
        t = `_${t}R_${n}`;
        n = Co++;
        if (n > 0) {
          t += `H${n.toString(32)}`;
        }
        t += `_`;
      } else {
        n = Eo++;
        t = `_${t}r_${n.toString(32)}_`;
      }
      return (e.memoizedState = t);
    },
    useHostTransitionStatus: Ms,
    useFormState: as,
    useActionState: as,
    useOptimistic: function (e) {
      var t = Fo();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      t.queue = n;
      t = zs.bind(null, P, true, n);
      n.dispatch = t;
      return [e, t];
    },
    useMemoCache: zo,
    useCacheRefresh: function () {
      return (Fo().memoizedState = Fs.bind(null, P));
    },
    useEffectEvent: function (e) {
      var t = Fo();
      var n = {
        impl: e,
      };
      t.memoizedState = n;
      return function () {
        if (W & 2) {
          throw Error(i(440));
        }
        return n.impl.apply(undefined, arguments);
      };
    },
  };
  var Gs = {
    readContext: la,
    use: Ro,
    useCallback: Cs,
    useContext: la,
    useEffect: hs,
    useImperativeHandle: xs,
    useInsertionEffect: vs,
    useLayoutEffect: ys,
    useMemo: ws,
    useReducer: Vo,
    useRef: ds,
    useState: function () {
      return Vo(Bo);
    },
    useDebugValue: Ss,
    useDeferredValue: function (e, t) {
      return Es(R(), F.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Vo(Bo)[0];
      var t = R().memoizedState;
      return [typeof e == `boolean` ? e : Lo(e), t];
    },
    useSyncExternalStore: Wo,
    useId: Ns,
    useHostTransitionStatus: Ms,
    useFormState: os,
    useActionState: os,
    useOptimistic: function (e, t) {
      return Zo(R(), F, e, t);
    },
    useMemoCache: zo,
    useCacheRefresh: Ps,
  };
  Gs.useEffectEvent = _s;
  var Ks = {
    readContext: la,
    use: Ro,
    useCallback: Cs,
    useContext: la,
    useEffect: hs,
    useImperativeHandle: xs,
    useInsertionEffect: vs,
    useLayoutEffect: ys,
    useMemo: ws,
    useReducer: Uo,
    useRef: ds,
    useState: function () {
      return Uo(Bo);
    },
    useDebugValue: Ss,
    useDeferredValue: function (e, t) {
      var n = R();
      if (F === null) {
        return Ts(n, e, t);
      } else {
        return Es(n, F.memoizedState, e, t);
      }
    },
    useTransition: function () {
      var e = Uo(Bo)[0];
      var t = R().memoizedState;
      return [typeof e == `boolean` ? e : Lo(e), t];
    },
    useSyncExternalStore: Wo,
    useId: Ns,
    useHostTransitionStatus: Ms,
    useFormState: ls,
    useActionState: ls,
    useOptimistic: function (e, t) {
      var n = R();
      if (F === null) {
        n.baseState = e;
        return [e, n.queue.dispatch];
      } else {
        return Zo(n, F, e, t);
      }
    },
    useMemoCache: zo,
    useCacheRefresh: Ps,
  };
  Ks.useEffectEvent = _s;
  function qs(e, t, n, r) {
    t = e.memoizedState;
    n = n(r, t);
    n = n == null ? t : h({}, t, n);
    e.memoizedState = n;
    if (e.lanes === 0) {
      e.updateQueue.baseState = n;
    }
  }
  var Js = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = pu();
      var i = Xa(r);
      i.payload = t;
      if (n != null) {
        i.callback = n;
      }
      t = Za(e, i, r);
      if (t !== null) {
        hu(t, e, r);
        Qa(t, e, r);
      }
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = pu();
      var i = Xa(r);
      i.tag = 1;
      i.payload = t;
      if (n != null) {
        i.callback = n;
      }
      t = Za(e, i, r);
      if (t !== null) {
        hu(t, e, r);
        Qa(t, e, r);
      }
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = pu();
      var r = Xa(n);
      r.tag = 2;
      if (t != null) {
        r.callback = t;
      }
      t = Za(e, r, n);
      if (t !== null) {
        hu(t, e, n);
        Qa(t, e, n);
      }
    },
  };
  function Ys(e, t, n, r, i, a, o) {
    e = e.stateNode;
    if (typeof e.shouldComponentUpdate == `function`) {
      return e.shouldComponentUpdate(r, a, o);
    } else if (t.prototype && t.prototype.isPureReactComponent) {
      return !Mr(n, r) || !Mr(i, a);
    } else {
      return true;
    }
  }
  function Xs(e, t, n, r) {
    e = t.state;
    if (typeof t.componentWillReceiveProps == `function`) {
      t.componentWillReceiveProps(n, r);
    }
    if (typeof t.UNSAFE_componentWillReceiveProps == `function`) {
      t.UNSAFE_componentWillReceiveProps(n, r);
    }
    if (t.state !== e) {
      Js.enqueueReplaceState(t, t.state, null);
    }
  }
  function Zs(e, t) {
    var n = t;
    if (`ref` in t) {
      n = {};
      for (var r in t) {
        if (r !== `ref`) {
          n[r] = t[r];
        }
      }
    }
    if ((e = e.defaultProps)) {
      if (n === t) {
        n = h({}, n);
      }
      for (var i in e) {
        if (n[i] === undefined) {
          n[i] = e[i];
        }
      }
    }
    return n;
  }
  function Qs(e) {
    ai(e);
  }
  function $s(e) {
    console.error(e);
  }
  function ec(e) {
    ai(e);
  }
  function tc(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, {
        componentStack: t.stack,
      });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function nc(e, t, n) {
    try {
      var r = e.onCaughtError;
      r(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function rc(e, t, n) {
    n = Xa(n);
    n.tag = 3;
    n.payload = {
      element: null,
    };
    n.callback = function () {
      tc(e, t);
    };
    return n;
  }
  function ic(e) {
    e = Xa(e);
    e.tag = 3;
    return e;
  }
  function ac(e, t, n, r) {
    var i = n.type.getDerivedStateFromError;
    if (typeof i == `function`) {
      var a = r.value;
      e.payload = function () {
        return i(a);
      };
      e.callback = function () {
        nc(t, n, r);
      };
    }
    var o = n.stateNode;
    if (o !== null && typeof o.componentDidCatch == `function`) {
      e.callback = function () {
        nc(t, n, r);
        if (typeof i != `function`) {
          if (iu === null) {
            iu = new Set([this]);
          } else {
            iu.add(this);
          }
        }
        var e = r.stack;
        this.componentDidCatch(r.value, {
          componentStack: e === null ? `` : e,
        });
      };
    }
  }
  function oc(e, t, n, r, a) {
    n.flags |= 32768;
    if (typeof r == `object` && r && typeof r.then == `function`) {
      t = n.alternate;
      if (t !== null) {
        oa(t, n, a, true);
      }
      n = uo.current;
      if (n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            if (fo === null) {
              Du();
            } else if (n.alternate === null && Y === 0) {
              Y = 3;
            }
            n.flags &= -257;
            n.flags |= 65536;
            n.lanes = a;
            if (r === Ma) {
              n.flags |= 16384;
            } else {
              t = n.updateQueue;
              if (t === null) {
                n.updateQueue = new Set([r]);
              } else {
                t.add(r);
              }
              Gu(e, r, a);
            }
            return false;
          case 22:
            n.flags |= 65536;
            if (r === Ma) {
              n.flags |= 16384;
            } else {
              t = n.updateQueue;
              if (t === null) {
                t = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: new Set([r]),
                };
                n.updateQueue = t;
              } else {
                n = t.retryQueue;
                if (n === null) {
                  t.retryQueue = new Set([r]);
                } else {
                  n.add(r);
                }
              }
              Gu(e, r, a);
            }
            return false;
        }
        throw Error(i(435, n.tag));
      }
      Gu(e, r, a);
      Du();
      return false;
    }
    if (j) {
      t = uo.current;
      if (t === null) {
        if (r !== Gi) {
          t = Error(i(423), {
            cause: r,
          });
          Qi(Di(t, n));
        }
        e = e.current.alternate;
        e.flags |= 65536;
        a &= -a;
        e.lanes |= a;
        r = Di(r, n);
        a = rc(e.stateNode, r, a);
        $a(e, a);
        if (Y !== 4) {
          Y = 2;
        }
      } else {
        if (!(t.flags & 65536)) {
          t.flags |= 256;
        }
        t.flags |= 65536;
        t.lanes = a;
        if (r !== Gi) {
          e = Error(i(422), {
            cause: r,
          });
          Qi(Di(e, n));
        }
      }
      return false;
    }
    var o = Error(i(520), {
      cause: r,
    });
    o = Di(o, n);
    if (Zl === null) {
      Zl = [o];
    } else {
      Zl.push(o);
    }
    if (Y !== 4) {
      Y = 2;
    }
    if (t === null) {
      return true;
    }
    r = Di(r, n);
    n = t;
    do {
      switch (n.tag) {
        case 3:
          n.flags |= 65536;
          e = a & -a;
          n.lanes |= e;
          e = rc(n.stateNode, r, e);
          $a(n, e);
          return false;
        case 1:
          t = n.type;
          o = n.stateNode;
          if (
            !(n.flags & 128) &&
            (typeof t.getDerivedStateFromError == `function` ||
              (o !== null && typeof o.componentDidCatch == `function` && (iu === null || !iu.has(o))))
          ) {
            n.flags |= 65536;
            a &= -a;
            n.lanes |= a;
            a = ic(a);
            ac(a, e, n, r);
            $a(n, a);
            return false;
          }
      }
      n = n.return;
    } while (n !== null);
    return false;
  }
  var sc = Error(i(461));
  var z = false;
  function cc(e, t, n, r) {
    t.child = e === null ? Ka(t, null, n, r) : Ga(t, e.child, n, r);
  }
  function lc(e, t, n, r, i) {
    n = n.render;
    var a = t.ref;
    if (`ref` in r) {
      var o = {};
      for (var s in r) {
        if (s !== `ref`) {
          o[s] = r[s];
        }
      }
    } else {
      o = r;
    }
    ca(t);
    r = Oo(e, t, n, o, a, i);
    s = Mo();
    if (e !== null && !z) {
      No(e, t, i);
      return Nc(e, t, i);
    } else {
      if (j && s) {
        zi(t);
      }
      t.flags |= 1;
      cc(e, t, r, i);
      return t.child;
    }
  }
  function uc(e, t, n, r, i) {
    if (e === null) {
      var a = n.type;
      if (typeof a == `function` && !vi(a) && a.defaultProps === undefined && n.compare === null) {
        t.tag = 15;
        t.type = a;
        return dc(e, t, a, r, i);
      } else {
        e = xi(n.type, null, r, t, t.mode, i);
        e.ref = t.ref;
        e.return = t;
        return (t.child = e);
      }
    }
    a = e.child;
    if (!Pc(e, i)) {
      var o = a.memoizedProps;
      n = n.compare;
      n = n === null ? Mr : n;
      if (n(o, r) && e.ref === t.ref) {
        return Nc(e, t, i);
      }
    }
    t.flags |= 1;
    e = yi(a, r);
    e.ref = t.ref;
    e.return = t;
    return (t.child = e);
  }
  function dc(e, t, n, r, i) {
    if (e !== null) {
      var a = e.memoizedProps;
      if (Mr(a, r) && e.ref === t.ref) {
        z = false;
        t.pendingProps = r = a;
        if (Pc(e, i)) {
          if (e.flags & 131072) {
            z = true;
          }
        } else {
          t.lanes = e.lanes;
          return Nc(e, t, i);
        }
      }
    }
    return yc(e, t, n, r, i);
  }
  function fc(e, t, n, r) {
    var i = r.children;
    var a = e === null ? null : e.memoizedState;
    if (e === null && t.stateNode === null) {
      t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      };
    }
    if (r.mode === `hidden`) {
      if (t.flags & 128) {
        a = a === null ? n : a.baseLanes | n;
        if (e !== null) {
          r = t.child = e.child;
          i = 0;
          while (r !== null) {
            i = i | r.lanes | r.childLanes;
            r = r.sibling;
          }
          r = i & ~a;
        } else {
          r = 0;
          t.child = null;
        }
        return mc(e, t, a, n, r);
      }
      if (n & 536870912) {
        t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
        };
        if (e !== null) {
          Da(t, a === null ? null : a.cachePool);
        }
        if (a === null) {
          co();
        } else {
          so(t, a);
        }
        ho(t);
      } else {
        r = t.lanes = 536870912;
        return mc(e, t, a === null ? n : a.baseLanes | n, n, r);
      }
    } else if (a === null) {
      if (e !== null) {
        Da(t, null);
      }
      co();
      go(t);
    } else {
      Da(t, a.cachePool);
      so(t, a);
      go(t);
      t.memoizedState = null;
    }
    cc(e, t, i, n);
    return t.child;
  }
  function pc(e, t) {
    if ((e === null || e.tag !== 22) && t.stateNode === null) {
      t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      };
    }
    return t.sibling;
  }
  function mc(e, t, n, r, i) {
    var a = Ea();
    a =
      a === null
        ? null
        : {
            parent: M._currentValue,
            pool: a,
          };
    t.memoizedState = {
      baseLanes: n,
      cachePool: a,
    };
    if (e !== null) {
      Da(t, null);
    }
    co();
    ho(t);
    if (e !== null) {
      oa(e, t, r, true);
    }
    t.childLanes = i;
    return null;
  }
  function hc(e, t) {
    t = Oc(
      {
        mode: t.mode,
        children: t.children,
      },
      e.mode,
    );
    t.ref = e.ref;
    e.child = t;
    t.return = e;
    return t;
  }
  function gc(e, t, n) {
    Ga(t, e.child, null, n);
    e = hc(t, t.pendingProps);
    e.flags |= 2;
    _o(t);
    t.memoizedState = null;
    return e;
  }
  function _c(e, t, n) {
    var r = t.pendingProps;
    var a = (t.flags & 128) != 0;
    t.flags &= -129;
    if (e === null) {
      if (j) {
        if (r.mode === `hidden`) {
          e = hc(t, r);
          t.lanes = 536870912;
          return pc(null, e);
        }
        mo(t);
        if ((e = A)) {
          e = rf(e, Wi);
          e = e !== null && e.data === `&` ? e : null;
          if (e !== null) {
            t.memoizedState = {
              dehydrated: e,
              treeContext:
                Pi === null
                  ? null
                  : {
                      id: Fi,
                      overflow: Ii,
                    },
              retryLane: 536870912,
              hydrationErrors: null,
            };
            n = wi(e);
            n.return = t;
            t.child = n;
            Hi = t;
            A = null;
          }
        } else {
          e = null;
        }
        if (e === null) {
          throw Ki(t);
        }
        t.lanes = 536870912;
        return null;
      }
      return hc(t, r);
    }
    var o = e.memoizedState;
    if (o !== null) {
      var s = o.dehydrated;
      mo(t);
      if (a) {
        if (t.flags & 256) {
          t.flags &= -257;
          t = gc(e, t, n);
        } else if (t.memoizedState !== null) {
          t.child = e.child;
          t.flags |= 128;
          t = null;
        } else {
          throw Error(i(558));
        }
      } else {
        if (!z) {
          oa(e, t, n, false);
        }
        a = (n & e.childLanes) !== 0;
        if (z || a) {
          r = G;
          if (r !== null && ((s = ut(r, n)), s !== 0 && s !== o.retryLane)) {
            o.retryLane = s;
            fi(e, s);
            hu(r, e, s);
            throw sc;
          }
          Du();
          t = gc(e, t, n);
        } else {
          e = o.treeContext;
          A = cf(s.nextSibling);
          Hi = t;
          j = true;
          Ui = null;
          Wi = false;
          if (e !== null) {
            Vi(t, e);
          }
          t = hc(t, r);
          t.flags |= 4096;
        }
      }
      return t;
    }
    e = yi(e.child, {
      mode: r.mode,
      children: r.children,
    });
    e.ref = t.ref;
    t.child = e;
    e.return = t;
    return e;
  }
  function vc(e, t) {
    var n = t.ref;
    if (n === null) {
      if (e !== null && e.ref !== null) {
        t.flags |= 4194816;
      }
    } else {
      if (typeof n != `function` && typeof n != `object`) {
        throw Error(i(284));
      }
      if (e === null || e.ref !== n) {
        t.flags |= 4194816;
      }
    }
  }
  function yc(e, t, n, r, i) {
    ca(t);
    n = Oo(e, t, n, r, undefined, i);
    r = Mo();
    if (e !== null && !z) {
      No(e, t, i);
      return Nc(e, t, i);
    } else {
      if (j && r) {
        zi(t);
      }
      t.flags |= 1;
      cc(e, t, n, i);
      return t.child;
    }
  }
  function bc(e, t, n, r, i, a) {
    ca(t);
    t.updateQueue = null;
    n = Ao(t, r, n, i);
    ko(e);
    r = Mo();
    if (e !== null && !z) {
      No(e, t, a);
      return Nc(e, t, a);
    } else {
      if (j && r) {
        zi(t);
      }
      t.flags |= 1;
      cc(e, t, n, a);
      return t.child;
    }
  }
  function xc(e, t, n, r, i) {
    ca(t);
    if (t.stateNode === null) {
      var a = hi;
      var o = n.contextType;
      if (typeof o == `object` && o) {
        a = la(o);
      }
      a = new n(r, a);
      t.memoizedState = a.state ?? null;
      a.updater = Js;
      t.stateNode = a;
      a._reactInternals = t;
      a = t.stateNode;
      a.props = r;
      a.state = t.memoizedState;
      a.refs = {};
      Ja(t);
      o = n.contextType;
      a.context = typeof o == `object` && o ? la(o) : hi;
      a.state = t.memoizedState;
      o = n.getDerivedStateFromProps;
      if (typeof o == `function`) {
        qs(t, n, o, r);
        a.state = t.memoizedState;
      }
      if (
        typeof n.getDerivedStateFromProps != `function` &&
        typeof a.getSnapshotBeforeUpdate != `function` &&
        (typeof a.UNSAFE_componentWillMount == `function` || typeof a.componentWillMount == `function`)
      ) {
        o = a.state;
        if (typeof a.componentWillMount == `function`) {
          a.componentWillMount();
        }
        if (typeof a.UNSAFE_componentWillMount == `function`) {
          a.UNSAFE_componentWillMount();
        }
        if (o !== a.state) {
          Js.enqueueReplaceState(a, a.state, null);
        }
        no(t, r, a, i);
        to();
        a.state = t.memoizedState;
      }
      if (typeof a.componentDidMount == `function`) {
        t.flags |= 4194308;
      }
      r = true;
    } else if (e === null) {
      a = t.stateNode;
      var s = t.memoizedProps;
      var c = Zs(n, s);
      a.props = c;
      var l = a.context;
      var u = n.contextType;
      o = hi;
      if (typeof u == `object` && u) {
        o = la(u);
      }
      var d = n.getDerivedStateFromProps;
      u = typeof d == `function` || typeof a.getSnapshotBeforeUpdate == `function`;
      s = t.pendingProps !== s;
      if (
        !u &&
        (typeof a.UNSAFE_componentWillReceiveProps == `function` ||
          typeof a.componentWillReceiveProps == `function`)
      ) {
        if (s || l !== o) {
          Xs(t, a, r, o);
        }
      }
      qa = false;
      var f = t.memoizedState;
      a.state = f;
      no(t, r, a, i);
      to();
      l = t.memoizedState;
      if (s || f !== l || qa) {
        if (typeof d == `function`) {
          qs(t, n, d, r);
          l = t.memoizedState;
        }
        if ((c = qa || Ys(t, n, c, r, f, l, o))) {
          if (
            !u &&
            (typeof a.UNSAFE_componentWillMount == `function` || typeof a.componentWillMount == `function`)
          ) {
            if (typeof a.componentWillMount == `function`) {
              a.componentWillMount();
            }
            if (typeof a.UNSAFE_componentWillMount == `function`) {
              a.UNSAFE_componentWillMount();
            }
          }
          if (typeof a.componentDidMount == `function`) {
            t.flags |= 4194308;
          }
        } else {
          if (typeof a.componentDidMount == `function`) {
            t.flags |= 4194308;
          }
          t.memoizedProps = r;
          t.memoizedState = l;
        }
        a.props = r;
        a.state = l;
        a.context = o;
        r = c;
      } else {
        if (typeof a.componentDidMount == `function`) {
          t.flags |= 4194308;
        }
        r = false;
      }
    } else {
      a = t.stateNode;
      Ya(e, t);
      o = t.memoizedProps;
      u = Zs(n, o);
      a.props = u;
      d = t.pendingProps;
      f = a.context;
      l = n.contextType;
      c = hi;
      if (typeof l == `object` && l) {
        c = la(l);
      }
      s = n.getDerivedStateFromProps;
      if (
        !(l = typeof s == `function` || typeof a.getSnapshotBeforeUpdate == `function`) &&
        (typeof a.UNSAFE_componentWillReceiveProps == `function` ||
          typeof a.componentWillReceiveProps == `function`)
      ) {
        if (o !== d || f !== c) {
          Xs(t, a, r, c);
        }
      }
      qa = false;
      f = t.memoizedState;
      a.state = f;
      no(t, r, a, i);
      to();
      var p = t.memoizedState;
      if (o !== d || f !== p || qa || (e !== null && e.dependencies !== null && sa(e.dependencies))) {
        if (typeof s == `function`) {
          qs(t, n, s, r);
          p = t.memoizedState;
        }
        if (
          (u = qa || Ys(t, n, u, r, f, p, c) || (e !== null && e.dependencies !== null && sa(e.dependencies)))
        ) {
          if (
            !l &&
            (typeof a.UNSAFE_componentWillUpdate == `function` || typeof a.componentWillUpdate == `function`)
          ) {
            if (typeof a.componentWillUpdate == `function`) {
              a.componentWillUpdate(r, p, c);
            }
            if (typeof a.UNSAFE_componentWillUpdate == `function`) {
              a.UNSAFE_componentWillUpdate(r, p, c);
            }
          }
          if (typeof a.componentDidUpdate == `function`) {
            t.flags |= 4;
          }
          if (typeof a.getSnapshotBeforeUpdate == `function`) {
            t.flags |= 1024;
          }
        } else {
          if (typeof a.componentDidUpdate == `function` && (o !== e.memoizedProps || f !== e.memoizedState)) {
            t.flags |= 4;
          }
          if (
            typeof a.getSnapshotBeforeUpdate == `function` &&
            (o !== e.memoizedProps || f !== e.memoizedState)
          ) {
            t.flags |= 1024;
          }
          t.memoizedProps = r;
          t.memoizedState = p;
        }
        a.props = r;
        a.state = p;
        a.context = c;
        r = u;
      } else {
        if (typeof a.componentDidUpdate == `function` && (o !== e.memoizedProps || f !== e.memoizedState)) {
          t.flags |= 4;
        }
        if (
          typeof a.getSnapshotBeforeUpdate == `function` &&
          (o !== e.memoizedProps || f !== e.memoizedState)
        ) {
          t.flags |= 1024;
        }
        r = false;
      }
    }
    a = r;
    vc(e, t);
    r = (t.flags & 128) != 0;
    if (a || r) {
      a = t.stateNode;
      n = r && typeof n.getDerivedStateFromError != `function` ? null : a.render();
      t.flags |= 1;
      if (e !== null && r) {
        t.child = Ga(t, e.child, null, i);
        t.child = Ga(t, null, n, i);
      } else {
        cc(e, t, n, i);
      }
      t.memoizedState = a.state;
      e = t.child;
    } else {
      e = Nc(e, t, i);
    }
    return e;
  }
  function Sc(e, t, n, r) {
    Xi();
    t.flags |= 256;
    cc(e, t, n, r);
    return t.child;
  }
  var Cc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function wc(e) {
    return {
      baseLanes: e,
      cachePool: Oa(),
    };
  }
  function Tc(e, t, n) {
    e = e === null ? 0 : e.childLanes & ~n;
    if (t) {
      e |= Yl;
    }
    return e;
  }
  function Ec(e, t, n) {
    var r = t.pendingProps;
    var a = false;
    var o = (t.flags & 128) != 0;
    var s;
    if (!(s = o)) {
      s = e !== null && e.memoizedState === null ? false : (N.current & 2) != 0;
    }
    if (s) {
      a = true;
      t.flags &= -129;
    }
    s = (t.flags & 32) != 0;
    t.flags &= -33;
    if (e === null) {
      if (j) {
        if (a) {
          po(t);
        } else {
          go(t);
        }
        if ((e = A)) {
          e = rf(e, Wi);
          e = e !== null && e.data !== `&` ? e : null;
          if (e !== null) {
            t.memoizedState = {
              dehydrated: e,
              treeContext:
                Pi === null
                  ? null
                  : {
                      id: Fi,
                      overflow: Ii,
                    },
              retryLane: 536870912,
              hydrationErrors: null,
            };
            n = wi(e);
            n.return = t;
            t.child = n;
            Hi = t;
            A = null;
          }
        } else {
          e = null;
        }
        if (e === null) {
          throw Ki(t);
        }
        if (of(e)) {
          t.lanes = 32;
        } else {
          t.lanes = 536870912;
        }
        return null;
      }
      var c = r.children;
      r = r.fallback;
      if (a) {
        go(t);
        a = t.mode;
        c = Oc(
          {
            mode: `hidden`,
            children: c,
          },
          a,
        );
        r = Si(r, a, n, null);
        c.return = t;
        r.return = t;
        c.sibling = r;
        t.child = c;
        r = t.child;
        r.memoizedState = wc(n);
        r.childLanes = Tc(e, s, n);
        t.memoizedState = Cc;
        return pc(null, r);
      } else {
        po(t);
        return Dc(t, c);
      }
    }
    var l = e.memoizedState;
    if (l !== null && ((c = l.dehydrated), c !== null)) {
      if (o) {
        if (t.flags & 256) {
          po(t);
          t.flags &= -257;
          t = kc(e, t, n);
        } else if (t.memoizedState === null) {
          go(t);
          c = r.fallback;
          a = t.mode;
          r = Oc(
            {
              mode: `visible`,
              children: r.children,
            },
            a,
          );
          c = Si(c, a, n, null);
          c.flags |= 2;
          r.return = t;
          c.return = t;
          r.sibling = c;
          t.child = r;
          Ga(t, e.child, null, n);
          r = t.child;
          r.memoizedState = wc(n);
          r.childLanes = Tc(e, s, n);
          t.memoizedState = Cc;
          t = pc(null, r);
        } else {
          go(t);
          t.child = e.child;
          t.flags |= 128;
          t = null;
        }
      } else {
        po(t);
        if (of(c)) {
          s = c.nextSibling && c.nextSibling.dataset;
          if (s) {
            var u = s.dgst;
          }
          s = u;
          r = Error(i(419));
          r.stack = ``;
          r.digest = s;
          Qi({
            value: r,
            source: null,
            stack: null,
          });
          t = kc(e, t, n);
        } else {
          if (!z) {
            oa(e, t, n, false);
          }
          s = (n & e.childLanes) !== 0;
          if (z || s) {
            s = G;
            if (s !== null && ((r = ut(s, n)), r !== 0 && r !== l.retryLane)) {
              l.retryLane = r;
              fi(e, r);
              hu(s, e, r);
              throw sc;
            }
            if (!af(c)) {
              Du();
            }
            t = kc(e, t, n);
          } else if (af(c)) {
            t.flags |= 192;
            t.child = e.child;
            t = null;
          } else {
            e = l.treeContext;
            A = cf(c.nextSibling);
            Hi = t;
            j = true;
            Ui = null;
            Wi = false;
            if (e !== null) {
              Vi(t, e);
            }
            t = Dc(t, r.children);
            t.flags |= 4096;
          }
        }
      }
      return t;
    }
    if (a) {
      go(t);
      c = r.fallback;
      a = t.mode;
      l = e.child;
      u = l.sibling;
      r = yi(l, {
        mode: `hidden`,
        children: r.children,
      });
      r.subtreeFlags = l.subtreeFlags & 65011712;
      if (u === null) {
        c = Si(c, a, n, null);
        c.flags |= 2;
      } else {
        c = yi(u, c);
      }
      c.return = t;
      r.return = t;
      r.sibling = c;
      t.child = r;
      pc(null, r);
      r = t.child;
      c = e.child.memoizedState;
      if (c === null) {
        c = wc(n);
      } else {
        a = c.cachePool;
        if (a === null) {
          a = Oa();
        } else {
          l = M._currentValue;
          a =
            a.parent === l
              ? a
              : {
                  parent: l,
                  pool: l,
                };
        }
        c = {
          baseLanes: c.baseLanes | n,
          cachePool: a,
        };
      }
      r.memoizedState = c;
      r.childLanes = Tc(e, s, n);
      t.memoizedState = Cc;
      return pc(e.child, r);
    } else {
      po(t);
      n = e.child;
      e = n.sibling;
      n = yi(n, {
        mode: `visible`,
        children: r.children,
      });
      n.return = t;
      n.sibling = null;
      if (e !== null) {
        s = t.deletions;
        if (s === null) {
          t.deletions = [e];
          t.flags |= 16;
        } else {
          s.push(e);
        }
      }
      t.child = n;
      t.memoizedState = null;
      return n;
    }
  }
  function Dc(e, t) {
    t = Oc(
      {
        mode: `visible`,
        children: t,
      },
      e.mode,
    );
    t.return = e;
    return (e.child = t);
  }
  function Oc(e, t) {
    e = _i(22, e, null, t);
    e.lanes = 0;
    return e;
  }
  function kc(e, t, n) {
    Ga(t, e.child, null, n);
    e = Dc(t, t.pendingProps.children);
    e.flags |= 2;
    t.memoizedState = null;
    return e;
  }
  function Ac(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    if (r !== null) {
      r.lanes |= t;
    }
    ia(e.return, t, n);
  }
  function jc(e, t, n, r, i, a) {
    var o = e.memoizedState;
    if (o === null) {
      e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
        treeForkCount: a,
      };
    } else {
      o.isBackwards = t;
      o.rendering = null;
      o.renderingStartTime = 0;
      o.last = r;
      o.tail = n;
      o.tailMode = i;
      o.treeForkCount = a;
    }
  }
  function Mc(e, t, n) {
    var r = t.pendingProps;
    var i = r.revealOrder;
    var a = r.tail;
    r = r.children;
    var o = N.current;
    var s = (o & 2) != 0;
    if (s) {
      o = (o & 1) | 2;
      t.flags |= 128;
    } else {
      o &= 1;
    }
    O(N, o);
    cc(e, t, r, n);
    r = j ? ji : 0;
    if (!s && e !== null && e.flags & 128) {
      a: for (e = t.child; e !== null; ) {
        if (e.tag === 13) {
          if (e.memoizedState !== null) {
            Ac(e, n, t);
          }
        } else if (e.tag === 19) {
          Ac(e, n, t);
        } else if (e.child !== null) {
          e.child.return = e;
          e = e.child;
          continue;
        }
        if (e === t) {
          break a;
        }
        while (e.sibling === null) {
          if (e.return === null || e.return === t) {
            break a;
          }
          e = e.return;
        }
        e.sibling.return = e.return;
        e = e.sibling;
      }
    }
    switch (i) {
      case `forwards`:
        n = t.child;
        i = null;
        while (n !== null) {
          e = n.alternate;
          if (e !== null && vo(e) === null) {
            i = n;
          }
          n = n.sibling;
        }
        n = i;
        if (n === null) {
          i = t.child;
          t.child = null;
        } else {
          i = n.sibling;
          n.sibling = null;
        }
        jc(t, false, i, n, a, r);
        break;
      case `backwards`:
      case `unstable_legacy-backwards`:
        n = null;
        i = t.child;
        t.child = null;
        while (i !== null) {
          e = i.alternate;
          if (e !== null && vo(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling;
          i.sibling = n;
          n = i;
          i = e;
        }
        jc(t, true, n, null, a, r);
        break;
      case `together`:
        jc(t, false, null, null, undefined, r);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Nc(e, t, n) {
    if (e !== null) {
      t.dependencies = e.dependencies;
    }
    Kl |= t.lanes;
    if ((n & t.childLanes) === 0) {
      if (e !== null) {
        oa(e, t, n, false);
        if ((n & t.childLanes) === 0) {
          return null;
        }
      } else {
        return null;
      }
    }
    if (e !== null && t.child !== e.child) {
      throw Error(i(153));
    }
    if (t.child !== null) {
      e = t.child;
      n = yi(e, e.pendingProps);
      t.child = n;
      n.return = t;
      while (e.sibling !== null) {
        e = e.sibling;
        n = n.sibling = yi(e, e.pendingProps);
        n.return = t;
      }
      n.sibling = null;
    }
    return t.child;
  }
  function Pc(e, t) {
    if ((e.lanes & t) === 0) {
      e = e.dependencies;
      return e !== null && !!sa(e);
    } else {
      return true;
    }
  }
  function Fc(e, t, n) {
    switch (t.tag) {
      case 3:
        ye(t, t.stateNode.containerInfo);
        na(t, M, e.memoizedState.cache);
        Xi();
        break;
      case 27:
      case 5:
        xe(t);
        break;
      case 4:
        ye(t, t.stateNode.containerInfo);
        break;
      case 10:
        na(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) {
          t.flags |= 128;
          mo(t);
          return null;
        }
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null) {
          if (r.dehydrated === null) {
            if ((n & t.child.childLanes) === 0) {
              po(t);
              e = Nc(e, t, n);
              if (e === null) {
                return null;
              } else {
                return e.sibling;
              }
            } else {
              return Ec(e, t, n);
            }
          } else {
            po(t);
            t.flags |= 128;
            return null;
          }
        }
        po(t);
        break;
      case 19:
        var i = (e.flags & 128) != 0;
        r = (n & t.childLanes) !== 0;
        r ||= (oa(e, t, n, false), (n & t.childLanes) !== 0);
        if (i) {
          if (r) {
            return Mc(e, t, n);
          }
          t.flags |= 128;
        }
        i = t.memoizedState;
        if (i !== null) {
          i.rendering = null;
          i.tail = null;
          i.lastEffect = null;
        }
        O(N, N.current);
        if (r) {
          break;
        }
        return null;
      case 22:
        t.lanes = 0;
        return fc(e, t, n, t.pendingProps);
      case 24:
        na(t, M, e.memoizedState.cache);
    }
    return Nc(e, t, n);
  }
  function Ic(e, t, n) {
    if (e !== null) {
      if (e.memoizedProps !== t.pendingProps) {
        z = true;
      } else {
        if (!Pc(e, n) && !(t.flags & 128)) {
          z = false;
          return Fc(e, t, n);
        }
        z = !!(e.flags & 131072);
      }
    } else {
      z = false;
      if (j && t.flags & 1048576) {
        Ri(t, ji, t.index);
      }
    }
    t.lanes = 0;
    switch (t.tag) {
      case 16:
        a: {
          var r = t.pendingProps;
          e = Fa(t.elementType);
          t.type = e;
          if (typeof e == `function`) {
            if (vi(e)) {
              r = Zs(e, r);
              t.tag = 1;
              t = xc(null, t, e, r, n);
            } else {
              t.tag = 0;
              t = yc(null, t, e, r, n);
            }
          } else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === C) {
                t.tag = 11;
                t = lc(null, t, e, r, n);
                break a;
              } else if (a === re) {
                t.tag = 14;
                t = uc(null, t, e, r, n);
                break a;
              }
            }
            t = le(e) || e;
            throw Error(i(306, t, ``));
          }
        }
        return t;
      case 0:
        return yc(e, t, t.type, t.pendingProps, n);
      case 1:
        r = t.type;
        a = Zs(r, t.pendingProps);
        return xc(e, t, r, a, n);
      case 3:
        a: {
          ye(t, t.stateNode.containerInfo);
          if (e === null) {
            throw Error(i(387));
          }
          r = t.pendingProps;
          var o = t.memoizedState;
          a = o.element;
          Ya(e, t);
          no(t, r, null, n);
          var s = t.memoizedState;
          r = s.cache;
          na(t, M, r);
          if (r !== o.cache) {
            aa(t, [M], n, true);
          }
          to();
          r = s.element;
          if (o.isDehydrated) {
            o = {
              element: r,
              isDehydrated: false,
              cache: s.cache,
            };
            t.updateQueue.baseState = o;
            t.memoizedState = o;
            if (t.flags & 256) {
              t = Sc(e, t, r, n);
              break a;
            } else if (r !== a) {
              a = Di(Error(i(424)), t);
              Qi(a);
              t = Sc(e, t, r, n);
              break a;
            } else {
              e = t.stateNode.containerInfo;
              switch (e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === `HTML` ? e.ownerDocument.body : e;
              }
              A = cf(e.firstChild);
              Hi = t;
              j = true;
              Ui = null;
              Wi = true;
              n = Ka(t, null, r, n);
              t.child = n;
              while (n) {
                n.flags = (n.flags & -3) | 4096;
                n = n.sibling;
              }
            }
          } else {
            Xi();
            if (r === a) {
              t = Nc(e, t, n);
              break a;
            }
            cc(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        vc(e, t);
        if (e === null) {
          if ((n = kf(t.type, null, t.pendingProps, null))) {
            t.memoizedState = n;
          } else if (!j) {
            n = t.type;
            e = t.pendingProps;
            r = Bd(_e.current).createElement(n);
            r[gt] = t;
            r[_t] = e;
            Pd(r, n, e);
            k(r);
            t.stateNode = r;
          }
        } else {
          t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState);
        }
        return null;
      case 27:
        xe(t);
        if (e === null && j) {
          r = t.stateNode = ff(t.type, t.pendingProps, _e.current);
          Hi = t;
          Wi = true;
          a = A;
          if (Zd(t.type)) {
            lf = a;
            A = cf(r.firstChild);
          } else {
            A = a;
          }
        }
        cc(e, t, t.pendingProps.children, n);
        vc(e, t);
        if (e === null) {
          t.flags |= 4194304;
        }
        return t.child;
      case 5:
        if (e === null && j) {
          if ((a = r = A)) {
            r = tf(r, t.type, t.pendingProps, Wi);
            if (r === null) {
              a = false;
            } else {
              t.stateNode = r;
              Hi = t;
              A = cf(r.firstChild);
              Wi = false;
              a = true;
            }
          }
          if (!a) {
            Ki(t);
          }
        }
        xe(t);
        a = t.type;
        o = t.pendingProps;
        s = e === null ? null : e.memoizedProps;
        r = o.children;
        if (Ud(a, o)) {
          r = null;
        } else if (s !== null && Ud(a, s)) {
          t.flags |= 32;
        }
        if (t.memoizedState !== null) {
          a = Oo(e, t, jo, null, null, n);
          Qf._currentValue = a;
        }
        vc(e, t);
        cc(e, t, r, n);
        return t.child;
      case 6:
        if (e === null && j) {
          if ((e = n = A)) {
            n = nf(n, t.pendingProps, Wi);
            if (n === null) {
              e = false;
            } else {
              t.stateNode = n;
              Hi = t;
              A = null;
              e = true;
            }
          }
          if (!e) {
            Ki(t);
          }
        }
        return null;
      case 13:
        return Ec(e, t, n);
      case 4:
        ye(t, t.stateNode.containerInfo);
        r = t.pendingProps;
        if (e === null) {
          t.child = Ga(t, null, r, n);
        } else {
          cc(e, t, r, n);
        }
        return t.child;
      case 11:
        return lc(e, t, t.type, t.pendingProps, n);
      case 7:
        cc(e, t, t.pendingProps, n);
        return t.child;
      case 8:
        cc(e, t, t.pendingProps.children, n);
        return t.child;
      case 12:
        cc(e, t, t.pendingProps.children, n);
        return t.child;
      case 10:
        r = t.pendingProps;
        na(t, t.type, r.value);
        cc(e, t, r.children, n);
        return t.child;
      case 9:
        a = t.type._context;
        r = t.pendingProps.children;
        ca(t);
        a = la(a);
        r = r(a);
        t.flags |= 1;
        cc(e, t, r, n);
        return t.child;
      case 14:
        return uc(e, t, t.type, t.pendingProps, n);
      case 15:
        return dc(e, t, t.type, t.pendingProps, n);
      case 19:
        return Mc(e, t, n);
      case 31:
        return _c(e, t, n);
      case 22:
        return fc(e, t, n, t.pendingProps);
      case 24:
        ca(t);
        r = la(M);
        if (e === null) {
          a = Ea();
          if (a === null) {
            a = G;
            o = ha();
            a.pooledCache = o;
            o.refCount++;
            if (o !== null) {
              a.pooledCacheLanes |= n;
            }
            a = o;
          }
          t.memoizedState = {
            parent: r,
            cache: a,
          };
          Ja(t);
          na(t, M, a);
        } else {
          if ((e.lanes & n) !== 0) {
            Ya(e, t);
            no(t, null, null, n);
            to();
          }
          a = e.memoizedState;
          o = t.memoizedState;
          if (a.parent === r) {
            r = o.cache;
            na(t, M, r);
            if (r !== a.cache) {
              aa(t, [M], n, true);
            }
          } else {
            a = {
              parent: r,
              cache: r,
            };
            t.memoizedState = a;
            if (t.lanes === 0) {
              t.memoizedState = t.updateQueue.baseState = a;
            }
            na(t, M, r);
          }
        }
        cc(e, t, t.pendingProps.children, n);
        return t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(i(156, t.tag));
  }
  function Lc(e) {
    e.flags |= 4;
  }
  function Rc(e, t, n, r, i) {
    if ((t = (e.mode & 32) != 0)) {
      t = false;
    }
    if (t) {
      e.flags |= 16777216;
      if ((i & 335544128) === i) {
        if (e.stateNode.complete) {
          e.flags |= 8192;
        } else if (wu()) {
          e.flags |= 8192;
        } else {
          Ia = Ma;
          throw Aa;
        }
      }
    } else {
      e.flags &= -16777217;
    }
  }
  function zc(e, t) {
    if (t.type !== `stylesheet` || t.state.loading & 4) {
      e.flags &= -16777217;
    } else {
      e.flags |= 16777216;
      if (!Wf(t)) {
        if (wu()) {
          e.flags |= 8192;
        } else {
          Ia = Ma;
          throw Aa;
        }
      }
    }
  }
  function Bc(e, t) {
    if (t !== null) {
      e.flags |= 4;
    }
    if (e.flags & 16384) {
      t = e.tag === 22 ? 536870912 : it();
      e.lanes |= t;
      Xl |= t;
    }
  }
  function Vc(e, t) {
    if (!j) {
      switch (e.tailMode) {
        case `hidden`:
          t = e.tail;
          var n = null;
          for (; t !== null; ) {
            if (t.alternate !== null) {
              n = t;
            }
            t = t.sibling;
          }
          if (n === null) {
            e.tail = null;
          } else {
            n.sibling = null;
          }
          break;
        case `collapsed`:
          n = e.tail;
          var r = null;
          for (; n !== null; ) {
            if (n.alternate !== null) {
              r = n;
            }
            n = n.sibling;
          }
          if (r === null) {
            if (t || e.tail === null) {
              e.tail = null;
            } else {
              e.tail.sibling = null;
            }
          } else {
            r.sibling = null;
          }
      }
    }
  }
  function B(e) {
    var t = e.alternate !== null && e.alternate.child === e.child;
    var n = 0;
    var r = 0;
    if (t) {
      for (var i = e.child; i !== null; ) {
        n |= i.lanes | i.childLanes;
        r |= i.subtreeFlags & 65011712;
        r |= i.flags & 65011712;
        i.return = e;
        i = i.sibling;
      }
    } else {
      for (i = e.child; i !== null; ) {
        n |= i.lanes | i.childLanes;
        r |= i.subtreeFlags;
        r |= i.flags;
        i.return = e;
        i = i.sibling;
      }
    }
    e.subtreeFlags |= r;
    e.childLanes = n;
    return t;
  }
  function Hc(e, t, n) {
    var r = t.pendingProps;
    Bi(t);
    switch (t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        B(t);
        return null;
      case 1:
        B(t);
        return null;
      case 3:
        n = t.stateNode;
        r = null;
        if (e !== null) {
          r = e.memoizedState.cache;
        }
        if (t.memoizedState.cache !== r) {
          t.flags |= 2048;
        }
        ra(M);
        be();
        if (n.pendingContext) {
          n.context = n.pendingContext;
          n.pendingContext = null;
        }
        if (e === null || e.child === null) {
          if (Yi(t)) {
            Lc(t);
          } else if (e !== null && (!e.memoizedState.isDehydrated || !!(t.flags & 256))) {
            t.flags |= 1024;
            Zi();
          }
        }
        B(t);
        return null;
      case 26:
        var a = t.type;
        var o = t.memoizedState;
        if (e === null) {
          Lc(t);
          if (o === null) {
            B(t);
            Rc(t, a, null, r, n);
          } else {
            B(t);
            zc(t, o);
          }
        } else if (o) {
          if (o === e.memoizedState) {
            B(t);
            t.flags &= -16777217;
          } else {
            Lc(t);
            B(t);
            zc(t, o);
          }
        } else {
          e = e.memoizedProps;
          if (e !== r) {
            Lc(t);
          }
          B(t);
          Rc(t, a, e, r, n);
        }
        return null;
      case 27:
        Se(t);
        n = _e.current;
        a = t.type;
        if (e !== null && t.stateNode != null) {
          if (e.memoizedProps !== r) {
            Lc(t);
          }
        } else {
          if (!r) {
            if (t.stateNode === null) {
              throw Error(i(166));
            }
            B(t);
            return null;
          }
          e = he.current;
          if (Yi(t)) {
            qi(t, e);
          } else {
            e = ff(a, r, n);
            t.stateNode = e;
            Lc(t);
          }
        }
        B(t);
        return null;
      case 5:
        Se(t);
        a = t.type;
        if (e !== null && t.stateNode != null) {
          if (e.memoizedProps !== r) {
            Lc(t);
          }
        } else {
          if (!r) {
            if (t.stateNode === null) {
              throw Error(i(166));
            }
            B(t);
            return null;
          }
          o = he.current;
          if (Yi(t)) {
            qi(t, o);
          } else {
            var s = Bd(_e.current);
            switch (o) {
              case 1:
                o = s.createElementNS(`http://www.w3.org/2000/svg`, a);
                break;
              case 2:
                o = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, a);
                break;
              default:
                switch (a) {
                  case `svg`:
                    o = s.createElementNS(`http://www.w3.org/2000/svg`, a);
                    break;
                  case `math`:
                    o = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, a);
                    break;
                  case `script`:
                    o = s.createElement(`div`);
                    o.innerHTML = `<script><\/script>`;
                    o = o.removeChild(o.firstChild);
                    break;
                  case `select`:
                    o =
                      typeof r.is == `string`
                        ? s.createElement(`select`, {
                            is: r.is,
                          })
                        : s.createElement(`select`);
                    if (r.multiple) {
                      o.multiple = true;
                    } else if (r.size) {
                      o.size = r.size;
                    }
                    break;
                  default:
                    o =
                      typeof r.is == `string`
                        ? s.createElement(a, {
                            is: r.is,
                          })
                        : s.createElement(a);
                }
            }
            o[gt] = t;
            o[_t] = r;
            a: for (s = t.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6) {
                o.appendChild(s.stateNode);
              } else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s;
                s = s.child;
                continue;
              }
              if (s === t) {
                break a;
              }
              while (s.sibling === null) {
                if (s.return === null || s.return === t) {
                  break a;
                }
                s = s.return;
              }
              s.sibling.return = s.return;
              s = s.sibling;
            }
            t.stateNode = o;
            Pd(o, a, r);
            a: switch (a) {
              case `button`:
              case `input`:
              case `select`:
              case `textarea`:
                r = !!r.autoFocus;
                break a;
              case `img`:
                r = true;
                break a;
              default:
                r = false;
            }
            if (r) {
              Lc(t);
            }
          }
        }
        B(t);
        Rc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n);
        return null;
      case 6:
        if (e && t.stateNode != null) {
          if (e.memoizedProps !== r) {
            Lc(t);
          }
        } else {
          if (typeof r != `string` && t.stateNode === null) {
            throw Error(i(166));
          }
          e = _e.current;
          if (Yi(t)) {
            e = t.stateNode;
            n = t.memoizedProps;
            r = null;
            a = Hi;
            if (a !== null) {
              switch (a.tag) {
                case 27:
                case 5:
                  r = a.memoizedProps;
              }
            }
            e[gt] = t;
            e =
              e.nodeValue === n ||
              (r !== null && r.suppressHydrationWarning === true) ||
              !!Md(e.nodeValue, n);
            if (!e) {
              Ki(t, true);
            }
          } else {
            e = Bd(e).createTextNode(r);
            e[gt] = t;
            t.stateNode = e;
          }
        }
        B(t);
        return null;
      case 31:
        n = t.memoizedState;
        if (e === null || e.memoizedState !== null) {
          r = Yi(t);
          if (n !== null) {
            if (e === null) {
              if (!r) {
                throw Error(i(318));
              }
              e = t.memoizedState;
              e = e === null ? null : e.dehydrated;
              if (!e) {
                throw Error(i(557));
              }
              e[gt] = t;
            } else {
              Xi();
              if (!(t.flags & 128)) {
                t.memoizedState = null;
              }
              t.flags |= 4;
            }
            B(t);
            e = false;
          } else {
            n = Zi();
            if (e !== null && e.memoizedState !== null) {
              e.memoizedState.hydrationErrors = n;
            }
            e = true;
          }
          if (!e) {
            if (t.flags & 256) {
              _o(t);
              return t;
            } else {
              _o(t);
              return null;
            }
          }
          if (t.flags & 128) {
            throw Error(i(558));
          }
        }
        B(t);
        return null;
      case 13:
        r = t.memoizedState;
        if (e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null)) {
          a = Yi(t);
          if (r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!a) {
                throw Error(i(318));
              }
              a = t.memoizedState;
              a = a === null ? null : a.dehydrated;
              if (!a) {
                throw Error(i(317));
              }
              a[gt] = t;
            } else {
              Xi();
              if (!(t.flags & 128)) {
                t.memoizedState = null;
              }
              t.flags |= 4;
            }
            B(t);
            a = false;
          } else {
            a = Zi();
            if (e !== null && e.memoizedState !== null) {
              e.memoizedState.hydrationErrors = a;
            }
            a = true;
          }
          if (!a) {
            if (t.flags & 256) {
              _o(t);
              return t;
            } else {
              _o(t);
              return null;
            }
          }
        }
        _o(t);
        if (t.flags & 128) {
          t.lanes = n;
          return t;
        } else {
          n = r !== null;
          e = e !== null && e.memoizedState !== null;
          if (n) {
            r = t.child;
            a = null;
            if (
              r.alternate !== null &&
              r.alternate.memoizedState !== null &&
              r.alternate.memoizedState.cachePool !== null
            ) {
              a = r.alternate.memoizedState.cachePool.pool;
            }
            o = null;
            if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
              o = r.memoizedState.cachePool.pool;
            }
            if (o !== a) {
              r.flags |= 2048;
            }
          }
          if (n !== e && n) {
            t.child.flags |= 8192;
          }
          Bc(t, t.updateQueue);
          B(t);
          return null;
        }
      case 4:
        be();
        if (e === null) {
          Sd(t.stateNode.containerInfo);
        }
        B(t);
        return null;
      case 10:
        ra(t.type);
        B(t);
        return null;
      case 19:
        D(N);
        r = t.memoizedState;
        if (r === null) {
          B(t);
          return null;
        }
        a = (t.flags & 128) != 0;
        o = r.rendering;
        if (o === null) {
          if (a) {
            Vc(r, false);
          } else {
            if (Y !== 0 || (e !== null && e.flags & 128)) {
              for (e = t.child; e !== null; ) {
                o = vo(e);
                if (o !== null) {
                  t.flags |= 128;
                  Vc(r, false);
                  e = o.updateQueue;
                  t.updateQueue = e;
                  Bc(t, e);
                  t.subtreeFlags = 0;
                  e = n;
                  n = t.child;
                  while (n !== null) {
                    bi(n, e);
                    n = n.sibling;
                  }
                  O(N, (N.current & 1) | 2);
                  if (j) {
                    Li(t, r.treeForkCount);
                  }
                  return t.child;
                }
                e = e.sibling;
              }
            }
            if (r.tail !== null && Fe() > nu) {
              t.flags |= 128;
              a = true;
              Vc(r, false);
              t.lanes = 4194304;
            }
          }
        } else {
          if (!a) {
            e = vo(o);
            if (e !== null) {
              t.flags |= 128;
              a = true;
              e = e.updateQueue;
              t.updateQueue = e;
              Bc(t, e);
              Vc(r, true);
              if (r.tail === null && r.tailMode === `hidden` && !o.alternate && !j) {
                B(t);
                return null;
              }
            } else if (Fe() * 2 - r.renderingStartTime > nu && n !== 536870912) {
              t.flags |= 128;
              a = true;
              Vc(r, false);
              t.lanes = 4194304;
            }
          }
          if (r.isBackwards) {
            o.sibling = t.child;
            t.child = o;
          } else {
            e = r.last;
            if (e === null) {
              t.child = o;
            } else {
              e.sibling = o;
            }
            r.last = o;
          }
        }
        if (r.tail === null) {
          B(t);
          return null;
        } else {
          e = r.tail;
          r.rendering = e;
          r.tail = e.sibling;
          r.renderingStartTime = Fe();
          e.sibling = null;
          n = N.current;
          O(N, a ? (n & 1) | 2 : n & 1);
          if (j) {
            Li(t, r.treeForkCount);
          }
          return e;
        }
      case 22:
      case 23:
        _o(t);
        lo();
        r = t.memoizedState !== null;
        if (e === null) {
          if (r) {
            t.flags |= 8192;
          }
        } else if ((e.memoizedState !== null) !== r) {
          t.flags |= 8192;
        }
        if (r) {
          if (n & 536870912 && !(t.flags & 128)) {
            B(t);
            if (t.subtreeFlags & 6) {
              t.flags |= 8192;
            }
          }
        } else {
          B(t);
        }
        n = t.updateQueue;
        if (n !== null) {
          Bc(t, n.retryQueue);
        }
        n = null;
        if (e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null) {
          n = e.memoizedState.cachePool.pool;
        }
        r = null;
        if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
          r = t.memoizedState.cachePool.pool;
        }
        if (r !== n) {
          t.flags |= 2048;
        }
        if (e !== null) {
          D(Ta);
        }
        return null;
      case 24:
        n = null;
        if (e !== null) {
          n = e.memoizedState.cache;
        }
        if (t.memoizedState.cache !== n) {
          t.flags |= 2048;
        }
        ra(M);
        B(t);
        return null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Uc(e, t) {
    Bi(t);
    switch (t.tag) {
      case 1:
        e = t.flags;
        if (e & 65536) {
          t.flags = (e & -65537) | 128;
          return t;
        } else {
          return null;
        }
      case 3:
        ra(M);
        be();
        e = t.flags;
        if (e & 65536 && !(e & 128)) {
          t.flags = (e & -65537) | 128;
          return t;
        } else {
          return null;
        }
      case 26:
      case 27:
      case 5:
        Se(t);
        return null;
      case 31:
        if (t.memoizedState !== null) {
          _o(t);
          if (t.alternate === null) {
            throw Error(i(340));
          }
          Xi();
        }
        e = t.flags;
        if (e & 65536) {
          t.flags = (e & -65537) | 128;
          return t;
        } else {
          return null;
        }
      case 13:
        _o(t);
        e = t.memoizedState;
        if (e !== null && e.dehydrated !== null) {
          if (t.alternate === null) {
            throw Error(i(340));
          }
          Xi();
        }
        e = t.flags;
        if (e & 65536) {
          t.flags = (e & -65537) | 128;
          return t;
        } else {
          return null;
        }
      case 19:
        D(N);
        return null;
      case 4:
        be();
        return null;
      case 10:
        ra(t.type);
        return null;
      case 22:
      case 23:
        _o(t);
        lo();
        if (e !== null) {
          D(Ta);
        }
        e = t.flags;
        if (e & 65536) {
          t.flags = (e & -65537) | 128;
          return t;
        } else {
          return null;
        }
      case 24:
        ra(M);
        return null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Wc(e, t) {
    Bi(t);
    switch (t.tag) {
      case 3:
        ra(M);
        be();
        break;
      case 26:
      case 27:
      case 5:
        Se(t);
        break;
      case 4:
        be();
        break;
      case 31:
        if (t.memoizedState !== null) {
          _o(t);
        }
        break;
      case 13:
        _o(t);
        break;
      case 19:
        D(N);
        break;
      case 10:
        ra(t.type);
        break;
      case 22:
      case 23:
        _o(t);
        lo();
        if (e !== null) {
          D(Ta);
        }
        break;
      case 24:
        ra(M);
    }
  }
  function Gc(e, t) {
    try {
      var n = t.updateQueue;
      var r = n === null ? null : n.lastEffect;
      if (r !== null) {
        var i = r.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            r = undefined;
            var a = n.create;
            var o = n.inst;
            r = a();
            o.destroy = r;
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (e) {
      Z(t, t.return, e);
    }
  }
  function Kc(e, t, n) {
    try {
      var r = t.updateQueue;
      var i = r === null ? null : r.lastEffect;
      if (i !== null) {
        var a = i.next;
        r = a;
        do {
          if ((r.tag & e) === e) {
            var o = r.inst;
            var s = o.destroy;
            if (s !== undefined) {
              o.destroy = undefined;
              i = t;
              var c = n;
              var l = s;
              try {
                l();
              } catch (e) {
                Z(i, c, e);
              }
            }
          }
          r = r.next;
        } while (r !== a);
      }
    } catch (e) {
      Z(t, t.return, e);
    }
  }
  function qc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        io(t, n);
      } catch (t) {
        Z(e, e.return, t);
      }
    }
  }
  function Jc(e, t, n) {
    n.props = Zs(e.type, e.memoizedProps);
    n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (n) {
      Z(e, t, n);
    }
  }
  function Yc(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        if (typeof n == `function`) {
          e.refCleanup = n(r);
        } else {
          n.current = r;
        }
      }
    } catch (n) {
      Z(e, t, n);
    }
  }
  function Xc(e, t) {
    var n = e.ref;
    var r = e.refCleanup;
    if (n !== null) {
      if (typeof r == `function`) {
        try {
          r();
        } catch (n) {
          Z(e, t, n);
        } finally {
          e.refCleanup = null;
          e = e.alternate;
          if (e != null) {
            e.refCleanup = null;
          }
        }
      } else if (typeof n == `function`) {
        try {
          n(null);
        } catch (n) {
          Z(e, t, n);
        }
      } else {
        n.current = null;
      }
    }
  }
  function Zc(e) {
    var t = e.type;
    var n = e.memoizedProps;
    var r = e.stateNode;
    try {
      a: switch (t) {
        case `button`:
        case `input`:
        case `select`:
        case `textarea`:
          if (n.autoFocus) {
            r.focus();
          }
          break a;
        case `img`:
          if (n.src) {
            r.src = n.src;
          } else if (n.srcSet) {
            r.srcset = n.srcSet;
          }
      }
    } catch (t) {
      Z(e, e.return, t);
    }
  }
  function Qc(e, t, n) {
    try {
      var r = e.stateNode;
      Fd(r, e.type, n, t);
      r[_t] = t;
    } catch (t) {
      Z(e, e.return, t);
    }
  }
  function $c(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Zd(e.type)) || e.tag === 4;
  }
  function el(e) {
    a: while (true) {
      while (e.sibling === null) {
        if (e.return === null || $c(e.return)) {
          return null;
        }
        e = e.return;
      }
      e.sibling.return = e.return;
      e = e.sibling;
      while (e.tag !== 5 && e.tag !== 6 && e.tag !== 18) {
        if ((e.tag === 27 && Zd(e.type)) || e.flags & 2 || e.child === null || e.tag === 4) {
          continue a;
        }
        e.child.return = e;
        e = e.child;
      }
      if (!(e.flags & 2)) {
        return e.stateNode;
      }
    }
  }
  function tl(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) {
      e = e.stateNode;
      if (t) {
        (n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n).insertBefore(e, t);
      } else {
        t = n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n;
        t.appendChild(e);
        n = n._reactRootContainer;
        if (n == null && t.onclick === null) {
          t.onclick = ln;
        }
      }
    } else if (
      r !== 4 &&
      (r === 27 && Zd(e.type) && ((n = e.stateNode), (t = null)), (e = e.child), e !== null)
    ) {
      tl(e, t, n);
      e = e.sibling;
      while (e !== null) {
        tl(e, t, n);
        e = e.sibling;
      }
    }
  }
  function nl(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) {
      e = e.stateNode;
      if (t) {
        n.insertBefore(e, t);
      } else {
        n.appendChild(e);
      }
    } else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), (e = e.child), e !== null)) {
      nl(e, t, n);
      e = e.sibling;
      while (e !== null) {
        nl(e, t, n);
        e = e.sibling;
      }
    }
  }
  function rl(e) {
    var t = e.stateNode;
    var n = e.memoizedProps;
    try {
      var r = e.type;
      for (var i = t.attributes; i.length; ) {
        t.removeAttributeNode(i[0]);
      }
      Pd(t, r, n);
      t[gt] = e;
      t[_t] = n;
    } catch (t) {
      Z(e, e.return, t);
    }
  }
  var il = false;
  var V = false;
  var al = false;
  var ol = typeof WeakSet == `function` ? WeakSet : Set;
  var H = null;
  function sl(e, t) {
    e = e.containerInfo;
    Rd = sp;
    e = Ir(e);
    if (Lr(e)) {
      if (`selectionStart` in e) {
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd,
        };
      } else {
        a: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var a = r.anchorOffset;
            var o = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType;
              o.nodeType;
            } catch {
              n = null;
              break a;
            }
            var s = 0;
            var c = -1;
            var l = -1;
            var u = 0;
            var d = 0;
            var f = e;
            var p = null;
            b: while (true) {
              for (
                var m;
                f !== n || (a !== 0 && f.nodeType !== 3) || (c = s + a),
                  f !== o || (r !== 0 && f.nodeType !== 3) || (l = s + r),
                  f.nodeType === 3 && (s += f.nodeValue.length),
                  (m = f.firstChild) !== null;
              ) {
                p = f;
                f = m;
              }
              while (true) {
                if (f === e) {
                  break b;
                }
                if (p === n && ++u === a) {
                  c = s;
                }
                if (p === o && ++d === r) {
                  l = s;
                }
                if ((m = f.nextSibling) !== null) {
                  break;
                }
                f = p;
                p = f.parentNode;
              }
              f = m;
            }
            n =
              c === -1 || l === -1
                ? null
                : {
                    start: c,
                    end: l,
                  };
          } else {
            n = null;
          }
        }
      }
      n ||= {
        start: 0,
        end: 0,
      };
    } else {
      n = null;
    }
    zd = {
      focusedElem: e,
      selectionRange: n,
    };
    sp = false;
    H = t;
    while (H !== null) {
      t = H;
      e = t.child;
      if (t.subtreeFlags & 1028 && e !== null) {
        e.return = t;
        H = e;
      } else {
        while (H !== null) {
          t = H;
          o = t.alternate;
          e = t.flags;
          switch (t.tag) {
            case 0:
              if (e & 4 && ((e = t.updateQueue), (e = e === null ? null : e.events), e !== null)) {
                for (n = 0; n < e.length; n++) {
                  a = e[n];
                  a.ref.impl = a.nextImpl;
                }
              }
              break;
            case 11:
            case 15:
              break;
            case 1:
              if (e & 1024 && o !== null) {
                e = undefined;
                n = t;
                a = o.memoizedProps;
                o = o.memoizedState;
                r = n.stateNode;
                try {
                  var h = Zs(n.type, a);
                  e = r.getSnapshotBeforeUpdate(h, o);
                  r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (e) {
                  Z(n, n.return, e);
                }
              }
              break;
            case 3:
              if (e & 1024) {
                e = t.stateNode.containerInfo;
                n = e.nodeType;
                if (n === 9) {
                  ef(e);
                } else if (n === 1) {
                  switch (e.nodeName) {
                    case `HEAD`:
                    case `HTML`:
                    case `BODY`:
                      ef(e);
                      break;
                    default:
                      e.textContent = ``;
                  }
                }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if (e & 1024) {
                throw Error(i(163));
              }
          }
          e = t.sibling;
          if (e !== null) {
            e.return = t.return;
            H = e;
            break;
          }
          H = t.return;
        }
      }
    }
  }
  function cl(e, t, n) {
    var r = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Sl(e, n);
        if (r & 4) {
          Gc(5, n);
        }
        break;
      case 1:
        Sl(e, n);
        if (r & 4) {
          e = n.stateNode;
          if (t === null) {
            try {
              e.componentDidMount();
            } catch (e) {
              Z(n, n.return, e);
            }
          } else {
            var i = Zs(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (e) {
              Z(n, n.return, e);
            }
          }
        }
        if (r & 64) {
          qc(n);
        }
        if (r & 512) {
          Yc(n, n.return);
        }
        break;
      case 3:
        Sl(e, n);
        if (r & 64 && ((e = n.updateQueue), e !== null)) {
          t = null;
          if (n.child !== null) {
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          }
          try {
            io(e, t);
          } catch (e) {
            Z(n, n.return, e);
          }
        }
        break;
      case 27:
        if (t === null && r & 4) {
          rl(n);
        }
      case 26:
      case 5:
        Sl(e, n);
        if (t === null && r & 4) {
          Zc(n);
        }
        if (r & 512) {
          Yc(n, n.return);
        }
        break;
      case 12:
        Sl(e, n);
        break;
      case 31:
        Sl(e, n);
        if (r & 4) {
          pl(e, n);
        }
        break;
      case 13:
        Sl(e, n);
        if (r & 4) {
          ml(e, n);
        }
        if (r & 64) {
          e = n.memoizedState;
          if (e !== null) {
            e = e.dehydrated;
            if (e !== null) {
              n = Ju.bind(null, n);
              sf(e, n);
            }
          }
        }
        break;
      case 22:
        r = n.memoizedState !== null || il;
        if (!r) {
          t = (t !== null && t.memoizedState !== null) || V;
          i = il;
          var a = V;
          il = r;
          if ((V = t) && !a) {
            wl(e, n, (n.subtreeFlags & 8772) != 0);
          } else {
            Sl(e, n);
          }
          il = i;
          V = a;
        }
        break;
      case 30:
        break;
      default:
        Sl(e, n);
    }
  }
  function ll(e) {
    var t = e.alternate;
    if (t !== null) {
      e.alternate = null;
      ll(t);
    }
    e.child = null;
    e.deletions = null;
    e.sibling = null;
    if (e.tag === 5) {
      t = e.stateNode;
      if (t !== null) {
        wt(t);
      }
    }
    e.stateNode = null;
    e.return = null;
    e.dependencies = null;
    e.memoizedProps = null;
    e.memoizedState = null;
    e.pendingProps = null;
    e.stateNode = null;
    e.updateQueue = null;
  }
  var U = null;
  var ul = false;
  function dl(e, t, n) {
    for (n = n.child; n !== null; ) {
      fl(e, t, n);
      n = n.sibling;
    }
  }
  function fl(e, t, n) {
    if (Ge && typeof Ge.onCommitFiberUnmount == `function`) {
      try {
        Ge.onCommitFiberUnmount(We, n);
      } catch {}
    }
    switch (n.tag) {
      case 26:
        if (!V) {
          Xc(n, t);
        }
        dl(e, t, n);
        if (n.memoizedState) {
          n.memoizedState.count--;
        } else if (n.stateNode) {
          n = n.stateNode;
          n.parentNode.removeChild(n);
        }
        break;
      case 27:
        if (!V) {
          Xc(n, t);
        }
        var r = U;
        var i = ul;
        if (Zd(n.type)) {
          U = n.stateNode;
          ul = false;
        }
        dl(e, t, n);
        pf(n.stateNode);
        U = r;
        ul = i;
        break;
      case 5:
        if (!V) {
          Xc(n, t);
        }
      case 6:
        r = U;
        i = ul;
        U = null;
        dl(e, t, n);
        U = r;
        ul = i;
        if (U !== null) {
          if (ul) {
            try {
              (U.nodeType === 9 ? U.body : U.nodeName === `HTML` ? U.ownerDocument.body : U).removeChild(
                n.stateNode,
              );
            } catch (e) {
              Z(n, t, e);
            }
          } else {
            try {
              U.removeChild(n.stateNode);
            } catch (e) {
              Z(n, t, e);
            }
          }
        }
        break;
      case 18:
        if (U !== null) {
          if (ul) {
            e = U;
            Qd(e.nodeType === 9 ? e.body : e.nodeName === `HTML` ? e.ownerDocument.body : e, n.stateNode);
            Np(e);
          } else {
            Qd(U, n.stateNode);
          }
        }
        break;
      case 4:
        r = U;
        i = ul;
        U = n.stateNode.containerInfo;
        ul = true;
        dl(e, t, n);
        U = r;
        ul = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Kc(2, n, t);
        if (!V) {
          Kc(4, n, t);
        }
        dl(e, t, n);
        break;
      case 1:
        if (!V) {
          Xc(n, t);
          r = n.stateNode;
          if (typeof r.componentWillUnmount == `function`) {
            Jc(n, t, r);
          }
        }
        dl(e, t, n);
        break;
      case 21:
        dl(e, t, n);
        break;
      case 22:
        V = (r = V) || n.memoizedState !== null;
        dl(e, t, n);
        V = r;
        break;
      default:
        dl(e, t, n);
    }
  }
  function pl(e, t) {
    if (t.memoizedState === null && ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))) {
      e = e.dehydrated;
      try {
        Np(e);
      } catch (e) {
        Z(t, t.return, e);
      }
    }
  }
  function ml(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    ) {
      try {
        Np(e);
      } catch (e) {
        Z(t, t.return, e);
      }
    }
  }
  function hl(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        if (t === null) {
          t = e.stateNode = new ol();
        }
        return t;
      case 22:
        e = e.stateNode;
        t = e._retryCache;
        if (t === null) {
          t = e._retryCache = new ol();
        }
        return t;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function gl(e, t) {
    var n = hl(e);
    t.forEach(function (t) {
      if (!n.has(t)) {
        n.add(t);
        var r = Yu.bind(null, e, t);
        t.then(r, r);
      }
    });
  }
  function _l(e, t) {
    var n = t.deletions;
    if (n !== null) {
      for (var r = 0; r < n.length; r++) {
        var a = n[r];
        var o = e;
        var s = t;
        var c = s;
        a: while (c !== null) {
          switch (c.tag) {
            case 27:
              if (Zd(c.type)) {
                U = c.stateNode;
                ul = false;
                break a;
              }
              break;
            case 5:
              U = c.stateNode;
              ul = false;
              break a;
            case 3:
            case 4:
              U = c.stateNode.containerInfo;
              ul = true;
              break a;
          }
          c = c.return;
        }
        if (U === null) {
          throw Error(i(160));
        }
        fl(o, s, a);
        U = null;
        ul = false;
        o = a.alternate;
        if (o !== null) {
          o.return = null;
        }
        a.return = null;
      }
    }
    if (t.subtreeFlags & 13886) {
      for (t = t.child; t !== null; ) {
        yl(t, e);
        t = t.sibling;
      }
    }
  }
  var vl = null;
  function yl(e, t) {
    var n = e.alternate;
    var r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        _l(t, e);
        bl(e);
        if (r & 4) {
          Kc(3, e, e.return);
          Gc(3, e);
          Kc(5, e, e.return);
        }
        break;
      case 1:
        _l(t, e);
        bl(e);
        if (r & 512) {
          if (!V && n !== null) {
            Xc(n, n.return);
          }
        }
        if (r & 64 && il) {
          e = e.updateQueue;
          if (e !== null) {
            r = e.callbacks;
            if (r !== null) {
              n = e.shared.hiddenCallbacks;
              e.shared.hiddenCallbacks = n === null ? r : n.concat(r);
            }
          }
        }
        break;
      case 26:
        var a = vl;
        _l(t, e);
        bl(e);
        if (r & 512) {
          if (!V && n !== null) {
            Xc(n, n.return);
          }
        }
        if (r & 4) {
          var o = n === null ? null : n.memoizedState;
          r = e.memoizedState;
          if (n === null) {
            if (r === null) {
              if (e.stateNode === null) {
                a: {
                  r = e.type;
                  n = e.memoizedProps;
                  a = a.ownerDocument || a;
                  b: switch (r) {
                    case `title`:
                      o = a.getElementsByTagName(`title`)[0];
                      if (
                        !o ||
                        o[Ct] ||
                        o[gt] ||
                        o.namespaceURI === `http://www.w3.org/2000/svg` ||
                        o.hasAttribute(`itemprop`)
                      ) {
                        o = a.createElement(r);
                        a.head.insertBefore(o, a.querySelector(`head > title`));
                      }
                      Pd(o, r, n);
                      o[gt] = e;
                      k(o);
                      r = o;
                      break a;
                    case `link`:
                      var s = Vf(`link`, `href`, a).get(r + (n.href || ``));
                      if (s) {
                        for (var c = 0; c < s.length; c++) {
                          o = s[c];
                          if (
                            o.getAttribute(`href`) === (n.href == null || n.href === `` ? null : n.href) &&
                            o.getAttribute(`rel`) === (n.rel == null ? null : n.rel) &&
                            o.getAttribute(`title`) === (n.title == null ? null : n.title) &&
                            o.getAttribute(`crossorigin`) === (n.crossOrigin == null ? null : n.crossOrigin)
                          ) {
                            s.splice(c, 1);
                            break b;
                          }
                        }
                      }
                      o = a.createElement(r);
                      Pd(o, r, n);
                      a.head.appendChild(o);
                      break;
                    case `meta`:
                      if ((s = Vf(`meta`, `content`, a).get(r + (n.content || ``)))) {
                        for (c = 0; c < s.length; c++) {
                          o = s[c];
                          if (
                            o.getAttribute(`content`) === (n.content == null ? null : `${n.content}`) &&
                            o.getAttribute(`name`) === (n.name == null ? null : n.name) &&
                            o.getAttribute(`property`) === (n.property == null ? null : n.property) &&
                            o.getAttribute(`http-equiv`) === (n.httpEquiv == null ? null : n.httpEquiv) &&
                            o.getAttribute(`charset`) === (n.charSet == null ? null : n.charSet)
                          ) {
                            s.splice(c, 1);
                            break b;
                          }
                        }
                      }
                      o = a.createElement(r);
                      Pd(o, r, n);
                      a.head.appendChild(o);
                      break;
                    default:
                      throw Error(i(468, r));
                  }
                  o[gt] = e;
                  k(o);
                  r = o;
                }
                e.stateNode = r;
              } else {
                Hf(a, e.type, e.stateNode);
              }
            } else {
              e.stateNode = If(a, r, e.memoizedProps);
            }
          } else if (o === r) {
            if (r === null && e.stateNode !== null) {
              Qc(e, e.memoizedProps, n.memoizedProps);
            }
          } else {
            if (o === null) {
              if (n.stateNode !== null) {
                n = n.stateNode;
                n.parentNode.removeChild(n);
              }
            } else {
              o.count--;
            }
            if (r === null) {
              Hf(a, e.type, e.stateNode);
            } else {
              If(a, r, e.memoizedProps);
            }
          }
        }
        break;
      case 27:
        _l(t, e);
        bl(e);
        if (r & 512) {
          if (!V && n !== null) {
            Xc(n, n.return);
          }
        }
        if (n !== null && r & 4) {
          Qc(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 5:
        _l(t, e);
        bl(e);
        if (r & 512) {
          if (!V && n !== null) {
            Xc(n, n.return);
          }
        }
        if (e.flags & 32) {
          a = e.stateNode;
          try {
            en(a, ``);
          } catch (t) {
            Z(e, e.return, t);
          }
        }
        if (r & 4 && e.stateNode != null) {
          a = e.memoizedProps;
          Qc(e, a, n === null ? a : n.memoizedProps);
        }
        if (r & 1024) {
          al = true;
        }
        break;
      case 6:
        _l(t, e);
        bl(e);
        if (r & 4) {
          if (e.stateNode === null) {
            throw Error(i(162));
          }
          r = e.memoizedProps;
          n = e.stateNode;
          try {
            n.nodeValue = r;
          } catch (t) {
            Z(e, e.return, t);
          }
        }
        break;
      case 3:
        Bf = null;
        a = vl;
        vl = gf(t.containerInfo);
        _l(t, e);
        vl = a;
        bl(e);
        if (r & 4 && n !== null && n.memoizedState.isDehydrated) {
          try {
            Np(t.containerInfo);
          } catch (t) {
            Z(e, e.return, t);
          }
        }
        if (al) {
          al = false;
          xl(e);
        }
        break;
      case 4:
        r = vl;
        vl = gf(e.stateNode.containerInfo);
        _l(t, e);
        bl(e);
        vl = r;
        break;
      case 12:
        _l(t, e);
        bl(e);
        break;
      case 31:
        _l(t, e);
        bl(e);
        if (r & 4) {
          r = e.updateQueue;
          if (r !== null) {
            e.updateQueue = null;
            gl(e, r);
          }
        }
        break;
      case 13:
        _l(t, e);
        bl(e);
        if (e.child.flags & 8192 && (e.memoizedState !== null) != (n !== null && n.memoizedState !== null)) {
          eu = Fe();
        }
        if (r & 4) {
          r = e.updateQueue;
          if (r !== null) {
            e.updateQueue = null;
            gl(e, r);
          }
        }
        break;
      case 22:
        a = e.memoizedState !== null;
        var l = n !== null && n.memoizedState !== null;
        var u = il;
        var d = V;
        il = u || a;
        V = d || l;
        _l(t, e);
        V = d;
        il = u;
        bl(e);
        if (r & 8192) {
          t = e.stateNode;
          t._visibility = a ? t._visibility & -2 : t._visibility | 1;
          if (a) {
            if (n !== null && !l && !il && !V) {
              Cl(e);
            }
          }
          n = null;
          t = e;
          a: while (true) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                l = n = t;
                try {
                  o = l.stateNode;
                  if (a) {
                    s = o.style;
                    if (typeof s.setProperty == `function`) {
                      s.setProperty(`display`, `none`, `important`);
                    } else {
                      s.display = `none`;
                    }
                  } else {
                    c = l.stateNode;
                    var f = l.memoizedProps.style;
                    var p = f != null && f.hasOwnProperty(`display`) ? f.display : null;
                    c.style.display = p == null || typeof p == `boolean` ? `` : `${p}`.trim();
                  }
                } catch (e) {
                  Z(l, l.return, e);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                l = t;
                try {
                  l.stateNode.nodeValue = a ? `` : l.memoizedProps;
                } catch (e) {
                  Z(l, l.return, e);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                l = t;
                try {
                  var m = l.stateNode;
                  if (a) {
                    $d(m, true);
                  } else {
                    $d(l.stateNode, false);
                  }
                } catch (e) {
                  Z(l, l.return, e);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === e) &&
              t.child !== null
            ) {
              t.child.return = t;
              t = t.child;
              continue;
            }
            if (t === e) {
              break a;
            }
            while (t.sibling === null) {
              if (t.return === null || t.return === e) {
                break a;
              }
              if (n === t) {
                n = null;
              }
              t = t.return;
            }
            if (n === t) {
              n = null;
            }
            t.sibling.return = t.return;
            t = t.sibling;
          }
        }
        if (r & 4) {
          r = e.updateQueue;
          if (r !== null) {
            n = r.retryQueue;
            if (n !== null) {
              r.retryQueue = null;
              gl(e, n);
            }
          }
        }
        break;
      case 19:
        _l(t, e);
        bl(e);
        if (r & 4) {
          r = e.updateQueue;
          if (r !== null) {
            e.updateQueue = null;
            gl(e, r);
          }
        }
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        _l(t, e);
        bl(e);
    }
  }
  function bl(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        var n;
        for (var r = e.return; r !== null; ) {
          if ($c(r)) {
            n = r;
            break;
          }
          r = r.return;
        }
        if (n == null) {
          throw Error(i(160));
        }
        switch (n.tag) {
          case 27:
            var a = n.stateNode;
            nl(e, el(e), a);
            break;
          case 5:
            var o = n.stateNode;
            if (n.flags & 32) {
              en(o, ``);
              n.flags &= -33;
            }
            nl(e, el(e), o);
            break;
          case 3:
          case 4:
            var s = n.stateNode.containerInfo;
            tl(e, el(e), s);
            break;
          default:
            throw Error(i(161));
        }
      } catch (t) {
        Z(e, e.return, t);
      }
      e.flags &= -3;
    }
    if (t & 4096) {
      e.flags &= -4097;
    }
  }
  function xl(e) {
    if (e.subtreeFlags & 1024) {
      for (e = e.child; e !== null; ) {
        var t = e;
        xl(t);
        if (t.tag === 5 && t.flags & 1024) {
          t.stateNode.reset();
        }
        e = e.sibling;
      }
    }
  }
  function Sl(e, t) {
    if (t.subtreeFlags & 8772) {
      for (t = t.child; t !== null; ) {
        cl(e, t.alternate, t);
        t = t.sibling;
      }
    }
  }
  function Cl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Kc(4, t, t.return);
          Cl(t);
          break;
        case 1:
          Xc(t, t.return);
          var n = t.stateNode;
          if (typeof n.componentWillUnmount == `function`) {
            Jc(t, t.return, n);
          }
          Cl(t);
          break;
        case 27:
          pf(t.stateNode);
        case 26:
        case 5:
          Xc(t, t.return);
          Cl(t);
          break;
        case 22:
          if (t.memoizedState === null) {
            Cl(t);
          }
          break;
        case 30:
          Cl(t);
          break;
        default:
          Cl(t);
      }
      e = e.sibling;
    }
  }
  function wl(e, t, n) {
    n &&= (t.subtreeFlags & 8772) != 0;
    t = t.child;
    while (t !== null) {
      var r = t.alternate;
      var i = e;
      var a = t;
      var o = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          wl(i, a, n);
          Gc(4, a);
          break;
        case 1:
          wl(i, a, n);
          r = a;
          i = r.stateNode;
          if (typeof i.componentDidMount == `function`) {
            try {
              i.componentDidMount();
            } catch (e) {
              Z(r, r.return, e);
            }
          }
          r = a;
          i = r.updateQueue;
          if (i !== null) {
            var s = r.stateNode;
            try {
              var c = i.shared.hiddenCallbacks;
              if (c !== null) {
                i.shared.hiddenCallbacks = null;
                i = 0;
                for (; i < c.length; i++) {
                  ro(c[i], s);
                }
              }
            } catch (e) {
              Z(r, r.return, e);
            }
          }
          if (n && o & 64) {
            qc(a);
          }
          Yc(a, a.return);
          break;
        case 27:
          rl(a);
        case 26:
        case 5:
          wl(i, a, n);
          if (n && r === null && o & 4) {
            Zc(a);
          }
          Yc(a, a.return);
          break;
        case 12:
          wl(i, a, n);
          break;
        case 31:
          wl(i, a, n);
          if (n && o & 4) {
            pl(i, a);
          }
          break;
        case 13:
          wl(i, a, n);
          if (n && o & 4) {
            ml(i, a);
          }
          break;
        case 22:
          if (a.memoizedState === null) {
            wl(i, a, n);
          }
          Yc(a, a.return);
          break;
        case 30:
          break;
        default:
          wl(i, a, n);
      }
      t = t.sibling;
    }
  }
  function Tl(e, t) {
    var n = null;
    if (e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null) {
      n = e.memoizedState.cachePool.pool;
    }
    e = null;
    if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
      e = t.memoizedState.cachePool.pool;
    }
    if (e !== n) {
      if (e != null) {
        e.refCount++;
      }
      if (n != null) {
        ga(n);
      }
    }
  }
  function El(e, t) {
    e = null;
    if (t.alternate !== null) {
      e = t.alternate.memoizedState.cache;
    }
    t = t.memoizedState.cache;
    if (t !== e) {
      t.refCount++;
      if (e != null) {
        ga(e);
      }
    }
  }
  function Dl(e, t, n, r) {
    if (t.subtreeFlags & 10256) {
      for (t = t.child; t !== null; ) {
        Ol(e, t, n, r);
        t = t.sibling;
      }
    }
  }
  function Ol(e, t, n, r) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dl(e, t, n, r);
        if (i & 2048) {
          Gc(9, t);
        }
        break;
      case 1:
        Dl(e, t, n, r);
        break;
      case 3:
        Dl(e, t, n, r);
        if (i & 2048) {
          e = null;
          if (t.alternate !== null) {
            e = t.alternate.memoizedState.cache;
          }
          t = t.memoizedState.cache;
          if (t !== e) {
            t.refCount++;
            if (e != null) {
              ga(e);
            }
          }
        }
        break;
      case 12:
        if (i & 2048) {
          Dl(e, t, n, r);
          e = t.stateNode;
          try {
            var a = t.memoizedProps;
            var o = a.id;
            var s = a.onPostCommit;
            if (typeof s == `function`) {
              s(o, t.alternate === null ? `mount` : `update`, e.passiveEffectDuration, -0);
            }
          } catch (e) {
            Z(t, t.return, e);
          }
        } else {
          Dl(e, t, n, r);
        }
        break;
      case 31:
        Dl(e, t, n, r);
        break;
      case 13:
        Dl(e, t, n, r);
        break;
      case 23:
        break;
      case 22:
        a = t.stateNode;
        o = t.alternate;
        if (t.memoizedState === null) {
          if (a._visibility & 2) {
            Dl(e, t, n, r);
          } else {
            a._visibility |= 2;
            kl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || false);
          }
        } else if (a._visibility & 2) {
          Dl(e, t, n, r);
        } else {
          Al(e, t);
        }
        if (i & 2048) {
          Tl(o, t);
        }
        break;
      case 24:
        Dl(e, t, n, r);
        if (i & 2048) {
          El(t.alternate, t);
        }
        break;
      default:
        Dl(e, t, n, r);
    }
  }
  function kl(e, t, n, r, i) {
    i &&= (t.subtreeFlags & 10256) != 0 || false;
    t = t.child;
    while (t !== null) {
      var a = e;
      var o = t;
      var s = n;
      var c = r;
      var l = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          kl(a, o, s, c, i);
          Gc(8, o);
          break;
        case 23:
          break;
        case 22:
          var u = o.stateNode;
          if (o.memoizedState === null) {
            u._visibility |= 2;
            kl(a, o, s, c, i);
          } else if (u._visibility & 2) {
            kl(a, o, s, c, i);
          } else {
            Al(a, o);
          }
          if (i && l & 2048) {
            Tl(o.alternate, o);
          }
          break;
        case 24:
          kl(a, o, s, c, i);
          if (i && l & 2048) {
            El(o.alternate, o);
          }
          break;
        default:
          kl(a, o, s, c, i);
      }
      t = t.sibling;
    }
  }
  function Al(e, t) {
    if (t.subtreeFlags & 10256) {
      for (t = t.child; t !== null; ) {
        var n = e;
        var r = t;
        var i = r.flags;
        switch (r.tag) {
          case 22:
            Al(n, r);
            if (i & 2048) {
              Tl(r.alternate, r);
            }
            break;
          case 24:
            Al(n, r);
            if (i & 2048) {
              El(r.alternate, r);
            }
            break;
          default:
            Al(n, r);
        }
        t = t.sibling;
      }
    }
  }
  var jl = 8192;
  function Ml(e, t, n) {
    if (e.subtreeFlags & jl) {
      for (e = e.child; e !== null; ) {
        Nl(e, t, n);
        e = e.sibling;
      }
    }
  }
  function Nl(e, t, n) {
    switch (e.tag) {
      case 26:
        Ml(e, t, n);
        if (e.flags & jl && e.memoizedState !== null) {
          Gf(n, vl, e.memoizedState, e.memoizedProps);
        }
        break;
      case 5:
        Ml(e, t, n);
        break;
      case 3:
      case 4:
        var r = vl;
        vl = gf(e.stateNode.containerInfo);
        Ml(e, t, n);
        vl = r;
        break;
      case 22:
        if (e.memoizedState === null) {
          r = e.alternate;
          if (r !== null && r.memoizedState !== null) {
            r = jl;
            jl = 16777216;
            Ml(e, t, n);
            jl = r;
          } else {
            Ml(e, t, n);
          }
        }
        break;
      default:
        Ml(e, t, n);
    }
  }
  function Pl(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do {
        t = e.sibling;
        e.sibling = null;
        e = t;
      } while (e !== null);
    }
  }
  function Fl(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          H = r;
          Rl(r, e);
        }
      }
      Pl(e);
    }
    if (e.subtreeFlags & 10256) {
      for (e = e.child; e !== null; ) {
        Il(e);
        e = e.sibling;
      }
    }
  }
  function Il(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Fl(e);
        if (e.flags & 2048) {
          Kc(9, e, e.return);
        }
        break;
      case 3:
        Fl(e);
        break;
      case 12:
        Fl(e);
        break;
      case 22:
        var t = e.stateNode;
        if (e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)) {
          t._visibility &= -3;
          Ll(e);
        } else {
          Fl(e);
        }
        break;
      default:
        Fl(e);
    }
  }
  function Ll(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          H = r;
          Rl(r, e);
        }
      }
      Pl(e);
    }
    for (e = e.child; e !== null; ) {
      t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Kc(8, t, t.return);
          Ll(t);
          break;
        case 22:
          n = t.stateNode;
          if (n._visibility & 2) {
            n._visibility &= -3;
            Ll(t);
          }
          break;
        default:
          Ll(t);
      }
      e = e.sibling;
    }
  }
  function Rl(e, t) {
    while (H !== null) {
      var n = H;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Kc(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var r = n.memoizedState.cachePool.pool;
            if (r != null) {
              r.refCount++;
            }
          }
          break;
        case 24:
          ga(n.memoizedState.cache);
      }
      r = n.child;
      if (r !== null) {
        r.return = n;
        H = r;
      } else {
        a: for (n = e; H !== null; ) {
          r = H;
          var i = r.sibling;
          var a = r.return;
          ll(r);
          if (r === n) {
            H = null;
            break a;
          }
          if (i !== null) {
            i.return = a;
            H = i;
            break a;
          }
          H = a;
        }
      }
    }
  }
  var zl = {
    getCacheForType: function (e) {
      var t = la(M);
      var n = t.data.get(e);
      if (n === undefined) {
        n = e();
        t.data.set(e, n);
      }
      return n;
    },
    cacheSignal: function () {
      return la(M).controller.signal;
    },
  };
  var Bl = typeof WeakMap == `function` ? WeakMap : Map;
  var W = 0;
  var G = null;
  var K = null;
  var q = 0;
  var J = 0;
  var Vl = null;
  var Hl = false;
  var Ul = false;
  var Wl = false;
  var Gl = 0;
  var Y = 0;
  var Kl = 0;
  var ql = 0;
  var Jl = 0;
  var Yl = 0;
  var Xl = 0;
  var Zl = null;
  var Ql = null;
  var $l = false;
  var eu = 0;
  var tu = 0;
  var nu = Infinity;
  var ru = null;
  var iu = null;
  var X = 0;
  var au = null;
  var ou = null;
  var su = 0;
  var cu = 0;
  var lu = null;
  var uu = null;
  var du = 0;
  var fu = null;
  function pu() {
    if (W & 2 && q !== 0) {
      return q & -q;
    } else if (T.T === null) {
      return pt();
    } else {
      return dd();
    }
  }
  function mu() {
    if (Yl === 0) {
      if (!(q & 536870912) || j) {
        var e = Qe;
        Qe <<= 1;
        if (!(Qe & 3932160)) {
          Qe = 262144;
        }
        Yl = e;
      } else {
        Yl = 536870912;
      }
    }
    e = uo.current;
    if (e !== null) {
      e.flags |= 32;
    }
    return Yl;
  }
  function hu(e, t, n) {
    if ((e === G && (J === 2 || J === 9)) || e.cancelPendingCommit !== null) {
      Su(e, 0);
      yu(e, q, Yl, false);
    }
    ot(e, n);
    if (!(W & 2) || e !== G) {
      if (e === G) {
        if (!(W & 2)) {
          ql |= n;
        }
        if (Y === 4) {
          yu(e, q, Yl, false);
        }
      }
      rd(e);
    }
  }
  function gu(e, t, n) {
    if (W & 6) {
      throw Error(i(327));
    }
    var r = (!n && (t & 127) == 0 && (t & e.expiredLanes) === 0) || nt(e, t);
    var a = r ? Au(e, t) : Ou(e, t, true);
    var o = r;
    do {
      if (a === 0) {
        if (Ul && !r) {
          yu(e, t, 0, false);
        }
        break;
      } else {
        n = e.current.alternate;
        if (o && !vu(n)) {
          a = Ou(e, t, false);
          o = false;
          continue;
        }
        if (a === 2) {
          o = t;
          if (e.errorRecoveryDisabledLanes & o) {
            var s = 0;
          } else {
            s = e.pendingLanes & -536870913;
            s = s === 0 ? (s & 536870912 ? 536870912 : 0) : s;
          }
          if (s !== 0) {
            t = s;
            a: {
              var c = e;
              a = Zl;
              var l = c.current.memoizedState.isDehydrated;
              if (l) {
                Su(c, s).flags |= 256;
              }
              s = Ou(c, s, false);
              if (s !== 2) {
                if (Wl && !l) {
                  c.errorRecoveryDisabledLanes |= o;
                  ql |= o;
                  a = 4;
                  break a;
                }
                o = Ql;
                Ql = a;
                if (o !== null) {
                  if (Ql === null) {
                    Ql = o;
                  } else {
                    Ql.push.apply(Ql, o);
                  }
                }
              }
              a = s;
            }
            o = false;
            if (a !== 2) {
              continue;
            }
          }
        }
        if (a === 1) {
          Su(e, 0);
          yu(e, t, 0, true);
          break;
        }
        a: {
          r = e;
          o = a;
          switch (o) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((t & 4194048) !== t) {
                break;
              }
            case 6:
              yu(r, t, Yl, !Hl);
              break a;
            case 2:
              Ql = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((t & 62914560) === t && ((a = eu + 300 - Fe()), a > 10)) {
            yu(r, t, Yl, !Hl);
            if (tt(r, 0, true) !== 0) {
              break a;
            }
            su = t;
            r.timeoutHandle = Kd(
              _u.bind(null, r, n, Ql, ru, $l, t, Yl, ql, Xl, Hl, o, `Throttled`, -0, 0),
              a,
            );
            break a;
          }
          _u(r, n, Ql, ru, $l, t, Yl, ql, Xl, Hl, o, null, -0, 0);
        }
      }
      break;
    } while (1);
    rd(e);
  }
  function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
    e.timeoutHandle = -1;
    d = t.subtreeFlags;
    if (d & 8192 || (d & 16785408) == 16785408) {
      d = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: ln,
      };
      Nl(t, a, d);
      var m = (a & 62914560) === a ? eu - Fe() : (a & 4194048) === a ? tu - Fe() : 0;
      m = qf(d, m);
      if (m !== null) {
        su = a;
        e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p));
        yu(e, a, o, !l);
        return;
      }
    }
    Lu(e, t, a, n, r, i, o, s, c);
  }
  function vu(e) {
    var t = e;
    for (;;) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      ) {
        for (var r = 0; r < n.length; r++) {
          var i = n[r];
          var a = i.getSnapshot;
          i = i.value;
          try {
            if (!jr(a(), i)) {
              return false;
            }
          } catch {
            return false;
          }
        }
      }
      n = t.child;
      if (t.subtreeFlags & 16384 && n !== null) {
        n.return = t;
        t = n;
      } else {
        if (t === e) {
          break;
        }
        while (t.sibling === null) {
          if (t.return === null || t.return === e) {
            return true;
          }
          t = t.return;
        }
        t.sibling.return = t.return;
        t = t.sibling;
      }
    }
    return true;
  }
  function yu(e, t, n, r) {
    t &= ~Jl;
    t &= ~ql;
    e.suspendedLanes |= t;
    e.pingedLanes &= ~t;
    if (r) {
      e.warmLanes |= t;
    }
    r = e.expirationTimes;
    for (var i = t; i > 0; ) {
      var a = 31 - qe(i);
      var o = 1 << a;
      r[a] = -1;
      i &= ~o;
    }
    if (n !== 0) {
      ct(e, n, t);
    }
  }
  function bu() {
    if (W & 6) {
      return true;
    } else {
      id(0, false);
      return false;
    }
  }
  function xu() {
    if (K !== null) {
      if (J === 0) {
        var e = K.return;
      } else {
        e = K;
        ta = ea = null;
        Po(e);
        za = null;
        Ba = 0;
        e = K;
      }
      while (e !== null) {
        Wc(e.alternate, e);
        e = e.return;
      }
      K = null;
    }
  }
  function Su(e, t) {
    var n = e.timeoutHandle;
    if (n !== -1) {
      e.timeoutHandle = -1;
      qd(n);
    }
    n = e.cancelPendingCommit;
    if (n !== null) {
      e.cancelPendingCommit = null;
      n();
    }
    su = 0;
    xu();
    G = e;
    K = n = yi(e.current, null);
    q = t;
    J = 0;
    Vl = null;
    Hl = false;
    Ul = nt(e, t);
    Wl = false;
    Xl = Yl = Jl = ql = Kl = Y = 0;
    Ql = Zl = null;
    $l = false;
    if (t & 8) {
      t |= t & 32;
    }
    var r = e.entangledLanes;
    if (r !== 0) {
      e = e.entanglements;
      r &= t;
      while (r > 0) {
        var i = 31 - qe(r);
        var a = 1 << i;
        t |= e[i];
        r &= ~a;
      }
    }
    Gl = t;
    li();
    return n;
  }
  function Cu(e, t) {
    P = null;
    T.H = Us;
    if (t === ka || t === ja) {
      t = La();
      J = 3;
    } else if (t === Aa) {
      t = La();
      J = 4;
    } else {
      J = t === sc ? 8 : typeof t == `object` && t && typeof t.then == `function` ? 6 : 1;
    }
    Vl = t;
    if (K === null) {
      Y = 1;
      tc(e, Di(t, e.current));
    }
  }
  function wu() {
    var e = uo.current;
    if (e === null) {
      return true;
    } else if ((q & 4194048) === q) {
      return fo === null;
    } else if ((q & 62914560) === q || q & 536870912) {
      return e === fo;
    } else {
      return false;
    }
  }
  function Tu() {
    var e = T.H;
    T.H = Us;
    if (e === null) {
      return Us;
    } else {
      return e;
    }
  }
  function Eu() {
    var e = T.A;
    T.A = zl;
    return e;
  }
  function Du() {
    Y = 4;
    if (!Hl && ((q & 4194048) === q || uo.current === null)) {
      Ul = true;
    }
    if ((!!(Kl & 134217727) || !!(ql & 134217727)) && G !== null) {
      yu(G, q, Yl, false);
    }
  }
  function Ou(e, t, n) {
    var r = W;
    W |= 2;
    var i = Tu();
    var a = Eu();
    if (G !== e || q !== t) {
      ru = null;
      Su(e, t);
    }
    t = false;
    var o = Y;
    a: do {
      try {
        if (J !== 0 && K !== null) {
          var s = K;
          var c = Vl;
          switch (J) {
            case 8:
              xu();
              o = 6;
              break a;
            case 3:
            case 2:
            case 9:
            case 6:
              if (uo.current === null) {
                t = true;
              }
              var l = J;
              J = 0;
              Vl = null;
              Pu(e, s, c, l);
              if (n && Ul) {
                o = 0;
                break a;
              }
              break;
            default:
              l = J;
              J = 0;
              Vl = null;
              Pu(e, s, c, l);
          }
        }
        ku();
        o = Y;
        break;
      } catch (t) {
        Cu(e, t);
      }
    } while (1);
    if (t) {
      e.shellSuspendCounter++;
    }
    ta = ea = null;
    W = r;
    T.H = i;
    T.A = a;
    if (K === null) {
      G = null;
      q = 0;
      li();
    }
    return o;
  }
  function ku() {
    while (K !== null) {
      Mu(K);
    }
  }
  function Au(e, t) {
    var n = W;
    W |= 2;
    var r = Tu();
    var a = Eu();
    if (G !== e || q !== t) {
      ru = null;
      nu = Fe() + 500;
      Su(e, t);
    } else {
      Ul = nt(e, t);
    }
    a: do {
      try {
        if (J !== 0 && K !== null) {
          t = K;
          var o = Vl;
          b: switch (J) {
            case 1:
              J = 0;
              Vl = null;
              Pu(e, t, o, 1);
              break;
            case 2:
            case 9:
              if (Na(o)) {
                J = 0;
                Vl = null;
                Nu(t);
                break;
              }
              t = function () {
                if ((J === 2 || J === 9) && G === e) {
                  J = 7;
                }
                rd(e);
              };
              o.then(t, t);
              break a;
            case 3:
              J = 7;
              break a;
            case 4:
              J = 5;
              break a;
            case 7:
              if (Na(o)) {
                J = 0;
                Vl = null;
                Nu(t);
              } else {
                J = 0;
                Vl = null;
                Pu(e, t, o, 7);
              }
              break;
            case 5:
              var s = null;
              switch (K.tag) {
                case 26:
                  s = K.memoizedState;
                case 5:
                case 27:
                  var c = K;
                  if (s ? Wf(s) : c.stateNode.complete) {
                    J = 0;
                    Vl = null;
                    var l = c.sibling;
                    if (l !== null) {
                      K = l;
                    } else {
                      var u = c.return;
                      if (u === null) {
                        K = null;
                      } else {
                        K = u;
                        Fu(u);
                      }
                    }
                    break b;
                  }
              }
              J = 0;
              Vl = null;
              Pu(e, t, o, 5);
              break;
            case 6:
              J = 0;
              Vl = null;
              Pu(e, t, o, 6);
              break;
            case 8:
              xu();
              Y = 6;
              break a;
            default:
              throw Error(i(462));
          }
        }
        ju();
        break;
      } catch (t) {
        Cu(e, t);
      }
    } while (1);
    ta = ea = null;
    T.H = r;
    T.A = a;
    W = n;
    if (K === null) {
      G = null;
      q = 0;
      li();
      return Y;
    } else {
      return 0;
    }
  }
  function ju() {
    while (K !== null && !Ne()) {
      Mu(K);
    }
  }
  function Mu(e) {
    var t = Ic(e.alternate, e, Gl);
    e.memoizedProps = e.pendingProps;
    if (t === null) {
      Fu(e);
    } else {
      K = t;
    }
  }
  function Nu(e) {
    var t = e;
    var n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = bc(n, t, t.pendingProps, t.type, undefined, q);
        break;
      case 11:
        t = bc(n, t, t.pendingProps, t.type.render, t.ref, q);
        break;
      case 5:
        Po(t);
      default:
        Wc(n, t);
        t = K = bi(t, Gl);
        t = Ic(n, t, Gl);
    }
    e.memoizedProps = e.pendingProps;
    if (t === null) {
      Fu(e);
    } else {
      K = t;
    }
  }
  function Pu(e, t, n, r) {
    ta = ea = null;
    Po(t);
    za = null;
    Ba = 0;
    var i = t.return;
    try {
      if (oc(e, i, t, n, q)) {
        Y = 1;
        tc(e, Di(n, e.current));
        K = null;
        return;
      }
    } catch (t) {
      if (i !== null) {
        K = i;
        throw t;
      }
      Y = 1;
      tc(e, Di(n, e.current));
      K = null;
      return;
    }
    if (t.flags & 32768) {
      if (j || r === 1) {
        e = true;
      } else if (Ul || q & 536870912) {
        e = false;
      } else {
        Hl = e = true;
        if (r === 2 || r === 9 || r === 3 || r === 6) {
          r = uo.current;
          if (r !== null && r.tag === 13) {
            r.flags |= 16384;
          }
        }
      }
      Iu(t, e);
    } else {
      Fu(t);
    }
  }
  function Fu(e) {
    var t = e;
    do {
      if (t.flags & 32768) {
        Iu(t, Hl);
        return;
      }
      e = t.return;
      var n = Hc(t.alternate, t, Gl);
      if (n !== null) {
        K = n;
        return;
      }
      t = t.sibling;
      if (t !== null) {
        K = t;
        return;
      }
      K = t = e;
    } while (t !== null);
    if (Y === 0) {
      Y = 5;
    }
  }
  function Iu(e, t) {
    do {
      var n = Uc(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767;
        K = n;
        return;
      }
      n = e.return;
      if (n !== null) {
        n.flags |= 32768;
        n.subtreeFlags = 0;
        n.deletions = null;
      }
      if (!t && ((e = e.sibling), e !== null)) {
        K = e;
        return;
      }
      K = e = n;
    } while (e !== null);
    Y = 6;
    K = null;
  }
  function Lu(e, t, n, r, a, o, s, c, l) {
    e.cancelPendingCommit = null;
    do {
      Hu();
    } while (X !== 0);
    if (W & 6) {
      throw Error(i(327));
    }
    if (t !== null) {
      if (t === e.current) {
        throw Error(i(177));
      }
      o = t.lanes | t.childLanes;
      o |= ci;
      st(e, n, o, s, c, l);
      if (e === G) {
        K = G = null;
        q = 0;
      }
      ou = t;
      au = e;
      su = n;
      cu = o;
      lu = a;
      uu = r;
      if (t.subtreeFlags & 10256 || t.flags & 10256) {
        e.callbackNode = null;
        e.callbackPriority = 0;
        Xu(ze, function () {
          Uu();
          return null;
        });
      } else {
        e.callbackNode = null;
        e.callbackPriority = 0;
      }
      r = (t.flags & 13878) != 0;
      if (t.subtreeFlags & 13878 || r) {
        r = T.T;
        T.T = null;
        a = E.p;
        E.p = 2;
        s = W;
        W |= 4;
        try {
          sl(e, t, n);
        } finally {
          W = s;
          E.p = a;
          T.T = r;
        }
      }
      X = 1;
      Ru();
      zu();
      Bu();
    }
  }
  function Ru() {
    if (X === 1) {
      X = 0;
      var e = au;
      var t = ou;
      var n = (t.flags & 13878) != 0;
      if (t.subtreeFlags & 13878 || n) {
        n = T.T;
        T.T = null;
        var r = E.p;
        E.p = 2;
        var i = W;
        W |= 4;
        try {
          yl(t, e);
          var a = zd;
          var o = Ir(e.containerInfo);
          var s = a.focusedElem;
          var c = a.selectionRange;
          if (o !== s && s && s.ownerDocument && Fr(s.ownerDocument.documentElement, s)) {
            if (c !== null && Lr(s)) {
              var l = c.start;
              var u = c.end;
              if (u === undefined) {
                u = l;
              }
              if (`selectionStart` in s) {
                s.selectionStart = l;
                s.selectionEnd = Math.min(u, s.value.length);
              } else {
                var d = s.ownerDocument || document;
                var f = (d && d.defaultView) || window;
                if (f.getSelection) {
                  var p = f.getSelection();
                  var m = s.textContent.length;
                  var h = Math.min(c.start, m);
                  var g = c.end === undefined ? h : Math.min(c.end, m);
                  if (!p.extend && h > g) {
                    o = g;
                    g = h;
                    h = o;
                  }
                  var _ = Pr(s, h);
                  var v = Pr(s, g);
                  if (
                    _ &&
                    v &&
                    (p.rangeCount !== 1 ||
                      p.anchorNode !== _.node ||
                      p.anchorOffset !== _.offset ||
                      p.focusNode !== v.node ||
                      p.focusOffset !== v.offset)
                  ) {
                    var y = d.createRange();
                    y.setStart(_.node, _.offset);
                    p.removeAllRanges();
                    if (h > g) {
                      p.addRange(y);
                      p.extend(v.node, v.offset);
                    } else {
                      y.setEnd(v.node, v.offset);
                      p.addRange(y);
                    }
                  }
                }
              }
            }
            d = [];
            p = s;
            while ((p = p.parentNode)) {
              if (p.nodeType === 1) {
                d.push({
                  element: p,
                  left: p.scrollLeft,
                  top: p.scrollTop,
                });
              }
            }
            if (typeof s.focus == `function`) {
              s.focus();
            }
            s = 0;
            for (; s < d.length; s++) {
              var b = d[s];
              b.element.scrollLeft = b.left;
              b.element.scrollTop = b.top;
            }
          }
          sp = !!Rd;
          zd = Rd = null;
        } finally {
          W = i;
          E.p = r;
          T.T = n;
        }
      }
      e.current = t;
      X = 2;
    }
  }
  function zu() {
    if (X === 2) {
      X = 0;
      var e = au;
      var t = ou;
      var n = (t.flags & 8772) != 0;
      if (t.subtreeFlags & 8772 || n) {
        n = T.T;
        T.T = null;
        var r = E.p;
        E.p = 2;
        var i = W;
        W |= 4;
        try {
          cl(e, t.alternate, t);
        } finally {
          W = i;
          E.p = r;
          T.T = n;
        }
      }
      X = 3;
    }
  }
  function Bu() {
    if (X === 4 || X === 3) {
      X = 0;
      Pe();
      var e = au;
      var t = ou;
      var n = su;
      var r = uu;
      if (t.subtreeFlags & 10256 || t.flags & 10256) {
        X = 5;
      } else {
        X = 0;
        ou = au = null;
        Vu(e, e.pendingLanes);
      }
      var i = e.pendingLanes;
      if (i === 0) {
        iu = null;
      }
      ft(n);
      t = t.stateNode;
      if (Ge && typeof Ge.onCommitFiberRoot == `function`) {
        try {
          Ge.onCommitFiberRoot(We, t, undefined, (t.current.flags & 128) == 128);
        } catch {}
      }
      if (r !== null) {
        t = T.T;
        i = E.p;
        E.p = 2;
        T.T = null;
        try {
          var a = e.onRecoverableError;
          for (var o = 0; o < r.length; o++) {
            var s = r[o];
            a(s.value, {
              componentStack: s.stack,
            });
          }
        } finally {
          T.T = t;
          E.p = i;
        }
      }
      if (su & 3) {
        Hu();
      }
      rd(e);
      i = e.pendingLanes;
      if (n & 261930 && i & 42) {
        if (e === fu) {
          du++;
        } else {
          du = 0;
          fu = e;
        }
      } else {
        du = 0;
      }
      id(0, false);
    }
  }
  function Vu(e, t) {
    if ((e.pooledCacheLanes &= t) === 0) {
      t = e.pooledCache;
      if (t != null) {
        e.pooledCache = null;
        ga(t);
      }
    }
  }
  function Hu() {
    Ru();
    zu();
    Bu();
    return Uu();
  }
  function Uu() {
    if (X !== 5) {
      return false;
    }
    var e = au;
    var t = cu;
    cu = 0;
    var n = ft(su);
    var r = T.T;
    var a = E.p;
    try {
      E.p = n < 32 ? 32 : n;
      T.T = null;
      n = lu;
      lu = null;
      var o = au;
      var s = su;
      X = 0;
      ou = au = null;
      su = 0;
      if (W & 6) {
        throw Error(i(331));
      }
      var c = W;
      W |= 4;
      Il(o.current);
      Ol(o, o.current, s, n);
      W = c;
      id(0, false);
      if (Ge && typeof Ge.onPostCommitFiberRoot == `function`) {
        try {
          Ge.onPostCommitFiberRoot(We, o);
        } catch {}
      }
      return true;
    } finally {
      E.p = a;
      T.T = r;
      Vu(e, t);
    }
  }
  function Wu(e, t, n) {
    t = Di(n, t);
    t = rc(e.stateNode, t, 2);
    e = Za(e, t, 2);
    if (e !== null) {
      ot(e, 2);
      rd(e);
    }
  }
  function Z(e, t, n) {
    if (e.tag === 3) {
      Wu(e, e, n);
    } else {
      while (t !== null) {
        if (t.tag === 3) {
          Wu(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == `function` ||
            (typeof r.componentDidCatch == `function` && (iu === null || !iu.has(r)))
          ) {
            e = Di(n, e);
            n = ic(2);
            r = Za(t, n, 2);
            if (r !== null) {
              ac(n, r, t, e);
              ot(r, 2);
              rd(r);
            }
            break;
          }
        }
        t = t.return;
      }
    }
  }
  function Gu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Bl();
      var i = new Set();
      r.set(t, i);
    } else {
      i = r.get(t);
      if (i === undefined) {
        i = new Set();
        r.set(t, i);
      }
    }
    if (!i.has(n)) {
      Wl = true;
      i.add(n);
      e = Ku.bind(null, e, t, n);
      t.then(e, e);
    }
  }
  function Ku(e, t, n) {
    var r = e.pingCache;
    if (r !== null) {
      r.delete(t);
    }
    e.pingedLanes |= e.suspendedLanes & n;
    e.warmLanes &= ~n;
    if (G === e && (q & n) === n) {
      if (Y === 4 || (Y === 3 && (q & 62914560) === q && Fe() - eu < 300)) {
        if (!(W & 2)) {
          Su(e, 0);
        }
      } else {
        Jl |= n;
      }
      if (Xl === q) {
        Xl = 0;
      }
    }
    rd(e);
  }
  function qu(e, t) {
    if (t === 0) {
      t = it();
    }
    e = fi(e, t);
    if (e !== null) {
      ot(e, t);
      rd(e);
    }
  }
  function Ju(e) {
    var t = e.memoizedState;
    var n = 0;
    if (t !== null) {
      n = t.retryLane;
    }
    qu(e, n);
  }
  function Yu(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode;
        var a = e.memoizedState;
        if (a !== null) {
          n = a.retryLane;
        }
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    if (r !== null) {
      r.delete(t);
    }
    qu(e, n);
  }
  function Xu(e, t) {
    return je(e, t);
  }
  var Zu = null;
  var Qu = null;
  var $u = false;
  var ed = false;
  var td = false;
  var nd = 0;
  function rd(e) {
    if (e !== Qu && e.next === null) {
      if (Qu === null) {
        Zu = Qu = e;
      } else {
        Qu = Qu.next = e;
      }
    }
    ed = true;
    if (!$u) {
      $u = true;
      ud();
    }
  }
  function id(e, t) {
    if (!td && ed) {
      td = true;
      do {
        for (var n = false, r = Zu; r !== null; ) {
          if (!t) {
            if (e !== 0) {
              var i = r.pendingLanes;
              if (i === 0) {
                var a = 0;
              } else {
                var o = r.suspendedLanes;
                var s = r.pingedLanes;
                a = (1 << (31 - qe(e | 42) + 1)) - 1;
                a &= i & ~(o & ~s);
                a = a & 201326741 ? (a & 201326741) | 1 : a ? a | 2 : 0;
              }
              if (a !== 0) {
                n = true;
                ld(r, a);
              }
            } else {
              a = q;
              a = tt(r, r === G ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1);
              if (!!(a & 3) && !nt(r, a)) {
                n = true;
                ld(r, a);
              }
            }
          }
          r = r.next;
        }
      } while (n);
      td = false;
    }
  }
  function ad() {
    od();
  }
  function od() {
    ed = $u = false;
    var e = 0;
    if (nd !== 0 && Gd()) {
      e = nd;
    }
    var t = Fe();
    for (var n = null, r = Zu; r !== null; ) {
      var i = r.next;
      var a = sd(r, t);
      if (a === 0) {
        r.next = null;
        if (n === null) {
          Zu = i;
        } else {
          n.next = i;
        }
        if (i === null) {
          Qu = n;
        }
      } else {
        n = r;
        if (e !== 0 || a & 3) {
          ed = true;
        }
      }
      r = i;
    }
    if (X === 0 || X === 5) {
      id(e, false);
    }
    if (nd !== 0) {
      nd = 0;
    }
  }
  function sd(e, t) {
    var n = e.suspendedLanes;
    var r = e.pingedLanes;
    var i = e.expirationTimes;
    for (var a = e.pendingLanes & -62914561; a > 0; ) {
      var o = 31 - qe(a);
      var s = 1 << o;
      var c = i[o];
      if (c === -1) {
        if ((s & n) === 0 || (s & r) !== 0) {
          i[o] = rt(s, t);
        }
      } else if (c <= t) {
        e.expiredLanes |= s;
      }
      a &= ~s;
    }
    t = G;
    n = q;
    n = tt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1);
    r = e.callbackNode;
    if (n === 0 || (e === t && (J === 2 || J === 9)) || e.cancelPendingCommit !== null) {
      if (r !== null && r !== null) {
        Me(r);
      }
      e.callbackNode = null;
      return (e.callbackPriority = 0);
    }
    if (!(n & 3) || nt(e, n)) {
      t = n & -n;
      if (t === e.callbackPriority) {
        return t;
      }
      if (r !== null) {
        Me(r);
      }
      switch (ft(n)) {
        case 2:
        case 8:
          n = Re;
          break;
        case 32:
          n = ze;
          break;
        case 268435456:
          n = Ve;
          break;
        default:
          n = ze;
      }
      r = cd.bind(null, e);
      n = je(n, r);
      e.callbackPriority = t;
      e.callbackNode = n;
      return t;
    }
    if (r !== null && r !== null) {
      Me(r);
    }
    e.callbackPriority = 2;
    e.callbackNode = null;
    return 2;
  }
  function cd(e, t) {
    if (X !== 0 && X !== 5) {
      e.callbackNode = null;
      e.callbackPriority = 0;
      return null;
    }
    var n = e.callbackNode;
    if (Hu() && e.callbackNode !== n) {
      return null;
    }
    var r = q;
    r = tt(e, e === G ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1);
    if (r === 0) {
      return null;
    } else {
      gu(e, r, t);
      sd(e, Fe());
      if (e.callbackNode != null && e.callbackNode === n) {
        return cd.bind(null, e);
      } else {
        return null;
      }
    }
  }
  function ld(e, t) {
    if (Hu()) {
      return null;
    }
    gu(e, t, true);
  }
  function ud() {
    Yd(function () {
      if (W & 6) {
        je(Le, ad);
      } else {
        od();
      }
    });
  }
  function dd() {
    if (nd === 0) {
      var e = ya;
      if (e === 0) {
        e = Ze;
        Ze <<= 1;
        if (!(Ze & 261888)) {
          Ze = 256;
        }
      }
      nd = e;
    }
    return nd;
  }
  function fd(e) {
    if (e == null || typeof e == `symbol` || typeof e == `boolean`) {
      return null;
    } else if (typeof e == `function`) {
      return e;
    } else {
      return cn(`${e}`);
    }
  }
  function pd(e, t) {
    var n = t.ownerDocument.createElement(`input`);
    n.name = t.name;
    n.value = t.value;
    if (e.id) {
      n.setAttribute(`form`, e.id);
    }
    t.parentNode.insertBefore(n, t);
    e = new FormData(e);
    n.parentNode.removeChild(n);
    return e;
  }
  function md(e, t, n, r, i) {
    if (t === `submit` && n && n.stateNode === i) {
      var a = fd((i[_t] || null).action);
      var o = r.submitter;
      if (o) {
        t = (t = o[_t] || null) ? fd(t.formAction) : o.getAttribute(`formAction`);
        if (t !== null) {
          a = t;
          o = null;
        }
      }
      var s = new An(`action`, `action`, null, r, i);
      e.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (nd !== 0) {
                  var e = o ? pd(i, o) : new FormData(i);
                  ks(
                    n,
                    {
                      pending: true,
                      data: e,
                      method: i.method,
                      action: a,
                    },
                    null,
                    e,
                  );
                }
              } else if (typeof a == `function`) {
                s.preventDefault();
                e = o ? pd(i, o) : new FormData(i);
                ks(
                  n,
                  {
                    pending: true,
                    data: e,
                    method: i.method,
                    action: a,
                  },
                  a,
                  e,
                );
              }
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var hd = 0; hd < ri.length; hd++) {
    var gd = ri[hd];
    ii(gd.toLowerCase(), `on${gd[0].toUpperCase() + gd.slice(1)}`);
  }
  ii(Yr, `onAnimationEnd`);
  ii(Xr, `onAnimationIteration`);
  ii(Zr, `onAnimationStart`);
  ii(`dblclick`, `onDoubleClick`);
  ii(`focusin`, `onFocus`);
  ii(`focusout`, `onBlur`);
  ii(Qr, `onTransitionRun`);
  ii($r, `onTransitionStart`);
  ii(ei, `onTransitionCancel`);
  ii(ti, `onTransitionEnd`);
  Mt(`onMouseEnter`, [`mouseout`, `mouseover`]);
  Mt(`onMouseLeave`, [`mouseout`, `mouseover`]);
  Mt(`onPointerEnter`, [`pointerout`, `pointerover`]);
  Mt(`onPointerLeave`, [`pointerout`, `pointerover`]);
  jt(`onChange`, `change click focusin focusout input keydown keyup selectionchange`.split(` `));
  jt(
    `onSelect`,
    `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `),
  );
  jt(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]);
  jt(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `));
  jt(`onCompositionStart`, `compositionstart focusout keydown keypress keyup mousedown`.split(` `));
  jt(`onCompositionUpdate`, `compositionupdate focusout keydown keypress keyup mousedown`.split(` `));
  var _d =
    `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
      ` `,
    );
  var vd = new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));
  function yd(e, t) {
    t = (t & 4) != 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      var i = r.event;
      r = r.listeners;
      a: {
        var a = undefined;
        if (t) {
          for (var o = r.length - 1; o >= 0; o--) {
            var s = r[o];
            var c = s.instance;
            var l = s.currentTarget;
            s = s.listener;
            if (c !== a && i.isPropagationStopped()) {
              break a;
            }
            a = s;
            i.currentTarget = l;
            try {
              a(i);
            } catch (e) {
              ai(e);
            }
            i.currentTarget = null;
            a = c;
          }
        } else {
          for (o = 0; o < r.length; o++) {
            s = r[o];
            c = s.instance;
            l = s.currentTarget;
            s = s.listener;
            if (c !== a && i.isPropagationStopped()) {
              break a;
            }
            a = s;
            i.currentTarget = l;
            try {
              a(i);
            } catch (e) {
              ai(e);
            }
            i.currentTarget = null;
            a = c;
          }
        }
      }
    }
  }
  function Q(e, t) {
    var n = t[yt];
    if (n === undefined) {
      n = t[yt] = new Set();
    }
    var r = `${e}__bubble`;
    if (!n.has(r)) {
      Cd(t, e, 2, false);
      n.add(r);
    }
  }
  function bd(e, t, n) {
    var r = 0;
    if (t) {
      r |= 4;
    }
    Cd(n, e, r, t);
  }
  var xd = `_reactListening${Math.random().toString(36).slice(2)}`;
  function Sd(e) {
    if (!e[xd]) {
      e[xd] = true;
      kt.forEach(function (t) {
        if (t !== `selectionchange`) {
          if (!vd.has(t)) {
            bd(t, false, e);
          }
          bd(t, true, e);
        }
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      if (t !== null && !t[xd]) {
        t[xd] = true;
        bd(`selectionchange`, false, t);
      }
    }
  }
  function Cd(e, t, n, r) {
    switch (mp(t)) {
      case 2:
        var i = cp;
        break;
      case 8:
        i = lp;
        break;
      default:
        i = up;
    }
    n = i.bind(null, t, n, e);
    i = undefined;
    if (!!yn && (t === `touchstart` || t === `touchmove` || t === `wheel`)) {
      i = true;
    }
    if (r) {
      if (i === undefined) {
        e.addEventListener(t, n, true);
      } else {
        e.addEventListener(t, n, {
          capture: true,
          passive: i,
        });
      }
    } else if (i === undefined) {
      e.addEventListener(t, n, false);
    } else {
      e.addEventListener(t, n, {
        passive: i,
      });
    }
  }
  function wd(e, t, n, r, i) {
    var a = r;
    if (!(t & 1) && !(t & 2) && r !== null) {
      a: while (true) {
        if (r === null) {
          return;
        }
        var s = r.tag;
        if (s === 3 || s === 4) {
          var c = r.stateNode.containerInfo;
          if (c === i) {
            break;
          }
          if (s === 4) {
            for (s = r.return; s !== null; ) {
              var l = s.tag;
              if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) {
                return;
              }
              s = s.return;
            }
          }
          while (c !== null) {
            s = Tt(c);
            if (s === null) {
              return;
            }
            l = s.tag;
            if (l === 5 || l === 6 || l === 26 || l === 27) {
              r = a = s;
              continue a;
            }
            c = c.parentNode;
          }
        }
        r = r.return;
      }
    }
    gn(function () {
      var r = a;
      var i = dn(n);
      var s = [];
      a: {
        var c = ni.get(e);
        if (c !== undefined) {
          var l = An;
          var u = e;
          switch (e) {
            case `keypress`:
              if (Tn(n) === 0) {
                break a;
              }
            case `keydown`:
            case `keyup`:
              l = Jn;
              break;
            case `focusin`:
              u = `focus`;
              l = zn;
              break;
            case `focusout`:
              u = `blur`;
              l = zn;
              break;
            case `beforeblur`:
            case `afterblur`:
              l = zn;
              break;
            case `click`:
              if (n.button === 2) {
                break a;
              }
            case `auxclick`:
            case `dblclick`:
            case `mousedown`:
            case `mousemove`:
            case `mouseup`:
            case `mouseout`:
            case `mouseover`:
            case `contextmenu`:
              l = Ln;
              break;
            case `drag`:
            case `dragend`:
            case `dragenter`:
            case `dragexit`:
            case `dragleave`:
            case `dragover`:
            case `dragstart`:
            case `drop`:
              l = Rn;
              break;
            case `touchcancel`:
            case `touchend`:
            case `touchmove`:
            case `touchstart`:
              l = Xn;
              break;
            case Yr:
            case Xr:
            case Zr:
              l = Bn;
              break;
            case ti:
              l = Zn;
              break;
            case `scroll`:
            case `scrollend`:
              l = Mn;
              break;
            case `wheel`:
              l = Qn;
              break;
            case `copy`:
            case `cut`:
            case `paste`:
              l = Vn;
              break;
            case `gotpointercapture`:
            case `lostpointercapture`:
            case `pointercancel`:
            case `pointerdown`:
            case `pointermove`:
            case `pointerout`:
            case `pointerover`:
            case `pointerup`:
              l = Yn;
              break;
            case `toggle`:
            case `beforetoggle`:
              l = $n;
          }
          var d = (t & 4) != 0;
          var f = !d && (e === `scroll` || e === `scrollend`);
          var p = d ? (c === null ? null : `${c}Capture`) : c;
          d = [];
          for (var m = r, h; m !== null; ) {
            var g = m;
            h = g.stateNode;
            g = g.tag;
            if ((g === 5 || g === 26 || g === 27) && h !== null && p !== null) {
              g = _n(m, p);
              if (g != null) {
                d.push(Td(m, g, h));
              }
            }
            if (f) {
              break;
            }
            m = m.return;
          }
          if (d.length > 0) {
            c = new l(c, u, null, n, i);
            s.push({
              event: c,
              listeners: d,
            });
          }
        }
      }
      if (!(t & 7)) {
        a: {
          c = e === `mouseover` || e === `pointerover`;
          l = e === `mouseout` || e === `pointerout`;
          if (c && n !== un && (u = n.relatedTarget || n.fromElement) && (Tt(u) || u[vt])) {
            break a;
          }
          if (
            (l || c) &&
            ((c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window),
            l
              ? ((u = n.relatedTarget || n.toElement),
                (l = r),
                (u = u ? Tt(u) : null),
                u !== null &&
                  ((f = o(u)), (d = u.tag), u !== f || (d !== 5 && d !== 27 && d !== 6)) &&
                  (u = null))
              : ((l = null), (u = r)),
            l !== u)
          ) {
            d = Ln;
            g = `onMouseLeave`;
            p = `onMouseEnter`;
            m = `mouse`;
            if (e === `pointerout` || e === `pointerover`) {
              d = Yn;
              g = `onPointerLeave`;
              p = `onPointerEnter`;
              m = `pointer`;
            }
            f = l == null ? c : Dt(l);
            h = u == null ? c : Dt(u);
            c = new d(g, `${m}leave`, l, n, i);
            c.target = f;
            c.relatedTarget = h;
            g = null;
            if (Tt(i) === r) {
              d = new d(p, `${m}enter`, u, n, i);
              d.target = h;
              d.relatedTarget = f;
              g = d;
            }
            f = g;
            if (l && u) {
              b: {
                d = Dd;
                p = l;
                m = u;
                h = 0;
                g = p;
                for (; g; g = d(g)) {
                  h++;
                }
                g = 0;
                for (var _ = m; _; _ = d(_)) {
                  g++;
                }
                while (h - g > 0) {
                  p = d(p);
                  h--;
                }
                while (g - h > 0) {
                  m = d(m);
                  g--;
                }
                while (h--) {
                  if (p === m || (m !== null && p === m.alternate)) {
                    d = p;
                    break b;
                  }
                  p = d(p);
                  m = d(m);
                }
                d = null;
              }
            } else {
              d = null;
            }
            if (l !== null) {
              Od(s, c, l, d, false);
            }
            if (u !== null && f !== null) {
              Od(s, f, u, d, true);
            }
          }
        }
        a: {
          c = r ? Dt(r) : window;
          l = c.nodeName && c.nodeName.toLowerCase();
          if (l === `select` || (l === `input` && c.type === `file`)) {
            var v = yr;
          } else if (pr(c)) {
            if (br) {
              v = kr;
            } else {
              v = Dr;
              var y = Er;
            }
          } else {
            l = c.nodeName;
            if (!l || l.toLowerCase() !== `input` || (c.type !== `checkbox` && c.type !== `radio`)) {
              if (r && an(r.elementType)) {
                v = yr;
              }
            } else {
              v = Or;
            }
          }
          if ((v &&= v(e, r))) {
            mr(s, v, n, i);
            break a;
          }
          if (y) {
            y(e, c, r);
          }
          if (e === `focusout` && r && c.type === `number` && r.memoizedProps.value != null) {
            Xt(c, `number`, c.value);
          }
        }
        y = r ? Dt(r) : window;
        switch (e) {
          case `focusin`:
            if (pr(y) || y.contentEditable === `true`) {
              zr = y;
              Br = r;
              Vr = null;
            }
            break;
          case `focusout`:
            Vr = Br = zr = null;
            break;
          case `mousedown`:
            Hr = true;
            break;
          case `contextmenu`:
          case `mouseup`:
          case `dragend`:
            Hr = false;
            Ur(s, n, i);
            break;
          case `selectionchange`:
            if (Rr) {
              break;
            }
          case `keydown`:
          case `keyup`:
            Ur(s, n, i);
        }
        var b;
        if (tr) {
          b: {
            switch (e) {
              case `compositionstart`:
                var x = `onCompositionStart`;
                break b;
              case `compositionend`:
                x = `onCompositionEnd`;
                break b;
              case `compositionupdate`:
                x = `onCompositionUpdate`;
                break b;
            }
            x = undefined;
          }
        } else if (lr) {
          if (sr(e, n)) {
            x = `onCompositionEnd`;
          }
        } else if (e === `keydown` && n.keyCode === 229) {
          x = `onCompositionStart`;
        }
        if (x) {
          if (ir && n.locale !== `ko`) {
            if (lr || x !== `onCompositionStart`) {
              if (x === `onCompositionEnd` && lr) {
                b = wn();
              }
            } else {
              xn = i;
              Sn = `value` in xn ? xn.value : xn.textContent;
              lr = true;
            }
          }
          y = Ed(r, x);
          if (y.length > 0) {
            x = new Hn(x, e, null, n, i);
            s.push({
              event: x,
              listeners: y,
            });
            if (b) {
              x.data = b;
            } else {
              b = cr(n);
              if (b !== null) {
                x.data = b;
              }
            }
          }
        }
        if ((b = rr ? ur(e, n) : dr(e, n))) {
          x = Ed(r, `onBeforeInput`);
          if (x.length > 0) {
            y = new Hn(`onBeforeInput`, `beforeinput`, null, n, i);
            s.push({
              event: y,
              listeners: x,
            });
            y.data = b;
          }
        }
        md(s, e, r, n, i);
      }
      yd(s, t);
    });
  }
  function Td(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n,
    };
  }
  function Ed(e, t) {
    var n = `${t}Capture`;
    var r = [];
    for (; e !== null; ) {
      var i = e;
      var a = i.stateNode;
      i = i.tag;
      if ((i === 5 || i === 26 || i === 27) && a !== null) {
        i = _n(e, n);
        if (i != null) {
          r.unshift(Td(e, i, a));
        }
        i = _n(e, t);
        if (i != null) {
          r.push(Td(e, i, a));
        }
      }
      if (e.tag === 3) {
        return r;
      }
      e = e.return;
    }
    return [];
  }
  function Dd(e) {
    if (e === null) {
      return null;
    }
    do {
      e = e.return;
    } while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Od(e, t, n, r, i) {
    var a = t._reactName;
    var o = [];
    for (; n !== null && n !== r; ) {
      var s = n;
      var c = s.alternate;
      var l = s.stateNode;
      s = s.tag;
      if (c !== null && c === r) {
        break;
      }
      if ((s === 5 || s === 26 || s === 27) && l !== null) {
        c = l;
        if (i) {
          l = _n(n, a);
          if (l != null) {
            o.unshift(Td(n, l, c));
          }
        } else if (!i) {
          l = _n(n, a);
          if (l != null) {
            o.push(Td(n, l, c));
          }
        }
      }
      n = n.return;
    }
    if (o.length !== 0) {
      e.push({
        event: t,
        listeners: o,
      });
    }
  }
  var kd = /\r\n?/g;
  var Ad = /\u0000|\uFFFD/g;
  function jd(e) {
    return (typeof e == `string` ? e : `${e}`)
      .replace(
        kd,
        `
`,
      )
      .replace(Ad, ``);
  }
  function Md(e, t) {
    t = jd(t);
    return jd(e) === t;
  }
  function $(e, t, n, r, a, o) {
    switch (n) {
      case `children`:
        if (typeof r == `string`) {
          if (t !== `body` && (t !== `textarea` || r !== ``)) {
            en(e, r);
          }
        } else if ((typeof r == `number` || typeof r == `bigint`) && t !== `body`) {
          en(e, `${r}`);
        }
        break;
      case `className`:
        Rt(e, `class`, r);
        break;
      case `tabIndex`:
        Rt(e, `tabindex`, r);
        break;
      case `dir`:
      case `role`:
      case `viewBox`:
      case `width`:
      case `height`:
        Rt(e, n, r);
        break;
      case `style`:
        rn(e, r, o);
        break;
      case `data`:
        if (t !== `object`) {
          Rt(e, `data`, r);
          break;
        }
      case `src`:
      case `href`:
        if (r === `` && (t !== `a` || n !== `href`)) {
          e.removeAttribute(n);
          break;
        }
        if (r == null || typeof r == `function` || typeof r == `symbol` || typeof r == `boolean`) {
          e.removeAttribute(n);
          break;
        }
        r = cn(`${r}`);
        e.setAttribute(n, r);
        break;
      case `action`:
      case `formAction`:
        if (typeof r == `function`) {
          e.setAttribute(
            n,
            `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`,
          );
          break;
        } else if (typeof o == `function`) {
          if (n === `formAction`) {
            if (t !== `input`) {
              $(e, t, `name`, a.name, a, null);
            }
            $(e, t, `formEncType`, a.formEncType, a, null);
            $(e, t, `formMethod`, a.formMethod, a, null);
            $(e, t, `formTarget`, a.formTarget, a, null);
          } else {
            $(e, t, `encType`, a.encType, a, null);
            $(e, t, `method`, a.method, a, null);
            $(e, t, `target`, a.target, a, null);
          }
        }
        if (r == null || typeof r == `symbol` || typeof r == `boolean`) {
          e.removeAttribute(n);
          break;
        }
        r = cn(`${r}`);
        e.setAttribute(n, r);
        break;
      case `onClick`:
        if (r != null) {
          e.onclick = ln;
        }
        break;
      case `onScroll`:
        if (r != null) {
          Q(`scroll`, e);
        }
        break;
      case `onScrollEnd`:
        if (r != null) {
          Q(`scrollend`, e);
        }
        break;
      case `dangerouslySetInnerHTML`:
        if (r != null) {
          if (typeof r != `object` || !(`__html` in r)) {
            throw Error(i(61));
          }
          n = r.__html;
          if (n != null) {
            if (a.children != null) {
              throw Error(i(60));
            }
            e.innerHTML = n;
          }
        }
        break;
      case `multiple`:
        e.multiple = r && typeof r != `function` && typeof r != `symbol`;
        break;
      case `muted`:
        e.muted = r && typeof r != `function` && typeof r != `symbol`;
        break;
      case `suppressContentEditableWarning`:
      case `suppressHydrationWarning`:
      case `defaultValue`:
      case `defaultChecked`:
      case `innerHTML`:
      case `ref`:
        break;
      case `autoFocus`:
        break;
      case `xlinkHref`:
        if (r == null || typeof r == `function` || typeof r == `boolean` || typeof r == `symbol`) {
          e.removeAttribute(`xlink:href`);
          break;
        }
        n = cn(`${r}`);
        e.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n);
        break;
      case `contentEditable`:
      case `spellCheck`:
      case `draggable`:
      case `value`:
      case `autoReverse`:
      case `externalResourcesRequired`:
      case `focusable`:
      case `preserveAlpha`:
        if (r != null && typeof r != `function` && typeof r != `symbol`) {
          e.setAttribute(n, `${r}`);
        } else {
          e.removeAttribute(n);
        }
        break;
      case `inert`:
      case `allowFullScreen`:
      case `async`:
      case `autoPlay`:
      case `controls`:
      case `default`:
      case `defer`:
      case `disabled`:
      case `disablePictureInPicture`:
      case `disableRemotePlayback`:
      case `formNoValidate`:
      case `hidden`:
      case `loop`:
      case `noModule`:
      case `noValidate`:
      case `open`:
      case `playsInline`:
      case `readOnly`:
      case `required`:
      case `reversed`:
      case `scoped`:
      case `seamless`:
      case `itemScope`:
        if (r && typeof r != `function` && typeof r != `symbol`) {
          e.setAttribute(n, ``);
        } else {
          e.removeAttribute(n);
        }
        break;
      case `capture`:
      case `download`:
        if (r === true) {
          e.setAttribute(n, ``);
        } else if (r !== false && r != null && typeof r != `function` && typeof r != `symbol`) {
          e.setAttribute(n, r);
        } else {
          e.removeAttribute(n);
        }
        break;
      case `cols`:
      case `rows`:
      case `size`:
      case `span`:
        if (r != null && typeof r != `function` && typeof r != `symbol` && !isNaN(r) && r >= 1) {
          e.setAttribute(n, r);
        } else {
          e.removeAttribute(n);
        }
        break;
      case `rowSpan`:
      case `start`:
        if (r == null || typeof r == `function` || typeof r == `symbol` || isNaN(r)) {
          e.removeAttribute(n);
        } else {
          e.setAttribute(n, r);
        }
        break;
      case `popover`:
        Q(`beforetoggle`, e);
        Q(`toggle`, e);
        Lt(e, `popover`, r);
        break;
      case `xlinkActuate`:
        zt(e, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r);
        break;
      case `xlinkArcrole`:
        zt(e, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r);
        break;
      case `xlinkRole`:
        zt(e, `http://www.w3.org/1999/xlink`, `xlink:role`, r);
        break;
      case `xlinkShow`:
        zt(e, `http://www.w3.org/1999/xlink`, `xlink:show`, r);
        break;
      case `xlinkTitle`:
        zt(e, `http://www.w3.org/1999/xlink`, `xlink:title`, r);
        break;
      case `xlinkType`:
        zt(e, `http://www.w3.org/1999/xlink`, `xlink:type`, r);
        break;
      case `xmlBase`:
        zt(e, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r);
        break;
      case `xmlLang`:
        zt(e, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r);
        break;
      case `xmlSpace`:
        zt(e, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r);
        break;
      case `is`:
        Lt(e, `is`, r);
        break;
      case `innerText`:
      case `textContent`:
        break;
      default:
        if (!(n.length > 2) || (n[0] !== `o` && n[0] !== `O`) || (n[1] !== `n` && n[1] !== `N`)) {
          n = on.get(n) || n;
          Lt(e, n, r);
        }
    }
  }
  function Nd(e, t, n, r, a, o) {
    switch (n) {
      case `style`:
        rn(e, r, o);
        break;
      case `dangerouslySetInnerHTML`:
        if (r != null) {
          if (typeof r != `object` || !(`__html` in r)) {
            throw Error(i(61));
          }
          n = r.__html;
          if (n != null) {
            if (a.children != null) {
              throw Error(i(60));
            }
            e.innerHTML = n;
          }
        }
        break;
      case `children`:
        if (typeof r == `string`) {
          en(e, r);
        } else if (typeof r == `number` || typeof r == `bigint`) {
          en(e, `${r}`);
        }
        break;
      case `onScroll`:
        if (r != null) {
          Q(`scroll`, e);
        }
        break;
      case `onScrollEnd`:
        if (r != null) {
          Q(`scrollend`, e);
        }
        break;
      case `onClick`:
        if (r != null) {
          e.onclick = ln;
        }
        break;
      case `suppressContentEditableWarning`:
      case `suppressHydrationWarning`:
      case `innerHTML`:
      case `ref`:
        break;
      case `innerText`:
      case `textContent`:
        break;
      default:
        if (!At.hasOwnProperty(n)) {
          a: {
            if (
              n[0] === `o` &&
              n[1] === `n` &&
              ((a = n.endsWith(`Capture`)),
              (t = n.slice(2, a ? n.length - 7 : undefined)),
              (o = e[_t] || null),
              (o = o == null ? null : o[n]),
              typeof o == `function` && e.removeEventListener(t, o, a),
              typeof r == `function`)
            ) {
              if (typeof o != `function` && o !== null) {
                if (n in e) {
                  e[n] = null;
                } else if (e.hasAttribute(n)) {
                  e.removeAttribute(n);
                }
              }
              e.addEventListener(t, r, a);
              break a;
            }
            if (n in e) {
              e[n] = r;
            } else if (r === true) {
              e.setAttribute(n, ``);
            } else {
              Lt(e, n, r);
            }
          }
        }
    }
  }
  function Pd(e, t, n) {
    switch (t) {
      case `div`:
      case `span`:
      case `svg`:
      case `path`:
      case `a`:
      case `g`:
      case `p`:
      case `li`:
        break;
      case `img`:
        Q(`error`, e);
        Q(`load`, e);
        var r = false;
        var a = false;
        var o;
        for (o in n) {
          if (n.hasOwnProperty(o)) {
            var s = n[o];
            if (s != null) {
              switch (o) {
                case `src`:
                  r = true;
                  break;
                case `srcSet`:
                  a = true;
                  break;
                case `children`:
                case `dangerouslySetInnerHTML`:
                  throw Error(i(137, t));
                default:
                  $(e, t, o, s, n, null);
              }
            }
          }
        }
        if (a) {
          $(e, t, `srcSet`, n.srcSet, n, null);
        }
        if (r) {
          $(e, t, `src`, n.src, n, null);
        }
        return;
      case `input`:
        Q(`invalid`, e);
        var c = (o = s = a = null);
        var l = null;
        var u = null;
        for (r in n) {
          if (n.hasOwnProperty(r)) {
            var d = n[r];
            if (d != null) {
              switch (r) {
                case `name`:
                  a = d;
                  break;
                case `type`:
                  s = d;
                  break;
                case `checked`:
                  l = d;
                  break;
                case `defaultChecked`:
                  u = d;
                  break;
                case `value`:
                  o = d;
                  break;
                case `defaultValue`:
                  c = d;
                  break;
                case `children`:
                case `dangerouslySetInnerHTML`:
                  if (d != null) {
                    throw Error(i(137, t));
                  }
                  break;
                default:
                  $(e, t, r, d, n, null);
              }
            }
          }
        }
        Yt(e, o, c, l, u, s, a, false);
        return;
      case `select`:
        Q(`invalid`, e);
        r = s = o = null;
        for (a in n) {
          if (n.hasOwnProperty(a) && ((c = n[a]), c != null)) {
            switch (a) {
              case `value`:
                o = c;
                break;
              case `defaultValue`:
                s = c;
                break;
              case `multiple`:
                r = c;
              default:
                $(e, t, a, c, n, null);
            }
          }
        }
        t = o;
        n = s;
        e.multiple = !!r;
        if (t == null) {
          if (n != null) {
            Zt(e, !!r, n, true);
          }
        } else {
          Zt(e, !!r, t, false);
        }
        return;
      case `textarea`:
        Q(`invalid`, e);
        o = a = r = null;
        for (s in n) {
          if (n.hasOwnProperty(s) && ((c = n[s]), c != null)) {
            switch (s) {
              case `value`:
                r = c;
                break;
              case `defaultValue`:
                a = c;
                break;
              case `children`:
                o = c;
                break;
              case `dangerouslySetInnerHTML`:
                if (c != null) {
                  throw Error(i(91));
                }
                break;
              default:
                $(e, t, s, c, n, null);
            }
          }
        }
        $t(e, r, a, o);
        return;
      case `option`:
        for (l in n) {
          if (n.hasOwnProperty(l) && ((r = n[l]), r != null)) {
            switch (l) {
              case `selected`:
                e.selected = r && typeof r != `function` && typeof r != `symbol`;
                break;
              default:
                $(e, t, l, r, n, null);
            }
          }
        }
        return;
      case `dialog`:
        Q(`beforetoggle`, e);
        Q(`toggle`, e);
        Q(`cancel`, e);
        Q(`close`, e);
        break;
      case `iframe`:
      case `object`:
        Q(`load`, e);
        break;
      case `video`:
      case `audio`:
        for (r = 0; r < _d.length; r++) {
          Q(_d[r], e);
        }
        break;
      case `image`:
        Q(`error`, e);
        Q(`load`, e);
        break;
      case `details`:
        Q(`toggle`, e);
        break;
      case `embed`:
      case `source`:
      case `link`:
        Q(`error`, e);
        Q(`load`, e);
      case `area`:
      case `base`:
      case `br`:
      case `col`:
      case `hr`:
      case `keygen`:
      case `meta`:
      case `param`:
      case `track`:
      case `wbr`:
      case `menuitem`:
        for (u in n) {
          if (n.hasOwnProperty(u) && ((r = n[u]), r != null)) {
            switch (u) {
              case `children`:
              case `dangerouslySetInnerHTML`:
                throw Error(i(137, t));
              default:
                $(e, t, u, r, n, null);
            }
          }
        }
        return;
      default:
        if (an(t)) {
          for (d in n) {
            if (n.hasOwnProperty(d)) {
              r = n[d];
              if (r !== undefined) {
                Nd(e, t, d, r, n, undefined);
              }
            }
          }
          return;
        }
    }
    for (c in n) {
      if (n.hasOwnProperty(c)) {
        r = n[c];
        if (r != null) {
          $(e, t, c, r, n, null);
        }
      }
    }
  }
  function Fd(e, t, n, r) {
    switch (t) {
      case `div`:
      case `span`:
      case `svg`:
      case `path`:
      case `a`:
      case `g`:
      case `p`:
      case `li`:
        break;
      case `input`:
        var a = null;
        var o = null;
        var s = null;
        var c = null;
        var l = null;
        var u = null;
        var d = null;
        for (m in n) {
          var f = n[m];
          if (n.hasOwnProperty(m) && f != null) {
            switch (m) {
              case `checked`:
                break;
              case `value`:
                break;
              case `defaultValue`:
                l = f;
              default:
                if (!r.hasOwnProperty(m)) {
                  $(e, t, m, null, r, f);
                }
            }
          }
        }
        for (var p in r) {
          var m = r[p];
          f = n[p];
          if (r.hasOwnProperty(p) && (m != null || f != null)) {
            switch (p) {
              case `type`:
                o = m;
                break;
              case `name`:
                a = m;
                break;
              case `checked`:
                u = m;
                break;
              case `defaultChecked`:
                d = m;
                break;
              case `value`:
                s = m;
                break;
              case `defaultValue`:
                c = m;
                break;
              case `children`:
              case `dangerouslySetInnerHTML`:
                if (m != null) {
                  throw Error(i(137, t));
                }
                break;
              default:
                if (m !== f) {
                  $(e, t, p, m, r, f);
                }
            }
          }
        }
        Jt(e, s, c, l, u, d, o, a);
        return;
      case `select`:
        m = s = c = p = null;
        for (o in n) {
          l = n[o];
          if (n.hasOwnProperty(o) && l != null) {
            switch (o) {
              case `value`:
                break;
              case `multiple`:
                m = l;
              default:
                if (!r.hasOwnProperty(o)) {
                  $(e, t, o, null, r, l);
                }
            }
          }
        }
        for (a in r) {
          o = r[a];
          l = n[a];
          if (r.hasOwnProperty(a) && (o != null || l != null)) {
            switch (a) {
              case `value`:
                p = o;
                break;
              case `defaultValue`:
                c = o;
                break;
              case `multiple`:
                s = o;
              default:
                if (o !== l) {
                  $(e, t, a, o, r, l);
                }
            }
          }
        }
        t = c;
        n = s;
        r = m;
        if (p == null) {
          if (!!r != !!n) {
            if (t == null) {
              Zt(e, !!n, n ? [] : ``, false);
            } else {
              Zt(e, !!n, t, true);
            }
          }
        } else {
          Zt(e, !!n, p, false);
        }
        return;
      case `textarea`:
        m = p = null;
        for (c in n) {
          a = n[c];
          if (n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) {
            switch (c) {
              case `value`:
                break;
              case `children`:
                break;
              default:
                $(e, t, c, null, r, a);
            }
          }
        }
        for (s in r) {
          a = r[s];
          o = n[s];
          if (r.hasOwnProperty(s) && (a != null || o != null)) {
            switch (s) {
              case `value`:
                p = a;
                break;
              case `defaultValue`:
                m = a;
                break;
              case `children`:
                break;
              case `dangerouslySetInnerHTML`:
                if (a != null) {
                  throw Error(i(91));
                }
                break;
              default:
                if (a !== o) {
                  $(e, t, s, a, r, o);
                }
            }
          }
        }
        Qt(e, p, m);
        return;
      case `option`:
        for (var h in n) {
          p = n[h];
          if (n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) {
            switch (h) {
              case `selected`:
                e.selected = false;
                break;
              default:
                $(e, t, h, null, r, p);
            }
          }
        }
        for (l in r) {
          p = r[l];
          m = n[l];
          if (r.hasOwnProperty(l) && p !== m && (p != null || m != null)) {
            switch (l) {
              case `selected`:
                e.selected = p && typeof p != `function` && typeof p != `symbol`;
                break;
              default:
                $(e, t, l, p, r, m);
            }
          }
        }
        return;
      case `img`:
      case `link`:
      case `area`:
      case `base`:
      case `br`:
      case `col`:
      case `embed`:
      case `hr`:
      case `keygen`:
      case `meta`:
      case `param`:
      case `source`:
      case `track`:
      case `wbr`:
      case `menuitem`:
        for (var g in n) {
          p = n[g];
          if (n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g)) {
            $(e, t, g, null, r, p);
          }
        }
        for (u in r) {
          p = r[u];
          m = n[u];
          if (r.hasOwnProperty(u) && p !== m && (p != null || m != null)) {
            switch (u) {
              case `children`:
              case `dangerouslySetInnerHTML`:
                if (p != null) {
                  throw Error(i(137, t));
                }
                break;
              default:
                $(e, t, u, p, r, m);
            }
          }
        }
        return;
      default:
        if (an(t)) {
          for (var _ in n) {
            p = n[_];
            if (n.hasOwnProperty(_) && p !== undefined && !r.hasOwnProperty(_)) {
              Nd(e, t, _, undefined, r, p);
            }
          }
          for (d in r) {
            p = r[d];
            m = n[d];
            if (!!r.hasOwnProperty(d) && p !== m && (p !== undefined || m !== undefined)) {
              Nd(e, t, d, p, r, m);
            }
          }
          return;
        }
    }
    for (var v in n) {
      p = n[v];
      if (n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v)) {
        $(e, t, v, null, r, p);
      }
    }
    for (f in r) {
      p = r[f];
      m = n[f];
      if (!!r.hasOwnProperty(f) && p !== m && (p != null || m != null)) {
        $(e, t, f, p, r, m);
      }
    }
  }
  function Id(e) {
    switch (e) {
      case `css`:
      case `script`:
      case `font`:
      case `img`:
      case `image`:
      case `input`:
      case `link`:
        return true;
      default:
        return false;
    }
  }
  function Ld() {
    if (typeof performance.getEntriesByType == `function`) {
      var e = 0;
      var t = 0;
      for (var n = performance.getEntriesByType(`resource`), r = 0; r < n.length; r++) {
        var i = n[r];
        var a = i.transferSize;
        var o = i.initiatorType;
        var s = i.duration;
        if (a && s && Id(o)) {
          o = 0;
          s = i.responseEnd;
          r += 1;
          for (; r < n.length; r++) {
            var c = n[r];
            var l = c.startTime;
            if (l > s) {
              break;
            }
            var u = c.transferSize;
            var d = c.initiatorType;
            if (u && Id(d)) {
              c = c.responseEnd;
              o += u * (c < s ? 1 : (s - l) / (c - l));
            }
          }
          --r;
          t += ((a + o) * 8) / (i.duration / 1000);
          e++;
          if (e > 10) {
            break;
          }
        }
      }
      if (e > 0) {
        return t / e / 1000000;
      }
    }
    if (navigator.connection && ((e = navigator.connection.downlink), typeof e == `number`)) {
      return e;
    } else {
      return 5;
    }
  }
  var Rd = null;
  var zd = null;
  function Bd(e) {
    if (e.nodeType === 9) {
      return e;
    } else {
      return e.ownerDocument;
    }
  }
  function Vd(e) {
    switch (e) {
      case `http://www.w3.org/2000/svg`:
        return 1;
      case `http://www.w3.org/1998/Math/MathML`:
        return 2;
      default:
        return 0;
    }
  }
  function Hd(e, t) {
    if (e === 0) {
      switch (t) {
        case `svg`:
          return 1;
        case `math`:
          return 2;
        default:
          return 0;
      }
    }
    if (e === 1 && t === `foreignObject`) {
      return 0;
    } else {
      return e;
    }
  }
  function Ud(e, t) {
    return (
      e === `textarea` ||
      e === `noscript` ||
      typeof t.children == `string` ||
      typeof t.children == `number` ||
      typeof t.children == `bigint` ||
      (typeof t.dangerouslySetInnerHTML == `object` &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Wd = null;
  function Gd() {
    var e = window.event;
    if (e && e.type === `popstate`) {
      if (e === Wd) {
        return false;
      } else {
        Wd = e;
        return true;
      }
    } else {
      Wd = null;
      return false;
    }
  }
  var Kd = typeof setTimeout == `function` ? setTimeout : undefined;
  var qd = typeof clearTimeout == `function` ? clearTimeout : undefined;
  var Jd = typeof Promise == `function` ? Promise : undefined;
  var Yd =
    typeof queueMicrotask == `function`
      ? queueMicrotask
      : Jd === undefined
        ? Kd
        : function (e) {
            return Jd.resolve(null).then(e).catch(Xd);
          };
  function Xd(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Zd(e) {
    return e === `head`;
  }
  function Qd(e, t) {
    var n = t;
    var r = 0;
    do {
      var i = n.nextSibling;
      e.removeChild(n);
      if (i && i.nodeType === 8) {
        n = i.data;
        if (n === `/$` || n === `/&`) {
          if (r === 0) {
            e.removeChild(i);
            Np(t);
            return;
          }
          r--;
        } else if (n === `$` || n === `$?` || n === `$~` || n === `$!` || n === `&`) {
          r++;
        } else if (n === `html`) {
          pf(e.ownerDocument.documentElement);
        } else if (n === `head`) {
          n = e.ownerDocument.head;
          pf(n);
          for (var a = n.firstChild; a; ) {
            var o = a.nextSibling;
            var s = a.nodeName;
            if (
              !a[Ct] &&
              s !== `SCRIPT` &&
              s !== `STYLE` &&
              (s !== `LINK` || a.rel.toLowerCase() !== `stylesheet`)
            ) {
              n.removeChild(a);
            }
            a = o;
          }
        } else if (n === `body`) {
          pf(e.ownerDocument.body);
        }
      }
      n = i;
    } while (n);
    Np(t);
  }
  function $d(e, t) {
    var n = e;
    e = 0;
    do {
      var r = n.nextSibling;
      if (n.nodeType === 1) {
        if (t) {
          n._stashedDisplay = n.style.display;
          n.style.display = `none`;
        } else {
          n.style.display = n._stashedDisplay || ``;
          if (n.getAttribute(`style`) === ``) {
            n.removeAttribute(`style`);
          }
        }
      } else if (n.nodeType === 3) {
        if (t) {
          n._stashedText = n.nodeValue;
          n.nodeValue = ``;
        } else {
          n.nodeValue = n._stashedText || ``;
        }
      }
      if (r && r.nodeType === 8) {
        n = r.data;
        if (n === `/$`) {
          if (e === 0) {
            break;
          }
          e--;
        } else if (n === `$` || n === `$?` || n === `$~` || n === `$!`) {
          e++;
        }
      }
      n = r;
    } while (n);
  }
  function ef(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      t = t.nextSibling;
      switch (n.nodeName) {
        case `HTML`:
        case `HEAD`:
        case `BODY`:
          ef(n);
          wt(n);
          continue;
        case `SCRIPT`:
        case `STYLE`:
          continue;
        case `LINK`:
          if (n.rel.toLowerCase() === `stylesheet`) {
            continue;
          }
      }
      e.removeChild(n);
    }
  }
  function tf(e, t, n, r) {
    while (e.nodeType === 1) {
      var i = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== `INPUT` || e.type !== `hidden`)) {
          break;
        }
      } else if (!r) {
        if (t === `input` && e.type === `hidden`) {
          var a = i.name == null ? null : `${i.name}`;
          if (i.type === `hidden` && e.getAttribute(`name`) === a) {
            return e;
          }
        } else {
          return e;
        }
      } else if (!e[Ct]) {
        switch (t) {
          case `meta`:
            if (!e.hasAttribute(`itemprop`)) {
              break;
            }
            return e;
          case `link`:
            a = e.getAttribute(`rel`);
            if (
              (a === `stylesheet` && e.hasAttribute(`data-precedence`)) ||
              a !== i.rel ||
              e.getAttribute(`href`) !== (i.href == null || i.href === `` ? null : i.href) ||
              e.getAttribute(`crossorigin`) !== (i.crossOrigin == null ? null : i.crossOrigin) ||
              e.getAttribute(`title`) !== (i.title == null ? null : i.title)
            ) {
              break;
            }
            return e;
          case `style`:
            if (e.hasAttribute(`data-precedence`)) {
              break;
            }
            return e;
          case `script`:
            a = e.getAttribute(`src`);
            if (
              (a !== (i.src == null ? null : i.src) ||
                e.getAttribute(`type`) !== (i.type == null ? null : i.type) ||
                e.getAttribute(`crossorigin`) !== (i.crossOrigin == null ? null : i.crossOrigin)) &&
              a &&
              e.hasAttribute(`async`) &&
              !e.hasAttribute(`itemprop`)
            ) {
              break;
            }
            return e;
          default:
            return e;
        }
      }
      e = cf(e.nextSibling);
      if (e === null) {
        break;
      }
    }
    return null;
  }
  function nf(e, t, n) {
    if (t === ``) {
      return null;
    }
    while (e.nodeType !== 3) {
      if (
        ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !n) ||
        ((e = cf(e.nextSibling)), e === null)
      ) {
        return null;
      }
    }
    return e;
  }
  function rf(e, t) {
    while (e.nodeType !== 8) {
      if (
        ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !t) ||
        ((e = cf(e.nextSibling)), e === null)
      ) {
        return null;
      }
    }
    return e;
  }
  function af(e) {
    return e.data === `$?` || e.data === `$~`;
  }
  function of(e) {
    return e.data === `$!` || (e.data === `$?` && e.ownerDocument.readyState !== `loading`);
  }
  function sf(e, t) {
    var n = e.ownerDocument;
    if (e.data === `$~`) {
      e._reactRetry = t;
    } else if (e.data !== `$?` || n.readyState !== `loading`) {
      t();
    } else {
      function r() {
        t();
        n.removeEventListener(`DOMContentLoaded`, r);
      }
      n.addEventListener(`DOMContentLoaded`, r);
      e._reactRetry = r;
    }
  }
  function cf(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) {
        break;
      }
      if (t === 8) {
        t = e.data;
        if (t === `$` || t === `$!` || t === `$?` || t === `$~` || t === `&` || t === `F!` || t === `F`) {
          break;
        }
        if (t === `/$` || t === `/&`) {
          return null;
        }
      }
    }
    return e;
  }
  var lf = null;
  function uf(e) {
    e = e.nextSibling;
    var t = 0;
    for (; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === `/$` || n === `/&`) {
          if (t === 0) {
            return cf(e.nextSibling);
          }
          t--;
        } else if (n === `$` || n === `$!` || n === `$?` || n === `$~` || n === `&`) {
          t++;
        }
      }
      e = e.nextSibling;
    }
    return null;
  }
  function df(e) {
    e = e.previousSibling;
    var t = 0;
    for (; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === `$` || n === `$!` || n === `$?` || n === `$~` || n === `&`) {
          if (t === 0) {
            return e;
          }
          t--;
        } else if (n === `/$` || n === `/&`) {
          t++;
        }
      }
      e = e.previousSibling;
    }
    return null;
  }
  function ff(e, t, n) {
    t = Bd(n);
    switch (e) {
      case `html`:
        e = t.documentElement;
        if (!e) {
          throw Error(i(452));
        }
        return e;
      case `head`:
        e = t.head;
        if (!e) {
          throw Error(i(453));
        }
        return e;
      case `body`:
        e = t.body;
        if (!e) {
          throw Error(i(454));
        }
        return e;
      default:
        throw Error(i(451));
    }
  }
  function pf(e) {
    for (var t = e.attributes; t.length; ) {
      e.removeAttributeNode(t[0]);
    }
    wt(e);
  }
  var mf = new Map();
  var hf = new Set();
  function gf(e) {
    if (typeof e.getRootNode == `function`) {
      return e.getRootNode();
    } else if (e.nodeType === 9) {
      return e;
    } else {
      return e.ownerDocument;
    }
  }
  var _f = E.d;
  E.d = {
    f: vf,
    r: yf,
    D: Sf,
    C: Cf,
    L: wf,
    m: Tf,
    X: Df,
    S: Ef,
    M: Of,
  };
  function vf() {
    var e = _f.f();
    var t = bu();
    return e || t;
  }
  function yf(e) {
    var t = Et(e);
    if (t !== null && t.tag === 5 && t.type === `form`) {
      js(t);
    } else {
      _f.r(e);
    }
  }
  var bf = typeof document > `u` ? null : document;
  function xf(e, t, n) {
    var r = bf;
    if (r && typeof t == `string` && t) {
      var i = qt(t);
      i = `link[rel="${e}"][href="${i}"]`;
      if (typeof n == `string`) {
        i += `[crossorigin="${n}"]`;
      }
      if (!hf.has(i)) {
        hf.add(i);
        e = {
          rel: e,
          crossOrigin: n,
          href: t,
        };
        if (r.querySelector(i) === null) {
          t = r.createElement(`link`);
          Pd(t, `link`, e);
          k(t);
          r.head.appendChild(t);
        }
      }
    }
  }
  function Sf(e) {
    _f.D(e);
    xf(`dns-prefetch`, e, null);
  }
  function Cf(e, t) {
    _f.C(e, t);
    xf(`preconnect`, e, t);
  }
  function wf(e, t, n) {
    _f.L(e, t, n);
    var r = bf;
    if (r && e && t) {
      var i = `link[rel="preload"][as="${qt(t)}"]`;
      if (t === `image` && n && n.imageSrcSet) {
        i += `[imagesrcset="${qt(n.imageSrcSet)}"]`;
        if (typeof n.imageSizes == `string`) {
          i += `[imagesizes="${qt(n.imageSizes)}"]`;
        }
      } else {
        i += `[href="${qt(e)}"]`;
      }
      var a = i;
      switch (t) {
        case `style`:
          a = Af(e);
          break;
        case `script`:
          a = Pf(e);
      }
      if (!mf.has(a)) {
        e = h(
          {
            rel: `preload`,
            href: t === `image` && n && n.imageSrcSet ? undefined : e,
            as: t,
          },
          n,
        );
        mf.set(a, e);
        if (
          r.querySelector(i) === null &&
          (t !== `style` || !r.querySelector(jf(a))) &&
          (t !== `script` || !r.querySelector(Ff(a)))
        ) {
          t = r.createElement(`link`);
          Pd(t, `link`, e);
          k(t);
          r.head.appendChild(t);
        }
      }
    }
  }
  function Tf(e, t) {
    _f.m(e, t);
    var n = bf;
    if (n && e) {
      var r = t && typeof t.as == `string` ? t.as : `script`;
      var i = `link[rel="modulepreload"][as="${qt(r)}"][href="${qt(e)}"]`;
      var a = i;
      switch (r) {
        case `audioworklet`:
        case `paintworklet`:
        case `serviceworker`:
        case `sharedworker`:
        case `worker`:
        case `script`:
          a = Pf(e);
      }
      if (
        !mf.has(a) &&
        ((e = h(
          {
            rel: `modulepreload`,
            href: e,
          },
          t,
        )),
        mf.set(a, e),
        n.querySelector(i) === null)
      ) {
        switch (r) {
          case `audioworklet`:
          case `paintworklet`:
          case `serviceworker`:
          case `sharedworker`:
          case `worker`:
          case `script`:
            if (n.querySelector(Ff(a))) {
              return;
            }
        }
        r = n.createElement(`link`);
        Pd(r, `link`, e);
        k(r);
        n.head.appendChild(r);
      }
    }
  }
  function Ef(e, t, n) {
    _f.S(e, t, n);
    var r = bf;
    if (r && e) {
      var i = Ot(r).hoistableStyles;
      var a = Af(e);
      t ||= `default`;
      var o = i.get(a);
      if (!o) {
        var s = {
          loading: 0,
          preload: null,
        };
        if ((o = r.querySelector(jf(a)))) {
          s.loading = 5;
        } else {
          e = h(
            {
              rel: `stylesheet`,
              href: e,
              'data-precedence': t,
            },
            n,
          );
          if ((n = mf.get(a))) {
            Rf(e, n);
          }
          var c = (o = r.createElement(`link`));
          k(c);
          Pd(c, `link`, e);
          c._p = new Promise(function (e, t) {
            c.onload = e;
            c.onerror = t;
          });
          c.addEventListener(`load`, function () {
            s.loading |= 1;
          });
          c.addEventListener(`error`, function () {
            s.loading |= 2;
          });
          s.loading |= 4;
          Lf(o, t, r);
        }
        o = {
          type: `stylesheet`,
          instance: o,
          count: 1,
          state: s,
        };
        i.set(a, o);
      }
    }
  }
  function Df(e, t) {
    _f.X(e, t);
    var n = bf;
    if (n && e) {
      var r = Ot(n).hoistableScripts;
      var i = Pf(e);
      var a = r.get(i);
      if (!a) {
        a = n.querySelector(Ff(i));
        if (!a) {
          e = h(
            {
              src: e,
              async: true,
            },
            t,
          );
          if ((t = mf.get(i))) {
            zf(e, t);
          }
          a = n.createElement(`script`);
          k(a);
          Pd(a, `link`, e);
          n.head.appendChild(a);
        }
        a = {
          type: `script`,
          instance: a,
          count: 1,
          state: null,
        };
        r.set(i, a);
      }
    }
  }
  function Of(e, t) {
    _f.M(e, t);
    var n = bf;
    if (n && e) {
      var r = Ot(n).hoistableScripts;
      var i = Pf(e);
      var a = r.get(i);
      if (!a) {
        a = n.querySelector(Ff(i));
        if (!a) {
          e = h(
            {
              src: e,
              async: true,
              type: `module`,
            },
            t,
          );
          if ((t = mf.get(i))) {
            zf(e, t);
          }
          a = n.createElement(`script`);
          k(a);
          Pd(a, `link`, e);
          n.head.appendChild(a);
        }
        a = {
          type: `script`,
          instance: a,
          count: 1,
          state: null,
        };
        r.set(i, a);
      }
    }
  }
  function kf(e, t, n, r) {
    var a = (a = _e.current) ? gf(a) : null;
    if (!a) {
      throw Error(i(446));
    }
    switch (e) {
      case `meta`:
      case `title`:
        return null;
      case `style`:
        if (typeof n.precedence == `string` && typeof n.href == `string`) {
          t = Af(n.href);
          n = Ot(a).hoistableStyles;
          r = n.get(t);
          if (!r) {
            r = {
              type: `style`,
              instance: null,
              count: 0,
              state: null,
            };
            n.set(t, r);
          }
          return r;
        } else {
          return {
            type: `void`,
            instance: null,
            count: 0,
            state: null,
          };
        }
      case `link`:
        if (n.rel === `stylesheet` && typeof n.href == `string` && typeof n.precedence == `string`) {
          e = Af(n.href);
          var o = Ot(a).hoistableStyles;
          var s = o.get(e);
          if (!s) {
            a = a.ownerDocument || a;
            s = {
              type: `stylesheet`,
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null,
              },
            };
            o.set(e, s);
            if ((o = a.querySelector(jf(e))) && !o._p) {
              s.instance = o;
              s.state.loading = 5;
            }
            if (!mf.has(e)) {
              n = {
                rel: `preload`,
                as: `style`,
                href: n.href,
                crossOrigin: n.crossOrigin,
                integrity: n.integrity,
                media: n.media,
                hrefLang: n.hrefLang,
                referrerPolicy: n.referrerPolicy,
              };
              mf.set(e, n);
              if (!o) {
                Nf(a, e, n, s.state);
              }
            }
          }
          if (t && r === null) {
            throw Error(i(528, ``));
          }
          return s;
        }
        if (t && r !== null) {
          throw Error(i(529, ``));
        }
        return null;
      case `script`:
        t = n.async;
        n = n.src;
        if (typeof n == `string` && t && typeof t != `function` && typeof t != `symbol`) {
          t = Pf(n);
          n = Ot(a).hoistableScripts;
          r = n.get(t);
          if (!r) {
            r = {
              type: `script`,
              instance: null,
              count: 0,
              state: null,
            };
            n.set(t, r);
          }
          return r;
        } else {
          return {
            type: `void`,
            instance: null,
            count: 0,
            state: null,
          };
        }
      default:
        throw Error(i(444, e));
    }
  }
  function Af(e) {
    return `href="${qt(e)}"`;
  }
  function jf(e) {
    return `link[rel="stylesheet"][${e}]`;
  }
  function Mf(e) {
    return h({}, e, {
      'data-precedence': e.precedence,
      precedence: null,
    });
  }
  function Nf(e, t, n, r) {
    if (e.querySelector(`link[rel="preload"][as="style"][${t}]`)) {
      r.loading = 1;
    } else {
      t = e.createElement(`link`);
      r.preload = t;
      t.addEventListener(`load`, function () {
        return (r.loading |= 1);
      });
      t.addEventListener(`error`, function () {
        return (r.loading |= 2);
      });
      Pd(t, `link`, n);
      k(t);
      e.head.appendChild(t);
    }
  }
  function Pf(e) {
    return `[src="${qt(e)}"]`;
  }
  function Ff(e) {
    return `script[async]${e}`;
  }
  function If(e, t, n) {
    t.count++;
    if (t.instance === null) {
      switch (t.type) {
        case `style`:
          var r = e.querySelector(`style[data-href~="${qt(n.href)}"]`);
          if (r) {
            t.instance = r;
            k(r);
            return r;
          }
          var a = h({}, n, {
            'data-href': n.href,
            'data-precedence': n.precedence,
            href: null,
            precedence: null,
          });
          r = (e.ownerDocument || e).createElement(`style`);
          k(r);
          Pd(r, `style`, a);
          Lf(r, n.precedence, e);
          return (t.instance = r);
        case `stylesheet`:
          a = Af(n.href);
          var o = e.querySelector(jf(a));
          if (o) {
            t.state.loading |= 4;
            t.instance = o;
            k(o);
            return o;
          }
          r = Mf(n);
          if ((a = mf.get(a))) {
            Rf(r, a);
          }
          o = (e.ownerDocument || e).createElement(`link`);
          k(o);
          var s = o;
          s._p = new Promise(function (e, t) {
            s.onload = e;
            s.onerror = t;
          });
          Pd(o, `link`, r);
          t.state.loading |= 4;
          Lf(o, n.precedence, e);
          return (t.instance = o);
        case `script`:
          o = Pf(n.src);
          if ((a = e.querySelector(Ff(o)))) {
            t.instance = a;
            k(a);
            return a;
          } else {
            r = n;
            if ((a = mf.get(o))) {
              r = h({}, n);
              zf(r, a);
            }
            e = e.ownerDocument || e;
            a = e.createElement(`script`);
            k(a);
            Pd(a, `link`, r);
            e.head.appendChild(a);
            return (t.instance = a);
          }
        case `void`:
          return null;
        default:
          throw Error(i(443, t.type));
      }
    } else if (t.type === `stylesheet` && !(t.state.loading & 4)) {
      r = t.instance;
      t.state.loading |= 4;
      Lf(r, n.precedence, e);
    }
    return t.instance;
  }
  function Lf(e, t, n) {
    for (
      var r = n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),
        i = r.length ? r[r.length - 1] : null,
        a = i,
        o = 0;
      o < r.length;
      o++
    ) {
      var s = r[o];
      if (s.dataset.precedence === t) {
        a = s;
      } else if (a !== i) {
        break;
      }
    }
    if (a) {
      a.parentNode.insertBefore(e, a.nextSibling);
    } else {
      t = n.nodeType === 9 ? n.head : n;
      t.insertBefore(e, t.firstChild);
    }
  }
  function Rf(e, t) {
    e.crossOrigin ??= t.crossOrigin;
    e.referrerPolicy ??= t.referrerPolicy;
    e.title ??= t.title;
  }
  function zf(e, t) {
    e.crossOrigin ??= t.crossOrigin;
    e.referrerPolicy ??= t.referrerPolicy;
    e.integrity ??= t.integrity;
  }
  var Bf = null;
  function Vf(e, t, n) {
    if (Bf === null) {
      var r = new Map();
      var i = (Bf = new Map());
      i.set(n, r);
    } else {
      i = Bf;
      r = i.get(n);
      if (!r) {
        r = new Map();
        i.set(n, r);
      }
    }
    if (r.has(e)) {
      return r;
    }
    r.set(e, null);
    n = n.getElementsByTagName(e);
    i = 0;
    for (; i < n.length; i++) {
      var a = n[i];
      if (
        !a[Ct] &&
        !a[gt] &&
        (e !== `link` || a.getAttribute(`rel`) !== `stylesheet`) &&
        a.namespaceURI !== `http://www.w3.org/2000/svg`
      ) {
        var o = a.getAttribute(t) || ``;
        o = e + o;
        var s = r.get(o);
        if (s) {
          s.push(a);
        } else {
          r.set(o, [a]);
        }
      }
    }
    return r;
  }
  function Hf(e, t, n) {
    e = e.ownerDocument || e;
    e.head.insertBefore(n, t === `title` ? e.querySelector(`head > title`) : null);
  }
  function Uf(e, t, n) {
    if (n === 1 || t.itemProp != null) {
      return false;
    }
    switch (e) {
      case `meta`:
      case `title`:
        return true;
      case `style`:
        if (typeof t.precedence != `string` || typeof t.href != `string` || t.href === ``) {
          break;
        }
        return true;
      case `link`:
        if (typeof t.rel != `string` || typeof t.href != `string` || t.href === `` || t.onLoad || t.onError) {
          break;
        }
        switch (t.rel) {
          case `stylesheet`:
            e = t.disabled;
            return typeof t.precedence == `string` && e == null;
          default:
            return true;
        }
      case `script`:
        if (
          t.async &&
          typeof t.async != `function` &&
          typeof t.async != `symbol` &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == `string`
        ) {
          return true;
        }
    }
    return false;
  }
  function Wf(e) {
    return e.type !== `stylesheet` || !!(e.state.loading & 3);
  }
  function Gf(e, t, n, r) {
    if (
      n.type === `stylesheet` &&
      (typeof r.media != `string` || matchMedia(r.media).matches !== false) &&
      !(n.state.loading & 4)
    ) {
      if (n.instance === null) {
        var i = Af(r.href);
        var a = t.querySelector(jf(i));
        if (a) {
          t = a._p;
          if (typeof t == `object` && t && typeof t.then == `function`) {
            e.count++;
            e = Jf.bind(e);
            t.then(e, e);
          }
          n.state.loading |= 4;
          n.instance = a;
          k(a);
          return;
        }
        a = t.ownerDocument || t;
        r = Mf(r);
        if ((i = mf.get(i))) {
          Rf(r, i);
        }
        a = a.createElement(`link`);
        k(a);
        var o = a;
        o._p = new Promise(function (e, t) {
          o.onload = e;
          o.onerror = t;
        });
        Pd(a, `link`, r);
        n.instance = a;
      }
      if (e.stylesheets === null) {
        e.stylesheets = new Map();
      }
      e.stylesheets.set(n, t);
      if ((t = n.state.preload) && !(n.state.loading & 3)) {
        e.count++;
        n = Jf.bind(e);
        t.addEventListener(`load`, n);
        t.addEventListener(`error`, n);
      }
    }
  }
  var Kf = 0;
  function qf(e, t) {
    if (e.stylesheets && e.count === 0) {
      Xf(e, e.stylesheets);
    }
    if (e.count > 0 || e.imgCount > 0) {
      return function (n) {
        var r = setTimeout(function () {
          if (e.stylesheets) {
            Xf(e, e.stylesheets);
          }
          if (e.unsuspend) {
            var t = e.unsuspend;
            e.unsuspend = null;
            t();
          }
        }, 60000 + t);
        if (e.imgBytes > 0 && Kf === 0) {
          Kf = Ld() * 62500;
        }
        var i = setTimeout(
          function () {
            e.waitingForImages = false;
            if (e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
              var t = e.unsuspend;
              e.unsuspend = null;
              t();
            }
          },
          (e.imgBytes > Kf ? 50 : 800) + t,
        );
        e.unsuspend = n;
        return function () {
          e.unsuspend = null;
          clearTimeout(r);
          clearTimeout(i);
        };
      };
    } else {
      return null;
    }
  }
  function Jf() {
    this.count--;
    if (this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) {
        Xf(this, this.stylesheets);
      } else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null;
        e();
      }
    }
  }
  var Yf = null;
  function Xf(e, t) {
    e.stylesheets = null;
    if (e.unsuspend !== null) {
      e.count++;
      Yf = new Map();
      t.forEach(Zf, e);
      Yf = null;
      Jf.call(e);
    }
  }
  function Zf(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Yf.get(e);
      if (n) {
        var r = n.get(null);
      } else {
        n = new Map();
        Yf.set(e, n);
        for (
          var i = e.querySelectorAll(`link[data-precedence],style[data-precedence]`), a = 0;
          a < i.length;
          a++
        ) {
          var o = i[a];
          if (o.nodeName === `LINK` || o.getAttribute(`media`) !== `not all`) {
            n.set(o.dataset.precedence, o);
            r = o;
          }
        }
        if (r) {
          n.set(null, r);
        }
      }
      i = t.instance;
      o = i.getAttribute(`data-precedence`);
      a = n.get(o) || r;
      if (a === r) {
        n.set(null, i);
      }
      n.set(o, i);
      this.count++;
      r = Jf.bind(this);
      i.addEventListener(`load`, r);
      i.addEventListener(`error`, r);
      if (a) {
        a.parentNode.insertBefore(i, a.nextSibling);
      } else {
        e = e.nodeType === 9 ? e.head : e;
        e.insertBefore(i, e.firstChild);
      }
      t.state.loading |= 4;
    }
  }
  var Qf = {
    $$typeof: S,
    Provider: null,
    Consumer: null,
    _currentValue: de,
    _currentValue2: de,
    _threadCount: 0,
  };
  function $f(e, t, n, r, i, a, o, s, c) {
    this.tag = 1;
    this.containerInfo = e;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = at(-1);
    this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0;
    this.entanglements = at(0);
    this.hiddenUpdates = at(null);
    this.identifierPrefix = r;
    this.onUncaughtError = i;
    this.onCaughtError = a;
    this.onRecoverableError = o;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = c;
    this.incompleteTransitions = new Map();
  }
  function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
    e = new $f(e, t, n, o, c, l, u, d, s);
    t = 1;
    if (a === true) {
      t |= 24;
    }
    a = _i(3, null, null, t);
    e.current = a;
    a.stateNode = e;
    t = ha();
    t.refCount++;
    e.pooledCache = t;
    t.refCount++;
    a.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: t,
    };
    Ja(a);
    return e;
  }
  function tp(e) {
    if (e) {
      e = hi;
      return e;
    } else {
      return hi;
    }
  }
  function np(e, t, n, r, i, a) {
    i = tp(i);
    if (r.context === null) {
      r.context = i;
    } else {
      r.pendingContext = i;
    }
    r = Xa(t);
    r.payload = {
      element: n,
    };
    a = a === undefined ? null : a;
    if (a !== null) {
      r.callback = a;
    }
    n = Za(e, r, t);
    if (n !== null) {
      hu(n, e, t);
      Qa(n, e, t);
    }
  }
  function rp(e, t) {
    e = e.memoizedState;
    if (e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ip(e, t) {
    rp(e, t);
    if ((e = e.alternate)) {
      rp(e, t);
    }
  }
  function ap(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = fi(e, 67108864);
      if (t !== null) {
        hu(t, e, 67108864);
      }
      ip(e, 67108864);
    }
  }
  function op(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = pu();
      t = dt(t);
      var n = fi(e, t);
      if (n !== null) {
        hu(n, e, t);
      }
      ip(e, t);
    }
  }
  var sp = true;
  function cp(e, t, n, r) {
    var i = T.T;
    T.T = null;
    var a = E.p;
    try {
      E.p = 2;
      up(e, t, n, r);
    } finally {
      E.p = a;
      T.T = i;
    }
  }
  function lp(e, t, n, r) {
    var i = T.T;
    T.T = null;
    var a = E.p;
    try {
      E.p = 8;
      up(e, t, n, r);
    } finally {
      E.p = a;
      T.T = i;
    }
  }
  function up(e, t, n, r) {
    if (sp) {
      var i = dp(r);
      if (i === null) {
        wd(e, t, r, fp, n);
        Cp(e, r);
      } else if (Tp(i, e, t, n, r)) {
        r.stopPropagation();
      } else {
        Cp(e, r);
        if (t & 4 && Sp.indexOf(e) > -1) {
          while (i !== null) {
            var a = Et(i);
            if (a !== null) {
              switch (a.tag) {
                case 3:
                  a = a.stateNode;
                  if (a.current.memoizedState.isDehydrated) {
                    var o = et(a.pendingLanes);
                    if (o !== 0) {
                      var s = a;
                      s.pendingLanes |= 2;
                      s.entangledLanes |= 2;
                      while (o) {
                        var c = 1 << (31 - qe(o));
                        s.entanglements[1] |= c;
                        o &= ~c;
                      }
                      rd(a);
                      if (!(W & 6)) {
                        nu = Fe() + 500;
                        id(0, false);
                      }
                    }
                  }
                  break;
                case 31:
                case 13:
                  s = fi(a, 2);
                  if (s !== null) {
                    hu(s, a, 2);
                  }
                  bu();
                  ip(a, 2);
              }
            }
            a = dp(r);
            if (a === null) {
              wd(e, t, r, fp, n);
            }
            if (a === i) {
              break;
            }
            i = a;
          }
          if (i !== null) {
            r.stopPropagation();
          }
        } else {
          wd(e, t, r, null, n);
        }
      }
    }
  }
  function dp(e) {
    e = dn(e);
    return pp(e);
  }
  var fp = null;
  function pp(e) {
    fp = null;
    e = Tt(e);
    if (e !== null) {
      var t = o(e);
      if (t === null) {
        e = null;
      } else {
        var n = t.tag;
        if (n === 13) {
          e = s(t);
          if (e !== null) {
            return e;
          }
          e = null;
        } else if (n === 31) {
          e = c(t);
          if (e !== null) {
            return e;
          }
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) {
            if (t.tag === 3) {
              return t.stateNode.containerInfo;
            } else {
              return null;
            }
          }
          e = null;
        } else if (t !== e) {
          e = null;
        }
      }
    }
    fp = e;
    return null;
  }
  function mp(e) {
    switch (e) {
      case `beforetoggle`:
      case `cancel`:
      case `click`:
      case `close`:
      case `contextmenu`:
      case `copy`:
      case `cut`:
      case `auxclick`:
      case `dblclick`:
      case `dragend`:
      case `dragstart`:
      case `drop`:
      case `focusin`:
      case `focusout`:
      case `input`:
      case `invalid`:
      case `keydown`:
      case `keypress`:
      case `keyup`:
      case `mousedown`:
      case `mouseup`:
      case `paste`:
      case `pause`:
      case `play`:
      case `pointercancel`:
      case `pointerdown`:
      case `pointerup`:
      case `ratechange`:
      case `reset`:
      case `resize`:
      case `seeked`:
      case `submit`:
      case `toggle`:
      case `touchcancel`:
      case `touchend`:
      case `touchstart`:
      case `volumechange`:
      case `change`:
      case `selectionchange`:
      case `textInput`:
      case `compositionstart`:
      case `compositionend`:
      case `compositionupdate`:
      case `beforeblur`:
      case `afterblur`:
      case `beforeinput`:
      case `blur`:
      case `fullscreenchange`:
      case `focus`:
      case `hashchange`:
      case `popstate`:
      case `select`:
      case `selectstart`:
        return 2;
      case `drag`:
      case `dragenter`:
      case `dragexit`:
      case `dragleave`:
      case `dragover`:
      case `mousemove`:
      case `mouseout`:
      case `mouseover`:
      case `pointermove`:
      case `pointerout`:
      case `pointerover`:
      case `scroll`:
      case `touchmove`:
      case `wheel`:
      case `mouseenter`:
      case `mouseleave`:
      case `pointerenter`:
      case `pointerleave`:
        return 8;
      case `message`:
        switch (Ie()) {
          case Le:
            return 2;
          case Re:
            return 8;
          case ze:
          case Be:
            return 32;
          case Ve:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hp = false;
  var gp = null;
  var _p = null;
  var vp = null;
  var yp = new Map();
  var bp = new Map();
  var xp = [];
  var Sp =
    `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(
      ` `,
    );
  function Cp(e, t) {
    switch (e) {
      case `focusin`:
      case `focusout`:
        gp = null;
        break;
      case `dragenter`:
      case `dragleave`:
        _p = null;
        break;
      case `mouseover`:
      case `mouseout`:
        vp = null;
        break;
      case `pointerover`:
      case `pointerout`:
        yp.delete(t.pointerId);
        break;
      case `gotpointercapture`:
      case `lostpointercapture`:
        bp.delete(t.pointerId);
    }
  }
  function wp(e, t, n, r, i, a) {
    if (e === null || e.nativeEvent !== a) {
      e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: a,
        targetContainers: [i],
      };
      if (t !== null) {
        t = Et(t);
        if (t !== null) {
          ap(t);
        }
      }
      return e;
    } else {
      e.eventSystemFlags |= r;
      t = e.targetContainers;
      if (i !== null && t.indexOf(i) === -1) {
        t.push(i);
      }
      return e;
    }
  }
  function Tp(e, t, n, r, i) {
    switch (t) {
      case `focusin`:
        gp = wp(gp, e, t, n, r, i);
        return true;
      case `dragenter`:
        _p = wp(_p, e, t, n, r, i);
        return true;
      case `mouseover`:
        vp = wp(vp, e, t, n, r, i);
        return true;
      case `pointerover`:
        var a = i.pointerId;
        yp.set(a, wp(yp.get(a) || null, e, t, n, r, i));
        return true;
      case `gotpointercapture`:
        a = i.pointerId;
        bp.set(a, wp(bp.get(a) || null, e, t, n, r, i));
        return true;
    }
    return false;
  }
  function Ep(e) {
    var t = Tt(e.target);
    if (t !== null) {
      var n = o(t);
      if (n !== null) {
        t = n.tag;
        if (t === 13) {
          t = s(n);
          if (t !== null) {
            e.blockedOn = t;
            mt(e.priority, function () {
              op(n);
            });
            return;
          }
        } else if (t === 31) {
          t = c(n);
          if (t !== null) {
            e.blockedOn = t;
            mt(e.priority, function () {
              op(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Dp(e) {
    if (e.blockedOn !== null) {
      return false;
    }
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = dp(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        un = r;
        n.target.dispatchEvent(r);
        un = null;
      } else {
        t = Et(n);
        if (t !== null) {
          ap(t);
        }
        e.blockedOn = n;
        return false;
      }
      t.shift();
    }
    return true;
  }
  function Op(e, t, n) {
    if (Dp(e)) {
      n.delete(t);
    }
  }
  function kp() {
    hp = false;
    if (gp !== null && Dp(gp)) {
      gp = null;
    }
    if (_p !== null && Dp(_p)) {
      _p = null;
    }
    if (vp !== null && Dp(vp)) {
      vp = null;
    }
    yp.forEach(Op);
    bp.forEach(Op);
  }
  function Ap(e, n) {
    if (e.blockedOn === n) {
      e.blockedOn = null;
      if (!hp) {
        hp = true;
        t.unstable_scheduleCallback(t.unstable_NormalPriority, kp);
      }
    }
  }
  var jp = null;
  function Mp(e) {
    if (jp !== e) {
      jp = e;
      t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
        if (jp === e) {
          jp = null;
        }
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t];
          var r = e[t + 1];
          var i = e[t + 2];
          if (typeof r != `function`) {
            if (pp(r || n) === null) {
              continue;
            }
            break;
          }
          var a = Et(n);
          if (a !== null) {
            e.splice(t, 3);
            t -= 3;
            ks(
              a,
              {
                pending: true,
                data: i,
                method: n.method,
                action: r,
              },
              r,
              i,
            );
          }
        }
      });
    }
  }
  function Np(e) {
    function t(t) {
      return Ap(t, e);
    }
    if (gp !== null) {
      Ap(gp, e);
    }
    if (_p !== null) {
      Ap(_p, e);
    }
    if (vp !== null) {
      Ap(vp, e);
    }
    yp.forEach(t);
    bp.forEach(t);
    for (var n = 0; n < xp.length; n++) {
      var r = xp[n];
      if (r.blockedOn === e) {
        r.blockedOn = null;
      }
    }
    while (xp.length > 0 && ((n = xp[0]), n.blockedOn === null)) {
      Ep(n);
      if (n.blockedOn === null) {
        xp.shift();
      }
    }
    n = (e.ownerDocument || e).$$reactFormReplay;
    if (n != null) {
      for (r = 0; r < n.length; r += 3) {
        var i = n[r];
        var a = n[r + 1];
        var o = i[_t] || null;
        if (typeof a == `function`) {
          if (!o) {
            Mp(n);
          }
        } else if (o) {
          var s = null;
          if (a && a.hasAttribute(`formAction`)) {
            i = a;
            if ((o = a[_t] || null)) {
              s = o.formAction;
            } else if (pp(i) !== null) {
              continue;
            }
          } else {
            s = o.action;
          }
          if (typeof s == `function`) {
            n[r + 1] = s;
          } else {
            n.splice(r, 3);
            r -= 3;
          }
          Mp(n);
        }
      }
    }
  }
  function Pp() {
    function e(e) {
      if (e.canIntercept && e.info === `react-transition`) {
        e.intercept({
          handler: function () {
            return new Promise(function (e) {
              return (i = e);
            });
          },
          focusReset: `manual`,
          scroll: `manual`,
        });
      }
    }
    function t() {
      if (i !== null) {
        i();
        i = null;
      }
      if (!r) {
        setTimeout(n, 20);
      }
    }
    function n() {
      if (!r && !navigation.transition) {
        var e = navigation.currentEntry;
        if (e && e.url != null) {
          navigation.navigate(e.url, {
            state: e.getState(),
            info: `react-transition`,
            history: `replace`,
          });
        }
      }
    }
    if (typeof navigation == `object`) {
      var r = false;
      var i = null;
      navigation.addEventListener(`navigate`, e);
      navigation.addEventListener(`navigatesuccess`, t);
      navigation.addEventListener(`navigateerror`, t);
      setTimeout(n, 100);
      return function () {
        r = true;
        navigation.removeEventListener(`navigate`, e);
        navigation.removeEventListener(`navigatesuccess`, t);
        navigation.removeEventListener(`navigateerror`, t);
        if (i !== null) {
          i();
          i = null;
        }
      };
    }
  }
  function Fp(e) {
    this._internalRoot = e;
  }
  Ip.prototype.render = Fp.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) {
      throw Error(i(409));
    }
    var n = t.current;
    np(n, pu(), e, t, null, null);
  };
  Ip.prototype.unmount = Fp.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      np(e.current, 2, null, e, null, null);
      bu();
      t[vt] = null;
    }
  };
  function Ip(e) {
    this._internalRoot = e;
  }
  Ip.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = pt();
      e = {
        blockedOn: null,
        target: e,
        priority: t,
      };
      for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
      xp.splice(n, 0, e);
      if (n === 0) {
        Ep(e);
      }
    }
  };
  var Lp = n.version;
  if (Lp !== `19.2.5`) {
    throw Error(i(527, Lp, `19.2.5`));
  }
  E.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === undefined) {
      throw typeof e.render == `function`
        ? Error(i(188))
        : ((e = Object.keys(e).join(`,`)), Error(i(268, e)));
    }
    e = d(t);
    e = e === null ? null : p(e);
    e = e === null ? null : e.stateNode;
    return e;
  };
  var Rp = {
    bundleType: 0,
    version: `19.2.5`,
    rendererPackageName: `react-dom`,
    currentDispatcherRef: T,
    reconcilerVersion: `19.2.5`,
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
    var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zp.isDisabled && zp.supportsFiber) {
      try {
        We = zp.inject(Rp);
        Ge = zp;
      } catch {}
    }
  }
  e.createRoot = function (e, t) {
    if (!a(e)) {
      throw Error(i(299));
    }
    var n = false;
    var r = ``;
    var o = Qs;
    var s = $s;
    var c = ec;
    if (t != null) {
      if (t.unstable_strictMode === true) {
        n = true;
      }
      if (t.identifierPrefix !== undefined) {
        r = t.identifierPrefix;
      }
      if (t.onUncaughtError !== undefined) {
        o = t.onUncaughtError;
      }
      if (t.onCaughtError !== undefined) {
        s = t.onCaughtError;
      }
      if (t.onRecoverableError !== undefined) {
        c = t.onRecoverableError;
      }
    }
    t = ep(e, 1, false, null, null, n, r, null, o, s, c, Pp);
    e[vt] = t.current;
    Sd(e);
    return new Fp(t);
  };
});
var g = o((e, t) => {
  function n() {
    if (
      !(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u`) &&
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == `function`
    ) {
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (e) {
        console.error(e);
      }
    }
  }
  n();
  t.exports = h();
});
var _ = o((e) => {
  var t = Symbol.for(`react.transitional.element`);
  var n = Symbol.for(`react.fragment`);
  function r(e, n, r) {
    var i = null;
    if (r !== undefined) {
      i = `${r}`;
    }
    if (n.key !== undefined) {
      i = `${n.key}`;
    }
    if (`key` in n) {
      r = {};
      for (var a in n) {
        if (a !== `key`) {
          r[a] = n[a];
        }
      }
    } else {
      r = n;
    }
    n = r.ref;
    return {
      $$typeof: t,
      type: e,
      key: i,
      ref: n === undefined ? null : n,
      props: r,
    };
  }
  e.Fragment = n;
  e.jsx = r;
  e.jsxs = r;
});
var v = o((e, t) => {
  t.exports = _();
});
var y = c(g(), 1);
var b = c(u(), 1);
var x = v();
function _Component7() {
  let e = (0, b.useRef)(null);
  let t = (0, b.useRef)(null);
  (0, b.useEffect)(() => {
    let n = window.innerWidth / 2;
    let r = window.innerHeight / 2;
    let i = n;
    let a = r;
    let o;
    let s = (t) => {
      n = t.clientX;
      r = t.clientY;
      if (e.current) {
        e.current.style.transform = `translate(${n}px, ${r}px) translate(-50%, -50%)`;
      }
    };
    let c = () => {
      i += (n - i) * 0.35;
      a += (r - a) * 0.35;
      if (t.current) {
        t.current.style.transform = `translate(${i}px, ${a}px) translate(-50%, -50%)`;
      }
      o = requestAnimationFrame(c);
    };
    let l = `button, a, .dock-app, .item, .faq__q, .work, .nc__notif, input, textarea, .tl, .menubar__item, .spot__row`;
    let u = (e) => {
      if (e.target.closest(l) && t.current) {
        t.current.classList.add(`is-active`);
      }
    };
    let d = (e) => {
      if (e.target.closest(l) && t.current) {
        t.current.classList.remove(`is-active`);
      }
    };
    window.addEventListener(`mousemove`, s);
    document.addEventListener(`mouseover`, u);
    document.addEventListener(`mouseout`, d);
    c();
    return () => {
      cancelAnimationFrame(o);
      window.removeEventListener(`mousemove`, s);
      document.removeEventListener(`mouseover`, u);
      document.removeEventListener(`mouseout`, d);
    };
  }, []);
  const Component = `div`;
  const Component2 = `div`;
  return (
    <x.Fragment>
      <Component className={`cursor-dot`} ref={e} />
      <Component2 className={`cursor-ring`} ref={t} />
    </x.Fragment>
  );
}
function S() {
  const Component3 = `div`;
  return (
    <Component3
      style={{
        backgroundColor: `#ffffff`,
        width: `100vw`,
        height: `100vh`,
      }}
    />
  );
}
function C({ onDone: e }) {
  let [t, n] = (0, b.useState)(0);
  let [r, i] = (0, b.useState)(false);
  (0, b.useEffect)(() => {
    let t = [12, 28, 41, 56, 70, 82, 91, 100];
    let r = 0;
    let a;
    let o = () => {
      if (r >= t.length) {
        a = setTimeout(() => {
          i(true);
          setTimeout(() => e?.(), 800);
        }, 250);
        return;
      }
      n(t[r]);
      r += 1;
      a = setTimeout(o, 180 + Math.random() * 120);
    };
    a = setTimeout(o, 250);
    return () => clearTimeout(a);
  }, [e]);
  const Component4 = `span`;
  const Component5 = `div`;
  const Component6 = `div`;
  const Component7 = `div`;
  const Component8 = `span`;
  const Component9 = `span`;
  const Component10 = `div`;
  const Component11 = `span`;
  const Component12 = `div`;
  const Component13 = `div`;
  const Component14 = `div`;
  return (
    <Component14 className={`boot ${r ? `is-done` : ``}`}>
      <Component13 className={`boot__inner`}>
        <Component5 className={`boot__mark`}>
          {`MIA`}
          <Component4 className={`blink`} />
        </Component5>
        <Component7 className={`boot__bar`}>
          <Component6
            className={`boot__bar-fill`}
            style={{
              width: `${t}%`,
            }}
          />
        </Component7>
        <Component10 className={`boot__meta`}>
          <Component8>
            {t}
            {`%`}
          </Component8>
          <Component9>{`OS '26`}</Component9>
        </Component10>
        <Component12 className={`boot__copy`}>
          {`Studio MIA — A Creative Operating System`}
          <Component11 className={`ja`}>{`クリエイティブのためのOS`}</Component11>
        </Component12>
      </Component13>
    </Component14>
  );
}
var te = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
var ne = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
var re = [`日曜日`, `月曜日`, `火曜日`, `水曜日`, `木曜日`, `金曜日`, `土曜日`];
var w = [`日`, `月`, `火`, `水`, `木`, `金`, `土`];
function ie() {
  let [e, t] = (0, b.useState)(() => new Date());
  (0, b.useEffect)(() => {
    let e = setInterval(() => t(new Date()), 1000);
    return () => clearInterval(e);
  }, []);
  let n = e.getHours();
  let r = e.getMinutes();
  let i = e.getSeconds();
  return {
    now: e,
    h: n,
    m: r,
    s: i,
    digital: `${String(n).padStart(2, `0`)}:${String(r).padStart(2, `0`)}:${String(i).padStart(2, `0`)}`,
    digitalShort: `${String(n).padStart(2, `0`)}:${String(r).padStart(2, `0`)}`,
    hourDeg: (n % 12) * 30 + r * 0.5,
    minDeg: r * 6 + i * 0.1,
    secDeg: i * 6,
    monthEN: te[e.getMonth()],
    day: String(e.getDate()).padStart(2, `0`),
    weekdayEN: ne[e.getDay()],
    weekdayJP: re[e.getDay()],
    weekdayShortEN: ne[e.getDay()].slice(0, 3),
    weekdayShortJP: w[e.getDay()],
  };
}
function _Component8({ onSpotlight: e, onNotificationCenter: t, onCloseAll: n, onOpenWindow: r }) {
  let [i, a] = (0, b.useState)(null);
  let o = (0, b.useRef)(null);
  let { weekdayShortEN: s, digitalShort: c, weekdayShortJP: l } = ie();
  (0, b.useEffect)(() => {
    let e = (e) => {
      if (!o.current?.contains(e.target)) {
        a(null);
      }
    };
    document.addEventListener(`click`, e);
    return () => document.removeEventListener(`click`, e);
  }, []);
  const Component15 = `span`;
  const Component16 = `span`;
  const Component17 = `div`;
  const Component18 = `button`;
  const Component19 = `button`;
  const Component20 = `button`;
  const Component21 = `button`;
  const Component22 = `button`;
  const Component23 = `span`;
  const Component24 = `span`;
  const Component25 = `button`;
  const Component26 = `span`;
  const Component27 = `span`;
  const Component28 = `button`;
  const Component29 = `hr`;
  const Component30 = `span`;
  const Component31 = `span`;
  const Component32 = `div`;
  const Component33 = `hr`;
  const Component34 = `span`;
  const Component35 = `span`;
  const Component36 = `button`;
  const Component37 = `div`;
  const Component38 = `div`;
  const Component39 = `circle`;
  const Component40 = `path`;
  const Component41 = `svg`;
  const Component42 = `button`;
  const Component43 = `rect`;
  const Component44 = `rect`;
  const Component45 = `rect`;
  const Component46 = `rect`;
  const Component47 = `svg`;
  const Component48 = `button`;
  const Component49 = `path`;
  const Component50 = `svg`;
  const Component51 = `button`;
  const Component52 = `rect`;
  const Component53 = `rect`;
  const Component54 = `path`;
  const Component55 = `svg`;
  const Component56 = `button`;
  const Component57 = `span`;
  const Component58 = `span`;
  const Component59 = `div`;
  const Component60 = `header`;
  return (
    <Component60 className={`menubar`} ref={o}>
      <Component38 className={`menubar__left`}>
        <Component17 className={`menubar__brand`}>
          <Component15 className={`menubar__brand-mark`} />
          <Component16 className={`full`}>{`STUDIO MIA`}</Component16>
        </Component17>
        <Component18
          className={`menubar__item ${i === `file` ? `is-active` : ``}`}
          onClick={(e) => {
            e.stopPropagation();
            a(i === `file` ? null : `file`);
          }}
        >{`File`}</Component18>
        <Component19 className={`menubar__item`}>{`Edit`}</Component19>
        <Component20 className={`menubar__item`}>{`View`}</Component20>
        <Component21 className={`menubar__item`}>{`Window`}</Component21>
        <Component22 className={`menubar__item`}>{`Help`}</Component22>
        {i === `file` && (
          <Component37
            className={`menubar__dropdown`}
            style={{
              left: 64,
            }}
          >
            <Component25
              className={`row`}
              style={{
                width: `100%`,
              }}
              onClick={() => {
                a(null);
                r?.(`welcome`);
              }}
            >
              <Component23>{`New Window`}</Component23>
              <Component24 className={`kbd`}>{`⌘N`}</Component24>
            </Component25>
            <Component28
              className={`row`}
              style={{
                width: `100%`,
              }}
              onClick={() => {
                a(null);
                e?.();
              }}
            >
              <Component26>{`Open Spotlight`}</Component26>
              <Component27 className={`kbd`}>{`⌘K`}</Component27>
            </Component28>
            <Component29 />
            <Component32 className={`row dim`}>
              <Component30>{`Print…`}</Component30>
              <Component31 className={`kbd`}>{`⌘P`}</Component31>
            </Component32>
            <Component33 />
            <Component36
              className={`row`}
              style={{
                width: `100%`,
              }}
              onClick={() => {
                a(null);
                n?.();
              }}
            >
              <Component34>{`Close All Windows`}</Component34>
              <Component35 className={`kbd`}>{`⌘W`}</Component35>
            </Component36>
          </Component37>
        )}
      </Component38>
      <Component59 className={`menubar__right`}>
        <Component42 className={`menubar__item ico`} title={`Search (⌘K)`} onClick={e}>
          <Component41 viewBox={`0 0 16 16`} fill={`none`} stroke={`currentColor`} strokeWidth={`1.5`}>
            <Component39 cx={`7`} cy={`7`} r={`4.5`} />
            <Component40 d={`m10.5 10.5 3 3`} />
          </Component41>
        </Component42>
        <Component48 className={`menubar__item ico`} title={`Control Center`} onClick={t}>
          <Component47 viewBox={`0 0 16 16`} fill={`currentColor`}>
            <Component43 x={`2`} y={`3`} width={`5`} height={`3`} rx={`1.2`} />
            <Component44 x={`9`} y={`3`} width={`5`} height={`3`} rx={`1.2`} />
            <Component45 x={`2`} y={`10`} width={`5`} height={`3`} rx={`1.2`} />
            <Component46 x={`9`} y={`10`} width={`5`} height={`3`} rx={`1.2`} />
          </Component47>
        </Component48>
        <Component51 className={`menubar__item ico`} title={`Wi-Fi`}>
          <Component50 viewBox={`0 0 16 16`} fill={`currentColor`}>
            <Component49
              d={`M8 11.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm-3.4-3.7a4.8 4.8 0 0 1 6.8 0l-1 1a3.4 3.4 0 0 0-4.8 0l-1-1Zm-2-2a7.7 7.7 0 0 1 10.8 0l-1 1a6.3 6.3 0 0 0-8.8 0l-1-1Z`}
            />
          </Component50>
        </Component51>
        <Component56 className={`menubar__item ico`} title={`Battery 100%`}>
          <Component55 viewBox={`0 0 22 12`} fill={`none`} stroke={`currentColor`} strokeWidth={`1.2`}>
            <Component52 x={`.6`} y={`.6`} width={`18`} height={`10.8`} rx={`2.5`} />
            <Component53 x={`2.5`} y={`2.5`} width={`14.5`} height={`7`} rx={`1.2`} fill={`currentColor`} />
            <Component54 d={`M20 4v4`} strokeLinecap={`round`} />
          </Component55>
        </Component56>
        <Component58 className={`menubar__time`}>
          {s}
          {` `}
          {c}
          <Component57 className={`ja`}>{l}</Component57>
        </Component58>
      </Component59>
    </Component60>
  );
}
function _Component() {
  let { hourDeg: e, minDeg: t, secDeg: n, digital: r } = ie();
  const Component61 = `span`;
  let i = Array.from(
    {
      length: 12,
    },
    (e, t) => (
      <Component61
        className={`tick ${t % 3 == 0 ? `major` : ``}`}
        style={{
          transform: `rotate(${t * 30}deg)`,
        }}
        key={t}
      />
    ),
  );
  const Component62 = `span`;
  const Component63 = `span`;
  const Component64 = `div`;
  const Component65 = `div`;
  const Component66 = `div`;
  const Component67 = `div`;
  const Component68 = `div`;
  const Component69 = `div`;
  const Component70 = `span`;
  const Component71 = `span`;
  const Component72 = `span`;
  const Component73 = `span`;
  const Component74 = `div`;
  const Component75 = `div`;
  return (
    <Component75 className={`widget widget--clock`}>
      <Component64 className={`widget__label`}>
        <Component62>{`Clock`}</Component62>
        <Component63 className={`ja`}>{`時計`}</Component63>
      </Component64>
      <Component69 className={`clock-face`}>
        {i}
        <Component65
          className={`hand-h`}
          style={{
            transform: `rotate(${e}deg)`,
          }}
        />
        <Component66
          className={`hand-m`}
          style={{
            transform: `rotate(${t}deg)`,
          }}
        />
        <Component67
          className={`hand-s`}
          style={{
            transform: `rotate(${n}deg)`,
          }}
        />
        <Component68 className={`pivot`} />
      </Component69>
      <Component74 className={`clock-meta`}>
        <Component70 className={`digital`}>{r}</Component70>
        <Component73 className={`place`}>
          <Component71 className={`en`}>{`Shimane`}</Component71>
          <Component72 className={`ja`}>{`島根, JP`}</Component72>
        </Component73>
      </Component74>
    </Component75>
  );
}
function _Component2() {
  let { monthEN: e, day: t, weekdayEN: n, weekdayJP: r } = ie();
  const Component76 = `span`;
  const Component77 = `span`;
  const Component78 = `div`;
  const Component79 = `div`;
  const Component80 = `div`;
  const Component81 = `span`;
  const Component82 = `div`;
  const Component83 = `div`;
  return (
    <Component83 className={`widget widget--cal`}>
      <Component78 className={`widget__label`}>
        <Component76>{`Calendar`}</Component76>
        <Component77 className={`ja`}>{`暦`}</Component77>
      </Component78>
      <Component79 className={`cal-month`}>{e}</Component79>
      <Component80 className={`cal-day`}>{t}</Component80>
      <Component82 className={`cal-weekday`}>
        {n}
        <Component81 className={`ja`}>{r}</Component81>
      </Component82>
    </Component83>
  );
}
function _Component3() {
  const Component84 = `span`;
  const Component85 = `span`;
  const Component86 = `div`;
  const Component87 = `span`;
  const Component88 = `div`;
  const Component89 = `div`;
  const Component90 = `div`;
  const Component91 = `span`;
  const Component92 = `span`;
  const Component93 = `div`;
  const Component94 = `div`;
  const Component95 = `div`;
  const Component96 = `div`;
  return (
    <Component96 className={`widget widget--weather`}>
      <Component86 className={`widget__label`}>
        <Component84>{`Weather`}</Component84>
        <Component85 className={`ja`}>{`天気`}</Component85>
      </Component86>
      <Component89>
        <Component88 className={`weather-place`}>
          {`Matsue`}
          <Component87 className={`ja`}>{`松江`}</Component87>
        </Component88>
      </Component89>
      <Component95>
        <Component90 className={`weather-temp`}>{`21°`}</Component90>
        <Component94 className={`weather-cond`}>
          <Component92>
            {`Mostly Sunny`}
            <Component91
              style={{
                display: `block`,
                fontFamily: `var(--font-jp)`,
                fontSize: 9,
                color: `var(--t-3)`,
              }}
            >{`概ね晴れ`}</Component91>
          </Component92>
          <Component93 className={`weather-icon`} />
        </Component94>
      </Component95>
    </Component96>
  );
}
function _Component4() {
  const Component97 = `div`;
  const Component98 = `div`;
  const Component99 = `div`;
  const Component100 = `div`;
  const Component101 = `span`;
  const Component102 = `span`;
  const Component103 = `span`;
  const Component104 = `span`;
  const Component105 = `div`;
  const Component106 = `div`;
  return (
    <Component106 className={`widget widget--np`}>
      <Component97 className={`np-art`} />
      <Component100 className={`np-info`}>
        <Component98 className={`np-track`}>{`Capture with story.`}</Component98>
        <Component99 className={`np-artist`}>{`Studio MIA — '26`}</Component99>
      </Component100>
      <Component105 className={`np-bars`}>
        <Component101 />
        <Component102 />
        <Component103 />
        <Component104 />
      </Component105>
    </Component106>
  );
}
function _Component9() {
  const Component107 = `div`;
  return (
    <Component107 className={`widgets`}>
      <_Component />
      <_Component2 />
      <_Component3 />
      <_Component4 />
    </Component107>
  );
}
function T() {
  const Component108 = `span`;
  const Component109 = `span`;
  const Component110 = `span`;
  const Component111 = `span`;
  const Component112 = `span`;
  const Component113 = `span`;
  const Component114 = `div`;
  const Component115 = `span`;
  const Component116 = `div`;
  const Component117 = `em`;
  const Component118 = `br`;
  const Component119 = `br`;
  const Component120 = `em`;
  const Component121 = `h1`;
  const Component122 = `strong`;
  const Component123 = `span`;
  const Component124 = `p`;
  const Component125 = `div`;
  const Component126 = `em`;
  const Component127 = `em`;
  const Component128 = `div`;
  const Component129 = `div`;
  return (
    <x.Fragment>
      <Component114 className={`stamp-tag`}>
        <Component109 className={`row`}>
          {`A creative artist `}
          <Component108 className={`ja`}>{`クリエイター`}</Component108>
        </Component109>
        <Component111 className={`row`}>
          {`35.4722°N Shimane, JP `}
          <Component110 className={`ja`}>{`島根`}</Component110>
        </Component111>
        <Component113 className={`row`}>
          {`Since 2025 `}
          <Component112 className={`ja`}>{`設立`}</Component112>
        </Component113>
      </Component114>
      <Component125 className={`desk-hint`}>
        <Component116 className={`desk-hint__label`}>
          {`Welcome to MIA OS '26 `}
          <Component115 className={`ja`}>{`ようこそ`}</Component115>
        </Component116>
        <Component121 className={`desk-hint__title`}>
          {`Design `}
          <Component117>{`&`}</Component117>
          <Component118 />
          {`Capture`}
          <Component119 />
          {`with `}
          <Component120>{`story`}</Component120>
          {`.`}
        </Component121>
        <Component124 className={`desk-hint__sub`}>
          {`A studio operating system. Click any app on the dock to open a window — or press `}
          <Component122>{`⌘K`}</Component122>
          {` for Spotlight.`}
          <Component123
            className={`ja`}
          >{`下のDockのアイコンをクリック、または⌘Kで検索を開いてください。`}</Component123>
        </Component124>
      </Component125>
      <Component129 className={`marquee`} aria-hidden={`true`}>
        <Component128 className={`marquee__inner`}>
          {`Studio\xA0MIA\xA0—\xA0Design\xA0&\xA0Capture\xA0with\xA0`}
          <Component126
            style={{
              fontStyle: `italic`,
            }}
          >{`story`}</Component126>
          {`.\xA0\xA0\xA0 Studio\xA0MIA\xA0—\xA0Design\xA0&\xA0Capture\xA0with\xA0`}
          <Component127
            style={{
              fontStyle: `italic`,
            }}
          >{`story`}</Component127>
          {`.\xA0\xA0\xA0`}
        </Component128>
      </Component129>
    </x.Fragment>
  );
}
function E({ open: e }) {
  const Component130 = `path`;
  const Component131 = `svg`;
  const Component132 = `div`;
  const Component133 = `span`;
  const Component134 = `div`;
  const Component135 = `div`;
  const Component136 = `span`;
  const Component137 = `div`;
  const Component138 = `div`;
  const Component139 = `path`;
  const Component140 = `svg`;
  const Component141 = `div`;
  const Component142 = `span`;
  const Component143 = `div`;
  const Component144 = `div`;
  const Component145 = `span`;
  const Component146 = `div`;
  const Component147 = `div`;
  const Component148 = `circle`;
  const Component149 = `path`;
  const Component150 = `svg`;
  const Component151 = `div`;
  const Component152 = `span`;
  const Component153 = `div`;
  const Component154 = `div`;
  const Component155 = `span`;
  const Component156 = `div`;
  const Component157 = `div`;
  const Component158 = `aside`;
  return (
    <Component158 className={`nc ${e ? `is-open` : ``}`}>
      <Component138 className={`nc__notif`}>
        <Component132
          className={`ico`}
          style={{
            background: `linear-gradient(135deg,#3a4dff,#6c5cff)`,
          }}
        >
          <Component131 width={`14`} height={`14`} viewBox={`0 0 16 16`} fill={`#fff`}>
            <Component130 d={`M8 1.5 14 5l-6 3.5L2 5l6-3.5Zm0 7L2 5v6l6 3.5L14 11V5L8 8.5Z`} />
          </Component131>
        </Component132>
        <Component137 className={`body`}>
          <Component134 className={`title`}>
            {`MIA OS`}
            <Component133 className={`time`}>{`now`}</Component133>
          </Component134>
          <Component135>{`Welcome — there's a new window open on your desktop.`}</Component135>
          <Component136 className={`ja`}>{`ようこそ、MIA OS '26 へ`}</Component136>
        </Component137>
      </Component138>
      <Component147 className={`nc__notif`}>
        <Component141
          className={`ico`}
          style={{
            background: `linear-gradient(135deg,#ff9a9a,#ff5f57)`,
          }}
        >
          <Component140 width={`14`} height={`14`} viewBox={`0 0 16 16`} fill={`#fff`}>
            <Component139 d={`M2 3h12v10H2V3Zm1 1v8h10V4H3Zm2 2 3 2 3-2`} />
          </Component140>
        </Component141>
        <Component146 className={`body`}>
          <Component143 className={`title`}>
            {`Mail`}
            <Component142 className={`time`}>{`2h`}</Component142>
          </Component143>
          <Component144>{`Currently accepting new projects for 2026.`}</Component144>
          <Component145 className={`ja`}>{`2026年案件、受付中です`}</Component145>
        </Component146>
      </Component147>
      <Component157 className={`nc__notif`}>
        <Component151
          className={`ico`}
          style={{
            background: `linear-gradient(135deg,#28c840,#10a070)`,
          }}
        >
          <Component150 width={`14`} height={`14`} viewBox={`0 0 16 16`}>
            <Component148 cx={`8`} cy={`8`} r={`6.4`} fill={`none`} stroke={`#fff`} strokeWidth={`1.4`} />
            <Component149
              d={`M8 4.5v3.7l2.3 1.4`}
              fill={`none`}
              stroke={`#fff`}
              strokeWidth={`1.4`}
              strokeLinecap={`round`}
            />
          </Component150>
        </Component151>
        <Component156 className={`body`}>
          <Component153 className={`title`}>
            {`Local Time`}
            <Component152 className={`time`}>{`live`}</Component152>
          </Component153>
          <Component154>{`Asia/Tokyo — JST. Working hours: 10:00 – 19:00.`}</Component154>
          <Component155 className={`ja`}>{`業務時間 10:00〜19:00`}</Component155>
        </Component156>
      </Component157>
    </Component158>
  );
}
var de = {
  welcome: {
    title: `Finder`,
    titleJa: `ファインダー`,
    w: 840,
    h: 560,
    side: true,
    app: `finder`,
  },
  about: {
    title: `About — MIA`,
    titleJa: `私について`,
    w: 760,
    h: 560,
    app: `about`,
  },
  process: {
    title: `Process — How we work`,
    titleJa: `仕事の流れ`,
    w: 780,
    h: 560,
    app: `process`,
  },
  works: {
    title: `Works — Selected`,
    titleJa: `制作実績`,
    w: 840,
    h: 580,
    app: `works`,
  },
  skills: {
    title: `Skills — System`,
    titleJa: `できること`,
    w: 780,
    h: 540,
    app: `skills`,
  },
  price: {
    title: `Price`,
    titleJa: `料金`,
    w: 760,
    h: 540,
    app: `price`,
  },
  faq: {
    title: `FAQ`,
    titleJa: `よくある質問`,
    w: 740,
    h: 560,
    app: `faq`,
  },
  contact: {
    title: `Mail — Compose`,
    titleJa: `お問い合わせ`,
    w: 780,
    h: 560,
    app: `contact`,
  },
};
var fe = {
  1: `welcome`,
  2: `about`,
  3: `works`,
  4: `process`,
  5: `skills`,
  6: `price`,
  7: `faq`,
  8: `contact`,
};
var pe = [
  {
    app: `finder`,
    w: `welcome`,
    label: `Finder`,
    ja: `ファインダー`,
  },
  {
    app: `about`,
    w: `about`,
    label: `About me`,
    ja: `私について`,
  },
  {
    app: `works`,
    w: `works`,
    label: `Works`,
    ja: `制作実績`,
  },
  {
    app: `process`,
    w: `process`,
    label: `Process`,
    ja: `仕事の流れ`,
  },
  {
    app: `skills`,
    w: `skills`,
    label: `Skills`,
    ja: `できること`,
  },
  {
    app: `price`,
    w: `price`,
    label: `Price`,
    ja: `料金`,
  },
  {
    app: `faq`,
    w: `faq`,
    label: `FAQ`,
    ja: `よくある質問`,
  },
  {
    app: `contact`,
    w: `contact`,
    label: `Mail`,
    ja: `お問い合わせ`,
  },
  {
    app: `trash`,
    w: null,
    label: `Trash`,
    ja: `ゴミ箱`,
  },
];
var me = [
  {
    id: `welcome`,
    name: `Finder`,
    ja: `ファインダー`,
    kbd: `⌘1`,
    cls: `s5`,
  },
  {
    id: `about`,
    name: `About`,
    ja: `私について`,
    kbd: `⌘2`,
    cls: `s1`,
  },
  {
    id: `works`,
    name: `Works`,
    ja: `制作実績`,
    kbd: `⌘3`,
    cls: `s2`,
  },
  {
    id: `process`,
    name: `Process`,
    ja: `仕事の流れ`,
    kbd: `⌘4`,
    cls: `s4`,
  },
  {
    id: `skills`,
    name: `Skills`,
    ja: `できること`,
    kbd: `⌘5`,
    cls: `s3`,
  },
  {
    id: `price`,
    name: `Price`,
    ja: `料金`,
    kbd: `⌘6`,
    cls: `s4`,
  },
  {
    id: `faq`,
    name: `FAQ`,
    ja: `よくある質問`,
    kbd: `⌘7`,
    cls: `s6`,
  },
  {
    id: `contact`,
    name: `Mail`,
    ja: `お問い合わせ`,
    kbd: `⌘8`,
    cls: `s1`,
  },
];
const Component159 = `path`;
const Component160 = `svg`;
const Component161 = `circle`;
const Component162 = `path`;
const Component163 = `svg`;
const Component164 = `rect`;
const Component165 = `path`;
const Component166 = `circle`;
const Component167 = `svg`;
const Component168 = `circle`;
const Component169 = `path`;
const Component170 = `svg`;
const Component171 = `path`;
const Component172 = `svg`;
const Component173 = `path`;
const Component174 = `svg`;
const Component175 = `path`;
const Component176 = `svg`;
const Component177 = `rect`;
const Component178 = `path`;
const Component179 = `svg`;
const Component180 = `path`;
const Component181 = `svg`;
var D = {
  finder: (
    <Component160 viewBox={`0 0 24 24`} fill={`currentColor`}>
      <Component159 d={`M4 5a2 2 0 0 1 2-2h6l2 2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z`} />
    </Component160>
  ),
  about: (
    <Component163 viewBox={`0 0 24 24`} fill={`currentColor`}>
      <Component161 cx={`12`} cy={`8`} r={`3.6`} />
      <Component162 d={`M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5`} />
    </Component163>
  ),
  works: (
    <Component167 viewBox={`0 0 24 24`} fill={`none`} stroke={`currentColor`} strokeWidth={`1.8`}>
      <Component164 x={`3`} y={`4`} width={`18`} height={`14`} rx={`1.5`} />
      <Component165 d={`m3 14 5-4 4 3 4-5 5 6`} />
      <Component166 cx={`8`} cy={`9`} r={`1.4`} fill={`currentColor`} />
    </Component167>
  ),
  process: (
    <Component170 viewBox={`0 0 24 24`} fill={`none`} stroke={`currentColor`} strokeWidth={`1.8`}>
      <Component168 cx={`12`} cy={`12`} r={`3`} />
      <Component169
        d={`M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1`}
      />
    </Component170>
  ),
  skills: (
    <Component172 viewBox={`0 0 24 24`} fill={`none`} stroke={`currentColor`} strokeWidth={`1.8`}>
      <Component171 d={`M4 20V8M10 20V4M16 20v-8M22 20H2`} />
    </Component172>
  ),
  price: (
    <Component174
      viewBox={`0 0 24 24`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
    >
      <Component173 d={`M5 7h14M5 12h14M9 7l-3 8h12L15 7M9 17h6`} />
    </Component174>
  ),
  faq: (
    <Component176
      viewBox={`0 0 24 24`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
    >
      <Component175 d={`M9 9a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1-1.5 2.4M12 18h.01`} />
    </Component176>
  ),
  contact: (
    <Component179
      viewBox={`0 0 24 24`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinejoin={`round`}
    >
      <Component177 x={`3`} y={`5`} width={`18`} height={`14`} rx={`1.5`} />
      <Component178 d={`m3 7 9 6 9-6`} />
    </Component179>
  ),
  trash: (
    <Component181
      viewBox={`0 0 24 24`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
    >
      <Component180 d={`M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14M10 11v5M14 11v5`} />
    </Component181>
  ),
};
function O({ openWindows: e, onOpen: t, onCloseAll: n }) {
  const Component188 = `nav`;
  const Component189 = `div`;
  return (
    <Component189 className={`dock-wrap`}>
      <Component188 className={`dock`}>
        {pe.map((r, i) => {
          let a = r.app === `trash`;
          let o = !a && e.some((e) => e.key === r.w);
          const Component182 = `span`;
          const Component183 = `span`;
          const Component184 = `span`;
          const Component185 = `span`;
          const Component186 = `button`;
          const Component187 = `span`;
          return (
            <Component187
              style={{
                display: `contents`,
              }}
              key={r.app}
            >
              {i === pe.length - 1 && <Component182 className={`dock__sep`} />}
              <Component186
                className={`dock-app ${o ? `is-open` : ``}`}
                data-app={r.app}
                onClick={() => {
                  if (a) {
                    n();
                  } else {
                    t(r.w);
                  }
                }}
              >
                {D[r.app]}
                <Component184 className={`dock-tooltip`}>
                  {r.label}
                  <Component183 className={`ja`}>{r.ja}</Component183>
                </Component184>
                <Component185 className={`dock-app__indicator`} />
              </Component186>
            </Component187>
          );
        })}
      </Component188>
    </Component189>
  );
}
function _Component1({ open: e, onClose: t, onOpenWindow: n }) {
  let [r, i] = (0, b.useState)(``);
  let [a, o] = (0, b.useState)(0);
  let s = (0, b.useRef)(null);
  let c = r.toLowerCase().trim();
  let l = me.filter(
    (e) => !c || e.name.toLowerCase().includes(c) || e.ja.includes(r.trim()) || e.id.includes(c),
  );
  (0, b.useEffect)(() => {
    if (e) {
      i(``);
      o(0);
      setTimeout(() => s.current?.focus(), 80);
    }
  }, [e]);
  (0, b.useEffect)(() => {
    o(0);
  }, [r]);
  const Component190 = `input`;
  const Component191 = `div`;
  const Component192 = `div`;
  const Component193 = `span`;
  const Component194 = `div`;
  const Component195 = `div`;
  const Component196 = `span`;
  const Component197 = `button`;
  const Component198 = `div`;
  const Component199 = `div`;
  const Component200 = `div`;
  return (
    <Component200
      className={`spot-back ${e ? `is-open` : ``}`}
      onClick={(e) => {
        if (e.target.classList.contains(`spot-back`)) {
          t();
        }
      }}
    >
      <Component199 className={`spot`}>
        <Component190
          ref={s}
          className={`spot__input`}
          placeholder={`Search MIA OS — try “works”, “skills”, “contact”…`}
          autoComplete={`off`}
          value={r}
          onChange={(e) => i(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === `Escape`) {
              t();
            }
            if (e.key === `Enter`) {
              e.preventDefault();
              let r = l[a];
              if (r) {
                t();
                n(r.id);
              }
            }
            if (e.key === `ArrowDown`) {
              e.preventDefault();
              o((e) => Math.min(l.length - 1, e + 1));
            }
            if (e.key === `ArrowUp`) {
              e.preventDefault();
              o((e) => Math.max(0, e - 1));
            }
          }}
        />
        <Component198 className={`spot__results`}>
          {l.length === 0 ? (
            <Component191
              style={{
                padding: 24,
                color: `var(--t-3)`,
                fontSize: 13,
                textAlign: `center`,
              }}
            >{`No results — まだここには無いみたいです。`}</Component191>
          ) : (
            l.map((e, r) => (
              <Component197
                className={`spot__row ${r === a ? `is-active` : ``}`}
                onMouseEnter={() => o(r)}
                onClick={() => {
                  t();
                  n(e.id);
                }}
                style={{
                  width: `100%`,
                  textAlign: `left`,
                  display: `grid`,
                  gridTemplateColumns: `32px 1fr auto`,
                  gap: 14,
                  alignItems: `center`,
                  padding: `10px 16px`,
                }}
                key={e.id}
              >
                <Component192 className={`ico skill-icon ${e.cls}`}>{e.name.slice(0, 2)}</Component192>
                <Component195>
                  <Component194 className={`name`}>
                    {e.name}
                    <Component193
                      className={`ja`}
                      style={{
                        marginLeft: 8,
                      }}
                    >
                      {e.ja}
                    </Component193>
                  </Component194>
                </Component195>
                <Component196 className={`kbd`}>{e.kbd}</Component196>
              </Component197>
            ))
          )}
        </Component198>
      </Component199>
    </Component200>
  );
}
function ge() {
  const Component201 = `span`;
  const Component202 = `div`;
  const Component203 = `br`;
  const Component204 = `em`;
  const Component205 = `h2`;
  const Component206 = `span`;
  const Component207 = `div`;
  const Component208 = `span`;
  const Component209 = `p`;
  const Component210 = `span`;
  const Component211 = `p`;
  const Component212 = `div`;
  const Component213 = `div`;
  const Component214 = `div`;
  const Component215 = `span`;
  const Component216 = `div`;
  const Component217 = `span`;
  const Component218 = `p`;
  const Component219 = `div`;
  return (
    <Component219 className={`win-main`}>
      <Component202 className={`section-tag`}>
        {`[about] About me `}
        <Component201 className={`ja`}>{`私について`}</Component201>
      </Component202>
      <Component205 className={`section-h`}>
        {`Web design,`}
        <Component203 />
        {`photography & `}
        <Component204>{`cinematic`}</Component204>
        {` work.`}
      </Component205>
      <Component213 className={`about-hero`}>
        <Component207 className={`about-avatar`}>
          <Component206 className={`badge`}>{`MIA / 2026`}</Component206>
        </Component207>
        <Component212 className={`about-text`}>
          <Component209>
            {`MIA is a creative artist working from Shimane, Japan. Mainly building lightweight, editorial-feeling websites — and shooting still & moving images that quietly carry their own story.`}
            <Component208
              className={`ja`}
            >{`島根県を拠点にWebデザイン・写真・映像を手がけるクリエイターです。軽くて読みやすい、編集物のような佇まいのサイトを心がけています。`}</Component208>
          </Component209>
          <Component211>
            {`Tools change, but the brief stays the same: figure out what the project is actually trying to say, then strip everything else away until that thing is loud enough to land.`}
            <Component210
              className={`ja`}
            >{`使う道具は変わっても、伝えたいことを見つけて、それ以外を削いでいく — そこは変えません。`}</Component210>
          </Component211>
        </Component212>
      </Component213>
      <Component214 className={`divider`} />
      <Component216 className={`section-tag`}>
        {`[impression] What clients say `}
        <Component215 className={`ja`}>{`印象`}</Component215>
      </Component216>
      <Component218
        className={`section-sub`}
        style={{
          marginTop: 8,
        }}
      >
        {`Calm, careful, surprisingly fast. Doesn't redesign the whole brand to solve a small problem. Cares about kerning, the cut of a video, and whether the homepage actually answers the question someone came to ask.`}
        <Component217
          className={`ja`}
        >{`必要以上に大きな提案をしません。カーニング、編集の流れ、来訪者の質問にちゃんと答えるトップページ — そういう細部を大事にします。`}</Component217>
      </Component218>
    </Component219>
  );
}
function _e() {
  const Component220 = `span`;
  const Component221 = `div`;
  const Component222 = `em`;
  const Component223 = `br`;
  const Component224 = `h2`;
  const Component225 = `span`;
  const Component226 = `rect`;
  const Component227 = `rect`;
  const Component228 = `circle`;
  const Component229 = `circle`;
  const Component230 = `circle`;
  const Component231 = `text`;
  const Component232 = `rect`;
  const Component233 = `rect`;
  const Component234 = `rect`;
  const Component235 = `text`;
  const Component236 = `rect`;
  const Component237 = `svg`;
  const Component238 = `div`;
  const Component239 = `div`;
  const Component240 = `em`;
  const Component241 = `h3`;
  const Component242 = `span`;
  const Component243 = `p`;
  const Component244 = `span`;
  const Component245 = `span`;
  const Component246 = `div`;
  const Component247 = `div`;
  const Component248 = `article`;
  const Component249 = `span`;
  const Component250 = `rect`;
  const Component251 = `rect`;
  const Component252 = `text`;
  const Component253 = `rect`;
  const Component254 = `rect`;
  const Component255 = `rect`;
  const Component256 = `rect`;
  const Component257 = `rect`;
  const Component258 = `text`;
  const Component259 = `text`;
  const Component260 = `rect`;
  const Component261 = `svg`;
  const Component262 = `div`;
  const Component263 = `div`;
  const Component264 = `em`;
  const Component265 = `h3`;
  const Component266 = `span`;
  const Component267 = `p`;
  const Component268 = `span`;
  const Component269 = `span`;
  const Component270 = `div`;
  const Component271 = `div`;
  const Component272 = `article`;
  const Component273 = `span`;
  const Component274 = `polygon`;
  const Component275 = `polygon`;
  const Component276 = `polygon`;
  const Component277 = `line`;
  const Component278 = `g`;
  const Component279 = `text`;
  const Component280 = `svg`;
  const Component281 = `div`;
  const Component282 = `div`;
  const Component283 = `em`;
  const Component284 = `h3`;
  const Component285 = `span`;
  const Component286 = `p`;
  const Component287 = `span`;
  const Component288 = `span`;
  const Component289 = `div`;
  const Component290 = `div`;
  const Component291 = `article`;
  const Component292 = `span`;
  const Component293 = `rect`;
  const Component294 = `rect`;
  const Component295 = `circle`;
  const Component296 = `circle`;
  const Component297 = `rect`;
  const Component298 = `rect`;
  const Component299 = `text`;
  const Component300 = `svg`;
  const Component301 = `div`;
  const Component302 = `div`;
  const Component303 = `em`;
  const Component304 = `h3`;
  const Component305 = `span`;
  const Component306 = `p`;
  const Component307 = `span`;
  const Component308 = `span`;
  const Component309 = `div`;
  const Component310 = `div`;
  const Component311 = `article`;
  const Component312 = `div`;
  const Component313 = `div`;
  return (
    <Component313 className={`win-main`}>
      <Component221 className={`section-tag`}>
        {`[works] Selected works `}
        <Component220 className={`ja`}>{`制作実績`}</Component220>
      </Component221>
      <Component224 className={`section-h`}>
        {`A few `}
        <Component222>{`things`}</Component222>
        <Component223 />
        {`I'm proud of.`}
      </Component224>
      <Component312 className={`works-grid`}>
        <Component248 className={`work`}>
          <Component238 className={`work__media m1`}>
            <Component225 className={`badge`}>{`Web · 2026`}</Component225>
            <Component237 viewBox={`0 0 200 120`} xmlns={`http://www.w3.org/2000/svg`}>
              <Component226
                x={`10`}
                y={`10`}
                width={`180`}
                height={`100`}
                rx={`6`}
                fill={`none`}
                stroke={`#e9e9ef`}
                strokeWidth={`1`}
              />
              <Component227
                x={`10`}
                y={`10`}
                width={`180`}
                height={`14`}
                rx={`6`}
                fill={`rgba(255,255,255,.08)`}
              />
              <Component228 cx={`20`} cy={`17`} r={`2`} fill={`#ff5f57`} />
              <Component229 cx={`28`} cy={`17`} r={`2`} fill={`#febc2e`} />
              <Component230 cx={`36`} cy={`17`} r={`2`} fill={`#28c840`} />
              <Component231
                x={`22`}
                y={`48`}
                fontFamily={`Poppins, Zen Kaku Gothic New, sans-serif`}
                fontStyle={`italic`}
                fontSize={`20`}
                fill={`#fff`}
              >{`Atogaki`}</Component231>
              <Component232 x={`22`} y={`58`} width={`100`} height={`3`} rx={`1.5`} fill={`#73737e`} />
              <Component233 x={`22`} y={`66`} width={`70`} height={`3`} rx={`1.5`} fill={`#73737e`} />
              <Component234 x={`22`} y={`84`} width={`36`} height={`14`} rx={`7`} fill={`#fff`} />
              <Component235
                x={`40`}
                y={`94`}
                textAnchor={`middle`}
                fontFamily={`Inter Tight`}
                fontSize={`7`}
                fill={`#15151a`}
              >{`Read →`}</Component235>
              <Component236
                x={`140`}
                y={`40`}
                width={`40`}
                height={`60`}
                rx={`3`}
                fill={`rgba(255,255,255,.08)`}
              />
            </Component237>
          </Component238>
          <Component247 className={`work__body`}>
            <Component239 className={`work__cat`}>{`Web design / Reading app`}</Component239>
            <Component241 className={`work__title`}>
              {`Atogaki — `}
              <Component240>{`a reader`}</Component240>
            </Component241>
            <Component243 className={`work__desc`}>
              {`A quiet reading app that hides itself when you're reading.`}
              <Component242 className={`ja`}>{`読書中は気配を消すリーディングアプリ。`}</Component242>
            </Component243>
            <Component246 className={`work__meta`}>
              <Component244>{`2026`}</Component244>
              <Component245>{`↗ View case`}</Component245>
            </Component246>
          </Component247>
        </Component248>
        <Component272 className={`work`}>
          <Component262 className={`work__media m2`}>
            <Component249 className={`badge`}>{`Web · 2026`}</Component249>
            <Component261 viewBox={`0 0 200 120`} xmlns={`http://www.w3.org/2000/svg`}>
              <Component250 x={`36`} y={`6`} width={`60`} height={`108`} rx={`10`} fill={`#15151a`} />
              <Component251 x={`40`} y={`14`} width={`52`} height={`92`} rx={`6`} fill={`#fff`} />
              <Component252
                x={`66`}
                y={`36`}
                textAnchor={`middle`}
                fontFamily={`Poppins, Zen Kaku Gothic New, sans-serif`}
                fontStyle={`italic`}
                fontSize={`11`}
                fill={`#15151a`}
              >{`MIA`}</Component252>
              <Component253 x={`46`} y={`44`} width={`40`} height={`2`} rx={`1`} fill={`#a8a8b2`} />
              <Component254 x={`46`} y={`50`} width={`30`} height={`2`} rx={`1`} fill={`#a8a8b2`} />
              <Component255 x={`46`} y={`62`} width={`40`} height={`20`} rx={`3`} fill={`#cfd9ee`} />
              <Component256 x={`110`} y={`6`} width={`60`} height={`108`} rx={`10`} fill={`#15151a`} />
              <Component257 x={`114`} y={`14`} width={`52`} height={`92`} rx={`6`} fill={`#f4d9c5`} />
              <Component258
                x={`140`}
                y={`44`}
                textAnchor={`middle`}
                fontFamily={`Poppins, Zen Kaku Gothic New, sans-serif`}
                fontStyle={`italic`}
                fontSize={`9`}
                fill={`#15151a`}
              >{`Design &`}</Component258>
              <Component259
                x={`140`}
                y={`56`}
                textAnchor={`middle`}
                fontFamily={`Poppins, Zen Kaku Gothic New, sans-serif`}
                fontStyle={`italic`}
                fontSize={`9`}
                fill={`#15151a`}
              >{`Capture`}</Component259>
              <Component260 x={`120`} y={`74`} width={`40`} height={`20`} rx={`3`} fill={`#fff`} />
            </Component261>
          </Component262>
          <Component271 className={`work__body`}>
            <Component263 className={`work__cat`}>{`Web design / Portfolio`}</Component263>
            <Component265 className={`work__title`}>
              {`MIA — `}
              <Component264>{`portfolio`}</Component264>
            </Component265>
            <Component267 className={`work__desc`}>
              {`Editorial portfolio for a creative artist. Bilingual, slow, deliberate.`}
              <Component266
                className={`ja`}
              >{`クリエイターのための、ゆっくり読める二言語ポートフォリオ。`}</Component266>
            </Component267>
            <Component270 className={`work__meta`}>
              <Component268>{`2026`}</Component268>
              <Component269>{`↗ View case`}</Component269>
            </Component270>
          </Component271>
        </Component272>
        <Component291 className={`work`}>
          <Component281 className={`work__media m3`}>
            <Component273 className={`badge`}>{`3D · 2025`}</Component273>
            <Component280 viewBox={`0 0 200 120`} xmlns={`http://www.w3.org/2000/svg`}>
              <Component278 transform={`translate(100 60)`}>
                <Component274
                  points={`0,-32 28,-16 28,16 0,32 -28,16 -28,-16`}
                  fill={`none`}
                  stroke={`#fff`}
                  strokeWidth={`1`}
                />
                <Component275 points={`0,-32 28,-16 0,0 -28,-16`} fill={`rgba(255,255,255,.18)`} />
                <Component276 points={`-28,-16 0,0 0,32 -28,16`} fill={`rgba(255,255,255,.06)`} />
                <Component277
                  x1={`0`}
                  y1={`0`}
                  x2={`0`}
                  y2={`32`}
                  stroke={`#fff`}
                  strokeWidth={`.5`}
                  opacity={`.5`}
                />
              </Component278>
              <Component279
                x={`100`}
                y={`108`}
                textAnchor={`middle`}
                fontFamily={`JetBrains Mono`}
                fontSize={`6`}
                fill={`#a8a8b2`}
                letterSpacing={`2`}
              >{`BLENDER · THREE.JS`}</Component279>
            </Component280>
          </Component281>
          <Component290 className={`work__body`}>
            <Component282 className={`work__cat`}>{`3D / Web`}</Component282>
            <Component284 className={`work__title`}>
              {`Blender 3D `}
              <Component283>{`House`}</Component283>
            </Component284>
            <Component286 className={`work__desc`}>
              {`A small architectural tour built in Blender, served via Three.js — drag to look around.`}
              <Component285
                className={`ja`}
              >{`Blender + Three.jsでつくった、ドラッグで見渡せる小さな建築ツアー。`}</Component285>
            </Component286>
            <Component289 className={`work__meta`}>
              <Component287>{`2025`}</Component287>
              <Component288>{`↗ View case`}</Component288>
            </Component289>
          </Component290>
        </Component291>
        <Component311 className={`work`}>
          <Component301 className={`work__media m4`}>
            <Component292 className={`badge`}>{`Photo · 2025`}</Component292>
            <Component300 viewBox={`0 0 200 120`} xmlns={`http://www.w3.org/2000/svg`}>
              <Component293 x={`16`} y={`20`} width={`80`} height={`80`} fill={`rgba(255,255,255,.6)`} />
              <Component294 x={`20`} y={`24`} width={`72`} height={`72`} fill={`#15151a`} opacity={`.15`} />
              <Component295 cx={`56`} cy={`60`} r={`22`} fill={`rgba(255,255,255,.6)`} />
              <Component296 cx={`56`} cy={`60`} r={`14`} fill={`#15151a`} opacity={`.55`} />
              <Component297 x={`104`} y={`20`} width={`80`} height={`38`} fill={`rgba(255,255,255,.5)`} />
              <Component298 x={`104`} y={`62`} width={`80`} height={`38`} fill={`rgba(255,255,255,.4)`} />
              <Component299
                x={`148`}
                y={`84`}
                textAnchor={`middle`}
                fontFamily={`Poppins, Zen Kaku Gothic New, sans-serif`}
                fontStyle={`italic`}
                fontSize={`13`}
                fill={`#15151a`}
              >{`stills.`}</Component299>
            </Component300>
          </Component301>
          <Component310 className={`work__body`}>
            <Component302 className={`work__cat`}>{`Photography / Editorial`}</Component302>
            <Component304 className={`work__title`}>
              {`Quiet `}
              <Component303>{`stills`}</Component303>
            </Component304>
            <Component306 className={`work__desc`}>
              {`A series of editorial product stills for a small Shimane brand.`}
              <Component305
                className={`ja`}
              >{`島根の小さなブランドのためのスチル写真シリーズ。`}</Component305>
            </Component306>
            <Component309 className={`work__meta`}>
              <Component307>{`2025`}</Component307>
              <Component308>{`↗ View case`}</Component308>
            </Component309>
          </Component310>
        </Component311>
      </Component312>
    </Component313>
  );
}
var ve = [
  {
    num: `— Step 01 / Consultation`,
    title: `Talk it through`,
    titleEm: ` through`,
    titleJa: `内容の確認と相談`,
    body: `Brief, references, deadline, budget. Audio call or text — whichever you prefer. We agree on what we are not making.`,
    tags: [`Brief`, `Scope`, `Budget`],
  },
  {
    num: `— Step 02 / Prototype`,
    title: `Make a`,
    titleEm: `rough cut`,
    titleJa: `プロトタイプ・撮影準備`,
    body: `Wireframes for web, look-tests for photo, treatment for video. Ugly on purpose, fast on purpose.`,
    tags: [`Wireframe`, `Treatment`, `Mood`],
  },
  {
    num: `— Step 03 / Production`,
    title: `Make the`,
    titleEm: `real thing`,
    titleJa: `制作・撮影の実施`,
    body: `Build, shoot, cut. You see weekly progress and can call any decision back without drama.`,
    tags: [`Build`, `Shoot`, `Edit`],
  },
  {
    num: `— Step 04 / Delivery`,
    title: `Hand it`,
    titleEm: `over`,
    titleJa: `完成・納品`,
    body: `Final files, source files, a short loom on how to maintain it. One round of touch-ups included.`,
    tags: [`Launch`, `Handover`],
  },
];
function ye() {
  const Component314 = `span`;
  const Component315 = `div`;
  const Component316 = `br`;
  const Component317 = `em`;
  const Component318 = `h2`;
  const Component319 = `span`;
  const Component320 = `p`;
  const Component321 = `span`;
  const Component322 = `em`;
  const Component323 = `span`;
  const Component324 = `span`;
  const Component325 = `p`;
  const Component326 = `span`;
  const Component327 = `div`;
  const Component328 = `div`;
  const Component329 = `div`;
  const Component330 = `div`;
  return (
    <Component330 className={`win-main`}>
      <Component315 className={`section-tag`}>
        {`[process] Process `}
        <Component314 className={`ja`}>{`仕事の流れ`}</Component314>
      </Component315>
      <Component318 className={`section-h`}>
        {`Four steps,`}
        <Component316 />
        <Component317>{`nothing fancy`}</Component317>
        {`.`}
      </Component318>
      <Component320
        className={`section-sub`}
        style={{
          marginTop: 6,
        }}
      >
        {`From first message to delivered file. Honest about what each phase costs you in time.`}
        <Component319
          className={`ja`}
        >{`初回相談から納品まで、4つのステップで丁寧に進めます。`}</Component319>
      </Component320>
      <Component329 className={`steps`}>
        {ve.map((e, t) => (
          <Component328 className={`step`} key={t}>
            <Component321 className={`step__num`}>{e.num}</Component321>
            <Component324 className={`step__title`}>
              {e.title}
              {` `}
              <Component322>{e.titleEm}</Component322>
              <Component323 className={`ja`}>{e.titleJa}</Component323>
            </Component324>
            <Component325 className={`step__body`}>{e.body}</Component325>
            <Component327 className={`step__tags`}>
              {e.tags.map((e) => (
                <Component326 className={`tag`} key={e}>
                  {e}
                </Component326>
              ))}
            </Component327>
          </Component328>
        ))}
      </Component329>
    </Component330>
  );
}
var be = [
  {
    ico: `St`,
    cls: `s1`,
    name: `Studio (Webflow / Framer / custom)`,
    meta: `— Web`,
    cat: `Web design`,
    level: 90,
    years: `5y`,
  },
  {
    ico: `Ai`,
    cls: `s2`,
    name: `Adobe Illustrator`,
    meta: `— Vector`,
    cat: `Graphic design`,
    level: 75,
    years: `7y`,
  },
  {
    ico: `Ps`,
    cls: `s3`,
    name: `Adobe Photoshop`,
    meta: `— Raster`,
    cat: `Photography`,
    level: 85,
    years: `8y`,
  },
  {
    ico: `{}`,
    cls: `s4`,
    name: `HTML & CSS`,
    meta: `— Markup`,
    cat: `Web coding`,
    level: 80,
    years: `6y`,
  },
  {
    ico: `JS`,
    cls: `s5`,
    name: `JavaScript & CSS animation`,
    meta: `— Web`,
    cat: `Web coding`,
    level: 65,
    years: `4y`,
  },
  {
    ico: `Fg`,
    cls: `s6`,
    name: `Figma`,
    meta: `— Design`,
    cat: `UI / UX design`,
    level: 88,
    years: `5y`,
  },
];
function xe() {
  const Component331 = `span`;
  const Component332 = `div`;
  const Component333 = `br`;
  const Component334 = `em`;
  const Component335 = `h2`;
  const Component336 = `span`;
  const Component337 = `span`;
  const Component338 = `span`;
  const Component339 = `span`;
  const Component340 = `span`;
  const Component341 = `div`;
  const Component342 = `span`;
  const Component343 = `span`;
  const Component344 = `div`;
  const Component345 = `span`;
  const Component346 = `i`;
  const Component347 = `span`;
  const Component348 = `span`;
  const Component349 = `div`;
  const Component350 = `div`;
  const Component351 = `div`;
  return (
    <Component351 className={`win-main`}>
      <Component332 className={`section-tag`}>
        {`[skills] What I can do `}
        <Component331 className={`ja`}>{`できること`}</Component331>
      </Component332>
      <Component335 className={`section-h`}>
        {`A short list,`}
        <Component333 />
        <Component334>{`honestly weighted`}</Component334>
        {`.`}
      </Component335>
      <Component350
        style={{
          marginTop: 24,
        }}
      >
        <Component341 className={`skill-row head`}>
          <Component336 />
          <Component337>{`Tool`}</Component337>
          <Component338>{`Category`}</Component338>
          <Component339>{`Level`}</Component339>
          <Component340
            style={{
              textAlign: `right`,
            }}
          >{`Years`}</Component340>
        </Component341>
        {be.map((e) => (
          <Component349 className={`skill-row`} key={e.name}>
            <Component342 className={`skill-icon ${e.cls}`}>{e.ico}</Component342>
            <Component344 className={`skill-name`}>
              {e.name}
              <Component343 className={`meta`}>{e.meta}</Component343>
            </Component344>
            <Component345 className={`skill-cat`}>{e.cat}</Component345>
            <Component347 className={`skill-bar`}>
              <Component346
                style={{
                  width: `${e.level}%`,
                }}
              />
            </Component347>
            <Component348 className={`skill-yrs`}>{e.years}</Component348>
          </Component349>
        ))}
      </Component350>
    </Component351>
  );
}
function Se() {
  const Component352 = `span`;
  const Component353 = `div`;
  const Component354 = `br`;
  const Component355 = `em`;
  const Component356 = `h2`;
  const Component357 = `span`;
  const Component358 = `p`;
  const Component359 = `div`;
  const Component360 = `em`;
  const Component361 = `h3`;
  const Component362 = `span`;
  const Component363 = `span`;
  const Component364 = `span`;
  const Component365 = `div`;
  const Component366 = `span`;
  const Component367 = `span`;
  const Component368 = `span`;
  const Component369 = `div`;
  const Component370 = `span`;
  const Component371 = `span`;
  const Component372 = `span`;
  const Component373 = `div`;
  const Component374 = `div`;
  const Component375 = `div`;
  const Component376 = `div`;
  const Component377 = `em`;
  const Component378 = `h3`;
  const Component379 = `span`;
  const Component380 = `span`;
  const Component381 = `span`;
  const Component382 = `div`;
  const Component383 = `span`;
  const Component384 = `span`;
  const Component385 = `span`;
  const Component386 = `div`;
  const Component387 = `span`;
  const Component388 = `span`;
  const Component389 = `span`;
  const Component390 = `div`;
  const Component391 = `div`;
  const Component392 = `div`;
  const Component393 = `div`;
  const Component394 = `span`;
  const Component395 = `p`;
  const Component396 = `div`;
  return (
    <Component396 className={`win-main`}>
      <Component353 className={`section-tag`}>
        {`[price] Pricing `}
        <Component352 className={`ja`}>{`料金`}</Component352>
      </Component353>
      <Component356 className={`section-h`}>
        {`Two boxes.`}
        <Component354 />
        <Component355>{`Inquire`}</Component355>
        {` for the rest.`}
      </Component356>
      <Component358
        className={`section-sub`}
        style={{
          marginTop: 6,
        }}
      >
        {`Starting points only. Final estimates depend on scope, schedule, and rights.`}
        <Component357
          className={`ja`}
        >{`目安料金です。最終見積は規模・期間・権利範囲によって調整します。`}</Component357>
      </Component358>
      <Component393 className={`price-cards`}>
        <Component375 className={`pcard`}>
          <Component359 className={`pcard__cat`}>{`01 / Web`}</Component359>
          <Component361 className={`pcard__title`}>
            {`Website `}
            <Component360>{`build`}</Component360>
          </Component361>
          <Component374>
            <Component365 className={`prow`}>
              <Component363 className={`prow__label`}>
                {`Top page`}
                <Component362 className={`ja`}>{`トップページ`}</Component362>
              </Component363>
              <Component364 className={`prow__price`}>{`¥30,000~`}</Component364>
            </Component365>
            <Component369 className={`prow`}>
              <Component367 className={`prow__label`}>
                {`Sub page`}
                <Component366 className={`ja`}>{`下層ページ`}</Component366>
              </Component367>
              <Component368 className={`prow__price`}>{`¥5,000~`}</Component368>
            </Component369>
            <Component373 className={`prow`}>
              <Component371 className={`prow__label`}>
                {`Updates / fixes`}
                <Component370 className={`ja`}>{`修正・更新`}</Component370>
              </Component371>
              <Component372 className={`prow__price`}>{`¥500~/day`}</Component372>
            </Component373>
          </Component374>
        </Component375>
        <Component392 className={`pcard`}>
          <Component376 className={`pcard__cat`}>{`02 / Photo & Video`}</Component376>
          <Component378 className={`pcard__title`}>
            {`Capture `}
            <Component377>{`work`}</Component377>
          </Component378>
          <Component391>
            <Component382 className={`prow`}>
              <Component380 className={`prow__label`}>
                {`Photography`}
                <Component379 className={`ja`}>{`写真撮影`}</Component379>
              </Component380>
              <Component381 className={`prow__price`}>{`¥30,000~`}</Component381>
            </Component382>
            <Component386 className={`prow`}>
              <Component384 className={`prow__label`}>
                {`Videography`}
                <Component383 className={`ja`}>{`映像制作`}</Component383>
              </Component384>
              <Component385 className={`prow__price`}>{`¥100,000~`}</Component385>
            </Component386>
            <Component390 className={`prow`}>
              <Component388 className={`prow__label`}>
                {`Web video / cuts`}
                <Component387 className={`ja`}>{`Web素材編集`}</Component387>
              </Component388>
              <Component389 className={`prow__price`}>{`¥30,000~`}</Component389>
            </Component390>
          </Component391>
        </Component392>
      </Component393>
      <Component395
        className={`section-sub`}
        style={{
          marginTop: 24,
          fontSize: 11,
        }}
      >
        {`[note] Final estimates depend on schedule, location and usage rights. Travel beyond the San'in region is billed separately.`}
        <Component394
          className={`ja`}
        >{`スケジュール・撮影地・使用範囲によって最終見積を調整します。山陰外への移動費は別途。`}</Component394>
      </Component395>
    </Component396>
  );
}
var Ce = [
  {
    label: `Q.01`,
    q: `Where can we meet?`,
    a: `Mostly online — Zoom, Google Meet, or asynchronous Loom. In-person meetings are possible inside Shimane and Tottori; travel cost applies elsewhere.`,
    ja: `基本はオンラインです。山陰エリアであれば対面でも対応します。`,
  },
  {
    label: `Q.02`,
    q: `Will you keep maintaining the site after launch?`,
    a: `Yes — month-to-month maintenance plans are available, or pay-per-update if you prefer.`,
    ja: `月額の保守、または都度依頼のいずれにも対応します。`,
  },
  {
    label: `Q.03`,
    q: `Can the site be edited by non-coders?`,
    a: `For most projects, yes. CMS handover and a short usage video are part of delivery.`,
    ja: `ほとんどの案件でCMSを設定し、使い方の短い動画を一緒にお渡ししています。`,
  },
  {
    label: `Q.04`,
    q: `Photo & video usage rights?`,
    a: `Default delivery is for owned media (your site, social, in-store). Paid media and re-licensing are quoted separately.`,
    ja: `自社利用は基本料金内、広告転用や二次利用は別途お見積です。`,
  },
  {
    label: `Q.05`,
    q: `How fast can you start?`,
    a: `Usually 1–2 weeks from contract. Rush starts are possible with a clearly scoped brief.`,
    ja: `契約から1〜2週間が目安です。要件が明確であれば即着手も可能です。`,
  },
  {
    label: `Q.06`,
    q: `Languages?`,
    a: `Japanese natively, and a working level of English for documentation and emails.`,
    ja: `日本語ネイティブ、英語はドキュメントとメールに対応可能です。`,
  },
];
function we() {
  let [e, t] = (0, b.useState)(0);
  const Component397 = `span`;
  const Component398 = `div`;
  const Component399 = `em`;
  const Component400 = `h2`;
  const Component401 = `span`;
  const Component402 = `span`;
  const Component403 = `span`;
  const Component404 = `button`;
  const Component405 = `span`;
  const Component406 = `div`;
  const Component407 = `div`;
  const Component408 = `div`;
  const Component409 = `div`;
  const Component410 = `div`;
  return (
    <Component410 className={`win-main`}>
      <Component398 className={`section-tag`}>
        {`[faq] Frequently asked `}
        <Component397 className={`ja`}>{`よくある質問`}</Component397>
      </Component398>
      <Component400 className={`section-h`}>
        {`Six common `}
        <Component399>{`questions`}</Component399>
        {`.`}
      </Component400>
      <Component409 className={`faqs`}>
        {Ce.map((n, r) => (
          <Component408 className={`faq ${e === r ? `is-open` : ``}`} key={n.label}>
            <Component404 className={`faq__q`} onClick={() => t(e === r ? -1 : r)}>
              <Component402>
                <Component401 className={`label`}>{n.label}</Component401>
                {n.q}
              </Component402>
              <Component403 className={`plus`}>{`+`}</Component403>
            </Component404>
            <Component407 className={`faq__a`}>
              <Component406 className={`inner`}>
                {n.a}
                <Component405 className={`ja`}>{n.ja}</Component405>
              </Component406>
            </Component407>
          </Component408>
        ))}
      </Component409>
    </Component410>
  );
}
function Te() {
  let [e, t] = (0, b.useState)(false);
  let [n, r] = (0, b.useState)({
    name: ``,
    email: ``,
    message: ``,
  });
  const Component411 = `span`;
  const Component412 = `div`;
  const Component413 = `em`;
  const Component414 = `h2`;
  const Component415 = `span`;
  const Component416 = `p`;
  const Component417 = `dt`;
  const Component418 = `dd`;
  const Component419 = `div`;
  const Component420 = `dt`;
  const Component421 = `dd`;
  const Component422 = `div`;
  const Component423 = `dt`;
  const Component424 = `dd`;
  const Component425 = `div`;
  const Component426 = `dt`;
  const Component427 = `dd`;
  const Component428 = `div`;
  const Component429 = `dl`;
  const Component430 = `div`;
  const Component431 = `span`;
  const Component432 = `label`;
  const Component433 = `input`;
  const Component434 = `div`;
  const Component435 = `span`;
  const Component436 = `label`;
  const Component437 = `input`;
  const Component438 = `div`;
  const Component439 = `span`;
  const Component440 = `label`;
  const Component441 = `textarea`;
  const Component442 = `div`;
  const Component443 = `span`;
  const Component444 = `span`;
  const Component445 = `button`;
  const Component446 = `form`;
  const Component447 = `div`;
  const Component448 = `div`;
  return (
    <Component448 className={`win-main`}>
      <Component412 className={`section-tag`}>
        {`[contact] Get in touch `}
        <Component411 className={`ja`}>{`お問い合わせ`}</Component411>
      </Component412>
      <Component414 className={`section-h`}>
        {`Tell me your `}
        <Component413>{`brief`}</Component413>
        {`.`}
      </Component414>
      <Component416
        className={`section-sub`}
        style={{
          marginTop: 6,
        }}
      >
        {`Filling all fields makes the first reply faster, but only the message is required.`}
        <Component415
          className={`ja`}
        >{`全項目埋めていただくと初回返信が早くなります。本文のみでも構いません。`}</Component415>
      </Component416>
      <Component447 className={`contact-grid`}>
        <Component430 className={`contact-info`}>
          <Component429>
            <Component419 className={`row`}>
              <Component417>{`Email`}</Component417>
              <Component418>{`hello@studio-mia.jp`}</Component418>
            </Component419>
            <Component422 className={`row`}>
              <Component420>{`Studio`}</Component420>
              <Component421>{`Matsue, Shimane, JP`}</Component421>
            </Component422>
            <Component425 className={`row`}>
              <Component423>{`Hours`}</Component423>
              <Component424>{`10:00 — 19:00 / JST`}</Component424>
            </Component425>
            <Component428
              className={`row`}
              style={{
                border: 0,
              }}
            >
              <Component426>{`Social`}</Component426>
              <Component427
                style={{
                  fontSize: 14,
                }}
              >{`Instagram · X · Note`}</Component427>
            </Component428>
          </Component429>
        </Component430>
        <Component446
          className={`contact-form`}
          onSubmit={(e) => {
            e.preventDefault();
            t(true);
          }}
        >
          <Component434 className={`field`}>
            <Component432>
              {`Name `}
              <Component431
                style={{
                  color: `var(--t-4)`,
                  fontFamily: `var(--font-jp)`,
                }}
              >{`/ お名前`}</Component431>
            </Component432>
            <Component433
              type={`text`}
              placeholder={`山田 太郎`}
              value={n.name}
              onChange={(e) =>
                r({
                  ...n,
                  name: e.target.value,
                })
              }
            />
          </Component434>
          <Component438 className={`field`}>
            <Component436>
              {`Email `}
              <Component435
                style={{
                  color: `var(--t-4)`,
                  fontFamily: `var(--font-jp)`,
                }}
              >{`/ メール`}</Component435>
            </Component436>
            <Component437
              type={`email`}
              placeholder={`you@example.com`}
              value={n.email}
              onChange={(e) =>
                r({
                  ...n,
                  email: e.target.value,
                })
              }
            />
          </Component438>
          <Component442 className={`field`}>
            <Component440>
              {`Brief `}
              <Component439
                style={{
                  color: `var(--t-4)`,
                  fontFamily: `var(--font-jp)`,
                }}
              >{`/ ご相談内容`}</Component439>
            </Component440>
            <Component441
              placeholder={`A short description of what you're trying to make…`}
              value={n.message}
              onChange={(e) =>
                r({
                  ...n,
                  message: e.target.value,
                })
              }
            />
          </Component442>
          <Component445 type={`submit`} className={`btn`}>
            {e ? (
              <x.Fragment>
                {`Sent. Thank you. `}
                <Component443 className={`ja`}>{`ありがとうございます`}</Component443>
              </x.Fragment>
            ) : (
              <x.Fragment>
                {`Send `}
                <Component444 className={`ja`}>{`送信`}</Component444>
              </x.Fragment>
            )}
          </Component445>
        </Component446>
      </Component447>
    </Component448>
  );
}
const Component449 = `path`;
const Component450 = `circle`;
const Component451 = `path`;
const Component452 = `rect`;
const Component453 = `circle`;
const Component454 = `path`;
const Component455 = `circle`;
const Component456 = `path`;
const Component457 = `path`;
const Component458 = `path`;
const Component459 = `path`;
const Component460 = `rect`;
const Component461 = `path`;
var Ee = [
  {
    key: `welcome`,
    label: `Welcome`,
    ico: <Component449 d={`M8 1.5 14 5v6L8 14.5 2 11V5l6-3.5Z`} />,
    fill: true,
  },
  {
    key: `about`,
    label: `About`,
    ico: (
      <x.Fragment>
        <Component450 cx={`8`} cy={`6`} r={`2.4`} />
        <Component451 d={`M3 14c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5`} />
      </x.Fragment>
    ),
    stroke: true,
  },
  {
    key: `works`,
    label: `Works`,
    ico: (
      <x.Fragment>
        <Component452 x={`2`} y={`3`} width={`12`} height={`10`} rx={`1`} />
        <Component453 cx={`6`} cy={`7`} r={`1`} fill={`currentColor`} />
        <Component454 d={`m2 11 4-3 3 2 3-4 2 2`} />
      </x.Fragment>
    ),
    stroke: true,
  },
  {
    key: `process`,
    label: `Process`,
    ico: (
      <x.Fragment>
        <Component455 cx={`8`} cy={`8`} r={`2`} />
        <Component456 d={`M8 1v2M8 13v2M1 8h2M13 8h2`} />
      </x.Fragment>
    ),
    stroke: true,
  },
  {
    key: `skills`,
    label: `Skills`,
    ico: <Component457 d={`M2 14V5M7 14V2M12 14v-7M14 14H1`} />,
    stroke: true,
  },
  {
    key: `price`,
    label: `Price`,
    ico: <Component458 d={`M3 4h10M3 8h10M3 12h10`} />,
    stroke: true,
  },
  {
    key: `faq`,
    label: `FAQ`,
    ico: <Component459 d={`M5 5a3 3 0 1 1 4 2.8M8 13h.01`} />,
    stroke: true,
  },
  {
    key: `contact`,
    label: `Mail`,
    ico: (
      <x.Fragment>
        <Component460 x={`2`} y={`3`} width={`12`} height={`10`} rx={`1`} />
        <Component461 d={`m2 5 6 4 6-4`} />
      </x.Fragment>
    ),
    stroke: true,
  },
];
function De() {
  const Component462 = `span`;
  const Component463 = `div`;
  const Component464 = `br`;
  const Component465 = `em`;
  const Component466 = `h2`;
  const Component467 = `span`;
  const Component468 = `p`;
  const Component469 = `div`;
  const Component470 = `div`;
  const Component471 = `span`;
  const Component472 = `div`;
  const Component473 = `div`;
  const Component474 = `div`;
  const Component475 = `sup`;
  const Component476 = `div`;
  const Component477 = `span`;
  const Component478 = `div`;
  const Component479 = `div`;
  const Component480 = `div`;
  const Component481 = `div`;
  const Component482 = `span`;
  const Component483 = `div`;
  const Component484 = `div`;
  const Component485 = `div`;
  const Component486 = `div`;
  const Component487 = `span`;
  const Component488 = `div`;
  const Component489 = `div`;
  const Component490 = `div`;
  const Component491 = `div`;
  const Component492 = `span`;
  const Component493 = `div`;
  const Component494 = `strong`;
  const Component495 = `span`;
  const Component496 = `p`;
  const Component497 = `div`;
  return (
    <Component497 className={`win-main`}>
      <Component463 className={`section-tag`}>
        {`[hello] Welcome `}
        <Component462 className={`ja`}>{`ようこそ`}</Component462>
      </Component463>
      <Component466 className={`section-h`}>
        {`A small studio`}
        <Component464 />
        {`with a `}
        <Component465>{`big story`}</Component465>
        {`.`}
      </Component466>
      <Component468 className={`section-sub`}>
        {`MIA OS is a portfolio operating system — a creative artist's desk, opened up. Web design, photography and short cinematic films are produced under one roof in Shimane, Japan.`}
        <Component467
          className={`ja`}
        >{`MIA OS は、Webデザイン・写真・映像をひとつの机の上で扱うクリエイターのポートフォリオです。`}</Component467>
      </Component468>
      <Component490 className={`kv-grid`}>
        <Component473 className={`kv`}>
          <Component469 className={`kv__label`}>{`Founded`}</Component469>
          <Component470 className={`kv__value`}>{`2025`}</Component470>
          <Component472 className={`kv__cap`}>
            {`design year zero`}
            <Component471 className={`ja`}>{`創業`}</Component471>
          </Component472>
        </Component473>
        <Component479 className={`kv`}>
          <Component474 className={`kv__label`}>{`Tools`}</Component474>
          <Component476 className={`kv__value`}>
            {`15`}
            <Component475>{`+`}</Component475>
          </Component476>
          <Component478 className={`kv__cap`}>
            {`apps in rotation`}
            <Component477 className={`ja`}>{`使用ツール`}</Component477>
          </Component478>
        </Component479>
        <Component484 className={`kv`}>
          <Component480 className={`kv__label`}>{`Fields`}</Component480>
          <Component481 className={`kv__value`}>{`03`}</Component481>
          <Component483 className={`kv__cap`}>
            {`web · photo · video`}
            <Component482 className={`ja`}>{`専門分野`}</Component482>
          </Component483>
        </Component484>
        <Component489 className={`kv`}>
          <Component485 className={`kv__label`}>{`Projects`}</Component485>
          <Component486 className={`kv__value`}>{`∞`}</Component486>
          <Component488 className={`kv__cap`}>
            {`accepting now`}
            <Component487 className={`ja`}>{`受付中`}</Component487>
          </Component488>
        </Component489>
      </Component490>
      <Component491 className={`divider`} />
      <Component493 className={`section-tag`}>
        {`[howto] How to use `}
        <Component492 className={`ja`}>{`使い方`}</Component492>
      </Component493>
      <Component496
        className={`section-sub`}
        style={{
          marginTop: 8,
        }}
      >
        {`Click any icon on the Dock to open its window. Drag windows by their title bars. Press `}
        <Component494>{`⌘K`}</Component494>
        {` to search. Click the menu bar item on the right for the Notification Center.`}
        <Component495
          className={`ja`}
        >{`下のDockをクリックでウィンドウが開きます。⌘Kで検索、右上のアイコンで通知センターが開きます。`}</Component495>
      </Component496>
    </Component497>
  );
}
var Oe = {
  welcome: De,
  about: ge,
  works: _e,
  process: ye,
  skills: xe,
  price: Se,
  faq: we,
  contact: Te,
};
function ke({ onOpenWindow: e }) {
  let [t, n] = (0, b.useState)(`welcome`);
  let _Component5 = Oe[t];
  const Component498 = `span`;
  const Component499 = `h4`;
  const Component500 = `svg`;
  const Component501 = `span`;
  const Component502 = `button`;
  const Component503 = `span`;
  const Component504 = `h4`;
  const Component505 = `span`;
  const Component506 = `div`;
  const Component507 = `span`;
  const Component508 = `div`;
  const Component509 = `span`;
  const Component510 = `div`;
  const Component511 = `span`;
  const Component512 = `div`;
  const Component513 = `div`;
  return (
    <x.Fragment>
      <Component513 className={`win-side`}>
        <Component499>
          {`Favourites `}
          <Component498
            style={{
              color: `var(--t-4)`,
            }}
          >{`/ お気に入り`}</Component498>
        </Component499>
        {Ee.map((e) => (
          <Component502
            className={`item ${t === e.key ? `is-active` : ``}`}
            style={{
              width: `100%`,
              textAlign: `left`,
            }}
            onClick={() => {
              n(e.key);
            }}
            key={e.key}
          >
            <Component501 className={`ico`}>
              <Component500
                width={`14`}
                height={`14`}
                viewBox={`0 0 16 16`}
                fill={e.fill ? `currentColor` : `none`}
                stroke={e.stroke ? `currentColor` : `none`}
                strokeWidth={`1.4`}
              >
                {e.ico}
              </Component500>
            </Component501>
            {e.label}
          </Component502>
        ))}
        <Component504
          style={{
            marginTop: 18,
          }}
        >
          {`Tags `}
          <Component503
            style={{
              color: `var(--t-4)`,
            }}
          >{`/ タグ`}</Component503>
        </Component504>
        <Component506 className={`item`}>
          <Component505
            className={`ico`}
            style={{
              color: `#ff5f57`,
            }}
          >{`●`}</Component505>
          {`Web Design`}
        </Component506>
        <Component508 className={`item`}>
          <Component507
            className={`ico`}
            style={{
              color: `#3a4dff`,
            }}
          >{`●`}</Component507>
          {`Photo`}
        </Component508>
        <Component510 className={`item`}>
          <Component509
            className={`ico`}
            style={{
              color: `#28c840`,
            }}
          >{`●`}</Component509>
          {`Video`}
        </Component510>
        <Component512 className={`item`}>
          <Component511
            className={`ico`}
            style={{
              color: `#ff9a3c`,
            }}
          >{`●`}</Component511>
          {`Cinematic`}
        </Component512>
      </Component513>
      <_Component5 />
    </x.Fragment>
  );
}
var Ae = {
  welcome: ke,
  about: ge,
  process: ye,
  works: _e,
  skills: xe,
  price: Se,
  faq: we,
  contact: Te,
};
function _Component0({ wnd: e, onClose: t, onFocus: n, onMove: r, onToggleMax: i, onOpenWindow: a }) {
  let o = de[e.key];
  let _Component6 = Ae[e.key];
  let c = (0, b.useRef)({
    active: false,
    sx: 0,
    sy: 0,
    ox: 0,
    oy: 0,
  });
  (0, b.useEffect)(() => {
    let t = (t) => {
      if (!c.current.active) {
        return;
      }
      let n = t.clientX - c.current.sx;
      let i = t.clientY - c.current.sy;
      r(e.key, c.current.ox + n, c.current.oy + i);
    };
    let n = () => {
      c.current.active = false;
      document.body.style.userSelect = ``;
    };
    window.addEventListener(`mousemove`, t);
    window.addEventListener(`mouseup`, n);
    return () => {
      window.removeEventListener(`mousemove`, t);
      window.removeEventListener(`mouseup`, n);
    };
  }, [r, e.key]);
  (0, b.useEffect)(() => {
    let t = (t) => {
      if (!c.current.active) {
        return;
      }
      let n = t.touches[0];
      let i = n.clientX - c.current.sx;
      let a = n.clientY - c.current.sy;
      r(e.key, c.current.ox + i, c.current.oy + a);
    };
    let n = () => {
      c.current.active = false;
    };
    window.addEventListener(`touchmove`, t, {
      passive: true,
    });
    window.addEventListener(`touchend`, n);
    return () => {
      window.removeEventListener(`touchmove`, t);
      window.removeEventListener(`touchend`, n);
    };
  }, [r, e.key]);
  const Component514 = `path`;
  const Component515 = `svg`;
  const Component516 = `button`;
  const Component517 = `path`;
  const Component518 = `svg`;
  const Component519 = `button`;
  const Component520 = `path`;
  const Component521 = `svg`;
  const Component522 = `button`;
  const Component523 = `div`;
  const Component524 = `span`;
  const Component525 = `div`;
  const Component526 = `div`;
  const Component527 = `div`;
  const Component528 = `div`;
  const Component529 = `div`;
  return (
    <Component529
      className={`window ${e.closing ? `is-closing` : ``}`}
      style={{
        left: e.x,
        top: e.y,
        width: e.w,
        height: e.h,
        zIndex: e.z,
      }}
      onMouseDown={() => n(e.key)}
    >
      <Component527
        className={`window__chrome`}
        onMouseDown={(t) => {
          if (!t.target.closest(`.tl`)) {
            c.current = {
              active: true,
              sx: t.clientX,
              sy: t.clientY,
              ox: e.x,
              oy: e.y,
            };
            document.body.style.userSelect = `none`;
            n(e.key);
          }
        }}
        onTouchStart={(t) => {
          if (t.target.closest(`.tl`)) {
            return;
          }
          let r = t.touches[0];
          c.current = {
            active: true,
            sx: r.clientX,
            sy: r.clientY,
            ox: e.x,
            oy: e.y,
          };
          n(e.key);
        }}
      >
        <Component523 className={`tlights`}>
          <Component516
            className={`tl`}
            data-act={`close`}
            aria-label={`Close`}
            onClick={(n) => {
              n.stopPropagation();
              t(e.key);
            }}
          >
            <Component515 viewBox={`0 0 8 8`}>
              <Component514
                d={`m1.4 1.4 5.2 5.2M6.6 1.4 1.4 6.6`}
                stroke={`#7a0e09`}
                strokeWidth={`1.1`}
                strokeLinecap={`round`}
                fill={`none`}
              />
            </Component515>
          </Component516>
          <Component519
            className={`tl`}
            data-act={`min`}
            aria-label={`Minimize`}
            onClick={(n) => {
              n.stopPropagation();
              t(e.key);
            }}
          >
            <Component518 viewBox={`0 0 8 8`}>
              <Component517
                d={`M1.4 4h5.2`}
                stroke={`#9a4a09`}
                strokeWidth={`1.2`}
                strokeLinecap={`round`}
                fill={`none`}
              />
            </Component518>
          </Component519>
          <Component522
            className={`tl`}
            data-act={`max`}
            aria-label={`Maximize`}
            onClick={(t) => {
              t.stopPropagation();
              i(e.key);
            }}
          >
            <Component521 viewBox={`0 0 8 8`}>
              <Component520
                d={`M3 1.5 6.5 5M5 6.5 1.5 3`}
                stroke={`#0a5a25`}
                strokeWidth={`1.2`}
                strokeLinecap={`round`}
                fill={`none`}
              />
            </Component521>
          </Component522>
        </Component523>
        <Component525 className={`window__title`}>
          {o.title}
          <Component524 className={`ja`}>{o.titleJa}</Component524>
        </Component525>
        <Component526 className={`window__chrome-spacer`} />
      </Component527>
      <Component528 className={`window__body`}>
        {_Component6 ? <_Component6 onOpenWindow={a} /> : null}
      </Component528>
    </Component529>
  );
}
function Me(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Ne() {
  let [e, t] = (0, b.useState)([]);
  let n = (0, b.useRef)(100);
  let r = (0, b.useRef)(0);
  let i = (0, b.useCallback)((e) => {
    n.current += 1;
    t((t) =>
      t.map((t) =>
        t.key === e
          ? {
              ...t,
              z: n.current,
            }
          : t,
      ),
    );
  }, []);
  return {
    windows: e,
    openWindow: (0, b.useCallback)((e) => {
      let i = de[e];
      if (i) {
        t((t) => {
          if (t.find((t) => t.key === e)) {
            n.current += 1;
            return t.map((t) =>
              t.key === e
                ? {
                    ...t,
                    z: n.current,
                    closing: false,
                  }
                : t,
            );
          }
          let a = Math.min(i.w, window.innerWidth - 80);
          let o = Math.min(i.h, window.innerHeight - 200);
          let s = r.current * 28;
          r.current = (r.current + 1) % 8;
          let c = Me((window.innerWidth - a) / 2 + s - 80, 20, window.innerWidth - a - 20);
          let l = Me((window.innerHeight - o) / 2 + s - 60, 40, window.innerHeight - o - 110);
          n.current += 1;
          return [
            ...t,
            {
              key: e,
              x: c,
              y: l,
              w: a,
              h: o,
              z: n.current,
              maxed: false,
              prev: null,
              closing: false,
            },
          ];
        });
      }
    }, []),
    closeWindow: (0, b.useCallback)((e) => {
      t((t) =>
        t.map((t) =>
          t.key === e
            ? {
                ...t,
                closing: true,
              }
            : t,
        ),
      );
      setTimeout(() => {
        t((t) => t.filter((t) => t.key !== e));
      }, 240);
    }, []),
    closeAll: (0, b.useCallback)(() => {
      t((e) =>
        e.map((e) => ({
          ...e,
          closing: true,
        })),
      );
      setTimeout(() => t([]), 240);
    }, []),
    focusWindow: i,
    moveWindow: (0, b.useCallback)((e, n, r) => {
      t((t) =>
        t.map((t) =>
          t.key === e
            ? {
                ...t,
                x: Me(n, -t.w + 100, window.innerWidth - 100),
                y: Me(r, 32, window.innerHeight - 80),
              }
            : t,
        ),
      );
    }, []),
    toggleMax: (0, b.useCallback)((e) => {
      t((t) =>
        t.map((t) =>
          t.key === e
            ? t.maxed && t.prev
              ? {
                  ...t,
                  ...t.prev,
                  maxed: false,
                  prev: null,
                }
              : {
                  ...t,
                  prev: {
                    x: t.x,
                    y: t.y,
                    w: t.w,
                    h: t.h,
                  },
                  x: 20,
                  y: 40,
                  w: window.innerWidth - 40,
                  h: window.innerHeight - 130,
                  maxed: true,
                }
            : t,
        ),
      );
    }, []),
  };
}
function Pe() {
  let [e, t] = (0, b.useState)(false);
  let [n, r] = (0, b.useState)(false);
  let [i, a] = (0, b.useState)(false);
  let {
    windows: o,
    openWindow: s,
    closeWindow: c,
    closeAll: l,
    focusWindow: u,
    moveWindow: d,
    toggleMax: f,
  } = Ne();
  (0, b.useEffect)(() => {
    if (!e) {
      return;
    }
    let t = setTimeout(() => s(`welcome`), 50);
    let n = setTimeout(() => a(true), 900);
    let r = setTimeout(() => a(false), 5200);
    return () => {
      clearTimeout(t);
      clearTimeout(n);
      clearTimeout(r);
    };
  }, [e, s]);
  (0, b.useEffect)(() => {
    let e = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === `k`) {
        e.preventDefault();
        r((e) => !e);
        return;
      }
      if (e.key === `Escape`) {
        r(false);
      }
      if (e.metaKey || e.ctrlKey) {
        let t = fe[e.key];
        if (t) {
          e.preventDefault();
          s(t);
        }
      }
    };
    window.addEventListener(`keydown`, e);
    return () => window.removeEventListener(`keydown`, e);
  }, [s]);
  let p = (0, b.useCallback)(() => r(true), []);
  let m = (0, b.useCallback)(() => r(false), []);
  let h = (0, b.useCallback)(() => a((e) => !e), []);
  const Component530 = `div`;
  return (
    <x.Fragment>
      <_Component7 />
      <S />
      {!e && <C onDone={() => t(true)} />}
      <_Component8 onSpotlight={p} onNotificationCenter={h} onCloseAll={l} onOpenWindow={s} />
      <T />
      <_Component9 />
      <E open={i} />
      <Component530 className={`windows`}>
        {o.map((e) => (
          <_Component0
            wnd={e}
            onClose={c}
            onFocus={u}
            onMove={d}
            onToggleMax={f}
            onOpenWindow={s}
            key={e.key}
          />
        ))}
      </Component530>
      <O openWindows={o} onOpen={s} onCloseAll={l} />
      <_Component1 open={n} onClose={m} onOpenWindow={s} />
    </x.Fragment>
  );
}
y.createRoot(document.getElementById(`root`)).render(
  <b.StrictMode>
    <Pe />
  </b.StrictMode>,
);
