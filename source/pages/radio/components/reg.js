/**
 * 注册
 */
Fm.directive('viewReg', function (
    $rootScope,
    $appueWidget
) {
    return {
        restrict: 'E',
        replace: false,
        scope: {},
        templateUrl: 'components/reg.html',
        link: function ($scope, $element, $attrs) {
        }
    }
});
