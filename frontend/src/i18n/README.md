# Internationalization (i18n) Setup

This project uses `react-i18next` for internationalization support. The setup includes multiple languages and provides a comprehensive translation system.

## Supported Languages

- **English (en)** - Default language
- **Spanish (es)** - Español
- **French (fr)** - Français
- **German (de)** - Deutsch
- **Arabic (ar)** - العربية (RTL support)

## File Structure

```
src/
├── i18n/
│   ├── index.ts              # i18n configuration
│   ├── locales/
│   │   ├── en.json          # English translations
│   │   ├── es.json          # Spanish translations
│   │   ├── fr.json          # French translations
│   │   ├── de.json          # German translations
│   │   └── ar.json          # Arabic translations
│   └── README.md            # This file
├── hooks/
│   └── useTranslation.ts    # Custom translation hook
└── components/
    └── common/
        └── LanguageSwitcher.tsx  # Language switcher component
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.loading')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
};
```

### Using Helper Functions

The custom hook provides helper functions for different translation namespaces:

```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const { tc, tn, tk, tf, tp, ts, tm, tv } = useTranslation();
  
  return (
    <div>
      {/* Common translations */}
      <button>{tc('save')}</button>
      
      {/* Navigation translations */}
      <nav>{tn('dashboard')}</nav>
      
      {/* Kanban translations */}
      <h2>{tk('board')}</h2>
      
      {/* Filter translations */}
      <label>{tf('search')}</label>
      
      {/* Priority translations */}
      <span>{tp('high')}</span>
      
      {/* Status translations */}
      <span>{ts('open')}</span>
      
      {/* Message translations */}
      <div>{tm('ticketCreated')}</div>
      
      {/* Validation translations */}
      <span>{tv('required')}</span>
    </div>
  );
};
```

### Language Switcher

Add the language switcher component to your app:

```tsx
import LanguageSwitcher from '../common/LanguageSwitcher';

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
      <LanguageSwitcher variant="compact" size="small" />
    </header>
  );
};
```

### RTL Support

The setup includes RTL (Right-to-Left) support for Arabic:

```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const { isRTL } = useTranslation();
  
  return (
    <div style={{ direction: isRTL() ? 'rtl' : 'ltr' }}>
      Content that adapts to text direction
    </div>
  );
};
```

### Formatting

The hook provides formatting utilities:

```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const { formatDate, formatNumber, formatCurrency } = useTranslation();
  
  const date = new Date();
  const number = 1234567.89;
  const amount = 1234.56;
  
  return (
    <div>
      <p>Date: {formatDate(date)}</p>
      <p>Number: {formatNumber(number)}</p>
      <p>Price: {formatCurrency(amount, 'USD')}</p>
    </div>
  );
};
```

### Interpolation

Use interpolation for dynamic values:

```tsx
const { tv } = useTranslation();

// Translation: "Minimum length is {{min}} characters"
const errorMessage = tv('minLength', { min: 5 });
```

## Translation Structure

The translations are organized into namespaces:

- **common**: General UI elements (save, cancel, delete, etc.)
- **navigation**: Navigation items (dashboard, tickets, etc.)
- **kanban**: Kanban-specific terms (board, ticket, etc.)
- **filters**: Filter-related terms (search, priority, etc.)
- **priority**: Priority levels (low, medium, high, urgent)
- **status**: Status types (open, in progress, resolved, closed)
- **messages**: User feedback messages
- **validation**: Form validation messages

## Adding New Translations

1. Add the new key to all language files in `src/i18n/locales/`
2. Use the translation in your component with the appropriate helper function
3. Test with different languages to ensure proper display

## Language Detection

The system automatically detects the user's language preference from:
1. localStorage (if previously set)
2. Browser language settings
3. Falls back to English if no match found

## Best Practices

1. **Use semantic keys**: `common.save` instead of `saveButton`
2. **Group related translations**: Keep similar functionality together
3. **Test RTL languages**: Ensure UI works properly with Arabic
4. **Use interpolation**: For dynamic content instead of string concatenation
5. **Provide context**: Use descriptive keys that explain the context

## Demo

Check out the i18n demo component at `src/components/demo/I18nDemo.tsx` to see all features in action.