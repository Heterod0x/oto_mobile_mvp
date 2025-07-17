/* eslint-disable */
// https://docs.privy.io/basics/react-native/installation

import * as Crypto from 'expo-crypto';
console.log('🔑 Expo Crypto:', Crypto.getRandomValues, Crypto.randomUUID);

// privyのdocumentation通りだとerrorになるのでいろいろ追加😭
// attach to global
if (typeof global.crypto !== 'object') global.crypto = {};
global.crypto.getRandomValues = Crypto.getRandomValues;
global.crypto.randomUUID     = Crypto.randomUUID;

import '@ethersproject/shims';
import { Buffer } from 'buffer';
import 'fast-text-encoding';
global.Buffer = Buffer;

import notifee, { AndroidColor } from '@notifee/react-native';

export const RECORDING_CHANNEL_ID = 'recording';

notifee.registerForegroundService(() => new Promise(() => {}));

export async function startRecordingServiceNotification() {
  await notifee.createChannel({ id: RECORDING_CHANNEL_ID, name: 'Recording', importance: 4 });
  await notifee.displayNotification({
    title: '録音中…',
    body: 'タップで停止',
    android: {
      channelId: RECORDING_CHANNEL_ID,
      asForegroundService: true,
      color: AndroidColor.RED,
      colorized: true,
      ongoing: true,
      pressAction: { id: 'default' },
      actions: [{ title: '停止', pressAction: { id: 'stop-recording' } }],
      showChronometer: true,
    },
  });
}

import 'expo-router/entry';
