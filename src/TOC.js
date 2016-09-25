import React from 'react'
import classnames from 'classnames'

const verbs = ['get', 'post', 'patch', 'put', 'delete']

export default React.createClass({
  displayName: 'TOC',

  render () {
    const verbsWithMethods = verbs.filter((verb) => {
      return Object.keys(this.props.paths).some((path) => this.props.paths[path][verb])
    })
    const paths = Object.keys(this.props.paths).map((path) => {
      const methods = verbsWithMethods.map((method) => {
        const isVisible = this.props.paths[path][method]
        const classes = classnames('tag tag-primary', {
          'tag--post': method === 'post',
          'tag--put': method === 'put',
          'tag--patch': method === 'patch',
          'tag--get': method === 'get',
          'tag--delete': method === 'delete'
        })
        return (
          <td key={method} style={{width: 60}}>
            <a
              href={`#${method.toUpperCase()} ${path}`}
              className={classes}
              style={{
                textTransform: "uppercase",
                visibility: isVisible? 'visible' : 'hidden'
              }}
            >
              {method}
            </a>
          </td>
        )
      })

      return (
        <tr key={path}>
          <th scope="row">{path}</th>
          {methods}
        </tr>
      )
    })

    return (
      <div>
        <table className="table">
          <tbody>
            {paths}
          </tbody>
        </table>
      </div>
    )
  }
})
