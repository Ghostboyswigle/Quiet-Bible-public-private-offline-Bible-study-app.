(()=>{var UV=Object.create;var b3=Object.defineProperty;var FV=Object.getOwnPropertyDescriptor;var WV=Object.getOwnPropertyNames;var GV=Object.getPrototypeOf,jV=Object.prototype.hasOwnProperty;var rt=(e,t)=>()=>(e&&(t=e(e=0)),t);var fa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),g8=(e,t)=>{for(var a in t)b3(e,a,{get:t[a],enumerable:!0})},XV=(e,t,a,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of WV(t))!jV.call(e,r)&&r!==a&&b3(e,r,{get:()=>t[r],enumerable:!(i=FV(t,r))||i.enumerable});return e};var ct=(e,t,a)=>(a=e!=null?UV(GV(e)):{},XV(t||!e||!e.__esModule?b3(a,"default",{value:e,enumerable:!0}):a,e));function b0(e){return`${_3}/translations/${e}.json`}function A3(e){return`${_3}/cross-references/${e}.json`}function p8(e){return`${_3}/words/${e}.json`}var _3,Lr=rt(()=>{_3="data"});var B8=fa(jt=>{"use strict";var E3=Symbol.for("react.transitional.element"),qV=Symbol.for("react.portal"),ZV=Symbol.for("react.fragment"),YV=Symbol.for("react.strict_mode"),KV=Symbol.for("react.profiler"),JV=Symbol.for("react.consumer"),QV=Symbol.for("react.context"),$V=Symbol.for("react.forward_ref"),tw=Symbol.for("react.suspense"),ew=Symbol.for("react.memo"),x8=Symbol.for("react.lazy"),aw=Symbol.for("react.activity"),f8=Symbol.iterator;function iw(e){return e===null||typeof e!="object"?null:(e=f8&&e[f8]||e["@@iterator"],typeof e=="function"?e:null)}var H8={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},L8=Object.assign,V8={};function A0(e,t,a){this.props=e,this.context=t,this.refs=V8,this.updater=a||H8}A0.prototype.isReactComponent={};A0.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};A0.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function w8(){}w8.prototype=A0.prototype;function R3(e,t,a){this.props=e,this.context=t,this.refs=V8,this.updater=a||H8}var D3=R3.prototype=new w8;D3.constructor=R3;L8(D3,A0.prototype);D3.isPureReactComponent=!0;var M8=Array.isArray;function O3(){}var R1={H:null,A:null,T:null,S:null},y8=Object.prototype.hasOwnProperty;function I3(e,t,a){var i=a.ref;return{$$typeof:E3,type:e,key:t,ref:i!==void 0?i:null,props:a}}function rw(e,t){return I3(e.type,t,e.props)}function P3(e){return typeof e=="object"&&e!==null&&e.$$typeof===E3}function nw(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return t[a]})}var m8=/\/+/g;function T3(e,t){return typeof e=="object"&&e!==null&&e.key!=null?nw(""+e.key):t.toString(36)}function hw(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(O3,O3):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function _0(e,t,a,i,r){var n=typeof e;(n==="undefined"||n==="boolean")&&(e=null);var h=!1;if(e===null)h=!0;else switch(n){case"bigint":case"string":case"number":h=!0;break;case"object":switch(e.$$typeof){case E3:case qV:h=!0;break;case x8:return h=e._init,_0(h(e._payload),t,a,i,r)}}if(h)return r=r(e),h=i===""?"."+T3(e,0):i,M8(r)?(a="",h!=null&&(a=h.replace(m8,"$&/")+"/"),_0(r,t,a,"",function(l){return l})):r!=null&&(P3(r)&&(r=rw(r,a+(r.key==null||e&&e.key===r.key?"":(""+r.key).replace(m8,"$&/")+"/")+h)),t.push(r)),1;h=0;var c=i===""?".":i+":";if(M8(e))for(var o=0;o<e.length;o++)i=e[o],n=c+T3(i,o),h+=_0(i,t,a,n,r);else if(o=iw(e),typeof o=="function")for(e=o.call(e),o=0;!(i=e.next()).done;)i=i.value,n=c+T3(i,o++),h+=_0(i,t,a,n,r);else if(n==="object"){if(typeof e.then=="function")return _0(hw(e),t,a,i,r);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return h}function Ic(e,t,a){if(e==null)return e;var i=[],r=0;return _0(e,i,"","",function(n){return t.call(a,n,r++)}),i}function cw(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var z8=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ow={map:Ic,forEach:function(e,t,a){Ic(e,function(){t.apply(this,arguments)},a)},count:function(e){var t=0;return Ic(e,function(){t++}),t},toArray:function(e){return Ic(e,function(t){return t})||[]},only:function(e){if(!P3(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};jt.Activity=aw;jt.Children=ow;jt.Component=A0;jt.Fragment=ZV;jt.Profiler=KV;jt.PureComponent=R3;jt.StrictMode=YV;jt.Suspense=tw;jt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=R1;jt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return R1.H.useMemoCache(e)}};jt.cache=function(e){return function(){return e.apply(null,arguments)}};jt.cacheSignal=function(){return null};jt.cloneElement=function(e,t,a){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=L8({},e.props),r=e.key;if(t!=null)for(n in t.key!==void 0&&(r=""+t.key),t)!y8.call(t,n)||n==="key"||n==="__self"||n==="__source"||n==="ref"&&t.ref===void 0||(i[n]=t[n]);var n=arguments.length-2;if(n===1)i.children=a;else if(1<n){for(var h=Array(n),c=0;c<n;c++)h[c]=arguments[c+2];i.children=h}return I3(e.type,r,i)};jt.createContext=function(e){return e={$$typeof:QV,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:JV,_context:e},e};jt.createElement=function(e,t,a){var i,r={},n=null;if(t!=null)for(i in t.key!==void 0&&(n=""+t.key),t)y8.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(r[i]=t[i]);var h=arguments.length-2;if(h===1)r.children=a;else if(1<h){for(var c=Array(h),o=0;o<h;o++)c[o]=arguments[o+2];r.children=c}if(e&&e.defaultProps)for(i in h=e.defaultProps,h)r[i]===void 0&&(r[i]=h[i]);return I3(e,n,r)};jt.createRef=function(){return{current:null}};jt.forwardRef=function(e){return{$$typeof:$V,render:e}};jt.isValidElement=P3;jt.lazy=function(e){return{$$typeof:x8,_payload:{_status:-1,_result:e},_init:cw}};jt.memo=function(e,t){return{$$typeof:ew,type:e,compare:t===void 0?null:t}};jt.startTransition=function(e){var t=R1.T,a={};R1.T=a;try{var i=e(),r=R1.S;r!==null&&r(a,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(O3,z8)}catch(n){z8(n)}finally{t!==null&&a.types!==null&&(t.types=a.types),R1.T=t}};jt.unstable_useCacheRefresh=function(){return R1.H.useCacheRefresh()};jt.use=function(e){return R1.H.use(e)};jt.useActionState=function(e,t,a){return R1.H.useActionState(e,t,a)};jt.useCallback=function(e,t){return R1.H.useCallback(e,t)};jt.useContext=function(e){return R1.H.useContext(e)};jt.useDebugValue=function(){};jt.useDeferredValue=function(e,t){return R1.H.useDeferredValue(e,t)};jt.useEffect=function(e,t){return R1.H.useEffect(e,t)};jt.useEffectEvent=function(e){return R1.H.useEffectEvent(e)};jt.useId=function(){return R1.H.useId()};jt.useImperativeHandle=function(e,t,a){return R1.H.useImperativeHandle(e,t,a)};jt.useInsertionEffect=function(e,t){return R1.H.useInsertionEffect(e,t)};jt.useLayoutEffect=function(e,t){return R1.H.useLayoutEffect(e,t)};jt.useMemo=function(e,t){return R1.H.useMemo(e,t)};jt.useOptimistic=function(e,t){return R1.H.useOptimistic(e,t)};jt.useReducer=function(e,t,a){return R1.H.useReducer(e,t,a)};jt.useRef=function(e){return R1.H.useRef(e)};jt.useState=function(e){return R1.H.useState(e)};jt.useSyncExternalStore=function(e,t,a){return R1.H.useSyncExternalStore(e,t,a)};jt.useTransition=function(){return R1.H.useTransition()};jt.version="19.2.6"});var u1=fa((VO,C8)=>{"use strict";C8.exports=B8()});var D8=fa(U1=>{"use strict";function W3(e,t){var a=e.length;e.push(t);t:for(;0<a;){var i=a-1>>>1,r=e[i];if(0<Pc(r,t))e[i]=t,e[a]=r,a=i;else break t}}function Ma(e){return e.length===0?null:e[0]}function Uc(e){if(e.length===0)return null;var t=e[0],a=e.pop();if(a!==t){e[0]=a;t:for(var i=0,r=e.length,n=r>>>1;i<n;){var h=2*(i+1)-1,c=e[h],o=h+1,l=e[o];if(0>Pc(c,a))o<r&&0>Pc(l,c)?(e[i]=l,e[o]=a,i=o):(e[i]=c,e[h]=a,i=h);else if(o<r&&0>Pc(l,a))e[i]=l,e[o]=a,i=o;else break t}}return t}function Pc(e,t){var a=e.sortIndex-t.sortIndex;return a!==0?a:e.id-t.id}U1.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(k8=performance,U1.unstable_now=function(){return k8.now()}):(N3=Date,S8=N3.now(),U1.unstable_now=function(){return N3.now()-S8});var k8,N3,S8,Ia=[],Vi=[],lw=1,Ee=null,D2=3,G3=!1,M4=!1,m4=!1,j3=!1,A8=typeof setTimeout=="function"?setTimeout:null,T8=typeof clearTimeout=="function"?clearTimeout:null,b8=typeof setImmediate<"u"?setImmediate:null;function Nc(e){for(var t=Ma(Vi);t!==null;){if(t.callback===null)Uc(Vi);else if(t.startTime<=e)Uc(Vi),t.sortIndex=t.expirationTime,W3(Ia,t);else break;t=Ma(Vi)}}function X3(e){if(m4=!1,Nc(e),!M4)if(Ma(Ia)!==null)M4=!0,O0||(O0=!0,T0());else{var t=Ma(Vi);t!==null&&q3(X3,t.startTime-e)}}var O0=!1,z4=-1,O8=5,E8=-1;function R8(){return j3?!0:!(U1.unstable_now()-E8<O8)}function U3(){if(j3=!1,O0){var e=U1.unstable_now();E8=e;var t=!0;try{t:{M4=!1,m4&&(m4=!1,T8(z4),z4=-1),G3=!0;var a=D2;try{e:{for(Nc(e),Ee=Ma(Ia);Ee!==null&&!(Ee.expirationTime>e&&R8());){var i=Ee.callback;if(typeof i=="function"){Ee.callback=null,D2=Ee.priorityLevel;var r=i(Ee.expirationTime<=e);if(e=U1.unstable_now(),typeof r=="function"){Ee.callback=r,Nc(e),t=!0;break e}Ee===Ma(Ia)&&Uc(Ia),Nc(e)}else Uc(Ia);Ee=Ma(Ia)}if(Ee!==null)t=!0;else{var n=Ma(Vi);n!==null&&q3(X3,n.startTime-e),t=!1}}break t}finally{Ee=null,D2=a,G3=!1}t=void 0}}finally{t?T0():O0=!1}}}var T0;typeof b8=="function"?T0=function(){b8(U3)}:typeof MessageChannel<"u"?(F3=new MessageChannel,_8=F3.port2,F3.port1.onmessage=U3,T0=function(){_8.postMessage(null)}):T0=function(){A8(U3,0)};var F3,_8;function q3(e,t){z4=A8(function(){e(U1.unstable_now())},t)}U1.unstable_IdlePriority=5;U1.unstable_ImmediatePriority=1;U1.unstable_LowPriority=4;U1.unstable_NormalPriority=3;U1.unstable_Profiling=null;U1.unstable_UserBlockingPriority=2;U1.unstable_cancelCallback=function(e){e.callback=null};U1.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O8=0<e?Math.floor(1e3/e):5};U1.unstable_getCurrentPriorityLevel=function(){return D2};U1.unstable_next=function(e){switch(D2){case 1:case 2:case 3:var t=3;break;default:t=D2}var a=D2;D2=t;try{return e()}finally{D2=a}};U1.unstable_requestPaint=function(){j3=!0};U1.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var a=D2;D2=e;try{return t()}finally{D2=a}};U1.unstable_scheduleCallback=function(e,t,a){var i=U1.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?i+a:i):a=i,e){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=a+r,e={id:lw++,callback:t,priorityLevel:e,startTime:a,expirationTime:r,sortIndex:-1},a>i?(e.sortIndex=a,W3(Vi,e),Ma(Ia)===null&&e===Ma(Vi)&&(m4?(T8(z4),z4=-1):m4=!0,q3(X3,a-i))):(e.sortIndex=r,W3(Ia,e),M4||G3||(M4=!0,O0||(O0=!0,T0()))),e};U1.unstable_shouldYield=R8;U1.unstable_wrapCallback=function(e){var t=D2;return function(){var a=D2;D2=t;try{return e.apply(this,arguments)}finally{D2=a}}}});var P8=fa((yO,I8)=>{"use strict";I8.exports=D8()});var U8=fa(Z2=>{"use strict";var dw=u1();function N8(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function wi(){}var q2={d:{f:wi,r:function(){throw Error(N8(522))},D:wi,C:wi,L:wi,m:wi,X:wi,S:wi,M:wi},p:0,findDOMNode:null},sw=Symbol.for("react.portal");function vw(e,t,a){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:sw,key:i==null?null:""+i,children:e,containerInfo:t,implementation:a}}var x4=dw.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Fc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Z2.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=q2;Z2.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(N8(299));return vw(e,t,null,a)};Z2.flushSync=function(e){var t=x4.T,a=q2.p;try{if(x4.T=null,q2.p=2,e)return e()}finally{x4.T=t,q2.p=a,q2.d.f()}};Z2.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,q2.d.C(e,t))};Z2.prefetchDNS=function(e){typeof e=="string"&&q2.d.D(e)};Z2.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var a=t.as,i=Fc(a,t.crossOrigin),r=typeof t.integrity=="string"?t.integrity:void 0,n=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;a==="style"?q2.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:r,fetchPriority:n}):a==="script"&&q2.d.X(e,{crossOrigin:i,integrity:r,fetchPriority:n,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Z2.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var a=Fc(t.as,t.crossOrigin);q2.d.M(e,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&q2.d.M(e)};Z2.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var a=t.as,i=Fc(a,t.crossOrigin);q2.d.L(e,a,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Z2.preloadModule=function(e,t){if(typeof e=="string")if(t){var a=Fc(t.as,t.crossOrigin);q2.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else q2.d.m(e)};Z2.requestFormReset=function(e){q2.d.r(e)};Z2.unstable_batchedUpdates=function(e,t){return e(t)};Z2.useFormState=function(e,t,a){return x4.H.useFormState(e,t,a)};Z2.useFormStatus=function(){return x4.H.useHostTransitionStatus()};Z2.version="19.2.6"});var Z3=fa((CO,W8)=>{"use strict";function F8(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(F8)}catch(e){console.error(e)}}F8(),W8.exports=U8()});var aM=fa(gl=>{"use strict";var p2=P8(),pg=u1(),uw=Z3();function at(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function fg(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hh(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Mg(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function mg(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function G8(e){if(hh(e)!==e)throw Error(at(188))}function gw(e){var t=e.alternate;if(!t){if(t=hh(e),t===null)throw Error(at(188));return t!==e?null:e}for(var a=e,i=t;;){var r=a.return;if(r===null)break;var n=r.alternate;if(n===null){if(i=r.return,i!==null){a=i;continue}break}if(r.child===n.child){for(n=r.child;n;){if(n===a)return G8(r),e;if(n===i)return G8(r),t;n=n.sibling}throw Error(at(188))}if(a.return!==i.return)a=r,i=n;else{for(var h=!1,c=r.child;c;){if(c===a){h=!0,a=r,i=n;break}if(c===i){h=!0,i=r,a=n;break}c=c.sibling}if(!h){for(c=n.child;c;){if(c===a){h=!0,a=n,i=r;break}if(c===i){h=!0,i=n,a=r;break}c=c.sibling}if(!h)throw Error(at(189))}}if(a.alternate!==i)throw Error(at(190))}if(a.tag!==3)throw Error(at(188));return a.stateNode.current===a?e:t}function zg(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=zg(e),t!==null)return t;e=e.sibling}return null}var P1=Object.assign,pw=Symbol.for("react.element"),Wc=Symbol.for("react.transitional.element"),k4=Symbol.for("react.portal"),N0=Symbol.for("react.fragment"),xg=Symbol.for("react.strict_mode"),ks=Symbol.for("react.profiler"),Hg=Symbol.for("react.consumer"),Xa=Symbol.for("react.context"),V9=Symbol.for("react.forward_ref"),Ss=Symbol.for("react.suspense"),bs=Symbol.for("react.suspense_list"),w9=Symbol.for("react.memo"),yi=Symbol.for("react.lazy"),_s=Symbol.for("react.activity"),fw=Symbol.for("react.memo_cache_sentinel"),j8=Symbol.iterator;function H4(e){return e===null||typeof e!="object"?null:(e=j8&&e[j8]||e["@@iterator"],typeof e=="function"?e:null)}var Mw=Symbol.for("react.client.reference");function As(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Mw?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N0:return"Fragment";case ks:return"Profiler";case xg:return"StrictMode";case Ss:return"Suspense";case bs:return"SuspenseList";case _s:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case k4:return"Portal";case Xa:return e.displayName||"Context";case Hg:return(e._context.displayName||"Context")+".Consumer";case V9:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case w9:return t=e.displayName||null,t!==null?t:As(e.type)||"Memo";case yi:t=e._payload,e=e._init;try{return As(e(t))}catch{}}return null}var S4=Array.isArray,Pt=pg.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,p1=uw.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,kr={pending:!1,data:null,method:null,action:null},Ts=[],U0=-1;function La(e){return{current:e}}function H2(e){0>U0||(e.current=Ts[U0],Ts[U0]=null,U0--)}function T1(e,t){U0++,Ts[U0]=e.current,e.current=t}var Ha=La(null),X4=La(null),Ri=La(null),Vo=La(null);function wo(e,t){switch(T1(Ri,t),T1(X4,e),T1(Ha,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Q7(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Q7(t),e=Ff(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}H2(Ha),T1(Ha,e)}function hn(){H2(Ha),H2(X4),H2(Ri)}function Os(e){e.memoizedState!==null&&T1(Vo,e);var t=Ha.current,a=Ff(t,e.type);t!==a&&(T1(X4,e),T1(Ha,a))}function yo(e){X4.current===e&&(H2(Ha),H2(X4)),Vo.current===e&&(H2(Vo),ih._currentValue=kr)}var Y3,X8;function wr(e){if(Y3===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Y3=t&&t[1]||"",X8=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Y3+e+X8}var K3=!1;function J3(e,t){if(!e||K3)return"";K3=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var g=function(){throw Error()};if(Object.defineProperty(g.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(g,[])}catch(u){var d=u}Reflect.construct(e,[],g)}else{try{g.call()}catch(u){d=u}e.call(g.prototype)}}else{try{throw Error()}catch(u){d=u}(g=e())&&typeof g.catch=="function"&&g.catch(function(){})}}catch(u){if(u&&d&&typeof u.stack=="string")return[u.stack,d.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var n=i.DetermineComponentFrameRoot(),h=n[0],c=n[1];if(h&&c){var o=h.split(`
`),l=c.split(`
`);for(r=i=0;i<o.length&&!o[i].includes("DetermineComponentFrameRoot");)i++;for(;r<l.length&&!l[r].includes("DetermineComponentFrameRoot");)r++;if(i===o.length||r===l.length)for(i=o.length-1,r=l.length-1;1<=i&&0<=r&&o[i]!==l[r];)r--;for(;1<=i&&0<=r;i--,r--)if(o[i]!==l[r]){if(i!==1||r!==1)do if(i--,r--,0>r||o[i]!==l[r]){var v=`
`+o[i].replace(" at new "," at ");return e.displayName&&v.includes("<anonymous>")&&(v=v.replace("<anonymous>",e.displayName)),v}while(1<=i&&0<=r);break}}}finally{K3=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?wr(a):""}function mw(e,t){switch(e.tag){case 26:case 27:case 5:return wr(e.type);case 16:return wr("Lazy");case 13:return e.child!==t&&t!==null?wr("Suspense Fallback"):wr("Suspense");case 19:return wr("SuspenseList");case 0:case 15:return J3(e.type,!1);case 11:return J3(e.type.render,!1);case 1:return J3(e.type,!0);case 31:return wr("Activity");default:return""}}function q8(e){try{var t="",a=null;do t+=mw(e,a),a=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Es=Object.prototype.hasOwnProperty,y9=p2.unstable_scheduleCallback,Q3=p2.unstable_cancelCallback,zw=p2.unstable_shouldYield,xw=p2.unstable_requestPaint,fe=p2.unstable_now,Hw=p2.unstable_getCurrentPriorityLevel,Lg=p2.unstable_ImmediatePriority,Vg=p2.unstable_UserBlockingPriority,Bo=p2.unstable_NormalPriority,Lw=p2.unstable_LowPriority,wg=p2.unstable_IdlePriority,Vw=p2.log,ww=p2.unstable_setDisableYieldValue,ch=null,Me=null;function _i(e){if(typeof Vw=="function"&&ww(e),Me&&typeof Me.setStrictMode=="function")try{Me.setStrictMode(ch,e)}catch{}}var me=Math.clz32?Math.clz32:Cw,yw=Math.log,Bw=Math.LN2;function Cw(e){return e>>>=0,e===0?32:31-(yw(e)/Bw|0)|0}var Gc=256,jc=262144,Xc=4194304;function yr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Qo(e,t,a){var i=e.pendingLanes;if(i===0)return 0;var r=0,n=e.suspendedLanes,h=e.pingedLanes;e=e.warmLanes;var c=i&134217727;return c!==0?(i=c&~n,i!==0?r=yr(i):(h&=c,h!==0?r=yr(h):a||(a=c&~e,a!==0&&(r=yr(a))))):(c=i&~n,c!==0?r=yr(c):h!==0?r=yr(h):a||(a=i&~e,a!==0&&(r=yr(a)))),r===0?0:t!==0&&t!==r&&(t&n)===0&&(n=r&-r,a=t&-t,n>=a||n===32&&(a&4194048)!==0)?t:r}function oh(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function kw(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yg(){var e=Xc;return Xc<<=1,(Xc&62914560)===0&&(Xc=4194304),e}function $3(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function lh(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Sw(e,t,a,i,r,n){var h=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var c=e.entanglements,o=e.expirationTimes,l=e.hiddenUpdates;for(a=h&~a;0<a;){var v=31-me(a),g=1<<v;c[v]=0,o[v]=-1;var d=l[v];if(d!==null)for(l[v]=null,v=0;v<d.length;v++){var u=d[v];u!==null&&(u.lane&=-536870913)}a&=~g}i!==0&&Bg(e,i,0),n!==0&&r===0&&e.tag!==0&&(e.suspendedLanes|=n&~(h&~t))}function Bg(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-me(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|a&261930}function Cg(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var i=31-me(a),r=1<<i;r&t|e[i]&t&&(e[i]|=t),a&=~r}}function kg(e,t){var a=t&-t;return a=(a&42)!==0?1:B9(a),(a&(e.suspendedLanes|t))!==0?0:a}function B9(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function C9(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Sg(){var e=p1.p;return e!==0?e:(e=window.event,e===void 0?32:$f(e.type))}function Z8(e,t){var a=p1.p;try{return p1.p=e,t()}finally{p1.p=a}}var Yi=Math.random().toString(36).slice(2),C2="__reactFiber$"+Yi,re="__reactProps$"+Yi,Mn="__reactContainer$"+Yi,Rs="__reactEvents$"+Yi,bw="__reactListeners$"+Yi,_w="__reactHandles$"+Yi,Y8="__reactResources$"+Yi,dh="__reactMarker$"+Yi;function k9(e){delete e[C2],delete e[re],delete e[Rs],delete e[bw],delete e[_w]}function F0(e){var t=e[C2];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Mn]||a[C2]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=ig(e);e!==null;){if(a=e[C2])return a;e=ig(e)}return t}e=a,a=e.parentNode}return null}function mn(e){if(e=e[C2]||e[Mn]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function b4(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(at(33))}function Q0(e){var t=e[Y8];return t||(t=e[Y8]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function x2(e){e[dh]=!0}var bg=new Set,_g={};function Ir(e,t){cn(e,t),cn(e+"Capture",t)}function cn(e,t){for(_g[e]=t,e=0;e<t.length;e++)bg.add(t[e])}var Aw=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),K8={},J8={};function Tw(e){return Es.call(J8,e)?!0:Es.call(K8,e)?!1:Aw.test(e)?J8[e]=!0:(K8[e]=!0,!1)}function co(e,t,a){if(Tw(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function qc(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Pa(e,t,a,i){if(i===null)e.removeAttribute(a);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+i)}}function De(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ag(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ow(e,t,a){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var r=i.get,n=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(h){a=""+h,n.call(this,h)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return a},setValue:function(h){a=""+h},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ds(e){if(!e._valueTracker){var t=Ag(e)?"checked":"value";e._valueTracker=Ow(e,t,""+e[t])}}function Tg(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),i="";return e&&(i=Ag(e)?e.checked?"true":"false":e.value),e=i,e!==a?(t.setValue(e),!0):!1}function Co(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ew=/[\n"\\]/g;function Ne(e){return e.replace(Ew,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Is(e,t,a,i,r,n,h,c){e.name="",h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"?e.type=h:e.removeAttribute("type"),t!=null?h==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+De(t)):e.value!==""+De(t)&&(e.value=""+De(t)):h!=="submit"&&h!=="reset"||e.removeAttribute("value"),t!=null?Ps(e,h,De(t)):a!=null?Ps(e,h,De(a)):i!=null&&e.removeAttribute("value"),r==null&&n!=null&&(e.defaultChecked=!!n),r!=null&&(e.checked=r&&typeof r!="function"&&typeof r!="symbol"),c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?e.name=""+De(c):e.removeAttribute("name")}function Og(e,t,a,i,r,n,h,c){if(n!=null&&typeof n!="function"&&typeof n!="symbol"&&typeof n!="boolean"&&(e.type=n),t!=null||a!=null){if(!(n!=="submit"&&n!=="reset"||t!=null)){Ds(e);return}a=a!=null?""+De(a):"",t=t!=null?""+De(t):a,c||t===e.value||(e.value=t),e.defaultValue=t}i=i??r,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=c?e.checked:!!i,e.defaultChecked=!!i,h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.name=h),Ds(e)}function Ps(e,t,a){t==="number"&&Co(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function $0(e,t,a,i){if(e=e.options,t){t={};for(var r=0;r<a.length;r++)t["$"+a[r]]=!0;for(a=0;a<e.length;a++)r=t.hasOwnProperty("$"+e[a].value),e[a].selected!==r&&(e[a].selected=r),r&&i&&(e[a].defaultSelected=!0)}else{for(a=""+De(a),t=null,r=0;r<e.length;r++){if(e[r].value===a){e[r].selected=!0,i&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function Eg(e,t,a){if(t!=null&&(t=""+De(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+De(a):""}function Rg(e,t,a,i){if(t==null){if(i!=null){if(a!=null)throw Error(at(92));if(S4(i)){if(1<i.length)throw Error(at(93));i=i[0]}a=i}a==null&&(a=""),t=a}a=De(t),e.defaultValue=a,i=e.textContent,i===a&&i!==""&&i!==null&&(e.value=i),Ds(e)}function on(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Rw=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Q8(e,t,a){var i=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,a):typeof a!="number"||a===0||Rw.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Dg(e,t,a){if(t!=null&&typeof t!="object")throw Error(at(62));if(e=e.style,a!=null){for(var i in a)!a.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var r in t)i=t[r],t.hasOwnProperty(r)&&a[r]!==i&&Q8(e,r,i)}else for(var n in t)t.hasOwnProperty(n)&&Q8(e,n,t[n])}function S9(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dw=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Iw=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function oo(e){return Iw.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function qa(){}var Ns=null;function b9(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var W0=null,tn=null;function $8(e){var t=mn(e);if(t&&(e=t.stateNode)){var a=e[re]||null;t:switch(e=t.stateNode,t.type){case"input":if(Is(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ne(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var i=a[t];if(i!==e&&i.form===e.form){var r=i[re]||null;if(!r)throw Error(at(90));Is(i,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(t=0;t<a.length;t++)i=a[t],i.form===e.form&&Tg(i)}break t;case"textarea":Eg(e,a.value,a.defaultValue);break t;case"select":t=a.value,t!=null&&$0(e,!!a.multiple,t,!1)}}}var ts=!1;function Ig(e,t,a){if(ts)return e(t,a);ts=!0;try{var i=e(t);return i}finally{if(ts=!1,(W0!==null||tn!==null)&&(dl(),W0&&(t=W0,e=tn,tn=W0=null,$8(t),e)))for(t=0;t<e.length;t++)$8(e[t])}}function q4(e,t){var a=e.stateNode;if(a===null)return null;var i=a[re]||null;if(i===null)return null;a=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(at(231,t,typeof a));return a}var Qa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Us=!1;if(Qa)try{E0={},Object.defineProperty(E0,"passive",{get:function(){Us=!0}}),window.addEventListener("test",E0,E0),window.removeEventListener("test",E0,E0)}catch{Us=!1}var E0,Ai=null,_9=null,lo=null;function Pg(){if(lo)return lo;var e,t=_9,a=t.length,i,r="value"in Ai?Ai.value:Ai.textContent,n=r.length;for(e=0;e<a&&t[e]===r[e];e++);var h=a-e;for(i=1;i<=h&&t[a-i]===r[n-i];i++);return lo=r.slice(e,1<i?1-i:void 0)}function so(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Zc(){return!0}function t7(){return!1}function ne(e){function t(a,i,r,n,h){this._reactName=a,this._targetInst=r,this.type=i,this.nativeEvent=n,this.target=h,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(a=e[c],this[c]=a?a(n):n[c]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?Zc:t7,this.isPropagationStopped=t7,this}return P1(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Zc)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Zc)},persist:function(){},isPersistent:Zc}),t}var Pr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$o=ne(Pr),sh=P1({},Pr,{view:0,detail:0}),Pw=ne(sh),es,as,L4,tl=P1({},sh,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:A9,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==L4&&(L4&&e.type==="mousemove"?(es=e.screenX-L4.screenX,as=e.screenY-L4.screenY):as=es=0,L4=e),es)},movementY:function(e){return"movementY"in e?e.movementY:as}}),e7=ne(tl),Nw=P1({},tl,{dataTransfer:0}),Uw=ne(Nw),Fw=P1({},sh,{relatedTarget:0}),is=ne(Fw),Ww=P1({},Pr,{animationName:0,elapsedTime:0,pseudoElement:0}),Gw=ne(Ww),jw=P1({},Pr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Xw=ne(jw),qw=P1({},Pr,{data:0}),a7=ne(qw),Zw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Jw(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Kw[e])?!!t[e]:!1}function A9(){return Jw}var Qw=P1({},sh,{key:function(e){if(e.key){var t=Zw[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=so(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Yw[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:A9,charCode:function(e){return e.type==="keypress"?so(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?so(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),$w=ne(Qw),ty=P1({},tl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),i7=ne(ty),ey=P1({},sh,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:A9}),ay=ne(ey),iy=P1({},Pr,{propertyName:0,elapsedTime:0,pseudoElement:0}),ry=ne(iy),ny=P1({},tl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hy=ne(ny),cy=P1({},Pr,{newState:0,oldState:0}),oy=ne(cy),ly=[9,13,27,32],T9=Qa&&"CompositionEvent"in window,T4=null;Qa&&"documentMode"in document&&(T4=document.documentMode);var dy=Qa&&"TextEvent"in window&&!T4,Ng=Qa&&(!T9||T4&&8<T4&&11>=T4),r7=" ",n7=!1;function Ug(e,t){switch(e){case"keyup":return ly.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fg(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var G0=!1;function sy(e,t){switch(e){case"compositionend":return Fg(t);case"keypress":return t.which!==32?null:(n7=!0,r7);case"textInput":return e=t.data,e===r7&&n7?null:e;default:return null}}function vy(e,t){if(G0)return e==="compositionend"||!T9&&Ug(e,t)?(e=Pg(),lo=_9=Ai=null,G0=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ng&&t.locale!=="ko"?null:t.data;default:return null}}var uy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function h7(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!uy[e.type]:t==="textarea"}function Wg(e,t,a,i){W0?tn?tn.push(i):tn=[i]:W0=i,t=jo(t,"onChange"),0<t.length&&(a=new $o("onChange","change",null,a,i),e.push({event:a,listeners:t}))}var O4=null,Z4=null;function gy(e){Pf(e,0)}function el(e){var t=b4(e);if(Tg(t))return e}function c7(e,t){if(e==="change")return t}var Gg=!1;Qa&&(Qa?(Kc="oninput"in document,Kc||(rs=document.createElement("div"),rs.setAttribute("oninput","return;"),Kc=typeof rs.oninput=="function"),Yc=Kc):Yc=!1,Gg=Yc&&(!document.documentMode||9<document.documentMode));var Yc,Kc,rs;function o7(){O4&&(O4.detachEvent("onpropertychange",jg),Z4=O4=null)}function jg(e){if(e.propertyName==="value"&&el(Z4)){var t=[];Wg(t,Z4,e,b9(e)),Ig(gy,t)}}function py(e,t,a){e==="focusin"?(o7(),O4=t,Z4=a,O4.attachEvent("onpropertychange",jg)):e==="focusout"&&o7()}function fy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return el(Z4)}function My(e,t){if(e==="click")return el(t)}function my(e,t){if(e==="input"||e==="change")return el(t)}function zy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var xe=typeof Object.is=="function"?Object.is:zy;function Y4(e,t){if(xe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(i=0;i<a.length;i++){var r=a[i];if(!Es.call(t,r)||!xe(e[r],t[r]))return!1}return!0}function l7(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function d7(e,t){var a=l7(e);e=0;for(var i;a;){if(a.nodeType===3){if(i=e+a.textContent.length,e<=t&&i>=t)return{node:a,offset:t-e};e=i}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=l7(a)}}function Xg(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Xg(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qg(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Co(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Co(e.document)}return t}function O9(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var xy=Qa&&"documentMode"in document&&11>=document.documentMode,j0=null,Fs=null,E4=null,Ws=!1;function s7(e,t,a){var i=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ws||j0==null||j0!==Co(i)||(i=j0,"selectionStart"in i&&O9(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),E4&&Y4(E4,i)||(E4=i,i=jo(Fs,"onSelect"),0<i.length&&(t=new $o("onSelect","select",null,t,a),e.push({event:t,listeners:i}),t.target=j0)))}function Vr(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var X0={animationend:Vr("Animation","AnimationEnd"),animationiteration:Vr("Animation","AnimationIteration"),animationstart:Vr("Animation","AnimationStart"),transitionrun:Vr("Transition","TransitionRun"),transitionstart:Vr("Transition","TransitionStart"),transitioncancel:Vr("Transition","TransitionCancel"),transitionend:Vr("Transition","TransitionEnd")},ns={},Zg={};Qa&&(Zg=document.createElement("div").style,"AnimationEvent"in window||(delete X0.animationend.animation,delete X0.animationiteration.animation,delete X0.animationstart.animation),"TransitionEvent"in window||delete X0.transitionend.transition);function Nr(e){if(ns[e])return ns[e];if(!X0[e])return e;var t=X0[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Zg)return ns[e]=t[a];return e}var Yg=Nr("animationend"),Kg=Nr("animationiteration"),Jg=Nr("animationstart"),Hy=Nr("transitionrun"),Ly=Nr("transitionstart"),Vy=Nr("transitioncancel"),Qg=Nr("transitionend"),$g=new Map,Gs="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Gs.push("scrollEnd");function aa(e,t){$g.set(e,t),Ir(t,[e])}var ko=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Re=[],q0=0,E9=0;function al(){for(var e=q0,t=E9=q0=0;t<e;){var a=Re[t];Re[t++]=null;var i=Re[t];Re[t++]=null;var r=Re[t];Re[t++]=null;var n=Re[t];if(Re[t++]=null,i!==null&&r!==null){var h=i.pending;h===null?r.next=r:(r.next=h.next,h.next=r),i.pending=r}n!==0&&tp(a,r,n)}}function il(e,t,a,i){Re[q0++]=e,Re[q0++]=t,Re[q0++]=a,Re[q0++]=i,E9|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function R9(e,t,a,i){return il(e,t,a,i),So(e)}function Ur(e,t){return il(e,null,null,t),So(e)}function tp(e,t,a){e.lanes|=a;var i=e.alternate;i!==null&&(i.lanes|=a);for(var r=!1,n=e.return;n!==null;)n.childLanes|=a,i=n.alternate,i!==null&&(i.childLanes|=a),n.tag===22&&(e=n.stateNode,e===null||e._visibility&1||(r=!0)),e=n,n=n.return;return e.tag===3?(n=e.stateNode,r&&t!==null&&(r=31-me(a),e=n.hiddenUpdates,i=e[r],i===null?e[r]=[t]:i.push(t),t.lane=a|536870912),n):null}function So(e){if(50<G4)throw G4=0,s9=null,Error(at(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Z0={};function wy(e,t,a,i){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ge(e,t,a,i){return new wy(e,t,a,i)}function D9(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ya(e,t){var a=e.alternate;return a===null?(a=ge(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function ep(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function vo(e,t,a,i,r,n){var h=0;if(i=e,typeof e=="function")D9(e)&&(h=1);else if(typeof e=="string")h=CB(e,a,Ha.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case _s:return e=ge(31,a,t,r),e.elementType=_s,e.lanes=n,e;case N0:return Sr(a.children,r,n,t);case xg:h=8,r|=24;break;case ks:return e=ge(12,a,t,r|2),e.elementType=ks,e.lanes=n,e;case Ss:return e=ge(13,a,t,r),e.elementType=Ss,e.lanes=n,e;case bs:return e=ge(19,a,t,r),e.elementType=bs,e.lanes=n,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Xa:h=10;break t;case Hg:h=9;break t;case V9:h=11;break t;case w9:h=14;break t;case yi:h=16,i=null;break t}h=29,a=Error(at(130,e===null?"null":typeof e,"")),i=null}return t=ge(h,a,t,r),t.elementType=e,t.type=i,t.lanes=n,t}function Sr(e,t,a,i){return e=ge(7,e,i,t),e.lanes=a,e}function hs(e,t,a){return e=ge(6,e,null,t),e.lanes=a,e}function ap(e){var t=ge(18,null,null,0);return t.stateNode=e,t}function cs(e,t,a){return t=ge(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var v7=new WeakMap;function Ue(e,t){if(typeof e=="object"&&e!==null){var a=v7.get(e);return a!==void 0?a:(t={value:e,source:t,stack:q8(t)},v7.set(e,t),t)}return{value:e,source:t,stack:q8(t)}}var Y0=[],K0=0,bo=null,K4=0,Ie=[],Pe=0,ji=null,ma=1,za="";function Ga(e,t){Y0[K0++]=K4,Y0[K0++]=bo,bo=e,K4=t}function ip(e,t,a){Ie[Pe++]=ma,Ie[Pe++]=za,Ie[Pe++]=ji,ji=e;var i=ma;e=za;var r=32-me(i)-1;i&=~(1<<r),a+=1;var n=32-me(t)+r;if(30<n){var h=r-r%5;n=(i&(1<<h)-1).toString(32),i>>=h,r-=h,ma=1<<32-me(t)+r|a<<r|i,za=n+e}else ma=1<<n|a<<r|i,za=e}function I9(e){e.return!==null&&(Ga(e,1),ip(e,1,0))}function P9(e){for(;e===bo;)bo=Y0[--K0],Y0[K0]=null,K4=Y0[--K0],Y0[K0]=null;for(;e===ji;)ji=Ie[--Pe],Ie[Pe]=null,za=Ie[--Pe],Ie[Pe]=null,ma=Ie[--Pe],Ie[Pe]=null}function rp(e,t){Ie[Pe++]=ma,Ie[Pe++]=za,Ie[Pe++]=ji,ma=t.id,za=t.overflow,ji=e}var k2=null,I1=null,c1=!1,Di=null,Fe=!1,js=Error(at(519));function Xi(e){var t=Error(at(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw J4(Ue(t,e)),js}function u7(e){var t=e.stateNode,a=e.type,i=e.memoizedProps;switch(t[C2]=e,t[re]=i,a){case"dialog":a1("cancel",t),a1("close",t);break;case"iframe":case"object":case"embed":a1("load",t);break;case"video":case"audio":for(a=0;a<eh.length;a++)a1(eh[a],t);break;case"source":a1("error",t);break;case"img":case"image":case"link":a1("error",t),a1("load",t);break;case"details":a1("toggle",t);break;case"input":a1("invalid",t),Og(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":a1("invalid",t);break;case"textarea":a1("invalid",t),Rg(t,i.value,i.defaultValue,i.children)}a=i.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||i.suppressHydrationWarning===!0||Uf(t.textContent,a)?(i.popover!=null&&(a1("beforetoggle",t),a1("toggle",t)),i.onScroll!=null&&a1("scroll",t),i.onScrollEnd!=null&&a1("scrollend",t),i.onClick!=null&&(t.onclick=qa),t=!0):t=!1,t||Xi(e,!0)}function g7(e){for(k2=e.return;k2;)switch(k2.tag){case 5:case 31:case 13:Fe=!1;return;case 27:case 3:Fe=!0;return;default:k2=k2.return}}function R0(e){if(e!==k2)return!1;if(!c1)return g7(e),c1=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||f9(e.type,e.memoizedProps)),a=!a),a&&I1&&Xi(e),g7(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(at(317));I1=ag(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(at(317));I1=ag(e)}else t===27?(t=I1,Ki(e.type)?(e=x9,x9=null,I1=e):I1=t):I1=k2?Ge(e.stateNode.nextSibling):null;return!0}function Tr(){I1=k2=null,c1=!1}function os(){var e=Di;return e!==null&&(ae===null?ae=e:ae.push.apply(ae,e),Di=null),e}function J4(e){Di===null?Di=[e]:Di.push(e)}var Xs=La(null),Fr=null,Za=null;function Ci(e,t,a){T1(Xs,t._currentValue),t._currentValue=a}function Ka(e){e._currentValue=Xs.current,H2(Xs)}function qs(e,t,a){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===a)break;e=e.return}}function Zs(e,t,a,i){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var n=r.dependencies;if(n!==null){var h=r.child;n=n.firstContext;t:for(;n!==null;){var c=n;n=r;for(var o=0;o<t.length;o++)if(c.context===t[o]){n.lanes|=a,c=n.alternate,c!==null&&(c.lanes|=a),qs(n.return,a,e),i||(h=null);break t}n=c.next}}else if(r.tag===18){if(h=r.return,h===null)throw Error(at(341));h.lanes|=a,n=h.alternate,n!==null&&(n.lanes|=a),qs(h,a,e),h=null}else h=r.child;if(h!==null)h.return=r;else for(h=r;h!==null;){if(h===e){h=null;break}if(r=h.sibling,r!==null){r.return=h.return,h=r;break}h=h.return}r=h}}function zn(e,t,a,i){e=null;for(var r=t,n=!1;r!==null;){if(!n){if((r.flags&524288)!==0)n=!0;else if((r.flags&262144)!==0)break}if(r.tag===10){var h=r.alternate;if(h===null)throw Error(at(387));if(h=h.memoizedProps,h!==null){var c=r.type;xe(r.pendingProps.value,h.value)||(e!==null?e.push(c):e=[c])}}else if(r===Vo.current){if(h=r.alternate,h===null)throw Error(at(387));h.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(e!==null?e.push(ih):e=[ih])}r=r.return}e!==null&&Zs(t,e,a,i),t.flags|=262144}function _o(e){for(e=e.firstContext;e!==null;){if(!xe(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Or(e){Fr=e,Za=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function S2(e){return np(Fr,e)}function Jc(e,t){return Fr===null&&Or(e),np(e,t)}function np(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Za===null){if(e===null)throw Error(at(308));Za=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Za=Za.next=t;return a}var yy=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},By=p2.unstable_scheduleCallback,Cy=p2.unstable_NormalPriority,d2={$$typeof:Xa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function N9(){return{controller:new yy,data:new Map,refCount:0}}function vh(e){e.refCount--,e.refCount===0&&By(Cy,function(){e.controller.abort()})}var R4=null,Ys=0,ln=0,en=null;function ky(e,t){if(R4===null){var a=R4=[];Ys=0,ln=s6(),en={status:"pending",value:void 0,then:function(i){a.push(i)}}}return Ys++,t.then(p7,p7),t}function p7(){if(--Ys===0&&R4!==null){en!==null&&(en.status="fulfilled");var e=R4;R4=null,ln=0,en=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Sy(e,t){var a=[],i={status:"pending",value:null,reason:null,then:function(r){a.push(r)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var r=0;r<a.length;r++)(0,a[r])(t)},function(r){for(i.status="rejected",i.reason=r,r=0;r<a.length;r++)(0,a[r])(void 0)}),i}var f7=Pt.S;Pt.S=function(e,t){xf=fe(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&ky(e,t),f7!==null&&f7(e,t)};var br=La(null);function U9(){var e=br.current;return e!==null?e:b1.pooledCache}function uo(e,t){t===null?T1(br,br.current):T1(br,t.pool)}function hp(){var e=U9();return e===null?null:{parent:d2._currentValue,pool:e}}var xn=Error(at(460)),F9=Error(at(474)),rl=Error(at(542)),Ao={then:function(){}};function M7(e){return e=e.status,e==="fulfilled"||e==="rejected"}function cp(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(qa,qa),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,z7(e),e;default:if(typeof t.status=="string")t.then(qa,qa);else{if(e=b1,e!==null&&100<e.shellSuspendCounter)throw Error(at(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var r=t;r.status="fulfilled",r.value=i}},function(i){if(t.status==="pending"){var r=t;r.status="rejected",r.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,z7(e),e}throw _r=t,xn}}function Br(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(_r=a,xn):a}}var _r=null;function m7(){if(_r===null)throw Error(at(459));var e=_r;return _r=null,e}function z7(e){if(e===xn||e===rl)throw Error(at(483))}var an=null,Q4=0;function Qc(e){var t=Q4;return Q4+=1,an===null&&(an=[]),cp(an,e,t)}function V4(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function $c(e,t){throw t.$$typeof===pw?Error(at(525)):(e=Object.prototype.toString.call(t),Error(at(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function op(e){function t(s,M){if(e){var L=s.deletions;L===null?(s.deletions=[M],s.flags|=16):L.push(M)}}function a(s,M){if(!e)return null;for(;M!==null;)t(s,M),M=M.sibling;return null}function i(s){for(var M=new Map;s!==null;)s.key!==null?M.set(s.key,s):M.set(s.index,s),s=s.sibling;return M}function r(s,M){return s=Ya(s,M),s.index=0,s.sibling=null,s}function n(s,M,L){return s.index=L,e?(L=s.alternate,L!==null?(L=L.index,L<M?(s.flags|=67108866,M):L):(s.flags|=67108866,M)):(s.flags|=1048576,M)}function h(s){return e&&s.alternate===null&&(s.flags|=67108866),s}function c(s,M,L,m){return M===null||M.tag!==6?(M=hs(L,s.mode,m),M.return=s,M):(M=r(M,L),M.return=s,M)}function o(s,M,L,m){var w=L.type;return w===N0?v(s,M,L.props.children,m,L.key):M!==null&&(M.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===yi&&Br(w)===M.type)?(M=r(M,L.props),V4(M,L),M.return=s,M):(M=vo(L.type,L.key,L.props,null,s.mode,m),V4(M,L),M.return=s,M)}function l(s,M,L,m){return M===null||M.tag!==4||M.stateNode.containerInfo!==L.containerInfo||M.stateNode.implementation!==L.implementation?(M=cs(L,s.mode,m),M.return=s,M):(M=r(M,L.children||[]),M.return=s,M)}function v(s,M,L,m,w){return M===null||M.tag!==7?(M=Sr(L,s.mode,m,w),M.return=s,M):(M=r(M,L),M.return=s,M)}function g(s,M,L){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return M=hs(""+M,s.mode,L),M.return=s,M;if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Wc:return L=vo(M.type,M.key,M.props,null,s.mode,L),V4(L,M),L.return=s,L;case k4:return M=cs(M,s.mode,L),M.return=s,M;case yi:return M=Br(M),g(s,M,L)}if(S4(M)||H4(M))return M=Sr(M,s.mode,L,null),M.return=s,M;if(typeof M.then=="function")return g(s,Qc(M),L);if(M.$$typeof===Xa)return g(s,Jc(s,M),L);$c(s,M)}return null}function d(s,M,L,m){var w=M!==null?M.key:null;if(typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint")return w!==null?null:c(s,M,""+L,m);if(typeof L=="object"&&L!==null){switch(L.$$typeof){case Wc:return L.key===w?o(s,M,L,m):null;case k4:return L.key===w?l(s,M,L,m):null;case yi:return L=Br(L),d(s,M,L,m)}if(S4(L)||H4(L))return w!==null?null:v(s,M,L,m,null);if(typeof L.then=="function")return d(s,M,Qc(L),m);if(L.$$typeof===Xa)return d(s,M,Jc(s,L),m);$c(s,L)}return null}function u(s,M,L,m,w){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return s=s.get(L)||null,c(M,s,""+m,w);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Wc:return s=s.get(m.key===null?L:m.key)||null,o(M,s,m,w);case k4:return s=s.get(m.key===null?L:m.key)||null,l(M,s,m,w);case yi:return m=Br(m),u(s,M,L,m,w)}if(S4(m)||H4(m))return s=s.get(L)||null,v(M,s,m,w,null);if(typeof m.then=="function")return u(s,M,L,Qc(m),w);if(m.$$typeof===Xa)return u(s,M,L,Jc(M,m),w);$c(M,m)}return null}function p(s,M,L,m){for(var w=null,y=null,C=M,H=M=0,B=null;C!==null&&H<L.length;H++){C.index>H?(B=C,C=null):B=C.sibling;var S=d(s,C,L[H],m);if(S===null){C===null&&(C=B);break}e&&C&&S.alternate===null&&t(s,C),M=n(S,M,H),y===null?w=S:y.sibling=S,y=S,C=B}if(H===L.length)return a(s,C),c1&&Ga(s,H),w;if(C===null){for(;H<L.length;H++)C=g(s,L[H],m),C!==null&&(M=n(C,M,H),y===null?w=C:y.sibling=C,y=C);return c1&&Ga(s,H),w}for(C=i(C);H<L.length;H++)B=u(C,s,H,L[H],m),B!==null&&(e&&B.alternate!==null&&C.delete(B.key===null?H:B.key),M=n(B,M,H),y===null?w=B:y.sibling=B,y=B);return e&&C.forEach(function(E){return t(s,E)}),c1&&Ga(s,H),w}function x(s,M,L,m){if(L==null)throw Error(at(151));for(var w=null,y=null,C=M,H=M=0,B=null,S=L.next();C!==null&&!S.done;H++,S=L.next()){C.index>H?(B=C,C=null):B=C.sibling;var E=d(s,C,S.value,m);if(E===null){C===null&&(C=B);break}e&&C&&E.alternate===null&&t(s,C),M=n(E,M,H),y===null?w=E:y.sibling=E,y=E,C=B}if(S.done)return a(s,C),c1&&Ga(s,H),w;if(C===null){for(;!S.done;H++,S=L.next())S=g(s,S.value,m),S!==null&&(M=n(S,M,H),y===null?w=S:y.sibling=S,y=S);return c1&&Ga(s,H),w}for(C=i(C);!S.done;H++,S=L.next())S=u(C,s,H,S.value,m),S!==null&&(e&&S.alternate!==null&&C.delete(S.key===null?H:S.key),M=n(S,M,H),y===null?w=S:y.sibling=S,y=S);return e&&C.forEach(function(O){return t(s,O)}),c1&&Ga(s,H),w}function f(s,M,L,m){if(typeof L=="object"&&L!==null&&L.type===N0&&L.key===null&&(L=L.props.children),typeof L=="object"&&L!==null){switch(L.$$typeof){case Wc:t:{for(var w=L.key;M!==null;){if(M.key===w){if(w=L.type,w===N0){if(M.tag===7){a(s,M.sibling),m=r(M,L.props.children),m.return=s,s=m;break t}}else if(M.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===yi&&Br(w)===M.type){a(s,M.sibling),m=r(M,L.props),V4(m,L),m.return=s,s=m;break t}a(s,M);break}else t(s,M);M=M.sibling}L.type===N0?(m=Sr(L.props.children,s.mode,m,L.key),m.return=s,s=m):(m=vo(L.type,L.key,L.props,null,s.mode,m),V4(m,L),m.return=s,s=m)}return h(s);case k4:t:{for(w=L.key;M!==null;){if(M.key===w)if(M.tag===4&&M.stateNode.containerInfo===L.containerInfo&&M.stateNode.implementation===L.implementation){a(s,M.sibling),m=r(M,L.children||[]),m.return=s,s=m;break t}else{a(s,M);break}else t(s,M);M=M.sibling}m=cs(L,s.mode,m),m.return=s,s=m}return h(s);case yi:return L=Br(L),f(s,M,L,m)}if(S4(L))return p(s,M,L,m);if(H4(L)){if(w=H4(L),typeof w!="function")throw Error(at(150));return L=w.call(L),x(s,M,L,m)}if(typeof L.then=="function")return f(s,M,Qc(L),m);if(L.$$typeof===Xa)return f(s,M,Jc(s,L),m);$c(s,L)}return typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint"?(L=""+L,M!==null&&M.tag===6?(a(s,M.sibling),m=r(M,L),m.return=s,s=m):(a(s,M),m=hs(L,s.mode,m),m.return=s,s=m),h(s)):a(s,M)}return function(s,M,L,m){try{Q4=0;var w=f(s,M,L,m);return an=null,w}catch(C){if(C===xn||C===rl)throw C;var y=ge(29,C,null,s.mode);return y.lanes=m,y.return=s,y}}}var Er=op(!0),lp=op(!1),Bi=!1;function W9(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ks(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ii(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Pi(e,t,a){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(g1&2)!==0){var r=i.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),i.pending=t,t=So(e),tp(e,null,a),t}return il(e,i,t,a),So(e)}function D4(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,a|=i,t.lanes=a,Cg(e,a)}}function ls(e,t){var a=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,a===i)){var r=null,n=null;if(a=a.firstBaseUpdate,a!==null){do{var h={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};n===null?r=n=h:n=n.next=h,a=a.next}while(a!==null);n===null?r=n=t:n=n.next=t}else r=n=t;a={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:n,shared:i.shared,callbacks:i.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Js=!1;function I4(){if(Js){var e=en;if(e!==null)throw e}}function P4(e,t,a,i){Js=!1;var r=e.updateQueue;Bi=!1;var n=r.firstBaseUpdate,h=r.lastBaseUpdate,c=r.shared.pending;if(c!==null){r.shared.pending=null;var o=c,l=o.next;o.next=null,h===null?n=l:h.next=l,h=o;var v=e.alternate;v!==null&&(v=v.updateQueue,c=v.lastBaseUpdate,c!==h&&(c===null?v.firstBaseUpdate=l:c.next=l,v.lastBaseUpdate=o))}if(n!==null){var g=r.baseState;h=0,v=l=o=null,c=n;do{var d=c.lane&-536870913,u=d!==c.lane;if(u?(r1&d)===d:(i&d)===d){d!==0&&d===ln&&(Js=!0),v!==null&&(v=v.next={lane:0,tag:c.tag,payload:c.payload,callback:null,next:null});t:{var p=e,x=c;d=t;var f=a;switch(x.tag){case 1:if(p=x.payload,typeof p=="function"){g=p.call(f,g,d);break t}g=p;break t;case 3:p.flags=p.flags&-65537|128;case 0:if(p=x.payload,d=typeof p=="function"?p.call(f,g,d):p,d==null)break t;g=P1({},g,d);break t;case 2:Bi=!0}}d=c.callback,d!==null&&(e.flags|=64,u&&(e.flags|=8192),u=r.callbacks,u===null?r.callbacks=[d]:u.push(d))}else u={lane:d,tag:c.tag,payload:c.payload,callback:c.callback,next:null},v===null?(l=v=u,o=g):v=v.next=u,h|=d;if(c=c.next,c===null){if(c=r.shared.pending,c===null)break;u=c,c=u.next,u.next=null,r.lastBaseUpdate=u,r.shared.pending=null}}while(!0);v===null&&(o=g),r.baseState=o,r.firstBaseUpdate=l,r.lastBaseUpdate=v,n===null&&(r.shared.lanes=0),Zi|=h,e.lanes=h,e.memoizedState=g}}function dp(e,t){if(typeof e!="function")throw Error(at(191,e));e.call(t)}function sp(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)dp(a[e],t)}var dn=La(null),To=La(0);function x7(e,t){e=ai,T1(To,e),T1(dn,t),ai=e|t.baseLanes}function Qs(){T1(To,ai),T1(dn,dn.current)}function G9(){ai=To.current,H2(dn),H2(To)}var He=La(null),We=null;function ki(e){var t=e.alternate;T1(r2,r2.current&1),T1(He,e),We===null&&(t===null||dn.current!==null||t.memoizedState!==null)&&(We=e)}function $s(e){T1(r2,r2.current),T1(He,e),We===null&&(We=e)}function vp(e){e.tag===22?(T1(r2,r2.current),T1(He,e),We===null&&(We=e)):Si(e)}function Si(){T1(r2,r2.current),T1(He,He.current)}function ue(e){H2(He),We===e&&(We=null),H2(r2)}var r2=La(0);function Oo(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||m9(a)||z9(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $a=0,qt=null,B1=null,o2=null,Eo=!1,rn=!1,Rr=!1,Ro=0,$4=0,nn=null,by=0;function J1(){throw Error(at(321))}function j9(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!xe(e[a],t[a]))return!1;return!0}function X9(e,t,a,i,r,n){return $a=n,qt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Pt.H=e===null||e.memoizedState===null?Wp:i6,Rr=!1,n=a(i,r),Rr=!1,rn&&(n=gp(t,a,i,r)),up(e),n}function up(e){Pt.H=th;var t=B1!==null&&B1.next!==null;if($a=0,o2=B1=qt=null,Eo=!1,$4=0,nn=null,t)throw Error(at(300));e===null||s2||(e=e.dependencies,e!==null&&_o(e)&&(s2=!0))}function gp(e,t,a,i){qt=e;var r=0;do{if(rn&&(nn=null),$4=0,rn=!1,25<=r)throw Error(at(301));if(r+=1,o2=B1=null,e.updateQueue!=null){var n=e.updateQueue;n.lastEffect=null,n.events=null,n.stores=null,n.memoCache!=null&&(n.memoCache.index=0)}Pt.H=Gp,n=t(a,i)}while(rn);return n}function _y(){var e=Pt.H,t=e.useState()[0];return t=typeof t.then=="function"?uh(t):t,e=e.useState()[0],(B1!==null?B1.memoizedState:null)!==e&&(qt.flags|=1024),t}function q9(){var e=Ro!==0;return Ro=0,e}function Z9(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function Y9(e){if(Eo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Eo=!1}$a=0,o2=B1=qt=null,rn=!1,$4=Ro=0,nn=null}function Y2(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return o2===null?qt.memoizedState=o2=e:o2=o2.next=e,o2}function n2(){if(B1===null){var e=qt.alternate;e=e!==null?e.memoizedState:null}else e=B1.next;var t=o2===null?qt.memoizedState:o2.next;if(t!==null)o2=t,B1=e;else{if(e===null)throw qt.alternate===null?Error(at(467)):Error(at(310));B1=e,e={memoizedState:B1.memoizedState,baseState:B1.baseState,baseQueue:B1.baseQueue,queue:B1.queue,next:null},o2===null?qt.memoizedState=o2=e:o2=o2.next=e}return o2}function nl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function uh(e){var t=$4;return $4+=1,nn===null&&(nn=[]),e=cp(nn,e,t),t=qt,(o2===null?t.memoizedState:o2.next)===null&&(t=t.alternate,Pt.H=t===null||t.memoizedState===null?Wp:i6),e}function hl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return uh(e);if(e.$$typeof===Xa)return S2(e)}throw Error(at(438,String(e)))}function K9(e){var t=null,a=qt.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var i=qt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(r){return r.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=nl(),qt.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),i=0;i<e;i++)a[i]=fw;return t.index++,a}function ti(e,t){return typeof t=="function"?t(e):t}function go(e){var t=n2();return J9(t,B1,e)}function J9(e,t,a){var i=e.queue;if(i===null)throw Error(at(311));i.lastRenderedReducer=a;var r=e.baseQueue,n=i.pending;if(n!==null){if(r!==null){var h=r.next;r.next=n.next,n.next=h}t.baseQueue=r=n,i.pending=null}if(n=e.baseState,r===null)e.memoizedState=n;else{t=r.next;var c=h=null,o=null,l=t,v=!1;do{var g=l.lane&-536870913;if(g!==l.lane?(r1&g)===g:($a&g)===g){var d=l.revertLane;if(d===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),g===ln&&(v=!0);else if(($a&d)===d){l=l.next,d===ln&&(v=!0);continue}else g={lane:0,revertLane:l.revertLane,gesture:null,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null},o===null?(c=o=g,h=n):o=o.next=g,qt.lanes|=d,Zi|=d;g=l.action,Rr&&a(n,g),n=l.hasEagerState?l.eagerState:a(n,g)}else d={lane:g,revertLane:l.revertLane,gesture:l.gesture,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null},o===null?(c=o=d,h=n):o=o.next=d,qt.lanes|=g,Zi|=g;l=l.next}while(l!==null&&l!==t);if(o===null?h=n:o.next=c,!xe(n,e.memoizedState)&&(s2=!0,v&&(a=en,a!==null)))throw a;e.memoizedState=n,e.baseState=h,e.baseQueue=o,i.lastRenderedState=n}return r===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function ds(e){var t=n2(),a=t.queue;if(a===null)throw Error(at(311));a.lastRenderedReducer=e;var i=a.dispatch,r=a.pending,n=t.memoizedState;if(r!==null){a.pending=null;var h=r=r.next;do n=e(n,h.action),h=h.next;while(h!==r);xe(n,t.memoizedState)||(s2=!0),t.memoizedState=n,t.baseQueue===null&&(t.baseState=n),a.lastRenderedState=n}return[n,i]}function pp(e,t,a){var i=qt,r=n2(),n=c1;if(n){if(a===void 0)throw Error(at(407));a=a()}else a=t();var h=!xe((B1||r).memoizedState,a);if(h&&(r.memoizedState=a,s2=!0),r=r.queue,Q9(mp.bind(null,i,r,e),[e]),r.getSnapshot!==t||h||o2!==null&&o2.memoizedState.tag&1){if(i.flags|=2048,sn(9,{destroy:void 0},Mp.bind(null,i,r,a,t),null),b1===null)throw Error(at(349));n||($a&127)!==0||fp(i,t,a)}return a}function fp(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=qt.updateQueue,t===null?(t=nl(),qt.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Mp(e,t,a,i){t.value=a,t.getSnapshot=i,zp(t)&&xp(e)}function mp(e,t,a){return a(function(){zp(t)&&xp(e)})}function zp(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!xe(e,a)}catch{return!0}}function xp(e){var t=Ur(e,2);t!==null&&ie(t,e,2)}function t9(e){var t=Y2();if(typeof e=="function"){var a=e;if(e=a(),Rr){_i(!0);try{a()}finally{_i(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ti,lastRenderedState:e},t}function Hp(e,t,a,i){return e.baseState=a,J9(e,B1,typeof i=="function"?i:ti)}function Ay(e,t,a,i,r){if(ol(e))throw Error(at(485));if(e=t.action,e!==null){var n={payload:r,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(h){n.listeners.push(h)}};Pt.T!==null?a(!0):n.isTransition=!1,i(n),a=t.pending,a===null?(n.next=t.pending=n,Lp(t,n)):(n.next=a.next,t.pending=a.next=n)}}function Lp(e,t){var a=t.action,i=t.payload,r=e.state;if(t.isTransition){var n=Pt.T,h={};Pt.T=h;try{var c=a(r,i),o=Pt.S;o!==null&&o(h,c),H7(e,t,c)}catch(l){e9(e,t,l)}finally{n!==null&&h.types!==null&&(n.types=h.types),Pt.T=n}}else try{n=a(r,i),H7(e,t,n)}catch(l){e9(e,t,l)}}function H7(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(i){L7(e,t,i)},function(i){return e9(e,t,i)}):L7(e,t,a)}function L7(e,t,a){t.status="fulfilled",t.value=a,Vp(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Lp(e,a)))}function e9(e,t,a){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=a,Vp(t),t=t.next;while(t!==i)}e.action=null}function Vp(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function wp(e,t){return t}function V7(e,t){if(c1){var a=b1.formState;if(a!==null){t:{var i=qt;if(c1){if(I1){e:{for(var r=I1,n=Fe;r.nodeType!==8;){if(!n){r=null;break e}if(r=Ge(r.nextSibling),r===null){r=null;break e}}n=r.data,r=n==="F!"||n==="F"?r:null}if(r){I1=Ge(r.nextSibling),i=r.data==="F!";break t}}Xi(i)}i=!1}i&&(t=a[0])}}return a=Y2(),a.memoizedState=a.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:wp,lastRenderedState:t},a.queue=i,a=Np.bind(null,qt,i),i.dispatch=a,i=t9(!1),n=a6.bind(null,qt,!1,i.queue),i=Y2(),r={state:t,dispatch:null,action:e,pending:null},i.queue=r,a=Ay.bind(null,qt,r,n,a),r.dispatch=a,i.memoizedState=e,[t,a,!1]}function w7(e){var t=n2();return yp(t,B1,e)}function yp(e,t,a){if(t=J9(e,t,wp)[0],e=go(ti)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=uh(t)}catch(h){throw h===xn?rl:h}else i=t;t=n2();var r=t.queue,n=r.dispatch;return a!==t.memoizedState&&(qt.flags|=2048,sn(9,{destroy:void 0},Ty.bind(null,r,a),null)),[i,n,e]}function Ty(e,t){e.action=t}function y7(e){var t=n2(),a=B1;if(a!==null)return yp(t,a,e);n2(),t=t.memoizedState,a=n2();var i=a.queue.dispatch;return a.memoizedState=e,[t,i,!1]}function sn(e,t,a,i){return e={tag:e,create:a,deps:i,inst:t,next:null},t=qt.updateQueue,t===null&&(t=nl(),qt.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(i=a.next,a.next=e,e.next=i,t.lastEffect=e),e}function Bp(){return n2().memoizedState}function po(e,t,a,i){var r=Y2();qt.flags|=e,r.memoizedState=sn(1|t,{destroy:void 0},a,i===void 0?null:i)}function cl(e,t,a,i){var r=n2();i=i===void 0?null:i;var n=r.memoizedState.inst;B1!==null&&i!==null&&j9(i,B1.memoizedState.deps)?r.memoizedState=sn(t,n,a,i):(qt.flags|=e,r.memoizedState=sn(1|t,n,a,i))}function B7(e,t){po(8390656,8,e,t)}function Q9(e,t){cl(2048,8,e,t)}function Oy(e){qt.flags|=4;var t=qt.updateQueue;if(t===null)t=nl(),qt.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Cp(e){var t=n2().memoizedState;return Oy({ref:t,nextImpl:e}),function(){if((g1&2)!==0)throw Error(at(440));return t.impl.apply(void 0,arguments)}}function kp(e,t){return cl(4,2,e,t)}function Sp(e,t){return cl(4,4,e,t)}function bp(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _p(e,t,a){a=a!=null?a.concat([e]):null,cl(4,4,bp.bind(null,t,e),a)}function $9(){}function Ap(e,t){var a=n2();t=t===void 0?null:t;var i=a.memoizedState;return t!==null&&j9(t,i[1])?i[0]:(a.memoizedState=[e,t],e)}function Tp(e,t){var a=n2();t=t===void 0?null:t;var i=a.memoizedState;if(t!==null&&j9(t,i[1]))return i[0];if(i=e(),Rr){_i(!0);try{e()}finally{_i(!1)}}return a.memoizedState=[i,t],i}function t6(e,t,a){return a===void 0||($a&1073741824)!==0&&(r1&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=Lf(),qt.lanes|=e,Zi|=e,a)}function Op(e,t,a,i){return xe(a,t)?a:dn.current!==null?(e=t6(e,a,i),xe(e,t)||(s2=!0),e):($a&42)===0||($a&1073741824)!==0&&(r1&261930)===0?(s2=!0,e.memoizedState=a):(e=Lf(),qt.lanes|=e,Zi|=e,t)}function Ep(e,t,a,i,r){var n=p1.p;p1.p=n!==0&&8>n?n:8;var h=Pt.T,c={};Pt.T=c,a6(e,!1,t,a);try{var o=r(),l=Pt.S;if(l!==null&&l(c,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var v=Sy(o,i);N4(e,t,v,ze(e))}else N4(e,t,i,ze(e))}catch(g){N4(e,t,{then:function(){},status:"rejected",reason:g},ze())}finally{p1.p=n,h!==null&&c.types!==null&&(h.types=c.types),Pt.T=h}}function Ey(){}function a9(e,t,a,i){if(e.tag!==5)throw Error(at(476));var r=Rp(e).queue;Ep(e,r,t,kr,a===null?Ey:function(){return Dp(e),a(i)})}function Rp(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:kr,baseState:kr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ti,lastRenderedState:kr},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ti,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Dp(e){var t=Rp(e);t.next===null&&(t=e.alternate.memoizedState),N4(e,t.next.queue,{},ze())}function e6(){return S2(ih)}function Ip(){return n2().memoizedState}function Pp(){return n2().memoizedState}function Ry(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=ze();e=Ii(a);var i=Pi(t,e,a);i!==null&&(ie(i,t,a),D4(i,t,a)),t={cache:N9()},e.payload=t;return}t=t.return}}function Dy(e,t,a){var i=ze();a={lane:i,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ol(e)?Up(t,a):(a=R9(e,t,a,i),a!==null&&(ie(a,e,i),Fp(a,t,i)))}function Np(e,t,a){var i=ze();N4(e,t,a,i)}function N4(e,t,a,i){var r={lane:i,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(ol(e))Up(t,r);else{var n=e.alternate;if(e.lanes===0&&(n===null||n.lanes===0)&&(n=t.lastRenderedReducer,n!==null))try{var h=t.lastRenderedState,c=n(h,a);if(r.hasEagerState=!0,r.eagerState=c,xe(c,h))return il(e,t,r,0),b1===null&&al(),!1}catch{}if(a=R9(e,t,r,i),a!==null)return ie(a,e,i),Fp(a,t,i),!0}return!1}function a6(e,t,a,i){if(i={lane:2,revertLane:s6(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},ol(e)){if(t)throw Error(at(479))}else t=R9(e,a,i,2),t!==null&&ie(t,e,2)}function ol(e){var t=e.alternate;return e===qt||t!==null&&t===qt}function Up(e,t){rn=Eo=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Fp(e,t,a){if((a&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,a|=i,t.lanes=a,Cg(e,a)}}var th={readContext:S2,use:hl,useCallback:J1,useContext:J1,useEffect:J1,useImperativeHandle:J1,useLayoutEffect:J1,useInsertionEffect:J1,useMemo:J1,useReducer:J1,useRef:J1,useState:J1,useDebugValue:J1,useDeferredValue:J1,useTransition:J1,useSyncExternalStore:J1,useId:J1,useHostTransitionStatus:J1,useFormState:J1,useActionState:J1,useOptimistic:J1,useMemoCache:J1,useCacheRefresh:J1};th.useEffectEvent=J1;var Wp={readContext:S2,use:hl,useCallback:function(e,t){return Y2().memoizedState=[e,t===void 0?null:t],e},useContext:S2,useEffect:B7,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,po(4194308,4,bp.bind(null,t,e),a)},useLayoutEffect:function(e,t){return po(4194308,4,e,t)},useInsertionEffect:function(e,t){po(4,2,e,t)},useMemo:function(e,t){var a=Y2();t=t===void 0?null:t;var i=e();if(Rr){_i(!0);try{e()}finally{_i(!1)}}return a.memoizedState=[i,t],i},useReducer:function(e,t,a){var i=Y2();if(a!==void 0){var r=a(t);if(Rr){_i(!0);try{a(t)}finally{_i(!1)}}}else r=t;return i.memoizedState=i.baseState=r,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},i.queue=e,e=e.dispatch=Dy.bind(null,qt,e),[i.memoizedState,e]},useRef:function(e){var t=Y2();return e={current:e},t.memoizedState=e},useState:function(e){e=t9(e);var t=e.queue,a=Np.bind(null,qt,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:$9,useDeferredValue:function(e,t){var a=Y2();return t6(a,e,t)},useTransition:function(){var e=t9(!1);return e=Ep.bind(null,qt,e.queue,!0,!1),Y2().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var i=qt,r=Y2();if(c1){if(a===void 0)throw Error(at(407));a=a()}else{if(a=t(),b1===null)throw Error(at(349));(r1&127)!==0||fp(i,t,a)}r.memoizedState=a;var n={value:a,getSnapshot:t};return r.queue=n,B7(mp.bind(null,i,n,e),[e]),i.flags|=2048,sn(9,{destroy:void 0},Mp.bind(null,i,n,a,t),null),a},useId:function(){var e=Y2(),t=b1.identifierPrefix;if(c1){var a=za,i=ma;a=(i&~(1<<32-me(i)-1)).toString(32)+a,t="_"+t+"R_"+a,a=Ro++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=by++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:e6,useFormState:V7,useActionState:V7,useOptimistic:function(e){var t=Y2();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=a6.bind(null,qt,!0,a),a.dispatch=t,[e,t]},useMemoCache:K9,useCacheRefresh:function(){return Y2().memoizedState=Ry.bind(null,qt)},useEffectEvent:function(e){var t=Y2(),a={impl:e};return t.memoizedState=a,function(){if((g1&2)!==0)throw Error(at(440));return a.impl.apply(void 0,arguments)}}},i6={readContext:S2,use:hl,useCallback:Ap,useContext:S2,useEffect:Q9,useImperativeHandle:_p,useInsertionEffect:kp,useLayoutEffect:Sp,useMemo:Tp,useReducer:go,useRef:Bp,useState:function(){return go(ti)},useDebugValue:$9,useDeferredValue:function(e,t){var a=n2();return Op(a,B1.memoizedState,e,t)},useTransition:function(){var e=go(ti)[0],t=n2().memoizedState;return[typeof e=="boolean"?e:uh(e),t]},useSyncExternalStore:pp,useId:Ip,useHostTransitionStatus:e6,useFormState:w7,useActionState:w7,useOptimistic:function(e,t){var a=n2();return Hp(a,B1,e,t)},useMemoCache:K9,useCacheRefresh:Pp};i6.useEffectEvent=Cp;var Gp={readContext:S2,use:hl,useCallback:Ap,useContext:S2,useEffect:Q9,useImperativeHandle:_p,useInsertionEffect:kp,useLayoutEffect:Sp,useMemo:Tp,useReducer:ds,useRef:Bp,useState:function(){return ds(ti)},useDebugValue:$9,useDeferredValue:function(e,t){var a=n2();return B1===null?t6(a,e,t):Op(a,B1.memoizedState,e,t)},useTransition:function(){var e=ds(ti)[0],t=n2().memoizedState;return[typeof e=="boolean"?e:uh(e),t]},useSyncExternalStore:pp,useId:Ip,useHostTransitionStatus:e6,useFormState:y7,useActionState:y7,useOptimistic:function(e,t){var a=n2();return B1!==null?Hp(a,B1,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:K9,useCacheRefresh:Pp};Gp.useEffectEvent=Cp;function ss(e,t,a,i){t=e.memoizedState,a=a(i,t),a=a==null?t:P1({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var i9={enqueueSetState:function(e,t,a){e=e._reactInternals;var i=ze(),r=Ii(i);r.payload=t,a!=null&&(r.callback=a),t=Pi(e,r,i),t!==null&&(ie(t,e,i),D4(t,e,i))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var i=ze(),r=Ii(i);r.tag=1,r.payload=t,a!=null&&(r.callback=a),t=Pi(e,r,i),t!==null&&(ie(t,e,i),D4(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=ze(),i=Ii(a);i.tag=2,t!=null&&(i.callback=t),t=Pi(e,i,a),t!==null&&(ie(t,e,a),D4(t,e,a))}};function C7(e,t,a,i,r,n,h){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,n,h):t.prototype&&t.prototype.isPureReactComponent?!Y4(a,i)||!Y4(r,n):!0}function k7(e,t,a,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,i),t.state!==e&&i9.enqueueReplaceState(t,t.state,null)}function Dr(e,t){var a=t;if("ref"in t){a={};for(var i in t)i!=="ref"&&(a[i]=t[i])}if(e=e.defaultProps){a===t&&(a=P1({},a));for(var r in e)a[r]===void 0&&(a[r]=e[r])}return a}function jp(e){ko(e)}function Xp(e){console.error(e)}function qp(e){ko(e)}function Do(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function S7(e,t,a){try{var i=e.onCaughtError;i(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function r9(e,t,a){return a=Ii(a),a.tag=3,a.payload={element:null},a.callback=function(){Do(e,t)},a}function Zp(e){return e=Ii(e),e.tag=3,e}function Yp(e,t,a,i){var r=a.type.getDerivedStateFromError;if(typeof r=="function"){var n=i.value;e.payload=function(){return r(n)},e.callback=function(){S7(t,a,i)}}var h=a.stateNode;h!==null&&typeof h.componentDidCatch=="function"&&(e.callback=function(){S7(t,a,i),typeof r!="function"&&(Ni===null?Ni=new Set([this]):Ni.add(this));var c=i.stack;this.componentDidCatch(i.value,{componentStack:c!==null?c:""})})}function Iy(e,t,a,i,r){if(a.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=a.alternate,t!==null&&zn(t,a,r,!0),a=He.current,a!==null){switch(a.tag){case 31:case 13:return We===null?Fo():a.alternate===null&&Q1===0&&(Q1=3),a.flags&=-257,a.flags|=65536,a.lanes=r,i===Ao?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([i]):t.add(i),Ls(e,i,r)),!1;case 22:return a.flags|=65536,i===Ao?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([i]):a.add(i)),Ls(e,i,r)),!1}throw Error(at(435,a.tag))}return Ls(e,i,r),Fo(),!1}if(c1)return t=He.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=r,i!==js&&(e=Error(at(422),{cause:i}),J4(Ue(e,a)))):(i!==js&&(t=Error(at(423),{cause:i}),J4(Ue(t,a))),e=e.current.alternate,e.flags|=65536,r&=-r,e.lanes|=r,i=Ue(i,a),r=r9(e.stateNode,i,r),ls(e,r),Q1!==4&&(Q1=2)),!1;var n=Error(at(520),{cause:i});if(n=Ue(n,a),W4===null?W4=[n]:W4.push(n),Q1!==4&&(Q1=2),t===null)return!0;i=Ue(i,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=r&-r,a.lanes|=e,e=r9(a.stateNode,i,e),ls(a,e),!1;case 1:if(t=a.type,n=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||n!==null&&typeof n.componentDidCatch=="function"&&(Ni===null||!Ni.has(n))))return a.flags|=65536,r&=-r,a.lanes|=r,r=Zp(r),Yp(r,e,a,i),ls(a,r),!1}a=a.return}while(a!==null);return!1}var r6=Error(at(461)),s2=!1;function B2(e,t,a,i){t.child=e===null?lp(t,null,a,i):Er(t,e.child,a,i)}function b7(e,t,a,i,r){a=a.render;var n=t.ref;if("ref"in i){var h={};for(var c in i)c!=="ref"&&(h[c]=i[c])}else h=i;return Or(t),i=X9(e,t,a,h,n,r),c=q9(),e!==null&&!s2?(Z9(e,t,r),ei(e,t,r)):(c1&&c&&I9(t),t.flags|=1,B2(e,t,i,r),t.child)}function _7(e,t,a,i,r){if(e===null){var n=a.type;return typeof n=="function"&&!D9(n)&&n.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=n,Kp(e,t,n,i,r)):(e=vo(a.type,null,i,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(n=e.child,!n6(e,r)){var h=n.memoizedProps;if(a=a.compare,a=a!==null?a:Y4,a(h,i)&&e.ref===t.ref)return ei(e,t,r)}return t.flags|=1,e=Ya(n,i),e.ref=t.ref,e.return=t,t.child=e}function Kp(e,t,a,i,r){if(e!==null){var n=e.memoizedProps;if(Y4(n,i)&&e.ref===t.ref)if(s2=!1,t.pendingProps=i=n,n6(e,r))(e.flags&131072)!==0&&(s2=!0);else return t.lanes=e.lanes,ei(e,t,r)}return n9(e,t,a,i,r)}function Jp(e,t,a,i){var r=i.children,n=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(n=n!==null?n.baseLanes|a:a,e!==null){for(i=t.child=e.child,r=0;i!==null;)r=r|i.lanes|i.childLanes,i=i.sibling;i=r&~n}else i=0,t.child=null;return A7(e,t,n,a,i)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&uo(t,n!==null?n.cachePool:null),n!==null?x7(t,n):Qs(),vp(t);else return i=t.lanes=536870912,A7(e,t,n!==null?n.baseLanes|a:a,a,i)}else n!==null?(uo(t,n.cachePool),x7(t,n),Si(t),t.memoizedState=null):(e!==null&&uo(t,null),Qs(),Si(t));return B2(e,t,r,a),t.child}function _4(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function A7(e,t,a,i,r){var n=U9();return n=n===null?null:{parent:d2._currentValue,pool:n},t.memoizedState={baseLanes:a,cachePool:n},e!==null&&uo(t,null),Qs(),vp(t),e!==null&&zn(e,t,i,!0),t.childLanes=r,null}function fo(e,t){return t=Io({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function T7(e,t,a){return Er(t,e.child,null,a),e=fo(t,t.pendingProps),e.flags|=2,ue(t),t.memoizedState=null,e}function Py(e,t,a){var i=t.pendingProps,r=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(c1){if(i.mode==="hidden")return e=fo(t,i),t.lanes=536870912,_4(null,e);if($s(t),(e=I1)?(e=Gf(e,Fe),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ji!==null?{id:ma,overflow:za}:null,retryLane:536870912,hydrationErrors:null},a=ap(e),a.return=t,t.child=a,k2=t,I1=null)):e=null,e===null)throw Xi(t);return t.lanes=536870912,null}return fo(t,i)}var n=e.memoizedState;if(n!==null){var h=n.dehydrated;if($s(t),r)if(t.flags&256)t.flags&=-257,t=T7(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(at(558));else if(s2||zn(e,t,a,!1),r=(a&e.childLanes)!==0,s2||r){if(i=b1,i!==null&&(h=kg(i,a),h!==0&&h!==n.retryLane))throw n.retryLane=h,Ur(e,h),ie(i,e,h),r6;Fo(),t=T7(e,t,a)}else e=n.treeContext,I1=Ge(h.nextSibling),k2=t,c1=!0,Di=null,Fe=!1,e!==null&&rp(t,e),t=fo(t,i),t.flags|=4096;return t}return e=Ya(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Mo(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(at(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function n9(e,t,a,i,r){return Or(t),a=X9(e,t,a,i,void 0,r),i=q9(),e!==null&&!s2?(Z9(e,t,r),ei(e,t,r)):(c1&&i&&I9(t),t.flags|=1,B2(e,t,a,r),t.child)}function O7(e,t,a,i,r,n){return Or(t),t.updateQueue=null,a=gp(t,i,a,r),up(e),i=q9(),e!==null&&!s2?(Z9(e,t,n),ei(e,t,n)):(c1&&i&&I9(t),t.flags|=1,B2(e,t,a,n),t.child)}function E7(e,t,a,i,r){if(Or(t),t.stateNode===null){var n=Z0,h=a.contextType;typeof h=="object"&&h!==null&&(n=S2(h)),n=new a(i,n),t.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=i9,t.stateNode=n,n._reactInternals=t,n=t.stateNode,n.props=i,n.state=t.memoizedState,n.refs={},W9(t),h=a.contextType,n.context=typeof h=="object"&&h!==null?S2(h):Z0,n.state=t.memoizedState,h=a.getDerivedStateFromProps,typeof h=="function"&&(ss(t,a,h,i),n.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof n.getSnapshotBeforeUpdate=="function"||typeof n.UNSAFE_componentWillMount!="function"&&typeof n.componentWillMount!="function"||(h=n.state,typeof n.componentWillMount=="function"&&n.componentWillMount(),typeof n.UNSAFE_componentWillMount=="function"&&n.UNSAFE_componentWillMount(),h!==n.state&&i9.enqueueReplaceState(n,n.state,null),P4(t,i,n,r),I4(),n.state=t.memoizedState),typeof n.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){n=t.stateNode;var c=t.memoizedProps,o=Dr(a,c);n.props=o;var l=n.context,v=a.contextType;h=Z0,typeof v=="object"&&v!==null&&(h=S2(v));var g=a.getDerivedStateFromProps;v=typeof g=="function"||typeof n.getSnapshotBeforeUpdate=="function",c=t.pendingProps!==c,v||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(c||l!==h)&&k7(t,n,i,h),Bi=!1;var d=t.memoizedState;n.state=d,P4(t,i,n,r),I4(),l=t.memoizedState,c||d!==l||Bi?(typeof g=="function"&&(ss(t,a,g,i),l=t.memoizedState),(o=Bi||C7(t,a,o,i,d,l,h))?(v||typeof n.UNSAFE_componentWillMount!="function"&&typeof n.componentWillMount!="function"||(typeof n.componentWillMount=="function"&&n.componentWillMount(),typeof n.UNSAFE_componentWillMount=="function"&&n.UNSAFE_componentWillMount()),typeof n.componentDidMount=="function"&&(t.flags|=4194308)):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=l),n.props=i,n.state=l,n.context=h,i=o):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{n=t.stateNode,Ks(e,t),h=t.memoizedProps,v=Dr(a,h),n.props=v,g=t.pendingProps,d=n.context,l=a.contextType,o=Z0,typeof l=="object"&&l!==null&&(o=S2(l)),c=a.getDerivedStateFromProps,(l=typeof c=="function"||typeof n.getSnapshotBeforeUpdate=="function")||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(h!==g||d!==o)&&k7(t,n,i,o),Bi=!1,d=t.memoizedState,n.state=d,P4(t,i,n,r),I4();var u=t.memoizedState;h!==g||d!==u||Bi||e!==null&&e.dependencies!==null&&_o(e.dependencies)?(typeof c=="function"&&(ss(t,a,c,i),u=t.memoizedState),(v=Bi||C7(t,a,v,i,d,u,o)||e!==null&&e.dependencies!==null&&_o(e.dependencies))?(l||typeof n.UNSAFE_componentWillUpdate!="function"&&typeof n.componentWillUpdate!="function"||(typeof n.componentWillUpdate=="function"&&n.componentWillUpdate(i,u,o),typeof n.UNSAFE_componentWillUpdate=="function"&&n.UNSAFE_componentWillUpdate(i,u,o)),typeof n.componentDidUpdate=="function"&&(t.flags|=4),typeof n.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof n.componentDidUpdate!="function"||h===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=u),n.props=i,n.state=u,n.context=o,i=v):(typeof n.componentDidUpdate!="function"||h===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),i=!1)}return n=i,Mo(e,t),i=(t.flags&128)!==0,n||i?(n=t.stateNode,a=i&&typeof a.getDerivedStateFromError!="function"?null:n.render(),t.flags|=1,e!==null&&i?(t.child=Er(t,e.child,null,r),t.child=Er(t,null,a,r)):B2(e,t,a,r),t.memoizedState=n.state,e=t.child):e=ei(e,t,r),e}function R7(e,t,a,i){return Tr(),t.flags|=256,B2(e,t,a,i),t.child}var vs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function us(e){return{baseLanes:e,cachePool:hp()}}function gs(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=pe),e}function Qp(e,t,a){var i=t.pendingProps,r=!1,n=(t.flags&128)!==0,h;if((h=n)||(h=e!==null&&e.memoizedState===null?!1:(r2.current&2)!==0),h&&(r=!0,t.flags&=-129),h=(t.flags&32)!==0,t.flags&=-33,e===null){if(c1){if(r?ki(t):Si(t),(e=I1)?(e=Gf(e,Fe),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ji!==null?{id:ma,overflow:za}:null,retryLane:536870912,hydrationErrors:null},a=ap(e),a.return=t,t.child=a,k2=t,I1=null)):e=null,e===null)throw Xi(t);return z9(e)?t.lanes=32:t.lanes=536870912,null}var c=i.children;return i=i.fallback,r?(Si(t),r=t.mode,c=Io({mode:"hidden",children:c},r),i=Sr(i,r,a,null),c.return=t,i.return=t,c.sibling=i,t.child=c,i=t.child,i.memoizedState=us(a),i.childLanes=gs(e,h,a),t.memoizedState=vs,_4(null,i)):(ki(t),h9(t,c))}var o=e.memoizedState;if(o!==null&&(c=o.dehydrated,c!==null)){if(n)t.flags&256?(ki(t),t.flags&=-257,t=ps(e,t,a)):t.memoizedState!==null?(Si(t),t.child=e.child,t.flags|=128,t=null):(Si(t),c=i.fallback,r=t.mode,i=Io({mode:"visible",children:i.children},r),c=Sr(c,r,a,null),c.flags|=2,i.return=t,c.return=t,i.sibling=c,t.child=i,Er(t,e.child,null,a),i=t.child,i.memoizedState=us(a),i.childLanes=gs(e,h,a),t.memoizedState=vs,t=_4(null,i));else if(ki(t),z9(c)){if(h=c.nextSibling&&c.nextSibling.dataset,h)var l=h.dgst;h=l,i=Error(at(419)),i.stack="",i.digest=h,J4({value:i,source:null,stack:null}),t=ps(e,t,a)}else if(s2||zn(e,t,a,!1),h=(a&e.childLanes)!==0,s2||h){if(h=b1,h!==null&&(i=kg(h,a),i!==0&&i!==o.retryLane))throw o.retryLane=i,Ur(e,i),ie(h,e,i),r6;m9(c)||Fo(),t=ps(e,t,a)}else m9(c)?(t.flags|=192,t.child=e.child,t=null):(e=o.treeContext,I1=Ge(c.nextSibling),k2=t,c1=!0,Di=null,Fe=!1,e!==null&&rp(t,e),t=h9(t,i.children),t.flags|=4096);return t}return r?(Si(t),c=i.fallback,r=t.mode,o=e.child,l=o.sibling,i=Ya(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&65011712,l!==null?c=Ya(l,c):(c=Sr(c,r,a,null),c.flags|=2),c.return=t,i.return=t,i.sibling=c,t.child=i,_4(null,i),i=t.child,c=e.child.memoizedState,c===null?c=us(a):(r=c.cachePool,r!==null?(o=d2._currentValue,r=r.parent!==o?{parent:o,pool:o}:r):r=hp(),c={baseLanes:c.baseLanes|a,cachePool:r}),i.memoizedState=c,i.childLanes=gs(e,h,a),t.memoizedState=vs,_4(e.child,i)):(ki(t),a=e.child,e=a.sibling,a=Ya(a,{mode:"visible",children:i.children}),a.return=t,a.sibling=null,e!==null&&(h=t.deletions,h===null?(t.deletions=[e],t.flags|=16):h.push(e)),t.child=a,t.memoizedState=null,a)}function h9(e,t){return t=Io({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Io(e,t){return e=ge(22,e,null,t),e.lanes=0,e}function ps(e,t,a){return Er(t,e.child,null,a),e=h9(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function D7(e,t,a){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),qs(e.return,t,a)}function fs(e,t,a,i,r,n){var h=e.memoizedState;h===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:a,tailMode:r,treeForkCount:n}:(h.isBackwards=t,h.rendering=null,h.renderingStartTime=0,h.last=i,h.tail=a,h.tailMode=r,h.treeForkCount=n)}function $p(e,t,a){var i=t.pendingProps,r=i.revealOrder,n=i.tail;i=i.children;var h=r2.current,c=(h&2)!==0;if(c?(h=h&1|2,t.flags|=128):h&=1,T1(r2,h),B2(e,t,i,a),i=c1?K4:0,!c&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&D7(e,a,t);else if(e.tag===19)D7(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(r){case"forwards":for(a=t.child,r=null;a!==null;)e=a.alternate,e!==null&&Oo(e)===null&&(r=a),a=a.sibling;a=r,a===null?(r=t.child,t.child=null):(r=a.sibling,a.sibling=null),fs(t,!1,r,a,n,i);break;case"backwards":case"unstable_legacy-backwards":for(a=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Oo(e)===null){t.child=r;break}e=r.sibling,r.sibling=a,a=r,r=e}fs(t,!0,a,null,n,i);break;case"together":fs(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function ei(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Zi|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(zn(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(at(153));if(t.child!==null){for(e=t.child,a=Ya(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Ya(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function n6(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&_o(e)))}function Ny(e,t,a){switch(t.tag){case 3:wo(t,t.stateNode.containerInfo),Ci(t,d2,e.memoizedState.cache),Tr();break;case 27:case 5:Os(t);break;case 4:wo(t,t.stateNode.containerInfo);break;case 10:Ci(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,$s(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(ki(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Qp(e,t,a):(ki(t),e=ei(e,t,a),e!==null?e.sibling:null);ki(t);break;case 19:var r=(e.flags&128)!==0;if(i=(a&t.childLanes)!==0,i||(zn(e,t,a,!1),i=(a&t.childLanes)!==0),r){if(i)return $p(e,t,a);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),T1(r2,r2.current),i)break;return null;case 22:return t.lanes=0,Jp(e,t,a,t.pendingProps);case 24:Ci(t,d2,e.memoizedState.cache)}return ei(e,t,a)}function tf(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)s2=!0;else{if(!n6(e,a)&&(t.flags&128)===0)return s2=!1,Ny(e,t,a);s2=(e.flags&131072)!==0}else s2=!1,c1&&(t.flags&1048576)!==0&&ip(t,K4,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Br(t.elementType),t.type=e,typeof e=="function")D9(e)?(i=Dr(e,i),t.tag=1,t=E7(null,t,e,i,a)):(t.tag=0,t=n9(null,t,e,i,a));else{if(e!=null){var r=e.$$typeof;if(r===V9){t.tag=11,t=b7(null,t,e,i,a);break t}else if(r===w9){t.tag=14,t=_7(null,t,e,i,a);break t}}throw t=As(e)||e,Error(at(306,t,""))}}return t;case 0:return n9(e,t,t.type,t.pendingProps,a);case 1:return i=t.type,r=Dr(i,t.pendingProps),E7(e,t,i,r,a);case 3:t:{if(wo(t,t.stateNode.containerInfo),e===null)throw Error(at(387));i=t.pendingProps;var n=t.memoizedState;r=n.element,Ks(e,t),P4(t,i,null,a);var h=t.memoizedState;if(i=h.cache,Ci(t,d2,i),i!==n.cache&&Zs(t,[d2],a,!0),I4(),i=h.element,n.isDehydrated)if(n={element:i,isDehydrated:!1,cache:h.cache},t.updateQueue.baseState=n,t.memoizedState=n,t.flags&256){t=R7(e,t,i,a);break t}else if(i!==r){r=Ue(Error(at(424)),t),J4(r),t=R7(e,t,i,a);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,I1=Ge(e.firstChild),k2=t,c1=!0,Di=null,Fe=!0,a=lp(t,null,i,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Tr(),i===r){t=ei(e,t,a);break t}B2(e,t,i,a)}t=t.child}return t;case 26:return Mo(e,t),e===null?(a=ng(t.type,null,t.pendingProps,null))?t.memoizedState=a:c1||(a=t.type,e=t.pendingProps,i=Xo(Ri.current).createElement(a),i[C2]=t,i[re]=e,b2(i,a,e),x2(i),t.stateNode=i):t.memoizedState=ng(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Os(t),e===null&&c1&&(i=t.stateNode=jf(t.type,t.pendingProps,Ri.current),k2=t,Fe=!0,r=I1,Ki(t.type)?(x9=r,I1=Ge(i.firstChild)):I1=r),B2(e,t,t.pendingProps.children,a),Mo(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&c1&&((r=i=I1)&&(i=gB(i,t.type,t.pendingProps,Fe),i!==null?(t.stateNode=i,k2=t,I1=Ge(i.firstChild),Fe=!1,r=!0):r=!1),r||Xi(t)),Os(t),r=t.type,n=t.pendingProps,h=e!==null?e.memoizedProps:null,i=n.children,f9(r,n)?i=null:h!==null&&f9(r,h)&&(t.flags|=32),t.memoizedState!==null&&(r=X9(e,t,_y,null,null,a),ih._currentValue=r),Mo(e,t),B2(e,t,i,a),t.child;case 6:return e===null&&c1&&((e=a=I1)&&(a=pB(a,t.pendingProps,Fe),a!==null?(t.stateNode=a,k2=t,I1=null,e=!0):e=!1),e||Xi(t)),null;case 13:return Qp(e,t,a);case 4:return wo(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Er(t,null,i,a):B2(e,t,i,a),t.child;case 11:return b7(e,t,t.type,t.pendingProps,a);case 7:return B2(e,t,t.pendingProps,a),t.child;case 8:return B2(e,t,t.pendingProps.children,a),t.child;case 12:return B2(e,t,t.pendingProps.children,a),t.child;case 10:return i=t.pendingProps,Ci(t,t.type,i.value),B2(e,t,i.children,a),t.child;case 9:return r=t.type._context,i=t.pendingProps.children,Or(t),r=S2(r),i=i(r),t.flags|=1,B2(e,t,i,a),t.child;case 14:return _7(e,t,t.type,t.pendingProps,a);case 15:return Kp(e,t,t.type,t.pendingProps,a);case 19:return $p(e,t,a);case 31:return Py(e,t,a);case 22:return Jp(e,t,a,t.pendingProps);case 24:return Or(t),i=S2(d2),e===null?(r=U9(),r===null&&(r=b1,n=N9(),r.pooledCache=n,n.refCount++,n!==null&&(r.pooledCacheLanes|=a),r=n),t.memoizedState={parent:i,cache:r},W9(t),Ci(t,d2,r)):((e.lanes&a)!==0&&(Ks(e,t),P4(t,null,null,a),I4()),r=e.memoizedState,n=t.memoizedState,r.parent!==i?(r={parent:i,cache:i},t.memoizedState=r,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=r),Ci(t,d2,i)):(i=n.cache,Ci(t,d2,i),i!==r.cache&&Zs(t,[d2],a,!0))),B2(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(at(156,t.tag))}function Na(e){e.flags|=4}function Ms(e,t,a,i,r){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(r&335544128)===r)if(e.stateNode.complete)e.flags|=8192;else if(yf())e.flags|=8192;else throw _r=Ao,F9}else e.flags&=-16777217}function I7(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Zf(t))if(yf())e.flags|=8192;else throw _r=Ao,F9}function to(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?yg():536870912,e.lanes|=t,vn|=t)}function w4(e,t){if(!c1)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var i=null;a!==null;)a.alternate!==null&&(i=a),a=a.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function D1(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,i=0;if(t)for(var r=e.child;r!==null;)a|=r.lanes|r.childLanes,i|=r.subtreeFlags&65011712,i|=r.flags&65011712,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)a|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=i,e.childLanes=a,t}function Uy(e,t,a){var i=t.pendingProps;switch(P9(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return D1(t),null;case 1:return D1(t),null;case 3:return a=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Ka(d2),hn(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(R0(t)?Na(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,os())),D1(t),null;case 26:var r=t.type,n=t.memoizedState;return e===null?(Na(t),n!==null?(D1(t),I7(t,n)):(D1(t),Ms(t,r,null,i,a))):n?n!==e.memoizedState?(Na(t),D1(t),I7(t,n)):(D1(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Na(t),D1(t),Ms(t,r,e,i,a)),null;case 27:if(yo(t),a=Ri.current,r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Na(t);else{if(!i){if(t.stateNode===null)throw Error(at(166));return D1(t),null}e=Ha.current,R0(t)?u7(t,e):(e=jf(r,i,a),t.stateNode=e,Na(t))}return D1(t),null;case 5:if(yo(t),r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Na(t);else{if(!i){if(t.stateNode===null)throw Error(at(166));return D1(t),null}if(n=Ha.current,R0(t))u7(t,n);else{var h=Xo(Ri.current);switch(n){case 1:n=h.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:n=h.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":n=h.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":n=h.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":n=h.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild);break;case"select":n=typeof i.is=="string"?h.createElement("select",{is:i.is}):h.createElement("select"),i.multiple?n.multiple=!0:i.size&&(n.size=i.size);break;default:n=typeof i.is=="string"?h.createElement(r,{is:i.is}):h.createElement(r)}}n[C2]=t,n[re]=i;t:for(h=t.child;h!==null;){if(h.tag===5||h.tag===6)n.appendChild(h.stateNode);else if(h.tag!==4&&h.tag!==27&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break t;for(;h.sibling===null;){if(h.return===null||h.return===t)break t;h=h.return}h.sibling.return=h.return,h=h.sibling}t.stateNode=n;t:switch(b2(n,r,i),r){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&Na(t)}}return D1(t),Ms(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Na(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(at(166));if(e=Ri.current,R0(t)){if(e=t.stateNode,a=t.memoizedProps,i=null,r=k2,r!==null)switch(r.tag){case 27:case 5:i=r.memoizedProps}e[C2]=t,e=!!(e.nodeValue===a||i!==null&&i.suppressHydrationWarning===!0||Uf(e.nodeValue,a)),e||Xi(t,!0)}else e=Xo(e).createTextNode(i),e[C2]=t,t.stateNode=e}return D1(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(i=R0(t),a!==null){if(e===null){if(!i)throw Error(at(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(at(557));e[C2]=t}else Tr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;D1(t),e=!1}else a=os(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(ue(t),t):(ue(t),null);if((t.flags&128)!==0)throw Error(at(558))}return D1(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(r=R0(t),i!==null&&i.dehydrated!==null){if(e===null){if(!r)throw Error(at(318));if(r=t.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(at(317));r[C2]=t}else Tr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;D1(t),r=!1}else r=os(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),r=!0;if(!r)return t.flags&256?(ue(t),t):(ue(t),null)}return ue(t),(t.flags&128)!==0?(t.lanes=a,t):(a=i!==null,e=e!==null&&e.memoizedState!==null,a&&(i=t.child,r=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(r=i.alternate.memoizedState.cachePool.pool),n=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(n=i.memoizedState.cachePool.pool),n!==r&&(i.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),to(t,t.updateQueue),D1(t),null);case 4:return hn(),e===null&&v6(t.stateNode.containerInfo),D1(t),null;case 10:return Ka(t.type),D1(t),null;case 19:if(H2(r2),i=t.memoizedState,i===null)return D1(t),null;if(r=(t.flags&128)!==0,n=i.rendering,n===null)if(r)w4(i,!1);else{if(Q1!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(n=Oo(e),n!==null){for(t.flags|=128,w4(i,!1),e=n.updateQueue,t.updateQueue=e,to(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)ep(a,e),a=a.sibling;return T1(r2,r2.current&1|2),c1&&Ga(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&fe()>No&&(t.flags|=128,r=!0,w4(i,!1),t.lanes=4194304)}else{if(!r)if(e=Oo(n),e!==null){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,to(t,e),w4(i,!0),i.tail===null&&i.tailMode==="hidden"&&!n.alternate&&!c1)return D1(t),null}else 2*fe()-i.renderingStartTime>No&&a!==536870912&&(t.flags|=128,r=!0,w4(i,!1),t.lanes=4194304);i.isBackwards?(n.sibling=t.child,t.child=n):(e=i.last,e!==null?e.sibling=n:t.child=n,i.last=n)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=fe(),e.sibling=null,a=r2.current,T1(r2,r?a&1|2:a&1),c1&&Ga(t,i.treeForkCount),e):(D1(t),null);case 22:case 23:return ue(t),G9(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(a&536870912)!==0&&(t.flags&128)===0&&(D1(t),t.subtreeFlags&6&&(t.flags|=8192)):D1(t),a=t.updateQueue,a!==null&&to(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==a&&(t.flags|=2048),e!==null&&H2(br),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ka(d2),D1(t),null;case 25:return null;case 30:return null}throw Error(at(156,t.tag))}function Fy(e,t){switch(P9(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ka(d2),hn(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return yo(t),null;case 31:if(t.memoizedState!==null){if(ue(t),t.alternate===null)throw Error(at(340));Tr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ue(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(at(340));Tr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H2(r2),null;case 4:return hn(),null;case 10:return Ka(t.type),null;case 22:case 23:return ue(t),G9(),e!==null&&H2(br),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ka(d2),null;case 25:return null;default:return null}}function ef(e,t){switch(P9(t),t.tag){case 3:Ka(d2),hn();break;case 26:case 27:case 5:yo(t);break;case 4:hn();break;case 31:t.memoizedState!==null&&ue(t);break;case 13:ue(t);break;case 19:H2(r2);break;case 10:Ka(t.type);break;case 22:case 23:ue(t),G9(),e!==null&&H2(br);break;case 24:Ka(d2)}}function gh(e,t){try{var a=t.updateQueue,i=a!==null?a.lastEffect:null;if(i!==null){var r=i.next;a=r;do{if((a.tag&e)===e){i=void 0;var n=a.create,h=a.inst;i=n(),h.destroy=i}a=a.next}while(a!==r)}}catch(c){V1(t,t.return,c)}}function qi(e,t,a){try{var i=t.updateQueue,r=i!==null?i.lastEffect:null;if(r!==null){var n=r.next;i=n;do{if((i.tag&e)===e){var h=i.inst,c=h.destroy;if(c!==void 0){h.destroy=void 0,r=t;var o=a,l=c;try{l()}catch(v){V1(r,o,v)}}}i=i.next}while(i!==n)}}catch(v){V1(t,t.return,v)}}function af(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{sp(t,a)}catch(i){V1(e,e.return,i)}}}function rf(e,t,a){a.props=Dr(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(i){V1(e,t,i)}}function U4(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof a=="function"?e.refCleanup=a(i):a.current=i}}catch(r){V1(e,t,r)}}function xa(e,t){var a=e.ref,i=e.refCleanup;if(a!==null)if(typeof i=="function")try{i()}catch(r){V1(e,t,r)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(r){V1(e,t,r)}else a.current=null}function nf(e){var t=e.type,a=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&i.focus();break t;case"img":a.src?i.src=a.src:a.srcSet&&(i.srcset=a.srcSet)}}catch(r){V1(e,e.return,r)}}function ms(e,t,a){try{var i=e.stateNode;oB(i,e.type,a,t),i[re]=t}catch(r){V1(e,e.return,r)}}function hf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ki(e.type)||e.tag===4}function zs(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||hf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ki(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function c9(e,t,a){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=qa));else if(i!==4&&(i===27&&Ki(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(c9(e,t,a),e=e.sibling;e!==null;)c9(e,t,a),e=e.sibling}function Po(e,t,a){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(i!==4&&(i===27&&Ki(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Po(e,t,a),e=e.sibling;e!==null;)Po(e,t,a),e=e.sibling}function cf(e){var t=e.stateNode,a=e.memoizedProps;try{for(var i=e.type,r=t.attributes;r.length;)t.removeAttributeNode(r[0]);b2(t,i,a),t[C2]=e,t[re]=a}catch(n){V1(e,e.return,n)}}var ja=!1,l2=!1,xs=!1,P7=typeof WeakSet=="function"?WeakSet:Set,z2=null;function Wy(e,t){if(e=e.containerInfo,g9=Ko,e=qg(e),O9(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var i=a.getSelection&&a.getSelection();if(i&&i.rangeCount!==0){a=i.anchorNode;var r=i.anchorOffset,n=i.focusNode;i=i.focusOffset;try{a.nodeType,n.nodeType}catch{a=null;break t}var h=0,c=-1,o=-1,l=0,v=0,g=e,d=null;e:for(;;){for(var u;g!==a||r!==0&&g.nodeType!==3||(c=h+r),g!==n||i!==0&&g.nodeType!==3||(o=h+i),g.nodeType===3&&(h+=g.nodeValue.length),(u=g.firstChild)!==null;)d=g,g=u;for(;;){if(g===e)break e;if(d===a&&++l===r&&(c=h),d===n&&++v===i&&(o=h),(u=g.nextSibling)!==null)break;g=d,d=g.parentNode}g=u}a=c===-1||o===-1?null:{start:c,end:o}}else a=null}a=a||{start:0,end:0}}else a=null;for(p9={focusedElem:e,selectionRange:a},Ko=!1,z2=t;z2!==null;)if(t=z2,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,z2=e;else for(;z2!==null;){switch(t=z2,n=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)r=e[a],r.ref.impl=r.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&n!==null){e=void 0,a=t,r=n.memoizedProps,n=n.memoizedState,i=a.stateNode;try{var p=Dr(a.type,r);e=i.getSnapshotBeforeUpdate(p,n),i.__reactInternalSnapshotBeforeUpdate=e}catch(x){V1(a,a.return,x)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)M9(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":M9(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(at(163))}if(e=t.sibling,e!==null){e.return=t.return,z2=e;break}z2=t.return}}function of(e,t,a){var i=a.flags;switch(a.tag){case 0:case 11:case 15:Fa(e,a),i&4&&gh(5,a);break;case 1:if(Fa(e,a),i&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(h){V1(a,a.return,h)}else{var r=Dr(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(r,t,e.__reactInternalSnapshotBeforeUpdate)}catch(h){V1(a,a.return,h)}}i&64&&af(a),i&512&&U4(a,a.return);break;case 3:if(Fa(e,a),i&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{sp(e,t)}catch(h){V1(a,a.return,h)}}break;case 27:t===null&&i&4&&cf(a);case 26:case 5:Fa(e,a),t===null&&i&4&&nf(a),i&512&&U4(a,a.return);break;case 12:Fa(e,a);break;case 31:Fa(e,a),i&4&&sf(e,a);break;case 13:Fa(e,a),i&4&&vf(e,a),i&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Qy.bind(null,a),fB(e,a))));break;case 22:if(i=a.memoizedState!==null||ja,!i){t=t!==null&&t.memoizedState!==null||l2,r=ja;var n=l2;ja=i,(l2=t)&&!n?Wa(e,a,(a.subtreeFlags&8772)!==0):Fa(e,a),ja=r,l2=n}break;case 30:break;default:Fa(e,a)}}function lf(e){var t=e.alternate;t!==null&&(e.alternate=null,lf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&k9(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var F1=null,ee=!1;function Ua(e,t,a){for(a=a.child;a!==null;)df(e,t,a),a=a.sibling}function df(e,t,a){if(Me&&typeof Me.onCommitFiberUnmount=="function")try{Me.onCommitFiberUnmount(ch,a)}catch{}switch(a.tag){case 26:l2||xa(a,t),Ua(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:l2||xa(a,t);var i=F1,r=ee;Ki(a.type)&&(F1=a.stateNode,ee=!1),Ua(e,t,a),j4(a.stateNode),F1=i,ee=r;break;case 5:l2||xa(a,t);case 6:if(i=F1,r=ee,F1=null,Ua(e,t,a),F1=i,ee=r,F1!==null)if(ee)try{(F1.nodeType===9?F1.body:F1.nodeName==="HTML"?F1.ownerDocument.body:F1).removeChild(a.stateNode)}catch(n){V1(a,t,n)}else try{F1.removeChild(a.stateNode)}catch(n){V1(a,t,n)}break;case 18:F1!==null&&(ee?(e=F1,tg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),fn(e)):tg(F1,a.stateNode));break;case 4:i=F1,r=ee,F1=a.stateNode.containerInfo,ee=!0,Ua(e,t,a),F1=i,ee=r;break;case 0:case 11:case 14:case 15:qi(2,a,t),l2||qi(4,a,t),Ua(e,t,a);break;case 1:l2||(xa(a,t),i=a.stateNode,typeof i.componentWillUnmount=="function"&&rf(a,t,i)),Ua(e,t,a);break;case 21:Ua(e,t,a);break;case 22:l2=(i=l2)||a.memoizedState!==null,Ua(e,t,a),l2=i;break;default:Ua(e,t,a)}}function sf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{fn(e)}catch(a){V1(t,t.return,a)}}}function vf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{fn(e)}catch(a){V1(t,t.return,a)}}function Gy(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new P7),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new P7),t;default:throw Error(at(435,e.tag))}}function eo(e,t){var a=Gy(e);t.forEach(function(i){if(!a.has(i)){a.add(i);var r=$y.bind(null,e,i);i.then(r,r)}})}function $2(e,t){var a=t.deletions;if(a!==null)for(var i=0;i<a.length;i++){var r=a[i],n=e,h=t,c=h;t:for(;c!==null;){switch(c.tag){case 27:if(Ki(c.type)){F1=c.stateNode,ee=!1;break t}break;case 5:F1=c.stateNode,ee=!1;break t;case 3:case 4:F1=c.stateNode.containerInfo,ee=!0;break t}c=c.return}if(F1===null)throw Error(at(160));df(n,h,r),F1=null,ee=!1,n=r.alternate,n!==null&&(n.return=null),r.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)uf(t,e),t=t.sibling}var ea=null;function uf(e,t){var a=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:$2(t,e),te(e),i&4&&(qi(3,e,e.return),gh(3,e),qi(5,e,e.return));break;case 1:$2(t,e),te(e),i&512&&(l2||a===null||xa(a,a.return)),i&64&&ja&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?i:a.concat(i))));break;case 26:var r=ea;if($2(t,e),te(e),i&512&&(l2||a===null||xa(a,a.return)),i&4){var n=a!==null?a.memoizedState:null;if(i=e.memoizedState,a===null)if(i===null)if(e.stateNode===null){t:{i=e.type,a=e.memoizedProps,r=r.ownerDocument||r;e:switch(i){case"title":n=r.getElementsByTagName("title")[0],(!n||n[dh]||n[C2]||n.namespaceURI==="http://www.w3.org/2000/svg"||n.hasAttribute("itemprop"))&&(n=r.createElement(i),r.head.insertBefore(n,r.querySelector("head > title"))),b2(n,i,a),n[C2]=e,x2(n),i=n;break t;case"link":var h=cg("link","href",r).get(i+(a.href||""));if(h){for(var c=0;c<h.length;c++)if(n=h[c],n.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&n.getAttribute("rel")===(a.rel==null?null:a.rel)&&n.getAttribute("title")===(a.title==null?null:a.title)&&n.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){h.splice(c,1);break e}}n=r.createElement(i),b2(n,i,a),r.head.appendChild(n);break;case"meta":if(h=cg("meta","content",r).get(i+(a.content||""))){for(c=0;c<h.length;c++)if(n=h[c],n.getAttribute("content")===(a.content==null?null:""+a.content)&&n.getAttribute("name")===(a.name==null?null:a.name)&&n.getAttribute("property")===(a.property==null?null:a.property)&&n.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&n.getAttribute("charset")===(a.charSet==null?null:a.charSet)){h.splice(c,1);break e}}n=r.createElement(i),b2(n,i,a),r.head.appendChild(n);break;default:throw Error(at(468,i))}n[C2]=e,x2(n),i=n}e.stateNode=i}else og(r,e.type,e.stateNode);else e.stateNode=hg(r,i,e.memoizedProps);else n!==i?(n===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):n.count--,i===null?og(r,e.type,e.stateNode):hg(r,i,e.memoizedProps)):i===null&&e.stateNode!==null&&ms(e,e.memoizedProps,a.memoizedProps)}break;case 27:$2(t,e),te(e),i&512&&(l2||a===null||xa(a,a.return)),a!==null&&i&4&&ms(e,e.memoizedProps,a.memoizedProps);break;case 5:if($2(t,e),te(e),i&512&&(l2||a===null||xa(a,a.return)),e.flags&32){r=e.stateNode;try{on(r,"")}catch(p){V1(e,e.return,p)}}i&4&&e.stateNode!=null&&(r=e.memoizedProps,ms(e,r,a!==null?a.memoizedProps:r)),i&1024&&(xs=!0);break;case 6:if($2(t,e),te(e),i&4){if(e.stateNode===null)throw Error(at(162));i=e.memoizedProps,a=e.stateNode;try{a.nodeValue=i}catch(p){V1(e,e.return,p)}}break;case 3:if(xo=null,r=ea,ea=qo(t.containerInfo),$2(t,e),ea=r,te(e),i&4&&a!==null&&a.memoizedState.isDehydrated)try{fn(t.containerInfo)}catch(p){V1(e,e.return,p)}xs&&(xs=!1,gf(e));break;case 4:i=ea,ea=qo(e.stateNode.containerInfo),$2(t,e),te(e),ea=i;break;case 12:$2(t,e),te(e);break;case 31:$2(t,e),te(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,eo(e,i)));break;case 13:$2(t,e),te(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(ll=fe()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,eo(e,i)));break;case 22:r=e.memoizedState!==null;var o=a!==null&&a.memoizedState!==null,l=ja,v=l2;if(ja=l||r,l2=v||o,$2(t,e),l2=v,ja=l,te(e),i&8192)t:for(t=e.stateNode,t._visibility=r?t._visibility&-2:t._visibility|1,r&&(a===null||o||ja||l2||Cr(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){o=a=t;try{if(n=o.stateNode,r)h=n.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none";else{c=o.stateNode;var g=o.memoizedProps.style,d=g!=null&&g.hasOwnProperty("display")?g.display:null;c.style.display=d==null||typeof d=="boolean"?"":(""+d).trim()}}catch(p){V1(o,o.return,p)}}}else if(t.tag===6){if(a===null){o=t;try{o.stateNode.nodeValue=r?"":o.memoizedProps}catch(p){V1(o,o.return,p)}}}else if(t.tag===18){if(a===null){o=t;try{var u=o.stateNode;r?eg(u,!0):eg(o.stateNode,!1)}catch(p){V1(o,o.return,p)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(a=i.retryQueue,a!==null&&(i.retryQueue=null,eo(e,a))));break;case 19:$2(t,e),te(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,eo(e,i)));break;case 30:break;case 21:break;default:$2(t,e),te(e)}}function te(e){var t=e.flags;if(t&2){try{for(var a,i=e.return;i!==null;){if(hf(i)){a=i;break}i=i.return}if(a==null)throw Error(at(160));switch(a.tag){case 27:var r=a.stateNode,n=zs(e);Po(e,n,r);break;case 5:var h=a.stateNode;a.flags&32&&(on(h,""),a.flags&=-33);var c=zs(e);Po(e,c,h);break;case 3:case 4:var o=a.stateNode.containerInfo,l=zs(e);c9(e,l,o);break;default:throw Error(at(161))}}catch(v){V1(e,e.return,v)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gf(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gf(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Fa(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)of(e,t.alternate,t),t=t.sibling}function Cr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:qi(4,t,t.return),Cr(t);break;case 1:xa(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&rf(t,t.return,a),Cr(t);break;case 27:j4(t.stateNode);case 26:case 5:xa(t,t.return),Cr(t);break;case 22:t.memoizedState===null&&Cr(t);break;case 30:Cr(t);break;default:Cr(t)}e=e.sibling}}function Wa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,r=e,n=t,h=n.flags;switch(n.tag){case 0:case 11:case 15:Wa(r,n,a),gh(4,n);break;case 1:if(Wa(r,n,a),i=n,r=i.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(l){V1(i,i.return,l)}if(i=n,r=i.updateQueue,r!==null){var c=i.stateNode;try{var o=r.shared.hiddenCallbacks;if(o!==null)for(r.shared.hiddenCallbacks=null,r=0;r<o.length;r++)dp(o[r],c)}catch(l){V1(i,i.return,l)}}a&&h&64&&af(n),U4(n,n.return);break;case 27:cf(n);case 26:case 5:Wa(r,n,a),a&&i===null&&h&4&&nf(n),U4(n,n.return);break;case 12:Wa(r,n,a);break;case 31:Wa(r,n,a),a&&h&4&&sf(r,n);break;case 13:Wa(r,n,a),a&&h&4&&vf(r,n);break;case 22:n.memoizedState===null&&Wa(r,n,a),U4(n,n.return);break;case 30:break;default:Wa(r,n,a)}t=t.sibling}}function h6(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&vh(a))}function c6(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&vh(e))}function ta(e,t,a,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)pf(e,t,a,i),t=t.sibling}function pf(e,t,a,i){var r=t.flags;switch(t.tag){case 0:case 11:case 15:ta(e,t,a,i),r&2048&&gh(9,t);break;case 1:ta(e,t,a,i);break;case 3:ta(e,t,a,i),r&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&vh(e)));break;case 12:if(r&2048){ta(e,t,a,i),e=t.stateNode;try{var n=t.memoizedProps,h=n.id,c=n.onPostCommit;typeof c=="function"&&c(h,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(o){V1(t,t.return,o)}}else ta(e,t,a,i);break;case 31:ta(e,t,a,i);break;case 13:ta(e,t,a,i);break;case 23:break;case 22:n=t.stateNode,h=t.alternate,t.memoizedState!==null?n._visibility&2?ta(e,t,a,i):F4(e,t):n._visibility&2?ta(e,t,a,i):(n._visibility|=2,I0(e,t,a,i,(t.subtreeFlags&10256)!==0||!1)),r&2048&&h6(h,t);break;case 24:ta(e,t,a,i),r&2048&&c6(t.alternate,t);break;default:ta(e,t,a,i)}}function I0(e,t,a,i,r){for(r=r&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var n=e,h=t,c=a,o=i,l=h.flags;switch(h.tag){case 0:case 11:case 15:I0(n,h,c,o,r),gh(8,h);break;case 23:break;case 22:var v=h.stateNode;h.memoizedState!==null?v._visibility&2?I0(n,h,c,o,r):F4(n,h):(v._visibility|=2,I0(n,h,c,o,r)),r&&l&2048&&h6(h.alternate,h);break;case 24:I0(n,h,c,o,r),r&&l&2048&&c6(h.alternate,h);break;default:I0(n,h,c,o,r)}t=t.sibling}}function F4(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,i=t,r=i.flags;switch(i.tag){case 22:F4(a,i),r&2048&&h6(i.alternate,i);break;case 24:F4(a,i),r&2048&&c6(i.alternate,i);break;default:F4(a,i)}t=t.sibling}}var A4=8192;function D0(e,t,a){if(e.subtreeFlags&A4)for(e=e.child;e!==null;)ff(e,t,a),e=e.sibling}function ff(e,t,a){switch(e.tag){case 26:D0(e,t,a),e.flags&A4&&e.memoizedState!==null&&kB(a,ea,e.memoizedState,e.memoizedProps);break;case 5:D0(e,t,a);break;case 3:case 4:var i=ea;ea=qo(e.stateNode.containerInfo),D0(e,t,a),ea=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=A4,A4=16777216,D0(e,t,a),A4=i):D0(e,t,a));break;default:D0(e,t,a)}}function Mf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function y4(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var i=t[a];z2=i,zf(i,e)}Mf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)mf(e),e=e.sibling}function mf(e){switch(e.tag){case 0:case 11:case 15:y4(e),e.flags&2048&&qi(9,e,e.return);break;case 3:y4(e);break;case 12:y4(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,mo(e)):y4(e);break;default:y4(e)}}function mo(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var i=t[a];z2=i,zf(i,e)}Mf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:qi(8,t,t.return),mo(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,mo(t));break;default:mo(t)}e=e.sibling}}function zf(e,t){for(;z2!==null;){var a=z2;switch(a.tag){case 0:case 11:case 15:qi(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var i=a.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:vh(a.memoizedState.cache)}if(i=a.child,i!==null)i.return=a,z2=i;else t:for(a=e;z2!==null;){i=z2;var r=i.sibling,n=i.return;if(lf(i),i===a){z2=null;break t}if(r!==null){r.return=n,z2=r;break t}z2=n}}}var jy={getCacheForType:function(e){var t=S2(d2),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return S2(d2).controller.signal}},Xy=typeof WeakMap=="function"?WeakMap:Map,g1=0,b1=null,i1=null,r1=0,L1=0,ve=null,Ti=!1,Hn=!1,o6=!1,ai=0,Q1=0,Zi=0,Ar=0,l6=0,pe=0,vn=0,W4=null,ae=null,o9=!1,ll=0,xf=0,No=1/0,Uo=null,Ni=null,g2=0,Ui=null,un=null,Ja=0,l9=0,d9=null,Hf=null,G4=0,s9=null;function ze(){return(g1&2)!==0&&r1!==0?r1&-r1:Pt.T!==null?s6():Sg()}function Lf(){if(pe===0)if((r1&536870912)===0||c1){var e=jc;jc<<=1,(jc&3932160)===0&&(jc=262144),pe=e}else pe=536870912;return e=He.current,e!==null&&(e.flags|=32),pe}function ie(e,t,a){(e===b1&&(L1===2||L1===9)||e.cancelPendingCommit!==null)&&(gn(e,0),Oi(e,r1,pe,!1)),lh(e,a),((g1&2)===0||e!==b1)&&(e===b1&&((g1&2)===0&&(Ar|=a),Q1===4&&Oi(e,r1,pe,!1)),Va(e))}function Vf(e,t,a){if((g1&6)!==0)throw Error(at(327));var i=!a&&(t&127)===0&&(t&e.expiredLanes)===0||oh(e,t),r=i?Yy(e,t):Hs(e,t,!0),n=i;do{if(r===0){Hn&&!i&&Oi(e,t,0,!1);break}else{if(a=e.current.alternate,n&&!qy(a)){r=Hs(e,t,!1),n=!1;continue}if(r===2){if(n=t,e.errorRecoveryDisabledLanes&n)var h=0;else h=e.pendingLanes&-536870913,h=h!==0?h:h&536870912?536870912:0;if(h!==0){t=h;t:{var c=e;r=W4;var o=c.current.memoizedState.isDehydrated;if(o&&(gn(c,h).flags|=256),h=Hs(c,h,!1),h!==2){if(o6&&!o){c.errorRecoveryDisabledLanes|=n,Ar|=n,r=4;break t}n=ae,ae=r,n!==null&&(ae===null?ae=n:ae.push.apply(ae,n))}r=h}if(n=!1,r!==2)continue}}if(r===1){gn(e,0),Oi(e,t,0,!0);break}t:{switch(i=e,n=r,n){case 0:case 1:throw Error(at(345));case 4:if((t&4194048)!==t)break;case 6:Oi(i,t,pe,!Ti);break t;case 2:ae=null;break;case 3:case 5:break;default:throw Error(at(329))}if((t&62914560)===t&&(r=ll+300-fe(),10<r)){if(Oi(i,t,pe,!Ti),Qo(i,0,!0)!==0)break t;Ja=t,i.timeoutHandle=Wf(N7.bind(null,i,a,ae,Uo,o9,t,pe,Ar,vn,Ti,n,"Throttled",-0,0),r);break t}N7(i,a,ae,Uo,o9,t,pe,Ar,vn,Ti,n,null,-0,0)}}break}while(!0);Va(e)}function N7(e,t,a,i,r,n,h,c,o,l,v,g,d,u){if(e.timeoutHandle=-1,g=t.subtreeFlags,g&8192||(g&16785408)===16785408){g={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:qa},ff(t,n,g);var p=(n&62914560)===n?ll-fe():(n&4194048)===n?xf-fe():0;if(p=SB(g,p),p!==null){Ja=n,e.cancelPendingCommit=p(F7.bind(null,e,t,n,a,i,r,h,c,o,v,g,null,d,u)),Oi(e,n,h,!l);return}}F7(e,t,n,a,i,r,h,c,o)}function qy(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var i=0;i<a.length;i++){var r=a[i],n=r.getSnapshot;r=r.value;try{if(!xe(n(),r))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Oi(e,t,a,i){t&=~l6,t&=~Ar,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var r=t;0<r;){var n=31-me(r),h=1<<n;i[n]=-1,r&=~h}a!==0&&Bg(e,a,t)}function dl(){return(g1&6)===0?(ph(0,!1),!1):!0}function d6(){if(i1!==null){if(L1===0)var e=i1.return;else e=i1,Za=Fr=null,Y9(e),an=null,Q4=0,e=i1;for(;e!==null;)ef(e.alternate,e),e=e.return;i1=null}}function gn(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,sB(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Ja=0,d6(),b1=e,i1=a=Ya(e.current,null),r1=t,L1=0,ve=null,Ti=!1,Hn=oh(e,t),o6=!1,vn=pe=l6=Ar=Zi=Q1=0,ae=W4=null,o9=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var r=31-me(i),n=1<<r;t|=e[r],i&=~n}return ai=t,al(),a}function wf(e,t){qt=null,Pt.H=th,t===xn||t===rl?(t=m7(),L1=3):t===F9?(t=m7(),L1=4):L1=t===r6?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ve=t,i1===null&&(Q1=1,Do(e,Ue(t,e.current)))}function yf(){var e=He.current;return e===null?!0:(r1&4194048)===r1?We===null:(r1&62914560)===r1||(r1&536870912)!==0?e===We:!1}function Bf(){var e=Pt.H;return Pt.H=th,e===null?th:e}function Cf(){var e=Pt.A;return Pt.A=jy,e}function Fo(){Q1=4,Ti||(r1&4194048)!==r1&&He.current!==null||(Hn=!0),(Zi&134217727)===0&&(Ar&134217727)===0||b1===null||Oi(b1,r1,pe,!1)}function Hs(e,t,a){var i=g1;g1|=2;var r=Bf(),n=Cf();(b1!==e||r1!==t)&&(Uo=null,gn(e,t)),t=!1;var h=Q1;t:do try{if(L1!==0&&i1!==null){var c=i1,o=ve;switch(L1){case 8:d6(),h=6;break t;case 3:case 2:case 9:case 6:He.current===null&&(t=!0);var l=L1;if(L1=0,ve=null,J0(e,c,o,l),a&&Hn){h=0;break t}break;default:l=L1,L1=0,ve=null,J0(e,c,o,l)}}Zy(),h=Q1;break}catch(v){wf(e,v)}while(!0);return t&&e.shellSuspendCounter++,Za=Fr=null,g1=i,Pt.H=r,Pt.A=n,i1===null&&(b1=null,r1=0,al()),h}function Zy(){for(;i1!==null;)kf(i1)}function Yy(e,t){var a=g1;g1|=2;var i=Bf(),r=Cf();b1!==e||r1!==t?(Uo=null,No=fe()+500,gn(e,t)):Hn=oh(e,t);t:do try{if(L1!==0&&i1!==null){t=i1;var n=ve;e:switch(L1){case 1:L1=0,ve=null,J0(e,t,n,1);break;case 2:case 9:if(M7(n)){L1=0,ve=null,U7(t);break}t=function(){L1!==2&&L1!==9||b1!==e||(L1=7),Va(e)},n.then(t,t);break t;case 3:L1=7;break t;case 4:L1=5;break t;case 7:M7(n)?(L1=0,ve=null,U7(t)):(L1=0,ve=null,J0(e,t,n,7));break;case 5:var h=null;switch(i1.tag){case 26:h=i1.memoizedState;case 5:case 27:var c=i1;if(h?Zf(h):c.stateNode.complete){L1=0,ve=null;var o=c.sibling;if(o!==null)i1=o;else{var l=c.return;l!==null?(i1=l,sl(l)):i1=null}break e}}L1=0,ve=null,J0(e,t,n,5);break;case 6:L1=0,ve=null,J0(e,t,n,6);break;case 8:d6(),Q1=6;break t;default:throw Error(at(462))}}Ky();break}catch(v){wf(e,v)}while(!0);return Za=Fr=null,Pt.H=i,Pt.A=r,g1=a,i1!==null?0:(b1=null,r1=0,al(),Q1)}function Ky(){for(;i1!==null&&!zw();)kf(i1)}function kf(e){var t=tf(e.alternate,e,ai);e.memoizedProps=e.pendingProps,t===null?sl(e):i1=t}function U7(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=O7(a,t,t.pendingProps,t.type,void 0,r1);break;case 11:t=O7(a,t,t.pendingProps,t.type.render,t.ref,r1);break;case 5:Y9(t);default:ef(a,t),t=i1=ep(t,ai),t=tf(a,t,ai)}e.memoizedProps=e.pendingProps,t===null?sl(e):i1=t}function J0(e,t,a,i){Za=Fr=null,Y9(t),an=null,Q4=0;var r=t.return;try{if(Iy(e,r,t,a,r1)){Q1=1,Do(e,Ue(a,e.current)),i1=null;return}}catch(n){if(r!==null)throw i1=r,n;Q1=1,Do(e,Ue(a,e.current)),i1=null;return}t.flags&32768?(c1||i===1?e=!0:Hn||(r1&536870912)!==0?e=!1:(Ti=e=!0,(i===2||i===9||i===3||i===6)&&(i=He.current,i!==null&&i.tag===13&&(i.flags|=16384))),Sf(t,e)):sl(t)}function sl(e){var t=e;do{if((t.flags&32768)!==0){Sf(t,Ti);return}e=t.return;var a=Uy(t.alternate,t,ai);if(a!==null){i1=a;return}if(t=t.sibling,t!==null){i1=t;return}i1=t=e}while(t!==null);Q1===0&&(Q1=5)}function Sf(e,t){do{var a=Fy(e.alternate,e);if(a!==null){a.flags&=32767,i1=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){i1=e;return}i1=e=a}while(e!==null);Q1=6,i1=null}function F7(e,t,a,i,r,n,h,c,o){e.cancelPendingCommit=null;do vl();while(g2!==0);if((g1&6)!==0)throw Error(at(327));if(t!==null){if(t===e.current)throw Error(at(177));if(n=t.lanes|t.childLanes,n|=E9,Sw(e,a,n,h,c,o),e===b1&&(i1=b1=null,r1=0),un=t,Ui=e,Ja=a,l9=n,d9=r,Hf=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,tB(Bo,function(){return Of(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Pt.T,Pt.T=null,r=p1.p,p1.p=2,h=g1,g1|=4;try{Wy(e,t,a)}finally{g1=h,p1.p=r,Pt.T=i}}g2=1,bf(),_f(),Af()}}function bf(){if(g2===1){g2=0;var e=Ui,t=un,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=Pt.T,Pt.T=null;var i=p1.p;p1.p=2;var r=g1;g1|=4;try{uf(t,e);var n=p9,h=qg(e.containerInfo),c=n.focusedElem,o=n.selectionRange;if(h!==c&&c&&c.ownerDocument&&Xg(c.ownerDocument.documentElement,c)){if(o!==null&&O9(c)){var l=o.start,v=o.end;if(v===void 0&&(v=l),"selectionStart"in c)c.selectionStart=l,c.selectionEnd=Math.min(v,c.value.length);else{var g=c.ownerDocument||document,d=g&&g.defaultView||window;if(d.getSelection){var u=d.getSelection(),p=c.textContent.length,x=Math.min(o.start,p),f=o.end===void 0?x:Math.min(o.end,p);!u.extend&&x>f&&(h=f,f=x,x=h);var s=d7(c,x),M=d7(c,f);if(s&&M&&(u.rangeCount!==1||u.anchorNode!==s.node||u.anchorOffset!==s.offset||u.focusNode!==M.node||u.focusOffset!==M.offset)){var L=g.createRange();L.setStart(s.node,s.offset),u.removeAllRanges(),x>f?(u.addRange(L),u.extend(M.node,M.offset)):(L.setEnd(M.node,M.offset),u.addRange(L))}}}}for(g=[],u=c;u=u.parentNode;)u.nodeType===1&&g.push({element:u,left:u.scrollLeft,top:u.scrollTop});for(typeof c.focus=="function"&&c.focus(),c=0;c<g.length;c++){var m=g[c];m.element.scrollLeft=m.left,m.element.scrollTop=m.top}}Ko=!!g9,p9=g9=null}finally{g1=r,p1.p=i,Pt.T=a}}e.current=t,g2=2}}function _f(){if(g2===2){g2=0;var e=Ui,t=un,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=Pt.T,Pt.T=null;var i=p1.p;p1.p=2;var r=g1;g1|=4;try{of(e,t.alternate,t)}finally{g1=r,p1.p=i,Pt.T=a}}g2=3}}function Af(){if(g2===4||g2===3){g2=0,xw();var e=Ui,t=un,a=Ja,i=Hf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?g2=5:(g2=0,un=Ui=null,Tf(e,e.pendingLanes));var r=e.pendingLanes;if(r===0&&(Ni=null),C9(a),t=t.stateNode,Me&&typeof Me.onCommitFiberRoot=="function")try{Me.onCommitFiberRoot(ch,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Pt.T,r=p1.p,p1.p=2,Pt.T=null;try{for(var n=e.onRecoverableError,h=0;h<i.length;h++){var c=i[h];n(c.value,{componentStack:c.stack})}}finally{Pt.T=t,p1.p=r}}(Ja&3)!==0&&vl(),Va(e),r=e.pendingLanes,(a&261930)!==0&&(r&42)!==0?e===s9?G4++:(G4=0,s9=e):G4=0,ph(0,!1)}}function Tf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,vh(t)))}function vl(){return bf(),_f(),Af(),Of()}function Of(){if(g2!==5)return!1;var e=Ui,t=l9;l9=0;var a=C9(Ja),i=Pt.T,r=p1.p;try{p1.p=32>a?32:a,Pt.T=null,a=d9,d9=null;var n=Ui,h=Ja;if(g2=0,un=Ui=null,Ja=0,(g1&6)!==0)throw Error(at(331));var c=g1;if(g1|=4,mf(n.current),pf(n,n.current,h,a),g1=c,ph(0,!1),Me&&typeof Me.onPostCommitFiberRoot=="function")try{Me.onPostCommitFiberRoot(ch,n)}catch{}return!0}finally{p1.p=r,Pt.T=i,Tf(e,t)}}function W7(e,t,a){t=Ue(a,t),t=r9(e.stateNode,t,2),e=Pi(e,t,2),e!==null&&(lh(e,2),Va(e))}function V1(e,t,a){if(e.tag===3)W7(e,e,a);else for(;t!==null;){if(t.tag===3){W7(t,e,a);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ni===null||!Ni.has(i))){e=Ue(a,e),a=Zp(2),i=Pi(t,a,2),i!==null&&(Yp(a,i,t,e),lh(i,2),Va(i));break}}t=t.return}}function Ls(e,t,a){var i=e.pingCache;if(i===null){i=e.pingCache=new Xy;var r=new Set;i.set(t,r)}else r=i.get(t),r===void 0&&(r=new Set,i.set(t,r));r.has(a)||(o6=!0,r.add(a),e=Jy.bind(null,e,t,a),t.then(e,e))}function Jy(e,t,a){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,b1===e&&(r1&a)===a&&(Q1===4||Q1===3&&(r1&62914560)===r1&&300>fe()-ll?(g1&2)===0&&gn(e,0):l6|=a,vn===r1&&(vn=0)),Va(e)}function Ef(e,t){t===0&&(t=yg()),e=Ur(e,t),e!==null&&(lh(e,t),Va(e))}function Qy(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Ef(e,a)}function $y(e,t){var a=0;switch(e.tag){case 31:case 13:var i=e.stateNode,r=e.memoizedState;r!==null&&(a=r.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(at(314))}i!==null&&i.delete(t),Ef(e,a)}function tB(e,t){return y9(e,t)}var Wo=null,P0=null,v9=!1,Go=!1,Vs=!1,Ei=0;function Va(e){e!==P0&&e.next===null&&(P0===null?Wo=P0=e:P0=P0.next=e),Go=!0,v9||(v9=!0,aB())}function ph(e,t){if(!Vs&&Go){Vs=!0;do for(var a=!1,i=Wo;i!==null;){if(!t)if(e!==0){var r=i.pendingLanes;if(r===0)var n=0;else{var h=i.suspendedLanes,c=i.pingedLanes;n=(1<<31-me(42|e)+1)-1,n&=r&~(h&~c),n=n&201326741?n&201326741|1:n?n|2:0}n!==0&&(a=!0,G7(i,n))}else n=r1,n=Qo(i,i===b1?n:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(n&3)===0||oh(i,n)||(a=!0,G7(i,n));i=i.next}while(a);Vs=!1}}function eB(){Rf()}function Rf(){Go=v9=!1;var e=0;Ei!==0&&dB()&&(e=Ei);for(var t=fe(),a=null,i=Wo;i!==null;){var r=i.next,n=Df(i,t);n===0?(i.next=null,a===null?Wo=r:a.next=r,r===null&&(P0=a)):(a=i,(e!==0||(n&3)!==0)&&(Go=!0)),i=r}g2!==0&&g2!==5||ph(e,!1),Ei!==0&&(Ei=0)}function Df(e,t){for(var a=e.suspendedLanes,i=e.pingedLanes,r=e.expirationTimes,n=e.pendingLanes&-62914561;0<n;){var h=31-me(n),c=1<<h,o=r[h];o===-1?((c&a)===0||(c&i)!==0)&&(r[h]=kw(c,t)):o<=t&&(e.expiredLanes|=c),n&=~c}if(t=b1,a=r1,a=Qo(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,a===0||e===t&&(L1===2||L1===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Q3(i),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||oh(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(i!==null&&Q3(i),C9(a)){case 2:case 8:a=Vg;break;case 32:a=Bo;break;case 268435456:a=wg;break;default:a=Bo}return i=If.bind(null,e),a=y9(a,i),e.callbackPriority=t,e.callbackNode=a,t}return i!==null&&i!==null&&Q3(i),e.callbackPriority=2,e.callbackNode=null,2}function If(e,t){if(g2!==0&&g2!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(vl()&&e.callbackNode!==a)return null;var i=r1;return i=Qo(e,e===b1?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Vf(e,i,t),Df(e,fe()),e.callbackNode!=null&&e.callbackNode===a?If.bind(null,e):null)}function G7(e,t){if(vl())return null;Vf(e,t,!0)}function aB(){vB(function(){(g1&6)!==0?y9(Lg,eB):Rf()})}function s6(){if(Ei===0){var e=ln;e===0&&(e=Gc,Gc<<=1,(Gc&261888)===0&&(Gc=256)),Ei=e}return Ei}function j7(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:oo(""+e)}function X7(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function iB(e,t,a,i,r){if(t==="submit"&&a&&a.stateNode===r){var n=j7((r[re]||null).action),h=i.submitter;h&&(t=(t=h[re]||null)?j7(t.formAction):h.getAttribute("formAction"),t!==null&&(n=t,h=null));var c=new $o("action","action",null,i,r);e.push({event:c,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ei!==0){var o=h?X7(r,h):new FormData(r);a9(a,{pending:!0,data:o,method:r.method,action:n},null,o)}}else typeof n=="function"&&(c.preventDefault(),o=h?X7(r,h):new FormData(r),a9(a,{pending:!0,data:o,method:r.method,action:n},n,o))},currentTarget:r}]})}}for(ao=0;ao<Gs.length;ao++)io=Gs[ao],q7=io.toLowerCase(),Z7=io[0].toUpperCase()+io.slice(1),aa(q7,"on"+Z7);var io,q7,Z7,ao;aa(Yg,"onAnimationEnd");aa(Kg,"onAnimationIteration");aa(Jg,"onAnimationStart");aa("dblclick","onDoubleClick");aa("focusin","onFocus");aa("focusout","onBlur");aa(Hy,"onTransitionRun");aa(Ly,"onTransitionStart");aa(Vy,"onTransitionCancel");aa(Qg,"onTransitionEnd");cn("onMouseEnter",["mouseout","mouseover"]);cn("onMouseLeave",["mouseout","mouseover"]);cn("onPointerEnter",["pointerout","pointerover"]);cn("onPointerLeave",["pointerout","pointerover"]);Ir("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ir("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ir("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ir("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ir("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ir("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var eh="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),rB=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(eh));function Pf(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var i=e[a],r=i.event;i=i.listeners;t:{var n=void 0;if(t)for(var h=i.length-1;0<=h;h--){var c=i[h],o=c.instance,l=c.currentTarget;if(c=c.listener,o!==n&&r.isPropagationStopped())break t;n=c,r.currentTarget=l;try{n(r)}catch(v){ko(v)}r.currentTarget=null,n=o}else for(h=0;h<i.length;h++){if(c=i[h],o=c.instance,l=c.currentTarget,c=c.listener,o!==n&&r.isPropagationStopped())break t;n=c,r.currentTarget=l;try{n(r)}catch(v){ko(v)}r.currentTarget=null,n=o}}}}function a1(e,t){var a=t[Rs];a===void 0&&(a=t[Rs]=new Set);var i=e+"__bubble";a.has(i)||(Nf(t,e,2,!1),a.add(i))}function ws(e,t,a){var i=0;t&&(i|=4),Nf(a,e,i,t)}var ro="_reactListening"+Math.random().toString(36).slice(2);function v6(e){if(!e[ro]){e[ro]=!0,bg.forEach(function(a){a!=="selectionchange"&&(rB.has(a)||ws(a,!1,e),ws(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ro]||(t[ro]=!0,ws("selectionchange",!1,t))}}function Nf(e,t,a,i){switch($f(t)){case 2:var r=AB;break;case 8:r=TB;break;default:r=f6}a=r.bind(null,t,a,e),r=void 0,!Us||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),i?r!==void 0?e.addEventListener(t,a,{capture:!0,passive:r}):e.addEventListener(t,a,!0):r!==void 0?e.addEventListener(t,a,{passive:r}):e.addEventListener(t,a,!1)}function ys(e,t,a,i,r){var n=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var h=i.tag;if(h===3||h===4){var c=i.stateNode.containerInfo;if(c===r)break;if(h===4)for(h=i.return;h!==null;){var o=h.tag;if((o===3||o===4)&&h.stateNode.containerInfo===r)return;h=h.return}for(;c!==null;){if(h=F0(c),h===null)return;if(o=h.tag,o===5||o===6||o===26||o===27){i=n=h;continue t}c=c.parentNode}}i=i.return}Ig(function(){var l=n,v=b9(a),g=[];t:{var d=$g.get(e);if(d!==void 0){var u=$o,p=e;switch(e){case"keypress":if(so(a)===0)break t;case"keydown":case"keyup":u=$w;break;case"focusin":p="focus",u=is;break;case"focusout":p="blur",u=is;break;case"beforeblur":case"afterblur":u=is;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":u=e7;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=Uw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=ay;break;case Yg:case Kg:case Jg:u=Gw;break;case Qg:u=ry;break;case"scroll":case"scrollend":u=Pw;break;case"wheel":u=hy;break;case"copy":case"cut":case"paste":u=Xw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=i7;break;case"toggle":case"beforetoggle":u=oy}var x=(t&4)!==0,f=!x&&(e==="scroll"||e==="scrollend"),s=x?d!==null?d+"Capture":null:d;x=[];for(var M=l,L;M!==null;){var m=M;if(L=m.stateNode,m=m.tag,m!==5&&m!==26&&m!==27||L===null||s===null||(m=q4(M,s),m!=null&&x.push(ah(M,m,L))),f)break;M=M.return}0<x.length&&(d=new u(d,p,null,a,v),g.push({event:d,listeners:x}))}}if((t&7)===0){t:{if(d=e==="mouseover"||e==="pointerover",u=e==="mouseout"||e==="pointerout",d&&a!==Ns&&(p=a.relatedTarget||a.fromElement)&&(F0(p)||p[Mn]))break t;if((u||d)&&(d=v.window===v?v:(d=v.ownerDocument)?d.defaultView||d.parentWindow:window,u?(p=a.relatedTarget||a.toElement,u=l,p=p?F0(p):null,p!==null&&(f=hh(p),x=p.tag,p!==f||x!==5&&x!==27&&x!==6)&&(p=null)):(u=null,p=l),u!==p)){if(x=e7,m="onMouseLeave",s="onMouseEnter",M="mouse",(e==="pointerout"||e==="pointerover")&&(x=i7,m="onPointerLeave",s="onPointerEnter",M="pointer"),f=u==null?d:b4(u),L=p==null?d:b4(p),d=new x(m,M+"leave",u,a,v),d.target=f,d.relatedTarget=L,m=null,F0(v)===l&&(x=new x(s,M+"enter",p,a,v),x.target=L,x.relatedTarget=f,m=x),f=m,u&&p)e:{for(x=nB,s=u,M=p,L=0,m=s;m;m=x(m))L++;m=0;for(var w=M;w;w=x(w))m++;for(;0<L-m;)s=x(s),L--;for(;0<m-L;)M=x(M),m--;for(;L--;){if(s===M||M!==null&&s===M.alternate){x=s;break e}s=x(s),M=x(M)}x=null}else x=null;u!==null&&Y7(g,d,u,x,!1),p!==null&&f!==null&&Y7(g,f,p,x,!0)}}t:{if(d=l?b4(l):window,u=d.nodeName&&d.nodeName.toLowerCase(),u==="select"||u==="input"&&d.type==="file")var y=c7;else if(h7(d))if(Gg)y=my;else{y=fy;var C=py}else u=d.nodeName,!u||u.toLowerCase()!=="input"||d.type!=="checkbox"&&d.type!=="radio"?l&&S9(l.elementType)&&(y=c7):y=My;if(y&&(y=y(e,l))){Wg(g,y,a,v);break t}C&&C(e,d,l),e==="focusout"&&l&&d.type==="number"&&l.memoizedProps.value!=null&&Ps(d,"number",d.value)}switch(C=l?b4(l):window,e){case"focusin":(h7(C)||C.contentEditable==="true")&&(j0=C,Fs=l,E4=null);break;case"focusout":E4=Fs=j0=null;break;case"mousedown":Ws=!0;break;case"contextmenu":case"mouseup":case"dragend":Ws=!1,s7(g,a,v);break;case"selectionchange":if(xy)break;case"keydown":case"keyup":s7(g,a,v)}var H;if(T9)t:{switch(e){case"compositionstart":var B="onCompositionStart";break t;case"compositionend":B="onCompositionEnd";break t;case"compositionupdate":B="onCompositionUpdate";break t}B=void 0}else G0?Ug(e,a)&&(B="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(B="onCompositionStart");B&&(Ng&&a.locale!=="ko"&&(G0||B!=="onCompositionStart"?B==="onCompositionEnd"&&G0&&(H=Pg()):(Ai=v,_9="value"in Ai?Ai.value:Ai.textContent,G0=!0)),C=jo(l,B),0<C.length&&(B=new a7(B,e,null,a,v),g.push({event:B,listeners:C}),H?B.data=H:(H=Fg(a),H!==null&&(B.data=H)))),(H=dy?sy(e,a):vy(e,a))&&(B=jo(l,"onBeforeInput"),0<B.length&&(C=new a7("onBeforeInput","beforeinput",null,a,v),g.push({event:C,listeners:B}),C.data=H)),iB(g,e,l,a,v)}Pf(g,t)})}function ah(e,t,a){return{instance:e,listener:t,currentTarget:a}}function jo(e,t){for(var a=t+"Capture",i=[];e!==null;){var r=e,n=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||n===null||(r=q4(e,a),r!=null&&i.unshift(ah(e,r,n)),r=q4(e,t),r!=null&&i.push(ah(e,r,n))),e.tag===3)return i;e=e.return}return[]}function nB(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Y7(e,t,a,i,r){for(var n=t._reactName,h=[];a!==null&&a!==i;){var c=a,o=c.alternate,l=c.stateNode;if(c=c.tag,o!==null&&o===i)break;c!==5&&c!==26&&c!==27||l===null||(o=l,r?(l=q4(a,n),l!=null&&h.unshift(ah(a,l,o))):r||(l=q4(a,n),l!=null&&h.push(ah(a,l,o)))),a=a.return}h.length!==0&&e.push({event:t,listeners:h})}var hB=/\r\n?/g,cB=/\u0000|\uFFFD/g;function K7(e){return(typeof e=="string"?e:""+e).replace(hB,`
`).replace(cB,"")}function Uf(e,t){return t=K7(t),K7(e)===t}function y1(e,t,a,i,r,n){switch(a){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||on(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&on(e,""+i);break;case"className":qc(e,"class",i);break;case"tabIndex":qc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":qc(e,a,i);break;case"style":Dg(e,i,n);break;case"data":if(t!=="object"){qc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(a);break}i=oo(""+i),e.setAttribute(a,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof n=="function"&&(a==="formAction"?(t!=="input"&&y1(e,t,"name",r.name,r,null),y1(e,t,"formEncType",r.formEncType,r,null),y1(e,t,"formMethod",r.formMethod,r,null),y1(e,t,"formTarget",r.formTarget,r,null)):(y1(e,t,"encType",r.encType,r,null),y1(e,t,"method",r.method,r,null),y1(e,t,"target",r.target,r,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(a);break}i=oo(""+i),e.setAttribute(a,i);break;case"onClick":i!=null&&(e.onclick=qa);break;case"onScroll":i!=null&&a1("scroll",e);break;case"onScrollEnd":i!=null&&a1("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(at(61));if(a=i.__html,a!=null){if(r.children!=null)throw Error(at(60));e.innerHTML=a}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}a=oo(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(a,""+i):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":i===!0?e.setAttribute(a,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(a,i):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(a,i):e.removeAttribute(a);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(a):e.setAttribute(a,i);break;case"popover":a1("beforetoggle",e),a1("toggle",e),co(e,"popover",i);break;case"xlinkActuate":Pa(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Pa(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Pa(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Pa(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Pa(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Pa(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Pa(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Pa(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Pa(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":co(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Dw.get(a)||a,co(e,a,i))}}function u9(e,t,a,i,r,n){switch(a){case"style":Dg(e,i,n);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(at(61));if(a=i.__html,a!=null){if(r.children!=null)throw Error(at(60));e.innerHTML=a}}break;case"children":typeof i=="string"?on(e,i):(typeof i=="number"||typeof i=="bigint")&&on(e,""+i);break;case"onScroll":i!=null&&a1("scroll",e);break;case"onScrollEnd":i!=null&&a1("scrollend",e);break;case"onClick":i!=null&&(e.onclick=qa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!_g.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(r=a.endsWith("Capture"),t=a.slice(2,r?a.length-7:void 0),n=e[re]||null,n=n!=null?n[a]:null,typeof n=="function"&&e.removeEventListener(t,n,r),typeof i=="function")){typeof n!="function"&&n!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,i,r);break t}a in e?e[a]=i:i===!0?e.setAttribute(a,""):co(e,a,i)}}}function b2(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":a1("error",e),a1("load",e);var i=!1,r=!1,n;for(n in a)if(a.hasOwnProperty(n)){var h=a[n];if(h!=null)switch(n){case"src":i=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(at(137,t));default:y1(e,t,n,h,a,null)}}r&&y1(e,t,"srcSet",a.srcSet,a,null),i&&y1(e,t,"src",a.src,a,null);return;case"input":a1("invalid",e);var c=n=h=r=null,o=null,l=null;for(i in a)if(a.hasOwnProperty(i)){var v=a[i];if(v!=null)switch(i){case"name":r=v;break;case"type":h=v;break;case"checked":o=v;break;case"defaultChecked":l=v;break;case"value":n=v;break;case"defaultValue":c=v;break;case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(at(137,t));break;default:y1(e,t,i,v,a,null)}}Og(e,n,c,o,l,h,r,!1);return;case"select":a1("invalid",e),i=h=n=null;for(r in a)if(a.hasOwnProperty(r)&&(c=a[r],c!=null))switch(r){case"value":n=c;break;case"defaultValue":h=c;break;case"multiple":i=c;default:y1(e,t,r,c,a,null)}t=n,a=h,e.multiple=!!i,t!=null?$0(e,!!i,t,!1):a!=null&&$0(e,!!i,a,!0);return;case"textarea":a1("invalid",e),n=r=i=null;for(h in a)if(a.hasOwnProperty(h)&&(c=a[h],c!=null))switch(h){case"value":i=c;break;case"defaultValue":r=c;break;case"children":n=c;break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(at(91));break;default:y1(e,t,h,c,a,null)}Rg(e,i,r,n);return;case"option":for(o in a)a.hasOwnProperty(o)&&(i=a[o],i!=null)&&(o==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":y1(e,t,o,i,a,null));return;case"dialog":a1("beforetoggle",e),a1("toggle",e),a1("cancel",e),a1("close",e);break;case"iframe":case"object":a1("load",e);break;case"video":case"audio":for(i=0;i<eh.length;i++)a1(eh[i],e);break;case"image":a1("error",e),a1("load",e);break;case"details":a1("toggle",e);break;case"embed":case"source":case"link":a1("error",e),a1("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(l in a)if(a.hasOwnProperty(l)&&(i=a[l],i!=null))switch(l){case"children":case"dangerouslySetInnerHTML":throw Error(at(137,t));default:y1(e,t,l,i,a,null)}return;default:if(S9(t)){for(v in a)a.hasOwnProperty(v)&&(i=a[v],i!==void 0&&u9(e,t,v,i,a,void 0));return}}for(c in a)a.hasOwnProperty(c)&&(i=a[c],i!=null&&y1(e,t,c,i,a,null))}function oB(e,t,a,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,n=null,h=null,c=null,o=null,l=null,v=null;for(u in a){var g=a[u];if(a.hasOwnProperty(u)&&g!=null)switch(u){case"checked":break;case"value":break;case"defaultValue":o=g;default:i.hasOwnProperty(u)||y1(e,t,u,null,i,g)}}for(var d in i){var u=i[d];if(g=a[d],i.hasOwnProperty(d)&&(u!=null||g!=null))switch(d){case"type":n=u;break;case"name":r=u;break;case"checked":l=u;break;case"defaultChecked":v=u;break;case"value":h=u;break;case"defaultValue":c=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(at(137,t));break;default:u!==g&&y1(e,t,d,u,i,g)}}Is(e,h,c,o,l,v,n,r);return;case"select":u=h=c=d=null;for(n in a)if(o=a[n],a.hasOwnProperty(n)&&o!=null)switch(n){case"value":break;case"multiple":u=o;default:i.hasOwnProperty(n)||y1(e,t,n,null,i,o)}for(r in i)if(n=i[r],o=a[r],i.hasOwnProperty(r)&&(n!=null||o!=null))switch(r){case"value":d=n;break;case"defaultValue":c=n;break;case"multiple":h=n;default:n!==o&&y1(e,t,r,n,i,o)}t=c,a=h,i=u,d!=null?$0(e,!!a,d,!1):!!i!=!!a&&(t!=null?$0(e,!!a,t,!0):$0(e,!!a,a?[]:"",!1));return;case"textarea":u=d=null;for(c in a)if(r=a[c],a.hasOwnProperty(c)&&r!=null&&!i.hasOwnProperty(c))switch(c){case"value":break;case"children":break;default:y1(e,t,c,null,i,r)}for(h in i)if(r=i[h],n=a[h],i.hasOwnProperty(h)&&(r!=null||n!=null))switch(h){case"value":d=r;break;case"defaultValue":u=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(at(91));break;default:r!==n&&y1(e,t,h,r,i,n)}Eg(e,d,u);return;case"option":for(var p in a)d=a[p],a.hasOwnProperty(p)&&d!=null&&!i.hasOwnProperty(p)&&(p==="selected"?e.selected=!1:y1(e,t,p,null,i,d));for(o in i)d=i[o],u=a[o],i.hasOwnProperty(o)&&d!==u&&(d!=null||u!=null)&&(o==="selected"?e.selected=d&&typeof d!="function"&&typeof d!="symbol":y1(e,t,o,d,i,u));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var x in a)d=a[x],a.hasOwnProperty(x)&&d!=null&&!i.hasOwnProperty(x)&&y1(e,t,x,null,i,d);for(l in i)if(d=i[l],u=a[l],i.hasOwnProperty(l)&&d!==u&&(d!=null||u!=null))switch(l){case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(at(137,t));break;default:y1(e,t,l,d,i,u)}return;default:if(S9(t)){for(var f in a)d=a[f],a.hasOwnProperty(f)&&d!==void 0&&!i.hasOwnProperty(f)&&u9(e,t,f,void 0,i,d);for(v in i)d=i[v],u=a[v],!i.hasOwnProperty(v)||d===u||d===void 0&&u===void 0||u9(e,t,v,d,i,u);return}}for(var s in a)d=a[s],a.hasOwnProperty(s)&&d!=null&&!i.hasOwnProperty(s)&&y1(e,t,s,null,i,d);for(g in i)d=i[g],u=a[g],!i.hasOwnProperty(g)||d===u||d==null&&u==null||y1(e,t,g,d,i,u)}function J7(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function lB(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),i=0;i<a.length;i++){var r=a[i],n=r.transferSize,h=r.initiatorType,c=r.duration;if(n&&c&&J7(h)){for(h=0,c=r.responseEnd,i+=1;i<a.length;i++){var o=a[i],l=o.startTime;if(l>c)break;var v=o.transferSize,g=o.initiatorType;v&&J7(g)&&(o=o.responseEnd,h+=v*(o<c?1:(c-l)/(o-l)))}if(--i,t+=8*(n+h)/(r.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var g9=null,p9=null;function Xo(e){return e.nodeType===9?e:e.ownerDocument}function Q7(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ff(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function f9(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bs=null;function dB(){var e=window.event;return e&&e.type==="popstate"?e===Bs?!1:(Bs=e,!0):(Bs=null,!1)}var Wf=typeof setTimeout=="function"?setTimeout:void 0,sB=typeof clearTimeout=="function"?clearTimeout:void 0,$7=typeof Promise=="function"?Promise:void 0,vB=typeof queueMicrotask=="function"?queueMicrotask:typeof $7<"u"?function(e){return $7.resolve(null).then(e).catch(uB)}:Wf;function uB(e){setTimeout(function(){throw e})}function Ki(e){return e==="head"}function tg(e,t){var a=t,i=0;do{var r=a.nextSibling;if(e.removeChild(a),r&&r.nodeType===8)if(a=r.data,a==="/$"||a==="/&"){if(i===0){e.removeChild(r),fn(t);return}i--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")i++;else if(a==="html")j4(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,j4(a);for(var n=a.firstChild;n;){var h=n.nextSibling,c=n.nodeName;n[dh]||c==="SCRIPT"||c==="STYLE"||c==="LINK"&&n.rel.toLowerCase()==="stylesheet"||a.removeChild(n),n=h}}else a==="body"&&j4(e.ownerDocument.body);a=r}while(a);fn(t)}function eg(e,t){var a=e;e=0;do{var i=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),i&&i.nodeType===8)if(a=i.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=i}while(a)}function M9(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":M9(a),k9(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function gB(e,t,a,i){for(;e.nodeType===1;){var r=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[dh])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(n=e.getAttribute("rel"),n==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(n!==r.rel||e.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||e.getAttribute("title")!==(r.title==null?null:r.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(n=e.getAttribute("src"),(n!==(r.src==null?null:r.src)||e.getAttribute("type")!==(r.type==null?null:r.type)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&n&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var n=r.name==null?null:""+r.name;if(r.type==="hidden"&&e.getAttribute("name")===n)return e}else return e;if(e=Ge(e.nextSibling),e===null)break}return null}function pB(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ge(e.nextSibling),e===null))return null;return e}function Gf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ge(e.nextSibling),e===null))return null;return e}function m9(e){return e.data==="$?"||e.data==="$~"}function z9(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function fB(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var i=function(){t(),a.removeEventListener("DOMContentLoaded",i)};a.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Ge(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var x9=null;function ag(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Ge(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function ig(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function jf(e,t,a){switch(t=Xo(a),e){case"html":if(e=t.documentElement,!e)throw Error(at(452));return e;case"head":if(e=t.head,!e)throw Error(at(453));return e;case"body":if(e=t.body,!e)throw Error(at(454));return e;default:throw Error(at(451))}}function j4(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);k9(e)}var je=new Map,rg=new Set;function qo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ii=p1.d;p1.d={f:MB,r:mB,D:zB,C:xB,L:HB,m:LB,X:wB,S:VB,M:yB};function MB(){var e=ii.f(),t=dl();return e||t}function mB(e){var t=mn(e);t!==null&&t.tag===5&&t.type==="form"?Dp(t):ii.r(e)}var Ln=typeof document>"u"?null:document;function Xf(e,t,a){var i=Ln;if(i&&typeof t=="string"&&t){var r=Ne(t);r='link[rel="'+e+'"][href="'+r+'"]',typeof a=="string"&&(r+='[crossorigin="'+a+'"]'),rg.has(r)||(rg.add(r),e={rel:e,crossOrigin:a,href:t},i.querySelector(r)===null&&(t=i.createElement("link"),b2(t,"link",e),x2(t),i.head.appendChild(t)))}}function zB(e){ii.D(e),Xf("dns-prefetch",e,null)}function xB(e,t){ii.C(e,t),Xf("preconnect",e,t)}function HB(e,t,a){ii.L(e,t,a);var i=Ln;if(i&&e&&t){var r='link[rel="preload"][as="'+Ne(t)+'"]';t==="image"&&a&&a.imageSrcSet?(r+='[imagesrcset="'+Ne(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(r+='[imagesizes="'+Ne(a.imageSizes)+'"]')):r+='[href="'+Ne(e)+'"]';var n=r;switch(t){case"style":n=pn(e);break;case"script":n=Vn(e)}je.has(n)||(e=P1({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),je.set(n,e),i.querySelector(r)!==null||t==="style"&&i.querySelector(fh(n))||t==="script"&&i.querySelector(Mh(n))||(t=i.createElement("link"),b2(t,"link",e),x2(t),i.head.appendChild(t)))}}function LB(e,t){ii.m(e,t);var a=Ln;if(a&&e){var i=t&&typeof t.as=="string"?t.as:"script",r='link[rel="modulepreload"][as="'+Ne(i)+'"][href="'+Ne(e)+'"]',n=r;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":n=Vn(e)}if(!je.has(n)&&(e=P1({rel:"modulepreload",href:e},t),je.set(n,e),a.querySelector(r)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Mh(n)))return}i=a.createElement("link"),b2(i,"link",e),x2(i),a.head.appendChild(i)}}}function VB(e,t,a){ii.S(e,t,a);var i=Ln;if(i&&e){var r=Q0(i).hoistableStyles,n=pn(e);t=t||"default";var h=r.get(n);if(!h){var c={loading:0,preload:null};if(h=i.querySelector(fh(n)))c.loading=5;else{e=P1({rel:"stylesheet",href:e,"data-precedence":t},a),(a=je.get(n))&&u6(e,a);var o=h=i.createElement("link");x2(o),b2(o,"link",e),o._p=new Promise(function(l,v){o.onload=l,o.onerror=v}),o.addEventListener("load",function(){c.loading|=1}),o.addEventListener("error",function(){c.loading|=2}),c.loading|=4,zo(h,t,i)}h={type:"stylesheet",instance:h,count:1,state:c},r.set(n,h)}}}function wB(e,t){ii.X(e,t);var a=Ln;if(a&&e){var i=Q0(a).hoistableScripts,r=Vn(e),n=i.get(r);n||(n=a.querySelector(Mh(r)),n||(e=P1({src:e,async:!0},t),(t=je.get(r))&&g6(e,t),n=a.createElement("script"),x2(n),b2(n,"link",e),a.head.appendChild(n)),n={type:"script",instance:n,count:1,state:null},i.set(r,n))}}function yB(e,t){ii.M(e,t);var a=Ln;if(a&&e){var i=Q0(a).hoistableScripts,r=Vn(e),n=i.get(r);n||(n=a.querySelector(Mh(r)),n||(e=P1({src:e,async:!0,type:"module"},t),(t=je.get(r))&&g6(e,t),n=a.createElement("script"),x2(n),b2(n,"link",e),a.head.appendChild(n)),n={type:"script",instance:n,count:1,state:null},i.set(r,n))}}function ng(e,t,a,i){var r=(r=Ri.current)?qo(r):null;if(!r)throw Error(at(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=pn(a.href),a=Q0(r).hoistableStyles,i=a.get(t),i||(i={type:"style",instance:null,count:0,state:null},a.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=pn(a.href);var n=Q0(r).hoistableStyles,h=n.get(e);if(h||(r=r.ownerDocument||r,h={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},n.set(e,h),(n=r.querySelector(fh(e)))&&!n._p&&(h.instance=n,h.state.loading=5),je.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},je.set(e,a),n||BB(r,e,a,h.state))),t&&i===null)throw Error(at(528,""));return h}if(t&&i!==null)throw Error(at(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Vn(a),a=Q0(r).hoistableScripts,i=a.get(t),i||(i={type:"script",instance:null,count:0,state:null},a.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(at(444,e))}}function pn(e){return'href="'+Ne(e)+'"'}function fh(e){return'link[rel="stylesheet"]['+e+"]"}function qf(e){return P1({},e,{"data-precedence":e.precedence,precedence:null})}function BB(e,t,a,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),b2(t,"link",a),x2(t),e.head.appendChild(t))}function Vn(e){return'[src="'+Ne(e)+'"]'}function Mh(e){return"script[async]"+e}function hg(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Ne(a.href)+'"]');if(i)return t.instance=i,x2(i),i;var r=P1({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),x2(i),b2(i,"style",r),zo(i,a.precedence,e),t.instance=i;case"stylesheet":r=pn(a.href);var n=e.querySelector(fh(r));if(n)return t.state.loading|=4,t.instance=n,x2(n),n;i=qf(a),(r=je.get(r))&&u6(i,r),n=(e.ownerDocument||e).createElement("link"),x2(n);var h=n;return h._p=new Promise(function(c,o){h.onload=c,h.onerror=o}),b2(n,"link",i),t.state.loading|=4,zo(n,a.precedence,e),t.instance=n;case"script":return n=Vn(a.src),(r=e.querySelector(Mh(n)))?(t.instance=r,x2(r),r):(i=a,(r=je.get(n))&&(i=P1({},a),g6(i,r)),e=e.ownerDocument||e,r=e.createElement("script"),x2(r),b2(r,"link",i),e.head.appendChild(r),t.instance=r);case"void":return null;default:throw Error(at(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,zo(i,a.precedence,e));return t.instance}function zo(e,t,a){for(var i=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=i.length?i[i.length-1]:null,n=r,h=0;h<i.length;h++){var c=i[h];if(c.dataset.precedence===t)n=c;else if(n!==r)break}n?n.parentNode.insertBefore(e,n.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function u6(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function g6(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var xo=null;function cg(e,t,a){if(xo===null){var i=new Map,r=xo=new Map;r.set(a,i)}else r=xo,i=r.get(a),i||(i=new Map,r.set(a,i));if(i.has(e))return i;for(i.set(e,null),a=a.getElementsByTagName(e),r=0;r<a.length;r++){var n=a[r];if(!(n[dh]||n[C2]||e==="link"&&n.getAttribute("rel")==="stylesheet")&&n.namespaceURI!=="http://www.w3.org/2000/svg"){var h=n.getAttribute(t)||"";h=e+h;var c=i.get(h);c?c.push(n):i.set(h,[n])}}return i}function og(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function CB(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Zf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function kB(e,t,a,i){if(a.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var r=pn(i.href),n=t.querySelector(fh(r));if(n){t=n._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Zo.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=n,x2(n);return}n=t.ownerDocument||t,i=qf(i),(r=je.get(r))&&u6(i,r),n=n.createElement("link"),x2(n);var h=n;h._p=new Promise(function(c,o){h.onload=c,h.onerror=o}),b2(n,"link",i),a.instance=n}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Zo.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var Cs=0;function SB(e,t){return e.stylesheets&&e.count===0&&Ho(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var i=setTimeout(function(){if(e.stylesheets&&Ho(e,e.stylesheets),e.unsuspend){var n=e.unsuspend;e.unsuspend=null,n()}},6e4+t);0<e.imgBytes&&Cs===0&&(Cs=62500*lB());var r=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Ho(e,e.stylesheets),e.unsuspend)){var n=e.unsuspend;e.unsuspend=null,n()}},(e.imgBytes>Cs?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(r)}}:null}function Zo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ho(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yo=null;function Ho(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yo=new Map,t.forEach(bB,e),Yo=null,Zo.call(e))}function bB(e,t){if(!(t.state.loading&4)){var a=Yo.get(e);if(a)var i=a.get(null);else{a=new Map,Yo.set(e,a);for(var r=e.querySelectorAll("link[data-precedence],style[data-precedence]"),n=0;n<r.length;n++){var h=r[n];(h.nodeName==="LINK"||h.getAttribute("media")!=="not all")&&(a.set(h.dataset.precedence,h),i=h)}i&&a.set(null,i)}r=t.instance,h=r.getAttribute("data-precedence"),n=a.get(h)||i,n===i&&a.set(null,r),a.set(h,r),this.count++,i=Zo.bind(this),r.addEventListener("load",i),r.addEventListener("error",i),n?n.parentNode.insertBefore(r,n.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(r,e.firstChild)),t.state.loading|=4}}var ih={$$typeof:Xa,Provider:null,Consumer:null,_currentValue:kr,_currentValue2:kr,_threadCount:0};function _B(e,t,a,i,r,n,h,c,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=$3(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$3(0),this.hiddenUpdates=$3(null),this.identifierPrefix=i,this.onUncaughtError=r,this.onCaughtError=n,this.onRecoverableError=h,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function Yf(e,t,a,i,r,n,h,c,o,l,v,g){return e=new _B(e,t,a,h,o,l,v,g,c),t=1,n===!0&&(t|=24),n=ge(3,null,null,t),e.current=n,n.stateNode=e,t=N9(),t.refCount++,e.pooledCache=t,t.refCount++,n.memoizedState={element:i,isDehydrated:a,cache:t},W9(n),e}function Kf(e){return e?(e=Z0,e):Z0}function Jf(e,t,a,i,r,n){r=Kf(r),i.context===null?i.context=r:i.pendingContext=r,i=Ii(t),i.payload={element:a},n=n===void 0?null:n,n!==null&&(i.callback=n),a=Pi(e,i,t),a!==null&&(ie(a,e,t),D4(a,e,t))}function lg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function p6(e,t){lg(e,t),(e=e.alternate)&&lg(e,t)}function Qf(e){if(e.tag===13||e.tag===31){var t=Ur(e,67108864);t!==null&&ie(t,e,67108864),p6(e,67108864)}}function dg(e){if(e.tag===13||e.tag===31){var t=ze();t=B9(t);var a=Ur(e,t);a!==null&&ie(a,e,t),p6(e,t)}}var Ko=!0;function AB(e,t,a,i){var r=Pt.T;Pt.T=null;var n=p1.p;try{p1.p=2,f6(e,t,a,i)}finally{p1.p=n,Pt.T=r}}function TB(e,t,a,i){var r=Pt.T;Pt.T=null;var n=p1.p;try{p1.p=8,f6(e,t,a,i)}finally{p1.p=n,Pt.T=r}}function f6(e,t,a,i){if(Ko){var r=H9(i);if(r===null)ys(e,t,i,Jo,a),sg(e,i);else if(EB(r,e,t,a,i))i.stopPropagation();else if(sg(e,i),t&4&&-1<OB.indexOf(e)){for(;r!==null;){var n=mn(r);if(n!==null)switch(n.tag){case 3:if(n=n.stateNode,n.current.memoizedState.isDehydrated){var h=yr(n.pendingLanes);if(h!==0){var c=n;for(c.pendingLanes|=2,c.entangledLanes|=2;h;){var o=1<<31-me(h);c.entanglements[1]|=o,h&=~o}Va(n),(g1&6)===0&&(No=fe()+500,ph(0,!1))}}break;case 31:case 13:c=Ur(n,2),c!==null&&ie(c,n,2),dl(),p6(n,2)}if(n=H9(i),n===null&&ys(e,t,i,Jo,a),n===r)break;r=n}r!==null&&i.stopPropagation()}else ys(e,t,i,null,a)}}function H9(e){return e=b9(e),M6(e)}var Jo=null;function M6(e){if(Jo=null,e=F0(e),e!==null){var t=hh(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=Mg(t),e!==null)return e;e=null}else if(a===31){if(e=mg(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Jo=e,null}function $f(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Hw()){case Lg:return 2;case Vg:return 8;case Bo:case Lw:return 32;case wg:return 268435456;default:return 32}default:return 32}}var L9=!1,Fi=null,Wi=null,Gi=null,rh=new Map,nh=new Map,bi=[],OB="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function sg(e,t){switch(e){case"focusin":case"focusout":Fi=null;break;case"dragenter":case"dragleave":Wi=null;break;case"mouseover":case"mouseout":Gi=null;break;case"pointerover":case"pointerout":rh.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":nh.delete(t.pointerId)}}function B4(e,t,a,i,r,n){return e===null||e.nativeEvent!==n?(e={blockedOn:t,domEventName:a,eventSystemFlags:i,nativeEvent:n,targetContainers:[r]},t!==null&&(t=mn(t),t!==null&&Qf(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function EB(e,t,a,i,r){switch(t){case"focusin":return Fi=B4(Fi,e,t,a,i,r),!0;case"dragenter":return Wi=B4(Wi,e,t,a,i,r),!0;case"mouseover":return Gi=B4(Gi,e,t,a,i,r),!0;case"pointerover":var n=r.pointerId;return rh.set(n,B4(rh.get(n)||null,e,t,a,i,r)),!0;case"gotpointercapture":return n=r.pointerId,nh.set(n,B4(nh.get(n)||null,e,t,a,i,r)),!0}return!1}function tM(e){var t=F0(e.target);if(t!==null){var a=hh(t);if(a!==null){if(t=a.tag,t===13){if(t=Mg(a),t!==null){e.blockedOn=t,Z8(e.priority,function(){dg(a)});return}}else if(t===31){if(t=mg(a),t!==null){e.blockedOn=t,Z8(e.priority,function(){dg(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Lo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=H9(e.nativeEvent);if(a===null){a=e.nativeEvent;var i=new a.constructor(a.type,a);Ns=i,a.target.dispatchEvent(i),Ns=null}else return t=mn(a),t!==null&&Qf(t),e.blockedOn=a,!1;t.shift()}return!0}function vg(e,t,a){Lo(e)&&a.delete(t)}function RB(){L9=!1,Fi!==null&&Lo(Fi)&&(Fi=null),Wi!==null&&Lo(Wi)&&(Wi=null),Gi!==null&&Lo(Gi)&&(Gi=null),rh.forEach(vg),nh.forEach(vg)}function no(e,t){e.blockedOn===t&&(e.blockedOn=null,L9||(L9=!0,p2.unstable_scheduleCallback(p2.unstable_NormalPriority,RB)))}var ho=null;function ug(e){ho!==e&&(ho=e,p2.unstable_scheduleCallback(p2.unstable_NormalPriority,function(){ho===e&&(ho=null);for(var t=0;t<e.length;t+=3){var a=e[t],i=e[t+1],r=e[t+2];if(typeof i!="function"){if(M6(i||a)===null)continue;break}var n=mn(a);n!==null&&(e.splice(t,3),t-=3,a9(n,{pending:!0,data:r,method:a.method,action:i},i,r))}}))}function fn(e){function t(o){return no(o,e)}Fi!==null&&no(Fi,e),Wi!==null&&no(Wi,e),Gi!==null&&no(Gi,e),rh.forEach(t),nh.forEach(t);for(var a=0;a<bi.length;a++){var i=bi[a];i.blockedOn===e&&(i.blockedOn=null)}for(;0<bi.length&&(a=bi[0],a.blockedOn===null);)tM(a),a.blockedOn===null&&bi.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(i=0;i<a.length;i+=3){var r=a[i],n=a[i+1],h=r[re]||null;if(typeof n=="function")h||ug(a);else if(h){var c=null;if(n&&n.hasAttribute("formAction")){if(r=n,h=n[re]||null)c=h.formAction;else if(M6(r)!==null)continue}else c=h.action;typeof c=="function"?a[i+1]=c:(a.splice(i,3),i-=3),ug(a)}}}function eM(){function e(n){n.canIntercept&&n.info==="react-transition"&&n.intercept({handler:function(){return new Promise(function(h){return r=h})},focusReset:"manual",scroll:"manual"})}function t(){r!==null&&(r(),r=null),i||setTimeout(a,20)}function a(){if(!i&&!navigation.transition){var n=navigation.currentEntry;n&&n.url!=null&&navigation.navigate(n.url,{state:n.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,r=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),r!==null&&(r(),r=null)}}}function m6(e){this._internalRoot=e}ul.prototype.render=m6.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(at(409));var a=t.current,i=ze();Jf(a,i,e,t,null,null)};ul.prototype.unmount=m6.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Jf(e.current,2,null,e,null,null),dl(),t[Mn]=null}};function ul(e){this._internalRoot=e}ul.prototype.unstable_scheduleHydration=function(e){if(e){var t=Sg();e={blockedOn:null,target:e,priority:t};for(var a=0;a<bi.length&&t!==0&&t<bi[a].priority;a++);bi.splice(a,0,e),a===0&&tM(e)}};var gg=pg.version;if(gg!=="19.2.6")throw Error(at(527,gg,"19.2.6"));p1.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(at(188)):(e=Object.keys(e).join(","),Error(at(268,e)));return e=gw(t),e=e!==null?zg(e):null,e=e===null?null:e.stateNode,e};var DB={bundleType:0,version:"19.2.6",rendererPackageName:"react-dom",currentDispatcherRef:Pt,reconcilerVersion:"19.2.6"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(C4=__REACT_DEVTOOLS_GLOBAL_HOOK__,!C4.isDisabled&&C4.supportsFiber))try{ch=C4.inject(DB),Me=C4}catch{}var C4;gl.createRoot=function(e,t){if(!fg(e))throw Error(at(299));var a=!1,i="",r=jp,n=Xp,h=qp;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(r=t.onUncaughtError),t.onCaughtError!==void 0&&(n=t.onCaughtError),t.onRecoverableError!==void 0&&(h=t.onRecoverableError)),t=Yf(e,1,!1,null,null,a,i,null,r,n,h,eM),e[Mn]=t.current,v6(e),new m6(t)};gl.hydrateRoot=function(e,t,a){if(!fg(e))throw Error(at(299));var i=!1,r="",n=jp,h=Xp,c=qp,o=null;return a!=null&&(a.unstable_strictMode===!0&&(i=!0),a.identifierPrefix!==void 0&&(r=a.identifierPrefix),a.onUncaughtError!==void 0&&(n=a.onUncaughtError),a.onCaughtError!==void 0&&(h=a.onCaughtError),a.onRecoverableError!==void 0&&(c=a.onRecoverableError),a.formState!==void 0&&(o=a.formState)),t=Yf(e,1,!0,t,a??null,i,r,o,n,h,c,eM),t.context=Kf(null),a=t.current,i=ze(),i=B9(i),r=Ii(i),r.callback=null,Pi(a,r,i),a=i,t.current.lanes=a,lh(t,a),Va(t),e[Mn]=t.current,v6(e),new ul(t)};gl.version="19.2.6"});var nM=fa((SO,rM)=>{"use strict";function iM(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(iM)}catch(e){console.error(e)}}iM(),rM.exports=aM()});var cM=fa(pl=>{"use strict";var IB=Symbol.for("react.transitional.element"),PB=Symbol.for("react.fragment");function hM(e,t,a){var i=null;if(a!==void 0&&(i=""+a),t.key!==void 0&&(i=""+t.key),"key"in t){a={};for(var r in t)r!=="key"&&(a[r]=t[r])}else a=t;return t=a.ref,{$$typeof:IB,type:e,key:i,ref:t!==void 0?t:null,props:a}}pl.Fragment=PB;pl.jsx=hM;pl.jsxs=hM});var Tt=fa((TO,oM)=>{"use strict";oM.exports=cM()});function Vt(e,t){let a=e[t];if(a===void 0)throw new RangeError(`Index ${t} is out of bounds (length ${e.length}).`);return a}var ia=rt(()=>{});function fl(e){return UB.has(e)}var NB,W1,UB,wa=rt(()=>{NB=[{id:"Gen",name:"Genesis",testament:"OT",aliases:["ge","gn"]},{id:"Exod",name:"Exodus",testament:"OT",aliases:["ex","exo"]},{id:"Lev",name:"Leviticus",testament:"OT",aliases:["le","lv"]},{id:"Num",name:"Numbers",testament:"OT",aliases:["nu","nm","nb"]},{id:"Deut",name:"Deuteronomy",testament:"OT",aliases:["de","dt","deu"]},{id:"Josh",name:"Joshua",testament:"OT",aliases:["jos","jsh"]},{id:"Judg",name:"Judges",testament:"OT",aliases:["jdg","jg","jdgs"]},{id:"Ruth",name:"Ruth",testament:"OT",aliases:["ru","rth"]},{id:"1Sam",name:"1 Samuel",testament:"OT",aliases:["1sa","1sm"]},{id:"2Sam",name:"2 Samuel",testament:"OT",aliases:["2sa","2sm"]},{id:"1Kgs",name:"1 Kings",testament:"OT",aliases:["1ki","1kg"]},{id:"2Kgs",name:"2 Kings",testament:"OT",aliases:["2ki","2kg"]},{id:"1Chr",name:"1 Chronicles",testament:"OT",aliases:["1ch","1chron"]},{id:"2Chr",name:"2 Chronicles",testament:"OT",aliases:["2ch","2chron"]},{id:"Ezra",name:"Ezra",testament:"OT",aliases:["ezr"]},{id:"Neh",name:"Nehemiah",testament:"OT",aliases:["ne"]},{id:"Esth",name:"Esther",testament:"OT",aliases:["es","est"]},{id:"Job",name:"Job",testament:"OT",aliases:["jb"]},{id:"Ps",name:"Psalms",referenceName:"Psalm",testament:"OT",aliases:["psa","psm","pss"]},{id:"Prov",name:"Proverbs",testament:"OT",aliases:["pr","pro","prv"]},{id:"Eccl",name:"Ecclesiastes",testament:"OT",aliases:["ec","ecc","qoh"]},{id:"Song",name:"Song of Solomon",testament:"OT",aliases:["sng","sos","songofsongs","canticles"]},{id:"Isa",name:"Isaiah",testament:"OT",aliases:["is"]},{id:"Jer",name:"Jeremiah",testament:"OT",aliases:["je","jr"]},{id:"Lam",name:"Lamentations",testament:"OT",aliases:["la"]},{id:"Ezek",name:"Ezekiel",testament:"OT",aliases:["eze","ezk"]},{id:"Dan",name:"Daniel",testament:"OT",aliases:["da","dn"]},{id:"Hos",name:"Hosea",testament:"OT",aliases:["ho"]},{id:"Joel",name:"Joel",testament:"OT",aliases:["jl"]},{id:"Amos",name:"Amos",testament:"OT",aliases:["am"]},{id:"Obad",name:"Obadiah",testament:"OT",aliases:["ob","oba"]},{id:"Jonah",name:"Jonah",testament:"OT",aliases:["jon","jnh"]},{id:"Mic",name:"Micah",testament:"OT",aliases:["mi","mc"]},{id:"Nah",name:"Nahum",testament:"OT",aliases:["na"]},{id:"Hab",name:"Habakkuk",testament:"OT",aliases:["hb"]},{id:"Zeph",name:"Zephaniah",testament:"OT",aliases:["zep","zp"]},{id:"Hag",name:"Haggai",testament:"OT",aliases:["hg"]},{id:"Zech",name:"Zechariah",testament:"OT",aliases:["zec","zc"]},{id:"Mal",name:"Malachi",testament:"OT",aliases:["ml"]},{id:"Matt",name:"Matthew",testament:"NT",aliases:["mt","mat"]},{id:"Mark",name:"Mark",testament:"NT",aliases:["mk","mr","mrk"]},{id:"Luke",name:"Luke",testament:"NT",aliases:["lk","luk"]},{id:"John",name:"John",testament:"NT",aliases:["jn","jhn","joh"]},{id:"Acts",name:"Acts",testament:"NT",aliases:["ac","act"]},{id:"Rom",name:"Romans",testament:"NT",aliases:["ro","rm"]},{id:"1Cor",name:"1 Corinthians",testament:"NT",aliases:["1co"]},{id:"2Cor",name:"2 Corinthians",testament:"NT",aliases:["2co"]},{id:"Gal",name:"Galatians",testament:"NT",aliases:["ga"]},{id:"Eph",name:"Ephesians",testament:"NT",aliases:["ephes"]},{id:"Phil",name:"Philippians",testament:"NT",aliases:["php","pp"]},{id:"Col",name:"Colossians",testament:"NT",aliases:[]},{id:"1Thess",name:"1 Thessalonians",testament:"NT",aliases:["1th","1thes","1ts"]},{id:"2Thess",name:"2 Thessalonians",testament:"NT",aliases:["2th","2thes","2ts"]},{id:"1Tim",name:"1 Timothy",testament:"NT",aliases:["1ti","1tm"]},{id:"2Tim",name:"2 Timothy",testament:"NT",aliases:["2ti","2tm"]},{id:"Titus",name:"Titus",testament:"NT",aliases:["ti","tit"]},{id:"Phlm",name:"Philemon",testament:"NT",aliases:["phm","pm","philem"]},{id:"Heb",name:"Hebrews",testament:"NT",aliases:["he"]},{id:"Jas",name:"James",testament:"NT",aliases:["jm","jam"]},{id:"1Pet",name:"1 Peter",testament:"NT",aliases:["1pe","1pt"]},{id:"2Pet",name:"2 Peter",testament:"NT",aliases:["2pe","2pt"]},{id:"1John",name:"1 John",testament:"NT",aliases:["1jn","1jo","1jhn"]},{id:"2John",name:"2 John",testament:"NT",aliases:["2jn","2jo","2jhn"]},{id:"3John",name:"3 John",testament:"NT",aliases:["3jn","3jo","3jhn"]},{id:"Jude",name:"Jude",testament:"NT",aliases:["jud","jd"]},{id:"Rev",name:"Revelation",testament:"NT",aliases:["re","rv","apocalypse"]}],W1=NB.map((e,t)=>({...e,ordinal:t})),UB=new Map(W1.map(e=>[e.id,e]))});var uM,gM=rt(()=>{uM={Gen:[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],Exod:[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],Lev:[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],Num:[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],Deut:[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],Josh:[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],Judg:[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],Ruth:[22,23,18,22],"1Sam":[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],"2Sam":[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],"1Kgs":[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],"2Kgs":[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],"1Chr":[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],"2Chr":[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],Ezra:[11,70,13,24,17,22,28,36,15,44],Neh:[11,20,32,23,19,19,73,18,38,39,36,47,31],Esth:[22,23,15,17,14,14,10,17,32,3],Job:[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],Ps:[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6],Prov:[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],Eccl:[18,26,22,16,20,12,29,17,18,20,10,14],Song:[17,17,11,16,16,13,13,14],Isa:[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],Jer:[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],Lam:[22,22,66,22,22],Ezek:[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],Dan:[21,49,30,37,31,28,28,27,27,21,45,13],Hos:[11,23,5,19,15,11,16,14,17,15,12,14,16,9],Joel:[20,32,21],Amos:[15,16,15,13,27,14,17,14,15],Obad:[21],Jonah:[17,10,10,11],Mic:[16,13,12,13,15,16,20],Nah:[15,13,19],Hab:[17,20,19],Zeph:[18,15,20],Hag:[15,23],Zech:[21,13,10,14,11,15,14,23,17,12,17,14,9,21],Mal:[14,17,18,6],Matt:[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],Mark:[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],Luke:[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],John:[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],Acts:[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],Rom:[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],"1Cor":[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],"2Cor":[24,17,18,18,21,18,16,24,15,18,33,21,14],Gal:[24,21,29,31,26,18],Eph:[23,22,21,32,33,24],Phil:[30,30,21,23],Col:[29,23,25,18],"1Thess":[10,20,13,18,28],"2Thess":[12,17,18],"1Tim":[20,15,16,16,25,21],"2Tim":[18,26,17,22],Titus:[16,15,15],Phlm:[25],Heb:[14,18,19,16,14,20,28,13,28,39,40,29,25],Jas:[27,26,18,17,20],"1Pet":[25,25,22,19,14],"2Pet":[21,22,18],"1John":[10,29,24,21,21],"2John":[13],"3John":[14],Jude:[25],Rev:[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]}});var z6,FB,_2,Wr=rt(()=>{ia();wa();gM();z6=class{id;verseCount;chapterCount;#e;#t;#n;#r;#h;#a;constructor(t,a){this.id=t,this.#e=a;let i=new Map,r=new Map,n=0,h=0;for(let o of W1){let l=a[o.id];if(l.length===0||l.some(d=>!Number.isInteger(d)||d<1))throw new RangeError(`Versification "${t}": invalid chapter verse counts for ${o.id}.`);let v=[],g=n;for(let d of l)v.push(n),n+=d;i.set(o.id,v),r.set(o.id,{start:g,end:n-1}),h+=l.length}this.verseCount=n,this.chapterCount=h,this.#t=i,this.#n=r,this.#r=new Uint8Array(n),this.#h=new Uint8Array(n),this.#a=new Uint8Array(n);let c=0;for(let o of W1)a[o.id].forEach((l,v)=>{for(let g=1;g<=l;g+=1)this.#r[c]=o.ordinal,this.#h[c]=v+1,this.#a[c]=g,c+=1})}chapterCountOf(t){return this.#e[t].length}verseCountOf(t,a){return this.#e[t][a-1]}indexOf(t){let a=this.verseCountOf(t.book,t.chapter);return a===void 0||!Number.isInteger(t.verse)||t.verse<1||t.verse>a?void 0:Vt(this.#i(t.book),t.chapter-1)+t.verse-1}refAt(t){return{book:this.bookAt(t).id,chapter:Vt(this.#h,t),verse:Vt(this.#a,t)}}bookAt(t){return Vt(W1,Vt(this.#r,t))}chapterRange(t,a){let i=this.verseCountOf(t,a);if(i===void 0)return;let r=Vt(this.#i(t),a-1);return{start:r,end:r+i-1}}bookRange(t){let a=this.#n.get(t);if(!a)throw new RangeError(`Unknown book ID: ${t}`);return a}isValidIndex(t){return Number.isInteger(t)&&t>=0&&t<this.verseCount}#i(t){let a=this.#t.get(t);if(!a)throw new RangeError(`Unknown book ID: ${t}`);return a}},FB=new z6("kjv",uM),_2=FB});function Ml(e){return e===null?"null":Array.isArray(e)?"array":typeof e}function WB(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gr(e,t){if(!WB(e))throw new Le(t,`expected an object, got ${Ml(e)}`);return e}function ra(e,t){if(typeof e!="string")throw new Le(t,`expected a string, got ${Ml(e)}`);return e}function pM(e,t){return e===null?null:ra(e,t)}function ml(e,t){if(typeof e!="number"||!Number.isInteger(e))throw new Le(t,`expected an integer, got ${Ml(e)}`);return e}function Ji(e,t,a){let i=t.find(r=>r===e);if(i===void 0)throw new Le(a,`expected one of ${t.map(r=>JSON.stringify(r)).join(", ")}, got ${JSON.stringify(e)}`);return i}function x6(e,t){if(!Array.isArray(e))throw new Le(t,`expected an array, got ${Ml(e)}`);return e}function fM(e,t,a){return x6(e,t).map((i,r)=>a(i,`${t}[${r}]`))}function GB(e){return e.every(t=>typeof t=="string")}function jB(e){return e.every(t=>typeof t=="number"&&Number.isInteger(t))}function jr(e,t){let a=x6(e,t);if(!GB(a)){let i=a.findIndex(r=>typeof r!="string");throw new Le(`${t}[${i}]`,"expected a string")}return a}function Xr(e,t){let a=x6(e,t);if(!jB(a)){let i=a.findIndex(r=>typeof r!="number"||!Number.isInteger(r));throw new Le(`${t}[${i}]`,"expected an integer")}return a}var Le,H6=rt(()=>{Le=class extends Error{path;constructor(t,a){super(`${t}: ${a}`),this.name="ValidationError",this.path=t}}});async function MM(e,t="default"){let a=`./${e}`,i=performance.now(),r;try{r=await fetch(a,{cache:t})}catch(g){throw new qr(e,g instanceof Error?g.message:"network error")}if(!r.ok)throw new qr(e,`HTTP ${r.status}`);let n=await r.arrayBuffer(),h=new TextDecoder().decode(n),c=performance.now()-i,o=performance.now(),l;try{l=JSON.parse(h)}catch{throw new qr(e,"the response is not valid JSON")}let v=performance.now()-o;return{json:l,report:{path:e,url:a,bytes:n.byteLength,downloadMs:c,parseMs:v}}}function mM(e){let t=performance.now();return{value:e(),ms:performance.now()-t}}async function qB(e){if(!("caches"in globalThis))return null;try{let t=(await caches.keys()).filter(a=>a.startsWith(XB));for(let a of t){let i=await caches.open(a),r=await i.match(e);if(r!==void 0&&await i.delete(e))return{name:a,response:r}}}catch{}return null}async function ZB(e,t){if(t!==null)try{await(await caches.open(t.name)).put(e,t.response)}catch{}}async function wn(e,t){let a=await MM(e);try{let{value:i,ms:r}=mM(()=>t(a.json));return{value:i,report:{...a.report,processMs:r}}}catch(i){if(!(i instanceof Le))throw i;let r=await qB(a.report.url);try{let n=await MM(e,"reload"),{value:h,ms:c}=mM(()=>t(n.json));return{value:h,report:{...n.report,processMs:c}}}catch(n){throw await ZB(a.report.url,r),n}}}var XB,qr,mh=rt(()=>{H6();XB="bible-cross-references",qr=class extends Error{path;constructor(t,a){super(`Dataset "${t}" is unavailable (${a}). Generate the datasets with \`npm run data\` (see README.md).`),this.name="DatasetUnavailableError",this.path=t}}});function xM(e){let t=zM.get(e);if(t)return t;let a={integer:new Intl.NumberFormat(e),decimal:new Intl.NumberFormat(e,{maximumFractionDigits:2}),percent:new Intl.NumberFormat(e,{style:"percent",maximumFractionDigits:1})};return zM.set(e,a),a}function LM(e,t=HM){return xM(t).integer.format(e)}function VM(e,t,a=HM){return t===0?"—":xM(a).percent.format(e/t)}var zM,HM,wM=rt(()=>{zM=new Map;HM="en-US"});function yn(e){return YB.some(t=>t===e)}var YB,L6=rt(()=>{YB=["kjv","bsb"]});function ri(e){return yM.some(t=>t===e)}function zl(e){for(let t of e){let a=t.toLowerCase().split("-")[0]??"",i=yM.find(r=>r===a);if(i)return i}return null}var yM,h2,Zr=rt(()=>{yM=["en"];h2="en"});var zh,V6=rt(()=>{zh={en:{tag:"en",endonym:"English"},pt:{tag:"pt-BR",endonym:"Português"},de:{tag:"de",endonym:"Deutsch"},it:{tag:"it",endonym:"Italiano"},es:{tag:"es",endonym:"Español"},uk:{tag:"uk",endonym:"Українська"}}});function xh(e){return BM[e]}var BM,xl,Yr,Bn=rt(()=>{BM={kjv:{id:"kjv",name:"King James Version",abbreviation:"KJV",language:"en",direction:"ltr",versification:"kjv",license:{name:"Public domain",url:"https://ebible.org/Scriptures/details.php?id=eng-kjv2006",publicDomain:!0},attribution:"Scripture text: King James Version (Authorized Version), the 1769 text, as in Quiet Bible. Public domain in the United States and most of the world; in the United Kingdom, letters patent reserve the right to print it to the Crown’s patentees — Cambridge University Press, Oxford University Press and Collins.",homepage:"https://ebible.org/Scriptures/details.php?id=eng-kjv2006",access:"bundled"},bsb:{id:"bsb",name:"Berean Standard Bible",abbreviation:"BSB",language:"en",direction:"ltr",versification:"kjv",license:{name:"Public domain",url:"https://berean.bible/terms.htm",publicDomain:!0},attribution:"Scripture text: Berean Standard Bible (BSB), dedicated to the public domain.",homepage:"https://berean.bible/",access:"bundled"}},xl=Object.values(BM),Yr="kjv"});function Cn(e){let t=r=>r.toLowerCase().split("-")[0]??"",a=t(zh[e].tag);if(a===t(zh[h2].tag))return Yr;let i=xl.find(r=>t(r.language)===a);return(i==null?void 0:i.id)??Yr}var w6=rt(()=>{Zr();V6();Bn()});function Lh(e){let t=e.get(Hh);return t!==null&&ri(t)?t:null}function Ll(e){let t=e.get(Hl);return t!==null&&yn(t)?t:null}function CM(e,t,a,i=null){let r=t.locale!==null&&ri(t.locale)?t.locale:null,n=i??Lh(e)??r??zl(a)??h2,h=t.translation!==null&&yn(t.translation)?t.translation:null,c=Ll(e)??h??Cn(n);return{locale:n,translation:c}}var Hh,Hl,Vl=rt(()=>{L6();Zr();w6();Hh="lang",Hl="t"});function Kr(e){return KB+e}var KB,Vh,wh,nE,hE,yh=rt(()=>{KB="bible-cross-references:";Vh="locale",wh="translation",nE=Kr(Vh),hE=Kr(wh)});function SM(){for(let e of Bh)e()}function kM(){y6.clear(),SM()}function bM(e){return Bh.size===0&&window.addEventListener("storage",kM),Bh.add(e),()=>{Bh.delete(e),Bh.size===0&&window.removeEventListener("storage",kM)}}function B6(e){let t=y6.get(Kr(e));if(t!==void 0)return t;try{return localStorage.getItem(Kr(e))}catch{return null}}function C6(e,t){y6.set(Kr(e),t);try{localStorage.setItem(Kr(e),t)}catch{}SM()}function Jr(e){return B6(e)}function _M(e,t){C6(e,t)}function AM(e,t){let a=(0,kn.useSyncExternalStore)(bM,()=>B6(e),()=>null),i=(0,kn.useCallback)(r=>{C6(e,r)},[e]);return[a??t,i]}function TM(e,t){let a=(0,kn.useSyncExternalStore)(bM,()=>B6(e),()=>null),i=(0,kn.useCallback)(r=>{C6(e,String(r))},[e]);return[a===null?t:a==="true",i]}var kn,y6,Bh,Ch=rt(()=>{kn=ct(u1(),1);yh();y6=new Map,Bh=new Set});var OM,EM=rt(()=>{wa();OM=Object.fromEntries(W1.map(e=>[e.id,{name:e.name,...e.referenceName===void 0?{}:{referenceName:e.referenceName},aliases:e.aliases}]))});function $B(e){let t=QB.get(e);if(!t)throw new RangeError(`Unknown genre ID: ${e}`);return t}function I2(e){return $B(RM[e])}function k6(e){return W1.filter(t=>RM[t.id]===e).map(t=>t.id)}var JB,$1,RM,QB,Ve=rt(()=>{wa();JB=[{id:"law",name:"Law",testament:"OT"},{id:"history",name:"History",testament:"OT"},{id:"poetry",name:"Poetry & Wisdom",testament:"OT"},{id:"major-prophets",name:"Major Prophets",testament:"OT"},{id:"minor-prophets",name:"Minor Prophets",testament:"OT"},{id:"gospels",name:"Gospels",testament:"NT"},{id:"acts",name:"Acts",testament:"NT"},{id:"pauline-epistles",name:"Pauline Epistles",testament:"NT"},{id:"general-epistles",name:"General Epistles",testament:"NT"},{id:"revelation",name:"Revelation",testament:"NT"}],$1=JB.map((e,t)=>({...e,ordinal:t})),RM={Gen:"law",Exod:"law",Lev:"law",Num:"law",Deut:"law",Josh:"history",Judg:"history",Ruth:"history","1Sam":"history","2Sam":"history","1Kgs":"history","2Kgs":"history","1Chr":"history","2Chr":"history",Ezra:"history",Neh:"history",Esth:"history",Job:"poetry",Ps:"poetry",Prov:"poetry",Eccl:"poetry",Song:"poetry",Isa:"major-prophets",Jer:"major-prophets",Lam:"major-prophets",Ezek:"major-prophets",Dan:"major-prophets",Hos:"minor-prophets",Joel:"minor-prophets",Amos:"minor-prophets",Obad:"minor-prophets",Jonah:"minor-prophets",Mic:"minor-prophets",Nah:"minor-prophets",Hab:"minor-prophets",Zeph:"minor-prophets",Hag:"minor-prophets",Zech:"minor-prophets",Mal:"minor-prophets",Matt:"gospels",Mark:"gospels",Luke:"gospels",John:"gospels",Acts:"acts",Rom:"pauline-epistles","1Cor":"pauline-epistles","2Cor":"pauline-epistles",Gal:"pauline-epistles",Eph:"pauline-epistles",Phil:"pauline-epistles",Col:"pauline-epistles","1Thess":"pauline-epistles","2Thess":"pauline-epistles","1Tim":"pauline-epistles","2Tim":"pauline-epistles",Titus:"pauline-epistles",Phlm:"pauline-epistles",Heb:"general-epistles",Jas:"general-epistles","1Pet":"general-epistles","2Pet":"general-epistles","1John":"general-epistles","2John":"general-epistles","3John":"general-epistles",Jude:"general-epistles",Rev:"revelation"},QB=new Map($1.map(e=>[e.id,e]))});var DM,IM=rt(()=>{Ve();DM=Object.fromEntries($1.map(e=>[e.id,e.name]))});var PM=rt(()=>{});var S6,b6,_6,A6=rt(()=>{S6=ct(u1(),1),b6={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},_6=S6.default.createContext&&S6.default.createContext(b6)});function eC(e,t){if(e==null)return{};var a,i,r=aC(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)a=n[i],t.indexOf(a)===-1&&{}.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}function aC(e,t){if(e==null)return{};var a={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.indexOf(i)!==-1)continue;a[i]=e[i]}return a}function wl(){return wl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)({}).hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},wl.apply(null,arguments)}function NM(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),a.push.apply(a,i)}return a}function yl(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?NM(Object(a),!0).forEach(function(i){iC(e,i,a[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):NM(Object(a)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(a,i))})}return e}function iC(e,t,a){return(t=rC(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function rC(e){var t=nC(e,"string");return typeof t=="symbol"?t:t+""}function nC(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var i=a.call(e,t||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function UM(e){return e&&e.map((t,a)=>Sn.default.createElement(t.tag,yl({key:a},t.attr),UM(t.child)))}function s1(e){return t=>Sn.default.createElement(hC,wl({attr:yl({},e.attr)},t),UM(e.child))}function hC(e){var t=a=>{var{attr:i,size:r,title:n}=e,h=eC(e,tC),c=r||a.size||"1em",o;return a.className&&(o=a.className),e.className&&(o=(o?o+" ":"")+e.className),Sn.default.createElement("svg",wl({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},a.attr,i,h,{className:o,style:yl(yl({color:e.color||a.color},a.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),n&&Sn.default.createElement("title",null,n),e.children)};return _6!==void 0?Sn.default.createElement(_6.Consumer,null,a=>t(a)):t(b6)}var Sn,tC,FM=rt(()=>{Sn=ct(u1(),1);A6();tC=["attr","size","title"]});var T6=rt(()=>{PM();FM();A6()});function WM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 6 6 18"},child:[]},{tag:"path",attr:{d:"m6 6 12 12"},child:[]}]})(e)}function GM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{width:"18",height:"18",x:"3",y:"3",rx:"2"},child:[]},{tag:"path",attr:{d:"M8 12h8"},child:[]},{tag:"path",attr:{d:"M12 8v8"},child:[]}]})(e)}function jM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"21",x2:"14",y1:"4",y2:"4"},child:[]},{tag:"line",attr:{x1:"10",x2:"3",y1:"4",y2:"4"},child:[]},{tag:"line",attr:{x1:"21",x2:"12",y1:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"8",x2:"3",y1:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"21",x2:"16",y1:"20",y2:"20"},child:[]},{tag:"line",attr:{x1:"12",x2:"3",y1:"20",y2:"20"},child:[]},{tag:"line",attr:{x1:"14",x2:"14",y1:"2",y2:"6"},child:[]},{tag:"line",attr:{x1:"8",x2:"8",y1:"10",y2:"14"},child:[]},{tag:"line",attr:{x1:"16",x2:"16",y1:"18",y2:"22"},child:[]}]})(e)}function XM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"},child:[]},{tag:"polyline",attr:{points:"16 6 12 2 8 6"},child:[]},{tag:"line",attr:{x1:"12",x2:"12",y1:"2",y2:"15"},child:[]}]})(e)}function qM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"path",attr:{d:"m21 21-4.3-4.3"},child:[]}]})(e)}function ZM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"},child:[]},{tag:"path",attr:{d:"M3 3v5h5"},child:[]}]})(e)}function YM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"},child:[]},{tag:"path",attr:{d:"M21 3v5h-5"},child:[]},{tag:"path",attr:{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"},child:[]},{tag:"path",attr:{d:"M8 16H3v5"},child:[]}]})(e)}function KM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 17a10 10 0 0 0-20 0"},child:[]},{tag:"path",attr:{d:"M6 17a6 6 0 0 1 12 0"},child:[]},{tag:"path",attr:{d:"M10 17a2 2 0 0 1 4 0"},child:[]}]})(e)}function JM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"},child:[]},{tag:"circle",attr:{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"},child:[]},{tag:"circle",attr:{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"},child:[]},{tag:"path",attr:{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"},child:[]}]})(e)}function QM(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"5",y:"2",width:"14",height:"20",rx:"7"},child:[]},{tag:"path",attr:{d:"M12 6v4"},child:[]}]})(e)}function $M(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M14 4.1 12 6"},child:[]},{tag:"path",attr:{d:"m5.1 8-2.9-.8"},child:[]},{tag:"path",attr:{d:"m6 12-1.9 2"},child:[]},{tag:"path",attr:{d:"M7.2 2.2 8 5.1"},child:[]},{tag:"path",attr:{d:"M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"},child:[]}]})(e)}function tm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 13V7"},child:[]},{tag:"path",attr:{d:"m15 10-3 3-3-3"},child:[]},{tag:"rect",attr:{width:"20",height:"14",x:"2",y:"3",rx:"2"},child:[]},{tag:"path",attr:{d:"M12 17v4"},child:[]},{tag:"path",attr:{d:"M8 21h8"},child:[]}]})(e)}function em(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m5 8 6 6"},child:[]},{tag:"path",attr:{d:"m4 14 6-6 2-3"},child:[]},{tag:"path",attr:{d:"M2 5h12"},child:[]},{tag:"path",attr:{d:"M7 2h1"},child:[]},{tag:"path",attr:{d:"m22 22-5-10-5 10"},child:[]},{tag:"path",attr:{d:"M14 18h6"},child:[]}]})(e)}function am(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"},child:[]},{tag:"path",attr:{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"},child:[]},{tag:"path",attr:{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"},child:[]},{tag:"path",attr:{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"},child:[]}]})(e)}function im(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"},child:[]},{tag:"path",attr:{d:"M9 18c-4.51 2-5-2-7-2"},child:[]}]})(e)}function rm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"1"},child:[]},{tag:"circle",attr:{cx:"12",cy:"5",r:"1"},child:[]},{tag:"circle",attr:{cx:"12",cy:"19",r:"1"},child:[]}]})(e)}function nm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"},child:[]}]})(e)}function hm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m9 18 6-6-6-6"},child:[]}]})(e)}function cm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m15 18-6-6 6-6"},child:[]}]})(e)}function om(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m6 9 6 6 6-6"},child:[]}]})(e)}function O6(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 6 9 17l-5-5"},child:[]}]})(e)}function lm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 7v14"},child:[]},{tag:"path",attr:{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"},child:[]}]})(e)}function dm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 7v14"},child:[]},{tag:"path",attr:{d:"M16 12h2"},child:[]},{tag:"path",attr:{d:"M16 8h2"},child:[]},{tag:"path",attr:{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"},child:[]},{tag:"path",attr:{d:"M6 12h2"},child:[]},{tag:"path",attr:{d:"M6 8h2"},child:[]}]})(e)}function sm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M5 12h14"},child:[]},{tag:"path",attr:{d:"m12 5 7 7-7 7"},child:[]}]})(e)}function vm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m16 3 4 4-4 4"},child:[]},{tag:"path",attr:{d:"M20 7H4"},child:[]},{tag:"path",attr:{d:"m8 21-4-4 4-4"},child:[]},{tag:"path",attr:{d:"M4 17h16"},child:[]}]})(e)}function E6(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m12 19-7-7 7-7"},child:[]},{tag:"path",attr:{d:"M19 12H5"},child:[]}]})(e)}function um(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 17V3"},child:[]},{tag:"path",attr:{d:"m6 11 6 6 6-6"},child:[]},{tag:"path",attr:{d:"M19 21H5"},child:[]}]})(e)}var gm=rt(()=>{T6()});function pm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"m18.19 12.44-3.24-1.62c1.29-1 2.12-2.56 2.12-4.32 0-3.03-2.47-5.5-5.5-5.5s-5.5 2.47-5.5 5.5c0 2.13 1.22 3.98 3 4.89v3.26c-2.15-.46-2.02-.44-2.26-.44-.53 0-1.03.21-1.41.59L4 16.22l5.09 5.09c.43.44 1.03.69 1.65.69h6.3c.98 0 1.81-.7 1.97-1.67l.8-4.71c.22-1.3-.43-2.58-1.62-3.18zm-.35 2.85-.8 4.71h-6.3c-.09 0-.17-.04-.24-.1l-3.68-3.68 4.25.89V6.5c0-.28.22-.5.5-.5s.5.22.5.5v6h1.76l3.46 1.73c.4.2.62.63.55 1.06zM8.07 6.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 .95-.38 1.81-1 2.44V6.5a2.5 2.5 0 0 0-5 0v2.44c-.62-.63-1-1.49-1-2.44z"},child:[]}]})(e)}function fm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M1 2h5v5H4.5V4.09c-1.86 2.11-3 4.88-3 7.91s1.14 5.79 3 7.91V17H6v5H1v-1.5h2.02C1.13 18.18 0 15.22 0 12s1.13-6.18 3.02-8.5H1V2zm19.22 8-4.15.01a.975.975 0 0 0-.45.08l-.59.26-1.83-4.1c-.56-1.26-2.04-1.83-3.3-1.27s-1.83 2.04-1.27 3.3l3.3 7.45-1.87.39c-.19.05-.99.27-1.36 1.21L8 19.19l6.78 2.67c.49.19 1.05.18 1.53-.04l5.99-2.65c.89-.4 1.37-1.38 1.13-2.32l-1.36-5.34c-.22-.86-.97-1.47-1.85-1.51zm1.27 7.34L15.5 20l-4.92-1.96 4.18-.88-4.3-9.7c-.11-.25 0-.55.25-.66.25-.11.55 0 .66.25l2.5 5.65 1.61-.71 4.65.01 1.36 5.34z"},child:[]}]})(e)}function Mm(e){return s1({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M6 2.5V1h5v5H9.5V3.56L3.56 9.5H6V11H1V6h1.5v2.44L8.44 2.5H6zm15.89 11.27-3.8-1.67c-.13-.06-.28-.1-.44-.1H17V7.5a2.5 2.5 0 0 0-5 0v8.15l-1.87-.4c-.19-.03-1.02-.15-1.73.56L7 17.22l5.12 5.19c.37.38.88.59 1.41.59h6.55c.98 0 1.81-.7 1.97-1.67l.92-5.44a2 2 0 0 0-1.08-2.12zM20.08 21h-6.55l-3.7-3.78 4.17.89V7.5c0-.28.22-.5.5-.5s.5.22.5.5v6.18h1.76L21 15.56 20.08 21z"},child:[]}]})(e)}var mm=rt(()=>{T6()});var R6,zm=rt(()=>{R6={icon:"xe"}});function v1(e){return function({className:a}){return(0,Dm.jsx)(e,{"aria-hidden":!0,className:a===void 0?R6.icon:`${R6.icon} ${a}`})}}var Dm,xm,Bl,Cl,kl,Qi,Sl,Hm,Lm,Vm,wm,ym,Bm,Cm,bl,km,Sm,_l,Al,bm,Tl,_m,Am,bn,Ol,El,Tm,AE,TE,Om,Em,D6,Rm,L2=rt(()=>{gm();mm();zm();Dm=ct(Tt(),1);xm=v1(KM),Bl=v1(dm),Cl=v1(cm),kl=v1(hm),Qi=v1(om),Sl=v1(WM),Hm=v1(E6),Lm=v1(lm),Vm=v1(qM),wm=v1(ZM),ym=v1(YM),Bm=v1(nm),Cm=v1(O6),bl=v1(O6),km=v1(QM),Sm=v1(am),_l=v1($M),Al=v1(pm),bm=v1(fm),Tl=v1(Mm),_m=v1(em),Am=v1(jM),bn=v1(JM),Ol=v1(sm),El=v1(E6),Tm=v1(vm),AE=v1(im),TE=v1(um),Om=v1(XM),Em=v1(rm),D6=v1(GM),Rm=v1(tm)});var z1,Im,Pm=rt(()=>{L2();z1=ct(Tt(),1),Im={ios:{label:"iPhone",steps:[{icon:Om,text:(0,z1.jsx)(z1.Fragment,{children:"Tap the share button in Safari's toolbar."})},{icon:D6,text:(0,z1.jsxs)(z1.Fragment,{children:["Scroll down and choose ",(0,z1.jsx)("b",{children:"Add to Home Screen"}),"."]})},{icon:bl,text:(0,z1.jsxs)(z1.Fragment,{children:["Tap ",(0,z1.jsx)("b",{children:"Add"}),". The app joins the others on your home screen."]})}],note:(0,z1.jsx)(z1.Fragment,{children:"Safari always offers this. Chrome, Edge and Firefox on an iPhone or iPad share the same menu, and offer it where they support it."})},android:{label:"Android",steps:[{icon:Em,text:(0,z1.jsx)(z1.Fragment,{children:"Open the menu in Chrome's toolbar."})},{icon:D6,text:(0,z1.jsxs)(z1.Fragment,{children:["Choose ",(0,z1.jsx)("b",{children:"Install app"}),", or ",(0,z1.jsx)("b",{children:"Add to Home screen"}),"."]})},{icon:bl,text:(0,z1.jsxs)(z1.Fragment,{children:["Confirm ",(0,z1.jsx)("b",{children:"Install"}),"."]})}]},desktop:{label:"Desktop",steps:[{icon:Rm,text:(0,z1.jsx)(z1.Fragment,{children:"In Chrome or Edge, click the install button at the end of the address bar."})},{icon:bl,text:(0,z1.jsxs)(z1.Fragment,{children:["Choose ",(0,z1.jsx)("b",{children:"Install"}),". The app opens in a window of its own."]})}],note:(0,z1.jsxs)(z1.Fragment,{children:["Safari on a Mac installs from ",(0,z1.jsx)("b",{children:"Share → Add to Dock"}),". Firefox installs no web apps, but the site still works offline there once you have opened it."]})}}});var Rl,I6=rt(()=>{Rl={"app.name":"Bible Cross-References","app.name.short":"Cross-References","qb.back":"Back to Quiet Bible","qb.read":"Open in Quiet Bible","view.arcs":"Arcs","view.arcs.short":"Arcs","view.arcs.open":"Show in Arcs","view.threads":"Threads","view.threads.short":"Threads","view.threads.open":"Read in context","view.switch":"Visualizations","search.label":"Go to a Bible reference","search.placeholder":"Go to…  John 3:16, Ps 23","reference.unreadable":"Enter a reference like “John 3:16” or “Ps 23”.","reference.unknownBook":e=>`Unknown book “${e}”.`,"reference.ambiguous":(e,t)=>`“${e}” could be ${t}.`,"reference.or":" or ","reference.chapters":(e,t,a)=>a===1?`${e} has ${t} chapter.`:`${e} has ${t} chapters.`,"reference.verses":(e,t,a,i)=>i===1?`${e} ${t} has ${a} verse.`:`${e} ${t} has ${a} verses.`,"menu.filtersChanged":"Filters (changed)","menu.filters":"Filters","menu.filters.votes":"Community votes","menu.filters.votes.all":"All","menu.filters.votes.atLeast":e=>`≥ ${String(e)}`,"menu.filters.note":(e,t,a,i)=>`Votes rank how helpful OpenBible.info readers found a link; they don’t prove it right or wrong. Showing ${e} of ${t} links (${a}${i}).`,"menu.filters.hiddenGenres":e=>e===1?", 1 genre hidden":`, ${String(e)} genres hidden`,"filter.allLinks":"all links","filter.noDownvoted":"links voted down are hidden","filter.atLeastVotes":(e,t)=>t===1?`≥ ${e} vote`:`≥ ${e} votes`,"menu.filters.tip":"Tip: tap a genre in the legend to hide or show it.","menu.filters.reset":"Reset filters","attribution.bsb":"Scripture text: Berean Standard Bible (BSB), dedicated to the public domain.","attribution.kjv":"Scripture text: King James Version (Authorized Version), the 1769 text, as in Quiet Bible. Public domain in the United States and most of the world; in the United Kingdom, letters patent reserve the right to print it to the Crown’s patentees — Cambridge University Press, Oxford University Press and Collins.","attribution.blivre":"Scripture text: Bíblia Livre (BLIVRE), © Diego Santos, Mario Sérgio and Marco Teles, February 2018 (Textus Receptus edition), https://sites.google.com/site/biblialivre/. Changed: whitespace was normalized; no word was altered.","attribution.luther1912":"Scripture text: Lutherbibel 1912 (LUT), the 1912 revision of Martin Luther’s German translation. Public domain. Changed: the edition’s own verse numbers were taken out of 358 verses and a corrupt token out of Judges 11:25; no word was altered.","attribution.riveduta1927":"Scripture text: Riveduta 1927 (RIV), the Italian revision made under Giovanni Luzzi. Public domain. Changed: the edition’s own verse numbers were taken out of 228 verses, a running head out of three and a stray character out of 2 Samuel 20:26; no word was altered.","attribution.vbl":"Scripture text: Versión Biblia Libre (VBL), © 2018–2020 Jonathan Gallagher y Shelly Barrios de Avila, with Gustavo Sanabria and Rebekah Põldaas, https://ebible.org/Scriptures/details.php?id=spavbl, licensed under CC BY-SA 4.0. Changed: a space before a colon was moved in one verse; no word was altered.","license.publicDomain":"Public domain","menu.translation":"Translation","menu.translation.failed":e=>`${e} could not be loaded.`,"menu.translation.error":e=>`${e} Check your connection and try again.`,"menu.language":"Language","genres.label":"Genres","genres.labelChanged":"Genres (changed)","genres.show":"Show genres","genres.hide":"Hide genres","genres.hideOne":e=>`Hide ${e}`,"genres.showOne":e=>`Show ${e}`,"testament.OT":"Old Testament","testament.NT":"New Testament","stats.label":"Summary","stats.verses":(e,t)=>[{strong:e},t===1?" verse":" verses"],"stats.links":(e,t,a)=>{let i=a===1?"link":"links";return t===null?[{strong:e},` ${i} shown`]:[{strong:e},` of ${t} ${i} shown`]},"stats.connected":e=>[{strong:e}," of verses connected"],"stats.crossTestament":(e,t)=>[{strong:e},t===1?" link between the testaments":" links between the testaments"],"hint.zoom":"to zoom","hint.pan":"to pan","hint.focus":"to focus","hint.hold":"hold to preview","panel.details":"Details","panel.expand":"Expand details","panel.collapse":"Collapse details","panel.close":"Close","panel.previousVerse":"Previous verse","panel.nextVerse":"Next verse","panel.previousChapter":"Previous chapter","panel.nextChapter":"Next chapter","panel.copy":e=>`Copy ${e} with a link`,"panel.copy.title":"Copy with a link","panel.copied":e=>`${e} copied`,"panel.omitted":e=>`Omitted in the ${e}.`,"panel.moreVerses":(e,t)=>t===1?`+ ${e} more verse`:`+ ${e} more verses`,"panel.showAll":e=>`Show all ${e}`,"note.toRange":e=>`to ${e}`,"note.fromVerse":e=>`from v. ${e}`,"note.toVerse":e=>`to v. ${e}`,"panel.connectsTo":"Connects to","panel.connectsTo.note":e=>e===1?"1 genre":`${String(e)} genres`,"panel.references":"References","panel.references.note":"where this passage points","panel.referencedBy":"Referenced by","panel.referencedBy.note":"passages that point here","panel.verses":"Verses","panel.verses.note":"tap one to focus it","panel.none":"None","panel.items":e=>e===1?"item":"items","panel.passages":e=>e===1?"passage":"passages","panel.linksCounted":e=>e===1?"link":"links","panel.versesCounted":e=>e===1?"verse":"verses","words.heading":e=>`Same ${e} word`,"words.note":"where else it is used","words.counted":e=>e===1?"word":"words","words.showMore":e=>`Show ${e} more`,"language.hebrew":"Hebrew","language.greek":"Greek","words.credit":e=>`, based on work at Tyndale House, Cambridge; reduced to dictionary forms. Words used in more than ${e} verses are left out.`,"words.creditLabel":"Words:","loading.data":(e,t)=>`Loading ${e} verses and ${t} cross-references…`,"error.datasetUnavailable":"This part of the Bible data could not be loaded. Check your connection and try again.","error.retry":"Retry","error.viewFailed":(e,t)=>`${e} could not start: ${t}`,"threads.direction":"Thread direction","threads.outgoing":"Points to","threads.incoming":"Pointed from","threads.both":"Both","threads.verse":e=>`Verse ${e}: show its connections`,"threads.omitted":e=>`Omitted in the ${e} (not in the earliest manuscripts).`,"threads.spineHover":(e,t)=>t===1?`${e} thread from here · click to read`:`${e} threads from here · click to read`,"threads.chapters":"Chapters","threads.previousChapter":"Previous chapter","threads.nextChapter":"Next chapter","threads.stage":"Threads from the verses of this chapter to where their cross-references land in the Bible, shown as a vertical bar of all 66 books.","arcs.connections":(e,t)=>t===1?`${e} connection`:`${e} connections`,"arcs.stage":"Arc diagram of cross-references. Drag or use the arrow keys to pan, scroll or +/- to zoom, click to focus a passage, Escape to clear. On a touch screen, touch and hold to preview a passage.","credits.links":"Links:","credits.fromTsk":", from the Treasury of Scripture Knowledge","credits.reindexed":", re-indexed","credits.toKjv":" to KJV verse numbering","credits.text":"Text:","credits.inspiredBy":"Inspired by","credits.inspiration":(e,t)=>`${e}, by ${t}`,"footer.source":"Source code on GitHub","footer.sourceLabel":"GitHub","install.link":"Install the app","install.linkLabel":"Install","install.title":"Install the app","install.lede":"Keep it on your home screen and read it with no connection. No app store, no account.","install.now":"Install now","install.device":"Device","install.close":"Close","install.whileOnline":"Open the app once while you are online: that is when it stores the Bible text and the cross-references on your device."}});function _n(e){return Nm[e]}var Nm,P6,Qr=rt(()=>{EM();IM();Pm();I6();Zr();V6();Nm={en:{id:"en",...zh.en,messages:Rl,books:OM,genres:DM,install:Im}},P6=Object.values(Nm)});function oC(){let e=Jr(Um);return e!==null&&ri(e)?e:null}function lC(e){return W6.add(e),()=>{W6.delete(e)}}function G6(e){if(F6!==e){F6=e;for(let t of W6)t()}}function Fm(){return(0,kh.useSyncExternalStore)(lC,()=>F6,()=>h2)}function dC(e){return U6.add(e),()=>{U6.delete(e)}}function Sh(e){if(N6!==e){N6=e;for(let t of U6)t()}}function Dl(){let e=(0,kh.useSyncExternalStore)(dC,()=>N6,()=>h2),t=(0,kh.useCallback)(a=>{_M(Um,a),G6(a),Sh(a)},[]);return[e,t]}function Wm(e){return oC()??zl(e)??h2}var kh,Um,N6,U6,F6,W6,bh=rt(()=>{kh=ct(u1(),1);Vl();yh();Ch();Zr();Qr();Um=Vh;N6=h2,U6=new Set,F6=h2,W6=new Set});function sC(e,t){return e.messages[t]??Rl[t]}function Gm(e){return t=>sC(e,t)}var jm=rt(()=>{I6()});function Zm(e){let t=Xm.get(e);if(t)return t;let a=_n(e),i={locale:a,t:Gm(a),books:a.books,genreName:r=>a.genres[r],install:a.install,n:r=>LM(r,a.tag),share:(r,n)=>VM(r,n,a.tag)};return Xm.set(e,i),i}function Gt(){let[e]=Dl();return(0,qm.useMemo)(()=>Zm(e),[e])}var qm,Xm,iR,v2=rt(()=>{qm=ct(u1(),1);wM();bh();Qr();jm();Xm=new Map;iR=Zm(h2)});function uC(e,t){let a=Gr(e,t);return{url:ra(a.url,`${t}.url`),sha256:ra(a.sha256,`${t}.sha256`),retrievedAt:ra(a.retrievedAt,`${t}.retrievedAt`),snapshotDate:pM(a.snapshotDate,`${t}.snapshotDate`)}}function gC(e,t){let a=Gr(e,t);return{level:Ji(a.level,["info","warning"],`${t}.level`),message:ra(a.message,`${t}.message`),count:ml(a.count,`${t}.count`),examples:jr(a.examples,`${t}.examples`)}}function j6(e,t,a){let i=Gr(e,"file");return{record:i,base:{format:Ji(i.format,[t],"format"),schemaVersion:Ji(i.schemaVersion,[vC],"schemaVersion"),versification:Ji(i.versification,[a],"versification"),provenance:uC(i.provenance,"provenance"),notices:fM(i.notices,"notices",gC)}}}function X6(e){let t=Gr(e,"license"),a=t.publicDomain;if(a!==void 0&&typeof a!="boolean")throw new Le("license.publicDomain",`expected a boolean, got ${typeof a}`);return{name:ra(t.name,"license.name"),url:ra(t.url,"license.url"),...a===void 0?{}:{publicDomain:a}}}function Km(e,t){let{record:a,base:i}=j6(e,"translation-text",t.versification),r=a.license,n=a.attribution;return{...i,translationId:Ji(a.translationId,[t.id],"translationId"),...r===void 0?{}:{license:X6(r)},...n===void 0?{}:{attribution:ra(n,"attribution")},verses:jr(a.verses,"verses")}}function Jm(e,t){let{record:a,base:i}=j6(e,"cross-references",t.versification),r=Gr(a.links,"links"),n=a.license,h=a.attribution;return{...i,sourceId:Ji(a.sourceId,[t.id],"sourceId"),sourceRowCount:ml(a.sourceRowCount,"sourceRowCount"),...n===void 0?{}:{license:X6(n)},...h===void 0?{}:{attribution:ra(h,"attribution")},links:{offsets:Xr(r.offsets,"links.offsets"),targetStart:Xr(r.targetStart,"links.targetStart"),targetEnd:Xr(r.targetEnd,"links.targetEnd"),votes:Xr(r.votes,"links.votes")}}}function Qm(e,t){let{record:a,base:i}=j6(e,"original-words",t.versification),r=Gr(a.words,"words");return{...i,sourceId:Ji(a.sourceId,[t.id],"sourceId"),license:X6(a.license),attribution:ra(a.attribution,"attribution"),maxVerses:ml(a.maxVerses,"maxVerses"),words:{strongs:jr(r.strongs,"words.strongs"),lemma:jr(r.lemma,"words.lemma"),transliteration:jr(r.transliteration,"words.transliteration"),gloss:jr(r.gloss,"words.gloss"),offsets:Xr(r.offsets,"words.offsets"),verses:Xr(r.verses,"words.verses")}}}var vC,Il=rt(()=>{H6();vC=1});function pC(e,t,a){let{offsets:i,targetStart:r,targetEnd:n,votes:h}=e;if(i.length!==t+1)throw new $r(`expected ${t+1} offsets, got ${i.length}.`);if(n.length!==a||h.length!==a)throw new $r("link columns have different lengths.");if(i[0]!==0||i[t]!==a)throw new $r(`offsets must span links 0 to ${a}.`);for(let c=0;c<t;c+=1)if(Vt(i,c)>Vt(i,c+1))throw new $r(`offsets decrease at verse ${c}.`);for(let c=0;c<a;c+=1){let o=Vt(r,c),l=Vt(n,c);if(o<0||l>=t||o>l)throw new $r(`link ${c} has an invalid target range.`)}}var $r,Pl,$m=rt(()=>{ia();$r=class extends Error{constructor(t){super(`Invalid cross-reference data: ${t}`),this.name="CrossReferenceIntegrityError"}},Pl=class{verseCount;linkCount;sources;targetStarts;targetEnds;votes;#e;#t;#n;constructor(t,a){let i=t.targetStart.length;pC(t,a,i),this.verseCount=a,this.linkCount=i,this.#e=Int32Array.from(t.offsets),this.targetStarts=Int32Array.from(t.targetStart),this.targetEnds=Int32Array.from(t.targetEnd),this.votes=Int32Array.from(t.votes);let r=new Int32Array(i);for(let o=0;o<a;o+=1)r.fill(o,this.#r(o),this.#h(o));this.sources=r;let n=new Int32Array(a+1);for(let o=0;o<i;o+=1)for(let l=this.#a(o);l<=this.#i(o);l+=1)n[l+1]=Vt(n,l+1)+1;for(let o=0;o<a;o+=1)n[o+1]=Vt(n,o+1)+Vt(n,o);let h=n.slice(0,a),c=new Int32Array(Vt(n,a));for(let o=0;o<i;o+=1)for(let l=this.#a(o);l<=this.#i(o);l+=1){let v=Vt(h,l);c[v]=o,h[l]=v+1}this.#t=n,this.#n=c}link(t){return{id:t,from:Vt(this.sources,t),targetStart:this.#a(t),targetEnd:this.#i(t),votes:Vt(this.votes,t)}}outgoing(t){let a=[];for(let i=this.#r(t);i<this.#h(t);i+=1)a.push(this.link(i));return a}incoming(t){let a=Vt(this.#t,t),i=Vt(this.#t,t+1);return Array.from(this.#n.subarray(a,i),r=>this.link(r))}outgoingCount(t){return this.#h(t)-this.#r(t)}incomingCount(t){return Vt(this.#t,t+1)-Vt(this.#t,t)}#r(t){return Vt(this.#e,t)}#h(t){return Vt(this.#e,t+1)}#a(t){return Vt(this.targetStarts,t)}#i(t){return Vt(this.targetEnds,t)}}});async function tz(e){let{value:t,report:a}=await wn(A3(e.id),i=>{let r=Jm(i,{id:e.id,versification:_2.id});return{manifest:e,provenance:r.provenance,notices:r.notices,sourceRowCount:r.sourceRowCount,index:new Pl(r.links,_2.verseCount)}});return{dataset:t,report:a}}var ez=rt(()=>{Wr();Il();Lr();mh();$m()});function Nl(e){let t;return{load:()=>t??=e(),reset:()=>{t=void 0}}}var az=rt(()=>{});function iz(e){return e.toLowerCase().replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[[\]]/g,"").replace(/\s+/g," ").trim()}var Ul,rz=rt(()=>{ia();Ul=class{manifest;versification;provenance;notices;#e;#t;constructor(t,a,i){if(i.verses.length!==a.verseCount)throw new Error(`Translation "${t.id}" has ${i.verses.length} verses, expected ${a.verseCount}.`);this.manifest=t,this.versification=a,this.provenance=i.provenance,this.notices=i.notices,this.#e=i.verses}get verseCount(){return this.#e.length}verseText(t){return Vt(this.#e,t)}isOmitted(t){return this.verseText(t)===""}search(t,a){let i=iz(t);if(i==="")return{totalCount:0,verses:[]};this.#t??=this.#e.map(iz);let r=[],n=0;return this.#t.forEach((h,c)=>{h.includes(i)&&(n+=1,r.length<a&&r.push(c))}),{totalCount:n,verses:r}}}});async function nz(e){let{value:t,report:a}=await wn(b0(e.id),i=>{let r=Km(i,{id:e.id,versification:_2.id});return new Ul(e,_2,r)});return{translation:t,report:a}}var hz=rt(()=>{Wr();Il();Lr();mh();rz()});var Fl,cz=rt(()=>{Fl=class{#e;#t;#n;constructor(t,a){this.#e=t;let i=t.strongs.length;if(t.offsets.length!==i+1)throw new Error("Original words: there is not one offset per word, plus the end.");let r=new Int32Array(a+1);for(let l of t.verses){if(l<0||l>=a)throw new Error(`Original words: verse ${String(l)} is outside the versification.`);r[l]=(r[l]??0)+1}let n=new Int32Array(a+1),h=0;for(let l=0;l<a;l+=1)n[l]=h,h+=r[l]??0;n[a]=h;let c=new Int32Array(h),o=Int32Array.from(n.subarray(0,a));for(let l=0;l<i;l+=1){let v=t.offsets[l]??0,g=t.offsets[l+1]??v;for(let d=v;d<g;d+=1){let u=t.verses[d]??0,p=o[u]??0;c[p]=l,o[u]=p+1}}this.#t=n,this.#n=c}get wordCount(){return this.#e.strongs.length}#r(t){let{strongs:a,lemma:i,transliteration:r,gloss:n,offsets:h}=this.#e;return{index:t,strongs:a[t]??"",lemma:i[t]??"",transliteration:r[t]??"",gloss:n[t]??"",verseCount:(h[t+1]??0)-(h[t]??0)}}wordsOf(t){let a=this.#t[t]??0,i=this.#t[t+1]??a,r=[];for(let n=a;n<i;n+=1)r.push(this.#r(this.#n[n]??0));return r.sort((n,h)=>n.verseCount-h.verseCount||n.strongs.localeCompare(h.strongs))}versesOf(t){let{offsets:a,verses:i}=this.#e,r=a[t]??0,n=a[t+1]??r,h=[];for(let c=r;c<n;c+=1){let o=i[c];o!==void 0&&h.push(o)}return h}}});async function oz(e){let{value:t,report:a}=await wn(p8(e.id),i=>{let r=Qm(i,{id:e.id,versification:_2.id});return{manifest:e,provenance:r.provenance,notices:r.notices,maxVerses:r.maxVerses,index:new Fl(r.words,_2.verseCount)}});return{dataset:t,report:a}}var lz=rt(()=>{Wr();Il();Lr();mh();cz()});function sz(e){return dz[e]}var dz,AR,vz=rt(()=>{dz={stepbible:{id:"stepbible",name:"STEPBible Translators Amalgamated Hebrew OT and Greek NT",description:"Every word of the Hebrew Old Testament and the Greek New Testament tagged with its dictionary form, from Tyndale House, Cambridge. Only the dictionary forms and the verses they occur in are used here, never the text of a verse.",license:{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},attribution:"Original-language words: STEP Bible (CC BY 4.0), based on work at Tyndale House, Cambridge. Modified: reduced to the dictionary forms used in each verse, keyed to KJV verse numbering, with psalm superscriptions left out.",homepage:"https://www.STEPBible.org",versification:"kjv"}},AR=Object.values(dz)});function Wl(e){let t=new Uint8Array(e.verseCount);for(let a=0;a<e.verseCount;a+=1)t[a]=I2(e.bookAt(a).id).ordinal;return t}var q6=rt(()=>{Ve()});var fC,uz,gz=rt(()=>{fC={openbible:{id:"openbible",name:"OpenBible.info Cross References",description:"About 345,000 cross-references, drawn mostly from the public-domain Treasury of Scripture Knowledge and ranked by community votes.",license:{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},attribution:"Cross-reference data: OpenBible.info (CC BY 4.0), largely from the public-domain Treasury of Scripture Knowledge. Modified: re-indexed to KJV verse numbering.",homepage:"https://www.openbible.info/labs/cross-references/",versification:"kjv",enabledByDefault:!0}},uz=Object.values(fC)});function pz(){let e=uz.find(({enabledByDefault:t})=>t);if(!e)throw new Error("No cross-reference source is enabled by default.");return e}var fz=rt(()=>{Lr();gz()});function Ah(e){let t=Gl.get(e);if(t)return t;let a=Nl(async()=>{let{translation:i}=await nz(xh(e));return i});return Gl.set(e,a),a}function Mz(e){Gl.delete(e)}function mz(){Gl.clear()}function xz(){return zz}function Hz(){Z6.reset()}var _h,Gl,Z6,zz,Th=rt(()=>{Wr();ez();az();hz();Bn();lz();vz();q6();fz();_h=Nl(async()=>{let{dataset:e}=await tz(pz());return{versification:_2,crossReferences:e,verseGenres:Wl(_2)}}),Gl=new Map;Z6=Nl(async()=>{let{dataset:e}=await oz(sz("stepbible"));return zz=e,e}),zz=null});var Ft,ni=rt(()=>{Ft={search:"t",searchIcon:"he",input:"b",select:"x",button:"e",error:"ke",segmented:"a",optionLabel:"ze",menu:"ye",menuValue:"we",menuButton:"h",menuChevron:"H",choice:"Y",choiceAbbreviation:"je",indicator:"L",popover:"Ye",field:"Se",menuError:"Ie",hint:"Me",shortLabel:"N",longLabel:"Pe",menuLabel:"Re",group:"S",groupLabel:"Ce",languageRow:"O"}});function Oh(e,t){if(typeof document>"u")return t;let a=document.documentElement.style.getPropertyValue(e).trim();return/^#[0-9a-f]{6}$/i.test(a)?a:t}function Y6(e){let t=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(e);if(!t)throw new Error(`Invalid hex color: ${e}`);let[,a="0",i="0",r="0"]=t;return[parseInt(a,16)/255,parseInt(i,16)/255,parseInt(r,16)/255]}var ql,hi,Zl,Xe,ci=rt(()=>{Ve();ql=Oh("--color-background","#0d0d0d"),hi={law:"#eb568f",history:"#cd4805",poetry:"#b48f05","major-prophets":"#cd489d","minor-prophets":"#88a00d",gospels:"#17a7b4",acts:"#119245","pauline-epistles":"#0593e6","general-epistles":"#03ac8f",revelation:"#a06aec"};Zl=$1.map(e=>Y6(hi[e.id])),Xe=$1.map(e=>hi[e.id])});function K6(e,t){let a=performance.now(),i=requestAnimationFrame(function r(n){let h=Math.min((n-a)/e,1);t(1-(1-h)**3),h<1&&(i=requestAnimationFrame(r))});return()=>{cancelAnimationFrame(i)}}var e0,Eh=rt(()=>{e0=class{#e;#t=null;constructor(t){this.#e=t}request(){this.#t??=requestAnimationFrame(()=>{this.#t=null,this.#e()})}dispose(){this.#t!==null&&(cancelAnimationFrame(this.#t),this.#t=null)}}});function Az(e){return`${e.book}.${e.chapter}.${e.verse}`}function Tz(e){let t=yC.exec(e);if(!t)return;let[,a="",i="",r=""]=t;if(fl(a))return{book:a,chapter:Number(i),verse:Number(r)}}var yC,Oz=rt(()=>{wa();yC=/^([1-3]?[A-Za-z]+)\.(\d+)\.(\d+)$/});function av(e,t){return t[e].name}function On(e,t){let a=t[e];return a.referenceName??a.name}function i0(e,t){return`${On(e.book,t)} ${String(e.chapter)}:${String(e.verse)}`}function BC(e,t,a){return e.book!==t.book?`${i0(e,a)} – ${i0(t,a)}`:e.chapter!==t.chapter?`${i0(e,a)}–${String(t.chapter)}:${String(t.verse)}`:e.verse!==t.verse?`${i0(e,a)}–${String(t.verse)}`:i0(e,a)}function Ih(e,t,a,i=a){return BC(e.refAt(a),e.refAt(i),t)}var Ph=rt(()=>{});function he(e){return{kind:"verse",verse:e}}function $i(e,t){let{book:a,chapter:i}=t.refAt(e);return{kind:"chapter",book:a,chapter:i}}function oi(e,t){if(e.kind==="verse")return{start:e.verse,end:e.verse};let a=t.chapterRange(e.book,e.chapter);if(!a)throw new RangeError(`No such chapter: ${e.book} ${e.chapter}`);return a}function li(e,t,a){if(e.kind==="verse"){let i=t.refAt(e.verse);return`${On(i.book,a)} ${String(i.chapter)}:${String(i.verse)}`}return`${On(e.book,a)} ${String(e.chapter)}`}function En(e,t){return e.kind==="verse"?Az(t.refAt(e.verse)):`${e.book}.${e.chapter}`}function Ez(e,t){let a=Tz(e);if(a){let c=t.indexOf(a);return c===void 0?void 0:he(c)}let i=CC.exec(e),[,r="",n=""]=i??[];if(!i||!fl(r))return;let h=Number(n);return t.verseCountOf(r,h)===void 0?void 0:{kind:"chapter",book:r,chapter:h}}function Rz(e,t){let{book:a,chapter:i,verse:r}=e;if(r===void 0)return{kind:"chapter",book:a,chapter:i};let n=t.indexOf({book:a,chapter:i,verse:r});if(n===void 0)throw new RangeError(`No such verse: ${a} ${i}:${r}`);return he(n)}var CC,na=rt(()=>{wa();Oz();Ph();CC=/^([1-3]?[A-Za-z]+)\.(\d+)$/});function kC(e){return{minVotes:e,hiddenGenres:new Set}}function Dz(e,t){return e.minVotes===t.minVotes&&e.hiddenGenres.size===0}function Iz(e){return e===-1/0?{kind:"all"}:e===0?{kind:"no-downvoted"}:{kind:"at-least",votes:e}}function iv(e,t){let a=new Uint8Array($1.length);for(let r of $1)a[r.ordinal]=e.hiddenGenres.has(r.id)?1:0;let{minVotes:i}=e;return(r,n,h)=>h>=i&&Vt(a,Vt(t,r))===0&&Vt(a,Vt(t,n))===0}function $l(e,t,a){let i=iv(a,t),r=new Int32Array(e.linkCount),n=0;for(let h=0;h<e.linkCount;h+=1)i(Vt(e.sources,h),Vt(e.targetStarts,h),Vt(e.votes,h))&&(r[n]=h,n+=1);return r.slice(0,n)}var Ql,Ba,r0=rt(()=>{Ve();ia();Ql=[-1/0,0,1,2,3,4,5,10,20,50,100];Ba=kC(4)});var n0,Pz=rt(()=>{n0={detail:"Le",text:"Ne",wide:"Oe"}});function Rn({translation:e,inspiration:t}){let{t:a}=Gt();return(0,P2.jsxs)(P2.Fragment,{children:[(0,P2.jsxs)("span",{className:n0.detail,children:[a("credits.links")," "]}),(0,P2.jsx)("a",{href:"https://www.openbible.info/labs/cross-references/",target:"_blank",rel:"noreferrer",children:"OpenBible.info"})," ","(",(0,P2.jsx)("a",{href:"https://creativecommons.org/licenses/by/4.0/",target:"_blank",rel:"noreferrer",children:"CC BY 4.0"}),(0,P2.jsx)("span",{className:n0.wide,children:a("credits.fromTsk")}),(0,P2.jsxs)("span",{className:n0.detail,children:[a("credits.reindexed"),(0,P2.jsx)("span",{className:n0.wide,children:a("credits.toKjv")})]}),")",(0,P2.jsxs)("span",{className:n0.text,"data-optional":e.license.publicDomain===!0,children:[" ","· ",a("credits.text")," ",(0,P2.jsx)("a",{href:e.homepage,target:"_blank",rel:"noreferrer",children:e.abbreviation})," ","(",(0,P2.jsx)("a",{href:e.license.url,target:"_blank",rel:"noreferrer",children:e.license.publicDomain===!0?a("license.publicDomain"):e.license.name}),")"]}),t&&(0,P2.jsxs)("span",{className:n0.wide,children:[" ","· ",a("credits.inspiredBy")," ",(0,P2.jsx)("a",{href:t.url,target:"_blank",rel:"noreferrer",title:a("credits.inspiration")(t.title,t.author),children:t.author})]})]})}var P2,t5=rt(()=>{v2();Pz();P2=ct(Tt(),1)});function bC(e){e.style.translate="";let{left:t,right:a}=e.getBoundingClientRect(),i=document.documentElement.clientWidth-rv,r=t<rv?rv-t:Math.min(i-a,0);e.style.translate=r===0?"":`${r}px 0`}function Dn({label:e,icon:t,value:a,indicator:i=!1,changedLabel:r,busy:n=!1,children:h}){let[c,o]=(0,qe.useState)(!1),l=a===void 0?e:`${e}: ${a}`,v=(0,qe.useRef)(null),g=(0,qe.useRef)(null),d=(0,qe.useRef)(null),u=(0,qe.useId)();return(0,qe.useEffect)(()=>{if(!c)return;let p=f=>{var s;f.target instanceof Node&&!((s=v.current)!=null&&s.contains(f.target))&&o(!1)},x=f=>{var s;f.key==="Escape"&&(o(!1),(s=g.current)==null||s.focus())};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",x),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",x)}},[c]),(0,qe.useLayoutEffect)(()=>{let p=d.current;if(!c||!p)return;let x=()=>{bC(p)};return x(),window.addEventListener("resize",x),()=>{window.removeEventListener("resize",x)}},[c]),(0,we.jsxs)("div",{ref:v,className:Ft.menu,children:[(0,we.jsxs)("button",{ref:g,type:"button",className:`${Ft.button} ${Ft.menuButton}`,"aria-label":i&&r!==void 0?r:l,"aria-expanded":c,"aria-controls":u,"aria-busy":n||void 0,onClick:()=>{o(p=>!p)},children:[t&&(0,we.jsx)(t,{}),a===void 0?(0,we.jsx)("span",{className:Ft.menuLabel,children:e}):(0,we.jsxs)(we.Fragment,{children:[(0,we.jsx)("span",{className:Ft.menuValue,children:a}),(0,we.jsx)(Qi,{className:Ft.menuChevron})]}),i&&(0,we.jsx)("span",{className:Ft.indicator})]}),c&&(0,we.jsx)("div",{ref:d,id:u,className:Ft.popover,children:h})]})}var qe,we,rv,e5=rt(()=>{qe=ct(u1(),1);L2();ni();we=ct(Tt(),1),rv=12});var Nh,Wz=rt(()=>{Nh={footer:"s",owner:"Ue",source:"A",sourceLabel:"B",credits:"D",copyright:"qe"}});function Gz({children:e,className:t}){return(0,Uh.jsxs)("footer",{className:t?`${Nh.footer} ${t}`:Nh.footer,children:[(0,Uh.jsx)("span",{className:Nh.owner,children:"Bible Cross-References by Oleksii Trekhleb (MIT)"}),e!==void 0&&(0,Uh.jsx)("span",{className:Nh.credits,children:e})]})}var Uh,jz=rt(()=>{Wz();Uh=ct(Tt(),1)});function qz(e){return Xz*(1-1/(e*.55/Xz+1))}function PC(e){let{transform:t}=getComputedStyle(e);return t==="none"?0:new DOMMatrixReadOnly(t).m42}function NC(e,t){for(let a=e instanceof Element?e:null;a&&a!==t;a=a.parentElement)if(a instanceof HTMLElement&&a.scrollHeight>a.clientHeight+1){let{overflowY:i}=getComputedStyle(a);if(i==="auto"||i==="scroll")return a}return null}function UC(e){let t=e.at(-1),a=e.find(i=>t&&t.time-i.time<=RC);return a&&t&&t.time>a.time?(t.y-a.y)/(t.time-a.time):0}function Zz(e,t){let[a,i]=(0,ce.useState)(!1),[r,n]=(0,ce.useState)(e);e!==r&&(n(e),e||i(!1));let h=(0,ce.useRef)(null),c=(0,ce.useRef)(null),o=(0,ce.useRef)(null),l=(0,ce.useRef)(null),v=(0,ce.useEffectEvent)(()=>a),g=(0,ce.useEffectEvent)(()=>t!==void 0),d=(0,ce.useEffectEvent)(()=>{t==null||t()});return(0,ce.useEffect)(()=>{let u=h.current,p=c.current,x=o.current,f=l.current;if(!e||!u||!p||!x||!f)return;let s=null,M=0,L,m=(O,R)=>{p.style.transform=`translateY(${String(O)}px)`,f.style.opacity=String(Math.min(Math.max(1-O/R,0),1))},w=()=>{delete u.dataset.sheetDragging,p.style.transform="",f.style.opacity=""},y=O=>{(0,hv.flushSync)(()=>{i(O)}),w()},C=()=>{u.dataset.sheetClosing="",w();let O=()=>{clearTimeout(L),p.removeEventListener("transitionend",R),(0,hv.flushSync)(d),p.isConnected&&delete u.dataset.sheetClosing},R=b=>{b.target===p&&b.propertyName==="transform"&&O()};if(parseFloat(getComputedStyle(p).transitionDuration)===0){O();return}p.addEventListener("transitionend",R),L=setTimeout(O,IC)},H=O=>{if((s==null?void 0:s.mode)==="sheet")return;s=null;let R=O.touches.item(0),b=x.offsetHeight>0;!R||O.touches.length>1||!b||"sheetClosing"in u.dataset||(s={startX:R.clientX,startY:R.clientY,from:0,lowest:p.offsetHeight-x.offsetHeight,scroller:NC(O.target,p),mode:"pending",offset:0,samples:[{y:R.clientY,time:O.timeStamp}]})},B=O=>{let R=O.touches.item(0);if(!s||!R||O.touches.length>1)return;if(s.mode==="pending"){let I=R.clientX-s.startX,q=R.clientY-s.startY;if(Math.hypot(I,q)<TC)return;if(!(Math.abs(q)>=Math.abs(I)&&(!s.scroller||(q<0?!v():s.scroller.scrollTop<=0)))){s.mode="content";return}s.mode="sheet",s.from=PC(p),u.dataset.sheetDragging=""}if(s.mode!=="sheet")return;O.preventDefault();let b=s.from+R.clientY-s.startY;b<0?s.offset=-qz(-b):b>s.lowest&&!g()?s.offset=s.lowest+qz(b-s.lowest):s.offset=b,m(s.offset,s.lowest),s.samples.push({y:R.clientY,time:O.timeStamp}),s.samples.length>32&&s.samples.splice(0,16)},S=O=>{let R=s;if(!R||O.touches.length>0||(s=null,R.mode!=="sheet"))return;M=performance.now()+DC;let b=O.type==="touchend"?UC(R.samples):0,I=R.offset+b*OC,q=R.from>=R.lowest-1;if(g()&&q&&I>R.lowest+x.offsetHeight*EC){C();return}y(I<R.lowest/2)},E=O=>{performance.now()<M&&(O.stopPropagation(),O.preventDefault())};return p.addEventListener("touchstart",H,{passive:!0}),p.addEventListener("touchmove",B,{passive:!1}),p.addEventListener("touchend",S),p.addEventListener("touchcancel",S),p.addEventListener("click",E,!0),()=>{clearTimeout(L),p.removeEventListener("touchstart",H),p.removeEventListener("touchmove",B),p.removeEventListener("touchend",S),p.removeEventListener("touchcancel",S),p.removeEventListener("click",E,!0),delete u.dataset.sheetClosing,w()}},[e]),{expanded:a,setExpanded:i,containerRef:h,sheetRef:c,spaceRef:o,scrimRef:l}}var ce,hv,TC,OC,EC,Xz,RC,DC,IC,Yz=rt(()=>{ce=ct(u1(),1),hv=ct(Z3(),1),TC=4,OC=180,EC=.3,Xz=36,RC=100,DC=400,IC=700});var Ze,Kz=rt(()=>{Ze={page:"Ae",header:"E",masthead:"m",controls:"J",body:"r",stage:"K",panel:"o",sheetHandle:"v",sheetSpace:"Q",sheetScrim:"l",footer:"Be"}});function In({masthead:e,controls:t,panel:a,onPanelClose:i,credits:r,children:n}){let{t:h}=Gt(),c=a!=null&&a!==!1,{expanded:o,setExpanded:l,containerRef:v,sheetRef:g,spaceRef:d,scrimRef:u}=Zz(c,i);return(0,N2.jsxs)("div",{className:Ze.page,children:[(0,N2.jsxs)("header",{className:Ze.header,children:[(0,N2.jsx)("div",{className:Ze.masthead,children:e}),(0,N2.jsx)("div",{className:Ze.controls,children:t})]}),(0,N2.jsxs)("div",{ref:v,className:Ze.body,"data-sheet":c?o?"expanded":"collapsed":void 0,children:[(0,N2.jsx)("main",{className:Ze.stage,children:n}),c&&(0,N2.jsxs)(N2.Fragment,{children:[(0,N2.jsx)("div",{ref:d,className:Ze.sheetSpace,"aria-hidden":"true"}),(0,N2.jsx)("div",{ref:u,className:Ze.sheetScrim,"aria-hidden":"true",onClick:()=>{l(!1)}}),(0,N2.jsxs)("aside",{ref:g,className:Ze.panel,"aria-label":h("panel.details"),children:[(0,N2.jsx)("button",{type:"button",className:Ze.sheetHandle,"aria-label":h(o?"panel.collapse":"panel.expand"),"aria-expanded":o,onClick:()=>{l(!o)}}),a]})]})]}),(0,N2.jsx)(Gz,{className:Ze.footer,children:r})]})}var N2,a5=rt(()=>{jz();v2();Yz();Kz();N2=ct(Tt(),1)});function h5({filter:e,defaults:t,onChange:a,shownLinks:i,totalLinks:r}){let{t:n,n:h}=Gt(),c=Dz(e,t),o=Iz(e.minVotes),l=o.kind==="all"?n("filter.allLinks"):o.kind==="no-downvoted"?n("filter.noDownvoted"):n("filter.atLeastVotes")(h(o.votes),o.votes),v=g=>g===-1/0?n("menu.filters.votes.all"):n("menu.filters.votes.atLeast")(g);return(0,Ca.jsxs)(Dn,{label:n("menu.filters"),changedLabel:n("menu.filtersChanged"),icon:Am,indicator:!c,children:[(0,Ca.jsxs)("label",{className:Ft.field,children:[n("menu.filters.votes"),(0,Ca.jsx)("select",{className:Ft.select,value:String(e.minVotes),onChange:g=>{a({...e,minVotes:Number(g.target.value)})},children:Ql.map(g=>(0,Ca.jsx)("option",{value:String(g),children:v(g)},g))})]}),(0,Ca.jsx)("p",{className:Ft.hint,children:n("menu.filters.note")(h(i),h(r),l,e.hiddenGenres.size>0?n("menu.filters.hiddenGenres")(e.hiddenGenres.size):"")}),(0,Ca.jsx)("p",{className:Ft.hint,children:n("menu.filters.tip")}),(0,Ca.jsxs)("button",{type:"button",className:Ft.button,disabled:c,onClick:()=>{a(t)},children:[(0,Ca.jsx)(wm,{}),n("menu.filters.reset")]})]})}var Ca,dv=rt(()=>{v2();L2();r0();ni();e5();Ca=ct(Tt(),1)});var di,sv=rt(()=>{di={legend:"k",toggle:"Z",columns:"_",testament:"Je",heading:"Ke",item:"z",key:"ee"}});function c5({hiddenGenres:e,onToggle:t}){let{t:a,genreName:i}=Gt();return(0,o0.jsx)("div",{className:di.columns,children:XC.map(r=>(0,o0.jsxs)("div",{className:di.testament,children:[(0,o0.jsx)("p",{className:di.heading,children:a(`testament.${r}`)}),$1.filter(n=>n.testament===r).map(n=>(0,o0.jsxs)("button",{type:"button",className:di.item,"aria-pressed":!e.has(n.id),title:e.has(n.id)?a("genres.showOne")(i(n.id)):a("genres.hideOne")(i(n.id)),onClick:()=>{t(n.id)},children:[(0,o0.jsx)("span",{className:di.key,style:{background:hi[n.id]}}),i(n.id)]},n.id))]},r))})}function o5(e,t){let a=new Set(e);return a.delete(t)||a.add(t),a}var o0,XC,Gh=rt(()=>{Ve();v2();ci();sv();o0=ct(Tt(),1),XC=["OT","NT"]});function vx(e){let{t}=Gt(),[a,i]=(0,sx.useState)(!1);return(0,l0.jsxs)("section",{className:di.legend,"data-open":a,"aria-label":t("genres.label"),children:[(0,l0.jsx)("button",{type:"button",className:di.toggle,"aria-label":t(a?"genres.hide":"genres.show"),"aria-expanded":a,onClick:()=>{i(r=>!r)},children:a?(0,l0.jsx)(Sl,{}):(0,l0.jsx)(bn,{})}),(0,l0.jsx)(c5,{...e})]})}var sx,l0,ux=rt(()=>{sx=ct(u1(),1);v2();L2();sv();Gh();l0=ct(Tt(),1)});var d0,gx=rt(()=>{d0={stats:"I",hint:"M",touchHint:"re",pointerHint:"ae",secondary:"Qe"}});function l5({parts:e}){return(0,V2.jsx)(V2.Fragment,{children:e.map((t,a)=>(0,V2.jsx)(px.Fragment,{children:typeof t=="string"?t:(0,V2.jsx)("strong",{children:t.strong})},a))})}function fx({summary:e,hint:t}){let{t:a,n:i,share:r}=Gt(),{verseCount:n,shownLinks:h,totalLinks:c,connectedVerses:o,crossTestamentLinks:l}=e;return(0,V2.jsxs)("div",{className:d0.stats,"aria-label":a("stats.label"),children:[(0,V2.jsxs)("span",{children:[(0,V2.jsx)(l5,{parts:a("stats.verses")(i(n),n)})," ·"," ",(0,V2.jsx)(l5,{parts:a("stats.links")(i(h),h<c?i(c):null,h)})]}),(0,V2.jsxs)("span",{className:d0.secondary,children:[(0,V2.jsx)(l5,{parts:a("stats.connected")(r(o,n))})," ·"," ",(0,V2.jsx)(l5,{parts:a("stats.crossTestament")(i(l),l)})]}),t!==void 0&&(0,V2.jsxs)(V2.Fragment,{children:[(0,V2.jsx)("span",{className:`${d0.hint} ${d0.pointerHint}`,children:t.pointer}),(0,V2.jsx)("span",{className:`${d0.hint} ${d0.touchHint}`,children:t.touch})]})]})}var px,V2,Mx=rt(()=>{px=ct(u1(),1);v2();gx();V2=ct(Tt(),1)});function s0(e,t){return e.verseText(t)||`Omitted in the ${e.manifest.abbreviation} (not in the earliest manuscripts).`}var vv=rt(()=>{});function mx(e,t){return e.otherStart-t.otherStart||e.otherEnd-t.otherEnd||e.here-t.here}function v0(e,t,a,i){let r=iv(a,i),n=[],h=[],c=new Set;for(let o=t.start;o<=t.end;o+=1){for(let l of e.outgoing(o))r(l.from,l.targetStart,l.votes)&&n.push({link:l,direction:"outgoing",here:o,otherStart:l.targetStart,otherEnd:l.targetEnd});for(let l of e.incoming(o))c.has(l.id)||(c.add(l.id),r(l.from,l.targetStart,l.votes)&&h.push({link:l,direction:"incoming",here:o,otherStart:l.from,otherEnd:l.from}))}return{outgoing:n.sort(mx),incoming:h.sort(mx)}}function zx(e,t,a){let{link:i,direction:r}=e;if(r==="incoming"&&i.targetEnd!==i.targetStart)return{kind:"range",start:i.targetStart,end:i.targetEnd};if(!a)return null;let n=t.refAt(e.here).verse;return r==="outgoing"?{kind:"from-verse",verse:n}:{kind:"to-verse",verse:n}}function xx(e,t){let a=[];for(let i of e){let r=t.bookAt(i.otherStart).id,n=a.at(-1);(n==null?void 0:n.book)===r?n.connections.push(i):a.push({book:r,connections:[i]})}return a}function uv(e){let t=new Set;for(let a of[...e.outgoing,...e.incoming])t.add(a.link.id);return[...t]}var d5=rt(()=>{r0()});function YC(e){return e.replace(/\d/g,t=>ZC.charAt(Number(t)))}function s5(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function gv({translation:e,versification:t,names:a,start:i,end:r,url:n}){let h=t.refAt(i),c=[];for(let d=i;d<=r;d+=1){let u=e.verseText(d);if(u==="")continue;let p=t.refAt(d),x=i===r?null:p.book===h.book&&p.chapter===h.chapter?String(p.verse):`${String(p.chapter)}:${String(p.verse)}`;c.push({mark:x,text:u})}let o=Ih(t,a,i,r),{abbreviation:l}=e.manifest,v=c.map(({mark:d,text:u})=>(d?YC(d):"")+u).join(" "),g=c.map(({mark:d,text:u})=>(d?`<sup>${d}</sup>`:"")+s5(u)).join(" ");return{text:`${v}
— ${o} (${l}) ${n}`,html:`<blockquote><p>${g}</p></blockquote><p>— <a href="${s5(n)}">${s5(o)}</a> (${s5(l)})</p>`}}function Hx(){return typeof window<"u"&&window.isSecureContext&&"clipboard"in navigator}async function Lx(e){if(typeof ClipboardItem<"u")try{await navigator.clipboard.write([new ClipboardItem({"text/plain":new Blob([e.text],{type:"text/plain"}),"text/html":new Blob([e.html],{type:"text/html"})})]);return}catch{}await navigator.clipboard.writeText(e.text)}var ZC,Vx=rt(()=>{Ph();ZC="⁰¹²³⁴⁵⁶⁷⁸⁹"});var wt,v5=rt(()=>{wt={panel:"Te",header:"Ve",heading:"We",eyebrow:"Xe",title:"Ze",iconButton:"g",scroll:"oe",actions:"_e",verseText:"ie",muted:"er",sectionTitle:"ne",sectionIcon:"rr",key:"ar",strip:"te",chevron:"c",visuallyHidden:"or",breakdown:"ir",bar:"nr",count:"P",group:"tr",groupHeader:"se",item:"R",quotable:"y",itemRef:"w",copy:"i",snippet:"sr",verseMark:"lr",moreVerses:"cr",more:"dr",verseRow:"C",verseNumber:"pr",word:"n",wordSound:"mr",wordVerse:"le",credit:"vr",section:"gr",sectionHeader:"ur",sectionToggle:"u",sectionName:"fr",sectionNote:"ce",sectionBody:"de"}});function Pn({id:e,icon:t,title:a,description:i,count:r,countLabel:n,trailing:h,defaultOpen:c=!0,children:o}){let{t:l,n:v}=Gt(),[g,d]=TM(`panel:${e}`,c),u=(0,wx.useId)();return(0,Ye.jsxs)("section",{className:wt.section,children:[(0,Ye.jsx)("h3",{className:wt.sectionHeader,children:(0,Ye.jsxs)("button",{type:"button",className:wt.sectionToggle,"aria-expanded":g,"aria-controls":u,onClick:()=>{d(!g)},children:[(0,Ye.jsx)(t,{className:wt.sectionIcon}),(0,Ye.jsx)("span",{className:wt.sectionName,children:a}),(0,Ye.jsx)("span",{className:wt.sectionNote,children:i}),h,r!==void 0&&(0,Ye.jsxs)("span",{className:wt.count,children:[v(r),(0,Ye.jsxs)("span",{className:wt.visuallyHidden,children:[" ",(n??l("panel.items"))(r)]})]}),(0,Ye.jsx)(Qi,{className:wt.chevron})]})}),(0,Ye.jsx)("div",{id:u,className:wt.sectionBody,hidden:!g,children:o})]})}var wx,Ye,pv=rt(()=>{wx=ct(u1(),1);v2();Ch();L2();v5();Ye=ct(Tt(),1)});function JC(){let[e,t]=(0,Nn.useState)(xz);return(0,Nn.useEffect)(()=>{if(e)return;let a=!0;return Z6.load().then(i=>{a&&t(i)},()=>{Hz()}),()=>{a=!1}},[e]),e}function yx({verse:e,data:t,onSelect:a}){let{t:i,books:r,n}=Gt(),h=JC(),[c,o]=(0,Nn.useState)(!1),[l,v]=(0,Nn.useState)(null),{versification:g,translation:d}=t;if(!h)return null;let u=h.index.wordsOf(e);if(u.length===0)return null;let p=g.bookAt(e).testament==="OT",x=i(p?"language.hebrew":"language.greek"),f=c?u:u.slice(0,fv);return(0,t2.jsxs)(t2.Fragment,{children:[(0,t2.jsxs)(Pn,{id:"same-word",icon:_m,title:i("words.heading")(x),description:i("words.note"),count:u.length,countLabel:i("words.counted"),children:[f.map(s=>{let M=l===s.index;return(0,t2.jsxs)("div",{className:wt.group,children:[(0,t2.jsxs)("button",{type:"button",className:`${wt.item} ${wt.word}`,"aria-expanded":M,onClick:()=>{v(M?null:s.index)},children:[(0,t2.jsxs)("span",{className:wt.itemRef,children:[(0,t2.jsx)("strong",{lang:p?"he":"el",children:s.lemma}),(0,t2.jsx)("span",{className:wt.wordSound,children:s.transliteration}),(0,t2.jsx)("span",{className:wt.count,children:n(s.verseCount)}),(0,t2.jsx)(Qi,{className:wt.chevron})]}),(0,t2.jsx)("span",{className:wt.snippet,children:s.gloss})]}),M&&h.index.versesOf(s.index).map(L=>(0,t2.jsxs)("button",{type:"button",className:`${wt.item} ${wt.wordVerse}`,"aria-current":L===e?"true":void 0,onClick:()=>{a(he(L))},children:[(0,t2.jsx)("span",{className:wt.itemRef,children:(0,t2.jsx)("strong",{children:li(he(L),g,r)})}),(0,t2.jsx)("span",{className:wt.snippet,children:s0(d,L)})]},L))]},s.strongs)}),!c&&u.length>fv&&(0,t2.jsx)("button",{type:"button",className:wt.more,onClick:()=>{o(!0)},children:i("words.showMore")(n(u.length-fv))})]}),(0,t2.jsxs)("p",{className:wt.credit,children:[i("words.creditLabel")," ",(0,t2.jsx)("a",{href:h.manifest.homepage,target:"_blank",rel:"noreferrer",children:"STEP Bible"})," ","(",(0,t2.jsx)("a",{href:h.manifest.license.url,target:"_blank",rel:"noreferrer",children:h.manifest.license.name}),")",i("words.credit")(n(h.maxVerses))]})]})}var Nn,t2,fv,Bx=rt(()=>{Nn=ct(u1(),1);na();L2();vv();Th();v2();pv();v5();t2=ct(Tt(),1),fv=6});function Sx({reference:e,quote:t}){let{t:a}=Gt(),[i,r]=(0,si.useState)(!1);return(0,si.useEffect)(()=>{if(!i)return;let n=setTimeout(()=>{r(!1)},$C);return()=>{clearTimeout(n)}},[i]),Hx()?(0,zt.jsxs)(zt.Fragment,{children:[(0,zt.jsx)("button",{type:"button",className:wt.copy,"data-copied":i,"aria-label":a("panel.copy")(e),title:a("panel.copy.title"),onClick:()=>{Lx(t()).then(()=>{r(!0)},()=>{})},children:i?(0,zt.jsx)(Cm,{}):(0,zt.jsx)(Bm,{})}),(0,zt.jsx)("span",{className:wt.visuallyHidden,role:"status",children:i?a("panel.copied")(e):""})]}):null}function Cx(e,t,a){let i=oi(e,a),r=t<0?i.start-1:i.end+1;return a.isValidIndex(r)?e.kind==="verse"?he(r):$i(r,a):null}function ek({translation:e,versification:t,start:a,end:i}){let{t:r,books:n,n:h}=Gt(),c=e.manifest.language,o=e.manifest.direction;if(a===i)return(0,zt.jsx)("span",{className:wt.snippet,lang:c,dir:o,children:s0(e,a)});let l=t.refAt(a),v=Math.min(i,a+tk-1),g=Array.from({length:v-a+1},(u,p)=>a+p),d=i-v;return(0,zt.jsxs)("span",{className:wt.snippet,lang:c,dir:o,children:[g.map(u=>{let p=t.refAt(u),x=p.book!==l.book?i0(p,n):p.chapter!==l.chapter?`${String(p.chapter)}:${String(p.verse)}`:String(p.verse);return(0,zt.jsxs)(si.Fragment,{children:[(0,zt.jsx)("sup",{className:wt.verseMark,children:x}),s0(e,u)," "]},u)}),d>0&&(0,zt.jsx)("span",{className:wt.moreVerses,children:r("panel.moreVerses")(h(d),d)})]})}function u5({data:e,passage:t,filter:a,actions:i,onSelect:r,onClose:n,onPreview:h,shareUrl:c}){let{t:o,books:l,genreName:v}=Gt(),{versification:g,translation:d,crossReferences:u,verseGenres:p}=e,x=(0,si.useMemo)(()=>v0(u.index,oi(t,g),a,p),[u.index,t,g,a,p]),f=oi(t,g),s=g.bookAt(f.start),M=I2(s.id),L=Cx(t,-1,g),m=Cx(t,1,g),w=t.kind==="verse";return(0,zt.jsxs)("div",{className:wt.panel,children:[(0,zt.jsxs)("header",{className:wt.header,children:[(0,zt.jsxs)("div",{className:wt.heading,children:[(0,zt.jsxs)("p",{className:wt.eyebrow,children:[(0,zt.jsx)("span",{className:wt.key,style:{background:hi[M.id]}}),v(M.id)," ·"," ",s.testament==="OT"?o("testament.OT"):o("testament.NT")]}),(0,zt.jsx)("h2",{className:wt.title,children:li(t,g,l)})]}),(0,zt.jsx)("button",{type:"button",className:wt.iconButton,disabled:!L,"aria-label":o(w?"panel.previousVerse":"panel.previousChapter"),onClick:()=>{L&&r(L)},children:(0,zt.jsx)(Cl,{})}),(0,zt.jsx)("button",{type:"button",className:wt.iconButton,disabled:!m,"aria-label":o(w?"panel.nextVerse":"panel.nextChapter"),onClick:()=>{m&&r(m)},children:(0,zt.jsx)(kl,{})}),(0,zt.jsx)("button",{type:"button",className:wt.iconButton,"aria-label":o("panel.close"),onClick:n,children:(0,zt.jsx)(Sl,{})})]}),(0,zt.jsxs)("div",{className:wt.scroll,children:[t.kind==="verse"?(0,zt.jsxs)(zt.Fragment,{children:[(0,zt.jsxs)("div",{className:wt.quotable,children:[(0,zt.jsx)("p",{className:wt.verseText,lang:d.manifest.language,dir:d.manifest.direction,children:s0(d,t.verse)}),(0,zt.jsx)(Sx,{reference:li(t,g,l),quote:()=>gv({translation:d,versification:g,names:l,start:t.verse,end:t.verse,url:c(t)})})]}),i&&(0,zt.jsx)("div",{className:wt.actions,children:i})]}):(0,zt.jsxs)(zt.Fragment,{children:[i&&(0,zt.jsx)("div",{className:wt.actions,children:i}),(0,zt.jsx)(ak,{start:f.start,end:f.end,translation:d,connections:[...x.outgoing,...x.incoming],onSelect:r})]}),(0,zt.jsx)(rk,{connections:[...x.outgoing,...x.incoming],verseGenres:p}),(0,zt.jsx)(kx,{id:"references",icon:Ol,title:o("panel.references"),description:o("panel.references.note"),countLabel:o("panel.passages"),connections:x.outgoing,showSourceVerse:t.kind==="chapter",data:e,onSelect:r,onPreview:h,shareUrl:c}),(0,zt.jsx)(kx,{id:"referenced-by",icon:El,title:o("panel.referencedBy"),description:o("panel.referencedBy.note"),countLabel:o("panel.passages"),connections:x.incoming,showSourceVerse:t.kind==="chapter",data:e,onSelect:r,onPreview:h,shareUrl:c}),t.kind==="verse"&&(0,zt.jsx)(yx,{verse:t.verse,data:e,onSelect:r})]},En(t,g))]})}function ak({start:e,end:t,translation:a,connections:i,onSelect:r}){let{t:n,n:h}=Gt(),c=new Map;for(let l of i)c.set(l.here,(c.get(l.here)??0)+1);let o=Array.from({length:t-e+1},(l,v)=>e+v);return(0,zt.jsx)(Pn,{id:"verses",icon:Bl,title:n("panel.verses"),description:n("panel.verses.note"),count:o.length,countLabel:n("panel.versesCounted"),children:o.map((l,v)=>(0,zt.jsxs)("button",{type:"button",className:wt.verseRow,onClick:()=>{r(he(l))},children:[(0,zt.jsx)("span",{className:wt.verseNumber,children:v+1}),(0,zt.jsx)("span",{className:wt.snippet,children:s0(a,l)}),(0,zt.jsx)("span",{className:wt.count,children:h(c.get(l)??0)})]},l))})}function ik(e,t,{t:a,books:i,n:r}){switch(e.kind){case"range":return a("note.toRange")(Ih(t,i,e.start,e.end));case"from-verse":return a("note.fromVerse")(r(e.verse));case"to-verse":return a("note.toVerse")(r(e.verse))}}function rk({connections:e,verseGenres:t}){let{t:a,n:i,genreName:r}=Gt();if(e.length===0)return null;let n=new Array($1.length).fill(0);for(let o of e){let l=Vt(t,o.otherStart);n[l]=(n[l]??0)+1}let h=Math.max(...n),c=$1.filter(o=>(n[o.ordinal]??0)>0);return(0,zt.jsx)(Pn,{id:"connects-to",icon:bn,title:a("panel.connectsTo"),description:a("panel.connectsTo.note")(c.length),count:e.length,countLabel:a("panel.linksCounted"),defaultOpen:!1,trailing:(0,zt.jsx)("span",{className:wt.strip,"aria-hidden":"true",children:c.map(o=>(0,zt.jsx)("span",{style:{flexGrow:n[o.ordinal]??0,background:Vt(Xe,o.ordinal)}},o.id))}),children:(0,zt.jsx)("div",{className:wt.breakdown,children:c.map(o=>{let l=n[o.ordinal]??0;return(0,zt.jsxs)("div",{style:{display:"contents"},children:[(0,zt.jsx)("span",{children:r(o.id)}),(0,zt.jsx)("span",{className:wt.bar,style:{inlineSize:`${Math.max(l/h*100,2)}%`,background:Vt(Xe,o.ordinal)}}),(0,zt.jsx)("span",{className:wt.count,children:i(l)})]},o.id)})})})}function kx({id:e,icon:t,title:a,description:i,countLabel:r,connections:n,showSourceVerse:h,data:c,onSelect:o,onPreview:l,shareUrl:v}){let g=Gt(),{t:d,books:u,n:p}=g,[x,f]=(0,si.useState)(QC),{versification:s,translation:M}=c,L=n.slice(0,x);return(0,zt.jsxs)(Pn,{id:e,icon:t,title:a,description:i,count:n.length,countLabel:r,children:[n.length===0&&(0,zt.jsx)("p",{className:wt.muted,children:d("panel.none")}),xx(L,s).map(m=>{var w;return(0,zt.jsxs)("div",{className:wt.group,children:[(0,zt.jsxs)("p",{className:wt.groupHeader,children:[(0,zt.jsx)("span",{className:wt.key,style:{background:hi[I2(m.book).id]}}),u[m.book].name,(0,zt.jsx)("span",{className:wt.count,children:p(m.connections.length)})]}),m.connections.map(y=>{let C=zx(y,s,h),H=Ih(s,u,y.otherStart,y.otherEnd);return(0,zt.jsxs)("div",{className:wt.quotable,onPointerEnter:B=>{B.pointerType==="mouse"&&(l==null||l(y))},onPointerLeave:()=>{l==null||l(null)},children:[(0,zt.jsxs)("button",{type:"button",className:wt.item,onClick:()=>{o(he(y.otherStart))},onFocus:()=>{l==null||l(y)},onBlur:()=>{l==null||l(null)},children:[(0,zt.jsxs)("span",{className:wt.itemRef,children:[(0,zt.jsx)("strong",{children:H}),C!==null&&(0,zt.jsx)("span",{className:wt.muted,children:ik(C,s,g)})]}),(0,zt.jsx)(ek,{translation:M,versification:s,start:y.otherStart,end:y.otherEnd})]}),(0,zt.jsx)(Sx,{reference:H,quote:()=>gv({translation:M,versification:s,names:u,start:y.otherStart,end:y.otherEnd,url:v(he(y.otherStart))})})]},`${String(y.link.id)}-${y.direction}`)})]},`${m.book}-${String((w=m.connections[0])==null?void 0:w.otherStart)}`)}),n.length>x&&(0,zt.jsxs)("button",{type:"button",className:wt.more,onClick:()=>{f(n.length)},children:[d("panel.showAll")(p(n.length)),(0,zt.jsx)(Qi,{})]})]})}var si,zt,QC,$C,tk,Mv=rt(()=>{si=ct(u1(),1);Ve();na();Ph();ia();L2();vv();d5();Vx();ci();Bx();pv();v2();v5();zt=ct(Tt(),1),QC=40,$C=1600;tk=12});function mv(e){return e.normalize("NFC").trim().toLowerCase().replace(/^(i{1,3})\s+/,(t,a)=>String(a.length)).replace(/[\s.\-'’‘ʼº°ª]+/gu,"")}function g5(e){let t=mv(e);for(let[a,i]of nk)t=t.replace(a,i);return t.normalize("NFD").replace(new RegExp("\\p{M}+","gu"),"")}function bx(e,t){let a=t[e.id];return[a.name,a.referenceName??a.name]}function hk(e){let t=new Map,a=new Map,i=new Set,r=new Set;for(let n of W1){let h=[n.id,...bx(n,e),e[n.id].abbreviation??n.id,...e[n.id].aliases];for(let c of h){let o=mv(c),l=t.get(o);if(l&&l!==n){r.add(`${o}: ${l.id} and ${n.id}`);continue}t.set(o,n);let v=g5(c),g=a.get(v);g&&g!==n&&i.add(v),a.set(v,n)}}for(let n of i)a.delete(n);return{exact:t,folded:a,contested:[...i].toSorted(),byName:W1.map(n=>({book:n,names:bx(n,e).map(g5)})),collisions:[...r]}}function ck(e){let t=_x.get(e);if(t)return t;let a=hk(e);return _x.set(e,a),a}function Ax(e,t){let a=mv(e);if(a==="")return{kind:"unknown"};let i=ck(t),r=i.exact.get(a)??i.folded.get(g5(e));if(r)return{kind:"found",book:r};let n=g5(e),h=i.byName.filter(({names:o})=>o.some(l=>l.startsWith(n))).map(({book:o})=>o),[c]=h;return h.length===1&&c?{kind:"found",book:c}:h.length===0?{kind:"unknown"}:{kind:"ambiguous",candidates:h}}var nk,_x,Tx=rt(()=>{wa();nk=[[/ı/g,"i"],[/ß/g,"ss"],[/ø/g,"o"],[/ł/g,"l"],[/đ/g,"d"],[/æ/g,"ae"],[/œ/g,"oe"]];_x=new WeakMap});function jh(e){return{ok:!1,error:e}}function Ox(e,t,a){let i=ok.exec(e.trim());if(!(i!=null&&i.groups))return jh({kind:"unreadable"});let{book:r="",chapter:n="",verse:h}=i.groups,c=Ax(r,a);switch(c.kind){case"unknown":return jh({kind:"unknown-book",query:r.trim()});case"ambiguous":return jh({kind:"ambiguous-book",query:r.trim(),candidates:c.candidates.map(d=>d.id)});case"found":break}let{book:o}=c,l=Number(n),v=t.verseCountOf(o.id,l);if(v===void 0)return jh({kind:"no-such-chapter",book:o.id,chapters:t.chapterCountOf(o.id)});if(h===void 0)return{ok:!0,reference:{book:o.id,chapter:l,verse:void 0}};let g=Number(h);return g<1||g>v?jh({kind:"no-such-verse",book:o.id,chapter:l,verses:v}):{ok:!0,reference:{book:o.id,chapter:l,verse:g}}}var ok,Ex=rt(()=>{Tx();ok=/^(?<book>(?:[1-3][º°ª]?[\s.-]*)?[\p{L}\p{M}][\p{L}\p{M}\s.'’‘ʼ-]*?)\s*(?<chapter>\d+)(?:\s*[:.,\s]\s*(?<verse>\d+))?$/iu});function Rx(e,{t,books:a,n:i}){switch(e.kind){case"unreadable":return t("reference.unreadable");case"unknown-book":return t("reference.unknownBook")(e.query);case"ambiguous-book":{let r=e.candidates.map(c=>av(c,a)),n=r.at(-1)??"",h=r.length<=1?n:`${r.slice(0,-1).join(", ")}${t("reference.or")}${n}`;return t("reference.ambiguous")(e.query,h)}case"no-such-chapter":return t("reference.chapters")(av(e.book,a),i(e.chapters),e.chapters);case"no-such-verse":return t("reference.verses")(On(e.book,a),i(e.chapter),i(e.verses),e.verses)}}var Dx=rt(()=>{Ph()});function f5({versification:e,onSelect:t}){let a=Gt(),{t:i,books:r}=a,[n,h]=(0,p5.useState)(null),c=(0,p5.useId)(),o=l=>{l.preventDefault();let v=l.currentTarget,g=new FormData(v).get("reference"),d=Ox(typeof g=="string"?g:"",e,r);if(!d.ok){h(Rx(d.error,a));return}h(null),v.reset(),document.activeElement instanceof HTMLElement&&document.activeElement.blur(),t(Rz(d.reference,e))};return(0,Un.jsxs)("form",{role:"search",className:Ft.search,onSubmit:o,children:[(0,Un.jsx)(Vm,{className:Ft.searchIcon}),(0,Un.jsx)("input",{name:"reference",type:"search",className:Ft.input,placeholder:i("search.placeholder"),"aria-label":i("search.label"),"aria-invalid":n!==null,"aria-describedby":n===null?void 0:c,autoComplete:"off",maxLength:120,enterKeyHint:"go",onChange:()=>{h(null)}}),n!==null&&(0,Un.jsx)("p",{id:c,role:"alert",className:Ft.error,children:n})]})}var p5,Un,zv=rt(()=>{p5=ct(u1(),1);na();Ex();Dx();v2();L2();ni();Un=ct(Tt(),1)});function Px(e,t,a){let i=new Uint8Array(e.verseCount),r=0,n=0,h=c=>{i[c]===0&&(i[c]=1,r+=1)};for(let c=0;c<t.length;c+=1){let o=Vt(t,c),l=Vt(e.sources,o),v=Vt(e.targetStarts,o);h(l);for(let u=v;u<=Vt(e.targetEnds,o);u+=1)h(u);let g=Ix[Vt(a,l)],d=Ix[Vt(a,v)];g!==d&&(n+=1)}return{verseCount:e.verseCount,shownLinks:t.length,totalLinks:e.linkCount,connectedVerses:r,crossTestamentLinks:n}}var Ix,Nx=rt(()=>{Ve();ia();Ix=$1.map(e=>e.testament==="NT")});function m5(e){let[t,a]=(0,M5.useState)({width:0,height:0});return(0,M5.useEffect)(()=>{let i=e.current;if(!i)return;let r=new ResizeObserver(([n])=>{if(n){let{width:h,height:c}=n.contentRect;a(o=>o.width===h&&o.height===c?o:{width:h,height:c})}});return r.observe(i),()=>{r.disconnect()}},[e]),t}var M5,xv=rt(()=>{M5=ct(u1(),1)});function z5(e){return Math.min(1,.2+.8*Math.log10(1+Math.max(e,0))/2)}var Hv=rt(()=>{});function x5(e,t,a){let i=t.length,r=new Float32Array(i*2),n=new Float32Array(i*2),h=new Float32Array(i);for(let c=0;c<i;c+=1){let o=Vt(t,c),l=Vt(e.sources,o),v=Vt(e.targetStarts,o),g=Vt(e.targetEnds,o);r[c*2]=l+.5,r[c*2+1]=(v+g+1)/2,n[c*2]=Vt(a,l),n[c*2+1]=Vt(a,v),h[c]=z5(Vt(e.votes,o))}return{count:i,endpoints:r,genres:n,weights:h}}var Ux=rt(()=>{ia();Hv()});function lk(e,t,a){let n=t===1?e*16:t===2?e*400:e;return Math.exp(-n*(a?.01:.002))}function Vv(e,t){return Math.hypot(e.x-t.x,e.y-t.y)}function Lv(e){let[t,a]=[...e.values()];if(!t||!a)throw new Error("A pinch needs two pointers.");return{spread:Math.max(Vv(t,a),1),center:{x:(t.x+a.x)/2,y:(t.y+a.y)/2}}}function Fx(e,t){let a=new Map,i=null,r=null,n=null,h=s=>{let M=e.getBoundingClientRect();return{x:s.clientX-M.left,y:s.clientY-M.top}},c=(s,M)=>{var L;s.previewing=!0,(L=t.onHover)==null||L.call(t,M,"touch")},o=s=>{var M;clearTimeout(s.hold),s.hold=void 0,s.previewing&&(s.previewing=!1,(M=t.onLeave)==null||M.call(t))},l=s=>{var L;if(s.pointerType==="mouse"&&s.button!==0)return;e.setPointerCapture(s.pointerId);let M=h(s);if(a.set(s.pointerId,M),a.size===1){let m={start:M,time:performance.now(),touch:s.pointerType!=="mouse",moved:!1,previewing:!1,hold:void 0};if(i=m,!m.touch)return;(L=t.previewsAt)!=null&&L.call(t,M)?c(m,M):m.hold=setTimeout(()=>{m.hold=void 0;let[w]=a.values();i===m&&!m.moved&&a.size===1&&w&&c(m,w)},350)}else i&&(i.moved=!0,o(i)),r=Lv(a)},v=s=>{var m,w,y,C,H;let M=h(s),L=a.get(s.pointerId);if(!L){s.pointerType==="mouse"&&((m=t.onHover)==null||m.call(t,M,"mouse"));return}if(a.set(s.pointerId,M),a.size>=2){let B=Lv(a);r&&((w=t.onZoom)==null||w.call(t,B.spread/r.spread,B.center),(y=t.onPan)==null||y.call(t,B.center.x-r.center.x,B.center.y-r.center.y)),r=B;return}i&&(!i.moved&&Vv(M,i.start)>6&&(i.moved=!0,i.previewing||o(i)),i.previewing?(C=t.onHover)==null||C.call(t,M,"touch"):i.moved&&((H=t.onPan)==null||H.call(t,M.x-L.x,M.y-L.y)))},g=(s,M)=>{var H,B;let L=a.get(s.pointerId)??h(s);if(a.delete(s.pointerId),a.size>=2){r=Lv(a);return}if(r=null,a.size===1)return;let m=i;if(i=null,!m)return;o(m);let w=m.touch?350:450;if(!(M&&!m.moved&&performance.now()-m.time<w))return;let C=performance.now();n&&C-n.time<320&&Vv(L,n.point)<24?(n=null,(H=t.onDoubleTap)==null||H.call(t,L)):(n={point:L,time:C},(B=t.onTap)==null||B.call(t,L))},d=s=>{g(s,!0)},u=s=>{g(s,!1)},p=s=>{var M;s.pointerType==="mouse"&&a.size===0&&((M=t.onLeave)==null||M.call(t))},x=s=>{i!=null&&i.touch&&s.preventDefault()},f=s=>{var M,L;if(s.preventDefault(),!s.ctrlKey&&Math.abs(s.deltaX)>Math.abs(s.deltaY)){(M=t.onPan)==null||M.call(t,-s.deltaX,0);return}(L=t.onZoom)==null||L.call(t,lk(s.deltaY,s.deltaMode,s.ctrlKey),h(s))};return e.addEventListener("pointerdown",l),e.addEventListener("pointermove",v),e.addEventListener("pointerup",d),e.addEventListener("pointercancel",u),e.addEventListener("pointerleave",p),e.addEventListener("contextmenu",x),e.addEventListener("wheel",f,{passive:!1}),()=>{i&&clearTimeout(i.hold),e.removeEventListener("pointerdown",l),e.removeEventListener("pointermove",v),e.removeEventListener("pointerup",d),e.removeEventListener("pointercancel",u),e.removeEventListener("pointerleave",p),e.removeEventListener("contextmenu",x),e.removeEventListener("wheel",f)}}var Wx=rt(()=>{});function wv(e,t){if(t>e*1.15)return{orientation:"vertical",width:e,height:t,axisStart:48,axisEnd:t-16,baseline:64,maxArcHeight:Math.max(e-64-16,0)};let a=t-58;return{orientation:"horizontal",width:e,height:t,axisStart:32,axisEnd:e-32,baseline:a,maxArcHeight:Math.max(a-16,0)}}function Xh(e,t){return(e.axisEnd-e.axisStart)/(t.end-t.start)}function Gx(e,t,a){return e.axisStart+(a-t.start)*Xh(e,t)}function H5(e,t,a){return t.start+(a-e.axisStart)/Xh(e,t)}function qh(e,t){return e.orientation==="horizontal"?t.x:t.y}var yv=rt(()=>{});function dk(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function sk(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function rc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function ZH(){let e=rc("canvas");return e.style.display="block",e}function Vu(...e){let t="THREE."+e.shift();i4?i4("log",t,...e):console.log(t,...e)}function YH(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let a=e[1];a&&a.isStackTrace?e[0]+=" "+a.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function It(...e){e=YH(e);let t="THREE."+e.shift();if(i4)i4("warn",t,...e);else{let a=e[0];a&&a.isStackTrace?console.warn(a.getError(t)):console.warn(t,...e)}}function Nt(...e){e=YH(e);let t="THREE."+e.shift();if(i4)i4("error",t,...e);else{let a=e[0];a&&a.isStackTrace?console.error(a.getError(t)):console.error(t,...e)}}function m0(...e){let t=e.join(" ");t in jx||(jx[t]=!0,It(...e))}function KH(e,t,a){return new Promise(function(i,r){function n(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(n,a);break;default:i()}}setTimeout(n,a)})}function kc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,a=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(U2[e&255]+U2[e>>8&255]+U2[e>>16&255]+U2[e>>24&255]+"-"+U2[t&255]+U2[t>>8&255]+"-"+U2[t>>16&15|64]+U2[t>>24&255]+"-"+U2[a&63|128]+U2[a>>8&255]+"-"+U2[a>>16&255]+U2[a>>24&255]+U2[i&255]+U2[i>>8&255]+U2[i>>16&255]+U2[i>>24&255]).toLowerCase()}function o1(e,t,a){return Math.max(t,Math.min(a,e))}function vk(e,t){return(e%t+t)%t}function Cv(e,t,a){return(1-a)*e+a*t}function Zh(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function oe(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function uk(){let e={enabled:!0,workingColorSpace:ec,spaces:{},convert:function(r,n,h){return this.enabled===!1||n===h||!n||!h||(this.spaces[n].transfer===x1&&(r.r=Mi(r.r),r.g=Mi(r.g),r.b=Mi(r.b)),this.spaces[n].primaries!==this.spaces[h].primaries&&(r.applyMatrix3(this.spaces[n].toXYZ),r.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===x1&&(r.r=e4(r.r),r.g=e4(r.g),r.b=e4(r.b))),r},workingToColorSpace:function(r,n){return this.convert(r,this.workingColorSpace,n)},colorSpaceToWorking:function(r,n){return this.convert(r,n,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===zi?ac:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,n=this.workingColorSpace){return r.fromArray(this.spaces[n].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,n,h){return r.copy(this.spaces[n].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,n){return m0("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(r,n)},toWorkingColorSpace:function(r,n){return m0("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(r,n)}},t=[.64,.33,.3,.6,.15,.06],a=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[ec]:{primaries:t,whitePoint:i,transfer:ac,toXYZ:qx,fromXYZ:Zx,luminanceCoefficients:a,workingColorSpaceConfig:{unpackColorSpace:Ce},outputColorSpaceConfig:{drawingBufferColorSpace:Ce}},[Ce]:{primaries:t,whitePoint:i,transfer:x1,toXYZ:qx,fromXYZ:Zx,luminanceCoefficients:a,outputColorSpaceConfig:{drawingBufferColorSpace:Ce}}}),e}function Mi(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function e4(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}function bv(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?ad.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}function Tv(e,t,a){return a<0&&(a+=1),a>1&&(a-=1),a<1/6?e+(t-e)*6*a:a<1/2?t:a<2/3?e+(t-e)*6*(2/3-a):e}function Uv(e,t,a,i,r){for(let n=0,h=e.length-3;n<=h;n+=3){g0.fromArray(e,n);let c=r.x*Math.abs(g0.x)+r.y*Math.abs(g0.y)+r.z*Math.abs(g0.z),o=t.dot(g0),l=a.dot(g0),v=i.dot(g0);if(Math.max(-Math.max(o,l,v),Math.min(o,l,v))>c)return!1}return!0}function Sk(e,t,a,i,r,n,h,c){let o;if(t.side===J2?o=i.intersectTriangle(h,n,r,!0,c):o=i.intersectTriangle(r,n,h,t.side===fr,c),o===null)return null;R5.copy(c),R5.applyMatrix4(e.matrixWorld);let l=a.ray.origin.distanceTo(R5);return l<a.near||l>a.far?null:{distance:l,point:R5.clone(),object:e}}function D5(e,t,a,i,r,n,h,c,o,l){e.getVertexPosition(c,A5),e.getVertexPosition(o,T5),e.getVertexPosition(l,O5);let v=Sk(e,t,a,i,A5,T5,O5,nH);if(v){let g=new U;hr.getBarycoord(nH,A5,T5,O5,g),r&&(v.uv=hr.getInterpolatedAttribute(r,c,o,l,g,new h1)),n&&(v.uv1=hr.getInterpolatedAttribute(n,c,o,l,g,new h1)),h&&(v.normal=hr.getInterpolatedAttribute(h,c,o,l,g,new U),v.normal.dot(i.direction)>0&&v.normal.multiplyScalar(-1));let d={a:c,b:o,c:l,normal:new U,materialIndex:0};hr.getNormal(A5,T5,O5,d.normal),v.face=d,v.barycoord=g}return v}function N5(e,t,a,i,r,n,h){let c=e.geometry.attributes.position;if(cd.fromBufferAttribute(c,r),od.fromBufferAttribute(c,n),a.distanceSqToSegment(cd,od,qv,cH)>i)return;qv.applyMatrix4(e.matrixWorld);let l=t.ray.origin.distanceTo(qv);if(!(l<t.near||l>t.far))return{distance:l,point:cH.clone().applyMatrix4(e.matrixWorld),index:h,face:null,faceIndex:null,barycoord:null,object:e}}function w0(e){let t={};for(let a in e){t[a]={};for(let i in e[a]){let r=e[a][i];if(dH(r))r.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[a][i]=null):t[a][i]=r.clone();else if(Array.isArray(r))if(dH(r[0])){let n=[];for(let h=0,c=r.length;h<c;h++)n[h]=r[h].clone();t[a][i]=n}else t[a][i]=r.slice();else t[a][i]=r}}return t}function j2(e){let t={};for(let a=0;a<e.length;a++){let i=w0(e[a]);for(let r in i)t[r]=i[r]}return t}function dH(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function _k(e){let t=[];for(let a=0;a<e.length;a++)t.push(e[a].clone());return t}function wu(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:n1.workingColorSpace}function Qn(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function Zv(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function tL(e,t,a,i,r){let n=1-e;return n*n*n*t+3*n*n*e*a+3*n*e*e*i+e*e*e*r}function Ok(e,t,a,i,r){let n=1-e;return 3*n*n*(a-t)+6*n*e*(i-a)+3*e*e*(r-i)}function Ek(e,t,a,i,r){let n=(e-t)/(r-t);for(let h=0;h<8;h++){let c=tL(n,t,a,i,r)-e;if(Math.abs(c)<1e-10)break;let o=Ok(n,t,a,i,r);if(Math.abs(o)<1e-10)break;n=Math.max(0,Math.min(1,n-c/o))}return n}function sH(e,t){for(let a=0,i=e.length;a!==i;a+=2)e[a]*=t}function Cu(e,t,a,i){let r=Gk(i);switch(a){case zu:return e*t;case Hu:return e*t/r.components*r.byteLength;case Ad:return e*t/r.components*r.byteLength;case xr:return e*t*2/r.components*r.byteLength;case Td:return e*t*2/r.components*r.byteLength;case xu:return e*t*3/r.components*r.byteLength;case Qe:return e*t*4/r.components*r.byteLength;case Od:return e*t*4/r.components*r.byteLength;case Lc:case Vc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case wc:case yc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Rd:case Id:return Math.max(e,16)*Math.max(t,8)/4;case Ed:case Dd:return Math.max(e,8)*Math.max(t,8)/2;case Pd:case Nd:case Fd:case Wd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ud:case Bc:case Gd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case qd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Zd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Yd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Kd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Jd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Qd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case $d:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case t3:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case e3:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case a3:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case i3:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case r3:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case n3:case h3:case c3:return Math.ceil(e/4)*Math.ceil(t/4)*16;case o3:case l3:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Cc:case d3:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${a} format.`)}function Gk(e){switch(e){case Q2:case pu:return{byteLength:1,components:1};case l4:case fu:case _e:return{byteLength:2,components:1};case bd:case _d:return{byteLength:2,components:4};case va:case Sd:case ua:return{byteLength:4,components:1};case Mu:case mu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}var gH,eu,pH,mc,fH,o4,fr,J2,Ta,Oa,Ea,zc,au,iu,MH,H0,mH,zH,xH,HH,LH,VH,wH,yH,ru,nu,BH,CH,kH,SH,bH,_H,AH,TH,OH,j5,X5,q5,a4,Z5,Y5,K5,J5,hu,EH,RH,sa,cu,ou,lu,du,su,vu,uu,gu,Mr,L0,Bd,Cd,xc,Q5,Sa,$5,y2,DH,Hc,T2,kd,mr,Q2,pu,fu,l4,Sd,va,ua,_e,bd,_d,d4,Mu,mu,zu,xu,Qe,ba,zr,Hu,Ad,xr,Td,Od,Lc,Vc,wc,yc,Ed,Rd,Dd,Id,Pd,Nd,Ud,Fd,Wd,Bc,Gd,jd,Xd,qd,Zd,Yd,Kd,Jd,Qd,$d,t3,e3,a3,i3,r3,n3,h3,c3,o3,l3,Cc,d3,tc,td,W5,Yv,Kv,Jv,Qv,IH,Lu,PH,zi,Ce,ec,ac,x1,G5,NH,UH,FH,WH,s3,GH,jH,v3,XH,qH,V0,da,ic,jx,i4,JH,_a,U2,Bv,ed,ku,h1,Aa,Su,U,kv,Xx,bu,Wt,Sv,qx,Zx,n1,Fn,ad,gk,r4,pk,_v,se,_u,q1,id,W2,nc,rd,yd,e2,Wn,ha,fk,Mk,er,L5,ye,Yx,Kx,cr,hc,mk,Jx,Gn,vi,V5,Yh,zk,xk,Qx,$x,tH,eH,Hk,jn,Av,ke,M0,Lk,n4,QH,ar,w5,$t,F2,or,ca,ui,Ov,gi,Xn,qn,aH,Ev,Rv,Dv,Iv,Pv,Nv,hr,lr,pi,oa,y5,Zn,Yn,Kn,ir,rr,u0,Kh,B5,C5,g0,u2,k5,Vk,A2,cc,oc,de,wk,Jh,Fv,z0,yk,Ke,Wv,Jn,Be,Qh,w2,Je,Gv,Bk,Ck,la,kk,dr,fi,jv,S5,b5,lc,dc,iH,p0,_5,rH,A5,T5,O5,Xv,E5,nH,R5,G2,nd,sc,f0,bk,I5,vc,hd,cd,od,hH,$h,P5,qv,cH,ld,oH,lH,h4,uc,sr,dd,gc,c4,x0,$H,Ak,Tk,Se,vr,sd,vd,ur,ud,gd,pd,fd,be,gr,Md,md,zd,pc,pr,xd,Hd,eL,Ld,U5,F5,ka,fc,nr,vH,uH,le,mi,Mc,$n,t4,Vd,wd,yu,Rk,Bu,Dk,Ik,Pk,Nk,Uk,Fk,Wk,$v,N1,KP,Au,tu,Tu=rt(()=>{gH=0,eu=1,pH=2,mc=1,fH=2,o4=3,fr=0,J2=1,Ta=2,Oa=0,Ea=1,zc=2,au=3,iu=4,MH=5,H0=100,mH=101,zH=102,xH=103,HH=104,LH=200,VH=201,wH=202,yH=203,ru=204,nu=205,BH=206,CH=207,kH=208,SH=209,bH=210,_H=211,AH=212,TH=213,OH=214,j5=0,X5=1,q5=2,a4=3,Z5=4,Y5=5,K5=6,J5=7,hu=0,EH=1,RH=2,sa=0,cu=1,ou=2,lu=3,du=4,su=5,vu=6,uu=7,gu=300,Mr=301,L0=302,Bd=303,Cd=304,xc=306,Q5=1e3,Sa=1001,$5=1002,y2=1003,DH=1004,Hc=1005,T2=1006,kd=1007,mr=1008,Q2=1009,pu=1010,fu=1011,l4=1012,Sd=1013,va=1014,ua=1015,_e=1016,bd=1017,_d=1018,d4=1020,Mu=35902,mu=35899,zu=1021,xu=1022,Qe=1023,ba=1026,zr=1027,Hu=1028,Ad=1029,xr=1030,Td=1031,Od=1033,Lc=33776,Vc=33777,wc=33778,yc=33779,Ed=35840,Rd=35841,Dd=35842,Id=35843,Pd=36196,Nd=37492,Ud=37496,Fd=37488,Wd=37489,Bc=37490,Gd=37491,jd=37808,Xd=37809,qd=37810,Zd=37811,Yd=37812,Kd=37813,Jd=37814,Qd=37815,$d=37816,t3=37817,e3=37818,a3=37819,i3=37820,r3=37821,n3=36492,h3=36494,c3=36495,o3=36283,l3=36284,Cc=36285,d3=36286,tc=2300,td=2301,W5=2302,Yv=2303,Kv=2400,Jv=2401,Qv=2402,IH=3200,Lu=0,PH=1,zi="",Ce="srgb",ec="srgb-linear",ac="linear",x1="srgb",G5=7680,NH=519,UH=512,FH=513,WH=514,s3=515,GH=516,jH=517,v3=518,XH=519,qH=35044,V0="300 es",da=2e3,ic=2001;jx={},i4=null;JH={[j5]:X5,[q5]:K5,[Z5]:J5,[a4]:Y5,[X5]:j5,[K5]:q5,[J5]:Z5,[Y5]:a4},_a=class{addEventListener(t,a){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(a)===-1&&i[t].push(a)}hasEventListener(t,a){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(a)!==-1}removeEventListener(t,a){let i=this._listeners;if(i===void 0)return;let r=i[t];if(r!==void 0){let n=r.indexOf(a);n!==-1&&r.splice(n,1)}}dispatchEvent(t){let a=this._listeners;if(a===void 0)return;let i=a[t.type];if(i!==void 0){t.target=this;let r=i.slice(0);for(let n=0,h=r.length;n<h;n++)r[n].call(this,t);t.target=null}}},U2=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bv=Math.PI/180,ed=180/Math.PI;ku=class ku{constructor(t=0,a=0){this.x=t,this.y=a}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,a){return this.x=t,this.y=a,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,a){switch(t){case 0:this.x=a;break;case 1:this.y=a;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,a){return this.x=t.x+a.x,this.y=t.y+a.y,this}addScaledVector(t,a){return this.x+=t.x*a,this.y+=t.y*a,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,a){return this.x=t.x-a.x,this.y=t.y-a.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let a=this.x,i=this.y,r=t.elements;return this.x=r[0]*a+r[3]*i+r[6],this.y=r[1]*a+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,a){return this.x=o1(this.x,t.x,a.x),this.y=o1(this.y,t.y,a.y),this}clampScalar(t,a){return this.x=o1(this.x,t,a),this.y=o1(this.y,t,a),this}clampLength(t,a){let i=this.length();return this.divideScalar(i||1).multiplyScalar(o1(i,t,a))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let a=Math.sqrt(this.lengthSq()*t.lengthSq());if(a===0)return Math.PI/2;let i=this.dot(t)/a;return Math.acos(o1(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let a=this.x-t.x,i=this.y-t.y;return a*a+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,a){return this.x+=(t.x-this.x)*a,this.y+=(t.y-this.y)*a,this}lerpVectors(t,a,i){return this.x=t.x+(a.x-t.x)*i,this.y=t.y+(a.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,a=0){return this.x=t[a],this.y=t[a+1],this}toArray(t=[],a=0){return t[a]=this.x,t[a+1]=this.y,t}fromBufferAttribute(t,a){return this.x=t.getX(a),this.y=t.getY(a),this}rotateAround(t,a){let i=Math.cos(a),r=Math.sin(a),n=this.x-t.x,h=this.y-t.y;return this.x=n*i-h*r+t.x,this.y=n*r+h*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ku.prototype.isVector2=!0;h1=ku,Aa=class{constructor(t=0,a=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=a,this._z=i,this._w=r}static slerpFlat(t,a,i,r,n,h,c){let o=i[r+0],l=i[r+1],v=i[r+2],g=i[r+3],d=n[h+0],u=n[h+1],p=n[h+2],x=n[h+3];if(g!==x||o!==d||l!==u||v!==p){let f=o*d+l*u+v*p+g*x;f<0&&(d=-d,u=-u,p=-p,x=-x,f=-f);let s=1-c;if(f<.9995){let M=Math.acos(f),L=Math.sin(M);s=Math.sin(s*M)/L,c=Math.sin(c*M)/L,o=o*s+d*c,l=l*s+u*c,v=v*s+p*c,g=g*s+x*c}else{o=o*s+d*c,l=l*s+u*c,v=v*s+p*c,g=g*s+x*c;let M=1/Math.sqrt(o*o+l*l+v*v+g*g);o*=M,l*=M,v*=M,g*=M}}t[a]=o,t[a+1]=l,t[a+2]=v,t[a+3]=g}static multiplyQuaternionsFlat(t,a,i,r,n,h){let c=i[r],o=i[r+1],l=i[r+2],v=i[r+3],g=n[h],d=n[h+1],u=n[h+2],p=n[h+3];return t[a]=c*p+v*g+o*u-l*d,t[a+1]=o*p+v*d+l*g-c*u,t[a+2]=l*p+v*u+c*d-o*g,t[a+3]=v*p-c*g-o*d-l*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,a,i,r){return this._x=t,this._y=a,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,a=!0){let i=t._x,r=t._y,n=t._z,h=t._order,c=Math.cos,o=Math.sin,l=c(i/2),v=c(r/2),g=c(n/2),d=o(i/2),u=o(r/2),p=o(n/2);switch(h){case"XYZ":this._x=d*v*g+l*u*p,this._y=l*u*g-d*v*p,this._z=l*v*p+d*u*g,this._w=l*v*g-d*u*p;break;case"YXZ":this._x=d*v*g+l*u*p,this._y=l*u*g-d*v*p,this._z=l*v*p-d*u*g,this._w=l*v*g+d*u*p;break;case"ZXY":this._x=d*v*g-l*u*p,this._y=l*u*g+d*v*p,this._z=l*v*p+d*u*g,this._w=l*v*g-d*u*p;break;case"ZYX":this._x=d*v*g-l*u*p,this._y=l*u*g+d*v*p,this._z=l*v*p-d*u*g,this._w=l*v*g+d*u*p;break;case"YZX":this._x=d*v*g+l*u*p,this._y=l*u*g+d*v*p,this._z=l*v*p-d*u*g,this._w=l*v*g-d*u*p;break;case"XZY":this._x=d*v*g-l*u*p,this._y=l*u*g-d*v*p,this._z=l*v*p+d*u*g,this._w=l*v*g+d*u*p;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return a===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,a){let i=a/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let a=t.elements,i=a[0],r=a[4],n=a[8],h=a[1],c=a[5],o=a[9],l=a[2],v=a[6],g=a[10],d=i+c+g;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(v-o)*u,this._y=(n-l)*u,this._z=(h-r)*u}else if(i>c&&i>g){let u=2*Math.sqrt(1+i-c-g);this._w=(v-o)/u,this._x=.25*u,this._y=(r+h)/u,this._z=(n+l)/u}else if(c>g){let u=2*Math.sqrt(1+c-i-g);this._w=(n-l)/u,this._x=(r+h)/u,this._y=.25*u,this._z=(o+v)/u}else{let u=2*Math.sqrt(1+g-i-c);this._w=(h-r)/u,this._x=(n+l)/u,this._y=(o+v)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,a){let i=t.dot(a)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*a.z-t.z*a.y,this._y=t.z*a.x-t.x*a.z,this._z=t.x*a.y-t.y*a.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(o1(this.dot(t),-1,1)))}rotateTowards(t,a){let i=this.angleTo(t);if(i===0)return this;let r=Math.min(1,a/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,a){let i=t._x,r=t._y,n=t._z,h=t._w,c=a._x,o=a._y,l=a._z,v=a._w;return this._x=i*v+h*c+r*l-n*o,this._y=r*v+h*o+n*c-i*l,this._z=n*v+h*l+i*o-r*c,this._w=h*v-i*c-r*o-n*l,this._onChangeCallback(),this}slerp(t,a){let i=t._x,r=t._y,n=t._z,h=t._w,c=this.dot(t);c<0&&(i=-i,r=-r,n=-n,h=-h,c=-c);let o=1-a;if(c<.9995){let l=Math.acos(c),v=Math.sin(l);o=Math.sin(o*l)/v,a=Math.sin(a*l)/v,this._x=this._x*o+i*a,this._y=this._y*o+r*a,this._z=this._z*o+n*a,this._w=this._w*o+h*a,this._onChangeCallback()}else this._x=this._x*o+i*a,this._y=this._y*o+r*a,this._z=this._z*o+n*a,this._w=this._w*o+h*a,this.normalize();return this}slerpQuaternions(t,a,i){return this.copy(t).slerp(a,i)}random(){let t=2*Math.PI*Math.random(),a=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),n=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),n*Math.sin(a),n*Math.cos(a))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,a=0){return this._x=t[a],this._y=t[a+1],this._z=t[a+2],this._w=t[a+3],this._onChangeCallback(),this}toArray(t=[],a=0){return t[a]=this._x,t[a+1]=this._y,t[a+2]=this._z,t[a+3]=this._w,t}fromBufferAttribute(t,a){return this._x=t.getX(a),this._y=t.getY(a),this._z=t.getZ(a),this._w=t.getW(a),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Su=class Su{constructor(t=0,a=0,i=0){this.x=t,this.y=a,this.z=i}set(t,a,i){return i===void 0&&(i=this.z),this.x=t,this.y=a,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,a){switch(t){case 0:this.x=a;break;case 1:this.y=a;break;case 2:this.z=a;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,a){return this.x=t.x+a.x,this.y=t.y+a.y,this.z=t.z+a.z,this}addScaledVector(t,a){return this.x+=t.x*a,this.y+=t.y*a,this.z+=t.z*a,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,a){return this.x=t.x-a.x,this.y=t.y-a.y,this.z=t.z-a.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,a){return this.x=t.x*a.x,this.y=t.y*a.y,this.z=t.z*a.z,this}applyEuler(t){return this.applyQuaternion(Xx.setFromEuler(t))}applyAxisAngle(t,a){return this.applyQuaternion(Xx.setFromAxisAngle(t,a))}applyMatrix3(t){let a=this.x,i=this.y,r=this.z,n=t.elements;return this.x=n[0]*a+n[3]*i+n[6]*r,this.y=n[1]*a+n[4]*i+n[7]*r,this.z=n[2]*a+n[5]*i+n[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let a=this.x,i=this.y,r=this.z,n=t.elements,h=1/(n[3]*a+n[7]*i+n[11]*r+n[15]);return this.x=(n[0]*a+n[4]*i+n[8]*r+n[12])*h,this.y=(n[1]*a+n[5]*i+n[9]*r+n[13])*h,this.z=(n[2]*a+n[6]*i+n[10]*r+n[14])*h,this}applyQuaternion(t){let a=this.x,i=this.y,r=this.z,n=t.x,h=t.y,c=t.z,o=t.w,l=2*(h*r-c*i),v=2*(c*a-n*r),g=2*(n*i-h*a);return this.x=a+o*l+h*g-c*v,this.y=i+o*v+c*l-n*g,this.z=r+o*g+n*v-h*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let a=this.x,i=this.y,r=this.z,n=t.elements;return this.x=n[0]*a+n[4]*i+n[8]*r,this.y=n[1]*a+n[5]*i+n[9]*r,this.z=n[2]*a+n[6]*i+n[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,a){return this.x=o1(this.x,t.x,a.x),this.y=o1(this.y,t.y,a.y),this.z=o1(this.z,t.z,a.z),this}clampScalar(t,a){return this.x=o1(this.x,t,a),this.y=o1(this.y,t,a),this.z=o1(this.z,t,a),this}clampLength(t,a){let i=this.length();return this.divideScalar(i||1).multiplyScalar(o1(i,t,a))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,a){return this.x+=(t.x-this.x)*a,this.y+=(t.y-this.y)*a,this.z+=(t.z-this.z)*a,this}lerpVectors(t,a,i){return this.x=t.x+(a.x-t.x)*i,this.y=t.y+(a.y-t.y)*i,this.z=t.z+(a.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,a){let i=t.x,r=t.y,n=t.z,h=a.x,c=a.y,o=a.z;return this.x=r*o-n*c,this.y=n*h-i*o,this.z=i*c-r*h,this}projectOnVector(t){let a=t.lengthSq();if(a===0)return this.set(0,0,0);let i=t.dot(this)/a;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return kv.copy(this).projectOnVector(t),this.sub(kv)}reflect(t){return this.sub(kv.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let a=Math.sqrt(this.lengthSq()*t.lengthSq());if(a===0)return Math.PI/2;let i=this.dot(t)/a;return Math.acos(o1(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let a=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return a*a+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,a,i){let r=Math.sin(a)*t;return this.x=r*Math.sin(i),this.y=Math.cos(a)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,a,i){return this.x=t*Math.sin(a),this.y=i,this.z=t*Math.cos(a),this}setFromMatrixPosition(t){let a=t.elements;return this.x=a[12],this.y=a[13],this.z=a[14],this}setFromMatrixScale(t){let a=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=a,this.y=i,this.z=r,this}setFromMatrixColumn(t,a){return this.fromArray(t.elements,a*4)}setFromMatrix3Column(t,a){return this.fromArray(t.elements,a*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,a=0){return this.x=t[a],this.y=t[a+1],this.z=t[a+2],this}toArray(t=[],a=0){return t[a]=this.x,t[a+1]=this.y,t[a+2]=this.z,t}fromBufferAttribute(t,a){return this.x=t.getX(a),this.y=t.getY(a),this.z=t.getZ(a),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,a=Math.random()*2-1,i=Math.sqrt(1-a*a);return this.x=i*Math.cos(t),this.y=a,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Su.prototype.isVector3=!0;U=Su,kv=new U,Xx=new Aa,bu=class bu{constructor(t,a,i,r,n,h,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,a,i,r,n,h,c,o,l)}set(t,a,i,r,n,h,c,o,l){let v=this.elements;return v[0]=t,v[1]=r,v[2]=c,v[3]=a,v[4]=n,v[5]=o,v[6]=i,v[7]=h,v[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let a=this.elements,i=t.elements;return a[0]=i[0],a[1]=i[1],a[2]=i[2],a[3]=i[3],a[4]=i[4],a[5]=i[5],a[6]=i[6],a[7]=i[7],a[8]=i[8],this}extractBasis(t,a,i){return t.setFromMatrix3Column(this,0),a.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let a=t.elements;return this.set(a[0],a[4],a[8],a[1],a[5],a[9],a[2],a[6],a[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,a){let i=t.elements,r=a.elements,n=this.elements,h=i[0],c=i[3],o=i[6],l=i[1],v=i[4],g=i[7],d=i[2],u=i[5],p=i[8],x=r[0],f=r[3],s=r[6],M=r[1],L=r[4],m=r[7],w=r[2],y=r[5],C=r[8];return n[0]=h*x+c*M+o*w,n[3]=h*f+c*L+o*y,n[6]=h*s+c*m+o*C,n[1]=l*x+v*M+g*w,n[4]=l*f+v*L+g*y,n[7]=l*s+v*m+g*C,n[2]=d*x+u*M+p*w,n[5]=d*f+u*L+p*y,n[8]=d*s+u*m+p*C,this}multiplyScalar(t){let a=this.elements;return a[0]*=t,a[3]*=t,a[6]*=t,a[1]*=t,a[4]*=t,a[7]*=t,a[2]*=t,a[5]*=t,a[8]*=t,this}determinant(){let t=this.elements,a=t[0],i=t[1],r=t[2],n=t[3],h=t[4],c=t[5],o=t[6],l=t[7],v=t[8];return a*h*v-a*c*l-i*n*v+i*c*o+r*n*l-r*h*o}invert(){let t=this.elements,a=t[0],i=t[1],r=t[2],n=t[3],h=t[4],c=t[5],o=t[6],l=t[7],v=t[8],g=v*h-c*l,d=c*o-v*n,u=l*n-h*o,p=a*g+i*d+r*u;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return t[0]=g*x,t[1]=(r*l-v*i)*x,t[2]=(c*i-r*h)*x,t[3]=d*x,t[4]=(v*a-r*o)*x,t[5]=(r*n-c*a)*x,t[6]=u*x,t[7]=(i*o-l*a)*x,t[8]=(h*a-i*n)*x,this}transpose(){let t,a=this.elements;return t=a[1],a[1]=a[3],a[3]=t,t=a[2],a[2]=a[6],a[6]=t,t=a[5],a[5]=a[7],a[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let a=this.elements;return t[0]=a[0],t[1]=a[3],t[2]=a[6],t[3]=a[1],t[4]=a[4],t[5]=a[7],t[6]=a[2],t[7]=a[5],t[8]=a[8],this}setUvTransform(t,a,i,r,n,h,c){let o=Math.cos(n),l=Math.sin(n);return this.set(i*o,i*l,-i*(o*h+l*c)+h+t,-r*l,r*o,-r*(-l*h+o*c)+c+a,0,0,1),this}scale(t,a){return m0("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Sv.makeScale(t,a)),this}rotate(t){return m0("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Sv.makeRotation(-t)),this}translate(t,a){return m0("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Sv.makeTranslation(t,a)),this}makeTranslation(t,a){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,a,0,0,1),this}makeRotation(t){let a=Math.cos(t),i=Math.sin(t);return this.set(a,-i,0,i,a,0,0,0,1),this}makeScale(t,a){return this.set(t,0,0,0,a,0,0,0,1),this}equals(t){let a=this.elements,i=t.elements;for(let r=0;r<9;r++)if(a[r]!==i[r])return!1;return!0}fromArray(t,a=0){for(let i=0;i<9;i++)this.elements[i]=t[i+a];return this}toArray(t=[],a=0){let i=this.elements;return t[a]=i[0],t[a+1]=i[1],t[a+2]=i[2],t[a+3]=i[3],t[a+4]=i[4],t[a+5]=i[5],t[a+6]=i[6],t[a+7]=i[7],t[a+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};bu.prototype.isMatrix3=!0;Wt=bu,Sv=new Wt,qx=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zx=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);n1=uk();ad=class{static getDataURL(t,a="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Fn===void 0&&(Fn=rc("canvas")),Fn.width=t.width,Fn.height=t.height;let r=Fn.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Fn}return i.toDataURL(a)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let a=rc("canvas");a.width=t.width,a.height=t.height;let i=a.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let r=i.getImageData(0,0,t.width,t.height),n=r.data;for(let h=0;h<n.length;h++)n[h]=Mi(n[h]/255)*255;return i.putImageData(r,0,0),a}else if(t.data){let a=t.data.slice(0);for(let i=0;i<a.length;i++)a instanceof Uint8Array||a instanceof Uint8ClampedArray?a[i]=Math.floor(Mi(a[i]/255)*255):a[i]=Mi(a[i]);return{data:a,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},gk=0,r4=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:gk++}),this.uuid=kc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let a=this.data;return typeof HTMLVideoElement<"u"&&a instanceof HTMLVideoElement?t.set(a.videoWidth,a.videoHeight,0):typeof VideoFrame<"u"&&a instanceof VideoFrame?t.set(a.displayWidth,a.displayHeight,0):a!==null?t.set(a.width,a.height,a.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let a=t===void 0||typeof t=="string";if(!a&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let n;if(Array.isArray(r)){n=[];for(let h=0,c=r.length;h<c;h++)r[h].isDataTexture?n.push(bv(r[h].image)):n.push(bv(r[h]))}else n=bv(r);i.url=n}return a||(t.images[this.uuid]=i),i}};pk=0,_v=new U,se=class e extends _a{constructor(t=e.DEFAULT_IMAGE,a=e.DEFAULT_MAPPING,i=Sa,r=Sa,n=T2,h=mr,c=Qe,o=Q2,l=e.DEFAULT_ANISOTROPY,v=zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pk++}),this.uuid=kc(),this.name="",this.source=new r4(t),this.mipmaps=[],this.mapping=a,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=n,this.minFilter=h,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new h1(0,0),this.repeat=new h1(1,1),this.center=new h1(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_v).x}get height(){return this.source.getSize(_v).y}get depth(){return this.source.getSize(_v).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,a){this.updateRanges.push({start:t,count:a})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let a in t){let i=t[a];if(i===void 0){It(`Texture.setValues(): parameter '${a}' has value of undefined.`);continue}let r=this[a];if(r===void 0){It(`Texture.setValues(): property '${a}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[a]=i}}toJSON(t){let a=t===void 0||typeof t=="string";if(!a&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),a||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Q5:t.x=t.x-Math.floor(t.x);break;case Sa:t.x=t.x<0?0:1;break;case $5:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Q5:t.y=t.y-Math.floor(t.y);break;case Sa:t.y=t.y<0?0:1;break;case $5:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};se.DEFAULT_IMAGE=null;se.DEFAULT_MAPPING=gu;se.DEFAULT_ANISOTROPY=1;_u=class _u{constructor(t=0,a=0,i=0,r=1){this.x=t,this.y=a,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,a,i,r){return this.x=t,this.y=a,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,a){switch(t){case 0:this.x=a;break;case 1:this.y=a;break;case 2:this.z=a;break;case 3:this.w=a;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,a){return this.x=t.x+a.x,this.y=t.y+a.y,this.z=t.z+a.z,this.w=t.w+a.w,this}addScaledVector(t,a){return this.x+=t.x*a,this.y+=t.y*a,this.z+=t.z*a,this.w+=t.w*a,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,a){return this.x=t.x-a.x,this.y=t.y-a.y,this.z=t.z-a.z,this.w=t.w-a.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let a=this.x,i=this.y,r=this.z,n=this.w,h=t.elements;return this.x=h[0]*a+h[4]*i+h[8]*r+h[12]*n,this.y=h[1]*a+h[5]*i+h[9]*r+h[13]*n,this.z=h[2]*a+h[6]*i+h[10]*r+h[14]*n,this.w=h[3]*a+h[7]*i+h[11]*r+h[15]*n,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let a=Math.sqrt(1-t.w*t.w);return a<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/a,this.y=t.y/a,this.z=t.z/a),this}setAxisAngleFromRotationMatrix(t){let a,i,r,n,o=t.elements,l=o[0],v=o[4],g=o[8],d=o[1],u=o[5],p=o[9],x=o[2],f=o[6],s=o[10];if(Math.abs(v-d)<.01&&Math.abs(g-x)<.01&&Math.abs(p-f)<.01){if(Math.abs(v+d)<.1&&Math.abs(g+x)<.1&&Math.abs(p+f)<.1&&Math.abs(l+u+s-3)<.1)return this.set(1,0,0,0),this;a=Math.PI;let L=(l+1)/2,m=(u+1)/2,w=(s+1)/2,y=(v+d)/4,C=(g+x)/4,H=(p+f)/4;return L>m&&L>w?L<.01?(i=0,r=.707106781,n=.707106781):(i=Math.sqrt(L),r=y/i,n=C/i):m>w?m<.01?(i=.707106781,r=0,n=.707106781):(r=Math.sqrt(m),i=y/r,n=H/r):w<.01?(i=.707106781,r=.707106781,n=0):(n=Math.sqrt(w),i=C/n,r=H/n),this.set(i,r,n,a),this}let M=Math.sqrt((f-p)*(f-p)+(g-x)*(g-x)+(d-v)*(d-v));return Math.abs(M)<.001&&(M=1),this.x=(f-p)/M,this.y=(g-x)/M,this.z=(d-v)/M,this.w=Math.acos((l+u+s-1)/2),this}setFromMatrixPosition(t){let a=t.elements;return this.x=a[12],this.y=a[13],this.z=a[14],this.w=a[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,a){return this.x=o1(this.x,t.x,a.x),this.y=o1(this.y,t.y,a.y),this.z=o1(this.z,t.z,a.z),this.w=o1(this.w,t.w,a.w),this}clampScalar(t,a){return this.x=o1(this.x,t,a),this.y=o1(this.y,t,a),this.z=o1(this.z,t,a),this.w=o1(this.w,t,a),this}clampLength(t,a){let i=this.length();return this.divideScalar(i||1).multiplyScalar(o1(i,t,a))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,a){return this.x+=(t.x-this.x)*a,this.y+=(t.y-this.y)*a,this.z+=(t.z-this.z)*a,this.w+=(t.w-this.w)*a,this}lerpVectors(t,a,i){return this.x=t.x+(a.x-t.x)*i,this.y=t.y+(a.y-t.y)*i,this.z=t.z+(a.z-t.z)*i,this.w=t.w+(a.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,a=0){return this.x=t[a],this.y=t[a+1],this.z=t[a+2],this.w=t[a+3],this}toArray(t=[],a=0){return t[a]=this.x,t[a+1]=this.y,t[a+2]=this.z,t[a+3]=this.w,t}fromBufferAttribute(t,a){return this.x=t.getX(a),this.y=t.getY(a),this.z=t.getZ(a),this.w=t.getW(a),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_u.prototype.isVector4=!0;q1=_u,id=class extends _a{constructor(t=1,a=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:T2,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=a,this.depth=i.depth,this.scissor=new q1(0,0,t,a),this.scissorTest=!1,this.viewport=new q1(0,0,t,a),this.textures=[];let r={width:t,height:a,depth:i.depth},n=new se(r),h=i.count;for(let c=0;c<h;c++)this.textures[c]=n.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let a={minFilter:T2,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(a.mapping=t.mapping),t.wrapS!==void 0&&(a.wrapS=t.wrapS),t.wrapT!==void 0&&(a.wrapT=t.wrapT),t.wrapR!==void 0&&(a.wrapR=t.wrapR),t.magFilter!==void 0&&(a.magFilter=t.magFilter),t.minFilter!==void 0&&(a.minFilter=t.minFilter),t.format!==void 0&&(a.format=t.format),t.type!==void 0&&(a.type=t.type),t.anisotropy!==void 0&&(a.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(a.colorSpace=t.colorSpace),t.flipY!==void 0&&(a.flipY=t.flipY),t.generateMipmaps!==void 0&&(a.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(a.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(a)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,a,i=1){if(this.width!==t||this.height!==a||this.depth!==i){this.width=t,this.height=a,this.depth=i;for(let r=0,n=this.textures.length;r<n;r++)this.textures[r].image.width=t,this.textures[r].image.height=a,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,a),this.scissor.set(0,0,t,a)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let a=0,i=t.textures.length;a<i;a++){this.textures[a]=t.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;let r=Object.assign({},t.textures[a].image);this.textures[a].source=new r4(r)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let a=t.depthTexture.clone();a.renderTarget=null,this.depthTexture=a}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},W2=class extends id{constructor(t=1,a=1,i={}){super(t,a,i),this.isWebGLRenderTarget=!0}},nc=class extends se{constructor(t=null,a=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:a,height:i,depth:r},this.magFilter=y2,this.minFilter=y2,this.wrapR=Sa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},rd=class extends se{constructor(t=null,a=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:a,height:i,depth:r},this.magFilter=y2,this.minFilter=y2,this.wrapR=Sa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}},yd=class yd{constructor(t,a,i,r,n,h,c,o,l,v,g,d,u,p,x,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,a,i,r,n,h,c,o,l,v,g,d,u,p,x,f)}set(t,a,i,r,n,h,c,o,l,v,g,d,u,p,x,f){let s=this.elements;return s[0]=t,s[4]=a,s[8]=i,s[12]=r,s[1]=n,s[5]=h,s[9]=c,s[13]=o,s[2]=l,s[6]=v,s[10]=g,s[14]=d,s[3]=u,s[7]=p,s[11]=x,s[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yd().fromArray(this.elements)}copy(t){let a=this.elements,i=t.elements;return a[0]=i[0],a[1]=i[1],a[2]=i[2],a[3]=i[3],a[4]=i[4],a[5]=i[5],a[6]=i[6],a[7]=i[7],a[8]=i[8],a[9]=i[9],a[10]=i[10],a[11]=i[11],a[12]=i[12],a[13]=i[13],a[14]=i[14],a[15]=i[15],this}copyPosition(t){let a=this.elements,i=t.elements;return a[12]=i[12],a[13]=i[13],a[14]=i[14],this}setFromMatrix3(t){let a=t.elements;return this.set(a[0],a[3],a[6],0,a[1],a[4],a[7],0,a[2],a[5],a[8],0,0,0,0,1),this}extractBasis(t,a,i){return this.determinantAffine()===0?(t.set(1,0,0),a.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),a.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,a,i){return this.set(t.x,a.x,i.x,0,t.y,a.y,i.y,0,t.z,a.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let a=this.elements,i=t.elements,r=1/Wn.setFromMatrixColumn(t,0).length(),n=1/Wn.setFromMatrixColumn(t,1).length(),h=1/Wn.setFromMatrixColumn(t,2).length();return a[0]=i[0]*r,a[1]=i[1]*r,a[2]=i[2]*r,a[3]=0,a[4]=i[4]*n,a[5]=i[5]*n,a[6]=i[6]*n,a[7]=0,a[8]=i[8]*h,a[9]=i[9]*h,a[10]=i[10]*h,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,this}makeRotationFromEuler(t){let a=this.elements,i=t.x,r=t.y,n=t.z,h=Math.cos(i),c=Math.sin(i),o=Math.cos(r),l=Math.sin(r),v=Math.cos(n),g=Math.sin(n);if(t.order==="XYZ"){let d=h*v,u=h*g,p=c*v,x=c*g;a[0]=o*v,a[4]=-o*g,a[8]=l,a[1]=u+p*l,a[5]=d-x*l,a[9]=-c*o,a[2]=x-d*l,a[6]=p+u*l,a[10]=h*o}else if(t.order==="YXZ"){let d=o*v,u=o*g,p=l*v,x=l*g;a[0]=d+x*c,a[4]=p*c-u,a[8]=h*l,a[1]=h*g,a[5]=h*v,a[9]=-c,a[2]=u*c-p,a[6]=x+d*c,a[10]=h*o}else if(t.order==="ZXY"){let d=o*v,u=o*g,p=l*v,x=l*g;a[0]=d-x*c,a[4]=-h*g,a[8]=p+u*c,a[1]=u+p*c,a[5]=h*v,a[9]=x-d*c,a[2]=-h*l,a[6]=c,a[10]=h*o}else if(t.order==="ZYX"){let d=h*v,u=h*g,p=c*v,x=c*g;a[0]=o*v,a[4]=p*l-u,a[8]=d*l+x,a[1]=o*g,a[5]=x*l+d,a[9]=u*l-p,a[2]=-l,a[6]=c*o,a[10]=h*o}else if(t.order==="YZX"){let d=h*o,u=h*l,p=c*o,x=c*l;a[0]=o*v,a[4]=x-d*g,a[8]=p*g+u,a[1]=g,a[5]=h*v,a[9]=-c*v,a[2]=-l*v,a[6]=u*g+p,a[10]=d-x*g}else if(t.order==="XZY"){let d=h*o,u=h*l,p=c*o,x=c*l;a[0]=o*v,a[4]=-g,a[8]=l*v,a[1]=d*g+x,a[5]=h*v,a[9]=u*g-p,a[2]=p*g-u,a[6]=c*v,a[10]=x*g+d}return a[3]=0,a[7]=0,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fk,t,Mk)}lookAt(t,a,i){let r=this.elements;return ye.subVectors(t,a),ye.lengthSq()===0&&(ye.z=1),ye.normalize(),er.crossVectors(i,ye),er.lengthSq()===0&&(Math.abs(i.z)===1?ye.x+=1e-4:ye.z+=1e-4,ye.normalize(),er.crossVectors(i,ye)),er.normalize(),L5.crossVectors(ye,er),r[0]=er.x,r[4]=L5.x,r[8]=ye.x,r[1]=er.y,r[5]=L5.y,r[9]=ye.y,r[2]=er.z,r[6]=L5.z,r[10]=ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,a){let i=t.elements,r=a.elements,n=this.elements,h=i[0],c=i[4],o=i[8],l=i[12],v=i[1],g=i[5],d=i[9],u=i[13],p=i[2],x=i[6],f=i[10],s=i[14],M=i[3],L=i[7],m=i[11],w=i[15],y=r[0],C=r[4],H=r[8],B=r[12],S=r[1],E=r[5],O=r[9],R=r[13],b=r[2],I=r[6],q=r[10],X=r[14],j=r[3],W=r[7],K=r[11],et=r[15];return n[0]=h*y+c*S+o*b+l*j,n[4]=h*C+c*E+o*I+l*W,n[8]=h*H+c*O+o*q+l*K,n[12]=h*B+c*R+o*X+l*et,n[1]=v*y+g*S+d*b+u*j,n[5]=v*C+g*E+d*I+u*W,n[9]=v*H+g*O+d*q+u*K,n[13]=v*B+g*R+d*X+u*et,n[2]=p*y+x*S+f*b+s*j,n[6]=p*C+x*E+f*I+s*W,n[10]=p*H+x*O+f*q+s*K,n[14]=p*B+x*R+f*X+s*et,n[3]=M*y+L*S+m*b+w*j,n[7]=M*C+L*E+m*I+w*W,n[11]=M*H+L*O+m*q+w*K,n[15]=M*B+L*R+m*X+w*et,this}multiplyScalar(t){let a=this.elements;return a[0]*=t,a[4]*=t,a[8]*=t,a[12]*=t,a[1]*=t,a[5]*=t,a[9]*=t,a[13]*=t,a[2]*=t,a[6]*=t,a[10]*=t,a[14]*=t,a[3]*=t,a[7]*=t,a[11]*=t,a[15]*=t,this}determinant(){let t=this.elements,a=t[0],i=t[4],r=t[8],n=t[12],h=t[1],c=t[5],o=t[9],l=t[13],v=t[2],g=t[6],d=t[10],u=t[14],p=t[3],x=t[7],f=t[11],s=t[15],M=o*u-l*d,L=c*u-l*g,m=c*d-o*g,w=h*u-l*v,y=h*d-o*v,C=h*g-c*v;return a*(x*M-f*L+s*m)-i*(p*M-f*w+s*y)+r*(p*L-x*w+s*C)-n*(p*m-x*y+f*C)}determinantAffine(){let t=this.elements,a=t[0],i=t[4],r=t[8],n=t[1],h=t[5],c=t[9],o=t[2],l=t[6],v=t[10];return a*(h*v-c*l)-i*(n*v-c*o)+r*(n*l-h*o)}transpose(){let t=this.elements,a;return a=t[1],t[1]=t[4],t[4]=a,a=t[2],t[2]=t[8],t[8]=a,a=t[6],t[6]=t[9],t[9]=a,a=t[3],t[3]=t[12],t[12]=a,a=t[7],t[7]=t[13],t[13]=a,a=t[11],t[11]=t[14],t[14]=a,this}setPosition(t,a,i){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=a,r[14]=i),this}invert(){let t=this.elements,a=t[0],i=t[1],r=t[2],n=t[3],h=t[4],c=t[5],o=t[6],l=t[7],v=t[8],g=t[9],d=t[10],u=t[11],p=t[12],x=t[13],f=t[14],s=t[15],M=a*c-i*h,L=a*o-r*h,m=a*l-n*h,w=i*o-r*c,y=i*l-n*c,C=r*l-n*o,H=v*x-g*p,B=v*f-d*p,S=v*s-u*p,E=g*f-d*x,O=g*s-u*x,R=d*s-u*f,b=M*R-L*O+m*E+w*S-y*B+C*H;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/b;return t[0]=(c*R-o*O+l*E)*I,t[1]=(r*O-i*R-n*E)*I,t[2]=(x*C-f*y+s*w)*I,t[3]=(d*y-g*C-u*w)*I,t[4]=(o*S-h*R-l*B)*I,t[5]=(a*R-r*S+n*B)*I,t[6]=(f*m-p*C-s*L)*I,t[7]=(v*C-d*m+u*L)*I,t[8]=(h*O-c*S+l*H)*I,t[9]=(i*S-a*O-n*H)*I,t[10]=(p*y-x*m+s*M)*I,t[11]=(g*m-v*y-u*M)*I,t[12]=(c*B-h*E-o*H)*I,t[13]=(a*E-i*B+r*H)*I,t[14]=(x*L-p*w-f*M)*I,t[15]=(v*w-g*L+d*M)*I,this}scale(t){let a=this.elements,i=t.x,r=t.y,n=t.z;return a[0]*=i,a[4]*=r,a[8]*=n,a[1]*=i,a[5]*=r,a[9]*=n,a[2]*=i,a[6]*=r,a[10]*=n,a[3]*=i,a[7]*=r,a[11]*=n,this}getMaxScaleOnAxis(){let t=this.elements,a=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(a,i,r))}makeTranslation(t,a,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,a,0,0,1,i,0,0,0,1),this}makeRotationX(t){let a=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,a,-i,0,0,i,a,0,0,0,0,1),this}makeRotationY(t){let a=Math.cos(t),i=Math.sin(t);return this.set(a,0,i,0,0,1,0,0,-i,0,a,0,0,0,0,1),this}makeRotationZ(t){let a=Math.cos(t),i=Math.sin(t);return this.set(a,-i,0,0,i,a,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,a){let i=Math.cos(a),r=Math.sin(a),n=1-i,h=t.x,c=t.y,o=t.z,l=n*h,v=n*c;return this.set(l*h+i,l*c-r*o,l*o+r*c,0,l*c+r*o,v*c+i,v*o-r*h,0,l*o-r*c,v*o+r*h,n*o*o+i,0,0,0,0,1),this}makeScale(t,a,i){return this.set(t,0,0,0,0,a,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,a,i,r,n,h){return this.set(1,i,n,0,t,1,h,0,a,r,1,0,0,0,0,1),this}compose(t,a,i){let r=this.elements,n=a._x,h=a._y,c=a._z,o=a._w,l=n+n,v=h+h,g=c+c,d=n*l,u=n*v,p=n*g,x=h*v,f=h*g,s=c*g,M=o*l,L=o*v,m=o*g,w=i.x,y=i.y,C=i.z;return r[0]=(1-(x+s))*w,r[1]=(u+m)*w,r[2]=(p-L)*w,r[3]=0,r[4]=(u-m)*y,r[5]=(1-(d+s))*y,r[6]=(f+M)*y,r[7]=0,r[8]=(p+L)*C,r[9]=(f-M)*C,r[10]=(1-(d+x))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,a,i){let r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];let n=this.determinantAffine();if(n===0)return i.set(1,1,1),a.identity(),this;let h=Wn.set(r[0],r[1],r[2]).length(),c=Wn.set(r[4],r[5],r[6]).length(),o=Wn.set(r[8],r[9],r[10]).length();n<0&&(h=-h),ha.copy(this);let l=1/h,v=1/c,g=1/o;return ha.elements[0]*=l,ha.elements[1]*=l,ha.elements[2]*=l,ha.elements[4]*=v,ha.elements[5]*=v,ha.elements[6]*=v,ha.elements[8]*=g,ha.elements[9]*=g,ha.elements[10]*=g,a.setFromRotationMatrix(ha),i.x=h,i.y=c,i.z=o,this}makePerspective(t,a,i,r,n,h,c=da,o=!1){let l=this.elements,v=2*n/(a-t),g=2*n/(i-r),d=(a+t)/(a-t),u=(i+r)/(i-r),p,x;if(o)p=n/(h-n),x=h*n/(h-n);else if(c===da)p=-(h+n)/(h-n),x=-2*h*n/(h-n);else if(c===ic)p=-h/(h-n),x=-h*n/(h-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=v,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=g,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,a,i,r,n,h,c=da,o=!1){let l=this.elements,v=2/(a-t),g=2/(i-r),d=-(a+t)/(a-t),u=-(i+r)/(i-r),p,x;if(o)p=1/(h-n),x=h/(h-n);else if(c===da)p=-2/(h-n),x=-(h+n)/(h-n);else if(c===ic)p=-1/(h-n),x=-n/(h-n);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=v,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=g,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let a=this.elements,i=t.elements;for(let r=0;r<16;r++)if(a[r]!==i[r])return!1;return!0}fromArray(t,a=0){for(let i=0;i<16;i++)this.elements[i]=t[i+a];return this}toArray(t=[],a=0){let i=this.elements;return t[a]=i[0],t[a+1]=i[1],t[a+2]=i[2],t[a+3]=i[3],t[a+4]=i[4],t[a+5]=i[5],t[a+6]=i[6],t[a+7]=i[7],t[a+8]=i[8],t[a+9]=i[9],t[a+10]=i[10],t[a+11]=i[11],t[a+12]=i[12],t[a+13]=i[13],t[a+14]=i[14],t[a+15]=i[15],t}};yd.prototype.isMatrix4=!0;e2=yd,Wn=new U,ha=new e2,fk=new U(0,0,0),Mk=new U(1,1,1),er=new U,L5=new U,ye=new U,Yx=new e2,Kx=new Aa,cr=class e{constructor(t=0,a=0,i=0,r=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=a,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,a,i,r=this._order){return this._x=t,this._y=a,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,a=this._order,i=!0){let r=t.elements,n=r[0],h=r[4],c=r[8],o=r[1],l=r[5],v=r[9],g=r[2],d=r[6],u=r[10];switch(a){case"XYZ":this._y=Math.asin(o1(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-v,u),this._z=Math.atan2(-h,n)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-o1(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(c,u),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-g,n),this._z=0);break;case"ZXY":this._x=Math.asin(o1(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-g,u),this._z=Math.atan2(-h,l)):(this._y=0,this._z=Math.atan2(o,n));break;case"ZYX":this._y=Math.asin(-o1(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(o,n)):(this._x=0,this._z=Math.atan2(-h,l));break;case"YZX":this._z=Math.asin(o1(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-v,l),this._y=Math.atan2(-g,n)):(this._x=0,this._y=Math.atan2(c,u));break;case"XZY":this._z=Math.asin(-o1(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(c,n)):(this._x=Math.atan2(-v,u),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+a)}return this._order=a,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,a,i){return Yx.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yx,a,i)}setFromVector3(t,a=this._order){return this.set(t.x,t.y,t.z,a)}reorder(t){return Kx.setFromEuler(this),this.setFromQuaternion(Kx,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],a=0){return t[a]=this._x,t[a+1]=this._y,t[a+2]=this._z,t[a+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};cr.DEFAULT_ORDER="XYZ";hc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},mk=0,Jx=new U,Gn=new Aa,vi=new e2,V5=new U,Yh=new U,zk=new U,xk=new Aa,Qx=new U(1,0,0),$x=new U(0,1,0),tH=new U(0,0,1),eH={type:"added"},Hk={type:"removed"},jn={type:"childadded",child:null},Av={type:"childremoved",child:null},ke=class e extends _a{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mk++}),this.uuid=kc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,a=new cr,i=new Aa,r=new U(1,1,1);function n(){i.setFromEuler(a,!1)}function h(){a.setFromQuaternion(i,void 0,!1)}a._onChange(n),i._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:a},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new e2},normalMatrix:{value:new Wt}}),this.matrix=new e2,this.matrixWorld=new e2,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,a){this.quaternion.setFromAxisAngle(t,a)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,a){return Gn.setFromAxisAngle(t,a),this.quaternion.multiply(Gn),this}rotateOnWorldAxis(t,a){return Gn.setFromAxisAngle(t,a),this.quaternion.premultiply(Gn),this}rotateX(t){return this.rotateOnAxis(Qx,t)}rotateY(t){return this.rotateOnAxis($x,t)}rotateZ(t){return this.rotateOnAxis(tH,t)}translateOnAxis(t,a){return Jx.copy(t).applyQuaternion(this.quaternion),this.position.add(Jx.multiplyScalar(a)),this}translateX(t){return this.translateOnAxis(Qx,t)}translateY(t){return this.translateOnAxis($x,t)}translateZ(t){return this.translateOnAxis(tH,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(t,a,i){t.isVector3?V5.copy(t):V5.set(t,a,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Yh.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Yh,V5,this.up):vi.lookAt(V5,Yh,this.up),this.quaternion.setFromRotationMatrix(vi),r&&(vi.extractRotation(r.matrixWorld),Gn.setFromRotationMatrix(vi),this.quaternion.premultiply(Gn.invert()))}add(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.add(arguments[a]);return this}return t===this?(Nt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(eH),jn.child=t,this.dispatchEvent(jn),jn.child=null):Nt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let a=this.children.indexOf(t);return a!==-1&&(t.parent=null,this.children.splice(a,1),t.dispatchEvent(Hk),Av.child=t,this.dispatchEvent(Av),Av.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vi.multiply(t.parent.matrixWorld)),t.applyMatrix4(vi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(eH),jn.child=t,this.dispatchEvent(jn),jn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,a){if(this[t]===a)return this;for(let i=0,r=this.children.length;i<r;i++){let h=this.children[i].getObjectByProperty(t,a);if(h!==void 0)return h}}getObjectsByProperty(t,a,i=[]){this[t]===a&&i.push(this);let r=this.children;for(let n=0,h=r.length;n<h;n++)r[n].getObjectsByProperty(t,a,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yh,t,zk),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yh,xk,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let a=this.matrixWorld.elements;return t.set(a[8],a[9],a[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let a=this.children;for(let i=0,r=a.length;i<r;i++)a[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let a=this.children;for(let i=0,r=a.length;i<r;i++)a[i].traverseVisible(t)}traverseAncestors(t){let a=this.parent;a!==null&&(t(a),a.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let a=t.x,i=t.y,r=t.z,n=this.matrix.elements;n[12]+=a-n[0]*a-n[4]*i-n[8]*r,n[13]+=i-n[1]*a-n[5]*i-n[9]*r,n[14]+=r-n[2]*a-n[6]*i-n[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let a=this.children;for(let i=0,r=a.length;i<r;i++)a[i].updateMatrixWorld(t)}updateWorldMatrix(t,a,i=!1){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),a===!0){let n=this.children;for(let h=0,c=n.length;h<c;h++)n[h].updateWorldMatrix(!1,!0,i)}}toJSON(t){let a=t===void 0||typeof t=="string",i={};a&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>({...c})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function n(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=n(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let o=c.shapes;if(Array.isArray(o))for(let l=0,v=o.length;l<v;l++){let g=o[l];n(t.shapes,g)}else n(t.shapes,o)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(n(t.materials,this.material[o]));r.material=c}else r.material=n(t.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){let o=this.animations[c];r.animations.push(n(t.animations,o))}}if(a){let c=h(t.geometries),o=h(t.materials),l=h(t.textures),v=h(t.images),g=h(t.shapes),d=h(t.skeletons),u=h(t.animations),p=h(t.nodes);c.length>0&&(i.geometries=c),o.length>0&&(i.materials=o),l.length>0&&(i.textures=l),v.length>0&&(i.images=v),g.length>0&&(i.shapes=g),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),p.length>0&&(i.nodes=p)}return i.object=r,i;function h(c){let o=[];for(let l in c){let v=c[l];delete v.metadata,o.push(v)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,a=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),a===!0)for(let i=0;i<t.children.length;i++){let r=t.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ke.DEFAULT_UP=new U(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;M0=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},Lk={type:"move"},n4=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new M0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new M0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new M0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let a=this._hand;if(a)for(let i of t.hand.values())this._getHandJoint(a,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,a,i){let r=null,n=null,h=null,c=this._targetRay,o=this._grip,l=this._hand;if(t&&a.session.visibilityState!=="visible-blurred"){if(l&&t.hand){h=!0;for(let x of t.hand.values()){let f=a.getJointPose(x,i),s=this._getHandJoint(l,x);f!==null&&(s.matrix.fromArray(f.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,s.jointRadius=f.radius),s.visible=f!==null}let v=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],d=v.position.distanceTo(g.position),u=.02,p=.005;l.inputState.pinching&&d>u+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=u-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else o!==null&&t.gripSpace&&(n=a.getPose(t.gripSpace,i),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:t,target:this})));c!==null&&(r=a.getPose(t.targetRaySpace,i),r===null&&n!==null&&(r=n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Lk)))}return c!==null&&(c.visible=r!==null),o!==null&&(o.visible=n!==null),l!==null&&(l.visible=h!==null),this}_getHandJoint(t,a){if(t.joints[a.jointName]===void 0){let i=new M0;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[a.jointName]=i,t.add(i)}return t.joints[a.jointName]}},QH={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ar={h:0,s:0,l:0},w5={h:0,s:0,l:0};$t=class{constructor(t,a,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,a,i)}set(t,a,i){if(a===void 0&&i===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,a,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,a=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,n1.colorSpaceToWorking(this,a),this}setRGB(t,a,i,r=n1.workingColorSpace){return this.r=t,this.g=a,this.b=i,n1.colorSpaceToWorking(this,r),this}setHSL(t,a,i,r=n1.workingColorSpace){if(t=vk(t,1),a=o1(a,0,1),i=o1(i,0,1),a===0)this.r=this.g=this.b=i;else{let n=i<=.5?i*(1+a):i+a-i*a,h=2*i-n;this.r=Tv(h,n,t+1/3),this.g=Tv(h,n,t),this.b=Tv(h,n,t-1/3)}return n1.colorSpaceToWorking(this,r),this}setStyle(t,a=Ce){function i(n){n!==void 0&&parseFloat(n)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let n,h=r[1],c=r[2];switch(h){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,a);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,a);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,a);break;default:It("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let n=r[1],h=n.length;if(h===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,a);if(h===6)return this.setHex(parseInt(n,16),a);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,a);return this}setColorName(t,a=Ce){let i=QH[t.toLowerCase()];return i!==void 0?this.setHex(i,a):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Mi(t.r),this.g=Mi(t.g),this.b=Mi(t.b),this}copyLinearToSRGB(t){return this.r=e4(t.r),this.g=e4(t.g),this.b=e4(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return n1.workingToColorSpace(F2.copy(this),t),Math.round(o1(F2.r*255,0,255))*65536+Math.round(o1(F2.g*255,0,255))*256+Math.round(o1(F2.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,a=n1.workingColorSpace){n1.workingToColorSpace(F2.copy(this),a);let i=F2.r,r=F2.g,n=F2.b,h=Math.max(i,r,n),c=Math.min(i,r,n),o,l,v=(c+h)/2;if(c===h)o=0,l=0;else{let g=h-c;switch(l=v<=.5?g/(h+c):g/(2-h-c),h){case i:o=(r-n)/g+(r<n?6:0);break;case r:o=(n-i)/g+2;break;case n:o=(i-r)/g+4;break}o/=6}return t.h=o,t.s=l,t.l=v,t}getRGB(t,a=n1.workingColorSpace){return n1.workingToColorSpace(F2.copy(this),a),t.r=F2.r,t.g=F2.g,t.b=F2.b,t}getStyle(t=Ce){n1.workingToColorSpace(F2.copy(this),t);let a=F2.r,i=F2.g,r=F2.b;return t!==Ce?`color(${t} ${a.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(a*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,a,i){return this.getHSL(ar),this.setHSL(ar.h+t,ar.s+a,ar.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,a){return this.r=t.r+a.r,this.g=t.g+a.g,this.b=t.b+a.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,a){return this.r+=(t.r-this.r)*a,this.g+=(t.g-this.g)*a,this.b+=(t.b-this.b)*a,this}lerpColors(t,a,i){return this.r=t.r+(a.r-t.r)*i,this.g=t.g+(a.g-t.g)*i,this.b=t.b+(a.b-t.b)*i,this}lerpHSL(t,a){this.getHSL(ar),t.getHSL(w5);let i=Cv(ar.h,w5.h,a),r=Cv(ar.s,w5.s,a),n=Cv(ar.l,w5.l,a);return this.setHSL(i,r,n),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let a=this.r,i=this.g,r=this.b,n=t.elements;return this.r=n[0]*a+n[3]*i+n[6]*r,this.g=n[1]*a+n[4]*i+n[7]*r,this.b=n[2]*a+n[5]*i+n[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,a=0){return this.r=t[a],this.g=t[a+1],this.b=t[a+2],this}toArray(t=[],a=0){return t[a]=this.r,t[a+1]=this.g,t[a+2]=this.b,t}fromBufferAttribute(t,a){return this.r=t.getX(a),this.g=t.getY(a),this.b=t.getZ(a),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},F2=new $t;$t.NAMES=QH;or=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cr,this.environmentIntensity=1,this.environmentRotation=new cr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,a){return super.copy(t,a),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let a=super.toJSON(t);return this.fog!==null&&(a.object.fog=this.fog.toJSON()),a.object.backgroundBlurriness=this.backgroundBlurriness,a.object.backgroundIntensity=this.backgroundIntensity,a.object.backgroundRotation=this.backgroundRotation.toArray(),a.object.environmentIntensity=this.environmentIntensity,a.object.environmentRotation=this.environmentRotation.toArray(),a}},ca=new U,ui=new U,Ov=new U,gi=new U,Xn=new U,qn=new U,aH=new U,Ev=new U,Rv=new U,Dv=new U,Iv=new q1,Pv=new q1,Nv=new q1,hr=class e{constructor(t=new U,a=new U,i=new U){this.a=t,this.b=a,this.c=i}static getNormal(t,a,i,r){r.subVectors(i,a),ca.subVectors(t,a),r.cross(ca);let n=r.lengthSq();return n>0?r.multiplyScalar(1/Math.sqrt(n)):r.set(0,0,0)}static getBarycoord(t,a,i,r,n){ca.subVectors(r,a),ui.subVectors(i,a),Ov.subVectors(t,a);let h=ca.dot(ca),c=ca.dot(ui),o=ca.dot(Ov),l=ui.dot(ui),v=ui.dot(Ov),g=h*l-c*c;if(g===0)return n.set(0,0,0),null;let d=1/g,u=(l*o-c*v)*d,p=(h*v-c*o)*d;return n.set(1-u-p,p,u)}static containsPoint(t,a,i,r){return this.getBarycoord(t,a,i,r,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,a,i,r,n,h,c,o){return this.getBarycoord(t,a,i,r,gi)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(n,gi.x),o.addScaledVector(h,gi.y),o.addScaledVector(c,gi.z),o)}static getInterpolatedAttribute(t,a,i,r,n,h){return Iv.setScalar(0),Pv.setScalar(0),Nv.setScalar(0),Iv.fromBufferAttribute(t,a),Pv.fromBufferAttribute(t,i),Nv.fromBufferAttribute(t,r),h.setScalar(0),h.addScaledVector(Iv,n.x),h.addScaledVector(Pv,n.y),h.addScaledVector(Nv,n.z),h}static isFrontFacing(t,a,i,r){return ca.subVectors(i,a),ui.subVectors(t,a),ca.cross(ui).dot(r)<0}set(t,a,i){return this.a.copy(t),this.b.copy(a),this.c.copy(i),this}setFromPointsAndIndices(t,a,i,r){return this.a.copy(t[a]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,a,i,r){return this.a.fromBufferAttribute(t,a),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ca.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),ca.cross(ui).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,a){return e.getBarycoord(t,this.a,this.b,this.c,a)}getInterpolation(t,a,i,r,n){return e.getInterpolation(t,this.a,this.b,this.c,a,i,r,n)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,a){let i=this.a,r=this.b,n=this.c,h,c;Xn.subVectors(r,i),qn.subVectors(n,i),Ev.subVectors(t,i);let o=Xn.dot(Ev),l=qn.dot(Ev);if(o<=0&&l<=0)return a.copy(i);Rv.subVectors(t,r);let v=Xn.dot(Rv),g=qn.dot(Rv);if(v>=0&&g<=v)return a.copy(r);let d=o*g-v*l;if(d<=0&&o>=0&&v<=0)return h=o/(o-v),a.copy(i).addScaledVector(Xn,h);Dv.subVectors(t,n);let u=Xn.dot(Dv),p=qn.dot(Dv);if(p>=0&&u<=p)return a.copy(n);let x=u*l-o*p;if(x<=0&&l>=0&&p<=0)return c=l/(l-p),a.copy(i).addScaledVector(qn,c);let f=v*p-u*g;if(f<=0&&g-v>=0&&u-p>=0)return aH.subVectors(n,r),c=(g-v)/(g-v+(u-p)),a.copy(r).addScaledVector(aH,c);let s=1/(f+x+d);return h=x*s,c=d*s,a.copy(i).addScaledVector(Xn,h).addScaledVector(qn,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},lr=class{constructor(t=new U(1/0,1/0,1/0),a=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=a}set(t,a){return this.min.copy(t),this.max.copy(a),this}setFromArray(t){this.makeEmpty();for(let a=0,i=t.length;a<i;a+=3)this.expandByPoint(oa.fromArray(t,a));return this}setFromBufferAttribute(t){this.makeEmpty();for(let a=0,i=t.count;a<i;a++)this.expandByPoint(oa.fromBufferAttribute(t,a));return this}setFromPoints(t){this.makeEmpty();for(let a=0,i=t.length;a<i;a++)this.expandByPoint(t[a]);return this}setFromCenterAndSize(t,a){let i=oa.copy(a).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,a=!1){return this.makeEmpty(),this.expandByObject(t,a)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,a=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let n=i.getAttribute("position");if(a===!0&&n!==void 0&&t.isInstancedMesh!==!0)for(let h=0,c=n.count;h<c;h++)t.isMesh===!0?t.getVertexPosition(h,oa):oa.fromBufferAttribute(n,h),oa.applyMatrix4(t.matrixWorld),this.expandByPoint(oa);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),y5.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),y5.copy(i.boundingBox)),y5.applyMatrix4(t.matrixWorld),this.union(y5)}let r=t.children;for(let n=0,h=r.length;n<h;n++)this.expandByObject(r[n],a);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,a){return a.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,oa),oa.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let a,i;return t.normal.x>0?(a=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(a=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(a+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(a+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(a+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(a+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),a<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Kh),B5.subVectors(this.max,Kh),Zn.subVectors(t.a,Kh),Yn.subVectors(t.b,Kh),Kn.subVectors(t.c,Kh),ir.subVectors(Yn,Zn),rr.subVectors(Kn,Yn),u0.subVectors(Zn,Kn);let a=[0,-ir.z,ir.y,0,-rr.z,rr.y,0,-u0.z,u0.y,ir.z,0,-ir.x,rr.z,0,-rr.x,u0.z,0,-u0.x,-ir.y,ir.x,0,-rr.y,rr.x,0,-u0.y,u0.x,0];return!Uv(a,Zn,Yn,Kn,B5)||(a=[1,0,0,0,1,0,0,0,1],!Uv(a,Zn,Yn,Kn,B5))?!1:(C5.crossVectors(ir,rr),a=[C5.x,C5.y,C5.z],Uv(a,Zn,Yn,Kn,B5))}clampPoint(t,a){return a.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,oa).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(oa).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},pi=[new U,new U,new U,new U,new U,new U,new U,new U],oa=new U,y5=new lr,Zn=new U,Yn=new U,Kn=new U,ir=new U,rr=new U,u0=new U,Kh=new U,B5=new U,C5=new U,g0=new U;u2=new U,k5=new h1,Vk=0,A2=class extends _a{constructor(t,a,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vk++}),this.name="",this.array=t,this.itemSize=a,this.count=t!==void 0?t.length/a:0,this.normalized=i,this.usage=qH,this.updateRanges=[],this.gpuType=ua,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,a){this.updateRanges.push({start:t,count:a})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,a,i){t*=this.itemSize,i*=a.itemSize;for(let r=0,n=this.itemSize;r<n;r++)this.array[t+r]=a.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let a=0,i=this.count;a<i;a++)k5.fromBufferAttribute(this,a),k5.applyMatrix3(t),this.setXY(a,k5.x,k5.y);else if(this.itemSize===3)for(let a=0,i=this.count;a<i;a++)u2.fromBufferAttribute(this,a),u2.applyMatrix3(t),this.setXYZ(a,u2.x,u2.y,u2.z);return this}applyMatrix4(t){for(let a=0,i=this.count;a<i;a++)u2.fromBufferAttribute(this,a),u2.applyMatrix4(t),this.setXYZ(a,u2.x,u2.y,u2.z);return this}applyNormalMatrix(t){for(let a=0,i=this.count;a<i;a++)u2.fromBufferAttribute(this,a),u2.applyNormalMatrix(t),this.setXYZ(a,u2.x,u2.y,u2.z);return this}transformDirection(t){for(let a=0,i=this.count;a<i;a++)u2.fromBufferAttribute(this,a),u2.transformDirection(t),this.setXYZ(a,u2.x,u2.y,u2.z);return this}set(t,a=0){return this.array.set(t,a),this}getComponent(t,a){let i=this.array[t*this.itemSize+a];return this.normalized&&(i=Zh(i,this.array)),i}setComponent(t,a,i){return this.normalized&&(i=oe(i,this.array)),this.array[t*this.itemSize+a]=i,this}getX(t){let a=this.array[t*this.itemSize];return this.normalized&&(a=Zh(a,this.array)),a}setX(t,a){return this.normalized&&(a=oe(a,this.array)),this.array[t*this.itemSize]=a,this}getY(t){let a=this.array[t*this.itemSize+1];return this.normalized&&(a=Zh(a,this.array)),a}setY(t,a){return this.normalized&&(a=oe(a,this.array)),this.array[t*this.itemSize+1]=a,this}getZ(t){let a=this.array[t*this.itemSize+2];return this.normalized&&(a=Zh(a,this.array)),a}setZ(t,a){return this.normalized&&(a=oe(a,this.array)),this.array[t*this.itemSize+2]=a,this}getW(t){let a=this.array[t*this.itemSize+3];return this.normalized&&(a=Zh(a,this.array)),a}setW(t,a){return this.normalized&&(a=oe(a,this.array)),this.array[t*this.itemSize+3]=a,this}setXY(t,a,i){return t*=this.itemSize,this.normalized&&(a=oe(a,this.array),i=oe(i,this.array)),this.array[t+0]=a,this.array[t+1]=i,this}setXYZ(t,a,i,r){return t*=this.itemSize,this.normalized&&(a=oe(a,this.array),i=oe(i,this.array),r=oe(r,this.array)),this.array[t+0]=a,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,a,i,r,n){return t*=this.itemSize,this.normalized&&(a=oe(a,this.array),i=oe(i,this.array),r=oe(r,this.array),n=oe(n,this.array)),this.array[t+0]=a,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=n,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}},cc=class extends A2{constructor(t,a,i){super(new Uint16Array(t),a,i)}},oc=class extends A2{constructor(t,a,i){super(new Uint32Array(t),a,i)}},de=class extends A2{constructor(t,a,i){super(new Float32Array(t),a,i)}},wk=new lr,Jh=new U,Fv=new U,z0=class{constructor(t=new U,a=-1){this.isSphere=!0,this.center=t,this.radius=a}set(t,a){return this.center.copy(t),this.radius=a,this}setFromPoints(t,a){let i=this.center;a!==void 0?i.copy(a):wk.setFromPoints(t).getCenter(i);let r=0;for(let n=0,h=t.length;n<h;n++)r=Math.max(r,i.distanceToSquared(t[n]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let a=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=a*a}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,a){let i=this.center.distanceToSquared(t);return a.copy(t),i>this.radius*this.radius&&(a.sub(this.center).normalize(),a.multiplyScalar(this.radius).add(this.center)),a}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Jh.subVectors(t,this.center);let a=Jh.lengthSq();if(a>this.radius*this.radius){let i=Math.sqrt(a),r=(i-this.radius)*.5;this.center.addScaledVector(Jh,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fv.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Jh.copy(t.center).add(Fv)),this.expandByPoint(Jh.copy(t.center).sub(Fv))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},yk=0,Ke=new e2,Wv=new ke,Jn=new U,Be=new lr,Qh=new lr,w2=new U,Je=class e extends _a{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yk++}),this.uuid=kc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dk(t)?oc:cc)(t,1):this.index=t,this}setIndirect(t,a=0){return this.indirect=t,this.indirectOffset=a,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,a){return this.attributes[t]=a,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,a,i=0){this.groups.push({start:t,count:a,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,a){this.drawRange.start=t,this.drawRange.count=a}applyMatrix4(t){let a=this.attributes.position;a!==void 0&&(a.applyMatrix4(t),a.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let n=new Wt().getNormalMatrix(t);i.applyNormalMatrix(n),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,a,i){return Ke.makeTranslation(t,a,i),this.applyMatrix4(Ke),this}scale(t,a,i){return Ke.makeScale(t,a,i),this.applyMatrix4(Ke),this}lookAt(t){return Wv.lookAt(t),Wv.updateMatrix(),this.applyMatrix4(Wv.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jn).negate(),this.translate(Jn.x,Jn.y,Jn.z),this}setFromPoints(t){let a=this.getAttribute("position");if(a===void 0){let i=[];for(let r=0,n=t.length;r<n;r++){let h=t[r];i.push(h.x,h.y,h.z||0)}this.setAttribute("position",new de(i,3))}else{let i=Math.min(t.length,a.count);for(let r=0;r<i;r++){let n=t[r];a.setXYZ(r,n.x,n.y,n.z||0)}t.length>a.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),a.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lr);let t=this.attributes.position,a=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),a)for(let i=0,r=a.length;i<r;i++){let n=a[i];Be.setFromBufferAttribute(n),this.morphTargetsRelative?(w2.addVectors(this.boundingBox.min,Be.min),this.boundingBox.expandByPoint(w2),w2.addVectors(this.boundingBox.max,Be.max),this.boundingBox.expandByPoint(w2)):(this.boundingBox.expandByPoint(Be.min),this.boundingBox.expandByPoint(Be.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new z0);let t=this.attributes.position,a=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let i=this.boundingSphere.center;if(Be.setFromBufferAttribute(t),a)for(let n=0,h=a.length;n<h;n++){let c=a[n];Qh.setFromBufferAttribute(c),this.morphTargetsRelative?(w2.addVectors(Be.min,Qh.min),Be.expandByPoint(w2),w2.addVectors(Be.max,Qh.max),Be.expandByPoint(w2)):(Be.expandByPoint(Qh.min),Be.expandByPoint(Qh.max))}Be.getCenter(i);let r=0;for(let n=0,h=t.count;n<h;n++)w2.fromBufferAttribute(t,n),r=Math.max(r,i.distanceToSquared(w2));if(a)for(let n=0,h=a.length;n<h;n++){let c=a[n],o=this.morphTargetsRelative;for(let l=0,v=c.count;l<v;l++)w2.fromBufferAttribute(c,l),o&&(Jn.fromBufferAttribute(t,l),w2.add(Jn)),r=Math.max(r,i.distanceToSquared(w2))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,a=this.attributes;if(t===null||a.position===void 0||a.normal===void 0||a.uv===void 0){Nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=a.position,r=a.normal,n=a.uv,h=this.getAttribute("tangent");(h===void 0||h.count!==i.count)&&(h=new A2(new Float32Array(4*i.count),4),this.setAttribute("tangent",h));let c=[],o=[];for(let H=0;H<i.count;H++)c[H]=new U,o[H]=new U;let l=new U,v=new U,g=new U,d=new h1,u=new h1,p=new h1,x=new U,f=new U;function s(H,B,S){l.fromBufferAttribute(i,H),v.fromBufferAttribute(i,B),g.fromBufferAttribute(i,S),d.fromBufferAttribute(n,H),u.fromBufferAttribute(n,B),p.fromBufferAttribute(n,S),v.sub(l),g.sub(l),u.sub(d),p.sub(d);let E=1/(u.x*p.y-p.x*u.y);isFinite(E)&&(x.copy(v).multiplyScalar(p.y).addScaledVector(g,-u.y).multiplyScalar(E),f.copy(g).multiplyScalar(u.x).addScaledVector(v,-p.x).multiplyScalar(E),c[H].add(x),c[B].add(x),c[S].add(x),o[H].add(f),o[B].add(f),o[S].add(f))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let H=0,B=M.length;H<B;++H){let S=M[H],E=S.start,O=S.count;for(let R=E,b=E+O;R<b;R+=3)s(t.getX(R+0),t.getX(R+1),t.getX(R+2))}let L=new U,m=new U,w=new U,y=new U;function C(H){w.fromBufferAttribute(r,H),y.copy(w);let B=c[H];L.copy(B),L.sub(w.multiplyScalar(w.dot(B))).normalize(),m.crossVectors(y,B);let E=m.dot(o[H])<0?-1:1;h.setXYZW(H,L.x,L.y,L.z,E)}for(let H=0,B=M.length;H<B;++H){let S=M[H],E=S.start,O=S.count;for(let R=E,b=E+O;R<b;R+=3)C(t.getX(R+0)),C(t.getX(R+1)),C(t.getX(R+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,a=this.getAttribute("position");if(a!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==a.count)i=new A2(new Float32Array(a.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);let r=new U,n=new U,h=new U,c=new U,o=new U,l=new U,v=new U,g=new U;if(t)for(let d=0,u=t.count;d<u;d+=3){let p=t.getX(d+0),x=t.getX(d+1),f=t.getX(d+2);r.fromBufferAttribute(a,p),n.fromBufferAttribute(a,x),h.fromBufferAttribute(a,f),v.subVectors(h,n),g.subVectors(r,n),v.cross(g),c.fromBufferAttribute(i,p),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,f),c.add(v),o.add(v),l.add(v),i.setXYZ(p,c.x,c.y,c.z),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,u=a.count;d<u;d+=3)r.fromBufferAttribute(a,d+0),n.fromBufferAttribute(a,d+1),h.fromBufferAttribute(a,d+2),v.subVectors(h,n),g.subVectors(r,n),v.cross(g),i.setXYZ(d+0,v.x,v.y,v.z),i.setXYZ(d+1,v.x,v.y,v.z),i.setXYZ(d+2,v.x,v.y,v.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let a=0,i=t.count;a<i;a++)w2.fromBufferAttribute(t,a),w2.normalize(),t.setXYZ(a,w2.x,w2.y,w2.z)}toNonIndexed(){function t(c,o){let l=c.array,v=c.itemSize,g=c.normalized,d=new l.constructor(o.length*v),u=0,p=0;for(let x=0,f=o.length;x<f;x++){c.isInterleavedBufferAttribute?u=o[x]*c.data.stride+c.offset:u=o[x]*v;for(let s=0;s<v;s++)d[p++]=l[u++]}return new A2(d,v,g)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let a=new e,i=this.index.array,r=this.attributes;for(let c in r){let o=r[c],l=t(o,i);a.setAttribute(c,l)}let n=this.morphAttributes;for(let c in n){let o=[],l=n[c];for(let v=0,g=l.length;v<g;v++){let d=l[v],u=t(d,i);o.push(u)}a.morphAttributes[c]=o}a.morphTargetsRelative=this.morphTargetsRelative;let h=this.groups;for(let c=0,o=h.length;c<o;c++){let l=h[c];a.addGroup(l.start,l.count,l.materialIndex)}return a}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let l in o)o[l]!==void 0&&(t[l]=o[l]);return t}t.data={attributes:{}};let a=this.index;a!==null&&(t.data.index={type:a.array.constructor.name,array:Array.prototype.slice.call(a.array)});let i=this.attributes;for(let o in i){let l=i[o];t.data.attributes[o]=l.toJSON(t.data)}let r={},n=!1;for(let o in this.morphAttributes){let l=this.morphAttributes[o],v=[];for(let g=0,d=l.length;g<d;g++){let u=l[g];v.push(u.toJSON(t.data))}v.length>0&&(r[o]=v,n=!0)}n&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));let c=this.boundingSphere;return c!==null&&(t.data.boundingSphere=c.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let a={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let r=t.attributes;for(let l in r){let v=r[l];this.setAttribute(l,v.clone(a))}let n=t.morphAttributes;for(let l in n){let v=[],g=n[l];for(let d=0,u=g.length;d<u;d++)v.push(g[d].clone(a));this.morphAttributes[l]=v}this.morphTargetsRelative=t.morphTargetsRelative;let h=t.groups;for(let l=0,v=h.length;l<v;l++){let g=h[l];this.addGroup(g.start,g.count,g.materialIndex)}let c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());let o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gv=new U,Bk=new U,Ck=new Wt,la=class{constructor(t=new U(1,0,0),a=0){this.isPlane=!0,this.normal=t,this.constant=a}set(t,a){return this.normal.copy(t),this.constant=a,this}setComponents(t,a,i,r){return this.normal.set(t,a,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,a){return this.normal.copy(t),this.constant=-a.dot(this.normal),this}setFromCoplanarPoints(t,a,i){let r=Gv.subVectors(i,a).cross(Bk.subVectors(t,a)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,a){return a.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,a,i=!0){let r=t.delta(Gv),n=this.normal.dot(r);if(n===0)return this.distanceToPoint(t.start)===0?a.copy(t.start):null;let h=-(t.start.dot(this.normal)+this.constant)/n;return i===!0&&(h<0||h>1)?null:a.copy(t.start).addScaledVector(r,h)}intersectsLine(t){let a=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return a<0&&i>0||i<0&&a>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,a){let i=a||Ck.getNormalMatrix(t),r=this.coplanarPoint(Gv).applyMatrix4(t),n=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(n),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},kk=0,dr=class extends _a{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kk++}),this.uuid=kc(),this.name="",this.type="Material",this.blending=Ea,this.side=fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ru,this.blendDst=nu,this.blendEquation=H0,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=a4,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=NH,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=G5,this.stencilZFail=G5,this.stencilZPass=G5,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let a in t){let i=t[a];if(i===void 0){It(`Material: parameter '${a}' has value of undefined.`);continue}let r=this[a];if(r===void 0){It(`Material: '${a}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[a]=i}}toJSON(t){let a=t===void 0||typeof t=="string";a&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(n=>n.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(n){let h=[];for(let c in n){let o=n[c];delete o.metadata,h.push(o)}return h}if(a){let n=r(t.textures),h=r(t.images);n.length>0&&(i.textures=n),h.length>0&&(i.images=h)}return i}fromJSON(t,a){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new $t().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new la().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=a[t.map]||null),t.matcap!==void 0&&(this.matcap=a[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=a[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=a[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=a[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new h1().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=a[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=a[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=a[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=a[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=a[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=a[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=a[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=a[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=a[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=a[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=a[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=a[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=a[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=a[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new h1().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=a[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=a[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=a[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=a[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=a[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=a[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=a[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let a=t.clippingPlanes,i=null;if(a!==null){let r=a.length;i=new Array(r);for(let n=0;n!==r;++n)i[n]=a[n].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},fi=new U,jv=new U,S5=new U,b5=new U,lc=class{constructor(t=new U,a=new U(0,0,-1)){this.origin=t,this.direction=a}set(t,a){return this.origin.copy(t),this.direction.copy(a),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,a){return a.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fi)),this}closestPointToPoint(t,a){a.subVectors(t,this.origin);let i=a.dot(this.direction);return i<0?a.copy(this.origin):a.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let a=fi.subVectors(t,this.origin).dot(this.direction);return a<0?this.origin.distanceToSquared(t):(fi.copy(this.origin).addScaledVector(this.direction,a),fi.distanceToSquared(t))}distanceSqToSegment(t,a,i,r){jv.copy(t).add(a).multiplyScalar(.5),S5.copy(a).sub(t).normalize(),b5.copy(this.origin).sub(jv);let n=t.distanceTo(a)*.5,h=-this.direction.dot(S5),c=b5.dot(this.direction),o=-b5.dot(S5),l=b5.lengthSq(),v=Math.abs(1-h*h),g,d,u,p;if(v>0)if(g=h*o-c,d=h*c-o,p=n*v,g>=0)if(d>=-p)if(d<=p){let x=1/v;g*=x,d*=x,u=g*(g+h*d+2*c)+d*(h*g+d+2*o)+l}else d=n,g=Math.max(0,-(h*d+c)),u=-g*g+d*(d+2*o)+l;else d=-n,g=Math.max(0,-(h*d+c)),u=-g*g+d*(d+2*o)+l;else d<=-p?(g=Math.max(0,-(-h*n+c)),d=g>0?-n:Math.min(Math.max(-n,-o),n),u=-g*g+d*(d+2*o)+l):d<=p?(g=0,d=Math.min(Math.max(-n,-o),n),u=d*(d+2*o)+l):(g=Math.max(0,-(h*n+c)),d=g>0?n:Math.min(Math.max(-n,-o),n),u=-g*g+d*(d+2*o)+l);else d=h>0?-n:n,g=Math.max(0,-(h*d+c)),u=-g*g+d*(d+2*o)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,g),r&&r.copy(jv).addScaledVector(S5,d),u}intersectSphere(t,a){if(t.radius<0)return null;fi.subVectors(t.center,this.origin);let i=fi.dot(this.direction),r=fi.dot(fi)-i*i,n=t.radius*t.radius;if(r>n)return null;let h=Math.sqrt(n-r),c=i-h,o=i+h;return o<0?null:c<0?this.at(o,a):this.at(c,a)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let a=t.normal.dot(this.direction);if(a===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/a;return i>=0?i:null}intersectPlane(t,a){let i=this.distanceToPlane(t);return i===null?null:this.at(i,a)}intersectsPlane(t){let a=t.distanceToPoint(this.origin);return a===0||t.normal.dot(this.direction)*a<0}intersectBox(t,a){let i,r,n,h,c,o,l=1/this.direction.x,v=1/this.direction.y,g=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),v>=0?(n=(t.min.y-d.y)*v,h=(t.max.y-d.y)*v):(n=(t.max.y-d.y)*v,h=(t.min.y-d.y)*v),i>h||n>r||((n>i||isNaN(i))&&(i=n),(h<r||isNaN(r))&&(r=h),g>=0?(c=(t.min.z-d.z)*g,o=(t.max.z-d.z)*g):(c=(t.max.z-d.z)*g,o=(t.min.z-d.z)*g),i>o||c>r)||((c>i||i!==i)&&(i=c),(o<r||r!==r)&&(r=o),r<0)?null:this.at(i>=0?i:r,a)}intersectsBox(t){return this.intersectBox(t,fi)!==null}intersectTriangle(t,a,i,r,n){let h=this.origin,c=this.direction,o=c.x,l=c.y,v=c.z,g=t.x-h.x,d=t.y-h.y,u=t.z-h.z,p=a.x-h.x,x=a.y-h.y,f=a.z-h.z,s=i.x-h.x,M=i.y-h.y,L=i.z-h.z,m=Math.abs(o),w=Math.abs(l),y=Math.abs(v),C,H,B,S,E,O,R,b,I,q,X,j;if(m>=w&&m>=y?(B=o,O=g,I=p,j=s,o>=0?(C=l,H=v,S=d,E=u,R=x,b=f,q=M,X=L):(C=v,H=l,S=u,E=d,R=f,b=x,q=L,X=M)):w>=y?(B=l,O=d,I=x,j=M,l>=0?(C=v,H=o,S=u,E=g,R=f,b=p,q=L,X=s):(C=o,H=v,S=g,E=u,R=p,b=f,q=s,X=L)):(B=v,O=u,I=f,j=L,v>=0?(C=o,H=l,S=g,E=d,R=p,b=x,q=s,X=M):(C=l,H=o,S=d,E=g,R=x,b=p,q=M,X=s)),B===0)return null;let W=C/B,K=H/B,et=1/B,Ot=S-W*O,St=E-K*O,f1=R-W*I,t1=b-K*I,l1=q-W*j,Z=X-K*j,tt=l1*t1-Z*f1,xt=Ot*Z-St*l1,ht=f1*St-t1*Ot;if(r){if(tt<0||xt<0||ht<0)return null}else if((tt<0||xt<0||ht<0)&&(tt>0||xt>0||ht>0))return null;let nt=tt+xt+ht;if(nt===0)return null;let Ct=et*(tt*O+xt*I+ht*j);return(nt>0?Ct<0:Ct>0)?null:this.at(Ct/nt,n)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},dc=class extends dr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cr,this.combine=hu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},iH=new e2,p0=new lc,_5=new z0,rH=new U,A5=new U,T5=new U,O5=new U,Xv=new U,E5=new U,nH=new U,R5=new U,G2=class extends ke{constructor(t=new Je,a=new dc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=a,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,a){return super.copy(t,a),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let a=this.geometry.morphAttributes,i=Object.keys(a);if(i.length>0){let r=a[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,h=r.length;n<h;n++){let c=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=n}}}}getVertexPosition(t,a){let i=this.geometry,r=i.attributes.position,n=i.morphAttributes.position,h=i.morphTargetsRelative;a.fromBufferAttribute(r,t);let c=this.morphTargetInfluences;if(n&&c){E5.set(0,0,0);for(let o=0,l=n.length;o<l;o++){let v=c[o],g=n[o];v!==0&&(Xv.fromBufferAttribute(g,t),h?E5.addScaledVector(Xv,v):E5.addScaledVector(Xv.sub(a),v))}a.add(E5)}return a}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,a){let i=this.geometry,r=this.material,n=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_5.copy(i.boundingSphere),_5.applyMatrix4(n),p0.copy(t.ray).recast(t.near),!(_5.containsPoint(p0.origin)===!1&&(p0.intersectSphere(_5,rH)===null||p0.origin.distanceToSquared(rH)>(t.far-t.near)**2))&&(iH.copy(n).invert(),p0.copy(t.ray).applyMatrix4(iH),!(i.boundingBox!==null&&p0.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,a,p0)))}_computeIntersections(t,a,i){let r,n=this.geometry,h=this.material,c=n.index,o=n.attributes.position,l=n.attributes.uv,v=n.attributes.uv1,g=n.attributes.normal,d=n.groups,u=n.drawRange;if(c!==null)if(Array.isArray(h))for(let p=0,x=d.length;p<x;p++){let f=d[p],s=h[f.materialIndex],M=Math.max(f.start,u.start),L=Math.min(c.count,Math.min(f.start+f.count,u.start+u.count));for(let m=M,w=L;m<w;m+=3){let y=c.getX(m),C=c.getX(m+1),H=c.getX(m+2);r=D5(this,s,t,i,l,v,g,y,C,H),r&&(r.faceIndex=Math.floor(m/3),r.face.materialIndex=f.materialIndex,a.push(r))}}else{let p=Math.max(0,u.start),x=Math.min(c.count,u.start+u.count);for(let f=p,s=x;f<s;f+=3){let M=c.getX(f),L=c.getX(f+1),m=c.getX(f+2);r=D5(this,h,t,i,l,v,g,M,L,m),r&&(r.faceIndex=Math.floor(f/3),a.push(r))}}else if(o!==void 0)if(Array.isArray(h))for(let p=0,x=d.length;p<x;p++){let f=d[p],s=h[f.materialIndex],M=Math.max(f.start,u.start),L=Math.min(o.count,Math.min(f.start+f.count,u.start+u.count));for(let m=M,w=L;m<w;m+=3){let y=m,C=m+1,H=m+2;r=D5(this,s,t,i,l,v,g,y,C,H),r&&(r.faceIndex=Math.floor(m/3),r.face.materialIndex=f.materialIndex,a.push(r))}}else{let p=Math.max(0,u.start),x=Math.min(o.count,u.start+u.count);for(let f=p,s=x;f<s;f+=3){let M=f,L=f+1,m=f+2;r=D5(this,h,t,i,l,v,g,M,L,m),r&&(r.faceIndex=Math.floor(f/3),a.push(r))}}}};nd=class extends se{constructor(t=null,a=1,i=1,r,n,h,c,o,l=y2,v=y2,g,d){super(null,h,c,o,l,v,r,n,g,d),this.isDataTexture=!0,this.image={data:t,width:a,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},sc=class extends A2{constructor(t,a,i,r=1){super(t,a,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},f0=new z0,bk=new h1(.5,.5),I5=new U,vc=class{constructor(t=new la,a=new la,i=new la,r=new la,n=new la,h=new la){this.planes=[t,a,i,r,n,h]}set(t,a,i,r,n,h){let c=this.planes;return c[0].copy(t),c[1].copy(a),c[2].copy(i),c[3].copy(r),c[4].copy(n),c[5].copy(h),this}copy(t){let a=this.planes;for(let i=0;i<6;i++)a[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,a=da,i=!1){let r=this.planes,n=t.elements,h=n[0],c=n[1],o=n[2],l=n[3],v=n[4],g=n[5],d=n[6],u=n[7],p=n[8],x=n[9],f=n[10],s=n[11],M=n[12],L=n[13],m=n[14],w=n[15];if(r[0].setComponents(l-h,u-v,s-p,w-M).normalize(),r[1].setComponents(l+h,u+v,s+p,w+M).normalize(),r[2].setComponents(l+c,u+g,s+x,w+L).normalize(),r[3].setComponents(l-c,u-g,s-x,w-L).normalize(),i)r[4].setComponents(o,d,f,m).normalize(),r[5].setComponents(l-o,u-d,s-f,w-m).normalize();else if(r[4].setComponents(l-o,u-d,s-f,w-m).normalize(),a===da)r[5].setComponents(l+o,u+d,s+f,w+m).normalize();else if(a===ic)r[5].setComponents(o,d,f,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+a);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),f0.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let a=t.geometry;a.boundingSphere===null&&a.computeBoundingSphere(),f0.copy(a.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(f0)}intersectsSprite(t){f0.center.set(0,0,0);let a=bk.distanceTo(t.center);return f0.radius=.7071067811865476+a,f0.applyMatrix4(t.matrixWorld),this.intersectsSphere(f0)}intersectsSphere(t){let a=this.planes,i=t.center,r=-t.radius;for(let n=0;n<6;n++)if(a[n].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let a=this.planes;for(let i=0;i<6;i++){let r=a[i];if(I5.x=r.normal.x>0?t.max.x:t.min.x,I5.y=r.normal.y>0?t.max.y:t.min.y,I5.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(I5)<0)return!1}return!0}containsPoint(t){let a=this.planes;for(let i=0;i<6;i++)if(a[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},hd=class extends dr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},cd=new U,od=new U,hH=new e2,$h=new lc,P5=new z0,qv=new U,cH=new U,ld=class extends ke{constructor(t=new Je,a=new hd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=a,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,a){return super.copy(t,a),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let a=t.attributes.position,i=[0];for(let r=1,n=a.count;r<n;r++)cd.fromBufferAttribute(a,r-1),od.fromBufferAttribute(a,r),i[r]=i[r-1],i[r]+=cd.distanceTo(od);t.setAttribute("lineDistance",new de(i,1))}else It("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,a){let i=this.geometry,r=this.matrixWorld,n=t.params.Line.threshold,h=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),P5.copy(i.boundingSphere),P5.applyMatrix4(r),P5.radius+=n,t.ray.intersectsSphere(P5)===!1)return;hH.copy(r).invert(),$h.copy(t.ray).applyMatrix4(hH);let c=n/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,v=i.index,d=i.attributes.position;if(v!==null){let u=Math.max(0,h.start),p=Math.min(v.count,h.start+h.count);for(let x=u,f=p-1;x<f;x+=l){let s=v.getX(x),M=v.getX(x+1),L=N5(this,t,$h,o,s,M,x);L&&a.push(L)}if(this.isLineLoop){let x=v.getX(p-1),f=v.getX(u),s=N5(this,t,$h,o,x,f,p-1);s&&a.push(s)}}else{let u=Math.max(0,h.start),p=Math.min(d.count,h.start+h.count);for(let x=u,f=p-1;x<f;x+=l){let s=N5(this,t,$h,o,x,x+1,x);s&&a.push(s)}if(this.isLineLoop){let x=N5(this,t,$h,o,p-1,u,p-1);x&&a.push(x)}}}updateMorphTargets(){let a=this.geometry.morphAttributes,i=Object.keys(a);if(i.length>0){let r=a[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,h=r.length;n<h;n++){let c=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=n}}}}};oH=new U,lH=new U,h4=class extends ld{constructor(t,a){super(t,a),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let a=t.attributes.position,i=[];for(let r=0,n=a.count;r<n;r+=2)oH.fromBufferAttribute(a,r),lH.fromBufferAttribute(a,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+oH.distanceTo(lH);t.setAttribute("lineDistance",new de(i,1))}else It("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},uc=class extends se{constructor(t=[],a=Mr,i,r,n,h,c,o,l,v){super(t,a,i,r,n,h,c,o,l,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},sr=class extends se{constructor(t,a,i=va,r,n,h,c=y2,o=y2,l,v=ba,g=1){if(v!==ba&&v!==zr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:a,depth:g};super(d,r,n,h,c,o,v,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new r4(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let a=super.toJSON(t);return a.compareFunction=this.compareFunction,a}},dd=class extends sr{constructor(t,a=va,i=Mr,r,n,h=y2,c=y2,o,l=ba){let v={width:t,height:t,depth:1},g=[v,v,v,v,v,v];super(t,t,a,i,r,n,h,c,o,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},gc=class extends se{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},c4=class e extends Je{constructor(t=1,a=1,i=1,r=1,n=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:a,depth:i,widthSegments:r,heightSegments:n,depthSegments:h};let c=this;r=Math.floor(r),n=Math.floor(n),h=Math.floor(h);let o=[],l=[],v=[],g=[],d=0,u=0;p("z","y","x",-1,-1,i,a,t,h,n,0),p("z","y","x",1,-1,i,a,-t,h,n,1),p("x","z","y",1,1,t,i,a,r,h,2),p("x","z","y",1,-1,t,i,-a,r,h,3),p("x","y","z",1,-1,t,a,i,r,n,4),p("x","y","z",-1,-1,t,a,-i,r,n,5),this.setIndex(o),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(v,3)),this.setAttribute("uv",new de(g,2));function p(x,f,s,M,L,m,w,y,C,H,B){let S=m/C,E=w/H,O=m/2,R=w/2,b=y/2,I=C+1,q=H+1,X=0,j=0,W=new U;for(let K=0;K<q;K++){let et=K*E-R;for(let Ot=0;Ot<I;Ot++){let St=Ot*S-O;W[x]=St*M,W[f]=et*L,W[s]=b,l.push(W.x,W.y,W.z),W[x]=0,W[f]=0,W[s]=y>0?1:-1,v.push(W.x,W.y,W.z),g.push(Ot/C),g.push(1-K/H),X+=1}}for(let K=0;K<H;K++)for(let et=0;et<C;et++){let Ot=d+et+I*K,St=d+et+I*(K+1),f1=d+(et+1)+I*(K+1),t1=d+(et+1)+I*K;o.push(Ot,St,t1),o.push(St,f1,t1),j+=6}c.addGroup(u,j,B),u+=j,d+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},x0=class e extends Je{constructor(t=1,a=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:a,widthSegments:i,heightSegments:r};let n=t/2,h=a/2,c=Math.floor(i),o=Math.floor(r),l=c+1,v=o+1,g=t/c,d=a/o,u=[],p=[],x=[],f=[];for(let s=0;s<v;s++){let M=s*d-h;for(let L=0;L<l;L++){let m=L*g-n;p.push(m,-M,0),x.push(0,0,1),f.push(L/c),f.push(1-s/o)}}for(let s=0;s<o;s++)for(let M=0;M<c;M++){let L=M+l*s,m=M+l*(s+1),w=M+1+l*(s+1),y=M+1+l*s;u.push(L,m,y),u.push(m,w,y)}this.setIndex(u),this.setAttribute("position",new de(p,3)),this.setAttribute("normal",new de(x,3)),this.setAttribute("uv",new de(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};$H={clone:w0,merge:j2},Ak=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tk=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Se=class extends dr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ak,this.fragmentShader=Tk,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=w0(t.uniforms),this.uniformsGroups=_k(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let a=super.toJSON(t);a.glslVersion=this.glslVersion,a.uniforms={};for(let r in this.uniforms){let h=this.uniforms[r].value;h&&h.isTexture?a.uniforms[r]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?a.uniforms[r]={type:"c",value:h.getHex()}:h&&h.isVector2?a.uniforms[r]={type:"v2",value:h.toArray()}:h&&h.isVector3?a.uniforms[r]={type:"v3",value:h.toArray()}:h&&h.isVector4?a.uniforms[r]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?a.uniforms[r]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?a.uniforms[r]={type:"m4",value:h.toArray()}:a.uniforms[r]={value:h}}Object.keys(this.defines).length>0&&(a.defines=this.defines),a.vertexShader=this.vertexShader,a.fragmentShader=this.fragmentShader,a.lights=this.lights,a.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(a.extensions=i),a}fromJSON(t,a){if(super.fromJSON(t,a),t.uniforms!==void 0)for(let i in t.uniforms){let r=t.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=a[r.value]||null;break;case"c":this.uniforms[i].value=new $t().setHex(r.value);break;case"v2":this.uniforms[i].value=new h1().fromArray(r.value);break;case"v3":this.uniforms[i].value=new U().fromArray(r.value);break;case"v4":this.uniforms[i].value=new q1().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Wt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new e2().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},vr=class extends Se{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},sd=class extends dr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=IH,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},vd=class extends dr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};ur=class{constructor(t,a,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new a.constructor(i),this.sampleValues=a,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let a=this.parameterPositions,i=this._cachedIndex,r=a[i],n=a[i-1];t:{e:{let h;a:{i:if(!(t<r)){for(let c=i+2;;){if(r===void 0){if(t<n)break i;return i=a.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===c)break;if(n=r,r=a[++i],t<r)break e}h=a.length;break a}if(!(t>=n)){let c=a[1];t<c&&(i=2,n=c);for(let o=i-2;;){if(n===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(r=n,n=a[--i-1],t>=n)break e}h=i,i=0;break a}break t}for(;i<h;){let c=i+h>>>1;t<a[c]?h=c:i=c+1}if(r=a[i],n=a[i-1],n===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=a.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,n,r)}return this.interpolate_(i,n,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let a=this.resultBuffer,i=this.sampleValues,r=this.valueSize,n=t*r;for(let h=0;h!==r;++h)a[h]=i[n+h];return a}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ud=class extends ur{constructor(t,a,i,r){super(t,a,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kv,endingEnd:Kv}}intervalChanged_(t,a,i){let r=this.parameterPositions,n=t-2,h=t+1,c=r[n],o=r[h];if(c===void 0)switch(this.getSettings_().endingStart){case Jv:n=t,c=2*a-i;break;case Qv:n=r.length-2,c=a+r[n]-r[n+1];break;default:n=t,c=i}if(o===void 0)switch(this.getSettings_().endingEnd){case Jv:h=t,o=2*i-a;break;case Qv:h=1,o=i+r[1]-r[0];break;default:h=t-1,o=a}let l=(i-a)*.5,v=this.valueSize;this._weightPrev=l/(a-c),this._weightNext=l/(o-i),this._offsetPrev=n*v,this._offsetNext=h*v}interpolate_(t,a,i,r){let n=this.resultBuffer,h=this.sampleValues,c=this.valueSize,o=t*c,l=o-c,v=this._offsetPrev,g=this._offsetNext,d=this._weightPrev,u=this._weightNext,p=(i-a)/(r-a),x=p*p,f=x*p,s=-d*f+2*d*x-d*p,M=(1+d)*f+(-1.5-2*d)*x+(-.5+d)*p+1,L=(-1-u)*f+(1.5+u)*x+.5*p,m=u*f-u*x;for(let w=0;w!==c;++w)n[w]=s*h[v+w]+M*h[l+w]+L*h[o+w]+m*h[g+w];return n}},gd=class extends ur{constructor(t,a,i,r){super(t,a,i,r)}interpolate_(t,a,i,r){let n=this.resultBuffer,h=this.sampleValues,c=this.valueSize,o=t*c,l=o-c,v=(i-a)/(r-a),g=1-v;for(let d=0;d!==c;++d)n[d]=h[l+d]*g+h[o+d]*v;return n}},pd=class extends ur{constructor(t,a,i,r){super(t,a,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},fd=class extends ur{interpolate_(t,a,i,r){let n=this.resultBuffer,h=this.sampleValues,c=this.valueSize,o=t*c,l=o-c,v=this.inTangents,g=this.outTangents;if(!v||!g){let p=(i-a)/(r-a),x=1-p;for(let f=0;f!==c;++f)n[f]=h[l+f]*x+h[o+f]*p;return n}let d=c*2,u=t-1;for(let p=0;p!==c;++p){let x=h[l+p],f=h[o+p],s=u*d+p*2,M=g[s],L=g[s+1],m=t*d+p*2,w=v[m],y=v[m+1],C=Ek(i,a,M,w,r);n[p]=tL(C,x,L,y,f)}return n}};be=class{constructor(t,a,i,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(a===void 0||a.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qn(a,this.TimeBufferType),this.values=Qn(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let a=t.constructor,i;if(a.toJSON!==this.toJSON)i=a.toJSON(t);else{i={name:t.name,times:Qn(t.times,Array),values:Qn(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r),Zv(t.settings)&&(i.settings={inTangents:Qn(t.settings.inTangents,Array),outTangents:Qn(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new pd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new gd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ud(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let a=new fd(this.times,this.values,this.getValueSize(),t);return this.settings&&(a.inTangents=this.settings.inTangents,a.outTangents=this.settings.outTangents),a}setInterpolation(t){let a;switch(t){case tc:a=this.InterpolantFactoryMethodDiscrete;break;case td:a=this.InterpolantFactoryMethodLinear;break;case W5:a=this.InterpolantFactoryMethodSmooth;break;case Yv:a=this.InterpolantFactoryMethodBezier;break}if(a===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return It("KeyframeTrack:",i),this}return this.createInterpolant=a,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tc;case this.InterpolantFactoryMethodLinear:return td;case this.InterpolantFactoryMethodSmooth:return W5;case this.InterpolantFactoryMethodBezier:return Yv}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let a=this.times;for(let i=0,r=a.length;i!==r;++i)a[i]+=t}return this}scale(t){if(t!==1){let a=this.times;for(let i=0,r=a.length;i!==r;++i)a[i]*=t;Zv(this.settings)&&(sH(this.settings.inTangents,t),sH(this.settings.outTangents,t))}return this}trim(t,a){let i=this.times,r=i.length,n=0,h=r-1;for(;n!==r&&i[n]<t;)++n;for(;h!==-1&&i[h]>a;)--h;if(++h,n!==0||h!==r){n>=h&&(h=Math.max(h,1),n=h-1);let c=this.getValueSize();this.times=i.slice(n,h),this.values=this.values.slice(n*c,h*c)}return this}validate(){let t=!0,a=this.getValueSize();a-Math.floor(a)!==0&&(Nt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,n=i.length;n===0&&(Nt("KeyframeTrack: Track is empty.",this),t=!1);let h=null;for(let c=0;c!==n;c++){let o=i[c];if(typeof o=="number"&&isNaN(o)){Nt("KeyframeTrack: Time is not a valid number.",this,c,o),t=!1;break}if(h!==null&&h>o){Nt("KeyframeTrack: Out of order keys.",this,c,o,h),t=!1;break}h=o}if(r!==void 0&&sk(r))for(let c=0,o=r.length;c!==o;++c){let l=r[c];if(isNaN(l)){Nt("KeyframeTrack: Value is not a valid number.",this,c,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),a=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===W5,n=t.length-1,h=1;for(let c=1;c<n;++c){let o=!1,l=t[c],v=t[c+1];if(l!==v&&(c!==1||l!==t[0]))if(r)o=!0;else{let g=c*i,d=g-i,u=g+i;for(let p=0;p!==i;++p){let x=a[g+p];if(x!==a[d+p]||x!==a[u+p]){o=!0;break}}}if(o){if(c!==h){t[h]=t[c];let g=c*i,d=h*i;for(let u=0;u!==i;++u)a[d+u]=a[g+u]}++h}}if(n>0){t[h]=t[n];for(let c=n*i,o=h*i,l=0;l!==i;++l)a[o+l]=a[c+l];++h}return h!==t.length?(this.times=t.slice(0,h),this.values=a.slice(0,h*i)):(this.times=t,this.values=a),this}clone(){let t=this.times.slice(),a=this.values.slice(),i=this.constructor,r=new i(this.name,t,a);return r.createInterpolant=this.createInterpolant,Zv(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};be.prototype.ValueTypeName="";be.prototype.TimeBufferType=Float32Array;be.prototype.ValueBufferType=Float32Array;be.prototype.DefaultInterpolation=td;gr=class extends be{constructor(t,a,i){super(t,a,i)}};gr.prototype.ValueTypeName="bool";gr.prototype.ValueBufferType=Array;gr.prototype.DefaultInterpolation=tc;gr.prototype.InterpolantFactoryMethodLinear=void 0;gr.prototype.InterpolantFactoryMethodSmooth=void 0;Md=class extends be{constructor(t,a,i,r){super(t,a,i,r)}};Md.prototype.ValueTypeName="color";md=class extends be{constructor(t,a,i,r){super(t,a,i,r)}};md.prototype.ValueTypeName="number";zd=class extends ur{constructor(t,a,i,r){super(t,a,i,r)}interpolate_(t,a,i,r){let n=this.resultBuffer,h=this.sampleValues,c=this.valueSize,o=(i-a)/(r-a),l=t*c;for(let v=l+c;l!==v;l+=4)Aa.slerpFlat(n,0,h,l-c,h,l,o);return n}},pc=class extends be{constructor(t,a,i,r){super(t,a,i,r)}InterpolantFactoryMethodLinear(t){return new zd(this.times,this.values,this.getValueSize(),t)}};pc.prototype.ValueTypeName="quaternion";pc.prototype.InterpolantFactoryMethodSmooth=void 0;pr=class extends be{constructor(t,a,i){super(t,a,i)}};pr.prototype.ValueTypeName="string";pr.prototype.ValueBufferType=Array;pr.prototype.DefaultInterpolation=tc;pr.prototype.InterpolantFactoryMethodLinear=void 0;pr.prototype.InterpolantFactoryMethodSmooth=void 0;xd=class extends be{constructor(t,a,i,r){super(t,a,i,r)}};xd.prototype.ValueTypeName="vector";Hd=class{constructor(t,a,i){let r=this,n=!1,h=0,c=0,o,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=a,this.onError=i,this._abortController=null,this.itemStart=function(v){c++,n===!1&&r.onStart!==void 0&&r.onStart(v,h,c),n=!0},this.itemEnd=function(v){h++,r.onProgress!==void 0&&r.onProgress(v,h,c),h===c&&(n=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(v){r.onError!==void 0&&r.onError(v)},this.resolveURL=function(v){return v=v.normalize("NFC"),o?o(v):v},this.setURLModifier=function(v){return o=v,this},this.addHandler=function(v,g){return l.push(v,g),this},this.removeHandler=function(v){let g=l.indexOf(v);return g!==-1&&l.splice(g,2),this},this.getHandler=function(v){for(let g=0,d=l.length;g<d;g+=2){let u=l[g],p=l[g+1];if(u.global&&(u.lastIndex=0),u.test(v))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},eL=new Hd,Ld=class{constructor(t){this.manager=t!==void 0?t:eL,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,a){let i=this;return new Promise(function(r,n){i.load(t,r,a,n)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ld.DEFAULT_MATERIAL_NAME="__DEFAULT";U5=new U,F5=new Aa,ka=new U,fc=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new e2,this.projectionMatrix=new e2,this.projectionMatrixInverse=new e2,this.coordinateSystem=da,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,a){return super.copy(t,a),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(U5,F5,ka),ka.x===1&&ka.y===1&&ka.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(U5,F5,ka.set(1,1,1)).invert()}updateWorldMatrix(t,a,i=!1){super.updateWorldMatrix(t,a,i),this.matrixWorld.decompose(U5,F5,ka),ka.x===1&&ka.y===1&&ka.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(U5,F5,ka.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},nr=new U,vH=new h1,uH=new h1,le=class extends fc{constructor(t=50,a=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=a,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,a){return super.copy(t,a),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let a=.5*this.getFilmHeight()/t;this.fov=ed*2*Math.atan(a),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bv*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ed*2*Math.atan(Math.tan(Bv*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,a,i){nr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(nr.x,nr.y).multiplyScalar(-t/nr.z),nr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(nr.x,nr.y).multiplyScalar(-t/nr.z)}getViewSize(t,a){return this.getViewBounds(t,vH,uH),a.subVectors(uH,vH)}setViewOffset(t,a,i,r,n,h){this.aspect=t/a,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=a,this.view.offsetX=i,this.view.offsetY=r,this.view.width=n,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,a=t*Math.tan(Bv*.5*this.fov)/this.zoom,i=2*a,r=this.aspect*i,n=-.5*r,h=this.view;if(this.view!==null&&this.view.enabled){let o=h.fullWidth,l=h.fullHeight;n+=h.offsetX*r/o,a-=h.offsetY*i/l,r*=h.width/o,i*=h.height/l}let c=this.filmOffset;c!==0&&(n+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(n,n+r,a,a-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let a=super.toJSON(t);return a.object.fov=this.fov,a.object.zoom=this.zoom,a.object.near=this.near,a.object.far=this.far,a.object.focus=this.focus,a.object.aspect=this.aspect,this.view!==null&&(a.object.view=Object.assign({},this.view)),a.object.filmGauge=this.filmGauge,a.object.filmOffset=this.filmOffset,a}},mi=class extends fc{constructor(t=-1,a=1,i=1,r=-1,n=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=a,this.top=i,this.bottom=r,this.near=n,this.far=h,this.updateProjectionMatrix()}copy(t,a){return super.copy(t,a),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,a,i,r,n,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=a,this.view.offsetX=i,this.view.offsetY=r,this.view.width=n,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),a=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,n=i-t,h=i+t,c=r+a,o=r-a;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;n+=l*this.view.offsetX,h=n+l*this.view.width,c-=v*this.view.offsetY,o=c-v*this.view.height}this.projectionMatrix.makeOrthographic(n,h,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let a=super.toJSON(t);return a.object.zoom=this.zoom,a.object.left=this.left,a.object.right=this.right,a.object.top=this.top,a.object.bottom=this.bottom,a.object.near=this.near,a.object.far=this.far,this.view!==null&&(a.object.view=Object.assign({},this.view)),a}},Mc=class extends Je{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}},$n=-90,t4=1,Vd=class extends ke{constructor(t,a,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new le($n,t4,t,a);r.layers=this.layers,this.add(r);let n=new le($n,t4,t,a);n.layers=this.layers,this.add(n);let h=new le($n,t4,t,a);h.layers=this.layers,this.add(h);let c=new le($n,t4,t,a);c.layers=this.layers,this.add(c);let o=new le($n,t4,t,a);o.layers=this.layers,this.add(o);let l=new le($n,t4,t,a);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,a=this.children.concat(),[i,r,n,h,c,o]=a;for(let l of a)this.remove(l);if(t===da)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),n.up.set(0,0,-1),n.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===ic)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),n.up.set(0,0,1),n.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of a)this.add(l),l.updateMatrixWorld()}update(t,a){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[n,h,c,o,l,v]=this.children,g=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(i,0,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(a,n),t.setRenderTarget(i,1,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(a,h),t.setRenderTarget(i,2,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(a,c),t.setRenderTarget(i,3,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(a,o),t.setRenderTarget(i,4,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(a,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,r),f&&t.autoClear===!1&&t.clearDepth(),t.render(a,v),t.setRenderTarget(g,d,u),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},wd=class extends le{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},yu="\\[\\]\\.:\\/",Rk=new RegExp("["+yu+"]","g"),Bu="[^"+yu+"]",Dk="[^"+yu.replace("\\.","")+"]",Ik=/((?:WC+[\/:])*)/.source.replace("WC",Bu),Pk=/(WCOD+)?/.source.replace("WCOD",Dk),Nk=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bu),Uk=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bu),Fk=new RegExp("^"+Ik+Pk+Nk+Uk+"$"),Wk=["material","materials","bones","map"],$v=class{constructor(t,a,i){let r=i||N1.parseTrackName(a);this._targetGroup=t,this._bindings=t.subscribe_(a,r)}getValue(t,a){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,a)}setValue(t,a){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,n=i.length;r!==n;++r)i[r].setValue(t,a)}bind(){let t=this._bindings;for(let a=this._targetGroup.nCachedObjects_,i=t.length;a!==i;++a)t[a].bind()}unbind(){let t=this._bindings;for(let a=this._targetGroup.nCachedObjects_,i=t.length;a!==i;++a)t[a].unbind()}},N1=class e{constructor(t,a,i){this.path=a,this.parsedPath=i||e.parseTrackName(a),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,a,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,a,i):new e(t,a,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Rk,"")}static parseTrackName(t){let a=Fk.exec(t);if(a===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:a[2],objectName:a[3],objectIndex:a[4],propertyName:a[5],propertyIndex:a[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let n=i.nodeName.substring(r+1);Wk.indexOf(n)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=n)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,a){if(a===void 0||a===""||a==="."||a===-1||a===t.name||a===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(a);if(i!==void 0)return i}if(t.children){let i=function(n){for(let h=0;h<n.length;h++){let c=n[h];if(c.name===a||c.uuid===a)return c;let o=i(c.children);if(o)return o}return null},r=i(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,a){t[a]=this.targetObject[this.propertyName]}_getValue_array(t,a){let i=this.resolvedProperty;for(let r=0,n=i.length;r!==n;++r)t[a++]=i[r]}_getValue_arrayElement(t,a){t[a]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,a){this.resolvedProperty.toArray(t,a)}_setValue_direct(t,a){this.targetObject[this.propertyName]=t[a]}_setValue_direct_setNeedsUpdate(t,a){this.targetObject[this.propertyName]=t[a],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,a){this.targetObject[this.propertyName]=t[a],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,a){let i=this.resolvedProperty;for(let r=0,n=i.length;r!==n;++r)i[r]=t[a++]}_setValue_array_setNeedsUpdate(t,a){let i=this.resolvedProperty;for(let r=0,n=i.length;r!==n;++r)i[r]=t[a++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,a){let i=this.resolvedProperty;for(let r=0,n=i.length;r!==n;++r)i[r]=t[a++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,a){this.resolvedProperty[this.propertyIndex]=t[a]}_setValue_arrayElement_setNeedsUpdate(t,a){this.resolvedProperty[this.propertyIndex]=t[a],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,a){this.resolvedProperty[this.propertyIndex]=t[a],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,a){this.resolvedProperty.fromArray(t,a)}_setValue_fromArray_setNeedsUpdate(t,a){this.resolvedProperty.fromArray(t,a),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,a){this.resolvedProperty.fromArray(t,a),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,a){this.bind(),this.getValue(t,a)}_setValue_unbound(t,a){this.bind(),this.setValue(t,a)}bind(){let t=this.node,a=this.parsedPath,i=a.objectName,r=a.propertyName,n=a.propertyIndex;if(t||(t=e.findNode(this.rootNode,a.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=a.objectIndex;switch(i){case"materials":if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Nt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Nt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let v=0;v<t.length;v++)if(t[v].name===l){l=v;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Nt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Nt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Nt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let h=t[r];if(h===void 0){let l=a.nodeName;Nt("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(n!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[n]!==void 0&&(n=t.morphTargetDictionary[n])}o=this.BindingType.ArrayElement,this.resolvedProperty=h,this.propertyIndex=n}else h.fromArray!==void 0&&h.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=h):Array.isArray(h)?(o=this.BindingType.EntireArray,this.resolvedProperty=h):this.propertyName=r;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};N1.Composite=$v;N1.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};N1.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};N1.prototype.GetterByBindingType=[N1.prototype._getValue_direct,N1.prototype._getValue_array,N1.prototype._getValue_arrayElement,N1.prototype._getValue_toArray];N1.prototype.SetterByBindingTypeAndVersioning=[[N1.prototype._setValue_direct,N1.prototype._setValue_direct_setNeedsUpdate,N1.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[N1.prototype._setValue_array,N1.prototype._setValue_array_setNeedsUpdate,N1.prototype._setValue_array_setMatrixWorldNeedsUpdate],[N1.prototype._setValue_arrayElement,N1.prototype._setValue_arrayElement_setNeedsUpdate,N1.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[N1.prototype._setValue_fromArray,N1.prototype._setValue_fromArray_setNeedsUpdate,N1.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];KP=new Float32Array(1),Au=class Au{constructor(t,a,i,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,a,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,a=0){for(let i=0;i<4;i++)this.elements[i]=t[i+a];return this}set(t,a,i,r){let n=this.elements;return n[0]=t,n[2]=a,n[1]=i,n[3]=r,this}};Au.prototype.isMatrix2=!0;tu=Au;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186")});function VL(){let e=null,t=!1,a=null,i=null;function r(n,h){i=e.requestAnimationFrame(r),a(n,h)}return{start:function(){t!==!0&&a!==null&&e!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(n){a=n},setContext:function(n){e=n}}}function Xk(e){let t=new WeakMap;function a(c,o){let l=c.array,v=c.usage,g=l.byteLength,d=e.createBuffer();e.bindBuffer(o,d),e.bufferData(o,l,v),c.onUploadCallback();let u;if(l instanceof Float32Array)u=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)u=e.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?u=e.HALF_FLOAT:u=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=e.SHORT;else if(l instanceof Uint32Array)u=e.UNSIGNED_INT;else if(l instanceof Int32Array)u=e.INT;else if(l instanceof Int8Array)u=e.BYTE;else if(l instanceof Uint8Array)u=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:g}}function i(c,o,l){let v=o.array,g=o.updateRanges;if(e.bindBuffer(l,c),g.length===0)e.bufferSubData(l,0,v);else{g.sort((u,p)=>u.start-p.start);let d=0;for(let u=1;u<g.length;u++){let p=g[d],x=g[u];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,g[d]=x)}g.length=d+1;for(let u=0,p=g.length;u<p;u++){let x=g[u];e.bufferSubData(l,x.start*v.BYTES_PER_ELEMENT,v,x.start,x.count)}o.clearUpdateRanges()}o.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function n(c){c.isInterleavedBufferAttribute&&(c=c.data);let o=t.get(c);o&&(e.deleteBuffer(o.buffer),t.delete(c))}function h(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){let v=t.get(c);(!v||v.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}let l=t.get(c);if(l===void 0)t.set(c,a(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,c,o),l.version=c.version}}return{get:r,remove:n,update:h}}function k_(e,t,a,i,r,n){let h=new $t(0),c=r===!0?0:1,o,l,v=null,g=0,d=null;function u(M){let L=M.isScene===!0?M.background:null;if(L&&L.isTexture){let m=M.backgroundBlurriness>0;L=t.get(L,m)}return L}function p(M){let L=!1,m=u(M);m===null?f(h,c):m&&m.isColor&&(f(m,1),L=!0);let w=e.xr.getEnvironmentBlendMode();w==="additive"?a.buffers.color.setClear(0,0,0,1,n):w==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,n),(e.autoClear||L)&&(a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function x(M,L){let m=u(L);m&&(m.isCubeTexture||m.mapping===xc)?(l===void 0&&(l=new G2(new c4(1,1,1),new Se({name:"BackgroundCubeMaterial",uniforms:w0(Da.backgroundCube.uniforms),vertexShader:Da.backgroundCube.vertexShader,fragmentShader:Da.backgroundCube.fragmentShader,side:J2,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,y,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=m,l.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(C_.makeRotationFromEuler(L.backgroundRotation)).transpose(),m.isCubeTexture&&m.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(wL),l.material.toneMapped=n1.getTransfer(m.colorSpace)!==x1,(v!==m||g!==m.version||d!==e.toneMapping)&&(l.material.needsUpdate=!0,v=m,g=m.version,d=e.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):m&&m.isTexture&&(o===void 0&&(o=new G2(new x0(2,2),new Se({name:"BackgroundMaterial",uniforms:w0(Da.background.uniforms),vertexShader:Da.background.vertexShader,fragmentShader:Da.background.fragmentShader,side:fr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(o)),o.material.uniforms.t2D.value=m,o.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,o.material.toneMapped=n1.getTransfer(m.colorSpace)!==x1,m.matrixAutoUpdate===!0&&m.updateMatrix(),o.material.uniforms.uvTransform.value.copy(m.matrix),(v!==m||g!==m.version||d!==e.toneMapping)&&(o.material.needsUpdate=!0,v=m,g=m.version,d=e.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function f(M,L){M.getRGB(u3,wu(e)),a.buffers.color.setClear(u3.r,u3.g,u3.b,L,n)}function s(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return h},setClearColor:function(M,L=1){h.set(M),c=L,f(h,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,f(h,c)},render:p,addToRenderList:x,dispose:s}}function S_(e,t){let a=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=d(null),n=r,h=!1;function c(E,O,R,b,I){let q=!1,X=g(E,b,R,O);n!==X&&(n=X,l(n.object)),q=u(E,b,R,I),q&&p(E,b,R,I),I!==null&&t.update(I,e.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,m(E,O,R,b),I!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function o(){return e.createVertexArray()}function l(E){return e.bindVertexArray(E)}function v(E){return e.deleteVertexArray(E)}function g(E,O,R,b){let I=b.wireframe===!0,q=i[O.id];q===void 0&&(q={},i[O.id]=q);let X=E.isInstancedMesh===!0?E.id:0,j=q[X];j===void 0&&(j={},q[X]=j);let W=j[R.id];W===void 0&&(W={},j[R.id]=W);let K=W[I];return K===void 0&&(K=d(o()),W[I]=K),K}function d(E){let O=[],R=[],b=[];for(let I=0;I<a;I++)O[I]=0,R[I]=0,b[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:R,attributeDivisors:b,object:E,attributes:{},index:null}}function u(E,O,R,b){let I=n.attributes,q=O.attributes,X=0,j=R.getAttributes();for(let W in j)if(j[W].location>=0){let et=I[W],Ot=q[W];if(Ot===void 0&&(W==="instanceMatrix"&&E.instanceMatrix&&(Ot=E.instanceMatrix),W==="instanceColor"&&E.instanceColor&&(Ot=E.instanceColor)),et===void 0||et.attribute!==Ot||Ot&&et.data!==Ot.data)return!0;X++}return n.attributesNum!==X||n.index!==b}function p(E,O,R,b){let I={},q=O.attributes,X=0,j=R.getAttributes();for(let W in j)if(j[W].location>=0){let et=q[W];et===void 0&&(W==="instanceMatrix"&&E.instanceMatrix&&(et=E.instanceMatrix),W==="instanceColor"&&E.instanceColor&&(et=E.instanceColor));let Ot={};Ot.attribute=et,et&&et.data&&(Ot.data=et.data),I[W]=Ot,X++}n.attributes=I,n.attributesNum=X,n.index=b}function x(){let E=n.newAttributes;for(let O=0,R=E.length;O<R;O++)E[O]=0}function f(E){s(E,0)}function s(E,O){let R=n.newAttributes,b=n.enabledAttributes,I=n.attributeDivisors;R[E]=1,b[E]===0&&(e.enableVertexAttribArray(E),b[E]=1),I[E]!==O&&(e.vertexAttribDivisor(E,O),I[E]=O)}function M(){let E=n.newAttributes,O=n.enabledAttributes;for(let R=0,b=O.length;R<b;R++)O[R]!==E[R]&&(e.disableVertexAttribArray(R),O[R]=0)}function L(E,O,R,b,I,q,X){X===!0?e.vertexAttribIPointer(E,O,R,I,q):e.vertexAttribPointer(E,O,R,b,I,q)}function m(E,O,R,b){x();let I=b.attributes,q=R.getAttributes(),X=O.defaultAttributeValues;for(let j in q){let W=q[j];if(W.location>=0){let K=I[j];if(K===void 0&&(j==="instanceMatrix"&&E.instanceMatrix&&(K=E.instanceMatrix),j==="instanceColor"&&E.instanceColor&&(K=E.instanceColor)),K!==void 0){let et=K.normalized,Ot=K.itemSize,St=t.get(K);if(St===void 0)continue;let f1=St.buffer,t1=St.type,l1=St.bytesPerElement,Z=t1===e.INT||t1===e.UNSIGNED_INT||K.gpuType===Sd;if(K.isInterleavedBufferAttribute){let tt=K.data,xt=tt.stride,ht=K.offset;if(tt.isInstancedInterleavedBuffer){for(let nt=0;nt<W.locationSize;nt++)s(W.location+nt,tt.meshPerAttribute);E.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let nt=0;nt<W.locationSize;nt++)f(W.location+nt);e.bindBuffer(e.ARRAY_BUFFER,f1);for(let nt=0;nt<W.locationSize;nt++)L(W.location+nt,Ot/W.locationSize,t1,et,xt*l1,(ht+Ot/W.locationSize*nt)*l1,Z)}else{if(K.isInstancedBufferAttribute){for(let tt=0;tt<W.locationSize;tt++)s(W.location+tt,K.meshPerAttribute);E.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let tt=0;tt<W.locationSize;tt++)f(W.location+tt);e.bindBuffer(e.ARRAY_BUFFER,f1);for(let tt=0;tt<W.locationSize;tt++)L(W.location+tt,Ot/W.locationSize,t1,et,Ot*l1,Ot/W.locationSize*tt*l1,Z)}}else if(X!==void 0){let et=X[j];if(et!==void 0)switch(et.length){case 2:e.vertexAttrib2fv(W.location,et);break;case 3:e.vertexAttrib3fv(W.location,et);break;case 4:e.vertexAttrib4fv(W.location,et);break;default:e.vertexAttrib1fv(W.location,et)}}}}M()}function w(){B();for(let E in i){let O=i[E];for(let R in O){let b=O[R];for(let I in b){let q=b[I];for(let X in q)v(q[X].object),delete q[X];delete b[I]}}delete i[E]}}function y(E){if(i[E.id]===void 0)return;let O=i[E.id];for(let R in O){let b=O[R];for(let I in b){let q=b[I];for(let X in q)v(q[X].object),delete q[X];delete b[I]}}delete i[E.id]}function C(E){for(let O in i){let R=i[O];for(let b in R){let I=R[b];if(I[E.id]===void 0)continue;let q=I[E.id];for(let X in q)v(q[X].object),delete q[X];delete I[E.id]}}}function H(E){for(let O in i){let R=i[O],b=E.isInstancedMesh===!0?E.id:0,I=R[b];if(I!==void 0){for(let q in I){let X=I[q];for(let j in X)v(X[j].object),delete X[j];delete I[q]}delete R[b],Object.keys(R).length===0&&delete i[O]}}}function B(){S(),h=!0,n!==r&&(n=r,l(n.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:B,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:y,releaseStatesOfObject:H,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:f,disableUnusedAttributes:M}}function b_(e,t,a){let i;function r(o){i=o}function n(o,l){e.drawArrays(i,o,l),a.update(l,i,1)}function h(o,l,v){v!==0&&(e.drawArraysInstanced(i,o,l,v),a.update(l,i,v))}function c(o,l,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,o,0,l,0,v);let d=0;for(let u=0;u<v;u++)d+=l[u];a.update(d,i,1)}this.setMode=r,this.render=n,this.renderInstances=h,this.renderMultiDraw=c}function __(e,t,a,i){let r;function n(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function h(C){return!(C!==Qe&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){let H=C===_e&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Q2&&C!==ua&&!H&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function o(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=a.precision!==void 0?a.precision:"highp",v=o(l);v!==l&&(It("WebGLRenderer:",l,"not supported, using",v,"instead."),l=v);let g=a.logarithmicDepthBuffer===!0,d=a.reversedDepthBuffer===!0&&t.has("EXT_clip_control");a.reversedDepthBuffer===!0&&d===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let u=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),s=e.getParameter(e.MAX_VERTEX_ATTRIBS),M=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),L=e.getParameter(e.MAX_VARYING_VECTORS),m=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),y=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:n,getMaxPrecision:o,textureFormatReadable:h,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:g,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:f,maxAttributes:s,maxVertexUniforms:M,maxVaryings:L,maxFragmentUniforms:m,maxSamples:w,samples:y}}function A_(e){let t=this,a=null,i=0,r=!1,n=!1,h=new la,c=new Wt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(g,d){let u=g.length!==0||d||i!==0||r;return r=d,i=g.length,u},this.beginShadows=function(){n=!0,v(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(g,d){a=v(g,d,0)},this.setState=function(g,d,u){let p=g.clippingPlanes,x=g.clipIntersection,f=g.clipShadows,s=e.get(g);if(!r||p===null||p.length===0||n&&!f)n?v(null):l();else{let M=n?0:i,L=M*4,m=s.clippingState||null;o.value=m,m=v(p,d,L,u);for(let w=0;w!==L;++w)m[w]=a[w];s.clippingState=m,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){o.value!==a&&(o.value=a,o.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function v(g,d,u,p){let x=g!==null?g.length:0,f=null;if(x!==0){if(f=o.value,p!==!0||f===null){let s=u+x*4,M=d.matrixWorldInverse;c.getNormalMatrix(M),(f===null||f.length<s)&&(f=new Float32Array(s));for(let L=0,m=u;L!==x;++L,m+=4)h.copy(g[L]).applyMatrix4(M,c),h.normal.toArray(f,m),f[m+3]=h.constant}o.value=f,o.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,f}}function D_(e){let t=[],a=[],i=e,r=e-v4+1+T_;for(let n=0;n<r;n++){let h=Math.pow(2,i);t.push(h);let c=1/(h-2),o=-c,l=1+c,v=[o,o,l,o,l,l,o,o,l,l,o,l],g=6,d=6,u=3,p=new Float32Array(u*d*g),x=new Float32Array(u*d*g);for(let s=0;s<g;s++){let M=s%3*2/3-1,L=s>2?0:-1,m=[M,L,0,M+2/3,L,0,M+2/3,L+1,0,M,L,0,M+2/3,L+1,0,M,L+1,0];p.set(m,u*d*s);for(let w=0;w<d;w++){let y=v[w*2]*2-1,C=v[w*2+1]*2-1;s===0?y0.set(1,C,y):s===1?y0.set(-y,1,-C):s===2?y0.set(-y,C,1):s===3?y0.set(-1,C,-y):s===4?y0.set(-y,-1,C):y0.set(y,C,-1),y0.toArray(x,(s*d+w)*u)}}let f=new Je;f.setAttribute("position",new A2(p,u)),f.setAttribute("outputDirection",new A2(x,u)),a.push(new G2(f,null)),i>v4&&i--}return{lodMeshes:a,sizeLods:t}}function iL(e,t,a){let i=new W2(e,t,a);return i.texture.mapping=xc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function s4(e,t,a,i,r){e.viewport.set(t,a,i,r),e.scissor.set(t,a,i,r)}function I_(e,t,a){return new Se({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:E_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/a,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:m3(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function P_(e,t,a){return new Se({name:"SphericalGaussianBlur",defines:{SAMPLES:O_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/a,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:m3(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function rL(){return new Se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:m3(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function nL(){return new Se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:m3(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function m3(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function N_(e){let t=new WeakMap,a=new WeakMap,i=null;function r(d,u=!1){return d==null?null:u?h(d):n(d)}function n(d){if(d&&d.isTexture){let u=d.mapping;if(u===Bd||u===Cd)if(t.has(d)){let p=t.get(d).texture;return c(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let x=new f3(p.height);return x.fromEquirectangularTexture(e,d),t.set(d,x),d.addEventListener("dispose",l),c(x.texture,d.mapping)}else return null}}return d}function h(d){if(d&&d.isTexture){let u=d.mapping,p=u===Bd||u===Cd,x=u===Mr||u===L0;if(p||x){let f=a.get(d),s=f!==void 0?f.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==s)return i===null&&(i=new p3(e)),f=p?i.fromEquirectangular(d,f):i.fromCubemap(d,f),f.texture.pmremVersion=d.pmremVersion,a.set(d,f),f.texture;if(f!==void 0)return f.texture;{let M=d.image;return p&&M&&M.height>0||x&&M&&o(M)?(i===null&&(i=new p3(e)),f=p?i.fromEquirectangular(d):i.fromCubemap(d),f.texture.pmremVersion=d.pmremVersion,a.set(d,f),d.addEventListener("dispose",v),f.texture):null}}}return d}function c(d,u){return u===Bd?d.mapping=Mr:u===Cd&&(d.mapping=L0),d}function o(d){let u=0,p=6;for(let x=0;x<p;x++)d[x]!==void 0&&u++;return u===p}function l(d){let u=d.target;u.removeEventListener("dispose",l);let p=t.get(u);p!==void 0&&(t.delete(u),p.dispose())}function v(d){let u=d.target;u.removeEventListener("dispose",v);let p=a.get(u);p!==void 0&&(a.delete(u),p.dispose())}function g(){t=new WeakMap,a=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:g}}function U_(e){let t={};function a(i){if(t[i]!==void 0)return t[i];let r=e.getExtension(i);return t[i]=r,r}return{has:function(i){return a(i)!==null},init:function(){a("EXT_color_buffer_float"),a("WEBGL_clip_cull_distance"),a("OES_texture_float_linear"),a("EXT_color_buffer_half_float"),a("WEBGL_multisampled_render_to_texture"),a("WEBGL_render_shared_exponent")},get:function(i){let r=a(i);return r===null&&m0("WebGLRenderer: "+i+" extension not supported."),r}}}function F_(e,t,a,i){let r={},n=new WeakMap;function h(g){let d=g.target;d.index!==null&&t.remove(d.index);for(let p in d.attributes)t.remove(d.attributes[p]);d.removeEventListener("dispose",h),delete r[d.id];let u=n.get(d);u&&(t.remove(u),n.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,a.memory.geometries--}function c(g,d){return r[d.id]===!0||(d.addEventListener("dispose",h),r[d.id]=!0,a.memory.geometries++),d}function o(g){let d=g.attributes;for(let u in d)t.update(d[u],e.ARRAY_BUFFER)}function l(g){let d=[],u=g.index,p=g.attributes.position,x=0;if(p===void 0)return;if(u!==null){let M=u.array;x=u.version;for(let L=0,m=M.length;L<m;L+=3){let w=M[L+0],y=M[L+1],C=M[L+2];d.push(w,y,y,C,C,w)}}else{let M=p.array;x=p.version;for(let L=0,m=M.length/3-1;L<m;L+=3){let w=L+0,y=L+1,C=L+2;d.push(w,y,y,C,C,w)}}let f=new(p.count>=65535?oc:cc)(d,1);f.version=x;let s=n.get(g);s&&t.remove(s),n.set(g,f)}function v(g){let d=n.get(g);if(d){let u=g.index;u!==null&&d.version<u.version&&l(g)}else l(g);return n.get(g)}return{get:c,update:o,getWireframeAttribute:v}}function W_(e,t,a){let i;function r(g){i=g}let n,h;function c(g){n=g.type,h=g.bytesPerElement}function o(g,d){e.drawElements(i,d,n,g*h),a.update(d,i,1)}function l(g,d,u){u!==0&&(e.drawElementsInstanced(i,d,n,g*h,u),a.update(d,i,u))}function v(g,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,n,g,0,u);let x=0;for(let f=0;f<u;f++)x+=d[f];a.update(x,i,1)}this.setMode=r,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=v}function G_(e){let t={geometries:0,textures:0},a={frame:0,calls:0,triangles:0,points:0,lines:0};function i(n,h,c){switch(a.calls++,h){case e.TRIANGLES:a.triangles+=c*(n/3);break;case e.LINES:a.lines+=c*(n/2);break;case e.LINE_STRIP:a.lines+=c*(n-1);break;case e.LINE_LOOP:a.lines+=c*n;break;case e.POINTS:a.points+=c*n;break;default:Nt("WebGLInfo: Unknown draw mode:",h);break}}function r(){a.calls=0,a.triangles=0,a.points=0,a.lines=0}return{memory:t,render:a,programs:null,autoReset:!0,reset:r,update:i}}function j_(e,t,a){let i=new WeakMap,r=new q1;function n(h,c,o){let l=h.morphTargetInfluences,v=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,g=v!==void 0?v.length:0,d=i.get(c);if(d===void 0||d.count!==g){let B=function(){C.dispose(),i.delete(c),c.removeEventListener("dispose",B)};d!==void 0&&d.texture.dispose();let u=c.morphAttributes.position!==void 0,p=c.morphAttributes.normal!==void 0,x=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],s=c.morphAttributes.normal||[],M=c.morphAttributes.color||[],L=0;u===!0&&(L=1),p===!0&&(L=2),x===!0&&(L=3);let m=c.attributes.position.count*L,w=1;m>t.maxTextureSize&&(w=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let y=new Float32Array(m*w*4*g),C=new nc(y,m,w,g);C.type=ua,C.needsUpdate=!0;let H=L*4;for(let S=0;S<g;S++){let E=f[S],O=s[S],R=M[S],b=m*w*4*S;for(let I=0;I<E.count;I++){let q=I*H;u===!0&&(r.fromBufferAttribute(E,I),y[b+q+0]=r.x,y[b+q+1]=r.y,y[b+q+2]=r.z,y[b+q+3]=0),p===!0&&(r.fromBufferAttribute(O,I),y[b+q+4]=r.x,y[b+q+5]=r.y,y[b+q+6]=r.z,y[b+q+7]=0),x===!0&&(r.fromBufferAttribute(R,I),y[b+q+8]=r.x,y[b+q+9]=r.y,y[b+q+10]=r.z,y[b+q+11]=R.itemSize===4?r.w:1)}}d={count:g,texture:C,size:new h1(m,w)},i.set(c,d),c.addEventListener("dispose",B)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)o.getUniforms().setValue(e,"morphTexture",h.morphTexture,a);else{let u=0;for(let x=0;x<l.length;x++)u+=l[x];let p=c.morphTargetsRelative?1:1-u;o.getUniforms().setValue(e,"morphTargetBaseInfluence",p),o.getUniforms().setValue(e,"morphTargetInfluences",l)}o.getUniforms().setValue(e,"morphTargetsTexture",d.texture,a),o.getUniforms().setValue(e,"morphTargetsTextureSize",d.size)}return{update:n}}function X_(e,t,a,i,r){let n=new WeakMap;function h(l){let v=r.render.frame,g=l.geometry,d=t.get(l,g);if(n.get(d)!==v&&(t.update(d),n.set(d,v)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==v&&(a.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&a.update(l.instanceColor,e.ARRAY_BUFFER),n.set(l,v))),l.isSkinnedMesh){let u=l.skeleton;n.get(u)!==v&&(u.update(),n.set(u,v))}return d}function c(){n=new WeakMap}function o(l){let v=l.target;v.removeEventListener("dispose",o),i.releaseStatesOfObject(v),a.remove(v.instanceMatrix),v.instanceColor!==null&&a.remove(v.instanceColor)}return{update:h,dispose:c}}function Z_(e,t,a,i,r,n){let h=new W2(t,a,{type:e,depthBuffer:r,stencilBuffer:n,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,o=null,l=new Je;l.setAttribute("position",new de([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new de([0,2,0,0,2,0],2));let v=new vr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),g=new G2(l,v),d=new mi(-1,1,1,-1,0,1),u=null,p=null,x=!1,f,s=null,M=[],L=!1;this.setSize=function(m,w){h.setSize(m,w),c!==null&&c.setSize(m,w),o!==null&&o.setSize(m,w);for(let y=0;y<M.length;y++){let C=M[y];C.setSize&&C.setSize(m,w)}},this.setEffects=function(m){M=m,L=M.length>0&&M[0].isRenderPass===!0;let w=h.width,y=h.height;M.length>0&&c===null&&(c=new W2(w,y,{type:_e,depthBuffer:!1,stencilBuffer:!1}),o=new W2(w,y,{type:_e,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<M.length;C++){let H=M[C];H.setSize&&H.setSize(w,y)}},this.begin=function(m,w){if(x||m.toneMapping===sa&&M.length===0)return!1;if(s=w,w!==null){let y=w.width,C=w.height;(h.width!==y||h.height!==C)&&this.setSize(y,C)}return L===!1&&m.setRenderTarget(h),f=m.toneMapping,m.toneMapping=sa,!0},this.hasRenderPass=function(){return L},this.end=function(m,w){m.toneMapping=f,x=!0;let y=h,C=c;for(let H=0;H<M.length;H++){let B=M[H];B.enabled!==!1&&(B.render(m,C,y,w),B.needsSwap!==!1&&(y=C,C=C===c?o:c))}if(u!==m.outputColorSpace||p!==m.toneMapping){u=m.outputColorSpace,p=m.toneMapping,v.defines={},n1.getTransfer(u)===x1&&(v.defines.SRGB_TRANSFER="");let H=q_[p];H&&(v.defines[H]=""),v.needsUpdate=!0}v.uniforms.tDiffuse.value=y.texture,m.setRenderTarget(s),m.render(g,d),s=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){h.dispose(),c!==null&&c.dispose(),o!==null&&o.dispose(),l.dispose(),v.dispose()}}function g4(e,t,a){let i=e[0];if(i<=0||i>0)return e;let r=t*a,n=hL[r];if(n===void 0&&(n=new Float32Array(r),hL[r]=n),t!==0){i.toArray(n,0);for(let h=1,c=0;h!==t;++h)c+=a,e[h].toArray(n,c)}return n}function f2(e,t){if(e.length!==t.length)return!1;for(let a=0,i=e.length;a<i;a++)if(e[a]!==t[a])return!1;return!0}function M2(e,t){for(let a=0,i=t.length;a<i;a++)e[a]=t[a]}function z3(e,t){let a=cL[t];a===void 0&&(a=new Int32Array(t),cL[t]=a);for(let i=0;i!==t;++i)a[i]=e.allocateTextureUnit();return a}function Y_(e,t){let a=this.cache;a[0]!==t&&(e.uniform1f(this.addr,t),a[0]=t)}function K_(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),a[0]=t.x,a[1]=t.y);else{if(f2(a,t))return;e.uniform2fv(this.addr,t),M2(a,t)}}function J_(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y||a[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),a[0]=t.x,a[1]=t.y,a[2]=t.z);else if(t.r!==void 0)(a[0]!==t.r||a[1]!==t.g||a[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),a[0]=t.r,a[1]=t.g,a[2]=t.b);else{if(f2(a,t))return;e.uniform3fv(this.addr,t),M2(a,t)}}function Q_(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y||a[2]!==t.z||a[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),a[0]=t.x,a[1]=t.y,a[2]=t.z,a[3]=t.w);else{if(f2(a,t))return;e.uniform4fv(this.addr,t),M2(a,t)}}function $_(e,t){let a=this.cache,i=t.elements;if(i===void 0){if(f2(a,t))return;e.uniformMatrix2fv(this.addr,!1,t),M2(a,t)}else{if(f2(a,i))return;dL.set(i),e.uniformMatrix2fv(this.addr,!1,dL),M2(a,i)}}function tA(e,t){let a=this.cache,i=t.elements;if(i===void 0){if(f2(a,t))return;e.uniformMatrix3fv(this.addr,!1,t),M2(a,t)}else{if(f2(a,i))return;lL.set(i),e.uniformMatrix3fv(this.addr,!1,lL),M2(a,i)}}function eA(e,t){let a=this.cache,i=t.elements;if(i===void 0){if(f2(a,t))return;e.uniformMatrix4fv(this.addr,!1,t),M2(a,t)}else{if(f2(a,i))return;oL.set(i),e.uniformMatrix4fv(this.addr,!1,oL),M2(a,i)}}function aA(e,t){let a=this.cache;a[0]!==t&&(e.uniform1i(this.addr,t),a[0]=t)}function iA(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),a[0]=t.x,a[1]=t.y);else{if(f2(a,t))return;e.uniform2iv(this.addr,t),M2(a,t)}}function rA(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y||a[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),a[0]=t.x,a[1]=t.y,a[2]=t.z);else{if(f2(a,t))return;e.uniform3iv(this.addr,t),M2(a,t)}}function nA(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y||a[2]!==t.z||a[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),a[0]=t.x,a[1]=t.y,a[2]=t.z,a[3]=t.w);else{if(f2(a,t))return;e.uniform4iv(this.addr,t),M2(a,t)}}function hA(e,t){let a=this.cache;a[0]!==t&&(e.uniform1ui(this.addr,t),a[0]=t)}function cA(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),a[0]=t.x,a[1]=t.y);else{if(f2(a,t))return;e.uniform2uiv(this.addr,t),M2(a,t)}}function oA(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y||a[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),a[0]=t.x,a[1]=t.y,a[2]=t.z);else{if(f2(a,t))return;e.uniform3uiv(this.addr,t),M2(a,t)}}function lA(e,t){let a=this.cache;if(t.x!==void 0)(a[0]!==t.x||a[1]!==t.y||a[2]!==t.z||a[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),a[0]=t.x,a[1]=t.y,a[2]=t.z,a[3]=t.w);else{if(f2(a,t))return;e.uniform4uiv(this.addr,t),M2(a,t)}}function dA(e,t,a){let i=this.cache,r=a.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let n;this.type===e.SAMPLER_2D_SHADOW?(Nu.compareFunction=a.isReversedDepthBuffer()?v3:s3,n=Nu):n=yL,a.setTexture2D(t||n,r)}function sA(e,t,a){let i=this.cache,r=a.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),a.setTexture3D(t||CL,r)}function vA(e,t,a){let i=this.cache,r=a.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),a.setTextureCube(t||kL,r)}function uA(e,t,a){let i=this.cache,r=a.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),a.setTexture2DArray(t||BL,r)}function gA(e){switch(e){case 5126:return Y_;case 35664:return K_;case 35665:return J_;case 35666:return Q_;case 35674:return $_;case 35675:return tA;case 35676:return eA;case 5124:case 35670:return aA;case 35667:case 35671:return iA;case 35668:case 35672:return rA;case 35669:case 35673:return nA;case 5125:return hA;case 36294:return cA;case 36295:return oA;case 36296:return lA;case 35678:case 36198:case 36298:case 36306:case 35682:return dA;case 35679:case 36299:case 36307:return sA;case 35680:case 36300:case 36308:case 36293:return vA;case 36289:case 36303:case 36311:case 36292:return uA}}function pA(e,t){e.uniform1fv(this.addr,t)}function fA(e,t){let a=g4(t,this.size,2);e.uniform2fv(this.addr,a)}function MA(e,t){let a=g4(t,this.size,3);e.uniform3fv(this.addr,a)}function mA(e,t){let a=g4(t,this.size,4);e.uniform4fv(this.addr,a)}function zA(e,t){let a=g4(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,a)}function xA(e,t){let a=g4(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,a)}function HA(e,t){let a=g4(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,a)}function LA(e,t){e.uniform1iv(this.addr,t)}function VA(e,t){e.uniform2iv(this.addr,t)}function wA(e,t){e.uniform3iv(this.addr,t)}function yA(e,t){e.uniform4iv(this.addr,t)}function BA(e,t){e.uniform1uiv(this.addr,t)}function CA(e,t){e.uniform2uiv(this.addr,t)}function kA(e,t){e.uniform3uiv(this.addr,t)}function SA(e,t){e.uniform4uiv(this.addr,t)}function bA(e,t,a){let i=this.cache,r=t.length,n=z3(a,r);f2(i,n)||(e.uniform1iv(this.addr,n),M2(i,n));let h;this.type===e.SAMPLER_2D_SHADOW?h=Nu:h=yL;for(let c=0;c!==r;++c)a.setTexture2D(t[c]||h,n[c])}function _A(e,t,a){let i=this.cache,r=t.length,n=z3(a,r);f2(i,n)||(e.uniform1iv(this.addr,n),M2(i,n));for(let h=0;h!==r;++h)a.setTexture3D(t[h]||CL,n[h])}function AA(e,t,a){let i=this.cache,r=t.length,n=z3(a,r);f2(i,n)||(e.uniform1iv(this.addr,n),M2(i,n));for(let h=0;h!==r;++h)a.setTextureCube(t[h]||kL,n[h])}function TA(e,t,a){let i=this.cache,r=t.length,n=z3(a,r);f2(i,n)||(e.uniform1iv(this.addr,n),M2(i,n));for(let h=0;h!==r;++h)a.setTexture2DArray(t[h]||BL,n[h])}function OA(e){switch(e){case 5126:return pA;case 35664:return fA;case 35665:return MA;case 35666:return mA;case 35674:return zA;case 35675:return xA;case 35676:return HA;case 5124:case 35670:return LA;case 35667:case 35671:return VA;case 35668:case 35672:return wA;case 35669:case 35673:return yA;case 5125:return BA;case 36294:return CA;case 36295:return kA;case 36296:return SA;case 35678:case 36198:case 36298:case 36306:case 35682:return bA;case 35679:case 36299:case 36307:return _A;case 35680:case 36300:case 36308:case 36293:return AA;case 36289:case 36303:case 36311:case 36292:return TA}}function sL(e,t){e.seq.push(t),e.map[t.id]=t}function EA(e,t,a){let i=e.name,r=i.length;for(Iu.lastIndex=0;;){let n=Iu.exec(i),h=Iu.lastIndex,c=n[1],o=n[2]==="]",l=n[3];if(o&&(c=c|0),l===void 0||l==="["&&h+2===r){sL(a,l===void 0?new Uu(c,e,t):new Fu(c,e,t));break}else{let g=a.map[c];g===void 0&&(g=new Wu(c),sL(a,g)),a=g}}}function vL(e,t,a){let i=e.createShader(t);return e.shaderSource(i,a),e.compileShader(i),i}function IA(e,t){let a=e.split(`
`),i=[],r=Math.max(t-6,0),n=Math.min(t+6,a.length);for(let h=r;h<n;h++){let c=h+1;i.push(`${c===t?">":" "} ${c}: ${a[h]}`)}return i.join(`
`)}function PA(e){n1._getMatrix(uL,n1.workingColorSpace,e);let t=`mat3( ${uL.elements.map(a=>a.toFixed(4))} )`;switch(n1.getTransfer(e)){case ac:return[t,"LinearTransferOETF"];case x1:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function gL(e,t,a){let i=e.getShaderParameter(t,e.COMPILE_STATUS),n=(e.getShaderInfoLog(t)||"").trim();if(i&&n==="")return"";let h=/ERROR: 0:(\d+)/.exec(n);if(h){let c=parseInt(h[1]);return a.toUpperCase()+`

`+n+`

`+IA(e.getShaderSource(t),c)}else return n}function NA(e,t){let a=PA(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${a[1]}( vec4( value.rgb * ${a[0]}, value.a ) );`,"}"].join(`
`)}function FA(e,t){let a=UA[t];return a===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+a+"ToneMapping( color ); }"}function WA(){n1.getLuminanceCoefficients(g3);let e=g3.x.toFixed(4),t=g3.y.toFixed(4),a=g3.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${a} );`,"	return dot( weights, rgb );","}"].join(`
`)}function GA(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_c).join(`
`)}function jA(e){let t=[];for(let a in e){let i=e[a];i!==!1&&t.push("#define "+a+" "+i)}return t.join(`
`)}function XA(e,t){let a={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let n=e.getActiveAttrib(t,r),h=n.name,c=1;n.type===e.FLOAT_MAT2&&(c=2),n.type===e.FLOAT_MAT3&&(c=3),n.type===e.FLOAT_MAT4&&(c=4),a[h]={type:n.type,location:e.getAttribLocation(t,h),locationSize:c}}return a}function _c(e){return e!==""}function pL(e,t){let a=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,a).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fL(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Gu(e){return e.replace(qA,YA)}function YA(e,t){let a=Jt[t];if(a===void 0){let i=ZA.get(t);if(i!==void 0)a=Jt[i],It('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gu(a)}function ML(e){return e.replace(KA,JA)}function JA(e,t,a,i){let r="";for(let n=parseInt(t);n<parseInt(a);n++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return r}function mL(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $A(e){return QA[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function eT(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":tT[e.envMapMode]||"ENVMAP_TYPE_CUBE"}function iT(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":aT[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}function nT(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":rT[e.combine]||"ENVMAP_BLENDING_NONE"}function hT(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let a=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,a),112)),texelHeight:i,maxMip:a}}function cT(e,t,a,i){let r=e.getContext(),n=a.defines,h=a.vertexShader,c=a.fragmentShader,o=$A(a),l=eT(a),v=iT(a),g=nT(a),d=hT(a),u=GA(a),p=jA(n),x=r.createProgram(),f,s,M=a.glslVersion?"#version "+a.glslVersion+`
`:"";a.isRawShaderMaterial?(f=["#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,p].filter(_c).join(`
`),f.length>0&&(f+=`
`),s=["#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,p].filter(_c).join(`
`),s.length>0&&(s+=`
`)):(f=[mL(a),"#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,p,a.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",a.batching?"#define USE_BATCHING":"",a.batchingColor?"#define USE_BATCHING_COLOR":"",a.instancing?"#define USE_INSTANCING":"",a.instancingColor?"#define USE_INSTANCING_COLOR":"",a.instancingMorph?"#define USE_INSTANCING_MORPH":"",a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp2?"#define FOG_EXP2":"",a.map?"#define USE_MAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+v:"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",a.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",a.displacementMap?"#define USE_DISPLACEMENTMAP":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.anisotropy?"#define USE_ANISOTROPY":"",a.anisotropyMap?"#define USE_ANISOTROPYMAP":"",a.clearcoatMap?"#define USE_CLEARCOATMAP":"",a.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",a.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",a.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",a.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",a.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.alphaHash?"#define USE_ALPHAHASH":"",a.transmission?"#define USE_TRANSMISSION":"",a.transmissionMap?"#define USE_TRANSMISSIONMAP":"",a.thicknessMap?"#define USE_THICKNESSMAP":"",a.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",a.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",a.mapUv?"#define MAP_UV "+a.mapUv:"",a.alphaMapUv?"#define ALPHAMAP_UV "+a.alphaMapUv:"",a.lightMapUv?"#define LIGHTMAP_UV "+a.lightMapUv:"",a.aoMapUv?"#define AOMAP_UV "+a.aoMapUv:"",a.emissiveMapUv?"#define EMISSIVEMAP_UV "+a.emissiveMapUv:"",a.bumpMapUv?"#define BUMPMAP_UV "+a.bumpMapUv:"",a.normalMapUv?"#define NORMALMAP_UV "+a.normalMapUv:"",a.displacementMapUv?"#define DISPLACEMENTMAP_UV "+a.displacementMapUv:"",a.metalnessMapUv?"#define METALNESSMAP_UV "+a.metalnessMapUv:"",a.roughnessMapUv?"#define ROUGHNESSMAP_UV "+a.roughnessMapUv:"",a.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+a.anisotropyMapUv:"",a.clearcoatMapUv?"#define CLEARCOATMAP_UV "+a.clearcoatMapUv:"",a.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+a.clearcoatNormalMapUv:"",a.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+a.clearcoatRoughnessMapUv:"",a.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+a.iridescenceMapUv:"",a.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+a.iridescenceThicknessMapUv:"",a.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+a.sheenColorMapUv:"",a.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+a.sheenRoughnessMapUv:"",a.specularMapUv?"#define SPECULARMAP_UV "+a.specularMapUv:"",a.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+a.specularColorMapUv:"",a.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+a.specularIntensityMapUv:"",a.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+a.transmissionMapUv:"",a.thicknessMapUv?"#define THICKNESSMAP_UV "+a.thicknessMapUv:"",a.vertexTangents&&a.flatShading===!1?"#define USE_TANGENT":"",a.vertexNormals?"#define HAS_NORMAL":"",a.vertexColors?"#define USE_COLOR":"",a.vertexAlphas?"#define USE_COLOR_ALPHA":"",a.vertexUv1s?"#define USE_UV1":"",a.vertexUv2s?"#define USE_UV2":"",a.vertexUv3s?"#define USE_UV3":"",a.pointsUvs?"#define USE_POINTS_UV":"",a.flatShading?"#define FLAT_SHADED":"",a.skinning?"#define USE_SKINNING":"",a.morphTargets?"#define USE_MORPHTARGETS":"",a.morphNormals&&a.flatShading===!1?"#define USE_MORPHNORMALS":"",a.morphColors?"#define USE_MORPHCOLORS":"",a.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+a.morphTextureStride:"",a.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+a.morphTargetsCount:"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"",a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+o:"",a.sizeAttenuation?"#define USE_SIZEATTENUATION":"",a.numLightProbes>0?"#define USE_LIGHT_PROBES":"",a.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",a.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_c).join(`
`),s=[mL(a),"#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,p,a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp2?"#define FOG_EXP2":"",a.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",a.map?"#define USE_MAP":"",a.matcap?"#define USE_MATCAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+l:"",a.envMap?"#define "+v:"",a.envMap?"#define "+g:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",a.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",a.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.anisotropy?"#define USE_ANISOTROPY":"",a.anisotropyMap?"#define USE_ANISOTROPYMAP":"",a.clearcoat?"#define USE_CLEARCOAT":"",a.clearcoatMap?"#define USE_CLEARCOATMAP":"",a.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",a.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",a.dispersion?"#define USE_DISPERSION":"",a.retroreflection?"#define USE_RETROREFLECTION":"",a.iridescence?"#define USE_IRIDESCENCE":"",a.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",a.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",a.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.alphaTest?"#define USE_ALPHATEST":"",a.alphaHash?"#define USE_ALPHAHASH":"",a.sheen?"#define USE_SHEEN":"",a.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",a.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",a.transmission?"#define USE_TRANSMISSION":"",a.transmissionMap?"#define USE_TRANSMISSIONMAP":"",a.thicknessMap?"#define USE_THICKNESSMAP":"",a.vertexTangents&&a.flatShading===!1?"#define USE_TANGENT":"",a.vertexColors||a.instancingColor?"#define USE_COLOR":"",a.vertexAlphas||a.batchingColor?"#define USE_COLOR_ALPHA":"",a.vertexUv1s?"#define USE_UV1":"",a.vertexUv2s?"#define USE_UV2":"",a.vertexUv3s?"#define USE_UV3":"",a.pointsUvs?"#define USE_POINTS_UV":"",a.gradientMap?"#define USE_GRADIENTMAP":"",a.flatShading?"#define FLAT_SHADED":"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"",a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+o:"",a.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",a.numLightProbes>0?"#define USE_LIGHT_PROBES":"",a.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",a.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",a.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",a.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",a.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",a.toneMapping!==sa?"#define TONE_MAPPING":"",a.toneMapping!==sa?Jt.tonemapping_pars_fragment:"",a.toneMapping!==sa?FA("toneMapping",a.toneMapping):"",a.dithering?"#define DITHERING":"",a.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,NA("linearToOutputTexel",a.outputColorSpace),WA(),a.useDepthPacking?"#define DEPTH_PACKING "+a.depthPacking:"",`
`].filter(_c).join(`
`)),h=Gu(h),h=pL(h,a),h=fL(h,a),c=Gu(c),c=pL(c,a),c=fL(c,a),h=ML(h),c=ML(c),a.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,s=["#define varying in",a.glslVersion===V0?"":"layout(location = 0) out highp vec4 pc_fragColor;",a.glslVersion===V0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+s);let L=M+f+h,m=M+s+c,w=vL(r,r.VERTEX_SHADER,L),y=vL(r,r.FRAGMENT_SHADER,m);r.attachShader(x,w),r.attachShader(x,y),a.index0AttributeName!==void 0?r.bindAttribLocation(x,0,a.index0AttributeName):a.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function C(E){if(e.debug.checkShaderErrors){let O=r.getProgramInfoLog(x)||"",R=r.getShaderInfoLog(w)||"",b=r.getShaderInfoLog(y)||"",I=O.trim(),q=R.trim(),X=b.trim(),j=!0,W=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(j=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,x,w,y);else{let K=gL(r,w,"vertex"),et=gL(r,y,"fragment");Nt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+I+`
`+K+`
`+et)}else I!==""?It("WebGLProgram: Program Info Log:",I):(q===""||X==="")&&(W=!1);W&&(E.diagnostics={runnable:j,programLog:I,vertexShader:{log:q,prefix:f},fragmentShader:{log:X,prefix:s}})}r.deleteShader(w),r.deleteShader(y),H=new u4(r,x),B=XA(r,x)}let H;this.getUniforms=function(){return H===void 0&&C(this),H};let B;this.getAttributes=function(){return B===void 0&&C(this),B};let S=a.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(x,RA)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=a.shaderType,this.name=a.shaderName,this.id=DA++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=y,this}function lT(e){return e===xr||e===Bc||e===Cc}function dT(e,t,a,i,r,n){let h=new hc,c=new ju,o=new Set,l=[],v=new Map,g=i.logarithmicDepthBuffer,d=i.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(H){return o.add(H),H===0?"uv":`uv${H}`}function x(H,B,S,E,O,R){let b=E.fog,I=O.geometry,q=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?E.environment:null,X=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,j=t.get(H.envMap||q,X),W=j&&j.mapping===xc?j.image.height:null,K=u[H.type];H.precision!==null&&(d=i.getMaxPrecision(H.precision),d!==H.precision&&It("WebGLProgram.getParameters:",H.precision,"not supported, using",d,"instead."));let et=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Ot=et!==void 0?et.length:0,St=0;I.morphAttributes.position!==void 0&&(St=1),I.morphAttributes.normal!==void 0&&(St=2),I.morphAttributes.color!==void 0&&(St=3);let f1,t1,l1,Z;if(K){let _1=Da[K];f1=_1.vertexShader,t1=_1.fragmentShader}else{f1=H.vertexShader,t1=H.fragmentShader;let _1=c.getVertexShaderStage(H),M1=c.getFragmentShaderStage(H);c.update(H,_1,M1),l1=_1.id,Z=M1.id}let tt=e.getRenderTarget(),xt=e.state.buffers.depth.getReversed(),ht=O.isInstancedMesh===!0,nt=O.isBatchedMesh===!0,Ct=!!H.map,Zt=!!H.matcap,Rt=!!j,Ut=!!H.aoMap,Qt=!!H.lightMap,Yt=!!H.bumpMap&&H.wireframe===!1,k1=!!H.normalMap,a2=!!H.displacementMap,O2=!!H.emissiveMap,O1=!!H.metalnessMap,X1=!!H.roughnessMap,A=H.anisotropy>0,E2=H.clearcoat>0,H1=H.dispersion>0,k=H.retroreflectivity>0,z=H.iridescence>0,D=H.sheen>0,F=H.transmission>0,Y=A&&!!H.anisotropyMap,ot=E2&&!!H.clearcoatMap,lt=E2&&!!H.clearcoatNormalMap,J=E2&&!!H.clearcoatRoughnessMap,$=z&&!!H.iridescenceMap,dt=z&&!!H.iridescenceThicknessMap,_t=D&&!!H.sheenColorMap,gt=D&&!!H.sheenRoughnessMap,st=!!H.specularMap,At=!!H.specularColorMap,Dt=!!H.specularIntensityMap,Xt=F&&!!H.transmissionMap,T=F&&!!H.thicknessMap,vt=!!H.gradientMap,Q=!!H.alphaMap,ut=H.alphaTest>0,mt=!!H.alphaHash,it=!!H.extensions,Et=sa;H.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Et=e.toneMapping);let kt={shaderID:K,shaderType:H.type,shaderName:H.name,vertexShader:f1,fragmentShader:t1,defines:H.defines,customVertexShaderID:l1,customFragmentShaderID:Z,isRawShaderMaterial:H.isRawShaderMaterial===!0,glslVersion:H.glslVersion,precision:d,batching:nt,batchingColor:nt&&O._colorsTexture!==null,instancing:ht,instancingColor:ht&&O.instanceColor!==null,instancingMorph:ht&&O.morphTexture!==null,outputColorSpace:tt===null?e.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:n1.workingColorSpace,alphaToCoverage:!!H.alphaToCoverage,map:Ct,matcap:Zt,envMap:Rt,envMapMode:Rt&&j.mapping,envMapCubeUVHeight:W,aoMap:Ut,lightMap:Qt,bumpMap:Yt,normalMap:k1,displacementMap:a2,emissiveMap:O2,normalMapObjectSpace:k1&&H.normalMapType===PH,normalMapTangentSpace:k1&&H.normalMapType===Lu,packedNormalMap:k1&&H.normalMapType===Lu&&lT(H.normalMap.format),metalnessMap:O1,roughnessMap:X1,anisotropy:A,anisotropyMap:Y,clearcoat:E2,clearcoatMap:ot,clearcoatNormalMap:lt,clearcoatRoughnessMap:J,dispersion:H1,retroreflection:k,iridescence:z,iridescenceMap:$,iridescenceThicknessMap:dt,sheen:D,sheenColorMap:_t,sheenRoughnessMap:gt,specularMap:st,specularColorMap:At,specularIntensityMap:Dt,transmission:F,transmissionMap:Xt,thicknessMap:T,gradientMap:vt,opaque:H.transparent===!1&&H.blending===Ea&&H.alphaToCoverage===!1,alphaMap:Q,alphaTest:ut,alphaHash:mt,combine:H.combine,mapUv:Ct&&p(H.map.channel),aoMapUv:Ut&&p(H.aoMap.channel),lightMapUv:Qt&&p(H.lightMap.channel),bumpMapUv:Yt&&p(H.bumpMap.channel),normalMapUv:k1&&p(H.normalMap.channel),displacementMapUv:a2&&p(H.displacementMap.channel),emissiveMapUv:O2&&p(H.emissiveMap.channel),metalnessMapUv:O1&&p(H.metalnessMap.channel),roughnessMapUv:X1&&p(H.roughnessMap.channel),anisotropyMapUv:Y&&p(H.anisotropyMap.channel),clearcoatMapUv:ot&&p(H.clearcoatMap.channel),clearcoatNormalMapUv:lt&&p(H.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&p(H.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&p(H.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&p(H.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&p(H.sheenColorMap.channel),sheenRoughnessMapUv:gt&&p(H.sheenRoughnessMap.channel),specularMapUv:st&&p(H.specularMap.channel),specularColorMapUv:At&&p(H.specularColorMap.channel),specularIntensityMapUv:Dt&&p(H.specularIntensityMap.channel),transmissionMapUv:Xt&&p(H.transmissionMap.channel),thicknessMapUv:T&&p(H.thicknessMap.channel),alphaMapUv:Q&&p(H.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(k1||A),vertexNormals:!!I.attributes.normal,vertexColors:H.vertexColors,vertexAlphas:H.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!I.attributes.uv&&(Ct||Q),fog:!!b,useFog:H.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:H.wireframe===!1&&(H.flatShading===!0||I.attributes.normal===void 0&&k1===!1&&(H.isMeshLambertMaterial||H.isMeshPhongMaterial||H.isMeshStandardMaterial||H.isMeshPhysicalMaterial)),sizeAttenuation:H.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:xt,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Ot,morphTextureStride:St,numSunLights:B.sun.length,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numSunLightShadows:B.sunShadowMap.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:R.length,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:H.dithering,shadowMapEnabled:e.shadowMap.enabled&&S.length>0,shadowMapType:e.shadowMap.type,toneMapping:Et,decodeVideoTexture:Ct&&H.map.isVideoTexture===!0&&n1.getTransfer(H.map.colorSpace)===x1,decodeVideoTextureEmissive:O2&&H.emissiveMap.isVideoTexture===!0&&n1.getTransfer(H.emissiveMap.colorSpace)===x1,premultipliedAlpha:H.premultipliedAlpha,doubleSided:H.side===Ta,flipSided:H.side===J2,useDepthPacking:H.depthPacking>=0,depthPacking:H.depthPacking||0,index0AttributeName:H.index0AttributeName,extensionClipCullDistance:it&&H.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&H.extensions.multiDraw===!0||nt)&&a.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:H.customProgramCacheKey()};return kt.vertexUv1s=o.has(1),kt.vertexUv2s=o.has(2),kt.vertexUv3s=o.has(3),o.clear(),kt}function f(H){let B=[];if(H.shaderID?B.push(H.shaderID):(B.push(H.customVertexShaderID),B.push(H.customFragmentShaderID)),H.defines!==void 0)for(let S in H.defines)B.push(S),B.push(H.defines[S]);return H.isRawShaderMaterial===!1&&(s(B,H),M(B,H),B.push(e.outputColorSpace)),B.push(H.customProgramCacheKey),B.join()}function s(H,B){H.push(B.precision),H.push(B.outputColorSpace),H.push(B.envMapMode),H.push(B.envMapCubeUVHeight),H.push(B.mapUv),H.push(B.alphaMapUv),H.push(B.lightMapUv),H.push(B.aoMapUv),H.push(B.bumpMapUv),H.push(B.normalMapUv),H.push(B.displacementMapUv),H.push(B.emissiveMapUv),H.push(B.metalnessMapUv),H.push(B.roughnessMapUv),H.push(B.anisotropyMapUv),H.push(B.clearcoatMapUv),H.push(B.clearcoatNormalMapUv),H.push(B.clearcoatRoughnessMapUv),H.push(B.iridescenceMapUv),H.push(B.iridescenceThicknessMapUv),H.push(B.sheenColorMapUv),H.push(B.sheenRoughnessMapUv),H.push(B.specularMapUv),H.push(B.specularColorMapUv),H.push(B.specularIntensityMapUv),H.push(B.transmissionMapUv),H.push(B.thicknessMapUv),H.push(B.combine),H.push(B.fogExp2),H.push(B.sizeAttenuation),H.push(B.morphTargetsCount),H.push(B.morphAttributeCount),H.push(B.numSunLights),H.push(B.numDirLights),H.push(B.numPointLights),H.push(B.numSpotLights),H.push(B.numSpotLightMaps),H.push(B.numHemiLights),H.push(B.numRectAreaLights),H.push(B.numSunLightShadows),H.push(B.numDirLightShadows),H.push(B.numPointLightShadows),H.push(B.numSpotLightShadows),H.push(B.numSpotLightShadowsWithMaps),H.push(B.numLightProbes),H.push(B.shadowMapType),H.push(B.toneMapping),H.push(B.numClippingPlanes),H.push(B.numClipIntersection),H.push(B.depthPacking)}function M(H,B){h.disableAll(),B.instancing&&h.enable(0),B.instancingColor&&h.enable(1),B.instancingMorph&&h.enable(2),B.matcap&&h.enable(3),B.envMap&&h.enable(4),B.normalMapObjectSpace&&h.enable(5),B.normalMapTangentSpace&&h.enable(6),B.clearcoat&&h.enable(7),B.iridescence&&h.enable(8),B.alphaTest&&h.enable(9),B.vertexColors&&h.enable(10),B.vertexAlphas&&h.enable(11),B.vertexUv1s&&h.enable(12),B.vertexUv2s&&h.enable(13),B.vertexUv3s&&h.enable(14),B.vertexTangents&&h.enable(15),B.anisotropy&&h.enable(16),B.alphaHash&&h.enable(17),B.batching&&h.enable(18),B.dispersion&&h.enable(19),B.retroreflection&&h.enable(24),B.batchingColor&&h.enable(20),B.gradientMap&&h.enable(21),B.packedNormalMap&&h.enable(22),B.vertexNormals&&h.enable(23),H.push(h.mask),h.disableAll(),B.fog&&h.enable(0),B.useFog&&h.enable(1),B.flatShading&&h.enable(2),B.logarithmicDepthBuffer&&h.enable(3),B.reversedDepthBuffer&&h.enable(4),B.skinning&&h.enable(5),B.morphTargets&&h.enable(6),B.morphNormals&&h.enable(7),B.morphColors&&h.enable(8),B.premultipliedAlpha&&h.enable(9),B.shadowMapEnabled&&h.enable(10),B.doubleSided&&h.enable(11),B.flipSided&&h.enable(12),B.useDepthPacking&&h.enable(13),B.dithering&&h.enable(14),B.transmission&&h.enable(15),B.sheen&&h.enable(16),B.opaque&&h.enable(17),B.pointsUvs&&h.enable(18),B.decodeVideoTexture&&h.enable(19),B.decodeVideoTextureEmissive&&h.enable(20),B.alphaToCoverage&&h.enable(21),B.numLightProbeGrids>0&&h.enable(22),B.hasPositionAttribute&&h.enable(23),H.push(h.mask)}function L(H){let B=u[H.type],S;if(B){let E=Da[B];S=$H.clone(E.uniforms)}else S=H.uniforms;return S}function m(H,B){let S=v.get(B);return S!==void 0?++S.usedTimes:(S=new cT(e,B,H,r),l.push(S),v.set(B,S)),S}function w(H){if(--H.usedTimes===0){let B=l.indexOf(H);l[B]=l[l.length-1],l.pop(),v.delete(H.cacheKey),H.destroy()}}function y(H){c.remove(H)}function C(){c.dispose()}return{getParameters:x,getProgramCacheKey:f,getUniforms:L,acquireProgram:m,releaseProgram:w,releaseShaderCache:y,programs:l,dispose:C}}function sT(){let e=new WeakMap;function t(h){return e.has(h)}function a(h){let c=e.get(h);return c===void 0&&(c={},e.set(h,c)),c}function i(h){e.delete(h)}function r(h,c,o){e.get(h)[c]=o}function n(){e=new WeakMap}return{has:t,get:a,remove:i,update:r,dispose:n}}function vT(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function zL(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function xL(){let e=[],t=0,a=[],i=[],r=[];function n(){t=0,a.length=0,i.length=0,r.length=0}function h(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function c(d,u,p,x,f,s){let M=e[t];return M===void 0?(M={id:d.id,object:d,geometry:u,material:p,materialVariant:h(d),groupOrder:x,renderOrder:d.renderOrder,z:f,group:s},e[t]=M):(M.id=d.id,M.object=d,M.geometry=u,M.material=p,M.materialVariant=h(d),M.groupOrder=x,M.renderOrder=d.renderOrder,M.z=f,M.group=s),t++,M}function o(d,u,p,x,f,s,M){M.reversedDepth===!0&&(f=-f);let L=c(d,u,p,x,f,s);p.transmission>0?i.push(L):p.transparent===!0?r.push(L):a.push(L)}function l(d,u,p,x,f,s){let M=c(d,u,p,x,f,s);p.transmission>0?i.unshift(M):p.transparent===!0?r.unshift(M):a.unshift(M)}function v(d,u){a.length>1&&a.sort(d||vT),i.length>1&&i.sort(u||zL),r.length>1&&r.sort(u||zL)}function g(){for(let d=t,u=e.length;d<u;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:a,transmissive:i,transparent:r,init:n,push:o,unshift:l,finish:g,sort:v}}function uT(){let e=new WeakMap;function t(i,r){let n=e.get(i),h;return n===void 0?(h=new xL,e.set(i,[h])):r>=n.length?(h=new xL,n.push(h)):h=n[r],h}function a(){e=new WeakMap}return{get:t,dispose:a}}function gT(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let a;switch(t.type){case"SunLight":case"DirectionalLight":a={direction:new U,color:new $t};break;case"SpotLight":a={position:new U,direction:new U,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":a={position:new U,color:new $t,distance:0,decay:0};break;case"HemisphereLight":a={direction:new U,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":a={color:new $t,position:new U,halfWidth:new U,halfHeight:new U};break}return e[t.id]=a,a}}}function pT(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let a;switch(t.type){case"SunLight":case"DirectionalLight":a={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new h1};break;case"SpotLight":a={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new h1};break;case"PointLight":a={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new h1,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=a,a}}}function MT(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function mT(e){let t=new gT,a=pT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);let r=new U,n=new e2,h=new e2;function c(l){let v=0,g=0,d=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let u=0,p=0,x=0,f=0,s=0,M=0,L=0,m=0,w=0,y=0,C=0,H=0,B=0,S=0;l.sort(MT);for(let O=0,R=l.length;O<R;O++){let b=l[O],I=b.color,q=b.intensity,X=b.distance,j=null;if(b.shadow&&b.shadow.map&&(b.shadow.map.texture.format===xr?j=b.shadow.map.texture:j=b.shadow.map.depthTexture||b.shadow.map.texture),b.isAmbientLight)v+=I.r*q,g+=I.g*q,d+=I.b*q;else if(b.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(b.sh.coefficients[W],q);S++}else if(b.isSunLight){let W=t.get(b);if(W.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){let K=b.shadow,et=a.get(b);et.shadowIntensity=K.intensity,et.shadowBias=K.bias,et.shadowNormalBias=K.normalBias,et.shadowRadius=K.radius,et.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),i.sunShadow[p]=et,i.sunShadowMap[p]=j;let Ot=K.getViewportCount();for(let St=0;St<Ot;St++)i.sunShadowMatrix[x+St]=K.getMatrix(St),i.sunShadowCascade[x+St]=K._cascadeData[St];x+=Ot,p++}i.sun[u]=W,u++}else if(b.isDirectionalLight){let W=t.get(b);if(W.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){let K=b.shadow,et=a.get(b);et.shadowIntensity=K.intensity,et.shadowBias=K.bias,et.shadowNormalBias=K.normalBias,et.shadowRadius=K.radius,et.shadowMapSize=K.mapSize,i.directionalShadow[f]=et,i.directionalShadowMap[f]=j,i.directionalShadowMatrix[f]=b.shadow.matrix,w++}i.directional[f]=W,f++}else if(b.isSpotLight){let W=t.get(b);W.position.setFromMatrixPosition(b.matrixWorld),W.color.copy(I).multiplyScalar(q),W.distance=X,W.coneCos=Math.cos(b.angle),W.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),W.decay=b.decay,i.spot[M]=W;let K=b.shadow;if(b.map&&(i.spotLightMap[H]=b.map,H++,K.updateMatrices(b),b.castShadow&&B++),i.spotLightMatrix[M]=K.matrix,b.castShadow){let et=a.get(b);et.shadowIntensity=K.intensity,et.shadowBias=K.bias,et.shadowNormalBias=K.normalBias,et.shadowRadius=K.radius,et.shadowMapSize=K.mapSize,i.spotShadow[M]=et,i.spotShadowMap[M]=j,C++}M++}else if(b.isRectAreaLight){let W=t.get(b);W.color.copy(I).multiplyScalar(q),W.halfWidth.set(b.width*.5,0,0),W.halfHeight.set(0,b.height*.5,0),i.rectArea[L]=W,L++}else if(b.isPointLight){let W=t.get(b);if(W.color.copy(b.color).multiplyScalar(b.intensity),W.distance=b.distance,W.decay=b.decay,b.castShadow){let K=b.shadow,et=a.get(b);et.shadowIntensity=K.intensity,et.shadowBias=K.bias,et.shadowNormalBias=K.normalBias,et.shadowRadius=K.radius,et.shadowMapSize=K.mapSize,et.shadowCameraNear=K.camera.near,et.shadowCameraFar=K.camera.far,i.pointShadow[s]=et,i.pointShadowMap[s]=j,i.pointShadowMatrix[s]=b.shadow.matrix,y++}i.point[s]=W,s++}else if(b.isHemisphereLight){let W=t.get(b);W.skyColor.copy(b.color).multiplyScalar(q),W.groundColor.copy(b.groundColor).multiplyScalar(q),i.hemi[m]=W,m++}}L>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=v,i.ambient[1]=g,i.ambient[2]=d;let E=i.hash;(E.sunLength!==u||E.directionalLength!==f||E.pointLength!==s||E.spotLength!==M||E.rectAreaLength!==L||E.hemiLength!==m||E.numSunShadows!==p||E.numDirectionalShadows!==w||E.numPointShadows!==y||E.numSpotShadows!==C||E.numSpotMaps!==H||E.numLightProbes!==S)&&(i.sun.length=u,i.directional.length=f,i.spot.length=M,i.rectArea.length=L,i.point.length=s,i.hemi.length=m,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=y,i.pointShadowMap.length=y,i.pointShadowMatrix.length=y,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+H-B,i.spotLightMap.length=H,i.numSpotLightShadowsWithMaps=B,i.numLightProbes=S,E.sunLength=u,E.directionalLength=f,E.pointLength=s,E.spotLength=M,E.rectAreaLength=L,E.hemiLength=m,E.numSunShadows=p,E.numDirectionalShadows=w,E.numPointShadows=y,E.numSpotShadows=C,E.numSpotMaps=H,E.numLightProbes=S,i.version=fT++)}function o(l,v){let g=0,d=0,u=0,p=0,x=0,f=0,s=v.matrixWorldInverse;for(let M=0,L=l.length;M<L;M++){let m=l[M];if(m.isSunLight){let w=i.sun[g];w.direction.setFromMatrixPosition(m.matrixWorld),w.direction.transformDirection(s),g++}else if(m.isDirectionalLight){let w=i.directional[d];w.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(s),d++}else if(m.isSpotLight){let w=i.spot[p];w.position.setFromMatrixPosition(m.matrixWorld),w.position.applyMatrix4(s),w.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(s),p++}else if(m.isRectAreaLight){let w=i.rectArea[x];w.position.setFromMatrixPosition(m.matrixWorld),w.position.applyMatrix4(s),h.identity(),n.copy(m.matrixWorld),n.premultiply(s),h.extractRotation(n),w.halfWidth.set(m.width*.5,0,0),w.halfHeight.set(0,m.height*.5,0),w.halfWidth.applyMatrix4(h),w.halfHeight.applyMatrix4(h),x++}else if(m.isPointLight){let w=i.point[u];w.position.setFromMatrixPosition(m.matrixWorld),w.position.applyMatrix4(s),u++}else if(m.isHemisphereLight){let w=i.hemi[f];w.direction.setFromMatrixPosition(m.matrixWorld),w.direction.transformDirection(s),f++}}}return{setup:c,setupView:o,state:i}}function HL(e){let t=new mT(e),a=[],i=[],r=[];function n(d){g.camera=d,a.length=0,i.length=0,r.length=0}function h(d){a.push(d)}function c(d){i.push(d)}function o(d){r.push(d)}function l(){t.setup(a)}function v(d){t.setupView(a,d)}let g={lightsArray:a,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:n,state:g,setupLights:l,setupLightsView:v,pushLight:h,pushShadow:c,pushLightProbeGrid:o}}function zT(e){let t=new WeakMap;function a(r,n=0){let h=t.get(r),c;return h===void 0?(c=new HL(e),t.set(r,[c])):n>=h.length?(c=new HL(e),h.push(c)):c=h[n],c}function i(){t=new WeakMap}return{get:a,dispose:i}}function wT(e,t,a){let i=new vc,r=new h1,n=new h1,h=new q1,c=new sd,o=new vd,l={},v=a.maxTextureSize,g={[fr]:J2,[J2]:fr,[Ta]:Ta},d=new Se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new h1},radius:{value:4}},vertexShader:xT,fragmentShader:HT}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let p=new Je;p.setAttribute("position",new A2(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new G2(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mc;let s=this.type;this.render=function(y,C,H){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||y.length===0)return;this.type===fH&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=mc);let B=e.getRenderTarget(),S=e.getActiveCubeFace(),E=e.getActiveMipmapLevel(),O=e.state;O.setBlending(Oa),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let R=s!==this.type;R&&C.traverse(function(b){b.material&&(Array.isArray(b.material)?b.material.forEach(I=>I.needsUpdate=!0):b.material.needsUpdate=!0)});for(let b=0,I=y.length;b<I;b++){let q=y[b],X=q.shadow;if(X===void 0){It("WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);let j=X.getFrameExtents();r.multiply(j),n.copy(X.mapSize),(r.x>v||r.y>v)&&(r.x>v&&(n.x=Math.floor(v/j.x),r.x=n.x*j.x,X.mapSize.x=n.x),r.y>v&&(n.y=Math.floor(v/j.y),r.y=n.y*j.y,X.mapSize.y=n.y));let W=e.state.buffers.depth.getReversed();if(X.camera._reversedDepth=W,X.map===null||R===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===o4){if(q.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new W2(r.x,r.y,{format:xr,type:_e,minFilter:T2,magFilter:T2,generateMipmaps:!1}),X.map.texture.name=q.name+".shadowMap",X.map.depthTexture=new sr(r.x,r.y,ua),X.map.depthTexture.name=q.name+".shadowMapDepth",X.map.depthTexture.format=ba,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=y2,X.map.depthTexture.magFilter=y2}else q.isPointLight?(X.map=new f3(r.x),X.map.depthTexture=new dd(r.x,va)):(X.map=new W2(r.x,r.y),X.map.depthTexture=new sr(r.x,r.y,va)),X.map.depthTexture.name=q.name+".shadowMap",X.map.depthTexture.format=ba,this.type===mc?(X.map.depthTexture.compareFunction=W?v3:s3,X.map.depthTexture.minFilter=T2,X.map.depthTexture.magFilter=T2):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=y2,X.map.depthTexture.magFilter=y2);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==r.x||X.map.height!==r.y)&&X.map.setSize(r.x,r.y);let K=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();q.isPointLight!==!0&&X.updateMatrices(q,H);for(let et=0;et<K;et++){let Ot=X.getCamera(et);if(q.isPointLight){let St=X.camera,f1=X.matrix,t1=q.distance||St.far;t1!==St.far&&(St.far=t1,St.updateProjectionMatrix()),bc.setFromMatrixPosition(q.matrixWorld),St.position.copy(bc),Pu.copy(St.position),Pu.add(LT[et]),St.up.copy(VT[et]),St.lookAt(Pu),St.updateMatrixWorld(),f1.makeTranslation(-bc.x,-bc.y,-bc.z),LL.multiplyMatrices(St.projectionMatrix,St.matrixWorldInverse),X._frustum.setFromProjectionMatrix(LL,St.coordinateSystem,St.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)e.setRenderTarget(X.map,et),e.clear();else{et===0&&(e.setRenderTarget(X.map),e.clear());let St=X.getViewport(et);h.set(n.x*St.x,n.y*St.y,n.x*St.z,n.y*St.w),O.viewport(h)}i=X.getFrustum(et),m(C,H,Ot,q,this.type)}X.isPointLightShadow!==!0&&this.type===o4&&M(X,H),X.needsUpdate=!1}s=this.type,f.needsUpdate=!1,e.setRenderTarget(B,S,E)};function M(y,C){let H=t.update(x);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,u.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),y.mapPass===null?y.mapPass=new W2(r.x,r.y,{format:xr,type:_e}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),d.uniforms.shadow_pass.value=y.map.depthTexture,d.uniforms.resolution.value.set(y.map.width,y.map.height),d.uniforms.radius.value=y.radius,e.setRenderTarget(y.mapPass),e.clear(),e.renderBufferDirect(C,null,H,d,x,null),u.uniforms.shadow_pass.value=y.mapPass.texture,u.uniforms.resolution.value.set(y.map.width,y.map.height),u.uniforms.radius.value=y.radius,e.setRenderTarget(y.map),e.clear(),e.renderBufferDirect(C,null,H,u,x,null)}function L(y,C,H,B){let S=null,E=H.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(E!==void 0)S=E;else if(S=H.isPointLight===!0?o:c,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let O=S.uuid,R=C.uuid,b=l[O];b===void 0&&(b={},l[O]=b);let I=b[R];I===void 0&&(I=S.clone(),b[R]=I,C.addEventListener("dispose",w)),S=I}if(S.visible=C.visible,S.wireframe=C.wireframe,B===o4?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:g[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,H.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let O=e.properties.get(S);O.light=H}return S}function m(y,C,H,B,S){if(y.visible===!1)return;if(y.layers.test(C.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&S===o4)&&(!y.frustumCulled||y.intersectsFrustum(i))){y.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,y.matrixWorld);let R=t.update(y),b=y.material;if(Array.isArray(b)){let I=R.groups;for(let q=0,X=I.length;q<X;q++){let j=I[q],W=b[j.materialIndex];if(W&&W.visible){let K=L(y,W,B,S);y.onBeforeShadow(e,y,C,H,R,K,j),e.renderBufferDirect(H,null,R,K,y,j),y.onAfterShadow(e,y,C,H,R,K,j)}}}else if(b.visible){let I=L(y,b,B,S);y.onBeforeShadow(e,y,C,H,R,I,null),e.renderBufferDirect(H,null,R,I,y,null),y.onAfterShadow(e,y,C,H,R,I,null)}}let O=y.children;for(let R=0,b=O.length;R<b;R++)m(O[R],C,H,B,S)}function w(y){y.target.removeEventListener("dispose",w);for(let H in l){let B=l[H],S=y.target.uuid;S in B&&(B[S].dispose(),delete B[S])}}}function yT(e,t){function a(){let T=!1,vt=new q1,Q=null,ut=new q1(0,0,0,0);return{setMask:function(mt){Q!==mt&&!T&&(e.colorMask(mt,mt,mt,mt),Q=mt)},setLocked:function(mt){T=mt},setClear:function(mt,it,Et,kt,_1){_1===!0&&(mt*=kt,it*=kt,Et*=kt),vt.set(mt,it,Et,kt),ut.equals(vt)===!1&&(e.clearColor(mt,it,Et,kt),ut.copy(vt))},reset:function(){T=!1,Q=null,ut.set(-1,0,0,0)}}}function i(){let T=!1,vt=!1,Q=null,ut=null,mt=null;return{setReversed:function(it){if(vt!==it){let Et=t.get("EXT_clip_control");it?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),vt=it;let kt=mt;mt=null,this.setClear(kt)}},getReversed:function(){return vt},setTest:function(it){it?tt(e.DEPTH_TEST):xt(e.DEPTH_TEST)},setMask:function(it){Q!==it&&!T&&(e.depthMask(it),Q=it)},setFunc:function(it){if(vt&&(it=JH[it]),ut!==it){switch(it){case j5:e.depthFunc(e.NEVER);break;case X5:e.depthFunc(e.ALWAYS);break;case q5:e.depthFunc(e.LESS);break;case a4:e.depthFunc(e.LEQUAL);break;case Z5:e.depthFunc(e.EQUAL);break;case Y5:e.depthFunc(e.GEQUAL);break;case K5:e.depthFunc(e.GREATER);break;case J5:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ut=it}},setLocked:function(it){T=it},setClear:function(it){mt!==it&&(mt=it,vt&&(it=1-it),e.clearDepth(it))},reset:function(){T=!1,Q=null,ut=null,mt=null,vt=!1}}}function r(){let T=!1,vt=null,Q=null,ut=null,mt=null,it=null,Et=null,kt=null,_1=null;return{setTest:function(M1){T||(M1?tt(e.STENCIL_TEST):xt(e.STENCIL_TEST))},setMask:function(M1){vt!==M1&&!T&&(e.stencilMask(M1),vt=M1)},setFunc:function(M1,$e,ga){(Q!==M1||ut!==$e||mt!==ga)&&(e.stencilFunc(M1,$e,ga),Q=M1,ut=$e,mt=ga)},setOp:function(M1,$e,ga){(it!==M1||Et!==$e||kt!==ga)&&(e.stencilOp(M1,$e,ga),it=M1,Et=$e,kt=ga)},setLocked:function(M1){T=M1},setClear:function(M1){_1!==M1&&(e.clearStencil(M1),_1=M1)},reset:function(){T=!1,vt=null,Q=null,ut=null,mt=null,it=null,Et=null,kt=null,_1=null}}}let n=new a,h=new i,c=new r,o=new WeakMap,l=new WeakMap,v={},g={},d={},u=new WeakMap,p=[],x=null,f=!1,s=null,M=null,L=null,m=null,w=null,y=null,C=null,H=new $t(0,0,0),B=0,S=!1,E=null,O=null,R=null,b=null,I=null,q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,j=0,W=e.getParameter(e.VERSION);W.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=j>=1):W.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=j>=2);let K=null,et={},Ot=e.getParameter(e.SCISSOR_BOX),St=e.getParameter(e.VIEWPORT),f1=new q1().fromArray(Ot),t1=new q1().fromArray(St);function l1(T,vt,Q,ut){let mt=new Uint8Array(4),it=e.createTexture();e.bindTexture(T,it),e.texParameteri(T,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(T,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Et=0;Et<Q;Et++)T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY?e.texImage3D(vt,0,e.RGBA,1,1,ut,0,e.RGBA,e.UNSIGNED_BYTE,mt):e.texImage2D(vt+Et,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,mt);return it}let Z={};Z[e.TEXTURE_2D]=l1(e.TEXTURE_2D,e.TEXTURE_2D,1),Z[e.TEXTURE_CUBE_MAP]=l1(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[e.TEXTURE_2D_ARRAY]=l1(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Z[e.TEXTURE_3D]=l1(e.TEXTURE_3D,e.TEXTURE_3D,1,1),n.setClear(0,0,0,1),h.setClear(1),c.setClear(0),tt(e.DEPTH_TEST),h.setFunc(a4),Yt(!1),k1(eu),tt(e.CULL_FACE),Ut(Oa);function tt(T){v[T]!==!0&&(e.enable(T),v[T]=!0)}function xt(T){v[T]!==!1&&(e.disable(T),v[T]=!1)}function ht(T,vt){return d[T]!==vt?(e.bindFramebuffer(T,vt),d[T]=vt,T===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=vt),T===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=vt),!0):!1}function nt(T,vt){let Q=p,ut=!1;if(T){Q=u.get(vt),Q===void 0&&(Q=[],u.set(vt,Q));let mt=T.textures;if(Q.length!==mt.length||Q[0]!==e.COLOR_ATTACHMENT0){for(let it=0,Et=mt.length;it<Et;it++)Q[it]=e.COLOR_ATTACHMENT0+it;Q.length=mt.length,ut=!0}}else Q[0]!==e.BACK&&(Q[0]=e.BACK,ut=!0);ut&&e.drawBuffers(Q)}function Ct(T){return x!==T?(e.useProgram(T),x=T,!0):!1}let Zt={[H0]:e.FUNC_ADD,[mH]:e.FUNC_SUBTRACT,[zH]:e.FUNC_REVERSE_SUBTRACT};Zt[xH]=e.MIN,Zt[HH]=e.MAX;let Rt={[LH]:e.ZERO,[VH]:e.ONE,[wH]:e.SRC_COLOR,[ru]:e.SRC_ALPHA,[bH]:e.SRC_ALPHA_SATURATE,[kH]:e.DST_COLOR,[BH]:e.DST_ALPHA,[yH]:e.ONE_MINUS_SRC_COLOR,[nu]:e.ONE_MINUS_SRC_ALPHA,[SH]:e.ONE_MINUS_DST_COLOR,[CH]:e.ONE_MINUS_DST_ALPHA,[_H]:e.CONSTANT_COLOR,[AH]:e.ONE_MINUS_CONSTANT_COLOR,[TH]:e.CONSTANT_ALPHA,[OH]:e.ONE_MINUS_CONSTANT_ALPHA};function Ut(T,vt,Q,ut,mt,it,Et,kt,_1,M1){if(T===Oa){f===!0&&(xt(e.BLEND),f=!1);return}if(f===!1&&(tt(e.BLEND),f=!0),T!==MH){if(T!==s||M1!==S){if((M!==H0||w!==H0)&&(e.blendEquation(e.FUNC_ADD),M=H0,w=H0),M1)switch(T){case Ea:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case zc:e.blendFunc(e.ONE,e.ONE);break;case au:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case iu:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Nt("WebGLState: Invalid blending: ",T);break}else switch(T){case Ea:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case zc:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case au:Nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case iu:Nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Nt("WebGLState: Invalid blending: ",T);break}L=null,m=null,y=null,C=null,H.set(0,0,0),B=0,s=T,S=M1}return}mt=mt||vt,it=it||Q,Et=Et||ut,(vt!==M||mt!==w)&&(e.blendEquationSeparate(Zt[vt],Zt[mt]),M=vt,w=mt),(Q!==L||ut!==m||it!==y||Et!==C)&&(e.blendFuncSeparate(Rt[Q],Rt[ut],Rt[it],Rt[Et]),L=Q,m=ut,y=it,C=Et),(kt.equals(H)===!1||_1!==B)&&(e.blendColor(kt.r,kt.g,kt.b,_1),H.copy(kt),B=_1),s=T,S=!1}function Qt(T,vt){T.side===Ta?xt(e.CULL_FACE):tt(e.CULL_FACE);let Q=T.side===J2;vt&&(Q=!Q),Yt(Q),T.blending===Ea&&T.transparent===!1?Ut(Oa):Ut(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),h.setFunc(T.depthFunc),h.setTest(T.depthTest),h.setMask(T.depthWrite),n.setMask(T.colorWrite);let ut=T.stencilWrite;c.setTest(ut),ut&&(c.setMask(T.stencilWriteMask),c.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),c.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),O2(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?tt(e.SAMPLE_ALPHA_TO_COVERAGE):xt(e.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(T){E!==T&&(T?e.frontFace(e.CW):e.frontFace(e.CCW),E=T)}function k1(T){T!==gH?(tt(e.CULL_FACE),T!==O&&(T===eu?e.cullFace(e.BACK):T===pH?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):xt(e.CULL_FACE),O=T}function a2(T){T!==R&&(X&&e.lineWidth(T),R=T)}function O2(T,vt,Q){T?(tt(e.POLYGON_OFFSET_FILL),(b!==vt||I!==Q)&&(b=vt,I=Q,h.getReversed()&&(vt=-vt),e.polygonOffset(vt,Q))):xt(e.POLYGON_OFFSET_FILL)}function O1(T){T?tt(e.SCISSOR_TEST):xt(e.SCISSOR_TEST)}function X1(T){T===void 0&&(T=e.TEXTURE0+q-1),K!==T&&(e.activeTexture(T),K=T)}function A(T,vt,Q){Q===void 0&&(K===null?Q=e.TEXTURE0+q-1:Q=K);let ut=et[Q];ut===void 0&&(ut={type:void 0,texture:void 0},et[Q]=ut),(ut.type!==T||ut.texture!==vt)&&(K!==Q&&(e.activeTexture(Q),K=Q),e.bindTexture(T,vt||Z[T]),ut.type=T,ut.texture=vt)}function E2(){let T=et[K];T!==void 0&&T.type!==void 0&&(e.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)}function H1(){try{e.compressedTexImage2D(...arguments)}catch(T){Nt("WebGLState:",T)}}function k(){try{e.compressedTexImage3D(...arguments)}catch(T){Nt("WebGLState:",T)}}function z(){try{e.texSubImage2D(...arguments)}catch(T){Nt("WebGLState:",T)}}function D(){try{e.texSubImage3D(...arguments)}catch(T){Nt("WebGLState:",T)}}function F(){try{e.compressedTexSubImage2D(...arguments)}catch(T){Nt("WebGLState:",T)}}function Y(){try{e.compressedTexSubImage3D(...arguments)}catch(T){Nt("WebGLState:",T)}}function ot(){try{e.texStorage2D(...arguments)}catch(T){Nt("WebGLState:",T)}}function lt(){try{e.texStorage3D(...arguments)}catch(T){Nt("WebGLState:",T)}}function J(){try{e.texImage2D(...arguments)}catch(T){Nt("WebGLState:",T)}}function $(){try{e.texImage3D(...arguments)}catch(T){Nt("WebGLState:",T)}}function dt(T){return g[T]!==void 0?g[T]:e.getParameter(T)}function _t(T,vt){g[T]!==vt&&(e.pixelStorei(T,vt),g[T]=vt)}function gt(T){f1.equals(T)===!1&&(e.scissor(T.x,T.y,T.z,T.w),f1.copy(T))}function st(T){t1.equals(T)===!1&&(e.viewport(T.x,T.y,T.z,T.w),t1.copy(T))}function At(T,vt){let Q=l.get(vt);Q===void 0&&(Q=new WeakMap,l.set(vt,Q));let ut=Q.get(T);ut===void 0&&(ut=e.getUniformBlockIndex(vt,T.name),Q.set(T,ut))}function Dt(T,vt){let ut=l.get(vt).get(T);o.get(vt)!==ut&&(e.uniformBlockBinding(vt,ut,T.__bindingPointIndex),o.set(vt,ut))}function Xt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),h.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),v={},g={},K=null,et={},d={},u=new WeakMap,p=[],x=null,f=!1,s=null,M=null,L=null,m=null,w=null,y=null,C=null,H=new $t(0,0,0),B=0,S=!1,E=null,O=null,R=null,b=null,I=null,f1.set(0,0,e.canvas.width,e.canvas.height),t1.set(0,0,e.canvas.width,e.canvas.height),n.reset(),h.reset(),c.reset()}return{buffers:{color:n,depth:h,stencil:c},enable:tt,disable:xt,bindFramebuffer:ht,drawBuffers:nt,useProgram:Ct,setBlending:Ut,setMaterial:Qt,setFlipSided:Yt,setCullFace:k1,setLineWidth:a2,setPolygonOffset:O2,setScissorTest:O1,activeTexture:X1,bindTexture:A,unbindTexture:E2,compressedTexImage2D:H1,compressedTexImage3D:k,texImage2D:J,texImage3D:$,pixelStorei:_t,getParameter:dt,updateUBOMapping:At,uniformBlockBinding:Dt,texStorage2D:ot,texStorage3D:lt,texSubImage2D:z,texSubImage3D:D,compressedTexSubImage2D:F,compressedTexSubImage3D:Y,scissor:gt,viewport:st,reset:Xt}}function BT(e,t,a,i,r,n,h){let c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new h1,v=new WeakMap,g=new Set,d,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(k,z){return p?new OffscreenCanvas(k,z):rc("canvas")}function f(k,z,D){let F=1,Y=H1(k);if((Y.width>D||Y.height>D)&&(F=D/Math.max(Y.width,Y.height)),F<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){let ot=Math.floor(F*Y.width),lt=Math.floor(F*Y.height);d===void 0&&(d=x(ot,lt));let J=z?x(ot,lt):d;return J.width=ot,J.height=lt,J.getContext("2d").drawImage(k,0,0,ot,lt),It("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ot+"x"+lt+")."),J}else return"data"in k&&It("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),k;return k}function s(k){return k.generateMipmaps}function M(k){e.generateMipmap(k)}function L(k){return k.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?e.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function m(k,z,D,F,Y,ot=!1){if(k!==null){if(e[k]!==void 0)return e[k];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let lt;F&&(lt=t.get("EXT_texture_norm16"),lt||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=z;if(z===e.RED&&(D===e.FLOAT&&(J=e.R32F),D===e.HALF_FLOAT&&(J=e.R16F),D===e.UNSIGNED_BYTE&&(J=e.R8),D===e.UNSIGNED_SHORT&&lt&&(J=lt.R16_EXT),D===e.SHORT&&lt&&(J=lt.R16_SNORM_EXT)),z===e.RED_INTEGER&&(D===e.UNSIGNED_BYTE&&(J=e.R8UI),D===e.UNSIGNED_SHORT&&(J=e.R16UI),D===e.UNSIGNED_INT&&(J=e.R32UI),D===e.BYTE&&(J=e.R8I),D===e.SHORT&&(J=e.R16I),D===e.INT&&(J=e.R32I)),z===e.RG&&(D===e.FLOAT&&(J=e.RG32F),D===e.HALF_FLOAT&&(J=e.RG16F),D===e.UNSIGNED_BYTE&&(J=e.RG8),D===e.UNSIGNED_SHORT&&lt&&(J=lt.RG16_EXT),D===e.SHORT&&lt&&(J=lt.RG16_SNORM_EXT)),z===e.RG_INTEGER&&(D===e.UNSIGNED_BYTE&&(J=e.RG8UI),D===e.UNSIGNED_SHORT&&(J=e.RG16UI),D===e.UNSIGNED_INT&&(J=e.RG32UI),D===e.BYTE&&(J=e.RG8I),D===e.SHORT&&(J=e.RG16I),D===e.INT&&(J=e.RG32I)),z===e.RGB_INTEGER&&(D===e.UNSIGNED_BYTE&&(J=e.RGB8UI),D===e.UNSIGNED_SHORT&&(J=e.RGB16UI),D===e.UNSIGNED_INT&&(J=e.RGB32UI),D===e.BYTE&&(J=e.RGB8I),D===e.SHORT&&(J=e.RGB16I),D===e.INT&&(J=e.RGB32I)),z===e.RGBA_INTEGER&&(D===e.UNSIGNED_BYTE&&(J=e.RGBA8UI),D===e.UNSIGNED_SHORT&&(J=e.RGBA16UI),D===e.UNSIGNED_INT&&(J=e.RGBA32UI),D===e.BYTE&&(J=e.RGBA8I),D===e.SHORT&&(J=e.RGBA16I),D===e.INT&&(J=e.RGBA32I)),z===e.RGB&&(D===e.UNSIGNED_SHORT&&lt&&(J=lt.RGB16_EXT),D===e.SHORT&&lt&&(J=lt.RGB16_SNORM_EXT),D===e.UNSIGNED_INT_5_9_9_9_REV&&(J=e.RGB9_E5),D===e.UNSIGNED_INT_10F_11F_11F_REV&&(J=e.R11F_G11F_B10F)),z===e.RGBA){let $=ot?ac:n1.getTransfer(Y);D===e.FLOAT&&(J=e.RGBA32F),D===e.HALF_FLOAT&&(J=e.RGBA16F),D===e.UNSIGNED_BYTE&&(J=$===x1?e.SRGB8_ALPHA8:e.RGBA8),D===e.UNSIGNED_SHORT&&lt&&(J=lt.RGBA16_EXT),D===e.SHORT&&lt&&(J=lt.RGBA16_SNORM_EXT),D===e.UNSIGNED_SHORT_4_4_4_4&&(J=e.RGBA4),D===e.UNSIGNED_SHORT_5_5_5_1&&(J=e.RGB5_A1)}return(J===e.R16F||J===e.R32F||J===e.RG16F||J===e.RG32F||J===e.RGBA16F||J===e.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function w(k,z){let D;return k?z===null||z===va||z===d4?D=e.DEPTH24_STENCIL8:z===ua?D=e.DEPTH32F_STENCIL8:z===l4&&(D=e.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):z===null||z===va||z===d4?D=e.DEPTH_COMPONENT24:z===ua?D=e.DEPTH_COMPONENT32F:z===l4&&(D=e.DEPTH_COMPONENT16),D}function y(k,z){return s(k)===!0||k.isFramebufferTexture&&k.minFilter!==y2&&k.minFilter!==T2?Math.log2(Math.max(z.width,z.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?z.mipmaps.length:1}function C(k){let z=k.target;z.removeEventListener("dispose",C),B(z),z.isVideoTexture&&v.delete(z),z.isHTMLTexture&&g.delete(z)}function H(k){let z=k.target;z.removeEventListener("dispose",H),E(z)}function B(k){let z=i.get(k);if(z.__webglInit===void 0)return;let D=k.source,F=u.get(D);if(F){let Y=F[z.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&S(k),Object.keys(F).length===0&&u.delete(D)}i.remove(k)}function S(k){let z=i.get(k);e.deleteTexture(z.__webglTexture);let D=k.source,F=u.get(D);delete F[z.__cacheKey],h.memory.textures--}function E(k){let z=i.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),i.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(z.__webglFramebuffer[F]))for(let Y=0;Y<z.__webglFramebuffer[F].length;Y++)e.deleteFramebuffer(z.__webglFramebuffer[F][Y]);else e.deleteFramebuffer(z.__webglFramebuffer[F]);z.__webglDepthbuffer&&e.deleteRenderbuffer(z.__webglDepthbuffer[F])}else{if(Array.isArray(z.__webglFramebuffer))for(let F=0;F<z.__webglFramebuffer.length;F++)e.deleteFramebuffer(z.__webglFramebuffer[F]);else e.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&e.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&e.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let F=0;F<z.__webglColorRenderbuffer.length;F++)z.__webglColorRenderbuffer[F]&&e.deleteRenderbuffer(z.__webglColorRenderbuffer[F]);z.__webglDepthRenderbuffer&&e.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let D=k.textures;for(let F=0,Y=D.length;F<Y;F++){let ot=i.get(D[F]);ot.__webglTexture&&(e.deleteTexture(ot.__webglTexture),h.memory.textures--),i.remove(D[F])}i.remove(k)}let O=0;function R(){O=0}function b(){return O}function I(k){O=k}function q(){let k=O;return k>=r.maxTextures&&It("WebGLTextures: Trying to use "+(k+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,k}function X(k){let z=[];return z.push(k.wrapS),z.push(k.wrapT),z.push(k.wrapR||0),z.push(k.magFilter),z.push(k.minFilter),z.push(k.anisotropy),z.push(k.internalFormat),z.push(k.format),z.push(k.type),z.push(k.generateMipmaps),z.push(k.premultiplyAlpha),z.push(k.flipY),z.push(k.unpackAlignment),z.push(k.colorSpace),z.join()}function j(k,z){let D=i.get(k);if(k.isVideoTexture&&A(k),k.isRenderTargetTexture===!1&&k.isExternalTexture!==!0&&k.version>0&&D.__version!==k.version){let F=k.image;if(F===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(D,k,z);return}}else k.isExternalTexture&&(D.__webglTexture=k.sourceTexture?k.sourceTexture:null);a.bindTexture(e.TEXTURE_2D,D.__webglTexture,e.TEXTURE0+z)}function W(k,z){let D=i.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&D.__version!==k.version){xt(D,k,z);return}else k.isExternalTexture&&(D.__webglTexture=k.sourceTexture?k.sourceTexture:null);a.bindTexture(e.TEXTURE_2D_ARRAY,D.__webglTexture,e.TEXTURE0+z)}function K(k,z){let D=i.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&D.__version!==k.version){xt(D,k,z);return}a.bindTexture(e.TEXTURE_3D,D.__webglTexture,e.TEXTURE0+z)}function et(k,z){let D=i.get(k);if(k.isCubeDepthTexture!==!0&&k.version>0&&D.__version!==k.version){ht(D,k,z);return}a.bindTexture(e.TEXTURE_CUBE_MAP,D.__webglTexture,e.TEXTURE0+z)}let Ot={[Q5]:e.REPEAT,[Sa]:e.CLAMP_TO_EDGE,[$5]:e.MIRRORED_REPEAT},St={[y2]:e.NEAREST,[DH]:e.NEAREST_MIPMAP_NEAREST,[Hc]:e.NEAREST_MIPMAP_LINEAR,[T2]:e.LINEAR,[kd]:e.LINEAR_MIPMAP_NEAREST,[mr]:e.LINEAR_MIPMAP_LINEAR},f1={[UH]:e.NEVER,[XH]:e.ALWAYS,[FH]:e.LESS,[s3]:e.LEQUAL,[WH]:e.EQUAL,[v3]:e.GEQUAL,[GH]:e.GREATER,[jH]:e.NOTEQUAL};function t1(k,z){if(z.type===ua&&t.has("OES_texture_float_linear")===!1&&(z.magFilter===T2||z.magFilter===kd||z.magFilter===Hc||z.magFilter===mr||z.minFilter===T2||z.minFilter===kd||z.minFilter===Hc||z.minFilter===mr)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(k,e.TEXTURE_WRAP_S,Ot[z.wrapS]),e.texParameteri(k,e.TEXTURE_WRAP_T,Ot[z.wrapT]),(k===e.TEXTURE_3D||k===e.TEXTURE_2D_ARRAY)&&e.texParameteri(k,e.TEXTURE_WRAP_R,Ot[z.wrapR]),e.texParameteri(k,e.TEXTURE_MAG_FILTER,St[z.magFilter]),e.texParameteri(k,e.TEXTURE_MIN_FILTER,St[z.minFilter]),z.compareFunction&&(e.texParameteri(k,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(k,e.TEXTURE_COMPARE_FUNC,f1[z.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(z.magFilter===y2||z.minFilter!==Hc&&z.minFilter!==mr||z.type===ua&&t.has("OES_texture_float_linear")===!1)return;if(z.anisotropy>1||i.get(z).__currentAnisotropy){let D=t.get("EXT_texture_filter_anisotropic");e.texParameterf(k,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(z.anisotropy,r.getMaxAnisotropy())),i.get(z).__currentAnisotropy=z.anisotropy}}}function l1(k,z){let D=!1;k.__webglInit===void 0&&(k.__webglInit=!0,z.addEventListener("dispose",C));let F=z.source,Y=u.get(F);Y===void 0&&(Y={},u.set(F,Y));let ot=X(z);if(ot!==k.__cacheKey){Y[ot]===void 0&&(Y[ot]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,D=!0),Y[ot].usedTimes++;let lt=Y[k.__cacheKey];lt!==void 0&&(Y[k.__cacheKey].usedTimes--,lt.usedTimes===0&&S(z)),k.__cacheKey=ot,k.__webglTexture=Y[ot].texture}return D}function Z(k,z,D){return Math.floor(Math.floor(k/D)/z)}function tt(k,z,D,F){let ot=k.updateRanges;if(ot.length===0)a.texSubImage2D(e.TEXTURE_2D,0,0,0,z.width,z.height,D,F,z.data);else{ot.sort((_t,gt)=>_t.start-gt.start);let lt=0;for(let _t=1;_t<ot.length;_t++){let gt=ot[lt],st=ot[_t],At=gt.start+gt.count,Dt=Z(st.start,z.width,4),Xt=Z(gt.start,z.width,4);st.start<=At+1&&Dt===Xt&&Z(st.start+st.count-1,z.width,4)===Dt?gt.count=Math.max(gt.count,st.start+st.count-gt.start):(++lt,ot[lt]=st)}ot.length=lt+1;let J=a.getParameter(e.UNPACK_ROW_LENGTH),$=a.getParameter(e.UNPACK_SKIP_PIXELS),dt=a.getParameter(e.UNPACK_SKIP_ROWS);a.pixelStorei(e.UNPACK_ROW_LENGTH,z.width);for(let _t=0,gt=ot.length;_t<gt;_t++){let st=ot[_t],At=Math.floor(st.start/4),Dt=Math.ceil(st.count/4),Xt=At%z.width,T=Math.floor(At/z.width),vt=Dt,Q=1;a.pixelStorei(e.UNPACK_SKIP_PIXELS,Xt),a.pixelStorei(e.UNPACK_SKIP_ROWS,T),a.texSubImage2D(e.TEXTURE_2D,0,Xt,T,vt,Q,D,F,z.data)}k.clearUpdateRanges(),a.pixelStorei(e.UNPACK_ROW_LENGTH,J),a.pixelStorei(e.UNPACK_SKIP_PIXELS,$),a.pixelStorei(e.UNPACK_SKIP_ROWS,dt)}}function xt(k,z,D){let F=e.TEXTURE_2D;(z.isDataArrayTexture||z.isCompressedArrayTexture)&&(F=e.TEXTURE_2D_ARRAY),z.isData3DTexture&&(F=e.TEXTURE_3D);let Y=l1(k,z),ot=z.source;a.bindTexture(F,k.__webglTexture,e.TEXTURE0+D);let lt=i.get(ot);if(ot.version!==lt.__version||Y===!0){if(a.activeTexture(e.TEXTURE0+D),(typeof ImageBitmap<"u"&&z.image instanceof ImageBitmap)===!1){let Q=n1.getPrimaries(n1.workingColorSpace),ut=z.colorSpace===zi?null:n1.getPrimaries(z.colorSpace),mt=z.colorSpace===zi||Q===ut?e.NONE:e.BROWSER_DEFAULT_WEBGL;a.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,z.flipY),a.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),a.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt)}a.pixelStorei(e.UNPACK_ALIGNMENT,z.unpackAlignment);let $=f(z.image,!1,r.maxTextureSize);$=E2(z,$);let dt=n.convert(z.format,z.colorSpace),_t=n.convert(z.type),gt=m(z.internalFormat,dt,_t,z.normalized,z.colorSpace,z.isVideoTexture);t1(F,z);let st,At=z.mipmaps,Dt=z.isVideoTexture!==!0,Xt=lt.__version===void 0||Y===!0,T=ot.dataReady,vt=y(z,$);if(z.isDepthTexture)gt=w(z.format===zr,z.type),Xt&&(Dt?a.texStorage2D(e.TEXTURE_2D,1,gt,$.width,$.height):a.texImage2D(e.TEXTURE_2D,0,gt,$.width,$.height,0,dt,_t,null));else if(z.isDataTexture)if(At.length>0){Dt&&Xt&&a.texStorage2D(e.TEXTURE_2D,vt,gt,At[0].width,At[0].height);for(let Q=0,ut=At.length;Q<ut;Q++)st=At[Q],Dt?T&&a.texSubImage2D(e.TEXTURE_2D,Q,0,0,st.width,st.height,dt,_t,st.data):a.texImage2D(e.TEXTURE_2D,Q,gt,st.width,st.height,0,dt,_t,st.data);z.generateMipmaps=!1}else Dt?(Xt&&a.texStorage2D(e.TEXTURE_2D,vt,gt,$.width,$.height),T&&tt(z,$,dt,_t)):a.texImage2D(e.TEXTURE_2D,0,gt,$.width,$.height,0,dt,_t,$.data);else if(z.isCompressedTexture)if(z.isCompressedArrayTexture){Dt&&Xt&&a.texStorage3D(e.TEXTURE_2D_ARRAY,vt,gt,At[0].width,At[0].height,$.depth);for(let Q=0,ut=At.length;Q<ut;Q++)if(st=At[Q],z.format!==Qe)if(dt!==null)if(Dt){if(T)if(z.layerUpdates.size>0){let mt=Cu(st.width,st.height,z.format,z.type);for(let it of z.layerUpdates){let Et=st.data.subarray(it*mt/st.data.BYTES_PER_ELEMENT,(it+1)*mt/st.data.BYTES_PER_ELEMENT);a.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,it,st.width,st.height,1,dt,Et)}}else a.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,st.width,st.height,$.depth,dt,st.data)}else a.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Q,gt,st.width,st.height,$.depth,0,st.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?T&&a.texSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,st.width,st.height,$.depth,dt,_t,st.data):a.texImage3D(e.TEXTURE_2D_ARRAY,Q,gt,st.width,st.height,$.depth,0,dt,_t,st.data);z.layerUpdates.size>0&&z.clearLayerUpdates()}else{Dt&&Xt&&a.texStorage2D(e.TEXTURE_2D,vt,gt,At[0].width,At[0].height);for(let Q=0,ut=At.length;Q<ut;Q++)st=At[Q],z.format!==Qe?dt!==null?Dt?T&&a.compressedTexSubImage2D(e.TEXTURE_2D,Q,0,0,st.width,st.height,dt,st.data):a.compressedTexImage2D(e.TEXTURE_2D,Q,gt,st.width,st.height,0,st.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?T&&a.texSubImage2D(e.TEXTURE_2D,Q,0,0,st.width,st.height,dt,_t,st.data):a.texImage2D(e.TEXTURE_2D,Q,gt,st.width,st.height,0,dt,_t,st.data)}else if(z.isDataArrayTexture)if(Dt){if(Xt&&a.texStorage3D(e.TEXTURE_2D_ARRAY,vt,gt,$.width,$.height,$.depth),T)if(z.layerUpdates.size>0){let Q=Cu($.width,$.height,z.format,z.type);for(let ut of z.layerUpdates){let mt=$.data.subarray(ut*Q/$.data.BYTES_PER_ELEMENT,(ut+1)*Q/$.data.BYTES_PER_ELEMENT);a.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ut,$.width,$.height,1,dt,_t,mt)}z.clearLayerUpdates()}else a.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,dt,_t,$.data)}else a.texImage3D(e.TEXTURE_2D_ARRAY,0,gt,$.width,$.height,$.depth,0,dt,_t,$.data);else if(z.isData3DTexture)Dt?(Xt&&a.texStorage3D(e.TEXTURE_3D,vt,gt,$.width,$.height,$.depth),T&&a.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,dt,_t,$.data)):a.texImage3D(e.TEXTURE_3D,0,gt,$.width,$.height,$.depth,0,dt,_t,$.data);else if(z.isFramebufferTexture){if(Xt)if(Dt)a.texStorage2D(e.TEXTURE_2D,vt,gt,$.width,$.height);else{let Q=$.width,ut=$.height;for(let mt=0;mt<vt;mt++)a.texImage2D(e.TEXTURE_2D,mt,gt,Q,ut,0,dt,_t,null),Q>>=1,ut>>=1}}else if(z.isHTMLTexture){if("texElementImage2D"in e){let Q=e.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),$.parentNode!==Q){Q.appendChild($),g.add(z),Q.onpaint=ut=>{let mt=ut.changedElements;for(let it of g)mt.includes(it.image)&&(it.needsUpdate=!0)},Q.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,$);else{let mt=e.RGBA,it=e.RGBA,Et=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,mt,it,Et,$)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(At.length>0){if(Dt&&Xt){let Q=H1(At[0]);a.texStorage2D(e.TEXTURE_2D,vt,gt,Q.width,Q.height)}for(let Q=0,ut=At.length;Q<ut;Q++)st=At[Q],Dt?T&&a.texSubImage2D(e.TEXTURE_2D,Q,0,0,dt,_t,st):a.texImage2D(e.TEXTURE_2D,Q,gt,dt,_t,st);z.generateMipmaps=!1}else if(Dt){if(Xt){let Q=H1($);a.texStorage2D(e.TEXTURE_2D,vt,gt,Q.width,Q.height)}T&&a.texSubImage2D(e.TEXTURE_2D,0,0,0,dt,_t,$)}else a.texImage2D(e.TEXTURE_2D,0,gt,dt,_t,$);s(z)&&M(F),lt.__version=ot.version,z.onUpdate&&z.onUpdate(z)}k.__version=z.version}function ht(k,z,D){if(z.image.length!==6)return;let F=l1(k,z),Y=z.source;a.bindTexture(e.TEXTURE_CUBE_MAP,k.__webglTexture,e.TEXTURE0+D);let ot=i.get(Y);if(Y.version!==ot.__version||F===!0){a.activeTexture(e.TEXTURE0+D);let lt=n1.getPrimaries(n1.workingColorSpace),J=z.colorSpace===zi?null:n1.getPrimaries(z.colorSpace),$=z.colorSpace===zi||lt===J?e.NONE:e.BROWSER_DEFAULT_WEBGL;a.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,z.flipY),a.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),a.pixelStorei(e.UNPACK_ALIGNMENT,z.unpackAlignment),a.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let dt=z.isCompressedTexture||z.image[0].isCompressedTexture,_t=z.image[0]&&z.image[0].isDataTexture,gt=[];for(let it=0;it<6;it++)!dt&&!_t?gt[it]=f(z.image[it],!0,r.maxCubemapSize):gt[it]=_t?z.image[it].image:z.image[it],gt[it]=E2(z,gt[it]);let st=gt[0],At=n.convert(z.format,z.colorSpace),Dt=n.convert(z.type),Xt=m(z.internalFormat,At,Dt,z.normalized,z.colorSpace),T=z.isVideoTexture!==!0,vt=ot.__version===void 0||F===!0,Q=Y.dataReady,ut=y(z,st);t1(e.TEXTURE_CUBE_MAP,z);let mt;if(dt){T&&vt&&a.texStorage2D(e.TEXTURE_CUBE_MAP,ut,Xt,st.width,st.height);for(let it=0;it<6;it++){mt=gt[it].mipmaps;for(let Et=0;Et<mt.length;Et++){let kt=mt[Et];z.format!==Qe?At!==null?T?Q&&a.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,0,0,kt.width,kt.height,At,kt.data):a.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,Xt,kt.width,kt.height,0,kt.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):T?Q&&a.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,0,0,kt.width,kt.height,At,Dt,kt.data):a.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,Xt,kt.width,kt.height,0,At,Dt,kt.data)}}}else{if(mt=z.mipmaps,T&&vt){mt.length>0&&ut++;let it=H1(gt[0]);a.texStorage2D(e.TEXTURE_CUBE_MAP,ut,Xt,it.width,it.height)}for(let it=0;it<6;it++)if(_t){T?Q&&a.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,gt[it].width,gt[it].height,At,Dt,gt[it].data):a.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Xt,gt[it].width,gt[it].height,0,At,Dt,gt[it].data);for(let Et=0;Et<mt.length;Et++){let _1=mt[Et].image[it].image;T?Q&&a.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,0,0,_1.width,_1.height,At,Dt,_1.data):a.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,Xt,_1.width,_1.height,0,At,Dt,_1.data)}}else{T?Q&&a.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,At,Dt,gt[it]):a.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Xt,At,Dt,gt[it]);for(let Et=0;Et<mt.length;Et++){let kt=mt[Et];T?Q&&a.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,0,0,At,Dt,kt.image[it]):a.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,Xt,At,Dt,kt.image[it])}}}s(z)&&M(e.TEXTURE_CUBE_MAP),ot.__version=Y.version,z.onUpdate&&z.onUpdate(z)}k.__version=z.version}function nt(k,z,D,F,Y,ot){let lt=n.convert(D.format,D.colorSpace),J=n.convert(D.type),$=m(D.internalFormat,lt,J,D.normalized,D.colorSpace),dt=i.get(z),_t=i.get(D);if(_t.__renderTarget=z,!dt.__hasExternalTextures){let gt=Math.max(1,z.width>>ot),st=Math.max(1,z.height>>ot);Y===e.TEXTURE_3D||Y===e.TEXTURE_2D_ARRAY?a.texImage3D(Y,ot,$,gt,st,z.depth,0,lt,J,null):a.texImage2D(Y,ot,$,gt,st,0,lt,J,null)}a.bindFramebuffer(e.FRAMEBUFFER,k),X1(z)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,F,Y,_t.__webglTexture,0,O1(z)):(Y===e.TEXTURE_2D||Y>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,F,Y,_t.__webglTexture,ot),a.bindFramebuffer(e.FRAMEBUFFER,null)}function Ct(k,z,D){if(e.bindRenderbuffer(e.RENDERBUFFER,k),z.depthBuffer){let F=z.depthTexture,Y=F&&F.isDepthTexture?F.type:null,ot=w(z.stencilBuffer,Y),lt=z.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;X1(z)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,O1(z),ot,z.width,z.height):D?e.renderbufferStorageMultisample(e.RENDERBUFFER,O1(z),ot,z.width,z.height):e.renderbufferStorage(e.RENDERBUFFER,ot,z.width,z.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,lt,e.RENDERBUFFER,k)}else{let F=z.textures;for(let Y=0;Y<F.length;Y++){let ot=F[Y],lt=n.convert(ot.format,ot.colorSpace),J=n.convert(ot.type),$=m(ot.internalFormat,lt,J,ot.normalized,ot.colorSpace);X1(z)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,O1(z),$,z.width,z.height):D?e.renderbufferStorageMultisample(e.RENDERBUFFER,O1(z),$,z.width,z.height):e.renderbufferStorage(e.RENDERBUFFER,$,z.width,z.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Zt(k,z,D){let F=z.isWebGLCubeRenderTarget===!0;if(a.bindFramebuffer(e.FRAMEBUFFER,k),!(z.depthTexture&&z.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(z.depthTexture);if(Y.__renderTarget=z,(!Y.__webglTexture||z.depthTexture.image.width!==z.width||z.depthTexture.image.height!==z.height)&&(z.depthTexture.image.width=z.width,z.depthTexture.image.height=z.height,z.depthTexture.needsUpdate=!0),F){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,z.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=e.createTexture(),a.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture),t1(e.TEXTURE_CUBE_MAP,z.depthTexture);let dt=n.convert(z.depthTexture.format),_t=n.convert(z.depthTexture.type),gt;z.depthTexture.format===ba?gt=e.DEPTH_COMPONENT24:z.depthTexture.format===zr&&(gt=e.DEPTH24_STENCIL8);for(let st=0;st<6;st++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,gt,z.width,z.height,0,dt,_t,null)}}else j(z.depthTexture,0);let ot=Y.__webglTexture,lt=O1(z),J=F?e.TEXTURE_CUBE_MAP_POSITIVE_X+D:e.TEXTURE_2D,$=z.depthTexture.format===zr?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(z.depthTexture.format===ba)X1(z)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,$,J,ot,0,lt):e.framebufferTexture2D(e.FRAMEBUFFER,$,J,ot,0);else if(z.depthTexture.format===zr)X1(z)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,$,J,ot,0,lt):e.framebufferTexture2D(e.FRAMEBUFFER,$,J,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Rt(k){let z=i.get(k),D=k.isWebGLCubeRenderTarget===!0;if(z.__boundDepthTexture!==k.depthTexture){let F=k.depthTexture;if(z.__depthDisposeCallback&&z.__depthDisposeCallback(),F){let Y=()=>{delete z.__boundDepthTexture,delete z.__depthDisposeCallback,F.removeEventListener("dispose",Y)};F.addEventListener("dispose",Y),z.__depthDisposeCallback=Y}z.__boundDepthTexture=F}if(k.depthTexture&&!z.__autoAllocateDepthBuffer)if(D)for(let F=0;F<6;F++)Zt(z.__webglFramebuffer[F],k,F);else{let F=k.texture.mipmaps;F&&F.length>0?Zt(z.__webglFramebuffer[0],k,0):Zt(z.__webglFramebuffer,k,0)}else if(D){z.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(a.bindFramebuffer(e.FRAMEBUFFER,z.__webglFramebuffer[F]),z.__webglDepthbuffer[F]===void 0)z.__webglDepthbuffer[F]=e.createRenderbuffer(),Ct(z.__webglDepthbuffer[F],k,!1);else{let Y=k.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=z.__webglDepthbuffer[F];e.bindRenderbuffer(e.RENDERBUFFER,ot),e.framebufferRenderbuffer(e.FRAMEBUFFER,Y,e.RENDERBUFFER,ot)}}else{let F=k.texture.mipmaps;if(F&&F.length>0?a.bindFramebuffer(e.FRAMEBUFFER,z.__webglFramebuffer[0]):a.bindFramebuffer(e.FRAMEBUFFER,z.__webglFramebuffer),z.__webglDepthbuffer===void 0)z.__webglDepthbuffer=e.createRenderbuffer(),Ct(z.__webglDepthbuffer,k,!1);else{let Y=k.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=z.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,ot),e.framebufferRenderbuffer(e.FRAMEBUFFER,Y,e.RENDERBUFFER,ot)}}a.bindFramebuffer(e.FRAMEBUFFER,null)}function Ut(k,z,D){let F=i.get(k);z!==void 0&&nt(F.__webglFramebuffer,k,k.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),D!==void 0&&Rt(k)}function Qt(k){let z=k.texture,D=i.get(k),F=i.get(z);k.addEventListener("dispose",H);let Y=k.textures,ot=k.isWebGLCubeRenderTarget===!0,lt=Y.length>1;if(lt||(F.__webglTexture===void 0&&(F.__webglTexture=e.createTexture()),F.__version=z.version,h.memory.textures++),ot){D.__webglFramebuffer=[];for(let J=0;J<6;J++)if(z.mipmaps&&z.mipmaps.length>0){D.__webglFramebuffer[J]=[];for(let $=0;$<z.mipmaps.length;$++)D.__webglFramebuffer[J][$]=e.createFramebuffer()}else D.__webglFramebuffer[J]=e.createFramebuffer()}else{if(z.mipmaps&&z.mipmaps.length>0){D.__webglFramebuffer=[];for(let J=0;J<z.mipmaps.length;J++)D.__webglFramebuffer[J]=e.createFramebuffer()}else D.__webglFramebuffer=e.createFramebuffer();if(lt)for(let J=0,$=Y.length;J<$;J++){let dt=i.get(Y[J]);dt.__webglTexture===void 0&&(dt.__webglTexture=e.createTexture(),h.memory.textures++)}if(k.samples>0&&X1(k)===!1){D.__webglMultisampledFramebuffer=e.createFramebuffer(),D.__webglColorRenderbuffer=[],a.bindFramebuffer(e.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let J=0;J<Y.length;J++){let $=Y[J];D.__webglColorRenderbuffer[J]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,D.__webglColorRenderbuffer[J]);let dt=n.convert($.format,$.colorSpace),_t=n.convert($.type),gt=m($.internalFormat,dt,_t,$.normalized,$.colorSpace,k.isXRRenderTarget===!0),st=O1(k);e.renderbufferStorageMultisample(e.RENDERBUFFER,st,gt,k.width,k.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+J,e.RENDERBUFFER,D.__webglColorRenderbuffer[J])}e.bindRenderbuffer(e.RENDERBUFFER,null),k.depthBuffer&&(D.__webglDepthRenderbuffer=e.createRenderbuffer(),Ct(D.__webglDepthRenderbuffer,k,!0)),a.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ot){a.bindTexture(e.TEXTURE_CUBE_MAP,F.__webglTexture),t1(e.TEXTURE_CUBE_MAP,z);for(let J=0;J<6;J++)if(z.mipmaps&&z.mipmaps.length>0)for(let $=0;$<z.mipmaps.length;$++)nt(D.__webglFramebuffer[J][$],k,z,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+J,$);else nt(D.__webglFramebuffer[J],k,z,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);s(z)&&M(e.TEXTURE_CUBE_MAP),a.unbindTexture()}else if(lt){for(let J=0,$=Y.length;J<$;J++){let dt=Y[J],_t=i.get(dt),gt=e.TEXTURE_2D;(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(gt=k.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),a.bindTexture(gt,_t.__webglTexture),t1(gt,dt),nt(D.__webglFramebuffer,k,dt,e.COLOR_ATTACHMENT0+J,gt,0),s(dt)&&M(gt)}a.unbindTexture()}else{let J=e.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(J=k.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),a.bindTexture(J,F.__webglTexture),t1(J,z),z.mipmaps&&z.mipmaps.length>0)for(let $=0;$<z.mipmaps.length;$++)nt(D.__webglFramebuffer[$],k,z,e.COLOR_ATTACHMENT0,J,$);else nt(D.__webglFramebuffer,k,z,e.COLOR_ATTACHMENT0,J,0);s(z)&&M(J),a.unbindTexture()}k.depthBuffer&&Rt(k)}function Yt(k){let z=k.textures;for(let D=0,F=z.length;D<F;D++){let Y=z[D];if(s(Y)){let ot=L(k),lt=i.get(Y).__webglTexture;a.bindTexture(ot,lt),M(ot),a.unbindTexture()}}}let k1=[],a2=[];function O2(k){if(k.samples>0){if(X1(k)===!1){let z=k.textures,D=k.width,F=k.height,Y=e.COLOR_BUFFER_BIT,ot=k.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,lt=i.get(k),J=z.length>1;if(J)for(let dt=0;dt<z.length;dt++)a.bindFramebuffer(e.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.RENDERBUFFER,null),a.bindFramebuffer(e.FRAMEBUFFER,lt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.TEXTURE_2D,null,0);a.bindFramebuffer(e.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);let $=k.texture.mipmaps;$&&$.length>0?a.bindFramebuffer(e.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):a.bindFramebuffer(e.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let dt=0;dt<z.length;dt++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(Y|=e.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(Y|=e.STENCIL_BUFFER_BIT)),J){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,lt.__webglColorRenderbuffer[dt]);let _t=i.get(z[dt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,_t,0)}e.blitFramebuffer(0,0,D,F,0,0,D,F,Y,e.NEAREST),o===!0&&(k1.length=0,a2.length=0,k1.push(e.COLOR_ATTACHMENT0+dt),k.depthBuffer&&k.storeMultisampledDepthBuffer===!1&&(k1.push(ot),a2.push(ot),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,a2)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,k1))}if(a.bindFramebuffer(e.READ_FRAMEBUFFER,null),a.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),J)for(let dt=0;dt<z.length;dt++){a.bindFramebuffer(e.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.RENDERBUFFER,lt.__webglColorRenderbuffer[dt]);let _t=i.get(z[dt]).__webglTexture;a.bindFramebuffer(e.FRAMEBUFFER,lt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+dt,e.TEXTURE_2D,_t,0)}a.bindFramebuffer(e.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.storeMultisampledDepthBuffer===!1&&o){let z=k.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[z])}}}function O1(k){return Math.min(r.maxSamples,k.samples)}function X1(k){let z=i.get(k);return k.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&z.__useRenderToTexture!==!1}function A(k){let z=h.render.frame;v.get(k)!==z&&(v.set(k,z),k.update())}function E2(k,z){let D=k.colorSpace,F=k.format,Y=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||D!==ec&&D!==zi&&(n1.getTransfer(D)===x1?(F!==Qe||Y!==Q2)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Nt("WebGLTextures: Unsupported texture color space:",D)),z}function H1(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(l.width=k.naturalWidth||k.width,l.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(l.width=k.displayWidth,l.height=k.displayHeight):(l.width=k.width,l.height=k.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=R,this.getTextureUnits=b,this.setTextureUnits=I,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=et,this.rebindTextures=Ut,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=O2,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=X1,this.isReversedDepthBuffer=function(){return a.buffers.depth.getReversed()}}function CT(e,t){function a(i,r=zi){let n,h=n1.getTransfer(r);if(i===Q2)return e.UNSIGNED_BYTE;if(i===bd)return e.UNSIGNED_SHORT_4_4_4_4;if(i===_d)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Mu)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===mu)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===pu)return e.BYTE;if(i===fu)return e.SHORT;if(i===l4)return e.UNSIGNED_SHORT;if(i===Sd)return e.INT;if(i===va)return e.UNSIGNED_INT;if(i===ua)return e.FLOAT;if(i===_e)return e.HALF_FLOAT;if(i===zu)return e.ALPHA;if(i===xu)return e.RGB;if(i===Qe)return e.RGBA;if(i===ba)return e.DEPTH_COMPONENT;if(i===zr)return e.DEPTH_STENCIL;if(i===Hu)return e.RED;if(i===Ad)return e.RED_INTEGER;if(i===xr)return e.RG;if(i===Td)return e.RG_INTEGER;if(i===Od)return e.RGBA_INTEGER;if(i===Lc||i===Vc||i===wc||i===yc)if(h===x1)if(n=t.get("WEBGL_compressed_texture_s3tc_srgb"),n!==null){if(i===Lc)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vc)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wc)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===yc)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(n=t.get("WEBGL_compressed_texture_s3tc"),n!==null){if(i===Lc)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vc)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wc)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===yc)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ed||i===Rd||i===Dd||i===Id)if(n=t.get("WEBGL_compressed_texture_pvrtc"),n!==null){if(i===Ed)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Rd)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Dd)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Id)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pd||i===Nd||i===Ud||i===Fd||i===Wd||i===Bc||i===Gd)if(n=t.get("WEBGL_compressed_texture_etc"),n!==null){if(i===Pd||i===Nd)return h===x1?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(i===Ud)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(i===Fd)return n.COMPRESSED_R11_EAC;if(i===Wd)return n.COMPRESSED_SIGNED_R11_EAC;if(i===Bc)return n.COMPRESSED_RG11_EAC;if(i===Gd)return n.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===jd||i===Xd||i===qd||i===Zd||i===Yd||i===Kd||i===Jd||i===Qd||i===$d||i===t3||i===e3||i===a3||i===i3||i===r3)if(n=t.get("WEBGL_compressed_texture_astc"),n!==null){if(i===jd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Zd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Kd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Jd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Qd)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$d)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===t3)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===e3)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===a3)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===i3)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===r3)return h===x1?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===n3||i===h3||i===c3)if(n=t.get("EXT_texture_compression_bptc"),n!==null){if(i===n3)return h===x1?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===h3)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===c3)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===o3||i===l3||i===Cc||i===d3)if(n=t.get("EXT_texture_compression_rgtc"),n!==null){if(i===o3)return n.COMPRESSED_RED_RGTC1_EXT;if(i===l3)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cc)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===d3)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===d4?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:a}}function _T(e,t){function a(f,s){f.matrixAutoUpdate===!0&&f.updateMatrix(),s.value.copy(f.matrix)}function i(f,s){s.color.getRGB(f.fogColor.value,wu(e)),s.isFog?(f.fogNear.value=s.near,f.fogFar.value=s.far):s.isFogExp2&&(f.fogDensity.value=s.density)}function r(f,s,M,L,m){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(f,s):s.isMeshLambertMaterial?(n(f,s),s.envMap&&(f.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(f,s),g(f,s)):s.isMeshPhongMaterial?(n(f,s),v(f,s),s.envMap&&(f.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(f,s),d(f,s),s.isMeshPhysicalMaterial&&u(f,s,m)):s.isMeshMatcapMaterial?(n(f,s),p(f,s)):s.isMeshDepthMaterial?n(f,s):s.isMeshDistanceMaterial?(n(f,s),x(f,s)):s.isMeshNormalMaterial?n(f,s):s.isLineBasicMaterial?(h(f,s),s.isLineDashedMaterial&&c(f,s)):s.isPointsMaterial?o(f,s,M,L):s.isSpriteMaterial?l(f,s):s.isShadowMaterial?(f.color.value.copy(s.color),f.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}function n(f,s){f.opacity.value=s.opacity,s.color&&f.diffuse.value.copy(s.color),s.emissive&&f.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(f.map.value=s.map,a(s.map,f.mapTransform)),s.alphaMap&&(f.alphaMap.value=s.alphaMap,a(s.alphaMap,f.alphaMapTransform)),s.bumpMap&&(f.bumpMap.value=s.bumpMap,a(s.bumpMap,f.bumpMapTransform),f.bumpScale.value=s.bumpScale,s.side===J2&&(f.bumpScale.value*=-1)),s.normalMap&&(f.normalMap.value=s.normalMap,a(s.normalMap,f.normalMapTransform),f.normalScale.value.copy(s.normalScale),s.side===J2&&f.normalScale.value.negate()),s.displacementMap&&(f.displacementMap.value=s.displacementMap,a(s.displacementMap,f.displacementMapTransform),f.displacementScale.value=s.displacementScale,f.displacementBias.value=s.displacementBias),s.emissiveMap&&(f.emissiveMap.value=s.emissiveMap,a(s.emissiveMap,f.emissiveMapTransform)),s.specularMap&&(f.specularMap.value=s.specularMap,a(s.specularMap,f.specularMapTransform)),s.alphaTest>0&&(f.alphaTest.value=s.alphaTest);let M=t.get(s),L=M.envMap,m=M.envMapRotation;L&&(f.envMap.value=L,f.envMapRotation.value.setFromMatrix4(bT.makeRotationFromEuler(m)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(SL),f.reflectivity.value=s.reflectivity,f.ior.value=s.ior,f.refractionRatio.value=s.refractionRatio),s.lightMap&&(f.lightMap.value=s.lightMap,f.lightMapIntensity.value=s.lightMapIntensity,a(s.lightMap,f.lightMapTransform)),s.aoMap&&(f.aoMap.value=s.aoMap,f.aoMapIntensity.value=s.aoMapIntensity,a(s.aoMap,f.aoMapTransform))}function h(f,s){f.diffuse.value.copy(s.color),f.opacity.value=s.opacity,s.map&&(f.map.value=s.map,a(s.map,f.mapTransform))}function c(f,s){f.dashSize.value=s.dashSize,f.totalSize.value=s.dashSize+s.gapSize,f.scale.value=s.scale}function o(f,s,M,L){f.diffuse.value.copy(s.color),f.opacity.value=s.opacity,f.size.value=s.size*M,f.scale.value=L*.5,s.map&&(f.map.value=s.map,a(s.map,f.uvTransform)),s.alphaMap&&(f.alphaMap.value=s.alphaMap,a(s.alphaMap,f.alphaMapTransform)),s.alphaTest>0&&(f.alphaTest.value=s.alphaTest)}function l(f,s){f.diffuse.value.copy(s.color),f.opacity.value=s.opacity,f.rotation.value=s.rotation,s.map&&(f.map.value=s.map,a(s.map,f.mapTransform)),s.alphaMap&&(f.alphaMap.value=s.alphaMap,a(s.alphaMap,f.alphaMapTransform)),s.alphaTest>0&&(f.alphaTest.value=s.alphaTest)}function v(f,s){f.specular.value.copy(s.specular),f.shininess.value=Math.max(s.shininess,1e-4)}function g(f,s){s.gradientMap&&(f.gradientMap.value=s.gradientMap)}function d(f,s){f.metalness.value=s.metalness,s.metalnessMap&&(f.metalnessMap.value=s.metalnessMap,a(s.metalnessMap,f.metalnessMapTransform)),f.roughness.value=s.roughness,s.roughnessMap&&(f.roughnessMap.value=s.roughnessMap,a(s.roughnessMap,f.roughnessMapTransform)),s.envMap&&(f.envMapIntensity.value=s.envMapIntensity)}function u(f,s,M){f.ior.value=s.ior,s.sheen>0&&(f.sheenColor.value.copy(s.sheenColor).multiplyScalar(s.sheen),f.sheenRoughness.value=s.sheenRoughness,s.sheenColorMap&&(f.sheenColorMap.value=s.sheenColorMap,a(s.sheenColorMap,f.sheenColorMapTransform)),s.sheenRoughnessMap&&(f.sheenRoughnessMap.value=s.sheenRoughnessMap,a(s.sheenRoughnessMap,f.sheenRoughnessMapTransform))),s.clearcoat>0&&(f.clearcoat.value=s.clearcoat,f.clearcoatRoughness.value=s.clearcoatRoughness,s.clearcoatMap&&(f.clearcoatMap.value=s.clearcoatMap,a(s.clearcoatMap,f.clearcoatMapTransform)),s.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=s.clearcoatRoughnessMap,a(s.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),s.clearcoatNormalMap&&(f.clearcoatNormalMap.value=s.clearcoatNormalMap,a(s.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(s.clearcoatNormalScale),s.side===J2&&f.clearcoatNormalScale.value.negate())),s.dispersion>0&&(f.dispersion.value=s.dispersion),s.retroreflectivity>0&&(f.retroreflectivity.value=s.retroreflectivity),s.iridescence>0&&(f.iridescence.value=s.iridescence,f.iridescenceIOR.value=s.iridescenceIOR,f.iridescenceThicknessMinimum.value=s.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=s.iridescenceThicknessRange[1],s.iridescenceMap&&(f.iridescenceMap.value=s.iridescenceMap,a(s.iridescenceMap,f.iridescenceMapTransform)),s.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=s.iridescenceThicknessMap,a(s.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),s.transmission>0&&(f.transmission.value=s.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),s.transmissionMap&&(f.transmissionMap.value=s.transmissionMap,a(s.transmissionMap,f.transmissionMapTransform)),f.thickness.value=s.thickness,s.thicknessMap&&(f.thicknessMap.value=s.thicknessMap,a(s.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=s.attenuationDistance,f.attenuationColor.value.copy(s.attenuationColor)),s.anisotropy>0&&(f.anisotropyVector.value.set(s.anisotropy*Math.cos(s.anisotropyRotation),s.anisotropy*Math.sin(s.anisotropyRotation)),s.anisotropyMap&&(f.anisotropyMap.value=s.anisotropyMap,a(s.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=s.specularIntensity,f.specularColor.value.copy(s.specularColor),s.specularColorMap&&(f.specularColorMap.value=s.specularColorMap,a(s.specularColorMap,f.specularColorMapTransform)),s.specularIntensityMap&&(f.specularIntensityMap.value=s.specularIntensityMap,a(s.specularIntensityMap,f.specularIntensityMapTransform))}function p(f,s){s.matcap&&(f.matcap.value=s.matcap)}function x(f,s){let M=t.get(s).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function AT(e,t,a,i){let r={},n={},h=[],c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function o(m,w){let y=w.program;i.uniformBlockBinding(m,y)}function l(m,w){let y=r[m.id];y===void 0&&(f(m),y=v(m),r[m.id]=y,m.addEventListener("dispose",M));let C=w.program;i.updateUBOMapping(m,C);let H=t.render.frame;n[m.id]!==H&&(d(m),n[m.id]=H)}function v(m){let w=g();m.__bindingPointIndex=w;let y=e.createBuffer(),C=m.__size,H=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,C,H),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,w,y),y}function g(){for(let m=0;m<c;m++)if(h.indexOf(m)===-1)return h.push(m),m;return Nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(m){let w=r[m.id],y=m.uniforms,C=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,w);for(let H=0,B=y.length;H<B;H++){let S=y[H];if(Array.isArray(S))for(let E=0,O=S.length;E<O;E++)u(S[E],H,E,C);else u(S,H,0,C)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(m,w,y,C){if(x(m,w,y,C)===!0){let H=m.__offset,B=m.value;if(Array.isArray(B)){let S=0;for(let E=0;E<B.length;E++){let O=B[E],R=s(O);p(O,m.__data,S),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(S+=R.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(B,m.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,H,m.__data)}}function p(m,w,y){typeof m=="number"||typeof m=="boolean"?w[0]=m:m.isMatrix3?(w[0]=m.elements[0],w[1]=m.elements[1],w[2]=m.elements[2],w[3]=0,w[4]=m.elements[3],w[5]=m.elements[4],w[6]=m.elements[5],w[7]=0,w[8]=m.elements[6],w[9]=m.elements[7],w[10]=m.elements[8],w[11]=0):ArrayBuffer.isView(m)?w.set(new m.constructor(m.buffer,m.byteOffset,w.length)):m.toArray(w,y)}function x(m,w,y,C){let H=m.value,B=w+"_"+y;if(C[B]===void 0)return typeof H=="number"||typeof H=="boolean"?C[B]=H:ArrayBuffer.isView(H)?C[B]=H.slice():C[B]=H.clone(),!0;{let S=C[B];if(typeof H=="number"||typeof H=="boolean"){if(S!==H)return C[B]=H,!0}else{if(ArrayBuffer.isView(H))return!0;if(S.equals(H)===!1)return S.copy(H),!0}}return!1}function f(m){let w=m.uniforms,y=0,C=16;for(let B=0,S=w.length;B<S;B++){let E=Array.isArray(w[B])?w[B]:[w[B]];for(let O=0,R=E.length;O<R;O++){let b=E[O],I=Array.isArray(b.value)?b.value:[b.value];for(let q=0,X=I.length;q<X;q++){let j=I[q],W=s(j),K=y%C,et=K%W.boundary,Ot=K+et;y+=et,Ot!==0&&C-Ot<W.storage&&(y+=C-Ot),b.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=y,y+=W.storage}}}let H=y%C;return H>0&&(y+=C-H),m.__size=y,m.__cache={},this}function s(m){let w={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(w.boundary=4,w.storage=4):m.isVector2?(w.boundary=8,w.storage=8):m.isVector3||m.isColor?(w.boundary=16,w.storage=12):m.isVector4?(w.boundary=16,w.storage=16):m.isMatrix3?(w.boundary=48,w.storage=48):m.isMatrix4?(w.boundary=64,w.storage=64):m.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(m)?(w.boundary=16,w.storage=m.byteLength):It("WebGLRenderer: Unsupported uniform value type.",m),w}function M(m){let w=m.target;w.removeEventListener("dispose",M);let y=h.indexOf(w.__bindingPointIndex);h.splice(y,1),e.deleteBuffer(r[w.id]),delete r[w.id],delete n[w.id]}function L(){for(let m in r)e.deleteBuffer(r[m]);h=[],r={},n={}}return{bind:o,update:l,dispose:L}}function OT(){return Ra===null&&(Ra=new nd(TT,16,16,xr,_e),Ra.name="DFG_LUT",Ra.minFilter=T2,Ra.magFilter=T2,Ra.wrapS=Sa,Ra.wrapT=Sa,Ra.generateMipmaps=!1,Ra.needsUpdate=!0),Ra}var qk,Zk,Yk,Kk,Jk,Qk,$k,tS,eS,aS,iS,rS,nS,hS,cS,oS,lS,dS,sS,vS,uS,gS,pS,fS,MS,mS,zS,xS,HS,LS,VS,wS,yS,BS,CS,kS,SS,bS,_S,AS,TS,OS,ES,RS,DS,IS,PS,NS,US,FS,WS,GS,jS,XS,qS,ZS,YS,KS,JS,QS,$S,tb,eb,ab,ib,rb,nb,hb,cb,ob,lb,db,sb,vb,ub,gb,pb,fb,Mb,mb,zb,xb,Hb,Lb,Vb,wb,yb,Bb,Cb,kb,Sb,bb,_b,Ab,Tb,Ob,Eb,Rb,Db,Ib,Pb,Nb,Ub,Fb,Wb,Gb,jb,Xb,qb,Zb,Yb,Kb,Jb,Qb,$b,t_,e_,a_,i_,r_,n_,h_,c_,o_,l_,d_,s_,v_,u_,g_,p_,f_,M_,m_,z_,x_,H_,L_,V_,w_,y_,B_,Jt,pt,Da,u3,C_,wL,v4,T_,O_,E_,Sc,aL,Ou,Eu,Ru,Du,R_,y0,p3,f3,q_,yL,Nu,BL,CL,kL,hL,cL,oL,lL,dL,Uu,Fu,Wu,Iu,u4,RA,DA,uL,UA,g3,qA,ZA,KA,QA,tT,aT,rT,oT,ju,Xu,fT,xT,HT,LT,VT,LL,bc,Pu,kT,ST,qu,Zu,bT,SL,TT,Ra,M3,Ac=rt(()=>{Tu();Tu();qk=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zk=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Yk=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Kk=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jk=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qk=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$k=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,eS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,aS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,oS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,lS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,uS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,fS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,MS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,zS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,HS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,LS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,VS="gl_FragColor = linearToOutputTexel( gl_FragColor );",wS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,BS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,CS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,SS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_S=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,TS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,OS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ES=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,RS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,DS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,IS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,PS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,NS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,US=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,FS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,WS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,GS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,XS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ZS=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,YS=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,KS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,JS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$S=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ab=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ib=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ob=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,db=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ub=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,fb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Vb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,bb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_b=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ab=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ob=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Eb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Db=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ib=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ub=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,qb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$b=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,t_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,e_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,a_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,i_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,r_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,o_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,v_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,g_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,p_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,m_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,L_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,y_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:qk,alphahash_pars_fragment:Zk,alphamap_fragment:Yk,alphamap_pars_fragment:Kk,alphatest_fragment:Jk,alphatest_pars_fragment:Qk,aomap_fragment:$k,aomap_pars_fragment:tS,batching_pars_vertex:eS,batching_vertex:aS,begin_vertex:iS,beginnormal_vertex:rS,bsdfs:nS,iridescence_fragment:hS,bumpmap_pars_fragment:cS,clipping_planes_fragment:oS,clipping_planes_pars_fragment:lS,clipping_planes_pars_vertex:dS,clipping_planes_vertex:sS,color_fragment:vS,color_pars_fragment:uS,color_pars_vertex:gS,color_vertex:pS,common:fS,cube_uv_reflection_fragment:MS,defaultnormal_vertex:mS,displacementmap_pars_vertex:zS,displacementmap_vertex:xS,emissivemap_fragment:HS,emissivemap_pars_fragment:LS,colorspace_fragment:VS,colorspace_pars_fragment:wS,envmap_fragment:yS,envmap_common_pars_fragment:BS,envmap_pars_fragment:CS,envmap_pars_vertex:kS,envmap_physical_pars_fragment:PS,envmap_vertex:SS,fog_vertex:bS,fog_pars_vertex:_S,fog_fragment:AS,fog_pars_fragment:TS,gradientmap_pars_fragment:OS,lightmap_pars_fragment:ES,lights_lambert_fragment:RS,lights_lambert_pars_fragment:DS,lights_pars_begin:IS,lights_toon_fragment:NS,lights_toon_pars_fragment:US,lights_phong_fragment:FS,lights_phong_pars_fragment:WS,lights_physical_fragment:GS,lights_physical_pars_fragment:jS,lights_fragment_begin:XS,lights_fragment_maps:qS,lights_fragment_end:ZS,lightprobes_pars_fragment:YS,logdepthbuf_fragment:KS,logdepthbuf_pars_fragment:JS,logdepthbuf_pars_vertex:QS,logdepthbuf_vertex:$S,map_fragment:tb,map_pars_fragment:eb,map_particle_fragment:ab,map_particle_pars_fragment:ib,metalnessmap_fragment:rb,metalnessmap_pars_fragment:nb,morphinstance_vertex:hb,morphcolor_vertex:cb,morphnormal_vertex:ob,morphtarget_pars_vertex:lb,morphtarget_vertex:db,normal_fragment_begin:sb,normal_fragment_maps:vb,normal_pars_fragment:ub,normal_pars_vertex:gb,normal_vertex:pb,normalmap_pars_fragment:fb,clearcoat_normal_fragment_begin:Mb,clearcoat_normal_fragment_maps:mb,clearcoat_pars_fragment:zb,iridescence_pars_fragment:xb,opaque_fragment:Hb,packing:Lb,premultiplied_alpha_fragment:Vb,project_vertex:wb,dithering_fragment:yb,dithering_pars_fragment:Bb,roughnessmap_fragment:Cb,roughnessmap_pars_fragment:kb,shadowmap_pars_fragment:Sb,shadowmap_pars_vertex:bb,shadowmap_vertex:_b,shadowmask_pars_fragment:Ab,skinbase_vertex:Tb,skinning_pars_vertex:Ob,skinning_vertex:Eb,skinnormal_vertex:Rb,specularmap_fragment:Db,specularmap_pars_fragment:Ib,tonemapping_fragment:Pb,tonemapping_pars_fragment:Nb,transmission_fragment:Ub,transmission_pars_fragment:Fb,uv_pars_fragment:Wb,uv_pars_vertex:Gb,uv_vertex:jb,worldpos_vertex:Xb,background_vert:qb,background_frag:Zb,backgroundCube_vert:Yb,backgroundCube_frag:Kb,cube_vert:Jb,cube_frag:Qb,depth_vert:$b,depth_frag:t_,distance_vert:e_,distance_frag:a_,equirect_vert:i_,equirect_frag:r_,linedashed_vert:n_,linedashed_frag:h_,meshbasic_vert:c_,meshbasic_frag:o_,meshlambert_vert:l_,meshlambert_frag:d_,meshmatcap_vert:s_,meshmatcap_frag:v_,meshnormal_vert:u_,meshnormal_frag:g_,meshphong_vert:p_,meshphong_frag:f_,meshphysical_vert:M_,meshphysical_frag:m_,meshtoon_vert:z_,meshtoon_frag:x_,points_vert:H_,points_frag:L_,shadow_vert:V_,shadow_frag:w_,sprite_vert:y_,sprite_frag:B_},pt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new h1(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new h1(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},Da={basic:{uniforms:j2([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:j2([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new $t(0)},envMapIntensity:{value:1}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:j2([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:j2([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:j2([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:j2([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:j2([pt.points,pt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:j2([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:j2([pt.common,pt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:j2([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:j2([pt.sprite,pt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distance:{uniforms:j2([pt.common,pt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distance_vert,fragmentShader:Jt.distance_frag},shadow:{uniforms:j2([pt.lights,pt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Da.physical={uniforms:j2([Da.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new h1(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new h1},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new h1},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};u3={r:0,b:0,g:0},C_=new e2,wL=new Wt;wL.set(-1,0,0,0,1,0,0,0,1);v4=4,T_=6,O_=20,E_=256,Sc=new mi,aL=new $t,Ou=null,Eu=0,Ru=0,Du=!1,R_=new U,y0=new U,p3=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,a=0,i=.1,r=100,n={}){let{size:h=256,position:c=R_}=n;Ou=this._renderer.getRenderTarget(),Eu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Du=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,r,o,c),a>0&&this._blur(o,0,0,a),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,a=null){return this._fromTexture(t,a)}fromCubemap(t,a=null){return this._fromTexture(t,a)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nL(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rL(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ou,Eu,Ru),this._renderer.xr.enabled=Du,t.scissorTest=!1,s4(t,0,0,t.width,t.height)}_fromTexture(t,a){t.mapping===Mr||t.mapping===L0?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ou=this._renderer.getRenderTarget(),Eu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Du=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=a||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),a=4*this._cubeSize,i={magFilter:T2,minFilter:T2,generateMipmaps:!1,type:_e,format:Qe,colorSpace:ec,depthBuffer:!1},r=iL(t,a,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==a){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=iL(t,a,i);let{_lodMax:n}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=D_(n)),this._blurMaterial=P_(n,t,a),this._ggxMaterial=I_(n,t,a)}return r}_compileMaterial(t){let a=new G2(new Je,t);this._renderer.compile(a,Sc)}_sceneToCubeUV(t,a,i,r,n){let o=new le(90,1,a,i),l=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],g=this._renderer,d=g.autoClear,u=g.toneMapping;g.getClearColor(aL),g.toneMapping=sa,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(r),g.clearDepth(),g.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G2(new c4,new dc({name:"PMREM.Background",side:J2,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,f=x.material,s=!1,M=t.background;M?M.isColor&&(f.color.copy(M),t.background=null,s=!0):(f.color.copy(aL),s=!0);for(let L=0;L<6;L++){let m=L%3;m===0?(o.up.set(0,l[L],0),o.position.set(n.x,n.y,n.z),o.lookAt(n.x+v[L],n.y,n.z)):m===1?(o.up.set(0,0,l[L]),o.position.set(n.x,n.y,n.z),o.lookAt(n.x,n.y+v[L],n.z)):(o.up.set(0,l[L],0),o.position.set(n.x,n.y,n.z),o.lookAt(n.x,n.y,n.z+v[L]));let w=this._cubeSize;s4(r,m*w,L>2?w:0,w,w),g.setRenderTarget(r),s&&g.render(x,o),g.render(t,o)}g.toneMapping=u,g.autoClear=d,t.background=M}_textureToCubeUV(t,a){let i=this._renderer,r=t.mapping===Mr||t.mapping===L0;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=nL()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rL());let n=r?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=n;let c=n.uniforms;c.envMap.value=t;let o=this._cubeSize;s4(a,0,0,3*o,2*o),i.setRenderTarget(a),i.render(h,Sc)}_applyPMREM(t){let a=this._renderer,i=a.autoClear;a.autoClear=!1;let r=this._lodMeshes.length;for(let n=1;n<r;n++)this._applyGGXFilter(t,n-1,n);a.autoClear=i}_applyGGXFilter(t,a,i){let r=this._renderer,n=this._pingPongRenderTarget,h=this._ggxMaterial,c=this._lodMeshes[i];c.material=h;let o=h.uniforms,l=i/(this._lodMeshes.length-1),v=a/(this._lodMeshes.length-1),g=Math.sqrt(l*l-v*v),d=l*1.25,u=g*d,{_lodMax:p}=this,x=this._sizeLods[i],f=3*x*(i>p-v4?i-p+v4:0),s=4*(this._cubeSize-x);o.envMap.value=t.texture,o.roughness.value=u,o.mipInt.value=p-a,s4(n,f,s,3*x,2*x),r.setRenderTarget(n),r.render(c,Sc),o.envMap.value=n.texture,o.roughness.value=0,o.mipInt.value=p-i,s4(t,f,s,3*x,2*x),r.setRenderTarget(t),r.render(c,Sc)}_blur(t,a,i,r){let n=this._pingPongRenderTarget,h=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(t,n,a,i,h),this._blurPass(n,t,i,i,h)}_blurPass(t,a,i,r,n){let h=this._renderer,c=this._blurMaterial,o=this._lodMeshes[r];o.material=c;let l=c.uniforms;l.envMap.value=t.texture,l.sigma.value=n,l.mipInt.value=this._lodMax-i;let v=this._sizeLods[r],g=3*v*(r>this._lodMax-v4?r-this._lodMax+v4:0),d=4*(this._cubeSize-v);s4(a,g,d,3*v,2*v),h.setRenderTarget(a),h.render(o,Sc)}};f3=class extends W2{constructor(t=1,a={}){super(t,t,a),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new uc(r),this._setTextureOptions(a),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,a){this.texture.type=a.type,this.texture.colorSpace=a.colorSpace,this.texture.generateMipmaps=a.generateMipmaps,this.texture.minFilter=a.minFilter,this.texture.magFilter=a.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new c4(5,5,5),n=new Se({name:"CubemapFromEquirect",uniforms:w0(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:J2,blending:Oa});n.uniforms.tEquirect.value=a;let h=new G2(r,n),c=a.minFilter;return a.minFilter===mr&&(a.minFilter=T2),new Vd(1,10,this).update(t,h),a.minFilter=c,h.geometry.dispose(),h.material.dispose(),this}clear(t,a=!0,i=!0,r=!0){let n=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(a,i,r);t.setRenderTarget(n)}};q_={[cu]:"LINEAR_TONE_MAPPING",[ou]:"REINHARD_TONE_MAPPING",[lu]:"CINEON_TONE_MAPPING",[du]:"ACES_FILMIC_TONE_MAPPING",[vu]:"AGX_TONE_MAPPING",[uu]:"NEUTRAL_TONE_MAPPING",[su]:"CUSTOM_TONE_MAPPING"};yL=new se,Nu=new sr(1,1),BL=new nc,CL=new rd,kL=new uc,hL=[],cL=[],oL=new Float32Array(16),lL=new Float32Array(9),dL=new Float32Array(4);Uu=class{constructor(t,a,i){this.id=t,this.addr=i,this.cache=[],this.type=a.type,this.setValue=gA(a.type)}},Fu=class{constructor(t,a,i){this.id=t,this.addr=i,this.cache=[],this.type=a.type,this.size=a.size,this.setValue=OA(a.type)}},Wu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,a,i){let r=this.seq;for(let n=0,h=r.length;n!==h;++n){let c=r[n];c.setValue(t,a[c.id],i)}}},Iu=/(\w+)(\])?(\[|\.)?/g;u4=class{constructor(t,a){this.seq=[],this.map={};let i=t.getProgramParameter(a,t.ACTIVE_UNIFORMS);for(let h=0;h<i;++h){let c=t.getActiveUniform(a,h),o=t.getUniformLocation(a,c.name);EA(c,o,this)}let r=[],n=[];for(let h of this.seq)h.type===t.SAMPLER_2D_SHADOW||h.type===t.SAMPLER_CUBE_SHADOW||h.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(h):n.push(h);r.length>0&&(this.seq=r.concat(n))}setValue(t,a,i,r){let n=this.map[a];n!==void 0&&n.setValue(t,i,r)}setOptional(t,a,i){let r=a[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,a,i,r){for(let n=0,h=a.length;n!==h;++n){let c=a[n],o=i[c.id];o.needsUpdate!==!1&&c.setValue(t,o.value,r)}}static seqWithValue(t,a){let i=[];for(let r=0,n=t.length;r!==n;++r){let h=t[r];h.id in a&&i.push(h)}return i}};RA=37297,DA=0;uL=new Wt;UA={[cu]:"Linear",[ou]:"Reinhard",[lu]:"Cineon",[du]:"ACESFilmic",[vu]:"AgX",[uu]:"Neutral",[su]:"Custom"};g3=new U;qA=/^[ \t]*#include +<([\w\d./]+)>/gm;ZA=new Map;KA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;QA={[mc]:"SHADOWMAP_TYPE_PCF",[o4]:"SHADOWMAP_TYPE_VSM"};tT={[Mr]:"ENVMAP_TYPE_CUBE",[L0]:"ENVMAP_TYPE_CUBE",[xc]:"ENVMAP_TYPE_CUBE_UV"};aT={[L0]:"ENVMAP_MODE_REFRACTION"};rT={[hu]:"ENVMAP_BLENDING_MULTIPLY",[EH]:"ENVMAP_BLENDING_MIX",[RH]:"ENVMAP_BLENDING_ADD"};oT=0,ju=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,a,i){let r=this._getShaderCacheForMaterial(t);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){let a=this.materialCache.get(t);for(let i of a)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let a=this.materialCache,i=a.get(t);return i===void 0&&(i=new Set,a.set(t,i)),i}_getShaderStage(t){let a=this.shaderCache,i=a.get(t);return i===void 0&&(i=new Xu(t),a.set(t,i)),i}},Xu=class{constructor(t){this.id=oT++,this.code=t,this.usedTimes=0}};fT=0;xT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,LT=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],VT=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],LL=new e2,bc=new U,Pu=new U;kT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ST=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,qu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,a){if(this.texture===null){let i=new gc(t.texture);(t.depthNear!==a.depthNear||t.depthFar!==a.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let a=t.cameras[0].viewport,i=new Se({vertexShader:kT,fragmentShader:ST,uniforms:{depthColor:{value:this.texture},depthWidth:{value:a.z},depthHeight:{value:a.w}}});this.mesh=new G2(new x0(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Zu=class extends _a{constructor(t,a){super();let i=this,r=null,n=1,h=null,c="local-floor",o=1,l=null,v=null,g=null,d=null,u=null,p=null,x=typeof XRWebGLBinding<"u",f=new qu,s={},M=a.getContextAttributes(),L=null,m=null,w=[],y=[],C=new h1,H=null,B=null,S=new le;S.viewport=new q1;let E=new le;E.viewport=new q1;let O=[S,E],R=new wd,b=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let tt=w[Z];return tt===void 0&&(tt=new n4,w[Z]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Z){let tt=w[Z];return tt===void 0&&(tt=new n4,w[Z]=tt),tt.getGripSpace()},this.getHand=function(Z){let tt=w[Z];return tt===void 0&&(tt=new n4,w[Z]=tt),tt.getHandSpace()};function q(Z){let tt=y.indexOf(Z.inputSource);if(tt===-1)return;let xt=w[tt];xt!==void 0&&(xt.update(Z.inputSource,Z.frame,l||h),xt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function X(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",j);for(let Z=0;Z<w.length;Z++){let tt=y[Z];tt!==null&&(y[Z]=null,w[Z].disconnect(tt))}b=null,I=null,f.reset();for(let Z in s)delete s[Z];if(t.setRenderTarget(L),u=null,d=null,g=null,r=null,m=null,l1.stop(),i.isPresenting=!1,t.setPixelRatio(H),t.setSize(C.width,C.height,!1),B!==null){let Z=B.camera;Z.fov=B.fov,Z.zoom=B.zoom,Z.updateProjectionMatrix(),B=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){n=Z,i.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){c=Z,i.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||h},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return g===null&&x&&(g=new XRWebGLBinding(r,a)),g},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(L=t.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",X),r.addEventListener("inputsourceschange",j),M.xrCompatible!==!0&&await a.makeXRCompatible(),H=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,ht=null,nt=null;M.depth&&(nt=M.stencil?a.DEPTH24_STENCIL8:a.DEPTH_COMPONENT24,xt=M.stencil?zr:ba,ht=M.stencil?d4:va);let Ct={colorFormat:a.RGBA8,depthFormat:nt,scaleFactor:n};g=this.getBinding(),d=g.createProjectionLayer(Ct),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),m=new W2(d.textureWidth,d.textureHeight,{format:Qe,type:Q2,depthTexture:new sr(d.textureWidth,d.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let xt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:n};u=new XRWebGLLayer(r,a,xt),r.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),m=new W2(u.framebufferWidth,u.framebufferHeight,{format:Qe,type:Q2,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(o),l=null,h=await r.requestReferenceSpace(c),l1.setContext(r),l1.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function j(Z){for(let tt=0;tt<Z.removed.length;tt++){let xt=Z.removed[tt],ht=y.indexOf(xt);ht>=0&&(y[ht]=null,w[ht].disconnect(xt))}for(let tt=0;tt<Z.added.length;tt++){let xt=Z.added[tt],ht=y.indexOf(xt);if(ht===-1){for(let Ct=0;Ct<w.length;Ct++)if(Ct>=y.length){y.push(xt),ht=Ct;break}else if(y[Ct]===null){y[Ct]=xt,ht=Ct;break}if(ht===-1)break}let nt=w[ht];nt&&nt.connect(xt)}}let W=new U,K=new U;function et(Z,tt,xt){W.setFromMatrixPosition(tt.matrixWorld),K.setFromMatrixPosition(xt.matrixWorld);let ht=W.distanceTo(K),nt=tt.projectionMatrix.elements,Ct=xt.projectionMatrix.elements,Zt=nt[14]/(nt[10]-1),Rt=nt[14]/(nt[10]+1),Ut=(nt[9]+1)/nt[5],Qt=(nt[9]-1)/nt[5],Yt=(nt[8]-1)/nt[0],k1=(Ct[8]+1)/Ct[0],a2=Zt*Yt,O2=Zt*k1,O1=ht/(-Yt+k1),X1=O1*-Yt;if(tt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(X1),Z.translateZ(O1),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),nt[10]===-1)Z.projectionMatrix.copy(tt.projectionMatrix),Z.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let A=Zt+O1,E2=Rt+O1,H1=a2-X1,k=O2+(ht-X1),z=Ut*Rt/E2*A,D=Qt*Rt/E2*A;Z.projectionMatrix.makePerspective(H1,k,z,D,A,E2),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Ot(Z,tt){tt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(tt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let tt=Z.near,xt=Z.far;f.texture!==null&&(f.depthNear>0&&(tt=f.depthNear),f.depthFar>0&&(xt=f.depthFar)),R.near=E.near=S.near=tt,R.far=E.far=S.far=xt,(b!==R.near||I!==R.far)&&(r.updateRenderState({depthNear:R.near,depthFar:R.far}),b=R.near,I=R.far),R.layers.mask=Z.layers.mask|6,S.layers.mask=R.layers.mask&-5,E.layers.mask=R.layers.mask&-3;let ht=Z.parent,nt=R.cameras;Ot(R,ht);for(let Ct=0;Ct<nt.length;Ct++)Ot(nt[Ct],ht);nt.length===2?et(R,S,E):R.projectionMatrix.copy(S.projectionMatrix),B===null&&Z.isPerspectiveCamera&&(B={camera:Z,fov:Z.fov,zoom:Z.zoom}),St(Z,R,ht)};function St(Z,tt,xt){xt===null?Z.matrix.copy(tt.matrixWorld):(Z.matrix.copy(xt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(tt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(tt.projectionMatrix),Z.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ed*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(d===null&&u===null))return o},this.setFoveation=function(Z){o=Z,d!==null&&(d.fixedFoveation=Z),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Z)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(R)},this.getCameraTexture=function(Z){return s[Z]};let f1=null;function t1(Z,tt){if(v=tt.getViewerPose(l||h),p=tt,v!==null){let xt=v.views;u!==null&&(t.setRenderTargetFramebuffer(m,u.framebuffer),t.setRenderTarget(m));let ht=!1;xt.length!==R.cameras.length&&(R.cameras.length=0,ht=!0);for(let Rt=0;Rt<xt.length;Rt++){let Ut=xt[Rt],Qt=null;if(u!==null)Qt=u.getViewport(Ut);else{let k1=g.getViewSubImage(d,Ut);Qt=k1.viewport,Rt===0&&(t.setRenderTargetTextures(m,k1.colorTexture,k1.depthStencilTexture),t.setRenderTarget(m))}let Yt=O[Rt];Yt===void 0&&(Yt=new le,Yt.layers.enable(Rt),Yt.viewport=new q1,O[Rt]=Yt),Yt.matrix.fromArray(Ut.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(Ut.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Rt===0&&(R.matrix.copy(Yt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),ht===!0&&R.cameras.push(Yt)}let nt=r.enabledFeatures;if(nt&&nt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){g=i.getBinding();let Rt=g.getDepthInformation(xt[0]);Rt&&Rt.isValid&&Rt.texture&&f.init(Rt,r.renderState)}if(nt&&nt.includes("camera-access")&&x){t.state.unbindTexture(),g=i.getBinding();for(let Rt=0;Rt<xt.length;Rt++){let Ut=xt[Rt].camera;if(Ut){let Qt=s[Ut];Qt||(Qt=new gc,s[Ut]=Qt);let Yt=g.getCameraImage(Ut);Qt.sourceTexture=Yt}}}}for(let xt=0;xt<w.length;xt++){let ht=y[xt],nt=w[xt];ht!==null&&nt!==void 0&&nt.update(ht,tt,l||h)}f1&&f1(Z,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),p=null}let l1=new VL;l1.setAnimationLoop(t1),this.setAnimationLoop=function(Z){f1=Z},this.dispose=function(){}}},bT=new e2,SL=new Wt;SL.set(-1,0,0,0,1,0,0,0,1);TT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ra=null;M3=class{constructor(t={}){let{canvas:a=ZH(),context:i=null,depth:r=!0,stencil:n=!1,alpha:h=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Q2}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=h;let x=u,f=new Set([Od,Td,Ad]),s=new Set([Q2,va,l4,d4,bd,_d]),M=new Uint32Array(4),L=new Int32Array(4),m=new U,w=null,y=null,C=[],H=[],B=null;this.domElement=a,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=sa,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,E=!1,O=null,R=null,b=null,I=null;this._outputColorSpace=Ce;let q=0,X=0,j=null,W=-1,K=null,et=new q1,Ot=new q1,St=null,f1=new $t(0),t1=0,l1=a.width,Z=a.height,tt=1,xt=null,ht=null,nt=new q1(0,0,l1,Z),Ct=new q1(0,0,l1,Z),Zt=!1,Rt=new vc,Ut=!1,Qt=!1,Yt=new e2,k1=new U,a2=new q1,O2={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O1=!1;function X1(){return j===null?tt:1}let A=i;function E2(V,_){return a.getContext(V,_)}let H1,k,z,D,F,Y,ot,lt,J,$,dt,_t,gt,st,At,Dt,Xt,T,vt,Q,ut,mt,it;try{let V={alpha:!0,depth:r,stencil:n,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:v,failIfMajorPerformanceCaveat:g};if("setAttribute"in a&&a.setAttribute("data-engine",`three.js r${"186"}`),a.addEventListener("webglcontextlost",_1,!1),a.addEventListener("webglcontextrestored",M1,!1),a.addEventListener("webglcontextcreationerror",$e,!1),A===null){let _="webgl2";if(A=E2(_,V),A===null)throw E2(_)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Et()}catch(V){throw a.removeEventListener("webglcontextlost",_1,!1),a.removeEventListener("webglcontextrestored",M1,!1),a.removeEventListener("webglcontextcreationerror",$e,!1),Nt("WebGLRenderer: "+V.message),V}function Et(){H1=new U_(A),H1.init(),ut=new CT(A,H1),k=new __(A,H1,t,ut),z=new yT(A,H1),k.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),R=A.createFramebuffer(),b=A.createFramebuffer(),I=A.createFramebuffer(),D=new G_(A),F=new sT,Y=new BT(A,H1,z,F,k,ut,D),ot=new N_(S),lt=new Xk(A),mt=new S_(A,lt),J=new F_(A,lt,D,mt),$=new X_(A,J,lt,mt,D),T=new j_(A,k,Y),At=new A_(F),dt=new dT(S,ot,H1,k,mt,At),_t=new _T(S,F),gt=new uT,st=new zT(H1),Xt=new k_(S,ot,z,$,p,o),Dt=new wT(S,$,k),it=new AT(A,D,k,z),vt=new b_(A,H1,D),Q=new W_(A,H1,D),D.programs=dt.programs,S.capabilities=k,S.extensions=H1,S.properties=F,S.renderLists=gt,S.shadowMap=Dt,S.state=z,S.info=D}x!==Q2&&(B=new Z_(x,a.width,a.height,c,r,n));let kt=new Zu(S,A);this.xr=kt,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let V=H1.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){let V=H1.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(V){V!==void 0&&(tt=V,this.setSize(l1,Z,!1))},this.getSize=function(V){return V.set(l1,Z)},this.setSize=function(V,_,G=!0){if(kt.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}l1=V,Z=_,a.width=Math.floor(V*tt),a.height=Math.floor(_*tt),G===!0&&(a.style.width=V+"px",a.style.height=_+"px"),B!==null&&B.setSize(a.width,a.height),this.setViewport(0,0,V,_)},this.getDrawingBufferSize=function(V){return V.set(l1*tt,Z*tt).floor()},this.setDrawingBufferSize=function(V,_,G){l1=V,Z=_,tt=G,a.width=Math.floor(V*G),a.height=Math.floor(_*G),this.setViewport(0,0,V,_)},this.setEffects=function(V){if(x===Q2){Nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(V){for(let _=0;_<V.length;_++)if(V[_].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(V||[])},this.getCurrentViewport=function(V){return V.copy(et)},this.getViewport=function(V){return V.copy(nt)},this.setViewport=function(V,_,G,P){V.isVector4?nt.set(V.x,V.y,V.z,V.w):nt.set(V,_,G,P),z.viewport(et.copy(nt).multiplyScalar(tt).round())},this.getScissor=function(V){return V.copy(Ct)},this.setScissor=function(V,_,G,P){V.isVector4?Ct.set(V.x,V.y,V.z,V.w):Ct.set(V,_,G,P),z.scissor(Ot.copy(Ct).multiplyScalar(tt).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(V){z.setScissorTest(Zt=V)},this.setOpaqueSort=function(V){xt=V},this.setTransparentSort=function(V){ht=V},this.getClearColor=function(V){return V.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor(...arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha(...arguments)},this.clear=function(V=!0,_=!0,G=!0){let P=0;if(V){let N=!1;if(j!==null){let Mt=j.texture.format;N=f.has(Mt)}if(N){let Mt=j.texture.type,Lt=s.has(Mt),ft=Xt.getClearColor(),yt=Xt.getClearAlpha(),bt=ft.r,Kt=ft.g,e1=ft.b;Lt?(M[0]=bt,M[1]=Kt,M[2]=e1,M[3]=yt,A.clearBufferuiv(A.COLOR,0,M)):(L[0]=bt,L[1]=Kt,L[2]=e1,L[3]=yt,A.clearBufferiv(A.COLOR,0,L))}else P|=A.COLOR_BUFFER_BIT}_&&(P|=A.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(P|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P!==0&&A.clear(P)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(V){V.setRenderer(this),O=V},this.dispose=function(){a.removeEventListener("webglcontextlost",_1,!1),a.removeEventListener("webglcontextrestored",M1,!1),a.removeEventListener("webglcontextcreationerror",$e,!1),Xt.dispose(),gt.dispose(),st.dispose(),F.dispose(),ot.dispose(),$.dispose(),mt.dispose(),it.dispose(),dt.dispose(),kt.dispose(),kt.removeEventListener("sessionstart",n8),kt.removeEventListener("sessionend",h8),Hr.stop()};function _1(V){V.preventDefault(),Vu("WebGLRenderer: Context Lost."),E=!0}function M1(){Vu("WebGLRenderer: Context Restored."),E=!1;let V=D.autoReset,_=Dt.enabled,G=Dt.autoUpdate,P=Dt.needsUpdate,N=Dt.type;Et(),D.autoReset=V,Dt.enabled=_,Dt.autoUpdate=G,Dt.needsUpdate=P,Dt.type=N}function $e(V){Nt("WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function ga(V){let _=V.target;_.removeEventListener("dispose",ga),OV(_)}function OV(V){EV(V),F.remove(V)}function EV(V){let _=F.get(V).programs;_!==void 0&&(_.forEach(function(G){dt.releaseProgram(G)}),V.isShaderMaterial&&dt.releaseShaderCache(V))}this.renderBufferDirect=function(V,_,G,P,N,Mt){_===null&&(_=O2);let Lt=N.isMesh&&N.matrixWorld.determinantAffine()<0,ft=IV(V,_,G,P,N);z.setMaterial(P,Lt);let yt=G.index,bt=1;if(P.wireframe===!0){if(yt=J.getWireframeAttribute(G),yt===void 0)return;bt=2}let Kt=G.drawRange,e1=G.attributes.position,Bt=Kt.start*bt,m1=(Kt.start+Kt.count)*bt;Mt!==null&&(Bt=Math.max(Bt,Mt.start*bt),m1=Math.min(m1,(Mt.start+Mt.count)*bt)),yt!==null?(Bt=Math.max(Bt,0),m1=Math.min(m1,yt.count)):e1!=null&&(Bt=Math.max(Bt,0),m1=Math.min(m1,e1.count));let c2=m1-Bt;if(c2<0||c2===1/0)return;mt.setup(N,P,ft,G,yt);let E1,S1=vt;if(yt!==null&&(E1=lt.get(yt),S1=Q,S1.setIndex(E1)),N.isMesh)P.wireframe===!0?(z.setLineWidth(P.wireframeLinewidth*X1()),S1.setMode(A.LINES)):S1.setMode(A.TRIANGLES);else if(N.isLine){let R2=P.linewidth;R2===void 0&&(R2=1),z.setLineWidth(R2*X1()),N.isLineSegments?S1.setMode(A.LINES):N.isLineLoop?S1.setMode(A.LINE_LOOP):S1.setMode(A.LINE_STRIP)}else N.isPoints?S1.setMode(A.POINTS):N.isSprite&&S1.setMode(A.TRIANGLES);if(N.isBatchedMesh)if(H1.get("WEBGL_multi_draw"))S1.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let R2=N._multiDrawStarts,Ht=N._multiDrawCounts,X2=N._multiDrawCount,d1=yt?lt.get(yt).bytesPerElement:1,Oe=F.get(P).currentProgram.getUniforms();for(let pa=0;pa<X2;pa++)Oe.setValue(A,"_gl_DrawID",pa),S1.render(R2[pa]/d1,Ht[pa])}else if(N.isInstancedMesh)S1.renderInstances(Bt,c2,N.count);else if(G.isInstancedBufferGeometry){let R2=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Ht=Math.min(G.instanceCount,R2);S1.renderInstances(Bt,c2,Ht)}else S1.render(Bt,c2)};function r8(V,_,G,P){O!==null&&V.isNodeMaterial&&O.setObject(P,V),Ut===!0&&At.setState(V,G,!1),V.transparent===!0&&V.side===Ta&&V.forceSinglePass===!1?(V.side=J2,V.needsUpdate=!0,Dc(V,_,P),V.side=fr,V.needsUpdate=!0,Dc(V,_,P),V.side=Ta):Dc(V,_,P)}this.compile=function(V,_,G=null){G===null&&(G=V),O!==null&&O.renderStart(V,_,G),y=st.get(G),y.init(_),H.push(y),G.traverseVisible(function(N){N.isLight&&N.layers.test(_.layers)&&(y.pushLight(N),N.castShadow&&y.pushShadow(N))}),V!==G&&V.traverseVisible(function(N){N.isLight&&N.layers.test(_.layers)&&(y.pushLight(N),N.castShadow&&y.pushShadow(N))}),y.setupLights(),O!==null&&O.updateLights(y.state.lightsArray),Qt=this.localClippingEnabled,Ut=At.init(this.clippingPlanes,Qt),Ut===!0&&At.setGlobalState(this.clippingPlanes,_),O!==null&&Dt.render(y.state.shadowsArray,G,_);let P=new Set;return V.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let Mt=N.material;if(Mt)if(Array.isArray(Mt))for(let Lt=0;Lt<Mt.length;Lt++){let ft=Mt[Lt];r8(ft,G,_,N),P.add(ft)}else r8(Mt,G,_,N),P.add(Mt)}),y=H.pop(),O!==null&&O.renderEnd(),P},this.compileAsync=function(V,_,G=null){let P=this.compile(V,_,G);return new Promise(N=>{function Mt(){if(P.forEach(function(Lt){let yt=F.get(Lt).currentProgram;(yt===void 0||yt.isReady())&&P.delete(Lt)}),P.size===0){N(V);return}setTimeout(Mt,10)}H1.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let k3=null;function RV(V){k3&&k3(V)}function n8(){Hr.stop()}function h8(){Hr.start()}let Hr=new VL;Hr.setAnimationLoop(RV),typeof self<"u"&&Hr.setContext(self),this.setAnimationLoop=function(V){k3=V,kt.setAnimationLoop(V),V===null?Hr.stop():Hr.start()},kt.addEventListener("sessionstart",n8),kt.addEventListener("sessionend",h8),this.render=function(V,_){if(_!==void 0&&_.isCamera!==!0){Nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;O!==null&&O.renderStart(V,_);let G=kt.enabled===!0&&kt.isPresenting===!0,P=B!==null&&(j===null||G)&&B.begin(S,j);if(V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),kt.enabled===!0&&kt.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(kt.cameraAutoUpdate===!0&&kt.updateCamera(_),_=kt.getCamera()),V.isScene===!0&&V.onBeforeRender(S,V,_,j),y=st.get(V,H.length),y.init(_),y.state.textureUnits=Y.getTextureUnits(),H.push(y),Yt.multiplyMatrices(_.projectionMatrix,_.matrixWorldInverse),Rt.setFromProjectionMatrix(Yt,da,_.reversedDepth),Qt=this.localClippingEnabled,Ut=At.init(this.clippingPlanes,Qt),w=gt.get(V,C.length),w.init(),C.push(w),kt.enabled===!0&&kt.isPresenting===!0){let Lt=S.xr.getDepthSensingMesh();Lt!==null&&S3(Lt,_,-1/0,S.sortObjects)}S3(V,_,0,S.sortObjects),w.finish(),O!==null&&O.updateLights(y.state.lightsArray),S.sortObjects===!0&&w.sort(xt,ht),O1=kt.enabled===!1||kt.isPresenting===!1||kt.hasDepthSensing()===!1,O1&&Xt.addToRenderList(w,V),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ut===!0&&At.beginShadows();let N=y.state.shadowsArray;if(Dt.render(N,V,_),Ut===!0&&At.endShadows(),(P&&B.hasRenderPass())===!1){let Lt=w.opaque,ft=w.transmissive;if(y.setupLights(),_.isArrayCamera){let yt=_.cameras;if(ft.length>0)for(let bt=0,Kt=yt.length;bt<Kt;bt++){let e1=yt[bt];o8(Lt,ft,V,e1)}O1&&Xt.render(V);for(let bt=0,Kt=yt.length;bt<Kt;bt++){let e1=yt[bt];c8(w,V,e1,e1.viewport)}}else ft.length>0&&o8(Lt,ft,V,_),O1&&Xt.render(V),c8(w,V,_)}j!==null&&X===0&&(Y.updateMultisampleRenderTarget(j),Y.updateRenderTargetMipmap(j)),P&&B.end(S),V.isScene===!0&&V.onAfterRender(S,V,_),mt.resetDefaultState(),W=-1,K=null,H.pop(),H.length>0?(y=H[H.length-1],Y.setTextureUnits(y.state.textureUnits),Ut===!0&&At.setGlobalState(S.clippingPlanes,y.state.camera)):y=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,O!==null&&O.renderEnd()};function S3(V,_,G,P){if(V.visible===!1)return;if(V.layers.test(_.layers)){if(V.isGroup)G=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(_);else if(V.isLightProbeGrid)y.pushLightProbeGrid(V);else if(V.isLight)y.pushLight(V),V.castShadow&&y.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||V.intersectsFrustum(Rt)){P&&a2.setFromMatrixPosition(V.matrixWorld).applyMatrix4(Yt);let Lt=$.update(V),ft=V.material;ft.visible&&w.push(V,Lt,ft,G,a2.z,null,_)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||V.intersectsFrustum(Rt))){let Lt=$.update(V),ft=V.material;if(P&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),a2.copy(V.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),a2.copy(Lt.boundingSphere.center)),a2.applyMatrix4(V.matrixWorld).applyMatrix4(Yt)),Array.isArray(ft)){let yt=Lt.groups;for(let bt=0,Kt=yt.length;bt<Kt;bt++){let e1=yt[bt],Bt=ft[e1.materialIndex];Bt&&Bt.visible&&w.push(V,Lt,Bt,G,a2.z,e1,_)}}else ft.visible&&w.push(V,Lt,ft,G,a2.z,null,_)}}let Mt=V.children;for(let Lt=0,ft=Mt.length;Lt<ft;Lt++)S3(Mt[Lt],_,G,P)}function c8(V,_,G,P){let{opaque:N,transmissive:Mt,transparent:Lt}=V;y.setupLightsView(G),Ut===!0&&At.setGlobalState(S.clippingPlanes,G),P&&z.viewport(et.copy(P)),N.length>0&&Rc(N,_,G),Mt.length>0&&Rc(Mt,_,G),Lt.length>0&&Rc(Lt,_,G),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function o8(V,_,G,P){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[P.id]===void 0){let Bt=H1.has("EXT_color_buffer_half_float")||H1.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[P.id]=new W2(1,1,{generateMipmaps:!0,type:Bt?_e:Q2,minFilter:mr,samples:Math.max(4,k.samples),stencilBuffer:n,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:n1.workingColorSpace})}let Mt=y.state.transmissionRenderTarget[P.id],Lt=P.viewport||et;Mt.setSize(Lt.z*S.transmissionResolutionScale,Lt.w*S.transmissionResolutionScale);let ft=S.getRenderTarget(),yt=S.getActiveCubeFace(),bt=S.getActiveMipmapLevel();S.setRenderTarget(Mt),S.getClearColor(f1),t1=S.getClearAlpha(),t1<1&&S.setClearColor(16777215,.5),S.clear(),O1&&Xt.render(G);let Kt=S.toneMapping;S.toneMapping=sa;let e1=P.viewport;if(P.viewport!==void 0&&(P.viewport=void 0),y.setupLightsView(P),Ut===!0&&At.setGlobalState(S.clippingPlanes,P),Rc(V,G,P),Y.updateMultisampleRenderTarget(Mt),Y.updateRenderTargetMipmap(Mt),H1.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let m1=0,c2=_.length;m1<c2;m1++){let E1=_[m1],{object:S1,geometry:R2,material:Ht,group:X2}=E1;if(Ht.side===Ta&&S1.layers.test(P.layers)){let d1=Ht.side;Ht.side=J2,Ht.needsUpdate=!0,l8(S1,G,P,R2,Ht,X2),Ht.side=d1,Ht.needsUpdate=!0,Bt=!0}}Bt===!0&&(Y.updateMultisampleRenderTarget(Mt),Y.updateRenderTargetMipmap(Mt))}S.setRenderTarget(ft,yt,bt),S.setClearColor(f1,t1),e1!==void 0&&(P.viewport=e1),S.toneMapping=Kt}function Rc(V,_,G){let P=_.isScene===!0?_.overrideMaterial:null;for(let N=0,Mt=V.length;N<Mt;N++){let Lt=V[N],{object:ft,geometry:yt,group:bt}=Lt,Kt=Lt.material;Kt.allowOverride===!0&&P!==null&&(Kt=P),ft.layers.test(G.layers)&&l8(ft,_,G,yt,Kt,bt)}}function l8(V,_,G,P,N,Mt){O!==null&&N.isNodeMaterial&&O.setObject(V,N),V.onBeforeRender(S,_,G,P,N,Mt),V.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),N.onBeforeRender(S,_,G,P,V,Mt),N.transparent===!0&&N.side===Ta&&N.forceSinglePass===!1?(N.side=J2,N.needsUpdate=!0,S.renderBufferDirect(G,_,P,N,V,Mt),N.side=fr,N.needsUpdate=!0,S.renderBufferDirect(G,_,P,N,V,Mt),N.side=Ta):S.renderBufferDirect(G,_,P,N,V,Mt),V.onAfterRender(S,_,G,P,N,Mt)}function Dc(V,_,G){_.isScene!==!0&&(_=O2);let P=F.get(V),N=y.state.lights,Mt=y.state.shadowsArray,Lt=N.state.version,ft=dt.getParameters(V,N.state,Mt,_,G,y.state.lightProbeGridArray),yt=dt.getProgramCacheKey(ft),bt=P.programs;P.environment=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?_.environment:null,P.fog=_.fog;let Kt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap;P.envMap=ot.get(V.envMap||P.environment,Kt),P.envMapRotation=P.environment!==null&&V.envMap===null?_.environmentRotation:V.envMapRotation,bt===void 0&&(V.addEventListener("dispose",ga),bt=new Map,P.programs=bt);let e1=bt.get(yt);if(e1!==void 0){if(P.currentProgram===e1&&P.lightsStateVersion===Lt)return s8(V,ft),e1}else ft.uniforms=dt.getUniforms(V),O!==null&&V.isNodeMaterial&&O.build(V,G,ft),V.onBeforeCompile(ft,S),e1=dt.acquireProgram(ft,yt),bt.set(yt,e1),P.uniforms=ft.uniforms;let Bt=P.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(Bt.clippingPlanes=At.uniform),s8(V,ft),P.needsLights=NV(V),P.lightsStateVersion=Lt,P.needsLights&&(Bt.ambientLightColor.value=N.state.ambient,Bt.lightProbe.value=N.state.probe,Bt.sunLights.value=N.state.sun,Bt.sunLightShadows.value=N.state.sunShadow,Bt.directionalLights.value=N.state.directional,Bt.directionalLightShadows.value=N.state.directionalShadow,Bt.spotLights.value=N.state.spot,Bt.spotLightShadows.value=N.state.spotShadow,Bt.rectAreaLights.value=N.state.rectArea,Bt.ltc_1.value=N.state.rectAreaLTC1,Bt.ltc_2.value=N.state.rectAreaLTC2,Bt.pointLights.value=N.state.point,Bt.pointLightShadows.value=N.state.pointShadow,Bt.hemisphereLights.value=N.state.hemi,Bt.sunShadowMatrix.value=N.state.sunShadowMatrix,Bt.sunShadowCascade.value=N.state.sunShadowCascade,Bt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Bt.spotLightMatrix.value=N.state.spotLightMatrix,Bt.spotLightMap.value=N.state.spotLightMap,Bt.pointShadowMatrix.value=N.state.pointShadowMatrix),P.lightProbeGrid=y.state.lightProbeGridArray.length>0,P.currentProgram=e1,P.uniformsList=null,e1}function d8(V){if(V.uniformsList===null){let _=V.currentProgram.getUniforms();V.uniformsList=u4.seqWithValue(_.seq,V.uniforms)}return V.uniformsList}function s8(V,_){let G=F.get(V);G.outputColorSpace=_.outputColorSpace,G.batching=_.batching,G.batchingColor=_.batchingColor,G.instancing=_.instancing,G.instancingColor=_.instancingColor,G.instancingMorph=_.instancingMorph,G.skinning=_.skinning,G.morphTargets=_.morphTargets,G.morphNormals=_.morphNormals,G.morphColors=_.morphColors,G.morphTargetsCount=_.morphTargetsCount,G.numClippingPlanes=_.numClippingPlanes,G.numIntersection=_.numClipIntersection,G.vertexAlphas=_.vertexAlphas,G.vertexTangents=_.vertexTangents,G.toneMapping=_.toneMapping}function DV(V,_){if(V.length===0)return null;if(V.length===1)return V[0].texture!==null?V[0]:null;m.setFromMatrixPosition(_.matrixWorld);for(let G=0,P=V.length;G<P;G++){let N=V[G];if(N.texture!==null&&N.boundingBox.containsPoint(m))return N}return null}function IV(V,_,G,P,N){_.isScene!==!0&&(_=O2),Y.resetTextureUnits();let Mt=_.fog,Lt=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?_.environment:null,ft=j===null?S.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:n1.workingColorSpace,yt=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap,bt=ot.get(P.envMap||Lt,yt),Kt=P.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,e1=!!G.attributes.tangent&&(!!P.normalMap||P.anisotropy>0),Bt=!!G.morphAttributes.position,m1=!!G.morphAttributes.normal,c2=!!G.morphAttributes.color,E1=sa;P.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(E1=S.toneMapping);let S1=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,R2=S1!==void 0?S1.length:0,Ht=F.get(P),X2=y.state.lights;if(Ut===!0&&(Qt===!0||V!==K)){let A1=V===K&&P.id===W;At.setState(P,V,A1)}let d1=!1;P.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==X2.state.version||Ht.outputColorSpace!==ft||N.isBatchedMesh&&Ht.batching===!1||!N.isBatchedMesh&&Ht.batching===!0||N.isBatchedMesh&&Ht.batchingColor===!0&&N._colorsTexture===null||N.isBatchedMesh&&Ht.batchingColor===!1&&N._colorsTexture!==null||N.isInstancedMesh&&Ht.instancing===!1||!N.isInstancedMesh&&Ht.instancing===!0||N.isSkinnedMesh&&Ht.skinning===!1||!N.isSkinnedMesh&&Ht.skinning===!0||N.isInstancedMesh&&Ht.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ht.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ht.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ht.instancingMorph===!1&&N.morphTexture!==null||Ht.envMap!==bt||P.fog===!0&&Ht.fog!==Mt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==At.numPlanes||Ht.numIntersection!==At.numIntersection)||Ht.vertexAlphas!==Kt||Ht.vertexTangents!==e1||Ht.morphTargets!==Bt||Ht.morphNormals!==m1||Ht.morphColors!==c2||Ht.toneMapping!==E1||Ht.morphTargetsCount!==R2||!!Ht.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(d1=!0):(d1=!0,Ht.__version=P.version);let Oe=Ht.currentProgram;d1===!0&&(Oe=Dc(P,_,N),O&&P.isNodeMaterial&&O.onUpdateProgram(P,Oe,Ht));let pa=!1,xi=!1,k0=!1,w1=Oe.getUniforms(),i2=Ht.uniforms;if(z.useProgram(Oe.program)&&(pa=!0,xi=!0,k0=!0),P.id!==W&&(W=P.id,xi=!0),Ht.needsLights){let A1=DV(y.state.lightProbeGridArray,N);Ht.lightProbeGrid!==A1&&(Ht.lightProbeGrid=A1,xi=!0)}if(pa||K!==V){z.buffers.depth.getReversed()&&V.reversedDepth!==!0&&(V._reversedDepth=!0,V.updateProjectionMatrix()),w1.setValue(A,"projectionMatrix",V.projectionMatrix),w1.setValue(A,"viewMatrix",V.matrixWorldInverse);let Li=w1.map.cameraPosition;Li!==void 0&&Li.setValue(A,k1.setFromMatrixPosition(V.matrixWorld)),k.logarithmicDepthBuffer&&w1.setValue(A,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshLambertMaterial||P.isMeshBasicMaterial||P.isMeshStandardMaterial||P.isShaderMaterial)&&w1.setValue(A,"isOrthographic",V.isOrthographicCamera===!0),K!==V&&(K=V,xi=!0,k0=!0)}if(Ht.needsLights&&(X2.state.sunShadowMap.length>0&&w1.setValue(A,"sunShadowMap",X2.state.sunShadowMap,Y),X2.state.directionalShadowMap.length>0&&w1.setValue(A,"directionalShadowMap",X2.state.directionalShadowMap,Y),X2.state.spotShadowMap.length>0&&w1.setValue(A,"spotShadowMap",X2.state.spotShadowMap,Y),X2.state.pointShadowMap.length>0&&w1.setValue(A,"pointShadowMap",X2.state.pointShadowMap,Y)),N.isSkinnedMesh){w1.setOptional(A,N,"bindMatrix"),w1.setOptional(A,N,"bindMatrixInverse");let A1=N.skeleton;A1&&(A1.boneTexture===null&&A1.computeBoneTexture(),w1.setValue(A,"boneTexture",A1.boneTexture,Y))}N.isBatchedMesh&&(w1.setOptional(A,N,"batchingTexture"),w1.setValue(A,"batchingTexture",N._matricesTexture,Y),w1.setOptional(A,N,"batchingIdTexture"),w1.setValue(A,"batchingIdTexture",N._indirectTexture,Y),w1.setOptional(A,N,"batchingColorTexture"),N._colorsTexture!==null&&w1.setValue(A,"batchingColorTexture",N._colorsTexture,Y));let Hi=G.morphAttributes;if((Hi.position!==void 0||Hi.normal!==void 0||Hi.color!==void 0)&&T.update(N,G,Oe),(xi||Ht.receiveShadow!==N.receiveShadow)&&(Ht.receiveShadow=N.receiveShadow,w1.setValue(A,"receiveShadow",N.receiveShadow)),(P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial)&&P.envMap===null&&_.environment!==null&&(i2.envMapIntensity.value=_.environmentIntensity),i2.dfgLUT!==void 0&&(i2.dfgLUT.value=OT()),xi){if(w1.setValue(A,"toneMappingExposure",S.toneMappingExposure),Ht.needsLights&&PV(i2,k0),Mt&&P.fog===!0&&_t.refreshFogUniforms(i2,Mt),_t.refreshMaterialUniforms(i2,P,tt,Z,y.state.transmissionRenderTarget[V.id]),Ht.needsLights&&Ht.lightProbeGrid){let A1=Ht.lightProbeGrid;i2.probesSH.value=A1.texture,i2.probesMin.value.copy(A1.boundingBox.min),i2.probesMax.value.copy(A1.boundingBox.max),i2.probesResolution.value.copy(A1.resolution)}u4.upload(A,d8(Ht),i2,Y)}if(P.isShaderMaterial&&P.uniformsNeedUpdate===!0&&(u4.upload(A,d8(Ht),i2,Y),P.uniformsNeedUpdate=!1),P.isSpriteMaterial&&w1.setValue(A,"center",N.center),w1.setValue(A,"modelViewMatrix",N.modelViewMatrix),w1.setValue(A,"normalMatrix",N.normalMatrix),w1.setValue(A,"modelMatrix",N.matrixWorld),P.uniformsGroups!==void 0){let A1=P.uniformsGroups;for(let Li=0,S0=A1.length;Li<S0;Li++){let u8=A1[Li];it.update(u8,Oe),it.bind(u8,Oe)}}return Oe}function PV(V,_){V.ambientLightColor.needsUpdate=_,V.lightProbe.needsUpdate=_,V.sunLights.needsUpdate=_,V.sunLightShadows.needsUpdate=_,V.directionalLights.needsUpdate=_,V.directionalLightShadows.needsUpdate=_,V.pointLights.needsUpdate=_,V.pointLightShadows.needsUpdate=_,V.spotLights.needsUpdate=_,V.spotLightShadows.needsUpdate=_,V.rectAreaLights.needsUpdate=_,V.hemisphereLights.needsUpdate=_}function NV(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(V,_,G){let P=F.get(V);P.__autoAllocateDepthBuffer=V.resolveDepthBuffer===!1,P.__autoAllocateDepthBuffer===!1&&(P.__useRenderToTexture=!1),F.get(V.texture).__webglTexture=_,F.get(V.depthTexture).__webglTexture=P.__autoAllocateDepthBuffer?void 0:G,P.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(V,_){let G=F.get(V);G.__webglFramebuffer=_,G.__useDefaultFramebuffer=_===void 0},this.setRenderTarget=function(V,_=0,G=0){j=V,q=_,X=G;let P=null,N=!1,Mt=!1;if(V){let ft=F.get(V);if(ft.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(A.FRAMEBUFFER,ft.__webglFramebuffer),et.copy(V.viewport),Ot.copy(V.scissor),St=V.scissorTest,z.viewport(et),z.scissor(Ot),z.setScissorTest(St),W=-1;return}else if(ft.__webglFramebuffer===void 0)Y.setupRenderTarget(V);else if(ft.__hasExternalTextures)Y.rebindTextures(V,F.get(V.texture).__webglTexture,F.get(V.depthTexture).__webglTexture);else if(V.depthBuffer){let Kt=V.depthTexture;if(ft.__boundDepthTexture!==Kt){if(Kt!==null&&F.has(Kt)&&(V.width!==Kt.image.width||V.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(V)}}let yt=V.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(Mt=!0);let bt=F.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(bt[_])?P=bt[_][G]:P=bt[_],N=!0):V.samples>0&&Y.useMultisampledRTT(V)===!1?P=F.get(V).__webglMultisampledFramebuffer:Array.isArray(bt)?P=bt[G]:P=bt,et.copy(V.viewport),Ot.copy(V.scissor),St=V.scissorTest}else et.copy(nt).multiplyScalar(tt).floor(),Ot.copy(Ct).multiplyScalar(tt).floor(),St=Zt;if(G!==0&&(P=R),z.bindFramebuffer(A.FRAMEBUFFER,P)&&z.drawBuffers(V,P),z.viewport(et),z.scissor(Ot),z.setScissorTest(St),N){let ft=F.get(V.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+_,ft.__webglTexture,G)}else if(Mt){let ft=_;for(let yt=0;yt<V.textures.length;yt++){let bt=F.get(V.textures[yt]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+yt,bt.__webglTexture,G,ft)}}else if(V!==null&&G!==0){let ft=F.get(V.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,ft.__webglTexture,G)}W=-1};function v8(V){let _=F.get(V);return(_.__readFormat!==V.format||_.__readType!==V.type)&&(_.__readFormat=V.format,_.__readType=V.type,_.__formatReadable=k.textureFormatReadable(V.format),_.__typeReadable=k.textureTypeReadable(V.type)),_}this.readRenderTargetPixels=function(V,_,G,P,N,Mt,Lt,ft=0){if(!(V&&V.isWebGLRenderTarget)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=F.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Lt!==void 0&&(yt=yt[Lt]),yt){z.bindFramebuffer(A.FRAMEBUFFER,yt);try{let bt=V.textures[ft],Kt=bt.format,e1=bt.type;V.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ft);let Bt=v8(bt);if(Bt.__formatReadable===!1){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Bt.__typeReadable===!1){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}_>=0&&_<=V.width-P&&G>=0&&G<=V.height-N&&A.readPixels(_,G,P,N,ut.convert(Kt),ut.convert(e1),Mt)}finally{let bt=j!==null?F.get(j).__webglFramebuffer:null;z.bindFramebuffer(A.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(V,_,G,P,N,Mt,Lt,ft=0){if(!(V&&V.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=F.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Lt!==void 0&&(yt=yt[Lt]),yt)if(_>=0&&_<=V.width-P&&G>=0&&G<=V.height-N){z.bindFramebuffer(A.FRAMEBUFFER,yt);let bt=V.textures[ft],Kt=bt.format,e1=bt.type;V.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ft);let Bt=v8(bt);if(Bt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Bt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let m1=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,m1),A.bufferData(A.PIXEL_PACK_BUFFER,Mt.byteLength,A.STREAM_READ),A.readPixels(_,G,P,N,ut.convert(Kt),ut.convert(e1),0),A.bindBuffer(A.PIXEL_PACK_BUFFER,null);let c2=j!==null?F.get(j).__webglFramebuffer:null;z.bindFramebuffer(A.FRAMEBUFFER,c2);let E1=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await KH(A,E1,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,m1),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,Mt),A.bindBuffer(A.PIXEL_PACK_BUFFER,null),A.deleteBuffer(m1),A.deleteSync(E1),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(V,_=null,G=0){let P=Math.pow(2,-G),N=Math.floor(V.image.width*P),Mt=Math.floor(V.image.height*P),Lt=_!==null?_.x:0,ft=_!==null?_.y:0;Y.setTexture2D(V,0),A.copyTexSubImage2D(A.TEXTURE_2D,G,0,0,Lt,ft,N,Mt),z.unbindTexture()},this.copyTextureToTexture=function(V,_,G=null,P=null,N=0,Mt=0){let Lt,ft,yt,bt,Kt,e1,Bt,m1,c2,E1=V.isCompressedTexture?V.mipmaps[Mt]:V.image;if(G!==null)Lt=G.max.x-G.min.x,ft=G.max.y-G.min.y,yt=G.isBox3?G.max.z-G.min.z:1,bt=G.min.x,Kt=G.min.y,e1=G.isBox3?G.min.z:0;else{let i2=Math.pow(2,-N);Lt=Math.floor(E1.width*i2),ft=Math.floor(E1.height*i2),V.isDataArrayTexture?yt=E1.depth:V.isData3DTexture?yt=Math.floor(E1.depth*i2):yt=1,bt=0,Kt=0,e1=0}P!==null?(Bt=P.x,m1=P.y,c2=P.z):(Bt=0,m1=0,c2=0);let S1=ut.convert(_.format),R2=ut.convert(_.type),Ht;_.isData3DTexture?(Y.setTexture3D(_,0),Ht=A.TEXTURE_3D):_.isDataArrayTexture||_.isCompressedArrayTexture?(Y.setTexture2DArray(_,0),Ht=A.TEXTURE_2D_ARRAY):(Y.setTexture2D(_,0),Ht=A.TEXTURE_2D),z.activeTexture(A.TEXTURE0),z.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,_.flipY),z.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),z.pixelStorei(A.UNPACK_ALIGNMENT,_.unpackAlignment);let X2=z.getParameter(A.UNPACK_ROW_LENGTH),d1=z.getParameter(A.UNPACK_IMAGE_HEIGHT),Oe=z.getParameter(A.UNPACK_SKIP_PIXELS),pa=z.getParameter(A.UNPACK_SKIP_ROWS),xi=z.getParameter(A.UNPACK_SKIP_IMAGES);z.pixelStorei(A.UNPACK_ROW_LENGTH,E1.width),z.pixelStorei(A.UNPACK_IMAGE_HEIGHT,E1.height),z.pixelStorei(A.UNPACK_SKIP_PIXELS,bt),z.pixelStorei(A.UNPACK_SKIP_ROWS,Kt),z.pixelStorei(A.UNPACK_SKIP_IMAGES,e1);let k0=V.isDataArrayTexture||V.isData3DTexture,w1=_.isDataArrayTexture||_.isData3DTexture;if(V.isDepthTexture){let i2=F.get(V),Hi=F.get(_),A1=F.get(i2.__renderTarget),Li=F.get(Hi.__renderTarget);z.bindFramebuffer(A.READ_FRAMEBUFFER,A1.__webglFramebuffer),z.bindFramebuffer(A.DRAW_FRAMEBUFFER,Li.__webglFramebuffer);for(let S0=0;S0<yt;S0++)k0&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,F.get(V).__webglTexture,N,e1+S0),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,F.get(_).__webglTexture,Mt,c2+S0)),A.blitFramebuffer(bt,Kt,Lt,ft,Bt,m1,Lt,ft,A.DEPTH_BUFFER_BIT,A.NEAREST);z.bindFramebuffer(A.READ_FRAMEBUFFER,null),z.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(N!==0||V.isRenderTargetTexture||F.has(V)){let i2=F.get(V),Hi=F.get(_);z.bindFramebuffer(A.READ_FRAMEBUFFER,b),z.bindFramebuffer(A.DRAW_FRAMEBUFFER,I);for(let A1=0;A1<yt;A1++)k0?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,i2.__webglTexture,N,e1+A1):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,i2.__webglTexture,N),w1?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Hi.__webglTexture,Mt,c2+A1):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Hi.__webglTexture,Mt),N!==0?A.blitFramebuffer(bt,Kt,Lt,ft,Bt,m1,Lt,ft,A.COLOR_BUFFER_BIT,A.NEAREST):w1?A.copyTexSubImage3D(Ht,Mt,Bt,m1,c2+A1,bt,Kt,Lt,ft):A.copyTexSubImage2D(Ht,Mt,Bt,m1,bt,Kt,Lt,ft);z.bindFramebuffer(A.READ_FRAMEBUFFER,null),z.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else w1?V.isDataTexture||V.isData3DTexture?A.texSubImage3D(Ht,Mt,Bt,m1,c2,Lt,ft,yt,S1,R2,E1.data):_.isCompressedArrayTexture?A.compressedTexSubImage3D(Ht,Mt,Bt,m1,c2,Lt,ft,yt,S1,E1.data):A.texSubImage3D(Ht,Mt,Bt,m1,c2,Lt,ft,yt,S1,R2,E1):V.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,Mt,Bt,m1,Lt,ft,S1,R2,E1.data):V.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,Mt,Bt,m1,E1.width,E1.height,S1,E1.data):A.texSubImage2D(A.TEXTURE_2D,Mt,Bt,m1,Lt,ft,S1,R2,E1);z.pixelStorei(A.UNPACK_ROW_LENGTH,X2),z.pixelStorei(A.UNPACK_IMAGE_HEIGHT,d1),z.pixelStorei(A.UNPACK_SKIP_PIXELS,Oe),z.pixelStorei(A.UNPACK_SKIP_ROWS,pa),z.pixelStorei(A.UNPACK_SKIP_IMAGES,xi),Mt===0&&_.generateMipmaps&&A.generateMipmap(Ht),z.unbindTexture()},this.initRenderTarget=function(V){F.get(V).__webglFramebuffer===void 0&&Y.setupRenderTarget(V)},this.initTexture=function(V){V.isCubeTexture?Y.setTextureCube(V,0):V.isData3DTexture?Y.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?Y.setTexture2DArray(V,0):Y.setTexture2D(V,0),z.unbindTexture()},this.resetState=function(){q=0,X=0,j=null,z.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return da}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let a=this.getContext();a.drawingBufferColorSpace=n1._getDrawingBufferColorSpace(t),a.unpackColorSpace=n1._getUnpackColorSpace()}}});var ET,RT,DT,x3,bL=rt(()=>{Ac();ci();ET=`
  precision highp float;
  in vec3 position; // a full-screen quad in clip space
  out vec2 v_uv;
  void main() {
    v_uv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,RT=`
  precision highp float;
  uniform sampler2D u_accumulated;
  uniform vec3 u_surface;
  uniform float u_ceiling;   // light at which the glow reaches full intensity
  uniform float u_dim;       // 1: normal; lower while something is focused
  in vec2 v_uv;
  out vec4 fragColor;
  void main() {
    vec3 light = texture(u_accumulated, v_uv).rgb;
    float peak = max(max(light.r, light.g), light.b);
    float intensity = clamp(log(1.0 + peak) / log(1.0 + u_ceiling), 0.0, 1.0) * u_dim;
    vec3 glow = peak > 0.0 ? light / peak * intensity : vec3(0.0);
    fragColor = vec4(u_surface + glow * (1.0 - u_surface), 1.0);
  }
`,DT=new $t(0,0,0),x3=class{#e;#t;#n;#r=new or;#h=new mi;#a=!0;constructor(t){this.#e=t;let{extensions:a}=t,i=a.has("EXT_color_buffer_float")||a.has("EXT_color_buffer_half_float");this.#t=new W2(1,1,{type:i?_e:Q2,depthBuffer:!1});let[r,n,h]=Y6(ql);this.#n=new G2(new x0(2,2),new vr({glslVersion:V0,vertexShader:ET,fragmentShader:RT,uniforms:{u_accumulated:{value:this.#t.texture},u_surface:{value:new U(r,n,h)},u_ceiling:{value:100},u_dim:{value:1}},depthTest:!1,depthWrite:!1})),this.#n.frustumCulled=!1,this.#r.add(this.#n)}setSize(t,a){let i=this.#e.getPixelRatio();this.#t.setSize(Math.max(Math.round(t*i),1),Math.max(Math.round(a*i),1)),this.#a=!0}invalidate(){this.#a=!0}setCeiling(t){this.#i("u_ceiling",t)}setDim(t){this.#i("u_dim",t)}render(t,a){let i=this.#e;this.#a&&(this.#a=!1,i.setRenderTarget(this.#t),i.setClearColor(DT,0),i.clear(),i.render(t,a),i.setRenderTarget(null)),i.render(this.#r,this.#h)}dispose(){this.#n.geometry.dispose(),this.#n.material.dispose(),this.#t.dispose()}#i(t,a){let i=this.#n.material.uniforms[t];i&&(i.value=a)}}});function IT(e){let t=new Float32Array(e*2*3);for(let a=0;a<e;a+=1)t[a*6]=a/e,t[a*6+3]=(a+1)/e;return new A2(t,3)}function PT(e){let t=new Float32Array((e+1)*2*3),a=new Uint16Array(e*6);for(let i=0;i<=e;i+=1){let r=i/e;t.set([r,-1,0,r,1,0],i*6)}for(let i=0;i<e;i+=1){let r=i*2;a.set([r,r+1,r+2,r+1,r+3,r+2],i*6)}return{positions:new A2(t,3),index:new A2(a,1)}}function _L(e,t,a,i){let r=new Mc;if(e==="line")r.setAttribute("position",IT(t));else{let n=PT(t);r.setAttribute("position",n.positions),r.setIndex(n.index)}for(let[n,{array:h,itemSize:c}]of Object.entries(i))r.setAttribute(n,new sc(h,c));return r.instanceCount=a,r}var AL=rt(()=>{Ac()});function TL(e){let t=new M3({canvas:e,antialias:!0,powerPreference:"high-performance"});return t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setClearColor(new $t(ql),1),t}function OL(){return Zl.map(([e,t,a])=>new U(e,t,a))}var EL=rt(()=>{Ac();Eh();ci()});var RL,DL,IL,PL,NL,UL=rt(()=>{RL=`
  precision highp float;

  uniform vec2 u_viewport;   // stage size, CSS px
  uniform vec2 u_view;       // visible window: start, end (verse units)
  uniform vec2 u_axis;       // along-axis pixel range of the window
  uniform float u_baseline;  // across-axis pixel coordinate of the axis
  uniform float u_maxHeight; // tallest arc, px
  uniform float u_vertical;  // 0: horizontal axis, arcs rise up; 1: vertical axis, arcs go right
  uniform float u_reveal;    // share of every arc drawn, from its source: the intro grows it to 1
  uniform vec3 u_palette[10];

  const float PI = 3.14159265;

  float alongOf(float verse) {
    return u_axis.x + (verse - u_view.x) / (u_view.y - u_view.x) * (u_axis.y - u_axis.x);
  }

  // Arc point at angle theta (0 at a, PI at b) in local (along, height) coordinates.
  vec2 arcLocal(float a, float b, float theta) {
    float radius = 0.5 * (b - a);
    float height = min(abs(radius), u_maxHeight);
    return vec2(0.5 * (a + b) - radius * cos(theta), height * sin(theta));
  }

  vec2 arcTangent(float a, float b, float theta) {
    float radius = 0.5 * (b - a);
    float height = min(abs(radius), u_maxHeight);
    return vec2(radius * sin(theta), height * cos(theta));
  }

  vec2 toScreen(vec2 local) {
    return u_vertical < 0.5
      ? vec2(local.x, u_baseline - local.y)
      : vec2(u_baseline + local.y, local.x);
  }

  vec2 toScreenDirection(vec2 local) {
    return u_vertical < 0.5 ? vec2(local.x, -local.y) : vec2(local.y, local.x);
  }

  vec4 toClip(vec2 px) {
    return vec4(px.x / u_viewport.x * 2.0 - 1.0, 1.0 - px.y / u_viewport.y * 2.0, 0.0, 1.0);
  }

  vec3 arcColor(vec2 genres, float t) {
    return mix(u_palette[int(genres.x + 0.5)], u_palette[int(genres.y + 0.5)], t);
  }

  // Past the revealed share, vertices collapse onto its end, so each arc grows from its source.
  float revealed(float t) {
    return min(t, u_reveal);
  }

  // The arcs also fade in while they grow.
  float revealFade() {
    return smoothstep(0.0, 0.5, u_reveal);
  }
`,DL=`
  ${RL}
  uniform float u_alpha;

  in vec3 position;   // x: t in [0, 1] along the arc
  in vec2 a_ends;
  in vec2 a_genres;
  in float a_weight;

  out vec4 v_color;

  void main() {
    float t = revealed(position.x);
    vec2 local = arcLocal(alongOf(a_ends.x), alongOf(a_ends.y), PI * t);
    gl_Position = toClip(toScreen(local));
    v_color = vec4(arcColor(a_genres, t), u_alpha * a_weight * revealFade());
  }
`,IL=`
  ${RL}
  uniform float u_alpha;
  uniform float u_width;

  in vec3 position;   // x: t in [0, 1] along the arc; y: side, -1 or 1
  in vec2 a_ends;
  in vec2 a_genres;
  in float a_weight;

  out vec4 v_color;
  out float v_side;

  void main() {
    float t = revealed(position.x);
    float a = alongOf(a_ends.x);
    float b = alongOf(a_ends.y);
    vec2 point = toScreen(arcLocal(a, b, PI * t));
    vec2 tangent = toScreenDirection(arcTangent(a, b, PI * t));
    vec2 normal = length(tangent) > 1e-4 ? normalize(vec2(-tangent.y, tangent.x)) : vec2(0.0, 1.0);
    gl_Position = toClip(point + normal * position.y * u_width * 0.5);
    v_color = vec4(arcColor(a_genres, t), u_alpha * mix(0.55, 1.0, a_weight) * revealFade());
    v_side = position.y;
  }
`,PL=`
  precision highp float;
  in vec4 v_color;
  out vec4 fragColor;
  void main() {
    fragColor = v_color;
  }
`,NL=`
  precision highp float;
  in vec4 v_color;
  in float v_side;
  out vec4 fragColor;
  void main() {
    float edge = 1.0 - smoothstep(0.5, 1.0, abs(v_side));
    fragColor = vec4(v_color.rgb, v_color.a * edge);
  }
`});function FL(e,t){return _L(e,e==="line"?NT:UT,t.count,{a_ends:{array:t.endpoints,itemSize:2},a_genres:{array:t.genres,itemSize:2},a_weight:{array:t.weights,itemSize:1}})}var NT,UT,H3,FT,WL,WT,L3,GL=rt(()=>{Ac();bL();AL();EL();UL();NT=48,UT=64;H3={count:0,endpoints:new Float32Array(0),genres:new Float32Array(0),weights:new Float32Array(0)},FT=.28,WL=.95,WT=.22,L3=class{#e;#t;#n=new or;#r=new or;#h=new mi;#a={u_viewport:{value:new h1(1,1)},u_view:{value:new h1(0,1)},u_axis:{value:new h1(0,1)},u_baseline:{value:0},u_maxHeight:{value:0},u_vertical:{value:0},u_reveal:{value:1},u_palette:{value:OL()}};#i;#d;#l;#c;constructor(t){this.#e=TL(t),this.#e.autoClear=!1,this.#t=new x3(this.#e),this.#i=this.#o(this.#n,"line",zc,1,1),this.#d=this.#o(this.#r,"ribbon",Ea,.85,1.4),this.#l=this.#o(this.#r,"ribbon",Ea,WL,1.8),this.#c=this.#o(this.#r,"ribbon",Ea,1,2),this.#d.renderOrder=1,this.#l.renderOrder=2,this.#c.renderOrder=3}setSize(t,a){this.#e.setSize(t,a,!1),this.#t.setSize(t,a),this.#a.u_viewport.value.set(t,a)}setLayout(t){this.#a.u_axis.value.set(t.axisStart,t.axisEnd),this.#a.u_baseline.value=t.baseline,this.#a.u_maxHeight.value=t.maxArcHeight,this.#a.u_vertical.value=t.orientation==="vertical"?1:0,this.#t.invalidate()}setView(t){let a=this.#a.u_view.value;(a.x!==t.start||a.y!==t.end)&&(a.set(t.start,t.end),this.#t.invalidate())}setLinks(t,a){this.#s(this.#i,t),this.#t.setCeiling(a),this.#t.invalidate()}setReveal(t){this.#a.u_reveal.value=t,this.#t.invalidate()}setDimmed(t){this.#t.setDim(t?FT:1)}setHover(t){this.#s(this.#d,t??H3)}setFocus(t){this.#s(this.#l,t??H3)}setPreview(t){this.#s(this.#c,t??H3);let a=this.#l.material.uniforms.u_alpha;a&&(a.value=t?WT:WL)}render(){this.#e.clear(),this.#t.render(this.#n,this.#h),this.#e.render(this.#r,this.#h)}dispose(){for(let t of[this.#i,this.#d,this.#l,this.#c])t.geometry.dispose(),t.material.dispose();this.#t.dispose(),this.#e.dispose()}#o(t,a,i,r,n){let h=new vr({glslVersion:V0,vertexShader:a==="line"?DL:IL,fragmentShader:a==="line"?PL:NL,uniforms:{...this.#a,u_alpha:{value:r},u_width:{value:n}},transparent:!0,depthTest:!1,depthWrite:!1,blending:i}),c=FL(a,H3),o=a==="line"?new h4(c,h):new G2(c,h);return o.frustumCulled=!1,o.visible=!1,t.add(o),o}#s(t,a){let i=t instanceof h4?"line":"ribbon";t.geometry.dispose(),t.geometry=FL(i,a),t.visible=a.count>0}}});function Yu(e){return{start:0,end:e}}function Ku(e,t,a=24){let i=Math.min(Math.max(e.end-e.start,Math.min(a,t)),t),r=Math.min(Math.max(e.start,0),t-i);return{start:r,end:r+i}}function Ju(e,t,a,i){let r=e.end-e.start,n=Math.min(Math.max(r/t,24),i),h=r>0?(a-e.start)/r:.5,c=a-h*n;return Ku({start:c,end:c+n},i)}function V3(e,t,a){return Ku({start:e.start+t,end:e.end+t},a)}function jL(e,t,a,i){if(t>=e.start&&a<=e.end)return e;let r=e.end-e.start,n=(t+a)/2;return Ku({start:n-r/2,end:n+r/2},i)}function XL(e,t,a){return{start:e.start+(t.start-e.start)*a,end:e.end+(t.end-e.end)*a}}var qL=rt(()=>{});function w3(e,t,a,i,r,n){if(t.orientation==="horizontal"){e.fillRect(a,r,i-a,n-r);return}let h=2*t.baseline-n;e.fillRect(h,a,n-r,i-a)}function ZL(e,t){var d;let{layout:a,view:i,versification:r}=t;e.clearRect(0,0,a.width,a.height);let n=u=>Gx(a,i,u),h=(u,p)=>p>=a.axisStart&&u<=a.axisEnd,c=u=>Math.min(Math.max(u,a.axisStart),a.axisEnd),o=a.baseline+t8,l=o+e8;e.fillStyle=GT,w3(e,a,a.axisStart,a.axisEnd,a.baseline,a.baseline+1);for(let u of W1){let p=r.bookRange(u.id),x=n(p.start),f=n(p.end+1);if(!h(x,f))continue;let s=f-x>4?1:0;e.globalAlpha=u.ordinal%2===0?1:.72,e.fillStyle=Vt(Xe,I2(u.id).ordinal),w3(e,a,c(x)+s,c(f)-s,o,l)}if(e.globalAlpha=1,(a.axisEnd-a.axisStart)/(i.end-i.start)*26>10){e.fillStyle=$u;for(let u of W1)for(let p=1;p<=r.chapterCountOf(u.id);p+=1){let x=((d=r.chapterRange(u.id,p))==null?void 0:d.start)??0,f=n(x);f>=a.axisStart&&f<=a.axisEnd&&w3(e,a,f,f+1,l+1,l+4)}}let g=(u,p,x)=>{if(!u)return;let f=n(u.start),s=n(u.end+1);if(!h(f,s))return;e.fillStyle=p;let M=(c(f)+c(s))/2,L=Math.max((c(s)-c(f))/2,x);w3(e,a,M-L,M+L,o-2,l+2)};g(t.passage,"rgb(236 235 230 / 0.3)",1.5),g(t.hover,"rgb(236 235 230 / 0.45)",1.5),g(t.focus,Qu,2),qT(e,t,n),a.orientation==="horizontal"&&ZT(e,t,n),YT(e,t)}function qT(e,{layout:t,versification:a,names:i,focus:r,hover:n,passage:h},c){let o=t.orientation==="horizontal",l=t8+e8,v=t.baseline-l-8;e.font=jT,e.textBaseline="middle",e.textAlign=o?"center":"right";let g=(d,u,p)=>d!==null&&d.start<=p&&d.end>=u;for(let d of W1){let u=a.bookRange(d.id),p=Math.max(c(u.start),t.axisStart),x=Math.min(c(u.end+1),t.axisEnd),f=x-p;if(f<=0)continue;let s=i[d.id].abbreviation??d.id,M=[i[d.id].name,s],L=o?M.find(y=>e.measureText(y).width+8<=f):f>=12?M.find(y=>e.measureText(y).width<=v):void 0;if(L===void 0)continue;let m=g(r,u.start,u.end)||g(n,u.start,u.end)||g(h,u.start,u.end);e.fillStyle=m?Qu:$u;let w=(p+x)/2;o?e.fillText(L,w,t.baseline+l+12):e.fillText(L,t.baseline-l-5,w)}}function ZT(e,{layout:t,versification:a,genreNames:i},r){e.font=XT,e.textAlign="center";let n=t.baseline+t8+e8+32;for(let h of $1){let c=k6(h.id),o=c[0],l=c.at(-1);if(!o||!l)continue;let v=Math.max(r(a.bookRange(o).start),t.axisStart),g=Math.min(r(a.bookRange(l).end+1),t.axisEnd),d=i[h.id].toUpperCase();if(g-v<e.measureText(d).width+16)continue;let u=(v+g)/2,p=e.measureText(d).width;e.fillStyle=Vt(Xe,h.ordinal),e.fillRect(u-p/2-12,n-1,8,2),e.fillStyle=$u,e.fillText(d,u+2,n)}}function YT(e,{layout:t,view:a,versification:i}){let r=i.verseCount;if(a.end-a.start>=r-.5)return;let n=t.orientation==="horizontal",h=n?t.width-64:t.height-64,c=32,o=g=>c+g/r*h;for(let g of $1){let d=k6(g.id),u=d[0],p=d.at(-1);if(!u||!p)continue;let x=o(i.bookRange(u).start),f=o(i.bookRange(p).end+1);e.fillStyle=Vt(Xe,g.ordinal),n?e.fillRect(x,6,f-x,3):e.fillRect(t.width-9,x,3,f-x)}e.strokeStyle=Qu,e.lineWidth=1;let l=o(a.start),v=o(a.end);n?e.strokeRect(l-.5,2.5,Math.max(v-l,3)+1,10):e.strokeRect(t.width-13.5,l-.5,10,Math.max(v-l,3)+1)}var Qu,$u,GT,t8,e8,jT,XT,YL=rt(()=>{wa();Ve();ia();ci();yv();Qu=Oh("--color-text","#ecebe6"),$u=Oh("--color-text-muted","#9a9890"),GT=Oh("--color-border","#3a3935"),t8=3,e8=8,jT='11px system-ui, -apple-system, "Segoe UI", sans-serif',XT='600 10px system-ui, -apple-system, "Segoe UI", sans-serif'});function JT(e){return Math.max(e/250,20)}var KT,KL,JL,QT,QL,$T,tO,y3,$L=rt(()=>{na();Wx();Eh();yv();GL();qL();YL();KT=4,KL=.15,JL=1.6;QT=800,QL=16,$T=44,tO=900,y3=class{#e;#t;#n;#r;#h;#a=wv(0,0);#i;#d;#l;#c=null;#o=null;#s=null;#M=null;#v=null;#u=null;#m=()=>null;#g=null;#p="pending";#z=null;#x=!0;#H=!1;constructor(t){this.#e=t,this.#t=new L3(t.glCanvas);let a=t.overlayCanvas.getContext("2d");if(!a)throw new Error("Canvas 2D is not available.");this.#n=a,this.#i=Yu(t.versification.verseCount),this.#d=t.names,this.#l=t.genreNames,this.#r=new e0(()=>{this.#w()}),this.#h=Fx(t.container,{onPan:(i,r)=>{this.#_(this.#a.orientation==="horizontal"?i:r)},onZoom:(i,r)=>{this.#N(i,r)},onHover:(i,r)=>{this.#O(i,r)},onLeave:()=>{this.#E()},previewsAt:i=>this.#D(i),onTap:i=>{let r=this.#y(i);r&&t.onSelect(r)},onDoubleTap:i=>{this.#L(3,i)}}),t.container.addEventListener("keydown",this.#A)}setSize(t,a){this.#a=wv(t,a),this.#t.setSize(t,a),this.#t.setLayout(this.#a);let i=Math.min(window.devicePixelRatio,2),r=this.#e.overlayCanvas;r.width=Math.round(t*i),r.height=Math.round(a*i),this.#n.setTransform(i,0,0,i,0,0),this.#r.request()}setLinks(t){this.#t.setLinks(t,JT(t.count)),this.#H=t.count>0,this.#p==="pending"&&this.#H&&this.#x&&this.#V(),this.#r.request()}setLinkResolver(t){this.#m=t,this.#t.setFocus(this.#c&&t(this.#c)),this.#t.setHover(this.#o&&t(this.#o)),this.#r.request()}setFocus(t){var i,r;let a=(t==null?void 0:t.start)!==((i=this.#c)==null?void 0:i.start)||(t==null?void 0:t.end)!==((r=this.#c)==null?void 0:r.end);this.#c=t,this.#t.setFocus(t&&this.#m(t)),this.#t.setDimmed(t!==null),t&&a&&this.#f(jL(this.#i,t.start,t.end+1,this.#e.versification.verseCount)),this.#r.request()}setPreview(t){this.#s=t,this.#t.setPreview((t==null?void 0:t.links)??null),this.#r.request()}resetView(){this.#f(Yu(this.#e.versification.verseCount))}dispose(){var t,a;(t=this.#g)==null||t.call(this),(a=this.#z)==null||a.call(this),this.#S(),this.#r.dispose(),this.#h(),this.#e.container.removeEventListener("keydown",this.#A),this.#t.dispose()}#V(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){this.#p="done";return}this.#p="running",this.#t.setReveal(0),this.#z=K6(QT,t=>{this.#t.setReveal(t),t>=1&&(this.#p="done",this.#z=null),this.#r.request()})}setNames(t,a){this.#d=t,this.#l=a,this.#w()}setActive(t){this.#x=t,t&&(this.#p==="pending"&&this.#H&&this.#V(),this.#r.request())}#w(){var t;!this.#x||this.#a.width===0||this.#a.height===0||(this.#t.setView(this.#i),this.#t.render(),ZL(this.#n,{layout:this.#a,view:this.#i,versification:this.#e.versification,names:this.#d,genreNames:this.#l,focus:this.#c,hover:this.#o,passage:((t=this.#s)==null?void 0:t.passage)??null}))}#T(t){let a=qh(this.#a,t);if(a<this.#a.axisStart||a>this.#a.axisEnd)return null;let i=Math.floor(H5(this.#a,this.#i,a));return Math.min(Math.max(i,0),this.#e.versification.verseCount-1)}#y(t){let a=this.#T(t);return a===null?null:Xh(this.#a,this.#i)<KT?$i(a,this.#e.versification):he(a)}#O(t,a){this.#B(t,a),a==="touch"&&(this.#M=t,this.#I())}#E(){this.#M=null,this.#S(),this.#b(null),this.#e.onHover(null)}#B(t,a){let i=this.#y(a==="touch"?this.#R(t):t);this.#b(i&&this.#P(i)),this.#e.onHover(i?{passage:i,x:t.x,y:t.y,input:a}:null)}#R(t){let{orientation:a,axisStart:i,axisEnd:r}=this.#a,n=h=>Math.min(Math.max(h,i),r-.5);return a==="horizontal"?{x:n(t.x),y:t.y}:{x:t.x,y:n(t.y)}}#D(t){let{orientation:a,baseline:i}=this.#a;return a==="horizontal"?t.y>=i-QL:t.x<=i+QL}#C(t){let{axisStart:a,axisEnd:i}=this.#a,r=qh(this.#a,t),n=h=>Math.min(Math.max(1-h/$T,0),1)**2;return tO*(n(i-r)-n(r-a))}#I(){let t=this.#M;t&&this.#v===null&&this.#C(t)!==0&&(this.#v=requestAnimationFrame(this.#k))}#k=t=>{this.#v=null;let a=this.#M,i=a?this.#C(a):0;if(!a||i===0){this.#u=null;return}let r=this.#u??t,n=this.#i;if(this.#_(-i*Math.min(t-r,50)/1e3),this.#B(a,"touch"),t!==r&&this.#i.start===n.start){this.#u=null;return}this.#u=t,this.#v=requestAnimationFrame(this.#k)};#S(){this.#v!==null&&cancelAnimationFrame(this.#v),this.#v=null,this.#u=null}#b(t){var a,i;(t==null?void 0:t.start)===((a=this.#o)==null?void 0:a.start)&&(t==null?void 0:t.end)===((i=this.#o)==null?void 0:i.end)||(this.#o=t,this.#t.setHover(t&&this.#m(t)),this.#r.request())}#P(t){return t.kind==="verse"?{start:t.verse,end:t.verse}:this.#e.versification.chapterRange(t.book,t.chapter)??{start:0,end:0}}#_(t){var i;(i=this.#g)==null||i.call(this);let a=-t/Xh(this.#a,this.#i);this.#i=V3(this.#i,a,this.#e.versification.verseCount),this.#r.request()}#N(t,a){var r;(r=this.#g)==null||r.call(this);let i=H5(this.#a,this.#i,qh(this.#a,a));this.#i=Ju(this.#i,t,i,this.#e.versification.verseCount),this.#r.request()}#L(t,a){let i=H5(this.#a,this.#i,qh(this.#a,a));this.#f(Ju(this.#i,t,i,this.#e.versification.verseCount))}#f(t){var i;(i=this.#g)==null||i.call(this);let a=this.#i;this.#g=K6(450,r=>{this.#i=XL(a,t,r),this.#r.request()})}#A=t=>{let a=this.#e.versification.verseCount,i=this.#i.end-this.#i.start,r={x:this.#a.width/2,y:this.#a.height/2};switch(t.key){case"ArrowLeft":case"ArrowUp":this.#f(V3(this.#i,-i*KL,a));break;case"ArrowRight":case"ArrowDown":this.#f(V3(this.#i,i*KL,a));break;case"+":case"=":this.#L(JL,r);break;case"-":case"_":this.#L(1/JL,r);break;case"0":this.resetView();break;case"Escape":this.#e.onClear();break;default:return}t.preventDefault()}}});var p4,tV=rt(()=>{p4={stage:"pe",canvas:"br",tooltip:"d","tooltip-in":"me",gestures:"xr"}});function iV({data:e,active:t,linkIds:a,filter:i,focus:r,preview:n,onSelect:h}){let{t:c,books:o,locale:l}=Gt(),v=l.genres,g=(0,G1.useRef)({books:o,genres:v}),d=(0,G1.useRef)(null),u=(0,G1.useRef)(null),p=(0,G1.useRef)(null),x=(0,G1.useRef)(null),f=m5(d),[s,M]=(0,G1.useState)(null),L=(0,G1.useEffectEvent)(m=>{h(m)});return(0,G1.useEffect)(()=>{let m=d.current,w=u.current,y=p.current;if(!m||!w||!y)return;let C=new y3({container:m,glCanvas:w,overlayCanvas:y,versification:e.versification,names:g.current.books,genreNames:g.current.genres,onHover:M,onSelect:H=>{L(H)},onClear:()=>{L(null)}});return x.current=C,()=>{C.dispose(),x.current=null}},[e.versification]),(0,G1.useEffect)(()=>{var m;g.current={books:o,genres:v},(m=x.current)==null||m.setNames(o,v)},[o,v]),(0,G1.useEffect)(()=>{var m;(m=x.current)==null||m.setActive(t)},[t]),(0,G1.useEffect)(()=>{var m;(m=x.current)==null||m.setSize(f.width,f.height)},[f]),(0,G1.useEffect)(()=>{var m;(m=x.current)==null||m.setLinks(x5(e.crossReferences.index,a,e.verseGenres))},[e,a]),(0,G1.useEffect)(()=>{var w;let{index:m}=e.crossReferences;(w=x.current)==null||w.setLinkResolver(y=>x5(m,uv(v0(m,y,i,e.verseGenres)),e.verseGenres))},[e,i]),(0,G1.useEffect)(()=>{var m;(m=x.current)==null||m.setFocus(r&&oi(r,e.versification))},[r,e.versification]),(0,G1.useEffect)(()=>{var w;let m=n==null?void 0:n.link;(w=x.current)==null||w.setPreview(m?{links:x5(e.crossReferences.index,Int32Array.of(m.id),e.verseGenres),passage:{start:m.targetStart,end:m.targetEnd}}:null)},[n,e]),(0,Ae.jsxs)("div",{ref:d,className:p4.stage,tabIndex:0,role:"application","aria-label":c("arcs.stage"),children:[(0,Ae.jsx)("canvas",{ref:u,className:p4.canvas}),(0,Ae.jsx)("canvas",{ref:p,className:p4.canvas,"aria-hidden":"true"}),s&&(0,Ae.jsx)(iO,{hover:s,data:e,filter:i,size:f})]})}function aV(e,t,a){return Math.max(t,Math.min(e,Math.max(t,a)))}function aO(e,t,a){let{offsetWidth:i,offsetHeight:r}=e,n,h;t.input==="mouse"?(n=t.x+B3,n+i>a.width-B0&&(n=t.x-B3-i),h=t.y+B3,h+r>a.height-B0&&(h=t.y-B3-r)):(n=t.x-i/2,h=t.y-eV-r,h<B0&&(h=t.y+eV)),e.style.left=`${String(aV(n,B0,a.width-i-B0))}px`,e.style.top=`${String(aV(h,B0,a.height-r-B0))}px`}function iO({hover:e,data:t,filter:a,size:i}){let r=(0,G1.useRef)(null),{versification:n,crossReferences:h,verseGenres:c}=t,{t:o,books:l,n:v}=Gt(),g=(0,G1.useMemo)(()=>{let d=v0(h.index,oi(e.passage,n),a,c);return uv(d).length},[h.index,e.passage,n,a,c]);return(0,G1.useLayoutEffect)(()=>{r.current&&aO(r.current,e,i)}),(0,Ae.jsxs)("div",{ref:r,className:p4.tooltip,"data-input":e.input,children:[(0,Ae.jsx)("strong",{children:li(e.passage,n,l)}),(0,Ae.jsx)("span",{children:o("arcs.connections")(v(g),g)}),(0,Ae.jsxs)("span",{className:p4.gestures,children:[e.input==="touch"?(0,Ae.jsx)(Al,{}):(0,Ae.jsx)(_l,{})," ",o("hint.focus")," · ",(0,Ae.jsx)(Tl,{})," ",o("hint.zoom")]})]})}var G1,Ae,B3,eV,B0,rV=rt(()=>{G1=ct(u1(),1);na();L2();v2();d5();xv();Ux();$L();tV();Ae=ct(Tt(),1);B3=14,eV=56,B0=8});var nV={};g8(nV,{ArcsExplorer:()=>nO});function nO({data:e,active:t,passage:a,onNavigate:i,filter:r,onFilterChange:n,masthead:h,translationMenu:c,passageLinks:o,shareUrl:l}){let{t:v}=Gt(),{index:g}=e.crossReferences,d=(0,Tc.useMemo)(()=>$l(g,e.verseGenres,r),[g,e.verseGenres,r]),u=(0,Tc.useMemo)(()=>Px(g,d,e.verseGenres),[g,d,e.verseGenres]),p=()=>{i(null)},[x,f]=(0,Tc.useState)(null),s=(x==null?void 0:x.passage)===a?x.connection:null;return(0,Z1.jsxs)(In,{masthead:h,credits:(0,Z1.jsx)(Rn,{translation:e.translation.manifest,inspiration:rO}),onPanelClose:p,controls:(0,Z1.jsxs)(Z1.Fragment,{children:[(0,Z1.jsx)(f5,{versification:e.versification,onSelect:i}),c,(0,Z1.jsx)(h5,{filter:r,defaults:Ba,onChange:n,shownLinks:d.length,totalLinks:g.linkCount})]}),panel:a&&(0,Z1.jsx)(u5,{data:e,passage:a,filter:r,actions:o(a),onSelect:i,onClose:p,shareUrl:l,onPreview:M=>{f(M&&{passage:a,connection:M})}}),children:[(0,Z1.jsx)(iV,{data:e,active:t,linkIds:d,filter:r,focus:a,preview:s,onSelect:i}),(0,Z1.jsx)(fx,{summary:u,hint:{pointer:(0,Z1.jsxs)(Z1.Fragment,{children:[(0,Z1.jsx)(km,{})," ",v("hint.zoom")," · ",(0,Z1.jsx)(Sm,{})," ",v("hint.pan")," · ",(0,Z1.jsx)(_l,{})," ",v("hint.focus")]}),touch:(0,Z1.jsxs)(Z1.Fragment,{children:[(0,Z1.jsx)(bm,{})," ",v("hint.hold")," · ",(0,Z1.jsx)(Al,{})," ",v("hint.focus")," · ",(0,Z1.jsx)(Tl,{})," ",v("hint.zoom")]})}}),(0,Z1.jsx)(vx,{hiddenGenres:r.hiddenGenres,onToggle:M=>{n({...r,hiddenGenres:o5(r.hiddenGenres,M)})}})]})}var Tc,Z1,rO,hV=rt(()=>{Tc=ct(u1(),1);L2();t5();dv();v2();ux();Gh();Mx();Mv();zv();a5();r0();Nx();rV();Z1=ct(Tt(),1),rO={title:"Bible Cross-References",author:"Chris Harrison and Christoph Römhild",url:"https://www.chrisharrison.net/index.php/visualizations/BibleViz"}});function lV(e){let{t}=Gt();return(0,a8.jsx)(Dn,{label:t("genres.label"),changedLabel:t("genres.labelChanged"),icon:bn,indicator:e.hiddenGenres.size>0,children:(0,a8.jsx)(c5,{...e})})}var a8,dV=rt(()=>{v2();L2();Gh();e5();a8=ct(Tt(),1)});function sV({label:e,options:t,value:a,onChange:i,iconsOnlyWhenNarrow:r=!1}){return(0,f4.jsx)("div",{role:"group","aria-label":e,className:Ft.segmented,"data-icons-only-when-narrow":r,children:t.map(({value:n,label:h,icon:c})=>(0,f4.jsxs)("button",{type:"button",className:Ft.button,"aria-label":h,title:r?h:void 0,"aria-pressed":n===a,onClick:()=>{i(n)},children:[c&&(0,f4.jsx)(c,{}),(0,f4.jsx)("span",{className:Ft.optionLabel,children:h})]},n))})}var f4,vV=rt(()=>{ni();f4=ct(Tt(),1)});function uV(e,t,a,i){let r=0;W1.forEach((v,g)=>{let d=W1[g-1];d&&I2(d.id).ordinal!==I2(v.id).ordinal&&(r+=1)});let n=(W1.length-1-r)*i.book+r*i.genre,h=Math.max(a-t-n,0)/e.verseCount,c=[],o=t;W1.forEach((v,g)=>{let d=W1[g-1],u=I2(v.id).ordinal;d&&(o+=I2(d.id).ordinal===u?i.book:i.genre);let p=e.bookRange(v.id),x=(p.end-p.start+1)*h;c.push({book:v.id,genreOrdinal:u,start:p.start,end:p.end,top:o,bottom:o+x}),o+=x});let l=v=>c.find(g=>v>=g.start&&v<=g.end);return{segments:c,yOf:v=>{let g=l(v);return g?g.top+(v-g.start+.5)*h:t},verseAt:v=>{let g=c.find(u=>v>=u.top&&v<=u.bottom);if(!g||h===0)return null;let d=Math.floor((v-g.top)/h);return Math.min(g.start+Math.max(d,0),g.end)}}}var gV=rt(()=>{wa();Ve()});function C3(e){return{left:e.gutterWidth+2,width:e.compact?6:8}}function fV(e,t){e.clearRect(0,0,t.width,t.height),lO(e,t),dO(e,t)}function lO(e,t){let{spine:a,gutterWidth:i,emphasizedVerse:r,emphasizedBook:n,emphasizedLink:h}=t,c=C3(t),o=r!==null||n!==null||h!==null,l=d=>n!==null&&a.segments.some(u=>u.book===n&&d.otherStart>=u.start&&d.otherStart<=u.end),v=[];for(let d of t.anchors)for(let u of t.connectionsByVerse.get(d.verse)??[]){let p=h!==null?u.link.id===h:d.verse===r||l(u),x=z5(u.link.votes);v.push({y:d.y,target:a.yOf((u.otherStart+u.otherEnd)/2),color:Vt(Xe,Vt(t.verseGenres,u.otherStart)),alpha:p?.95:o?.06+.1*x:.18+.5*x,emphasized:p})}v.sort((d,u)=>Number(d.emphasized)-Number(u.emphasized));let g=i*.55;for(let d of v)e.globalAlpha=d.alpha,e.strokeStyle=d.color,e.lineWidth=d.emphasized?1.6:1,e.beginPath(),e.moveTo(0,d.y),e.bezierCurveTo(g,d.y,i-g,d.target,c.left,d.target),e.stroke(),e.fillStyle=d.color,e.fillRect(c.left-4,d.target-.5,4,1);e.globalAlpha=1}function dO(e,t){let{spine:a,compact:i,chapter:r,emphasizedBook:n}=t,h=C3(t),c=h.left+h.width+5;e.font=oO,e.textBaseline="middle",e.textAlign="left";for(let[v,g]of a.segments.entries())e.globalAlpha=v%2===0?1:.72,e.fillStyle=Vt(Xe,g.genreOrdinal),e.fillRect(h.left,g.top,h.width,Math.max(g.bottom-g.top,.5));e.globalAlpha=1;for(let v of a.segments){let g=v.bottom-v.top,d=v.book===n;if(g<(i?12:10)&&!d)continue;let u=t.names[v.book],p=t.width-c-2,x=[u.name,u.abbreviation??v.book].find(f=>e.measureText(f).width<=p);x!==void 0&&(e.fillStyle=d?pV:cO,e.fillText(x,c,(v.top+v.bottom)/2))}let o=a.yOf(r.start)-2,l=Math.max(a.yOf(r.end)+2,o+4);e.fillStyle=pV,e.fillRect(h.left-3,o,2,l-o),e.beginPath(),e.moveTo(h.left-3,(o+l)/2-4),e.lineTo(h.left-8,(o+l)/2),e.lineTo(h.left-3,(o+l)/2+4),e.fill()}var pV,cO,oO,MV=rt(()=>{ia();ci();Hv();pV="#ecebe6",cO="#9a9890",oO='10px system-ui, -apple-system, "Segoe UI", sans-serif'});var j1,mV=rt(()=>{j1={stage:"ve",reading:"ge",chapterHeader:"j",titleRow:"hr",position:"kr",column:"zr",eyebrow:"F",key:"yr",title:"G",chapterNav:"p",navLabel:"wr",verses:"jr",verse:"f",number:"ue",text:"fe",omitted:"Yr",count:"Sr",canvasHost:"Ir",canvas:"Mr",tooltip:"be"}});function xV({data:e,book:t,chapter:a,selectedVerse:i,filter:r,direction:n,preview:h,onSelect:c}){let{t:o,n:l,books:v,genreName:g}=Gt(),{versification:d,translation:u,crossReferences:p,verseGenres:x}=e,f=(0,m2.useRef)(null),s=(0,m2.useRef)(null),M=(0,m2.useRef)(null),L=(0,m2.useRef)(new Map),m=m5(s),w=(0,m2.useRef)(null),[y,C]=(0,m2.useState)(null),[H,B]=(0,m2.useState)(!1),[S,E]=(0,m2.useState)(null),[O,R]=(0,m2.useState)(null),b=d.chapterRange(t,a)??{start:0,end:0},{start:I,end:q}=b,X=m.width<120,j=m.width-(X?zV.compact:zV.wide),W=(0,m2.useMemo)(()=>{let ht=v0(p.index,{start:I,end:q},r,x),nt=[...n==="incoming"?[]:ht.outgoing,...n==="outgoing"?[]:ht.incoming],Ct=new Map;for(let Zt of nt)Ct.set(Zt.here,[...Ct.get(Zt.here)??[],Zt]);return Ct},[p.index,I,q,r,x,n]),K=(0,m2.useMemo)(()=>uV(d,uO,m.height-gO,{book:X?.5:1,genre:X?3:5}),[d,m.height,X]),et=y??i,Ot=(O==null?void 0:O.book)??null,St=(0,m2.useMemo)(()=>{let ht=h==null?void 0:h.link.id;if(ht===void 0)return null;for(let nt of W.values())if(nt.some(Ct=>Ct.link.id===ht))return ht;return null},[h,W]),f1=h&&{start:h.link.targetStart,end:h.link.targetEnd};(0,m2.useEffect)(()=>{let ht=M.current,nt=f.current,Ct=ht==null?void 0:ht.getContext("2d");if(!ht||!nt||!Ct||m.width===0)return;let Zt=Math.min(window.devicePixelRatio,2);ht.width=Math.round(m.width*Zt),ht.height=Math.round(m.height*Zt),Ct.setTransform(Zt,0,0,Zt,0,0);let Rt=new e0(()=>{var a2;let Qt=ht.getBoundingClientRect().top,Yt=(((a2=w.current)==null?void 0:a2.getBoundingClientRect().bottom)??Qt)-Qt,k1=[];for(let[O2,O1]of L.current){let X1=O1.getBoundingClientRect(),A=X1.top-Qt+Math.min(X1.height/2,15);A>=Yt&&A<=m.height&&k1.push({verse:O2,y:A})}fV(Ct,{names:v,width:m.width,height:m.height,gutterWidth:j,compact:X,spine:K,anchors:k1,connectionsByVerse:W,verseGenres:x,chapter:{start:I,end:q},emphasizedVerse:et,emphasizedBook:Ot,emphasizedLink:St})});Rt.request();let Ut=()=>{Rt.request()};return nt.addEventListener("scroll",Ut,{passive:!0}),()=>{nt.removeEventListener("scroll",Ut),Rt.dispose()}},[m,j,X,K,W,x,I,q,et,Ot,St,v]),(0,m2.useEffect)(()=>{let ht=f.current;if(!ht)return;let nt=new e0(()=>{var Ut;B(ht.scrollTop>vO);let Zt=((Ut=w.current)==null?void 0:Ut.getBoundingClientRect().bottom)??ht.getBoundingClientRect().top,Rt=null;for(let[Qt,Yt]of L.current)Yt.getBoundingClientRect().bottom>Zt+4&&(Rt=Rt===null?Qt:Math.min(Rt,Qt));E(Rt)});nt.request();let Ct=()=>{nt.request()};return ht.addEventListener("scroll",Ct,{passive:!0}),()=>{ht.removeEventListener("scroll",Ct),nt.dispose()}},[I,q]),(0,m2.useEffect)(()=>{let ht=i===null?null:L.current.get(i),nt=f.current;if(!ht||!nt)return;let Ct=ht.getBoundingClientRect(),Zt=nt.getBoundingClientRect();(Ct.top<Zt.top||Ct.bottom>Zt.bottom)&&ht.scrollIntoView({block:"center",behavior:"smooth"})},[i]);let t1=ht=>{let nt=ht.currentTarget.getBoundingClientRect();return ht.clientX-nt.left>=C3({gutterWidth:j,compact:X}).left-6?K.verseAt(ht.clientY-nt.top):null},l1=Array.from({length:q-I+1},(ht,nt)=>I+nt),Z=I2(t),tt=I>0?$i(I-1,d):null,xt=q+1<d.verseCount?$i(q+1,d):null;return(0,C1.jsxs)("div",{className:j1.stage,children:[(0,C1.jsxs)("div",{ref:f,className:j1.reading,children:[(0,C1.jsx)("header",{ref:w,className:j1.chapterHeader,"data-condensed":H,children:(0,C1.jsxs)("div",{className:j1.column,children:[(0,C1.jsxs)("p",{className:j1.eyebrow,children:[(0,C1.jsx)("span",{className:j1.key,style:{background:hi[Z.id]}}),g(Z.id)," ·"," ",Z.testament==="OT"?o("testament.OT"):o("testament.NT")]}),(0,C1.jsxs)("div",{className:j1.titleRow,children:[(0,C1.jsxs)("h2",{className:j1.title,children:[v[t].name," ",a,H&&S!==null&&(0,C1.jsxs)("span",{className:j1.position,children:[":",d.refAt(S).verse]})]}),(0,C1.jsxs)("nav",{className:j1.chapterNav,"aria-label":o("threads.chapters"),children:[(0,C1.jsxs)("button",{type:"button",disabled:!tt,"aria-label":o("threads.previousChapter"),onClick:()=>{tt&&c(tt)},children:[(0,C1.jsx)(Cl,{}),(0,C1.jsx)("span",{className:j1.navLabel,children:o("threads.previousChapter")})]}),(0,C1.jsxs)("button",{type:"button",disabled:!xt,"aria-label":o("threads.nextChapter"),onClick:()=>{xt&&c(xt)},children:[(0,C1.jsx)("span",{className:j1.navLabel,children:o("threads.nextChapter")}),(0,C1.jsx)(kl,{})]})]})]})]})}),(0,C1.jsx)("div",{className:j1.column,children:(0,C1.jsx)("ol",{className:j1.verses,children:l1.map((ht,nt)=>{var Rt;let Ct=u.verseText(ht),Zt=((Rt=W.get(ht))==null?void 0:Rt.length)??0;return(0,C1.jsxs)("li",{ref:Ut=>{let Qt=L.current;return Ut&&Qt.set(ht,Ut),()=>{Qt.delete(ht)}},className:j1.verse,"data-selected":ht===i,"data-linked":f1!==null&&ht>=f1.start&&ht<=f1.end,onPointerEnter:Ut=>{Ut.pointerType==="mouse"&&C(ht)},onPointerLeave:()=>{C(null)},onClick:()=>{c(ht===i?{kind:"chapter",book:t,chapter:a}:he(ht))},children:[(0,C1.jsx)("button",{type:"button",className:j1.number,"aria-label":o("threads.verse")(l(nt+1)),"aria-pressed":ht===i,children:nt+1}),(0,C1.jsx)("span",{className:Ct?j1.text:`${j1.text} ${j1.omitted}`,children:Ct||o("threads.omitted")(u.manifest.abbreviation)}),(0,C1.jsx)("span",{className:j1.count,title:o("arcs.connections")(l(Zt),Zt),children:Zt>0?l(Zt):""})]},ht)})})})]},`${t}.${a}`),(0,C1.jsxs)("div",{ref:s,className:j1.canvasHost,onPointerMove:ht=>{let nt=t1(ht);if(nt===null){R(null);return}let Ct=d.bookAt(nt).id,Zt=0;for(let Ut of W.values())Zt+=Ut.filter(Qt=>d.bookAt(Qt.otherStart).id===Ct).length;let Rt=ht.currentTarget.getBoundingClientRect();R({book:Ct,y:ht.clientY-Rt.top,count:Zt})},onPointerLeave:()=>{R(null)},onClick:ht=>{let nt=t1(ht);nt!==null&&c($i(nt,d))},children:[(0,C1.jsx)("canvas",{ref:M,className:j1.canvas,role:"img","aria-label":o("threads.stage")}),O&&(0,C1.jsxs)("div",{className:j1.tooltip,style:{top:O.y},children:[v[O.book].name," ",(0,C1.jsxs)("span",{children:["· ",o("threads.spineHover")(l(O.count),O.count)]})]})]})]})}var m2,C1,vO,zV,uO,gO,HV=rt(()=>{m2=ct(u1(),1);Ve();na();L2();d5();ci();xv();Eh();gV();MV();mV();v2();C1=ct(Tt(),1),vO=72,zV={wide:96,compact:18},uO=16,gO=14});var LV={};g8(LV,{ThreadsExplorer:()=>mO});function MO(e,t){if(!e)return pO;if(e.kind==="chapter")return{book:e.book,chapter:e.chapter};let{book:a,chapter:i}=t.versification.refAt(oi(e,t.versification).start);return{book:a,chapter:i}}function mO({data:e,passage:t,onNavigate:a,filter:i,onFilterChange:r,masthead:n,translationMenu:h,passageLinks:c,shareUrl:o}){let{t:l}=Gt(),[v,g]=(0,Oc.useState)("outgoing"),d=fO.map(({value:y,labelKey:C,icon:H})=>({value:y,label:l(C),icon:H})),{book:u,chapter:p}=MO(t,e),x=(t==null?void 0:t.kind)==="verse"?t.verse:null,{index:f}=e.crossReferences,s=(0,Oc.useMemo)(()=>$l(f,e.verseGenres,i).length,[f,e.verseGenres,i]),M=()=>{a({kind:"chapter",book:u,chapter:p})},[L,m]=(0,Oc.useState)(null),w=(L==null?void 0:L.passage)===t?L.connection:null;return(0,Te.jsx)(In,{masthead:n,credits:(0,Te.jsx)(Rn,{translation:e.translation.manifest}),onPanelClose:M,controls:(0,Te.jsxs)(Te.Fragment,{children:[(0,Te.jsx)(f5,{versification:e.versification,onSelect:a}),h,(0,Te.jsx)(sV,{label:l("threads.direction"),options:d,value:v,onChange:g,iconsOnlyWhenNarrow:!0}),(0,Te.jsx)(lV,{hiddenGenres:i.hiddenGenres,onToggle:y=>{r({...i,hiddenGenres:o5(i.hiddenGenres,y)})}}),(0,Te.jsx)(h5,{filter:i,defaults:Ba,onChange:r,shownLinks:s,totalLinks:f.linkCount})]}),panel:x!==null&&(0,Te.jsx)(u5,{data:e,passage:{kind:"verse",verse:x},filter:i,actions:c({kind:"verse",verse:x}),onSelect:a,onClose:M,shareUrl:o,onPreview:y=>{m(y&&t&&{passage:t,connection:y})}}),children:(0,Te.jsx)(xV,{data:e,book:u,chapter:p,selectedVerse:x,filter:i,direction:v,preview:w,onSelect:a})})}var Oc,Te,pO,fO,VV=rt(()=>{Oc=ct(u1(),1);na();L2();t5();dv();dV();Gh();Mv();zv();vV();a5();r0();HV();v2();Te=ct(Tt(),1),pO={book:"John",chapter:1},fO=[{value:"outgoing",labelKey:"threads.outgoing",icon:Ol},{value:"incoming",labelKey:"threads.incoming",icon:El},{value:"both",labelKey:"threads.both",icon:Tm}]});Lr();var lM=ct(u1(),1),dM=ct(nM(),1);var vM=ct(Tt(),1);function sM(e){let t=document.getElementById("root");if(!t)throw new Error("Root element #root not found.");(0,dM.createRoot)(t).render((0,vM.jsx)(lM.StrictMode,{children:e}))}var Jl=ct(u1(),1);Wr();mh();v2();var Ym=ct(u1(),1),An=class extends Ym.Component{state={error:null};static getDerivedStateFromError(t){return{error:t instanceof Error?t:new Error(String(t))}}componentDidCatch(t,a){console.error(t,a.componentStack)}#e=()=>{this.setState({error:null})};render(){let{error:t}=this.state;return t?this.props.fallback(t,this.#e):this.props.children}};L2();Th();ni();var Dh=ct(u1(),1);Wr();wa();Ve();ia();function yz(e){let t=e.verseCount;return W1.map(a=>{let i=e.bookRange(a.id);return{start:i.start/t,width:(i.end-i.start+1)/t,genre:I2(a.id).ordinal}})}var Lz=2400,mC=700,jl=.7,Vz=.03,t0=e=>Math.min(Math.max(e,0),1),wz=e=>e<.5?4*e**3:1-(-2*e+2)**3/2;function Xl(e,t,a){let i=e(),r=Vz+(1-Vz)*e()**3,n=e()<.5?1:-1,h=i+n*r,c=t0(h>=0&&h<=1?h:i-n*r),o=l=>Vt(t,Math.round(l*(t.length-1)));return{from:i,to:c,fromGenre:o(i),toGenre:o(c),launchedAt:a,travel:1100+1600*Math.abs(c-i)}}function Bz(e,t){let a=t-e.launchedAt;if(a<0||a>e.travel+Lz)return null;let i=a/e.travel,r=e.travel*jl;return{head:wz(t0(i/jl)),tail:wz(t0((i-(1-jl))/jl)),light:t0(i/.08)*t0((1-i)/.15),trace:t0(1-(a-e.travel)/Lz),landing:a<r?0:t0(1-(a-r)/mC)}}function Cz(e,t){return{x:e.from+(e.to-e.from)*(1-Math.cos(Math.PI*t))/2,y:Math.sin(Math.PI*t)}}ci();Eh();q6();var Rh={loader:"U",appear:"q",stage:"Fe",canvas:"Ge",label:"He"};var Tn=ct(Tt(),1),xC=28,J6={min:70,max:220},tv=3,Yl=10,kz=([e,t,a],i)=>`rgb(${String(Math.round(e*255))} ${String(Math.round(t*255))} ${String(Math.round(a*255))} / ${String(i)})`,HC=(e,t,a)=>[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a],ev=e=>Xe[e]??"#ffffff",Q6=e=>Zl[e]??[1,1,1];function Kl(e,t,a,i,r,n){let h=Math.max(2,Math.ceil((i-a)*64));e.beginPath();for(let c=0;c<=h;c+=1){let[o,l]=t(a+(i-a)*c/h);c===0?e.moveTo(o,l):e.lineTo(o,l)}e.lineWidth=r,e.globalAlpha=n,e.stroke()}function Sz(e,[t,a],i,r,n){let h=e.createRadialGradient(t,a,0,t,a,i);h.addColorStop(0,`rgb(255 255 255 / ${String(.9*n)})`),h.addColorStop(.25,kz(r,.55*n)),h.addColorStop(1,kz(r,0)),e.globalAlpha=1,e.fillStyle=h,e.fillRect(t-i,a-i,i*2,i*2)}function LC(e,t,a,i){let r=t.left+a.from*t.axisWidth,n=t.left+a.to*t.axisWidth,h=Math.min(Math.abs(n-r)/2,t.maxHeight),c=l=>{let{x:v,y:g}=Cz(a,l);return[t.left+v*t.axisWidth,t.axisY-g*h]},o=e.createLinearGradient(r,0,n,0);if(o.addColorStop(0,ev(a.fromGenre)),o.addColorStop(1,ev(a.toGenre)),e.strokeStyle=o,i.trace>0&&i.head>0&&Kl(e,c,0,i.head,1.2,.16*i.trace),i.light>0&&i.head>i.tail){for(let v=0;v<Yl;v+=1){let g=i.tail+(i.head-i.tail)*v/Yl,d=i.tail+(i.head-i.tail)*(v+1)/Yl,u=i.light*((v+1)/Yl)**1.6;Kl(e,c,g,d,9,.05*u),Kl(e,c,g,d,3.5,.2*u),Kl(e,c,g,d,1.4,.9*u)}let l=HC(Q6(a.fromGenre),Q6(a.toGenre),i.head);Sz(e,c(i.head),10,l,i.light)}i.landing>0&&Sz(e,[n,t.axisY],24,Q6(a.toGenre),i.landing)}function $6(e,t,a,i){e.clearRect(0,0,t.width,t.height),e.globalCompositeOperation="source-over",e.globalAlpha=.9;for(let r of a){let n=r.width*t.axisWidth;e.fillStyle=ev(r.genre),e.fillRect(t.left+r.start*t.axisWidth,t.axisY,n>3?n-1:n,tv)}e.globalCompositeOperation="lighter",e.lineCap="round";for(let[r,n]of i)LC(e,t,r,n);e.globalCompositeOperation="source-over",e.globalAlpha=1}function bz({label:e}){let t=(0,Dh.useRef)(null),a=(0,Dh.useRef)(null);return(0,Dh.useEffect)(()=>{let i=t.current,r=a.current,n=r==null?void 0:r.getContext("2d");if(!i||!r||!n)return;let h=yz(_2),c=Wl(_2),o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=()=>{let M=i.getBoundingClientRect(),L=r.getBoundingClientRect(),m=Math.min(window.devicePixelRatio,2);r.width=Math.round(L.width*m),r.height=Math.round(L.height*m),n.setTransform(m,0,0,m,0,0);let w=M.top-L.top;return{width:L.width,height:L.height,left:M.left-L.left,axisWidth:M.width,axisY:w+M.height-tv,maxHeight:M.height-tv-8}},g=o?Array.from({length:12},()=>[Xl(Math.random,c,0),{head:1,tail:1,light:0,trace:1,landing:0}]):[],d=l(),u=[],p=0,x=0,f=M=>{u.length===0&&u.push(...[900,450,0].map(m=>Xl(Math.random,c,M-m))),M>=p&&u.length<xC&&(u.push(Xl(Math.random,c,M)),p=M+J6.min+Math.random()*(J6.max-J6.min));let L=[];for(let m=u.length-1;m>=0;m-=1){let w=u[m],y=w&&Bz(w,M);w&&y?L.push([w,y]):u.splice(m,1)}$6(n,d,h,L),x=requestAnimationFrame(f)},s=new ResizeObserver(()=>{d=l(),o&&$6(n,d,h,g)});return s.observe(i),o?$6(n,d,h,g):x=requestAnimationFrame(f),()=>{cancelAnimationFrame(x),s.disconnect()}},[]),(0,Tn.jsxs)("div",{className:Rh.loader,children:[(0,Tn.jsx)("div",{ref:t,className:Rh.stage,children:(0,Tn.jsx)("canvas",{ref:a,className:Rh.canvas,"aria-hidden":"true"})}),(0,Tn.jsx)("p",{role:"status",className:Rh.label,children:e})]})}var ya=ct(Tt(),1);function VC({children:e}){return e((0,Jl.use)(_h.load()))}var wC=344799;function _z({children:e}){let{t,n:a}=Gt();return(0,ya.jsx)(An,{fallback:(i,r)=>(0,ya.jsxs)("div",{role:"alert",style:{padding:"var(--space-6)"},children:[(0,ya.jsx)("p",{children:i instanceof qr?t("error.datasetUnavailable"):i.message}),(0,ya.jsxs)("button",{type:"button",className:Ft.button,onClick:()=>{_h.reset(),mz(),r()},children:[(0,ya.jsx)(ym,{}),t("error.retry")]})]}),children:(0,ya.jsx)(Jl.Suspense,{fallback:(0,ya.jsx)(bz,{label:t("loading.data")(a(_2.verseCount),a(wC))}),children:(0,ya.jsx)(VC,{children:e})})})}Th();var K1=ct(u1(),1);na();Bn();ni();r0();t5();var nv=ct(u1(),1);Zr();Qr();v2();Bn();ni();e5();var K2=ct(Tt(),1),Nz=new Map;function Uz(e){let t=Nz.get(e);if(t!==void 0)return t;let a=e.toLowerCase().split("-")[0]??e,i=new Intl.DisplayNames([e],{type:"language"}).of(a)??a,r=i.charAt(0).toLocaleUpperCase(e)+i.slice(1);return Nz.set(e,r),r}function _C(e,t=[]){let a=h=>h.toLowerCase().split("-")[0]??h,i=new Map;for(let h of xl){let c=a(h.language),o=i.get(c);o?o.push(h):i.set(c,[h])}let r=a(e),n=new Set((t??[]).map(a));return[...i.entries()].map(([h,c])=>({language:h,items:c})).sort((h,c)=>{let o=l=>l===r?0:n.has(l)?1:2;return o(h.language)-o(c.language)})}function Fz({current:e,onChange:t,pending:a=!1,error:i=null,localeId:r,onLocaleChange:n}){let{t:h,locale:c}=Gt(),o=(0,nv.useId)(),l=(0,nv.useId)(),v=_C(c.tag,navigator.languages);return(0,K2.jsxs)(Dn,{label:h("menu.translation"),value:e.abbreviation,busy:a,children:[(0,K2.jsx)("div",{className:Ft.field,role:"radiogroup","aria-label":h("menu.translation"),children:v.map(({language:g,items:d})=>(0,K2.jsxs)("div",{className:Ft.group,lang:g,children:[v.length>1&&(0,K2.jsx)("p",{className:Ft.groupLabel,children:Uz(g)}),d.map(u=>(0,K2.jsxs)("label",{className:Ft.choice,children:[(0,K2.jsx)("input",{type:"radio",name:o,value:u.id,checked:u.id===e.id,"aria-label":`${u.name} (${u.abbreviation}), ${Uz(g)}`,onChange:()=>{t(u.id)}}),u.name,(0,K2.jsx)("span",{className:Ft.choiceAbbreviation,children:u.abbreviation})]},u.id))]},g))}),i!==null&&(0,K2.jsx)("p",{role:"alert",className:Ft.menuError,children:h("menu.translation.error")(i)}),P6.length>1&&(0,K2.jsxs)("label",{className:Ft.languageRow,htmlFor:l,children:[h("menu.language"),(0,K2.jsx)("select",{id:l,className:Ft.select,value:r,onChange:g=>{ri(g.target.value)&&n(g.target.value)},children:P6.map(g=>(0,K2.jsx)("option",{value:g.id,children:g.endonym},g.id))})]}),(0,K2.jsxs)("p",{className:Ft.hint,children:[h(`attribution.${e.id}`)," ",(0,K2.jsx)("a",{href:e.license.url,target:"_blank",rel:"noreferrer",children:e.license.publicDomain===!0?h("license.publicDomain"):e.license.name})]})]})}a5();Th();var h0={view:"T",title:"V",home:"W",shortName:"X",fullName:"De",error:"Ee"};Ve();na();Bn();r0();bh();Zr();function cv(e){return e===h2?"":`${e}/`}function i5(e,t){let a=e.startsWith(t)?e.slice(t.length):"",i=a.indexOf("/"),r=i===-1?a:a.slice(0,i);return r!==""&&r!==h2&&ri(r)?{locale:r,rest:i===-1?"":a.slice(i+1)}:{locale:null,rest:a}}function Jz(e,t){return i5(e,t).locale}function Qz(e){return e===h2?"manifest.webmanifest":`manifest.${e}.webmanifest`}Qr();var $z=ct(u1(),1);L6();Vl();yh();Ch();w6();var tx=wh;function ov(e){let t=Jr(tx);return t!==null&&yn(t)?t:Cn(e)}function ex(e){let[t,a]=AM(tx,Cn(e)),i=(0,$z.useCallback)(r=>{a(r)},[a]);return[yn(t)?t:Cn(e),i]}var ax="ref",ix="votes",rx="hide",nx="view";function GC(e){let t=e.get(ix),a=t==="all"?-1/0:Number(t),i=new Set((e.get(rx)??"").split(","));return{minVotes:t!==null&&Ql.includes(a)?a:Ba.minVotes,hiddenGenres:new Set($1.filter(({id:r})=>i.has(r)).map(({id:r})=>r))}}function lv(e){let t=e.endsWith("index.html")?e.slice(0,-10):e;return t===""||t.endsWith("/")?t:`${t}/`}function hx(e,t,a,i,r,n){let{locale:h,rest:c}=i5(e.pathname,t),o=e.searchParams.get(nx),l=lv(o===null?c:o),v=a.find(u=>u.path===l)??a[0],g=e.searchParams.get(ax),d=h??Lh(e.searchParams)??n;return{view:v.id,passage:g===null?null:Ez(g,i)??null,filter:GC(e.searchParams),translation:Ll(e.searchParams)??r(d),locale:d}}function r5(e){return e===Yr?Yr:null}function n5(e){return e===h2?h2:null}function Fh(e,{passage:t,filter:a,translation:i,locale:r},n,h,c=Yr,o=h2){let l=cv(r),v=new URLSearchParams,g=n!=="";if(g&&e.path!==""&&v.set(nx,e.path.replace(/\/$/,"")),t!==null&&v.set(ax,En(t,h)),i!==c&&v.set(Hl,i),l===""&&r!==o&&v.set(Hh,r),a.minVotes!==Ba.minVotes&&v.set(ix,a.minVotes===-1/0?"all":String(a.minVotes)),a.hiddenGenres.size>0){let u=$1.filter(({id:p})=>a.hiddenGenres.has(p)).map(({id:p})=>p);v.set(rx,u.join(","))}let d=v.toString().replaceAll("%2C",",");return g?`${window.location.pathname}${d===""?"":`?${d}`}`:`${n}${l}${e.path}${d===""?"":`?${d}`}`}function cx(e,t,a){if(!e.pathname.startsWith(t))return null;let{locale:i,rest:r}=i5(e.pathname,t);if(i!==null)return null;let n=lv(r);if(!a.some(v=>v.path===n))return null;let h=Lh(e.searchParams),c=h===null?"":cv(h);if(c==="")return null;let o=new URLSearchParams(e.searchParams);o.delete(Hh);let l=o.toString().replaceAll("%2C",",");return`${t}${c}${n}${l===""?"":`?${l}`}${e.hash}`}var ox=ct(Tt(),1);function Wh({onFollow:e,...t}){return(0,ox.jsx)("a",{...t,onClick:a=>{let i=a.metaKey||a.ctrlKey||a.shiftKey||a.altKey;a.defaultPrevented||a.button!==0||i||(a.preventDefault(),e())}})}var tr=ct(u1(),1);function lx(e,t,a,i){let r=(0,tr.useCallback)(()=>hx(new URL(window.location.href),"./",e,t,a,i),[e,t,a,i]),[n,h]=(0,tr.useState)(r);(0,tr.useEffect)(()=>{let o=cx(new URL(window.location.href),"./",e);o!==null&&window.history.replaceState(null,"",o)},[]),(0,tr.useEffect)(()=>{let o=()=>{h(r())};return window.addEventListener("popstate",o),()=>{window.removeEventListener("popstate",o)}},[r]);let c=(0,tr.useCallback)((o,{replace:l=!1}={})=>{h(o);let v=e.find(d=>d.id===o.view)??e[0],g=Fh(v,o,"./",t,r5(a(i)),n5(i));g!==`${window.location.pathname}${window.location.search}`&&window.history.replaceState(null,"",g)},[e,t,a,i]);return[n,c]}ni();v2();var c0=ct(Tt(),1);function dx({views:e,current:t,hrefOf:a,onOpen:i}){let{t:r}=Gt();return(0,c0.jsx)("nav",{"aria-label":r("view.switch"),className:Ft.segmented,children:e.map(n=>(0,c0.jsxs)(Wh,{href:a(n),className:Ft.button,"aria-label":r(n.titleKey),"aria-current":n.id===t?"page":void 0,onFollow:()=>{i(n)},children:[(0,c0.jsx)(n.icon,{}),(0,c0.jsx)("span",{className:Ft.longLabel,children:r(n.titleKey)}),(0,c0.jsx)("span",{className:Ft.shortLabel,children:r(n.shortTitleKey)})]},n.id))})}Lr();bh();Qr();v2();var cV=ct(u1(),1);L2();var hO=Promise.resolve().then(()=>(hV(),nV)),oV={id:"arcs",titleKey:"view.arcs",shortTitleKey:"view.arcs.short",icon:xm,openLabelKey:"view.arcs.open",Component:(0,cV.lazy)(async()=>({default:(await hO).ArcsExplorer}))};var wV=ct(u1(),1);L2();var zO=Promise.resolve().then(()=>(VV(),LV)),yV={id:"threads",titleKey:"view.threads",shortTitleKey:"view.threads.short",icon:Bl,openLabelKey:"view.threads.open",Component:(0,wV.lazy)(async()=>({default:(await zO).ThreadsExplorer}))};var C0=[{...oV,path:""},{...yV,path:"threads/"}];L2();na();function BV(e){window.parent!==window&&window.parent.postMessage(e,"*")}function CV(){BV({type:"qb-map-close"})}function kV(e,t,a){BV({type:"qb-map-read",ref:En(e,t),translation:a})}var Y1=ct(Tt(),1),[Ec]=C0;function SV({core:e}){let{t,books:a}=Gt(),[,i]=Dl(),r=Fm(),{versification:n}=e,[h,c]=ex(r),[o,l]=lx(C0,n,ov,r),v=o.locale,{passage:g,filter:d}=o,u=(0,K1.use)(Ah(o.translation).load()),p=(0,K1.useMemo)(()=>({...e,translation:u}),[e,u]),[x,f]=(0,K1.useTransition)(),s=(0,K1.useRef)(o);(0,K1.useEffect)(()=>{s.current=o},[o]);let M=(0,K1.useRef)(o.translation),[L,m]=(0,K1.useState)(null),[w,y]=(0,K1.useOptimistic)(o.translation),[C,H]=(0,K1.useState)(0),B=(0,K1.useRef)(null),S=C0.find(j=>j.id===o.view)??Ec,E=[g&&li(g,n,a),S===Ec?null:t(S.titleKey),t("app.name")].filter(j=>j!==null).join(" · ");(0,K1.useEffect)(()=>{document.title=E},[E]),(0,K1.useLayoutEffect)(()=>{var j;document.documentElement.lang=_n(v).tag,Sh(v),(j=document.querySelector('link[rel="manifest"]'))==null||j.setAttribute("href",`./${Qz(v)}`)},[v]);let O=(0,K1.useCallback)(j=>{i(j);let W=ov(j);l({...s.current,locale:j,translation:W}),b0(W)},[i,l]);(0,K1.useEffect)(()=>{var W;let j=B.current;j!==null&&(B.current=null,(W=document.querySelector(`[data-view="${o.view}"] ${j}`))==null||W.focus())},[o.view,C]);let R=r5(h),b=n5(r),I=(j,W)=>Fh(j,{passage:W,filter:d,translation:o.translation,locale:v},"./",n,R,b),q=(0,Y1.jsx)(Fz,{current:xh(w),pending:x,error:L,localeId:v,onLocaleChange:O,onChange:j=>{m(null),M.current=j,f(async()=>{y(j);try{await Ah(j).load()}catch{Mz(j),m(t("menu.translation.failed")(xh(j).name));return}M.current===j&&(c(j),l({...s.current,translation:j},{replace:!0}))})}}),X=(0,Y1.jsxs)(Y1.Fragment,{children:[(0,Y1.jsx)("button",{type:"button",className:Ft.button,"aria-label":t("qb.back"),title:t("qb.back"),onClick:CV,children:(0,Y1.jsx)(Hm,{})}),(0,Y1.jsx)("h1",{className:h0.title,children:(0,Y1.jsxs)(Wh,{href:I(Ec,null),className:h0.home,onFollow:()=>{B.current="h1 a",l({view:Ec.id,passage:null,filter:Ba,translation:o.translation,locale:v}),H(j=>j+1)},children:[(0,Y1.jsx)("span",{className:h0.fullName,children:t("app.name")}),(0,Y1.jsx)("span",{className:h0.shortName,children:t("app.name.short")})]})}),(0,Y1.jsx)(dx,{views:C0,current:o.view,hrefOf:j=>I(j,g),onOpen:j=>{B.current='[aria-current="page"]',l({...o,view:j.id,passage:g})}})]});return C0.map(j=>{let W=j===S;return(0,Y1.jsx)("div",{className:h0.view,"data-view":j.id,"data-active":W,inert:!W,children:(0,Y1.jsx)(An,{fallback:K=>(0,Y1.jsx)(In,{masthead:X,credits:(0,Y1.jsx)(Rn,{translation:u.manifest}),children:(0,Y1.jsx)("p",{role:"alert",className:h0.error,children:t("error.viewFailed")(t(j.titleKey),K.message)})}),children:(0,Y1.jsx)(j.Component,{data:p,active:W,passage:g,onNavigate:K=>{l({...o,view:j.id,passage:K})},filter:d,onFilterChange:K=>{l({...o,filter:K},{replace:!0})},masthead:X,translationMenu:q,shareUrl:K=>new URL(Fh(Ec,{passage:K,filter:Ba,translation:o.translation,locale:v},"",n,null),"https://trekhleb.dev/bible-cross-references/").href,passageLinks:K=>[(0,Y1.jsxs)("button",{type:"button",className:Ft.button,onClick:()=>{kV(K,n,o.translation)},children:[(0,Y1.jsx)(Lm,{}),t("qb.read")]},"qb-read"),...C0.filter(et=>et!==j).map(et=>(0,Y1.jsxs)(Wh,{href:I(et,K),className:Ft.button,onFollow:()=>{l({...o,view:et.id,passage:K})},children:[(0,Y1.jsx)(et.icon,{}),t(et.openLabelKey)]},et.id))]})})},`${j.id}:${String(C)}`)})}bh();Qr();Vl();yh();Ch();var i8=ct(Tt(),1),bV=new URL(window.location.href),{locale:_V,translation:AV}=CM(bV.searchParams,{locale:Jr(Vh),translation:Jr(wh)},navigator.languages,Jz(bV.pathname,"./"));Sh(_V);G6(Wm(navigator.languages));document.documentElement.lang=_n(_V).tag;var TV=Ah(AV).load();TV.catch(()=>{});sM((0,i8.jsx)(_z,{children:e=>(0,i8.jsx)(SV,{core:e})}));Promise.allSettled([_h.load(),TV]).then(([e,t])=>{e.status!=="rejected"&&(t.status==="fulfilled"&&b0(AV),void 0)},()=>{});})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
