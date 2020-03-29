# Assignment 2 Concept

Live link: https://sleepy-everglades-16860.herokuapp.com/

### Case:
- I want to be able to fill in a survey about the minor Web Development, with various answer options. If I do not complete the survey, I want to continue where I left off later.

In short:

A survey for elderly people who need home help because they are in quarantine, if they accidentally close the browser or want to continue later, this can be done using the code if localstorage / cookies is off, otherwise with localstorage / cookies if this is on .

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

#### Functional and reliable

The bottom basic experience will just be HTML. Because Javascript is disabled, I need to save the input and progress server side! I'm now busy building it and I hope I get it done this weekend. My live link right now is just html, some css and a little bit of server side for the data. I write the data into json files with a user id to keep track of it. I'm also gonna add some CSS to make it responsive on every device. When you enter a code that exists, it takes you to the page where you quit last time you filled in the survey.

This basic experience also includes pagination, I built this server side so it works in every browser.

#### Usable

To make it more usable I want to add CSS and some simple client side Javascript. For example simple styling (for example colors, fonts and states for buttons and links) and save answers in localstorage for the core feature.

#### Pleasureable

For this state I want to add nice things like animations and transitions between the pagination. In this state Javascript is enabled and probably on a modern browser. This will be the 'wow' state of my survey.

### My 3 layers 

#### Functional and reliable
Add screenshot here

Description here

#### Usable
Add screenshot here

Description here

#### Pleasureable
Add screenshot here

Description here

### Feature detection

I detect if there is localstorage available with `window.localStorage`

When this is available, I store used keys into local storage. Now I can show all used previous codes on the homepage in case someone lost their code. The most recent code will be on top:
![image](https://user-images.githubusercontent.com/45566396/77850617-063eb600-71d4-11ea-8b26-05e8eb795564.png)

### Code

#### CSS

CSS code here

#### HTML

From

```HTML
<input name="age" type="number" maxlength="3"><p>jaar</p>
```

To

```HTML
<input name="age" type="text" inputmode="numeric" pattern="[0-9]{2,3}"><p>jaar</p>
```

=> [Source](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)

Adding more over time...

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