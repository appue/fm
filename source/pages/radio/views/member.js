'use strict';
Fm.controller('cMember', function (
    $scope,
    $state,
    $rootScope,
    $appueWidget,
    $stateParams,
    $appueStorage
){
    $scope.tView = {
        password: false
    };
    $scope.tInput = {
        password: '',
        password1: '',
        password2: ''
    };

    if (!$appueStorage.pull($rootScope.setConfig.app)) {
        $state.go('fm.index');
        return;
    }

    $scope.toBack = function () {
        history.back();
    };

    $scope.toOut = function () {
        $appueStorage.remove($rootScope.setConfig.app);
        $state.go('fm.index');
    };

    $scope.toPassword = function () {
        $scope.tView.password = !$scope.tView.password;
    };
    $scope.setPassword = function () {
        if (!$scope.tInput.password || !$scope.tInput.password1 || !$scope.tInput.password2) {
            $appueWidget.msgToast('请输入密码');
            return;
        }

        if ($scope.tInput.password1 != $scope.tInput.password2) {
            $appueWidget.msgToast('两次输入的密码不相同');
            return;
        }

        $appueWidget.ajaxRequest({
            scope: $scope,
            data: {
                password: md5($scope.tInput.password),
                password1: md5($scope.tInput.password1),
                password2: md5($scope.tInput.password2)
            },
            auth: true,
            url: 'setPassword',
            success: function (res) {
                $scope.tInput.password = '';
                $scope.tInput.password1 = '';
                $scope.tInput.password2 = '';
                $scope.tView.password = false;
                $appueWidget.msgToast('密码更新成功');
                $appueStorage.push($rootScope.setConfig.app, res.data);
                // $timeout(function () {
                //     $appueStorage.remove($rootScope.setConfig.app);
                //     $state.go('fm.login');
                // }, 1000);
            },
            failure: function (res) {
                $appueWidget.msgToast(res.message);
            }
        });
    };

    $scope.toImage = function () {

    };
});
