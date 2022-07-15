import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import { Link,useNavigate } from "react-router-dom"

const Navbarx = () => {
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem("user");
        navigate("/login");

    }

    return (
        
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand ><Link to="/" style={{ color: "black", textDecoration: "none" }}>Auth</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {!localStorage.getItem('user') &&<Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to="/register" style={{ color: "grey", textDecoration: "none"}}>Register</Link></Nav.Link>
                            <Nav.Link><Link to="/login" style={{ color: "grey", textDecoration: "none" }}>Login</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>}

                    {localStorage.getItem('user') &&<Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to="/resetpassword" style={{ color: "grey", textDecoration: "none"}}>Change-Password</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>}

                    {localStorage.getItem('user') &&<Button variant="primary" onClick={handleLogout}>Logout</Button>}
                </Container>
            </Navbar>
        
    )
}

export default Navbarx
