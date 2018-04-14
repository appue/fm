'use strict';
// 路由
Fm.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	/**
	 * 首页
	 * @method index
	 * @param {[number]} pid 节目ID
	 */
	.state('fm.index', {
		url: 'index.htm',
		views: {
			'': {
				templateUrl: 'views/index.html',
				controller: 'cIndex'
			}
		}
	})
	/**
	 * 架构目录说明
	 * @method path
	 */
	.state('fm.path', {
		url: 'path.htm',
		views: {
			'': {
				templateUrl: 'views/path.html',
				controller: 'cPath'
			}
		}
	})
	;
	$urlRouterProvider.otherwise('index.htm');
});
