"use client"
import Link from 'next/link';
import '../styles/nav.scss'
import { useContext, useState } from 'react';
import { AppContext } from '../context/appContext';
export default function Nav() {
  const { user,auth,loading} = useContext(AppContext);
     const links = [
        {
          label: "Home",
          link: "/"
        },
        {
          label: "Categories",
          link: "#"
        },
        {
          label: "Create Shop",
          link: "/create_shop"
        },
        {
          label: "Saved",
          link: "#"
        },
        {
          label: "Cart",
          link: "#"
        }
      ];
    const [userHover,setUserHover] = useState(false)

    const profileoptions =[
      // {
      //   label:"Upload Post",
      //   link:"",

      // },
      {
        label:"Profile",
        link:"profile",

      },
      {
        label:"My Shops",
        link:"/my_shops",

      },
      {
        label:"History",
        link:"profile",

      },
      
    ]
  return (
    <>

   
    {
      loading==true ? <div className="loader-div">
      <span class="loader"></span>
        </div>: <div className="nav">
      
      <div className="nav-logo">
       MileOne
      </div>
     <div className="nav-links">
            {links.map((link, index) => (
              <Link href={link.link} key={index} className="nav-link">{link.label}</Link>
            ))}
     </div>
   {auth==true && user ?<div className="nav-profile"
   
   onClick={()=>{
    setUserHover(!userHover)
   }}
   onMouseOver={()=>{
    setUserHover(true)
   }}
   onMouseOut={()=>{
    setUserHover(false)
   }}
   
   >
    <div className="top">


              <img src={user.uimg} alt="" />
              <label htmlFor="">
                  {user.firstname} {user.lastname}
              </label>
              <i class='bx bx-chevron-down'></i>  
              </div>
              {userHover&&<div className="dropdown"
                 onMouseOver={()=>{
                  setUserHover(true)
                 }}
                 onMouseOut={()=>{
                  setUserHover(false)
                 }}
              >
                {
                  profileoptions.map((prox,index)=>{
                    return (
                      <div className="dropdown-item"
                      key={index}
                      >
                        <Link href={prox.link}>
                        {prox.label}
                        </Link>
                      </div>
                    )
                  })
                }


              </div>}
           
   </div>:  <div className="btns">
          <a href="/login" className="nav-link">Login</a>
          <a href="/register" className="nav-link">Sign Up</a>
     </div>}

  </div>

    }
    </>
  );
}