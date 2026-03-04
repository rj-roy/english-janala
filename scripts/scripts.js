const loadLevel = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all#";

    fetch(url)
        .then((response) => response.json())
        .then((json) => displayData(json.data));
};

const displayData = (level) => {
    const levelContainer = document.querySelector("#level-container");
    levelContainer.innerHTML = "";

    level.forEach(le => {
        const levelNo = le.level_no;

        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `        
        <a class="btn btn-outline btn-primary">
         <i class="fa-solid fa-book-open text-nowrap"></i>
            Lesson-${levelNo}
        </a>        
        `
        levelContainer.appendChild(btnDiv);



        btnDiv.addEventListener('click', () => {
            const descApiUrl = `https://openapi.programming-hero.com/api/level/${levelNo}`;

            fetch(descApiUrl)
                .then((descResponse) => descResponse.json())
                .then((data) => addDesc(data.data))

            const addDesc = (lessonByLevel) => {
                const lessonDesk = document.querySelector("lesson-desc");
                lessonDesk.innerHTML = "";
                
                lessonByLevel.forEach(dtDesc => {                    
                    const card = document.createElement('div');
                    card.classList.add('bg-white', 'space-y-3', 'p-6')
                    card.innerHTML = `
                    <p class = "">${dtDesc.word}</p>
                    <p class = "">Meaning/Pronunciation</p>
                    <p class = "">${dtDesc.meaning} / ${dtDesc.pronunciation}</p>
                    `

                    lessonDesk.appendChild(card);
                })
            }
        })
    });
};

loadLevel();