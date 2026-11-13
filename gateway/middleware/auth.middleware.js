import redis from "../../shared/redis/redis.js"

const protect=async(req,res,next)=>{
    try {

//         console.log("Cookies:", req.cookies);
// console.log("Session ID:", req.cookies?.session);
        const  sessionId=req.cookies?.session
        if(!sessionId){
            return res.status(400).json({message:"UnAuthorized"})
        }
        const session =await redis.get(`session-${sessionId}`)
        if(!session){
            return res.status(400).json({message:"session expired"})
        }
        req.user=JSON.parse(session)
        next()
    } catch (error) {
                return res.status(500).json({message:`protected error ${error}`})
    }
}

export default protect