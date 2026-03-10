import { describe, it, expect } from 'vitest';
import type { ITodo, ITodoFactory } from '@todo/domain-protocol';
import { InvalidTodoIdError, InvalidTodoTitleError } from '@todo/domain-protocol';
import { DefaultTodoFactory } from '../factories/default-todo-factory.js';

describe('DefaultTodo (via Factory)', () => {
  let factory: ITodoFactory;

  beforeEach(() => {
    factory = new DefaultTodoFactory();
  });

  // ─── Happy Path ────────────────────────────────────────

  it('devrait créer une Todo valide avec tous les champs', () => {
    const todo: ITodo = factory.create({
      id: 'todo-1',
      title: 'Acheter du lait',
      description: 'Lait demi-écrémé bio',
      done: false,
    });

    expect(todo.id).toBe('todo-1');
    expect(todo.title).toBe('Acheter du lait');
    expect(todo.description).toBe('Lait demi-écrémé bio');
    expect(todo.done).toBe(false);
  });

  it('devrait créer une Todo avec description vide par défaut', () => {
    const todo: ITodo = factory.create({
      id: 'todo-2',
      title: 'Faire les courses',
    });

    expect(todo.description).toBe('');
    expect(todo.done).toBe(false);
  });

  it('devrait créer une Todo marquée comme terminée', () => {
    const todo: ITodo = factory.create({
      id: 'todo-3',
      title: 'Lire un livre',
      done: true,
    });

    expect(todo.done).toBe(true);
  });

  // ─── Edge Cases (Erreurs de validation) ────────────────

  it('devrait lever InvalidTodoIdError si l\'id est vide', () => {
    expect(() =>
      factory.create({ id: '', title: 'Titre valide' })
    ).toThrow(InvalidTodoIdError);
  });

  it('devrait lever InvalidTodoIdError si l\'id ne contient que des espaces', () => {
    expect(() =>
      factory.create({ id: '   ', title: 'Titre valide' })
    ).toThrow(InvalidTodoIdError);
  });

  it('devrait lever InvalidTodoTitleError si le titre est vide', () => {
    expect(() =>
      factory.create({ id: 'todo-4', title: '' })
    ).toThrow(InvalidTodoTitleError);
  });

  it('devrait lever InvalidTodoTitleError si le titre ne contient que des espaces', () => {
    expect(() =>
      factory.create({ id: 'todo-5', title: '   ' })
    ).toThrow(InvalidTodoTitleError);
  });
});
