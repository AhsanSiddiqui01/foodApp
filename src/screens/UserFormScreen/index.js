import React, { useEffect, useLayoutEffect, useState } from 'react';
import { themeColors } from '../../theme';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { ROLE_OPTIONS, ROLES } from '../../utils/roles';
import {
  createUserAccount,
  updateUserProfile,
  sendPasswordReset,
  authErrorMessage,
  watchAdmins,
} from '../../utils/userAdmin';
import { showToast } from '../../utils';

const ROLE_HINTS = {
  [ROLES.USER]: 'Can browse the menu and order lunch.',
  [ROLES.HANDLER]: 'Sees the orders of the customers assigned to them, updates their status and collects them.',
  [ROLES.ADMIN]: 'Full access: menu, users, settings and every order.',
};

// Owner: create a new account (email + password) with a role, or edit an existing one
function UserForm({ navigation, route }) {
  const user = route.params && route.params.user;
  const editing = !!user;

  const [name, setName] = useState(editing ? user.name || '' : '');
  const [email, setEmail] = useState(editing ? user.email || '' : '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(editing ? Number(user.apcontrol) || ROLES.USER : ROLES.USER);
  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState(editing ? user.adminId || null : null);

  useEffect(() => watchAdmins(setAdmins), []);
  const selectedAdmin = admins.find((admin) => admin.id === adminId) || null;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: editing ? 'Edit User' : 'Add User' });
  }, [navigation, editing]);

  const create = () => {
    if (!email.trim()) {
      return showToast('Please enter an email');
    }
    if (password.length < 6) {
      return showToast('Password must be at least 6 characters');
    }
    setSaving(true);
    createUserAccount({ name, email, password, apcontrol: role, admin: selectedAdmin })
      .then(({ restored }) => {
        showToast(restored
          ? `${name.trim()} is back. Their old password still works; send a reset email if needed.`
          : `${name.trim()} can now sign in`);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('create user error', error);
        showToast(authErrorMessage(error.code));
        setSaving(false);
      });
  };

  const update = () => {
    setSaving(true);
    updateUserProfile(user.id, { name, apcontrol: role, admin: selectedAdmin })
      .then(() => {
        showToast(`${name.trim()} updated`);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('update user error', error);
        showToast(error.code === 'firestore/permission-denied'
          ? 'Not allowed. Please make sure the latest Firestore rules are published.'
          : 'Could not save. Please try again.');
        setSaving(false);
      });
  };

  const save = () => {
    if (!name.trim()) {
      return showToast('Please enter a name');
    }
    return editing ? update() : create();
  };

  const resetPassword = () => {
    if (!email) {
      return showToast('This user has no email saved');
    }
    setSendingReset(true);
    sendPasswordReset(email)
      .then(() => showToast(`Password reset link sent to ${email}`))
      .catch((error) => {
        console.log('password reset error', error);
        showToast(authErrorMessage(error.code));
      })
      .finally(() => setSendingReset(false));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Ali Khan"
          placeholderTextColor={themeColors().placeholder}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, editing && styles.inputLocked]}
          value={editing && !email ? 'No email saved' : email}
          onChangeText={setEmail}
          editable={!editing}
          placeholder="e.g. ali@company.com"
          placeholderTextColor={themeColors().placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {editing && <Text style={styles.hint}>The email can't be changed. Create a new user if it is wrong.</Text>}

        {editing ? (
          <>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity
              style={[styles.resetButton, (!email || sendingReset) && styles.resetButtonDisabled]}
              activeOpacity={0.85}
              onPress={resetPassword}
              disabled={!email || sendingReset}
            >
              {sendingReset
                ? <ActivityIndicator color={themeColors().primary} />
                : <Text style={styles.resetText}>Send Password Reset Email</Text>}
            </TouchableOpacity>
            <Text style={styles.hint}>
              The user gets an email with a link to choose a new password themselves.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="At least 6 characters"
                placeholderTextColor={themeColors().placeholder}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity style={styles.showButton} onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.hint}>Share this password with the user so they can sign in.</Text>
          </>
        )}

        <Text style={styles.label}>Role</Text>
        <View style={styles.roles}>
          {ROLE_OPTIONS.map((option) => {
            const selected = role === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.8}
                onPress={() => setRole(option.value)}
                style={[styles.roleChip, { backgroundColor: selected ? option.color : option.background }]}
              >
                <Text style={[styles.roleText, { color: selected ? 'white' : option.color }]}>{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.hint}>{ROLE_HINTS[role]}</Text>

        {role === ROLES.USER && (
          <>
            <Text style={styles.label}>Assigned Admin</Text>
            <View style={styles.adminList}>
              {[{ id: null, name: 'None' }, ...admins].map((admin) => {
                const selected = adminId === admin.id;
                return (
                  <TouchableOpacity
                    key={admin.id || 'none'}
                    activeOpacity={0.8}
                    onPress={() => setAdminId(admin.id)}
                    style={[styles.adminChip, selected && styles.adminChipActive]}
                  >
                    <View style={[styles.adminDot, selected && styles.adminDotActive]}>
                      <Text style={[styles.adminDotText, selected && styles.adminDotTextActive]}>
                        {admin.id ? (admin.name || '?').charAt(0).toUpperCase() : '–'}
                      </Text>
                    </View>
                    <Text style={[styles.adminName, selected && styles.adminNameActive]} numberOfLines={1}>
                      {admin.name || 'Unnamed'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.hint}>
              {selectedAdmin
                ? `${selectedAdmin.name || 'This admin'} will see and handle this customer's orders.`
                : admins.length === 0
                  ? 'No admins yet. Create a user with the Admin role first.'
                  : 'Without an admin, only you (the owner) will see this customer\'s orders.'}
            </Text>
          </>
        )}

        <TouchableOpacity style={[styles.saveButton, saving && styles.saveButtonDisabled]} activeOpacity={0.85} onPress={save} disabled={saving}>
          {saving
            ? <ActivityIndicator color="white" />
            : <Text style={styles.saveText}>{editing ? 'Save Changes' : 'Create User'}</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default UserForm;
