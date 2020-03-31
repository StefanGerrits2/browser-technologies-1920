# Assignment 2 Concept

Live link: https://sleepy-everglades-16860.herokuapp.com/

### Case:
- I want to be able to fill in a survey about the minor Web Development, with various answer options. If I do not complete the survey, I want to continue where I left off later.

In short:

A survey for elderly people who need home help because they are in quarantine, if they accidentally close the browser or want to continue later, this can be done because I save the input data server side so it will work on every browser even if javascript is disabled.

So are there any problems?

The core of this survey is to make sure people can fill in a survey, and can continue later on where they left earlier. The problem is you can't save input in local storage because not all browser support that, or maybe Javascript is disabled. Because of this I keep track of the data server side. Users get a code they can use later on to continue their survey. 

## Flow if you're new to the survey
<details>
    <summary >- Start </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961895-80428580-691e-11ea-8420-9130c635dfc1.png">
</details>

<details>
    <summary >- Receive code for later use </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961920-8b95b100-691e-11ea-981c-cab41e67a693.png">
</details>

<details>
    <summary >- Survey with pagination - page 1 </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961935-918b9200-691e-11ea-84c9-43fca52cd297.png">
</details>

<details>
    <summary >- Survey with pagination - pagina 3 </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961947-97817300-691e-11ea-91b2-be971de64436.png">
</details>

## Flow if you already filled some of it in, and want to keep on going
<details>
    <summary >- Start </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961895-80428580-691e-11ea-8420-9130c635dfc1.png">
</details>

<details>
    <summary >- Type in your code </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76962045-c0096d00-691e-11ea-9ce4-b09a8b569a5b.png">
</details>

<details>
    <summary >- Keep on going where you quit last time </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76962051-c3045d80-691e-11ea-916e-a2fd2744b9f0.png">
</details>

### Progressive enhancement

### My 3 layers 

