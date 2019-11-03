// client/src/App.js
import React from "react";
import { withRouter, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './static/bootstrap/bootstrap.min.css'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import {
  Contacts,
  NotFoundPage,
  ContactDetails
} from './containers'

const App = props => {
  const currentKey = props.location.pathname.split('/')[1] || '/'
  const timeout = { enter: 400, exit: 300 }

  return (
    <div>
      <TransitionGroup component="main" className="page-main">
        <CSSTransition key={currentKey} timeout={timeout} appear>
          <section className="page-main-inner">
            <Switch location={props.location}>
              <Route exact path="/" component={Cities}  />
              <Route component={NotFoundPage} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default withRouter(App)
