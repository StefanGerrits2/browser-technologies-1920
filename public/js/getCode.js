var infoContainer = document.querySelector('.info__container');
var instructionText = document.querySelector('.instruction-text');

instructionText.classList.add('hide');
infoContainer.classList.add('show');

infoContainer.addEventListener('click', toggle);
infoContainer.addEventListener('keypress', toggle);

function toggle() {
    if (instructionText.classList.contains('hide')) {
        instructionText.classList.remove('hide');
        instructionText.classList.add('show');
    }

    else {
        instructionText.classList.add('hide');
        instructionText.classList.remove('show');
    }
}