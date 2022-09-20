package com.canton.model.ontology;

import java.io.Serializable;
import java.util.Collection;

/**
 * 本体的类对象。OntologyResource的子类。
 *   
 * @author Rosahen
 * @version 1.0
 * @see OntologyResource
 */
public class OntologyClass extends OntologyResource implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2915359325139608843L;

	/**
	 * 该本体类的父类。
	 */
	private OntologyClass superClass;
	
	/**
	 * 该本体类的子类集合。
	 */
	private Collection<OntologyClass> subClasses;
	
	/**
	 * 该本体类的实例集合。
	 */
	private Collection<OntologyInstance> instances;
	
	/**
	 * 标识是否有子类。
	 */
	private boolean hasSubClass;
	
	/**
	 * 标识是否有实例。
	 */
	private boolean hasInstance;
	
	
	/**
	 * 本体类的构造器。
	 */
	public OntologyClass() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * 本体类的构造器。
	 * 
	 * @param superClass 父类对象。
	 * @param subClasses 该类的子类对象集合。
	 * @param instances 该类的实例对象集合。
	 * @param hasSubClass 是否有子类。
	 * @param hasInstance 是否有实例。
	 */
	public OntologyClass(OntologyClass superClass, Collection<OntologyClass> subClasses,
			Collection<OntologyInstance> instances, boolean hasSubClass, boolean hasInstance) {
		super();
		this.superClass = superClass;
		this.subClasses = subClasses;
		this.instances = instances;
		this.hasSubClass = hasSubClass;
		this.hasInstance = hasInstance;
	}

	/**
	 * 本体类的构造器。
	 * 
	 * @param localName 本体类的本地名称。即不包括命名空间的URI。
	 * @param nameSpace 本体类的命名空间。
	 * @param uri 本体类的URI。URI=命名空间+本地名称。
	 * @param superClass 父类对象。
	 * @param subClasses 该类的子类对象集合。
	 * @param instances 该类的实例对象集合。
	 * @param hasSubClass 是否有子类。
	 * @param hasInstance 是否有实例。
	 */
	public OntologyClass(String localName, String nameSpace, String uri, OntologyClass superClass, Collection<OntologyClass> subClasses,
			Collection<OntologyInstance> instances, boolean hasSubClass, boolean hasInstance) {
		super(localName, nameSpace, uri);
		this.superClass = superClass;
		this.subClasses = subClasses;
		this.instances = instances;
		this.hasSubClass = hasSubClass;
		this.hasInstance = hasInstance;
	}

	public OntologyClass getSuperClass() {
		return superClass;
	}


	public void setSuperClass(OntologyClass superClass) {
		this.superClass = superClass;
	}


	public Collection<OntologyClass> getSubClasses() {
		return subClasses;
	}


	public void setSubClasses(Collection<OntologyClass> subClasses) {
		this.subClasses = subClasses;
	}


	public Collection<OntologyInstance> getInstances() {
		return instances;
	}


	public void setInstances(Collection<OntologyInstance> instances) {
		this.instances = instances;
	}


	public boolean isHasSubClass() {
		return hasSubClass;
	}


	public void setHasSubClass(boolean hasSubClass) {
		this.hasSubClass = hasSubClass;
	}


	public boolean isHasInstance() {
		return hasInstance;
	}


	public void setHasInstance(boolean hasInstance) {
		this.hasInstance = hasInstance;
	}

}
