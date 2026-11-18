import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import actions from '../../../redux/actions';
import ConfirmModal from '../ConfirmModal';
import { ACCOUNT_SUSPENDED, ACCOUNT_REMOVED, ROLE_CHANGED } from '../../../utils/userAdmin';

// Watches the signed-in user's profile; if the owner blocks or removes them while they are
// using the app, they are signed out right away and told why.
const AccountWatcher = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.GeneralReducer.id);
  const signedIn = useSelector((state) => !!state.GeneralReducer.access_token);
  const apcontrol = useSelector((state) => state.GeneralReducer.apcontrol);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!signedIn || !uid) {
      return undefined;
    }
    return firestore().collection('userProfiles').doc(uid).onSnapshot((snapshot) => {
      const removed = !snapshot.exists || !!snapshot.data().deleted;
      const blocked = !removed && snapshot.data().blocked;
      // A new role needs different screens, so the user signs in again to get them. Only compare
      // when the app actually knows the signed-in role, so a missing value never logs anyone out.
      const knownRole = apcontrol !== null && apcontrol !== undefined && apcontrol !== '';
      const roleChanged = !removed && knownRole
        && Number(snapshot.data().apcontrol) !== Number(apcontrol);
      if (removed || blocked || roleChanged) {
        setNotice(removed ? ACCOUNT_REMOVED : blocked ? ACCOUNT_SUSPENDED : ROLE_CHANGED);
        dispatch(actions.logOut(() => {}, () => {}));
      }
    }, (error) => console.log('account watch error', error));
  }, [signedIn, uid, apcontrol, dispatch]);

  return (
    <ConfirmModal
      visible={!!notice}
      title={notice ? notice.title : ''}
      message={notice ? notice.message : ''}
      confirmText="OK"
      hideCancel
      onConfirm={() => setNotice(null)}
    />
  );
};

export default AccountWatcher;
