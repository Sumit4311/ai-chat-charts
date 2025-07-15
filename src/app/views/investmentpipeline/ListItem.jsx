import { Draggable } from "react-beautiful-dnd";


import React, { useMemo,useEffect ,useState} from "react";
import { useTheme, Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import {getDataFromApi,postDataFromApi} from '../../services/CommonService';
import {getSingleplmnt} from '../../services/api';

const TextField =  styled('div')(({ theme }) => ({
    width: '100%',
    marginBottom: '16px',
}))

const CardHeader =  styled('div')(({ theme }) => ({
    fontWeight: 500,
}))

const Author =  styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}))

const CardFooter =  styled('div')(({ theme }) => ({
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
}))

const DragItem =  styled('div')(({ theme }) => ({
    padding: '10px',
    borderRadius: '6px',
    boxShadow: ' 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    display: 'grid',
    justifyContent: 'space-between',
    gridGap: '20px',
    flexDirection: 'column',
    margin: '0 0 15px 0',
}))





const ListItem = ({ item, index ,companyDetails}) => {
  
  const theme = useTheme()
  const navigate = useNavigate();
  const[singleplmnt,setsingleplmnt]=useState([])

  useEffect(() => {
      
      if (item.companyId) {
          getsingleplmnt();
      } 
      
  }, [])

const getsingleplmnt = async () => {
   if(companyDetails){
    companyDetails.map((opt)=>{
       if(opt.id == item.companyId){
        setsingleplmnt(opt)
       }
    })
   }
   
}

  const handleElementClcik=(e,id)=>{
    if(e.detail == 2){
      navigate('/investmentpipeline/pipelinemanagement/view/'+id)
    }
    /* switch (e.detail) {
      case 1:
        console.log("click");
        break;
      case 2:
        console.log("double click");
        break;
      case 3:
        console.log("triple click");
        break;
    } */
  }
  return (
    <Draggable draggableId={item.id} index={index} className="dragabbleid">
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="content"
            onClick={e => handleElementClcik(e,item.companyId)}
          >
            <div className={
              singleplmnt && 
              singleplmnt.companyHistoryList && 
              singleplmnt.companyHistoryList.length>0 && 
              singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length-1].status && 
              singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length-1].status=='Submitted' ? "companyname reviewed" : 
              singleplmnt && singleplmnt.companyHistoryList && singleplmnt.companyHistoryList.length>0 && 
              singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length-1].status && 
              singleplmnt.companyHistoryList[singleplmnt.companyHistoryList.length-1].status=='Declined' ? "companyname declined striked" : "companyname"} >
               {item.content}
            </div>
            
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
