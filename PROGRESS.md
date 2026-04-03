# Trading Platform UI — Progress Tracker

> Mentor: Claude | Student: You
> Stack: Next.js + TypeScript + lightweight-charts + Tailwind + Binance Testnet

---

## High-Level Phases

```
Phase 0 → Environment & Foundations     ✅ DONE
Phase 1 → Project Scaffold              ✅ DONE
Phase 2 → TypeScript Types              ✅ DONE
Phase 3 → Binance API Utilities         ✅ DONE
Phase 4 → WebSocket Hook                ✅ DONE
Phase 5 → Candlestick Chart             🔄 IN PROGRESS
Phase 6 → Order Entry Panel             ⬜ NOT STARTED
Phase 7 → Positions / Orders / Trades   ⬜ NOT STARTED
Phase 8 → Symbol Switching              ⬜ NOT STARTED
Phase 9 → Settings Page (API Keys)      ⬜ NOT STARTED
Phase 10 → Polish + README + Demo       ⬜ NOT STARTED
```

---

## Detailed Breakdown

---

### ✅ Phase 0 — Environment & Foundations

**Goal:** Understand the tools before writing any code.

- [x] Created Binance Testnet account
- [x] Generated API keys
- [x] Tested WebSocket in browser console (`about:blank`)
- [x] Tested REST klines endpoint in browser
- [x] Understood trade event data shape
- [x] Understood kline array data shape

**Key insight locked in:**

- Binance timestamps are in **milliseconds**
- lightweight-charts expects **seconds** → divide by 1000

---

### ✅ Phase 1 — Project Scaffold

**Goal:** Clean Next.js project ready to build on.

- [x] `create-next-app` with TypeScript + Tailwind + App Router
- [x] Installed `lightweight-charts`
- [x] Created folder structure (`components/`, `hooks/`, `lib/`, `types/`)
- [x] Created `.env.local` with testnet API keys
- [x] Created `.env.example` (no real keys)
- [x] Verified `.gitignore` excludes `.env.local`
- [x] Cleaned boilerplate (`page.tsx`, `globals.css`)
- [x] App runs on `localhost:3000`

---

### 🔄 Phase 2 — TypeScript Types (`types/index.ts`)

**Goal:** Define the shape of every piece of data the app touches.

- [x] `TradeEvent` — WebSocket trade stream shape
- [x] `SingleKlineBar` — raw kline tuple from REST API
- [x] `KlineData` — array of raw klines
- [x] `CandleStickData` — shape for lightweight-charts (UTCTimestamp in seconds)
- [x] `ApiConfig` — API key + secret storage shape
- [x] `OrderFormState` — side (BUY/SELL), type, quantity, price
- [x] `OrderSide` — union type `'BUY' | 'SELL'`
- [x] `OrderType` — union type `'MARKET' | 'LIMIT' | 'STOP_MARKET'`
- [x] `Timeframe` — union type `'1m' | '5m' | '1h' | '1d' | '1w'`
- [x] `ActiveTab` — union type `'positions' | 'orders' | 'trades'`
- [x] `Balance` — asset + free + locked
- [x] `Order` — open order shape from REST API
- [x] `Trade` — trade history shape from REST API

**Concepts to know before finishing:**

- TypeScript union types / string literal types
- Optional properties (`?`)
- `export` keyword on interfaces

---

### ⬜ Phase 3 — Binance API Utilities (`lib/binance.ts`)

**Goal:** All functions that talk to Binance REST API live here.

- [x] `getKlines(symbol, interval, limit)` — fetch historical candles
- [x] `getAccountInfo()` — fetch balances
- [x] `getOpenOrders(symbol?)` — fetch open orders
- [x] `getTradeHistory(symbol)` — fetch past trades
- [x] `placeOrder(params)` — submit a new order
- [x] HMAC-SHA256 request signing (for authenticated endpoints)
- [x] Timestamp + signature appended to requests

**Concepts to research before starting:**

- `fetch` API in TypeScript
- HMAC-SHA256 signing: search _"HMAC SHA256 browser Web Crypto API"_
- Binance signature docs: https://binance-docs.github.io/apidocs/spot/en/#signed-trade-user_data-and-margin-endpoint-security
- `crypto.subtle.sign()` — browser-native, no Node.js needed

---

### ⬜ Phase 4 — WebSocket Hook (`hooks/useWebSocket.ts`)

**Goal:** A reusable hook that manages a Binance WebSocket connection.

- [x] Opens connection to `wss://testnet.binance.vision/ws/{symbol}@trade`
- [x] Returns live `price` and `connectionStatus`
- [x] Cleans up (`ws.close()`) on unmount
- [x] Re-subscribes when `symbol` changes
- [x] Reconnection logic on disconnect

**Concepts to research before starting:**

- `useEffect` cleanup functions
- `useRef` vs `useState` for WebSocket instance
- `useCallback` for stable function references
- Search: _"custom React hook WebSocket TypeScript cleanup"_

