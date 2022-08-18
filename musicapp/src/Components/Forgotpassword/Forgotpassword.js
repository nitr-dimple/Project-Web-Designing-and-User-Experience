import React, { Component } from 'react';
import authentication from './../../config';
import './Forgotpassword.scss';
import Auth from './../../Components/Auth';

class Forgotpassword extends Component {
	state = { 
		id: "",
	    password: "",
        confirmpassword: ""
	 } 

     

     componentDidUpdate() {
        
        console.log("Component is updated!!!!");
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch('http://localhost:9000/todoitems/' + this.state.id, requestOptions);
    }

	

	render() {
		const code = new URLSearchParams(window.location.search).get("code"); 
		return (
			<React.Fragment>
				  
					<div className='container'>
						<section id = 'content'>
						<form className='loginForm' >
						<h1>Forgot Password</h1>
						<div>
							<input
								value={this.state.password}
								onChange={(e) => this.setState( {password:e.target.value})}
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
							<input
								value={this.state.confirmpassword}
								onChange={(e) => this.setState( {confirmpassword:e.target.value})}
								type="password"
								placeholder="Password"
								id="password"
							/>
						</div>
						<div>
							<button type="submit" value="Update Password" onSubmit={this.toDoUpdater}/>
							
						</div>
						</form>
						</section>
						
						
					
					
						
						
						</div>
					
				 
			</React.Fragment>
		);
	}
}

export default Forgotpassword;	