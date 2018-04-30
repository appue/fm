'use strict';
Fm.controller('cProgram', function (
    $scope,
    $appueWidget,
    $stateParams
){
    $scope.tView = {
        list: []
    };

    $appueWidget.ajaxRequest({
        scope: $scope,
        url: 'getProgram',
        success: function (res) {
            $scope.tView.list = res.data.list;
        }
    })
});
