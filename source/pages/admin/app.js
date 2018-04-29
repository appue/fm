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
	 * 节目管理
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
	 * 评论管理
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
	/**
	 * 用户管理
	 * @method member
	 */
	.state('fm.member', {
		url: 'member.htm',
		views: {
			'': {
				templateUrl: 'views/member.html',
				controller: 'cMember'
			}
		}
	})
	/**
	 * 主持人管理
	 * @method compere
	 */
	.state('fm.compere', {
		url: 'compere.htm',
		views: {
			'': {
				templateUrl: 'views/compere.html',
				controller: 'cCompere'
			}
		}
	})
	;
	$urlRouterProvider.otherwise('login.htm');
});
