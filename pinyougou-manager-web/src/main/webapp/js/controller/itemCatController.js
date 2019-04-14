 //控制层 
app.controller('itemCatController' ,function($scope,$controller,itemCatService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.pageResultConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改
		}else{
            $scope.entity.parentId=$scope.parentId;
			serviceObject=itemCatService.add( $scope.entity  );//增加
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
                    $scope.findSonByParentId($scope.parentId);
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	 
	//批量删除 
	$scope.delete=function(){
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
                    //重新查询
                    $scope.findSonByParentId($scope.parentId);
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.data;
				$scope.pageResultConf.totalItems=response.total;//更新总记录数
			}			
		);
	}


	//定义记录当前的parentId
	$scope.parentId=0;

	$scope.findSonByParentId=function(parentId){
        $scope.parentId=parentId;
		itemCatService.findSonByParentId(parentId).success(
			function (response) {
				$scope.list=response;
            }
		)
	}


	$scope.grade=1;

	$scope.setGrader=function (val) {
        $scope.grade=val;
    }


    $scope.selectList=function (entity) {

		if ($scope.grade == 1){
			$scope.entity_1=null;
			$scope.entity_2=null;
		}else if ($scope.grade == 2){
            $scope.entity_1=entity;
            $scope.entity_2=null;
		}else if($scope.grade == 3){
            $scope.entity_2=entity;
		}

        $scope.findSonByParentId(entity.id)
    }

    //类型模板下拉框
    $scope.itemCatList = {};

    $scope.findAllItem = function () {
        typeTemplateService.findAll().success(
            function (response) {
                $scope.itemCatList =response;
            }
        )
    }


});	
