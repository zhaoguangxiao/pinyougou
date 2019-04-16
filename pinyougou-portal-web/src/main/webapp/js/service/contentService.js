app.service('contentService',function ($http) {

    this.findByCategoryId=function (categoryId) {
        return $http.get('content/findAllContent.do?categoryId='+categoryId);
    }

});