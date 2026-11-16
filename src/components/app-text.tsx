import { StyleSheet, Text, type TextProps } from 'react-native';

import { FONT, TONE } from '@/constants/ui';

/** Rounded, soft-charcoal text. Only used in places adults read (titles, parents' area). */
export function AppText({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[styles.base, style]} />;
}

const styles = StyleSheet.create({
  base: { fontFamily: FONT, color: TONE.text, fontSize: 17 },
});
