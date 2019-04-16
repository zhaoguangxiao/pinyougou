app.controller('contentController',function ($scope,contentService) {

    $scope.categoryList=[];

    /**
     * 根据categoryId 查询信息
     * @param categoryId
     */
    $scope.findCategoryById=function (categoryId) {
        contentService.findByCategoryId(categoryId).success(
            function (response) {
                $scope.categoryList[categoryId]=response;
            }
        )
    };


});