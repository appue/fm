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
				templateUrl: 'view/index.html',
				controller: 'cIndex'
			}
    	}
	})
	;
	$urlRouterProvider.otherwise('index.htm');
});
