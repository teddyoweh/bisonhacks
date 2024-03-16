"use client"

import { api, endpoints } from "@/app/config/server";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import '../../styles/myshops.scss'

function RenderCreate(){
    return (
        <div className="render-create">
            
        </div>
    )
}
export default function Slug(){
    const pathname = usePathname()
    const shop_id = pathname.split('/').slice(2).join('/'); 
    const [shopData,setShopData] = useState(null)
    async function getProducts(){
        await api.post(endpoints.getShopDetails,{
            shopid:shop_id
        }).then((res)=>{
            setShopData(res.data)
        })
    }

    useEffect(()=>{
        getProducts()
    },[])

    return (
       shopData&& <div className="shop-page">
        <div className="shop-header" 
        style={{
            backgroundImage: `url(${shopData.shop.shopimage})`
        }}
        
        >
            <div className="overlay"></div>
        <div className="title">
           <label htmlFor="
           "> {shopData.shop.shopname}</label>
        </div>
        </div>
        <div className="add-btn">
            <a>
            <i class='bx bx-plus'></i>
            New Products/Service
            </a>

        </div>
        <div className="shop-content">
        {shopData.products.length ==0?
        <div className="empty-products">
            <i class='bx bxs-package'></i>
            <label htmlFor="">
                No Products or Service, Yet!
            </label>
        </div>
        :
        <div className="products">

        </div>
        }
        </div>

        </div>
    )
}