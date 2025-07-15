import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import { useTheme, Box, styled } from '@mui/system'
import Arrowrightwhite from "../../image/Arrowrightwhite.svg"

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}))





const DraggableElement = ({ prefix, elements, companyDetails }) => {

  const theme = useTheme()

  return (
    <div className="droppableColumns">
      <div className='titlewitharrow'>
        <Title>{prefix}</Title>
        <img src={Arrowrightwhite} />
      </div>

      <Droppable droppableId={`${prefix}`} >
        {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {elements.map((item, index) => (
                item ? <ListItem key={item.id} item={item} index={index} companyDetails={companyDetails} /> : null
              ))}
              {provided.placeholder}
            </div> 
        )}
      </Droppable>
    </div>
  );
}
export default DraggableElement;
