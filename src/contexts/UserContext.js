import React, { useState, createContext, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Sentry from 'sentry-expo';

import api from '../api/api';
import UserApi from '../api/userServices/UserApi';
import StorageKeys from '../utils/StorageKeys';
import notifications from '../utils/notifications/notifications';
import i18n from '../utils/localization/I18n';

const UserContext = createContext();

export function UserProvider(props) {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();

  useEffect(() => {
    checkExistingCredentials();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  useEffect(() => {
    if (notification && user && !authLoading) {
      notifications.checkNotification(notification.request.content);
    }
  }, [notification, authLoading]);

  useEffect(() => {
    if (user) {
      // set user infos for sentry
      Sentry.Native.setUser({
        email: user.email || '',
        id: user.id ? user.id.toString() : '',
        username: `${user.firstname || ''} ${user.lastname || ''}`,
      });
    }
  }, [user]);

  async function login(values) {
    const { login, password } = values;
    const res = await UserApi.loginUser(login, password);
    if (res && !res.error) {
      storeUserToken(res);
      await getUserInfos();
    } else {
      Alert.alert(i18n.t('app.error'), i18n.t('app.trylater'), [
        { text: i18n.t('app.ok'), style: 'cancel' },
      ]);
    }
  }

  // function to check if the user is already connected on the device and reconnect automatically
  async function checkExistingCredentials() {
    const userToken = await AsyncStorage.getItem(StorageKeys.userToken);
    if (userToken) {
      api.setAccessToken(userToken);
      const res = await UserApi.refreshAuthToken();
      if (res && !res.error) {
        storeUserToken(res?.token);
        await getUserInfos();
      }
    }
    setAuthLoading(false);
  }

  async function storeUserToken(token) {
    token && AsyncStorage.setItem(StorageKeys.userToken, token);
    token && api.setAccessToken(token);
  }

  async function getUserInfos() {
    const infos = await UserApi.getUserInfos();
    if (infos && !infos.error) {
      console.log('==USER==>', infos);
      setTimeout(() => {
        setUser(infos);
      }, 100);
      setAuthLoading(false);
      notifications.registerNotifications(infos?.id);
    } else {
      setAuthLoading(false);
    }
  }

  function logout() {
    api.setAccessToken(null);
    AsyncStorage.removeItem(StorageKeys.userToken);
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        login,
        authLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
