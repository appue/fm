'use strict';
Fm.controller('cIndex', function (
    $scope,
    $appueWidget
){
    $scope.tView = {
        tab: 1,
        list: []
    };


    // 评论
    $scope.toComment = function (item) {
        console.log($scope);
        $scope.$parent.$parent.$broadcast('view:showReg', {show: true});
    };
    
    $appueWidget.ajaxRequest({
        scope: $scope,
        debug: true,
        url: 'getList',
        success: function (res) {
            $scope.tView.list = res.data;
        }
    });
});
