# Numatix Trading Platform

A responsive crypto trading interface built with Next.js, TypeScript, Zustand, and Binance Spot Testnet. The app streams real-time prices, renders candlestick charts, places testnet orders, and surfaces positions, trades, and open orders in a desktop-style trading workspace.

## Features

- Real-time ticker updates over Binance WebSocket streams
- Candlestick charting with timeframe switching via `lightweight-charts`
- Market and limit order entry against Binance Spot Testnet
- Portfolio views for positions, trade history, and open orders
- Shared state management with Zustand for symbol and account context
- Settings page for testnet credential management and connection checks
- Responsive layout designed for both large screens and smaller devices

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Binance Spot Testnet REST and WebSocket APIs
- `lightweight-charts`

## Architecture Overview

The UI is split into three main areas:

- Order entry panel for symbol selection and trade submission
- Chart area for historical candles plus live kline updates
- Portfolio tabs for positions, orders, and trades

Key implementation choices:

- Real-time pricing is handled through a custom WebSocket hook in `hooks/useWebSocket.ts`
- Signed Binance requests are generated in `lib/binance.ts` with HMAC-SHA256
- Account, theme, selected symbol, and order refresh timing are coordinated through a Zustand store
- Authenticated REST calls are proxied through Next.js route handlers under `app/api/*`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create local environment variables

Copy `.env.example` to `.env.local` and fill in your Binance Spot Testnet credentials.

Required variables:

- `NEXT_PUBLIC_BINANCE_TESTNET_URL`
- `NEXT_PUBLIC_SERVER_URL`
- `BINANCE_API_KEY`
- `BINANCE_SECRET_KEY`

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Notes

- This project is intended for Binance Spot Testnet, not live trading.
- API keys should remain in `.env.local`, which is ignored by git.
- The settings page stores credentials in browser local storage for testnet convenience only.

## Screenshots

- Live site in Dark mode
<img width="1900" height="1460" alt="localhost_3000_ (4)" src="https://github.com/user-attachments/assets/53f92d8d-7792-4f46-b260-d02ddb5ff754" />


- Live site in Light mode
<img width="1900" height="1460" alt="localhost_3000_ (3)" src="https://github.com/user-attachments/assets/01d91234-9400-4dc4-86f2-02655790f1d5" />

## Future Improvements

- Add a richer README demo section with screenshots or a short walkthrough video
- Improve loading and empty states across data-heavy components
- Add automated tests for signing, order payload handling, and data transforms
- Support URL-based symbol routing and deeper trade analytics
