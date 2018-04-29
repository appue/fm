'use strict';
Fm.controller('cCompere', function (
    $scope,
    $appueWidget,
    $appueStorage
){
    $scope.tView = {
        list: []
    };

    $scope.getContent = function () {
        $appueWidget.ajaxRequest({
            debug: true,
            scope: $scope,
            admin: true,
            data: {},
            url: 'getAdminCompere',
            success: function (res) {
                $scope.tView.list = res.data.list;
            }
        });
    }

    $scope.getContent();


    $scope.toDelete = function (item) {
        $appueWidget.popConfirm({
            scope: $scope,
            content: '确认要删除该主持人吗？',
   		    submit: function () {
                alert(1);
                $appueWidget.ajaxRequest({
                    scope: $scope,
                    admin: true,
                    data: {id: item.id},
                    url: 'deleteCompere',
                    success: function (res) {

                    }
                });
            }
        });
    };
});
