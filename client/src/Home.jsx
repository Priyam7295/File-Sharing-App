import React from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate =useNavigate();

  function goLogin(){
    navigate("/login");
  }
  function goSignup(){
    navigate("/signup");
  }
  async function goLogout  (){
    try {
      const response =await axios.get("http://localhost:8000/logout",{withCredentials:true});
      if(response.status===200){
        swal({
          title: "Logged Out Successfully",
          icon: "success",
          
        })
        .then((val) => {
            navigate("/");
          });
          console.log("Logged out");
        }


    } catch (error) {
      console.log("err is",error);
      if(error.response.data){
        swal({
          title: "You are already Logged Out",
          icon: "info",
          
        })
      }

    }
  }

  return (
    <>
      <div>Home</div>
      <button onClick={goLogin} >Login</button>
      <button onClick={goSignup} >Signup</button>
      <button onClick={goLogout}  >Logout</button>
    </>
  )
}
