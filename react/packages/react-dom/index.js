/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

const ReactDOM = require('./src/client/ReactDOM');

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
module.exports = ReactDOM.default || ReactDOM;

/*
  ReactDOM.render功能：
    - 创建一个ReactRoot
    - 在ReactRoot中创建一个FiberRoot
    - 在FiberRoot中创建一个Fiber对象
*/

