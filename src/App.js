
import './App.css';
import React from 'react'


import HomePage from './pages/homepage/homepage.component' ; 
import ShopPage from './pages/shop/shop.component';
import { Switch, Route } from 'react-router';
import Header from './components/header/header.component';
import SingInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';

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
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SingInAndSignUp}/>
      </Switch>
    </div>
      
    );
  }
}
const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchtoProps)(App);
