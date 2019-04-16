 //控制层 
app.controller('contentController' ,function($scope,$controller,contentService,uploadService,contentCategoryService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		contentService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		contentService.findPage(page,rows).success(
			function(response){
				$scope.list=response.data;
				$scope.pageResultConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		contentService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=contentService.update( $scope.entity ); //修改  
		}else{
			serviceObject=contentService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.loadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		contentService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.loadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		contentService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.data;
				$scope.pageResultConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

    //上传图片
    $scope.uploadFile = function () {
        uploadService.uploadFileService().success(
            function (response) {
                if (response.success) {
                    $scope.entity.pic = response.message;
                } else {
                    alert(response.message);
                }
            }
        ).error(
        	//出现404 500 会走error
        	function () {
				alert("上传出错");
            }
		)
    }

    //类目下拉框
    $scope.findAllContentCategoryList = function () {
        contentCategoryService.findAll().success(
            function (response) {
                $scope.contentCategoryList=response;
            }
        );
    }

    $scope.statusList=['未启用','启用'];
    
});	
