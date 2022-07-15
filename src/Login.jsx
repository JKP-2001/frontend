import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from "react-router-dom"



const Login = (props) => {
    const [cred, setCred] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const change = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }


    const loginUser = async (email, password)=>{
        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return (response.status);
    }

    const submit = async(e)=>{
      e.preventDefault();
      setLoading(true);
      const x = await(loginUser(cred.email,cred.password));
      setLoading(false);
      if(x===404){
        props.showAlert("danger","The email address you entered isn't Registered.",5000);
        setCred({email:"",password:""});
      }
      else if(x===401){
        props.showAlert("danger","Incorrect Email or Password.",5000);
        setCred({email:cred.email,password:""});
      }

      else if(x===200){ 
        localStorage.setItem("user",cred.email);
        setCred({email:"",password:""});
        props.setIsTrue(true);
        navigate("/")
      }
      else{
        props.showAlert("danger","Something Went Wrong. Try Again.",5000);
      }
    }

    
    if(localStorage.getItem("user")){
        return (
            <div className="container mx-20 my-5"><h1>Already Logged In</h1></div>
        )
    }

    return (
        
        <div className="container mx-20">
            {/* <Loader loading={loading} message="Logging In"/> */}
            <h1 style={{ "color": "black" }} className="my-4">Login Here</h1>
            <form className="mx-10" >
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1" style={{ "color": "black" }}>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={cred.email} onChange={change} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text " style={{ "color": "black" }}>We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1" style={{ "color": "black" }}>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={change} value={cred.password} placeholder="Password" />
                    <small id="emailHelp" className="form-text " style={{ "color": "black" }}>We'll never share your Password with anyone else.</small>
                </div>

                <div className="my-1">
                    <button type="submit" className="btn btn-primary" onClick={submit} disabled={cred.email.length == 0 || cred.password.length < 8 ? true : false}>Submit</button>
                </div>
                <div className="my-1">
                    <small id="emailHelp" className="form-text " style={{ "color": "black" }}>Forgot Password?<Link className="mx-2" to="/resetpassword" role="button">Click Here</Link></small>
                </div>
                <div className="my-1">
                    <small id="emailHelp" className="form-text " style={{ "color": "black" }}>Have No Account?<Link className="mx-2" to="/register" role="button">Click Here</Link></small>
                </div>
            </form>
        </div>

    )
}

export default Login
