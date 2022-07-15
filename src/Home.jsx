import React from 'react'

const Home = (props) => {

    if(props.isTrue){
        props.showAlert("success","Successfully Logged In",3000);
        props.setIsTrue(false);
    }
  return (
    <div className="container mx-20 my-5"><h1>Welcome</h1></div>
  )
}

export default Home
