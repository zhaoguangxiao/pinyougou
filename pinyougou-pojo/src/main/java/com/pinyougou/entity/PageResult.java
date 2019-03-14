package com.pinyougou.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * @ClassName:  PageResult   
 * @Description:TODO(分页返回结果集实体类)   
 * @author: zgx
 * @date:   2018年7月24日 下午9:55:30     
 * @Copyright: 2018 www.tydic.com Inc. All rights reserved.
 */
public class PageResult implements Serializable{
	private long total; 
	private List data;
	
	
	
	public PageResult(long total, List data) {
		super();
		this.total = total;
		this.data = data;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List getData() {
		return data;
	}

	public void setData(List data) {
		this.data = data;
	}
}
