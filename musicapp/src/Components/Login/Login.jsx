import React, { Component } from 'react';
import authentication from './../../config';
import logo from '../Login/logo.png';
import { connect } from 'react-redux';
import './Login.scss';
import Auth from './../../Components/Auth';
import { updatedLoginDetails, updatedLoginResponse } from './../../Store/Actions/login-actions';


const mapDispatchToProps = (dispatch) => {
	return {
		updatedLoginDetails : (email, password) => dispatch(updatedLoginDetails(email, password)),
		updatedLoginResponse : (response) => dispatch(updatedLoginResponse(response))

	}
 }
 
 const mapStateToProps = (state) => {
	return {
	    loginDetails: state.loginDetails.loginState
 } };
class LoginComponent extends Component {

	loginUser(event) {
		event.preventDefault();
		fetch('http://localhost:9000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: this.props.loginDetails.email,
				password: this.props.loginDetails.password,
			}),
		})
		.then(res => res.json())
		.then(data => {
			if ((data.msg) === "Logged In Successfully") {
				localStorage.setItem('id', data.id);
				localStorage.setItem('name', data.name);
				localStorage.setItem('token', data.token);
				this.props.updatedLoginResponse(data);
				alert('Login successful');
				console.log(data);
				if(localStorage.token){
				window.location.href = authentication.AUTH_URL;}
				// window.location.href = '/dashboard'
			} else {
				alert('Please check your username and password')
			}
		});
	}

	

	

	render() {
		const code = new URLSearchParams(window.location.search).get("code"); 
		
		return (
			<React.Fragment>
				{code!== null ? <Auth code={code} /> : 
					
					<div className='login-container'>
						{/* logo */} 
						<center><img src={logo} alt="logo" className="logo"/></center> 
						<section id = 'content'>
						<center><form className='loginForm' onSubmit={event => this.loginUser(event)}>
						<h1>Login Form</h1>
						<div>
							<input
								value={this.props.loginDetails.email}
								onChange={(e) => this.props.updatedLoginDetails( e.target.value, this.props.loginDetails.password)}
								type="email"
								placeholder="Email"
								id="email"
							/>
						</div>
						<div>
							<input
								value={this.props.loginDetails.password}
								onChange={(e) => this.props.updatedLoginDetails(  this.props.loginDetails.email, e.target.value,)}
								type="password"
								placeholder="Password"
								id="password"
							/>
						</div>
						<div>
							<input type="submit" value="Login"/>
							<a href='http://localhost:3000/register'>Register</a>
						</div>
						</form></center>
						</section>
					</div>
				} 
			</React.Fragment>
		);
	}
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default Login;	