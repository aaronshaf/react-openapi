import React from 'react';
import Method from './Method';

export default React.createClass({
  displayName: 'Path',

  render() {
    const methods = this.props.methods;
    const path = this.props.path;
    const definitions = this.props.definitions;
    const methodComponents = Object.keys(methods).map(method => {
      return (
        <Method
          key={method}
          path={path}
          method={method}
          methodSpec={methods[method]}
          definitions={this.props.definitions}
        />
      );
    });
    return (
      <div>
        {methodComponents}
      </div>
    );
  }
});
