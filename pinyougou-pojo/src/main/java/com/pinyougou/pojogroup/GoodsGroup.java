package com.pinyougou.pojogroup;

import com.pinyougou.pojo.TbGoods;
import com.pinyougou.pojo.TbGoodsDesc;
import com.pinyougou.pojo.TbItem;
import com.pinyougou.pojo.TbItemCat;

import java.io.Serializable;
import java.util.List;

/**
 * 商品组合实体类
 * @author 晓电脑
 */
public class GoodsGroup implements Serializable{

    /**
     * 未审核
     */
    public static final String GOODS_UNAUDITED="0";

    /**
     * spu 商品实体
     */
    private TbGoods tbGoods;


    /**
     * spu 商品拓展实体
     */
    private TbGoodsDesc tbGoodsDesc;


    /**
     * sku 商品属性
     */
    private List<TbItem> itemCatList;

    public TbGoods getTbGoods() {
        return tbGoods;
    }

    public void setTbGoods(TbGoods tbGoods) {
        this.tbGoods = tbGoods;
    }

    public TbGoodsDesc getTbGoodsDesc() {
        return tbGoodsDesc;
    }

    public void setTbGoodsDesc(TbGoodsDesc tbGoodsDesc) {
        this.tbGoodsDesc = tbGoodsDesc;
    }

    public List<TbItem> getItemCatList() {
        return itemCatList;
    }

    public void setItemCatList(List<TbItem> itemCatList) {
        this.itemCatList = itemCatList;
    }
}
