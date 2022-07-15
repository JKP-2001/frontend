import React, { useState } from 'react'
import { Link } from "react-router-dom"

const ResetPassword = (props) => {

    const [cred, setCred] = useState({ email: "", password: "", confPassword: "" });
    const [cred2, setCred2] = useState({ password: "", confPassword: "" });
    const change = (e) => {
        if (!localStorage.getItem("user")) {
            setCred({ ...cred, [e.target.name]: e.target.value })
        } else {
            setCred2({ ...cred2, [e.target.name]: e.target.value })
        }
    }

    const changePassword = async (password) => {
        const response = await fetch(`http://localhost:5000/auth/changepassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'user': cred.email,
            },
            body: JSON.stringify({ password }),
        });
        return (response.status);
    }


    const changeLoginPassword = async (password) => {
        const response = await fetch(`http://localhost:5000/auth/changepassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'user': localStorage.getItem("user"),
            },
            body: JSON.stringify({ password }),
        });
        return (response.status);
    }

    const submit = async (e) => {
        e.preventDefault();
        let x;
        if (localStorage.getItem("user")) {
            x = await (changeLoginPassword(cred2.password));
            if (x === 401) {
                props.showAlert("danger", "Email Address Not Found.", 5000);
            }

            else if (x === 200) {
                props.showAlert("success", "Password Changed Successfully.", 3000);
                
            }

            else if (x === 404) {
                props.showAlert("danger", "Log In First.", 3000);
                

            }
            else {
                props.showAlert("danger", "Something Went Wrong. Try Again.", 5000);
            }
            setCred2({ email: "", password: "", confPassword: "" });
        } else {
            x = await (changePassword(cred.password));
            if (x === 401) {
                props.showAlert("danger", "Email Address Not Found.", 5000);
                
            }

            else if (x === 200) {
                props.showAlert("success", "Password Changed Successfully.", 3000);
                
            }

            else if (x === 404) {
                props.showAlert("danger", "Log In First.", 3000);
                

            }
            else {
                props.showAlert("danger", "Something Went Wrong. Try Again.", 5000);
            }
            setCred({ email: "", password: "", confPassword: "" });
        }


    }



    if (localStorage.getItem("user")) {
        return (
            <div className="container mx-20">
                {/* <Loader loading={loading} message="Logging In"/> */}
                <h1 style={{ "color": "black" }} className="my-4">Reset Password</h1>
                <form className="mx-10" >

                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword1" style={{ "color": "black" }}>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={change} value={cred2.password} placeholder="Password" />
                        <small id="emailHelp" className="form-text " style={{ "color": "black" }}>We'll never share your Password with anyone else.</small>
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword2" style={{ "color": "black" }}>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" name="confPassword" onChange={change} value={cred2.confPassword} placeholder="Confirm Password" />
                        <small id="emailHelp" className="form-text " style={{ "color": "black" }}>We'll never share your Password with anyone else.</small>
                    </div>

                    <div className="my-1">
                        <button type="submit" className="btn btn-primary" onClick={submit} disabled={((cred2.password.length < 8) || (cred2.password !== cred2.confPassword) ? true : false)}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="container mx-20">
            {/* <Loader loading={loading} message="Logging In"/> */}
            <h1 style={{ "color": "black" }} className="my-4">Reset Password</h1>
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

                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword2" style={{ "color": "black" }}>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" name="confPassword" onChange={change} value={cred.confPassword} placeholder="Confirm Password" />
                    <small id="emailHelp" className="form-text " style={{ "color": "black" }}>We'll never share your Password with anyone else.</small>
                </div>

                <div className="my-1">
                    <button type="submit" className="btn btn-primary" onClick={submit} disabled={((cred.password.length < 8) || (cred.password !== cred.confPassword) ? true : false)}>Submit</button>
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

export default ResetPassword
