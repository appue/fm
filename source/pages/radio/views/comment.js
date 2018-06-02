'use strict';
Fm.controller('cComment', function (
    $scope,
    $appueWidget,
    $stateParams
){
    $scope.tView = {
        pid: $stateParams.pid,
        program: {}
    };
    $scope.tInput = {
        content: ''
    };

    $scope.toBack = function () {
        history.back();
    };

    $scope.getContent = function () {
        $appueWidget.ajaxRequest({
            scope: $scope,
            url: 'getComment',
            data: {pid: $scope.tView.pid},
            success: function (res) {
                $scope.tView.list = res.data.list;
                $scope.tView.program = res.data.program;
            }
        });
    }

    $scope.getContent();

    $scope.toSubmit = function () {
        if (!$scope.tInput.content) {
            $appueWidget.msgToast('请输入您想说的内容');
            return;
        }

        $appueWidget.ajaxRequest({
            scope: $scope,
            auth: true,
            data: {
                pid: $scope.tView.pid,
                content: $scope.tInput.content
            },
            url: 'setComment',
            success: function (res) {
                $appueWidget.msgToast('评论发表成功');
                $scope.tInput.content = '';
                $scope.getContent();
            }
        });
    };
});
