import React from 'react'
import classnames from 'classnames'

export default React.createClass({
  displayName: 'Method',

  render () {
    const path = this.props.path
    const method = this.props.method
    const methodSpec = this.props.methodSpec

    const parameters = (methodSpec.parameters || []).map(function (parameter) {
      var required = parameter.required && <span style={{color: 'red'}} title='Required'>*</span>
      return (
        <tr key={parameter.name}>
          <td style={{width: 120}}>
            {parameter.name}
            {required}
          </td>
          <td>{parameter.type}</td>
          <td>{parameter.description}</td>
        </tr>
      )
    })

    var responses = Object.keys(methodSpec.responses).map(function (response) {
      var responseSpec = methodSpec.responses[response]
      return (
        <tr key={response}>
          <td style={{width: 120}}>{response}</td>
          <td>{responseSpec.description}</td>
        </tr>
      )
    })

    var cardClassnames = classnames('card', {
      'card--post': method === 'post',
      'card--get': method === 'get',
      'card--delete': method === 'delete',
      'card--put': method === 'put',
      'card--patch': method === 'patch'
    })

    var cardHeaderClassNames = classnames('card-header', {
      'card-header--post': method === 'post',
      'card-header--get': method === 'get',
      'card-header--delete': method === 'delete',
      'card-header--put': method === 'put',
      'card-header--patch': method === 'patch'
    })

    var cardHeaderTitleClassnames = classnames('card-header-title', {
      'card-header-title--post': method === 'post',
      'card-header-title--get': method === 'get',
      'card-header-title--delete': method === 'delete',
      'card-header-title--put': method === 'put',
      'card-header-title--patch': method === 'patch'
    })

    return (
      <div className={cardClassnames}>
        <div className={cardHeaderClassNames}>
          <div className={cardHeaderTitleClassnames}>
            <span style={{textTransform: 'uppercase'}}>{method}</span> {path}
          </div>
          <div style={{float: 'right', padding: '0.35rem 1.25rem'}}>
            {methodSpec.summary}
          </div>
        </div>
        <div className="card-block">
          <div style={{marginBottom: 12}}>
            {methodSpec.description}
          </div>
          {Boolean(parameters.length) &&
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className='table-active' colSpan={3}>
                    Required parameters
                  </th>
                </tr>
              </thead>
              <tbody>
                {parameters}
              </tbody>
            </table>
          }

          <table className="table table-sm">
            <thead>
              <tr>
                <th className='table-active' colSpan={3}>
                  Responses
                </th>
              </tr>
            </thead>
            <tbody>
              {responses}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})
