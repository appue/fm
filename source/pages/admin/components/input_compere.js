Fm.directive('inputCompere', function (
    $state,
    $rootScope,
    $appueWidget,
    $appueStorage
) {
    return {
		restrict: 'E',
		replace: false,
        scope: {},
        templateUrl: 'components/input_compere.html',
        link: function ($scope, $element, $attrs) {
            $scope.dView = {
                show: false,
                pid: ''
            };

            $scope.toClose = function () {
                $scope.dView.show = false;
            };

            $scope.$on('view:showEditProgram', function (evt, res) {
                if (!res.show) return;

                $scope.dView = {
                    show: true,
                    pid: res.pid
                };
            });
        }
    }
});