---

### ⬜ Phase 5 — Candlestick Chart (`components/Chart/`)

**Goal:** A working chart that shows historical candles and updates live.

- [x] `useRef` to attach chart to DOM element
- [x] Fetch historical klines on mount via `getKlines()`
- [x] Convert `SingleKlineBar[]` → `CandleStickData[]` (÷1000 for time)
- [x] Render candlestick series with lightweight-charts
- [x] Subscribe to `{symbol}@kline_1m` WebSocket stream
- [x] Update chart with `.update()` on new kline (no re-render)
- [ ] Timeframe selector (1m, 5m, 1h, 1d, 1w) updates chart data
- [ ] Chart is responsive

**Concepts to research before starting:**

- lightweight-charts docs: https://tradingview.github.io/lightweight-charts/docs
- `useRef` for imperative DOM access
- `useMemo` to avoid recreating chart on every render
- Search: _"lightweight-charts React useRef candlestick"_

**Key rule:** Chart must update via `.update()`, never via React re-render.

---

### ⬜ Phase 6 — Order Entry Panel (`components/OrderPanel/`)

**Goal:** Left panel — symbol selector, buy/sell form, place order.

- [ ] Symbol selector dropdown (BTCUSDT, ETHUSDT, SOLUSDT, etc.)
- [ ] Buy / Sell tab toggle
- [ ] Order type selector (Market, Limit, Stop Market)
- [ ] Quantity input
- [ ] Price input (hidden for Market orders)
- [ ] Total auto-calculation (quantity × price)
- [ ] Available balance display (from `getAccountInfo()`)
- [ ] Place Order button → calls `placeOrder()` → shows confirmation
- [ ] Loading state on button while order is processing
- [ ] Error handling if order fails

---

### ⬜ Phase 7 — Positions / Orders / Trades (`components/PositionsTable/`)

**Goal:** Bottom right table with three tabs.

- [ ] Tab switcher: Positions / Orders / Trades
- [ ] Positions tab — fetch from API, show symbol, size, entry price, PnL
- [ ] Orders tab — fetch open orders, show status
- [ ] Trades tab — fetch trade history
- [ ] Real-time price updates in Positions via WebSocket
- [ ] Color coded PnL (green positive, red negative)

---

### ⬜ Phase 8 — Symbol Switching (wires everything together)

**Goal:** When symbol changes in selector, everything updates automatically.

This is the most architecturally complex piece. It requires:

- [ ] Symbol stored in shared state (lifted up to parent or Zustand store)
- [ ] Chart unsubscribes from old WebSocket, subscribes to new
- [ ] Chart fetches new historical data
- [ ] Order panel reflects new symbol
- [ ] Positions table filters or refreshes
- [ ] URL updates to `/trade/BTCUSDT` (bonus)

**This is what the interviewers will probe hardest on.**

---

### ⬜ Phase 9 — Settings Page (`app/settings/`)

**Goal:** Where users configure their API keys.

- [ ] Page at `/settings`
- [ ] Show current API key status (masked: `****...XXXX`)
- [ ] Form to update API key + secret
- [ ] "Test Connection" button → calls `getAccountInfo()` to verify
- [ ] Store keys in `localStorage`
- [ ] README explains why localStorage is acceptable for testnet

---

### ⬜ Phase 10 — Polish + README + Demo

**Goal:** Submission-ready project.

- [ ] README with architecture overview
- [ ] Setup instructions
- [ ] `.env.example` documented
- [ ] Any LLM-generated sections marked
- [ ] 2-minute demo video
- [ ] Clean commit history
- [ ] Error boundaries on key components
- [ ] Responsive layout (mobile / tablet)
- [ ] Loading skeletons on data-heavy components

---

## Architecture Decisions Log

> Fill this in as you make choices. You'll need to explain these in interviews.

| Decision             | Choice                 | Why                                |
| -------------------- | ---------------------- | ---------------------------------- |
| State management     | TBD                    |                                    |
| API key storage      | localStorage           | Testnet only, acceptable trade-off |
| WebSocket management | Custom hook            | Encapsulates lifecycle, reusable   |
| Chart updates        | Imperative `.update()` | Avoids re-renders on every tick    |

---

## Interview Prep Checklist

Before you consider this project done, make sure you can answer these out loud:

- [ ] How do you prevent memory leaks from WebSocket connections?
- [ ] Why does the chart not re-render on every price tick?
- [ ] How does symbol switching work end-to-end?
- [ ] Why is `useRef` used for the chart instead of `useState`?
- [ ] How would you handle 50+ symbols simultaneously?
- [ ] What happens when the WebSocket disconnects?
- [ ] Why is HMAC signing done in the browser here, and when would you move it to a backend?

---

## Current Status

**Last updated:** Phase 2 in progress
**Blocking issue:** Complete remaining types (`ApiConfig`, `OrderFormState`, union types)
**Next action:** Finish `types/index.ts`, then move to `lib/binance.ts`
