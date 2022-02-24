import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = () => {

  let history = useHistory();
  const [user, setuser] = useState({name : "", email : "", password : "", cpassword :""})

  const onChange = (e)=>{
    setuser({...user, [e.target.name] : e.target.value})
  }

  const onSubmit = async (e)=>{
      e.preventDefault();

      const url = "http://localhost:5000/api/auth/createUser"
      const {name, email, password, cpassword} = user 
      if(password !== cpassword){
          alert("Password must be same")
          return
      }
      const response = await fetch(url,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({name : name,email : email,password: password})
      })
      const json = await response.json()
      console.log(json);
      if(json.success){
        localStorage.setItem('token', json.authtoken)
        history.push("/")
      }else{
        alert("Invalid credentials ")
      }
  }
  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name = "name" value={user.name} onChange={onChange} />
        </div> 
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={user.email} aria-describedby="emailHelp" name = "email" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div> 
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={user.password} name = "password" onChange={onChange} minLength={5}/>
        </div>
        <div className="mb-3"> 
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="text" className="form-control" id="cpassword" name='cpassword' value={user.cpassword} onChange={onChange} minLength={5} />
        </div>
       
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
};

export default SignUp;
