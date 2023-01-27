import {PrismaClient} from "@prisma/client";
import {Request,Response} from 'express'
const express = require('express')
const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.post('/', async (req:Request, res:Response)=>{
    const {username, password} = req.body
    const user = await prisma.user.create({
        data:{
            username:username,
            password:password
        }
    })
    res.json(user)
})

app.post('/createManyUsers', async (req:Request, res:Response)=>{
    const {userList} = req.body
    const user = await prisma.user.createMany({
        data: userList
    })
    res.json(user)
})

app.post('/createManyCars', async (req:Request, res:Response)=>{
    const {carsList} = req.body
    const cars = await prisma.user.createMany({
        data: carsList
    })
    res.json(cars)
})

app.get('/',async (req:Request, res:Response)=>{
    const user = await prisma.user.findMany()
    res.json(user)
})

app.get('/byId/:id', async(req:Request, res:Response)=>{
    const id = req.params.id
    const user = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    res.json(user)
})

app.put('/', async(req:Request, res:Response)=>{
    const {id,username} = req.body
    const updateUser = await prisma.user.update({
        where:{
            id:id,
        },
        data:{
            username:username
        }
    })
    res.json(updateUser)
})

app.delete('/:id', async(req:Request, res:Response)=>{
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where:{
            id: Number(id)
        }
    })
    res.json(deletedUser)
})

app.listen(3005, ()=>{
    console.log('SERVER RUNNING ON PORT 3005')
})