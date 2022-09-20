package com.canton.utils;

import com.canton.dao.utils.DefaultOntModel;
import org.apache.jena.ontology.OntClass;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.util.iterator.ExtendedIterator;

import java.util.HashMap;

public class NameSpaceClassMapUtil {

	private static HashMap<String,String> nameSpaceClassMap = new HashMap<String,String>();

	static {

		OntModel ontModel = DefaultOntModel.getInstance().getOntModel();

		ExtendedIterator<OntClass> iter = ontModel.listHierarchyRootClasses();

		while(iter.hasNext()) {

			OntClass aClass = iter.next();

			nameSpaceClassMap.put(aClass.getNameSpace(), aClass.getLocalName());
			//System.out.println("nameplacemap"+nameSpaceClassMap.put(aClass.getNameSpace(), aClass.getLocalName()));
		}
	}

	public static String getClassName(String nameSpace) {

		return nameSpaceClassMap.get(nameSpace);
	}
}
