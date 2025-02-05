const apiKey = 'xxx'; // Replace with your OpenAI API key
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const categorySelect = document.getElementById("category");
const languageSelect = document.getElementById("language");

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
    let userLanguage = languageSelect.value;
    let question = document.getElementById("question").value;
    const prompt = `
Tu es un professeur expert en ${userLanguage}, spécialisé dans l'enseignement aux débutants et aux développeurs intermédiaires. Ta mission est de répondre aux questions des utilisateurs de manière pédagogique, claire et précise.

Si la question concerne un problème de code, propose des explications détaillées, des exemples concrets et, si nécessaire, des solutions alternatives. Si un concept est complexe, utilise des analogies et des explications pas à pas.

Toujours adapter ta réponse en fonction du langage sélectionné (${userLanguage}) et du niveau supposé de l'utilisateur.

Voici la question de l'utilisateur : ${question}
`;
    (async () => {
        try {
            const result = await getOpenAIResponse(prompt);
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


// Gestions des selects
document.addEventListener("DOMContentLoaded", () => {


    const languagesByCategory = {
        frontend: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
        backend: ["Node.js", "PHP", "Java", "Python", "Ruby"],
        datascience: ["Python", "R", "SQL", "Julia"]
    };

    function updateLanguages() {
        const selectedCategory = categorySelect.value;
        const languages = languagesByCategory[selectedCategory] || [];

        languageSelect.innerHTML = "";

        // Ajouter les nouvelles options
        languages.forEach(lang => {
            const option = document.createElement("option");
            option.value = lang.toLowerCase();
            option.textContent = lang;
            languageSelect.appendChild(option);
        });

        console.log(`Catégorie sélectionnée: ${selectedCategory}`);
        console.log(`Langages disponibles: ${languages.join(", ")}`);
    }

    // Mettre à jour les langages au chargement et au changement de catégorie
    categorySelect.addEventListener("change", updateLanguages);
    updateLanguages(); // Initialiser avec la première catégorie
});