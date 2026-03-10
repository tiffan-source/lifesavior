import { CoreError } from '@shared/domain';

/**
 * Erreur levée lorsque l'identifiant d'une Todo est vide.
 */
export class InvalidTodoIdError extends CoreError {
  public readonly code = 'TODO_ID_EMPTY';

  constructor(metadata?: Record<string, unknown>) {
    super('L\'identifiant de la Todo ne peut pas être vide.', metadata);
  }
}
