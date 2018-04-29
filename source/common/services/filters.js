Fm.filter('trusted', function ($sce, $filter) {
    return function(str) {
        return $sce.trustAsResourceUrl(str);
    };
})
