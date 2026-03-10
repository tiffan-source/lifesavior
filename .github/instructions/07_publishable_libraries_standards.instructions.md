---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Publishable Libraries & Npm Packaging Strategy

Tu es un architecte logiciel senior. Ce document définit la stratégie de distribution du code. Le paradigme a changé : **Ce monorepo ne contient AUCUNE application finale.** Il est exclusivement dédié à la création, la validation et la publication de librairies métier et UI, distribuées via un registre NPM.

## 1. Philosophie : "Library Factory" (Usine à Librairies)
- **Agnosticisme Total :** Les librairies générées ici ignorent totalement l'application finale qui les consommera.
- **Distribution NPM :** Chaque librairie Nx de ce monorepo a vocation à être compilée et publiée en tant que paquet NPM indépendant.
- **Zéro Application :** Le dossier `apps/` n'est utilisé QUE pour des applications de test jetables (E2E) ou des documentations (ex: Storybook). Le code de production vit à 100% dans `libs/`.

## 2. Stratégie de Nommage et d'Importation (Npm Scopes)
Pour refléter la sémantique métier dans les imports des applications clientes, nous utilisons le nom du **Domaine (Scope)** comme "Organisation NPM" (`@scope`).

**Format standard d'importation :** `@<domaine>/<nom-de-la-librairie>`

*Exemples de chemins d'importation par thématique :*
- Domaine Todo : `import { ITodo } from "@todo/domain-protocol"`
- Domaine Todo (Use Cases) : `import { CreateTodoUseCase } from "@todo/business-logic"`
- Domaine Objective : `import { IObjective } from "@objective/domain-protocol"`
- *(Alternative avec org unique : `import { ITodo } from "@org/todo-domain-protocol"` si le registre NPM l'exige).*

## 3. Règle de Génération Nx (Publishable Libs)
Toute nouvelle librairie générée par Copilot **DOIT** être "publishable" (ou "buildable").

Lors de la proposition de commandes de génération, Copilot doit **obligatoirement** inclure les flags `--publishable` (ou `--buildable`) et `--importPath`.

**Exemple de commande attendue :**
```bash
nx g @nx/js:lib domain-protocol\
  --directory=libs/todo/domain-protocol\
  --publishable\
  --importPath="@todo/domain-protocol"\
  --tags="scope:todo,type:domain"\
  --bundler="vite"\
  --buildable\
  --testEnvironment="vitest"\
  --unitTestRunner="vitest"

```

## 4. Gestion des Dépendances (`package.json` par librairie)

Puisque chaque librairie est un paquet NPM, elle possède son propre `package.json`. Copilot doit prêter une attention extrême à sa gestion :

### A. Dépendances Internes (Monorepo)

- Si `@todo/business-logic` dépend de `@todo/business-protocol`, Copilot doit s'assurer que `@todo/business-protocol` est bien listé dans les `dependencies` ou `peerDependencies` du `package.json` de `business-logic`.

- Nx gérera la résolution locale via le `tsconfig.base.json` pendant le développement, mais le `package.json` doit être correct pour la publication.

### B. Dépendances Externes (Frameworks)

- Les frameworks (Angular, React, NestJS) ou les grosses librairies (RxJS) **DOIVENT** être déclarés en tant que `peerDependencies` (et `devDependencies` pour les tests) dans le `package.json` de la lib.

- **Règle :** Ne jamais packager un framework à l'intérieur de la librairie publiée.

## 5. Cas des Librairies UI (`ui-web`, `ui-mobile`)

Les librairies de présentation (définies dans les standards sémantiques) deviennent des **UI Kits** ou des **Micro-Frontends** distribuables.

- Elles exportent des composants autonomes (Standalone Components en Angular, par exemple).

- L'application cliente (qui vit dans un autre dépôt GitHub) fera un simple `npm install @todo/ui-web` pour importer le composant ou la Facade.

## 6. Mise à jour des Flux de Travail

1.  **Création :** Utiliser les flags `--publishable` et `--importPath`.

2.  **TDD :** Le workflow TDD (défini dans l'instruction 09) reste le même, mais s'exécute dans le contexte d'une librairie isolée.

3.  **Exports (Barrels) :** Copilot doit s'assurer que le fichier `src/index.ts` de chaque librairie exporte proprement tous les éléments publics (Entités, Use Cases, Mocks in-memory) pour qu'ils soient accessibles via le point d'entrée du paquet NPM.