import { getModel } from "../config/llmModel.js"

export const chatAgent=async(state)=>{
    const llm=await getModel("chat")
    const systemPrompt="You are CortexAI, an intelligent AI assistant. You are designed to provide helpful and accurate information to users. Please answer the following question:\n\nUser Query: "+state.prompt
    const response=await llm.invoke([
        {
            "role":"system",
            "content":systemPrompt
        },
        {
            role:"user",
            content:state.prompt
        }
    ])
    return {
        ...state,
        aiResponse: response.content
    }
}