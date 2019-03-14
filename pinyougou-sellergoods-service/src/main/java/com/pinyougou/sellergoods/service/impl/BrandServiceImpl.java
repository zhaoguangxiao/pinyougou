package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.entity.PageResult;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.pojo.TbBrandExample;
import com.pinyougou.sellergoods.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

import static com.alibaba.dubbo.common.utils.StringUtils.isNotEmpty;

@Service
public class BrandServiceImpl implements BrandService {
	
	@Autowired
	private TbBrandMapper brandMapper;

	@Override
	public List<TbBrand> findAll() {
		return brandMapper.selectByExample(null);
	}

	@Override
	public PageResult finPage(int pageNum, int pageSize) {
		// pageNum 当前第几页
		// pageSize 每页几条数据
		PageHelper.startPage(pageNum, pageSize);
		// 转换page类型
		Page<TbBrand> page = (Page<TbBrand>) brandMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	@Override
	public void saveBranch(TbBrand branch) {
		brandMapper.insert(branch);
	}

	@Override
	public boolean hasBranchByName(String name) {
		int i = brandMapper.countBranchNamInExist(name);
		return i > 0 ? true : false;
	}

	@Override
	public TbBrand selectBranchByKey(Long id) {
		return brandMapper.selectByPrimaryKey(id);
	}

	@Override
	public void updateBrand(TbBrand brand) {
		brandMapper.updateByPrimaryKey(brand);
	}

	@Override
	public void deleteBrandByIds(Long[] ids) {
		for(Long id:ids){
			brandMapper.deleteByPrimaryKey(id);
		}
	}

	@Override
	public PageResult finPage(TbBrand brand, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		// 转换page类型

		TbBrandExample example=new TbBrandExample();
		if(null != brand){
			TbBrandExample.Criteria criteria = example.createCriteria();
			if(isNotEmpty(brand.getName())){
				criteria.andNameLike("%"+brand.getName()+"%");
			}
			if(isNotEmpty(brand.getFirstChar())){
				criteria.andFirstCharLike("%"+brand.getFirstChar()+"%");
			}
		}
		Page<TbBrand> page = (Page<TbBrand>) brandMapper.selectByExample(example);
		return new PageResult(page.getTotal(), page.getResult());

	}

	@Override
	public List<Map> findAllBrand() {
		return brandMapper.selectAllBrand();
	}


}
