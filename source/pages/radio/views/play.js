'use strict';
// 播放页面
Fm.controller('cPlay', function (
    $scope,
    $rootScope,
    $appueWidget,
    $stateParams
){
    $scope.tView = {
        pid: $stateParams.pid,
        detail: {},
        bg: '/themes/img/common/bg_play_0'+ parseInt(7*Math.random() + 1) +'.jpg'
    };

    $scope.toPlay = function () {
        $scope.$parent.$parent.$broadcast('view:mediaAudioPlay', {
            media: $scope.tView.detail.media
        });
    };

    $appueWidget.ajaxRequest({
        scope: $scope,
        data: {pid: $scope.tView.pid},
        url: 'getProgramDetail',
        success: function (res) {
            $scope.tView.detail = res.data;
        }
    });

    $scope.toMember = function () {
        $rootScope.$broadcast('view:showLogin', {
            show: true,
            route: 'fm.member'
        });
    };
});
