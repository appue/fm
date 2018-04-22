'use strict';
// 路由
Fm.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	/**
	 * 登录
	 * @method login
	 */
	.state('fm.login', {
		url: 'login.htm',
		views: {
			'': {
				templateUrl: 'views/login.html',
				controller: 'cLogin'
			}
		}
	})
	;
	$urlRouterProvider.otherwise('login.htm');
});
