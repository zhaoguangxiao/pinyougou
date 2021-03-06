package com.pinyougou.sellergoods.service.impl;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.alibaba.dubbo.common.json.JSON;
import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.fastjson.JSONArray;
import com.pinyougou.entity.PageResult;
import com.pinyougou.mapper.TbSpecificationOptionMapper;
import com.pinyougou.pojo.TbSpecificationOption;
import com.pinyougou.pojo.TbSpecificationOptionExample;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbTypeTemplateMapper;
import com.pinyougou.pojo.TbTypeTemplate;
import com.pinyougou.pojo.TbTypeTemplateExample;
import com.pinyougou.pojo.TbTypeTemplateExample.Criteria;
import com.pinyougou.sellergoods.service.TypeTemplateService;
import org.springframework.transaction.annotation.Transactional;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
@Transactional
public class TypeTemplateServiceImpl implements TypeTemplateService {

	@Autowired
	private TbTypeTemplateMapper typeTemplateMapper;
	@Autowired
	private TbSpecificationOptionMapper tbSpecificationOptionMapper;
	
	/**
	 * 查询全部
	 */
	@Override
	public List<TbTypeTemplate> findAll() {
		return typeTemplateMapper.selectByExample(null);
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbTypeTemplate> page=   (Page<TbTypeTemplate>) typeTemplateMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(TbTypeTemplate typeTemplate) {
		typeTemplateMapper.insert(typeTemplate);		
	}

	
	/**
	 * 修改
	 */
	@Override
	public void update(TbTypeTemplate typeTemplate){
		typeTemplateMapper.updateByPrimaryKey(typeTemplate);
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public TbTypeTemplate findOne(Long id){
		return typeTemplateMapper.selectByPrimaryKey(id);
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		Arrays.asList(ids).forEach(each->{
			typeTemplateMapper.deleteByPrimaryKey(each);
		});
	}
	
	
		@Override
	public PageResult findPage(TbTypeTemplate typeTemplate, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbTypeTemplateExample example=new TbTypeTemplateExample();
		Criteria criteria = example.createCriteria();
		
		if(typeTemplate!=null){			
			if(StringUtils.isNotEmpty(typeTemplate.getName())){
				criteria.andNameLike("%"+typeTemplate.getName()+"%");
			}
			if(StringUtils.isNotEmpty(typeTemplate.getSpecIds())){
				criteria.andSpecIdsLike("%"+typeTemplate.getSpecIds()+"%");
			}
			if(StringUtils.isNotEmpty(typeTemplate.getBrandIds())){
				criteria.andBrandIdsLike("%"+typeTemplate.getBrandIds()+"%");
			}
			if(StringUtils.isNotEmpty(typeTemplate.getCustomAttributeItems())){
				criteria.andCustomAttributeItemsLike("%"+typeTemplate.getCustomAttributeItems()+"%");
			}
	
		}
		
		Page<TbTypeTemplate> page= (Page<TbTypeTemplate>)typeTemplateMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}

	@Override
	public List<Map> findSpecByTypeTemplateId(long typeTemplateId) {
		//查找当前模板对象
		TbTypeTemplate tbTypeTemplate = typeTemplateMapper.selectByPrimaryKey(typeTemplateId);
		//把规格字符串转化为json
		List<Map> mapList = JSONArray.parseArray(tbTypeTemplate.getSpecIds(), Map.class);
		mapList.forEach(each->{
			//查询规格选项列表
			TbSpecificationOptionExample optionExample = new TbSpecificationOptionExample();
			TbSpecificationOptionExample.Criteria criteria = optionExample.createCriteria();
			criteria.andSpecIdEqualTo(Long.valueOf(String.valueOf(each.get("id"))));
			List<TbSpecificationOption> tbSpecificationOptions = tbSpecificationOptionMapper.selectByExample(optionExample);
			each.put("options",tbSpecificationOptions);
		});

		return mapList;
	}

}
