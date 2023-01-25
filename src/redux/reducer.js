import {postdata } from "./types";

const initState =[];

const reducer =(state=initState,{type,payload})=>{
      switch (type) {
        case postdata:{
             return [...state,payload]  
        }
        default:{
            return state;
        }
      }
}

export default reducer;