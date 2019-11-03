import React from 'react'
import { compose, lifecycle } from 'recompose'

const NotFoundPage = props => (
  <div>
    <h1
      className="text-white text-center"
      style={{ marginTop: '10vh' }}
    >
      Not Found Page.
    </h1>
  </div>
)

const NotFoundCompose = compose(
  lifecycle({
    componentWillMount() {
      document.title = `Page not found`
    }
  })
)(NotFoundPage)

export default NotFoundCompose
