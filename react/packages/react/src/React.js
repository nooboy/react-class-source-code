/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
  1. 基于React16+
  2. 参考jokcy
  3. React顶层API介绍：https://react.docschina.org/docs/react-api.html
*/

import ReactVersion from 'shared/ReactVersion';
import {
  REACT_CONCURRENT_MODE_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
} from 'shared/ReactSymbols';

import {Component, PureComponent} from './ReactBaseClasses';
import {createRef} from './ReactCreateRef';
import {forEach, map, count, toArray, only} from './ReactChildren';
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
} from './ReactElement';
import {createContext} from './ReactContext';
import {lazy} from './ReactLazy';
import forwardRef from './forwardRef';
import memo from './memo';
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
} from './ReactElementValidator';
import ReactSharedInternals from './ReactSharedInternals';
import {enableStableConcurrentModeAPIs} from 'shared/ReactFeatureFlags';

// 注：React对外暴露的API
const React = {

  // 注：提供处理 props.children 的一系列方法，因为 children 是一个类数组（并非真正的数组），如果要对其处理可以用 React.Children 外挂的方法
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },

  createRef,          // 最新 ref 用法，将来只有两种方式使用 ref ，如下：
  /*
    class App extends React.Component {
      constructor() {
        this.ref = React.createRef();
      }
      render() {
        return <div ref={this.ref} /> 或
        return <div ref={(node) => this.funRef = node} />
      }
    }
  */

  Component,
  PureComponent,
  /*
    这两个类基本相同，唯一的区别是 PureComponent 的原型上多了一个标识：

    if (ctor.prototype && ctor.prototype.isPureReactComponent) {
      return (
        !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
      );
    }
    这是检查组件是否需要更新的一个判断，ctor 就是你声明的继承自 Component or PureComponent 的类，他会判断你是否继承自 PureComponent，如果是的话就 shallowEqual 比较 state 和 props。

    顺便说一下：React 中对比一个 ClassComponent 是否需要更新，只有两个地方。shouldComponentUpdate 和 PureComponent
  */


  createContext,      // 官方定稿的 Context 方案，使用示例：
  /*
    const { Provider, Consumer } = React.createContext('defaultValue')
    const ProviderComp = (props) => (
      <Provider value={'realValue'}>
        {props.children}
      </Provider>
    )
    const ConsumerComp = () => (
      <Consumer>
        {(value) => <p>{value}</p>}
      </Consumber>
    )
  */


  forwardRef,
  /*
    用来解决HOC组件传递ref的问题的。比如 redux 使用 connect 来给组件绑定需要的 state，其实就是在组件外层再包裹一层组件，通过 ...props 把外部的 props 传入到实际组件
    const TargetComponent = React.forwardRef((props, ref) => (
      <TargetComponent ref={ref} />
    ))
    这也是为什么要提供createRef作为新的ref使用方法的原因，如果用string ref就没法当作参数传递了。
  */

  lazy,
  memo,   // 对函数进行性能优化，通过props来判断是否重新渲染当前组件（类似shouldComponentUpdate）

  // 这四个都是React提供的组件，其实都只是占位符，都是一个Symbol，在React实际检测到他们的时候会做一些特殊的处理，比如StrictMode和AsyncMode会让他们的子节点对应的Fiber的mode都变成和他们一样的mode
  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,          // 克隆一个 ReactElement

  // 专门用来创建某一类 ReactElement 的工厂，React16.8.6提示已废弃，建议使用 JSX 或直接调用 React.createElement() 来替代它
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,

  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
};

if (enableStableConcurrentModeAPIs) {
  React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.Profiler = REACT_PROFILER_TYPE;
} else {
  React.unstable_ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.unstable_Profiler = REACT_PROFILER_TYPE;
}

export default React;
