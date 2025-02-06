const apiKey = 'f648fez86f4e8zq4f86es4q86fe468q4f86eq48f6qes48 :)';
const YOUTUBE_API_KEY = "fezafe6f4eq864fwd86d :)";
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const categorySelect = document.getElementById("category");
const languageSelect = document.getElementById("language");

async function fetchYouTubeVideos(query) {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: query + " tutorial",
                key: YOUTUBE_API_KEY,
                maxResults: 3,
                type: "video"
            }
        });

        return response.data.items.map(item => ({
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));
    } catch (error) {
        console.error("YouTube API Error:", error.response ? error.response.data : error.message);
        return [];
    }
}

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

function handleMarkdown(output) {
    return marked.parse(output, {
        breaks: true,
    });
}

function msg(result, videos) {
    console.log(videos)
    element.innerHTML += `
        <div class="chat-box-result">
            ${handleMarkdown(result)}
            <div class="youtube-tutorials">
                <h3>Related YouTube Tutorials:</h3>
                ${videos.map(video => `
                    <div class="tutorial-link">
                        <a href="${video.url}" target="_blank">${video.title}</a>
                    </div>
                `).join('')}
            </div>
            ${videos.length > 0 ? `
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${videos[0].url.split('v=')[1]}" frameborder="0" allowfullscreen></iframe>
            ` : ''}
        </div>
    `;
}

let send = document.getElementById("send");
send.addEventListener("click", async function () {
    let userLanguage = languageSelect.value;
    let question = document.getElementById("question").value;
    const prompt = `
Tu es un professeur expert en ${userLanguage}, spécialisé dans l'enseignement aux débutants et aux développeurs intermédiaires. Ta mission est de répondre aux questions des utilisateurs de manière pédagogique, claire et précise.

Si la question concerne un problème de code, propose des explications détaillées, des exemples concrets et, si nécessaire, des solutions alternatives. Si un concept est complexe, utilise des analogies et des explications pas à pas.

Toujours adapter ta réponse en fonction du langage sélectionné (${userLanguage}) et du niveau supposé de l'utilisateur.

Voici la question de l'utilisateur : ${question}
`;
    try {
        const result = await getOpenAIResponse(prompt);
        const videos = await fetchYouTubeVideos(`${userLanguage} ${question}`);
        msg(result, videos);
    } catch (error) {
        console.error('Error:', error);
    }

    element.innerHTML += `
        <div class="chat-box-response">
            <p>${question}</p>
        </div>
    `;
});

document.getElementById('new').addEventListener('click', function () {
    element.innerHTML = "";
});

document.addEventListener("DOMContentLoaded", () => {
    const languagesByCategory = {
        frontend: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
        backend: ["Node.js", "PHP", "Java", "Python", "Ruby", "Rust"],
        datascience: ["Python", "R", "SQL", "Julia", "Matlab"]
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

