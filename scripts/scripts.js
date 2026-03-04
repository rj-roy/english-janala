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
                lessonDesk.classList = "";

                if(!lessonByLevel || lessonByLevel.length === 0){
                    lessonDesk.classList.add('place-content-center')
                    lessonDesk.innerHTML = `
                        <div class="space-y-4 bg-[#f8f8f8] grid place-content-center place-items-center py-15 px-4 rounded-sm">
                            <img src="./assets/alert-error.png" alt="">
                            <p class="text-[gray]">এই Lesson এ এখনো Vocabulary যুক্ত করা হয় নি</p>
                            <h2 class="text-3xl font-bold">পরবর্তী Lesson এ যান</h2>
                        </div>
                    `
                }

                lessonByLevel.forEach(dtDesc => {
                    lessonDesk.classList.add('text-center,', 'mt-3', 'bg-[#f8f8f8]', 'h-full',  'space-y-6', '!grid', 'gird-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-5', 'w-full', 'p-5')

                    const card = document.createElement('div');
                    card.classList.add('grid', 'text-center', 'w-full', 'bg-white', 'space-y-5', 'p-6', 'shadow-sm', 'rounded-sm')
                    card.innerHTML = `
                        <div class="grid space-y-2">
                            <p class="font-bold">${dtDesc.word ? dtDesc.word : "শব্দ পাওয়া যায় নি"}</p>
                            <p class="">Meaning/Pronunciation</p>
                            <p class="font-bold font-bng">${dtDesc.meaning ? dtDesc.meaning : "অর্থ পাওয়া যায় নি"} / ${dtDesc.pronunciation}</p>
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