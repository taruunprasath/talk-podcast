import React, { useState } from 'react'
import "../../styles/create.css"

const FileInput = ({accept,id, fileHandle,text}) => {
  const[fileSelected, setFileSelected] = useState(false);
  const onChange = (e) =>{
    setFileSelected(e.target.files[0].name)
    fileHandle(e.target.files[0]);
    console.log(e.target.value);
  }
  return (
    <>
    <label htmlFor={id}>
      <p className='btn'>{fileSelected ? `${fileSelected}` : text}</p>
      </label>
    <input type='file' accept={accept} id={id} style={{display:"none"}} onChange={onChange}/>
    </>
  )
}

export default FileInput
