import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth';
import {connect} from 'react-redux';
import * as actions from './store/actions/actionsRef';
const Orders = React.lazy(()=>import('./containers/Orders/Orders'));
class App extends Component {
  componentDidMount=()=>{
    this.props.onTryAutoSignup();
  }
  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes =(
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" 
          render ={()=>(
            <Suspense fallback={<div>loading...</div>}>
              <Orders/>
            </Suspense>
          )}
          />
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
      </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps =(state)=>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps =(dispatch)=>{
  return{
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
