package com.pinyougou.mapper;

import com.pinyougou.pojo.TbSpecificationOption;
import com.pinyougou.pojo.TbSpecificationOptionExample;
import java.util.List;

import com.pinyougou.pojogroup.Specification;
import org.apache.ibatis.annotations.Param;

public interface TbSpecificationOptionMapper {
    int countByExample(TbSpecificationOptionExample example);

    int deleteByExample(TbSpecificationOptionExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbSpecificationOption record);

    int insertSelective(TbSpecificationOption record);

    List<TbSpecificationOption> selectByExample(TbSpecificationOptionExample example);

    TbSpecificationOption selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbSpecificationOption record, @Param("example") TbSpecificationOptionExample example);

    int updateByExample(@Param("record") TbSpecificationOption record, @Param("example") TbSpecificationOptionExample example);

    int updateByPrimaryKeySelective(TbSpecificationOption record);

    int updateByPrimaryKey(TbSpecificationOption record);

    //通过规格id查找多个
    List<TbSpecificationOption> selectAllSpecificationOptionBySpecId(@Param("uidpk") Long uidpk);
}