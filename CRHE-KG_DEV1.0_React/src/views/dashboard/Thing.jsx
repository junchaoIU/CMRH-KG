import React,{Component} from "react";
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import Icon from 'antd/lib/icon';

const textData = [
    // {
    //     content: '年代：1928年\n' +
    //         '\n' +
    //         '类型：陶器\n' +
    //         '\n' +
    //         '质地：陶\n' +
    //         '\n' +
    //         '尺寸：口径7.2厘米，腹径12厘米，底径8厘米，高10厘米\n' +
    //         '\n' +
    //         '来源：征集购买\n' +
    //         '\n' ,
    //     title: '1928年红二师战士用过的陶罐',
    // },
        {
        content: '年代：1925年\n' +
            '\n' +
            '类型：金属制品\n' +
            '\n' +
            '质地：铜\n' +
            '\n' +
            '尺寸：直径5厘米，通长6.8厘米，厚2厘米\n' +
            '\n' +
            '来源：接受捐赠' ,
        title: '1925年黄埔军校教官王声聪用过的怀表',
    },{
        content: '年代：1944年11月\n' +
            '\n' +
            '类型：1\n' +
            '\n' +
            '质地：银\n' +
            '\n' +
            '尺寸：纵1.8厘米，横1.8厘米，高2.2厘米；指环宽0.4\n' +
            '\n' +
            '来源：拨交' ,
        title: '1944年11月中山抗日义勇大队奖给有功人员的模范银戒指',
    },
    {
        content: '年代：1926年\n' +
            '\n' +
            '类型：1\n' +
            '\n' +
            '质地：纸\n' +
            '\n' +
            '尺寸：纵20.5厘米，横26厘米\n' +
            '\n' +
            '来源：拨交' ,
        title: '1926年《十月革命九周年纪念日告南雄民众书》',
    },
    {
        content: '年代：1926年\n' +
            '\n' +
            '类型：1\n' +
            '\n' +
            '质地：纸\n' +
            '\n' +
            '尺寸：纵17.5厘米，横24厘米\n' +
            '\n' +
            '来源：接受捐赠' ,
        title: '1926年《资本主义与共产主义革命讨论大纲》油印件',
    },
    {
        content: '年代：1919年\n' +
            '\n' +
            '类型：1\n' +
            '\n' +
            '质地：纸\n' +
            '\n' +
            '尺寸：纵21厘米，横58厘米\n' +
            '\n' +
            '来源：征集购买' ,
        title: '1919年“请看杯葛声中之大黑幕”传单',
    },
    {
        content: '年代：1919年\n' +
            '\n' +
            '类型：1\n' +
            '\n' +
            '质地：纸\n' +
            '\n' +
            '尺寸：纵21厘米，横13.5厘米\n' +
            '\n' +
            '来源：征集购买' ,
        title: '1919年广东省立第一中学校学生爱国团宣言书',
    },
    {
        content: '年代：1919年\n' +
            '\n' +
            '类型：文件、宣传品\n' +
            '\n' +
            '质地：纸\n' +
            '\n' +
            '尺寸：纵20.5厘米，横17.5厘米\n' +
            '\n' +
            '来源：征集购买' ,
        title: '“敬告同胞，抵制旧货、振兴工业”传单',
    },
    {
        content: '年代：1919年\n' +
            '\n' +
            '类型：文件、宣传品\n' +
            '\n' +
            '质地：纸\n' +
            '\n' +
            '尺寸：纵20厘米，横26厘米\n' +
            '\n' +
            '来源：征集购买' ,
        title: '“大祸临头，同胞猛醒、救国救群、莫要于此”传单',
    },
    // {
    //     content: '年代：1924年10月\n' +
    //         '\n' +
    //         '类型：1\n' +
    //         '\n' +
    //         '质地：纸质\n' +
    //         '\n' +
    //         '尺寸：纵8.7厘米，横13.7厘米\n' +
    //         '\n' +
    //         '来源：收集' ,
    //     title: '1924年10月俄舰队员在黄埔军校欢迎广州各界摄',
    // },
    {
        content: '年代：1926年\n' +
            '\n' +
            '类型：2\n' +
            '\n' +
            '质地：武器\n' +
            '\n' +
            '尺寸：通长67厘米，通宽10厘米，高10厘米\n' +
            '\n' +
            '来源：收集' ,
        title: '1926年黄埔军校第2期学员李治魁用过的指挥刀',
    },
    {
        content: '年代：民国时期\n' +
            '\n' +
            '类型：1\n' +
            '\n' +
            '质地：铜\n' +
            '\n' +
            '尺寸：直径27.6厘米，高25厘米\n' +
            '\n' +
            '来源：收集' ,
        title: '民国时期黄埔军校前身陆军小学用过的铜钟',
    },
];
let dataArray = [
    //{ image: 'http://www.gemg1959.cn/callback/download.php?fileid=74071a673307ca7459bcf75fbd024e09' },
    { image: 'http://www.gemg1959.cn/upload/201908/aea2cabde0c678624af57f6767751e5c.jpg' },
    { image: 'http://www.gemg1959.cn/upload/201908/06bec88cffa7bf9f2b364e7553d5c6be.jpg' },
    { image: 'http://www.gemg1959.cn/upload/201908/60fe8b6839466eb23a14171d2a7e36c7.jpg' },
    { image: 'http://www.gemg1959.cn/upload/201908/054ffb2f13ca94ac052cc0a0b3c6b9c7.jpg' },
    { image: 'http://www.gemg1959.cn/upload/201908/1cbe386441e514bd41ab2c3fb15c88c3.jpg' },
    { image: 'http://www.gemg1959.cn/upload/201908/460a1577ba0eacd60b005df264732c3c.jpg' },
    { image: 'http://www.gemg1959.cn/upload/201908/d6231a1144db09e70c5af16b25fceec2.jpg' },
    { image: 'http://www.gemg1959.cn/upload/201908/8fdd9e86296cdef5c6421ad88e7dd382.jpg' },
    //{ image: 'http://www.hpma.cn/callback/download.php?fileid=9cfdf10e8fc047a44b08ed031e1f0ed1' },
    { image: 'http://www.hpma.cn/upload/201812/4cf0739b8a4f844fd582401082605357.jpg' },
    { image: 'http://www.hpma.cn/upload/201812/add08a509691b37933443c1969cfac00.jpg' },
];
for(let i =0;i<dataArray.length;i++){
    dataArray[i].title=textData[i].title
    dataArray[i].content=textData[i].content
}

