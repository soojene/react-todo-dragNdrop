import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';


const Box = styled.div< {isDragging: boolean}>`
    padding: 5px 20px;
    margin: 5px 5px;
    background-color:${(props)=>(props.isDragging? "pink" : "#616161")};
    box-shadow: ${(props)=>(props.isDragging? "0px 1px 5px gray" : "none")};
`;

interface IDragabbleProps {
    toDoId: number;
    toDoText:string;
    index: number;
}


function DraggingBox ({toDoId, toDoText, index}: IDragabbleProps){
    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}> 
            {(magic, snapshot) => (
                <Box
                    isDragging = {snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                🥕
                {toDoText}
                </Box>
        )}
    </Draggable>);
}

export  default React.memo(DraggingBox);