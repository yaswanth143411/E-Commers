import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App.js'; // import functionName from filename.js
import HomeApp from './homeapp'; //add this line

import reportWebVitals from './reportWebVitals';
// const root = ReactDOM.createRoot(document.getElementById('root'));

 if(localStorage.getItem("adminid") !=null ){
   ReactDOM.render( <App/> , document.getElementById('root') );
 }else{
   ReactDOM.render( <HomeApp/> , document.getElementById('root') );
 }

 

/*
   root.render(
      <React.StrictMode>
      <App/>       // modify this line
      </React.StrictMode>
   );

 */

reportWebVitals();

/*
   javaScript - App();
   JSX        - <App/>
   user->brouser <=index.html <= index.js <=app.js
*/
