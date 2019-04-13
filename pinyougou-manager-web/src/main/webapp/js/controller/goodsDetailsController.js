//控制层
app.controller('goodsDetailsController', function ($scope, $controller, $location, goodsService,itemCatService) {

    $controller('baseController', {$scope: $scope});//继承


    $scope.entity = {tbGoodsDesc: {itemImages: [], specificationItems: []}}
    //查询实体
    $scope.findOne = function () {
        var id = $location.search()['id'];

        if (null == id) {
            return;
        } else {
            goodsService.findOne(id).success(
                function (response) {
                    $scope.list = response;
                    //商品图片
                    $scope.list.tbGoodsDesc.itemImages = JSON.parse($scope.list.tbGoodsDesc.itemImages);
                    //商品拓展属性
                    $scope.list.tbGoodsDesc.customAttributeItems = JSON.parse($scope.list.tbGoodsDesc.customAttributeItems);
                    //商品规格
                    $scope.list.tbGoodsDesc.specificationItems = JSON.parse($scope.list.tbGoodsDesc.specificationItems);
                    //商品SKU列表
                    for(var i=0;i<$scope.entity.itemCatList.length;i++){
                        $scope.list.itemCatList[i].spec=JSON.parse($scope.list.itemCatList[i].spec);
                    }
                }
            );
        }
    }


    $scope.status = ['未审核', '审核通过', '审核未通过', '已关闭'];

    $scope.findAllCategory = [];

    $scope.findCategoryList = function () {
        itemCatService.findAll().success(
            function (response) {
                for (var i = 0; i < response.length; i++) {
                    $scope.findAllCategory[response[i].id] = response[i].name;
                }
            }
        )
    };
});