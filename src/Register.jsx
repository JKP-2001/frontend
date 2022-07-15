import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom"



const Register = (props) => {
    const [cred, setCred] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const change = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }


    const registerUser = async (name, email, password) => {
        const response = await fetch(`http://localhost:5000/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        return (response.status);
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const x = await (registerUser(cred.name,cred.email, cred.password));
        setLoading(false);
        if (x === 409) {
            props.showAlert("danger", "Email Id Already Registerd.", 5000);
        }
        else if (x === 401 || x === 400) {
            props.showAlert("danger", "Error.", 5000);
            setCred({ email: cred.email, password: "" });
        }

        else if (x === 200) {
            props.showAlert("success", "Registered Successfully.", 3000);

        }
        //   else{
        //     // props.showAlert("success","Successfully Logged In",5000);
        //     Navigate("/")
        //     setCred({email:"",password:""});
        //   }
    }


    if(localStorage.getItem("user")){
        return (
            <div className="container mx-20 my-5"><h1>Already Logged In</h1></div>
        )
    }



    return (
        <>
            {loading && <div className="container mx-20 my-1"><h2>Loading...</h2></div>}
            <div className="container mx-20">
                {/* <Loader loading={loading} message="Logging In"/> */}
                <h1 style={{ "color": "black" }} className="my-4">Register Here</h1>
                <form className="mx-20" >


                    <div className="form-group my-3">
                        <label htmlFor="exampleInputName1" style={{ "color": "black" }}>Name</label>
                        <input type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" name="name" value={cred.name} onChange={change} placeholder="Enter Name" />

                    </div>


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
                        <small id="emailHelp" className="form-text " style={{ "color": "black" }}>Already Have An Account?<Link className="mx-2" to="/login" role="button">Click Here</Link></small>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
