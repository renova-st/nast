!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("nast/Lib"),require("lodash/isString")):"function"==typeof define&&define.amd?define(["nast/Lib","lodash/isString"],e):"object"==typeof exports?exports["nast-auth"]=e(require("nast/Lib"),require("lodash/isString")):t["nast-auth"]=e(t["nast/Lib"],t["lodash/isString"])}(self,(function(t,e){return function(){"use strict";var o={946:function(t){t.exports=e},441:function(e){e.exports=t}},r={};function n(t){var e=r[t];if(void 0!==e)return e.exports;var s=r[t]={exports:{}};return o[t](s,s.exports,n),s.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};return function(){n.r(s),n.d(s,{default:function(){return i}});var t=n(441),e=n.n(t),o=n(946),r=n.n(o);class i extends(e()){static _defaultConfig={loginRoute:"login",authRoute:"index",apiAuth:t=>{}};_store;_router;constructor(t,e,o={}){super(o),this._store=t,this._router=e}init(){const t=JSON.parse(localStorage.getItem("auth")),e=t?.token,o=t?.user;e&&o&&this._store.commit("auth/login",{user:o,token:e}),this.loggedIn()&&this.apiLogin()}login(t,e){this._store.commit("auth/login",{user:t,token:e}),this.apiLogin()}loggedIn(){return Boolean(this._store.getters["auth/token"])}logout(){this._store.commit("auth/logout"),this.needAuth()}user(t){return t&&this._store.commit("auth/setUser",t),this._store.getters["auth/user"]}needAuth(t=!0){let e=this._config(t?"loginRoute":"authRoute");r()(e)&&(e={name:e}),(t&&!this.loggedIn()||!t&&this.loggedIn())&&this._router.push(e)}apiLogin(){this._config("apiAuth")(this._store.getters["auth/token"])}static store(t={}){return{namespaced:!0,state:{user:{},token:"",_save:["user","token"]},getters:{user:t=>t.user,token:t=>t.token},mutations:{login(t,{user:e,token:o}){t.user=e,t.token=o,localStorage.setItem("auth",JSON.stringify({user:e,token:o}))},logout(t){t.user=null,t.token="",localStorage.removeItem("auth")},setUser(t,e){t.user=e,localStorage.setItem("auth",JSON.stringify({user:e,token:t.token}))}}}}}}(),s}()}));