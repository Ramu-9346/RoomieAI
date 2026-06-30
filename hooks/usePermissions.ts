/**
 * usePermissions — request and track permission status.
 */

import { useState, useCallback } from 'react';
import {
  requestPushPermission,
  requestLocationPermission,
  getCurrentLocation,
  type PermissionStatus,
} from '@utils/permissions';
import { useNotificationStore } from '@store/notificationStore';
import { getPushToken }         from '@utils/permissions';

export function usePermissions() {
  const [locationStatus, setLocationStatus] = useState<PermissionStatus>('undetermined');
  const [pushStatus,     setPushStatus]     = useState<PermissionStatus>('undetermined');
  const { setPushToken } = useNotificationStore();

  const requestLocation = useCallback(async () => {
    const status = await requestLocationPermission();
    setLocationStatus(status);
    return status;
  }, []);

  const requestPush = useCallback(async () => {
    const status = await requestPushPermission();
    setPushStatus(status);
    if (status === 'granted') {
      const token = await getPushToken();
      if (token) setPushToken(token);
    }
    return status;
  }, [setPushToken]);

  const getLocation = useCallback(async () => {
    return getCurrentLocation();
  }, []);

  return {
    locationStatus,
    pushStatus,
    requestLocation,
    requestPush,
    getLocation,
  };
}
