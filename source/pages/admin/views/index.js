'use strict';
Fm.controller('cIndex', function (
    $scope,
    $appueWidget,
    $appueStorage
){
    $scope.tView = {
        list: []
    };

    $appueWidget.ajaxRequest({
        scope: $scope,
        admin: true,
        url: 'getAdminIndex',
        success: function (res) {
            $scope.tView.list = res.data.list;
        }
    });
});
