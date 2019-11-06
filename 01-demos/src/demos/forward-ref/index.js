import React from 'react'

/*
  ref主要是用来获取结点实例：Dom实例和组件实例。
  函数组件(PureComponent)是没有实例的，也就是说没有this，那么设置ref后也是什么都拿不到的，
  也就是说无法在子组件内部通过 ref 获取父组件传入的 ref （例如HOC，实际是通过connect把传入的组件包装成新的组件）
  所以是无法通过 this.ref.current.value = 'abc'会报错
*/

const TargetComponent = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
))

export default class Comp extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.ref.current.value = 'ref get input'
  }

  render() {
    // 这里的ref用来获取组件实例
    return <TargetComponent ref={this.ref} />
  }
}
