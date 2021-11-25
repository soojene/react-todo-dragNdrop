import { atom } from 'recoil';

export interface Itodo {
    id:number;
    text:string;
}

export interface IToDo {
    [key:string]:Itodo[];
}

export const todoState = atom<IToDo>({
    key:"ToDo",
    default:{
        "Todo":[],
        "Doing":[],
        "Done":[],
        "Veggi":[]
    }
});