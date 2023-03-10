import axios from 'axios';
import {
    API_URL,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from '../constants/userConstants';



export const login=(email,password)=> async (dispatch)=>{

    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(`${API_URL}/api/users/login`,{email,password},config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('MyBlogUserInfo',JSON.stringify(data))




    }catch(error){
          dispatch({
              type:USER_LOGIN_FAIL,
              payload:error.response && error.response.data.message ? error.response.data.message : error.message,
          })
    }
}



export const register=(name,email,password)=> async (dispatch)=>{

    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(`${API_URL}/api/users/signup`,{name,email,password},config)

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('MyBlogUserInfo',JSON.stringify(data))



    }catch(error){
          dispatch({
              type:USER_REGISTER_FAIL,
              payload:error.response && error.response.data.message ? error.response.data.message : error.message,
          })
    }
}


export const getUserDetails=(id)=> async (dispatch,getState)=>{

    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },} = getState()   //destracter the userLogin.userInfo directly through getState() function.
       

        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get(`${API_URL}/api/users/${id}`,config)


        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })




    }catch(error){
          dispatch({
              type:USER_DETAILS_FAIL,
              payload:error.response && error.response.data.message ? error.response.data.message : error.message,
          })
    }
}



export const logout = ()=>(dispatch)=>{

    localStorage.removeItem('MyBlogUserInfo')

    dispatch({
        type: USER_LOGOUT
    })
}
