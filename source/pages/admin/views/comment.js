'use strict';
Fm.controller('cComment', function (
    $scope,
    $stateParams,
    $appueWidget,
    $appueStorage
){
    $scope.tView = {
        list: []
    };

    $scope.getContent = function () {
        const opts = {};

        if ($stateParams.pid) opts.pid = $stateParams.pid;

        $appueWidget.ajaxRequest({
            scope: $scope,
            admin: true,
            data: opts,
            url: 'getAdminComment',
            success: function (res) {
                $scope.tView.list = res.data.list;
            }
        });
    }

    $scope.getContent();

    $scope.toDelete = function (item) {
        $appueWidget.popConfirm({
            scope: $scope,
            content: '确认要删除该条评论吗？',
   		    submit: function () {
                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: {id: item._id},
                    url: 'setAdminCommentDelete',
                    success: function (res) {
                        $appueWidget.msgToast('删除评论成功');
                        $scope.getContent();
                    }
                });
            }
        });
    };
});
