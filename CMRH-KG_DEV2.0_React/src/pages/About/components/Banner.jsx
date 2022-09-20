import React, { Component } from 'react';
import './bannerList.less';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;

class banner extends Component {

  render() {

    return (
      <BannerAnim prefixCls="banner-user" autoPlay>
        <Element
          prefixCls="banner-user-elem"
          key="0"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              backgroundImage: `url(https://www.bnuz.edu.cn/images/xx.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
            Canton Knowledge Graph Development Team
          </TweenOne>
          <TweenOne className="banner-user-text"
                    animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
            @Beijing Normal University,Zhuhai
          </TweenOne>
        </Element>
        <Element
          prefixCls="banner-user-elem"
          key="1"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              backgroundImage: `url(https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
            中国近代革命历史知识图谱开发团队
          </TweenOne>
          <TweenOne className="banner-user-text"
                    animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
            北京师范大学.珠海
          </TweenOne>
        </Element>
      </BannerAnim>
    );
  }
}
export default banner;
