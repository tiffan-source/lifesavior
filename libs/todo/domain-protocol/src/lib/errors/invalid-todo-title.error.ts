import { CoreError } from '@shared/domain';

/**
 * Erreur levée lorsque le titre d'une Todo est vide.
 */
export class InvalidTodoTitleError extends CoreError {
  public readonly code = 'TODO_TITLE_EMPTY';

  constructor(metadata?: Record<string, unknown>) {
    super('Le titre de la Todo ne peut pas être vide.', metadata);
  }
}
