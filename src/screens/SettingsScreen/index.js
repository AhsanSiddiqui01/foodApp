import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import TimePickerModal from '../../components/Sections/TimePickerModal';
import {
  useServiceSettings,
  saveServiceSettings,
  formatMinutes,
  statusLine,
  isOpenNow,
  DAY_NAMES,
} from '../../utils/serviceSettings';
import { now } from '../../utils/serverTime';
import { presetRange } from '../../utils/dateRange';
import { ordersInRange, toOrder, activeOrders } from '../../utils/orders';
import { showToast } from '../../utils';

const WEEK = [1, 2, 3, 4, 5, 6, 0]; // Monday first

const sameDays = (a, b) => a.length === b.length && a.every((day) => b.includes(day));

// Owner: ordering hours, working days, pause switch, plus a quick look at today
function Settings() {
  const saved = useServiceSettings();
  const [draft, setDraft] = useState(saved);
  const [picker, setPicker] = useState(null); // 'open' | 'close'
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState(null);
  const [clock, setClock] = useState(now());

  // Keep the form in step with what is saved (e.g. changed on another phone)
  useEffect(() => setDraft(saved), [saved]);
  useEffect(() => {
    const timer = setInterval(() => setClock(now()), 30 * 1000);
    return () => clearInterval(timer);
  }, []);

  // Small counts for "Today at a glance", refreshed whenever the tab is opened
  useFocusEffect(useCallback(() => {
    let active = true;
    Promise.all([
      ordersInRange(presetRange('today')).get(),
      firestore().collection('foodList').get(),
      firestore().collection('userProfiles').get(),
    ])
      .then(([orders, menu, users]) => {
        if (active) {
          setStats({
            orders: activeOrders(orders.docs.map(toOrder)).length, // cancelled ones don't count
            dishes: menu.size,
            users: users.docs.filter((doc) => !doc.data().deleted).length,
          });
        }
      })
      .catch((error) => console.log('settings stats error', error));
    return () => { active = false; };
  }, []));

  const changed = draft.openMinute !== saved.openMinute
    || draft.closeMinute !== saved.closeMinute
    || !sameDays(draft.openDays, saved.openDays);
  const open = isOpenNow(clock, saved);

  const togglePause = (accepting) => {
    saveServiceSettings({ paused: !accepting })
      .then(() => showToast(accepting ? 'Orders are open again' : 'Ordering paused for everyone'))
      .catch((error) => {
        console.log('pause error', error);
        showToast('Could not update. Please make sure the latest Firestore rules are published.');
      });
  };

  const toggleDay = (day) => {
    const openDays = draft.openDays.includes(day)
      ? draft.openDays.filter((d) => d !== day)
      : [...draft.openDays, day];
    setDraft({ ...draft, openDays });
  };

  const setTime = (minutes) => {
    setDraft({ ...draft, [picker === 'open' ? 'openMinute' : 'closeMinute']: minutes });
    setPicker(null);
  };

  const save = () => {
    if (draft.closeMinute <= draft.openMinute) {
      return showToast('Closing time must be after opening time');
    }
    if (draft.openDays.length === 0) {
      return showToast('Choose at least one working day');
    }
    setSaving(true);
    saveServiceSettings({
      openMinute: draft.openMinute,
      closeMinute: draft.closeMinute,
      openDays: [...draft.openDays].sort(),
    })
      .then(() => showToast('Service hours updated for everyone'))
      .catch((error) => {
        console.log('save settings error', error);
        showToast('Could not save. Please make sure the latest Firestore rules are published.');
      })
      .finally(() => setSaving(false));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live status */}
        <LinearGradient
          colors={saved.paused ? ['#6B7280', '#4B5563'] : open ? ['#2F7BEA', '#1458C4'] : ['#F2994A', '#E8590C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={[styles.heroCircle, styles.heroCircleOne]} />
          <View style={[styles.heroCircle, styles.heroCircleTwo]} />
          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <View style={[styles.heroDot, open && !saved.paused && styles.heroDotOpen]} />
              <Text style={styles.heroBadgeText}>
                {saved.paused ? 'Paused' : open ? 'Open now' : 'Closed'}
              </Text>
            </View>
            <Text style={styles.heroDay}>{DAY_NAMES[clock.getDay()]}</Text>
          </View>
          <Text style={styles.heroHours}>
            {formatMinutes(saved.openMinute)} – {formatMinutes(saved.closeMinute)}
          </Text>
          <Text style={styles.heroStatus}>{statusLine(clock, saved)}</Text>
          <View style={styles.heroDivider} />
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchTitle}>Accepting orders</Text>
              <Text style={styles.switchHint}>Turn off for holidays or when the kitchen is busy</Text>
            </View>
            <Switch
              value={!saved.paused}
              onValueChange={togglePause}
              trackColor={{ false: 'rgba(255,255,255,0.35)', true: '#4ADE80' }}
              thumbColor="white"
            />
          </View>
        </LinearGradient>

        {/* Service hours */}
        <Text style={styles.sectionTitle}>Service Hours</Text>
        <View style={styles.card}>
          {[
            { key: 'open', label: 'Opens at', value: draft.openMinute, emoji: '🌅' },
            { key: 'close', label: 'Closes at', value: draft.closeMinute, emoji: '🌙' },
          ].map((row, index) => (
            <TouchableOpacity
              key={row.key}
              style={[styles.timeRow, index > 0 && styles.timeRowBorder]}
              activeOpacity={0.7}
              onPress={() => setPicker(row.key)}
            >
              <Text style={styles.timeEmoji}>{row.emoji}</Text>
              <Text style={styles.timeLabel}>{row.label}</Text>
              <View style={styles.timePill}>
                <Text style={styles.timeValue}>{formatMinutes(row.value)}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Working days */}
        <Text style={styles.sectionTitle}>Working Days</Text>
        <View style={styles.card}>
          <View style={styles.daysRow}>
            {WEEK.map((day) => {
              const on = draft.openDays.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.day, on && styles.dayOn]}
                  activeOpacity={0.8}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={[styles.dayText, on && styles.dayTextOn]}>{DAY_NAMES[day].slice(0, 3)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.cardHint}>
            {draft.openDays.length === 7
              ? 'Open every day'
              : `Closed on ${WEEK.filter((day) => !draft.openDays.includes(day)).map((day) => DAY_NAMES[day]).join(', ')}`}
          </Text>
        </View>

        {changed && (
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={save} disabled={saving}>
            {saving ? <ActivityIndicator color="white" /> : <Text style={styles.saveText}>Save Changes</Text>}
          </TouchableOpacity>
        )}

        {/* Today at a glance */}
        <Text style={styles.sectionTitle}>Today at a Glance</Text>
        <View style={styles.statsRow}>
          {[
            { label: 'Orders today', value: stats && stats.orders, emoji: '🧾' },
            { label: 'Dishes on menu', value: stats && stats.dishes, emoji: '🍛' },
            { label: 'Active users', value: stats && stats.users, emoji: '👥' },
          ].map((tile) => (
            <View key={tile.label} style={styles.statTile}>
              <Text style={styles.statEmoji}>{tile.emoji}</Text>
              <Text style={styles.statValue}>{stats ? tile.value : '–'}</Text>
              <Text style={styles.statLabel}>{tile.label}</Text>
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={[styles.card, styles.noteCard]}>
          <Text style={styles.noteTitle}>🌍  Local time for everyone</Text>
          <Text style={styles.noteText}>
            Hours follow each customer's own time zone and the server clock, so changing a phone's
            clock can't get around them. Changes reach every phone instantly.
          </Text>
        </View>
        <Text style={styles.version}>foody · version 1.0</Text>
      </ScrollView>

      <TimePickerModal
        visible={!!picker}
        title={picker === 'open' ? 'Opens at' : 'Closes at'}
        value={picker === 'open' ? draft.openMinute : draft.closeMinute}
        onSave={setTime}
        onClose={() => setPicker(null)}
      />
    </View>
  );
}

export default Settings;
