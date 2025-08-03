# OTO Native App

[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~53.0.17-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg)](https://typescriptlang.org/)

A React Native Expo application that serves as the mobile version of the OTO conversation analysis platform. The app focuses on voice recording, AI-powered conversation analysis, and transcription features.

## Features

### Core Functionality
- **Voice Recording**: Direct microphone recording with background support
- **AI Analysis**: Conversation summaries, highlights, insights, and sentiment analysis
- **Transcription**: Timestamped segments with search functionality
- **File Management**: Upload progress tracking and processing status
- **User Profiles**: Personal settings and point system integration
- **Global Trends**: Conversation analytics and microtrend visualization
- **Audio Clips**: Important conversation segment management with playback

### Authentication
- Privy Auth integration with wallet connectivity
- Solana blockchain integration for point systems

## Tech Stack

- **Framework**: React Native 0.79.5 with Expo ~53.0.17
- **Language**: TypeScript with strict mode
- **Navigation**: Expo Router with file-based routing
- **Authentication**: Privy Auth with Solana wallet support
- **Audio**: expo-av for recording and playback
- **Blockchain**: Solana Web3.js, Anchor framework, SPL Token support

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oto-app
```

2. Install dependencies:
```bash
npm install
```

3. Run on Android:
```bash
npm run android
```

## Development

### Available Scripts

- `npm run android` - Run on Android device/emulator
- `npm run lint` - Run ESLint for code quality
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
app/                     # Expo Router (main application)
├── _layout.tsx         # Root layout with Privy provider
├── index.tsx           # Entry point
├── (tabs)/             # Tab navigation group
│   ├── _layout.tsx     # Tab layout
│   ├── index.tsx       # Home tab (recording)
│   ├── history.tsx     # Upload history
│   ├── trends.tsx      # Global trends
│   └── profile.tsx     # User profile
└── conversation/       # Conversation details
    └── [id]/
        └── index.tsx   # Individual conversation view

components/             # Reusable UI components
├── analysis/          # Analysis display components
├── clips/             # Audio clip components
├── history/           # History list components
├── profile/           # Profile management components
├── recording/         # Recording interface components
├── trends/            # Trend visualization components
└── ui/                # Common UI components

hooks/                 # Custom React hooks
services/              # API integration
types/                 # TypeScript type definitions
constants/             # App constants
blockchain/            # Solana blockchain integration
```

## Configuration

The app uses Expo configuration with several key settings:

- **Bundle ID**: `com.yourcompany.otoapp`
- **Scheme**: `otoapp`
- **Permissions**: Audio recording, foreground services
- **Privy Integration**: Configured for Solana wallet support

## API Integration

The app integrates with the OTO backend API for:
- User authentication and profile management
- Audio file upload and processing
- Conversation analysis and transcription
- Trend data and analytics
- Point system management

---

**Voice Yields** - Transforming global conversations into structured data for personalized services and AI training.
