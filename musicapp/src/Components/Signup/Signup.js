import { Component, createElement, useState } from 'react'
import {Navigate, useNavigate } from 'react-router-dom'
import './Signup.scss'
import logo from '../Signup/logo.png'
class Register extends Component{
	state = { 

		name: "",
		email: "",
		password: ""
	 } 

	 registerUser(event) {
		event.preventDefault()

		fetch('http://localhost:9000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			}),
		})
		.then(res => res.json())
		.then(data=>{
			if (data.msg === 'Successfully Registered') {
				alert('Registration Success')
				window.location.href = '/login'
			}
	
			else if(data.status === 'error'){
				alert(data.error)
			}
		});
		
	}

	render() {
		const code = new URLSearchParams(window.location.search).get("code"); 
	return (
		<div>
			
			<div className='signup-container'>
				{/* logo */} 
				<center><img src={logo} alt="logo" className="logo"/></center>
				<section id = 'content'>
			<form onSubmit={event => this.registerUser(event)}>
					<h1>Register Form</h1>
						<div>
							<input
								value={this.state.name}
								onChange={(e) => this.setState( {name:e.target.value})}
								type="text"
								placeholder="Username"
								id="username"
							/>
						</div>
					    <div>
							<input
								value={this.state.email}
								onChange={(e) => this.setState( {email:e.target.value})}
								type="email"
								placeholder="Email"
								id="email"
							/>
						</div>
						<div>
							<input
								value={this.state.password}
								onChange={(e) => this.setState( {password:e.target.value})}
								type="password"
								placeholder="Password"
								id="password"
							/>
						</div>
						
						<div>
				<input type="submit" value="Register" />
				
                 <a href='http://localhost:3000/login'>Already account exists?</a>
                </div>
			</form>
			</section>
			</div>
            
		</div>
	);


}
}
	
export default Register