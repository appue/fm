'use strict';
Fm.controller('cLogin', function (
    $scope,
    $state,
    $rootScope,
    $appueWidget,
    $appueStorage
){
    $scope.tInput = {
        username: '',
        password: ''
    };
    $scope.emsg = {
        username: false,
        password: false
    };

    $scope.toChange = function () {
        $scope.emsg.username = false;
        $scope.emsg.password = false;
    };

    $scope.toLogin = function () {
        if (!$scope.tInput.username) {
            $scope.emsg.username = true;
            return;
        }

        if (!$scope.tInput.password) {
            $scope.emsg.password = true;
            return;
        }

        $appueStorage.push($rootScope.setConfig.pc, '369sadsd');
        $state.go('fm.index');
        return;

        $appueWidget.ajaxRequest({
            scope: $scope,
            data: {
                username: $scope.tInput.username,
                password: md5($scope.tInput.password)
            },
            url: 'adminLogin',
            success: function (res) {
                $appueStorage.push('fmh_sk3yew032c', res.data);
            }
        });
    };
});
