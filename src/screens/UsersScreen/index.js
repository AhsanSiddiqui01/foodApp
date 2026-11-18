import React, { useCallback, useState } from 'react';
import { themeColors } from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { icons } from '../../assets/images';
import { ROLE_OPTIONS, ROLES, roleOption } from '../../utils/roles';
import { setUserBlocked, deleteUserProfile } from '../../utils/userAdmin';
import ConfirmModal from '../../components/Sections/ConfirmModal';
import { showToast } from '../../utils';

const FILTERS = [{ value: 'all', label: 'All' }, ...ROLE_OPTIONS.map(({ value, label }) => ({ value, label: `${label}s` }))];

// Owner: list everyone, block / unblock, remove, and add new users
function Users({ navigation }) {
  const myId = useSelector((state) => state.GeneralReducer.id);
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState('all');
  const [pending, setPending] = useState(null); // { type: 'block' | 'unblock' | 'delete', user }

  // Re-subscribe every time the tab is opened: a listener that once failed (e.g. permission
  // denied before the rules were published) stops for good, so a fresh one is needed
  useFocusEffect(useCallback(() => firestore().collection('userProfiles').onSnapshot((snapshot) => {
    // Deleted users stay as hidden profiles so the same email can be added again later
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter((user) => !user.deleted);
    list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    setUsers(list);
    setLoaded(true);
  }, (error) => {
    console.log('users snapshot error', error);
    setLoaded(true);
  }), []));

  // Show the change right away; put it back if the save fails
  const patchUser = (id, changes) =>
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, ...changes } : user)));

  const visible = filter === 'all' ? users : users.filter((user) => Number(user.apcontrol) === filter);

  const confirmPending = () => {
    const { type, user } = pending;
    setPending(null);
    if (type !== 'delete') {
      patchUser(user.id, { blocked: type === 'block' });
    }
    const action = type === 'delete'
      ? deleteUserProfile(user.id)
      : setUserBlocked(user.id, type === 'block');
    const done = { block: 'blocked', unblock: 'unblocked', delete: 'removed' }[type];
    action
      .then(() => showToast(`${user.name || 'User'} ${done}`))
      .catch((error) => {
        console.log(`${type} user error`, error);
        if (type !== 'delete') {
          patchUser(user.id, { blocked: !!user.blocked });
        }
        showToast(error.code === 'firestore/permission-denied'
          ? 'Not allowed. Please make sure the latest Firestore rules are published.'
          : 'Something went wrong. Please try again.');
      });
  };

  const dialog = () => {
    if (!pending) {
      return {};
    }
    const name = pending.user.name || 'this user';
    switch (pending.type) {
      case 'block':
        return {
          title: `Block ${name}?`,
          message: 'They will be signed out right away and won\'t be able to sign in until you unblock them.',
          confirmText: 'Block',
          destructive: true,
        };
      case 'unblock':
        return {
          title: `Unblock ${name}?`,
          message: 'They will be able to sign in and use the app again.',
          confirmText: 'Unblock',
        };
      default:
        return {
          title: `Remove ${name}?`,
          message: 'They will lose access to the app for good. Their past orders stay in the records.',
          confirmText: 'Remove',
          destructive: true,
        };
    }
  };

  const renderUser = ({ item }) => {
    const role = roleOption(item.apcontrol);
    const isMe = item.id === myId;
    return (
      <View style={[styles.card, item.blocked && styles.cardBlocked]}>
        <View style={[styles.avatar, { backgroundColor: role.background }]}>
          <Text style={[styles.avatarText, { color: role.color }]}>
            {(item.name || '?').charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name || 'Unnamed'}{isMe ? '  (You)' : ''}
          </Text>
          <Text style={styles.email} numberOfLines={1}>{item.email || 'No email saved'}</Text>
          {Number(item.apcontrol) === ROLES.USER && (
            <Text style={[styles.adminLine, !item.adminId && styles.adminLineMissing]} numberOfLines={1}>
              {item.adminId ? `Admin: ${item.adminName || 'Assigned'}` : 'No admin assigned'}
            </Text>
          )}
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: role.background }]}>
              <Text style={[styles.badgeText, { color: role.color }]}>{role.label}</Text>
            </View>
            {item.blocked && (
              <View style={[styles.badge, styles.blockedBadge]}>
                <Text style={[styles.badgeText, styles.blockedText]}>Blocked</Text>
              </View>
            )}
          </View>
        </View>
        {!isMe && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.blockButton, item.blocked && styles.unblockButton]}
              activeOpacity={0.8}
              onPress={() => setPending({ type: item.blocked ? 'unblock' : 'block', user: item })}
            >
              <Text style={[styles.blockText, item.blocked && styles.unblockText]}>
                {item.blocked ? 'Unblock' : 'Block'}
              </Text>
            </TouchableOpacity>
            <View style={styles.iconRow}>
              <TouchableOpacity
                style={styles.editButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('UserForm', { user: item })}
              >
                <Image source={icons.edit} style={styles.deleteIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                activeOpacity={0.7}
                onPress={() => setPending({ type: 'delete', user: item })}
              >
                <Image source={icons.trash} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const { title, message, confirmText, destructive } = dialog();

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {FILTERS.map((option) => {
          const selected = filter === option.value;
          const count = option.value === 'all'
            ? users.length
            : users.filter((user) => Number(user.apcontrol) === option.value).length;
          return (
            <TouchableOpacity
              key={String(option.value)}
              style={[styles.filter, selected && styles.filterActive]}
              activeOpacity={0.8}
              onPress={() => setFilter(option.value)}
            >
              <Text style={[styles.filterText, selected && styles.filterTextActive]}>
                {option.label} {count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loaded
            ? <Text style={styles.empty}>No users here yet</Text>
            : <ActivityIndicator style={styles.loader} color={themeColors().primary} />
        }
      />

      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('UserForm')}>
        <Image source={icons.plusWhite} style={styles.fabIcon} />
        <Text style={styles.fabText}>Add User</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={!!pending}
        title={title}
        message={message}
        confirmText={confirmText}
        destructive={destructive}
        onConfirm={confirmPending}
        onCancel={() => setPending(null)}
      />
    </View>
  );
}

export default Users;
