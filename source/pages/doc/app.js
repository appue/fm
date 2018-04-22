'use strict';
// 路由
Fm.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	/**
	 * 后台模块设计
	 * @method design
	 */
	.state('fm.design', {
		url: 'design.htm',
		views: {
			'': {
				templateUrl: 'views/design.html',
				controller: 'cDesign'
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
