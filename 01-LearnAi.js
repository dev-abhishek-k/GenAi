import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const apikeyChecker=()=>{
    if(!apiKey){
        console.error(" Error: API key is not set in the environment variables.");
        process.exit(1);    
    }
   
}
export const checkOpenAi=async()=>{
    const openai = await import('openai');
        const client = new openai.OpenAI({
            apiKey: apiKey,
        }); 
       if(!client){
        console.error(" Error: Failed to create OpenAI client.");
        process.exit(1);    
         }
         console.log("OpenAI client created successfully.");
        return client;      
}