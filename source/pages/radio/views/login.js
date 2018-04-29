'use strict';
Fm.controller('cLogin', function (
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
