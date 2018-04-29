Fm.directive('inputImages', function (
    $state,
    $rootScope,
    $appueWidget,
    $appueStorage
) {
    return {
        restrict: 'E',
        replace : true,
        require : '^ngModel',
        scope   : {},
        templateUrl: 'components/input_images.html',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.dImages = [
                {image: '/themes/img/program/01.jpg'},
                {image: '/themes/img/program/02.jpg'},
                {image: '/themes/img/program/03.jpg'},
                {image: '/themes/img/program/04.jpg'},
                {image: '/themes/img/program/05.jpg'},
                {image: '/themes/img/program/06.jpg'}
            ];
            $scope.dInput = {image: ''};

            if (!ngModel) return;

            ngModel.$render = function() {
                $scope.dInput = {
                    image: ngModel.$isEmpty(ngModel.$viewValue) ? '' : ngModel.$viewValue
                };
            };

            $scope.toSelect = function (item) {
                $scope.dInput.image = item.image;
                ngModel.$setViewValue($scope.dInput.image);
            }
        }
    }
});
