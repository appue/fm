'use strict';
Fm.controller('cComment', function (
    $scope,
    $appueWidget,
    $stateParams
){
    $scope.tView = {
        pid: $stateParams.pid,
        program: ''
    };
    $scope.tInput = {
        content: ''
    };

    $scope.toBack = function () {
        history.back();
    };

    $appueWidget.ajaxRequest({
        debug: true,
        scope: $scope,
        url: 'getComment',
        data: {
            pid: $scope.tView.pid
        },
        success: function (res) {
            $scope.tView.list = res.data.list;
            $scope.tView.program = res.data.program;
        }
    });

    $scope.toSubmit = function () {
        if (!$scope.tInput.content) return;
        $appueWidget.ajaxRequest({
            scope: $scope,
            auth: true,
            data: {
                content: $scope.tInput.content
            },
            url: 'postComment',
            success: function (res) {
                $appueWidget.msgToast('评论发表成功');
                $scope.tInput.cotent = '';
            }
        });
    };
});
