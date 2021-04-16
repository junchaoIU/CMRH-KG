import React from 'react';
import MarkDown from 'react-markdown';
import md from './README.md';
import 'github-markdown-css';
import 'github-markdown-css/github-markdown.css';
import { Card, Form } from 'antd';
import HeadingBlock from './components/HeadingBlock';
class ChangeLog extends React.PureComponent {
  render() {
    return (
      <Card bordered={false}>
        <MarkDown
          source={md}
          className="markdown-body"
          escapeHtml={true}
          renderers={{
            heading: HeadingBlock,
          }}
        />
      </Card>
    );
  }
}

export default ChangeLog;
