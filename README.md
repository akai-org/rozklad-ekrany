# rozklad-ekrany

Aplikacja wyświetlająca rozkład jazdy tramwajów i dostępność rowerów wokół Politechniki Poznańskiej.

## Opis plików

 - `index.html` - główny plik wyświetlający wszystkie dane
 - `bikes.js` - plik pobierający dane o rowerach, nie wymaga proxy, łączy się z adresem `https://api.nextbike.net/`
 - `trams.js` - plik pobierający dane o tramwajach, wymaga proxy, łączy się z adresem `https://www.peka.poznan.pl/vm/`
 - `common.js` - plik zawierający drobne helpery
 - `images/` - obrazy wykorzystywane przy wyświetlaniu
 - `style.css` - ostylowanie wyglądu
 - `app.js` - proxy pozwalające na pobieranie danych o tramwajach


## Development
Uruchomienie serwera http:
```
npx http-server -c-1
```
