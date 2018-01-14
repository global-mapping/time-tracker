import React from 'react'

const NoMatch = ({ location }) => (
  <div>
    <h4>
      No match for <code>{location.pathname}</code>
    </h4>
  </div>
)

export default NoMatch
