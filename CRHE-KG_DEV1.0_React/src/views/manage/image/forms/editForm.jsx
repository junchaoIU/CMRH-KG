import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
class EditForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
    } = this.props;
    const { getFieldDecorator } = form;
    const {  author, time, title } = currentRowData;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="编辑"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="标题:">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入标题!" }],
              initialValue: title,
            })(<Input placeholder="标题" />)}
          </Form.Item>
          <Form.Item label="作者:">
            {getFieldDecorator("author", {
              rules: [{ required: true, message: "请输入作者!" }],
              initialValue: author,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="时间:">
            {getFieldDecorator("time", {
              rules: [{ required: true, message: '请输入时间!' }],
              initialValue: time
            })(<Input disabled />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditForm" })(EditForm);
