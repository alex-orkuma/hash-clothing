import React from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {SignInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: '', password: '' });
  };

    handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                <FormInput 
                name='email' 
                value={this.state.email} 
                type='email'
                label='email' 
                required 
                handleChange={this.handleChange}/>
                <FormInput 
                name='password' 
                value={this.state.password} 
                type='password' 
                label='password'
                required 
                handleChange={this.handleChange}/>
                </form>
                <div className='buttons'>
                     <CustomButton type='submit'>Sign In</CustomButton>
                     <CustomButton onClick={SignInWithGoogle } isGoogleSignIn>{''}Sign In With Google{''}</CustomButton>
               </div>
            </div>
            
        )
    }

}

export default SignIn