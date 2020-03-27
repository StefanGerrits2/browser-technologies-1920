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

if (window.localStorage) {

    var newCode = document.querySelector('.your-code').value;
    console.log(newCode);
    var arr = [];
    
    if (localStorage.getItem('used codes') !== null) {
        var existingData = JSON.parse(localStorage.getItem('used codes'));
        console.log(existingData);
    
        for (i=0; i < existingData.length; i++){
            arr.push(existingData[i]);
        }
    }

    arr.push(newCode);
    
    localStorage.setItem('used codes', JSON.stringify(arr));
}