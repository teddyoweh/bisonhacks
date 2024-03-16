"use client"
import Image from "next/image";
import "./styles/landing.scss"
import hero1 from './assets/hero1.png'
import hero2 from './assets/hero3.png'
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
 
export default function Home() {
  // const catergories = [
  //   'Electronics',
  //   'Fashion',
  //   'Food',
  //   'Health & Beauty',
  //   'Services',
     

  // ]
  function getGoogleDriveVideoSrc(driveLink) {
    // Regular expression to match Google Drive video links
    const regex = /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|www\.googledrive\.com\/(?:file\/d\/|open\?id=|uc\?id=))([^&\n#?]+)/g;
    
    // Extract file ID from the provided link
    const match = regex.exec(driveLink);
    if (!match) {
        console.error('Invalid Google Drive link.');
        return null;
    }

    const fileId = match[1];
    
    // Construct direct link to fetch the video
    const videoSrc = `https://drive.google.com/uc?id=${fileId}&export=download`;

    return videoSrc;
}
  const videos = [
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305755/Content_Teddy_O/Black_Forest_Cake_shorts_yfzejm.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305759/Content_Teddy_O/Hybrid_Lash_Extensions_cvv7pn.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/Sleek_Frontal_Ponytail_On_Protective_Cap_Invisible_Lace_100_Straight_Human_Hair_elfinhair_lvs0uf.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305759/Content_Teddy_O/Transformation_barber_haircut_faded_tranformation_afro_ykeydd.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/This_is_one_of_my_best_cakes_shorts_dla2o7.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305758/Content_Teddy_O/Step_By_Step_Back_Taper_Tutorial_360silk_haircut_barber_haircuttutorial_howtotaper_r5lhoq.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/Learn_Stitch_Braids_421_jc8jwn.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305755/Content_Teddy_O/Black_Forest_Cake_shorts_yfzejm.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305758/Content_Teddy_O/Men_s_Stitch_Braids_braids_mensbraids_stitchbraids_wuyxio.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/Sleek_Frontal_Ponytail_On_Protective_Cap_Invisible_Lace_100_Straight_Human_Hair_elfinhair_lvs0uf.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305755/Content_Teddy_O/Black_Forest_Cake_shorts_yfzejm.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305759/Content_Teddy_O/Hybrid_Lash_Extensions_cvv7pn.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/Sleek_Frontal_Ponytail_On_Protective_Cap_Invisible_Lace_100_Straight_Human_Hair_elfinhair_lvs0uf.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305759/Content_Teddy_O/Transformation_barber_haircut_faded_tranformation_afro_ykeydd.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/This_is_one_of_my_best_cakes_shorts_dla2o7.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305758/Content_Teddy_O/Step_By_Step_Back_Taper_Tutorial_360silk_haircut_barber_haircuttutorial_howtotaper_r5lhoq.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/Learn_Stitch_Braids_421_jc8jwn.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305755/Content_Teddy_O/Black_Forest_Cake_shorts_yfzejm.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305758/Content_Teddy_O/Men_s_Stitch_Braids_braids_mensbraids_stitchbraids_wuyxio.mp4',
'https://res.cloudinary.com/ddaxprhmz/video/upload/v1710305757/Content_Teddy_O/Sleek_Frontal_Ponytail_On_Protective_Cap_Invisible_Lace_100_Straight_Human_Hair_elfinhair_lvs0uf.mp4'
]
  const catergories = [
    {
      label: 'Electronics',
      icon:'bx bx-devices'
    },
    {
      label: 'Fashion',
      icon:'bx bx-shopping-bag'
    },
    {
      label: 'Restaurants',
      icon:'bx bx-bowl-hot'
    },
    {
      label: 'Beauty',
      icon:'bx bx-heart'
    },
   
    {
      label:"Products",
      icon:"bx bx-package"
    },
    {
      label: 'Fitness',
      icon:'bx bx-dumbbell'
    },
    {
      label: 'Services',
      icon:'bx bx-male'
    },

     
   
    
  
     
    
    
   

  ]
  const [isSearchBoxAbsolute, setIsSearchBoxAbsolute] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = document.querySelector('.hero').getBoundingClientRect().bottom;
      setIsSearchBoxAbsolute(heroBottom <= 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="landing">
 
   
 
          <div className="head">
            <label htmlFor="">
              <label htmlFor="">
              Shop with 
              </label>
              <span>
                <label htmlFor="">Videos</label>
           
              </span>
            </label>
          </div>
          <div className="center-box">

    
          <div className="center">

    
          <div className="se">
          <div className="location-box">
            <div className="left">

      
          <i class='bx bx-map'></i>
<label htmlFor="">
  Baltimore, MD
  </label>     
  </div>
   
  <i class='bx bx-chevron-down'></i>   
 
          </div>
          <div className="search-box">
            <div className="left">

 
          <i class='bx bx-search'></i>
            <input type="text" placeholder="What are you looking for ... " />
            </div>
            <i class='bx bx-slider-alt'></i>
          </div>
          </div>
          <div className="categories">
            {
              catergories.map((category, index) => {
                return (
                  <div key={index} className="category">
                    <div className="category-img"></div>
                    <i className={category.icon}></i>
                    <label htmlFor="">{category.label}</label>
                  </div>
                )
              })
            }
          </div>      </div>      </div>
       
      
 
      <div className="content">
        <div className="content-body">
          {
         videos.map((item, index) => {
 
              return (
                <div key={index} className="product">
                  <div className="product-body">
                  <video width="100%" height="100%" 
                  controlsList="nodownload"
                  // control
                  //make it play on click and if playing then pause
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.paused ? e.target.play() : e.target.pause();
                  }
                  }

                  // controls

                    src={item}
                  />
                  {/* <div className="overlay">
                    <div className="overlay-btns">
                      <div className="play">
                        <i class='bx bx-play'/>
                      </div>

                  </div> */}
                  
                  </div>
               
                  <div className="product-bottom">

              
                  <div className="product-label">
                    <label htmlFor="">Product Name</label>
                    <div className="price">
                      <span>
                        {
                      index % 3 === 0 ? '$20/h' : '$114'
                        }
                      </span>
                    </div>

                  </div>
                  <div className="product-btns">
                  <div className="add-cart">
                    {/* <i class='bx bx-cart'/> */}
                    <label htmlFor="">
                      Add to Cart
                    </label>
                  </div>
                  <div className="save">
         
                    <label htmlFor="">
                      Save
                    </label>
                     
                  </div>
                  </div>
                  </div>
                </div>
              )
            })

          }
        </div>
      </div>
    </div>
  );
}
