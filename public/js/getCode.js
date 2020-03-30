if(doesClassListWork()) {
    var infoContainer = document.querySelector('.info__container');
    var instructionText = document.querySelector('.instruction-text');

    instructionText.classList.add('hide');
    infoContainer.classList.add('show');

    infoContainer.addEventListener('click', toggleInfo);
    infoContainer.addEventListener('keypress', toggleInfo);

    // Toggle
    function toggleInfo() {
        if (instructionText.classList.contains('hide')) {
            instructionText.classList.remove('hide');
            instructionText.classList.add('show');
        }
    
        else {
            instructionText.classList.add('hide');
            instructionText.classList.remove('show');
        }
    }
}

// If local storage is available, add toggle for help
if (isLocalStorageAvailable()) {
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

// Check if classlists work
function doesClassListWork() {
    var element = document.querySelector('article');
    
    if(element.classList.contains('home')) {
        // Classlist contains is available, if this is available, add and remove are also available
        return true;
    }

    else {
        // Classlist is not available
        return false;
    }
}

// Source used to check if local storage is available:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability)
function isLocalStorageAvailable() {
    var storage;
    try {
        storage = window['localStorage'];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        // Local storage is available
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
        // Local storage is not available
    }
}