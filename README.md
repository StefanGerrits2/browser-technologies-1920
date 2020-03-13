## Device & Browser testing - Break my OBA project

I worked together with [Roy Kuijper](https://github.com/RooyyDoe) on the OBA project. We made it on his repo. 
* Link to the repo: 
[https://github.com/RooyyDoe/project-1-1920](https://github.com/RooyyDoe/project-1-1920)
* Live link: [https://rooyydoe.github.io/project-1-1920/](https://rooyydoe.github.io/project-1-1920/)

#### Tested features

- Disable images: De overview pagina met alle boeken is niet meer bruikbaar, alle klikbare elementen waren images. Fix: skeleton UI waarmee de plaatjes standaard hoogtes en breedtes hebben. Daarnaast een goeie alt text van het boek en eventueel de titel er los bij tonen.
- Disable custom fonts: Niets interessants.
- Turn of color / color blind mode: In Monochromacy kan je de achtergrondkleuren niet meer goed uit elkaar houden in de edit modus van de powerpoint. Een fix hiervoor zou zijn om de naam van de kleur ook in de content te zetten net als de kleuren voor de fonts.
- No mouse / trackpad: Op de homepagina kan je overal doorheen tappen, alleen geen focus state op de categorieën. Overview page: Kan je doorheen tabben, alleen geen focus states. Detail pagina: Door hele template kun je tabben, de customizations voor je template kan je niet doorheen tabben.
- Internet throttling: Ik heb Slow 3G getest. In principe duurt alles iets langer met laden. Met name de afbeeldingen. Hierdoor krijgt de gebruiker dus later feedback dat de content is ingeladen. Een fix hiervoor zou zijn om of de afbeeldingen te comprimeren, of tijdelijk tijdens het laden een soort skeleton UI te laten zien, of natuurlijk allebei.
- No Javascript: Functionaliteiten zoals zoeken (fetchen) werkt niet. Alle containers zijn visible omdat ik met javascript met setAttribute deze toggelde. Fix: doe dit met CSS.
- No cookies / local storage: Alles werkt prima omdat wij dit niet gebruiken.

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
* Bezocht link figuur knop bijschrift afbeelding buiten figuur.

Detail pagina:

Voor elk aanpasbaar item:
* Klikbaar sectie meerdere regels Bewerkbaar jouw naam hier buiten sectie.

Het hele template wordt compleet voorgelezen, de instellingen voor het customizen niet.
