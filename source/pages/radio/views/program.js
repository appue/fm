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
        debug: true,
        scope: $scope,
        url: 'getProgram',
        success: function (res) {
            $scope.tView.list = res.data;
        }
    })
});
