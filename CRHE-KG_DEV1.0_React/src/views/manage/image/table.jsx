import React, { Component } from "react";
import "./index.less";
import {
  Table,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  message,
} from "antd";
import { tableList, deleteImage} from "@/api/table";
const { Column } = Table;
const { Panel } = Collapse;

class TableComponent extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      title: "",
    },
    title:"",

    editModalVisible: false,
    editModalLoading: false,
    currentRowData: {
      id: 0,
      author: "",
      time: "",
      title: ""
    }
  };
  fetchData = () => {
    this.setState({ loading: true });
    tableList(this.state.title).then((response) => {
      console.log(response)
      this.setState({ loading: false });
      const list = response.data
      if (this._isMounted) {
        console.log(list)
        this.setState({ list });
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  filterTitleChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      title:value,
    }));
  };
  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber: 1,
          pageSize,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  handleDelete = (row) => {
    deleteImage(row.id).then(res => {
      if(res.data === "true"){
        message.success("删除成功")
      }
      this.fetchData();
    })
  }

  handleSearch = (row) => {
      this.props.history.push({pathname:'/statistic',query:{id:row.id,title:row.title}})
  }


  handleCancel = _ => {
    this.setState({
      editModalVisible: false,
    });
  };
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="标题:">
                <Input onChange={this.filterTitleChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <div className="panel-container">
          <div className="card-panel">
            <Table
              bordered
              rowKey={(record) => record.id}
              dataSource={this.state.list}
              loading={this.state.loading}
              pagination={false}
            >
              <Column title="ID" dataIndex="id" key="id" width={200} align="center"/>
              <Column title="标题" dataIndex="title" key="title" width={200} align="center"/>
              <Column title="操作" key="action" width={195} align="center"render={(text, row) => (
                <span>
                  <Button type="primary" shape="circle" icon="delete" title="删除" onClick={this.handleDelete.bind(null,row)}/>
                </span>
              )}/>
            </Table>
          </div>
        </div>
        <br />
        <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={true}
        />
      </div>
    );
  }
}

export default TableComponent;
