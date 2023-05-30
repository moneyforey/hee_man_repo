import { login_error, login_loading, login_sucess, logout } from "./AuthTypes";

const AuthReducer =(state,{type,payload})=>{
      switch(type){
        case login_loading:{
            return {
                ...state,
                isLoading:true,  
            }
        }
        case login_error:{
            return{
                ...state,
                isLoading:false,
                isError:true,
            }
        }
        case login_sucess:{
            localStorage.setItem("token",payload);
            return{
                isLoading:false,
                isAuth:true,
                token:payload  
            }
        }

        case logout:{
            localStorage.removeItem("token");
            return{
                isLoading:false,
                isError:false,
                isAuth:false,
                token:null  
            }
            
        }

        default :{
            return {
                ...state
            }
        }
      }       
}

export default AuthReducer;