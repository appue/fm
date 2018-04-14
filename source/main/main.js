'use strict';
Fm.controller('cMain', function (
    $scope,
    $state,
	$timeout,
    $rootScope,
    $stateParams,
    $appueCookie,
    $appueWidget,
    $appueStorage
){
	// if (!$rootScope.isWechat) return;

	// if ($appueCookie.getCookie('extParam')) {
	// 	var res = JSON.parse(window.Base64.decode($appueCookie.getCookie('extParam')));

	// 	if (!res.o) return;

	// 	if (!parseInt(res.b, 0) && !$appueStoragePool.pull('bindWechat')) {
			// $scope.$parent.$broadcast('pop:userBind', {
			// 	show: true
			// });
	// 	}
	// }
});
