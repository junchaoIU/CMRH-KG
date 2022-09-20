# CRHE-KG: Canton Revolutionary Historical Event Knowledge Graph Information System

![](https://www.wujunchao.top/wp-content/uploads/2021/05/图片1.png)
[![license](https://img.shields.io/crates/l/rustc-serialize)](https://github.com/junchaoIU/Canton-KG-React/blob/main/LICENSE)
[![react](https://img.shields.io/badge/react-16.13.1-yellowgreen)](https://github.com/facebook/react)
[![antd](https://img.shields.io/badge/antd-3.17.0-orange)](https://github.com/ant-design/ant-design)
[![echart](https://img.shields.io/badge/echart-4.7.0-green)](https://github.com/apache/echarts)

---
> The development and maintenance of the project takes a lot of time. If my project is helpful to you, if you are interested in my project, please give me a star, thank you!
> （项目的开发和维护需要花费较多的时间，如果我的项目对你有帮助，如果你对我的项目感兴趣,请帮我点个⭐star，谢谢！）🍉

## 🌈 Introduction（简介）
**<big>CRHE-KG： 广州革命历史事件知识图谱信息系统前端DEV1.0_React</big>**

Since entering the 21st century, the state has made great efforts in the protection of revolutionary historical documents and the restoration of documents in the Republic of China. Substantial achievements have been gradually achieved in the protection of existing precious historical documents. On this basis, how to effectively The development of such a huge historical archives resource is the next problem to be solved urgently.

自步入21世纪以来，国家在革命历史文献保护和民国时期文献修复等方面做出了巨大的努力，现有的珍贵历史文献资源保护已逐渐取得实质性成果，在此基础之上，如何有效开发如此庞大的历史档案文献资源是下一个亟待解决的问题。

This system proposes to design the knowledge graph of modern Chinese revolution history by taking the archives and literature resources of modern Chinese revolution as a breakthrough point. Based on rule statistics and machine learning methods, triple extraction and automatic construction of knowledge graph are carried out, so as to realize the importance of document resources from informatization to knowledge. Relying on the encyclopedia platform to supplement and improve knowledge information, realize the rapid discovery, aggregation and reasoning of massive knowledge, and provide rich and effective information on the history of modern Chinese revolution, such as knowledge retrieval, knowledge visualization, spatiotemporal retrieval, spatiotemporal evolution and knowledge question-answering service.

本系统提出以中国近代革命档案文献资源为突破口，设计中国近代革命历史知识图谱，基于规则统计和机器学习方法进行三元组抽取和知识图谱自动化构建，实现文献资源由信息化到知识化的重构开发，依托于百科平台进行知识信息的补充完善，实现海量知识的快速发现、聚合和推理，并提供知识检索、知识可视化、时空检索、时空演化和知识问答等丰富而有效的中国近代革命历史知识服务。

This system is implemented by the SpringBoot + React technology stack separated from the front and back ends. The current project is the front-end V1.0 version of the system, which is implemented using the React technology framework. At present, the project has been refactored to the V2.0 version (https://www.gzknowledge.cn), see: https://github.com/junchaoIU/CantonKG_DEV2.0_React. Relatively speaking, the V1.0 version is more complicated, but some visualization functions are relatively innovative. The functional ideas of V2.0 are also based on the recurrence and innovation of V1.0. The V1.0 version has no longer updated new functions, and is only used for code maintenance and optimization for industry exchanges.

本系统采用前后端分离的 SpringBoot + React 技术栈实现，当前项目为系统的前端V1.0版本，采用React技术框架实现，目前该项目已重构至 V2.0版本（https://www.gzknowledge.cn），详见：https://github.com/junchaoIU/CantonKG_DEV2.0_React 。相对来说 V1.0版本较为复杂，但部分可视化功能是较为创新的,V2.0的功能思路也是基于V1.0复现及创新的。V1.0 版本已不再更新新功能，仅作代码维护和优化，供业界交流。

## ✨ Interface Function（接口功能）
- 知识检索（Knowledge Retrieval）
- 关系检索（Relational Retrieval）
- 时空检索（Spatio-temporal Information）
- 知识演化（Knowledge Evolution）
- 语料检索（Corpus Retrieval）

## 🖥 Compatible Environment（兼容环境）
- Modern browsers and IE11（现代浏览器和 IE11）
- Support server-side visual rendering（支持服务端可视化渲染）

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Electron |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE11, Edge                                                   | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

## ⚙ Directory Structure（目录结构）
```bash
├─ public                     # 静态资源
│   ├─ logo.ico               # logo图标
│   └─ index.html             # html模板
├─ src                        # 项目源代码
│   ├─ api                    # 所有请求
│   ├─ assets                 # 图片 字体等静态资源
│   ├─ components             # 全局公用组件
│   ├─ config                 # 全局配置
│   │   ├─ menuConfig.js      # 导航菜单配置
│   │   └─ routeMap.js        # 路由配置
│   ├─ lib                    # 第三方库按需加载
│   ├─ mock                   # 项目mock 模拟数据
│   ├─ store                  # 全局 store管理
│   ├─ styles                 # 全局样式
│   ├─ utils                  # 全局公用方法
│   ├─ views                  # views 所有页面
│   ├─ App.js                 # 入口页面
│   ├─ defaultSettings.js     # 全局默认配置
│   └─index.js                # 源码入口
├── .env.development          # 开发环境变量配置
├── .env.production           # 生产环境变量配置
├── config-overrides.js       # 对cra的webpack自定义配置
├── deploy.sh                 # CI部署脚本
├── .travis.yml               # 自动化CI配置
└── package.json              # package.json
```

## 📦 Install（安装）
```shell
# 克隆项目
git clone https://github.com/junchaoIU/CRHE-KG_DEV1.0_React.git

# 进入项目目录
cd CRHE-KG_DEV1.0_React

# 安装依赖（不要用cnpm）
npm install

# 切换淘宝源，解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm start
```

## 🌸 About Author（关于作者）
[WU, JUNCHAO](https://github.com/junchaoIU)

个人博客（Blog）：[春天与爱情の樱花🌸](https://www.wujunchao.top)

如遇到问题，请致邮（Email）：wujunchaoIU@outlook.com

## 📕 Paper Citation（论文引用）
If you reference or use the results of this project in your research, please cite in the following format:

如果你在研究过程中参考或用到了本项目的成果，请按以下格式引用:
```
J. Wu, Y. Jiang, X. Chen, et al. "The Canton Canon" Digital Library Based on Knowledge Graph - Taking the Revolutionary Archives of Canton in the Republic of China as an Example. [C]// 2021 10th International Conference on Educational and Information Technology (ICEIT), IEEE, 2021: 171-179.
```

## ❗ Statement（声明）
- 本系统已登记软著，可供参考及实验借鉴，或者自己部署玩玩
- 本项目不可做商业用途，或者直接套用系统作为课题科研成果

## 🍉 其他相关项目

1. 📚 CMRH-KG 中国革命历史知识图谱数字图书馆前端v2.0
- https://github.com/junchaoIU/CMRH-KG_DEV2.0_React
2. 📚 CMRH-KG 中国近代革命历史知识图谱数字图书馆后端V1.0
- https://github.com/Chen-X666/CMRH-KG_DEV1.0_SpringBoot
3. 📚 protegeAuto_tool（面向Protege的开源Python包）
- https://github.com/junchaoIU/protegeAuto_tool




