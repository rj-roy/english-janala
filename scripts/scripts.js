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
                const lessonDesk = document.querySelector("#lesson-desc");
                lessonDesk.innerHTML = "";

                if(!lessonByLevel || lessonByLevel.length === 0){
                    console.log("null")
                }

                lessonByLevel.forEach(dtDesc => {
                    const card = document.createElement('div');
                    card.classList.add('grid', 'w-full', 'bg-white', 'space-y-5', 'p-6', 'shadow-sm', 'rounded-sm')
                    card.innerHTML = `
                    <div class="grid space-y-2">
                        <p class="font-bold">${dtDesc.word}</p>
                        <p class="">Meaning/Pronunciation</p>
                        <p class="font-bold font-bng">${dtDesc.meaning} / ${dtDesc.pronunciation}</p>
                    </div>
                
                    <div id="buttons-temp" class="flex justify-between items-center">
                        <button class="btn hover:bg-blue-500"><i class="fa-solid fa-circle-info "></i></button>

                        <button class="btn hover:bg-blue-500"><i class="fa-solid fa-volume-high "></i></button>
                    </div>
                    `

                    lessonDesk.appendChild(card);
                });
            }
        })
    });
};

loadLevel();