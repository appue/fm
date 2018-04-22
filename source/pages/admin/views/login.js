'use strict';
Fm.controller('cLogin', function (
    $scope
){
    $scope.tInput = {
        name: '',
        password: ''
    };
    $scope.emsg = {
        name: false,
        password: false
    };
    
    $scope.toChange = function () {
        $scope.emsg.name = false;
        $scope.emsg.password = false;
    };

    $scope.toLogin = function () {
        if (!$scope.tInput.name) {
            $scope.emsg.name = true;
        }
    };
});
