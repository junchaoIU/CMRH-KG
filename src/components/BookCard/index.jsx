import styles from './index.less';
import React, { PureComponent } from 'react';
import minEmpty from '@/components/Empty/minEmpty';
import { Row, Col, Card, Button, Spin, Drawer } from 'antd';

// 实体语料关联
class BookCard extends PureComponent {
  state = {
    visible: false,
    drawer: [],
  };

  showDrawer = (e) => {
    const { substance } = this.props;
    const drawerData = substance[e.currentTarget.value];
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

  render() {
    const { loading, substance, show, showDrawer, colSpan } = this.props;
    const { visible, drawer } = this.state;
    const tip = substance.length > 0 ? substance[0].num : '';
    return (
      <div>
        <Spin spinning={loading}>
          {substance.length > 0 ? (
            <div className={styles.substanceDiv}>
              <Card size="small" title={tip}>
                <Row gutter={24}>
                  {substance.map((item, index) => {
                    return (
                      <Col span={colSpan} key={index}>
                        <Card hoverable>
                          <div className={styles.bookImage}>
                            <img
                              style={{ height: '100px' }}
                              src={`http://image.gzknowledge.cn/book/${item.bookName}${item.bookAuthor}.png`}
                            />
                          </div>
                          <p>{item.bookName}</p>
                          <p>简介</p>
                          <Button
                            type={'primary'}
                            value={index}
                            onClick={showDrawer || this.showDrawer}
                          >
                            查看详情
                          </Button>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card>
            </div>
          ) : (
            minEmpty
          )}
        </Spin>
        {show === true ? (
          <Drawer
            title={drawer.bookName}
            placement="left"
            closable={false}
            width={'50%'}
            onClose={this.onClose}
            visible={visible}
          >
            <p
              style={{ letterSpacing: '1px' }}
              dangerouslySetInnerHTML={{ __html: drawer.bookContent }}
            />
          </Drawer>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default BookCard;
