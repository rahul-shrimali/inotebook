import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';


const Login = () => {
    const [cred, setCred] = useState({email :"", password:""});
    const c = useContext(alertContext)
    const {showAlert} = c
    let history = useHistory();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login"
        console.log(JSON.stringify({email: cred.email, password:cred.password }));
        const response = await fetch(url,{
            method : 'POST',
            headers :{
              'Content-Type' : 'application/json',
            },
            body:JSON.stringify({email: cred.email, password:cred.password })
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authToken)
            showAlert("Login successful", "success")
            history.push("/");

        }else{
            showAlert('Invalid credentials', 'danger')
            
        }
    }
    const handleChange = (e) => {
      setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={cred.email} onChange={handleChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={cred.password} onChange={handleChange} name='password' />
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
        
    )
};

export default Login;
