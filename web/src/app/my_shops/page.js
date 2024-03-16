"use client"

import { useContext, useEffect, useState } from "react"
import { api, endpoints } from "../config/server"
import { AppContext } from "../context/appContext"
import "../styles/myshops.scss"
import Link from "next/link"
export default function MyShops(){
    const {user} = useContext(AppContext)
    const [shopsData, setShopData] = useState(null)
    async function fetchData(){
        
        await api.post(endpoints.fetchUserShops,{
            userid:user?._id
        }).then(res=>{
            setShopData(res.data.shops)
        })
    }

    useEffect(()=>
    {
 


        fetchData()
 
    },[user])
    return (
        <div className="myshops">
            <div className="header">
                <label htmlFor="">
                    My Shops
                </label>
            </div>
            <div className="shops-list">
                {
                 shopsData&&   shopsData.map((shp,index)=>{
                        return (

                            <Link className="shop-item"
                            key={index}
                            href={`my_shops/${shp._id}`}
                            >
                            
                                    <img src={shp.shopimage} alt="" />
                             
                                <div className="top">
                 
<label htmlFor="">
    {shp.shopname}
</label>     
    </div>
    <div className="bottom">
        <i className="bx bx-map"></i>
        <label htmlFor="">
            {shp.location}
        </label>
    </div>
                          </Link>
                        )
                    })
                }
                {/* <div className="shop-add-item">
                <label htmlFor="
                ">
                Create Shop
                </label>
                </div> */}
            </div>
        </div>
    )
}