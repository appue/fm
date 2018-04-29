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

	$rootScope.setConfig = {
		app: 'lvt_i98wety398',
		pc: 'mga_va34etd3e8',
		member: '/themes/img/face/',
		program: '/themes/img/program/',
		audio: {
			media: '',
			state: false
		}
	};
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
        onEnter: function ($rootScope) {
			$rootScope.isContentLoaded = true;
        }
	});
});
