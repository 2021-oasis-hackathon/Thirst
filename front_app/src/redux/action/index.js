import axios from 'axios'
const USER_LOGIN = 'USER_LOGIN'

export const Login = (id, pw)=>{ 
    return((dispatch)=>{
        dispatch({
            type : USER_LOGIN,
            
        });
    })
}
