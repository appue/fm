'use strict';
Fm.controller('cProgram', function (
    $scope,
    $appueWidget,
    $appueStorage
){
    $scope.tView = {
        list: []
    };
    $scope.tInput = {
        keyword: ''
    };

    $scope.getContent = function () {
        $appueWidget.ajaxRequest({
            scope: $scope,
            admin: true,
            url: 'getAdminProgram',
            data: {
                keyword: $scope.tInput.keyword
            },
            success: function (res) {
                $scope.tView.list = res.data.list;
            }
        });
    };

    $scope.getContent();

    $scope.toSearch = function () {
        if (!$scope.tInput.keyword) {
            $appueWidget.showToast('请输入搜索的关键字');
            return;
        }
        $scope.getContent();
    };

    $scope.toAdd = function () {
        $scope.$broadcast('view:showEditProgram', {
            show: true
        });
    };

    $scope.$on('view:showEditProgramSuccess', function (evt, res) {
        $scope.getContent();
    });

    $scope.toEdit = function (item) {
        $scope.$broadcast('view:showEditProgram', {
            show: true,
            data: item
        });
    };
});
