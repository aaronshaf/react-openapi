import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  displayName: 'Method',

  render() {
    const path = this.props.path;
    const method = this.props.method;
    const methodSpec = this.props.methodSpec;
    const definitions = this.props.definitions;
    const requiredMark = (
      <span style={{ color: 'red' }} title="Required">*</span>
    );
    var counter = 0;

    function resolveRef(schema) {
      for (var property in schema) {
        if (property === '$ref') {
          return definitions[/[^/]+$/.exec(schema[property])];
        } else {
          if (typeof schema[property] === 'object') {
            schema[property] = resolveRef(schema[property]);
            schema[property] = resolveRef(schema[property]);
          }
        }
      }
      return schema;
    }

    function formatSchema(
      schema,
      schemaString,
      nestLevel,
      requiredProperties,
      name
    ) {
      if (schema.schema) {
        schema = schema.schema;
      }
      var required = false;
      if (schema.required === true) {
        required = true;
      }
      if (requiredProperties.indexOf(name) > -1) {
        required = true;
      }
      if (typeof schema.required === 'object') {
        requiredProperties = schema.required;
      } else {
        requiredProperties = [];
      }
      required = required && requiredMark;
      var margin = nestLevel * 16;

      if (schema.type === 'object') {
        schemaString.push(
          <p style={{ marginLeft: margin }} key={counter++}>
            {required}{(name ? name + ': ' : '') + '{'}
          </p>
        );
        for (var property in schema.properties) {
          schemaString = formatSchema(
            schema.properties[property],
            schemaString,
            nestLevel + 1,
            requiredProperties,
            property
          );
        }
        schemaString.push(
          <p style={{ marginLeft: margin }} key={counter++}>{'}'}</p>
        );
      } else if (schema.type === 'array') {
        schemaString.push(
          <p style={{ marginLeft: margin }} key={counter++}>
            {required}{(name ? name + ': ' : '') + '['}
          </p>
        );
        schemaString = formatSchema(
          schema.items,
          schemaString,
          nestLevel + 1,
          requiredProperties
        );
        schemaString.push(
          <p style={{ marginLeft: margin }} key={counter++}>{']'}</p>
        );
      } else {
        schemaString.push(
          <p style={{ marginLeft: margin }} key={counter++}>
            {required}{(name ? name + ': ' : '') + schema.type}
          </p>
        );
      }
      if (schema.description) {
        schemaString.push(
          <p className="grayed" style={{ marginLeft: margin }} key={counter++}>
            -  {schema.description}
          </p>
        );
      }
      if (schema.example) {
        schemaString.push(
          <p className="grayed" style={{ marginLeft: margin }} key={counter++}>
            - Ex: {schema.example}
          </p>
        );
      }
      return schemaString;
    }

    const parameters = (methodSpec.parameters || []).map(function(parameter) {
      var required = parameter.required && requiredMark;
      var schema = {};
      schema = resolveRef(parameter);
      var nestLevel = 1;
      var schemaString = [];
      var requiredProperties = [];
      schemaString = formatSchema(
        schema,
        schemaString,
        nestLevel,
        requiredProperties
      );
      return (
        <tr key={parameter.name}>
          <td style={{ width: 120 }}>
            {required}
            {parameter.name}
          </td>
          <td>{parameter.in}</td>
          <td>{schemaString}</td>
          <td>{parameter.description}</td>
        </tr>
      );
    });

    var responses = Object.keys(methodSpec.responses).map(function(response) {
      var responseSpec = methodSpec.responses[response];
      var schema = {};
      schema = resolveRef(responseSpec);
      var nestLevel = 1;
      var schemaString = [];
      var requiredProperties = [];
      if (schema.schema) {
        schemaString = formatSchema(
          schema,
          schemaString,
          nestLevel,
          requiredProperties
        );
      }
      return (
        <tr key={response}>
          <td style={{ width: 120 }}>{response}</td>
          <td>{schemaString}</td>
          <td>{responseSpec.description}</td>
        </tr>
      );
    });

    const cardClassnames = classnames('card', {
      'card--post': method === 'post',
      'card--get': method === 'get',
      'card--delete': method === 'delete',
      'card--put': method === 'put',
      'card--patch': method === 'patch'
    });

    const cardHeaderClassNames = classnames('card-header', {
      'card-header--post': method === 'post',
      'card-header--get': method === 'get',
      'card-header--delete': method === 'delete',
      'card-header--put': method === 'put',
      'card-header--patch': method === 'patch'
    });

    const cardHeaderTitleClassnames = classnames('card-header-title', {
      'card-header-title--post': method === 'post',
      'card-header-title--get': method === 'get',
      'card-header-title--delete': method === 'delete',
      'card-header-title--put': method === 'put',
      'card-header-title--patch': method === 'patch'
    });

    return (
      <div className={cardClassnames} id={`${method.toUpperCase()} ${path}`}>
        <div className={cardHeaderClassNames}>
          <div className={cardHeaderTitleClassnames}>
            <span style={{ textTransform: 'uppercase' }}>{method}</span> {path}
          </div>
          <div style={{ float: 'right', padding: '0.35rem 1.25rem' }}>
            {methodSpec.summary}
          </div>
        </div>
        <div className="card-block">
          <div style={{ marginBottom: 12 }}>
            {methodSpec.description}
          </div>
          {Boolean(parameters.length) &&
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className="table-active" colSpan={3}>
                    Parameters
                  </th>
                </tr>
              </thead>
              <tbody>
                {parameters}
              </tbody>
            </table>}

          <table className="table table-sm">
            <thead>
              <tr>
                <th className="table-active" colSpan={3}>
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
    );
  }
});
