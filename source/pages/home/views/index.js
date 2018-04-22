'use strict';
Fm.controller('cIndex', function (
    $scope,
    $appueWidget
){
    $appueWidget.ajaxRequest({
        scope: $scope,
        url: 'getAdmin',
        success: function (res) {
            console.log(res);
        }
    });
});
