'use strict';
Fm.controller('cProgram', function (
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
        url: 'getAdminProgram',
        data: {},
        success: function (res) {
            $scope.tView.list = res.data.list;
        }
    });

    $scope.toAdd = function () {
        $scope.$broadcast('view:showEditProgram', {
            show: true
        });
    };

    $scope.toEdit = function (item) {
        $scope.$broadcast('view:showEditProgram', {
            show: true,
            data: item
        });
    };
});
