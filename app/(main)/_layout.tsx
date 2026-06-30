import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"            />
      <Stack.Screen
        name="order-detail"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="restaurant-detail"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="poll-detail"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="member-profile"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="payment-detail"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="invite-member"
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack>
  );
}
