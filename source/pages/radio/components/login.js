/**
 * 登录
 */
Fm.directive('viewLogin', function (
    $state,
    $rootScope,
    $appueWidget,
    $appueStorage
) {
    return {
		restrict: 'E',
		replace: false,
        scope: {},
        templateUrl: 'components/login.html',
        link: function ($scope, $element, $attrs) {
            $scope.dInput = {
                username: '',
                password: '',
                password1: ''
            };
            $scope.dView = {
                show: false,
                type: 'login'
            };

            $rootScope.$on('view:showLogin', function (e, res) {
                if (res.route) {
                    var auth = $appueStorage.pull($rootScope.setConfig.app);
                    if (auth) {
                        $state.go(res.route, res.opts || {});
                        return;
                    }
                }
                if (res.show) {
                    $scope.dView.show = true;
                    $scope.dView.type = res.type || 'login';
                }
            });

            // $scope.$broadcast('model:productAdd', {
            // });
            $scope.toClose = function () {
                $scope.dView.show = false;
            };

            $scope.toRegister = function () {
                if (!$scope.dInput.username) {
                    $appueWidget.msgToast('请输入用户名');
                    return;
                }

                if (!$scope.dInput.password) {
                    $appueWidget.msgToast('请输入密码');
                    return;
                }

                if (!$scope.dInput.password1) {
                    $appueWidget.msgToast('请输入确认密码');
                    return;
                }

                if ($scope.dInput.password !== $scope.dInput.password1) {
                    $appueWidget.msgToast('两次输入的密码不同');
                    return;
                }

                $appueWidget.ajaxRequest({
                    scope: $scope,
                    data: {
                        username: $scope.dInput.username,
                        password: md5($scope.dInput.password),
                        password1: md5($scope.dInput.password1)
                    },
                    url: 'setMember',
                    success: function (res) {
                        $appueStorage.push($rootScope.setConfig.app, res.data);
                        $scope.dView.show = false;
                    }
                });
            };

            $scope.toLogin = function () {
                if (!$scope.dInput.username) {
                    $appueWidget.msgToast('请输入用户名');
                    return;
                }

                if (!$scope.dInput.password) {
                    $appueWidget.msgToast('请输入密码');
                    return;
                }

                $appueWidget.ajaxRequest({
                    scope: $scope,
                    data: {
                        username: $scope.dInput.username,
                        password: md5($scope.dInput.password)
                    },
                    url: 'getLogin',
                    success: function (res) {
                        $appueStorage.push($rootScope.setConfig.app, res.data);
                        $scope.dView.show = false;
                    }
                });
            };
        }
    }
});
