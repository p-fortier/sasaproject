# sasproject
Projet SAS

Lancer le serveur:
$ npm start

Lancer MongoDB:
$ mongod
Pour aller dans notre base de donnees:
>use sasproject

Pour peupler la base de données:
mongoimport -d sasproject -c headers --file headers.json --jsonArray

Voir tous les headers:
http://localhost:3000/allheaders

Voir notre header:
http://localhost:3000/headers

Voir n headers selectionnés aléatoirement:
http://localhost:3000/getselectedheaders/n

Pour creer nos associations avec n headers:
http://localhost:3000/association/n
