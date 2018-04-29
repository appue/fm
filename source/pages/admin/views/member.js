'use strict';
Fm.controller('cMember', function (
    $scope,
    $appueWidget,
    $appueStorage
){
    $scope.tView = {
        list: []
    };

    $appueWidget.ajaxRequest({
        debug: true,
        scope: $scope,
        admin: true,
        url: 'getAdminMember',
        success: function (res) {
            $scope.tView.list = res.data.list;
        }
    });


    $scope.toDelete = function (item) {
        $appueWidget.popConfirm({
            scope: $scope,
            content: '确认要删除该用户吗？',
   		    submit: function () {
                alert(1);
                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: {id: item.id},
                    url: 'deleteComment',
                    success: function (res) {

                    }
                });
            }
        });
    };
});
