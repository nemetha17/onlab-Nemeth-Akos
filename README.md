1. `backend/.env.temp` tartalmának átmásolása `backend/.env`-be és az adatok kitöltése
2.  Két terminál megnyitása
első terminálon:
    cd fronted
    npm install
    npm run start

második terminálon:
    cd backend
    npm install
    npm run start

3. Az alkalmazás müködése:
Belépés elött a "Login" és a "Registration" oldalak között lehet navigálni. 
A "Registration" ablakban a regisztráció érthető el.
A "Login" ablakban pedig a belépés.

Belépés után bal oldalról behuzva érhető el a 4 fő oldal:
-Home
-PostUpload
-Search
-MyProfile

A Home oldalon ki választható 1 fajta topicot majd az abba a topicba lévő posztok címeit kilistázza az alkalmazás, vagy választható az ősszes poszt címének listázása.
A kilistázott címek közül az egyikre érintve megnyílódik a teljes poszt.

A PostUpload fülön a cím és a tartalom megadása valamit a topic kiválasztása után lehet uj posztot létre hozni.

A Search fülön kereshetünk poszt címekre valamint felhasználókra is.
Elöbbi esetén a keresett poszt jelenik meg, míg utobbinál a felhasználó posztjainak címei lesznek listázva és érintéssel nyilnak meg.

A MyProfile fülön a "MyPosts" gombal kilistázodnak a felhasználohóz tartozó posztok címei, érintéssel törlödnek.
A szövegmezzőbe a felhasználó megadhatja a saját posztjának címét és utánna szerkeszteni tudja azt.
A LogOut gomb a kilépésre szolgál.
