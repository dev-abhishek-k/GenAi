import {checkOpenAi} from './01-LearnAi.js';
import readline from 'readline';
const client=await checkOpenAi();
const model='gpt-4o-mini';
console.log((client.baseURL));

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
}); 

const systemPrompt="You are a helpful assistant who provides information about various topics. You are friendly and engaging in your responses.";

function askQuestion(userPrompt) {
    return new Promise(async (resolve) => {
        rl.question(userPrompt, async (answer) => {
            resolve(answer);
        });
    });
}
while(true){
    const userQuestion=await askQuestion("Ask me anything (or type 'exit' to quit): ");
    if(userQuestion.toLowerCase()==='exit'){
        console.log("Goodbye!");
        break;
    }
    const streamingResponse = await client.chat.completions.create({
    model,
    messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuestion }
    ],
    stream: true,
});
process.stdout.write("AI: ");
for await (const chunk of streamingResponse) {
    const delta=chunk.choices[0]?.delta?.content;
    if(delta){
        process.stdout.write(delta);
    }
}
rl.close();
}


