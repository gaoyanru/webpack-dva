// import Production from '../routes/Production'

// <Route path='/production' exact component={Production} />
import { Router, Route } from 'dva/router'
import * as modules from './modules'
export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={modules.Home} />
    </Router>
  )
}
