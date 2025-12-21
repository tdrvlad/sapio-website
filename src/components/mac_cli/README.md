# Mac-Style CLI Component

A modern, well-architected terminal/CLI interface component with Mac-style window controls, ghost typing effects, and animated message responses.

## 📁 Structure

```
mac_cli/
├── CLI.tsx                 # Main component (entry point)
├── index.ts               # Barrel exports
├── types.ts               # TypeScript types & interfaces
├── constants.ts           # Configuration & constants
├── styles.ts              # All CSS styles (Tailwind + inline)
│
├── components/            # UI Components
│   ├── TitleBar.tsx      # Mac-style window controls
│   ├── MessageItem.tsx   # Individual message renderer
│   ├── GhostTextOverlay.tsx # Ghost typing overlay
│   └── InputArea.tsx     # Command input with ghost text
│
├── hooks/                 # Custom React hooks
│   ├── useClientMount.ts # SSR-safe mounting detection
│   ├── useGhostTyping.ts # Ghost typing animation
│   └── useMessageTyping.ts # Response typing animation
│
└── utils/                 # Helper functions & logic
    ├── ghostTyping.utils.ts   # Ghost typing helpers
    ├── ghostTyping.reducer.ts # State machine reducer
    └── messages.utils.ts      # Message utilities
```

## 🎯 Features

- **Mac-Style UI**: Terminal window with authentic macOS controls
- **Ghost Typing**: Animated suggestion text in input field
- **Response Animation**: HTTP responses type out character-by-character
- **Type-Safe**: Full TypeScript support with strict types
- **Modular**: Clean separation of concerns
- **Performance**: Optimized with React.memo and useCallback
- **Accessible**: ARIA labels and semantic HTML
- **SSR-Safe**: Client-only animations, no hydration errors

## 🚀 Usage

```typescript
import { CLI } from '@/components/mac_cli';
import type { CLIMessage } from '@/components/mac_cli';

function MyComponent() {
  const [messages, setMessages] = useState<CLIMessage[]>([]);

  const handleCommand = (command: string) => {
    // Add command to messages
    setMessages(prev => [...prev, {
      type: "command",
      content: command,
    }]);

    // Add animated response
    setMessages(prev => [...prev, {
      type: "output",
      content: "Response text...",
      animated: true,  // ← Types out character by character
    }]);
  };

  return (
    <CLI
      messages={messages}
      suggestions={["Custom suggestion 1", "Custom suggestion 2"]}
      onCommand={handleCommand}
    />
  );
}
```

## 📝 Message Types

```typescript
type CLIMessage = {
  type: "command" | "output" | "error" | "info" | "banner";
  content: string;
  timestamp?: string;
  animated?: boolean;  // Typing animation
};
```

## 🎨 Customization

All styles are centralized in `styles.ts`:

```typescript
// Edit colors, gradients, shadows
STYLES.cli.inline.container = {
  background: 'your-gradient',
  boxShadow: 'your-shadow',
};

// Edit Tailwind classes
STYLES.cli.classes.container = "your-tailwind-classes";
```

## ⚙️ Configuration

Adjust behavior in `constants.ts`:

```typescript
// Ghost typing speed
GHOST_TYPING_CONFIG.TYPING_DELAY = 70;  // ms per char

// Response typing speed
MESSAGE_TYPING_CONFIG.TYPING_DELAY = 20;  // ms per char
```

## 🏗️ Architecture Decisions

### Why This Structure?

1. **Separation of Concerns**: Each file has a single responsibility
2. **Testability**: Pure functions and isolated hooks are easy to test
3. **Maintainability**: Clear organization makes changes predictable
4. **Performance**: Component memoization prevents unnecessary re-renders
5. **Type Safety**: Centralized types ensure consistency
6. **Reusability**: Components and hooks can be used independently

### Design Patterns

- **Custom Hooks**: Logic extraction for reusability
- **Reducer Pattern**: Complex state machine for ghost typing
- **Memoization**: Performance optimization with memo/useCallback
- **Barrel Exports**: Clean public API
- **Pure Functions**: Predictable, testable utilities

## 🔧 Development

### Adding a New Message Type

1. Update `types.ts`: Add to `CLIMessageType`
2. Update `MessageItem.tsx`: Add rendering logic
3. Update `styles.ts`: Add new styles if needed

### Modifying Animations

- **Ghost typing**: Edit `utils/ghostTyping.utils.ts` and `constants.ts`
- **Response typing**: Edit `hooks/useMessageTyping.ts`

### Styling Changes

All styles are in `styles.ts` - organized by component.

## 📦 Dependencies

- React 18+
- TypeScript 5+
- Tailwind CSS

## 🤝 Contributing

When making changes:
1. Keep types in `types.ts`
2. Keep constants in `constants.ts`
3. Keep styles in `styles.ts`
4. Extract logic to utils/hooks
5. Keep components focused and small
6. Add proper TypeScript types
7. Use memo for expensive components

