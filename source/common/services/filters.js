Fm.filter('trusted', function ($sce, $filter) {
    return function(url) {
        return $sce.trustAsResourceUrl($filter('protocol')(url));
    };
})
