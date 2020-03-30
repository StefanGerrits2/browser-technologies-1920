if (isLocalStorageAvailable()) {
    // Get existing codes
    var usedCodes = JSON.parse(localStorage.getItem('used codes'));

    // Select outer container
    var outerContainer = document.querySelector('.home');

    // Create container
    var container = document.createElement('div');
    container.id = 'used-codes';

    // Create title element
    var title = document.createElement('h3');
    title.textContent = 'Eerder gebruikte codes';

    // Create instruction element
    var instruction = document.createElement('p');
    instruction.textContent = '(meest recente code staat bovenaan)';
    instruction.className = 'instruction-text';

    // Append title and instruction text
    container.appendChild(title);
    container.appendChild(instruction);

    // If used codes are found
    if (usedCodes) {
        // Reverse so the most recent code will be in front
        var reverseUsedCodes = usedCodes.reverse();

        // Create p element for each code that is found
        for (i=0; i < reverseUsedCodes.length; i++){
            var p = document.createElement('p');
            p.textContent = reverseUsedCodes[i];
            container.appendChild(p);
        }
    }

    // If no used codes are found
    else {
        var noCode = document.createElement('p');
        noCode.textContent = 'Geen codes gevonden';
        container.appendChild(noCode);
    }

    // Append container to outer container
    outerContainer.appendChild(container);
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