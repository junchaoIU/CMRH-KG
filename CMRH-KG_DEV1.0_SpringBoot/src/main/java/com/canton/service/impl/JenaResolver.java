package com.canton.service.impl;

import com.canton.dao.utils.DefaultOntModel;
import com.canton.model.ontology.*;
import com.canton.service.OntologyResolver;
import com.canton.utils.*;
import org.apache.jena.ontology.*;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.tdb.TDBFactory;
import org.apache.jena.util.iterator.ExtendedIterator;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * 基于Jena的本体解析类。
 *
 */
@Component(value="ontologyResolver")
public class JenaResolver implements OntologyResolver {

	public Collection<Statement> query(String sparqlStr) {
		System.out.println(sparqlStr);

		// TODO Auto-generated method stub

		Dataset dataset = getDataset();


		String defaultModelURI = InitializedUtil.getMyUri()+InitializedUtil.getMyRoot();

		Model model = dataset.getNamedModel(defaultModelURI);
		Query query = QueryFactory.create(sparqlStr);

		QueryExecution qe = QueryExecutionFactory.create(query, model);

		ResultSet results = qe.execSelect();
		// ResultSetFormatter.out(System.out, results);

		List<String> vars = query.getResultVars();

		Collection<Statement> statements = new ArrayList<Statement>();
		while (results.hasNext()) {

			QuerySolution solution = results.nextSolution();

            RDFNode subject = solution.get(vars.get(0));

            RDFNode predicate = solution.get(vars.get(1));
            RDFNode object = solution.get(vars.get(2));

			if (!subject.isAnon() || !predicate.isAnon() || !object.isAnon()) {

				Statement statement = new Statement();

				statement.setSubject(RDFNodeUtil.getRDFNodeLocalName(subject));
				statement.setPredicate(RDFNodeUtil.getRDFNodeLocalName(predicate));
				statement.setObject(RDFNodeUtil.getRDFNodeLocalName(object));
					if (subject!=null&&subject.isResource())
						statement.setSubjectClassName(
								NameSpaceClassMapUtil.getClassName(subject.asResource().getNameSpace()));

					if (predicate!=null&&predicate.isResource())
						statement.setPredicateClassName(
								NameSpaceClassMapUtil.getClassName(predicate.asResource().getNameSpace()));

					if (object!=null&&object.isResource())
						statement.setObjectClassName(
								NameSpaceClassMapUtil.getClassName(object.asResource().getNameSpace()));

					if (statement.getSubject() != null || statement.getObject() != null || !statements.contains(statement))
						statements.add(statement);

			}
		}

		return statements;
	}

	@Override
	public Collection<Clearance> Fquery(String sparqlStr) {
		System.out.println(sparqlStr);

		// TODO Auto-generated method stub

		Dataset dataset = getDataset();


		String defaultModelURI = InitializedUtil.getMyUri()+InitializedUtil.getMyRoot();

		Model model = dataset.getNamedModel(defaultModelURI);
		Query query = QueryFactory.create(sparqlStr);

		QueryExecution qe = QueryExecutionFactory.create(query, model);

		ResultSet results = qe.execSelect();
		//ResultSetFormatter.out(System.out, results);

		List<String> vars = query.getResultVars();

		Collection<Clearance> clearances = new ArrayList<Clearance>();
		while (results.hasNext()) {

			QuerySolution solution = results.nextSolution();

			RDFNode subject = solution.get(vars.get(0));
			RDFNode predicate = solution.get(vars.get(1));
			RDFNode object = solution.get(vars.get(2));
			RDFNode subject2 = solution.get(vars.get(3));

			if (!subject.isAnon() || !predicate.isAnon() || !object.isAnon()|| !subject2.isAnon()) {

				Clearance clearance = new Clearance();

				clearance.setSubject(RDFNodeUtil.getRDFNodeLocalName(subject));
				clearance.setPredicate(RDFNodeUtil.getRDFNodeLocalName(predicate));
				clearance.setObject(RDFNodeUtil.getRDFNodeLocalName(object));
				clearance.setSubject2(RDFNodeUtil.getRDFNodeLocalName(subject2));
				if (subject!=null&&subject.isResource())
					clearance.setSubjectClassName(
							NameSpaceClassMapUtil.getClassName(subject.asResource().getNameSpace()));

				if (predicate!=null&&predicate.isResource())
					clearance.setPredicateClassName(
							NameSpaceClassMapUtil.getClassName(predicate.asResource().getNameSpace()));

				if (object!=null&&object.isResource())
					clearance.setObjectClassName(
							NameSpaceClassMapUtil.getClassName(object.asResource().getNameSpace()));

				if (subject2!=null&&subject2.isResource())
					clearance.setObjectClassName(
							NameSpaceClassMapUtil.getClassName(subject2.asResource().getNameSpace()));

				if (clearance.getSubject() != null || clearance.getObject() != null || !clearances.contains(clearance))
					clearances.add(clearance);

			}
		}

		return clearances;
	}


