import {getModel} from "../config/llmModel.js"
export const router=async(state)=>{
   const llm=  await getModel("router") 
   const prompt=`You are an agent router.
Available agents:
 
-chat
-search
-coding
-pdf
-ppt
-imageGen

Rules:

chat: This agent is responsible for handling general chat conversations. It can answer questions, provide information, and engage in casual conversation.

search: This agent is responsible for performing web searches and retrieving relevant information from the internet. It can provide search results, summaries, and links to external sources.

coding: This agent is responsible for assisting with coding tasks, such as writing, debugging, and explaining code.

pdf: This agent is responsible for analyzing and extracting information from PDF documents.

ppt: This agent is responsible for creating and editing PowerPoint presentations.

imageGen: This agent is responsible for generating images based on text descriptions.

Return ONLY one word:
chat
search
coding
pdf
ppt
imageGen

User Query:${state.prompt}
   `    
   const response=await llm.invoke(prompt)
   console.log(response.content)
   return {
    ...state,
    agent: response.content.trim().toLowerCase()
   }
}