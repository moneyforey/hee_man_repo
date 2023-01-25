import { postdata } from "./types";
export const postDataApi=(payload)=>{
    return {type:postdata,payload:payload}
}