'use strict';
Fm.controller('cIndex', function (
    $scope,
    $rootScope,
    $appueWidget
){
    $scope.tView = {
        tab: 1,
        list: []
    };

    // 评论
    $scope.toComment = function (item) {
        $rootScope.$broadcast('view:showLogin', {
            show: true,
            route: 'fm.comment',
            opts: {pid: item.pid}
        });
    };

    $appueWidget.ajaxRequest({
        scope: $scope,
        url: 'getIndex',
        success: function (res) {
            $scope.tView.list = res.data.list;
        }
    });
});
