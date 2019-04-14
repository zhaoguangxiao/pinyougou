package com.pinyougou.sellergoods.service;

import com.pinyougou.entity.PageResult;
import com.pinyougou.pojo.TbGoods;
import com.pinyougou.pojogroup.GoodsGroup;

import java.util.List;

/**
 * 服务层接口
 *
 * @author Administrator
 */
public interface GoodsService {

    /**
     * 返回全部列表
     *
     * @return
     */
    public List<TbGoods> findAll();


    /**
     * 返回分页列表
     *
     * @return
     */
    public PageResult findPage(int pageNum, int pageSize);


    /**
     * 增加
     */
    public void add(GoodsGroup goods);


    /**
     * 修改
     */
    public void update(GoodsGroup goods);


    /**
     * 根据ID获取实体
     *
     * @param id
     * @return
     */
    public GoodsGroup findOne(Long id);


    /**
     * 批量删除
     *
     * @param ids
     */
    public void delete(Long[] ids);

    /**
     * 分页
     *
     * @param pageNum  当前页 码
     * @param pageSize 每页记录数
     * @return
     */
    public PageResult findPage(TbGoods goods, int pageNum, int pageSize);


    /**
     * 更新商品状态
     *
     * @param ids
     * @param status
     */
    public void updateGoodsByStatus(Long[] ids, String status);


    /**
     * 更新上下架状态
     * @param ids
     * @param status
     */
    public void updateGoodsMarketableById(Long[] ids, String status);

}
