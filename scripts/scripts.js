const loadLevel = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all#";

    fetch(url)
        .then((response) => response.json())
        .then((json) => displayData(json.data));
};

const removeActive = () => {
    const lessonBtn = document.querySelectorAll('.lesson-btn-class');

    lessonBtn.forEach(btn => btn.classList.remove('active'));
}

const displayData = (level) => {
    const levelContainer = document.querySelector("#level-container");
    levelContainer.innerHTML = "";

    level.forEach(le => {
        const levelNo = le.level_no;

        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `        
        <a id="les-btn-${levelNo}" class="btn btn-outline btn-primary lesson-btn-class">
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

            // buttonRemoveActive
            removeActive();
            const lesBtn = document.getElementById(`les-btn-${levelNo}`)
            lesBtn.classList.add('active');


            const addDesc = (lessonByLevel) => {
                const lessonDesk = document.querySelector("#lesson-desc");
                lessonDesk.innerHTML = "";
                lessonDesk.classList = "";
               
                if (!lessonByLevel || lessonByLevel.length === 0) {
                    lessonDesk.classList.add('place-content-center')
                    lessonDesk.innerHTML = `
                        <div class="space-y-4 bg-[#f8f8f8] grid place-content-center place-items-center py-15 px-4 rounded-sm">
                            <img src="./assets/alert-error.png" alt="">
                            <p class="text-[gray] text-center">এই Lesson এ এখনো Vocabulary যুক্ত করা হয় নি</p>
                            <h2 class="text-3xl font-bold text-center">পরবর্তী Lesson এ যান</h2>
                        </div>
                    `
                }

                // addingLessonsWord
                lessonByLevel.forEach(dtDesc => {
                    lessonDesk.classList.add('text-center,', 'mt-3', 'bg-[#f8f8f8]', 'h-full', 'space-y-6', '!grid', 'gird-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-5', 'w-full', 'p-5')

                    const card = document.createElement('div');
                    card.classList.add('grid', 'text-center', 'w-full', 'bg-white', 'space-y-5', 'p-6', 'shadow-sm', 'rounded-sm')
                    card.innerHTML = `
                        <div class="grid space-y-2">
                            <p class="font-bold">${dtDesc.word ? dtDesc.word : "শব্দ পাওয়া যায় নি"}</p>
                            <p class="">Meaning/Pronunciation</p>
                            <p class="font-bold font-bng">${dtDesc.meaning ? dtDesc.meaning : "অর্থ পাওয়া যায় নি"} / ${dtDesc.pronunciation}</p>
                        </div>
                    
                        <div id="" class="flex justify-between items-center">
                            <button onclick="loadWordDetails(${dtDesc.id})" class="btn group hover:bg-blue-500">
                                <i class="fa-solid fa-circle-info group-hover:text-white"></i>
                            </button>

                            <button onclick="prnounce('${dtDesc.word}')" class="btn group hover:bg-blue-500">
                                <i class="fa-solid fa-volume-high group-hover:text-white"></i>
                            </button>
                        </div>
                    `

                    lessonDesk.appendChild(card);
                });             
                

            };
        });
        
    });
};

loadLevel();

// prnounce
function prnounce(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === 'Google US English') || voices[5];

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
}

// modal details
const loadWordDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    
    const response = await fetch(url);
    const details = await response.json();
    displayWordD(details.data);
}

const displayWordD = (word) => {
    const modal = document.querySelector("#my_modal_5")    
    modal.showModal();

    console.log(word)

    modal.innerHTML = `
            <div class="modal-box space-y-5 rounded-lg p-10">
                <h3 class="text-xl font-bold">
                    ${word.word}
                    <span>(<i class="fa-solid fa-microphone-lines">:</i>${word.pronunciation})</span>
                    <i onclick="prnounce('${word.word}')" class="fa-solid fa-volume-high hover:text-[#0000ff]"></i>
                </h3>
                <div>
                    <p class="font-bold">Meaning</p>
                    <p class="font-bold">${word.meaning}</p>
                </div>

                <div>
                    <p class="font-bold">Example</p>
                    <p>${word.sentence}</p>
                </div>

                <div>
                    <p class="font-bng font-bold">সমার্থক শব্দ গূলো</p>
                    <div>
                        addSynonyms
                    </div>
                </div>
                
                <div class="modal-action flex justify-start">
                    <form method="dialog">
                        <button class="btn btn-primary">Complete Learning</button>
                    </form>
                </div>
            </div>
            `

}