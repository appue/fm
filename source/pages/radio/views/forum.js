'use strict';
Fm.controller('cForum', function (
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
