'use strict';
/**
 * 系统组件
 * @module services
 * @class $appueWidget
 */
Fm.factory('$appueWidget', function (
	$http
) {
	return {

		/**
		 * ajax 请求封装
		 * @method ajaxRequest
		 * @param {object} params 输入参数
		 *     @param {[string]}   params.method    请求类型（默认:POST）GET|POST
		 *     @param {[object]}   params.data      POST请求发送的数据
		 *     @param {[object]}   params.params    GET请求发送的数据
		 *     @param {[boolean]}  params.isLoading 是否需要loading（默认:true）
		 *     @param {[boolean]}  params.isPage    是否需要分页
		 *     @param {[boolean]}  params.isLogin   是否需要登录（默认:true）
		 *     @param {[boolean]}  params.isDebug   是否测试，测试就是直接取JSON数据
		 *	   @param {[scope]}    params.scope     scope作用域(必填)
		 *	   @param {[string]}   params.url       接口地址（不带http是相对系统配置路径）
		 *     @param {[function]} params.success   成功函数回调
		 *     @param {[function]} params.error     错误函数回调（可选）
		 *     @param {[function]} params.failure   失败函数回调（可选）
		 * @example
		 *     $appueWidget.ajaxRequest({
		 *         scope: $scope,
		 *         url: 'h5/test.php',
		 *         data: {},
		 *         success: function (res) {
		 *             console.log('成功函数回调')
		 *         }
		 *     });
		 */
		ajaxRequest: function (params) {
			var self = this;

			if (!params || !params.url) return;

			var $scope = params.scope || '',
				opts = {
					isLogin  : true, //-----------是否需要登录
					isPage   : false, //----------是否分页
					isLoading: true, //-----------显示loading动画
					success  : function () {} //--成功回调
					// error: function () {}, //-----ajax请求遇到错误中断回调(可选)
					// failure: function () {}, //---数据不符合要求的失败回调(可选)
				};

			for (var i in params) opts[i] = params[i];

			var ajaxConfig = {
				headers: {
					'Content-Type' : 'application/json;charset=UTF-8'
				},
				method : params.method || 'GET',
				url    : 'http://127.0.0.1:9091/api/'+ params.url,
				// params: params.params || {},
				data   : {},
				timeout: 30000
			};

			if (opts.params) ajaxConfig.params = opts.params || {};
			if (opts.data) ajaxConfig.data     = opts.data || {};

			$http(ajaxConfig).success(function (res) {
				if (opts.success) opts.success(res);
			}).error(function (res) {
				if (opts.error) opts.error();
			});
		},

		/**
		 * 获取字节数
		 * @method byteLen
		 * @param {[string]} str 输入的字符串
		 * @example
		 *     $appueWidget.byteLen(str);
		 *     str: 需要计算的字符串
		 *     其实这里也有一个过滤器可以用：get_length，达到同样的作用
		 *     $filter('get_length')(str);
		 */
        byteLen: function (str) {
            if (!str) return 0;

            var byteLen = 0,
                len = str.length;

            for (var i=0; i<len; i++){
                if (str.charCodeAt(i) > 255) {
                    byteLen += 2;
                } else{
                    byteLen ++;
                }
            }

            return byteLen;
        }
	};
});
