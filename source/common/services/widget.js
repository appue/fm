'use strict';
/**
 * 系统组件
 * @module services
 * @class $appueWidget
 */
Fm.factory('$appueWidget', function (
	$q,
	$http,
	$state,
	$window,
	$compile,
	$timeout,
	$location,
	$rootScope,
	$appueCookie,
	$appueStorage
) {
	var toastTimer  = null,
		promptTimer = null;

	return {
		/**
		 * 提示信息
		 * @method msgPrompt
		 * @param {string} msg  提示的消息
		 * @param {number} time (可选)弹框多长实际关闭，毫秒
		 */
		msgPrompt: function (msg, time) {
			var $that = angular.element(document.querySelector('.js_prompt'));

			if (!$that.length) {
				var tpl = $compile('<div class="js_prompt mod_prompt" ng-if="msgSetting.promptShow"><p>{{msgSetting.prompt}}</p></div>');
				angular.element(document.getElementsByTagName('body')[0]).append(tpl($rootScope));
			}

			$timeout(function() {
				$rootScope.msgSetting.prompt     = msg;
				$rootScope.msgSetting.promptShow = true;
			}, 0);

			$timeout.cancel(promptTimer);

			angular.element(document.querySelector('.js_prompt')).on('click touchstart touchmove touchend', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});

			promptTimer = $timeout(function() {
				$rootScope.msgSetting.promptShow = false;
			}, time || 3000);
		},

		/**
		 * 提示信息
		 * @method msgToast
		 * @param {string} msg  需要弹出的提示信息
		 * @param {number} time (可选)弹框多长实际关闭，毫秒
		 * @example
		 *     $appueWidget.msgToast('提示信息', 1000);
		 */
		msgToast: function (msg, time) {
			var $that = angular.element(document.querySelector('.js_appue_toast'));

			if (!$that.length) {
				var tpl = $compile('<div class="js_appue_toast toast" ng-show="msgSetting.toast"><span>{{msgSetting.toast}}</span></div>');
				angular.element(document.getElementsByTagName('body')[0]).append(tpl($rootScope));
			}

			$timeout(function() {
				$rootScope.msgSetting.toast = msg;
			}, 0);

			$timeout.cancel(toastTimer);

			angular.element(document.querySelector('.js_appue_toast')).on('click touchstart touchmove touchend', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});

			toastTimer = $timeout(function() {
				$rootScope.msgSetting.toast = '';
			}, time || 1000);
		},

		/**
		 * 确认提示框
		 * @method msgConfirm
		 * @param {object} params 输入参数
		 *     @param {[scope]}    params.scope   scope作用域
		 *     @param {[string]}   params.content 提示的文字信息
		 *     @param {[string]}   submitText     是，继续
		 *     @param {[string]}   cancelText     否，我点错了
		 *     @param {[function]} params.cancel  关闭按钮回调函数（可选）
		 *     @param {[function]} params.submit  提交按钮回调函数（可选）
		 * @example
		 *     $appueWidget.msgConfirm({
		 *         scope: $scope,
		 *         content: '提示的文字',
		 *         submitText: '是，继续',
		 *         cancelText: '否，我点错了',
		 *         cancel: function () {
		 *             console.log('关闭按钮回调函数（可选）');
		 *         },
		 *         submit: function () {
		 *             console.log('提交按钮回调函数（可选）');
		 *         }
		 *     });
		 */
		msgConfirm: function (params) {
			var confirm = angular.element(document.querySelector('.js_appue_confirm')),
				$scope  = params.scope,
				$opts   = {
					submitText: '是，继续',
					cancelText: '否，我点错了'
				};

			angular.extend($opts, params);

			if (!confirm.length) {
				var tpl = $compile('<section class="js_appue_confirm mod_confirm" ng-show="confirm.show">'+
					'	<div>'+
					'		<h2>提醒</h2>'+
					'		<article ng-bind-html="confirm.content | tohtml"></article>'+
					'		<div>'+
					'			<button ng-click="confirm.submit()" class="js_confirm_submit btn_gray">'+ $opts.submitText +'</button>'+
					'			<button ng-click="confirm.cancel()" class="js_confirm_cancel btn_green">'+ $opts.cancelText +'</button>'+
					'		</div>'+
					'	</div>'+
					'</section>');

				angular.element(document.getElementsByTagName('body')[0]).append(tpl($rootScope));
			} else {
				$('.js_confirm_submit').text($opts.submitText);
				$('.js_confirm_cancel').text($opts.cancelText);
			}

			$timeout(function() {
				$rootScope.confirm = {
					show: true,
					content: $opts.content,
					cancel: function () {
						if ($opts.cancel && typeof $opts.cancel == 'function') $opts.cancel();
						$rootScope.confirm.show = false;
					},
					submit: function () {
						if ($opts.submit && typeof $opts.submit == 'function') $opts.submit();
						$rootScope.confirm.show = false;
					}
				};
			}, 0);

			angular.element(document.querySelector('.js_appue_confirm')).on('click touchstart touchmove touchend', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
		},

		/**
		 * 确认弹框
		 * @method msgAlert
		 * @param {[object]} params 数据对象
		 *     @param {[scope]}    params.scope   scope
		 *     @param {[string]}   params.content 提示信息
		 *     @param {[function]} params.cancel  确认按钮回调
		 * @example
		 *     $appueWidget.msgAlert({
		 *         scope: $scope,
		 *         content: '提示文本',
		 *         cancle: function () {
		 *             console.log('确认按钮回调');
		 *         }
		 *     });
		 */
		msgAlert: function (params) {
			var $that  = angular.element(document.querySelector('.js_appue_alert')),
				$scope = params.scope;

			if (!$that.length) {
				var tpl = $compile('<section class="js_appue_alert mod_alert" ng-show="alert.show">'+
					'	<div>'+
					'		<h2>提醒</h2>'+
					'		<article ng-bind-html="alert.content | tohtml"></article>'+
					'		<div>'+
					'			<button ng-click="alert.cancel()" class="btn_green">确定</button>'+
					'		</div>'+
					'	</div>'+
					'</section>');

				angular.element(document.getElementsByTagName('body')[0]).append(tpl($rootScope));
			}

			$timeout(function() {
				$rootScope.alert = {
					show: true,
					content: params.content,
					cancel: function () {
						if (params.cancel && typeof params.cancel == 'function') params.cancel();
						$rootScope.alert.show = false;
					}
				};
			}, 0);

			angular.element(document.querySelector('.js_appue_alert')).on('click touchstart touchmove touchend', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
		},

		showUpLoading: function () {
			var $that = angular.element(document.querySelector('.js_uploading'));

			if (!$that.length) {
				var tpl = $compile('<section class="js_uploading uploading" ng-show="upLoading"><div><p>{{loadingPercent}} 数据上传中，请稍候.....</p><p></p><p style="width:{{loadingPercent}}"></p></div></section>');
				angular.element(document.getElementsByTagName('body')[0]).append(tpl($rootScope));
			}

			$timeout(function() {
				$rootScope.upLoading = true;
			}, 0);

			angular.element(document.querySelector('.js_uploading')).on('click touchstart touchmove touchend', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
		},

		hideUpLoading: function () {
			$rootScope.$apply(function () {
				$rootScope.loadingPercent = 0;
				$rootScope.upLoading      = false;
			});
		},

		/**
		 * 获取URL中的参数
		 * @method getParam
		 * @param {string} name 获取参数的名称
		 * @example
		 *     $appueWidget.getParam('pid');
		 */
		getParam: function(name) {
			return $location.$$search[name];
		},

		/**
		 * ajax 请求封装
		 * @method ajaxRequest
		 * @param {object} params 输入参数
		 *     @param {[string]}   params.method    请求类型（默认:POST）GET|POST
		 *     @param {[object]}   params.data      POST请求发送的数据
		 *     @param {[object]}   params.params    GET请求发送的数据
		 *     @param {[boolean]}  params.isPhp     调用PHP接口，如果是管理后台默认为false，如果是节目组后台默认为true
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
		 *         isPhp: true,
		 *         url: 'h5/test.php',
		 *         data: {
		 *             pid: 10144
		 *         },
		 *         success: function (res) {
		 *             console.log('成功函数回调')
		 *         }
		 *     });
		 */
		ajaxRequest: function (params) {
			var self = this;

			if (!params || !params.url) return;

			var $scope = params.scope || '',
				options = {
					isLogin  : true, //-----------是否需要登录
					isPage   : false, //----------是否分页
					isLoading: true, //-----------显示loading动画
					success  : function () {} //--成功回调
					// error: function () {}, //-----ajax请求遇到错误中断回调(可选)
					// failure: function () {}, //---数据不符合要求的失败回调(可选)
				};

			for (var i in params) options[i] = params[i];

			if (options.isLogin) {
	            self.getAuth();
	        }

			if (options.isPage && $scope.tPage.isLoading) return;
			if (options.isPage) $scope.tPage.isLoading = false;
			if (options.isLoading) $rootScope.isLoading = true;

			var apiSocket = $rootScope.apiSocket,
				apiAuth;

			var ajaxConfig = {
				headers: {
					'Content-Type' : 'application/json;charset=UTF-8',
					'Authorization': apiAuth
				},
				// withCredentials: true,
				method : params.method || 'POST',
				url    : /^http/gi.test(params.url) ? params.url : apiSocket + params.url,
				// params: params.params || {},
				data   : {},
				timeout: 30000
			};

			// if (options.cookies) ajaxConfig.withCredentials = true;
			if (options.params) ajaxConfig.params = options.params || {};
			if (options.data) ajaxConfig.data     = options.data || {};

			if (options.isPage) {
				if (ajaxConfig.data) {
					angular.extend(ajaxConfig.data, {
						page  : $scope.tPage.pageIndex,
						count : $scope.tPage.pageSize
					});
				}

				if (ajaxConfig.params) {
					angular.extend(ajaxConfig.params, {
						page  : $scope.tPage.pageIndex,
						count : $scope.tPage.pageSize
					});
				}

				$scope.$broadcast('changePageIndex', $scope.tPage.pageIndex);
			}

			$http(ajaxConfig).success(function (res) {
				$rootScope.isLoading = false;
				if (!parseInt(res.code, 0)) {
					options.success(res);
				} else {
					// 登录失败
					var code = parseInt(res.code, 0);

					if (code==2 || code==9 || code==10 || code==11 || code==12 || code==13 || code==27 || code==1005) {
						if (options.isLogin) {
							self.msgConfirm({
							    scope: $scope,
							    content: res.message ? res.message +',是否退出重新登录?' : '是否退出重新登录',
							    cancelText: '取消登录，继续保持',
							    submitText: '重新登录',
							    submit: function () {
							    	self.toLogin();
							    }
							});
							return;
						}
					}

					if (options.failure && typeof options.failure == 'function') {
						options.failure(res);
					} else {
						self.msgToast(res.message || '网络错误，请稍后再试！');
					}
				}
			}).error(function (res) {
				$rootScope.isLoading = false;

				if (options.error && typeof options.error == 'function') {
					options.error();
				} else {
					self.msgToast('网络错误，请稍后再试！');
				}
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
