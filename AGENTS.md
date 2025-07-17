# AGENTS.md

This file provides agent-specific guidance and workflows for AI assistants working with this repository.

## Agent Resources

### Primary Documentation
- **CLAUDE.md**: Core project guidance and development commands
- **oto-spec.md**: Comprehensive technical specification for audio recording/playback implementation

### Project Context

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
- **Styling**: React Native StyleSheet
- **State Management**: useState + Jotai + AsyncStorage + TanStack Query
- **Authentication**: Privy Auth integration 

### Project Structure
This project uses standard Expo Router structure with top-level directories:

```
app/                      # Expo Router (project root)
├── _layout.tsx          # Root layout
├── index.tsx            # Main entry point
├── (tabs)/              # Tab navigation group (planned)
│   ├── _layout.tsx      # Tab layout
│   ├── index.tsx        # Home tab
│   ├── history.tsx      # History tab
│   ├── trends.tsx       # Trends tab
│   └── profile.tsx      # Profile tab
└── +not-found.tsx       # 404 page

components/              # Reusable UI components
├── LoginScreen.tsx
└── UserScreen.tsx

hooks/                   # Custom React hooks (planned)
services/               # API services (planned)
utils/                  # Utility functions (planned)
types/                  # TypeScript type definitions (planned)
constants/              # Constants and configurations (planned)
```

### Key Architecture Patterns

1. **Expo Router**: File-based routing with nested layouts
   - `app/_layout.tsx`: Root layout with Stack navigation
   - `app/(tabs)/_layout.tsx`: Tab navigation layout with 4 tabs
   - Tab structure: Home, History, Trends, Profile

2. **Path Aliases**: Uses `@/*` alias pointing to project root directory (configured in tsconfig.json)
   - All imports use `@/` prefix to reference files from project root
   - Example: `@/components/ComponentName`, `@/hooks/useHook`

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

## Agent Workflows

### Audio Feature Implementation
When implementing audio recording/playback features:
1. Consult `oto-spec.md` for complete API specifications and data models
2. Reference signed URL handling patterns for audio file access
3. Follow status polling patterns for async conversation processing
4. Implement error handling as documented in the specification

### Code Implementation Guidelines
- Always reference `oto-spec.md` for backend API integration patterns
- Use TypeScript type definitions provided in the specification
- Follow UI patterns outlined for conversation lists and audio playback
- Implement proper authentication headers as specified
