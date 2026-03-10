import type { ITodo, ITodoFactory, CreateTodoParams } from '@todo/domain-protocol';
import { InvalidTodoIdError, InvalidTodoTitleError } from '@todo/domain-protocol';
import { DefaultTodo } from '../entities/default-todo.js';

/**
 * Factory par défaut pour instancier des DefaultTodo.
 * Applique les règles de validation métier avant création.
 */
export class DefaultTodoFactory implements ITodoFactory {
  /**
   * Crée une Todo après validation métier.
   * @param params - Paramètres de création.
   * @returns Une instance valide de ITodo.
   * @throws InvalidTodoIdError si l'id est vide.
   * @throws InvalidTodoTitleError si le titre est vide.
   */
  create(params: CreateTodoParams): ITodo {
    const id = params.id.trim();
    const title = params.title.trim();

    if (!id) {
      throw new InvalidTodoIdError({ id: params.id });
    }

    if (!title) {
      throw new InvalidTodoTitleError({ title: params.title });
    }

    return new DefaultTodo(
      id,
      title,
      params.description ?? '',
      params.done ?? false,
    );
  }
}
