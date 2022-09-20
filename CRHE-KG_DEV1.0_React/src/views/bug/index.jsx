import React, { Component } from "react";
import { connect } from "react-redux";
import {Comment, Avatar, Form, Button, List, Input} from "antd";
import { commentList,commentAdd } from "@/api/comment";
import TypingCard from "@/components/TypingCard";
import moment from 'moment';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

class Bug extends Component {
    state = {
        comments: [
        ],
        submitting: false,
        value: '',
    };

    componentDidMount() {
        commentList().then((response) => {
            const comments = response.data
            this.setState({comments})
        })
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        const author = 'BNUZ'
        const avatar = 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2365737568,3160743175&fm=26&gp=0.jpg'
        const content = this.state.value
        //存储
        commentAdd(author,avatar,content)
        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'BNUZ',
                        avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1615873983,11197073&fm=26&gp=0.jpg',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

      render() {
          console.log(this.state.comments)
        const cardContent = `此页面用来发布更新日志以及收集异常信息，大家可以发表自己发现的bug或者改进措施于此页面，我们的管理员会根据大家的意见进行处理。（测试阶段会将此路由提前！）`;
          const { comments, submitting, value } = this.state;
        return (
          <div className="app-container">
            <TypingCard title="Bug收集" source={cardContent} />
            <br />
              {comments.length > 0 && <CommentList comments={comments} />}
              <Comment
                  avatar={
                      <Avatar
                          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1615873983,11197073&fm=26&gp=0.jpg"
                          alt="Han Solo"
                      />
                  }
                  content={
                      <Editor
                          onChange={this.handleChange}
                          onSubmit={this.handleSubmit}
                          submitting={submitting}
                          value={value}
                      />
                  }
              />
          </div>
        );
      }
}

export default connect((state) => state.monitor)(Bug);
