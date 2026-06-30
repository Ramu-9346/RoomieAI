/**
 * OnboardingScreen — name + dietary preference setup.
 * PLACEHOLDER: UI will be implemented in Phase 4 (Feature Screens).
 */

import { View, StyleSheet }  from 'react-native';
import { Text }              from '@components/primitives/Text';
import { useAppTheme }       from '@hooks/useAppTheme';

export default function OnboardingScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text variant="heading" color={colors.text.primary} align="center">
        Welcome to RoomieAI
      </Text>
      <Text variant="body" color={colors.text.muted} align="center">
        Onboarding screen — Phase 4
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
