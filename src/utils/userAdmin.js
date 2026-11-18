import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ROLES } from './roles';

// Shown when a blocked (or removed) user tries to use the app
export const ACCOUNT_SUSPENDED = {
  title: 'Account Suspended',
  message:
    'Your account has been suspended and you can no longer sign in. ' +
    'If you believe this is a mistake, please contact your administrator for assistance.',
};
export const ROLE_CHANGED = {
  title: 'Your Access Has Changed',
  message: 'Your administrator has updated your account. Please sign in again to continue.',
};
export const ACCOUNT_REMOVED = {
  title: 'Account Not Found',
  message:
    'This account is no longer active. Please contact your administrator to restore your access.',
};

// Creating a user with the normal auth instance would sign the owner out, so new accounts are
// created on a separate, temporary Firebase app that shares this project's settings.
const CREATOR_APP = 'userCreator';
const creatorApp = async () => {
  const existing = firebase.apps.find((app) => app.name === CREATOR_APP);
  if (existing) {
    return existing;
  }
  const options = firebase.app().options;
  return firebase.initializeApp({
    ...options,
    // RNFB v16 insists on a databaseURL even though this app never uses Realtime Database,
    // and projects without one have none in google-services.json
    databaseURL: options.databaseURL || `https://${options.projectId}-default-rtdb.firebaseio.com`,
  }, CREATOR_APP);
};

// Resolves { uid, restored }. If the email belongs to a user the owner deleted earlier, the
// login still exists in Firebase Auth, so that profile is brought back instead (their old
// password keeps working).
// Only customers are attached to an admin (who then sees their orders)
const adminFields = (apcontrol, admin) => (Number(apcontrol) === ROLES.USER && admin
  ? { adminId: admin.id, adminName: admin.name || '' }
  : { adminId: null, adminName: null });

export const createUserAccount = async ({ name, email, password, apcontrol, admin }) => {
  const cleanEmail = email.trim().toLowerCase();
  const profile = {
    name: name.trim(),
    email: cleanEmail,
    apcontrol: Number(apcontrol),
    blocked: false,
    deleted: false,
    ...adminFields(apcontrol, admin),
  };

  const app = await creatorApp();
  try {
    const { user } = await app.auth().createUserWithEmailAndPassword(cleanEmail, password);
    await app.auth().signOut();
    // Written by the owner (default app), which the rules allow
    await firestore().collection('userProfiles').doc(user.uid).set({
      ...profile,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return { uid: user.uid, restored: false };
  } catch (error) {
    if (error.code !== 'auth/email-already-in-use') {
      throw error;
    }
    const existing = await firestore().collection('userProfiles').where('email', '==', cleanEmail).limit(1).get();
    const doc = existing.docs[0];
    if (!doc || !doc.data().deleted) {
      throw error; // a live account, or a login with no profile we can find
    }
    await doc.ref.update({ ...profile, restoredAt: firestore.FieldValue.serverTimestamp() });
    return { uid: doc.id, restored: true };
  }
};

// Name, role and assigned admin live in the profile, so the owner can change them directly
export const updateUserProfile = (uid, { name, apcontrol, admin }) =>
  firestore().collection('userProfiles').doc(uid).update({
    name: name.trim(),
    apcontrol: Number(apcontrol),
    ...adminFields(apcontrol, admin),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });

// Live list of active admins (role 1) for the "Assigned admin" picker
export const watchAdmins = (onChange) =>
  firestore().collection('userProfiles').where('apcontrol', '==', ROLES.HANDLER).onSnapshot(
    (snapshot) => onChange(
      snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((admin) => !admin.deleted)
        .sort((a, b) => (a.name || '').localeCompare(b.name || '')),
    ),
    (error) => console.log('admins snapshot error', error),
  );

// Firebase only lets a server change someone else's password, so instead the user is emailed
// a link to choose a new one themselves (free on the Spark plan)
export const sendPasswordReset = (email) => firebase.auth().sendPasswordResetEmail(email.trim());

export const setUserBlocked = (uid, blocked) =>
  firestore().collection('userProfiles').doc(uid).update({
    blocked,
    blockedAt: blocked ? firestore.FieldValue.serverTimestamp() : null,
  });

// "Deletes" a user by marking the profile, so they can't sign in and drop out of the list. The
// Firebase Auth login itself can only be removed by a server (paid) or in the console; keeping
// the profile lets the owner re-create the same email later (see createUserAccount).
export const deleteUserProfile = (uid) =>
  firestore().collection('userProfiles').doc(uid).update({
    deleted: true,
    blocked: true,
    deletedAt: firestore.FieldValue.serverTimestamp(),
  });

export const authErrorMessage = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email already has an account. If it was deleted long ago, remove it in Firebase console → Authentication first.';
    case 'auth/invalid-email':
      return 'Please enter a valid email';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    case 'auth/network-request-failed':
      return 'No internet connection';
    case 'auth/user-not-found':
      return 'No login exists for this email';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'Could not create the user. Please try again.';
  }
};
