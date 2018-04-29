'use strict';
// 播放页面
Fm.controller('cPlay', function (
    $scope,
    $appueWidget
){
    $appueWidget.ajaxRequest({
        scope: $scope,
        url: 'getList',
        success: function (res) {
            console.log(res);
        }
    });
});
