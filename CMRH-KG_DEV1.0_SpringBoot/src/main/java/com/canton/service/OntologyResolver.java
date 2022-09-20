package com.canton.service;

import com.canton.model.ontology.*;

import java.util.Collection;


/**
 * 本体解析器接口。对外提供一些本体的基本解析操作，用户统一调用此接口对本体进行操作。
 *  
 * @author Rosahen
 * @version 1.0
 */
public interface OntologyResolver { 

	/**
	 * 本体检索方法。
	 * 
	 * @param sparqlStr sparql检索语句字符串。检索语句的检索字段要求包括主语、谓语和宾语。
	 * @return 检索结果的三元组对象集合。
	 */
	Collection<Statement> query(String sparqlStr);

	Collection<Clearance> Fquery(String sparqlStr);

	

	/**
	 * 获取本体所有谓语的方法。
	 * 
	 * @return 本体库中的所有谓语。
	 */
	Collection<String> getOntologyPredicates();
	
	
	/**
	 * 获取本体库中所有三元组的方法。
	 * 
	 * @return 本体库中所有三元组对象的集合。
	 */
	//Collection<Statement> getAllStatements();
	
	/**
	 * 分页检索的方法。
	 * 
	 * @param pageNum 第几页。
	 * @param pageSize 每页的三元组数目。
	 * @param sparqlStr sparql检索语句字符串。
	 * @return 检索结果的三元组集合。
	 */
	Collection<Statement> queryByPage(int pageNum, int pageSize, String sparqlStr);

	
	/**
	 * 获取本体库中的顶层类的方法。
	 * 
	 * @return 本体顶层的类对象集合。
	 */
	Collection<OntologyClass> getTopClasses();
	
	/**
	 * 获取某个本体类的子类的方法。
	 * 
	 * @param ontologyClass 本体类对象。
	 * @return 子类对象集合。
	 */
	Collection<OntologyClass> getSubClasses(OntologyClass ontologyClass);
	
	
	/**
	 * 获取某个本体资源所属的直接父类的方法。
	 * 
	 * @param ontologyResource 本体资源对象。
	 * @return 本体资源所属的直接父类对象。
	 */
	OntologyClass getDirectSuperClass(OntologyResource ontologyResource);
	
	/**
	 * 获取某个本体资源URI所属的直接父类的方法。
	 * 
	 * @param uri 本体资源的URI。
	 * @return URI对应的直接父类对象。
	 */
	OntologyClass getDirectSuperClass(String uri);
	
	/**
	 * 获取某个本体资源所属的顶层本体类对象。
	 * 
	 * @param ontologyResource 本体资源对象。
	 * @return 该资源所属的本体类对象。
	 */
	OntologyClass getTopSuperClass(OntologyResource ontologyResource);
	
	/**
	 * 获取某个本体资源命名空间所属的顶层本体类对象。
	 * 
	 * @param nameSpace 本体资源的命名空间。
	 * @return 该命名空间所属的顶层本体类对象。
	 */
	OntologyClass getTopSuperClass(String nameSpace);

	
	/**
	 * 获取某个本体类的实例的方法。
	 * 
	 * @param ontologyClass 本体类对象。
	 * @return 父类对象。
	 */
	Collection<OntologyInstance> getInstances(OntologyClass ontologyClass);
	
	/**
	 * 通过URI获取OntologyResource对象。
	 * 
	 * @param URI 本体资源的URI。
	 * @return URI对应的本体资源对象。
	 */
	OntologyResource getResource(String URI);
	
	/**
	 * 通过本地名称获取对应资源的URI。
	 * 
	 * @param localName 本地名称。
	 * @return 本地名称对应资源的URI。
	 */
	String getURI(String localName);
	
	/**
	 * 通过本地名称获取对应资源的NameSpace。
	 * 
	 * @param localName 本地名称。
	 * @return 本地名称对应资源的NameSpace。
	 */
	String getNameSpace(String localName);
	
	/**
	 * 通过本地名称获取它所属的类名。
	 * 
	 * @param localName 本地名称。
	 * @return 本地名称所属的类名。
	 */
	String getClassName(String localName);

}
