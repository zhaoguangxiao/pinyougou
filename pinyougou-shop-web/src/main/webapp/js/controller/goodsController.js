//控制层
app.controller('goodsController', function ($scope, $controller, $location, goodsService, uploadService, itemCatService, typeTemplateService) {

    $controller('baseController', {$scope: $scope});//继承

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        goodsService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    //分页
    $scope.findPage = function (page, rows) {
        goodsService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.data;
                $scope.pageResultConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    //查询实体
    $scope.findOne = function () {
        var id = $location.search()['id'];

        if (null == id) {
            return;
        } else {
            goodsService.findOne(id).success(
                function (response) {
                    $scope.entity = response;
                    editor.html($scope.entity.tbGoodsDesc.introduction);//商品描述
                    //商品图片
                    $scope.entity.tbGoodsDesc.itemImages = JSON.parse($scope.entity.tbGoodsDesc.itemImages);
                    //商品拓展属性
                    $scope.entity.tbGoodsDesc.customAttributeItems = JSON.parse($scope.entity.tbGoodsDesc.customAttributeItems);
                    //商品规格
                    $scope.entity.tbGoodsDesc.specificationItems = JSON.parse($scope.entity.tbGoodsDesc.specificationItems);
                    //商品SKU列表
                    for(var i=0;i<$scope.entity.itemCatList.length;i++){
                        $scope.entity.itemCatList[i].spec=JSON.parse($scope.entity.itemCatList[i].spec);
                    }
                }
            );
        }
    }

    //保存
    $scope.save = function () {
        $scope.entity.tbGoodsDesc.introduction = editor.html();
        var serviceObject;
        if (null !=$scope.entity.tbGoods.id){
            serviceObject=goodsService.update($scope.entity);
        }else{
           serviceObject=goodsService.add($scope.entity);
        }

        serviceObject.success(
            function (response) {
                if (response.success) {
                    alert(response.message);
                    $scope.entity = {};
                    //清空富文本编辑器
                    editor.html("");
                } else {
                    alert(response.message);
                }
            }
        );
    }


    //批量删除
    $scope.delete = function () {
        //获取选中的复选框
        goodsService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.loadList();//刷新列表
                    $scope.selectIds = [];
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        goodsService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.data;
                $scope.pageResultConf.totalItems = response.total;//更新总记录数
            }
        );
    };

    $scope.status = ['未审核', '审核中','审核通过', '审核未通过', '已关闭'];

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

    $scope.entity_File = {};
    //上传文件
    $scope.uploadFile = function () {
        uploadService.uploadFileService().success(
            function (response) {
                if (response.success) {
                    $scope.entity_File.url = response.message;
                } else {
                    alert(response.message);
                }
            }
        )
    }


    $scope.entity = {tbGoodsDesc: {itemImages: [], specificationItems: []}}

    //add 图片集合
    $scope.addFileEntity = function () {
        $scope.entity.tbGoodsDesc.itemImages.push($scope.entity_File);
    }

    $scope.deleteFileEntity = function (index) {
        //从数组移除这个id
        $scope.entity.tbGoodsDesc.itemImages.splice(index, 1);
    }


    $scope.findItemCat1List = function () {
        itemCatService.findSonByParentId(0).success(
            function (response) {
                $scope.Item1List = response;
            }
        )
    }

    $scope.$watch('entity.tbGoods.category1Id', function (newValue, oldValue) {
        itemCatService.findSonByParentId(newValue).success(
            function (response) {
                $scope.Item2List = response;
                $scope.Item3List = null;
                $scope.entity.tbGoods.typeTemplateId = null;
                $scope.typeTemplate = null;
            }
        )
    })


    $scope.$watch('entity.tbGoods.category2Id', function (newValue, oldValue) {
        itemCatService.findSonByParentId(newValue).success(
            function (response) {
                $scope.Item3List = response;
            }
        )
    })


//读取模板id
    $scope.$watch('entity.tbGoods.category3Id', function (newValue, oldValue) {
        itemCatService.findOne(newValue).success(
            function (response) {
                $scope.entity.tbGoods.typeTemplateId = response.typeId;
            }
        )
    })

    //品牌下拉框
    $scope.$watch('entity.tbGoods.typeTemplateId', function (newValue, oldValue) {
        typeTemplateService.findOne(newValue).success(
            function (response) {
                $scope.typeTemplate = response;
                $scope.typeTemplate.brandIds = JSON.parse($scope.typeTemplate.brandIds);

                //商品扩展属性
                if (null == $location.search()['id']) {
                    $scope.entity.tbGoodsDesc.customAttributeItems = JSON.parse(response.customAttributeItems);
                }
            }
        )
        typeTemplateService.findSpecList(newValue).success(
            function (response) {
                $scope.findSpecListAll = response;
            }
        );
    })

    $scope.updateSpecList = function ($event, name, val) {
        var object = $scope.seachObjectByKey($scope.entity.tbGoodsDesc.specificationItems, 'attributeName', name);
        if (object != null) {
            if ($event.target.checked) {
                //如果勾选复选框
                object.attributeValue.push(val);
            } else {//取消复选框
                object.attributeValue.splice(object.attributeValue.indexOf(val), 1);
                //判断attributeValue 是否为空如果为空则删除这个对象
                if (object.attributeValue.length == 0) {
                    $scope.entity.tbGoodsDesc.specificationItems.splice(
                        $scope.entity.tbGoodsDesc.specificationItems.indexOf(object), 1
                    );
                }
            }
        } else {
            $scope.entity.tbGoodsDesc.specificationItems.push({"attributeName": name, "attributeValue": [val]});
        }
    }

    //创建SKU列表
    $scope.createItemsList = function () {
        $scope.entity.itemCatList = [{spec: {}, price: 0, num: 0, status: '0', isDefault: '0'}];
        var items = $scope.entity.tbGoodsDesc.specificationItems;
        for (var i = 0; i < items.length; i++) {
            $scope.entity.itemCatList = addItemList($scope.entity.itemCatList, items[i].attributeName, items[i].attributeValue);
        }
    }

    addItemList = function (list, columnName, columnVal) {
        var newList = [];
        for (var i = 0; i < list.length; i++) {
            var oldEach = list[i];
            for (var j = 0; j < columnVal.length; j++) {
                var newEach = JSON.parse(JSON.stringify(oldEach));
                newEach.spec[columnName] = columnVal[j];
                newList.push(newEach)
            }
        }
        return newList;
    }

    //修改 查询规格列表是否默认选中
    $scope.checkedAttributeValue = function (specName, optionName) {
        var items = $scope.entity.tbGoodsDesc.specificationItems;
        var hasAttribute=$scope.seachObjectByKey(items,'attributeName',specName);
        if (null != hasAttribute){
            if (hasAttribute.attributeValue.indexOf(optionName)>=0){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }



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
    //更新商品状态
    $scope.updateGoodStatus=function (status) {
        goodsService.updateGoodsStatus($scope.selectIds,status).success(
            function (response) {
                if (response.success){
                    $scope.loadList();//刷新列表
                    $scope.selectIds=[];
                }else{
                    alert(response.message);
                }
            }
        )
    }


    //更新商品下架状态
    $scope.updateGoodsMarketableById=function (status) {
        goodsService.updateGoodsMarketableById($scope.selectIds,status).success(
            function (response) {
                if (response.success){
                    $scope.loadList();//刷新列表
                    $scope.selectIds=[];
                    alert(response.message);
                }else{
                    alert(response.message);
                }
            }
        )
    }


});	
