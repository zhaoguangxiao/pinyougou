package com.pinyougou.shop.controller;

import com.pinyougou.entity.Result;
import com.pinyougou.utils.FastDFSClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 商品图片上传文件
 * @author 晓电脑
 */
@RestController
@RequestMapping("/shop")
public class UploadController {

    @Value("${FILE_SERVICE_URL}")
    private String fileServiceUrl;


    @RequestMapping("/upload")
    public Result uploadShop(@RequestParam("file") MultipartFile multipartFile) {
        StringBuffer stringBuffer =null;
        try {
            String filename = multipartFile.getOriginalFilename();
            String substring = filename.substring(filename.lastIndexOf(".") + 1);
            FastDFSClient dfsClient = new FastDFSClient("classpath:config/fdfs_client.conf");
            String url = dfsClient.uploadFile(multipartFile.getBytes(), substring);
            stringBuffer = new StringBuffer(fileServiceUrl);
            stringBuffer.append(url);
        } catch (Exception e) {
            e.printStackTrace();
            new Result(false, "文件上传失败");
        }
        return new Result(true, stringBuffer.toString());
    }

}
