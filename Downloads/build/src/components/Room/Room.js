import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import RoomData from './RoomData';


const Room = () => {
    const Navigate = useNavigate();
    const  CheckToken = async(Token)=>{
    var formdata = new FormData();
    formdata.append("token", Token);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://brainbucks.co.in/api/admin/check-token", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      if(result.status==1){
         console.log("nice");
      }
      else{
        Navigate("/");
      }
    })
      .catch(error => console.log('error', error));
  }

  

  useEffect(() => {
    if(!localStorage.getItem("token")){
     Navigate("/");
    }  
    else{
      CheckToken(localStorage.getItem("token"));
     }     
 }, []);


  return (
   <>
  
       <div style={{overflow:"hidden"}}>
            <div className="row">
                <div className='col-2'>
                 <SideBar/>
                </div>
                <div className='col-10'>
                <div className='container'>
                  <RoomData/>
                </div>
                </div>
            </div>
        </div>
   </>
  )
}

export default Room;