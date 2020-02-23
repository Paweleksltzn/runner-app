(function(){
    calcFeatureBoxesHeight();
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
