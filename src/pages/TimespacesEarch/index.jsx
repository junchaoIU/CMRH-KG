import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import Search from './components/Search';
import { SearchOutlined, HourglassOutlined } from '@ant-design/icons';
import MainSearch from '@/components/MainSearch';

class timespacesEarch extends Component {
  state = {
    val: true,
    value1: '',
    value2: '',
    mode: 'time',
  };

  handleModeChange = (value) => {
    this.setState({
      mode: value,
      value1: '',
      value2: '',
    });
  };

  valueChange = (e) => {
    this.setState({
      value1: e.target.value,
    });
  };
  valueChange1 = (e) => {
    this.setState({
      value2: e.target.value,
    });
  };
  search = () => {
    this.setState({
      val: false,
    });
  };

  render() {
    const { val, value1, value2, mode } = this.state;
    return (
      <PageContainer>
        {val === true ? (
          <div className={styles.indexSearch}>
            <MainSearch
              logo={<HourglassOutlined />}
              text={'时空·检索'}
              engText={'TimeSpaces Retrieval'}
            />
            <div className={styles.search}>
              <div className={styles.content}>
                <Select size={'large'} value={mode} onChange={this.handleModeChange}>
                  <Select.Option value="time">时间点</Select.Option>
                  <Select.Option value="times">时间段</Select.Option>
                  <Select.Option value="space">地点</Select.Option>
                  <Select.Option value="timespace">时空</Select.Option>
                </Select>
                {mode === 'time' ? (
                  <div>
                    <Input
                      onChange={this.valueChange}
                      size={'large'}
                      style={{ width: 400 }}
                      value={this.state.value1}
                      placeholder="请检索需要查询的时空实体,例如：1911年4月"
                    />
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      size={'large'}
                      onClick={this.search}
                    >
                      时空检索
                    </Button>
                  </div>
                ) : mode === 'times' ? (
                  <div>
                    <Input
                      onChange={this.valueChange}
                      value={this.state.value1}
                      size={'large'}
                      style={{ width: 150 }}
                      placeholder="例如：1940年"
                    />
                    &nbsp;&nbsp;~&nbsp;&nbsp;
                    <Input
                      onChange={this.valueChange1}
                      value={this.state.value2}
                      size={'large'}
                      style={{ width: 150 }}
                      placeholder="例如：1941年"
                    />
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      size={'large'}
                      onClick={this.search}
                    >
                      时空检索
                    </Button>
                  </div>
                ) : mode === 'space' ? (
                  <div>
                    <Input
                      onChange={this.valueChange}
                      size={'large'}
                      value={this.state.value1}
                      style={{ width: 400 }}
                      placeholder="请检索需要查询的时空实体,例如：广州"
                    />
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      size={'large'}
                      onClick={this.search}
                    >
                      时空检索
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Input
                      onChange={this.valueChange}
                      size={'large'}
                      value={this.state.value1}
                      style={{ width: 220, marginRight: '5px' }}
                      placeholder="时间点：(例如：1911年4月)"
                    />
                    <Input
                      onChange={this.valueChange1}
                      value={this.state.value2}
                      size={'large'}
                      style={{ width: 220 }}
                      placeholder="地点：(例如：广州)"
                    />
                    <Button
                      type="primary"
                      size={'large'}
                      icon={<SearchOutlined />}
                      onClick={this.search}
                    >
                      时空检索
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Search parentValue1={value1} parentValue2={value2} mode={mode} />
        )}
      </PageContainer>
    );
  }
}
export default timespacesEarch;