#### Functional and reliable
![image](https://user-images.githubusercontent.com/45566396/78012127-d367ff80-7344-11ea-90cc-839c1ea4c083.png)

This is the basic semantic HTML and server side stuff. In this layer it's important that the core functionality works in every browser on every device. I save user input server side because there is no client side javascript in this layer. The core functionality works in every browser on every device. I write the data into json files with a user id to keep track of it. When you enter a code that exists, it takes you to the page where you quit last time you filled in the survey, and it remembers the data you've filled in on previous pages. I've tested this on my own browsers, devices and even Browserstack. 

#### Usable
![image](https://user-images.githubusercontent.com/45566396/78012244-fbeff980-7344-11ea-89fe-765f8dc94f51.png)

In this layer, CSS is added to make it more usable. This includes fonts, button states (focus hover active). This makes it usuable for everyone. For example if you don't have a mouse or trackpad, you can still easily see the items you're focusing on with tab.

#### Pleasurable
![image](https://user-images.githubusercontent.com/45566396/78012352-1d50e580-7345-11ea-889e-30d5e707c458.png)
This is the 'wow' state of my survey. All of the features above work in every modern browser like Firefox, Chrome etc. They all have fallbacks if my survey is visited on an older browser. This means my survey is progressively enhanced.

In this last layer, I've added the following features
* CSS animations

Between pages, I've added transitions. This way it feels like you're staying on the same page and it adds a smooth feeling to it.

* CSS gradients

I've added gradients on buttons to make them look more pretty. 

* Javascript client side local storage

With local storage I save used codes people have used. If they forget their code somehow, they can always see which codes they used before on the homepage.

* Javascript client side toggle button

With Javascript I can toggle text if you click on a button.

* Copy to clipboard button

With Javascript I've added a button that will copy your code to your clipboard.

### Feature detection

It's important to detect if specific features are available in a browser. This way you can create fallbacks if a browser does not support a specific feature.

* Local storage

I check if local storage is available with this function:
```javascript
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
```

When this is available, I store used keys into local storage. Now I can show all used previous codes on the homepage in case someone lost their code. The most recent code will be on top:
![image](https://user-images.githubusercontent.com/45566396/77850617-063eb600-71d4-11ea-8b26-05e8eb795564.png)

When this is not available, the fallback will be that there won't be a box showing these codes. I made it so when local storage exists, it creates all elements. So when local storage does not exist, nothing will be shown.

* Class lists

addClassList.contains, remove and add it not supported in every browser. I use these methods to toggle a class to make info text visible when you click on the info icon. When this is not supported, the text will always be shown without the toggle icon. I check if classlists works with this function:

```javascript
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
```

* Eventlisteners

For IE 8 and earlier versions, they do not support AddEventListener()
Because of this I need to make a fallback with AttachEvent, because this function is available in these old browsers:
```javascript
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
```

* Copy to clipboard

For this specific feature, I need to make sure copy to clipboard and settimeout is available:
```javascript
// Check if copy to clipboard works
function checkCopyToClipBoard() {
    if (navigator.clipboard && setTimeout) {
        // Available
        createCopyElements();
    }
}
```

### Code examples

#### CSS

* Background gradients
I added background gradients if the browser supports it. I've writting a @supports for this.
The default background color and hover which is also the fallback, is just a plain background color with a different background color on hover.

When background size AND background image with linear gradient is supported, overwrite the default values.

```CSS
/* Fallback */
#back-to-home {
    background-color: #6B6E70;
    transition: 300ms ease-in-out;
}

#back-to-home:hover,
#back-to-home:focus {
    background-color: #444647;
}

/* Support for nice hover and focus effect */
@supports (background-size: 200% auto) and (background-image: linear-gradient(to right, #6B6E70 0%, #61892F 51%, #6B6E70 100%)) {
    #back-to-home {
        background-image: linear-gradient(to right, #6B6E70 0%, #61892F 51%, #6B6E70 100%);
        background-size: 200% auto;
    }
    
    #back-to-home:hover,
    #back-to-home:focus {       
        background-position: right center;
    }
}
```

* Keyframes for clipboard notification

```CSS
/* Supports for a nice fade in transition */
@supports(animation-name: test) {
    #notification {
        opacity: 0;
        animation: notification 5s ease-in-out;
    }
}

@keyframes notification {
    0% {opacity: 0}
    25% {opacity: 1}
    75% {opacity: 1}
    100% {opacity: 0}
}
```

#### HTML

* Inputmode and patterns

From

```HTML
<input name="age" type="number" maxlength="3"><p>jaar</p>
```

To

```HTML
<input name="age" type="text" inputmode="numeric" pattern="[0-9]{2,3}"><p>jaar</p>
```

=> [Source](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)

* Labels as container for inputs

It's semantic better to put inputs inside labels with their text. This way they keep together with their labels more easlily instead of putting a `for` and `id`.



# Assignment 1 

## Device & Browser testing - Break my OBA project

I worked together with [Roy Kuijper](https://github.com/RooyyDoe) on the OBA project. We made it on his repo. 
* Link to the repo: 
[https://github.com/RooyyDoe/project-1-1920](https://github.com/RooyyDoe/project-1-1920)
* Live link: [https://rooyydoe.github.io/project-1-1920/](https://rooyydoe.github.io/project-1-1920/)

#### Features I tested

- `Disable images`: De overview pagina met alle boeken is niet meer bruikbaar, alle klikbare elementen waren images. 
Fix: skeleton UI waarmee de plaatjes standaard hoogtes en breedtes hebben. Daarnaast een goeie alt text van het boek en eventueel de titel er los bij tonen.

Ter verduidelijking uit het artikel [Understanding progressive enchancement](https://alistapart.com/article/understandingprogressiveenhancement/)
![image](https://user-images.githubusercontent.com/45566396/76616854-43911b80-6525-11ea-9524-85185dade834.png)

Zorg dat de content altijd te zien is (sterke semantische HTML), no matter what. Ga hierna pas extra laagjes zoals css en zo nodig javascript eromheen toevoegen wanneer de gebruiker dit ook op zijn device/browser aan kan. In principe bouw je dus verschillende laagjes voor elk soort type gebruiker met verschillende devices en browsers zodat iedereen de content kan zien omdat dit vaak het belangrijkst is van de website. Wanneer iedereen de content kan zien kan je dus "saus" eroverheen gooien om het mooier en leuker te maken.

- `Disable custom font`: Niets interessants.
- `Turn of color / color blind mode`: In Monochromacy kan je de achtergrondkleuren niet meer goed uit elkaar houden in de edit modus van de powerpoint op ons OBA prototype.
Een fix hiervoor zou zijn om de naam van de kleur ook in de content te zetten net als de kleuren voor de fonts. Dit moet ook goed getest worden, zoals de contrasten, ook je website bekijken op verschillende schermen kan helpen.
- `No mouse / trackpad`: Op de homepagina kan je overal doorheen tappen, alleen geen focus state op de categorieën. Overview page: Kan je doorheen tabben, alleen geen focus states. Detail pagina: Door hele template kun je tabben, de customizations voor je template kan je niet doorheen tabben.
Fix: Maak elk element met interactie tabbable, zoals `<a>`, `<button>`, `<input>`, `<select>` en ook `<textarea>`. Liever geen slimme tabindexes gebruiken, gebruik de volgorde van de HTML! Goede `:focus` styles zijn ook zeker geen overbodige luxe. Bron: [Slide van les 2: Muis/Trackpad](https://github.com/cmda-minor-web/browser-technologies-1920/blob/master/slides/BT1920%20College%20Les2%20-%20Progressive%20Enhancement.pdf)
- `Internet throttling`: Ik heb Slow 3G getest. In principe duurt alles iets langer met laden. Met name de afbeeldingen. Hierdoor krijgt de gebruiker dus later feedback dat de content is ingeladen. Een fix hiervoor zou zijn om of de afbeeldingen te comprimeren, of tijdelijk tijdens het laden een soort skeleton UI te laten zien, of natuurlijk allebei.
- `No Javascript`: Alle hoofdunctionaliteiten zoals zoeken (fetchen) werkt niet.
Fix: Doe dit server side 
Alle containers zijn visible omdat ik met javascript met setAttribute deze toggelde. 
Fix: doe dit met CSS.
- `No cookies / local storage`: Alles werkt prima omdat wij dit niet gebruiken.

### Device

#### HP Windows 10
Chrome 80
- Everything works fine since this was the browser we built it for/in.

Firefox 73.0
- Everything works fine here aswell.

Internet Explorer 11.0
- No javascript imports - breaks all javascript immediataly

#### Surface Tablet Windows RT 8.1
Internet Explorer 11.0
- No javascript imports - breaks all javascript immediataly
- This also means some of the styling broke because we set some attributes for JS in javascript. I learned to never use CSS again in Javascript because when you don't have JS enabled or the JS breaks, your whole styling breaks aswell if you defined CSS in your JS.

This means no functionality - because you can't search through the API (Javascript)

All CSS and HTML worked normally.

#### Samsung Galaxy Tab 2 10.1 running android 4.2.2
Anrdoid browser

* Did not work, it blocked github because it was not a secure connection (HTTPS).

Chrome 42 
- No javascript imports - breaks all javascript immediataly
- This also means some of the styling broke because we set some attributes for JS in javascript. I learned to never use CSS again in Javascript because when you don't have JS enabled or the JS breaks, your whole styling breaks aswell if you defined CSS in your JS.

#### Huawei Ascend Y300 running android 4.1.1
* Did not work, it blocked github because it was not a secure connection (HTTPS).

### Conclusion

Old devices cannot use imports in Javascript. This is something to look out for in the future. A simple fix would be writing everything in one file or use a rollup before the site is built.

### Screenreader test - NVDA on Windows 
Over het algemeen:

* Voor elk element vertelt de screenreader op welk niveau het staat en welk element het is. 

Home pagina:

* Elke link je die je hebt bezocht zegt het dat het visited is.

Voor elk categorie blokje zegt de screen reader dit:

"Bezocht link figuur knop bijschrift afbeelding buiten figuur."

Dit is niet bepaald fijn omdat het elke keer een hele lap tekst is. Zeker omdat dit 9 keer wordt verteld. en zou dus beter anders kunnen voor mensen die een screen reader gebruiken.

Detail pagina:

Voor elk aanpasbaar item wordt dit verteld:
* Klikbaar sectie meerdere regels, Bewerkbaar jouw naam hier buiten sectie.

IK vind het goed dat er wordt verteld dat deze velden bewerkbaar zijn.

Het hele template wordt compleet voorgelezen, de instellingen voor het customizen niet, dit is wel een probleem.