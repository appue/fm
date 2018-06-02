Fm.directive('viewPassword', function (
    $state,
    $timeout,
    $rootScope,
    $appueWidget,
    $appueStorage
) {
    return {
		restrict: 'E',
		replace: false,
        scope: {},
        templateUrl: 'components/edit_password.html',
        link: function ($scope, $element, $attrs) {
            $scope.dView = {
                show: false
            };
            $scope.dInput = {};

            $scope.toClose = function () {
                $scope.dView.show = false;
            };

            $scope.$on('view:showEditPassword', function (evt, res) {
                if (!res.show) return;

                $scope.dView = {show: true};
            });

            $scope.toSave = function () {
                if (!$scope.dInput.password || !$scope.dInput.password1 || !$scope.dInput.password2) {
                    $appueWidget.msgToast('请输入密码');
                    return;
                }

                if ($scope.dInput.password1 != $scope.dInput.password2) {
                    $appueWidget.msgToast('两次输入的密码不相同');
                    return;
                }

                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: {
                        password: md5($scope.dInput.password),
                        password1: md5($scope.dInput.password1),
                        password2: md5($scope.dInput.password2)
                    },
                    url: 'setAdminPassword',
                    success: function (res) {
                        $appueWidget.msgToast('密码更新成功');
                        $scope.dView.show = false;
                        $scope.$parent.$emit('view:showEditPasswordSuccess', {});
                        $timeout(function () {
                            $appueStorage.remove($rootScope.setConfig.pc);
                            $state.go('fm.login');
                        }, 1000);
                    }
                });
            };
        }
    }
});
