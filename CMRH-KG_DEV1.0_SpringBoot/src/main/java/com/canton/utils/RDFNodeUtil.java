package com.canton.utils;

import org.apache.jena.rdf.model.RDFNode;

/**
 * RDFNode的工具类。提供一些将RDFNode对象数据转成字符串格式数据的方法。
 *  
 * @author Rosahen
 * @version 1.0
 */
public class RDFNodeUtil {

	private RDFNodeUtil() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 获取某个RDFNode对象的本地名称。
	 * 
	 * @param node RDFNode对象。
	 * @return RDFNode对象对应的本地名。
	 */
	public static String getRDFNodeLocalName(RDFNode node) {
		
		String localName = null;

		if (node == null){return "未知";}
		if(node.isLiteral()) {
			
			localName = node.asLiteral().getString();

			
			if(!localName.contains(".owl")) return node.asLiteral().getString();
			
		}else {
			
			localName = node.asResource().getLocalName();
			
			if(!localName.contains(".owl")) return node.asResource().getLocalName();
		}
		
		return null;
		
	}
}
