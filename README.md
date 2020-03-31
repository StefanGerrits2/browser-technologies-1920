# Assignment 2 

![image](https://user-images.githubusercontent.com/45566396/78024850-5a26d780-7359-11ea-9dd5-6a3c5be17080.png)

Live link: https://sleepy-everglades-16860.herokuapp.com/

### Case:
- I want to be able to fill in a survey about the minor Web Development, with various answer options. If I do not complete the survey, I want to continue where I left off later.

In short:

A survey for elderly people who need home help because they are in quarantine, if they accidentally close the browser or want to continue later, this can be done because I save the input data server side so it will work on every browser even if javascript is disabled.

So are there any problems?

The core of this survey is to make sure people can fill in a survey, and can continue later on where they left earlier. The problem is you can't save input in local storage because not all browser support that, or maybe Javascript is disabled. Because of this I keep track of the data server side. Users get a code they can use later on to continue their survey. 

## Flow if you're new to the survey
<details>
    <summary >Start </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961895-80428580-691e-11ea-8420-9130c635dfc1.png">
</details>

<details>
    <summary >Receive code for later use </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961920-8b95b100-691e-11ea-981c-cab41e67a693.png">
</details>

<details>
    <summary >Survey with pagination - page 1 </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961935-918b9200-691e-11ea-84c9-43fca52cd297.png">
</details>

<details>
    <summary >Survey with pagination - pagina 3 </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961947-97817300-691e-11ea-91b2-be971de64436.png">
</details>

## Flow if you already filled some of it in, and want to keep on going
<details>
    <summary >Start </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76961895-80428580-691e-11ea-8420-9130c635dfc1.png">
</details>

<details>
    <summary >Type in your code </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76962045-c0096d00-691e-11ea-9ce4-b09a8b569a5b.png">
</details>

<details>
    <summary >Keep on going where you quit last time </summary>
    <img src="https://user-images.githubusercontent.com/45566396/76962051-c3045d80-691e-11ea-916e-a2fd2744b9f0.png">
</details>

### Progressive enhancement

I've built my survey in 3 layers. The first layer is the core function that works in every browser on every device. The application will have more features if the browser can handle this. This will be tested with feature detection. Because of these extra layers my application is progressively enchanced. See below for details per layer.

### My 3 layers 

#### Functional and reliable
![image](https://user-images.githubusercontent.com/45566396/78012127-d367ff80-7344-11ea-90cc-839c1ea4c083.png)

This is the basic semantic HTML and server side stuff. In this layer it's important that the core functionality works in every browser on every device. I save user input server side because there is no client side javascript in this layer. The core functionality works in every browser on every device. I write the data into json files with a user id to keep track of it. When you enter a code that exists, it takes you to the page where you quit last time you filled in the survey, and it remembers the data you've filled in on previous pages. I've tested this on my own browsers, devices and even Browserstack. 

#### Usable
![image](https://user-images.githubusercontent.com/45566396/78012244-fbeff980-7344-11ea-89fe-765f8dc94f51.png)

In this layer, CSS is added to make it more usable. This includes fonts, button states (focus hover active). This makes it usuable for everyone. For example if you don't have a mouse or trackpad, you can still easily see the items you're focusing on with tab. This layer is also responsive for every device. I've written my HTML and CSS in a way that it always works in every browser, in the next layer there will be extra enchancements.

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

If this isn't supported, the notification won't have keyframes. It will just pop on the screen, and leave after a few seconds.

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


## Testing features
### Disable images?
![image](https://user-images.githubusercontent.com/45566396/78022895-023aa180-7356-11ea-9820-0b3718bf26fd.png)

I've given the image a background color as a placeholer, and a height. This way content won't jump if the image hasn't been loaded yet.

### No mouse / trackpad?

I've created focus states for every element that has any interaction. This way users are still able to easily fill in the survey.

### Color blind mode?
<details>
    <summary >Click here to check the results that came out of the color test on https://www.checkmycolours.com/# </summary>
    <img src="https://user-images.githubusercontent.com/45566396/78025344-2bf5c780-735a-11ea-8aa9-4a9921a1d0e4.png">

    Yes, it could be better, but I think it's good enough especially in this given time period.
</details>

### No Javascript / Local storage and cookies?

The core functionality still works when there's no Javascript enabled because I've built this server side. When Javascript is enabled, there will be extra features like local storage, toggling and copy to clipboard with a notification.

### Internet Throttling?
![image](https://user-images.githubusercontent.com/45566396/78025902-16cd6880-735b-11ea-9723-61bea8da00fb.png)


Fonts still need to be loaded in, but that's not an issue. Because I've given the image a background-color it's clear that the image is still loading. Because of this `skeleton UI` content won't jump elsewhere

## Assignment 1 - Device & Browser testing

Go to my [Wiki](https://github.com/StefanGerrits2/browser-technologies-1920/wiki/Assignment-1---Device-&-Browser-testing) to check out this assignment.

## Installation

### 1. Clone this repository to your computer
Run this command in your terminal:

`git clone https://github.com/StefanGerrits2/browser-technologies-1920`
### 2. Navigate into the root of the folder
Run this command in your terminal:

`cd browser-technologies-1920`

### 3 Installing packages
Run this command in your terminal:

`npm install`

### 4. Viewing the website
Run this command in your terminal:

`npm run start`

Now go to your `localhost:3000` in your browser.

If you want to view in dev mode, run:

`npm run dev`

## Sources

* [caniuse](https://caniuse.com/)
* [MDN](https://developer.mozilla.org/nl/)
* [Stackoverflow](https://stackoverflow.com/)

## Check it out!

* [Click here to open the live link](https://sleepy-everglades-16860.herokuapp.com/)

## License

MIT © Stefan Gerrits