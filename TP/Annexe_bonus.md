
# Annexe BONUS

## Librairies tierces pour aller plus loin, plus vite, plus fort

Dans mon expérience pro, j'ai utilisé et j'utilise pas mal de librairies qui peuvent vous être utiles.
Surtout si vous faites du React ou des applications TypeScript orientées backend.
J'en ai évoqué quelques-unes durant le cours, sans réellement approfondir, faute de temps. Avec l'overflow d'informations, votre RAM mémoire a peut-être saturé, ou alors j'en ajoute quelques-unes qui me viennent à l'esprit en écrivant ce fichier.

### Zod
Zod, je l'utilise pour la validation des données. Cette librairie va me permettre d'aller plus loin que les types fournis nativement par TypeScript en ajoutant des règles précises (min, max, regex...) ou même en typant avec une meilleure précision (mail, UUID...), ce qui évite les regex et les strings.

l'avantage de Zod, c'est que vous pouvez en extraire le type natif de TypeScript, donc pas besoin de réécrire le type.
*n'oubliez pas, pas de doublon, et surtout le mantra ultime du dev*
**Faire deux fois la même chose, c'est déjà deux fois de trop**

```
npm i zod
```

Pour la doc, [clique ici](https://zod.dev/).
Pour le package, [c'est ici](https://www.npmjs.com/package/zod).


### react-hook-form & @hookform/resolvers
Les deux librairies fonctionnent ensemble. Vous pouvez utiliser react-hook-form sans @hookform/resolvers, **CEPENDANT** vous perdez tous les avantages qu'offre le trio zod, react-hook-form et @hookform/resolvers.
  
React Hook Form est une librairie qui va globalement mieux gérer les formulaires dans vos applications React. Elle est avantageuse pour gérer les erreurs, les données par défaut ou d'init, les push, les useState...
Elle va régler deux soucis :

1. Ne plus avoir X useState pour chaque variable EX:

```ts
const [name, setName] = useState<string>("");
const [mail, setMail] = useState<string>("");
const [phone, setPhone] = useState<string>("");
//...
```
Imbuvable et polluant pour vos pauvres pages et collègues dev.

2. Afficher les erreurs des variables s'il y en a

Car entre nous, faire des fonctions d'erreur et des `if` interminables pour vérifier chaque variable devient vite horrible.

C'est notamment sur ça que la deuxième librairie est intéressante, mais elle ne fonctionne pas seule.

`@hookform/resolvers` va s'occuper de résoudre les parseurs, et pas n'importe lesquels, car elle offre une implémentation de diverses librairies comme Zod pour les intégrer dans le formulaire.

C'est là que Zod prend tout son sens en frontend, car ça vous permet de faire une vérification des données côté client avant de faire des appels API. Ce qui permet, non pas un contrôle global, mais d'économiser des appels vers votre serveur.

Car comme expliqué dans le cours, dans votre vie de dev vous allez devoir optimiser. Si vous pouvez contraindre les utilisateurs avant un appel API, c'est déjà gagné.
Mais vous êtes obligés de faire cette même vérification de données au niveau backend, car demain des individus malveillants (ou juste vous pour tester votre back) vont peut-être interroger votre API en passant par un Swagger ou autre, et il faut que votre validation se fasse aussi ici.

Pour revenir au sujet principal, hookform va donc, avec la complicité de Zod, gérer vos validations. Donc si demain vous avez mis un string avec un max de 30 caractères, votre formulaire va afficher une erreur car l'utilisateur ne respecte pas votre schéma.

**react-hook-form**
```
npm i react-hook-form
```

Pour la doc, [clique ici](https://react-hook-form.com/).
Pour le package, [c'est ici](https://www.npmjs.com/package/react-hook-form).

**@hookform/resolvers**
```
npm i @hookform/resolvers
```

Pour le package, [c'est ici](https://www.npmjs.com/package/@hookform/resolvers).

### TanStack Query
Gère aussi les appels API, comme peut le faire Axios ou fetch (ou même RTK pour les utilisateurs de Redux), ainsi que le cache des données et les invalidations.

```
npm i @tanstack/react-query
```

Pour la doc, [clique ici](https://tanstack.com/query/latest/docs/framework/react/installation).
Pour le package, [c'est ici](https://www.npmjs.com/package/@tanstack/react-query).


### RTK, AXIOS ...
Petit pense-bête pour toutes ces autres libs.

**Axios**
Pour la doc, [clique ici](https://axios.rest/fr/pages/getting-started/first-steps).
Pour le package, [c'est ici](https://www.npmjs.com/package/axios).

**Redux, RTK ...** 
Redux
Pour la doc, [clique ici](https://redux.js.org/).
Pour le package Redux, [c'est ici](https://www.npmjs.com/package/redux).  

ReduxToolkit (RTK)
Pour la doc, [clique ici](https://redux-toolkit.js.org/introduction/getting-started).

## Librairies annexes hors du cours Ionic, mais qui peuvent vous servir dans votre vie pro

**Prisma**
Pour la doc, [clique ici](https://www.prisma.io/docs).

**MSW**
Pour la doc, [clique ici](https://mswjs.io/docs/).

**Turborepo**
Pour la doc, [clique ici](https://turborepo.dev/docs).