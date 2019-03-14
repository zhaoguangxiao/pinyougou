//判断字符是否为空的方法
		function isEmpty(obj){
		    if(typeof obj == "undefined" || obj == null || obj == ""){
		        return true;
		    }else{
		        return false;
		    }
		}
		//判断字符长度是否为1
		function strlen(str){  
		    var len = 0;  
		    for (var i=0; i<str.length; i++) {   
		     var c = str.charCodeAt(i);   
		    //单字节加1   
		     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
		       len++;   
		     }   
		     else {   
		      len+=2;   
		     }   
		    }   
		    return len;  
		}  	
		

		app.controller('myController', function($scope,$controller, $http,brandService) {
	
		//继承baseController
		$controller('baseController',{$scope:$scope})
	
		//定义保存数据的对象
		$scope.branch = {};
		
		//查询品牌列表
		$scope.findAll = function() {
			brandService.findAll().success(function(response) {
				//响应返回结果集
				$scope.list = response;
			});
		}

		
		//分页
/* 		$scope.findPage = function(page, size) {
			$http.get('../branch/findPage.do?page=' + page + '&size=' + size)
					.success(function(response) {
						$scope.list = response.date;//显示当前页数据
						$scope.pageResultConf.totalItems = response.total;//显示总数据条数
					});
		} */
		

        // process the form
        $scope.processForm = function() {
            if(isEmpty($scope.branch.name)){
                $scope.errorName='品牌名称为空';
            }else{
             	$scope.errorName='';
            	
            	if(isEmpty($scope.branch.firstChar)){
                    $scope.errorSuperhero='品牌首字母为空';
                }else{
                	$scope.errorSuperhero='';
                		
                		if(strlen($scope.branch.firstChar) >1){
                			$scope.errorSuperhero='品牌的首字母错误,请重新输入';
                		}else{
                			$scope.errorSuperhero='';
                			
      						//新增/修改	
                			brandService.save($scope.branch).success(
                					function(response) {
                						if (response.success) {
                							//新增成功 刷新分页数据
                							$scope.loadList();
                							//关闭当前窗口
                							 $('#editModal').modal("hide");
                						} else {
                							alert(response.message);
                						}
                					});
                		}
                }
            }
            
        };
		

		
		$scope.changeBrand=function(id){
			brandService.changeBrand(id).success(
				function(response){
					$scope.branch=response;
				}
			)
		}
		
		//定义用于存放删除id的数组
		$scope.selectIds=[];
		
		
		
		//删除数组的元素
		$scope.deleteBranch=function(){
			if($scope.selectIds == false){
				alert("请勾选你要删除的品牌");
			}else{
				if(confirm("你真的要删除"+$scope.selectIds+"品牌?")){
					brandService.deleteBranch($scope.selectIds).success(
							function(response){
								if(!response.success){
									//刷新分页数据
									$scope.loadList();
									//把数组设为空
									$scope.selectIds=[];
								}else{
									alert(response.message)	
								}
							}
						)
				}
			}
			
		}
		
		//定义搜索对象
		$scope.searchEmtity={};
	
		//根据条件查询
		$scope.search=function(page,size){
			brandService.search(page,size,$scope.searchEmtity).success(
					function(response){
						$scope.list = response.data;//显示当前页数据
						$scope.pageResultConf.totalItems = response.total;//显示总数据条数		
					}
			)
		}
		

	});