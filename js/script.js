let cards = document.getElementById('cards')
let btnAll = document.getElementById('btn-all')
let btnStation = document.getElementById('btn-station')
let btnLighthouse = document.getElementById('btn-lighthouse')
let btnObservatory = document.getElementById('btn-observatory')

let list_product = [
    {
        id: 1,
        category: "СТАНЦИЯ",
        index: "001",
        name: "Полярная станция",
        description: "Хранит тепло тех, кто не вернулся на карту.",
        price: 1290,
        img: "./img/polar-station.png",
        color: '#7FD4FF'    
    },
    {
        id: 2,
        category: "СТАНЦИЯ",
        index: "002",
        name: "Пепел рассвета",
        description: "Здесь каждый рассвет начинается с искры.",
        price: 1390,
        img: "./img/ash-dawn.png",
        color: '#FF6B35'
    },
    {
        id: 3,
        category: "МАЯК",
        index: "003",
        name: "Тихий прилив",
        description: "Свет для кораблей, которых никто не видел.",
        price: 1490,
        img: "./img/quiet-tide.png",
        color: '#2EC4B6'
    },
    {
        id: 4,
        category: "МАЯК",
        index: "004",
        name: "Последний огонёк",
        description: "Горит, пока кто-то помнит дорогу домой.",
        price: 1190,
        img: "./img/last-light.png",
        color: '#FFD166'
    },
    {
        id: 5,
        category: "ОБСЕРВАТОРИЯ",
        index: "005",
        name: "На орбите сна",
        description: "Ловит свет ещё не открытых созвездий.",
        price: 1590,
        img: "./img/dream-orbit.png",
        color: '#B388FF'
    },
    {
        id: 6,
        category: "ОБСЕРВАТОРИЯ",
        index: "006",
        name: "Карманная вселенная",
        description: "Для тех, кто ищет север внутри себя.",
        price: 1490,
        img: "./img/pocket-universe.png",
        color: '#5C6BC0'
    },
    {
        id: 7,
        category: "СТАНЦИЯ",
        index: "007",
        name: "Последний рубеж",
        description: "Там, где заканчивается карта и начинается тишина.",
        price: 1390,
        img: "./img/last-frontier.png"
    },
    {
        id: 8,
        category: "МАЯК",
        index: "008",
        name: "Свет в тумане",
        description: "Для тех, кто плывёт туда, где нет берега.",
        price: 1290,
        img: "./img/light-in-fog.png"
    },
    {
        id: 9,
        category: "ОБСЕРВАТОРИЯ",
        index: "009",
        name: "Звёздная пыль",
        description: "Собирает свет умерших звёзд.",
        price: 1590,
        img: "./img/stardust.png"
    }
];

function addCard(list) {
    list.forEach(p => {
        cards.innerHTML += `
        <div class="card">
            <div class="card-img"><img src="${p.img}" alt="${p.name}"></div>
                <div class="card-label"><p style='color:${p.color}'>${p.category} / ${p.index}</p></div>
                <h2>${p.name}</h2>
                <p>${p.description}</p>
                <hr>
                <div class="card-footer">
                    <span class="price">${p.price} ₽</span>
                    <button class="arrow-btn" id='btn${p.index} style='color:${p.color}'>↗</button>
                </div>
        </div>
        `
    });
}

let btns = [btnAll, btnLighthouse, btnObservatory, btnStation]

function filters(list) {
    btnStation.addEventListener('click', () => {
        cards.innerHTML = ''
        btns.forEach(b => b.classList.remove('active'))
        btnStation.classList.add('active')
        let station = list.filter(c => c.category == 'СТАНЦИЯ')
        addCard(station)
    })
    btnLighthouse.addEventListener('click', () => {
        cards.innerHTML = ''
        btns.forEach(b => b.classList.remove('active'))
        btnLighthouse.classList.add('active')
        let lighthouse = list.filter(c => c.category == 'МАЯК')
        addCard(lighthouse)
    })
    btnObservatory.addEventListener('click', () => {
        cards.innerHTML = ''
        btns.forEach(b => b.classList.remove('active'))
        btnObservatory.classList.add('active')
        let observatory = list.filter(c => c.category == 'ОБСЕРВАТОРИЯ')
        addCard(observatory)
    })
    btnAll.addEventListener('click', () => {
        cards.innerHTML = ''
        btns.forEach(b => b.classList.remove('active'))
        btnAll.classList.add('active')
        addCard(list)
    })
}

addCard(list_product)
filters(list_product)


(function () {
    const modal = document.getElementById('mapModal');
    const closeBtn = modal.querySelector('.modal-close');
    const frameEl = document.getElementById('modalMapFrame');
    const imageEl = document.getElementById('modalImage');

    const elLabel = document.getElementById('modalLabel');
    const elTitle = document.getElementById('modalTitle');
    const elCoords = document.getElementById('modalCoords');
    const elStatusBlock = document.getElementById('modalStatus');
    const elStatusText = document.getElementById('statusText');
    const elDesc = document.getElementById('modalDescription');
    const elPrice = document.getElementById('modalPrice');
    const elMaterial = document.getElementById('specMaterial');
    const elSize = document.getElementById('specSize');
    const elEdition = document.getElementById('specEdition');

    function openModal(marker) {
        const d = marker.dataset;

        
        elLabel.textContent = d.label || 'ЛЕГЕНДА МЕСТА';
        elTitle.innerHTML = d.title || 'Название';
        elCoords.innerHTML = d.coords || '—';
        elDesc.innerHTML = d.desc || '<p>Описание отсутствует</p>';
        elPrice.textContent = d.price || '—';

        if (d.status) {
            elStatusBlock.style.display = 'inline-flex';
            elStatusText.textContent = d.status;
        } else {
            elStatusBlock.style.display = 'none';
        }

        elMaterial.textContent = d.material || '—';
        elSize.textContent = d.size || '—';
        elEdition.textContent = d.edition || '—';

        if (d.img) {
            imageEl.src = d.img;
            imageEl.style.display = 'block';
        } else {
            imageEl.style.display = 'none';
        }

        if (d.embed) {
            frameEl.src = d.embed;
            frameEl.style.display = '';
        } else {
            frameEl.removeAttribute('src');
            frameEl.style.display = 'none';
        }

        modal.showModal();
        closeBtn.focus();
    }

    document.querySelectorAll('.marker').forEach((marker) => {
        marker.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(marker);
        });
    });

    function closeModal() {
        frameEl.removeAttribute('src');
        modal.close();
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    modal.addEventListener('close', () => {
        frameEl.removeAttribute('src');
    });
})();