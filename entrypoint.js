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

import notifee from '@notifee/react-native';

notifee.registerForegroundService(() => {
  return new Promise(() => {
    console.log('Foreground service started');
  });
});

import 'expo-router/entry';
