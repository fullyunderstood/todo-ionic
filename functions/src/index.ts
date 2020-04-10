import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const createUserDocument = functions.auth
    .user()
    .onCreate(async (user: admin.auth.UserRecord, context: functions.EventContext) => {
        const userId = user.uid;
        const doc = db.doc(`/users/${userId}`);
        await doc.create({});
    });

export const deleteUserDocument = functions.auth
    .user()
    .onDelete(async (user: admin.auth.UserRecord, context: functions.EventContext) => {
        const userId = user.uid;
        await db.doc(`/users/${userId}`).delete();
    })
