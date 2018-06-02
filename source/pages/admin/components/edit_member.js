Fm.directive('viewMember', function (
    $state,
    $rootScope,
    $appueWidget,
    $appueStorage
) {
    return {
		restrict: 'E',
		replace: false,
        scope: {},
        templateUrl: 'components/edit_member.html',
        link: function ($scope, $element, $attrs) {
            $scope.dView = {
                show: false
            };
            $scope.dInput = {
                uid: '',
                image: ''
            };

            $scope.toClose = function () {
                $scope.dView.show = false;
            };

            $scope.$on('view:showEditMember', function (evt, res) {
                if (!res.show) return;

                $scope.dView = {show: true};
                $scope.dInput = res.data || {};
            });

            $scope.toSave = function () {
                var opts = {
                    uid: $scope.dInput._id,
                    image: $scope.dInput.image
                };

                if (!$scope.dInput.image) {
                    $appueWidget.msgToast('请选择图片');
                    return;
                }

                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: opts,
                    url: 'setAdminMemberEdit',
                    success: function (res) {
                        $appueWidget.msgToast('用户信息更新成功');
                        $scope.dView.show = false;
                        $scope.$parent.$emit('view:showEditMemberSuccess', {});
                    }
                })
            };
        }
    }
});
