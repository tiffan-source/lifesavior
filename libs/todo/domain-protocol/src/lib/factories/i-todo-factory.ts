import type { ITodo } from '../entities/i-todo.js';

/**
 * Paramètres requis pour créer une Todo via la Factory.
 */
export interface CreateTodoParams {
  id: string;
  title: string;
  description?: string;
  done?: boolean;
}

/**
 * Factory abstraite pour instancier des objets ITodo.
 * Permet la création sans dépendre de l'implémentation concrète.
 */
export interface ITodoFactory {
  /**
   * Crée une instance de Todo après validation métier.
   * @param params - Paramètres de création.
   * @returns Une instance valide de ITodo.
   * @throws InvalidTodoIdError si l'id est vide.
   * @throws InvalidTodoTitleError si le titre est vide.
   */
  create(params: CreateTodoParams): ITodo;
}
