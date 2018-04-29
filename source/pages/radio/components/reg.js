/**
 * 注册
 */
Fm.directive('viewReg', function (
    $rootScope,
    $appueWidget
) {
    return {
		restrict: 'E',
		replace: false,
        scope: {},
        templateUrl: 'components/reg.html',
        link: function ($scope, $element, $attrs) {
            $scope.dInput = {
                username: '',
                password: '',
                password1: ''
            };
            $scope.dView = {
                show: false,
                btn: false
            };

            $scope.$on('view:showReg', function (e, res) {
                if (res.show) $scope.dView.show = true;
            });

            // $scope.$broadcast('model:productAdd', {
            // });
            $scope.toClose = function () {
                $scope.dView.show = false;
            };

            $scope.toSubmit = function () {
                if (!$scope.dView.btn) return;

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
                    url: 'regUser',
                    data: {
                        username: $scope.dInput.username,
                        password: md5($scope.dInput.password),
                        password1: md5($scope.dInput.password1)
                    },
                    success: function (res) {

                    }
                });
            };
        }
    }
});
