import React from 'react'
import Method from './Method'

export default React.createClass({
  displayName: 'Path',

  render () {
    const methods = this.props.methods
    const path = this.props.path
    const methodComponents = Object.keys(methods).map((method) => {
      return <Method key={method} path={path} method={method} methodSpec={methods[method]} />
    })
    return (
      <div>
        {methodComponents}
      </div>
    )
  }
})
