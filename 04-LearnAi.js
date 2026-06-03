import {checkOpenAi} from './01-LearnAi.js';
const client=await checkOpenAi();
const model='gpt-4o-mini';
console.log((client.baseURL));
const conversation=[];
async function askQuestion(systemPrompt, userPrompt,history=[]) {
    
    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: 'system', content: systemPrompt },
                ...history,
            { role: 'user', content: userPrompt }   
        ],
        });
        history.push({role:'user',content:userPrompt});
        history.push({role:'assistant',content:response.choices[0].message.content});   
    return response.choices[0].message.content;   
}
    
const userQuestion="my name is abhishek and i am a software developer. tell me a one line joke about software developers";
const response1= await askQuestion("You always response in one line", userQuestion,conversation);
console.log("+++++++++++++Response 1 +++++++++++");
console.log(response1);
const userQuestion2="Can you tell me another joke?";
const response2= await askQuestion("You always response in one line", userQuestion2,conversation);
console.log("+++++++++++++Response 2 +++++++++++");
console.log(response2);