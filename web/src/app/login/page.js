"use client"
import axios from "axios"
import { api, endpoints, serverip, wrapEndpoint } from "../config/server"
import { useContext, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AppContext } from "../context/appContext"
import '../styles/auth.scss'
import { redirectPaths } from "../config/utils"
export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)
    const router = useRouter()
    const {setUser, setAuth,auth,user} = useContext(AppContext)
    const pathname = usePathname();
    redirectPaths(auth,user,pathname,router)
    async function loginAccount(){
        setErrors(null)
       await api.post(endpoints.login,
        {
         
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
                    <h1>Login</h1>
                    <span>
                        Welcome back! Please login to your account
                    </span>
                </div>
 
                    <form action="">
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
                             onClick={loginAccount}

                            >Login</a>
                        </div>
                    </form>
       
                <div className="auth-form-footer">
                    <p>Don't have an account? <a href="register">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}