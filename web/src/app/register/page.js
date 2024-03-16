"use client"
import axios from "axios"
import Nav from "../components/Nav"
import '../styles/auth.scss'
import { api, endpoints, serverip, wrapEndpoint } from "../config/server"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { AppContext } from "../context/appContext"
export default function Register(){
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)
    const router = useRouter()
    const {setUser, setAuth} = useContext(AppContext)
    async function createAccount(){
        setErrors(null)
       await api.post(endpoints.register,
        {
            firstname,
            lastname,
            email,
            password
        })
        .then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setUser(response.data);  
            setAuth(true);
            router.push('/')
            
        }
        ).catch((err) => {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                // Handle other types of errors here, if necessary
            }
    
        })
    }
    return (
        <div className="auth">
            <div className="auth-form">
                <div className="auth-form-header">
                    <h1>Register</h1>
                    <span>
                        Welcome! Please create an account
                    </span>
                </div>
 
                    <form action="">
                    <div className="input-group">
             
             <input type="text" placeholder="Firstname"
             onChange={(e) => setFirstname(e.target.value)}
             className={errors?.firstname ? 'error' : ''}

             />
                                                                    {errors && errors.firstname ? <span className="error">{errors.firstname}</span> : null}

         </div>
         <div className="input-group">
             
                            <input type="text" placeholder="Lastname"
                                         className={errors?.lastname ? 'error' : ''}
                            onChange={(e) => setLastname(e.target.value)}/>
                                                       {errors && errors.lastname ? <span className="error">{errors.lastname}</span> : null}

                            
                        </div>
                        <div className="input-group">
             
                            <input type="email" placeholder="Email"
                            className={errors?.email ? 'error' : ''}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                           {errors && errors.email ? <span className="error">{errors.email}</span> : null}
                        </div>
                        <div className="input-group">
            
                            <input type="password" placeholder="Password"
                                                                     className={errors?.password ? 'error' : ''}

                            onChange={(e) => setPassword(e.target.value)}
                            />
                                                                                   {errors && errors.password ? <span className="error">{errors.password}</span> : null}

                        </div>
                        <div className="btn-group">
                            <a  
                            onClick={createAccount}
                            >
                                
                                Register</a>
                        </div>
                    </form>
       
                <div className="auth-form-footer">
                    <p>Already have an account <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    )
}