Fm.directive('inputFace', function (
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
        templateUrl: 'components/input_face.html',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.dImages = [
                {image: '/themes/img/face/01.jpg'},
                {image: '/themes/img/face/02.jpg'},
                {image: '/themes/img/face/03.jpg'},
                {image: '/themes/img/face/04.jpg'},
                {image: '/themes/img/face/05.jpg'},
                {image: '/themes/img/face/06.jpg'},
                {image: '/themes/img/face/07.jpg'},
                {image: '/themes/img/face/08.jpg'},
                {image: '/themes/img/face/09.jpg'},
                {image: '/themes/img/face/10.jpg'}
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
