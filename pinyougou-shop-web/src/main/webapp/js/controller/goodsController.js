 //控制层 
app.controller('goodsController' ,function($scope,$controller,goodsService,uploadService,itemCatService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.pageResultConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.add=function(){
        $scope.entity.tbGoodsDesc.introduction=editor.html();
        goodsService.add( $scope.entity  ).success(
			function(response){
				if(response.success){
					alert(response.message);
                    $scope.entity={};
                    //清空富文本编辑器
                    editor.html("");
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.data;
				$scope.pageResultConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

    $scope.entity_File={};
	//上传文件
	$scope.uploadFile=function () {
        uploadService.uploadFileService().success(
        	function (response) {
				if (response.success){
					$scope.entity_File.url=response.message;
				}else{
					alert(response.message);
				}
            }
		)
    }
    

    $scope.entity={tbGoodsDesc:{itemImages:[]}}

    //add 图片集合
	$scope.addFileEntity=function () {
        $scope.entity.tbGoodsDesc.itemImages.push($scope.entity_File);
    }

    $scope.deleteFileEntity = function (index) {
        //从数组移除这个id
        $scope.entity.tbGoodsDesc.itemImages.splice(index, 1);
    }



    $scope.findItemCat1List=function () {
		itemCatService.findSonByParentId(0).success(
			function (response) {
				$scope.Item1List=response;
            }
		)
    }

    $scope.$watch('entity.tbGoods.category1Id',function (newValue, oldValue) {
        itemCatService.findSonByParentId(newValue).success(
            function (response) {
                $scope.Item2List=response;
                $scope.Item3List=null;
                $scope.entity.tbGoods.typeTemplateId=null;
                $scope.typeTemplate=null;
            }
		)
    })


    $scope.$watch('entity.tbGoods.category2Id',function (newValue, oldValue) {
        itemCatService.findSonByParentId(newValue).success(
            function (response) {
                $scope.Item3List=response;
            }
        )
    })



    $scope.$watch('entity.tbGoods.category3Id',function (newValue, oldValue) {
        itemCatService.findOne(newValue).success(
        	function (response) {
                $scope.entity.tbGoods.typeTemplateId=response.typeId;
            }
		)
    })

	//品牌下拉框
    $scope.$watch('entity.tbGoods.typeTemplateId',function (newValue, oldValue) {
        typeTemplateService.findOne(newValue).success(
            function (response) {
                $scope.typeTemplate=response;
                $scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds);

                //商品扩展属性
				$scope.entity.tbGoodsDesc.customAttributeItems=JSON.parse(response.customAttributeItems);
            }
        )
    })
});	
