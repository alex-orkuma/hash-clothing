
import './App.css';
import React from 'react'


import HomePage from './pages/homepage/homepage.component' ; 
import ShopPage from './pages/shop/shop.component';
import { Switch, Route } from 'react-router';
import Header from './components/header/header.component';
import SingInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            }
          })
        });
        
       
      }
     
      this.setState({currentUser: userAuth})
   }) 
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render(){
    return (
    <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SingInAndSignUp}/>
      </Switch>
    </div>
      
    );
  }
}

export default App;
