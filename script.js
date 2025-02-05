const apiKey = 'hmmmm'; // Replace with your OpenAI API key
const apiUrl = 'https://api.openai.com/v1/chat/completions';

async function getOpenAIResponse(prompt) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4', // You can change this to another model like 'gpt-3.5-turbo'
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

let element = document.querySelector(".chat");
function msg(result){
    element.innerHTML += `
        <div class="chat-box">
            <p>${result}<p>
        </div>
    `
}
let send = document.getElementById("send");
send.addEventListener("click", function() {
    let question = document.getElementById("question").value; 
    (async () => {
        try {
            const result = await getOpenAIResponse(question);
            msg(result);
        } catch (error) {
            console.error('Error:', error);
        }
})();
    element.innerHTML+=`
        <div class="chat-box">
            <p>${question}<p>
        </div>
    `
})


var list = [
//Tout les messages autos seront ici
]

document.getElementById('userInput').addEventListener('input', function() {
    var userInput = document.getElementById('userInput').value.toLowerCase();
    let divs = document.querySelectorAll('.prompt');

    divs.forEach(function(prompt) {
        var title = card.querySelector('.title').textContent.toLowerCase();

        if (category.includes(userInput) || userInput>=parseInt(price.replace(/\D/g, ''), 10) || userInput === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
