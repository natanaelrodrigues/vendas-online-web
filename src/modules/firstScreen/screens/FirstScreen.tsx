import { Spin } from "antd"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { ProductRoutesEnum } from "../../product/routes"
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext"

const FirstScreen = () =>{
    const { user } = useGlobalContext();
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){
            navigate(ProductRoutesEnum.PRODUCT)
        }
    },[])
  return <Spin />  
}

 export default FirstScreen