// entrypoint.js
// https://docs.privy.io/basics/react-native/installation
// Import required polyfills first
import '@ethersproject/shims';
import { Buffer } from 'buffer';
import 'react-native-get-random-values';

// Then import the expo router
import 'expo-router/entry';
// @ts-ignore
global.Buffer = Buffer;
