(function(){
    calcFeatureBoxesHeight();
    document.querySelector('#section-book .book__form .btn--green').addEventListener('click', saveForNewsletter)
    document.querySelectorAll('.navigation .navigation__nav .navigation__list .navigation__item').forEach(link => {
        link.addEventListener('click', closeMenuAfterNavigate);
    });
})();

function closeMenuAfterNavigate() {
    document.querySelector('.navigation .navigation__checkbox').checked = false;
}

function calcFeatureBoxesHeight() {
    let height = 0;
    const features = document.querySelectorAll('.section-features .feature-box');
    features.forEach(featureBox => {
        if (featureBox.offsetHeight > height) {
            height = featureBox.offsetHeight
        }
    });
    features.forEach(featureBox => {
        if (featureBox.offsetHeight < height) {
            featureBox.style.height = `${height}px`;
        }
    });
}

async function saveForNewsletter(e) {
    e.preventDefault();
    const responseContainer = document.getElementById('form-response');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameAndSurname =  nameInput.value || '';
    const email = emailInput.value || '';
    const serverAddress = `http://localhost:3000/api/public/subscribe-newsletter`; 
    const response = await fetch(serverAddress, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nameAndSurname,
            email
        })
    });
    responseContainer.classList.remove('form__response--success', 'form__response--error')
    responseContainer.classList.add(
        response.status === 200 ? 'form__response--success' : 'form__response--error'
    );
    if (response.status === 200) {
        nameInput.value = '';
        emailInput.value = '';
    }
    const { message } = await response.json()
    responseContainer.textContent = message;
}
