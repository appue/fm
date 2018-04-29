Fm.filter('trusted', function ($sce, $filter) {
    return function(str) {
        return $sce.trustAsResourceUrl(str);
    };
})
.filter('tohtml', function (
	$sce,
	$filter
) {
    return function(str) {
        return $sce.trustAsHtml(str);
    };
});
