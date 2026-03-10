# @todo/domain-protocol

## 📍 Rôle
Couche d'abstraction pure définissant les contrats (interfaces) et erreurs de domaine pour l'entité Todo. Librairie la plus stable du domaine Todo.

## 📦 Contenu Clé
- **`ITodo`** : Interface définissant la structure d'une Todo (id, title, description, done).
- **`ITodoFactory`** : Factory abstraite pour créer des instances sans dépendre de la classe concrète.
- **`CreateTodoParams`** : Type des paramètres de création.
- **`InvalidTodoIdError`** : Erreur levée si l'id est vide.
- **`InvalidTodoTitleError`** : Erreur levée si le titre est vide.

## 🚀 Usage
```typescript
import type { ITodo, ITodoFactory, CreateTodoParams } from '@todo/domain-protocol';
import { InvalidTodoIdError, InvalidTodoTitleError } from '@todo/domain-protocol';
```
