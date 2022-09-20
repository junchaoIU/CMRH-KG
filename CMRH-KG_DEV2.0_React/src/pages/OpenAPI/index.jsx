import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from "@/pages/OpenAPI/index.less";
import MainSearch from "@/components/MainSearch";
import {CommentOutlined} from "@ant-design/icons";
import CloudSyncOutlined from "@ant-design/icons/lib/icons/CloudSyncOutlined";

class openApi extends Component {
  render() {
    return (
      <PageContainer >
        <div className={styles.indexSearch}>
          <MainSearch
            logo={<CloudSyncOutlined />}
            text={'开放API·服务'}
            engText={'OpenAPI.Service'}
          />
          <div>
            <h1>Introduction to OpenAPIs</h1>
            <p>CantonKG以REST API的方式对外提供服务。一站式解决您的知识检索需求。</p>
            <p>APIswagger2文档地址为:http://gzknowledge.cn/swagger-ui.html#</p>
            <p>API包括目前本平台所提供的所有知识服务，支持任何编程语言调用</p>
            <p>Canton KG Dvelopment Team 拥有对API数据格式的随时修改权力，所以请不要构建依赖于本平台提供的API的应用</p>
            <p>由于服务器规模较小，长时间调用请致邮说明，我们会根据需求来进行服务器的跟进升级，否则您的IP可能会被本平台disabled掉</p>
          </div>
        </div>
      </PageContainer>
    );
  }
}
export default openApi;
