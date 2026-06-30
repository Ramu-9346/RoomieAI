/**
 * FlatScreen — flat members + preferences.
 * PLACEHOLDER: Full implementation in Phase 4.
 *
 * Will render:
 *   - TopAppBar with flat name + invite button
 *   - Members list (MemberCard)
 *   - Flat settings section
 *   - Swiggy token status (token expiry warning)
 */

import { View, StyleSheet } from 'react-native';
import { Text }             from '@components/primitives/Text';
import { useAppTheme }      from '@hooks/useAppTheme';

export default function FlatScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text variant="title" color={colors.text.primary} align="center">
        Flat
      </Text>
      <Text variant="captionItalic" color={colors.text.muted} align="center">
        Members & preferences — Phase 4
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
});
