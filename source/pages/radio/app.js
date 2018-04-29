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
	 * 节目
	 * @method program
	 */
	.state('fm.program', {
		url: 'program.htm',
		views: {
			'': {
				templateUrl: 'views/program.html',
				controller: 'cProgram'
			}
		}
	})
	/**
	 * 播放页面
	 * @method path
	 * @param {[string]} pid 节目ID
	 */
	.state('fm.play', {
		url: 'play.htm?pid',
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
	/**
	 * 评论
	 * @method comment
	 */
	.state('fm.comment', {
		url: 'comment.htm?pid',
		views: {
			'': {
				templateUrl: 'views/comment.html',
				controller: 'cComment'
			}
		}
	})
	;
	$urlRouterProvider.otherwise('index.htm');
});
