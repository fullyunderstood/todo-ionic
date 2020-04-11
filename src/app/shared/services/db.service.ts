import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { map, take } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private afDb: AngularFirestore,
    private firebaseAuthService: AuthService
  ) { }

  async createTodo(todoData: firebase.firestore.DocumentData) {
    try {
      await this.afDb
              .doc(`/users/${this.firebaseAuthService.getCurrentUser().uid}`)
              .collection('todos')
              .add(todoData);
    } catch (error) {
      throw new Error(error);
    }
  }

  getTodos() {
    return this.afDb
      .collection(`/users/${this.firebaseAuthService.getCurrentUser().uid}/todos`, ref => ref.orderBy('createdAt', 'asc'))
      .snapshotChanges()
      .pipe(
        map(todos => {
          return todos.map(todo => {
            const id = todo.payload.doc.id;
            return {
              id,
              ...(todo.payload.doc.data() as any)
            };
          });
        })
      );
  }

  getTodo(todoId: string) {
    return this.afDb.doc(`/users/${this.firebaseAuthService.getCurrentUser().uid}/todos/${todoId}`)
            .snapshotChanges()
            .pipe(
              take(1),
              map(todo => {
                const id = todo.payload.id;
                return {
                  id,
                  ...(todo.payload.data() as any)
                };
              })
            );
  }

  async saveTodo(todoId: string, todoInfo: any) {
    try {
      await this.afDb.doc(`/users/${this.firebaseAuthService.getCurrentUser().uid}/todos/${todoId}`).update(todoInfo);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTodo(todoId: string) {
    try {
      await this.afDb.doc(`/users/${this.firebaseAuthService.getCurrentUser().uid}/todos/${todoId}`)
              .delete();
    } catch (error) {
      throw new Error(error);
    }
  }
}
