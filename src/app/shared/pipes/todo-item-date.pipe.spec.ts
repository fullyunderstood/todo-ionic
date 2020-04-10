import { TodoItemDatePipe } from './todo-item-date.pipe';

describe('TodoItemDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TodoItemDatePipe();
    expect(pipe).toBeTruthy();
  });
});
