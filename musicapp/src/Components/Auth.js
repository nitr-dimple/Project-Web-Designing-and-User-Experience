import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './../Pages/Dashboard/Dashboard';
import { tokenUpdated as tokenUpdatedActions } from './../Store/Actions/token-actions';

const mapDispatchToProps = (dispatch) => {
    return {
        tokenUpdate : (accessToken, refreshToken, expiresIn) => dispatch(tokenUpdatedActions(accessToken, refreshToken, expiresIn))
    }
}

const mapStateToProps = (state) => {
    return {
        loginToken : state.token.loginToken
} };

class AuthComponent extends Component {
    
        // To get access token
        componentDidMount() {

            const code = {code: this.props.code};
            fetch('http://localhost:9000/spotifylogin', { 
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(code),
            })
            .then(res => res.json())
            .then(data => {
                this.props.tokenUpdate(data.accessToken, data.refreshToken, data.expiresIn);
                localStorage.setItem('accessToken', data.accessToken);
                window.history.pushState({}, null, '/dashboard');
            })
            .catch((error) => {
                window.location = '/';
                console.log(error);
            });
    
            // this.props.loginToken['accessToken'] && spotifyApi.setAccessToken(this.props.loginToken['accessToken']);
    
            // if(!this.props.loginToken['refreshToken'] || !this.props.loginToken['expiresIn'] ) {
            //     return
            // }
            // else{
            //     const refreshToken = {refreshToken: this.props.loginToken['refreshToken']};
            //     // const expiresIn = {expiresIn: this.props.loginToken['expiresIn']};
            //     // console.log(refreshToken);
            //     const interval = setInterval(() =>{
            //         fetch('http://localhost:9000/refresh', { 
            //             method: 'POST',
            //             mode: 'cors',
            //             headers: {
            //                 "Content-Type": 'application/json',
            //             },
            //             body: JSON.stringify(refreshToken),
            //         })
            //         .then(res => {
            //             return res.json()})
            //         .then(data => {
            //             console.log(data);
            //             this.props.tokenUpdate(data.accessToken, data.refreshToken, data.expiresIn);
            //             // window.history.pushState({}, null, '/');
            //         })
            //         .catch((error) => {
            //             window.location = '/';
            //             console.log(error);
            //         });
            //     }, (this.props.loginToken['expiresIn'] - 60) * 1000);
            //     return () => clearInterval(interval);
            // }
           
    
        } 

    render() {
        return (
            <div>
                <Dashboard />
            </div>
        );
    }
}

const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);

export default Auth;