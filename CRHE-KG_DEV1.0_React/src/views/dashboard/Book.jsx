import React,{Component} from "react";
import {Tabs,List, Avatar } from 'antd';
const { TabPane } = Tabs;
const data = [
    {
        title: '《百年广州\n》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=6769656C676F656B6669A29D5C9AABAE9FAB5C673435313636333436",
        content:"此书以广东省档案馆及广州年鉴资料为主，全面深刻地反映了广州的发展和变化。",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000006136437&d=02124CD427DD1C35E2483618B6A354AE&fenlei=110308&sw=%E7%99%BE%E5%B9%B4%E5%B9%BF%E5%B7%9E"
    },
    {
        title: '《工运光驱：广州工人运动人物简介》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=64646267676C626A69669F9A5997A8AB9CA859643132333834313033",
        content:"广州工人运动史研究委员会办公室编",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000004344247&d=809F3F6368F001ABA2A954C6D3DDBF21&fenlei=1103050301&sw=%E5%B9%BF%E5%B7%9E%E5%B7%A5%E4%BA%BA%E8%BF%90%E5%8A%A8%E4%BA%BA%E7%89%A9%E7%AE%80%E4%BB%8B"
    },
    {
        title: '《光辉的一页——广州“一二·九”运动史》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=6463626A6A6C62666C6B9F9A5997A8AB9CA859643131373738383933",
        content:" 钟远蕃编著. 光辉的一页 广州“一二.九”运动史[M]. 广州：中山大学出版社, 1996.07.",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000000539794&d=ADC756390F13E09F3813978AD1A5453B&fenlei=110305030405&sw=%E5%85%89%E8%BE%89%E7%9A%84%E4%B8%80%E9%A1%B5%E2%80%94%E2%80%94%E5%B9%BF%E5%B7%9E%E2%80%9C%E4%B8%80%E4%BA%8C%C2%B7%E4%B9%9D%E2%80%9D%E8%BF%90%E5%8A%A8%E5%8F%B2"
    },
    {
        title: '《广州革命胜迹史话》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=6968676F6B71676F6D6DA49F5E9CADB0A1AD5E693133383737303238",
        content:" 邓炳权编写. 广州革命胜迹史话[M]. 广州：广东人民出版社, 1984.11.",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000000968797&d=19358D4377CECC18234BF6D3491B0CA7&fenlei=111005090103&sw=%E5%B9%BF%E5%B7%9E%E9%9D%A9%E5%91%BD%E8%83%9C%E8%BF%B9%E5%8F%B2%E8%AF%9D"
    },
    {
        title: '《广州的解放》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=61605F6368665F6466629C975694A5A899A556613133333737353130",
        content:"中共广州市委党史研究委员会，广州市中共党史学会编. 广州的解放[M]. 广州：广东人民出版社, 1989.09.",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000004010509&d=E9B616B1F305DE925488891891C655B3&fenlei=0903100302&sw=%E5%B9%BF%E5%B7%9E%E7%9A%84%E8%A7%A3%E6%94%BE"
    },
    {
        title: '《广州工人运动大事记》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=62626065656A6068696A9D985795A6A99AA657623734323937303031",
        content:"广州工运史研究委员会办公室编. 广州工人运动大事记[M]. 1985.06.",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000004344447&d=6F4AAB31968FF14E6BD4A76755C3DF92&fenlei=1103050307&sw=%E5%B9%BF%E5%B7%9E%E5%B7%A5%E4%BA%BA%E8%BF%90%E5%8A%A8%E5%A4%A7%E4%BA%8B%E8%AE%B0"
    },
    {
        title: '《广州起义_黄穗生》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=6666646E676C646D676DA19C5B99AAAD9EAA5B663436393332363835",
        content:"本书介绍了广州起义的始末，包括风云突变，中共中央紧急应对；机不可失，起义大计最终敲定；迅雷不及，广州起义震惊中外；虽败犹荣，起义壮举永垂史册等章节。",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000004921272&d=4D32654B41747BA9C8C9326C70B44557&fenlei=1103050303&sw=%E9%BB%84%E7%A9%97%E7%94%9F"
    },
    {
        title: '《广州起义_刘政》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=6A69686F6D71686D7172A5A05F9DAEB1A2AE5F6A3231333736363539",
        content:"刘政编写. 广州起义[M]. 上海：上海人民出版社, 1978.11.",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000000906376&d=D709AD963C55266CB3430A0847DA6871&fenlei=110305030303&sw=%E5%B9%BF%E5%B7%9E%E8%B5%B7%E4%B9%89"
    },
    {
        title: '《辛亥黄花岗起义》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=6A6A686F717068716B69A5A05F9DAEB1A2AE5F6A3137333333343739",
        content:"清末1911年在广州发生的“三·二九”黄花岗起义，具有伟大的历史意义，它揭开了中国“辛亥革命”的序幕。",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000006018657&d=E93A1C8CE1EED37B55D79E9045FD62C4&fenlei=110305020601&sw=%E8%BE%9B%E4%BA%A5%E9%BB%84%E8%8A%B1%E5%B2%97%E8%B5%B7%E4%B9%89"
    },
    {
        title: '《广州港史__（近代部分）》',
        url:"https://unicover.duxiu.com/coverNew/CoverNew.dll?iid=646362656B65626569679F9A5997A8AB9CA859643332363936353033",
        content:"本书论述了自1840年鸦片战争后至1949年全国解放前这段历史时期广州港的演变史。",
        href:"https://book.duxiu.com/bookDetail.jsp?dxNumber=000000986015&d=5E1CF50C08B15005F76382BE060AD2B4&fenlei=0607050308&sw=%E5%B9%BF%E5%B7%9E%E6%B8%AF%E5%8F%B2__%EF%BC%88%E8%BF%91%E4%BB%A3%E9%83%A8%E5%88%86%EF%BC%89"
    },
];

class Book extends Component{
    render() {
        return(
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="文献语料" key="1">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.url} alt="暂无图片" style={{width:"100px" , height:"160px"}} shape="square"/>}
                                        title={<a href={item.href} target ="_blank" rel="noopener noreferrer">{item.title}</a>}
                                        description={item.content}
                                        style={{height:"160px"}}
                                    />
                                </List.Item>
                            )}
                            style={{height:850,overflow:"auto"}}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default Book;