# WanderLux — Angular Frontend (Complete Workspace)

## Quick Start

```bash
# 1. Install all packages
npm install

# 2. Set your .NET API URL
# Edit src/environments/environment.ts

# 3. Run the app
ng serve

# 4. Open browser
# http://localhost:4200
```

## API URL Configuration

Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7000',   // Your .NET API port
  signalRUrl: 'https://localhost:7000/hubs/chat'
};
```

## Project Structure

```
src/
├── app/
│   ├── app.component.ts          Shell (navbar + router-outlet + footer)
│   ├── app.config.ts             Providers: router, HttpClient, JWT interceptor
│   ├── app.routes.ts             All 22 routes with lazy loading
│   ├── core/
│   │   ├── guards/               auth, role, guest guards
│   │   ├── interceptors/         JWT interceptor (auto Bearer token)
│   │   └── services/             auth, tour, booking, wishlist services
│   ├── shared/
│   │   ├── navbar/               Fixed navbar, scroll effect, role-aware
│   │   ├── footer/               Site footer
│   │   ├── tour-card/            Reusable tour card with wishlist
│   │   └── loader/               Loading spinner
│   ├── features/
│   │   ├── home/                 Homepage: hero, search, tours, why-us
│   │   ├── tours/                Tour listing & detail pages
│   │   ├── booking/              Booking form & success page
│   │   ├── auth/                 Login & register
│   │   ├── traveler/             Traveler dashboard
│   │   ├── agency/               Agency dashboard
│   │   └── admin/                Admin panel
│   └── models/                   TypeScript interfaces
├── environments/                 Dev & production API URLs
├── styles.scss                   Global WanderLux design system
└── index.html                    Root HTML
```

## Design System

- **Theme**: Dark Luxury — Navy + Gold + Cream
- **Fonts**: Cormorant Garamond (headings) + DM Sans (body) + DM Mono (code)
- **Colors**: All defined as CSS custom properties in styles.scss
- **No rounded corners** on buttons/inputs — sharp luxury edges

## Role-Based Routing

| Role     | Dashboard Route         |
|----------|------------------------|
| Traveler | /traveler/dashboard     |
| Agency   | /agency/dashboard       |
| Admin    | /admin/dashboard        |

## Expected .NET API Endpoints

Base: `https://localhost:7000/api`

- POST /auth/login → returns { token, user }
- POST /auth/register → returns { token, user }
- GET  /tours → list with filters
- GET  /tours/featured → homepage tours
- GET  /tours/:id → single tour
- POST /bookings → create booking
- GET  /bookings/my → traveler's bookings
- GET  /bookings/agency → agency's bookings
