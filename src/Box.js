import React, { Component } from 'react';

export default class Box extends Component {
  render() {
    const style = {
      width: '180px',
      height: '180px',
      display: 'inline-block',
      backgroundColor: this.props.color
    };
    return (
      <div className="w-20">
        <div style={style} className={this.props.color}></div>
      </div>)
  }
}
