package com.canton.dao.entity;

import java.util.Objects;

/**
 * @Auther ChenX
 * @Date 2020.8.7
 **/
public class EchartsLink {
  private String source;
  private String target;
  private String category;
  private String label;
  private String symbol;

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof EchartsLink)) return false;
		EchartsLink that = (EchartsLink) o;
		return Objects.equals(source, that.source) &&
				Objects.equals(target, that.target) &&
				Objects.equals(category, that.category) &&
				Objects.equals(label, that.label) &&
				Objects.equals(symbol, that.symbol);
	}

	@Override
	public int hashCode() {
		return Objects.hash(source, target, category, label, symbol);
	}
}
