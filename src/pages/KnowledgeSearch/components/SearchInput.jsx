import React, { PureComponent } from 'react';
import catalogData from '@/pages/KnowledgeSearch/components/catalog';
import { Cascader, Button } from 'antd';

class SearchInput extends PureComponent {
  filter = (inputValue, path) => {
    this.props.onChange(inputValue);
    return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  clear = () => {
    this.props.onChange([]);
    return true;
  };

  displayRender(label) {
    return label[label.length - 1];
  }
  render() {
    const { className, searchValue, onChange, search } = this.props;
    return (
      <div>
        <Cascader
          allowClear={this.clear}
          className={className}
          options={catalogData}
          onChange={onChange}
          placeholder="请选择或输入检索的知识点"
          displayRender={this.displayRender}
          size="large"
          showSearch={{ filter: this.filter, matchInputWidth: false }}
          value={searchValue}
        />
        <Button type="primary" size={'large'} onClick={search}>
          检索一下
        </Button>
      </div>
    );
  }
}

export default SearchInput;
