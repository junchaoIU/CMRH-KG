package com.canton.model.ontology;

import java.io.Serializable;

/**
 * 本体的实例对象。OntologyResource的子类。
 *  
 * @author Rosahen 
 * @version 1.0
 * @see OntologyResource
 */
public class OntologyInstance extends OntologyResource implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1938755903281768798L;
	/**
	 * 实例所属的本体类。
	 */
	private OntologyClass theClass;
	
	/** 
	 * 本体实例的构造方法。
	 * 
	 * @param theClass 实例所属的本体类。
	 */
	public OntologyInstance(OntologyClass theClass) {
		super();
		this.theClass = theClass;
	}
	
	/**
	 * 本体实例的构造方法。
	 * 
	 * @param localName 本体实例的本地名称。即不包括命名空间的URI。
	 * @param nameSpace 本体实例的命名空间。
	 * @param uri 本体实例的URI。URI=命名空间+本地名称。
	 * @param theClass 实例所属的本体类。
	 */
	public OntologyInstance(String localName, String nameSpace, String uri, OntologyClass theClass) {
		super(localName, nameSpace, uri);
		this.theClass = theClass;
	}


	public OntologyInstance() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OntologyClass getTheClass() {
		return theClass;
	}
	
	public void setTheClass(OntologyClass theClass) {
		this.theClass = theClass;
	}

}
