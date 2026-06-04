import {checkOpenAi} from './01-LearnAi.js';
const client=await checkOpenAi();
const model='gpt-4o-mini';
console.log((client.baseURL));
const streamingResponse = await client.chat.completions.create({
    model,
    messages: [
        { role: 'system', content: "You are a helpful assistant who provides information about the weather." },
        { role: 'user', content: "What's the weather like today?" }
    ],
    stream: true,
}); 

let last_chunk=null

for await (const chunk of streamingResponse) {
    const delta=chunk.choices[0]?.delta?.content;
    if(delta){
        process.stdout.write(delta);
    }
    last_chunk+=delta;
}