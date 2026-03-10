/**
 * Contrat définissant la structure d'une Todo.
 * Interface stable du domaine Todo.
 */
export interface ITodo {
  /** Identifiant unique de la Todo. */
  readonly id: string;

  /** Titre de la Todo. */
  readonly title: string;

  /** Description détaillée de la Todo. */
  readonly description: string;

  /** Indique si la Todo est terminée. */
  readonly done: boolean;
}
