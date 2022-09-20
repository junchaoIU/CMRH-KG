import React from "react";
import "driver.js/dist/driver.min.css"; // import driver.js css
import { keywordList,attributekList } from "@/api/knowledgeSearch";
import "./index.less";
import catalogData from "./catalog"
import { Tree,Spin, Input } from 'antd';
const { Search } = Input;

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};


class TreeSearch extends React.Component{
    _isMounted = false;   // 这个变量是用来标志当前组件是否挂载
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        gData:[],
        dataList:[],
        rData:{"nodes":[],"links": []},
        nodesList:[],
        edgesList:[],
        cardData:[[],[],[],[]],
        loading:false
    };

    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchData = () => {
        const data = catalogData
        this.setState({gData:data})
        // fetch('http://39.101.193.14:2222/catalog.json'
        // )
        //     .then(response => response.json())//解析为Promise
        //     .then(data => {
        //
        //         this.setState({gData: data})  ////赋值到本地数据
        //         console.log(this.state.gData)
        //
        //     })

        // treeList().then((response) => {
        //              const gData = response.data;
        //              if (this._isMounted) {
        //                  this.setState({ gData });
        //              }
        //          });
    };

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onChange = e => {
        const { value } = e.target;
        const expandedKeys = this.state.dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, this.state.gData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };

    onSelect = (keys, event) => {
        this.props.parent.getSpinTrue()
        console.log('Trigger Select', keys, event);
        if(event.node.props.children.length === 0){
            keywordList(keys[0]).then((response) => {
                const nodesList = []
                const edgesList = []
                const comment = []
                const introduction = []
                const people = []
                const thing = []
                const rData = {"nodes":[],"links":[]}
                if (response.data) {
                    const data =response.data
                    data.nodes.forEach(function (node) {
                        rData.nodes.push(node)
                    })
                    if(data.links){
                        data.links.forEach(function (edge) {
                            edge.value = edge.label
                            rData.links.push(edge)
                        })
                        data.links.forEach(function (text) {
                            if (text.category === '相关事件') {
                                thing.push(text.target)
                            } else if(text.category === '相关遗存' || text.category === '事件地点' ||text.category === '地理位置'||text.category === '出生地点'||text.category === '签订地点'){
                                introduction.push(text.label + " " + text.target)
                            } else if(text.category === '开始时间'||text.category === '结束时间'||text.category === '出生日期'||text.category === '逝世日期'||text.category === '签订时间'){
                                introduction.push(text.label + " " + text.target.substr(1))
                            } else {
                                people.push(text.label + " " + text.target)
                            }

                        })
                    }
                }
                attributekList(keys[0]).then((res) => {
                    if (res.data) {
                        const data =res.data
                        if (nodesList.length!==0){
                            data.nodes.splice(0,2)
                        }else if(nodesList.length ===0) {
                            data.nodes.splice(1,1)
                        }
                        data.nodes.forEach(function (node) {
                            if(node.category=== "事件标识"){
                                rData.nodes.push(node)
                            }
                            if(node.category){
                                nodesList.push(node)
                            }
                        })
                        if(data.links){
                            data.links.forEach(function (text) {
                                if(text.category=== "事件标识"){
                                    text.value = text.label
                                    rData.links.push(text)
                                }
                                if(text.category === 'comment'){
                                    comment.push(text.source)
                                    comment.push(text.target)
                                }else
                                {
                                    introduction.push(text.label + " " + text.target)
                                }

                            })
                            data.links.splice(0,1)
                            data.links.forEach(function (edge) {
                                edge.id = edge.label
                                edge.value = edge.label
                                edgesList.push(edge)
                            })
                        }
                        const cardData=[]
                        cardData.push(comment,introduction,thing,people)
                        this.setState({rData,nodesList,edgesList,cardData});
                        console.log(rData,nodesList,edgesList,cardData)
                        this.props.parent.getChildrenMsg(rData,nodesList,edgesList,cardData)
                        this.props.parent.getSpinFalse()
                    }
                });
            });
        }
    };

    render(){
        const generateList = data => {
            for (let i = 0; i < data.length; i++) {
                const node = data[i];
                const { key } = node;
                this.state.dataList.push({ key, title: key });
                if (node.children) {
                    generateList(node.children);
                }
            }
        };
        generateList(this.state.gData);
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
              {beforeStr}
                            <span className="site-tree-search-value">{searchValue}</span>
                            {afterStr}
            </span>
                    ) : (
                        <span>{item.title}</span>
                    );
                if (item.children) {
                    return { title, key: item.key, children: loop(item.children) };
                }

                return {
                    title,
                    key: item.key,
                };
            });

        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                {this.state.gData.length>0?
                    <Tree
                        showLine
                        onExpand={this.onExpand}
                        onSelect={this.onSelect}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        treeData={loop(this.state.gData)}
                        style={{ height:650,overflow:"auto"}}
                    />:<div className="spin"><Spin tip="目录实体数量较多，请稍等..."/></div>
                }
            </div>
        );
    }
};

export default TreeSearch;
