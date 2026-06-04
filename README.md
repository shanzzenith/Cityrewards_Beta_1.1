# City Rewards — Customer App (Beta)

A loyalty rewards PWA/mobile app built with **Expo (React Native)**, **Expo Router**, and **NativeWind (TailwindCSS)**.

## ⚡ Quick Start

### 1. Install Node.js (if not already installed)
Download from https://nodejs.org → choose **LTS version** (includes npm automatically).

After installing, open a **new terminal** and verify:
```bash
node --version   # should print v18+ or v20+
npm --version    # should print 9+
```

### 2. Install dependencies

Open PowerShell / Terminal, navigate to this folder, and run:
```bash
cd "C:\Users\shanz\Desktop\City Rewards\Beta version\city-rewards"
npm install
```

### 3. Start the app

```bash
npx expo start
```

This opens the **Expo DevTools** in your browser. From there:
- Press **`w`** → opens the app in your web browser (PWA mode)
- Press **`a`** → opens in Android emulator (if installed)
- Press **`i`** → opens in iOS simulator (Mac only)
- Scan the **QR code** with the Expo Go app on your phone

### 4. Running on your phone (fastest method)
1. Install **Expo Go** from the App Store / Google Play
2. Make sure your phone and computer are on the **same WiFi**
3. Run `npx expo start` and scan the QR code

---

## 📱 Screens Built

| Screen | Route | Description |
|--------|-------|-------------|
| Sign Up | `/(auth)/sign-up` | Registration with Name/Email/Password + social login |
| Enable Notifications | `/(auth)/notifications` | PWA push notification onboarding (3-step) |
| Log In | `/(auth)/login` | Email/password login |
| **Earn (Home)** | `/(tabs)/earn` | Points ring, eco-stats, nearby cafes, map, spend preview |
| **Scan** | `/(tabs)/scan` | QR code scanner with animated scan line + success modal |
| **Spend** | `/(tabs)/spend` | Rewards catalog with category filter + redeem modal |
| Activity | `/activity` | Full transaction history with running balance |
| Store Detail | `/store/[id]` | Individual cafe info + how to earn |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#1A5F4F` | Buttons, active tabs, points |
| `cream` | `#F5F4EF` | App background |
| `primary-pale` | `#E8F3F0` | Icon backgrounds, stat badges |
| `text-dark` | `#1A1A1A` | Headlines |
| `text-soft` | `#888880` | Labels, secondary text |

---

## 🗂 Project Structure

```
city-rewards/
├── app/
│   ├── _layout.tsx           # Root layout (SafeAreaProvider, StatusBar)
│   ├── index.tsx             # Entry redirect → /(auth)/sign-up
│   ├── (auth)/
│   │   ├── sign-up.tsx       # Registration screen
│   │   ├── login.tsx         # Login screen
│   │   └── notifications.tsx # Enable notifications (PWA onboarding)
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Bottom tab navigator (Earn/Scan/Spend)
│   │   ├── earn.tsx          # Home screen
│   │   ├── scan.tsx          # QR scanner
│   │   └── spend.tsx         # Rewards catalog
│   ├── activity.tsx          # Transaction history
│   └── store/[id].tsx        # Store detail page
├── components/
│   └── LeafLogo.tsx          # SVG leaf logo component
├── constants/
│   └── mockData.ts           # Mock user, stores, rewards, transactions
├── global.css                # Tailwind directives
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
└── app.json
```

---

## 🚀 Next Steps (Phase 2 — Supabase Backend)

1. Set up Supabase project + PostgreSQL schema (users, wallets, points_ledger, stores)
2. Replace `mockData.ts` with Supabase client calls
3. Implement phone OTP auth via Supabase Auth
4. Wire up real QR scan → points award via Supabase Edge Functions
5. Add push notifications (Web Push API / Expo Notifications)

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` ~51 | Core Expo SDK |
| `expo-router` ~3.5 | File-based navigation |
| `nativewind` ^4 | TailwindCSS for React Native |
| `expo-camera` | QR code scanning |
| `react-native-svg` | Leaf logo + points ring |
| `@expo/vector-icons` | Ionicons icon set |
