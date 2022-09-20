package com.canton.dao.entity;


import java.util.Objects;

/**
 * @Auther ChenX
 * @Date 2020.8.7
 **/
public class EchartsNode {
  private String id;
  private String label;
  private String category;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof EchartsNode)) return false;
		EchartsNode that = (EchartsNode) o;
		return Objects.equals(id, that.id) &&
				Objects.equals(label, that.label) &&
				Objects.equals(category, that.category);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, label, category);
	}
}
