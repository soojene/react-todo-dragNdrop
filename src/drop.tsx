import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Itodo, todoState } from './atoms';
// import { useRecoilValue } from 'recoil';
// import styled from 'styled-components';
// import { todoState } from './atoms';
import DraggingBox from './drag';

interface IBoard {
    isDraggingOver: boolean
}

const BoardBox = styled.div<IBoard>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: ${(props)=> props.isDraggingOver? "white": "lightgray"};
    transition: background-color 0.3s ease-in-out;
`;

const DropBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px;
    margin: 5px 5px;
`;

interface IBoardProps {
    toDos: Itodo[];
    boardId: string;
}

interface IForm {
    todo:string
}

function Container ({toDos, boardId}:IBoardProps){
    const setToDos= useSetRecoilState(todoState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const formSubmit = ({todo}:IForm)=>{
        // console.log(todo, boardId);
        const addToDo = {
            id:Date.now(),
            text: todo,
        };
        setToDos((allBoard)=>{
            return {
                ...allBoard,
                [boardId]:[addToDo, ...allBoard[boardId]]
            }
        })
        setValue("todo", "")
    };

    return(   
        <DropBox>
            {boardId}
            <form onSubmit={handleSubmit(formSubmit)}>
                <input {...register("todo", {required:false})} type="text"/>
            </form>                             
            <Droppable droppableId={boardId}>    
            {(tomato, snapshot) => (         
                <BoardBox isDraggingOver ={snapshot.isDraggingOver} ref={tomato.innerRef} {...tomato.droppableProps}>
                {toDos.map((toDo, index) => (
                    <DraggingBox key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text}/>
                    ))}
                {tomato.placeholder}
                </BoardBox>
            )}
            </Droppable>
        </DropBox>
    )
    // return <>hi</>;
}

export default React.memo(Container);
