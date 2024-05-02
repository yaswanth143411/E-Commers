import React, {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login  = () =>{
    const[username, pickUsername] = useState("");
    const[pass, pickPassword] = useState("");
    const[msg, updateMsg] = useState("Enter Login Details");
    const goLogin = () =>{
        const body = {
            username : username,
            pass : pass
        }

        if(username === "" || pass === ""){
            updateMsg("Empty Username or Password");
        }else{
            updateMsg("Please wait Processing....");
            axios.post("http://127.0.0.1:988/login",body)
            .then(response=>{
                // console.log(response)
            
                if(response.status === 200 && response.data){
                    localStorage.setItem("adminid", 3);
                    toast.success(response.data.message,{
                        position : "top-right"
                        

               })
               console.log("workink....")
               window.location = "http://localhost:3000/#/"
               window.location.reload();
               
              
                }
                else {
                    // Handle case when response data is undefined or response status is not 200
                    toast.error("Login failed. Please try again.");
                }
               
                // var semail = response.data[0].email;
                // var spass = response.data[0].password; 
                // if(username == semail && pass == spass){
                //     updateMsg("Success : Please wait Redirecting....");
                //     localStorage.setItem("adminid", response.data[0].id);
                //     localStorage.setItem("name", response.data[0].name);
                //     window.location.href="http://localhost:3000/#/"; 
                //     window.location.reload();
                    // Reload after login admin dashboard will come
                // }else{
                //     updateMsg("Fail : Invalid or Not Exists !");
                // }
            })
            .catch((e)=>{
                toast.error(e.response.data.error || "An error occurred while logging in.")
            })
        
        }
    }

    return(
        <div className='container mt-5' style={{animation: 'pop-in 0.5s ease-out'}}>
            <div className='row'>
                <div className='col-lg-4 offset-4 p-3 border shadow'>
                    {/* <h1 className="text-center text-primary"> Admin Login </h1> */}
                    <div class="">
                        <h2 class="text-center"><span class="bi bi-person-fill me-3"></span>Admin Login</h2>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="text" className='form-control' placeholder='Email...'
                        onChange={obj=>pickUsername(obj.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className='form-control' placeholder='Password...'
                        onChange={obj=>pickPassword(obj.target.value)}/>
                    </div>
                    <div className='text-center'>
                        <button className="btn btn-primary" onClick={goLogin}>Login</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login;