class Thing extends Component{
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'pic-details-demo',
    };

    constructor(props) {
        super(props);
        this.state = {
            picOpen: {},
        };
    }

    onImgClick = (e, i) => {
        const { picOpen } = this.state;
        Object.keys(picOpen).forEach((key) => {
            if (key !== i && picOpen[key]) {
                picOpen[key] = false;
            }
        });
        picOpen[i] = true;
        this.setState({
            picOpen,
        });
    };

    onClose = (e, i) => {
        const { picOpen } = this.state;
        picOpen[i] = false;
        this.setState({
            picOpen,
        });
    };

    onTweenEnd = (i) => {
        const { picOpen } = this.state;
        delete picOpen[i];
        this.setState({
            picOpen,
        });
    };

    getDelay = (e) => {
        const i = e.index + dataArray.length % 4;
        return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
    };

    getLiChildren = () => {
        const imgWidth = 110;
        const imgHeight = 76;
        const imgBoxWidth = 130;
        const imgBoxHeight = 96;
        return dataArray.map((item, i) => {
            const { image, title, content } = item;
            const isEnter = typeof this.state.picOpen[i] === 'boolean';
            const isOpen = this.state.picOpen[i];

            const left = isEnter ? 0 : imgBoxWidth * (i % 4);
            const imgLeft = isEnter ? imgBoxWidth * (i % 4) : 0;
            const isRight = Math.floor((i % 4) / 2);
            const isTop = Math.floor(i / 4);
            let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
            top = isEnter ? top : imgBoxHeight * isTop;
            let imgTop = isTop ? imgBoxHeight : 0;
            imgTop = isEnter ? imgTop : 0;

            const liStyle = isEnter ? { width: '100%', height:175, zIndex: 1 } : null;
            const liAnimation = isOpen ?
                ({ boxShadow: '0 2px 8px rgba(140, 140, 140, .35)' }) :
                ({ boxShadow: '0 0px 0px rgba(140, 140, 140, 0)' });
            let aAnimation = isEnter ?
                ({
                    delay: 400,
                    ease: 'easeInOutCubic',
                    width: imgWidth,
                    height: imgHeight,
                    onComplete: this.onTweenEnd.bind(this, i),
                    left: imgBoxWidth * (i % 4),
                    top: isTop ? imgBoxHeight : 0,
                }) : null;
            aAnimation = isOpen ?
                ({
                    ease: 'easeInOutCubic',
                    left: isRight ? (imgBoxWidth * 2) - 10 : 0,
                    width: '50%',
                    height: 175,
                    top: 0,
                }) : aAnimation;

            // 位置 js 控制；
            return (
                <TweenOne
                    key={i}
                    style={{
                        left,
                        top,
                        ...liStyle,
                    }}
                    component="li"
                    className={isOpen ? 'open' : ''}
                    animation={liAnimation}
                >
                    <TweenOne
                        component="a"
                        onClick={e => this.onImgClick(e, i)}
                        style={{
                            left: imgLeft,
                            top: imgTop,
                        }}
                        animation={aAnimation}
                    >
                        <img src={image} width="100%" height="100%" alt={"暂无图片"}/>
                    </TweenOne>
                    <TweenOneGroup
                        enter={[
                            {
                                opacity: 0, duration: 0, type: 'from', delay: 400,
                            },
                            { ease: 'easeOutCubic', type: 'from', left: isRight ? '50%' : '0%' },
                        ]}
                        leave={{ ease: 'easeInOutCubic', left: isRight ? '50%' : '0%' }}
                        component=""
                    >
                        {isOpen && (
                            <div
                                className={`${this.props.className}-text-wrapper`}
                                key="text"
                                style={{
                                    left: isRight ? '0%' : '50%',
                                }}
                            >
                                <h1>{title}</h1>
                                <Icon type="cross" onClick={e => this.onClose(e, i)} />
                                <em />
                                <p>{content}</p>
                            </div>
                        )}
                    </TweenOneGroup>
                </TweenOne>
            );
        });
    };

    render() {
        console.log(dataArray)
        return (
            <div>
                <div className={`${this.props.className}-wrapper`}>
                    <div className={this.props.className}>
                        <QueueAnim type="bottom" className={`${this.props.className}-title`}>
                            <h1 key="h1">文物展览</h1>
                            <p key="p">广州革命历史</p>
                        </QueueAnim>
                        <QueueAnim
                            delay={this.getDelay}
                            component="ul"
                            className={`${this.props.className}-image-wrapper`}
                            interval={0}
                            type="bottom"
                        >
                            {this.getLiChildren()}
                        </QueueAnim>
                    </div>
                </div>
            </div>
        );
    }
}

export default Thing;