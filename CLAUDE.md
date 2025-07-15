# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OTO Native App is a React Native Expo application that serves as the mobile version of an existing web application (OTO MVP). The app focuses on conversation recording, uploading, AI analysis, and transcription features for a conversation analysis platform.

## Development Commands

### Core Commands
```bash
# Start development server
npm start

# Code quality
npm run lint      # ESLint check

# TypeScript type checking
npm run typecheck # TypeScript type checking without emitting files
```

### Additional Commands
```bash
# Expo CLI commands (if needed)
expo install <package>  # Install expo-compatible packages
```

## Architecture

### Tech Stack (Planned)
- **Framework**: React Native with Expo (~53.0.17)
- **Language**: TypeScript with strict mode
- **Navigation**: Expo Router with tab-based navigation
- **Styling**: Nativewind CSS
- **State Management**: useState + Jotai + AsyncStorage + TanStack Query
- **Authentication**: Privy Auth integration 

### Project Structure
```
not yet implemented
```

### Key Architecture Patterns

1. **Expo Router**: File-based routing with nested layouts
   - `app/_layout.tsx`: Root layout with Stack navigation
   - `app/(tabs)/_layout.tsx`: Tab navigation layout

2. **Path Aliases**: Uses `@/*` alias pointing to root directory (configured in tsconfig.json)

### Backend Integration (Planned)
- **API Base**: https://otomvp-api-78nm.onrender.com
- **Authentication**: Privy access token with Bearer auth
- **Key Endpoints**: 
  - `/conversation/*` - Audio upload and conversation management
  - `/analysis/*` - AI analysis results
  - `/transcript/*` - Transcription data
  - `/user/*` - Profile management
  - `/trend/*` - Global trend data

### Core Features (Implementation Planned)
1. **Audio Recording**: Direct microphone recording with background support
2. **File Upload**: Progress tracking and status management
3. **Analysis Display**: AI insights, highlights, sentiment analysis
4. **Transcription**: Timestamped segments with search functionality
5. **Profile Management**: User settings and point system
6. **Trend Analytics**: Global conversation data visualization
