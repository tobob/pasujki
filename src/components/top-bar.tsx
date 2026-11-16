import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon, type IconName } from '@/components/icons';
import { SoftButton } from '@/components/soft-button';
import { TONE } from '@/constants/ui';

type Props = { onBack: () => void; icon?: IconName; title?: string; right?: ReactNode; backLabel?: string };

export function TopBar({ onBack, icon = 'back', title, right, backLabel = 'Wróć' }: Props) {
  return (
    <View style={styles.row}>
      <SoftButton size={52} onPress={onBack} accessibilityLabel={backLabel}>
        <Icon name={icon} size={26} color={TONE.muted} />
      </SoftButton>
      <View style={styles.title}>{title ? <AppText style={styles.titleText}>{title}</AppText> : null}</View>
      <View style={styles.side}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  title: { flex: 1, alignItems: 'center' },
  titleText: { fontSize: 22, fontWeight: '600' },
  side: { width: 52, alignItems: 'flex-end' },
});
