import React from 'react'
import Path from './Path'
import './OpenAPI.css'

export default React.createClass({
  render() {
    if (!this.props.info) {
      return <div>Loading...</div>
    }
    const paths = Object.keys(this.props.paths).map((path) => {
      return (
        <Path
          key={path}
          path={path}
          methods={this.props.paths[path]}
        />
      )
    })

    return (
      <div>
        <h2>{this.props.info.title}</h2>
        <div style={{marginTop: 12, marginBottom: 12}}>{this.props.info.description}</div>
        <div>
        {paths}
        </div>
      </div>
    )
  }
})
