# PDF Learning Assistant

A modern, interactive learning application that generates educational content from PDF documents. The application transforms PDF content into various interactive learning formats including flashcards, quizzes, and matching games.

## 📋 Features

- **Multiple Learning Formats**:

  - 🃏 **Flashcards** - Review key concepts and definitions
  - 🧠 **Quizzes** - Test your knowledge with multiple-choice questions
  - 🧩 **Matching Games** - Match questions with their answers
  - 🔜 **Coming Soon**: True/False, Fill-in-the-blank, and more

- **AI-Powered Content Generation**: Automatically extracts and transforms PDF content into learning materials
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **State Management**: Redux-based state management for a consistent user experience
- **Modern UI**: Clean, accessible interface with dark mode support

## 🏗️ Architecture Overview

The application follows a modular architecture with clear separation of concerns. Below is a visual representation of the architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Components                           │
│                                                             │
│   ┌─────────┐    ┌──────────┐    ┌──────────┐              │
│   │ UI Kit  │    │ Features │    │ Layouts  │              │
│   └─────────┘    └──────────┘    └──────────┘              │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                          Hooks                              │
│                                                             │
│   ┌────────────────┐    ┌──────────────┐                   │
│   │ useSystemFuncs │    │ Custom Hooks │                   │
│   └────────────────┘    └──────────────┘                   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Redux Store                          │
│                                                             │
│   ┌─────┐    ┌─────┐    ┌──────────┐    ┌───────┐           │
│   │ App │    │ Quiz│    │Flashcards│    │ Match │           │
│   └─────┘    └─────┘    └──────────┘    └───────┘           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   useActions                        │   │
│   │  (Feature-specific hooks for store interactions)    │   │
│   └─────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Routes                             │
│                                                             │
│   ┌──────────────┐  ┌───────────────┐  ┌─────────────────┐  │
│   │ /generate-   │  │ /generate-    │  │ /generate-      │  │
│   │    quiz      │  │    flashcards │  │    match        │  │
│   └──────────────┘  └───────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Layer

- **UI Kit**: Reusable UI components like buttons, cards, and form elements
- **Features**: Main feature components for each learning format (Flashcards, Quiz, Match)
- **Layouts**: Page layouts and wrappers that provide consistent structure

### Hook Layer

- **useSystemFunctions**: Central hook providing unified access to state and navigation
- **Custom Hooks**: Reusable hooks for common functionality

### State Layer

- **App**: Global application state (files, settings, etc.)
- **Quiz**: Quiz-specific state (questions, answers, progress)
- **Flashcards**: Flashcards state (cards, current card, etc.)
- **Match**: Matching game state (items, matches, game progress)
- **useActions**: Feature-specific hooks for store interactions (located in `/store/*/actions.ts`)

### API Layer

- **Generate Routes**: API endpoints that transform PDF content into structured learning materials

## 📁 Folder Structure

The application is organized into the following directory structure:

```
/
├── app/                          # Next.js App Router
│   ├── (preview)/                # Client-side routes
│   │   ├── (home)/               # Home page
│   │   ├── flashcards/           # Flashcards feature
│   │   ├── quiz/                 # Quiz feature
│   │   └── match/                # Match game feature
│   └── api/                      # API routes
│       ├── generate-quiz/        # Quiz generation
│       ├── generate-flashcards/  # Flashcards generation
│       └── generate-match/       # Match pairs generation
├── components/                   # Reusable components
│   ├── ui/                       # UI components
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card component
│   │   ├── page-wrapper.tsx      # Page wrapper
│   │   └── ...                   # Other UI components
│   ├── flash-cards.tsx           # Flashcards component
│   ├── quiz.tsx                  # Quiz component
│   └── ...                       # Other feature components
├── store/                        # Redux store
│   ├── app/                      # App state
│   ├── quiz/                     # Quiz state
│   ├── flashcards/               # Flashcards state
│   ├── match/                    # Match game state
│   └── index.ts                  # Store configuration
├── hooks/                        # Custom hooks
│   ├── useSystemFunctions.tsx    # Central hook for state access
│   └── useRedux.ts               # Redux hooks
├── lib/                          # Utility functions
│   └── utils.ts                  # Shared utilities
└── public/                       # Static assets
```

