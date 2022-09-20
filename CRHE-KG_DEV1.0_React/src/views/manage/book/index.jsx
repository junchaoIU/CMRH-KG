import React, {Component} from "react";
import "./index.less"
import {Upload, message, Icon} from 'antd';
import TableComponent from "./table";
const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'http://39.101.193.14:2222/book/uploadMore',
    onChange(info) {
        const { response,status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (response === '上传成功') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error'){
            message.error(`${info.file.name} file upload failed,${info.file.response}`);
        }
    },
};


class Book extends Component {

  render() {
    return (
        <div className="upload-container">
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">单击或拖动文件到此区域以上载</p>
                <p className="ant-upload-hint">
                    支持单次或批量上传(仅支持txt格式文件)
                </p>
            </Dragger>
            <br/>
            <TableComponent/>
        </div>
    );
  }
}

export default Book;
