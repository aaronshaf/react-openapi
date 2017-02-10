import React from 'react'
import ReactDOM from 'react-dom'
import OpenAPI from './OpenAPI'
import Fetch from 'react-fetch'
import './index.css'

ReactDOM.render(
  <div style={{marginTop: 48, marginBottom: 48}}>
    <Fetch url="http://petstore.swagger.io/v2/swagger.json">
      <OpenAPI />
    </Fetch>
  </div>,
  document.getElementById('root')
)
