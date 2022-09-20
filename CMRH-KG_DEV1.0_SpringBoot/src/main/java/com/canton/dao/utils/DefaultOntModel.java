package com.canton.dao.utils;

import org.apache.jena.ontology.OntModel;

/**
 * 默认的本体模型 单例 用于替换原系统的xwork
 * @author panzejia
 *
 */
public class DefaultOntModel {
	private DefaultOntModel() {}
	
	private OntModel ontModel;
	
	private static class HolderClass {
		private static final DefaultOntModel defaultOntModel = new DefaultOntModel();
	}
	
	public static DefaultOntModel getInstance() {
		return HolderClass.defaultOntModel;
	}

	public OntModel getOntModel() {
		return ontModel;
	}

	public void setOntModel(OntModel ontModel) {
		this.ontModel = ontModel;
	}
	
	
}
