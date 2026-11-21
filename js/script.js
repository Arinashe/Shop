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