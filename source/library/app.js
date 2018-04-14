'use strict';

var Fm = angular.module('fm', [
	'ui.router',
	'ngTouch',
	'ngAnimate',
	'DelegateEvents'
]);

Fm.run(function (
	$location,
	$rootScope
) {
	FastClick.attach(document.body);

	var ua = navigator.userAgent.toLowerCase(),
		$protocol = window.location.protocol;

	$rootScope.isWechat  = (/micromessenger/.test(ua)) ? true : false;
	$rootScope.isApple   = (/iphone|ipad|ipod/.test(ua)) ? true : false;
	$rootScope.isAndroid = (/android/.test(ua)) ? true : false;

	// 信息配置
	$rootScope.setConfig = {
		// 用户登录信息
		user: {
			auth: '', // 用户auth
			uid: '', // 用户ID
			name: '' // 用户名称
		}
	};
	// $rootScope.screenWidth  = document.documentElement.clientWidth;
	// $rootScope.screenHeight = document.documentElement.clientHeight;
})
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	.state('fm', {
		abstract: true,
		url: '/',
        views: {
        	'body': {
        		templateUrl: '../../main/main.html',
        		controller: 'cMain'
        	}
        },
		// resolve: {
		// 	den: function (appready) {
		// 		return appready.den();
		// 	}
		// },
        onEnter: function ($rootScope) {
			$rootScope.isContentLoaded = true;
        }
	});
});
