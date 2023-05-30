import {useContext, useEffect,useState }  from "react";
import SearchIcon from "../../Img/ri_search-line.svg";
import ProfileIcons from "../../Img/Group 137.png";
import NotificationIcon from "../../Img/pajamas_notifications.svg";
import Images from "../../Img/blank-profile-picture-973460__340.webp";
import TalentfestTabes from "./TalentfestTabes";
import { AuthContext } from "../Utils/AuthContextProvider";


const TalentfestData = () => {
    const {logoutFun} = useContext(AuthContext);
    let notification = 40;

    let Dates = new Date().toLocaleString();
    // console.log(Dates);
    const [Sales,setSales] = useState()
  
   useEffect(() => {
    setSales("sales");
   }, [])
  return (
    <div>
    <div className='row mt-3 mb-2 ms-1' style={{overflowY:"none",postition:"fixed"}}>
         
    <div className='col-6'>
        <div className='row'>
           <div className='col-8'>
           <div className='row' style={{border:"1px solid #D9D9D9",height:"40px",borderRadius:"7px",backgroundColor:'#fff'}}>
              <div className='col-2 mt-1'>
                <img alt='SearchIcon' src={SearchIcon}/>
              </div>
              <div className='col-10 mt-1' style={{marginLeft:"-20px"}}>
              <input className='border-0 w-100' placeholder='Search within Talentfest' style={{textDecoration:"none", outline: "none",color:"#272727"}}/>
              </div>
           </div>
           </div>
           <div className='col-4'>
           <div className='row'>
           <div className='col-6 '>
           <img  alt="#" src={ProfileIcons} style={{width:"85%"}}/>
           </div>
           <div className='col-6'>
           <div style={{width:"40px",height:"40px",borderRadius:"50%",border:"1px solid #D9D9D9",justifyContent:"center"}}>
           <p  style={{justifyContent:"center",marginTop:"10px",justifyItems:"center",textAlign:"center",fontSize:"14px"}}>+ {notification}</p>
           </div>
           </div>
           </div>
           </div>
        </div>
    </div>
    <div className='col-6'>
       <div className='d-flex' style={{justifyContent:"end",textAlign:"center",alignItems:"center",}}>
       <div className='d-flex' style={{width:"80px",height:"40px",borderRadius:20,border:"1px solid #D9D9D9",justifyContent:"center",backgroundColor:"#F5F5F5"}}>
                 <div className='mt-1'>
                    <img alt='#' src={NotificationIcon}/>
                 </div>
                <div className='ms-3' style={{width:"35px",marginTop:"1px",height:"35px",borderRadius:"50%",border:"1px solid #D9D9D9",justifyContent:"center",backgroundColor:"#CC1313",}}>
                    <p  style={{justifyContent:"center",marginTop:"5px",justifyItems:"center",textAlign:"center",color:"#fff"}}>{notification} + </p>
                </div>
       </div>
       <div className='d-flex ms-4' style={{justifyContent:"space-between",marginRight:"30px"}}>
        <div style={{width:"40px",height:"40px",borderRadius:"50%",justifyContent:"center",overflow:"hidden"}}>
            <img alt='' src={Images} width="100%"/>
        </div>
            <div class="nav-item dropdown ms-2 mt-2 ">
            <span class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></span>
            <ul class="dropdown-menu" style={{backgroundColor:"#000"}}>
                <li class="dropdown-item text-white" >View Profile</li><hr style={{color:"#fff"}}/>
                <li class="dropdown-item text-white">View Task</li><hr style={{color:"#fff"}}/>
                <li class="dropdown-item text-white"><span onClick={()=>logoutFun()}>Log-Out</span></li>
            </ul>
            </div>
       </div>
       </div>
    </div>
   </div>
    

   <div className='p-2'>
            <TalentfestTabes/>
           </div>
      
   
    
    </div>
  )
}

export default TalentfestData