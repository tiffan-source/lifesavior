# @todo/domain-model

## 📍 Rôle
Implémentation concrète des entités Todo. Contient la logique de validation interne et les Factory.

## 📦 Contenu Clé
- **`DefaultTodo`** : Classe implémentant `ITodo` avec encapsulation par getters.
- **`DefaultTodoFactory`** : Factory validant les règles métier (id/titre non vides) avant instanciation.

## 🚀 Usage
```typescript
import { DefaultTodoFactory } from '@todo/domain-model';

const factory = new DefaultTodoFactory();
const todo = factory.create({ id: '1', title: 'Ma todo' });
```

## Building

Run `nx build todo-domain-model` to build the library.

## Running unit tests

Run `nx test todo-domain-model` to execute the unit tests via [Vitest](https://vitest.dev/).
