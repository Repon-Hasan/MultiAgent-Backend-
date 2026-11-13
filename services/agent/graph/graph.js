import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.agent.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageGenAgent } from "../agents/image.agent.js";

//const graph=new StateGraph(agentState)
const workFollow=new StateGraph(agentState)
 workFollow.addNode("router",router)
 workFollow.addNode("chat",chatAgent)
 workFollow.addNode("search",searchAgent)
 workFollow.addNode("coding",codingAgent)
 workFollow.addNode("pdf",pdfAgent)
 workFollow.addNode("ppt",pptAgent)
 workFollow.addNode("imageGen",imageGenAgent)




 workFollow.addEdge("__start__","router")
 workFollow.addConditionalEdges("router",(state)=>{
      switch(state.router){
        case "chat":
            return "chat"
        case "search":
            return "search"
        case "coding":
            return "coding"
        case "pdf":
            return "pdf"
        case "ppt":
            return "ppt"
        case "imageGen":
            return "imageGen"
        default:
            return "chat"
      }
 },{
    chat: "chat",
    search: "search",
    coding: "coding",
    pdf: "pdf",
    ppt: "ppt",
    imageGen: "imageGen"
 })


 workFollow.addEdge("search","chat")
 workFollow.addEdge("chat","__end__")
 workFollow.addEdge("search","__end__")
 workFollow.addEdge("coding","__end__")
 workFollow.addEdge("pdf","__end__")
 workFollow.addEdge("ppt","__end__")
 workFollow.addEdge("imageGen","__end__")

export const graph=workFollow.compile()