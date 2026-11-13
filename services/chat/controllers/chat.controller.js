import Conversation from  "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const createConversation =async(req,res)=>{
    try{
        const {userId}=req.headers["x-user-id"]
        console.log("UserId",userId)

        const conversation=await Conversation.create({userId:userId})
        res.status(201).json(conversation)
    }catch(error){
        console.error("Error creating conversation:", error)
        res.status(500).json({message:`create conversation error: ${error}`})
    }
}


export const getConversations =async(req,res)=>{
    try{
        const {userId}=req.headers["x-user-id"]
        console.log("UserId",userId)

        const conversations=await (await Conversation.find({userId:userId})).toSorted({updatedAt:-1})
        res.status(201).json(conversations)
    }catch(error){
        console.error("Error creating conversation:", error)
        res.status(500).json({message:`Get conversation error: ${error}`})
    }
}

export const updateConversations =async(req,res)=>{
    try{
        const {id,title}=req.body     

        const conversations=await Conversation.findByIdAndUpdate(id, {title}, {new:true}).toSorted({updatedAt:-1})
        res.status(201).json(conversations)

    }catch(error){
        console.error("Error updating conversation:", error)
        res.status(500).json({message:`Update            conversation error: ${error}`})
    }
}

export const saveMessage=async(req,res)=>{
   try{
    const {conversationId,role,content}=req.body
    const message=await Message.create({
        conversationId,role,content
    })
    return res.status(200).json(message)
   }catch(error){
        console.error("Error saving message:", error)
        res.status(500).json({message:`Save message error: ${error}`})
   }
}

export const getMessages=async(req,res)=>{
   try{
    //const {conversationId}=req.body
    const messages=await Message.find({
        conversationId:req.params.conversationId
    }).sort({createdAt:-1})
    return res.status(200).json(messages)
   }catch(error){
        console.error("Error getAllMessage message:", error)
        res.status(500).json({message:`Get messages error: ${error}`})
   }
}