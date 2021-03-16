import styles from '@/pages/KnowledgeSearch/index.less';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Tabs,
  Avatar,
  message,
  Checkbox,
  Divider,
  Tag,
  Empty,
  Card,
  Button,
  Spin,
  Drawer,
} from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';

const Emptying = (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={<span>暂无数据</span>}
  ></Empty>
);
@connect(({ knowledge, loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))
class information extends PureComponent {
  state = {
    visible: false,
    drawer: [],
  };

  showDrawer = (e) => {
    const drawerData = this.props.substance[e.currentTarget.value];
    this.setState({
      drawer: drawerData,
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  // 实体语料回溯
  onSubstance = () => {
    const tip = this.props.substance.length > 0 ? this.props.substance[0].num : '';
    return (
      <div>
        {this.props.substance.length > 0 ? (
          <div className={styles.substanceDiv}>
            <Card size="small" title={tip}>
              {this.props.substance.map((item, index) => {
                return (
                  <Card hoverable key={index}>
                    <div className={styles.bookImage}>
                      <img
                        style={{ height: '100px' }}
                        src={`http://gzknowledge.cn:2222/book/${item.bookName}${item.bookAuthor}.png`}
                      />
                    </div>
                    <p>{item.bookName}</p>
                    <p>简介</p>
                    <Button type={'primary'} value={index} onClick={this.showDrawer}>
                      查看详情
                    </Button>
                  </Card>
                );
              })}
            </Card>
          </div>
        ) : (
          Emptying
        )}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" className={styles.outCard}>
          <Tabs.TabPane tab="实体语料回溯" key="2">
            {this.onSubstance()}
          </Tabs.TabPane>
        </Tabs>
        <Drawer
          title={this.state.drawer.bookName}
          placement="left"
          closable={false}
          width={'50%'}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p
            style={{ letterSpacing: '1px' }}
            dangerouslySetInnerHTML={{ __html: this.state.drawer.bookContent }}
          />
        </Drawer>
      </div>
    );
  }
}

export default information;
