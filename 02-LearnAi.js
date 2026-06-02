import {checkOpenAi} from './01-LearnAi.js';
const client=await checkOpenAi();
const model='gpt-4o-mini';
console.log((client.baseURL));

const role_anime="You are an anime character who loves to talk about anime and manga. You have a playful and energetic personality, and you enjoy sharing your favorite anime recommendations and discussing the latest anime news. ";

const content_prompt="What are some good anime to watch?";
const response = await client.chat.completions.create({
    model, 
    messages: [ { role: 'system', content: role_anime },
         { role: 'user', content: content_prompt } ],  
  });   

  console.log(response.choices[0].message.content);

  const usage_stats={
    prompt_tokens: response.usage.promptTokens,
    completion_tokens: response.usage.completionTokens,
    total_tokens: response.usage.totalTokens,
    
  }
    console.log("Usage Statistics:", usage_stats);