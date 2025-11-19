const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app=express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'todo'
});
db.connect(err=>{
    if(err){
        return err
    }
    else{
        console.log("database connected successfully")
    }
});
app.post('/lists',(req,res)=>{
    const {name} = req.body
    const sql ='INSERT INTO tasks(tasks) VALUES(?)'
    db.query(sql,[name],(err,result)=>{
        if(err){
           return res.status(500).json({
            message:'failed to insert data',
            error:err})
        }
        else{
            res.status(200).json({message:"list added"})
        }
    })
});

app.get('/lists',(req,res)=>{
    const sql = 'SELECT * FROM tasks'
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({message:'server problem'})
        }
        else{
            res.status(200).json(result)
        }
    })
});

app.put('/lists/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    const sql = 'UPDATE tasks SET tasks=? WHERE id=?'
    db.query(sql,[name,id],(err,result)=>{
        if(err)
        {
           return res.status(500).json({error:err})
        }
        else{
            res.status(200).json({message:'tables updated'})
        }
    })
});

app.delete('/lists/:id',(req,res)=>{
    const {id}=req.params
    const sql = 'DELETE FROM tasks WHERE id=?'
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(404).json({message:'data not deleted'})
        }
        else{
            res.status(200).json({message:'successfully deleted'})
        }
    })
})

const port=9083
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})