import React, { useEffect, useState } from 'react'
import './Task.css'
import { MdDelete } from "react-icons/md";
import axios from 'axios'

const Task = () => {
    const [user,setUser] = useState({
        name:""
    })
    const [users,setUsers] = useState([])
    const [count,setCount] = useState(0)
    const [id,setId] = useState(null)
    const [game,setGame] = useState(true)

    const handleChange=(e)=>{
        const {name,value}=e.target
        setUser((pre)=>{
            return{
                ...pre,
                [name]:value
            }
        })
    };

    const handleShow = async()=>{
        try{
        const res=await axios.get('http://localhost:9083/lists')
        setUsers(res.data)
        }
        catch(err)
        {
            alert(err.message)
        }
     };

    const handleAdd=async(e)=>{
        if(!user.name){
            return alert('You did not added anything')
        }
        try{
            const res = await axios.post('http://localhost:9083/lists',user)
            setCount(count+1)
            
            // alert(res.data.message)
        }
        catch(err){
            alert(err.message)
        }
        setUser({
            name:""
        })
    };

    const handleEdit=(ind)=>{
         const change = users[ind].tasks
        setUser({name:change})
    };

    const handleUpdate =async()=>{
        try{
            await axios.put(`http://localhost:9083/lists/${id}`,user)
            setCount(count+1)
        }
        catch(err)
        {   
            alert(err.message)
        }
        setGame(!game)
        setUser({
            name:""
        })
    };

    const handleDelete=async(id)=>{
        try{
            axios.delete(`http://localhost:9083/lists/${id}`)
        }
        catch(err)
        {
            alert(err.message)
        }
        setCount(count+1)
    }



    useEffect(()=>{
        handleShow()
        console.log('rendering')
    },[count])

  return (
    <div className='head'>
        <div className='container'>
            <div className="header">
                <h1>TODO LIST</h1>
            </div>

            <div className='input'>
                <input type="text"
                value={user.name}
                name='name'
                onChange={handleChange} 
                placeholder='Add Task...' className='mybox'/>
                
                {game ? <button onClick={handleAdd}>Add</button> :
                <button onClick={handleUpdate}>Update</button>}
            </div>
            <div className='line'></div>



            <div className='list'>
            {users.length!==0 && <h2>Your Tasks :</h2>}
            {users.length!==0 && <div className='line2'></div>}
                <ul>
                {users.map((value,index)=>(
                    <li className='items' key={value.id}><span>{value.tasks}</span>
                    <div className="btn">
                        <button onClick={()=>{
                            setGame(!game)
                            setId(value.id)
                            handleEdit(index)
                        }}>edit</button> 
                        <button onClick={()=>{
                            handleDelete(value.id)
                        }}>delete</button>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Task



