# Dance Floor X


## To do list:

SoundCloud API
Graphics

Functions:

1. Collision detection walls
2. Play different music depending on what room user is.
3. Animation light
4. Animation people dancing
5. Moving user with mouse
6. Player from SoundCloud
7. Fading different rooms and “states”
8. Textbox 




## Installation

### // node & npm //
step 1: install node js 4.2.4
(windows måste byta cmd till node js cmd tryck winknappen skriv cmd och ta och öppna den som det står node js på) 
step 2: open cmd for nodejs
(Jag har redan confat alla paket vi behöver så npm install så borde ni få allt ni behöver)
step 3: npm install
Det här installerar alla moduler react sass babel och annat smått och gott som vi kan behöva.


### // git //

git init (in projekt folder).
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/micke232/projectx.git
git push -u origin master


### // bra saker att ha //

dev-tools till react för chrome.

http://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html


För att köra webpack så ska ni ligga i projektmappens root.
Det finns 2 script confade
npm run start (Den här kör utvecklarläget och har liveprview och lyssnar på änringar i js, css (sass), html. Det är den här ni använder) gå till webläsaren skriv in localhost:3000 och där har ni projektet. 
npm run deploy (Denna minifierar hela projektet och samlar det i en så kallad dist-mapp, det är filerna som kommer in här som ska upp live)

för att starta om eller stänga av ctrl c windows ctrl z mac/linux och kör npm run ***** igen

Kom ihåg, att lägga till och ta bort filer när ni utvecklar så måste ni starta om node servern. Webpack lyssnar efter ändringar i filer, inte om det läggs till eller tas bort filer