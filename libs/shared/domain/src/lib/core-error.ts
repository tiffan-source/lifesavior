/**
 * Classe abstraite de base pour toutes les erreurs métier du système.
 * Chaque erreur typée doit hériter de cette classe.
 */
export abstract class CoreError extends Error {
  /** Code unique pour le parsing machine (ex: `TODO_TITLE_EMPTY`). */
  public abstract readonly code: string;

  /** Contexte additionnel optionnel (ex: `{ todoId: '123' }`). */
  public readonly metadata?: Record<string, unknown>;

  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.metadata = metadata;
  }
}
