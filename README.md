# P2P Auction

A peer-to-peer auction platform built with React, TypeScript, and Vite, utilizing Hyperswarm for decentralized networking.

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **P2P Networking**: Hyperswarm, Hyperdrive, Corestore
- **Forms**: Formik + Yup
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Happy DOM

## Getting Started

### Installation

```bash
yarn install
```

### Development

```bash
# Run development server
yarn dev

# Run with Pear runtime
yarn pear:dev .
```

### Testing

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with UI
yarn test:ui
```

### Build

```bash
# Build for production
yarn build

# Build and watch for changes
yarn build:watch
```

## Project Structure

- `/src/components` - React components (auction, forms, shared)
- `/src/store` - Redux store (auction, bid, user slices)
- `/src/helpers` - Utility functions
- `/src/pages` - Page components
- `/src/providers` - Context providers

## Testing

This project uses Vitest for unit testing with Happy DOM as the test environment.

### Writing Tests

Test files should be placed next to the files they test with a `.test.ts` or `.test.tsx` extension.

Example:

```
src/helpers/auctionHelper.ts
src/helpers/auctionHelper.test.ts
```

### Test Coverage

- ✅ Auction helper functions (22 tests)

## Linting

```bash
yarn lint
```

## Additional Configuration

For production applications, consider enabling type-aware ESLint rules by updating `eslint.config.js` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
