import React, { Component } from 'react';
import authentication from './../config';
import Auth from './Auth';

class CodeToken extends Component {
     render() { 
          window.location.href = authentication.AUTH_URL;
          const code = new URLSearchParams(window.location.search).get("code");
          window.location.href = '/login';
          return (
               <Auth code={code}></Auth> 
          );
     }
}
 
export default CodeToken;