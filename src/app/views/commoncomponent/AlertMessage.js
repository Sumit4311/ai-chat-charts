import React,{useEffect,useState} from "react";
import style from 'Assets/style.css'


import SweetAlert from 'react-bootstrap-sweetalert';


export const AlertMessage = (props) => {
   
    const [states,setstates]=useState([]) 
    if(props.alertType=="success"){
        return (
            <>
             {props.alert ? <SweetAlert
                success
                  title="Success!"
                  onConfirm={()=>props.confirm()}
                >
                  {props.alertMessage}
                </SweetAlert> : "" }
                </>
        )
    }else if(props.alertType=="warning"){
        return (
            <>
             {props.alert ? <SweetAlert
                warning
                  title="Warning!"
                  onConfirm={()=>props.confirm()}
                >
                  {props.alertMessage}
                </SweetAlert> : "" }
                </>
        )
    }else{
        return (
        <>
             {props.alert ? <SweetAlert
                error
                  title="Error!"
                  onConfirm={()=>props.confirm()}
                >
                  {props.alertMessage}
                </SweetAlert> : "" }
                </>
                )
    }
}


export default AlertMessage
