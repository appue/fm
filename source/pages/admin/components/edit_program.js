Fm.directive('viewProgram', function (
    $state,
    $rootScope,
    $appueWidget,
    $appueStorage
) {
    return {
		restrict: 'E',
		replace: false,
        scope: {},
        templateUrl: 'components/edit_program.html',
        link: function ($scope, $element, $attrs) {
            $scope.dView = {
                show: false,
                pid: ''
            };
            $scope.dInput = {
                program: '',
                compere: '',
                media: '',
                content: '',
                image: '',
                pid: ''
            };

            $scope.toClose = function () {
                $scope.dView.show = false;
            };

            $scope.$on('view:showEditProgram', function (evt, res) {
                if (!res.show) return;

                $scope.dView = {show: true};
                $scope.dInput = res.data || {};
            });

            $scope.toSave = function () {
                if (!$scope.dInput.program) {
                    $appueWidget.msgToast('请输入节目名称');
                    return;
                }
                if (!$scope.dInput.content) {
                    $appueWidget.msgToast('请输入节目简介');
                    return;
                }
                if (!$scope.dInput.media) {
                    $appueWidget.msgToast('请输入音频地址');
                    return;
                }
                if (!$scope.dInput.image) {
                    $appueWidget.msgToast('请选择图片');
                    return;
                }
                if (!$scope.dInput.compere) {
                    $appueWidget.msgToast('请选择主持人');
                    return;
                }
                var opts = {
                    pid: $scope.dInput.pid || '',
                    program: $scope.dInput.program,
                    image: $scope.dInput.image,
                    content: $scope.dInput.content,
                    media: $scope.dInput.media,
                    compere: $scope.dInput.compere
                };

                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: opts,
                    url: 'setAdminProgram',
                    success: function (res) {
                        if ($scope.dInput.pid) {
                            $appueWidget.msgToast('更新成功');
                        } else {
                            $appueWidget.msgToast('新增成功');
                        }
                        $scope.dView.show = false;

                        $scope.$parent.$emit('view:showEditProgramSuccess', {});
                    }
                })
            };
        }
    }
});
