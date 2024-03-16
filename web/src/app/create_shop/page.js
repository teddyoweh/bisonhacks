"use client"
import { useContext, useEffect, useState } from "react";
import "../styles/create_shop.scss";
import { api, endpoints } from "../config/server";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function CreateShop() {
    const type_options = [
        'Products',
        'Services',
        'Both'
    ]
    const categories ={
        "Products":[],
        "Services":[],
    }
    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        setShopImage(imageFile);
    };
    const [shopName, setShopName] = useState('')
    const [shopType, setShopType] = useState(type_options[0])
    const [shopDescription, setShopDescription] = useState('')
    const [shopGlobal,setShopGlobal] = useState(false)
    const [shopLocation,setShopLocation] = useState('')
    const {user} = useContext(AppContext)
    async function CreateShop(){
        const formData = new FormData();
        formData.append('file', shopImage);
        formData.append('upload_preset', 'e626o5uf'); 
        const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/ddaxprhmz/image/upload', formData); // Replace 'your_cloud_name' with your Cloudinary cloud name

 
        const imageUrl = cloudinaryResponse.data.secure_url;
        await api.post(endpoints.createShop,
            {
                name:shopName,
                description:shopDescription,
                type:shopType,
                global:shopGlobal,
                location:shopLocation,
                userid:user._id,
                shopImage:imageUrl
            })
            .then(res=>{
                router.push("/my_shops")
            })
            
    }
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [shopImage,setShopImage] = useState(null)
    const router =  useRouter()
   async  function searchLocation(){
        try {
            const response = await axios.get('https://api.radar.io/v1/search/autocomplete', {
              headers: {
                Authorization: 'prj_live_pk_d97c49e93eb7984d907edb0b4d795741444a347c',
              },
              params: {
                query:shopLocation,
                near:`${latitude},${longitude}`
              },
            });
            setLocations(response.data.addresses);
          
          } catch (error) {
            console.error('Error searching for locations:', error);
            setLoading(false);
          }
    }
    useEffect(() => {
        const fetchLocationData = async () => {
          try {
            const response = await axios.get('https://ipapi.co/json/');
            const data = response.data;
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching location:', error);
            setLoading(false);
          }
        };
    
        fetchLocationData();
      }, []);
    
  
  return (
    <div className="create_shop">
    <div className="title">
        <label className="h1">Create Shop</label>
    </div>
    <div className="content">
    <div className="groups">
        <div className="group">
        {shopImage ? (
                            <img src={URL.createObjectURL(shopImage)} alt="Shop Cover" />
                        ) : (
                            <label htmlFor="image-upload" className="image-upload">
                                <i className="bx bx-upload"></i>
                                Upload Shop Cover Image
                                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        )}
        </div>
    <div className="group">
        <input type="text" 
        className="shop-name"
        placeholder="Shop Name"
        value={shopName}
        onChange={(e)=>{
            setShopName(e.target.value)
        }}
        
        />
    </div>
    <div className="group typebody">
        <div className="types">


        {
            type_options.map((type, index) => {
                const classx = type === shopType ? 'type active' : 'type'
                return (
                    <div key={index} className={classx}
                    onClick={() => setShopType(type)}
                    >
                         <label htmlFor={type}>{type}</label>
                    </div>
                )
            })
        
        }
                </div>
    </div>
    <div className="group">
        <textarea type="text" 
        className="shop-description"
        placeholder="Shop Description"
        value={shopDescription}
        onChange={(e)=>{
            setShopDescription(e.target.value)
        }}
        
        />
    </div>
    <div className="group location">
        <div className="top">
      
   
        <input type="text" 
        className="shop-name"
        placeholder="Shop Location"
        value={shopLocation}
        onChange={(e)=>{
            setShopLocation(e.target.value)
            searchLocation()
        }}
        
        />
        <div className="select-global"
        onClick={()=>{
            setShopGlobal(!shopGlobal)
        }}
        >
            <i className="bx bx-map"></i>
            <label htmlFor="">
                Global
            </label>
            {
                shopGlobal?
                <i className="bx bxs-check-circle"></i>
                :
                <div className="empty-circle"></div>
            }
        </div>
        </div>
        {
 locations && shopLocation.length>0&& 
  
        <div className="bottom">
            {
                locations && shopLocation.length>0&& locations.slice(0,5).map((lox,index)=>{
                    return (
                        <div className="location-div"
                        key={index}
                        onClick={()=>{
                            setShopLocation(lox.formattedAddress)
                        }}
                        >
                            {lox.formattedAddress}
                        </div>
                    )
                })
            }
        </div>
              }
    </div>
    <div className="group">
    <a 
    className="btn"
                             onClick={CreateShop}

                            >Create Shop</a>
    </div>
    </div>
    </div>
    </div>
  );
}