	public Collection<String> getOntologyPredicates() {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		ExtendedIterator<OntProperty> iter = ontModel.listAllOntProperties();

		Collection<String> predicates = new ArrayList<String>();

		while (iter.hasNext()) {

			OntProperty property = iter.next();
			predicates.add(property.getLocalName());
		}

		return predicates;
	}

	public Collection<Statement> queryByPage(int pageNum, int pageSize, String sparqlStr) {
		// TODO Auto-generated method stub

		Collection<Statement> statements = query(sparqlStr);

		Collection<Statement> results = new ArrayList<Statement>();

		int start_index = 0;
		int stop_index = 0;

		if (statements.size() < pageSize) {
			stop_index = statements.size();
		} else {
			start_index = (pageNum - 1) * pageSize;
			stop_index = pageNum * pageSize;

			if (stop_index > statements.size()) {
				stop_index = statements.size();
			}
		}
		for (int i = start_index; i < stop_index; i++) {
			results.add(((ArrayList<Statement>) statements).get(i));
		}
		System.out.println(results);
		return results;
	}


	public Collection<Statement> getAllStatements() {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		StmtIterator iter = ontModel.listStatements();

		Collection<Statement> statements = new ArrayList<Statement>();

		while (iter.hasNext()) {

			org.apache.jena.rdf.model.Statement stmt = iter.next();

			Resource subject = stmt.getSubject();
			Resource predicate = stmt.getPredicate();
			RDFNode object = stmt.getObject();
			Statement statement = new Statement();

			statement.setSubject(subject.getLocalName());
			statement.setSubjectClassName(getClassName(subject.getLocalName()));
			statement.setPredicate(predicate.getLocalName());
			statement.setPredicateClassName(getClassName(predicate.getLocalName()));

			if (!object.isLiteral()) {

				statement.setObject(object.toString());
			} else {
				statement.setObject(object.asResource().getLocalName());
				statement.setObjectClassName(getClassName(object.asResource().getLocalName()));
			}

			statements.add(statement);
		}

		return statements;
	}


	public int countAllStatements() {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		int count = 0;

		StmtIterator iter = ontModel.listStatements();

		while (iter.hasNext()) {

			iter.next();

			count++;
		}

		return count;
	}


	public Collection<OntologyClass> getTopClasses() {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();
		// 获取顶层类的迭代器
		ExtendedIterator<OntClass> iter = ontModel.listHierarchyRootClasses();
		// 创建本体类对象集合
		Collection<OntologyClass> classes = new ArrayList<OntologyClass>();

		// 遍历顶层类
		while (iter.hasNext()) {

			OntClass aClass = iter.next();

			// 判断是否为匿名节点
			if (!aClass.isAnon()) {

				// 创建本体类对象
				OntologyClass ontClass = new OntologyClass();

				// 设置类名
				ontClass.setLocalName(aClass.getLocalName());

				// 设置URI
				ontClass.setUri(aClass.getURI());

				// 设置命名空间
				ontClass.setNameSpace(aClass.getNameSpace());

				// 判断是否有子节点
				if (aClass.hasSubClass())
					ontClass.setHasSubClass(true);

				// 判断是否有实例
				if (aClass.listInstances().hasNext())
					ontClass.setHasInstance(true);

				// 将本体类添加到本体类集合中
				classes.add(ontClass);
			}
		}

		return classes;
	}


