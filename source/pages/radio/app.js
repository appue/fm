'use strict';
// 路由
Fm.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	/**
	 * 首页
	 * @method index
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
	 * 播放页面
	 * @method path
	 */
	.state('fm.play', {
		url: 'play.htm',
		views: {
			'': {
				templateUrl: 'views/play.html',
				controller: 'cPlay'
			}
		}
	})
	/**
	 * 留言
	 * @method forum
	 */
	.state('fm.forum', {
		url: 'forum.htm',
		views: {
			'': {
				templateUrl: 'views/forum.html',
				controller: 'cForum'
			}
		}
	})
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
	$urlRouterProvider.otherwise('index.htm');
});
