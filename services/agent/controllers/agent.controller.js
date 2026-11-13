import axios from "axios"
import { graph } from "../graph/graph.js"
export const agentController=async(req,res)=>{
   try{
    const {prompt,conversationId}=req.body
    await axios.post(`${process.env.AGENT_URL}/save-message`,
      {conversationId,role:"user",content:prompt})

      const result =await graph.invoke({prompt,conversationId})
      const response=result.aiResponse
      return res.status(200).json({response})
   }catch(error){
    console.error("Error occurred:", error)
    res.status(500).json({error: `agent error ${error}`})
   }
}