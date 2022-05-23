import React, { Component } from 'react';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';


class subText extends Component {
  state = {
    show1: true,
    interval:null,
    text: true
  };

  componentDidMount() {
    this.move()
  }

  move = () => {
    this.state.interval = setInterval(()=> {
      this.setState({show1: !this.state.show1})
    }, 6000)
  }

  render() {
    return (
      <Texty
        type="scaleBig"
        mode="smooth"
      >
        {this.state.show1 && this.state.text?'Knowledge Graph':'Cognitive Intelligence'}
      </Texty>
    )
  }
}
export default subText;
