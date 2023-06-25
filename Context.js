import {  useState } from "react";
import React from "react";

export const context = React.createContext({
    id : null ,
    editIdHandler : ()=>{},
    editting : false , 
    showForm : false ,
    setFormTrue : ()=>{} ,
    setFormFalse : ()=>{}, 
    setEdittingTrue : ()=>{} ,
    setEdittingFalse : ()=>{} ,
    editData : null ,
    setEditData : ()=>{} ,
})
export const ContextProvider = (props)=>{
    const [isEditting , setIsEditting] = useState(false);
    const [isForm , setIsForm] = useState(false);
    const [isEditData , setIsEditData] = useState(null);
    const [isID , setID] = useState(null)
    const edittingTrueHandler = ()=>{
        setIsEditting(true);
    }
    const edittingFalseHandler = ()=>{
        setIsEditting(false);
    }
    const formTrueHandler = ()=>{
        setIsForm(true)
    }
    const formFalseHandler = ()=>{
        setIsForm(false);
    }
    const dataHandler = (obj)=>{
        setIsEditData(obj)
    }
    const idHandler = (ID)=>{
        setID(ID)
    }
    const obj = {
        id : isID ,
        editIdHandler : idHandler,
        editting : isEditting ,
        showForm : isForm ,
        setFormFalse : formFalseHandler ,
        setFormTrue : formTrueHandler ,
        setEdittingTrue : edittingTrueHandler ,
        setEdittingFalse : edittingFalseHandler ,
        editData : isEditData ,
        setEditData : dataHandler ,
    };
    return (
        <context.Provider value={obj}>
         {props.children}
        </context.Provider>
    );
}