	public Collection<OntologyClass> getSubClasses(OntologyClass ontologyClass) {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		// 获取类名
		String className = ontologyClass.getLocalName();

		// 获取URI集合
		Set<String> uris = ontModel.listImportedOntologyURIs(true);
		// 创建子类集合
		Collection<OntologyClass> subClasses = new ArrayList<OntologyClass>();

		Iterator<String> iter = uris.iterator();

		OntClass theClass = null;

		// 遍历URI集合
		while (iter.hasNext()) {

			String uri = iter.next();

			// 尝试通过URI+#+类名获取OntClass对象
			theClass = ontModel.getOntClass(uri + "#" + className);

			// 如果存在该类名对应的OntClass对象，则退出循环
			if (theClass != null)
				break;
		}

		if (theClass != null) {

			// 列出该本体类的所有子类
			ExtendedIterator<OntClass> classIter = theClass.listSubClasses();

			// 遍历子类集合
			while (classIter.hasNext()) {

				OntClass aClass = classIter.next();

				// 判断是否为匿名节点
				if (!aClass.isAnon()) {

					// 为该子类创建本体类对象
					OntologyClass subClass = new OntologyClass();

					// 设置类名
					subClass.setLocalName(aClass.getLocalName());

					// 设置命名空间
					subClass.setNameSpace(aClass.getNameSpace());

					// 设置URI
					subClass.setUri(aClass.getURI());

					// 判断该子类是否有子类
					if (aClass.hasSubClass())
						subClass.setHasSubClass(true);

					// 判断该子类是否有实例
					if (aClass.listInstances().hasNext())
						subClass.setHasInstance(true);

					// 将该子类添加到子类集合中
					subClasses.add(subClass);
				}
			}
		}
		return subClasses;
	}


	public OntologyClass getDirectSuperClass(OntologyResource ontologyResource) {
		// TODO Auto-generated method stub

		return getDirectSuperClass(ontologyResource.getUri());

	}


	public OntologyClass getDirectSuperClass(String uri) {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		OntClass ontClass = ontModel.getOntClass(uri);

		OntClass superClass = null;

		if (ontClass != null)
			superClass = ontClass.getSuperClass();
		else
			superClass = ontModel.getIndividual(uri).getOntClass();

		if (superClass != null) {

			OntologyClass superOntClass = new OntologyClass();

			superOntClass.setHasInstance(superClass.listInstances().hasNext());
			superOntClass.setHasSubClass(true);
			superOntClass.setInstances(getInstances(superOntClass));
			superOntClass.setLocalName(superClass.getLocalName());
			superOntClass.setNameSpace(superClass.getNameSpace());
			superOntClass.setSuperClass(null);
			superOntClass.setSubClasses(getSubClasses(superOntClass));
			superOntClass.setUri(superClass.getURI());

			return superOntClass;
		}

		return null;
	}


	public OntologyClass getTopSuperClass(OntologyResource ontologyResource) {
		// TODO Auto-generated method stub

		return getTopSuperClass(ontologyResource.getNameSpace());
	}


	public OntologyClass getTopSuperClass(String nameSpace) {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		ExtendedIterator<OntClass> iter = ontModel.listHierarchyRootClasses();

		while (iter.hasNext()) {

			OntClass aClass = iter.next();

			if (!aClass.isAnon() && aClass.getNameSpace().equals(nameSpace)) {

				OntologyClass theClass = new OntologyClass();

				theClass.setHasInstance(true);
				theClass.setLocalName(aClass.getLocalName());
				theClass.setNameSpace(aClass.getNameSpace());
				theClass.setUri(aClass.getURI());
				theClass.setInstances(getInstances(theClass));
				theClass.setSuperClass(null);

				Collection<OntologyClass> subClasses = getSubClasses(theClass);
				theClass.setSubClasses(subClasses);
				theClass.setHasSubClass(subClasses.size() > 0);

				return theClass;
			}
		}

		return null;
	}


