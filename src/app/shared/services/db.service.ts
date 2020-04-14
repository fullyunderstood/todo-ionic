import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase';

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

  getActiveTodos() {
    return this.afDb
      .collection(
        `/users/${this.firebaseAuthService.getCurrentUser().uid}/todos`,
        ref => ref.where('completed', '==', false)
                    .orderBy('createdAt', 'desc')
      )
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

  getCompletedTodos() {
    return this.afDb
      .collection(
        `/users/${this.firebaseAuthService.getCurrentUser().uid}/todos`,
        ref => ref.where('completed', '==', true)
                    .orderBy('createdAt', 'desc')
      )
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

  async deleteAllCompletedTodos() {
    try {
      const completedTodos = await this.afDb.collection(
        `/users/${this.firebaseAuthService.getCurrentUser().uid}/todos`,
        ref => ref.where('completed', '==', true)
                    .orderBy('createdAt', 'desc')
      ).get().toPromise();

      if (completedTodos && completedTodos.size) {
        completedTodos.docs.forEach(async doc => {
          await doc.ref.delete();
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUserAccount(password: string) {
    try {
      const credentials = firebase.auth.EmailAuthProvider.credential(this.firebaseAuthService.getCurrentUser().email, password);
      await this.firebaseAuthService.getCurrentUser().reauthenticateWithCredential(credentials)
        .then(async () => {
          await this.firebaseAuthService.getCurrentUser().delete();
          await this.firebaseAuthService.logout();
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  async completeTodo(todoId: string) {
    try {
      await this.afDb.doc(`/users/${this.firebaseAuthService.getCurrentUser().uid}/todos/${todoId}`)
              .update({completed: true});
    } catch (error) {
      throw new Error(error);
    }
  }

  async restoreTodo(todoId: string) {
    try {
      await this.afDb.doc(`/users/${this.firebaseAuthService.getCurrentUser().uid}/todos/${todoId}`)
              .update({completed: false});
    } catch (error) {
      throw new Error(error);
    }
  }
}
