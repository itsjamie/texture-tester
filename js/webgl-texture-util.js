/* Copyright (c) 2014, Brandon Jones. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

// Shim to provide workers a usable "window" object.
window = this;

// Shim to make sure Firefox doesn't choke on console-less web workers.
if (typeof (console) == 'undefined') {
  console = {
    log: function () { },
    error: function () { }
  }
}

// Emscripten-ified Crunch decoder in one massive block of Javascript!
function LoadCrunchDecoder() {
  function e(a) { throw a; } var j = void 0, l = !0, m = null, p = !1; function q() { return function () { } } var s; s || (s = eval("(function() { try { return Module || {} } catch(e) { return {} } })()")); var aa = {}, v; for (v in s) s.hasOwnProperty(v) && (aa[v] = s[v]); var w = "object" === typeof process && "function" === typeof require, ba = "object" === typeof window, ca = "function" === typeof importScripts, da = !ba && !w && !ca;
  if (w) { s.print = function (a) { process.stdout.write(a + "\n") }; s.printErr = function (a) { process.stderr.write(a + "\n") }; var ea = require("fs"), fa = require("path"); s.read = function (a, b) { var a = fa.normalize(a), c = ea.readFileSync(a); !c && a != fa.resolve(a) && (a = path.join(__dirname, "..", "src", a), c = ea.readFileSync(a)); c && !b && (c = c.toString()); return c }; s.readBinary = function (a) { return s.read(a, l) }; s.load = function (a) { ga(read(a)) }; s.arguments = process.argv.slice(2); module.exports = s } else da ? (s.print = print, "undefined" != typeof printErr &&
    (s.printErr = printErr), s.read = "undefined" != typeof read ? read : function () { e("no read() available (jsc?)") }, s.readBinary = function (a) { return read(a, "binary") }, "undefined" != typeof scriptArgs ? s.arguments = scriptArgs : "undefined" != typeof arguments && (s.arguments = arguments), this.Module = s) : ba || ca ? (s.read = function (a) { var b = new XMLHttpRequest; b.open("GET", a, p); b.send(m); return b.responseText }, "undefined" != typeof arguments && (s.arguments = arguments), "undefined" !== typeof console ? (s.print = function (a) { console.log(a) },
      s.printErr = function (a) { console.log(a) }) : s.print = q(), ba ? this.Module = s : s.load = importScripts) : e("Unknown runtime environment. Where are we?"); function ga(a) { eval.call(m, a) } "undefined" == !s.load && s.read && (s.load = function (a) { ga(s.read(a)) }); s.print || (s.print = q()); s.printErr || (s.printErr = s.print); s.arguments || (s.arguments = []); s.print = s.print; s.P = s.printErr; s.preRun = []; s.postRun = []; for (v in aa) aa.hasOwnProperty(v) && (s[v] = aa[v]); function ha() { return x } function ia(a) { x = a }
  function ja(a) { switch (a) { case "i1": case "i8": return 1; case "i16": return 2; case "i32": return 4; case "i64": return 8; case "float": return 4; case "double": return 8; default: if ("*" === a[a.length - 1]) return ka; if ("i" === a[0]) return a = parseInt(a.substr(1)), A(0 === a % 8), a / 8 } } function la(a, b, c) { c && c.length ? (c.splice || (c = Array.prototype.slice.call(c)), c.splice(0, 0, b), s["dynCall_" + a].apply(m, c)) : s["dynCall_" + a].call(m, b) } var ma;
  function na() {
    var a = [], b = 0; this.za = function (c) { c &= 255; if (0 == a.length) { if (0 == (c & 128)) return String.fromCharCode(c); a.push(c); b = 192 == (c & 224) ? 1 : 224 == (c & 240) ? 2 : 3; return "" } if (b && (a.push(c), b--, 0 < b)) return ""; var c = a[0], d = a[1], f = a[2], h = a[3]; 2 == a.length ? c = String.fromCharCode((c & 31) << 6 | d & 63) : 3 == a.length ? c = String.fromCharCode((c & 15) << 12 | (d & 63) << 6 | f & 63) : (c = (c & 7) << 18 | (d & 63) << 12 | (f & 63) << 6 | h & 63, c = String.fromCharCode(Math.floor((c - 65536) / 1024) + 55296, (c - 65536) % 1024 + 56320)); a.length = 0; return c }; this.Cb = function (a) {
      for (var a =
        unescape(encodeURIComponent(a)), b = [], f = 0; f < a.length; f++)b.push(a.charCodeAt(f)); return b
    }
  } function oa(a) { var b = x; x = x + a | 0; x = x + 7 & -8; return b } function pa(a) { var b = B; B = B + a | 0; B = B + 7 & -8; return b } function qa(a) { var b = D; D = D + a | 0; D = D + 7 & -8; D >= ra && E("Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value " + ra + ", or (2) set Module.TOTAL_MEMORY before the program runs."); return b } function sa(a, b) { return Math.ceil(a / (b ? b : 8)) * (b ? b : 8) }
  var ka = 4, ta = {}, ua = p, va; function A(a, b) { a || E("Assertion failed: " + b) } s.ccall = function (a, b, c, d) { return wa(xa(a), b, c, d) }; function xa(a) { try { var b = s["_" + a]; b || (b = eval("_" + a)) } catch (c) { } A(b, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)"); return b }
  function wa(a, b, c, d) { function f(a, b) { if ("string" == b) { if (a === m || a === j || 0 === a) return 0; a = H(a); b = "array" } if ("array" == b) { h || (h = ha()); var c = oa(a.length); ya(a, c); return c } return a } var h = 0, g = 0, d = d ? d.map(function (a) { return f(a, c[g++]) }) : []; a = a.apply(m, d); "string" == b ? b = za(a) : (A("array" != b), b = a); h && ia(h); return b } s.cwrap = function (a, b, c) { var d = xa(a); return function () { return wa(d, b, c, Array.prototype.slice.call(arguments)) } };
  function Aa(a, b, c) { c = c || "i8"; "*" === c.charAt(c.length - 1) && (c = "i32"); switch (c) { case "i1": I[a] = b; break; case "i8": I[a] = b; break; case "i16": J[a >> 1] = b; break; case "i32": K[a >> 2] = b; break; case "i64": va = [b >>> 0, (tempDouble = b, 1 <= +Ba(tempDouble) ? 0 < tempDouble ? (Ca(+Da(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Ea((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)]; K[a >> 2] = va[0]; K[a + 4 >> 2] = va[1]; break; case "float": Fa[a >> 2] = b; break; case "double": Ga[a >> 3] = b; break; default: E("invalid type for setValue: " + c) } }
  s.setValue = Aa; s.getValue = function (a, b) { b = b || "i8"; "*" === b.charAt(b.length - 1) && (b = "i32"); switch (b) { case "i1": return I[a]; case "i8": return I[a]; case "i16": return J[a >> 1]; case "i32": return K[a >> 2]; case "i64": return K[a >> 2]; case "float": return Fa[a >> 2]; case "double": return Ga[a >> 3]; default: E("invalid type for setValue: " + b) }return m }; var Ha = 1, Ia = 2, Ja = 4; s.ALLOC_NORMAL = 0; s.ALLOC_STACK = Ha; s.ALLOC_STATIC = Ia; s.ALLOC_DYNAMIC = 3; s.ALLOC_NONE = Ja;
  function L(a, b, c, d) { var f, h; "number" === typeof a ? (f = l, h = a) : (f = p, h = a.length); var g = "string" === typeof b ? b : m, c = c == Ja ? d : [Ka, oa, pa, qa][c === j ? Ia : c](Math.max(h, g ? 1 : b.length)); if (f) { d = c; A(0 == (c & 3)); for (a = c + (h & -4); d < a; d += 4)K[d >> 2] = 0; for (a = c + h; d < a;)I[d++ | 0] = 0; return c } if ("i8" === g) return a.subarray || a.slice ? M.set(a, c) : M.set(new Uint8Array(a), c), c; for (var d = 0, i, r; d < h;) { var t = a[d]; "function" === typeof t && (t = ta.Sd(t)); f = g || b[d]; 0 === f ? d++ : ("i64" == f && (f = "i32"), Aa(c + d, t, f), r !== f && (i = ja(f), r = f), d += i) } return c }
  s.allocate = L; function za(a, b) { for (var c = p, d, f = 0; ;) { d = M[a + f | 0]; if (128 <= d) c = l; else if (0 == d && !b) break; f++; if (b && f == b) break } b || (b = f); var h = ""; if (!c) { for (; 0 < b;)d = String.fromCharCode.apply(String, M.subarray(a, a + Math.min(b, 1024))), h = h ? h + d : d, a += 1024, b -= 1024; return h } c = new na; for (f = 0; f < b; f++)d = M[a + f | 0], h += c.za(d); return h } s.Pointer_stringify = za; s.UTF16ToString = function (a) { for (var b = 0, c = ""; ;) { var d = J[a + 2 * b >> 1]; if (0 == d) return c; ++b; c += String.fromCharCode(d) } };
  s.stringToUTF16 = function (a, b) { for (var c = 0; c < a.length; ++c)J[b + 2 * c >> 1] = a.charCodeAt(c); J[b + 2 * a.length >> 1] = 0 }; s.UTF32ToString = function (a) { for (var b = 0, c = ""; ;) { var d = K[a + 4 * b >> 2]; if (0 == d) return c; ++b; 65536 <= d ? (d -= 65536, c += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023)) : c += String.fromCharCode(d) } }; s.stringToUTF32 = function (a, b) { for (var c = 0, d = 0; d < a.length; ++d) { var f = a.charCodeAt(d); if (55296 <= f && 57343 >= f) var h = a.charCodeAt(++d), f = 65536 + ((f & 1023) << 10) | h & 1023; K[b + 4 * c >> 2] = f; ++c } K[b + 4 * c >> 2] = 0 };
  function La(a) {
    try {
      "number" === typeof a && (a = za(a)); if ("_" !== a[0] || "_" !== a[1] || "Z" !== a[2]) return a; var b = 3, c = { v: "void", b: "bool", c: "char", s: "short", i: "int", l: "long", f: "float", d: "double", w: "wchar_t", a: "signed char", h: "unsigned char", t: "unsigned short", j: "unsigned int", m: "unsigned long", x: "long long", y: "unsigned long long", z: "..." }, d = [], f = function (h, i, r) {
        var i = i || Infinity, t = "", y = [], u; if ("N" !== a[b]) { "K" === a[b] && b++; var n = parseInt(a.substr(b)); if (n) { var F = n.toString().length; u = a.substr(b + F, n); b += F + n } } else {
          b++;
          "K" === a[b] && b++; for (u = []; "E" !== a[b];)if ("S" === a[b]) b++, n = a.indexOf("_", b), u.push(d[a.substring(b, n) || 0] || "?"), b = n + 1; else { n = parseInt(a.substr(b)); F = n.toString().length; if (!n || !F) { b--; break } var G = a.substr(b + F, n); u.push(G); d.push(G); b += F + n } b++; u = u.join("::"); i--; if (0 === i) return h ? [u] : u
        } "I" === a[b] ? (b++, n = f(l), F = f(l, 1, l), t += F[0] + " " + u + "<" + n.join(", ") + ">") : t = u; a: for (; b < a.length && 0 < i--;)if (u = a[b++], u in c) y.push(c[u]); else switch (u) {
          case "P": y.push(f(l, 1, l)[0] + "*"); break; case "R": y.push(f(l, 1, l)[0] + "&");
            break; case "L": b++; n = a.indexOf("E", b) - b; y.push(a.substr(b, n)); b += n + 2; break; case "A": n = parseInt(a.substr(b)); b += n.toString().length; "_" !== a[b] && e("?"); b++; y.push(f(l, 1, l)[0] + " [" + n + "]"); break; case "E": break a; default: t += "?" + u; break a
        }!r && (1 === y.length && "void" === y[0]) && (y = []); return h ? y : t + ("(" + y.join(", ") + ")")
      }; return f()
    } catch (h) { return a }
  } function Ma() { var a = Error().stack; return a ? a.replace(/__Z[\w\d_]+/g, function (a) { var c = La(a); return a === c ? a : a + " [" + c + "]" }) : "(no stack trace available)" }
  var I, M, J, Na, K, Oa, Fa, Ga, Qa = 0, B = 0, Ra = 0, x = 0, Sa = 0, Ta = 0, D = 0, ra = s.TOTAL_MEMORY || 16777216; A("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "Cannot fallback to non-typed array case: Code is too specialized"); var N = new ArrayBuffer(ra); I = new Int8Array(N); J = new Int16Array(N); K = new Int32Array(N); M = new Uint8Array(N); Na = new Uint16Array(N); Oa = new Uint32Array(N); Fa = new Float32Array(N); Ga = new Float64Array(N); K[0] = 255;
  A(255 === M[0] && 0 === M[3], "Typed arrays 2 must be run on a little-endian system"); s.HEAP = j; s.HEAP8 = I; s.HEAP16 = J; s.HEAP32 = K; s.HEAPU8 = M; s.HEAPU16 = Na; s.HEAPU32 = Oa; s.HEAPF32 = Fa; s.HEAPF64 = Ga; function Ua(a) { for (; 0 < a.length;) { var b = a.shift(); if ("function" == typeof b) b(); else { var c = b.M; "number" === typeof c ? b.ta === j ? la("v", c) : la("vi", c, [b.ta]) : c(b.ta === j ? m : b.ta) } } } var Va = [], O = [], Wa = [], Xa = [], Ya = [], Za = p; function $a(a) { Va.unshift(a) } s.addOnPreRun = s.Id = $a; s.addOnInit = s.Fd = function (a) { O.unshift(a) };
  s.addOnPreMain = s.Hd = function (a) { Wa.unshift(a) }; s.addOnExit = s.Ed = function (a) { Xa.unshift(a) }; function ab(a) { Ya.unshift(a) } s.addOnPostRun = s.Gd = ab; function H(a, b, c) { a = (new na).Cb(a); c && (a.length = c); b || a.push(0); return a } s.intArrayFromString = H; s.intArrayToString = function (a) { for (var b = [], c = 0; c < a.length; c++) { var d = a[c]; 255 < d && (d &= 255); b.push(String.fromCharCode(d)) } return b.join("") }; s.writeStringToMemory = function (a, b, c) { a = H(a, c); for (c = 0; c < a.length;)I[b + c | 0] = a[c], c += 1 };
  function ya(a, b) { for (var c = 0; c < a.length; c++)I[b + c | 0] = a[c] } s.writeArrayToMemory = ya; s.writeAsciiToMemory = function (a, b, c) { for (var d = 0; d < a.length; d++)I[b + d | 0] = a.charCodeAt(d); c || (I[b + a.length | 0] = 0) }; function bb(a, b) { return 0 <= a ? a : 32 >= b ? 2 * Math.abs(1 << b - 1) + a : Math.pow(2, b) + a } function cb(a, b) { if (0 >= a) return a; var c = 32 >= b ? Math.abs(1 << b - 1) : Math.pow(2, b - 1); if (a >= c && (32 >= b || a > c)) a = -2 * c + a; return a } Math.imul || (Math.imul = function (a, b) { var c = a & 65535, d = b & 65535; return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16) | 0 }); Math.Vd = Math.imul;
  var Ba = Math.abs, Ea = Math.ceil, Da = Math.floor, Ca = Math.min, Q = 0, db = {}, eb = m, fb = m; function gb(a) { Q++; s.monitorRunDependencies && s.monitorRunDependencies(Q); a ? (A(!db[a]), db[a] = 1) : s.P("warning: run dependency added without ID") } s.addRunDependency = gb; function hb(a) { Q--; s.monitorRunDependencies && s.monitorRunDependencies(Q); a ? (A(db[a]), delete db[a]) : s.P("warning: run dependency removed without ID"); 0 == Q && (eb !== m && (clearInterval(eb), eb = m), fb && (a = fb, fb = m, a())) } s.removeRunDependency = hb; s.preloadedImages = {};
  s.preloadedAudios = {}; Qa = 8; B = Qa + 1376; O.push({ M: function () { ib() } });
  L([109, 95, 108, 111, 111, 107, 117, 112, 91, 116, 93, 32, 61, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0, 0, 0, 0, 0, 0, 116, 32, 60, 32, 40, 49, 85, 32, 60, 60, 32, 116, 97, 98, 108, 101, 95, 98, 105, 116, 115, 41, 0, 0, 112, 67, 111, 100, 101, 115, 105, 122, 101, 115, 91, 115, 121, 109, 95, 105, 110, 100, 101, 120, 93, 32, 61, 61, 32, 99, 111, 100, 101, 115, 105, 122, 101, 0, 0, 0, 0, 0, 0, 0, 115, 111, 114, 116, 101, 100, 95, 112, 111, 115, 32, 60, 32, 116, 111, 116, 97, 108, 95, 117, 115, 101, 100, 95, 115, 121, 109, 115, 0, 0, 0, 0, 110, 117, 109, 95, 99, 111, 100, 101, 115, 91, 99, 93, 0, 0, 0, 0, 110, 101, 119, 95, 99, 97, 112,
    97, 99, 105, 116, 121, 32, 38, 38, 32, 40, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 62, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 41, 0, 0, 0, 0, 0, 40, 108, 101, 110, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 108, 101, 110, 32, 60, 61, 32, 99, 77, 97, 120, 69, 120, 112, 101, 99, 116, 101, 100, 67, 111, 100, 101, 83, 105, 122, 101, 41, 0, 0, 0, 0, 0, 110, 101, 120, 116, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 32, 62, 32, 99, 117, 114, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 0, 0, 110, 117, 109, 32, 38, 38, 32, 40, 110, 117, 109, 32, 61, 61, 32, 126, 110, 117, 109, 95, 99, 104, 101, 99, 107, 41, 0, 0,
    0, 0, 0, 0, 105, 32, 60, 32, 109, 95, 115, 105, 122, 101, 0, 0, 0, 0, 0, 0, 109, 105, 110, 95, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 60, 32, 40, 48, 120, 55, 70, 70, 70, 48, 48, 48, 48, 85, 32, 47, 32, 101, 108, 101, 109, 101, 110, 116, 95, 115, 105, 122, 101, 41, 0, 109, 111, 100, 101, 108, 46, 109, 95, 99, 111, 100, 101, 95, 115, 105, 122, 101, 115, 91, 115, 121, 109, 93, 32, 61, 61, 32, 108, 101, 110, 0, 0, 116, 32, 33, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0, 0, 0, 0, 0, 0, 0, 0, 109, 95, 98, 105, 116, 95, 99, 111, 117, 110, 116, 32, 60, 61, 32, 99, 66, 105, 116, 66, 117, 102, 83, 105, 122, 101, 0, 0, 0, 0, 0,
    0, 48, 0, 0, 0, 0, 0, 0, 0, 46, 46, 47, 105, 110, 99, 47, 99, 114, 110, 95, 100, 101, 99, 111, 109, 112, 46, 104, 0, 0, 0, 0, 0, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 0, 0, 0, 102, 97, 108, 115, 101, 0, 0, 0, 99, 114, 110, 100, 95, 102, 114, 101, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0, 0, 0, 0, 0, 0, 99, 114, 110, 100, 95, 114, 101, 97, 108, 108, 111, 99, 58, 32, 98,
    97, 100, 32, 112, 116, 114, 0, 0, 0, 40, 40, 117, 105, 110, 116, 51, 50, 41, 112, 95, 110, 101, 119, 32, 38, 32, 40, 67, 82, 78, 68, 95, 77, 73, 78, 95, 65, 76, 76, 79, 67, 95, 65, 76, 73, 71, 78, 77, 69, 78, 84, 32, 45, 32, 49, 41, 41, 32, 61, 61, 32, 48, 0, 0, 0, 99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 111, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 0, 0, 0, 0, 0, 99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 115, 105, 122, 101, 32, 116, 111, 111, 32, 98, 105, 103, 0, 0, 0, 0, 0, 0, 0, 109, 95, 115, 105, 122, 101, 32, 60, 61, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 0, 0, 0, 0, 37, 115, 40,
    37, 117, 41, 58, 32, 65, 115, 115, 101, 114, 116, 105, 111, 110, 32, 102, 97, 105, 108, 117, 114, 101, 58, 32, 34, 37, 115, 34, 10, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 19, 20, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 16, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 2, 0, 0, 0, 1, 0, 2, 1, 0, 2, 0, 0, 1, 2, 3, 0, 2, 3, 4, 5, 6, 7, 1, 0, 2, 3, 1, 0, 0, 0, 0], "i8", Ja, 8); var jb = sa(L(12, "i8", Ia), 8); A(0 == jb % 8); s._strlen = kb; function lb(a) { return 0 > a || 0 === a && -Infinity === 1 / a }
  function mb(a, b) {
    function c(a) { var c; "double" === a ? c = Ga[b + f >> 3] : "i64" == a ? (c = [K[b + f >> 2], K[b + (f + 8) >> 2]], f += 8) : (a = "i32", c = K[b + f >> 2]); f += Math.max(Math.max(ja(a), ka), 8); return c } for (var d = a, f = 0, h = [], g, i; ;) {
      var r = d; g = I[d]; if (0 === g) break; i = I[d + 1 | 0]; if (37 == g) {
        var t = p, y = p, u = p, n = p, F = p; a: for (; ;) { switch (i) { case 43: t = l; break; case 45: y = l; break; case 35: u = l; break; case 48: if (n) break a; else { n = l; break } case 32: F = l; break; default: break a }d++; i = I[d + 1 | 0] } var G = 0; if (42 == i) G = c("i32"), d++, i = I[d + 1 | 0]; else for (; 48 <= i && 57 >= i;)G =
          10 * G + (i - 48), d++, i = I[d + 1 | 0]; var P = p; if (46 == i) { var C = 0, P = l; d++; i = I[d + 1 | 0]; if (42 == i) C = c("i32"), d++; else for (; ;) { i = I[d + 1 | 0]; if (48 > i || 57 < i) break; C = 10 * C + (i - 48); d++ } i = I[d + 1 | 0] } else C = 6; var z; switch (String.fromCharCode(i)) { case "h": i = I[d + 2 | 0]; 104 == i ? (d++, z = 1) : z = 2; break; case "l": i = I[d + 2 | 0]; 108 == i ? (d++, z = 8) : z = 4; break; case "L": case "q": case "j": z = 8; break; case "z": case "t": case "I": z = 4; break; default: z = m }z && d++; i = I[d + 1 | 0]; switch (String.fromCharCode(i)) {
            case "d": case "i": case "u": case "o": case "x": case "X": case "p": r =
              100 == i || 105 == i; z = z || 4; g = c("i" + 8 * z); var k; 8 == z && (g = 117 == i ? +(g[0] >>> 0) + 4294967296 * +(g[1] >>> 0) : +(g[0] >>> 0) + 4294967296 * +(g[1] | 0)); 4 >= z && (g = (r ? cb : bb)(g & Math.pow(256, z) - 1, 8 * z)); var T = Math.abs(g), r = ""; if (100 == i || 105 == i) k = cb(g, 8 * z).toString(10); else if (117 == i) k = bb(g, 8 * z).toString(10), g = Math.abs(g); else if (111 == i) k = (u ? "0" : "") + T.toString(8); else if (120 == i || 88 == i) {
                r = u && 0 != g ? "0x" : ""; if (0 > g) {
                  g = -g; k = (T - 1).toString(16); T = []; for (u = 0; u < k.length; u++)T.push((15 - parseInt(k[u], 16)).toString(16)); for (k = T.join(""); k.length <
                    2 * z;)k = "f" + k
                } else k = T.toString(16); 88 == i && (r = r.toUpperCase(), k = k.toUpperCase())
              } else 112 == i && (0 === T ? k = "(nil)" : (r = "0x", k = T.toString(16))); if (P) for (; k.length < C;)k = "0" + k; 0 <= g && (t ? r = "+" + r : F && (r = " " + r)); "-" == k.charAt(0) && (r = "-" + r, k = k.substr(1)); for (; r.length + k.length < G;)y ? k += " " : n ? k = "0" + k : r = " " + r; k = r + k; k.split("").forEach(function (a) { h.push(a.charCodeAt(0)) }); break; case "f": case "F": case "e": case "E": case "g": case "G": g = c("double"); if (isNaN(g)) k = "nan", n = p; else if (isFinite(g)) {
                P = p; z = Math.min(C, 20); if (103 ==
                  i || 71 == i) P = l, C = C || 1, z = parseInt(g.toExponential(z).split("e")[1], 10), C > z && -4 <= z ? (i = (103 == i ? "f" : "F").charCodeAt(0), C -= z + 1) : (i = (103 == i ? "e" : "E").charCodeAt(0), C--), z = Math.min(C, 20); if (101 == i || 69 == i) k = g.toExponential(z), /[eE][-+]\d$/.test(k) && (k = k.slice(0, -1) + "0" + k.slice(-1)); else if (102 == i || 70 == i) k = g.toFixed(z), 0 === g && lb(g) && (k = "-" + k); r = k.split("e"); if (P && !u) for (; 1 < r[0].length && -1 != r[0].indexOf(".") && ("0" == r[0].slice(-1) || "." == r[0].slice(-1));)r[0] = r[0].slice(0, -1); else for (u && -1 == k.indexOf(".") && (r[0] +=
                    "."); C > z++;)r[0] += "0"; k = r[0] + (1 < r.length ? "e" + r[1] : ""); 69 == i && (k = k.toUpperCase()); 0 <= g && (t ? k = "+" + k : F && (k = " " + k))
              } else k = (0 > g ? "-" : "") + "inf", n = p; for (; k.length < G;)k = y ? k + " " : n && ("-" == k[0] || "+" == k[0]) ? k[0] + "0" + k.slice(1) : (n ? "0" : " ") + k; 97 > i && (k = k.toUpperCase()); k.split("").forEach(function (a) { h.push(a.charCodeAt(0)) }); break; case "s": n = (t = c("i8*")) ? kb(t) : 6; P && (n = Math.min(n, C)); if (!y) for (; n < G--;)h.push(32); if (t) for (u = 0; u < n; u++)h.push(M[t++ | 0]); else h = h.concat(H("(null)".substr(0, n), l)); if (y) for (; n < G--;)h.push(32);
              break; case "c": for (y && h.push(c("i8")); 0 < --G;)h.push(32); y || h.push(c("i8")); break; case "n": y = c("i32*"); K[y >> 2] = h.length; break; case "%": h.push(g); break; default: for (u = r; u < d + 2; u++)h.push(I[u])
          }d += 2
      } else h.push(g), d += 1
    } return h
  } function nb(a, b, c, d) { c = mb(c, d); d = b === j ? c.length : Math.min(c.length, Math.max(b - 1, 0)); if (0 > a) var a = -a, f = Ka(d + 1), a = K[a >> 2] = f; for (f = 0; f < d; f++)I[a + f | 0] = c[f]; if (d < b || b === j) I[a + f | 0] = 0; return c.length }
  var R = {
    W: 1, qa: 2, qd: 3, nc: 4, L: 5, Ga: 6, Kb: 7, Kc: 8, ba: 9, Yb: 10, V: 11, Ad: 11, lb: 12, eb: 13, ic: 14, Wc: 15, Wb: 16, Da: 17, Bd: 18, Ea: 19, Xc: 20, oa: 21, u: 22, Fc: 23, kb: 24, ad: 25, xd: 26, jc: 27, Sc: 28, sa: 29, nd: 30, yc: 31, fd: 32, fc: 33, kd: 34, Oc: 42, lc: 43, Zb: 44, pc: 45, qc: 46, rc: 47, xc: 48, yd: 49, Ic: 50, oc: 51, dc: 35, Lc: 37, Pb: 52, Sb: 53, Cd: 54, Gc: 55, Tb: 56, Ub: 57, ec: 35, Vb: 59, Uc: 60, Jc: 61, ud: 62, Tc: 63, Pc: 64, Qc: 65, md: 66, Mc: 67, Nb: 68, rd: 69, $b: 70, gd: 71, Ac: 72, gc: 73, Rb: 74, bd: 76, Qb: 77, ld: 78, sc: 79, tc: 80, wc: 81, vc: 82, uc: 83, Vc: 38, Fa: 39, Bc: 36, pa: 40, ra: 95, ed: 96, cc: 104,
    Hc: 105, Ob: 97, jd: 91, Zc: 88, Rc: 92, od: 108, bc: 111, Lb: 98, ac: 103, Ec: 101, Cc: 100, vd: 110, kc: 112, hb: 113, ib: 115, fb: 114, gb: 89, zc: 90, hd: 93, pd: 94, Mb: 99, Dc: 102, jb: 106, ca: 107, wd: 109, zd: 87, hc: 122, sd: 116, $c: 95, Nc: 123, mc: 84, cd: 75, Xb: 125, Yc: 131, dd: 130, td: 86
  }, ob = {
    "0": "Success", 1: "Not super-user", 2: "No such file or directory", 3: "No such process", 4: "Interrupted system call", 5: "I/O error", 6: "No such device or address", 7: "Arg list too long", 8: "Exec format error", 9: "Bad file number", 10: "No children", 11: "No more processes",
    12: "Not enough core", 13: "Permission denied", 14: "Bad address", 15: "Block device required", 16: "Mount device busy", 17: "File exists", 18: "Cross-device link", 19: "No such device", 20: "Not a directory", 21: "Is a directory", 22: "Invalid argument", 23: "Too many open files in system", 24: "Too many open files", 25: "Not a typewriter", 26: "Text file busy", 27: "File too large", 28: "No space left on device", 29: "Illegal seek", 30: "Read only file system", 31: "Too many links", 32: "Broken pipe", 33: "Math arg out of domain of func",
    34: "Math result not representable", 35: "File locking deadlock error", 36: "File or path name too long", 37: "No record locks available", 38: "Function not implemented", 39: "Directory not empty", 40: "Too many symbolic links", 42: "No message of desired type", 43: "Identifier removed", 44: "Channel number out of range", 45: "Level 2 not synchronized", 46: "Level 3 halted", 47: "Level 3 reset", 48: "Link number out of range", 49: "Protocol driver not attached", 50: "No CSI structure available", 51: "Level 2 halted", 52: "Invalid exchange",
    53: "Invalid request descriptor", 54: "Exchange full", 55: "No anode", 56: "Invalid request code", 57: "Invalid slot", 59: "Bad font file fmt", 60: "Device not a stream", 61: "No data (for no delay io)", 62: "Timer expired", 63: "Out of streams resources", 64: "Machine is not on the network", 65: "Package not installed", 66: "The object is remote", 67: "The link has been severed", 68: "Advertise error", 69: "Srmount error", 70: "Communication error on send", 71: "Protocol error", 72: "Multihop attempted", 73: "Cross mount point (not really error)",
    74: "Trying to read unreadable message", 75: "Value too large for defined data type", 76: "Given log. name not unique", 77: "f.d. invalid for this operation", 78: "Remote address changed", 79: "Can   access a needed shared lib", 80: "Accessing a corrupted shared lib", 81: ".lib section in a.out corrupted", 82: "Attempting to link in too many libs", 83: "Attempting to exec a shared library", 84: "Illegal byte sequence", 86: "Streams pipe error", 87: "Too many users", 88: "Socket operation on non-socket", 89: "Destination address required",
    90: "Message too long", 91: "Protocol wrong type for socket", 92: "Protocol not available", 93: "Unknown protocol", 94: "Socket type not supported", 95: "Not supported", 96: "Protocol family not supported", 97: "Address family not supported by protocol family", 98: "Address already in use", 99: "Address not available", 100: "Network interface is not configured", 101: "Network is unreachable", 102: "Connection reset by network", 103: "Connection aborted", 104: "Connection reset by peer", 105: "No buffer space available", 106: "Socket is already connected",
    107: "Socket is not connected", 108: "Can't send after socket shutdown", 109: "Too many references", 110: "Connection timed out", 111: "Connection refused", 112: "Host is down", 113: "Host is unreachable", 114: "Socket already connected", 115: "Connection already in progress", 116: "Stale file handle", 122: "Quota exceeded", 123: "No medium (in tape drive)", 125: "Operation canceled", 130: "Previous owner died", 131: "State not recoverable"
  }, pb = 0; function S(a) { return K[pb >> 2] = a }
  function qb(a) { return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1) } function rb(a, b) { for (var c = 0, d = a.length - 1; 0 <= d; d--) { var f = a[d]; "." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--) } if (b) for (; c--; c)a.unshift(".."); return a } function sb(a) { var b = "/" === a.charAt(0), c = "/" === a.substr(-1), a = rb(a.split("/").filter(function (a) { return !!a }), !b).join("/"); !a && !b && (a = "."); a && c && (a += "/"); return (b ? "/" : "") + a }
  function U() { var a = Array.prototype.slice.call(arguments, 0); return sb(a.filter(function (a) { "string" !== typeof a && e(new TypeError("Arguments to path.join must be strings")); return a }).join("/")) } function tb() { for (var a = "", b = p, c = arguments.length - 1; -1 <= c && !b; c--) { var d = 0 <= c ? arguments[c] : "/"; "string" !== typeof d && e(new TypeError("Arguments to path.resolve must be strings")); d && (a = d + "/" + a, b = "/" === d.charAt(0)) } a = rb(a.split("/").filter(function (a) { return !!a }), !b).join("/"); return (b ? "/" : "") + a || "." } var ub = [];
  function vb(a, b) { ub[a] = { input: [], O: [], Z: b }; wb[a] = { k: xb } }
  var xb = {
    open: function (a) { var b = ub[a.g.ka]; b || e(new V(R.Ea)); a.B = b; a.seekable = p }, close: function (a) { a.B.O.length && a.B.Z.ja(a.B, 10) }, K: function (a, b, c, d) { (!a.B || !a.B.Z.Qa) && e(new V(R.Ga)); for (var f = 0, h = 0; h < d; h++) { var g; try { g = a.B.Z.Qa(a.B) } catch (i) { e(new V(R.L)) } g === j && 0 === f && e(new V(R.V)); if (g === m || g === j) break; f++; b[c + h] = g } f && (a.g.timestamp = Date.now()); return f }, write: function (a, b, c, d) {
      (!a.B || !a.B.Z.ja) && e(new V(R.Ga)); for (var f = 0; f < d; f++)try { a.B.Z.ja(a.B, b[c + f]) } catch (h) { e(new V(R.L)) } d && (a.g.timestamp =
        Date.now()); return f
    }
  }, W = {
    cb: 1, na: 2, bb: 3, D: function () { return W.createNode(m, "/", 16895, 0) }, createNode: function (a, b, c, d) {
      (24576 === (c & 61440) || 4096 === (c & 61440)) && e(new V(R.W)); c = yb(a, b, c, d); 16384 === (c.mode & 61440) ? (c.n = { J: W.n.J, A: W.n.A, wa: W.n.wa, Q: W.n.Q, Q: W.n.Q, rename: W.n.rename, ab: W.n.ab, Za: W.n.Za, Xa: W.n.Xa, ma: W.n.ma }, c.k = { N: W.k.N }, c.o = {}) : 32768 === (c.mode & 61440) ? (c.n = { J: W.n.J, A: W.n.A }, c.k = { N: W.k.N, K: W.k.K, write: W.k.write, Ja: W.k.Ja, Ta: W.k.Ta }, c.o = [], c.ea = W.na) : 40960 === (c.mode & 61440) ? (c.n = {
        J: W.n.J, A: W.n.A,
        la: W.n.la
      }, c.k = {}) : 8192 === (c.mode & 61440) && (c.n = { J: W.n.J, A: W.n.A }, c.k = zb); c.timestamp = Date.now(); a && (a.o[b] = c); return c
    }, ua: function (a) { a.ea !== W.na && (a.o = Array.prototype.slice.call(a.o), a.ea = W.na) }, n: {
      J: function (a) {
        var b = {}; b.Qd = 8192 === (a.mode & 61440) ? a.id : 1; b.Wd = a.id; b.mode = a.mode; b.ae = 1; b.uid = 0; b.Ud = 0; b.ka = a.ka; b.size = 16384 === (a.mode & 61440) ? 4096 : 32768 === (a.mode & 61440) ? a.o.length : 40960 === (a.mode & 61440) ? a.link.length : 0; b.Kd = new Date(a.timestamp); b.$d = new Date(a.timestamp); b.Pd = new Date(a.timestamp);
        b.pb = 4096; b.Md = Math.ceil(b.size / b.pb); return b
      }, A: function (a, b) { b.mode !== j && (a.mode = b.mode); b.timestamp !== j && (a.timestamp = b.timestamp); if (b.size !== j) { W.ua(a); var c = a.o; if (b.size < c.length) c.length = b.size; else for (; b.size > c.length;)c.push(0) } }, wa: function () { e(new V(R.qa)) }, Q: function (a, b, c, d) { return W.createNode(a, b, c, d) }, rename: function (a, b, c) { if (16384 === (a.mode & 61440)) { var d; try { d = Ab(b, c) } catch (f) { } if (d) for (var h in d.o) e(new V(R.Fa)) } delete a.parent.o[a.name]; a.name = c; b.o[c] = a; a.parent = b }, ab: function (a,
        b) { delete a.o[b] }, Za: function (a, b) { var c = Ab(a, b), d; for (d in c.o) e(new V(R.Fa)); delete a.o[b] }, Xa: function (a) { var b = [".", ".."], c; for (c in a.o) a.o.hasOwnProperty(c) && b.push(c); return b }, ma: function (a, b, c) { a = W.createNode(a, b, 41471, 0); a.link = c; return a }, la: function (a) { 40960 !== (a.mode & 61440) && e(new V(R.u)); return a.link }
    }, k: {
      K: function (a, b, c, d, f) { a = a.g.o; if (f >= a.length) return 0; d = Math.min(a.length - f, d); A(0 <= d); if (8 < d && a.subarray) b.set(a.subarray(f, f + d), c); else for (var h = 0; h < d; h++)b[c + h] = a[f + h]; return d },
      write: function (a, b, c, d, f, h) { var g = a.g; g.timestamp = Date.now(); a = g.o; if (d && 0 === a.length && 0 === f && b.subarray) return A(b.length), h && b.buffer === I.buffer && 0 === c ? (g.o = b, g.ea = W.cb) : (g.o = new Uint8Array(b.subarray(c, c + d)), g.ea = W.bb), d; W.ua(g); for (a = g.o; a.length < f;)a.push(0); for (h = 0; h < d; h++)a[f + h] = b[c + h]; return d }, N: function (a, b, c) { 1 === c ? b += a.position : 2 === c && 32768 === (a.g.mode & 61440) && (b += a.g.o.length); 0 > b && e(new V(R.u)); a.Hb = []; return a.position = b }, Ja: function (a, b, c) { W.ua(a.g); a = a.g.o; for (b += c; b > a.length;)a.push(0) },
      Ta: function (a, b, c, d, f, h, g) { 32768 !== (a.g.mode & 61440) && e(new V(R.Ea)); a = a.g.o; if (!(g & 2) && (a.buffer === b || a.buffer === b.buffer)) f = p, d = a.byteOffset; else { if (0 < f || f + d < a.length) a = a.subarray ? a.subarray(f, f + d) : Array.prototype.slice.call(a, f, f + d); f = l; (d = Ka(d)) || e(new V(R.lb)); b.set(a, d) } return { de: d, Jd: f } }
    }
  }, Bb = L(1, "i32*", Ia), Cb = L(1, "i32*", Ia), Db = L(1, "i32*", Ia), Eb = m, Fb = [], wb = [m], X = [m], Gb = 1, Hb = m, Ib = l, V = m; function Jb(a) { a instanceof V || e(a + " : " + Ma()); S(a.Na) }
  function Y(a, b) { a = tb("/", a); b = b || { Aa: 0 }; 8 < b.Aa && e(new V(R.pa)); for (var c = rb(a.split("/").filter(function (a) { return !!a }), p), d = Eb, f = "/", h = 0; h < c.length; h++) { var g = h === c.length - 1; if (g && b.parent) break; d = Ab(d, c[h]); f = U(f, c[h]); d.Ab && (d = d.D.root); if (!g || b.X) for (g = 0; 40960 === (d.mode & 61440);) { d = Y(f, { X: p }).g; d.n.la || e(new V(R.u)); var d = d.n.la(d), i = tb; var r = qb(f), f = r[0], r = r[1]; !f && !r ? f = "." : (r && (r = r.substr(0, r.length - 1)), f += r); f = i(f, d); d = Y(f, { Aa: b.Aa }).g; 40 < g++ && e(new V(R.pa)) } } return { path: f, g: d } }
  function Kb(a) { for (var b; ;) { if (a === a.parent) return b ? U(a.D.Ua, b) : a.D.Ua; b = b ? U(a.name, b) : a.name; a = a.parent } } function Lb(a, b) { for (var c = 0, d = 0; d < b.length; d++)c = (c << 5) - c + b.charCodeAt(d) | 0; return (a + c >>> 0) % Hb.length } function Ab(a, b) { var c = Mb(a, "x"); c && e(new V(c)); for (c = Hb[Lb(a.id, b)]; c; c = c.Bb) { var d = c.name; if (c.parent.id === a.id && d === b) return c } return a.n.wa(a, b) }
  function yb(a, b, c, d) { var f = { id: Gb++, name: b, mode: c, n: {}, k: {}, ka: d, parent: m, D: m }; a || (a = f); f.parent = a; f.D = a.D; Object.defineProperties(f, { K: { get: function () { return 365 === (f.mode & 365) }, set: function (a) { a ? f.mode |= 365 : f.mode &= -366 } }, write: { get: function () { return 146 === (f.mode & 146) }, set: function (a) { a ? f.mode |= 146 : f.mode &= -147 } }, yb: { get: function () { return 16384 === (f.mode & 61440) } }, xb: { get: function () { return 8192 === (f.mode & 61440) } } }); a = Lb(f.parent.id, f.name); f.Bb = Hb[a]; return Hb[a] = f }
  var Nb = { r: 0, rs: 1052672, "r+": 2, w: 577, wx: 705, xw: 705, "w+": 578, "wx+": 706, "xw+": 706, a: 1089, ax: 1217, xa: 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 }; function Ob(a) { var b = Nb[a]; "undefined" === typeof b && e(Error("Unknown file open mode: " + a)); return b } function Mb(a, b) { return Ib ? 0 : -1 !== b.indexOf("r") && !(a.mode & 292) || -1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73) ? R.eb : 0 } function Pb(a, b) { try { return Ab(a, b), R.Da } catch (c) { } return Mb(a, "wx") }
  function Qb(a, b, c) { var d; a: { b = b || 1; for (c = c || 4096; b <= c; b++)if (!X[b]) { d = b; break a } e(new V(R.kb)) } a.C = d; Object.defineProperties(a, { object: { get: function () { return a.g }, set: function (b) { a.g = b } }, Yd: { get: function () { return 1 !== (a.I & 2097155) } }, Zd: { get: function () { return 0 !== (a.I & 2097155) } }, Xd: { get: function () { return a.I & 1024 } } }); return X[d] = a } var zb = { open: function (a) { a.k = wb[a.g.ka].k; a.k.open && a.k.open(a) }, N: function () { e(new V(R.sa)) } };
  function Rb(a, b) { var c; b && (c = Y(b, { X: p }), b = c.path); var d = { type: a, ce: {}, Ua: b, root: m }, f = a.D(d); f.D = d; d.root = f; c && (c.g.D = d, c.g.Ab = l, "/" === b && (Eb = d.root)); Fb.push(d); return f } function Sb(a, b, c) { var d = Y(a, { parent: l }).g, a = "/" === a ? "/" : qb(a)[2], f = Pb(d, a); f && e(new V(f)); d.n.Q || e(new V(R.W)); return d.n.Q(d, a, b, c) } function Tb(a, b) { b = (b !== j ? b : 438) & 4095; b |= 32768; return Sb(a, b, 0) } function Ub(a, b) { b = (b !== j ? b : 511) & 1023; b |= 16384; return Sb(a, b, 0) }
  function Vb(a, b, c) { "undefined" === typeof c && (c = b, b = 438); return Sb(a, b | 8192, c) } function Wb(a, b) { var c = Y(b, { parent: l }).g, d = "/" === b ? "/" : qb(b)[2], f = Pb(c, d); f && e(new V(f)); c.n.ma || e(new V(R.W)); return c.n.ma(c, d, a) } function Xb(a, b) { var c; c = "string" === typeof a ? Y(a, { X: l }).g : a; c.n.A || e(new V(R.W)); c.n.A(c, { mode: b & 4095 | c.mode & -4096, timestamp: Date.now() }) }
  function Yb(a, b) {
    var c, a = sb(a), b = "string" === typeof b ? Ob(b) : b; c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0; var d; try { d = Y(a, { X: !(b & 131072) }).g } catch (f) { } b & 64 && (d ? b & 128 && e(new V(R.Da)) : d = Sb(a, c, 0)); d || e(new V(R.qa)); 8192 === (d.mode & 61440) && (b &= -513); d ? 40960 === (d.mode & 61440) ? c = R.pa : 16384 === (d.mode & 61440) && (0 !== (b & 2097155) || b & 512) ? c = R.oa : (c = ["r", "w", "rw"][b & 2097155], b & 512 && (c += "w"), c = Mb(d, c)) : c = R.qa; c && e(new V(c)); if (b & 512) {
      c = d; c = "string" === typeof c ? Y(c, { X: l }).g : c; c.n.A || e(new V(R.W)); 16384 === (c.mode &
        61440) && e(new V(R.oa)); 32768 !== (c.mode & 61440) && e(new V(R.u)); var h = Mb(c, "w"); h && e(new V(h)); c.n.A(c, { size: 0, timestamp: Date.now() })
    } b &= -641; d = Qb({ g: d, path: Kb(d), I: b, seekable: l, position: 0, k: d.k, Hb: [], error: p }, j, j); d.k.open && d.k.open(d); s.logReadFiles && !(b & 1) && (Zb || (Zb = {}), a in Zb || (Zb[a] = 1, s.printErr("read file: " + a))); return d
  } function $b(a) { try { a.k.close && a.k.close(a) } catch (b) { e(b) } finally { X[a.C] = m } }
  function ac(a, b, c, d, f, h) { (0 > d || 0 > f) && e(new V(R.u)); 0 === (a.I & 2097155) && e(new V(R.ba)); 16384 === (a.g.mode & 61440) && e(new V(R.oa)); a.k.write || e(new V(R.u)); var g = l; "undefined" === typeof f ? (f = a.position, g = p) : a.seekable || e(new V(R.sa)); a.I & 1024 && ((!a.seekable || !a.k.N) && e(new V(R.sa)), a.k.N(a, 0, 2)); b = a.k.write(a, b, c, d, f, h); g || (a.position += b); return b } function bc() { V || (V = function (a) { this.Na = a; for (var b in R) if (R[b] === a) { this.code = b; break } this.message = ob[a]; this.stack = Ma() }, V.prototype = Error()) } var cc;
  function dc(a, b) { var c = 0; a && (c |= 365); b && (c |= 146); return c } function ec(a, b, c, d, f, h) { a = b ? U("string" === typeof a ? a : Kb(a), b) : a; d = dc(d, f); f = Tb(a, d); if (c) { if ("string" === typeof c) { for (var b = Array(c.length), g = 0, i = c.length; g < i; ++g)b[g] = c.charCodeAt(g); c = b } Xb(a, d | 146); b = Yb(a, "w"); ac(b, c, 0, c.length, 0, h); $b(b); Xb(a, d) } return f }
  function fc(a, b, c, d) {
    a = U("string" === typeof a ? a : Kb(a), b); b = dc(!!c, !!d); fc.Sa || (fc.Sa = 64); var f; f = fc.Sa++ << 8 | 0; wb[f] = {
      k: {
        open: function (a) { a.seekable = p }, close: function () { d && (d.buffer && d.buffer.length) && d(10) }, K: function (a, b, d, f) { for (var t = 0, y = 0; y < f; y++) { var u; try { u = c() } catch (n) { e(new V(R.L)) } u === j && 0 === t && e(new V(R.V)); if (u === m || u === j) break; t++; b[d + y] = u } t && (a.g.timestamp = Date.now()); return t }, write: function (a, b, c, f) {
          for (var t = 0; t < f; t++)try { d(b[c + t]) } catch (y) { e(new V(R.L)) } f && (a.g.timestamp = Date.now());
          return t
        }
      }
    }; return Vb(a, b, f)
  } function gc(a) { if (a.xb || a.yb || a.link || a.o) return l; var b = l; "undefined" !== typeof XMLHttpRequest && e(Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")); if (s.read) try { a.o = H(s.read(a.url), l) } catch (c) { b = p } else e(Error("Cannot load without read() or XMLHttpRequest.")); b || S(R.L); return b }
  var Zb, Z = {
    D: function () { return yb(m, "/", 16895, 0) }, sb: function (a, b, c) { c && A(1 == b == (6 == c)); a = { tb: a, type: b, protocol: c, p: m, $: {}, ya: [], R: [], T: Z.q }; b = Z.ia(); c = yb(Z.root, b, 49152, 0); c.S = a; b = Qb({ path: b, g: c, I: Ob("r+"), seekable: p, k: Z.k }); a.$a = b; return a }, ub: function (a) { a = X[a]; return !a || 49152 !== (a.g.mode & 49152) ? m : a.g.S }, k: {
      Wa: function (a) { a = a.g.S; return a.T.Wa(a) }, Ra: function (a, b, c) { a = a.g.S; return a.T.Ra(a, b, c) }, K: function (a, b, c, d) { a = a.g.S; d = a.T.Db(a, d); if (!d) return 0; b.set(d.buffer, c); return d.buffer.length }, write: function (a,
        b, c, d) { a = a.g.S; return a.T.Fb(a, b, c, d) }, close: function (a) { a = a.g.S; a.T.close(a) }
    }, ia: function () { Z.ia.Ma || (Z.ia.Ma = 0); return "socket[" + Z.ia.Ma++ + "]" }, q: {
      fa: function (a, b, c) {
        var d; "object" === typeof b && (d = b, c = b = m); if (d) d.Ha ? (b = d.Ha.ee, c = d.Ha.fe) : ((c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(d.url)) || e(Error("WebSocket URL must be in the format ws(s)://address:port")), b = c[1], c = parseInt(c[2], 10)); else try { d = new WebSocket("ws://" + b + ":" + c, w ? {} : ["binary"]), d.binaryType = "arraybuffer" } catch (f) { e(new V(R.hb)) } b = {
          F: b, port: c,
          e: d, ga: []
        }; Z.q.Ia(a, b); Z.q.wb(a, b); 2 === a.type && "undefined" !== typeof a.U && b.ga.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (a.U & 65280) >> 8, a.U & 255])); return b
      }, ha: function (a, b, c) { return a.$[b + ":" + c] }, Ia: function (a, b) { a.$[b.F + ":" + b.port] = b }, Ya: function (a, b) { delete a.$[b.F + ":" + b.port] }, wb: function (a, b) {
        function c(c) {
          A("string" !== typeof c && c.byteLength !== j); var c = new Uint8Array(c), d = f; f = p; d && 10 === c.length && 255 === c[0] && 255 === c[1] && 255 === c[2] && 255 === c[3] && 112 === c[4] && 111 === c[5] && 114 === c[6] && 116 ===
            c[7] ? (c = c[8] << 8 | c[9], Z.q.Ya(a, b), b.port = c, Z.q.Ia(a, b)) : a.R.push({ F: b.F, port: b.port, data: c })
        } function d() { try { for (var a = b.ga.shift(); a;)b.e.send(a), a = b.ga.shift() } catch (c) { b.e.close() } } var f = l; w ? (b.e.Y("open", d), b.e.Y("message", function (a, b) { b.Ld && c((new Uint8Array(a)).buffer) }), b.e.Y("error", q())) : (b.e.onopen = d, b.e.onmessage = function (a) { c(a.data) })
      }, Wa: function (a) {
        if (1 === a.type && a.p) return a.ya.length ? 65 : 0; var b = 0, c = 1 === a.type ? Z.q.ha(a, a.G, a.H) : m; if (a.R.length || !c || c && c.e.readyState === c.e.aa || c &&
          c.e.readyState === c.e.CLOSED) b |= 65; if (!c || c && c.e.readyState === c.e.OPEN) b |= 4; if (c && c.e.readyState === c.e.aa || c && c.e.readyState === c.e.CLOSED) b |= 16; return b
      }, Ra: function (a, b, c) { switch (b) { case 21531: return b = 0, a.R.length && (b = a.R[0].data.length), K[c >> 2] = b, 0; default: return R.u } }, close: function (a) { if (a.p) { try { a.p.close() } catch (b) { } a.p = m } for (var c = Object.keys(a.$), d = 0; d < c.length; d++) { var f = a.$[c[d]]; try { f.e.close() } catch (h) { } Z.q.Ya(a, f) } return 0 }, bind: function (a, b, c) {
        ("undefined" !== typeof a.Ca || "undefined" !==
          typeof a.U) && e(new V(R.u)); a.Ca = b; a.U = c || _mkport(); if (2 === a.type) { a.p && (a.p.close(), a.p = m); try { a.T.zb(a, 0) } catch (d) { d instanceof V || e(d), d.Na !== R.ra && e(d) } }
      }, Od: function (a, b, c) { a.p && e(new V(ERRNO_CODS.ra)); if ("undefined" !== typeof a.G && "undefined" !== typeof a.H) { var d = Z.q.ha(a, a.G, a.H); d && (d.e.readyState === d.e.CONNECTING && e(new V(R.fb)), e(new V(R.jb))) } b = Z.q.fa(a, b, c); a.G = b.F; a.H = b.port; e(new V(R.ib)) }, zb: function (a) {
        w || e(new V(R.ra)); a.p && e(new V(R.u)); var b = require("ws").Dd; a.p = new b({ host: a.Ca, port: a.U });
        a.p.Y("connection", function (b) { if (1 === a.type) { var d = Z.sb(a.tb, a.type, a.protocol), b = Z.q.fa(d, b); d.G = b.F; d.H = b.port; a.ya.push(d) } else Z.q.fa(a, b) }); a.p.Y("closed", function () { a.p = m }); a.p.Y("error", q())
      }, accept: function (a) { a.p || e(new V(R.u)); var b = a.ya.shift(); b.$a.I = a.$a.I; return b }, Td: function (a, b) { var c, d; b ? ((a.G === j || a.H === j) && e(new V(R.ca)), c = a.G, d = a.H) : (c = a.Ca || 0, d = a.U || 0); return { F: c, port: d } }, Fb: function (a, b, c, d, f, h) {
        if (2 === a.type) { if (f === j || h === j) f = a.G, h = a.H; (f === j || h === j) && e(new V(R.gb)) } else f =
          a.G, h = a.H; var g = Z.q.ha(a, f, h); 1 === a.type && ((!g || g.e.readyState === g.e.aa || g.e.readyState === g.e.CLOSED) && e(new V(R.ca)), g.e.readyState === g.e.CONNECTING && e(new V(R.V))); b = b instanceof Array || b instanceof ArrayBuffer ? b.slice(c, c + d) : b.buffer.slice(b.byteOffset + c, b.byteOffset + c + d); if (2 === a.type && (!g || g.e.readyState !== g.e.OPEN)) { if (!g || g.e.readyState === g.e.aa || g.e.readyState === g.e.CLOSED) g = Z.q.fa(a, f, h); g.ga.push(b); return d } try { return g.e.send(b), d } catch (i) { e(new V(R.u)) }
      }, Db: function (a, b) {
        1 === a.type &&
        a.p && e(new V(R.ca)); var c = a.R.shift(); if (!c) { if (1 === a.type) { var d = Z.q.ha(a, a.G, a.H); if (d) { if (d.e.readyState === d.e.aa || d.e.readyState === d.e.CLOSED) return m; e(new V(R.V)) } e(new V(R.ca)) } e(new V(R.V)) } var d = c.data.byteLength || c.data.length, f = c.data.byteOffset || 0, h = c.data.buffer || c.data, g = Math.min(b, d), i = { buffer: new Uint8Array(h, f, g), F: c.F, port: c.port }; 1 === a.type && g < d && (c.data = new Uint8Array(h, f + g, d - g), a.R.unshift(c)); return i
      }
    }
  };
  function hc(a, b, c) { a = X[a]; if (!a) return S(R.ba), -1; try { return ac(a, I, b, c) } catch (d) { return Jb(d), -1 } } function ic(a, b, c, d) { c *= b; if (0 == c) return 0; a = hc(d, a, c); if (-1 == a) { if (b = X[d]) b.error = l; return 0 } return Math.floor(a / b) } function jc(a, b, c) { c = mb(b, c); b = ha(); a = ic(L(c, "i8", Ha), 1, c.length, a); ia(b); return a } s._memset = kc; s._memcpy = lc; function mc(a) { s.print("exit(" + a + ") called"); s.exit(a) }
  function nc(a) { nc.qb || (D = D + 4095 & -4096, nc.qb = l, A(qa), nc.ob = qa, qa = function () { E("cannot dynamically allocate, sbrk now has control") }); var b = D; 0 != a && nc.ob(a); return b } var oc = p, pc = p, qc = p, rc = p, sc = j, tc = j; function uc(a) { return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", bmp: "image/bmp", ogg: "audio/ogg", wav: "audio/wav", mp3: "audio/mpeg" }[a.substr(a.lastIndexOf(".") + 1)] } var vc = []; function wc() { var a = s.canvas; vc.forEach(function (b) { b(a.width, a.height) }) }
  function xc() { var a = s.canvas; this.Jb = a.width; this.Ib = a.height; a.width = screen.width; a.height = screen.height; "undefined" != typeof SDL && (a = Oa[SDL.screen + 0 * ka >> 2], K[SDL.screen + 0 * ka >> 2] = a | 8388608); wc() } function yc() { var a = s.canvas; a.width = this.Jb; a.height = this.Ib; "undefined" != typeof SDL && (a = Oa[SDL.screen + 0 * ka >> 2], K[SDL.screen + 0 * ka >> 2] = a & -8388609); wc() } var zc, Ac, Bc, Cc; bc(); Hb = Array(4096); Eb = yb(m, "/", 16895, 0); Rb(W, "/"); Ub("/tmp"); Ub("/dev"); wb[259] = { k: { K: function () { return 0 }, write: function () { return 0 } } };
  Vb("/dev/null", 259); vb(1280, { Qa: function (a) { if (!a.input.length) { var b = m; if (w) { if (b = process.stdin.read(), !b) { if (process.stdin._readableState && process.stdin._readableState.ended) return m; return } } else "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), b !== m && (b += "\n")) : "function" == typeof readline && (b = readline(), b !== m && (b += "\n")); if (!b) return m; a.input = H(b, l) } return a.input.shift() }, ja: function (a, b) { b === m || 10 === b ? (s.print(a.O.join("")), a.O = []) : a.O.push(Dc.za(b)) } });
  vb(1536, { ja: function (a, b) { b === m || 10 === b ? (s.printErr(a.O.join("")), a.O = []) : a.O.push(Dc.za(b)) } }); Vb("/dev/tty", 1280); Vb("/dev/tty1", 1536); Ub("/dev/shm"); Ub("/dev/shm/tmp");
  O.unshift({
    M: function () {
      if (!s.noFSInit && !cc) {
        A(!cc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"); cc = l; bc(); s.stdin = s.stdin; s.stdout = s.stdout; s.stderr = s.stderr; s.stdin ? fc("/dev", "stdin", s.stdin) : Wb("/dev/tty", "/dev/stdin"); s.stdout ? fc("/dev", "stdout", m, s.stdout) : Wb("/dev/tty", "/dev/stdout"); s.stderr ? fc("/dev", "stderr", m, s.stderr) : Wb("/dev/tty1", "/dev/stderr"); var a = Yb("/dev/stdin",
          "r"); K[Bb >> 2] = a.C; A(1 === a.C, "invalid handle for stdin (" + a.C + ")"); a = Yb("/dev/stdout", "w"); K[Cb >> 2] = a.C; A(2 === a.C, "invalid handle for stdout (" + a.C + ")"); a = Yb("/dev/stderr", "w"); K[Db >> 2] = a.C; A(3 === a.C, "invalid handle for stderr (" + a.C + ")")
      }
    }
  }); Wa.push({ M: function () { Ib = p } }); Xa.push({ M: function () { cc = p; for (var a = 0; a < X.length; a++) { var b = X[a]; b && $b(b) } } }); s.FS_createFolder = function (a, b, c, d) { a = U("string" === typeof a ? a : Kb(a), b); return Ub(a, dc(c, d)) };
  s.FS_createPath = function (a, b) { for (var a = "string" === typeof a ? a : Kb(a), c = b.split("/").reverse(); c.length;) { var d = c.pop(); if (d) { var f = U(a, d); try { Ub(f) } catch (h) { } a = f } } return f }; s.FS_createDataFile = ec;
  s.FS_createPreloadedFile = function (a, b, c, d, f, h, g, i, r) {
    function t() { qc = document.pointerLockElement === n || document.mozPointerLockElement === n || document.webkitPointerLockElement === n } function y(c) { function k(c) { i || ec(a, b, c, d, f, r); h && h(); hb("cp " + F) } var n = p; s.preloadPlugins.forEach(function (a) { !n && a.canHandle(F) && (a.handle(c, F, k, function () { g && g(); hb("cp " + F) }), n = l) }); n || k(c) } s.preloadPlugins || (s.preloadPlugins = []); if (!zc && !ca) {
      zc = l; try { new Blob, Ac = l } catch (u) { Ac = p, console.log("warning: no blob constructor, cannot create blobs with mimetypes") } Bc =
        "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : !Ac ? console.log("warning: no BlobBuilder") : m; Cc = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : j; !s.Va && "undefined" === typeof Cc && (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), s.Va = l); s.preloadPlugins.push({
          canHandle: function (a) { return !s.Va && /\.(jpg|jpeg|png|bmp)$/i.test(a) }, handle: function (a, b,
            c, d) {
              var f = m; if (Ac) try { f = new Blob([a], { type: uc(b) }), f.size !== a.length && (f = new Blob([(new Uint8Array(a)).buffer], { type: uc(b) })) } catch (g) { var h = "Blob constructor present but fails: " + g + "; falling back to blob builder"; ma || (ma = {}); ma[h] || (ma[h] = 1, s.P(h)) } f || (f = new Bc, f.append((new Uint8Array(a)).buffer), f = f.getBlob()); var i = Cc.createObjectURL(f), n = new Image; n.onload = function () {
                A(n.complete, "Image " + b + " could not be decoded"); var d = document.createElement("canvas"); d.width = n.width; d.height = n.height; d.getContext("2d").drawImage(n,
                  0, 0); s.preloadedImages[b] = d; Cc.revokeObjectURL(i); c && c(a)
              }; n.onerror = function () { console.log("Image " + i + " could not be decoded"); d && d() }; n.src = i
          }
        }); s.preloadPlugins.push({
          canHandle: function (a) { return !s.be && a.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 } }, handle: function (a, b, c, d) {
            function f(d) { h || (h = l, s.preloadedAudios[b] = d, c && c(a)) } function g() { h || (h = l, s.preloadedAudios[b] = new Audio, d && d()) } var h = p; if (Ac) {
              try { var i = new Blob([a], { type: uc(b) }) } catch (n) { return g() } var i = Cc.createObjectURL(i), t = new Audio; t.addEventListener("canplaythrough",
                function () { f(t) }, p); t.onerror = function () {
                  if (!h) {
                    console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach"); for (var c = "", d = 0, g = 0, i = 0; i < a.length; i++) { d = d << 8 | a[i]; for (g += 8; 6 <= g;)var n = d >> g - 6 & 63, g = g - 6, c = c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[n] } 2 == g ? (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 3) << 4], c += "==") : 4 == g && (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 15) << 2], c += "=");
                    t.src = "data:audio/x-" + b.substr(-3) + ";base64," + c; f(t)
                  }
                }; t.src = i; setTimeout(function () { ua || f(t) }, 1E4)
            } else return g()
          }
        }); var n = s.canvas; n.Ba = n.requestPointerLock || n.mozRequestPointerLock || n.webkitRequestPointerLock; n.Oa = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || q(); n.Oa = n.Oa.bind(document); document.addEventListener("pointerlockchange", t, p); document.addEventListener("mozpointerlockchange", t, p); document.addEventListener("webkitpointerlockchange", t, p); s.elementPointerLock &&
          n.addEventListener("click", function (a) { !qc && n.Ba && (n.Ba(), a.preventDefault()) }, p)
    } var F = b ? tb(U(a, b)) : a; gb("cp " + F); if ("string" == typeof c) { var G = g, P = function () { G ? G() : e('Loading data file "' + c + '" failed.') }, C = new XMLHttpRequest; C.open("GET", c, l); C.responseType = "arraybuffer"; C.onload = function () { if (200 == C.status || 0 == C.status && C.response) { var a = C.response; A(a, 'Loading data file "' + c + '" failed (no arrayBuffer).'); a = new Uint8Array(a); y(a); hb("al " + c) } else P() }; C.onerror = P; C.send(m); gb("al " + c) } else y(c)
  };
  s.FS_createLazyFile = function (a, b, c, d, f) {
    var h, g; "undefined" !== typeof XMLHttpRequest ? (ca || e("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"), h = function () { this.va = p; this.da = [] }, h.prototype.get = function (a) { if (!(a > this.length - 1 || 0 > a)) { var b = a % this.rb; return this.vb(Math.floor(a / this.rb))[b] } }, h.prototype.Gb = function (a) { this.vb = a }, h.prototype.Ka = function () {
      var a = new XMLHttpRequest; a.open("HEAD", c, p); a.send(m); 200 <= a.status && 300 > a.status ||
        304 === a.status || e(Error("Couldn't load " + c + ". Status: " + a.status)); var b = Number(a.getResponseHeader("Content-length")), d, f = 1048576; if (!((d = a.getResponseHeader("Accept-Ranges")) && "bytes" === d)) f = b; var g = this; g.Gb(function (a) {
          var d = a * f, h = (a + 1) * f - 1, h = Math.min(h, b - 1); if ("undefined" === typeof g.da[a]) {
            var i = g.da; d > h && e(Error("invalid range (" + d + ", " + h + ") or no bytes requested!")); h > b - 1 && e(Error("only " + b + " bytes available! programmer error!")); var k = new XMLHttpRequest; k.open("GET", c, p); b !== f && k.setRequestHeader("Range",
              "bytes=" + d + "-" + h); "undefined" != typeof Uint8Array && (k.responseType = "arraybuffer"); k.overrideMimeType && k.overrideMimeType("text/plain; charset=x-user-defined"); k.send(m); 200 <= k.status && 300 > k.status || 304 === k.status || e(Error("Couldn't load " + c + ". Status: " + k.status)); d = k.response !== j ? new Uint8Array(k.response || []) : H(k.responseText || "", l); i[a] = d
          } "undefined" === typeof g.da[a] && e(Error("doXHR failed!")); return g.da[a]
        }); this.nb = b; this.mb = f; this.va = l
    }, h = new h, Object.defineProperty(h, "length", {
      get: function () {
        this.va ||
        this.Ka(); return this.nb
      }
    }), Object.defineProperty(h, "chunkSize", { get: function () { this.va || this.Ka(); return this.mb } }), g = j) : (g = c, h = j); var i, a = U("string" === typeof a ? a : Kb(a), b); i = Tb(a, dc(d, f)); h ? i.o = h : g && (i.o = m, i.url = g); var r = {}; Object.keys(i.k).forEach(function (a) { var b = i.k[a]; r[a] = function () { gc(i) || e(new V(R.L)); return b.apply(m, arguments) } }); r.K = function (a, b, c, d, f) {
      gc(i) || e(new V(R.L)); a = a.g.o; if (f >= a.length) return 0; d = Math.min(a.length - f, d); A(0 <= d); if (a.slice) for (var g = 0; g < d; g++)b[c + g] = a[f + g]; else for (g =
        0; g < d; g++)b[c + g] = a.get(f + g); return d
    }; i.k = r; return i
  }; s.FS_createLink = function (a, b, c) { a = U("string" === typeof a ? a : Kb(a), b); return Wb(c, a) }; s.FS_createDevice = fc; pb = pa(4); K[pb >> 2] = 0; O.unshift({ M: q() }); Xa.push({ M: q() }); var Dc = new na; w && (require("fs"), process.platform.match(/^win/)); O.push({ M: function () { Z.root = Rb(Z, m) } });
  s.requestFullScreen = function (a, b) {
    function c() { pc = p; (document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement) === d ? (d.La = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen, d.La = d.La.bind(document), sc && d.Ba(), pc = l, tc && xc()) : tc && yc(); if (s.onFullScreen) s.onFullScreen(pc) } sc = a; tc = b; "undefined" === typeof sc && (sc = l); "undefined" === typeof tc &&
      (tc = p); var d = s.canvas; rc || (rc = l, document.addEventListener("fullscreenchange", c, p), document.addEventListener("mozfullscreenchange", c, p), document.addEventListener("webkitfullscreenchange", c, p)); d.Eb = d.requestFullScreen || d.mozRequestFullScreen || (d.webkitRequestFullScreen ? function () { d.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) } : m); d.Eb()
  };
  s.requestAnimationFrame = function (a) { window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.setTimeout); window.requestAnimationFrame(a) }; s.setCanvasSize = function (a, b, c) { var d = s.canvas; d.width = a; d.height = b; c || wc() }; s.pauseMainLoop = q(); s.resumeMainLoop = function () { oc && (oc = p, m()) };
  s.getUserMedia = function () { window.Pa || (window.Pa = navigator.getUserMedia || navigator.mozGetUserMedia); window.Pa(j) }; Ra = x = sa(B); Sa = Ra + 5242880; Ta = D = sa(Sa); A(Ta < ra); Ca = Math.min;
  var $ = (function (global, env, buffer) {
    // EMSCRIPTEN_START_ASM
    "use asm"; var a = new global.Int8Array(buffer); var b = new global.Int16Array(buffer); var c = new global.Int32Array(buffer); var d = new global.Uint8Array(buffer); var e = new global.Uint16Array(buffer); var f = new global.Uint32Array(buffer); var g = new global.Float32Array(buffer); var h = new global.Float64Array(buffer); var i = env.STACKTOP | 0; var j = env.STACK_MAX | 0; var k = env.tempDoublePtr | 0; var l = env.ABORT | 0; var m = +env.NaN; var n = +env.Infinity; var o = 0; var p = 0; var q = 0; var r = 0; var s = 0, t = 0, u = 0, v = 0, w = 0.0, x = 0, y = 0, z = 0, A = 0.0; var B = 0; var C = 0; var D = 0; var E = 0; var F = 0; var G = 0; var H = 0; var I = 0; var J = 0; var K = 0; var L = global.Math.floor; var M = global.Math.abs; var N = global.Math.sqrt; var O = global.Math.pow; var P = global.Math.cos; var Q = global.Math.sin; var R = global.Math.tan; var S = global.Math.acos; var T = global.Math.asin; var U = global.Math.atan; var V = global.Math.atan2; var W = global.Math.exp; var X = global.Math.log; var Y = global.Math.ceil; var Z = global.Math.imul; var _ = env.abort; var $ = env.assert; var aa = env.asmPrintInt; var ab = env.asmPrintFloat; var ac = env.min; var ad = env.invoke_ii; var ae = env.invoke_v; var af = env.invoke_iii; var ag = env.invoke_vi; var ah = env._llvm_lifetime_end; var ai = env._snprintf; var aj = env._abort; var ak = env._fprintf; var al = env._printf; var am = env._fflush; var an = env.__reallyNegative; var ao = env._sysconf; var ap = env.___setErrNo; var aq = env._fwrite; var ar = env._send; var as = env._write; var at = env._exit; var au = env._sprintf; var av = env.__formatString; var aw = env.__ZSt9terminatev; var ax = env._pwrite; var ay = env._sbrk; var az = env.___errno_location; var aA = env.___gxx_personality_v0; var aB = env._llvm_lifetime_start; var aC = env._time; var aD = env.__exit;
    // EMSCRIPTEN_START_FUNCS
    function aI(a) { a = a | 0; var b = 0; b = i; i = i + a | 0; i = i + 7 & -8; return b | 0 } function aJ() { return i | 0 } function aK(a) { a = a | 0; i = a } function aL(a, b) { a = a | 0; b = b | 0; if ((o | 0) == 0) { o = a; p = b } } function aM(b) { b = b | 0; a[k] = a[b]; a[k + 1 | 0] = a[b + 1 | 0]; a[k + 2 | 0] = a[b + 2 | 0]; a[k + 3 | 0] = a[b + 3 | 0] } function aN(b) { b = b | 0; a[k] = a[b]; a[k + 1 | 0] = a[b + 1 | 0]; a[k + 2 | 0] = a[b + 2 | 0]; a[k + 3 | 0] = a[b + 3 | 0]; a[k + 4 | 0] = a[b + 4 | 0]; a[k + 5 | 0] = a[b + 5 | 0]; a[k + 6 | 0] = a[b + 6 | 0]; a[k + 7 | 0] = a[b + 7 | 0] } function aO(a) { a = a | 0; B = a } function aP(a) { a = a | 0; C = a } function aQ(a) { a = a | 0; D = a } function aR(a) { a = a | 0; E = a } function aS(a) { a = a | 0; F = a } function aT(a) { a = a | 0; G = a } function aU(a) { a = a | 0; H = a } function aV(a) { a = a | 0; I = a } function aW(a) { a = a | 0; J = a } function aX(a) { a = a | 0; K = a } function aY() { } function aZ(a, b, d, e) { a = a | 0; b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0; f = i; i = i + 1032 | 0; g = f | 0; h = f + 512 | 0; j = f + 520 | 0; k = a + 8 | 0; if ((c[a + 4 >> 2] | 0) >>> 0 > (c[k >> 2] | 0) >>> 0) { l = j | 0; au(l | 0, 768, (m = i, i = i + 24 | 0, c[m >> 2] = 472, c[m + 8 >> 2] = 2121, c[m + 16 >> 2] = 744, m) | 0) | 0; i = m; al(l | 0, (m = i, i = i + 1 | 0, i = i + 7 & -8, c[m >> 2] = 0, m) | 0) | 0; i = m } if ((2147418112 / (e >>> 0) | 0) >>> 0 <= b >>> 0) { l = j | 0; au(l | 0, 768, (m = i, i = i + 24 | 0, c[m >> 2] = 472, c[m + 8 >> 2] = 2122, c[m + 16 >> 2] = 328, m) | 0) | 0; i = m; al(l | 0, (m = i, i = i + 1 | 0, i = i + 7 & -8, c[m >> 2] = 0, m) | 0) | 0; i = m } l = c[k >> 2] | 0; if (l >>> 0 >= b >>> 0) { n = 1; i = f; return n | 0 } do { if (d) { o = b - 1 | 0; if ((b | 0) != 0) { if ((o & b | 0) == 0) { p = b; break } } q = o >>> 16 | o; o = q >>> 8 | q; q = o >>> 4 | o; o = q >>> 2 | q; p = (o >>> 1 | o) + 1 | 0 } else { p = b } } while (0); if (!((p | 0) != 0 & p >>> 0 > l >>> 0)) { l = j | 0; au(l | 0, 768, (m = i, i = i + 24 | 0, c[m >> 2] = 472, c[m + 8 >> 2] = 2131, c[m + 16 >> 2] = 152, m) | 0) | 0; i = m; al(l | 0, (m = i, i = i + 1 | 0, i = i + 7 & -8, c[m >> 2] = 0, m) | 0) | 0; i = m } l = Z(p, e) | 0; j = a | 0; a = c[j >> 2] | 0; if ((a & 7 | 0) != 0) { b = g | 0; au(b | 0, 768, (m = i, i = i + 24 | 0, c[m >> 2] = 472, c[m + 8 >> 2] = 2500, c[m + 16 >> 2] = 600, m) | 0) | 0; i = m; al(b | 0, (m = i, i = i + 1 | 0, i = i + 7 & -8, c[m >> 2] = 0, m) | 0) | 0; i = m; n = 0; i = f; return n | 0 } if (l >>> 0 > 2147418112) { b = g | 0; au(b | 0, 768, (m = i, i = i + 24 | 0, c[m >> 2] = 472, c[m + 8 >> 2] = 2500, c[m + 16 >> 2] = 712, m) | 0) | 0; i = m; al(b | 0, (m = i, i = i + 1 | 0, i = i + 7 & -8, c[m >> 2] = 0, m) | 0) | 0; i = m; n = 0; i = f; return n | 0 } c[h >> 2] = l; b = a$(a, l, h, 1) | 0; a = c[h >> 2] | 0; if ((b & 7 | 0) != 0) { h = g | 0; au(h | 0, 768, (m = i, i = i + 24 | 0, c[m >> 2] = 472, c[m + 8 >> 2] = 2552, c[m + 16 >> 2] = 624, m) | 0) | 0; i = m; al(h | 0, (m = i, i = i + 1 | 0, i = i + 7 & -8, c[m >> 2] = 0, m) | 0) | 0; i = m } if ((b | 0) == 0) { n = 0; i = f; return n | 0 } c[j >> 2] = b; if (a >>> 0 > l >>> 0) { r = (a >>> 0) / (e >>> 0) | 0 } else { r = p } c[k >> 2] = r; n = 1; i = f; return n | 0 } function a_(a) { a = a | 0; var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, j = 0, k = 0; b = i; i = i + 512 | 0; d = b | 0; e = a + 3 & -4; a = (e | 0) == 0 ? 4 : e; if (a >>> 0 > 2147418112) { e = d | 0; au(e | 0, 768, (f = i, i = i + 24 | 0, c[f >> 2] = 472, c[f + 8 >> 2] = 2500, c[f + 16 >> 2] = 712, f) | 0) | 0; i = f; al(e | 0, (f = i, i = i + 1 | 0, i = i + 7 & -8, c[f >> 2] = 0, f) | 0) | 0; i = f; g = 0; i = b; return g | 0 } e = be(a) | 0; do { if ((e | 0) != 0) { h = c[e - 4 >> 2] | 0; j = h & 3; if ((j | 0) == 1) { k = 0 } else { k = (h & -8) - ((j | 0) == 0 ? 8 : 4) | 0 } if (k >>> 0 < a >>> 0) { break } if ((e & 7 | 0) == 0) { g = e; i = b; return g | 0 } j = d | 0; au(j | 0, 768, (f = i, i = i + 24 | 0, c[f >> 2] = 472, c[f + 8 >> 2] = 2527, c[f + 16 >> 2] = 624, f) | 0) | 0; i = f; al(j | 0, (f = i, i = i + 1 | 0, i = i + 7 & -8, c[f >> 2] = 0, f) | 0) | 0; i = f; g = e; i = b; return g | 0 } } while (0); e = d | 0; au(e | 0, 768, (f = i, i = i + 24 | 0, c[f >> 2] = 472, c[f + 8 >> 2] = 2500, c[f + 16 >> 2] = 680, f) | 0) | 0; i = f; al(e | 0, (f = i, i = i + 1 | 0, i = i + 7 & -8, c[f >> 2] = 0, f) | 0) | 0; i = f; g = 0; i = b; return g | 0 } function a$(a, b, d, e) { a = a | 0; b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0; if ((a | 0) == 0) { f = be(b) | 0; if ((d | 0) == 0) { g = f; return g | 0 } do { if ((f | 0) == 0) { h = 0 } else { i = c[f - 4 >> 2] | 0; j = i & 3; if ((j | 0) == 1) { h = 0; break } h = (i & -8) - ((j | 0) == 0 ? 8 : 4) | 0 } } while (0); c[d >> 2] = h; g = f; return g | 0 } if ((b | 0) == 0) { bf(a); if ((d | 0) == 0) { g = 0; return g | 0 } c[d >> 2] = 0; g = 0; return g | 0 } f = bg(a, b) | 0; h = (f | 0) != 0; if (h | e ^ 1) { k = h ? f : a; l = f } else { f = bg(a, b) | 0; k = (f | 0) == 0 ? a : f; l = f } if ((d | 0) == 0) { g = l; return g | 0 } do { if ((k | 0) == 0) { m = 0 } else { f = c[k - 4 >> 2] | 0; a = f & 3; if ((a | 0) == 1) { m = 0; break } m = (f & -8) - ((a | 0) == 0 ? 8 : 4) | 0 } } while (0); c[d >> 2] = m; g = l; return g | 0 } function a0(b, e, f) { b = b | 0; e = e | 0; f = f | 0; var g = 0, h = 0; if ((b | 0) == 0 | e >>> 0 < 74 | (f | 0) == 0) { return } if ((c[f >> 2] | 0) != 40) { return } if (((d[b] | 0) << 8 | (d[b + 1 | 0] | 0) | 0) != 18552) { return } if (((d[b + 2 | 0] | 0) << 8 | (d[b + 3 | 0] | 0)) >>> 0 < 74) { return } g = ((d[b + 7 | 0] | 0) << 16 | (d[b + 6 | 0] | 0) << 24 | (d[b + 8 | 0] | 0) << 8 | (d[b + 9 | 0] | 0)) >>> 0 > e >>> 0 ? 0 : b; if ((g | 0) == 0) { return } c[f + 4 >> 2] = (d[g + 12 | 0] | 0) << 8 | (d[g + 13 | 0] | 0); c[f + 8 >> 2] = (d[g + 14 | 0] | 0) << 8 | (d[g + 15 | 0] | 0); c[f + 12 >> 2] = d[g + 16 | 0] | 0; c[f + 16 >> 2] = d[g + 17 | 0] | 0; b = g + 18 | 0; e = f + 32 | 0; c[e >> 2] = d[b] | 0; c[e + 4 >> 2] = 0; e = a[b] | 0; if (e << 24 >> 24 == 0) { h = 8 } else { h = e << 24 >> 24 == 9 ? 8 : 16 } c[f + 20 >> 2] = h; c[f + 24 >> 2] = (d[g + 26 | 0] | 0) << 16 | (d[g + 25 | 0] | 0) << 24 | (d[g + 27 | 0] | 0) << 8 | (d[g + 28 | 0] | 0); c[f + 28 >> 2] = (d[g + 30 | 0] | 0) << 16 | (d[g + 29 | 0] | 0) << 24 | (d[g + 31 | 0] | 0) << 8 | (d[g + 32 | 0] | 0); return } function a1(b) { b = b | 0; var d = 0, e = 0, f = 0, g = 0, h = 0; d = i; i = i + 512 | 0; e = c[b + 20 >> 2] | 0; if ((e | 0) != 0) { a2(e) } e = b + 4 | 0; f = c[e >> 2] | 0; if ((f | 0) == 0) { g = b + 16 | 0; a[g] = 0; i = d; return } if ((f & 7 | 0) == 0) { bf(f) } else { f = d | 0; au(f | 0, 768, (h = i, i = i + 24 | 0, c[h >> 2] = 472, c[h + 8 >> 2] = 2500, c[h + 16 >> 2] = 576, h) | 0) | 0; i = h; al(f | 0, (h = i, i = i + 1 | 0, i = i + 7 & -8, c[h >> 2] = 0, h) | 0) | 0; i = h } c[e >> 2] = 0; c[b + 8 >> 2] = 0; c[b + 12 >> 2] = 0; g = b + 16 | 0; a[g] = 0; i = d; return } function a2(a) { a = a | 0; var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, j = 0, k = 0, l = 0; b = i; i = i + 1536 | 0; d = b | 0; e = b + 512 | 0; f = b + 1024 | 0; if ((a | 0) == 0) { i = b; return } g = c[a + 168 >> 2] | 0; do { if ((g | 0) != 0) { h = c[g - 4 >> 2] | 0; j = g - 8 | 0; if ((h | 0) == 0) { k = 94 } else { if ((h | 0) != (~c[j >> 2] | 0)) { k = 94 } } if ((k | 0) == 94) { h = d | 0; au(h | 0, 768, (l = i, i = i + 24 | 0, c[l >> 2] = 472, c[l + 8 >> 2] = 645, c[l + 16 >> 2] = 280, l) | 0) | 0; i = l; al(h | 0, (l = i, i = i + 1 | 0, i = i + 7 & -8, c[l >> 2] = 0, l) | 0) | 0; i = l; if ((j | 0) == 0) { break } } if ((j & 7 | 0) != 0) { h = d | 0; au(h | 0, 768, (l = i, i = i + 24 | 0, c[l >> 2] = 472, c[l + 8 >> 2] = 2500, c[l + 16 >> 2] = 576, l) | 0) | 0; i = l; al(h | 0, (l = i, i = i + 1 | 0, i = i + 7 & -8, c[l >> 2] = 0, l) | 0) | 0; i = l; break } if ((j | 0) == 0) { be(0) | 0; break } else { bf(j); break } } } while (0); d = c[a + 176 >> 2] | 0; do { if ((d | 0) != 0) { g = c[d - 4 >> 2] | 0; j = d - 8 | 0; if ((g | 0) == 0) { k = 103 } else { if ((g | 0) != (~c[j >> 2] | 0)) { k = 103 } } if ((k | 0) == 103) { g = f | 0; au(g | 0, 768, (l = i, i = i + 24 | 0, c[l >> 2] = 472, c[l + 8 >> 2] = 645, c[l + 16 >> 2] = 280, l) | 0) | 0; i = l; al(g | 0, (l = i, i = i + 1 | 0, i = i + 7 & -8, c[l >> 2] = 0, l) | 0) | 0; i = l; if ((j | 0) == 0) { break } } if ((j & 7 | 0) != 0) { g = f | 0; au(g | 0, 768, (l = i, i = i + 24 | 0, c[l >> 2] = 472, c[l + 8 >> 2] = 2500, c[l + 16 >> 2] = 576, l) | 0) | 0; i = l; al(g | 0, (l = i, i = i + 1 | 0, i = i + 7 & -8, c[l >> 2] = 0, l) | 0) | 0; i = l; break } if ((j | 0) == 0) { be(0) | 0; break } else { bf(j); break } } } while (0); if ((a & 7 | 0) == 0) { bf(a); i = b; return } else { a = e | 0; au(a | 0, 768, (l = i, i = i + 24 | 0, c[l >> 2] = 472, c[l + 8 >> 2] = 2500, c[l + 16 >> 2] = 576, l) | 0) | 0; i = l; al(a | 0, (l = i, i = i + 1 | 0, i = i + 7 & -8, c[l >> 2] = 0, l) | 0) | 0; i = l; i = b; return } } function a3(f) { f = f | 0; var g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0; g = i; i = i + 1232 | 0; h = g | 0; j = g + 512 | 0; k = g + 576 | 0; l = g + 648 | 0; m = g + 720 | 0; n = f + 8 | 0; o = c[n >> 2] | 0; if (!((o | 0) != 0 & o >>> 0 < 8193)) { p = m | 0; au(p | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2998, c[q + 16 >> 2] = 496, q) | 0) | 0; i = q; al(p | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q } p = f | 0; c[p >> 2] = o; r = f + 20 | 0; s = c[r >> 2] | 0; if ((s | 0) == 0) { t = a_(180) | 0; if ((t | 0) == 0) { u = 0 } else { bj(t + 164 | 0, 0, 16); u = t } c[r >> 2] = u; v = u; w = c[p >> 2] | 0 } else { v = s; w = o } if ((c[n >> 2] | 0) == 0) { n = m | 0; au(n | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 904, c[q + 16 >> 2] = 312, q) | 0) | 0; i = q; al(n | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q; x = c[p >> 2] | 0 } else { x = w } p = c[f + 4 >> 2] | 0; if (x >>> 0 > 16) { f = x; n = 0; while (1) { y = n + 1 | 0; if (f >>> 0 > 3) { f = f >>> 1; n = y } else { break } } f = n + 2 + ((y | 0) != 32 & 1 << y >>> 0 < x >>> 0 & 1) | 0; z = f >>> 0 < 11 ? f & 255 : 11 } else { z = 0 } if ((w | 0) == 0 | z >>> 0 > 11) { A = 0; i = g; return A | 0 } c[v >> 2] = w; bj(k | 0, 0, 68); f = 0; while (1) { x = a[p + f | 0] | 0; if (x << 24 >> 24 != 0) { y = k + ((x & 255) << 2) | 0; c[y >> 2] = (c[y >> 2] | 0) + 1 } y = f + 1 | 0; if (y >>> 0 < w >>> 0) { f = y } else { B = 1; C = -1; D = 0; E = 0; F = 0; break } } while (1) { f = c[k + (B << 2) >> 2] | 0; if ((f | 0) == 0) { c[v + 28 + (B - 1 << 2) >> 2] = 0; G = F; H = E; I = D; J = C } else { y = B - 1 | 0; c[j + (y << 2) >> 2] = F; x = f + F | 0; n = 16 - B | 0; c[v + 28 + (y << 2) >> 2] = (x - 1 << n | (1 << n) - 1) + 1; c[v + 96 + (y << 2) >> 2] = E; c[l + (B << 2) >> 2] = E; G = x; H = f + E | 0; I = D >>> 0 > B >>> 0 ? D : B; J = C >>> 0 < B >>> 0 ? C : B } f = B + 1 | 0; if (f >>> 0 < 17) { B = f; C = J; D = I; E = H; F = G << 1 } else { break } } c[v + 4 >> 2] = H; G = v + 172 | 0; do { if (H >>> 0 > (c[G >> 2] | 0) >>> 0) { c[G >> 2] = H; F = H - 1 | 0; if ((H | 0) == 0) { K = 140 } else { if ((F & H | 0) != 0) { K = 140 } } if ((K | 0) == 140) { E = F >>> 16 | F; F = E >>> 8 | E; E = F >>> 4 | F; F = E >>> 2 | E; E = (F >>> 1 | F) + 1 | 0; c[G >> 2] = E >>> 0 > w >>> 0 ? w : E } E = v + 176 | 0; F = c[E >> 2] | 0; do { if ((F | 0) != 0) { D = c[F - 4 >> 2] | 0; C = F - 8 | 0; if ((D | 0) == 0) { K = 144 } else { if ((D | 0) != (~c[C >> 2] | 0)) { K = 144 } } if ((K | 0) == 144) { D = h | 0; au(D | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 645, c[q + 16 >> 2] = 280, q) | 0) | 0; i = q; al(D | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q; if ((C | 0) == 0) { break } } if ((C & 7 | 0) != 0) { D = h | 0; au(D | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2500, c[q + 16 >> 2] = 576, q) | 0) | 0; i = q; al(D | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q; break } if ((C | 0) == 0) { be(0) | 0; break } else { bf(C); break } } } while (0); F = c[G >> 2] | 0; C = (F | 0) == 0 ? 1 : F; F = a_((C << 1) + 8 | 0) | 0; if ((F | 0) == 0) { c[E >> 2] = 0; A = 0; i = g; return A | 0 } else { D = F + 8 | 0; c[F + 4 >> 2] = C; c[F >> 2] = ~C; c[E >> 2] = D; if ((D | 0) == 0) { A = 0 } else { L = E; break } i = g; return A | 0 } } else { L = v + 176 | 0 } } while (0); G = v + 24 | 0; a[G] = J & 255; a[v + 25 | 0] = I & 255; J = h | 0; h = 0; do { D = a[p + h | 0] | 0; C = D & 255; if (D << 24 >> 24 != 0) { if ((c[k + (C << 2) >> 2] | 0) == 0) { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2274, c[q + 16 >> 2] = 136, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q } D = l + (C << 2) | 0; C = c[D >> 2] | 0; c[D >> 2] = C + 1; if (C >>> 0 >= H >>> 0) { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2278, c[q + 16 >> 2] = 104, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q } b[(c[L >> 2] | 0) + (C << 1) >> 1] = h & 65535 } h = h + 1 | 0; } while (h >>> 0 < w >>> 0); w = a[G] | 0; h = (w & 255) >>> 0 < z >>> 0 ? z : 0; z = v + 8 | 0; c[z >> 2] = h; H = (h | 0) != 0; if (H) { l = 1 << h; C = v + 164 | 0; do { if (l >>> 0 > (c[C >> 2] | 0) >>> 0) { c[C >> 2] = l; D = v + 168 | 0; F = c[D >> 2] | 0; do { if ((F | 0) != 0) { B = c[F - 4 >> 2] | 0; f = F - 8 | 0; if ((B | 0) == 0) { K = 169 } else { if ((B | 0) != (~c[f >> 2] | 0)) { K = 169 } } if ((K | 0) == 169) { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 645, c[q + 16 >> 2] = 280, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q; if ((f | 0) == 0) { break } } if ((f & 7 | 0) != 0) { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2500, c[q + 16 >> 2] = 576, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q; break } if ((f | 0) == 0) { be(0) | 0; break } else { bf(f); break } } } while (0); F = l << 2; E = a_(F + 8 | 0) | 0; if ((E | 0) == 0) { c[D >> 2] = 0; A = 0; i = g; return A | 0 } else { f = E + 8 | 0; B = f; c[E + 4 >> 2] = l; c[E >> 2] = ~l; c[D >> 2] = B; if ((f | 0) == 0) { A = 0 } else { M = B; N = F; break } i = g; return A | 0 } } else { M = c[v + 168 >> 2] | 0; N = l << 2 } } while (0); K = v + 168 | 0; bj(M | 0, -1 | 0, N | 0); N = 1; do { do { if ((c[k + (N << 2) >> 2] | 0) != 0) { M = h - N | 0; C = 1 << M; F = N - 1 | 0; B = c[j + (F << 2) >> 2] | 0; if (!((N | 0) != 0 & N >>> 0 < 17)) { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 1954, c[q + 16 >> 2] = 200, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q } f = c[v + 28 + (F << 2) >> 2] | 0; if ((f | 0) == 0) { O = -1 } else { O = (f - 1 | 0) >>> ((16 - N | 0) >>> 0) } if (B >>> 0 > O >>> 0) { break } f = (c[v + 96 + (F << 2) >> 2] | 0) - B | 0; F = N << 16; E = B; do { B = e[(c[L >> 2] | 0) + (f + E << 1) >> 1] | 0; if ((d[p + B | 0] | 0 | 0) != (N | 0)) { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2320, c[q + 16 >> 2] = 64, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q } x = E << M; y = B | F; B = 0; do { n = B + x | 0; if (n >>> 0 >= l >>> 0) { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2326, c[q + 16 >> 2] = 40, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q } m = c[K >> 2] | 0; if ((c[m + (n << 2) >> 2] | 0) == -1) { P = m } else { au(J | 0, 768, (q = i, i = i + 24 | 0, c[q >> 2] = 472, c[q + 8 >> 2] = 2328, c[q + 16 >> 2] = 8, q) | 0) | 0; i = q; al(J | 0, (q = i, i = i + 1 | 0, i = i + 7 & -8, c[q >> 2] = 0, q) | 0) | 0; i = q; P = c[K >> 2] | 0 } c[P + (n << 2) >> 2] = y; B = B + 1 | 0; } while (B >>> 0 < C >>> 0); E = E + 1 | 0; } while (E >>> 0 <= O >>> 0) } } while (0); N = N + 1 | 0; } while (N >>> 0 <= h >>> 0); Q = a[G] | 0 } else { Q = w } w = v + 96 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j >> 2] | 0); w = v + 100 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 4 >> 2] | 0); w = v + 104 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 8 >> 2] | 0); w = v + 108 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 12 >> 2] | 0); w = v + 112 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 16 >> 2] | 0); w = v + 116 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 20 >> 2] | 0); w = v + 120 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 24 >> 2] | 0); w = v + 124 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 28 >> 2] | 0); w = v + 128 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 32 >> 2] | 0); w = v + 132 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 36 >> 2] | 0); w = v + 136 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 40 >> 2] | 0); w = v + 140 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 44 >> 2] | 0); w = v + 144 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 48 >> 2] | 0); w = v + 148 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 52 >> 2] | 0); w = v + 152 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 56 >> 2] | 0); w = v + 156 | 0; c[w >> 2] = (c[w >> 2] | 0) - (c[j + 60 >> 2] | 0); j = v + 16 | 0; c[j >> 2] = 0; w = v + 20 | 0; c[w >> 2] = Q & 255; L279: do { if (H) { Q = h; while (1) { if ((Q | 0) == 0) { break L279 } R = Q - 1 | 0; if ((c[k + (Q << 2) >> 2] | 0) == 0) { Q = R } else { break } } c[j >> 2] = c[v + 28 + (R << 2) >> 2]; Q = h + 1 | 0; c[w >> 2] = Q; G = Q; while (1) { if (G >>> 0 > I >>> 0) { break L279 } if ((c[k + (G << 2) >> 2] | 0) == 0) { G = G + 1 | 0 } else { break } } c[w >> 2] = G } } while (0); c[v + 92 >> 2] = -1; c[v + 160 >> 2] = 1048575; c[v + 12 >> 2] = 32 - (c[z >> 2] | 0); A = 1; i = g; return A | 0 } function a4(b, e) { b = b | 0; e = e | 0; var f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ab = 0, ac = 0, ad = 0, ae = 0, af = 0, ag = 0, ah = 0, ai = 0, aj = 0; f = i; i = i + 4120 | 0; g = f + 512 | 0; h = f + 1024 | 0; j = f + 1536 | 0; k = f + 2048 | 0; l = f + 2560 | 0; m = f + 3072 | 0; n = f + 3584 | 0; o = f + 4096 | 0; p = b + 20 | 0; q = c[p >> 2] | 0; if ((q | 0) < 14) { r = b + 4 | 0; s = b + 8 | 0; t = b + 16 | 0; u = f | 0; v = q; while (1) { w = c[r >> 2] | 0; if ((w | 0) == (c[s >> 2] | 0)) { x = 0 } else { c[r >> 2] = w + 1; x = d[w] | 0 } w = v + 8 | 0; c[p >> 2] = w; if ((w | 0) < 33) { y = w } else { au(u | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3200, c[z + 16 >> 2] = 432, z) | 0) | 0; i = z; al(u | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; y = c[p >> 2] | 0 } w = x << 32 - y | c[t >> 2]; c[t >> 2] = w; if ((y | 0) < 14) { v = y } else { A = y; B = w; break } } } else { A = q; B = c[b + 16 >> 2] | 0 } q = b + 16 | 0; y = B >>> 18; c[q >> 2] = B << 14; c[p >> 2] = A - 14; if ((y | 0) == 0) { c[e >> 2] = 0; A = e + 4 | 0; B = c[A >> 2] | 0; if ((B | 0) != 0) { if ((B & 7 | 0) == 0) { bf(B) } else { B = n | 0; au(B | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 2500, c[z + 16 >> 2] = 576, z) | 0) | 0; i = z; al(B | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z } c[A >> 2] = 0; c[e + 8 >> 2] = 0; c[e + 12 >> 2] = 0 } a[e + 16 | 0] = 0; A = e + 20 | 0; B = c[A >> 2] | 0; if ((B | 0) == 0) { C = 1; i = f; return C | 0 } a2(B); c[A >> 2] = 0; C = 1; i = f; return C | 0 } A = e + 4 | 0; B = e + 8 | 0; v = c[B >> 2] | 0; if ((v | 0) != (y | 0)) { if (v >>> 0 <= y >>> 0) { do { if ((c[e + 12 >> 2] | 0) >>> 0 < y >>> 0) { if (aZ(A, y, (v + 1 | 0) == (y | 0), 1) | 0) { D = c[B >> 2] | 0; break } a[e + 16 | 0] = 1; C = 0; i = f; return C | 0 } else { D = v } } while (0); bj((c[A >> 2] | 0) + D | 0, 0, y - D | 0) } c[B >> 2] = y } D = A | 0; bj(c[D >> 2] | 0, 0, y | 0); A = c[p >> 2] | 0; if ((A | 0) < 5) { v = b + 4 | 0; t = b + 8 | 0; x = m | 0; m = A; while (1) { u = c[v >> 2] | 0; if ((u | 0) == (c[t >> 2] | 0)) { E = 0 } else { c[v >> 2] = u + 1; E = d[u] | 0 } u = m + 8 | 0; c[p >> 2] = u; if ((u | 0) < 33) { F = u } else { au(x | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3200, c[z + 16 >> 2] = 432, z) | 0) | 0; i = z; al(x | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; F = c[p >> 2] | 0 } u = E << 32 - F | c[q >> 2]; c[q >> 2] = u; if ((F | 0) < 5) { m = F } else { G = F; H = u; break } } } else { G = A; H = c[q >> 2] | 0 } A = H >>> 27; c[q >> 2] = H << 5; c[p >> 2] = G - 5; if ((A | 0) == 0 | H >>> 0 > 2952790015) { C = 0; i = f; return C | 0 } c[o + 20 >> 2] = 0; bj(o | 0, 0, 17); H = o + 4 | 0; G = o + 8 | 0; L345: do { if (aZ(H, 21, 0, 1) | 0) { F = c[G >> 2] | 0; m = c[H >> 2] | 0; bj(m + F | 0, 0, 21 - F | 0); c[G >> 2] = 21; F = b + 4 | 0; E = b + 8 | 0; x = l | 0; v = 0; do { t = c[p >> 2] | 0; if ((t | 0) < 3) { u = t; while (1) { r = c[F >> 2] | 0; if ((r | 0) == (c[E >> 2] | 0)) { I = 0 } else { c[F >> 2] = r + 1; I = d[r] | 0 } r = u + 8 | 0; c[p >> 2] = r; if ((r | 0) < 33) { J = r } else { au(x | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3200, c[z + 16 >> 2] = 432, z) | 0) | 0; i = z; al(x | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; J = c[p >> 2] | 0 } r = I << 32 - J | c[q >> 2]; c[q >> 2] = r; if ((J | 0) < 3) { u = J } else { K = J; L = r; break } } } else { K = t; L = c[q >> 2] | 0 } c[q >> 2] = L << 3; c[p >> 2] = K - 3; a[m + (d[808 + v | 0] | 0) | 0] = L >>> 29 & 255; v = v + 1 | 0; } while (v >>> 0 < A >>> 0); if (!(a3(o) | 0)) { M = 0; break } v = n | 0; m = h | 0; x = g | 0; u = k | 0; r = j | 0; s = 0; L362: while (1) { w = y - s | 0; N = a5(b, o) | 0; do { if (N >>> 0 < 17) { if ((c[B >> 2] | 0) >>> 0 <= s >>> 0) { au(v | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 904, c[z + 16 >> 2] = 312, z) | 0) | 0; i = z; al(v | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z } a[(c[D >> 2] | 0) + s | 0] = N & 255; O = s + 1 | 0 } else { if ((N | 0) == 18) { P = c[p >> 2] | 0; if ((P | 0) < 7) { Q = P; while (1) { R = c[F >> 2] | 0; if ((R | 0) == (c[E >> 2] | 0)) { S = 0 } else { c[F >> 2] = R + 1; S = d[R] | 0 } R = Q + 8 | 0; c[p >> 2] = R; if ((R | 0) < 33) { T = R } else { au(r | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3200, c[z + 16 >> 2] = 432, z) | 0) | 0; i = z; al(r | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; T = c[p >> 2] | 0 } R = S << 32 - T | c[q >> 2]; c[q >> 2] = R; if ((T | 0) < 7) { Q = T } else { U = T; V = R; break } } } else { U = P; V = c[q >> 2] | 0 } c[q >> 2] = V << 7; c[p >> 2] = U - 7; Q = (V >>> 25) + 11 | 0; if (Q >>> 0 > w >>> 0) { M = 0; break L345 } O = Q + s | 0; break } else if ((N | 0) == 17) { Q = c[p >> 2] | 0; if ((Q | 0) < 3) { R = Q; while (1) { W = c[F >> 2] | 0; if ((W | 0) == (c[E >> 2] | 0)) { X = 0 } else { c[F >> 2] = W + 1; X = d[W] | 0 } W = R + 8 | 0; c[p >> 2] = W; if ((W | 0) < 33) { Y = W } else { au(u | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3200, c[z + 16 >> 2] = 432, z) | 0) | 0; i = z; al(u | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; Y = c[p >> 2] | 0 } W = X << 32 - Y | c[q >> 2]; c[q >> 2] = W; if ((Y | 0) < 3) { R = Y } else { Z = Y; _ = W; break } } } else { Z = Q; _ = c[q >> 2] | 0 } c[q >> 2] = _ << 3; c[p >> 2] = Z - 3; R = (_ >>> 29) + 3 | 0; if (R >>> 0 > w >>> 0) { M = 0; break L345 } O = R + s | 0; break } else { if ((N - 19 | 0) >>> 0 >= 2) { $ = 306; break L362 } R = c[p >> 2] | 0; if ((N | 0) == 19) { if ((R | 0) < 2) { P = R; while (1) { W = c[F >> 2] | 0; if ((W | 0) == (c[E >> 2] | 0)) { aa = 0 } else { c[F >> 2] = W + 1; aa = d[W] | 0 } W = P + 8 | 0; c[p >> 2] = W; if ((W | 0) < 33) { ab = W } else { au(m | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3200, c[z + 16 >> 2] = 432, z) | 0) | 0; i = z; al(m | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; ab = c[p >> 2] | 0 } W = aa << 32 - ab | c[q >> 2]; c[q >> 2] = W; if ((ab | 0) < 2) { P = ab } else { ac = ab; ad = W; break } } } else { ac = R; ad = c[q >> 2] | 0 } c[q >> 2] = ad << 2; c[p >> 2] = ac - 2; ae = (ad >>> 30) + 3 | 0 } else { if ((R | 0) < 6) { P = R; while (1) { Q = c[F >> 2] | 0; if ((Q | 0) == (c[E >> 2] | 0)) { af = 0 } else { c[F >> 2] = Q + 1; af = d[Q] | 0 } Q = P + 8 | 0; c[p >> 2] = Q; if ((Q | 0) < 33) { ag = Q } else { au(x | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3200, c[z + 16 >> 2] = 432, z) | 0) | 0; i = z; al(x | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; ag = c[p >> 2] | 0 } Q = af << 32 - ag | c[q >> 2]; c[q >> 2] = Q; if ((ag | 0) < 6) { P = ag } else { ah = ag; ai = Q; break } } } else { ah = R; ai = c[q >> 2] | 0 } c[q >> 2] = ai << 6; c[p >> 2] = ah - 6; ae = (ai >>> 26) + 7 | 0 } if ((s | 0) == 0 | ae >>> 0 > w >>> 0) { M = 0; break L345 } P = s - 1 | 0; if ((c[B >> 2] | 0) >>> 0 <= P >>> 0) { au(v | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 904, c[z + 16 >> 2] = 312, z) | 0) | 0; i = z; al(v | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z } Q = a[(c[D >> 2] | 0) + P | 0] | 0; if (Q << 24 >> 24 == 0) { M = 0; break L345 } P = ae + s | 0; if (s >>> 0 < P >>> 0) { aj = s } else { O = s; break } while (1) { if ((c[B >> 2] | 0) >>> 0 <= aj >>> 0) { au(v | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 904, c[z + 16 >> 2] = 312, z) | 0) | 0; i = z; al(v | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z } W = aj + 1 | 0; a[(c[D >> 2] | 0) + aj | 0] = Q; if (W >>> 0 < P >>> 0) { aj = W } else { O = P; break } } } } } while (0); if (O >>> 0 < y >>> 0) { s = O } else { break } } if (($ | 0) == 306) { au(v | 0, 768, (z = i, i = i + 24 | 0, c[z >> 2] = 472, c[z + 8 >> 2] = 3141, c[z + 16 >> 2] = 464, z) | 0) | 0; i = z; al(v | 0, (z = i, i = i + 1 | 0, i = i + 7 & -8, c[z >> 2] = 0, z) | 0) | 0; i = z; M = 0; break } if ((O | 0) != (y | 0)) { M = 0; break } M = a3(e) | 0 } else { a[o + 16 | 0] = 1; M = 0 } } while (0); a1(o); C = M; i = f; return C | 0 } function a5(a, b) { a = a | 0; b = b | 0; var f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0; f = i; i = i + 512 | 0; g = f | 0; h = c[b + 20 >> 2] | 0; j = a + 20 | 0; k = c[j >> 2] | 0; do { if ((k | 0) < 24) { l = a + 4 | 0; m = c[l >> 2] | 0; n = c[a + 8 >> 2] | 0; o = m >>> 0 < n >>> 0; if ((k | 0) >= 16) { if (o) { c[l >> 2] = m + 1; p = d[m] | 0 } else { p = 0 } c[j >> 2] = k + 8; q = a + 16 | 0; r = p << 24 - k | c[q >> 2]; c[q >> 2] = r; s = r; break } if (o) { t = (d[m] | 0) << 8; u = m + 1 | 0 } else { t = 0; u = m } if (u >>> 0 < n >>> 0) { v = d[u] | 0; w = u + 1 | 0 } else { v = 0; w = u } c[l >> 2] = w; c[j >> 2] = k + 16; l = a + 16 | 0; n = (v | t) << 16 - k | c[l >> 2]; c[l >> 2] = n; s = n } else { s = c[a + 16 >> 2] | 0 } } while (0); k = a + 16 | 0; a = (s >>> 16) + 1 | 0; do { if (a >>> 0 > (c[h + 16 >> 2] | 0) >>> 0) { t = c[h + 20 >> 2] | 0; while (1) { x = t - 1 | 0; if (a >>> 0 > (c[h + 28 + (x << 2) >> 2] | 0) >>> 0) { t = t + 1 | 0 } else { break } } v = (c[h + 96 + (x << 2) >> 2] | 0) + (s >>> ((32 - t | 0) >>> 0)) | 0; if (v >>> 0 < (c[b >> 2] | 0) >>> 0) { y = t; z = e[(c[h + 176 >> 2] | 0) + (v << 1) >> 1] | 0; break } v = g | 0; au(v | 0, 768, (A = i, i = i + 24 | 0, c[A >> 2] = 472, c[A + 8 >> 2] = 3267, c[A + 16 >> 2] = 464, A) | 0) | 0; i = A; al(v | 0, (A = i, i = i + 1 | 0, i = i + 7 & -8, c[A >> 2] = 0, A) | 0) | 0; i = A; B = 0; i = f; return B | 0 } else { v = c[(c[h + 168 >> 2] | 0) + (s >>> ((32 - (c[h + 8 >> 2] | 0) | 0) >>> 0) << 2) >> 2] | 0; if ((v | 0) == -1) { w = g | 0; au(w | 0, 768, (A = i, i = i + 24 | 0, c[A >> 2] = 472, c[A + 8 >> 2] = 3245, c[A + 16 >> 2] = 408, A) | 0) | 0; i = A; al(w | 0, (A = i, i = i + 1 | 0, i = i + 7 & -8, c[A >> 2] = 0, A) | 0) | 0; i = A } w = v & 65535; u = v >>> 16; if ((c[b + 8 >> 2] | 0) >>> 0 <= w >>> 0) { v = g | 0; au(v | 0, 768, (A = i, i = i + 24 | 0, c[A >> 2] = 472, c[A + 8 >> 2] = 903, c[A + 16 >> 2] = 312, A) | 0) | 0; i = A; al(v | 0, (A = i, i = i + 1 | 0, i = i + 7 & -8, c[A >> 2] = 0, A) | 0) | 0; i = A } if ((d[(c[b + 4 >> 2] | 0) + w | 0] | 0 | 0) == (u | 0)) { y = u; z = w; break } v = g | 0; au(v | 0, 768, (A = i, i = i + 24 | 0, c[A >> 2] = 472, c[A + 8 >> 2] = 3249, c[A + 16 >> 2] = 376, A) | 0) | 0; i = A; al(v | 0, (A = i, i = i + 1 | 0, i = i + 7 & -8, c[A >> 2] = 0, A) | 0) | 0; i = A; y = u; z = w } } while (0); c[k >> 2] = c[k >> 2] << y; c[j >> 2] = (c[j >> 2] | 0) - y; B = z; i = f; return B | 0 } function a6(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0; d = i; i = i + 40 | 0; e = d | 0; c[e >> 2] = 40; a0(a, b, e); i = d; return c[e + 4 >> 2] | 0 } function a7(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0; d = i; i = i + 40 | 0; e = d | 0; c[e >> 2] = 40; a0(a, b, e); i = d; return c[e + 8 >> 2] | 0 } function a8(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0; d = i; i = i + 40 | 0; e = d | 0; c[e >> 2] = 40; a0(a, b, e); i = d; return c[e + 12 >> 2] | 0 } function a9(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0; d = i; i = i + 40 | 0; e = d | 0; c[e >> 2] = 40; a0(a, b, e); i = d; return c[e + 32 >> 2] | 0 } function ba(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0, f = 0, g = 0, h = 0, j = 0, k = 0; d = i; i = i + 552 | 0; e = d | 0; f = d + 512 | 0; c[f >> 2] = 40; a0(a, b, f); b = f + 32 | 0; f = c[b >> 2] | 0; a = c[b + 4 >> 2] | 0; b = 9; g = 0; h = 0; j = 0; if ((f | 0) == 1 & (a | 0) == 0 | (f | 0) == 2 & (a | 0) == 0 | (f | 0) == 7 & (a | 0) == 0 | (f | 0) == 8 & (a | 0) == 0 | (f | 0) == 3 & (a | 0) == 0 | (f | 0) == 4 & (a | 0) == 0 | (f | 0) == 5 & (a | 0) == 0 | (f | 0) == 6 & (a | 0) == 0) { k = 16; i = d; return k | 0 } else if ((f | 0) == (h | 0) & (a | 0) == (j | 0) | (f | 0) == (b | 0) & (a | 0) == (g | 0)) { k = 8; i = d; return k | 0 } else { g = e | 0; au(g | 0, 768, (e = i, i = i + 24 | 0, c[e >> 2] = 472, c[e + 8 >> 2] = 2664, c[e + 16 >> 2] = 568, e) | 0) | 0; i = e; al(g | 0, (e = i, i = i + 1 | 0, i = i + 7 & -8, c[e >> 2] = 0, e) | 0) | 0; i = e; k = 0; i = d; return k | 0 } return 0 } function bb(a, b, d) { a = a | 0; b = b | 0; d = d | 0; var e = 0, f = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0; e = i; i = i + 552 | 0; f = e | 0; g = e + 512 | 0; c[g >> 2] = 40; a0(a, b, g); b = (((c[g + 4 >> 2] | 0) >>> (d >>> 0)) + 3 | 0) >>> 2; a = (((c[g + 8 >> 2] | 0) >>> (d >>> 0)) + 3 | 0) >>> 2; d = g + 32 | 0; g = c[d >> 2] | 0; h = c[d + 4 >> 2] | 0; d = 9; j = 0; k = 0; l = 0; if ((g | 0) == 1 & (h | 0) == 0 | (g | 0) == 2 & (h | 0) == 0 | (g | 0) == 7 & (h | 0) == 0 | (g | 0) == 8 & (h | 0) == 0 | (g | 0) == 3 & (h | 0) == 0 | (g | 0) == 4 & (h | 0) == 0 | (g | 0) == 5 & (h | 0) == 0 | (g | 0) == 6 & (h | 0) == 0) { m = 16; n = Z(a, b) | 0; o = Z(n, m) | 0; i = e; return o | 0 } else if ((g | 0) == (k | 0) & (h | 0) == (l | 0) | (g | 0) == (d | 0) & (h | 0) == (j | 0)) { m = 8; n = Z(a, b) | 0; o = Z(n, m) | 0; i = e; return o | 0 } else { j = f | 0; au(j | 0, 768, (f = i, i = i + 24 | 0, c[f >> 2] = 472, c[f + 8 >> 2] = 2664, c[f + 16 >> 2] = 568, f) | 0) | 0; i = f; al(j | 0, (f = i, i = i + 1 | 0, i = i + 7 & -8, c[f >> 2] = 0, f) | 0) | 0; i = f; m = 0; n = Z(a, b) | 0; o = Z(n, m) | 0; i = e; return o | 0 } return 0 } function bc(f, g, h, j, k, l) { f = f | 0; g = g | 0; h = h | 0; j = j | 0; k = k | 0; l = l | 0; var m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, _ = 0, $ = 0, aa = 0, ab = 0, ac = 0, ad = 0, ae = 0, af = 0, ag = 0, ah = 0, ai = 0, aj = 0, ak = 0, am = 0, an = 0, ao = 0, ap = 0, aq = 0, ar = 0, as = 0, at = 0, av = 0, aw = 0, ax = 0, ay = 0, az = 0, aA = 0, aB = 0, aC = 0, aD = 0, aE = 0, aF = 0, aG = 0, aH = 0, aI = 0, aJ = 0, aK = 0, aL = 0, aM = 0, aN = 0, aO = 0, aP = 0, aQ = 0, aR = 0, aS = 0, aT = 0, aU = 0, aV = 0, aW = 0, aX = 0, aY = 0, a$ = 0, a2 = 0, a3 = 0, a6 = 0, a7 = 0, a8 = 0, a9 = 0, ba = 0, bb = 0, bc = 0, be = 0, bg = 0, bh = 0, bi = 0, bk = 0, bl = 0, bm = 0, bn = 0, bo = 0, bp = 0, bq = 0, br = 0, bs = 0, bt = 0, bu = 0, bv = 0, bw = 0, bx = 0, by = 0, bz = 0, bA = 0, bB = 0, bC = 0, bD = 0, bE = 0, bF = 0, bG = 0, bH = 0, bI = 0, bJ = 0, bK = 0, bL = 0, bM = 0, bN = 0, bO = 0, bP = 0, bQ = 0, bR = 0, bS = 0, bT = 0, bU = 0, bV = 0, bW = 0, bX = 0, bY = 0, bZ = 0, b_ = 0, b$ = 0, b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, b7 = 0, b8 = 0, b9 = 0, ca = 0, cb = 0, cc = 0, cd = 0, ce = 0, cf = 0, cg = 0, ch = 0, ci = 0, cj = 0, ck = 0, cl = 0, cm = 0, cn = 0, co = 0, cp = 0, cq = 0, cr = 0, cs = 0; j = i; i = i + 4008 | 0; m = j | 0; n = j + 16 | 0; o = j + 32 | 0; p = j + 56 | 0; q = j + 960 | 0; r = j + 1864 | 0; s = j + 1888 | 0; t = j + 1912 | 0; u = j + 2112 | 0; v = j + 2312 | 0; w = j + 2376 | 0; x = j + 2888 | 0; y = j + 2936 | 0; z = j + 3448 | 0; A = j + 3960 | 0; B = j + 4e3 | 0; c[A >> 2] = 40; a0(f, g, A); C = (c[A + 4 >> 2] | 0) >>> (k >>> 0); D = (c[A + 8 >> 2] | 0) >>> (k >>> 0); E = A + 32 | 0; A = c[E >> 2] | 0; F = c[E + 4 >> 2] | 0; E = 9; G = 0; H = 0; I = 0; if ((A | 0) == 1 & (F | 0) == 0 | (A | 0) == 2 & (F | 0) == 0 | (A | 0) == 7 & (F | 0) == 0 | (A | 0) == 8 & (F | 0) == 0 | (A | 0) == 3 & (F | 0) == 0 | (A | 0) == 4 & (F | 0) == 0 | (A | 0) == 5 & (F | 0) == 0 | (A | 0) == 6 & (F | 0) == 0) { J = 16 } else if ((A | 0) == (H | 0) & (F | 0) == (I | 0) | (A | 0) == (E | 0) & (F | 0) == (G | 0)) { J = 8 } else { G = z | 0; au(G | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 2664, c[K + 16 >> 2] = 568, K) | 0) | 0; i = K; al(G | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K; J = 0 } G = B | 0; c[G >> 2] = h; L502: do { if ((f | 0) == 0 | g >>> 0 < 62) { L = 0 } else { F = a_(300) | 0; if ((F | 0) == 0) { L = 0; break } E = F; c[F >> 2] = 519686845; A = F + 4 | 0; c[A >> 2] = 0; I = F + 8 | 0; c[I >> 2] = 0; H = F + 88 | 0; bj(H | 0, 0, 45); M = F + 252 | 0; bj(M | 0, 0, 13); N = F + 268 | 0; bj(N | 0, 0, 13); O = F + 284 | 0; bj(O | 0, 0, 13); bj(F + 136 | 0, 0, 21); bj(F + 160 | 0, 0, 21); bj(F + 184 | 0, 0, 21); bj(F + 208 | 0, 0, 21); bj(F + 232 | 0, 0, 17); L505: do { if (g >>> 0 < 74) { P = 369 } else { if (((d[f] | 0) << 8 | (d[f + 1 | 0] | 0) | 0) != 18552) { P = 369; break } if (((d[f + 2 | 0] | 0) << 8 | (d[f + 3 | 0] | 0)) >>> 0 < 74) { P = 369; break } Q = ((d[f + 7 | 0] | 0) << 16 | (d[f + 6 | 0] | 0) << 24 | (d[f + 8 | 0] | 0) << 8 | (d[f + 9 | 0] | 0)) >>> 0 > g >>> 0 ? 0 : f; R = H; c[R >> 2] = Q; if ((Q | 0) == 0) { break } c[A >> 2] = f; c[I >> 2] = g; S = F + 92 | 0; T = S; U = (d[Q + 68 | 0] | 0) << 8 | (d[Q + 67 | 0] | 0) << 16 | (d[Q + 69 | 0] | 0); V = f + U | 0; W = (d[Q + 65 | 0] | 0) << 8 | (d[Q + 66 | 0] | 0); if ((W | 0) == 0) { break } Q = S; c[Q >> 2] = V; S = F + 96 | 0; c[S >> 2] = V; V = F + 104 | 0; c[V >> 2] = W; X = F + 100 | 0; c[X >> 2] = f + (W + U); U = F + 108 | 0; c[U >> 2] = 0; W = F + 112 | 0; c[W >> 2] = 0; if (!(a4(T, F + 116 | 0) | 0)) { break } Y = c[R >> 2] | 0; if (((d[Y + 39 | 0] | 0) << 8 | (d[Y + 40 | 0] | 0) | 0) == 0) { _ = a[Y + 55 | 0] | 0; $ = a[Y + 56 | 0] | 0; if (((_ & 255) << 8 | $ & 255 | 0) == 0) { break } else { aa = _; ab = $; ac = Y } } else { if (!(a4(T, F + 140 | 0) | 0)) { break } if (!(a4(T, F + 188 | 0) | 0)) { break } Y = c[R >> 2] | 0; aa = a[Y + 55 | 0] | 0; ab = a[Y + 56 | 0] | 0; ac = Y } if (((aa & 255) << 8 | ab & 255 | 0) == 0) { ad = ac } else { if (!(a4(T, F + 164 | 0) | 0)) { break } if (!(a4(T, F + 212 | 0) | 0)) { break } ad = c[R >> 2] | 0 } Y = (d[ad + 39 | 0] | 0) << 8 | (d[ad + 40 | 0] | 0); if ((Y | 0) == 0) { ae = ad } else { $ = x; _ = F + 236 | 0; af = F + 240 | 0; ag = c[af >> 2] | 0; if ((ag | 0) == (Y | 0)) { ah = ad } else { if (ag >>> 0 > Y >>> 0) { ai = ad } else { do { if ((c[F + 244 >> 2] | 0) >>> 0 < Y >>> 0) { if (aZ(_, Y, (ag + 1 | 0) == (Y | 0), 4) | 0) { aj = c[af >> 2] | 0; break } else { a[F + 248 | 0] = 1; break L505 } } else { aj = ag } } while (0); bj((c[_ >> 2] | 0) + (aj << 2) | 0, 0, Y - aj << 2 | 0); ai = c[R >> 2] | 0 } c[af >> 2] = Y; ah = ai } ag = c[A >> 2] | 0; ak = (d[ah + 34 | 0] | 0) << 8 | (d[ah + 33 | 0] | 0) << 16 | (d[ah + 35 | 0] | 0); am = ag + ak | 0; an = (d[ah + 37 | 0] | 0) << 8 | (d[ah + 36 | 0] | 0) << 16 | (d[ah + 38 | 0] | 0); if ((an | 0) == 0) { break } c[Q >> 2] = am; c[S >> 2] = am; c[V >> 2] = an; c[X >> 2] = ag + (an + ak); c[U >> 2] = 0; c[W >> 2] = 0; ak = x | 0; bj($ | 0, 0, 17); an = x + 24 | 0; c[x + 44 >> 2] = 0; bj(x + 20 | 0, 0, 21); ag = 0; while (1) { if (ag >>> 0 >= 2) { P = 397; break } if (a4(T, x + (ag * 24 | 0) | 0) | 0) { ag = ag + 1 | 0 } else { ao = 0; break } } if ((P | 0) == 397) { if ((c[af >> 2] | 0) == 0) { ag = w | 0; au(ag | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(ag | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } ag = 0; $ = 0; am = 0; ap = 0; aq = 0; ar = c[_ >> 2] | 0; as = 0; at = 0; while (1) { av = (a5(T, ak) | 0) + at & 31; aw = (a5(T, an) | 0) + ag & 63; ax = (a5(T, ak) | 0) + $ & 31; ay = (a5(T, ak) | 0) + am | 0; az = (a5(T, an) | 0) + ap & 63; aA = (a5(T, ak) | 0) + aq & 31; c[ar >> 2] = aw << 5 | av << 11 | ax | ay << 27 | az << 21 | aA << 16; aB = as + 1 | 0; if (aB >>> 0 < Y >>> 0) { ag = aw; $ = ax; am = ay & 31; ap = az; aq = aA; ar = ar + 4 | 0; as = aB; at = av } else { ao = 1; break } } } a1(an); a1(ak); if (!ao) { break } at = v; as = c[R >> 2] | 0; ar = (d[as + 47 | 0] | 0) << 8 | (d[as + 48 | 0] | 0); aq = c[A >> 2] | 0; ap = (d[as + 42 | 0] | 0) << 8 | (d[as + 41 | 0] | 0) << 16 | (d[as + 43 | 0] | 0); am = aq + ap | 0; $ = (d[as + 45 | 0] | 0) << 8 | (d[as + 44 | 0] | 0) << 16 | (d[as + 46 | 0] | 0); if (($ | 0) == 0) { break } c[Q >> 2] = am; c[S >> 2] = am; c[V >> 2] = $; c[X >> 2] = aq + ($ + ap); c[U >> 2] = 0; c[W >> 2] = 0; c[s + 20 >> 2] = 0; bj(s | 0, 0, 17); if (a4(T, s) | 0) { aC = -3; aD = -3; aE = 0 } else { a1(s); break } while (1) { c[t + (aE << 2) >> 2] = aC; c[u + (aE << 2) >> 2] = aD; ap = aC + 1 | 0; $ = (ap | 0) > 3; aq = aE + 1 | 0; if (aq >>> 0 < 49) { aC = $ ? -3 : ap; aD = ($ & 1) + aD | 0; aE = aq } else { break } } bj(at | 0, 0, 64); ak = F + 256 | 0; an = c[ak >> 2] | 0; if ((an | 0) != (ar | 0)) { if (an >>> 0 <= ar >>> 0) { do { if ((c[F + 260 >> 2] | 0) >>> 0 < ar >>> 0) { if (aZ(M, ar, (an + 1 | 0) == (ar | 0), 4) | 0) { aF = c[ak >> 2] | 0; break } else { a[F + 264 | 0] = 1; a1(s); break L505 } } else { aF = an } } while (0); bj((c[M >> 2] | 0) + (aF << 2) | 0, 0, ar - aF << 2 | 0) } c[ak >> 2] = ar } if ((ar | 0) == 0) { an = w | 0; au(an | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(an | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } else { an = v | 0; at = v + 4 | 0; aq = v + 8 | 0; $ = v + 12 | 0; ap = v + 16 | 0; am = v + 20 | 0; as = v + 24 | 0; ag = v + 28 | 0; Y = v + 32 | 0; _ = v + 36 | 0; af = v + 40 | 0; av = v + 44 | 0; aB = v + 48 | 0; aA = v + 52 | 0; az = v + 56 | 0; ay = v + 60 | 0; ax = c[M >> 2] | 0; aw = 0; while (1) { aG = 0; do { aH = a5(T, s) | 0; aI = aG << 1; aJ = v + (aI << 2) | 0; c[aJ >> 2] = (c[aJ >> 2] | 0) + (c[t + (aH << 2) >> 2] | 0) & 3; aJ = v + ((aI | 1) << 2) | 0; c[aJ >> 2] = (c[aJ >> 2] | 0) + (c[u + (aH << 2) >> 2] | 0) & 3; aG = aG + 1 | 0; } while (aG >>> 0 < 8); c[ax >> 2] = (d[880 + (c[at >> 2] | 0) | 0] | 0) << 2 | (d[880 + (c[an >> 2] | 0) | 0] | 0) | (d[880 + (c[aq >> 2] | 0) | 0] | 0) << 4 | (d[880 + (c[$ >> 2] | 0) | 0] | 0) << 6 | (d[880 + (c[ap >> 2] | 0) | 0] | 0) << 8 | (d[880 + (c[am >> 2] | 0) | 0] | 0) << 10 | (d[880 + (c[as >> 2] | 0) | 0] | 0) << 12 | (d[880 + (c[ag >> 2] | 0) | 0] | 0) << 14 | (d[880 + (c[Y >> 2] | 0) | 0] | 0) << 16 | (d[880 + (c[_ >> 2] | 0) | 0] | 0) << 18 | (d[880 + (c[af >> 2] | 0) | 0] | 0) << 20 | (d[880 + (c[av >> 2] | 0) | 0] | 0) << 22 | (d[880 + (c[aB >> 2] | 0) | 0] | 0) << 24 | (d[880 + (c[aA >> 2] | 0) | 0] | 0) << 26 | (d[880 + (c[az >> 2] | 0) | 0] | 0) << 28 | (d[880 + (c[ay >> 2] | 0) | 0] | 0) << 30; aG = aw + 1 | 0; if (aG >>> 0 < ar >>> 0) { ax = ax + 4 | 0; aw = aG } else { break } } } a1(s); ae = c[R >> 2] | 0 } aw = (d[ae + 55 | 0] | 0) << 8 | (d[ae + 56 | 0] | 0); if ((aw | 0) == 0) { L = F; break L502 } ax = c[A >> 2] | 0; ar = (d[ae + 50 | 0] | 0) << 8 | (d[ae + 49 | 0] | 0) << 16 | (d[ae + 51 | 0] | 0); ay = ax + ar | 0; az = (d[ae + 53 | 0] | 0) << 8 | (d[ae + 52 | 0] | 0) << 16 | (d[ae + 54 | 0] | 0); if ((az | 0) == 0) { break } c[Q >> 2] = ay; c[S >> 2] = ay; c[V >> 2] = az; c[X >> 2] = ax + (az + ar); c[U >> 2] = 0; c[W >> 2] = 0; c[r + 20 >> 2] = 0; bj(r | 0, 0, 17); L585: do { if (a4(T, r) | 0) { ar = F + 272 | 0; az = c[ar >> 2] | 0; if ((az | 0) != (aw | 0)) { if (az >>> 0 <= aw >>> 0) { do { if ((c[F + 276 >> 2] | 0) >>> 0 < aw >>> 0) { if (aZ(N, aw, (az + 1 | 0) == (aw | 0), 2) | 0) { aK = c[ar >> 2] | 0; break } else { a[F + 280 | 0] = 1; break L585 } } else { aK = az } } while (0); bj((c[N >> 2] | 0) + (aK << 1) | 0, 0, aw - aK << 1 | 0) } c[ar >> 2] = aw } az = c[N >> 2] | 0; ax = 0; ay = 0; aA = 0; while (1) { aB = a5(T, r) | 0; av = aB + ax & 255; aB = (a5(T, r) | 0) + ay & 255; b[az >> 1] = (aB << 8 | av) & 65535; af = aA + 1 | 0; if (af >>> 0 < aw >>> 0) { az = az + 2 | 0; ax = av; ay = aB; aA = af } else { break } } a1(r); aA = v; ay = c[R >> 2] | 0; ax = (d[ay + 63 | 0] | 0) << 8 | (d[ay + 64 | 0] | 0); az = c[A >> 2] | 0; ar = (d[ay + 58 | 0] | 0) << 8 | (d[ay + 57 | 0] | 0) << 16 | (d[ay + 59 | 0] | 0); af = az + ar | 0; aB = (d[ay + 61 | 0] | 0) << 8 | (d[ay + 60 | 0] | 0) << 16 | (d[ay + 62 | 0] | 0); if ((aB | 0) == 0) { aL = 0 } else { c[Q >> 2] = af; c[S >> 2] = af; c[V >> 2] = aB; c[X >> 2] = az + (aB + ar); c[U >> 2] = 0; c[W >> 2] = 0; c[o + 20 >> 2] = 0; bj(o | 0, 0, 17); L605: do { if (a4(T, o) | 0) { ar = -7; aB = -7; az = 0; while (1) { c[p + (az << 2) >> 2] = ar; c[q + (az << 2) >> 2] = aB; af = ar + 1 | 0; ay = (af | 0) > 7; av = az + 1 | 0; if (av >>> 0 < 225) { ar = ay ? -7 : af; aB = (ay & 1) + aB | 0; az = av } else { break } } bj(aA | 0, 0, 64); az = ax * 3 | 0; aB = F + 288 | 0; ar = c[aB >> 2] | 0; if ((ar | 0) != (az | 0)) { if (ar >>> 0 <= az >>> 0) { do { if ((c[F + 292 >> 2] | 0) >>> 0 < az >>> 0) { if (aZ(O, az, (ar + 1 | 0) == (az | 0), 2) | 0) { aM = c[aB >> 2] | 0; break } else { a[F + 296 | 0] = 1; aN = 0; break L605 } } else { aM = ar } } while (0); bj((c[O >> 2] | 0) + (aM << 1) | 0, 0, az - aM << 1 | 0) } c[aB >> 2] = az } if ((az | 0) == 0) { ar = w | 0; au(ar | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(ar | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } if ((ax | 0) == 0) { aN = 1; break } ar = v | 0; av = v + 4 | 0; ay = v + 8 | 0; af = v + 12 | 0; _ = v + 16 | 0; Y = v + 20 | 0; ag = v + 24 | 0; as = v + 28 | 0; am = v + 32 | 0; ap = v + 36 | 0; $ = v + 40 | 0; aq = v + 44 | 0; an = v + 48 | 0; at = v + 52 | 0; ak = v + 56 | 0; aG = v + 60 | 0; aH = c[O >> 2] | 0; aJ = 0; while (1) { aI = 0; do { aO = a5(T, o) | 0; aP = aI << 1; aQ = v + (aP << 2) | 0; c[aQ >> 2] = (c[aQ >> 2] | 0) + (c[p + (aO << 2) >> 2] | 0) & 7; aQ = v + ((aP | 1) << 2) | 0; c[aQ >> 2] = (c[aQ >> 2] | 0) + (c[q + (aO << 2) >> 2] | 0) & 7; aI = aI + 1 | 0; } while (aI >>> 0 < 8); b[aH >> 1] = (d[872 + (c[av >> 2] | 0) | 0] | 0) << 3 | (d[872 + (c[ar >> 2] | 0) | 0] | 0) | (d[872 + (c[ay >> 2] | 0) | 0] | 0) << 6 | (d[872 + (c[af >> 2] | 0) | 0] | 0) << 9 | (d[872 + (c[_ >> 2] | 0) | 0] | 0) << 12 | (d[872 + (c[Y >> 2] | 0) | 0] | 0) << 15; b[aH + 2 >> 1] = (d[872 + (c[ag >> 2] | 0) | 0] | 0) << 2 | (a[872 + (c[Y >> 2] | 0) | 0] & 255) >>> 1 | (d[872 + (c[as >> 2] | 0) | 0] | 0) << 5 | (d[872 + (c[am >> 2] | 0) | 0] | 0) << 8 | (d[872 + (c[ap >> 2] | 0) | 0] | 0) << 11 | (d[872 + (c[$ >> 2] | 0) | 0] | 0) << 14; b[aH + 4 >> 1] = (d[872 + (c[aq >> 2] | 0) | 0] | 0) << 1 | (a[872 + (c[$ >> 2] | 0) | 0] & 255) >>> 2 | (d[872 + (c[an >> 2] | 0) | 0] | 0) << 4 | (d[872 + (c[at >> 2] | 0) | 0] | 0) << 7 | (d[872 + (c[ak >> 2] | 0) | 0] | 0) << 10 | (d[872 + (c[aG >> 2] | 0) | 0] | 0) << 13; aI = aJ + 1 | 0; if (aI >>> 0 < ax >>> 0) { aH = aH + 6 | 0; aJ = aI } else { aN = 1; break } } } else { aN = 0 } } while (0); a1(o); aL = aN } if (aL) { L = aL ? F : 0; break L502 } else { break L505 } } } while (0); a1(r) } } while (0); if ((P | 0) == 369) { c[H >> 2] = 0 } bd(E); if ((F & 7 | 0) == 0) { bf(F); L = 0; break } else { O = y | 0; au(O | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 2500, c[K + 16 >> 2] = 576, K) | 0) | 0; i = K; al(O | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K; L = 0; break } } } while (0); r = l + k | 0; do { if (r >>> 0 > k >>> 0) { l = L; if ((L | 0) == 0) { aL = k; aN = D; o = C; q = h; while (1) { aR = q + (Z(Z((o + 3 | 0) >>> 2, J) | 0, (aN + 3 | 0) >>> 2) | 0) | 0; v = aL + 1 | 0; if (v >>> 0 < r >>> 0) { aL = v; aN = aN >>> 1; o = o >>> 1; q = aR } else { break } } c[G >> 2] = aR; break } q = L + 88 | 0; o = L + 8 | 0; aN = L + 4 | 0; aL = L + 92 | 0; F = aL; E = L + 96 | 0; H = L + 104 | 0; v = L + 100 | 0; p = L + 108 | 0; aM = L + 112 | 0; aK = L + 240 | 0; ae = L + 256 | 0; s = aL; aL = L + 116 | 0; u = L + 140 | 0; t = L + 236 | 0; aF = w | 0; aE = L + 188 | 0; aD = L + 252 | 0; aC = L + 272 | 0; ao = L + 212 | 0; x = L + 288 | 0; ah = L + 284 | 0; ai = L + 164 | 0; aj = L + 268 | 0; ad = y | 0; ac = k; ab = D; aa = C; f = h; while (1) { g = Z((aa + 3 | 0) >>> 2, J) | 0; O = Z(g, (ab + 3 | 0) >>> 2) | 0; do { if (O >>> 0 < 8 | ac >>> 0 > 15) { aS = f } else { if ((c[l >> 2] | 0) != 519686845) { aS = f; break } A = c[q >> 2] | 0; N = (d[A + 70 + (ac << 2) + 1 | 0] | 0) << 16 | (d[A + 70 + (ac << 2) | 0] | 0) << 24 | (d[A + 70 + (ac << 2) + 2 | 0] | 0) << 8 | (d[A + 70 + (ac << 2) + 3 | 0] | 0); M = ac + 1 | 0; if (M >>> 0 < (d[A + 16 | 0] | 0) >>> 0) { aT = (d[A + 70 + (M << 2) + 1 | 0] | 0) << 16 | (d[A + 70 + (M << 2) | 0] | 0) << 24 | (d[A + 70 + (M << 2) + 2 | 0] | 0) << 8 | (d[A + 70 + (M << 2) + 3 | 0] | 0) } else { aT = c[o >> 2] | 0 } if (aT >>> 0 > N >>> 0) { aU = A } else { au(ad | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 3705, c[K + 16 >> 2] = 248, K) | 0) | 0; i = K; al(ad | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K; aU = c[q >> 2] | 0 } A = c[aN >> 2] | 0; M = A + N | 0; I = aT - N | 0; T = ((d[aU + 12 | 0] | 0) << 8 | (d[aU + 13 | 0] | 0)) >>> (ac >>> 0); W = ((d[aU + 14 | 0] | 0) << 8 | (d[aU + 15 | 0] | 0)) >>> (ac >>> 0); U = T >>> 0 > 1 ? (T + 3 | 0) >>> 2 : 1; T = W >>> 0 > 1 ? (W + 3 | 0) >>> 2 : 1; W = aU + 18 | 0; X = a[W] | 0; if (X << 24 >> 24 == 0) { aV = 8 } else { aV = X << 24 >> 24 == 9 ? 8 : 16 } X = Z(aV, U) | 0; if ((g | 0) == 0) { aW = X; P = 494 } else { if (X >>> 0 <= g >>> 0) { aW = g; P = 494 } } L663: do { if ((P | 0) == 494) { P = 0; if ((Z(aW, T) | 0) >>> 0 > O >>> 0) { break } X = (U + 1 | 0) >>> 1; V = (T + 1 | 0) >>> 1; if ((aT | 0) == (N | 0)) { break } c[F >> 2] = M; c[E >> 2] = M; c[H >> 2] = I; c[v >> 2] = A + aT; c[p >> 2] = 0; c[aM >> 2] = 0; switch (d[W] | 0 | 0) { case 0: { S = c[aK >> 2] | 0; Q = c[ae >> 2] | 0; R = a[aU + 17 | 0] | 0; aw = R & 255; ax = aW >>> 2; if (R << 24 >> 24 == 0) { break L663 } R = (V | 0) == 0; aA = V - 1 | 0; aJ = (T & 1 | 0) != 0; aH = aW << 1; aG = ax + 1 | 0; ak = ax + 2 | 0; at = ax + 3 | 0; an = X - 1 | 0; $ = an << 4; aq = (U & 1 | 0) != 0; ap = aW + 4 | 0; am = 0; as = 0; Y = 0; ag = 1; while (1) { if (R) { aX = am; aY = as; a$ = ag } else { _ = am; af = as; ay = 0; ar = c[B + (Y << 2) >> 2] | 0; av = ag; while (1) { if ((ay & 1 | 0) == 0) { a2 = 0; a3 = X; a6 = 1; a7 = 16; a8 = ar } else { a2 = an; a3 = -1; a6 = -1; a7 = -16; a8 = ar + $ | 0 } az = (ay | 0) == (aA | 0); aB = az & aJ; if ((a2 | 0) == (a3 | 0)) { a9 = _; ba = af; bb = av } else { aI = az & aJ ^ 1; az = _; aO = af; aQ = a2; aP = a8; bc = av; while (1) { if ((bc | 0) == 1) { be = a5(s, aL) | 0 | 512 } else { be = bc } bg = be & 7; bh = d[832 + bg | 0] | 0; bi = az; bk = 0; do { bl = (a5(s, u) | 0) + bi | 0; bm = bl - S | 0; bn = bm >> 31; bi = bn & bl | bm & ~bn; if ((c[aK >> 2] | 0) >>> 0 <= bi >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[n + (bk << 2) >> 2] = c[(c[t >> 2] | 0) + (bi << 2) >> 2]; bk = bk + 1 | 0; } while (bk >>> 0 < bh >>> 0); bh = be >>> 3; bk = (aQ | 0) == (an | 0) & aq; bn = aP; do { if (aB | bk) { if (bk) { bm = (a5(s, aE) | 0) + aO | 0; bl = bm - Q | 0; bo = bl >> 31; bp = bo & bm | bl & ~bo; c[bn >> 2] = c[n + ((d[840 + (bg << 2) | 0] | 0) << 2) >> 2]; if ((c[ae >> 2] | 0) >>> 0 <= bp >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[aP + 4 >> 2] = c[(c[aD >> 2] | 0) + (bp << 2) >> 2]; bo = (a5(s, aE) | 0) + bp | 0; bp = bo - Q | 0; bl = bp >> 31; bm = (a5(s, aE) | 0) + (bl & bo | bp & ~bl) | 0; bl = bm - Q | 0; bp = bl >> 31; bo = bp & bm | bl & ~bp; if (aB) { bp = (a5(s, aE) | 0) + bo | 0; bl = bp - Q | 0; bm = bl >> 31; bq = bm & bp | bl & ~bm; break } c[aP + aW >> 2] = c[n + ((d[842 + (bg << 2) | 0] | 0) << 2) >> 2]; if ((c[ae >> 2] | 0) >>> 0 <= bo >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[aP + ap >> 2] = c[(c[aD >> 2] | 0) + (bo << 2) >> 2]; bm = (a5(s, aE) | 0) + bo | 0; bo = bm - Q | 0; bl = bo >> 31; bq = bl & bm | bo & ~bl; break } else { br = aO; bs = 0 } while (1) { bl = Z(bs, aW) | 0; bo = bs << 1; bm = (a5(s, aE) | 0) + br | 0; bp = bm - Q | 0; bt = bp >> 31; bu = bt & bm | bp & ~bt; if ((bs | 0) == 0 | aI) { c[aP + bl >> 2] = c[n + ((d[840 + (bg << 2) + bo | 0] | 0) << 2) >> 2]; if ((c[ae >> 2] | 0) >>> 0 <= bu >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[aP + (bl + 4) >> 2] = c[(c[aD >> 2] | 0) + (bu << 2) >> 2]; bt = (a5(s, aE) | 0) + bu | 0; bp = bt - Q | 0; bm = bp >> 31; bv = bm & bt | bp & ~bm; c[aP + (bl + 8) >> 2] = c[n + ((d[(bo | 1) + (840 + (bg << 2)) | 0] | 0) << 2) >> 2]; if ((c[ae >> 2] | 0) >>> 0 <= bv >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[aP + (bl + 12) >> 2] = c[(c[aD >> 2] | 0) + (bv << 2) >> 2]; bw = bv } else { bv = (a5(s, aE) | 0) + bu | 0; bu = bv - Q | 0; bl = bu >> 31; bw = bl & bv | bu & ~bl } bl = bs + 1 | 0; if (bl >>> 0 < 2) { br = bw; bs = bl } else { bq = bw; break } } } else { c[bn >> 2] = c[n + ((d[840 + (bg << 2) | 0] | 0) << 2) >> 2]; bl = (a5(s, aE) | 0) + aO | 0; bu = bl - Q | 0; bv = bu >> 31; bo = bv & bl | bu & ~bv; if ((c[ae >> 2] | 0) >>> 0 <= bo >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[aP + 4 >> 2] = c[(c[aD >> 2] | 0) + (bo << 2) >> 2]; c[aP + 8 >> 2] = c[n + ((d[841 + (bg << 2) | 0] | 0) << 2) >> 2]; bv = (a5(s, aE) | 0) + bo | 0; bo = bv - Q | 0; bu = bo >> 31; bl = bu & bv | bo & ~bu; if ((c[ae >> 2] | 0) >>> 0 <= bl >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[aP + 12 >> 2] = c[(c[aD >> 2] | 0) + (bl << 2) >> 2]; c[bn + (ax << 2) >> 2] = c[n + ((d[842 + (bg << 2) | 0] | 0) << 2) >> 2]; bu = (a5(s, aE) | 0) + bl | 0; bl = bu - Q | 0; bo = bl >> 31; bv = bo & bu | bl & ~bo; if ((c[ae >> 2] | 0) >>> 0 <= bv >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[bn + (aG << 2) >> 2] = c[(c[aD >> 2] | 0) + (bv << 2) >> 2]; c[bn + (ak << 2) >> 2] = c[n + ((d[843 + (bg << 2) | 0] | 0) << 2) >> 2]; bo = (a5(s, aE) | 0) + bv | 0; bv = bo - Q | 0; bl = bv >> 31; bu = bl & bo | bv & ~bl; if ((c[ae >> 2] | 0) >>> 0 <= bu >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[bn + (at << 2) >> 2] = c[(c[aD >> 2] | 0) + (bu << 2) >> 2]; bq = bu } } while (0); bn = aQ + a6 | 0; if ((bn | 0) == (a3 | 0)) { a9 = bi; ba = bq; bb = bh; break } else { az = bi; aO = bq; aQ = bn; aP = aP + a7 | 0; bc = bh } } } bc = ay + 1 | 0; if (bc >>> 0 < V >>> 0) { _ = a9; af = ba; ay = bc; ar = ar + aH | 0; av = bb } else { aX = a9; aY = ba; a$ = bb; break } } } av = Y + 1 | 0; if (av >>> 0 < aw >>> 0) { am = aX; as = aY; Y = av; ag = a$ } else { break } } break }; case 2: case 3: case 5: case 6: case 4: { ag = c[aK >> 2] | 0; Y = c[ae >> 2] | 0; as = c[aC >> 2] | 0; am = (d[aU + 63 | 0] | 0) << 8 | (d[aU + 64 | 0] | 0); aw = a[aU + 17 | 0] | 0; aH = aw & 255; if (aw << 24 >> 24 == 0) { break L663 } aw = (V | 0) == 0; at = V - 1 | 0; Q = (T & 1 | 0) == 0; ak = aW << 1; aG = (U & 1 | 0) == 0; ax = X - 1 | 0; ap = ax << 5; aq = 0; an = 0; S = 0; aJ = 0; aA = 0; $ = 1; while (1) { if (aw) { bx = aq; by = an; bz = S; bA = aJ; bB = $ } else { R = aq; av = an; ar = S; ay = aJ; af = 0; _ = c[B + (aA << 2) >> 2] | 0; bc = $; while (1) { if ((af & 1 | 0) == 0) { bC = 0; bD = X; bE = 1; bF = 32; bG = _ } else { bC = ax; bD = -1; bE = -1; bF = -32; bG = _ + ap | 0 } aP = Q | (af | 0) != (at | 0); if ((bC | 0) == (bD | 0)) { bH = R; bI = av; bJ = ar; bK = ay; bL = bc } else { aQ = R; aO = av; az = ar; aI = ay; aB = bC; bn = bG; bg = bc; while (1) { if ((bg | 0) == 1) { bM = a5(s, aL) | 0 | 512 } else { bM = bg } bk = bM & 7; bu = d[832 + bk | 0] | 0; bl = (aB | 0) != (ax | 0); bv = az; bo = 0; do { bm = (a5(s, ai) | 0) + bv | 0; bp = bm - as | 0; bt = bp >> 31; bv = bt & bm | bp & ~bt; if ((c[aC >> 2] | 0) >>> 0 <= bv >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[m + (bo << 2) >> 2] = e[(c[aj >> 2] | 0) + (bv << 1) >> 1] | 0; bo = bo + 1 | 0; } while (bo >>> 0 < bu >>> 0); bo = bM >>> 3; bh = aQ; bi = 0; do { bt = (a5(s, u) | 0) + bh | 0; bp = bt - ag | 0; bm = bp >> 31; bh = bm & bt | bp & ~bm; if ((c[aK >> 2] | 0) >>> 0 <= bh >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[n + (bi << 2) >> 2] = c[(c[t >> 2] | 0) + (bh << 2) >> 2]; bi = bi + 1 | 0; } while (bi >>> 0 < bu >>> 0); bu = aG | bl; bi = aO; bm = aI; bp = bn; bt = 0; while (1) { bN = (bt | 0) == 0 | aP; bO = bt << 1; bP = bi; bQ = bm; bR = bp; bS = 0; while (1) { bT = (a5(s, ao) | 0) + bQ | 0; bU = bT - am | 0; bV = bU >> 31; bW = bV & bT | bU & ~bV; bV = (a5(s, aE) | 0) + bP | 0; bU = bV - Y | 0; bT = bU >> 31; bX = bT & bV | bU & ~bT; if (((bS | 0) == 0 | bu) & bN) { bT = d[bS + bO + (840 + (bk << 2)) | 0] | 0; bU = bW * 3 | 0; if ((c[x >> 2] | 0) >>> 0 <= bU >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } bV = c[ah >> 2] | 0; c[bR >> 2] = (e[bV + (bU << 1) >> 1] | 0) << 16 | c[m + (bT << 2) >> 2]; c[bR + 4 >> 2] = (e[bV + (bU + 2 << 1) >> 1] | 0) << 16 | (e[bV + (bU + 1 << 1) >> 1] | 0); c[bR + 8 >> 2] = c[n + (bT << 2) >> 2]; if ((c[ae >> 2] | 0) >>> 0 <= bX >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[bR + 12 >> 2] = c[(c[aD >> 2] | 0) + (bX << 2) >> 2] } bT = bS + 1 | 0; if (bT >>> 0 < 2) { bP = bX; bQ = bW; bR = bR + 16 | 0; bS = bT } else { break } } bS = bt + 1 | 0; if (bS >>> 0 < 2) { bi = bX; bm = bW; bp = bp + aW | 0; bt = bS } else { break } } bt = aB + bE | 0; if ((bt | 0) == (bD | 0)) { bH = bh; bI = bX; bJ = bv; bK = bW; bL = bo; break } else { aQ = bh; aO = bX; az = bv; aI = bW; aB = bt; bn = bn + bF | 0; bg = bo } } } bg = af + 1 | 0; if (bg >>> 0 < V >>> 0) { R = bH; av = bI; ar = bJ; ay = bK; af = bg; _ = _ + ak | 0; bc = bL } else { bx = bH; by = bI; bz = bJ; bA = bK; bB = bL; break } } } bc = aA + 1 | 0; if (bc >>> 0 < aH >>> 0) { aq = bx; an = by; S = bz; aJ = bA; aA = bc; $ = bB } else { break } } break }; case 9: { $ = c[aC >> 2] | 0; aA = (d[aU + 63 | 0] | 0) << 8 | (d[aU + 64 | 0] | 0); aJ = a[aU + 17 | 0] | 0; S = aJ & 255; if (aJ << 24 >> 24 == 0) { break L663 } aJ = (V | 0) == 0; an = V - 1 | 0; aq = (T & 1 | 0) == 0; aH = aW << 1; ak = X - 1 | 0; Y = ak << 4; am = (U & 1 | 0) != 0; aG = 0; ag = 0; as = 0; ax = 1; while (1) { if (aJ) { bY = aG; bZ = ag; b_ = ax } else { at = aG; Q = ag; ap = 0; aw = c[B + (as << 2) >> 2] | 0; bc = ax; while (1) { if ((ap & 1 | 0) == 0) { b$ = 0; b0 = X; b1 = 1; b2 = 16; b3 = aw } else { b$ = ak; b0 = -1; b1 = -1; b2 = -16; b3 = aw + Y | 0 } _ = aq | (ap | 0) != (an | 0); if ((b$ | 0) == (b0 | 0)) { b4 = at; b5 = Q; b6 = bc } else { af = at; ay = Q; ar = b3; av = b$; R = bc; while (1) { if ((R | 0) == 1) { b7 = a5(s, aL) | 0 | 512 } else { b7 = R } bg = b7 & 7; bn = d[832 + bg | 0] | 0; aB = af; aI = 0; do { az = (a5(s, ai) | 0) + aB | 0; aO = az - $ | 0; aQ = aO >> 31; aB = aQ & az | aO & ~aQ; if ((c[aC >> 2] | 0) >>> 0 <= aB >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[n + (aI << 2) >> 2] = e[(c[aj >> 2] | 0) + (aB << 1) >> 1] | 0; aI = aI + 1 | 0; } while (aI >>> 0 < bn >>> 0); bn = (av | 0) == (ak | 0) & am; aI = ay; bo = ar; bv = 0; while (1) { bh = bo; aQ = (bv | 0) == 0 | _; aO = bv << 1; az = (a5(s, ao) | 0) + aI | 0; aP = az - aA | 0; bt = aP >> 31; bp = bt & az | aP & ~bt; if (aQ) { bt = d[840 + (bg << 2) + aO | 0] | 0; aP = bp * 3 | 0; if ((c[x >> 2] | 0) >>> 0 <= aP >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } az = c[ah >> 2] | 0; c[bh >> 2] = (e[az + (aP << 1) >> 1] | 0) << 16 | c[n + (bt << 2) >> 2]; c[bo + 4 >> 2] = (e[az + (aP + 2 << 1) >> 1] | 0) << 16 | (e[az + (aP + 1 << 1) >> 1] | 0) } aP = bo + 8 | 0; az = (a5(s, ao) | 0) + bp | 0; bp = az - aA | 0; bt = bp >> 31; b8 = bt & az | bp & ~bt; if (!(bn | aQ ^ 1)) { aQ = d[(aO | 1) + (840 + (bg << 2)) | 0] | 0; aO = b8 * 3 | 0; if ((c[x >> 2] | 0) >>> 0 <= aO >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } bt = c[ah >> 2] | 0; c[aP >> 2] = (e[bt + (aO << 1) >> 1] | 0) << 16 | c[n + (aQ << 2) >> 2]; c[bo + 12 >> 2] = (e[bt + (aO + 2 << 1) >> 1] | 0) << 16 | (e[bt + (aO + 1 << 1) >> 1] | 0) } aO = bv + 1 | 0; if (aO >>> 0 < 2) { aI = b8; bo = bo + aW | 0; bv = aO } else { break } } bv = b7 >>> 3; bo = av + b1 | 0; if ((bo | 0) == (b0 | 0)) { b4 = aB; b5 = b8; b6 = bv; break } else { af = aB; ay = b8; ar = ar + b2 | 0; av = bo; R = bv } } } R = ap + 1 | 0; if (R >>> 0 < V >>> 0) { at = b4; Q = b5; ap = R; aw = aw + aH | 0; bc = b6 } else { bY = b4; bZ = b5; b_ = b6; break } } } bc = as + 1 | 0; if (bc >>> 0 < S >>> 0) { aG = bY; ag = bZ; as = bc; ax = b_ } else { break } } break }; case 7: case 8: { ax = c[aC >> 2] | 0; as = (d[aU + 63 | 0] | 0) << 8 | (d[aU + 64 | 0] | 0); ag = a[aU + 17 | 0] | 0; aG = ag & 255; if (ag << 24 >> 24 == 0) { break L663 } ag = (V | 0) == 0; S = V - 1 | 0; aH = (T & 1 | 0) == 0; aA = aW << 1; am = (U & 1 | 0) == 0; ak = X - 1 | 0; $ = ak << 5; an = 0; aq = 0; Y = 0; aJ = 0; bc = 0; aw = 1; while (1) { if (ag) { b9 = an; ca = aq; cb = Y; cc = aJ; cd = aw } else { ap = an; Q = aq; at = Y; R = aJ; av = 0; ar = c[B + (bc << 2) >> 2] | 0; ay = aw; while (1) { if ((av & 1 | 0) == 0) { ce = 0; cf = X; cg = 1; ch = 32; ci = ar } else { ce = ak; cf = -1; cg = -1; ch = -32; ci = ar + $ | 0 } af = aH | (av | 0) != (S | 0); if ((ce | 0) == (cf | 0)) { cj = ap; ck = Q; cl = at; cm = R; cn = ay } else { _ = ap; bv = Q; bo = at; aI = R; bg = ce; bn = ci; aO = ay; while (1) { if ((aO | 0) == 1) { co = a5(s, aL) | 0 | 512 } else { co = aO } bt = co & 7; aQ = d[832 + bt | 0] | 0; aP = (bg | 0) != (ak | 0); bp = _; az = 0; do { bh = (a5(s, ai) | 0) + bp | 0; bm = bh - ax | 0; bi = bm >> 31; bp = bi & bh | bm & ~bi; if ((c[aC >> 2] | 0) >>> 0 <= bp >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[n + (az << 2) >> 2] = e[(c[aj >> 2] | 0) + (bp << 1) >> 1] | 0; az = az + 1 | 0; } while (az >>> 0 < aQ >>> 0); az = co >>> 3; aB = bo; bi = 0; do { bm = (a5(s, ai) | 0) + aB | 0; bh = bm - ax | 0; bk = bh >> 31; aB = bk & bm | bh & ~bk; if ((c[aC >> 2] | 0) >>> 0 <= aB >>> 0) { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K } c[m + (bi << 2) >> 2] = e[(c[aj >> 2] | 0) + (aB << 1) >> 1] | 0; bi = bi + 1 | 0; } while (bi >>> 0 < aQ >>> 0); aQ = am | aP; bi = bv; bk = aI; bh = bn; bm = 0; while (1) { bu = (bm | 0) == 0 | af; bl = bm << 1; bS = bi; bR = bk; bQ = bh; bP = 0; while (1) { bO = (a5(s, ao) | 0) + bS | 0; bN = bO - as | 0; bT = bN >> 31; cp = bT & bO | bN & ~bT; bT = (a5(s, ao) | 0) + bR | 0; bN = bT - as | 0; bO = bN >> 31; cq = bO & bT | bN & ~bO; if (((bP | 0) == 0 | aQ) & bu) { bO = d[bP + bl + (840 + (bt << 2)) | 0] | 0; bN = cp * 3 | 0; bT = c[x >> 2] | 0; if (bT >>> 0 > bN >>> 0) { cr = bT } else { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K; cr = c[x >> 2] | 0 } bT = c[ah >> 2] | 0; bU = cq * 3 | 0; if (cr >>> 0 > bU >>> 0) { cs = bT } else { au(aF | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 904, c[K + 16 >> 2] = 312, K) | 0) | 0; i = K; al(aF | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K; cs = c[ah >> 2] | 0 } c[bQ >> 2] = (e[bT + (bN << 1) >> 1] | 0) << 16 | c[n + (bO << 2) >> 2]; c[bQ + 4 >> 2] = (e[bT + (bN + 2 << 1) >> 1] | 0) << 16 | (e[bT + (bN + 1 << 1) >> 1] | 0); c[bQ + 8 >> 2] = (e[cs + (bU << 1) >> 1] | 0) << 16 | c[m + (bO << 2) >> 2]; c[bQ + 12 >> 2] = (e[cs + (bU + 2 << 1) >> 1] | 0) << 16 | (e[cs + (bU + 1 << 1) >> 1] | 0) } bU = bP + 1 | 0; if (bU >>> 0 < 2) { bS = cp; bR = cq; bQ = bQ + 16 | 0; bP = bU } else { break } } bP = bm + 1 | 0; if (bP >>> 0 < 2) { bi = cp; bk = cq; bh = bh + aW | 0; bm = bP } else { break } } bm = bg + cg | 0; if ((bm | 0) == (cf | 0)) { cj = bp; ck = cp; cl = aB; cm = cq; cn = az; break } else { _ = bp; bv = cp; bo = aB; aI = cq; bg = bm; bn = bn + ch | 0; aO = az } } } aO = av + 1 | 0; if (aO >>> 0 < V >>> 0) { ap = cj; Q = ck; at = cl; R = cm; av = aO; ar = ar + aA | 0; ay = cn } else { b9 = cj; ca = ck; cb = cl; cc = cm; cd = cn; break } } } ay = bc + 1 | 0; if (ay >>> 0 < aG >>> 0) { an = b9; aq = ca; Y = cb; aJ = cc; bc = ay; aw = cd } else { break } } break }; default: { break L663 } } } } while (0); aS = c[G >> 2] | 0 } } while (0); g = aS + O | 0; c[G >> 2] = g; U = ac + 1 | 0; if (U >>> 0 < r >>> 0) { ac = U; ab = ab >>> 1; aa = aa >>> 1; f = g } else { break } } } } while (0); if ((L | 0) == 0) { i = j; return } if ((c[L >> 2] | 0) != 519686845) { i = j; return } bd(L); if ((L & 7 | 0) == 0) { bf(L); i = j; return } else { L = z | 0; au(L | 0, 768, (K = i, i = i + 24 | 0, c[K >> 2] = 472, c[K + 8 >> 2] = 2500, c[K + 16 >> 2] = 576, K) | 0) | 0; i = K; al(L | 0, (K = i, i = i + 1 | 0, i = i + 7 & -8, c[K >> 2] = 0, K) | 0) | 0; i = K; i = j; return } } function bd(b) { b = b | 0; var d = 0, e = 0, f = 0, g = 0, h = 0; d = i; i = i + 512 | 0; e = d | 0; c[b >> 2] = 0; f = b + 284 | 0; g = c[f >> 2] | 0; if ((g | 0) != 0) { if ((g & 7 | 0) == 0) { bf(g) } else { g = e | 0; au(g | 0, 768, (h = i, i = i + 24 | 0, c[h >> 2] = 472, c[h + 8 >> 2] = 2500, c[h + 16 >> 2] = 576, h) | 0) | 0; i = h; al(g | 0, (h = i, i = i + 1 | 0, i = i + 7 & -8, c[h >> 2] = 0, h) | 0) | 0; i = h } c[f >> 2] = 0; c[b + 288 >> 2] = 0; c[b + 292 >> 2] = 0 } a[b + 296 | 0] = 0; f = b + 268 | 0; g = c[f >> 2] | 0; if ((g | 0) != 0) { if ((g & 7 | 0) == 0) { bf(g) } else { g = e | 0; au(g | 0, 768, (h = i, i = i + 24 | 0, c[h >> 2] = 472, c[h + 8 >> 2] = 2500, c[h + 16 >> 2] = 576, h) | 0) | 0; i = h; al(g | 0, (h = i, i = i + 1 | 0, i = i + 7 & -8, c[h >> 2] = 0, h) | 0) | 0; i = h } c[f >> 2] = 0; c[b + 272 >> 2] = 0; c[b + 276 >> 2] = 0 } a[b + 280 | 0] = 0; f = b + 252 | 0; g = c[f >> 2] | 0; if ((g | 0) != 0) { if ((g & 7 | 0) == 0) { bf(g) } else { g = e | 0; au(g | 0, 768, (h = i, i = i + 24 | 0, c[h >> 2] = 472, c[h + 8 >> 2] = 2500, c[h + 16 >> 2] = 576, h) | 0) | 0; i = h; al(g | 0, (h = i, i = i + 1 | 0, i = i + 7 & -8, c[h >> 2] = 0, h) | 0) | 0; i = h } c[f >> 2] = 0; c[b + 256 >> 2] = 0; c[b + 260 >> 2] = 0 } a[b + 264 | 0] = 0; f = b + 236 | 0; g = c[f >> 2] | 0; if ((g | 0) != 0) { if ((g & 7 | 0) == 0) { bf(g) } else { g = e | 0; au(g | 0, 768, (h = i, i = i + 24 | 0, c[h >> 2] = 472, c[h + 8 >> 2] = 2500, c[h + 16 >> 2] = 576, h) | 0) | 0; i = h; al(g | 0, (h = i, i = i + 1 | 0, i = i + 7 & -8, c[h >> 2] = 0, h) | 0) | 0; i = h } c[f >> 2] = 0; c[b + 240 >> 2] = 0; c[b + 244 >> 2] = 0 } a[b + 248 | 0] = 0; a1(b + 212 | 0); a1(b + 188 | 0); a1(b + 164 | 0); a1(b + 140 | 0); a1(b + 116 | 0); i = d; return } function be(a) { a = a | 0; var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, _ = 0, $ = 0, aa = 0, ab = 0, ac = 0, ad = 0, ae = 0, af = 0, ag = 0, ah = 0, ai = 0, ak = 0, al = 0, am = 0, an = 0, ap = 0, aq = 0, ar = 0, as = 0, at = 0, au = 0, av = 0, aw = 0, ax = 0, aA = 0, aB = 0, aD = 0, aE = 0, aF = 0, aG = 0, aH = 0, aI = 0, aJ = 0, aK = 0, aL = 0; do { if (a >>> 0 < 245) { if (a >>> 0 < 11) { b = 16 } else { b = a + 11 & -8 } d = b >>> 3; e = c[228] | 0; f = e >>> (d >>> 0); if ((f & 3 | 0) != 0) { g = (f & 1 ^ 1) + d | 0; h = g << 1; i = 952 + (h << 2) | 0; j = 952 + (h + 2 << 2) | 0; h = c[j >> 2] | 0; k = h + 8 | 0; l = c[k >> 2] | 0; do { if ((i | 0) == (l | 0)) { c[228] = e & ~(1 << g) } else { if (l >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } m = l + 12 | 0; if ((c[m >> 2] | 0) == (h | 0)) { c[m >> 2] = i; c[j >> 2] = l; break } else { aj(); return 0 } } } while (0); l = g << 3; c[h + 4 >> 2] = l | 3; j = h + (l | 4) | 0; c[j >> 2] = c[j >> 2] | 1; n = k; return n | 0 } if (b >>> 0 <= (c[230] | 0) >>> 0) { o = b; break } if ((f | 0) != 0) { j = 2 << d; l = f << d & (j | -j); j = (l & -l) - 1 | 0; l = j >>> 12 & 16; i = j >>> (l >>> 0); j = i >>> 5 & 8; m = i >>> (j >>> 0); i = m >>> 2 & 4; p = m >>> (i >>> 0); m = p >>> 1 & 2; q = p >>> (m >>> 0); p = q >>> 1 & 1; r = (j | l | i | m | p) + (q >>> (p >>> 0)) | 0; p = r << 1; q = 952 + (p << 2) | 0; m = 952 + (p + 2 << 2) | 0; p = c[m >> 2] | 0; i = p + 8 | 0; l = c[i >> 2] | 0; do { if ((q | 0) == (l | 0)) { c[228] = e & ~(1 << r) } else { if (l >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } j = l + 12 | 0; if ((c[j >> 2] | 0) == (p | 0)) { c[j >> 2] = q; c[m >> 2] = l; break } else { aj(); return 0 } } } while (0); l = r << 3; m = l - b | 0; c[p + 4 >> 2] = b | 3; q = p; e = q + b | 0; c[q + (b | 4) >> 2] = m | 1; c[q + l >> 2] = m; l = c[230] | 0; if ((l | 0) != 0) { q = c[233] | 0; d = l >>> 3; l = d << 1; f = 952 + (l << 2) | 0; k = c[228] | 0; h = 1 << d; do { if ((k & h | 0) == 0) { c[228] = k | h; s = f; t = 952 + (l + 2 << 2) | 0 } else { d = 952 + (l + 2 << 2) | 0; g = c[d >> 2] | 0; if (g >>> 0 >= (c[232] | 0) >>> 0) { s = g; t = d; break } aj(); return 0 } } while (0); c[t >> 2] = q; c[s + 12 >> 2] = q; c[q + 8 >> 2] = s; c[q + 12 >> 2] = f } c[230] = m; c[233] = e; n = i; return n | 0 } l = c[229] | 0; if ((l | 0) == 0) { o = b; break } h = (l & -l) - 1 | 0; l = h >>> 12 & 16; k = h >>> (l >>> 0); h = k >>> 5 & 8; p = k >>> (h >>> 0); k = p >>> 2 & 4; r = p >>> (k >>> 0); p = r >>> 1 & 2; d = r >>> (p >>> 0); r = d >>> 1 & 1; g = c[1216 + ((h | l | k | p | r) + (d >>> (r >>> 0)) << 2) >> 2] | 0; r = g; d = g; p = (c[g + 4 >> 2] & -8) - b | 0; while (1) { g = c[r + 16 >> 2] | 0; if ((g | 0) == 0) { k = c[r + 20 >> 2] | 0; if ((k | 0) == 0) { break } else { u = k } } else { u = g } g = (c[u + 4 >> 2] & -8) - b | 0; k = g >>> 0 < p >>> 0; r = u; d = k ? u : d; p = k ? g : p } r = d; i = c[232] | 0; if (r >>> 0 < i >>> 0) { aj(); return 0 } e = r + b | 0; m = e; if (r >>> 0 >= e >>> 0) { aj(); return 0 } e = c[d + 24 >> 2] | 0; f = c[d + 12 >> 2] | 0; do { if ((f | 0) == (d | 0)) { q = d + 20 | 0; g = c[q >> 2] | 0; if ((g | 0) == 0) { k = d + 16 | 0; l = c[k >> 2] | 0; if ((l | 0) == 0) { v = 0; break } else { w = l; x = k } } else { w = g; x = q } while (1) { q = w + 20 | 0; g = c[q >> 2] | 0; if ((g | 0) != 0) { w = g; x = q; continue } q = w + 16 | 0; g = c[q >> 2] | 0; if ((g | 0) == 0) { break } else { w = g; x = q } } if (x >>> 0 < i >>> 0) { aj(); return 0 } else { c[x >> 2] = 0; v = w; break } } else { q = c[d + 8 >> 2] | 0; if (q >>> 0 < i >>> 0) { aj(); return 0 } g = q + 12 | 0; if ((c[g >> 2] | 0) != (d | 0)) { aj(); return 0 } k = f + 8 | 0; if ((c[k >> 2] | 0) == (d | 0)) { c[g >> 2] = f; c[k >> 2] = q; v = f; break } else { aj(); return 0 } } } while (0); L990: do { if ((e | 0) != 0) { f = d + 28 | 0; i = 1216 + (c[f >> 2] << 2) | 0; do { if ((d | 0) == (c[i >> 2] | 0)) { c[i >> 2] = v; if ((v | 0) != 0) { break } c[229] = c[229] & ~(1 << c[f >> 2]); break L990 } else { if (e >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } q = e + 16 | 0; if ((c[q >> 2] | 0) == (d | 0)) { c[q >> 2] = v } else { c[e + 20 >> 2] = v } if ((v | 0) == 0) { break L990 } } } while (0); if (v >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } c[v + 24 >> 2] = e; f = c[d + 16 >> 2] | 0; do { if ((f | 0) != 0) { if (f >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[v + 16 >> 2] = f; c[f + 24 >> 2] = v; break } } } while (0); f = c[d + 20 >> 2] | 0; if ((f | 0) == 0) { break } if (f >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[v + 20 >> 2] = f; c[f + 24 >> 2] = v; break } } } while (0); if (p >>> 0 < 16) { e = p + b | 0; c[d + 4 >> 2] = e | 3; f = r + (e + 4) | 0; c[f >> 2] = c[f >> 2] | 1 } else { c[d + 4 >> 2] = b | 3; c[r + (b | 4) >> 2] = p | 1; c[r + (p + b) >> 2] = p; f = c[230] | 0; if ((f | 0) != 0) { e = c[233] | 0; i = f >>> 3; f = i << 1; q = 952 + (f << 2) | 0; k = c[228] | 0; g = 1 << i; do { if ((k & g | 0) == 0) { c[228] = k | g; y = q; z = 952 + (f + 2 << 2) | 0 } else { i = 952 + (f + 2 << 2) | 0; l = c[i >> 2] | 0; if (l >>> 0 >= (c[232] | 0) >>> 0) { y = l; z = i; break } aj(); return 0 } } while (0); c[z >> 2] = e; c[y + 12 >> 2] = e; c[e + 8 >> 2] = y; c[e + 12 >> 2] = q } c[230] = p; c[233] = m } f = d + 8 | 0; if ((f | 0) == 0) { o = b; break } else { n = f } return n | 0 } else { if (a >>> 0 > 4294967231) { o = -1; break } f = a + 11 | 0; g = f & -8; k = c[229] | 0; if ((k | 0) == 0) { o = g; break } r = -g | 0; i = f >>> 8; do { if ((i | 0) == 0) { A = 0 } else { if (g >>> 0 > 16777215) { A = 31; break } f = (i + 1048320 | 0) >>> 16 & 8; l = i << f; h = (l + 520192 | 0) >>> 16 & 4; j = l << h; l = (j + 245760 | 0) >>> 16 & 2; B = 14 - (h | f | l) + (j << l >>> 15) | 0; A = g >>> ((B + 7 | 0) >>> 0) & 1 | B << 1 } } while (0); i = c[1216 + (A << 2) >> 2] | 0; L1038: do { if ((i | 0) == 0) { C = 0; D = r; E = 0 } else { if ((A | 0) == 31) { F = 0 } else { F = 25 - (A >>> 1) | 0 } d = 0; m = r; p = i; q = g << F; e = 0; while (1) { B = c[p + 4 >> 2] & -8; l = B - g | 0; if (l >>> 0 < m >>> 0) { if ((B | 0) == (g | 0)) { C = p; D = l; E = p; break L1038 } else { G = p; H = l } } else { G = d; H = m } l = c[p + 20 >> 2] | 0; B = c[p + 16 + (q >>> 31 << 2) >> 2] | 0; j = (l | 0) == 0 | (l | 0) == (B | 0) ? e : l; if ((B | 0) == 0) { C = G; D = H; E = j; break } else { d = G; m = H; p = B; q = q << 1; e = j } } } } while (0); if ((E | 0) == 0 & (C | 0) == 0) { i = 2 << A; r = (i | -i) & k; if ((r | 0) == 0) { o = g; break } i = (r & -r) - 1 | 0; r = i >>> 12 & 16; e = i >>> (r >>> 0); i = e >>> 5 & 8; q = e >>> (i >>> 0); e = q >>> 2 & 4; p = q >>> (e >>> 0); q = p >>> 1 & 2; m = p >>> (q >>> 0); p = m >>> 1 & 1; I = c[1216 + ((i | r | e | q | p) + (m >>> (p >>> 0)) << 2) >> 2] | 0 } else { I = E } if ((I | 0) == 0) { J = D; K = C } else { p = I; m = D; q = C; while (1) { e = (c[p + 4 >> 2] & -8) - g | 0; r = e >>> 0 < m >>> 0; i = r ? e : m; e = r ? p : q; r = c[p + 16 >> 2] | 0; if ((r | 0) != 0) { p = r; m = i; q = e; continue } r = c[p + 20 >> 2] | 0; if ((r | 0) == 0) { J = i; K = e; break } else { p = r; m = i; q = e } } } if ((K | 0) == 0) { o = g; break } if (J >>> 0 >= ((c[230] | 0) - g | 0) >>> 0) { o = g; break } q = K; m = c[232] | 0; if (q >>> 0 < m >>> 0) { aj(); return 0 } p = q + g | 0; k = p; if (q >>> 0 >= p >>> 0) { aj(); return 0 } e = c[K + 24 >> 2] | 0; i = c[K + 12 >> 2] | 0; do { if ((i | 0) == (K | 0)) { r = K + 20 | 0; d = c[r >> 2] | 0; if ((d | 0) == 0) { j = K + 16 | 0; B = c[j >> 2] | 0; if ((B | 0) == 0) { L = 0; break } else { M = B; N = j } } else { M = d; N = r } while (1) { r = M + 20 | 0; d = c[r >> 2] | 0; if ((d | 0) != 0) { M = d; N = r; continue } r = M + 16 | 0; d = c[r >> 2] | 0; if ((d | 0) == 0) { break } else { M = d; N = r } } if (N >>> 0 < m >>> 0) { aj(); return 0 } else { c[N >> 2] = 0; L = M; break } } else { r = c[K + 8 >> 2] | 0; if (r >>> 0 < m >>> 0) { aj(); return 0 } d = r + 12 | 0; if ((c[d >> 2] | 0) != (K | 0)) { aj(); return 0 } j = i + 8 | 0; if ((c[j >> 2] | 0) == (K | 0)) { c[d >> 2] = i; c[j >> 2] = r; L = i; break } else { aj(); return 0 } } } while (0); L1088: do { if ((e | 0) != 0) { i = K + 28 | 0; m = 1216 + (c[i >> 2] << 2) | 0; do { if ((K | 0) == (c[m >> 2] | 0)) { c[m >> 2] = L; if ((L | 0) != 0) { break } c[229] = c[229] & ~(1 << c[i >> 2]); break L1088 } else { if (e >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } r = e + 16 | 0; if ((c[r >> 2] | 0) == (K | 0)) { c[r >> 2] = L } else { c[e + 20 >> 2] = L } if ((L | 0) == 0) { break L1088 } } } while (0); if (L >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } c[L + 24 >> 2] = e; i = c[K + 16 >> 2] | 0; do { if ((i | 0) != 0) { if (i >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[L + 16 >> 2] = i; c[i + 24 >> 2] = L; break } } } while (0); i = c[K + 20 >> 2] | 0; if ((i | 0) == 0) { break } if (i >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[L + 20 >> 2] = i; c[i + 24 >> 2] = L; break } } } while (0); do { if (J >>> 0 < 16) { e = J + g | 0; c[K + 4 >> 2] = e | 3; i = q + (e + 4) | 0; c[i >> 2] = c[i >> 2] | 1 } else { c[K + 4 >> 2] = g | 3; c[q + (g | 4) >> 2] = J | 1; c[q + (J + g) >> 2] = J; i = J >>> 3; if (J >>> 0 < 256) { e = i << 1; m = 952 + (e << 2) | 0; r = c[228] | 0; j = 1 << i; do { if ((r & j | 0) == 0) { c[228] = r | j; O = m; P = 952 + (e + 2 << 2) | 0 } else { i = 952 + (e + 2 << 2) | 0; d = c[i >> 2] | 0; if (d >>> 0 >= (c[232] | 0) >>> 0) { O = d; P = i; break } aj(); return 0 } } while (0); c[P >> 2] = k; c[O + 12 >> 2] = k; c[q + (g + 8) >> 2] = O; c[q + (g + 12) >> 2] = m; break } e = p; j = J >>> 8; do { if ((j | 0) == 0) { Q = 0 } else { if (J >>> 0 > 16777215) { Q = 31; break } r = (j + 1048320 | 0) >>> 16 & 8; i = j << r; d = (i + 520192 | 0) >>> 16 & 4; B = i << d; i = (B + 245760 | 0) >>> 16 & 2; l = 14 - (d | r | i) + (B << i >>> 15) | 0; Q = J >>> ((l + 7 | 0) >>> 0) & 1 | l << 1 } } while (0); j = 1216 + (Q << 2) | 0; c[q + (g + 28) >> 2] = Q; c[q + (g + 20) >> 2] = 0; c[q + (g + 16) >> 2] = 0; m = c[229] | 0; l = 1 << Q; if ((m & l | 0) == 0) { c[229] = m | l; c[j >> 2] = e; c[q + (g + 24) >> 2] = j; c[q + (g + 12) >> 2] = e; c[q + (g + 8) >> 2] = e; break } if ((Q | 0) == 31) { R = 0 } else { R = 25 - (Q >>> 1) | 0 } l = J << R; m = c[j >> 2] | 0; while (1) { if ((c[m + 4 >> 2] & -8 | 0) == (J | 0)) { break } S = m + 16 + (l >>> 31 << 2) | 0; j = c[S >> 2] | 0; if ((j | 0) == 0) { T = 829; break } else { l = l << 1; m = j } } if ((T | 0) == 829) { if (S >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[S >> 2] = e; c[q + (g + 24) >> 2] = m; c[q + (g + 12) >> 2] = e; c[q + (g + 8) >> 2] = e; break } } l = m + 8 | 0; j = c[l >> 2] | 0; i = c[232] | 0; if (m >>> 0 < i >>> 0) { aj(); return 0 } if (j >>> 0 < i >>> 0) { aj(); return 0 } else { c[j + 12 >> 2] = e; c[l >> 2] = e; c[q + (g + 8) >> 2] = j; c[q + (g + 12) >> 2] = m; c[q + (g + 24) >> 2] = 0; break } } } while (0); q = K + 8 | 0; if ((q | 0) == 0) { o = g; break } else { n = q } return n | 0 } } while (0); K = c[230] | 0; if (o >>> 0 <= K >>> 0) { S = K - o | 0; J = c[233] | 0; if (S >>> 0 > 15) { R = J; c[233] = R + o; c[230] = S; c[R + (o + 4) >> 2] = S | 1; c[R + K >> 2] = S; c[J + 4 >> 2] = o | 3 } else { c[230] = 0; c[233] = 0; c[J + 4 >> 2] = K | 3; S = J + (K + 4) | 0; c[S >> 2] = c[S >> 2] | 1 } n = J + 8 | 0; return n | 0 } J = c[231] | 0; if (o >>> 0 < J >>> 0) { S = J - o | 0; c[231] = S; J = c[234] | 0; K = J; c[234] = K + o; c[K + (o + 4) >> 2] = S | 1; c[J + 4 >> 2] = o | 3; n = J + 8 | 0; return n | 0 } do { if ((c[222] | 0) == 0) { J = ao(30) | 0; if ((J - 1 & J | 0) == 0) { c[224] = J; c[223] = J; c[225] = -1; c[226] = -1; c[227] = 0; c[339] = 0; c[222] = (aC(0) | 0) & -16 ^ 1431655768; break } else { aj(); return 0 } } } while (0); J = o + 48 | 0; S = c[224] | 0; K = o + 47 | 0; R = S + K | 0; Q = -S | 0; S = R & Q; if (S >>> 0 <= o >>> 0) { n = 0; return n | 0 } O = c[338] | 0; do { if ((O | 0) != 0) { P = c[336] | 0; L = P + S | 0; if (L >>> 0 <= P >>> 0 | L >>> 0 > O >>> 0) { n = 0 } else { break } return n | 0 } } while (0); L1180: do { if ((c[339] & 4 | 0) == 0) { O = c[234] | 0; L1182: do { if ((O | 0) == 0) { T = 859 } else { L = O; P = 1360; while (1) { U = P | 0; M = c[U >> 2] | 0; if (M >>> 0 <= L >>> 0) { V = P + 4 | 0; if ((M + (c[V >> 2] | 0) | 0) >>> 0 > L >>> 0) { break } } M = c[P + 8 >> 2] | 0; if ((M | 0) == 0) { T = 859; break L1182 } else { P = M } } if ((P | 0) == 0) { T = 859; break } L = R - (c[231] | 0) & Q; if (L >>> 0 >= 2147483647) { W = 0; break } m = ay(L | 0) | 0; e = (m | 0) == ((c[U >> 2] | 0) + (c[V >> 2] | 0) | 0); X = e ? m : -1; Y = e ? L : 0; Z = m; _ = L; T = 868 } } while (0); do { if ((T | 0) == 859) { O = ay(0) | 0; if ((O | 0) == -1) { W = 0; break } g = O; L = c[223] | 0; m = L - 1 | 0; if ((m & g | 0) == 0) { $ = S } else { $ = S - g + (m + g & -L) | 0 } L = c[336] | 0; g = L + $ | 0; if (!($ >>> 0 > o >>> 0 & $ >>> 0 < 2147483647)) { W = 0; break } m = c[338] | 0; if ((m | 0) != 0) { if (g >>> 0 <= L >>> 0 | g >>> 0 > m >>> 0) { W = 0; break } } m = ay($ | 0) | 0; g = (m | 0) == (O | 0); X = g ? O : -1; Y = g ? $ : 0; Z = m; _ = $; T = 868 } } while (0); L1202: do { if ((T | 0) == 868) { m = -_ | 0; if ((X | 0) != -1) { aa = Y; ab = X; T = 879; break L1180 } do { if ((Z | 0) != -1 & _ >>> 0 < 2147483647 & _ >>> 0 < J >>> 0) { g = c[224] | 0; O = K - _ + g & -g; if (O >>> 0 >= 2147483647) { ac = _; break } if ((ay(O | 0) | 0) == -1) { ay(m | 0) | 0; W = Y; break L1202 } else { ac = O + _ | 0; break } } else { ac = _ } } while (0); if ((Z | 0) == -1) { W = Y } else { aa = ac; ab = Z; T = 879; break L1180 } } } while (0); c[339] = c[339] | 4; ad = W; T = 876 } else { ad = 0; T = 876 } } while (0); do { if ((T | 0) == 876) { if (S >>> 0 >= 2147483647) { break } W = ay(S | 0) | 0; Z = ay(0) | 0; if (!((Z | 0) != -1 & (W | 0) != -1 & W >>> 0 < Z >>> 0)) { break } ac = Z - W | 0; Z = ac >>> 0 > (o + 40 | 0) >>> 0; Y = Z ? W : -1; if ((Y | 0) != -1) { aa = Z ? ac : ad; ab = Y; T = 879 } } } while (0); do { if ((T | 0) == 879) { ad = (c[336] | 0) + aa | 0; c[336] = ad; if (ad >>> 0 > (c[337] | 0) >>> 0) { c[337] = ad } ad = c[234] | 0; L1222: do { if ((ad | 0) == 0) { S = c[232] | 0; if ((S | 0) == 0 | ab >>> 0 < S >>> 0) { c[232] = ab } c[340] = ab; c[341] = aa; c[343] = 0; c[237] = c[222]; c[236] = -1; S = 0; do { Y = S << 1; ac = 952 + (Y << 2) | 0; c[952 + (Y + 3 << 2) >> 2] = ac; c[952 + (Y + 2 << 2) >> 2] = ac; S = S + 1 | 0; } while (S >>> 0 < 32); S = ab + 8 | 0; if ((S & 7 | 0) == 0) { ae = 0 } else { ae = -S & 7 } S = aa - 40 - ae | 0; c[234] = ab + ae; c[231] = S; c[ab + (ae + 4) >> 2] = S | 1; c[ab + (aa - 36) >> 2] = 40; c[235] = c[226] } else { S = 1360; while (1) { af = c[S >> 2] | 0; ag = S + 4 | 0; ah = c[ag >> 2] | 0; if ((ab | 0) == (af + ah | 0)) { T = 891; break } ac = c[S + 8 >> 2] | 0; if ((ac | 0) == 0) { break } else { S = ac } } do { if ((T | 0) == 891) { if ((c[S + 12 >> 2] & 8 | 0) != 0) { break } ac = ad; if (!(ac >>> 0 >= af >>> 0 & ac >>> 0 < ab >>> 0)) { break } c[ag >> 2] = ah + aa; ac = c[234] | 0; Y = (c[231] | 0) + aa | 0; Z = ac; W = ac + 8 | 0; if ((W & 7 | 0) == 0) { ai = 0 } else { ai = -W & 7 } W = Y - ai | 0; c[234] = Z + ai; c[231] = W; c[Z + (ai + 4) >> 2] = W | 1; c[Z + (Y + 4) >> 2] = 40; c[235] = c[226]; break L1222 } } while (0); if (ab >>> 0 < (c[232] | 0) >>> 0) { c[232] = ab } S = ab + aa | 0; Y = 1360; while (1) { ak = Y | 0; if ((c[ak >> 2] | 0) == (S | 0)) { T = 901; break } Z = c[Y + 8 >> 2] | 0; if ((Z | 0) == 0) { break } else { Y = Z } } do { if ((T | 0) == 901) { if ((c[Y + 12 >> 2] & 8 | 0) != 0) { break } c[ak >> 2] = ab; S = Y + 4 | 0; c[S >> 2] = (c[S >> 2] | 0) + aa; S = ab + 8 | 0; if ((S & 7 | 0) == 0) { al = 0 } else { al = -S & 7 } S = ab + (aa + 8) | 0; if ((S & 7 | 0) == 0) { am = 0 } else { am = -S & 7 } S = ab + (am + aa) | 0; Z = S; W = al + o | 0; ac = ab + W | 0; _ = ac; K = S - (ab + al) - o | 0; c[ab + (al + 4) >> 2] = o | 3; do { if ((Z | 0) == (c[234] | 0)) { J = (c[231] | 0) + K | 0; c[231] = J; c[234] = _; c[ab + (W + 4) >> 2] = J | 1 } else { if ((Z | 0) == (c[233] | 0)) { J = (c[230] | 0) + K | 0; c[230] = J; c[233] = _; c[ab + (W + 4) >> 2] = J | 1; c[ab + (J + W) >> 2] = J; break } J = aa + 4 | 0; X = c[ab + (am + J) >> 2] | 0; if ((X & 3 | 0) == 1) { $ = X & -8; V = X >>> 3; L1267: do { if (X >>> 0 < 256) { U = c[ab + ((am | 8) + aa) >> 2] | 0; Q = c[ab + (aa + 12 + am) >> 2] | 0; R = 952 + (V << 1 << 2) | 0; do { if ((U | 0) != (R | 0)) { if (U >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } if ((c[U + 12 >> 2] | 0) == (Z | 0)) { break } aj(); return 0 } } while (0); if ((Q | 0) == (U | 0)) { c[228] = c[228] & ~(1 << V); break } do { if ((Q | 0) == (R | 0)) { an = Q + 8 | 0 } else { if (Q >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } m = Q + 8 | 0; if ((c[m >> 2] | 0) == (Z | 0)) { an = m; break } aj(); return 0 } } while (0); c[U + 12 >> 2] = Q; c[an >> 2] = U } else { R = S; m = c[ab + ((am | 24) + aa) >> 2] | 0; P = c[ab + (aa + 12 + am) >> 2] | 0; do { if ((P | 0) == (R | 0)) { O = am | 16; g = ab + (O + J) | 0; L = c[g >> 2] | 0; if ((L | 0) == 0) { e = ab + (O + aa) | 0; O = c[e >> 2] | 0; if ((O | 0) == 0) { ap = 0; break } else { aq = O; ar = e } } else { aq = L; ar = g } while (1) { g = aq + 20 | 0; L = c[g >> 2] | 0; if ((L | 0) != 0) { aq = L; ar = g; continue } g = aq + 16 | 0; L = c[g >> 2] | 0; if ((L | 0) == 0) { break } else { aq = L; ar = g } } if (ar >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[ar >> 2] = 0; ap = aq; break } } else { g = c[ab + ((am | 8) + aa) >> 2] | 0; if (g >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } L = g + 12 | 0; if ((c[L >> 2] | 0) != (R | 0)) { aj(); return 0 } e = P + 8 | 0; if ((c[e >> 2] | 0) == (R | 0)) { c[L >> 2] = P; c[e >> 2] = g; ap = P; break } else { aj(); return 0 } } } while (0); if ((m | 0) == 0) { break } P = ab + (aa + 28 + am) | 0; U = 1216 + (c[P >> 2] << 2) | 0; do { if ((R | 0) == (c[U >> 2] | 0)) { c[U >> 2] = ap; if ((ap | 0) != 0) { break } c[229] = c[229] & ~(1 << c[P >> 2]); break L1267 } else { if (m >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } Q = m + 16 | 0; if ((c[Q >> 2] | 0) == (R | 0)) { c[Q >> 2] = ap } else { c[m + 20 >> 2] = ap } if ((ap | 0) == 0) { break L1267 } } } while (0); if (ap >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } c[ap + 24 >> 2] = m; R = am | 16; P = c[ab + (R + aa) >> 2] | 0; do { if ((P | 0) != 0) { if (P >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[ap + 16 >> 2] = P; c[P + 24 >> 2] = ap; break } } } while (0); P = c[ab + (R + J) >> 2] | 0; if ((P | 0) == 0) { break } if (P >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[ap + 20 >> 2] = P; c[P + 24 >> 2] = ap; break } } } while (0); as = ab + (($ | am) + aa) | 0; at = $ + K | 0 } else { as = Z; at = K } J = as + 4 | 0; c[J >> 2] = c[J >> 2] & -2; c[ab + (W + 4) >> 2] = at | 1; c[ab + (at + W) >> 2] = at; J = at >>> 3; if (at >>> 0 < 256) { V = J << 1; X = 952 + (V << 2) | 0; P = c[228] | 0; m = 1 << J; do { if ((P & m | 0) == 0) { c[228] = P | m; au = X; av = 952 + (V + 2 << 2) | 0 } else { J = 952 + (V + 2 << 2) | 0; U = c[J >> 2] | 0; if (U >>> 0 >= (c[232] | 0) >>> 0) { au = U; av = J; break } aj(); return 0 } } while (0); c[av >> 2] = _; c[au + 12 >> 2] = _; c[ab + (W + 8) >> 2] = au; c[ab + (W + 12) >> 2] = X; break } V = ac; m = at >>> 8; do { if ((m | 0) == 0) { aw = 0 } else { if (at >>> 0 > 16777215) { aw = 31; break } P = (m + 1048320 | 0) >>> 16 & 8; $ = m << P; J = ($ + 520192 | 0) >>> 16 & 4; U = $ << J; $ = (U + 245760 | 0) >>> 16 & 2; Q = 14 - (J | P | $) + (U << $ >>> 15) | 0; aw = at >>> ((Q + 7 | 0) >>> 0) & 1 | Q << 1 } } while (0); m = 1216 + (aw << 2) | 0; c[ab + (W + 28) >> 2] = aw; c[ab + (W + 20) >> 2] = 0; c[ab + (W + 16) >> 2] = 0; X = c[229] | 0; Q = 1 << aw; if ((X & Q | 0) == 0) { c[229] = X | Q; c[m >> 2] = V; c[ab + (W + 24) >> 2] = m; c[ab + (W + 12) >> 2] = V; c[ab + (W + 8) >> 2] = V; break } if ((aw | 0) == 31) { ax = 0 } else { ax = 25 - (aw >>> 1) | 0 } Q = at << ax; X = c[m >> 2] | 0; while (1) { if ((c[X + 4 >> 2] & -8 | 0) == (at | 0)) { break } aA = X + 16 + (Q >>> 31 << 2) | 0; m = c[aA >> 2] | 0; if ((m | 0) == 0) { T = 974; break } else { Q = Q << 1; X = m } } if ((T | 0) == 974) { if (aA >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[aA >> 2] = V; c[ab + (W + 24) >> 2] = X; c[ab + (W + 12) >> 2] = V; c[ab + (W + 8) >> 2] = V; break } } Q = X + 8 | 0; m = c[Q >> 2] | 0; $ = c[232] | 0; if (X >>> 0 < $ >>> 0) { aj(); return 0 } if (m >>> 0 < $ >>> 0) { aj(); return 0 } else { c[m + 12 >> 2] = V; c[Q >> 2] = V; c[ab + (W + 8) >> 2] = m; c[ab + (W + 12) >> 2] = X; c[ab + (W + 24) >> 2] = 0; break } } } while (0); n = ab + (al | 8) | 0; return n | 0 } } while (0); Y = ad; W = 1360; while (1) { aB = c[W >> 2] | 0; if (aB >>> 0 <= Y >>> 0) { aD = c[W + 4 >> 2] | 0; aE = aB + aD | 0; if (aE >>> 0 > Y >>> 0) { break } } W = c[W + 8 >> 2] | 0 } W = aB + (aD - 39) | 0; if ((W & 7 | 0) == 0) { aF = 0 } else { aF = -W & 7 } W = aB + (aD - 47 + aF) | 0; ac = W >>> 0 < (ad + 16 | 0) >>> 0 ? Y : W; W = ac + 8 | 0; _ = ab + 8 | 0; if ((_ & 7 | 0) == 0) { aG = 0 } else { aG = -_ & 7 } _ = aa - 40 - aG | 0; c[234] = ab + aG; c[231] = _; c[ab + (aG + 4) >> 2] = _ | 1; c[ab + (aa - 36) >> 2] = 40; c[235] = c[226]; c[ac + 4 >> 2] = 27; c[W >> 2] = c[340]; c[W + 4 >> 2] = c[341]; c[W + 8 >> 2] = c[342]; c[W + 12 >> 2] = c[343]; c[340] = ab; c[341] = aa; c[343] = 0; c[342] = W; W = ac + 28 | 0; c[W >> 2] = 7; if ((ac + 32 | 0) >>> 0 < aE >>> 0) { _ = W; while (1) { W = _ + 4 | 0; c[W >> 2] = 7; if ((_ + 8 | 0) >>> 0 < aE >>> 0) { _ = W } else { break } } } if ((ac | 0) == (Y | 0)) { break } _ = ac - ad | 0; W = Y + (_ + 4) | 0; c[W >> 2] = c[W >> 2] & -2; c[ad + 4 >> 2] = _ | 1; c[Y + _ >> 2] = _; W = _ >>> 3; if (_ >>> 0 < 256) { K = W << 1; Z = 952 + (K << 2) | 0; S = c[228] | 0; m = 1 << W; do { if ((S & m | 0) == 0) { c[228] = S | m; aH = Z; aI = 952 + (K + 2 << 2) | 0 } else { W = 952 + (K + 2 << 2) | 0; Q = c[W >> 2] | 0; if (Q >>> 0 >= (c[232] | 0) >>> 0) { aH = Q; aI = W; break } aj(); return 0 } } while (0); c[aI >> 2] = ad; c[aH + 12 >> 2] = ad; c[ad + 8 >> 2] = aH; c[ad + 12 >> 2] = Z; break } K = ad; m = _ >>> 8; do { if ((m | 0) == 0) { aJ = 0 } else { if (_ >>> 0 > 16777215) { aJ = 31; break } S = (m + 1048320 | 0) >>> 16 & 8; Y = m << S; ac = (Y + 520192 | 0) >>> 16 & 4; W = Y << ac; Y = (W + 245760 | 0) >>> 16 & 2; Q = 14 - (ac | S | Y) + (W << Y >>> 15) | 0; aJ = _ >>> ((Q + 7 | 0) >>> 0) & 1 | Q << 1 } } while (0); m = 1216 + (aJ << 2) | 0; c[ad + 28 >> 2] = aJ; c[ad + 20 >> 2] = 0; c[ad + 16 >> 2] = 0; Z = c[229] | 0; Q = 1 << aJ; if ((Z & Q | 0) == 0) { c[229] = Z | Q; c[m >> 2] = K; c[ad + 24 >> 2] = m; c[ad + 12 >> 2] = ad; c[ad + 8 >> 2] = ad; break } if ((aJ | 0) == 31) { aK = 0 } else { aK = 25 - (aJ >>> 1) | 0 } Q = _ << aK; Z = c[m >> 2] | 0; while (1) { if ((c[Z + 4 >> 2] & -8 | 0) == (_ | 0)) { break } aL = Z + 16 + (Q >>> 31 << 2) | 0; m = c[aL >> 2] | 0; if ((m | 0) == 0) { T = 1009; break } else { Q = Q << 1; Z = m } } if ((T | 0) == 1009) { if (aL >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[aL >> 2] = K; c[ad + 24 >> 2] = Z; c[ad + 12 >> 2] = ad; c[ad + 8 >> 2] = ad; break } } Q = Z + 8 | 0; _ = c[Q >> 2] | 0; m = c[232] | 0; if (Z >>> 0 < m >>> 0) { aj(); return 0 } if (_ >>> 0 < m >>> 0) { aj(); return 0 } else { c[_ + 12 >> 2] = K; c[Q >> 2] = K; c[ad + 8 >> 2] = _; c[ad + 12 >> 2] = Z; c[ad + 24 >> 2] = 0; break } } } while (0); ad = c[231] | 0; if (ad >>> 0 <= o >>> 0) { break } _ = ad - o | 0; c[231] = _; ad = c[234] | 0; Q = ad; c[234] = Q + o; c[Q + (o + 4) >> 2] = _ | 1; c[ad + 4 >> 2] = o | 3; n = ad + 8 | 0; return n | 0 } } while (0); c[(az() | 0) >> 2] = 12; n = 0; return n | 0 } function bf(a) { a = a | 0; var b = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0; if ((a | 0) == 0) { return } b = a - 8 | 0; d = b; e = c[232] | 0; if (b >>> 0 < e >>> 0) { aj() } f = c[a - 4 >> 2] | 0; g = f & 3; if ((g | 0) == 1) { aj() } h = f & -8; i = a + (h - 8) | 0; j = i; L1439: do { if ((f & 1 | 0) == 0) { k = c[b >> 2] | 0; if ((g | 0) == 0) { return } l = -8 - k | 0; m = a + l | 0; n = m; o = k + h | 0; if (m >>> 0 < e >>> 0) { aj() } if ((n | 0) == (c[233] | 0)) { p = a + (h - 4) | 0; if ((c[p >> 2] & 3 | 0) != 3) { q = n; r = o; break } c[230] = o; c[p >> 2] = c[p >> 2] & -2; c[a + (l + 4) >> 2] = o | 1; c[i >> 2] = o; return } p = k >>> 3; if (k >>> 0 < 256) { k = c[a + (l + 8) >> 2] | 0; s = c[a + (l + 12) >> 2] | 0; t = 952 + (p << 1 << 2) | 0; do { if ((k | 0) != (t | 0)) { if (k >>> 0 < e >>> 0) { aj() } if ((c[k + 12 >> 2] | 0) == (n | 0)) { break } aj() } } while (0); if ((s | 0) == (k | 0)) { c[228] = c[228] & ~(1 << p); q = n; r = o; break } do { if ((s | 0) == (t | 0)) { u = s + 8 | 0 } else { if (s >>> 0 < e >>> 0) { aj() } v = s + 8 | 0; if ((c[v >> 2] | 0) == (n | 0)) { u = v; break } aj() } } while (0); c[k + 12 >> 2] = s; c[u >> 2] = k; q = n; r = o; break } t = m; p = c[a + (l + 24) >> 2] | 0; v = c[a + (l + 12) >> 2] | 0; do { if ((v | 0) == (t | 0)) { w = a + (l + 20) | 0; x = c[w >> 2] | 0; if ((x | 0) == 0) { y = a + (l + 16) | 0; z = c[y >> 2] | 0; if ((z | 0) == 0) { A = 0; break } else { B = z; C = y } } else { B = x; C = w } while (1) { w = B + 20 | 0; x = c[w >> 2] | 0; if ((x | 0) != 0) { B = x; C = w; continue } w = B + 16 | 0; x = c[w >> 2] | 0; if ((x | 0) == 0) { break } else { B = x; C = w } } if (C >>> 0 < e >>> 0) { aj() } else { c[C >> 2] = 0; A = B; break } } else { w = c[a + (l + 8) >> 2] | 0; if (w >>> 0 < e >>> 0) { aj() } x = w + 12 | 0; if ((c[x >> 2] | 0) != (t | 0)) { aj() } y = v + 8 | 0; if ((c[y >> 2] | 0) == (t | 0)) { c[x >> 2] = v; c[y >> 2] = w; A = v; break } else { aj() } } } while (0); if ((p | 0) == 0) { q = n; r = o; break } v = a + (l + 28) | 0; m = 1216 + (c[v >> 2] << 2) | 0; do { if ((t | 0) == (c[m >> 2] | 0)) { c[m >> 2] = A; if ((A | 0) != 0) { break } c[229] = c[229] & ~(1 << c[v >> 2]); q = n; r = o; break L1439 } else { if (p >>> 0 < (c[232] | 0) >>> 0) { aj() } k = p + 16 | 0; if ((c[k >> 2] | 0) == (t | 0)) { c[k >> 2] = A } else { c[p + 20 >> 2] = A } if ((A | 0) == 0) { q = n; r = o; break L1439 } } } while (0); if (A >>> 0 < (c[232] | 0) >>> 0) { aj() } c[A + 24 >> 2] = p; t = c[a + (l + 16) >> 2] | 0; do { if ((t | 0) != 0) { if (t >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[A + 16 >> 2] = t; c[t + 24 >> 2] = A; break } } } while (0); t = c[a + (l + 20) >> 2] | 0; if ((t | 0) == 0) { q = n; r = o; break } if (t >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[A + 20 >> 2] = t; c[t + 24 >> 2] = A; q = n; r = o; break } } else { q = d; r = h } } while (0); d = q; if (d >>> 0 >= i >>> 0) { aj() } A = a + (h - 4) | 0; e = c[A >> 2] | 0; if ((e & 1 | 0) == 0) { aj() } do { if ((e & 2 | 0) == 0) { if ((j | 0) == (c[234] | 0)) { B = (c[231] | 0) + r | 0; c[231] = B; c[234] = q; c[q + 4 >> 2] = B | 1; if ((q | 0) != (c[233] | 0)) { return } c[233] = 0; c[230] = 0; return } if ((j | 0) == (c[233] | 0)) { B = (c[230] | 0) + r | 0; c[230] = B; c[233] = q; c[q + 4 >> 2] = B | 1; c[d + B >> 2] = B; return } B = (e & -8) + r | 0; C = e >>> 3; L1542: do { if (e >>> 0 < 256) { u = c[a + h >> 2] | 0; g = c[a + (h | 4) >> 2] | 0; b = 952 + (C << 1 << 2) | 0; do { if ((u | 0) != (b | 0)) { if (u >>> 0 < (c[232] | 0) >>> 0) { aj() } if ((c[u + 12 >> 2] | 0) == (j | 0)) { break } aj() } } while (0); if ((g | 0) == (u | 0)) { c[228] = c[228] & ~(1 << C); break } do { if ((g | 0) == (b | 0)) { D = g + 8 | 0 } else { if (g >>> 0 < (c[232] | 0) >>> 0) { aj() } f = g + 8 | 0; if ((c[f >> 2] | 0) == (j | 0)) { D = f; break } aj() } } while (0); c[u + 12 >> 2] = g; c[D >> 2] = u } else { b = i; f = c[a + (h + 16) >> 2] | 0; t = c[a + (h | 4) >> 2] | 0; do { if ((t | 0) == (b | 0)) { p = a + (h + 12) | 0; v = c[p >> 2] | 0; if ((v | 0) == 0) { m = a + (h + 8) | 0; k = c[m >> 2] | 0; if ((k | 0) == 0) { E = 0; break } else { F = k; G = m } } else { F = v; G = p } while (1) { p = F + 20 | 0; v = c[p >> 2] | 0; if ((v | 0) != 0) { F = v; G = p; continue } p = F + 16 | 0; v = c[p >> 2] | 0; if ((v | 0) == 0) { break } else { F = v; G = p } } if (G >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[G >> 2] = 0; E = F; break } } else { p = c[a + h >> 2] | 0; if (p >>> 0 < (c[232] | 0) >>> 0) { aj() } v = p + 12 | 0; if ((c[v >> 2] | 0) != (b | 0)) { aj() } m = t + 8 | 0; if ((c[m >> 2] | 0) == (b | 0)) { c[v >> 2] = t; c[m >> 2] = p; E = t; break } else { aj() } } } while (0); if ((f | 0) == 0) { break } t = a + (h + 20) | 0; u = 1216 + (c[t >> 2] << 2) | 0; do { if ((b | 0) == (c[u >> 2] | 0)) { c[u >> 2] = E; if ((E | 0) != 0) { break } c[229] = c[229] & ~(1 << c[t >> 2]); break L1542 } else { if (f >>> 0 < (c[232] | 0) >>> 0) { aj() } g = f + 16 | 0; if ((c[g >> 2] | 0) == (b | 0)) { c[g >> 2] = E } else { c[f + 20 >> 2] = E } if ((E | 0) == 0) { break L1542 } } } while (0); if (E >>> 0 < (c[232] | 0) >>> 0) { aj() } c[E + 24 >> 2] = f; b = c[a + (h + 8) >> 2] | 0; do { if ((b | 0) != 0) { if (b >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[E + 16 >> 2] = b; c[b + 24 >> 2] = E; break } } } while (0); b = c[a + (h + 12) >> 2] | 0; if ((b | 0) == 0) { break } if (b >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[E + 20 >> 2] = b; c[b + 24 >> 2] = E; break } } } while (0); c[q + 4 >> 2] = B | 1; c[d + B >> 2] = B; if ((q | 0) != (c[233] | 0)) { H = B; break } c[230] = B; return } else { c[A >> 2] = e & -2; c[q + 4 >> 2] = r | 1; c[d + r >> 2] = r; H = r } } while (0); r = H >>> 3; if (H >>> 0 < 256) { d = r << 1; e = 952 + (d << 2) | 0; A = c[228] | 0; E = 1 << r; do { if ((A & E | 0) == 0) { c[228] = A | E; I = e; J = 952 + (d + 2 << 2) | 0 } else { r = 952 + (d + 2 << 2) | 0; h = c[r >> 2] | 0; if (h >>> 0 >= (c[232] | 0) >>> 0) { I = h; J = r; break } aj() } } while (0); c[J >> 2] = q; c[I + 12 >> 2] = q; c[q + 8 >> 2] = I; c[q + 12 >> 2] = e; return } e = q; I = H >>> 8; do { if ((I | 0) == 0) { K = 0 } else { if (H >>> 0 > 16777215) { K = 31; break } J = (I + 1048320 | 0) >>> 16 & 8; d = I << J; E = (d + 520192 | 0) >>> 16 & 4; A = d << E; d = (A + 245760 | 0) >>> 16 & 2; r = 14 - (E | J | d) + (A << d >>> 15) | 0; K = H >>> ((r + 7 | 0) >>> 0) & 1 | r << 1 } } while (0); I = 1216 + (K << 2) | 0; c[q + 28 >> 2] = K; c[q + 20 >> 2] = 0; c[q + 16 >> 2] = 0; r = c[229] | 0; d = 1 << K; do { if ((r & d | 0) == 0) { c[229] = r | d; c[I >> 2] = e; c[q + 24 >> 2] = I; c[q + 12 >> 2] = q; c[q + 8 >> 2] = q } else { if ((K | 0) == 31) { L = 0 } else { L = 25 - (K >>> 1) | 0 } A = H << L; J = c[I >> 2] | 0; while (1) { if ((c[J + 4 >> 2] & -8 | 0) == (H | 0)) { break } M = J + 16 + (A >>> 31 << 2) | 0; E = c[M >> 2] | 0; if ((E | 0) == 0) { N = 1186; break } else { A = A << 1; J = E } } if ((N | 0) == 1186) { if (M >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[M >> 2] = e; c[q + 24 >> 2] = J; c[q + 12 >> 2] = q; c[q + 8 >> 2] = q; break } } A = J + 8 | 0; B = c[A >> 2] | 0; E = c[232] | 0; if (J >>> 0 < E >>> 0) { aj() } if (B >>> 0 < E >>> 0) { aj() } else { c[B + 12 >> 2] = e; c[A >> 2] = e; c[q + 8 >> 2] = B; c[q + 12 >> 2] = J; c[q + 24 >> 2] = 0; break } } } while (0); q = (c[236] | 0) - 1 | 0; c[236] = q; if ((q | 0) == 0) { O = 1368 } else { return } while (1) { q = c[O >> 2] | 0; if ((q | 0) == 0) { break } else { O = q + 8 | 0 } } c[236] = -1; return } function bg(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0; if ((a | 0) == 0) { d = be(b) | 0; return d | 0 } if (b >>> 0 > 4294967231) { c[(az() | 0) >> 2] = 12; d = 0; return d | 0 } if (b >>> 0 < 11) { e = 16 } else { e = b + 11 & -8 } f = a - 8 | 0; g = a - 4 | 0; h = c[g >> 2] | 0; i = h & -8; j = i - 8 | 0; k = a + j | 0; l = k; m = c[232] | 0; if (f >>> 0 < m >>> 0) { aj(); return 0 } n = h & 3; if (!((n | 0) != 1 & (j | 0) > -8)) { aj(); return 0 } j = i | 4; o = a + (j - 8) | 0; p = c[o >> 2] | 0; if ((p & 1 | 0) == 0) { aj(); return 0 } L1677: do { if ((n | 0) == 0) { if (e >>> 0 < 256 | i >>> 0 < (e | 4) >>> 0) { break } if ((i - e | 0) >>> 0 > c[224] << 1 >>> 0 | (f | 0) == 0) { break } else { d = a } return d | 0 } else { do { if (i >>> 0 < e >>> 0) { if ((l | 0) == (c[234] | 0)) { q = (c[231] | 0) + i | 0; if (q >>> 0 <= e >>> 0) { break L1677 } r = q - e | 0; c[g >> 2] = h & 1 | e | 2; c[a + ((e | 4) - 8) >> 2] = r | 1; c[234] = a + (e - 8); c[231] = r; break } if ((l | 0) == (c[233] | 0)) { r = (c[230] | 0) + i | 0; if (r >>> 0 < e >>> 0) { break L1677 } q = r - e | 0; if (q >>> 0 > 15) { c[g >> 2] = h & 1 | e | 2; c[a + ((e | 4) - 8) >> 2] = q | 1; c[a + (r - 8) >> 2] = q; s = a + (r - 4) | 0; c[s >> 2] = c[s >> 2] & -2; t = a + (e - 8) | 0; u = q } else { c[g >> 2] = h & 1 | r | 2; q = a + (r - 4) | 0; c[q >> 2] = c[q >> 2] | 1; t = 0; u = 0 } c[230] = u; c[233] = t; break } if ((p & 2 | 0) != 0) { break L1677 } q = (p & -8) + i | 0; if (q >>> 0 < e >>> 0) { break L1677 } r = q - e | 0; s = p >>> 3; L1695: do { if (p >>> 0 < 256) { v = c[a + i >> 2] | 0; w = c[a + j >> 2] | 0; x = 952 + (s << 1 << 2) | 0; do { if ((v | 0) != (x | 0)) { if (v >>> 0 < m >>> 0) { aj(); return 0 } if ((c[v + 12 >> 2] | 0) == (l | 0)) { break } aj(); return 0 } } while (0); if ((w | 0) == (v | 0)) { c[228] = c[228] & ~(1 << s); break } do { if ((w | 0) == (x | 0)) { y = w + 8 | 0 } else { if (w >>> 0 < m >>> 0) { aj(); return 0 } z = w + 8 | 0; if ((c[z >> 2] | 0) == (l | 0)) { y = z; break } aj(); return 0 } } while (0); c[v + 12 >> 2] = w; c[y >> 2] = v } else { x = k; z = c[a + (i + 16) >> 2] | 0; A = c[a + j >> 2] | 0; do { if ((A | 0) == (x | 0)) { B = a + (i + 12) | 0; C = c[B >> 2] | 0; if ((C | 0) == 0) { D = a + (i + 8) | 0; E = c[D >> 2] | 0; if ((E | 0) == 0) { F = 0; break } else { G = E; H = D } } else { G = C; H = B } while (1) { B = G + 20 | 0; C = c[B >> 2] | 0; if ((C | 0) != 0) { G = C; H = B; continue } B = G + 16 | 0; C = c[B >> 2] | 0; if ((C | 0) == 0) { break } else { G = C; H = B } } if (H >>> 0 < m >>> 0) { aj(); return 0 } else { c[H >> 2] = 0; F = G; break } } else { B = c[a + i >> 2] | 0; if (B >>> 0 < m >>> 0) { aj(); return 0 } C = B + 12 | 0; if ((c[C >> 2] | 0) != (x | 0)) { aj(); return 0 } D = A + 8 | 0; if ((c[D >> 2] | 0) == (x | 0)) { c[C >> 2] = A; c[D >> 2] = B; F = A; break } else { aj(); return 0 } } } while (0); if ((z | 0) == 0) { break } A = a + (i + 20) | 0; v = 1216 + (c[A >> 2] << 2) | 0; do { if ((x | 0) == (c[v >> 2] | 0)) { c[v >> 2] = F; if ((F | 0) != 0) { break } c[229] = c[229] & ~(1 << c[A >> 2]); break L1695 } else { if (z >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } w = z + 16 | 0; if ((c[w >> 2] | 0) == (x | 0)) { c[w >> 2] = F } else { c[z + 20 >> 2] = F } if ((F | 0) == 0) { break L1695 } } } while (0); if (F >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } c[F + 24 >> 2] = z; x = c[a + (i + 8) >> 2] | 0; do { if ((x | 0) != 0) { if (x >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[F + 16 >> 2] = x; c[x + 24 >> 2] = F; break } } } while (0); x = c[a + (i + 12) >> 2] | 0; if ((x | 0) == 0) { break } if (x >>> 0 < (c[232] | 0) >>> 0) { aj(); return 0 } else { c[F + 20 >> 2] = x; c[x + 24 >> 2] = F; break } } } while (0); if (r >>> 0 >= 16) { c[g >> 2] = c[g >> 2] & 1 | e | 2; c[a + ((e | 4) - 8) >> 2] = r | 3; s = a + ((q | 4) - 8) | 0; c[s >> 2] = c[s >> 2] | 1; bh(a + (e - 8) | 0, r); break } c[g >> 2] = q | c[g >> 2] & 1 | 2; s = a + ((q | 4) - 8) | 0; c[s >> 2] = c[s >> 2] | 1; d = a; return d | 0 } else { s = i - e | 0; if (s >>> 0 <= 15) { break } c[g >> 2] = h & 1 | e | 2; c[a + ((e | 4) - 8) >> 2] = s | 3; c[o >> 2] = c[o >> 2] | 1; bh(a + (e - 8) | 0, s); d = a; return d | 0 } } while (0); if ((f | 0) == 0) { break } else { d = a } return d | 0 } } while (0); f = be(b) | 0; if ((f | 0) == 0) { d = 0; return d | 0 } e = c[g >> 2] | 0; g = (e & -8) - ((e & 3 | 0) == 0 ? 8 : 4) | 0; e = g >>> 0 < b >>> 0 ? g : b; bk(f | 0, a | 0, e) | 0; bf(a); d = f; return d | 0 } function bh(a, b) { a = a | 0; b = b | 0; var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0; d = a; e = d + b | 0; f = e; g = c[a + 4 >> 2] | 0; L1783: do { if ((g & 1 | 0) == 0) { h = c[a >> 2] | 0; if ((g & 3 | 0) == 0) { return } i = d + (-h | 0) | 0; j = i; k = h + b | 0; l = c[232] | 0; if (i >>> 0 < l >>> 0) { aj() } if ((j | 0) == (c[233] | 0)) { m = d + (b + 4) | 0; if ((c[m >> 2] & 3 | 0) != 3) { n = j; o = k; break } c[230] = k; c[m >> 2] = c[m >> 2] & -2; c[d + (4 - h) >> 2] = k | 1; c[e >> 2] = k; return } m = h >>> 3; if (h >>> 0 < 256) { p = c[d + (8 - h) >> 2] | 0; q = c[d + (12 - h) >> 2] | 0; r = 952 + (m << 1 << 2) | 0; do { if ((p | 0) != (r | 0)) { if (p >>> 0 < l >>> 0) { aj() } if ((c[p + 12 >> 2] | 0) == (j | 0)) { break } aj() } } while (0); if ((q | 0) == (p | 0)) { c[228] = c[228] & ~(1 << m); n = j; o = k; break } do { if ((q | 0) == (r | 0)) { s = q + 8 | 0 } else { if (q >>> 0 < l >>> 0) { aj() } t = q + 8 | 0; if ((c[t >> 2] | 0) == (j | 0)) { s = t; break } aj() } } while (0); c[p + 12 >> 2] = q; c[s >> 2] = p; n = j; o = k; break } r = i; m = c[d + (24 - h) >> 2] | 0; t = c[d + (12 - h) >> 2] | 0; do { if ((t | 0) == (r | 0)) { u = 16 - h | 0; v = d + (u + 4) | 0; w = c[v >> 2] | 0; if ((w | 0) == 0) { x = d + u | 0; u = c[x >> 2] | 0; if ((u | 0) == 0) { y = 0; break } else { z = u; A = x } } else { z = w; A = v } while (1) { v = z + 20 | 0; w = c[v >> 2] | 0; if ((w | 0) != 0) { z = w; A = v; continue } v = z + 16 | 0; w = c[v >> 2] | 0; if ((w | 0) == 0) { break } else { z = w; A = v } } if (A >>> 0 < l >>> 0) { aj() } else { c[A >> 2] = 0; y = z; break } } else { v = c[d + (8 - h) >> 2] | 0; if (v >>> 0 < l >>> 0) { aj() } w = v + 12 | 0; if ((c[w >> 2] | 0) != (r | 0)) { aj() } x = t + 8 | 0; if ((c[x >> 2] | 0) == (r | 0)) { c[w >> 2] = t; c[x >> 2] = v; y = t; break } else { aj() } } } while (0); if ((m | 0) == 0) { n = j; o = k; break } t = d + (28 - h) | 0; l = 1216 + (c[t >> 2] << 2) | 0; do { if ((r | 0) == (c[l >> 2] | 0)) { c[l >> 2] = y; if ((y | 0) != 0) { break } c[229] = c[229] & ~(1 << c[t >> 2]); n = j; o = k; break L1783 } else { if (m >>> 0 < (c[232] | 0) >>> 0) { aj() } i = m + 16 | 0; if ((c[i >> 2] | 0) == (r | 0)) { c[i >> 2] = y } else { c[m + 20 >> 2] = y } if ((y | 0) == 0) { n = j; o = k; break L1783 } } } while (0); if (y >>> 0 < (c[232] | 0) >>> 0) { aj() } c[y + 24 >> 2] = m; r = 16 - h | 0; t = c[d + r >> 2] | 0; do { if ((t | 0) != 0) { if (t >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[y + 16 >> 2] = t; c[t + 24 >> 2] = y; break } } } while (0); t = c[d + (r + 4) >> 2] | 0; if ((t | 0) == 0) { n = j; o = k; break } if (t >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[y + 20 >> 2] = t; c[t + 24 >> 2] = y; n = j; o = k; break } } else { n = a; o = b } } while (0); a = c[232] | 0; if (e >>> 0 < a >>> 0) { aj() } y = d + (b + 4) | 0; z = c[y >> 2] | 0; do { if ((z & 2 | 0) == 0) { if ((f | 0) == (c[234] | 0)) { A = (c[231] | 0) + o | 0; c[231] = A; c[234] = n; c[n + 4 >> 2] = A | 1; if ((n | 0) != (c[233] | 0)) { return } c[233] = 0; c[230] = 0; return } if ((f | 0) == (c[233] | 0)) { A = (c[230] | 0) + o | 0; c[230] = A; c[233] = n; c[n + 4 >> 2] = A | 1; c[n + A >> 2] = A; return } A = (z & -8) + o | 0; s = z >>> 3; L1883: do { if (z >>> 0 < 256) { g = c[d + (b + 8) >> 2] | 0; t = c[d + (b + 12) >> 2] | 0; h = 952 + (s << 1 << 2) | 0; do { if ((g | 0) != (h | 0)) { if (g >>> 0 < a >>> 0) { aj() } if ((c[g + 12 >> 2] | 0) == (f | 0)) { break } aj() } } while (0); if ((t | 0) == (g | 0)) { c[228] = c[228] & ~(1 << s); break } do { if ((t | 0) == (h | 0)) { B = t + 8 | 0 } else { if (t >>> 0 < a >>> 0) { aj() } m = t + 8 | 0; if ((c[m >> 2] | 0) == (f | 0)) { B = m; break } aj() } } while (0); c[g + 12 >> 2] = t; c[B >> 2] = g } else { h = e; m = c[d + (b + 24) >> 2] | 0; l = c[d + (b + 12) >> 2] | 0; do { if ((l | 0) == (h | 0)) { i = d + (b + 20) | 0; p = c[i >> 2] | 0; if ((p | 0) == 0) { q = d + (b + 16) | 0; v = c[q >> 2] | 0; if ((v | 0) == 0) { C = 0; break } else { D = v; E = q } } else { D = p; E = i } while (1) { i = D + 20 | 0; p = c[i >> 2] | 0; if ((p | 0) != 0) { D = p; E = i; continue } i = D + 16 | 0; p = c[i >> 2] | 0; if ((p | 0) == 0) { break } else { D = p; E = i } } if (E >>> 0 < a >>> 0) { aj() } else { c[E >> 2] = 0; C = D; break } } else { i = c[d + (b + 8) >> 2] | 0; if (i >>> 0 < a >>> 0) { aj() } p = i + 12 | 0; if ((c[p >> 2] | 0) != (h | 0)) { aj() } q = l + 8 | 0; if ((c[q >> 2] | 0) == (h | 0)) { c[p >> 2] = l; c[q >> 2] = i; C = l; break } else { aj() } } } while (0); if ((m | 0) == 0) { break } l = d + (b + 28) | 0; g = 1216 + (c[l >> 2] << 2) | 0; do { if ((h | 0) == (c[g >> 2] | 0)) { c[g >> 2] = C; if ((C | 0) != 0) { break } c[229] = c[229] & ~(1 << c[l >> 2]); break L1883 } else { if (m >>> 0 < (c[232] | 0) >>> 0) { aj() } t = m + 16 | 0; if ((c[t >> 2] | 0) == (h | 0)) { c[t >> 2] = C } else { c[m + 20 >> 2] = C } if ((C | 0) == 0) { break L1883 } } } while (0); if (C >>> 0 < (c[232] | 0) >>> 0) { aj() } c[C + 24 >> 2] = m; h = c[d + (b + 16) >> 2] | 0; do { if ((h | 0) != 0) { if (h >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[C + 16 >> 2] = h; c[h + 24 >> 2] = C; break } } } while (0); h = c[d + (b + 20) >> 2] | 0; if ((h | 0) == 0) { break } if (h >>> 0 < (c[232] | 0) >>> 0) { aj() } else { c[C + 20 >> 2] = h; c[h + 24 >> 2] = C; break } } } while (0); c[n + 4 >> 2] = A | 1; c[n + A >> 2] = A; if ((n | 0) != (c[233] | 0)) { F = A; break } c[230] = A; return } else { c[y >> 2] = z & -2; c[n + 4 >> 2] = o | 1; c[n + o >> 2] = o; F = o } } while (0); o = F >>> 3; if (F >>> 0 < 256) { z = o << 1; y = 952 + (z << 2) | 0; C = c[228] | 0; b = 1 << o; do { if ((C & b | 0) == 0) { c[228] = C | b; G = y; H = 952 + (z + 2 << 2) | 0 } else { o = 952 + (z + 2 << 2) | 0; d = c[o >> 2] | 0; if (d >>> 0 >= (c[232] | 0) >>> 0) { G = d; H = o; break } aj() } } while (0); c[H >> 2] = n; c[G + 12 >> 2] = n; c[n + 8 >> 2] = G; c[n + 12 >> 2] = y; return } y = n; G = F >>> 8; do { if ((G | 0) == 0) { I = 0 } else { if (F >>> 0 > 16777215) { I = 31; break } H = (G + 1048320 | 0) >>> 16 & 8; z = G << H; b = (z + 520192 | 0) >>> 16 & 4; C = z << b; z = (C + 245760 | 0) >>> 16 & 2; o = 14 - (b | H | z) + (C << z >>> 15) | 0; I = F >>> ((o + 7 | 0) >>> 0) & 1 | o << 1 } } while (0); G = 1216 + (I << 2) | 0; c[n + 28 >> 2] = I; c[n + 20 >> 2] = 0; c[n + 16 >> 2] = 0; o = c[229] | 0; z = 1 << I; if ((o & z | 0) == 0) { c[229] = o | z; c[G >> 2] = y; c[n + 24 >> 2] = G; c[n + 12 >> 2] = n; c[n + 8 >> 2] = n; return } if ((I | 0) == 31) { J = 0 } else { J = 25 - (I >>> 1) | 0 } I = F << J; J = c[G >> 2] | 0; while (1) { if ((c[J + 4 >> 2] & -8 | 0) == (F | 0)) { break } K = J + 16 + (I >>> 31 << 2) | 0; G = c[K >> 2] | 0; if ((G | 0) == 0) { L = 1452; break } else { I = I << 1; J = G } } if ((L | 0) == 1452) { if (K >>> 0 < (c[232] | 0) >>> 0) { aj() } c[K >> 2] = y; c[n + 24 >> 2] = J; c[n + 12 >> 2] = n; c[n + 8 >> 2] = n; return } K = J + 8 | 0; L = c[K >> 2] | 0; I = c[232] | 0; if (J >>> 0 < I >>> 0) { aj() } if (L >>> 0 < I >>> 0) { aj() } c[L + 12 >> 2] = y; c[K >> 2] = y; c[n + 8 >> 2] = L; c[n + 12 >> 2] = J; c[n + 24 >> 2] = 0; return } function bi(b) { b = b | 0; var c = 0; c = b; while (a[c] | 0) { c = c + 1 | 0 } return c - b | 0 } function bj(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0, g = 0, h = 0; f = b + e | 0; if ((e | 0) >= 20) { d = d & 255; e = b & 3; g = d | d << 8 | d << 16 | d << 24; h = f & ~3; if (e) { e = b + 4 - e | 0; while ((b | 0) < (e | 0)) { a[b] = d; b = b + 1 | 0 } } while ((b | 0) < (h | 0)) { c[b >> 2] = g; b = b + 4 | 0 } } while ((b | 0) < (f | 0)) { a[b] = d; b = b + 1 | 0 } } function bk(b, d, e) { b = b | 0; d = d | 0; e = e | 0; var f = 0; f = b | 0; if ((b & 3) == (d & 3)) { while (b & 3) { if ((e | 0) == 0) return f | 0; a[b] = a[d] | 0; b = b + 1 | 0; d = d + 1 | 0; e = e - 1 | 0 } while ((e | 0) >= 4) { c[b >> 2] = c[d >> 2]; b = b + 4 | 0; d = d + 4 | 0; e = e - 4 | 0 } } while ((e | 0) > 0) { a[b] = a[d] | 0; b = b + 1 | 0; d = d + 1 | 0; e = e - 1 | 0 } return f | 0 } function bl(a, b) { a = a | 0; b = b | 0; return aE[a & 1](b | 0) | 0 } function bm(a) { a = a | 0; aF[a & 1]() } function bn(a, b, c) { a = a | 0; b = b | 0; c = c | 0; return aG[a & 1](b | 0, c | 0) | 0 } function bo(a, b) { a = a | 0; b = b | 0; aH[a & 1](b | 0) } function bp(a) { a = a | 0; _(0); return 0 } function bq() { _(1) } function br(a, b) { a = a | 0; b = b | 0; _(2); return 0 } function bs(a) { a = a | 0; _(3) }
    // EMSCRIPTEN_END_FUNCS
    var aE = [bp, bp]; var aF = [bq, bq]; var aG = [br, br]; var aH = [bs, bs]; return { _strlen: bi, _crn_get_levels: a8, _crn_get_uncompressed_size: bb, _crn_decompress: bc, _crn_get_width: a6, _realloc: bg, _crn_get_bytes_per_block: ba, _memset: bj, _malloc: be, _memcpy: bk, _free: bf, _crn_get_height: a7, _crn_get_dxt_format: a9, runPostSets: aY, stackAlloc: aI, stackSave: aJ, stackRestore: aK, setThrew: aL, setTempRet0: aO, setTempRet1: aP, setTempRet2: aQ, setTempRet3: aR, setTempRet4: aS, setTempRet5: aT, setTempRet6: aU, setTempRet7: aV, setTempRet8: aW, setTempRet9: aX, dynCall_ii: bl, dynCall_v: bm, dynCall_iii: bn, dynCall_vi: bo }
    // EMSCRIPTEN_END_ASM
  })({ Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array }, {
    abort: E, assert: A, asmPrintInt: function (a, b) { s.print("int " + a + "," + b) }, asmPrintFloat: function (a, b) { s.print("float " + a + "," + b) }, min: Ca, invoke_ii: function (a, b) { try { return s.dynCall_ii(a, b) } catch (c) { "number" !== typeof c && "longjmp" !== c && e(c), $.setThrew(1, 0) } }, invoke_v: function (a) {
      try { s.dynCall_v(a) } catch (b) {
        "number" !==
        typeof b && "longjmp" !== b && e(b), $.setThrew(1, 0)
      }
    }, invoke_iii: function (a, b, c) { try { return s.dynCall_iii(a, b, c) } catch (d) { "number" !== typeof d && "longjmp" !== d && e(d), $.setThrew(1, 0) } }, invoke_vi: function (a, b) { try { s.dynCall_vi(a, b) } catch (c) { "number" !== typeof c && "longjmp" !== c && e(c), $.setThrew(1, 0) } }, _llvm_lifetime_end: q(), _snprintf: nb, _abort: function () { s.abort() }, _fprintf: jc, _printf: function (a, b) { return jc(K[Cb >> 2], a, b) }, _fflush: q(), __reallyNegative: lb, _sysconf: function (a) {
      switch (a) {
        case 30: return 4096; case 132: case 133: case 12: case 137: case 138: case 15: case 235: case 16: case 17: case 18: case 19: case 20: case 149: case 13: case 10: case 236: case 153: case 9: case 21: case 22: case 159: case 154: case 14: case 77: case 78: case 139: case 80: case 81: case 79: case 82: case 68: case 67: case 164: case 11: case 29: case 47: case 48: case 95: case 52: case 51: case 46: return 200809;
        case 27: case 246: case 127: case 128: case 23: case 24: case 160: case 161: case 181: case 182: case 242: case 183: case 184: case 243: case 244: case 245: case 165: case 178: case 179: case 49: case 50: case 168: case 169: case 175: case 170: case 171: case 172: case 97: case 76: case 32: case 173: case 35: return -1; case 176: case 177: case 7: case 155: case 8: case 157: case 125: case 126: case 92: case 93: case 129: case 130: case 131: case 94: case 91: return 1; case 74: case 60: case 69: case 70: case 4: return 1024; case 31: case 42: case 72: return 32;
        case 87: case 26: case 33: return 2147483647; case 34: case 1: return 47839; case 38: case 36: return 99; case 43: case 37: return 2048; case 0: return 2097152; case 3: return 65536; case 28: return 32768; case 44: return 32767; case 75: return 16384; case 39: return 1E3; case 89: return 700; case 71: return 256; case 40: return 255; case 2: return 100; case 180: return 64; case 25: return 20; case 5: return 16; case 6: return 6; case 73: return 4; case 84: return 1
      }S(R.u); return -1
    }, ___setErrNo: S, _fwrite: ic, _send: function (a, b, c) {
      return !Z.ub(a) ?
        (S(R.ba), -1) : hc(a, b, c)
    }, _write: hc, _exit: function (a) { mc(a) }, _sprintf: function (a, b, c) { return nb(a, j, b, c) }, __formatString: mb, __ZSt9terminatev: function () { mc(-1234) }, _pwrite: function (a, b, c, d) { a = X[a]; if (!a) return S(R.ba), -1; try { return ac(a, I, b, c, d) } catch (f) { return Jb(f), -1 } }, _sbrk: nc, ___errno_location: function () { return pb }, ___gxx_personality_v0: q(), _llvm_lifetime_start: q(), _time: function (a) { var b = Math.floor(Date.now() / 1E3); a && (K[a >> 2] = b); return b }, __exit: mc, STACKTOP: x, STACK_MAX: Sa, tempDoublePtr: jb, ABORT: ua,
    NaN: NaN, Infinity: Infinity
  }, N), kb = s._strlen = $._strlen; s._crn_get_levels = $._crn_get_levels; s._crn_get_uncompressed_size = $._crn_get_uncompressed_size; s._crn_decompress = $._crn_decompress; s._crn_get_width = $._crn_get_width; s._realloc = $._realloc; s._crn_get_bytes_per_block = $._crn_get_bytes_per_block; var kc = s._memset = $._memset, Ka = s._malloc = $._malloc, lc = s._memcpy = $._memcpy; s._free = $._free; s._crn_get_height = $._crn_get_height; s._crn_get_dxt_format = $._crn_get_dxt_format; var ib = s.runPostSets = $.runPostSets;
  s.dynCall_ii = $.dynCall_ii; s.dynCall_v = $.dynCall_v; s.dynCall_iii = $.dynCall_iii; s.dynCall_vi = $.dynCall_vi; oa = function (a) { return $.stackAlloc(a) }; ha = function () { return $.stackSave() }; ia = function (a) { $.stackRestore(a) }; function Ec(a) { this.name = "ExitStatus"; this.message = "Program terminated with exit(" + a + ")"; this.status = a } Ec.prototype = Error(); var Fc, Gc = m, fb = function Hc() { !s.calledRun && Ic && Jc(); s.calledRun || (fb = Hc) };
  s.callMain = s.Nd = function (a) {
    function b() { for (var a = 0; 3 > a; a++)d.push(0) } A(0 == Q, "cannot call main when async dependencies remain! (listen on __ATMAIN__)"); A(0 == Va.length, "cannot call main when preRun functions remain to be called"); a = a || []; ba && Gc !== m && s.P("preload time: " + (Date.now() - Gc) + " ms"); Za || (Za = l, Ua(O)); var c = a.length + 1, d = [L(H("/bin/this.program"), "i8", 0)]; b(); for (var f = 0; f < c - 1; f += 1)d.push(L(H(a[f]), "i8", 0)), b(); d.push(0); d = L(d, "i32", 0); Fc = x; try { var h = s._main(c, d, 0); s.noExitRuntime || Kc(h) } catch (g) {
      g instanceof
      Ec || ("SimulateInfiniteLoop" == g ? s.noExitRuntime = l : (g && ("object" === typeof g && g.stack) && s.P("exception thrown: " + [g, g.stack]), e(g)))
    } finally { }
  };
  function Jc(a) {
    function b() { Za || (Za = l, Ua(O)); Ua(Wa); s.calledRun = l; s._main && Ic && s.callMain(a); if (s.postRun) for ("function" == typeof s.postRun && (s.postRun = [s.postRun]); s.postRun.length;)ab(s.postRun.shift()); Ua(Ya) } a = a || s.arguments; Gc === m && (Gc = Date.now()); if (0 < Q) s.P("run() called, but dependencies remain, so not running"); else {
      if (s.preRun) for ("function" == typeof s.preRun && (s.preRun = [s.preRun]); s.preRun.length;)$a(s.preRun.shift()); Ua(Va); 0 < Q || (s.setStatus ? (s.setStatus("Running..."), setTimeout(function () {
        setTimeout(function () { s.setStatus("") },
          1); ua || b()
      }, 1)) : b())
    }
  } s.run = s.ge = Jc; function Kc(a) { ua = l; x = Fc; Ua(Xa); e(new Ec(a)) } s.exit = s.Rd = Kc; function E(a) { a && (s.print(a), s.P(a)); ua = l; e("abort() at " + Ma()) } s.abort = s.abort = E; if (s.preInit) for ("function" == typeof s.preInit && (s.preInit = [s.preInit]); 0 < s.preInit.length;)s.preInit.pop()(); var Ic = l; s.noInitialRun && (Ic = p); Jc();

  return Module;
}

// Using this "namespace" keeps our global scope clutter free and prevents other scripts from stomping on our variables.
var WebGLTextureUtil = (function () {

  "use strict";

  //============================//
  // DXT constants and utilites //
  //============================//

  // Utility functions
  // Builds a numeric code for a given fourCC string
  function fourCCToInt32(value) {
    return value.charCodeAt(0) +
      (value.charCodeAt(1) << 8) +
      (value.charCodeAt(2) << 16) +
      (value.charCodeAt(3) << 24);
  }

  // Turns a fourCC numeric code into a string
  function int32ToFourCC(value) {
    return String.fromCharCode(
      value & 0xff,
      (value >> 8) & 0xff,
      (value >> 16) & 0xff,
      (value >> 24) & 0xff
    );
  }

  // Calcualates the size of a compressed texture level in bytes
  function textureLevelSize(format, width, height) {
    switch (format) {
      case COMPRESSED_RGB_S3TC_DXT1_EXT:
      case COMPRESSED_RGB_ATC_WEBGL:
      case COMPRESSED_RGB_ETC1_WEBGL:
        return ((width + 3) >> 2) * ((height + 3) >> 2) * 8;

      case COMPRESSED_RGBA_S3TC_DXT3_EXT:
      case COMPRESSED_RGBA_S3TC_DXT5_EXT:
      case COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL:
      case COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL:
        return ((width + 3) >> 2) * ((height + 3) >> 2) * 16;

      case COMPRESSED_RGB_PVRTC_4BPPV1_IMG:
      case COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:
        return Math.floor((Math.max(width, 8) * Math.max(height, 8) * 4 + 7) / 8);

      case COMPRESSED_RGB_PVRTC_2BPPV1_IMG:
      case COMPRESSED_RGBA_PVRTC_2BPPV1_IMG:
        return Math.floor((Math.max(width, 16) * Math.max(height, 8) * 2 + 7) / 8);

      default:
        return 0;
    }
  }

  // DXT formats, from:
  // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
  var COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
  var COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
  var COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
  var COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;

  // ATC formats, from:
  // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_atc/
  var COMPRESSED_RGB_ATC_WEBGL = 0x8C92;
  var COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 0x8C93;
  var COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 0x87EE;

  // DXT values and structures referenced from:
  // http://msdn.microsoft.com/en-us/library/bb943991.aspx/
  var DDS_MAGIC = 0x20534444;
  var DDSD_MIPMAPCOUNT = 0x20000;
  var DDPF_FOURCC = 0x4;

  var DDS_HEADER_LENGTH = 31; // The header length in 32 bit ints.

  // Offsets into the header array.
  var DDS_HEADER_MAGIC = 0;

  var DDS_HEADER_SIZE = 1;
  var DDS_HEADER_FLAGS = 2;
  var DDS_HEADER_HEIGHT = 3;
  var DDS_HEADER_WIDTH = 4;

  var DDS_HEADER_MIPMAPCOUNT = 7;

  var DDS_HEADER_PF_FLAGS = 20;
  var DDS_HEADER_PF_FOURCC = 21;

  // FourCC format identifiers.
  var FOURCC_DXT1 = fourCCToInt32("DXT1");
  var FOURCC_DXT3 = fourCCToInt32("DXT3");
  var FOURCC_DXT5 = fourCCToInt32("DXT5");

  var FOURCC_ATC = fourCCToInt32("ATC ");
  var FOURCC_ATCA = fourCCToInt32("ATCA");
  var FOURCC_ATCI = fourCCToInt32("ATCI");

  //==================//
  // Crunch constants //
  //==================//

  // Taken from crnlib.h
  var CRN_FORMAT = {
    cCRNFmtInvalid: -1,

    cCRNFmtDXT1: 0,
    // cCRNFmtDXT3 is not currently supported when writing to CRN - only DDS.
    cCRNFmtDXT3: 1,
    cCRNFmtDXT5: 2

    // Crunch supports more formats than this, but we can't use them here.
  };

  // Mapping of Crunch formats to DXT formats.
  var DXT_FORMAT_MAP = {};
  DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT1] = COMPRESSED_RGB_S3TC_DXT1_EXT;
  DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT3] = COMPRESSED_RGBA_S3TC_DXT3_EXT;
  DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT5] = COMPRESSED_RGBA_S3TC_DXT5_EXT;

  //===============//
  // PVR constants //
  //===============//

  // PVR formats, from:
  // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
  var COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
  var COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;
  var COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;
  var COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03;

  // ETC1 format, from:
  // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/
  var COMPRESSED_RGB_ETC1_WEBGL = 0x8D64;

  var PVR_FORMAT_2BPP_RGB = 0;
  var PVR_FORMAT_2BPP_RGBA = 1;
  var PVR_FORMAT_4BPP_RGB = 2;
  var PVR_FORMAT_4BPP_RGBA = 3;
  var PVR_FORMAT_ETC1 = 6;
  var PVR_FORMAT_DXT1 = 7;
  var PVR_FORMAT_DXT3 = 9;
  var PVR_FORMAT_DXT5 = 5;

  var PVR_HEADER_LENGTH = 13; // The header length in 32 bit ints.
  var PVR_MAGIC = 0x03525650; //0x50565203;

  // Offsets into the header array.
  var PVR_HEADER_MAGIC = 0;
  var PVR_HEADER_FORMAT = 2;
  var PVR_HEADER_HEIGHT = 6;
  var PVR_HEADER_WIDTH = 7;
  var PVR_HEADER_MIPMAPCOUNT = 11;
  var PVR_HEADER_METADATA = 12;

  //============//
  // Misc Utils //
  //============//

  // When an error occurs set the texture to a 1x1 black pixel
  // This prevents WebGL errors from attempting to use unrenderable textures
  // and clears out stale data if we're re-using a texture.
  function clearOnError(gl, error, texture, callback) {
    console.error(error);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    // Notify the user that an error occurred and the texture is ready.
    if (callback) { callback(texture, error, null); }
  }

  function isPowerOfTwo(n) {
    return (n & (n - 1)) === 0;
  }

  function getExtension(gl, name) {
    var vendorPrefixes = ["", "WEBKIT_", "MOZ_"];
    var ext = null;
    for (var i in vendorPrefixes) {
      ext = gl.getExtension(vendorPrefixes[i] + name);
      if (ext) { break; }
    }
    return ext;
  }

  //==================//
  // DDS File Reading //
  //==================//

  // Parse a DDS file and provide information about the raw DXT data it contains to the given callback.
  function parseDDS(arrayBuffer, callback, errorCallback) {
    // Callbacks must be provided.
    if (!callback || !errorCallback) { return; }

    // Get a view of the arrayBuffer that represents the DDS header.
    var header = new Int32Array(arrayBuffer, 0, DDS_HEADER_LENGTH);

    // Do some sanity checks to make sure this is a valid DDS file.
    if (header[DDS_HEADER_MAGIC] != DDS_MAGIC) {
      errorCallback("Invalid magic number in DDS header");
      return 0;
    }

    if (!header[DDS_HEADER_PF_FLAGS] & DDPF_FOURCC) {
      errorCallback("Unsupported format, must contain a FourCC code");
      return 0;
    }

    // Determine what type of compressed data the file contains.
    var fourCC = header[DDS_HEADER_PF_FOURCC];
    var internalFormat;
    switch (fourCC) {
      case FOURCC_DXT1:
        internalFormat = COMPRESSED_RGB_S3TC_DXT1_EXT;
        break;

      case FOURCC_DXT3:
        internalFormat = COMPRESSED_RGBA_S3TC_DXT3_EXT;
        break;

      case FOURCC_DXT5:
        internalFormat = COMPRESSED_RGBA_S3TC_DXT5_EXT;
        break;

      case FOURCC_ATC:
        internalFormat = COMPRESSED_RGB_ATC_WEBGL;
        break;

      case FOURCC_ATCA:
        internalFormat = COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL;
        break;

      case FOURCC_ATCI:
        internalFormat = COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL;
        break;


      default:
        errorCallback("Unsupported FourCC code: " + int32ToFourCC(fourCC));
        return;
    }

    // Determine how many mipmap levels the file contains.
    var levels = 1;
    if (header[DDS_HEADER_FLAGS] & DDSD_MIPMAPCOUNT) {
      levels = Math.max(1, header[DDS_HEADER_MIPMAPCOUNT]);
    }

    // Gather other basic metrics and a view of the raw the DXT data.
    var width = header[DDS_HEADER_WIDTH];
    var height = header[DDS_HEADER_HEIGHT];
    var dataOffset = header[DDS_HEADER_SIZE] + 4;
    var dxtData = new Uint8Array(arrayBuffer, dataOffset);

    // Pass the DXT information to the callback for uploading.
    callback(dxtData, width, height, levels, internalFormat);
  }

  //==================//
  // PVR File Reading //
  //==================//

  // Parse a PVR file and provide information about the raw texture data it contains to the given callback.
  function parsePVR(arrayBuffer, callback, errorCallback) {
    // Callbacks must be provided.
    if (!callback || !errorCallback) { return; }

    // Get a view of the arrayBuffer that represents the DDS header.
    var header = new Int32Array(arrayBuffer, 0, PVR_HEADER_LENGTH);

    // Do some sanity checks to make sure this is a valid DDS file.
    if (header[PVR_HEADER_MAGIC] != PVR_MAGIC) {
      errorCallback("Invalid magic number in PVR header");
      return 0;
    }

    // Determine what type of compressed data the file contains.
    var format = header[PVR_HEADER_FORMAT];
    var internalFormat;
    switch (format) {
      case PVR_FORMAT_2BPP_RGB:
        internalFormat = COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        break;

      case PVR_FORMAT_2BPP_RGBA:
        internalFormat = COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        break;

      case PVR_FORMAT_4BPP_RGB:
        internalFormat = COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        break;

      case PVR_FORMAT_4BPP_RGBA:
        internalFormat = COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        break;

      case PVR_FORMAT_ETC1:
        internalFormat = COMPRESSED_RGB_ETC1_WEBGL;
        break;

      case PVR_FORMAT_DXT1:
        internalFormat = COMPRESSED_RGB_S3TC_DXT1_EXT;
        break;

      case PVR_FORMAT_DXT3:
        internalFormat = COMPRESSED_RGBA_S3TC_DXT3_EXT;
        break;

      case PVR_FORMAT_DXT5:
        internalFormat = COMPRESSED_RGBA_S3TC_DXT5_EXT;
        break;

      default:
        errorCallback("Unsupported PVR format: " + format);
        return;
    }

    // Gather other basic metrics and a view of the raw the DXT data.
    var width = header[PVR_HEADER_WIDTH];
    var height = header[PVR_HEADER_HEIGHT];
    var levels = header[PVR_HEADER_MIPMAPCOUNT];
    var dataOffset = header[PVR_HEADER_METADATA] + 52;
    var pvrtcData = new Uint8Array(arrayBuffer, dataOffset);

    // Pass the PVRTC information to the callback for uploading.
    callback(pvrtcData, width, height, levels, internalFormat);
  }

  //=====================//
  // Crunch file reading //
  //=====================//

  // Parse a crunch file and decompress the contained texture into raw DXT data, which is then passed to the callback.
  var decompressCRN = (function () {
    // Variables which are cached between calls to the function, hidden here with some function scoping tricks.
    var dst = null;
    var dxtData = null;
    var cachedDstSize = 0;

    // The emscripten module.
    var Module = null;

    // Copy an array of bytes into or out of the emscripten heap.
    function arrayBufferCopy(src, dst, dstByteOffset, numBytes) {
      var i;
      var dst32Offset = dstByteOffset / 4;
      var tail = (numBytes % 4);
      var src32 = new Uint32Array(src.buffer, 0, (numBytes - tail) / 4);
      var dst32 = new Uint32Array(dst.buffer);
      for (i = 0; i < src32.length; i++) {
        dst32[dst32Offset + i] = src32[i];
      }
      for (i = numBytes - tail; i < numBytes; i++) {
        dst[dstByteOffset + i] = src[i];
      }
    }

    // This is the actual function that is executed when you call decompressCRN.
    return function (arrayBuffer, callback, errorCallback) {
      // Callbacks must be provided.
      if (!callback || !errorCallback) { return; }

      // If the emscripten module has not been loaded yet do so now.
      // Executes the massive code blob at the top of the file.
      if (!Module) {
        Module = LoadCrunchDecoder();
      }

      // Copy the contents of the arrayBuffer into emscriptens heap.
      var srcSize = arrayBuffer.byteLength;
      var bytes = new Uint8Array(arrayBuffer);
      var src = Module._malloc(srcSize);
      arrayBufferCopy(bytes, Module.HEAPU8, src, srcSize);

      // Determine what type of compressed data the file contains.
      var format = Module._crn_get_dxt_format(src, srcSize);
      if (!DXT_FORMAT_MAP[format]) {
        errorCallback("Unsupported DXT format");
        return;
      }

      // Gather basic metrics about the DXT data.
      var levels = Module._crn_get_levels(src, srcSize);
      var width = Module._crn_get_width(src, srcSize);
      var height = Module._crn_get_height(src, srcSize);
      //var bytesPerBlock = Module._crn_get_bytes_per_block(src, srcSize);

      // Determine the size of the decoded DXT data.
      var dstSize = 0;
      var i;
      for (i = 0; i < levels; ++i) {
        dstSize += textureLevelSize(DXT_FORMAT_MAP[format], width >> i, height >> i);
      }

      // Allocate enough space on the emscripten heap to hold the decoded DXT data
      // or reuse the existing allocation if a previous call to this function has
      // already acquired a large enough buffer.
      if (cachedDstSize < dstSize) {
        if (dst) { Module._free(dst); }
        dst = Module._malloc(dstSize);
        dxtData = new Uint8Array(Module.HEAPU8.buffer, dst, dstSize);
        cachedDstSize = dstSize;
      }

      // Decompress the DXT data from the Crunch file into the allocated space.
      Module._crn_decompress(src, srcSize, dst, dstSize, 0, levels);

      // Release the crunch file data from the emscripten heap.
      Module._free(src);

      // Pass the DXT information to the callback for uploading.
      callback(dxtData, width, height, levels, DXT_FORMAT_MAP[format]);
    };
  })();

  //=============//
  // IMG loading //
  //=============//

  /*
  This function provides a method for loading webgl textures using a pool of
  image elements, which has very low memory overhead. For more details see:
  http://blog.tojicode.com/2012/03/javascript-memory-optimization-and.html
  */
  var loadImgTexture = (function createTextureLoader() {
    var MAX_CACHE_IMAGES = 16;

    var textureImageCache = new Array(MAX_CACHE_IMAGES);
    var cacheTop = 0;
    var remainingCacheImages = MAX_CACHE_IMAGES;
    var pendingTextureRequests = [];

    var TextureImageLoader = function (loadedCallback) {
      var self = this;
      var blackPixel = new Uint8Array([0, 0, 0]);

      this.gl = null;
      this.texture = null;
      this.callback = null;

      this.image = new Image();
      this.image.addEventListener('load', function () {
        var gl = self.gl;
        gl.bindTexture(gl.TEXTURE_2D, self.texture);

        var startTime = Date.now();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.image);

        if (isPowerOfTwo(self.image.width) && isPowerOfTwo(self.image.height)) {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
          gl.generateMipmap(gl.TEXTURE_2D);
        } else {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        var uploadTime = Date.now() - startTime;

        if (self.callback) {
          var stats = {
            width: self.image.width,
            height: self.image.height,
            internalFormat: gl.RGBA,
            levelZeroSize: self.image.width * self.image.height * 4,
            uploadTime: uploadTime
          };
          self.callback(self.texture, null, stats);
        }
        loadedCallback(self);
      }, false);
      this.image.addEventListener('error', function (ev) {
        clearOnError(self.gl, 'Image could not be loaded', self.texture, self.callback);
        loadedCallback(self);
      }, false);
    };

    TextureImageLoader.prototype.loadTexture = function (gl, src, texture, callback) {
      this.gl = gl;
      this.texture = texture;
      this.callback = callback;
      this.image.src = src;
    };

    var PendingTextureRequest = function (gl, src, texture, callback) {
      this.gl = gl;
      this.src = src;
      this.texture = texture;
      this.callback = callback;
    };

    function releaseTextureImageLoader(til) {
      var req;
      if (pendingTextureRequests.length) {
        req = pendingTextureRequests.shift();
        til.loadTexture(req.gl, req.src, req.texture, req.callback);
      } else {
        textureImageCache[cacheTop++] = til;
      }
    }

    return function (gl, src, texture, callback) {
      var til;

      if (cacheTop) {
        til = textureImageCache[--cacheTop];
        til.loadTexture(gl, src, texture, callback);
      } else if (remainingCacheImages) {
        til = new TextureImageLoader(releaseTextureImageLoader);
        til.loadTexture(gl, src, texture, callback);
        --remainingCacheImages;
      } else {
        pendingTextureRequests.push(new PendingTextureRequest(gl, src, texture, callback));
      }

      return texture;
    };
  })();

  // Detect if we are executing in a worker process.
  if (window.document === undefined) {

    //===============//
    // Crunch Worker //
    //===============//

    // Worker message handler
    onmessage = function (msg) {
      // Calls to the worker contain a URL to load and the associated pending texture ID.
      var src = msg.data.src;
      var id = msg.data.id;

      // Notifies the main thread that DXT data is ready.
      function uploadCallback(dxtData, width, height, levels, internalFormat) {
        postMessage({
          id: id,
          dxtData: dxtData,
          width: width,
          height: height,
          levels: levels,
          internalFormat: internalFormat
        });
      }

      // Notifies the main thread that an error has occured.
      function errorCallback(error) {
        postMessage({
          id: id,
          error: error
        });
      }

      // Load the file via XHR
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function (ev) {
        if (xhr.status == 200) {
          // If the file loaded successfully parse and decompress it.
          decompressCRN(xhr.response, uploadCallback, errorCallback);
        } else {
          errorCallback(xhr.statusText);
        }
      }, false);
      xhr.open('GET', "../" + src, true);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
    };
  } else {

    //=====================//
    // TextureLoader Class //
    //=====================//

    var nextPendingTextureId = 0;
    var CrunchPendingTexture = function (texture, callback) {
      this.id = nextPendingTextureId++;
      this.texture = texture;
      this.callback = callback;
    }

    var useWorker = true;

    // This class is our public interface.
    var TextureLoader = function (gl) {
      this.gl = gl;
      this.worker = null;

      // Load the compression format extensions, if available
      this.dxtExt = getExtension(gl, "WEBGL_compressed_texture_s3tc");
      this.pvrtcExt = getExtension(gl, "WEBGL_compressed_texture_pvrtc");
      this.atcExt = getExtension(gl, "WEBGL_compressed_texture_atc");
      this.etc1Ext = getExtension(gl, "WEBGL_compressed_texture_etc1");

      if (!!useWorker && this.supportsDXT()) {
        var self = this;

        // When using a worker process we must keep track of the pending texture
        // loads so that we can correctly correlate the DXT data to the desired
        // texture when the worker completes.
        this.pendingTextures = {};

        // Reload this file as a worker.
        this.worker = new Worker("js/webgl-texture-util.js");

        // The worker's message handler.
        this.worker.onmessage = function (msg) {
          // Find the pending texture associated with the data we just received
          // from the worker.
          var id = msg.data.id;
          var pt = self.pendingTextures[id];
          if (!pt) { return; }

          // Remove the pending texture from the waiting list.
          delete self.pendingTextures[id];

          // If the worker indicated an error has occured handle it now.
          if (msg.data.error) {
            clearOnError(self.gl, msg.data.error, pt.texture, pt.callback);
            return;
          }

          if (!self._formatSupported(msg.data.internalFormat)) {
            clearOnError(self.gl, "Texture format not supported: " + msg.data.internalFormat, pt.texture, pt.callback);
            return;
          }

          // Upload the DXT data returned by the worker.
          self._uploadCompressedData(
            new Uint8Array(msg.data.dxtData),
            msg.data.width,
            msg.data.height,
            msg.data.levels,
            msg.data.internalFormat,
            pt.texture,
            pt.callback);
        };
      }
    }

    // Returns whether or not the compressed format is supported by the WebGL implementation
    TextureLoader.prototype._formatSupported = function (format) {
      switch (format) {
        case COMPRESSED_RGB_S3TC_DXT1_EXT:
        case COMPRESSED_RGBA_S3TC_DXT3_EXT:
        case COMPRESSED_RGBA_S3TC_DXT5_EXT:
          return !!this.dxtExt;

        case COMPRESSED_RGB_PVRTC_4BPPV1_IMG:
        case COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:
        case COMPRESSED_RGB_PVRTC_2BPPV1_IMG:
        case COMPRESSED_RGBA_PVRTC_2BPPV1_IMG:
          return !!this.pvrtcExt;

        case COMPRESSED_RGB_ATC_WEBGL:
        case COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL:
        case COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL:
          return !!this.atcExt;

        case COMPRESSED_RGB_ETC1_WEBGL:
          return !!this.etc1Ext;

        default:
          return false;
      }
    }

    // Uploads compressed texture data to the GPU.
    TextureLoader.prototype._uploadCompressedData = function (data, width, height, levels, internalFormat, texture, callback) {
      var gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, texture);

      var offset = 0;

      var stats = {
        width: width,
        height: height,
        internalFormat: internalFormat,
        levelZeroSize: textureLevelSize(internalFormat, width, height),
        uploadTime: 0
      };

      var startTime = Date.now();
      // Loop through each mip level of compressed texture data provided and upload it to the given texture.
      for (var i = 0; i < levels; ++i) {
        // Determine how big this level of compressed texture data is in bytes.
        var levelSize = textureLevelSize(internalFormat, width, height);
        // Get a view of the bytes for this level of DXT data.
        var dxtLevel = new Uint8Array(data.buffer, data.byteOffset + offset, levelSize);
        // Upload!
        gl.compressedTexImage2D(gl.TEXTURE_2D, i, internalFormat, width, height, 0, dxtLevel);
        // The next mip level will be half the height and width of this one.
        width = width >> 1;
        height = height >> 1;
        // Advance the offset into the compressed texture data past the current mip level's data.
        offset += levelSize;
      }
      stats.uploadTime = Date.now() - startTime;

      // We can't use gl.generateMipmaps with compressed textures, so only use
      // mipmapped filtering if the compressed texture data contained mip levels.
      if (levels > 1) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }

      // Notify the user that the texture is ready.
      if (callback) { callback(texture, null, stats); }
    }

    TextureLoader.prototype.supportsDXT = function () {
      return !!this.dxtExt;
    }

    TextureLoader.prototype.supportsPVRTC = function () {
      return !!this.pvrtcExt;
    }

    TextureLoader.prototype.supportsATC = function () {
      return !!this.atcExt;
    }

    TextureLoader.prototype.supportsETC1 = function () {
      return !!this.etc1Ext;
    }

    // Loads a image file into the given texture.
    // Supports any format that can be loaded into an img tag
    // If no texture is provided one is created and returned.
    TextureLoader.prototype.loadIMG = function (src, texture, callback) {
      if (!texture) {
        texture = this.gl.createTexture();
      }

      loadImgTexture(gl, src, texture, callback);

      return texture;
    }

    // Loads a DDS file into the given texture.
    // If no texture is provided one is created and returned.
    TextureLoader.prototype.loadDDS = function (src, texture, callback) {
      var self = this;
      if (!texture) {
        texture = this.gl.createTexture();
      }

      // Load the file via XHR.
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function (ev) {
        if (xhr.status == 200) {
          // If the file loaded successfully parse it.
          parseDDS(xhr.response, function (dxtData, width, height, levels, internalFormat) {
            if (!self._formatSupported(internalFormat)) {
              clearOnError(self.gl, "Texture format not supported: " + internalFormat, texture, callback);
              return;
            }
            // Upload the parsed DXT data to the texture.
            self._uploadCompressedData(dxtData, width, height, levels, internalFormat, texture, callback);
          }, function (error) {
            clearOnError(self.gl, error, texture, callback);
          });
        } else {
          clearOnError(self.gl, xhr.statusText, texture, callback);
        }
      }, false);
      xhr.open('GET', src, true);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);

      return texture;
    }

    // Loads a CRN (Crunch) file into the given texture.
    // If no texture is provided one is created and returned.
    TextureLoader.prototype.loadCRN = function (src, texture, callback) {
      var self = this;
      if (!texture) {
        texture = this.gl.createTexture();
      }

      if (!this.supportsDXT()) {
        clearOnError(this.gl, "Texture format not supported: DXT", texture, callback);
        return texture;
      }

      if (this.worker) {
        // If we're using a worker to handle the decoding create a pending texture
        // and put it on the waiting list.
        var pending = new CrunchPendingTexture(texture, callback);
        this.pendingTextures[pending.id] = pending;
        // Then tell the worker to load the CRN file.
        this.worker.postMessage({ id: pending.id, src: src });
      } else {
        // Load the file via XHR.
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function (ev) {
          if (xhr.status == 200) {
            // If the file loaded successfully parse and decompress it.
            decompressCRN(xhr.response, function (dxtData, width, height, levels, internalFormat) {
              if (!self._formatSupported(internalFormat)) {
                clearOnError(self.gl, "Texture format not supported (CRN): " + internalFormat, texture, callback);
                return;
              }
              // Upload the parsed and decompressed DXT data to the texture.
              self._uploadCompressedData(dxtData, width, height, levels, internalFormat, texture, callback);
            }, function (error) {
              clearOnError(self.gl, error, texture, callback);
            });
          } else {
            clearOnError(self.gl, xhr.statusText, texture, callback);
          }
        }, false);
        xhr.open('GET', src, true);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
      }

      return texture;
    }

    // Loads a PVR file into the given texture.
    // If no texture is provided one is created and returned.
    TextureLoader.prototype.loadPVR = function (src, texture, callback) {
      var self = this;
      if (!texture) {
        texture = this.gl.createTexture();
      }

      // Load the file via XHR.
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function (ev) {
        if (xhr.status == 200) {
          // If the file loaded successfully parse it.
          parsePVR(xhr.response, function (dxtData, width, height, levels, internalFormat) {
            if (!self._formatSupported(internalFormat)) {
              clearOnError(self.gl, "Texture format not supported: PVR", texture, callback);
              return;
            }
            // Upload the parsed PVR data to the texture.
            self._uploadCompressedData(dxtData, width, height, levels, internalFormat, texture, callback);
          }, function (error) {
            clearOnError(self.gl, error, texture, callback);
          });
        } else {
          clearOnError(self.gl, xhr.statusText, texture, callback);
        }
      }, false);
      xhr.open('GET', src, true);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);

      return texture;
    }

    // Loads a texture from a file. Guesses the type based on extension.
    // If no texture is provided one is created and returned.
    TextureLoader.prototype.loadTexture = function (src, texture, callback) {
      // Shamelessly lifted from StackOverflow :)
      // http://stackoverflow.com/questions/680929
      var re = /(?:\.([^.]+))?$/;
      var ext = re.exec(src)[1] || '';
      ext = ext.toLowerCase();

      switch (ext) {
        case 'crn':
          return this.loadCRN(src, texture, callback);
        case 'dds':
          return this.loadDDS(src, texture, callback);
        case 'pvr':
          return this.loadPVR(src, texture, callback);
        default:
          return this.loadIMG(src, texture, callback);
      }
    }

    // Sets a texture to a solid RGBA color
    // If no texture is provided one is created and returned.
    TextureLoader.prototype.makeSolidColor = function (r, g, b, a, texture) {
      var gl = this.gl;
      var data = new Uint8Array([r, g, b, a]);
      if (!texture) {
        texture = gl.createTexture();
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      return texture;
    }

    return TextureLoader;
  }
})();
