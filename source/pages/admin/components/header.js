Fm.directive('viewHeader', function (
    $state,
    $rootScope,
    $appueWidget,
    $appueStorage
) {
    return {
		restrict: 'E',
		replace: false,
        scope: {},
        templateUrl: 'components/header.html',
        link: function ($scope, $element, $attrs) {
        	if ($state.is('fm.index')) $scope.tab = 'index';
            if ($state.is('fm.program')) $scope.tab = 'program';
        	if ($state.is('fm.comment')) $scope.tab = 'program';
            if ($state.is('fm.member')) $scope.tab = 'member';
            if ($state.is('fm.compere')) $scope.tab = 'member';


            $scope.toOut = function () {
                $appueStorage.remove($rootScope.setConfig.pc);
                $state.go('fm.login');
            };

            $scope.toChange = function () {
                $scope.$broadcast('view:showEditPassword', {
                    show: true
                });
            };
        }
    }
});
