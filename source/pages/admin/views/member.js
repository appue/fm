'use strict';
Fm.controller('cMember', function (
    $scope,
    $appueWidget,
    $appueStorage
){
    $scope.tView = {
        list: []
    };

    $scope.getContent = function () {
        $appueWidget.ajaxRequest({
            scope: $scope,
            admin: true,
            url: 'getAdminMember',
            success: function (res) {
                $scope.tView.list = res.data.list;
            }
        });
    };

    $scope.getContent();

    $scope.toStop = function (item) {
        $appueWidget.popConfirm({
            scope: $scope,
            content: '确认要禁止该用户吗？',
   		    submit: function () {
                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: {id: item._id},
                    url: 'setAdminMemberStop',
                    success: function (res) {
                        $appueWidget.msgToast('禁止用户成功');
                        $scope.getContent();
                    }
                });
            }
        });
    };

    $scope.toStart = function (item) {
        $appueWidget.popConfirm({
            scope: $scope,
            content: '确认要启用该用户吗？',
   		    submit: function () {
                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: {id: item._id},
                    url: 'setAdminMemberStart',
                    success: function (res) {
                        $appueWidget.msgToast('启用用户成功');
                        $scope.getContent();
                    }
                });
            }
        });
    };

    $scope.$on('view:showEditMemberSuccess', function (evt, res) {
        $scope.getContent();
    });

    $scope.toEdit = function (item) {
        $scope.$broadcast('view:showEditMember', {
            show: true,
            data: item
        });
    };
});
