import React from "react";
import { connect } from "react-redux";
import Content from "./Content";
import Header from "./Header";
import RightPanel from "./RightPanel";
import { Layout } from "antd";
const {Footer} = Layout;

const Main = (props) => {
  return (
    // <Layout style={{ minHeight: "100vh" }}>
    //   <Sider />
    //   <Layout>
    //     <Header />
    //     {tagsView ? <TagsView /> : null}
    //     <Content />
    //     <RightPanel />
    //   </Layout>
    // </Layout>
      <div>
          <Layout>
              <Header/>
              {/*路由标签*/}
              {/*{tagsView ? <TagsView /> : null}*/}
              <Content>Content</Content>
              <RightPanel />
          </Layout>
          <Footer style={{ padding:0,textAlign: 'center',backgroundColor:"#fff",margin:0 }}>
                Copyright©2020 北京师范大学珠海分校管理学院 版权所有 <a href="http://beian.miit.gov.cn/">粤ICP备2020089302号-1</a>
                <p>图片文献资料仅供科研使用，如有侵权请联系Tel:15018262322或者邮箱:wujunchaoIU@outlook.com进行删除</p>
          </Footer>
      </div>
  );
};
export default connect((state) => state.settings)(Main);
