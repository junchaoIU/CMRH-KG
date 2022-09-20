import React, { PureComponent } from 'react';
import { Input, Button } from 'antd';
import styles from '../index.less';
import { SwapOutlined } from '@ant-design/icons';
class SearchInput extends PureComponent {
  render() {
    const { search, onChange, onChange1, subject, object } = this.props;
    return (
      <div>
        <Input.Group compact>
          <Input
            style={{ marginRight: '3px' }}
            className={styles.input}
            size={'large'}
            value={object}
            placeholder="试一试输入孙中山检索一下~"
            allowClear
            onChange={onChange}
          />
          <SwapOutlined className={styles.icon} />
          <Input
            style={{ marginLeft: '3px' }}
            className={styles.input}
            size={'large'}
            value={subject}
            placeholder="试一试输入宋庆龄检索一下~"
            allowClear
            onChange={onChange1}
          />
          <Button type="primary" className={styles.button} size={'large'} onClick={search}>
            检索一下
          </Button>
        </Input.Group>
      </div>
    );
  }
}

export default SearchInput;
