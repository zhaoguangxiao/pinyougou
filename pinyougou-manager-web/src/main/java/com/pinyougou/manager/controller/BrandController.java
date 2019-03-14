package com.pinyougou.manager.controller;

import java.util.List;
import java.util.Map;

import com.pinyougou.entity.Result;
import com.pinyougou.entity.PageResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;

@RestController
@RequestMapping("/brand")
public class BrandController {
	
	@Reference
	private BrandService brandService;
	
	
	@RequestMapping("findAll")
	public List<TbBrand> findAll(){
		return brandService.findAll();
	}


	@RequestMapping("/findPage")
	public PageResult findPage(int page, int size) {
		return brandService.finPage(page, size);
	}

	@RequestMapping("/save")
	public Result saveBranch(@RequestBody TbBrand branch) {
		Result brandResult = null;
		if (branch.getId() != null) {
			return updateBrand(branch);
		} else {
			return saveBrand(branch);
		}
	}

	@RequestMapping("findBrandByKey")
	public TbBrand findBrandByKey(Long id) {
		return brandService.selectBranchByKey(id);

	}

	private Result saveBrand(TbBrand branch) {
		Result result = new Result();
		try {
			// 判断品牌名称是否相同
			boolean hasName = brandService.hasBranchByName(branch.getName());
			if (hasName) {
				result.setSuccess(false);
				result.setMessage("品牌名称已经存在,无法进行添加");
				return result;
			}
			brandService.saveBranch(branch);
			result.setSuccess(true);
			result.setMessage("品牌保存成功");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("品牌保存失败");
		}
		return result;
	}

	private Result updateBrand(TbBrand branch) {
		Result result = new Result();
		try {
			brandService.updateBrand(branch);
			result.setSuccess(true);
			result.setMessage("品牌更新成功");
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMessage("品牌更新失败");
		}
		return result;
	}

	@RequestMapping("deleteBrand")
	public Result deleteBrand(Long [] ids){
		Result result = new Result();
		try{
			brandService.deleteBrandByIds(ids);
		}catch(Exception e){
			result.setSuccess(false);
			result.setMessage("品牌删除失败");
		}
		return result;
	}


	@RequestMapping("searchBrand")
	public PageResult searchBrand(@RequestBody TbBrand branch,int page, int size){
		return brandService.finPage(branch, page, size);
	}

	@RequestMapping("findAllBrand")
	public List<Map> findAllBrand(){
		return brandService.findAllBrand();
	}


}
