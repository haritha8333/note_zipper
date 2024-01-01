const asyncHandler=require("express-async-handler")
 
const Note=require('../models/noteModel');
const e = require("express");


const getNotes=asyncHandler(
    async(req,res)=>{
        const  notes=await Note.find({user: req.user._id})
        res.json(notes);

    }
)

const createNote= asyncHandler(async(req,res)=>{
    const { title ,content,category }= req.body;

    if(!title || !content || !category){
        res.status(400)
        throw new Error("please fill all the fields");

    }
    else{
        const note=new Note ({user: req.user._id,title,content,category });

        const createdNote= await note.save();

        res.status(201).json(createdNote);
    }
})
    //getNoteById;
const getNoteById =asyncHandler(
    async(req,res)=>{
        const note =await Note.findById(req.params.id);
//findById is mongodb query
        if(note){
            res.json(note);
        }
        else{
            res.status(404).json({message : "note not found"})
        }
    }
);

const UpdateNote=asyncHandler(
    async(req,res)=>{
        const {title,content,category}=req.body;
        const note=await Note.findById(req.params.id);

        if(note&&note.user&&note.user.toString()!==req.user._id.toString()){
            res.status(401);
            throw new Error("you cant perform this action"); 
        }
        if(note){
            note.title=title;
            note.content=content;
            note.category=category;

            const updatedNote=await note.save();
            res.json(updatedNote);
        }
        else{
            res.status(404);
            throw new Error("Note not found");
        }
    }
)
const DeleteNote=asyncHandler(async (req,res)=>{
    const note=await Note.findById(req.params.id);

    
    if(note.user.toString()!==req.user._id.toString()){
        res.status(401);
        throw new Error("you cant perform this action");
    }
    if(note){
        await note.deleteOne();
        res.json({message:"Note Removed"});
    }
    else{
        res.status(404);
        throw new Error("Note not found");
    }
})
module.exports = { getNotes, createNote, getNoteById ,UpdateNote, DeleteNote};
