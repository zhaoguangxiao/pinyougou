package com.pinyougou.sellergoods.service;

import java.util.List;

import com.pinyougou.entity.PageResult;
import com.pinyougou.pojo.TbBrand;

public interface BrandService {
	
	
	public List<TbBrand> findAll();


	/**
	 * 	分页查询数据
 	 */
	public PageResult finPage(int pageNum, int pageSize);

	/**
	 * 	新增品牌
 	 */
	public void saveBranch(TbBrand branch);

	/**
	 * 	判断当前名称是否存在
 	 */
	public boolean hasBranchByName(String name);

	/**
	 * 	根据id查询某一个品牌
	 */
	public TbBrand selectBranchByKey(Long id);

	/**
	 * 	根据id 更新品牌对象
	 */
	public void updateBrand(TbBrand brand);

	/**
	 * 	根据id 删除品牌
	 */
	public void deleteBrandByIds(Long [] ids);

	/**
	 * 	根据品牌名称/首字母 来查询品牌
	 */
	public PageResult finPage(TbBrand brand, int pageNum, int pageSize);

}
