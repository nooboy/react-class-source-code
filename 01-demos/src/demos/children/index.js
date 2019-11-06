import React from 'react'

function ChildrenDemo(props) {
  console.log('aaa-: ',props.children)
  console.log('bbb-: ', React.Children.map(props.children, c => [c, [c, c]]))
  return props.children
}

export default () => (
  <ChildrenDemo>
    <span>1</span>
    <span>2</span>
  </ChildrenDemo>
)
