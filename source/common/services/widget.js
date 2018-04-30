'use strict';
/**
 * 系统组件
 * @module services
 * @class $appueWidget
 */
Fm.factory('$appueWidget', function (
	$http,
	$state,
	$compile,
	$timeout,
	$rootScope,
	$appueStorage
) {
	var toastTimer = null;
	return {
		/**
 		 * 显示提示信息
 		 * @method msgToast
 		 * @param {[string]} msg  提示的文本信息
 		 * @param {[number]} time (可选)弹框多长实际关闭，毫秒（默认1000）
 		 * @example
 		 *     $appueWidget.msgToast('msg', 2000);
 		 */
 		msgToast: function (msg, time) {
 			var toastDom = angular.element(document.querySelector('.mod_toast'));

 			if (!toastDom.length) {
 				var toastTpl = $compile('<div class="mod_toast" ng-click="notification=null" ng-show="notification"><span>{{notification}}</span></div>');
 				angular.element(document.getElementsByTagName('body')[0]).append(toastTpl($rootScope));
 			}

 			$timeout(function() {
 				$rootScope.notification = msg;
 			}, 0);

 			$timeout.cancel(toastTimer);

 			angular.element(document.querySelector('.toast')).on('touchstart touchmove touchend', function (e) {
 				e.stopPropagation();
 				e.preventDefault();
 			});

 			toastTimer = $timeout(function() {
 				$rootScope.notification = '';
 			}, time || 1000);
 		},

		/**
		 * 显示确认提示框
		 * @method popConfirm
		 * @param {[scope]}    scope      $scope
		 * @param {[string]}   content    显示的信息
		 * @param {[string]}   submitText 确认按钮的文本，默认确认
		 * @param {[function]} cancel     取消按钮回调，可以不填
		 * @param {[function]} submit     确认按钮回调
		 * @example
		 *     $appueWidget.popConfirm({
		 *         scope: $scope,
		 *         content: '输入的内容',
		 *         submitText: '确认',
		 *         cancel: function () {},
		 *         submit: function () {}
		 *     });
		 */
		popConfirm: function (params) {
			var $scope = params.scope,
				dom = angular.element(document.querySelector('.mod_confirm'));

			$scope['popConfirm'] = {
				style  : {},
				show   : true,
				content: params.content || '',
				submitText: params.submitText || '确定',
				cancel : function () {
					$scope.popConfirm.show = false;
					$('.mod_confirm').remove();
					if (params.cancel) params.cancel();
				},
				submit : function () {
					$scope.popConfirm.show = false;
					$('.mod_confirm').remove();
					if (params.submit) params.submit();
				}
			};

			if (params.style) $scope.popConfirm.style = params.style;

			if (!dom.length) {
				var toastTpl = $compile('<div ng-show="popConfirm.show" class="mod_confirm">'+
					'	<div class="iconfirm">'+
					'       <div class="iconfirmcontent" ng-style="popConfirm.style" ng-bind-html="popConfirm.content | tohtml"></div>'+
					'		<div class="iconfirmbtn">'+
					'           <button ng-click="popConfirm.cancel()">取消</button>'+
					'           <button ng-click="popConfirm.submit()">{{popConfirm.submitText}}</button>'+
					'       </div>'+
					'   </div>'+
					'</div>');
				angular.element(document.getElementsByTagName('body')[0]).append(toastTpl($scope));
			}

			angular.element(document.querySelector('.mod_confirm')).on('touchstart touchmove touchend', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
		},

		/**
		 * ajax 请求封装
		 * @method ajaxRequest
		 * @param {object} params 输入参数
		 *     @param {[boolean]}  parmas.debug     是否本地调试
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

			if ($rootScope.isLoading) return;

			if (params.debug) {
				var _json = '../../../debug/'+ params.url +'.json?v='+ new Date().getTime();

				$http.get(_json).success(function (res) {
					params.success(res);
				});
				return;
			}

			var $scope = params.scope || '',
				opts = {
					auth: false, //-----------是否需要登录
					isPage: false, //----------是否分页
					isLoading: true, //-----------显示loading动画
					data: {},
					success  : function () {} //--成功回调
					// error: function () {}, //-----ajax请求遇到错误中断回调(可选)
					// failure: function () {}, //---数据不符合要求的失败回调(可选)
				};

			for (var i in params) opts[i] = params[i];

			if (opts.auth) {
				var auth = $appueStorage.pull($rootScope.setConfig.app);

				if (auth) {
					opts.data.auth = auth;
				} else {
					$rootScope.$broadcast('view:showLogin', {show: true});
					return;
				}
			}

			if (opts.admin) {
				var auth = $appueStorage.pull($rootScope.setConfig.pc);

				if (auth) {
					opts.data.auth = auth;
				} else {
					$state.go('fm.login');
					return;
				}
			}

			var ajaxConfig = {
				headers: {
					'Content-Type' : 'application/json;charset=UTF-8'
				},
				method : params.method || 'POST',
				url    : 'http://127.0.0.1:9091/api/'+ params.url,
				// params: params.params || {},
				data   : {},
				timeout: 30000
			};

			if (opts.params) ajaxConfig.params = opts.params || {};
			if (opts.data) ajaxConfig.data     = opts.data || {};

			$rootScope.isLoading = true;

			$http(ajaxConfig).success(function (res) {
				$rootScope.isLoading = false;
				if (!res.code) {
					self.msgToast(res.message || '网络错误，请稍后重试');
					return;
				}
				if (res.code == 1) {
					if (opts.success) opts.success(res);
				} else {
					if (res.code == 2) {
						if (opts.admin) {
							$appueStorage.remove($rootScope.setConfig.pc);
						} else {
							$appueStorage.remove($rootScope.setConfig.app);
							$rootScope.$broadcast('view:showLogin', {show: true});
						}
						return;
					} else {
						if (opts.failure) {
							opts.failure(res);
							return;
						} else {
							self.msgToast(res.message || '网络错误，请稍后重试！');
						}
					}
				}
			}).error(function (res) {
				$rootScope.isLoading = false;
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
