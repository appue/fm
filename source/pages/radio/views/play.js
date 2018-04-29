'use strict';
// 播放页面
Fm.controller('cPlay', function (
    $scope,
    $appueWidget,
    $stateParams
){
    $scope.tView = {
        pid: $stateParams.pid,
        detail: {},
        bg: '/themes/img/common/bg_play_0'+ parseInt(7*Math.random() + 1) +'.jpg'
    };

    $appueWidget.ajaxRequest({
        debug: true,
        scope: $scope,
        data: {
            pid: $scope.tView.pid
        },
        url: 'getAudio',
        success: function (res) {
            $scope.tView.detail = res.data;
        }
    })
});
