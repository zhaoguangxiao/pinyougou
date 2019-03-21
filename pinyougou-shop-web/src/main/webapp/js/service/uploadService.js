app.service('uploadService',function ($http) {

    //上传文件
    this.uploadFileService=function () {
        var formdata=new FormData();
        formdata.append('file',file.files[0]);
        return $http({
            url : '../shop/upload.do',
            method:'POST',
            data:formdata,
            headers:{'Content-Type':undefined},
            transformRequest:angular.identity
            });
    }




})