!function(){"use strict";var u=this;function f(t){return"string"==typeof t}function r(t,n,e){return t.call.apply(t.bind,arguments)}function o(n,e,t){if(!n)throw Error();var r;return 2<arguments.length?(r=Array.prototype.slice.call(arguments,2),function(){var t=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(t,r),n.apply(e,t)}):function(){return n.apply(e,arguments)}}function d(t,n,e){return(d=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?r:o).apply(null,arguments)}function g(t){var i=it;function n(){}n.prototype=i.prototype,t.G=i.prototype,t.prototype=new n,(t.prototype.constructor=t).F=function(t,n,e){for(var r=Array(arguments.length-2),o=2;o<arguments.length;o++)r[o-2]=arguments[o];return i.prototype[n].apply(t,r)}}var y=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function w(t,n){return-1!=t.indexOf(n)}function b(t,n){return t<n?-1:n<t?1:0}var t,m=Array.prototype.indexOf?function(t,n,e){return Array.prototype.indexOf.call(t,n,e)}:function(t,n,e){if(e=null==e?0:e<0?Math.max(0,t.length+e):e,f(t))return f(n)&&1==n.length?t.indexOf(n,e):-1;for(;e<t.length;e++)if(e in t&&t[e]===n)return e;return-1},v=Array.prototype.forEach?function(t,n,e){Array.prototype.forEach.call(t,n,e)}:function(t,n,e){for(var r=t.length,o=f(t)?t.split(""):t,i=0;i<r;i++)i in o&&n.call(e,o[i],i,t)},E=Array.prototype.filter?function(t,n,e){return Array.prototype.filter.call(t,n,e)}:function(t,n,e){for(var r,o=t.length,i=[],a=0,u=f(t)?t.split(""):t,s=0;s<o;s++)s in u&&(r=u[s],n.call(e,r,s,t)&&(i[a++]=r));return i},N=Array.prototype.reduce?function(t,n,e,r){return r&&(n=d(n,r)),Array.prototype.reduce.call(t,n,e)}:function(e,r,t,o){var i=t;return v(e,function(t,n){i=r.call(o,i,t,n,e)}),i},x=Array.prototype.some?function(t,n,e){return Array.prototype.some.call(t,n,e)}:function(t,n,e){for(var r=t.length,o=f(t)?t.split(""):t,i=0;i<r;i++)if(i in o&&n.call(e,o[i],i,t))return!0;return!1};t:{var S=u.navigator;if(S){S=S.userAgent;if(S){t=S;break t}}t=""}var T,A=w(t,"Opera")||w(t,"OPR"),O=w(t,"Trident")||w(t,"MSIE"),I=w(t,"Edge"),D=w(t,"Gecko")&&!(w(t.toLowerCase(),"webkit")&&!w(t,"Edge"))&&!(w(t,"Trident")||w(t,"MSIE"))&&!w(t,"Edge"),P=w(t.toLowerCase(),"webkit")&&!w(t,"Edge");function R(){var t=u.document;return t?t.documentMode:void 0}t:{var k="",C=(C=t,D?/rv\:([^\);]+)(\)|;)/.exec(C):I?/Edge\/([\d\.]+)/.exec(C):O?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(C):P?/WebKit\/(\S+)/.exec(C):A?/(?:Version)[ \/]?(\S+)/.exec(C):void 0);if(C&&(k=C?C[1]:""),O){C=R();if(null!=C&&C>parseFloat(k)){T=String(C);break t}}T=k}var _={};function j(t){if(!_[t]){for(var n=0,e=y(String(T)).split("."),r=y(String(t)).split("."),o=Math.max(e.length,r.length),i=0;0==n&&i<o;i++){var a=e[i]||"",u=r[i]||"",f=/(\d*)(\D*)/g,l=/(\d*)(\D*)/g;do{var s=f.exec(a)||["","",""],c=l.exec(u)||["","",""]}while((0!=s[0].length||0!=c[0].length)&&0==(n=b(0==s[1].length?0:parseInt(s[1],10),0==c[1].length?0:parseInt(c[1],10))||b(0==s[2].length,0==c[2].length)||b(s[2],c[2])))}_[t]=0<=n}}var M=u.document,B=M&&O?R()||("CSS1Compat"==M.compatMode?parseInt(T,10):5):void 0,U=O&&!(9<=Number(B)),L=O&&!(8<=Number(B));function F(t,n,e,r){this.a=t,this.nodeName=e,this.nodeValue=r,this.nodeType=2,this.parentNode=this.ownerElement=n}function V(t,n){var e=L&&"href"==n.nodeName?t.getAttribute(n.nodeName,2):n.nodeValue;return new F(n,t,n.nodeName,e)}function Y(t){var n=null;if("string"!=typeof(n=1==(e=t.nodeType)?null==(n=null==(n=t.textContent)?t.innerText:n)?"":n:n))if(U&&"title"==t.nodeName.toLowerCase()&&1==e)n=t.text;else if(9==e||1==e){t=9==e?t.documentElement:t.firstChild;for(var e=0,r=[],n="";t;){for(;1!=t.nodeType&&(n+=t.nodeValue),U&&"title"==t.nodeName.toLowerCase()&&(n+=t.text),t=(r[e++]=t).firstChild;);for(;e&&!(t=r[--e].nextSibling););}}else n=t.nodeValue;return""+n}function H(t,n,e){if(null===n)return!0;try{if(!t.getAttribute)return!1}catch(t){return!1}return L&&"class"==n&&(n="className"),null==e?!!t.getAttribute(n):t.getAttribute(n,2)==e}function X(t,n,e,r,o){return(U?function(t,n,e,r,o){if(t instanceof Ot||8==t.b||e&&null===t.b){var i=n.all;if(!i)return o;if("*"!=(t=K(t))&&!(i=n.getElementsByTagName(t)))return o;if(e){for(var a=[],u=0;n=i[u++];)H(n,e,r)&&a.push(n);i=a}for(u=0;n=i[u++];)"*"==t&&"!"==n.tagName||h(o,n);return o}return G(t,n,e,r,o),o}:function(n,t,e,r,o){return t.getElementsByName&&r&&"name"==e&&!O?(t=t.getElementsByName(r),v(t,function(t){n.a(t)&&h(o,t)})):t.getElementsByClassName&&r&&"class"==e?(t=t.getElementsByClassName(r),v(t,function(t){t.className==r&&n.a(t)&&h(o,t)})):n instanceof vt?G(n,t,e,r,o):t.getElementsByTagName&&(t=t.getElementsByTagName(n.f()),v(t,function(t){H(t,e,r)&&h(o,t)})),o}).call(null,t,n,f(e)?e:null,f(r)?r:null,o||new l)}function $(t,n,e,r,o){for(n=n.firstChild;n;n=n.nextSibling)H(n,e,r)&&t.a(n)&&h(o,n);return o}function G(t,n,e,r,o){for(n=n.firstChild;n;n=n.nextSibling)H(n,e,r)&&t.a(n)&&h(o,n),G(t,n,e,r,o)}function K(t){if(t instanceof vt){if(8==t.b)return"!";if(null===t.b)return"*"}return t.f()}function W(t,n){if(t&&n){if(t.contains&&1==n.nodeType)return t==n||t.contains(n);if(void 0!==t.compareDocumentPosition)return t==n||16&t.compareDocumentPosition(n);for(;n&&t!=n;)n=n.parentNode;return n==t}}function z(t,n){if(t==n)return 0;if(t.compareDocumentPosition)return 2&t.compareDocumentPosition(n)?1:-1;if(O&&!(9<=Number(B))){if(9==t.nodeType)return-1;if(9==n.nodeType)return 1}if("sourceIndex"in t||t.parentNode&&"sourceIndex"in t.parentNode){var e=1==t.nodeType,r=1==n.nodeType;if(e&&r)return t.sourceIndex-n.sourceIndex;var o=t.parentNode,i=n.parentNode;return o==i?J(t,n):!e&&W(o,n)?-1*q(t,n):!r&&W(i,t)?q(n,t):(e?t:o).sourceIndex-(r?n:i).sourceIndex}return(e=(r=9==t.nodeType?t:t.ownerDocument||t.document).createRange()).selectNode(t),e.collapse(!0),(r=r.createRange()).selectNode(n),r.collapse(!0),e.compareBoundaryPoints(u.Range.START_TO_END,r)}function q(t,n){var e=t.parentNode;if(e==n)return-1;for(var r=n;r.parentNode!=e;)r=r.parentNode;return J(r,t)}function J(t,n){for(var e=n;e=e.previousSibling;)if(e==t)return-1;return 1}function l(){this.b=this.a=null,this.l=0}function Q(t){this.node=t,this.a=this.b=null}function Z(t,n){if(!t.a)return n;if(!n.a)return t;for(var e=t.a,r=n.a,o=null,i=null,a=0;e&&r;){var i=e.node,u=r.node;i==u||i instanceof F&&u instanceof F&&i.a==u.a?(e=(i=e).a,r=r.a):0<z(e.node,r.node)?r=(i=r).a:e=(i=e).a,(i.b=o)?o.a=i:t.a=i,o=i,a++}for(i=e||r;i;)i.b=o,a++,i=(o=o.a=i).a;return t.b=o,t.l=a,t}function tt(t,n){n=new Q(n);n.a=t.a,t.b?t.a.b=n:t.a=t.b=n,t.a=n,t.l++}function h(t,n){n=new Q(n);n.b=t.b,t.a?t.b.a=n:t.a=t.b=n,t.b=n,t.l++}function nt(t){return(t=t.a)?t.node:null}function et(t){return(t=nt(t))?Y(t):""}function rt(t,n){return new ot(t,!!n)}function ot(t,n){this.f=t,this.b=(this.c=n)?t.b:t.a,this.a=null}function p(t){var n=t.b;if(null==n)return null;var e=t.a=n;return t.b=t.c?n.b:n.a,e.node}function it(t){this.i=t,this.b=this.g=!1,this.f=null}function e(t){return"\n  "+t.toString().split("\n").join("\n  ")}function at(t,n){t.g=n}function ut(t,n){t.b=n}function i(t,n){t=t.a(n);return t instanceof l?+et(t):+t}function a(t,n){t=t.a(n);return t instanceof l?et(t):""+t}function st(t,n){t=t.a(n);return t instanceof l?!!t.l:!!t}function ct(t,n,e){it.call(this,t.i),this.c=t,this.h=n,this.o=e,this.g=n.g||e.g,this.b=n.b||e.b,this.c==dt&&(e.b||e.g||4==e.i||0==e.i||!n.f?n.b||n.g||4==n.i||0==n.i||!e.f||(this.f={name:e.f.name,s:n}):this.f={name:n.f.name,s:e})}function ft(t,n,e,r,o){if(n=n.a(r),e=e.a(r),n instanceof l&&e instanceof l){for(r=p(n=rt(n));r;r=p(n))for(i=p(o=rt(e));i;i=p(o))if(t(Y(r),Y(i)))return!0;return!1}if(n instanceof l||e instanceof l){for(var i,a=typeof(r=n instanceof l?(o=n,e):(o=e,n)),u=p(i=rt(o));u;u=p(i)){switch(a){case"number":u=+Y(u);break;case"boolean":u=!!Y(u);break;case"string":u=Y(u);break;default:throw Error("Illegal primitive type for comparison.")}if(o==n&&t(u,r)||o==e&&t(r,u))return!0}return!1}return o?"boolean"==typeof n||"boolean"==typeof e?t(!!n,!!e):"number"==typeof n||"number"==typeof e?t(+n,+e):t(n,e):t(+n,+e)}function lt(t,n,e,r){this.a=t,this.w=n,this.i=e,this.m=r}!D&&!O||O&&9<=Number(B)||D&&j("1.9.1"),O&&j("9"),g(ct),ct.prototype.a=function(t){return this.c.m(this.h,this.o,t)},ct.prototype.toString=function(){return"Binary Expression: "+this.c+e(this.h)+e(this.o)},lt.prototype.toString=function(){return this.a};var ht={};function pt(t,n,e,r){if(ht.hasOwnProperty(t))throw Error("Binary operator already created: "+t);return t=new lt(t,n,e,r),ht[t.toString()]=t}pt("div",6,1,function(t,n,e){return i(t,e)/i(n,e)}),pt("mod",6,1,function(t,n,e){return i(t,e)%i(n,e)}),pt("*",6,1,function(t,n,e){return i(t,e)*i(n,e)}),pt("+",5,1,function(t,n,e){return i(t,e)+i(n,e)}),pt("-",5,1,function(t,n,e){return i(t,e)-i(n,e)}),pt("<",4,2,function(t,n,e){return ft(function(t,n){return t<n},t,n,e)}),pt(">",4,2,function(t,n,e){return ft(function(t,n){return n<t},t,n,e)}),pt("<=",4,2,function(t,n,e){return ft(function(t,n){return t<=n},t,n,e)}),pt(">=",4,2,function(t,n,e){return ft(function(t,n){return n<=t},t,n,e)});var dt=pt("=",3,2,function(t,n,e){return ft(function(t,n){return t==n},t,n,e,!0)});function gt(t,n,e){this.a=t,this.b=n||1,this.f=e||1}function yt(t,n){if(n.a.length&&4!=t.i)throw Error("Primary expression must evaluate to nodeset if filter has predicate(s).");it.call(this,t.i),this.c=t,this.h=n,this.g=t.g,this.b=t.b}function wt(e,t){if(t.length<e.A)throw Error("Function "+e.j+" expects at least"+e.A+" arguments, "+t.length+" given");if(null!==e.v&&t.length>e.v)throw Error("Function "+e.j+" expects at most "+e.v+" arguments, "+t.length+" given");e.B&&v(t,function(t,n){if(4!=t.i)throw Error("Argument "+n+" to function "+e.j+" is not of type Nodeset: "+t)}),it.call(this,e.i),this.h=e,this.c=t,at(this,e.g||x(t,function(t){return t.g})),ut(this,e.D&&!t.length||e.C&&!!t.length||x(t,function(t){return t.b}))}function bt(t,n,e,r,o,i,a,u,s){this.j=t,this.i=n,this.g=e,this.D=r,this.C=o,this.m=i,this.A=a,this.v=void 0!==u?u:a,this.B=!!s}pt("!=",3,2,function(t,n,e){return ft(function(t,n){return t!=n},t,n,e,!0)}),pt("and",2,2,function(t,n,e){return st(t,e)&&st(n,e)}),pt("or",1,2,function(t,n,e){return st(t,e)||st(n,e)}),g(yt),yt.prototype.a=function(t){return t=this.c.a(t),_t(this.h,t)},yt.prototype.toString=function(){return"Filter:"+e(this.c)+e(this.h)},g(wt),wt.prototype.a=function(t){return this.h.m.apply(null,function(){return Array.prototype.concat.apply(Array.prototype,arguments)}(t,this.c))},wt.prototype.toString=function(){var t,n="Function: "+this.h;return this.c.length&&(t=N(this.c,function(t,n){return t+e(n)},"Arguments:"),n+=e(t)),n};var mt={};function n(t,n,e,r,o,i,a,u){if(mt.hasOwnProperty(t))throw Error("Function already created: "+t+".");mt[t]=new bt(t,n,e,r,!1,o,i,a,u)}function vt(t,n){switch(this.h=t,this.c=void 0!==n?n:null,this.b=null,t){case"comment":this.b=8;break;case"text":this.b=3;break;case"processing-instruction":this.b=7;break;case"node":break;default:throw Error("Unexpected argument")}}function Et(t){return"comment"==t||"text"==t||"processing-instruction"==t||"node"==t}function Nt(t){this.b=t,this.a=0}n("boolean",2,!(bt.prototype.toString=function(){return this.j}),!1,function(t,n){return st(n,t)},1),n("ceiling",1,!1,!1,function(t,n){return Math.ceil(i(n,t))},1),n("concat",3,!1,!1,function(e,t){return N(function(t,n,e){return arguments.length<=2?Array.prototype.slice.call(t,n):Array.prototype.slice.call(t,n,e)}(arguments,1),function(t,n){return t+a(n,e)},"")},2,null),n("contains",2,!1,!1,function(t,n,e){return w(a(n,t),a(e,t))},2),n("count",1,!1,!1,function(t,n){return n.a(t).l},1,1,!0),n("false",2,!1,!1,function(){return!1},0),n("floor",1,!1,!1,function(t,n){return Math.floor(i(n,t))},1),n("id",4,!1,!1,function(t,n){function e(n){if(U){var t=u.all[n];if(t){if(t.nodeType&&n==t.id)return t;if(t.length){var e=t;var r=function(t){return n==t.id};t:{for(var o=e.length,i=f(e)?e.split(""):e,a=0;a<o;a++)if(a in i&&r.call(void 0,i[a],a,e)){o=a;break t}o=-1}return o<0?null:f(e)?e.charAt(o):e[o];return}}return null}return u.getElementById(n)}var u=9==(r=t.a).nodeType?r:r.ownerDocument,r=a(n,t).split(/\s+/),o=[],i=(v(r,function(t){!(t=e(t))||0<=m(o,t)||o.push(t)}),o.sort(z),new l);return v(o,function(t){h(i,t)}),i},1),n("lang",2,!1,!1,function(){return!1},1),n("last",1,!0,!1,function(t){if(1!=arguments.length)throw Error("Function last expects ()");return t.f},0),n("local-name",3,!1,!0,function(t,n){n=n?nt(n.a(t)):t.a;return n?n.localName||n.nodeName.toLowerCase():""},0,1,!0),n("name",3,!1,!0,function(t,n){n=n?nt(n.a(t)):t.a;return n?n.nodeName.toLowerCase():""},0,1,!0),n("namespace-uri",3,!0,!1,function(){return""},0,1,!0),n("normalize-space",3,!1,!0,function(t,n){return(n?a(n,t):Y(t.a)).replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")},0,1),n("not",2,!1,!1,function(t,n){return!st(n,t)},1),n("number",1,!1,!0,function(t,n){return n?i(n,t):+Y(t.a)},0,1),n("position",1,!0,!1,function(t){return t.b},0),n("round",1,!1,!1,function(t,n){return Math.round(i(n,t))},1),n("starts-with",2,!1,!1,function(t,n,e){return n=a(n,t),t=a(e,t),0==n.lastIndexOf(t,0)},2),n("string",3,!1,!0,function(t,n){return n?a(n,t):Y(t.a)},0,1),n("string-length",1,!1,!0,function(t,n){return(n?a(n,t):Y(t.a)).length},0,1),n("substring",3,!1,!1,function(t,n,e,r){if(e=i(e,t),isNaN(e)||1/0==e||-1/0==e)return"";if(r=r?i(r,t):1/0,isNaN(r)||-1/0===r)return"";e=Math.round(e)-1;var o=Math.max(e,0);return t=a(n,t),1/0==r?t.substring(o):t.substring(o,e+Math.round(r))},2,3),n("substring-after",3,!1,!1,function(t,n,e){return n=a(n,t),t=a(e,t),-1==(e=n.indexOf(t))?"":n.substring(e+t.length)},2),n("substring-before",3,!1,!1,function(t,n,e){return n=a(n,t),t=a(e,t),-1==(t=n.indexOf(t))?"":n.substring(0,t)},2),n("sum",1,!1,!1,function(t,n){for(var e=rt(n.a(t)),r=0,o=p(e);o;o=p(e))r+=+Y(o);return r},1,1,!0),n("translate",3,!1,!1,function(t,n,e,r){n=a(n,t),e=a(e,t);var o=a(r,t);for(t={},r=0;r<e.length;r++){var i=e.charAt(r);i in t||(t[i]=o.charAt(r))}for(e="",r=0;r<n.length;r++)e+=(i=n.charAt(r))in t?t[i]:i;return e},3),n("true",2,!1,!1,function(){return!0},0),vt.prototype.a=function(t){return null===this.b||this.b==t.nodeType},vt.prototype.f=function(){return this.h},vt.prototype.toString=function(){var t="Kind Test: "+this.h;return null===this.c||(t+=e(this.c)),t};var xt=/\$?(?:(?![0-9-\.])(?:\*|[\w-\.]+):)?(?![0-9-\.])(?:\*|[\w-\.]+)|\/\/|\.\.|::|\d+(?:\.\d*)?|\.\d+|"[^"]*"|'[^']*'|[!<>]=|\s+|./g,St=/^\s/;function s(t,n){return t.b[t.a+(n||0)]}function c(t){return t.b[t.a++]}function Tt(t){return t.b.length<=t.a}function At(t){it.call(this,3),this.c=t.substring(1,t.length-1)}function Ot(t,n){this.j=t.toLowerCase(),t="*"==this.j?"*":"http://www.w3.org/1999/xhtml",this.c=n?n.toLowerCase():t}function It(t,n){it.call(this,t.i),this.h=t,this.c=n,this.g=t.g,this.b=t.b,1==this.c.length&&((n=this.c[0]).u||n.c!=Lt||"*"!=(n=n.o).f()&&(this.f={name:n.f(),s:null}))}function Dt(){it.call(this,4)}function Pt(){it.call(this,4)}function Rt(t){return"/"==t||"//"==t}function kt(t){it.call(this,4),this.c=t,at(this,x(this.c,function(t){return t.g})),ut(this,x(this.c,function(t){return t.b}))}function Ct(t,n){this.a=t,this.b=!!n}function _t(t,n,e){for(e=e||0;e<t.a.length;e++)for(var f=t.a[e],r=rt(n),o=n.l,i=0;u=p(r);i++){var a=t.b?o-i:i+1;if("number"==typeof(u=f.a(new gt(u,a,o))))a=a==u;else if("string"==typeof u||"boolean"==typeof u)a=!!u;else{if(!(u instanceof l))throw Error("Predicate.evaluate returned an unexpected type.");a=0<u.l}if(!a){var u=(a=r).f;if(!(c=a.a))throw Error("Next must be called at least once before remove.");var s=c.b,c=c.a;s?s.a=c:u.a=c,c?c.b=s:u.b=s,u.l--,a.a=null}}return n}function jt(t,n,e,r){it.call(this,4),this.c=t,this.o=n,this.h=e||new Ct([]),this.u=!!r,n=0<(n=this.h).a.length?n.a[0].f:null,t.b&&n&&(t=n.name,t=U?t.toLowerCase():t,this.f={name:t,s:n.s});t:{for(t=this.h,n=0;n<t.a.length;n++)if((e=t.a[n]).g||1==e.i||0==e.i){t=!0;break t}t=!1}this.g=t}function Mt(t,n,e,r){this.j=t,this.f=n,this.a=e,this.b=r}g(At),At.prototype.a=function(){return this.c},At.prototype.toString=function(){return"Literal: "+this.c},Ot.prototype.a=function(t){var n=t.nodeType;return(1==n||2==n)&&(n=void 0!==t.localName?t.localName:t.nodeName,("*"==this.j||this.j==n.toLowerCase())&&("*"==this.c||this.c==(t.namespaceURI?t.namespaceURI.toLowerCase():"http://www.w3.org/1999/xhtml")))},Ot.prototype.f=function(){return this.j},Ot.prototype.toString=function(){return"Name Test: "+("http://www.w3.org/1999/xhtml"==this.c?"":this.c+":")+this.j},g(It),g(Dt),Dt.prototype.a=function(t){var n=new l;return 9==(t=t.a).nodeType?h(n,t):h(n,t.ownerDocument),n},Dt.prototype.toString=function(){return"Root Helper Expression"},g(Pt),Pt.prototype.a=function(t){var n=new l;return h(n,t.a),n},Pt.prototype.toString=function(){return"Context Helper Expression"},It.prototype.a=function(t){var n=this.h.a(t);if(!(n instanceof l))throw Error("Filter expression must evaluate to nodeset.");for(var e=0,r=(t=this.c).length;e<r&&n.l;e++){var o,i=t[e],a=rt(n,i.c.a);if(i.g||i.c!=Yt)if(i.g||i.c!=Xt)for(o=p(a),n=i.a(new gt(o));null!=(o=p(a));)n=Z(n,o=i.a(new gt(o)));else o=p(a),n=i.a(new gt(o));else{for(o=p(a);(n=p(a))&&(!o.contains||o.contains(n))&&8&n.compareDocumentPosition(o);o=n);n=i.a(new gt(o))}}return n},It.prototype.toString=function(){var t,n="Path Expression:"+e(this.h);return this.c.length&&(t=N(this.c,function(t,n){return t+e(n)},"Steps:"),n+=e(t)),n},g(kt),kt.prototype.a=function(n){var e=new l;return v(this.c,function(t){if(!((t=t.a(n))instanceof l))throw Error("Path expression must evaluate to NodeSet.");e=Z(e,t)}),e},kt.prototype.toString=function(){return N(this.c,function(t,n){return t+e(n)},"Union Expression:")},Ct.prototype.toString=function(){return N(this.a,function(t,n){return t+e(n)},"Predicates:")},g(jt),jt.prototype.a=function(t){var n=t.a,e=null,r=null,o=null,i=0;if((e=this.f)&&(r=e.name,o=e.s?a(e.s,t):null,i=1),this.u)if(this.g||this.c!=Ft)if(n=p(t=rt(new jt(Vt,new vt("node")).a(t))))for(e=this.m(n,r,o,i);null!=(n=p(t));)e=Z(e,this.m(n,r,o,i));else e=new l;else e=X(this.o,n,r,o),e=_t(this.h,e,i);else e=this.m(t.a,r,o,i);return e},jt.prototype.m=function(t,n,e,r){return t=this.c.f(this.o,t,n,e),_t(this.h,t,r)},jt.prototype.toString=function(){var t,n="Step:"+e("Operator: "+(this.u?"//":"/"));return this.c.j&&(n+=e("Axis: "+this.c)),n+=e(this.o),this.h.a.length&&(t=N(this.h.a,function(t,n){return t+e(n)},"Predicates:"),n+=e(t)),n},Mt.prototype.toString=function(){return this.j};var Bt={};function Ut(t,n,e,r){if(Bt.hasOwnProperty(t))throw Error("Axis already created: "+t);return n=new Mt(t,n,e,!!r),Bt[t]=n}Ut("ancestor",function(t,n){for(var e=new l,r=n;r=r.parentNode;)t.a(r)&&tt(e,r);return e},!0),Ut("ancestor-or-self",function(t,n){for(var e=new l,r=n;t.a(r)&&tt(e,r),r=r.parentNode;);return e},!0);var Lt=Ut("attribute",function(t,n){var e=new l;if("style"==(i=t.f())&&U&&n.style)return h(e,new F(n.style,n,"style",n.style.cssText)),e;var r=n.attributes;if(r)if(t instanceof vt&&null===t.b||"*"==i)for(var o,i=0;o=r[i];i++)U?o.nodeValue&&h(e,V(n,o)):h(e,o);else(o=r.getNamedItem(i))&&(U?o.nodeValue&&h(e,V(n,o)):h(e,o));return e},!1),Ft=Ut("child",function(t,n,e,r,o){return(U?function(t,n,e,r,o){var i,a;return(t instanceof Ot||8==t.b||e&&null===t.b)&&(i=n.childNodes)?(("*"==(a=K(t))||(i=E(i,function(t){return t.tagName&&t.tagName.toLowerCase()==a})))&&(e&&(i=E(i,function(t){return H(t,e,r)})),v(i,function(t){"*"==a&&("!"==t.tagName||"*"==a&&1!=t.nodeType)||h(o,t)})),o):$(t,n,e,r,o)}:$).call(null,t,n,f(e)?e:null,f(r)?r:null,o||new l)},!1,!0),Vt=(Ut("descendant",X,!1,!0),Ut("descendant-or-self",function(t,n,e,r){var o=new l;return H(n,e,r)&&t.a(n)&&h(o,n),X(t,n,e,r,o)},!1,!0)),Yt=Ut("following",function(t,n,e,r){var o=new l;do{for(var i=n;i=i.nextSibling;)H(i,e,r)&&t.a(i)&&h(o,i),o=X(t,i,e,r,o)}while(n=n.parentNode);return o},!1,!0),Ht=(Ut("following-sibling",function(t,n){for(var e=new l,r=n;r=r.nextSibling;)t.a(r)&&h(e,r);return e},!1),Ut("namespace",function(){return new l},!1),Ut("parent",function(t,n){var e=new l;if(9==n.nodeType)return e;if(2==n.nodeType)return h(e,n.ownerElement),e;n=n.parentNode;return t.a(n)&&h(e,n),e},!1)),Xt=Ut("preceding",function(t,n,e,r){for(var o=new l,i=[];i.unshift(n),n=n.parentNode;);for(var a=1,u=i.length;a<u;a++){var s=[];for(n=i[a];n=n.previousSibling;)s.unshift(n);for(var c=0,f=s.length;c<f;c++)H(n=s[c],e,r)&&t.a(n)&&h(o,n),o=X(t,n,e,r,o)}return o},!0,!0),$t=(Ut("preceding-sibling",function(t,n){for(var e=new l,r=n;r=r.previousSibling;)t.a(r)&&tt(e,r);return e},!0),Ut("self",function(t,n){var e=new l;return t.a(n)&&h(e,n),e},!1));function Gt(t){it.call(this,1),this.c=t,this.g=t.g,this.b=t.b}function Kt(t){it.call(this,1),this.c=t}function Wt(t,n){this.a=t,this.b=n}function zt(t){for(var n=[];;){qt(t,"Missing right hand side of binary expression.");var e=function t(n){if("-"==s(n.a))return c(n.a),new Gt(t(n));var e=tn(n);if("|"!=s(n.a))n=e;else{for(e=[e];"|"==c(n.a);)qt(n,"Missing next union location path."),e.push(tn(n));n.a.a--,n=new kt(e)}return n}(t),r=c(t.a);if(!r)break;var o=(r=ht[r]||null)&&r.w;if(!o){t.a.a--;break}for(;n.length&&o<=n[n.length-1].w;)e=new ct(n.pop(),n.pop(),e);n.push(e,r)}for(;n.length;)e=new ct(n.pop(),n.pop(),e);return e}function qt(t,n){if(Tt(t.a))throw Error(n)}function Jt(t,n){t=c(t.a);if(t!=n)throw Error("Bad token, expected: "+n+" got: "+t)}function Qt(t){if(")"!=(t=c(t.a)))throw Error("Bad token: "+t)}function Zt(t){if((t=c(t.a)).length<2)throw Error("Unclosed literal string");return new At(t)}function tn(t){var n,e,r=[];if(Rt(s(t.a))){if(n=c(t.a),e=s(t.a),"/"==n&&(Tt(t.a)||"."!=e&&".."!=e&&"@"!=e&&"*"!=e&&!/(?![0-9])[\w]/.test(e)))return new Dt;e=new Dt,qt(t,"Missing next location step."),n=nn(t,n),r.push(n)}else{t:{switch(e=(n=s(t.a)).charAt(0)){case"$":throw Error("Variable reference not allowed in HTML XPath");case"(":c(t.a),n=zt(t),qt(t,'unclosed "("'),Jt(t,")");break;case'"':case"'":n=Zt(t);break;default:if(isNaN(+n)){if(Et(n)||!/(?![0-9])[\w]/.test(e)||"("!=s(t.a,1)){n=null;break t}for(n=c(t.a),n=mt[n]||null,c(t.a),e=[];")"!=s(t.a)&&(qt(t,"Missing function argument list."),e.push(zt(t)),","==s(t.a));)c(t.a);qt(t,"Unclosed function argument list."),Qt(t),n=new wt(n,e)}else n=new Kt(+c(t.a))}"["==s(t.a)&&(n=new yt(n,e=new Ct(en(t))))}if(n){if(!Rt(s(t.a)))return n;e=n}else n=nn(t,"/"),e=new Pt,r.push(n)}for(;Rt(s(t.a));)n=c(t.a),qt(t,"Missing next location step."),n=nn(t,n),r.push(n);return new It(e,r)}function nn(t,n){var e,r,o,i;if("/"!=n&&"//"!=n)throw Error('Step op should be "/" or "//"');if("."==s(t.a))return r=new jt($t,new vt("node")),c(t.a),r;if(".."==s(t.a))return r=new jt(Ht,new vt("node")),c(t.a),r;if("@"==s(t.a))o=Lt,c(t.a),qt(t,"Missing attribute name");else if("::"==s(t.a,1)){if(!/(?![0-9])[\w]/.test(s(t.a).charAt(0)))throw Error("Bad token: "+c(t.a));if(e=c(t.a),!(o=Bt[e]||null))throw Error("No axis with name: "+e);c(t.a),qt(t,"Missing node name")}else o=Ft;if(e=s(t.a),!/(?![0-9])[\w\*]/.test(e.charAt(0)))throw Error("Bad token: "+c(t.a));if("("==s(t.a,1)){if(!Et(e))throw Error("Invalid node type: "+e);if(!Et(e=c(t.a)))throw Error("Invalid type name: "+e);Jt(t,"("),qt(t,"Bad nodetype");var a,u=null;'"'!=(a=s(t.a).charAt(0))&&"'"!=a||(u=Zt(t)),qt(t,"Bad nodetype"),Qt(t),e=new vt(e,u)}else if(-1==(a=(e=c(t.a)).indexOf(":")))e=new Ot(e);else{if("*"==(u=e.substring(0,a)))i="*";else if(!(i=t.b(u)))throw Error("Namespace prefix not declared: "+u);e=new Ot(e=e.substr(a+1),i)}return a=new Ct(en(t),o.a),r||new jt(o,e,a,"//"==n)}function en(t){for(var n=[];"["==s(t.a);){c(t.a),qt(t,"Missing predicate expression.");var e=zt(t);n.push(e),qt(t,"Unclosed predicate expression."),Jt(t,"]")}return n}function rn(t){switch(t.nodeType){case 1:return function(n){var e=Array.prototype.slice.call(arguments,1);return function(){var t=e.slice();return t.push.apply(t,arguments),n.apply(this,t)}}(an,t);case 9:return rn(t.documentElement);case 11:case 10:case 6:case 12:return on;default:return t.parentNode?rn(t.parentNode):on}}function on(){return null}function an(t,n){if(t.prefix==n)return t.namespaceURI||"http://www.w3.org/1999/xhtml";var e=t.getAttributeNode("xmlns:"+n);return e&&e.specified?e.value||null:t.parentNode&&9!=t.parentNode.nodeType?an(t.parentNode,n):null}function un(t,n){if(!t.length)throw Error("Empty XPath expression.");t=function(t){t=t.match(xt);for(var n=0;n<t.length;n++)St.test(t[n])&&t.splice(n,1);return new Nt(t)}(t);if(Tt(t))throw Error("Invalid XPath expression.");n?"function"==function(t){var n=typeof t;if("object"==n){if(!t)return"null";if(t instanceof Array)return"array";if(t instanceof Object)return n;var e=Object.prototype.toString.call(t);if("[object Window]"==e)return"object";if("[object Array]"==e||"number"==typeof t.length&&void 0!==t.splice&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("splice"))return"array";if("[object Function]"==e||void 0!==t.call&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("call"))return"function"}else if("function"==n&&void 0===t.call)return"object";return n}(n)||(n=d(n.lookupNamespaceURI,n)):n=function(){return null};var e=zt(new Wt(t,n));if(!Tt(t))throw Error("Bad token: "+c(t));this.evaluate=function(t,n){return new sn(e.a(new gt(t)),n)}}function sn(t,n){if(0==n)if(t instanceof l)n=4;else if("string"==typeof t)n=2;else if("number"==typeof t)n=1;else{if("boolean"!=typeof t)throw Error("Unexpected evaluation result.");n=3}if(2!=n&&1!=n&&3!=n&&!(t instanceof l))throw Error("value could not be converted to the specified type");switch(this.resultType=n){case 2:this.stringValue=t instanceof l?et(t):""+t;break;case 1:this.numberValue=t instanceof l?+et(t):+t;break;case 3:this.booleanValue=t instanceof l?0<t.l:!!t;break;case 4:case 5:case 6:case 7:for(var e=rt(t),r=[],o=p(e);o;o=p(e))r.push(o instanceof F?o.a:o);this.snapshotLength=t.l,this.invalidIteratorState=!1;break;case 8:case 9:e=nt(t),this.singleNodeValue=e instanceof F?e.a:e;break;default:throw Error("Unknown XPathResult type.")}var i=0;this.iterateNext=function(){if(4!=n&&5!=n)throw Error("iterateNext called with wrong result type");return i>=r.length?null:r[i++]},this.snapshotItem=function(t){if(6!=n&&7!=n)throw Error("snapshotItem called with wrong result type");return t>=r.length||t<0?null:r[t]}}function cn(t){this.lookupNamespaceURI=rn(t)}function fn(t,n){var t=t||u,e=t.Document&&t.Document.prototype||t.document;e.evaluate&&!n||(t.XPathResult=sn,e.evaluate=function(t,n,e,r){return new un(t,e).evaluate(n,r)},e.createExpression=function(t,n){return new un(t,n)},e.createNSResolver=function(t){return new cn(t)})}g(Gt),Gt.prototype.a=function(t){return-i(this.c,t)},Gt.prototype.toString=function(){return"Unary Expression: -"+e(this.c)},g(Kt),Kt.prototype.a=function(){return this.c},Kt.prototype.toString=function(){return"Number: "+this.c},sn.ANY_TYPE=0,sn.NUMBER_TYPE=1,sn.STRING_TYPE=2,sn.BOOLEAN_TYPE=3,sn.UNORDERED_NODE_ITERATOR_TYPE=4,sn.ORDERED_NODE_ITERATOR_TYPE=5,sn.UNORDERED_NODE_SNAPSHOT_TYPE=6,sn.ORDERED_NODE_SNAPSHOT_TYPE=7,sn.ANY_UNORDERED_NODE_TYPE=8,sn.FIRST_ORDERED_NODE_TYPE=9;var ln,hn=["wgxpath","install"],pn=u;hn[0]in pn||!pn.execScript||pn.execScript("var "+hn[0]);for(;hn.length&&(ln=hn.shift());)hn.length?pn=pn[ln]||(pn[ln]={}):pn[ln]=fn}.call(this);