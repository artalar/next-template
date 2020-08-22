import React from 'react'

const NotFound = ({}) => {
  React.useEffect(() => {
    document.location.href = '/'
  })

  return <h1>404</h1>
}

export default NotFound
