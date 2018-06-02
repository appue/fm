'use strict';
Fm.controller('cMember', function (
    $scope,
    $appueWidget,
    $stateParams
){
    $scope.toBack = function () {
        history.back();
    };
});
