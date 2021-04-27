
import React from 'react'
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Header from './components/header/header.component';

// Css
import './App.css';

// Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

//Redux
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';

// Pages
import HomePage from './pages/homepage/homepage.component' ; 
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SingInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { connect } from 'react-redux';

class App extends React.Component {
  unSubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
              ...snapshot.data(),
          })
        });
        
       
      }
     
      setCurrentUser(userAuth)
   }) 
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render(){
    return (
    <div>
        <Header  />
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage}/>
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SingInAndSignUp />)} />
      </Switch>
    </div>
      
    );
  }
}
const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
