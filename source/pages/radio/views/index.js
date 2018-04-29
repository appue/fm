'use strict';
Fm.controller('cIndex', function (
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
