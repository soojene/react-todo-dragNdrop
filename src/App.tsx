
import React, { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState} from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import Container from './drop';
const ViewBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: ${(props)=> props.theme.textColor}; */
  /* background-color:${(props) => props.theme.bgColor}; */
  `;

const Contain = styled.div`
  display: flex;
  `;

const DeleteBox = styled.div<{isDraggingOver:boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  color:${(props)=> props.isDraggingOver? "white" : "black"};
  font-weight: ${(props)=>props.isDraggingOver ? 800 : 600};
  background-color: ${(props)=> props.isDraggingOver ? "darkcyan" : "white"};
  transition: background-color .5s ease-in-out;
`;


//reorder boards
function App() {
  const [todos, setTodos]=useRecoilState(todoState);
  const onDragEnd = ({destination, source, draggableId}:DropResult) => {
    if(!destination) return;
    if (destination.droppableId === source.droppableId){
      setTodos((oldOne)=>{
        const newTodo = [...oldOne[source.droppableId]];
        const item = newTodo[source.index];
        newTodo.splice(source.index, 1);
        newTodo.splice(destination?.index, 0, item);
        return {
          ...oldOne,
          [source.droppableId]:newTodo
        };
      })
    } else if (destination.droppableId !== source.droppableId){
      if(destination.droppableId === "delete"){
        setTodos((old)=>{
          const editBoard = [...old[source.droppableId]];
          editBoard.splice(source.index, 1);
          return{
            ...old,
            [source.droppableId]:editBoard
          }
        })
      }else{
        setTodos((oldOne)=>{
          const startBoard = [...oldOne[source.droppableId]];
          const destinationBoard = [...oldOne[destination.droppableId]];
          const item = startBoard[source.index];
          startBoard.splice(source.index,1);
          destinationBoard.splice(destination.index, 0, item);
          return{
            ...oldOne,
            [source.droppableId]:startBoard,
            [destination.droppableId]:destinationBoard
          };
        })
      }
    }
  };

  useEffect(()=>{
    const bringDatas = localStorage.getItem("datas");
    if(bringDatas === null){return;}
    // console.log(todos);
    // console.log(bringDatas);
    setTodos(
      JSON.parse(bringDatas)
    );
  },[]);
  useEffect(()=>{
    localStorage.setItem("datas", JSON.stringify(todos));
  })
  return (
    <ViewBox>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="delete">
        {(tomato, snapshot)=>(
          <DeleteBox isDraggingOver={snapshot.isDraggingOver} ref={tomato.innerRef} {...tomato.droppableProps}>Drop here to Delete
          {tomato.placeholder}
          </DeleteBox>
        )}
      </Droppable>
      <Contain>
        {Object.keys(todos).map((board)=>(
          <Container boardId={board} key={board} toDos={todos[board]} />
        ))}
      </Contain>
    </DragDropContext>
    {/* button to create another board */}
    {/* <button>➕ADD BOARD</button> */}
    </ViewBox>
  );
}



export default App;
