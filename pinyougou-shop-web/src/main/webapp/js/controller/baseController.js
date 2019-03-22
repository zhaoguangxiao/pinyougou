app.controller('baseController', function ($scope) {
    //currentPage --当前页数
    //totalItems -- 分页数据总长度
    //itemsPerPage -- 每页数据的长度
    $scope.pageResultConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOpeions: [10, 20, 30, 40, 50],
        onChange: function () {
            $scope.loadList();
        }

    }

    //刷新分页数据
    $scope.loadList = function () {
        $scope.search($scope.pageResultConf.currentPage,
            $scope.pageResultConf.itemsPerPage);
    }

    //用于保存用户批量删除的id
    $scope.changeSelectsEvent = function ($event, id) {
        if ($event.target.checked) {
            $scope.selectIds.push(id);
        } else {
            //取消 获取当前对象的索引
            var index = $scope.selectIds.indexOf(id);
            //从数组移除这个id
            $scope.selectIds.splice(index, 1);
        }
    }

    $scope.seachObjectByKey=function(list,key,val){
        for (var i=0;i<list.length;i++){
          if (list[i][key]==val){
              return list[i];
          }
        }
        return null;
    }



});

	