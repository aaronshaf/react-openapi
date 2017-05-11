import React from 'react'
import MarkdownIt from 'markdown-it'
import Path from './Path'
import TOC from './TOC'
import './OpenAPI.css'

const md = new MarkdownIt()

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
          definitions={this.props.definitions}
        />
      )
    })

    return (
      <div>
        <h2 style={{marginBottom: 24}}>{this.props.info.title}</h2>
        {this.props.info.description &&
          <div
            dangerouslySetInnerHTML={{__html: md.render(this.props.info.description)}}
            style={{marginTop: 24, marginBottom: 24}}
          />
        }
        {Object.keys(this.props.paths).length > 1 &&
          <div style={{marginTop: 24, marginBottom: 24}}>
            <TOC {...this.props} />
          </div>
        }
        <div>
          {paths}
        </div>
      </div>
    )
  }
})
