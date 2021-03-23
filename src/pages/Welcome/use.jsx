import React from 'react';
import Markdown from 'react-markdown';
import md from './README.md';
import 'github-markdown-css';
import 'github-markdown-css/github-markdown.css';
import { Card, Form } from 'antd';
import HeadingBlock from './components/HeadingBlock.jsx';
class ChangeLog extends React.PureComponent {
  render() {
    return (
      <Card bordered={false}>
        <Markdown
          source={md}
          className="markdown-body"
          escapeHtml={false}
          renderers={{
            heading: HeadingBlock,
          }}
        />
      </Card>
    );
  }
}

export default ChangeLog;