## 📊 Data Flow & Communication

The application follows a unidirectional data flow pattern:

1. **User Interactions** in components trigger actions
2. **Actions** (in `/store/*/actions.ts`) handle business logic and API calls
3. **Reducers** (in `/store/*/index.ts`) update the state based on action results
4. **Components** re-render when the state changes via selectors

### Communication Between Modules

```
┌─────────────┐    Triggers     ┌─────────────┐    Updates    ┌─────────────┐
│  Component  │ ──────────────> │   Actions   │ ───────────── │  Reducers   │
└─────────────┘                 └─────────────┘                └─────────────┘
       ▲                              │                              │
       │                              │                              │
       │                              ▼                              │
       │                        ┌─────────────┐                      │
       │                        │ API Routes  │                      │
       │                        └─────────────┘                      │
       │                                                             │
       └─────────────────────────────────────────────────────────────┘
                       Re-renders with updated state
```

### Central State Access Pattern

The application uses a centralized hook (`useSystemFunctions`) to provide unified access to state and actions:

```typescript
const useSystemFunctions = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const pathname = usePathname();

  // States from different slices
  const appState = useAppSelector((state) => state.app);
  const quizState = useAppSelector((state) => state.quiz);
  const flashcardsState = useAppSelector((state) => state.flashcards);
  const matchState = useAppSelector((state) => state.match);

  return {
    // Functions
    dispatch,
    navigate,
    pathname,

    // States
    appState,
    quizState,
    flashcardsState,
    matchState,
  };
};
```

This pattern ensures consistent access to state and common functions throughout the application.

## 🌐 Routes

The application uses Next.js App Router for both client and server-side routes:

### Client Routes

| Route         | Description                            | Component                           |
| ------------- | -------------------------------------- | ----------------------------------- |
| `/`           | Home page with learning format options | `app/(preview)/(home)/page.tsx`     |
| `/flashcards` | Interactive flashcards                 | `app/(preview)/flashcards/page.tsx` |
| `/quiz`       | Multiple-choice quiz                   | `app/(preview)/quiz/page.tsx`       |
| `/match`      | Matching game                          | `app/(preview)/match/page.tsx`      |

### API Routes

| Route                      | Method | Description              | Handler                                |
| -------------------------- | ------ | ------------------------ | -------------------------------------- |
| `/api/generate-quiz`       | POST   | Generates quiz questions | `app/api/generate-quiz/route.ts`       |
| `/api/generate-flashcards` | POST   | Generates flashcards     | `app/api/generate-flashcards/route.ts` |
| `/api/generate-match`      | POST   | Generates matching pairs | `app/api/generate-match/route.ts`      |

## 🧩 Key Components

### Feature Components

The application has dedicated components for each learning format:

- **Flashcards**: Displays interactive cards with concepts and definitions
- **Quiz**: Presents multiple-choice questions with feedback
- **Match Game**: Creates a responsive grid of cards to match questions with answers

### UI Components

The UI is built with reusable components:

- **PageWrapper**: Common layout with variant-based headers
- **Button**: Styled button with multiple variants
- **Card**: Card component for displaying structured content

## 🎮 State Management

Each feature has its own Redux slice with:

1. **State Interface**: Defines the shape of the state
2. **Initial State**: Default values
3. **Reducers**: Functions that update state
4. **Actions**: Functions that trigger state changes
5. **Selectors**: Functions to access specific state

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/MeisterJustice/AI-SDK-PREVIEW-PDF-SUPPORT-EXAMPLE.git

# Navigate to project directory
cd pdf-learning-assistant

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit http://localhost:3000 to see the application in action.

## 🧠 AI Integration

The application leverages AI models to transform PDF content into structured learning materials:

- Uses Google's Gemini 1.5 Pro model for content generation
- Implements Zod schemas for type validation and transformation
- Handles PDF content extraction and processing

## 🛠️ Technologies Used

- **Next.js**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Redux Toolkit**: State management
- **AI SDK**: AI model integration
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Modern icon set
- **Framer Motion**: Animation library
