import React from 'react';
import ReactMarkdown from 'react-markdown';
import md from './README.md';
import './github-markdown.css';
import { Card, Col, Row, Affix, Anchor, BackTop } from 'antd';
import gfm from 'remark-gfm';
import HeadingBlock from './components/HeadingBlock.jsx';
const { Link } = Anchor;
class ChangeLog extends React.PureComponent {
  state = {
    targetOffset: window.innerHeight / 2,
  };

  componentDidMount() {
    this.setState({
      targetOffset: window.innerHeight / 2,
    });
  }

  render() {
    const treeNavs = [];
    return (
      <Card bordered={false} style={{ margin: '24px' }}>
        <BackTop />
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown
          remarkPlugins={[gfm]}
          children={md}
          className="markdown-body"
          skipHtml={true}
          renderers={{
            heading: HeadingBlock,
          }}
        />
        {/*<Col span={4}>
          <Anchor affix={true} style={{zIndex:'111'}}>
            <Link href='/#/use#h1-anchor-id' title="Basic demo" />
            <Link href='/#/use#h1-anchor-id1' title="Static demo" />
            <Link href="#API" title="API">
              <Link href="#Anchor-Props" title="Anchor Props" />
              <Link href="#Link-Props" title="Link Props" />
            </Link>
          </Anchor>*/}
        {/* <Affix offsetTop={20}>
            <Anchor style={{width: 160}}>
              {
                treeNavs.map((item) => {
                  if (item.children) {
                    return (
                      <Link href={`#${item.nodeKey}`} title={item.value} key={item.nodeKey}>
                        {
                          item.children.map((childItem) => (
                            <Link href={`#${childItem.nodeKey}`} title={childItem.value} key={childItem.nodeKey}/>
                          ))
                        }
                      </Link>
                    )
                  } else {
                    return (
                      <Link href={`#${item.nodeKey}`} title={item.value} key={item.nodeKey}/>
                    )
                  }
                })
              }
            </Anchor>
          </Affix>*/}
        {/* </Col>*/}
      </Card>
    );
  }
}

export default ChangeLog;
