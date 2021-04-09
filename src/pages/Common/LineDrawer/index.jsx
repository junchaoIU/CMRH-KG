import React, { PureComponent } from 'react';
import BookCard from '@/components/BookCard';
import { Drawer } from 'antd';

class LineDrawer extends PureComponent {
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
    const { loading, substance, cardVisible, onCloseBack, style, width } = this.props;
    const { drawer, visible } = this.state;
    return (
      <div>
        <Drawer
          title="事件语料回溯"
          placement="right"
          closable={false}
          width={width || '80%'}
          onClose={onCloseBack}
          visible={cardVisible}
          getContainer={false}
          style={style}
        >
          <BookCard
            colSpan={24}
            loading={loading}
            substance={substance}
            show={false}
            showDrawer={this.showDrawer}
          />
        </Drawer>
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
      </div>
    );
  }
}

export default LineDrawer;
