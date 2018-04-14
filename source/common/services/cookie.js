'use strict';
Fm
/**
 * cookies处理
 * @module services
 * @class $appueCookie
 */
.factory('$appueCookie', function (
) {
	return {
		/**
		 * 设置cookies
		 * @method setCookie
		 * @param {[string]} name cookies名称
		 * @param {[string|object]} value 值
		 * @param {[number]} Days 过期天数，默认1天
		 * @example
		 *     $appueCookie.setCookie();
		 */
		setCookie: function (name, value, Days) {
			if (Days == null || Days == '') {
			    Days = 1;
			}
			var exp  = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = name + "="+ window.escape(value) + "; path=/;expires=" + exp.toGMTString();
		},

		/**
		 * 读取cookies
		 * @method getCookie
		 * @param {[string]} name cookies名称
		 * @example
		 *     $appueCookies.getCookie();
		 */
		getCookie: function (name) {
		    var arr,
		    	reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");

		    arr = document.cookie.match(reg);

		    if (arr) {
		    	// console.log(window.unescape(arr[2]));
		        return window.unescape(arr[2]);
		    } else {
		        return null;
		    }
		},

		/**
		 * 删除cookies
		 * @method delCookie
		 * @param {[string]} name cookies名称
		 * @example
		 *     $appueCookies.delCookie();
		 */
		delCookie: function (name) {
			var self = this,
				exp = new Date();

	    	exp.setTime(exp.getTime() - 1);

	    	var cval = self.getCookie(name);

	    	if (cval != null) {
	        	document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
	        }
	    }
	};
});
