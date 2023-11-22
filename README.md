# CMRH-KG: China's Modern Revolution History Knowledge Graph Information System
[![license](https://img.shields.io/crates/l/rustc-serialize)](https://github.com/junchaoIU/Canton-KG-React/blob/main/LICENSE) 
[![react](https://img.shields.io/badge/react-17.0.0-yellowgreen)](https://github.com/facebook/react) 
[![antd](https://img.shields.io/badge/antd-4.9.4-orange)](https://github.com/ant-design/ant-design) 
[![echart](https://img.shields.io/badge/echart-5.0.0-green)](https://github.com/apache/echarts)

<div align=center><img src="https://www.wujunchao.top/wp-content/uploads/2022/03/CMRH-KG.png"/></div>
</p>
PS: 由于多种原因，CMRH-KG项目暂时不挂载于https://www.gzknowledge.cn ，系统Demo转至：http://8.135.49.164:7878 ，且Demo部分接口暂时无法访问，望悉知。

---

> The development and maintenance of the project takes a lot of time. If my project is helpful to you, if you are interested in my project, please give me a star, thank you! （项目的开发和维护需要花费较多的时间，如果我的项目对你有帮助，如果你对我的项目感兴趣,请帮我点个 ⭐star，谢谢！）🍉

## 🌈 Introduction（简介）

**<big>CMRH-KG： 中国近代革命历史知识图谱信息系统</big>**

Since entering the 21st century, the state has made great efforts in the protection of revolutionary historical documents and the restoration of documents in the Republic of China. Substantial achievements have been gradually achieved in the protection of existing precious historical documents. On this basis, how to effectively The development of such a huge historical archives resource is the next problem to be solved urgently.

自步入 21 世纪以来，国家在革命历史文献保护和民国时期文献修复等方面做出了巨大的努力，现有的珍贵历史文献资源保护已逐渐取得实质性成果，在此基础之上，如何有效开发如此庞大的历史档案文献资源是下一个亟待解决的问题。

This system proposes to design the knowledge graph of modern Chinese revolution history by taking the archives and literature resources of modern Chinese revolution as a breakthrough point. Based on rule statistics and machine learning methods, triple extraction and automatic construction of knowledge graph are carried out, so as to realize the importance of document resources from informatization to knowledge. Relying on the encyclopedia platform to supplement and improve knowledge information, realize the rapid discovery, aggregation and reasoning of massive knowledge, and provide rich and effective information on the history of modern Chinese revolution, such as knowledge retrieval, knowledge visualization, spatiotemporal retrieval, spatiotemporal evolution and knowledge question-answering service.

本系统提出以中国近代革命档案文献资源为突破口，设计中国近代革命历史知识图谱，基于规则统计和机器学习方法进行三元组抽取和知识图谱自动化构建，实现文献资源由信息化到知识化的重构开发，依托于百科平台进行知识信息的补充完善，实现海量知识的快速发现、聚合和推理，并提供知识检索、知识可视化、时空检索、时空演化和知识问答等丰富而有效的中国近代革命历史知识服务。

This system is implemented by the SpringBoot + React technology stack with the front and back ends separated. The system is currently online, see: https://www.gzknowledge.cn, and We will continue to maintain and develop the design and development of v3.0. Thank you for your attention to CRHE-KG.

本系统采用前后端分离的 SpringBoot + React 技术栈实现，目前系统已上线，详见：https://www.gzknowledge.cn ，且会继续维护并正在进行 v3.0 的设计开发，感谢对 CRHE-KG 的关注。

## ✨ Interface Function（接口功能）

- 知识检索（Knowledge Retrieval）
- 关系检索（Relational Retrieval）
- 时空检索（Spatio-temporal Information）
- 知识演化（Knowledge Evolution）
- 语料检索（Corpus Retrieval）
- 知识抽取（Knowledge Extraction）
- 知识问答（Knowledge Base Question Answering）

## 🖥 Compatible Environment（兼容环境）

- Modern browsers and IE11（现代浏览器和 IE11）
- Support server-side visual rendering（支持服务端可视化渲染）

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Electron |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📦 Table（目录）
包含如下三个项目，具体的部署方法可以查看各个项目里的具体README.md

```shell
|-- CMRH-KG
    |-- CMRH-KG_DEV1.0_SpringBoot   基于JAVA的SPRINGBOOT后端项目（由 CHEN, XIN 和 WU, JUNCHAO 负责完成）
    |-- CMRH-KG_DEV2.0_React        基于JS的REACT前端项目V2.0（由 CHEN, JIAXUAN 和 WU, JUNCHAO 负责完成）
    |-- CRHE-KG_DEV1.0_React        基于JS的REACT前端项目V1.0（由 WU, JUNCHAO 主要负责完成）
    |-- README.md
```

## 🌸 About Author（关于作者）

- [WU, JUNCHAO](https://github.com/junchaoIU)
- [CHEN, XIN](https://github.com/Chen-X666)
- [CHEN, JIAXUAN](https://github.com/00Jane)

如遇到问题，请致邮（Email）：wujunchaoIU@outlook.com

## 📕 Paper Citation（论文引用）

If you reference or use the results of this project in your research, please cite in the following format:

如果你在研究过程中参考或用到了本项目的成果，请按以下格式引用:

```
Wu, J., Jiang, Y., Chen, X., Guo, L., Wei, X., & Yang, X. (2021, January). " The Canton Canon" Digital Library Based on Knowledge Graph-Taking the Revolutionary Archives of Canton in the Republic of China as an Example. In 2021 10th International Conference on Educational and Information Technology (ICEIT) (pp. 171-179). IEEE.
```

## 🍉 其他相关项目
1. 📚 protegeAuto_tool（面向 Protege 的开源 Python 包）

- https://github.com/junchaoIU/protegeAuto_tool


## ⭐ Star History
[![Star History Chart](https://api.star-history.com/svg?repos=junchaoIU/CMRH-KG&type=Date)](https://star-history.com/#junchaoIU/CMRH-KG&Date)

