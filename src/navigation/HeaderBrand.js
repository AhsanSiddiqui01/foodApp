import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import { isOrderTimeOpen } from '../utils';
import { statusLine, useServiceSettings } from '../utils/serviceSettings';
import { now as serverNow } from '../utils/serverTime';

const greetingFor = (hour) => {
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
};

// Home header: time-of-day greeting with the user's name, plus a live ordering-status line
const HeaderBrand = () => {
  const name = useSelector((state) => state.GeneralReducer.name);
  const [now, setNow] = useState(serverNow());
  useEffect(() => {
    const timer = setInterval(() => setNow(serverNow()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);
  const settings = useServiceSettings();
  const open = isOrderTimeOpen(now);
  const firstName = (name || '').trim().split(' ')[0];

  return (
    // width capped so the text stops before the theme + avatar buttons on the right
    <View style={styles.brandContainer}>
      <Text style={styles.greeting} numberOfLines={1}>
        {greetingFor(now.getHours())}{firstName ? `, ${firstName}` : ''} 👋
      </Text>
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, !open && styles.statusDotClosed]} />
        <Text style={styles.statusText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
          {statusLine(now, settings)}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBrand;
