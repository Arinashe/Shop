(function () {
    const modal    = document.getElementById('mapModal');
    const labelEl  = document.getElementById('modalLabel');
    const titleEl  = document.getElementById('modalTitle');
    const coordsEl = document.getElementById('modalCoords');
    const linkEl   = document.getElementById('modalLink');
    const frameEl  = document.getElementById('modalMapFrame');
    const closeBtn = modal.querySelector('.modal-close');

    function openModal(marker) {
        const { label, title, coords, embed, map } = marker.dataset;

        labelEl.textContent  = label  || 'ЛОКАЦИЯ';
        titleEl.textContent  = title  || 'Без названия';
        coordsEl.textContent = coords || '—';

        if (embed) {
            frameEl.src = embed;
            frameEl.style.display = '';
        } else {
            frameEl.removeAttribute('src');
            frameEl.style.display = 'none';
        }

        if (map) {
            linkEl.href = map;
            linkEl.innerHTML = 'Открыть в новой вкладке <span class="arrow">→</span>';
            linkEl.removeAttribute('aria-disabled');
            linkEl.style.pointerEvents = '';
            linkEl.style.opacity = '';
        } else {
            linkEl.href = '#';
            linkEl.textContent = 'Координаты не существуют';
            linkEl.setAttribute('aria-disabled', 'true');
            linkEl.style.pointerEvents = 'none';
            linkEl.style.opacity = '0.5';
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