exports.ids=[8],exports.modules={94:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e,t){return{isLoggedIn:null!=(0,d.getUser)(e),currentURL:t.location.pathname}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=n(1),l=r(p),a=n(7),f=n(15),d=n(16),y=function(e){function t(){return o(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.isLoggedIn,n=e.dispatch,r=e.currentURL;t||(n((0,f.setRedirectUrl)(r)),this.context.router.push("/login"))}},{key:"render",value:function(){return this.props.isLoggedIn?this.props.children:null}}]),t}(l["default"].Component);y.contextTypes={router:l["default"].PropTypes.object.isRequired},t["default"]=(0,a.connect)(c)(y)}};