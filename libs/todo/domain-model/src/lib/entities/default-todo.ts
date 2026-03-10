import type { ITodo } from '@todo/domain-protocol';

/**
 * Implémentation par défaut de l'entité Todo.
 * Encapsule les données et garantit l'immutabilité.
 */
export class DefaultTodo implements ITodo {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _done: boolean;

  constructor(id: string, title: string, description: string, done: boolean) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._done = done;
  }

  /** Identifiant unique de la Todo. */
  get id(): string {
    return this._id;
  }

  /** Titre de la Todo. */
  get title(): string {
    return this._title;
  }

  /** Description détaillée de la Todo. */
  get description(): string {
    return this._description;
  }

  /** Indique si la Todo est terminée. */
  get done(): boolean {
    return this._done;
  }
}
