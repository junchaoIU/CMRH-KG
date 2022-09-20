package com.canton.dao.entity;


import java.util.Collection;
import java.util.Set;

/**
 * Echarts力向图的数据对象。
 * 
 * @author Rosahen
 * @version 1.0 
 */
public class EchartsData {

	/**
	 * 节点集合
	 */
	private Set<EchartsNode> nodes;
	
	/**
	 * 边集合
	 */
	private Set<EchartsLink> links;

	public Set<EchartsNode> getNodes() {
		return nodes;
	}

	public void setNodes(Set<EchartsNode> nodes) {
		this.nodes = nodes;
	}

	public Set<EchartsLink> getLinks() {
		return links;
	}

	public void setLinks(Set<EchartsLink> links) {
		this.links = links;
	}
}
