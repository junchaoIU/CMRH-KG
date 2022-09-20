package com.canton.model.ontology;

import java.io.Serializable;

/**
 * 本体的三元组对象。
 *  
 * @author Rosahen
 * @version 1.0 
 */
public class Statement implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6570094052594038686L;

	/**
	 * 三元组的主语。
	 */
	private String subject;
	
	/**
	 * 三元组主语所属的类名。
	 */
	private String subjectClassName;
	
	/**
	 * 三元组的谓语。
	 */
	private String predicate;
	
	/**
	 * 三元组谓语所属的类名。
	 */
	private String predicateClassName;
	
	/**
	 * 三元组的宾语。
	 */
	private String object;
	
	/**
	 * 三元组宾语所属的类名。
	 */
	private String objectClassName = "null";
	
	/**
	 * 三元组所属的Graph名称。
	 */
	private String namedGraph;
	
	
	public Statement() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * 三元组的构造方法。
	 * 
	 * @param subject 三元组的主语。
	 * @param predicate 三元组的谓语。
	 * @param object 三元组的宾语。
	 * @param namedGraph 三元组所属的Graph。
	 */
	public Statement(String subject, String predicate, String object, String namedGraph) {
		super();
		this.subject = subject;
		this.predicate = predicate;
		this.object = object;
		this.namedGraph = namedGraph;
	}
	
	/**
	 * 三元组的构造方法。
	 * 
	 * @param subject 三元组的主语。
	 * @param predicate 三元组的谓语。
	 * @param object 三元组的宾语。
	 */
	public Statement(String subject, String predicate, String object) {
		super();
		this.subject = subject;
		this.predicate = predicate;
		this.object = object;
	}


	public String getSubject() {
		return subject;
	}
	
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	public String getPredicate() {
		return predicate;
	}
	
	public void setPredicate(String predicate) {
		this.predicate = predicate;
	}
	
	public String getObject() {
		return object;
	}
	
	public void setObject(String object) {
		this.object = object;
	}
	
	public String getNamedGraph() {
		return namedGraph;
	}
	
	public void setNamedGraph(String namedGraph) {
		this.namedGraph = namedGraph;
	}

	public String getSubjectClassName() {
		return subjectClassName;
	}

	public void setSubjectClassName(String subjectClassName) {
		this.subjectClassName = subjectClassName;
	}

	public String getPredicateClassName() {
		return predicateClassName;
	}

	public void setPredicateClassName(String predicateClassName) {
		this.predicateClassName = predicateClassName;
	}

	public String getObjectClassName() {
		return objectClassName;
	}

	public void setObjectClassName(String objectClassName) {
		this.objectClassName = objectClassName;
	}

	@Override
	public String toString() {
		return "Statement [subject=" + subject + ", subjectClassName=" + subjectClassName + ", predicate=" + predicate
				+ ", predicateClassName=" + predicateClassName + ", object=" + object + ", objectClassName="
				+ objectClassName + ", namedGraph=" + namedGraph + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((namedGraph == null) ? 0 : namedGraph.hashCode());
		result = prime * result + ((object == null) ? 0 : object.hashCode());
		result = prime * result + ((objectClassName == null) ? 0 : objectClassName.hashCode());
		result = prime * result + ((predicate == null) ? 0 : predicate.hashCode());
		result = prime * result + ((predicateClassName == null) ? 0 : predicateClassName.hashCode());
		result = prime * result + ((subject == null) ? 0 : subject.hashCode());
		result = prime * result + ((subjectClassName == null) ? 0 : subjectClassName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Statement other = (Statement) obj;
		if (namedGraph == null) {
			if (other.namedGraph != null)
				return false;
		} else if (!namedGraph.equals(other.namedGraph))
			return false;
		if (object == null) {
			if (other.object != null)
				return false;
		} else if (!object.equals(other.object))
			return false;
		if (objectClassName == null) {
			if (other.objectClassName != null)
				return false;
		} else if (!objectClassName.equals(other.objectClassName))
			return false;
		if (predicate == null) {
			if (other.predicate != null)
				return false;
		} else if (!predicate.equals(other.predicate))
			return false;
		if (predicateClassName == null) {
			if (other.predicateClassName != null)
				return false;
		} else if (!predicateClassName.equals(other.predicateClassName))
			return false;
		if (subject == null) {
			if (other.subject != null)
				return false;
		} else if (!subject.equals(other.subject))
			return false;
		if (subjectClassName == null) {
			if (other.subjectClassName != null)
				return false;
		} else if (!subjectClassName.equals(other.subjectClassName))
			return false;
		return true;
	}
	
	
}
