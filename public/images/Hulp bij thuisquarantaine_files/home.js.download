if (window.localStorage) {
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