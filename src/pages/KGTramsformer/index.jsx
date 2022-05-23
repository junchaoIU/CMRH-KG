import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from "@/pages/KGTramsformer/index.less";
import MainSearch from "@/components/MainSearch";
import {UngroupOutlined, InboxOutlined} from "@ant-design/icons";
import {Button, Input, Upload, message, Radio} from "antd";
const { Dragger } = Upload;
import Search from "@/pages/KGTramsformer/components/Search";
const { TextArea } = Input;

class kgTramsformer extends Component {
  state = {
    val: true,
    searchValue: '',
    modeValue:'input'
  };

  search = () => {
    this.setState({
      val: false,
    });
  };

  modeOnChange = e => {
    this.setState({
      modeValue: e.target.value,
    });
  };

  onChange = (e) => {
    let entityValue = e.target.value
    this.setState({
      searchValue: entityValue,
    });
  };


  render() {
    const txtResponse = value => {
      this.setState({searchValue: value})
    }
    const { val, searchValue } = this.state;
    const props = {
      name: 'file',
      multiple: true,
      action: 'http://localhost:2525/bookKG/fileUpload',
      onChange(info) {
        if (info.file.response !== "error"){
          txtResponse(info.file.response)
        }
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
    };

    return (
      <PageContainer>
        {val === true ? (
          <div className={styles.indexSearch}>
            <MainSearch
              logo={<UngroupOutlined />}
              text={'文献语料·知识抽取'}
              engText={'Literature Corpus·Knowledge Extraction'}
            />
            <Radio.Group defaultValue="input" buttonStyle="solid" onChange={this.modeOnChange}>
              <Radio.Button value="input">输入语料</Radio.Button>
              <Radio.Button value="upload">上传语料</Radio.Button>
            </Radio.Group>
            <br/><br/>
            {this.state.modeValue === "input"?
              <TextArea rows={6} style={{width: 800, height: 200, margin: "auto"}}
                        placeholder={'请输入想要进行知识抽取的语料文本'}
                        allowClear
                        onChange={this.onChange}/>:
              <Dragger {...props} style={{width: 800, height: 400, margin: "auto"}}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  目前只支持单文件上传，以最新上传的文件为准，文件格式要求txt~ 上传单个文件后点击“开始知识抽取”按钮即可
                </p>
              </Dragger>}
            <br/>
            <Button type="primary" className={styles.button} size={'large'} onClick={this.search}>
              开始知识抽取
            </Button>
          </div>
        ) : (
          <Search parentSearch={searchValue} />
        )}

      </PageContainer>
    );
  }
}
export default kgTramsformer;