	public Collection<OntologyInstance> getInstances(OntologyClass ontologyClass) {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		// 获取类名
		String className = ontologyClass.getLocalName();

		// 获取URI集合
		Set<String> uris = ontModel.listImportedOntologyURIs(true);

		// 创建本体实例对象集合
		Collection<OntologyInstance> instances = new ArrayList<OntologyInstance>();

		Iterator<String> iter = uris.iterator();

		OntClass theClass = null;

		// 遍历URI集合
		while (iter.hasNext()) {

			String uri = iter.next();

			// 尝试通过URI+#+类名获取OntClass对象
			theClass = ontModel.getOntClass(uri + "#" + className);

			// 如果存在该类名对应的OntClass对象，则退出循环
			if (theClass != null)
				break;
		}

		if (theClass != null) {

			// 列出该本体类的所有子类
			ExtendedIterator<? extends OntResource> instanceIter = theClass.listInstances();
			// 遍历子类集合
			while (instanceIter.hasNext()) {

				OntResource instance = instanceIter.next();

				// 判断是否为匿名节点
				if (!instance.isAnon()) {

					// 为该实例创建本体实例对象
					OntologyInstance anInstance = new OntologyInstance(ontologyClass);

					// 设置实例名称
					anInstance.setLocalName(instance.getLocalName());

					// 设置URI
					anInstance.setUri(instance.getURI());

					// 设置命名空间
					anInstance.setNameSpace(instance.getNameSpace());

					// 添加到本体实例集合中
					instances.add(anInstance);
				}
			}
		}

		return instances;
	}


	public OntologyResource getResource(String URI) {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		// 尝试从模型中获取URI对应的资源
		Resource resource = ontModel.getResource(URI);

		OntologyResource ontResource = null;

		// 假如有对应的资源
		if (resource != null) {

			// 创建OntologyResource对象
			ontResource = new OntologyResource();

			// 设置本地名称
			ontResource.setLocalName(resource.getLocalName());

			// 设置命名空间
			ontResource.setNameSpace(resource.getNameSpace());

			// 设置URI
			ontResource.setUri(resource.getURI());
		}

		return ontResource;
	}


	public String getURI(String localName) {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		// 获取模型中的所有资源个体
		ExtendedIterator<Individual> iter = ontModel.listIndividuals();

		String uri = "";

		// 遍历所有资源个体
		while (iter.hasNext()) {

			Individual individual = iter.next();

			// 获取该资源个体的URI
			uri = individual.getURI();

			// 获取该资源个体的本地名称
			String aLocalName = individual.getLocalName();

			// 如果该资源个体的本地名称和指定的本地名称相同,返回该资源个体的URI
			if (aLocalName.equals(localName))
				return uri;
		}

		return uri;
	}


	public String getNameSpace(String localName) {
		// TODO Auto-generated method stub

		OntModel ontModel = getDefaultOntModel();

		String nameSpace = "";

		String aLocalName = "";

		ExtendedIterator<OntClass> classIter = ontModel.listNamedClasses();

		while (classIter.hasNext()) {

			OntClass aClass = classIter.next();

			nameSpace = aClass.getNameSpace();

			aLocalName = aClass.getLocalName();

			if (aLocalName.equals(localName))
				return nameSpace;
		}

		// 获取模型中的所有资源个体
		ExtendedIterator<Individual> individualIter = ontModel.listIndividuals();

		// 遍历所有资源个体
		while (individualIter.hasNext()) {

			Individual individual = individualIter.next();

			// 获取该资源个体的NameSpace
			nameSpace = individual.getNameSpace();

			// 获取该资源个体的本地名称
			aLocalName = individual.getLocalName();

			// 如果该资源个体的本地名称和指定的本地名称相同,返回该资源个体的NameSpace
			if (aLocalName.equals(localName))
				return nameSpace;
		}

		return "";
	}


	public String getClassName(String localName) {
		// TODO Auto-generated method stub

		String nameSpace = getNameSpace(localName);

		OntologyClass theClass = getTopSuperClass(nameSpace);

		if (theClass != null)
			return theClass.getLocalName();
		else
			return "";
	}

	private OntModel getDefaultOntModel() {
		return DefaultOntModel.getInstance().getOntModel();
	}

	private Dataset getDataset() {

		//获取Dataset的路径
		String datasetPath = ClassPathUtil.getClassPath()+"/canton_culture_tdb";

		Dataset dataset = TDBFactory.createDataset(datasetPath);

		return dataset;
	}

}
