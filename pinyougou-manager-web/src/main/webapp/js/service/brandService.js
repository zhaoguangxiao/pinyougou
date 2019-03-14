//品牌服务
	app.service('brandService',function($http){
		
		//查询全部品牌服务
		this.findAll=function(){
			return $http.get('../brand/findAll.do');
		}
		
		
		//保存品牌服务
		this.save=function(entity){
			return $http.post('../brand/save.do', entity);
		}
		
		//根据品牌id查询出这一品牌 服务
		this.changeBrand=function(id){
			return $http.get('../brand/findBrandByKey.do?id='+id);
		}
		
		//删除品牌服务
		this.deleteBranch=function(ids){
			return $http.get('../brand/deleteBrand.do?ids='+ids);
		}
		
		//搜索品牌
		this.search=function(page,size,searchEmtity){
			return $http.post('../brand/searchBrand.do?page=' + page + '&size=' + size,searchEmtity);
		}
		//品牌select2
		this.select2Brand=function(){
			return $http.get("../brand/findAllBrand.do");
		}
	});