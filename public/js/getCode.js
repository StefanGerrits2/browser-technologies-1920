if(doesClassListWork()) {
    var infoContainer = document.querySelector('.info__container');
    var instructionText = document.querySelector('.instruction-text');

    instructionText.classList.add('hide');
    infoContainer.classList.add('show');

    if (document.addEventListener) {
        // Eventlistener exists
        infoContainer.addEventListener('click', toggleInfo);
        infoContainer.addEventListener('keypress', toggleInfo);
    }
    
    else if (document.attachEvent) {              
        // Eventlistener does not exist -> use attachEvent
        infoContainer.attachEvent('onclick', toggleInfo);
        infoContainer.attachEvent('keypress', toggleInfo);
    }

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

// COPY FUNCTIONS
function createCopyElements() {
    // Select outer container
    var outerContainer = document.querySelector('#code__container');

    // Create container
    var button = document.createElement('button');
    button.id = 'copy-button';
    button.type = 'button';
    button.textContent = 'Kopieer je code';

    outerContainer.appendChild(button);

    // Eventlisteners
    if (document.addEventListener) {
        // Eventlistener exists
        button.addEventListener('click', copyToClipBoard);
        button.addEventListener('keypress', copyToClipBoard);
    }
    
    else if (document.attachEvent) {              
        // Eventlistener does not exist -> use attachEvent
        button.attachEvent('onclick', copyToClipBoard);
        button.attachEvent('keypress', copyToClipBoard);
    }
}

function copyToClipBoard() {
    // Text to copy
    var textToCopy = document.querySelector('.your-code');
  
    // Select the text to copy
    textToCopy.focus();
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy te text to clipboard
    document.execCommand('copy');

    var body = document.querySelector('body');
    var notification = document.createElement('p');
    notification.id = 'notification';
    notification.textContent = 'Code gekopieerd!';
    body.appendChild(notification);

    setTimeout(() => body.removeChild(notification), 5000);
}

// Check if copy to clipboard works
function checkCopyToClipBoard() {
    if (navigator.clipboard && setTimeout) {
        // Available
        createCopyElements();
    }
}

checkCopyToClipBoard();

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
//

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