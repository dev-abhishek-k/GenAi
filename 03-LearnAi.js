import {checkOpenAi} from './01-LearnAi.js';
const client=await checkOpenAi();
const model='gpt-4o-mini';

console.log((client.baseURL));

async function askQuestion(systemPrompt, userPrompt) {
    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }   
        ],
    });
    return response.choices[0].message.content;   
}
const userQuestion="Where is my foode order?";

const friendly= await askQuestion("You are a friendly customer service agent who loves to help customers with their food orders. You are always helpful and polite.", userQuestion);

console.log("+++++++++++++Friendly +++++++++++");
console.log(friendly);

const formal= await askQuestion("You are a formal customer service agent who provides clear and concise information about food orders. You are professional and to the point.", userQuestion);

console.log("+++++++++++++Formal +++++++++++");
