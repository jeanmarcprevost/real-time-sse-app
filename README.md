# Server Sent Event

Interaction entre le serveur et le client, les clients ouvrent une connection au serveur, écoutent et traitent tout ce que le serveur leur envoie.
C'est une spécificité W3C, il existe une lib de polyfills pour IE

![](https://d2mxuefqeaa7sj.cloudfront.net/s_F7886C553D8D7DF85B3176E00CCE788B3E3C21B7298AB6EBF72BF32938A72E2E_1537435418335_Capture+decran+2018-09-20+a+11.23.22.png)

- Sécurité

**Côté client :**
on peut tester la propriété origin du retour du serveur pour être certain que les datas proviennent de lui.

    if (e.origin != 'http://127.0.0.1:5000' && e.origin != 'http://localhost:5000') {...}

**Côté serveur :**

    'Access-Control-Allow-Origin': 'http://localhost:3001'
## Poc

https://github.com/jeanmarcprevost/real-time-sse-app
https://github.com/jeanmarcprevost/real-time-sse-backend

Une fois le client et le serveur lancés:

    node server.js
    npm run start

 On peut constater que la liste des vols initiale se met à jour toutes les 3 secondes.

Dans le client, on retrouve le json initial : DataProvider.js et l’application en tant que telle : App.js
 
 **App.js**
 Le constructeur va ouvrir la connexion avec le serveur.
 Ensuite, il y a la fonction de mise à jour des data dans componentDidMount, qui va commencer par checker l’origin, pour être sûr que les données reçues sont celle qu'on attend.
 Ensuite on traite les données, si le vol existe, on le met à jour, sinon on l’ajoute au state.

**server.js**
La config simple pour mettre en place les SSE, quelques config de header.
Ensuite on simule des envois successif de données toutes les 3 secondes.
Tous les envois effectuent des modifications sauf le dernier qui ajoute un vol.

