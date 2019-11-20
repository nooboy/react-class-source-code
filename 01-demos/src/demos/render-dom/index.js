import React from 'react';

class Input extends React.Component {
  state = {
    name: 'zhangsan',
  }
  handleChange = (e) => {
    this.setState({ name: e.target.valeu });
  }

  render () {
    return (
      <input type='text' value={this.state.name} onChange={this.handleChange} />
    )
  }
}

class List extends React.Component {
  state = { a: 1, b: 2, c: 3 }
  handleClick = () => {
    this.setState(state => {
      const {a, b, c} = state;
      return {
        a: a * a,
        b: b * b,
        c: c * c,
      };
    })
  }
  render () {
    const {a, b, c} = this.state;
    return [
      <div key='a'>{a}</div>,
      <div key='b'>{b}</div>,
      <div key='c'>{c}</div>,
      <button key='btn' onClick={this.handleClick}>click me</button>
    ]
  }
}

export default class Index extends React.Component {


  
  render () {
    return (
      <div>
        <Input />
        <List />
      </div>
    )
  }
}
