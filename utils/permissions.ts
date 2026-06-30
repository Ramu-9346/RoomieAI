/**
 * Permission request helpers — camera, location, notifications.
 * All permissions are requested just-in-time (not at launch).
 */

import * as Notifications from 'expo-notifications';
import * as Location      from 'expo-location';
import { Platform }       from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export async function requestPushPermission(): Promise<PermissionStatus> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return 'granted';

  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });

  return status as PermissionStatus;
}

export async function requestLocationPermission(): Promise<PermissionStatus> {
  const { status: existing } = await Location.getForegroundPermissionsAsync();
  if (existing === 'granted') return 'granted';

  const { status } = await Location.requestForegroundPermissionsAsync();
  return status as PermissionStatus;
}

export async function getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
  const status = await requestLocationPermission();
  if (status !== 'granted') return null;

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
  } catch {
    return null;
  }
}

export async function getPushToken(): Promise<string | null> {
  const status = await requestPushPermission();
  if (status !== 'granted') return null;

  try {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch {
    return null;
  }
}
