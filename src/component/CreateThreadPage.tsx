import React, { useState } from 'react'
import { useThread } from '../context/threadContext'
import { dummyUsers } from '../dummy-data/users';
import { Link, useNavigate } from 'react-router-dom';
import type { Thread } from '../types/types';

/* 
type Formdata={
    title:string;
    description:string;
} */

interface FormElements extends HTMLFormControlsCollection {
  TitleInput: HTMLInputElement
}
interface TitleFormElement extends HTMLFormElement {
  readonly elements: FormElements
}


export default function CreateThreadPage() {

    const {actions}=useThread()
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const creator=dummyUsers[1]
    const navigate = useNavigate();
    function handleSubmit(event:React.FormEvent<TitleFormElement>) {
        event.preventDefault()
        const id =Math.floor(Math.random()*9000)
        const creationDate=new Date();
        const category="BREEDS"
        const _thread:Thread={
          id,
          title,
          description,
          creationDate,
          creator,
          category,
        }
        actions.createThread(_thread)
        settitle("")
        setdescription("")
        console.log("added",{_thread})
        navigate("/")
    }
  
    
  return (
    <div className='thread-form'>
        <h1>Create Thread</h1>
        <form className='formlayout' onSubmit={handleSubmit}>
            <label htmlFor="title" className='form-label align-start'>Title</label>
            <input
             className='form-input'
             placeholder='Enter title here' 
             type="text"
             value={title}
             onChange={(e)=>{
              settitle(e.target.value)
             }}
             />
            <label htmlFor="description" className='form-label align-start'>Description</label>
            <textarea
             className='textarea-input'
             placeholder='Enter text here'
             value={description}
             onChange={(e)=>{
              setdescription(e.target.value)
             }}
             />
            <div className='btn-group'>
              <button className='btn' type="submit">Create!</button>
              <Link to="/" className='btn background-secondary'>View all threads</Link>
            </div>
          </form>
    </div>
  )
}
