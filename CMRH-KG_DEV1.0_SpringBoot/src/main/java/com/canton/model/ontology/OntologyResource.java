package com.canton.model.ontology;

import java.io.Serializable;

/**
 * 本体资源对象。本体的所有数据被视为资源。
 *  
 * @author Rosahen 
 * @version 1.0
 */
public class OntologyResource implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3647125354367368924L;

	/**
	 * 本体资源的本地名称。即不包括命名空间的URI。
	 */
	private String localName;
	
	/**
	 * 本体资源的命名空间。
	 */
	private String nameSpace;
	
	/**
	 * 本体资源的URI。URI=命名空间+本地名称。
	 */
	private String uri;

	/**
	 * 本体资源的构造器。
	 * 
	 * @param localName 本体资源的本地名称。即不包括命名空间的URI。
	 * @param nameSpace 本体资源的命名空间。
	 * @param uri 本体资源的URI。URI=命名空间+本地名称。
	 */
	public OntologyResource(String localName, String nameSpace, String uri) {
		super();
		this.localName = localName;
		this.nameSpace = nameSpace;
		this.uri = uri;
	}

	
	public OntologyResource() {
		super();
		// TODO Auto-generated constructor stub
	}


	public String getLocalName() {
		return localName;
	}

	public void setLocalName(String localName) {
		this.localName = localName;
	}

	public String getNameSpace() {
		return nameSpace;
	}

	public void setNameSpace(String nameSpace) {
		this.nameSpace = nameSpace;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

}
