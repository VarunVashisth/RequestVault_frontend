# RequestVault Frontend - Project Overview

## 📌 Project Structure

```
requestvault-frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx        # Route protection wrapper
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx            # Authenticated layout with sidebar
│   │   │   └── PublicLayout.tsx          # Public pages layout
│   │   └── ui/
│   │       ├── MetricCard.tsx            # Metric display component
│   │       ├── StatusBadge.tsx           # HTTP status badge
│   │       ├── MethodBadge.tsx           # HTTP method badge
│   │       ├── LoadingSpinner.tsx        # Loading indicator
│   │       └── EmptyState.tsx            # Empty state fallback
│   ├── pages/
│   │   ├── LandingPage.tsx               # Marketing homepage
│   │   ├── LoginPage.tsx                 # User login
│   │   ├── RegisterPage.tsx              # User registration
│   │   ├── DashboardPage.tsx             # Main dashboard
│   │   ├── RequestsPage.tsx              # Requests list
│   │   ├── RequestDetailPage.tsx         # Single request detail
│   │   ├── ApiKeysPage.tsx               # API key management
│   │   ├── DocumentationPage.tsx         # API documentation
│   │   └── SettingsPage.tsx              # User settings
│   ├── services/
│   │   ├── api.ts                        # Axios configuration
│   │   ├── authService.ts                # Auth API calls
│   │   ├── requestsService.ts            # Requests API calls
│   │   └── apiKeysService.ts             # API keys API calls
│   ├── store/
│   │   ├── authStore.ts                  # Auth state (Zustand)
│   │   └── dashboardStore.ts             # Dashboard state + mock data
│   ├── App.tsx                           # Main app with routing
│   ├── main.tsx                          # Entry point
│   └── index.css                         # Global styles
├── index.html                            # HTML template
├── vite.config.ts                        # Vite configuration
├── tailwind.config.ts                    # Tailwind CSS config
├── tsconfig.json                         # TypeScript config
├── package.json                          # Dependencies
├── README.md                             # User documentation
├── SETUP.md                              # Setup instructions
└── .env.example                          # Environment template
```

## 🏗️ Architecture

### Component Hierarchy

```
App (Routes)
├── Landing Page (Public)
├── Login (Public)
├── Register (Public)
├── Docs (Public)
└── Protected Routes
    └── Main Layout
        ├── Dashboard
        ├── Requests
        ├── Request Detail
        ├── API Keys
        └── Settings
```

### State Management

**Zustand Stores:**
- `authStore` - User authentication state
- `dashboardStore` - Dashboard metrics and recent requests

No Redux or Context API needed - Zustand is lightweight and perfect for this app size.

### Data Flow

```
UI Component
    ↓
Service Call (Axios)
    ↓
API / Mock Data
    ↓
Store Update (Zustand)
    ↓
UI Re-render
```

## 🎨 Design System

### Colors (Dark Theme)
- **Background**: `#0f1117` (vault-bg)
- **Surface**: `#161b22` (vault-surface)
- **Border**: `#30363d` (vault-border)
- **Text**: `#c9d1d9` (vault-text)
- **Text Secondary**: `#8b949e` (vault-text-secondary)
- **Accent**: `#58a6ff` (vault-accent)
- **Success**: `#3fb950` (vault-success)
- **Danger**: `#f85149` (vault-danger)
- **Warning**: `#d29922` (vault-warning)

### Typography
- **Display Font**: Inter (sans-serif)
- **Monospace Font**: IBM Plex Mono

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile nav with hamburger menu
- Sidebar collapses on mobile

## 🔄 Routing

```
/                    → LandingPage
/login              → LoginPage
/register           → RegisterPage
/docs               → DocumentationPage
/dashboard          → DashboardPage (protected)
/requests           → RequestsPage (protected)
/requests/:id       → RequestDetailPage (protected)
/api-keys           → ApiKeysPage (protected)
/settings           → SettingsPage (protected)
*                   → 404 redirect to /
```

## 🔐 Authentication Flow

1. User visits `/login` or `/register`
2. Submits credentials
3. `authStore.login()` or `authStore.register()` called
4. Token saved to localStorage
5. User object stored in Zustand
6. Redirect to `/dashboard`
7. `ProtectedRoute` checks for user before rendering

Token refresh:
- Axios interceptor catches 401 responses
- Logs out user and redirects to `/login`

## 📊 Mock Data Generator

`dashboardStore.ts` includes `generateMockMetrics()` function:
- Generates realistic request data
- Creates trend data for charts
- Status code distribution
- Top endpoints list
- Recent requests

Can be replaced with real API calls by changing service imports.

## 🔌 API Integration Points

All API calls go through service layer:

```
Component
  ↓
Service (authService, requestsService, etc.)
  ↓
Axios Instance (api.ts)
  ↓
Backend API
```

Benefits:
- Centralized configuration
- Easier to mock for testing
- Consistent error handling
- Single place for interceptors

## 🎯 Key Features Implementation

### Dashboard
- **Charts**: Recharts library with mock data
- **Metrics**: Four key metrics with trend indicators
- **Recent Requests**: Table with inline navigation
- **Top Endpoints**: Horizontal bar chart

### Requests List
- **Search**: Filter by endpoint or IP
- **Filter**: By HTTP method and status code
- **Pagination**: 20 items per page
- **Sorting**: Click to navigate to detail

### API Keys Management
- **Create**: Generate new API keys
- **Show/Hide**: Toggle key visibility
- **Copy**: One-click clipboard copy
- **Delete**: Confirm before deleting
- **Metadata**: Created date, last used

### Settings
- **Account**: Email and name management
- **Notifications**: Email, Slack, Webhook toggle
- **Privacy**: Profile visibility and analytics sharing
- **Security**: Password change and account deletion

## 🚀 Performance Optimizations

1. **Code Splitting**
   - Routes lazy loaded (can be improved with React.lazy)
   - Components only imported when needed

2. **Build Optimization**
   - Minified CSS and JS
   - Tree-shaking of unused code
   - Asset optimization

3. **Runtime Performance**
   - Lightweight Zustand for state
   - Efficient re-renders with React hooks
   - Debounced search (can be added)

4. **Network**
   - API request caching possible
   - Compression enabled
   - Minimal bundle size

## 📝 Customization Guide

### Adding a New Page

1. Create component in `src/pages/NewPage.tsx`
2. Add route to `App.tsx`
3. Add navigation in `MainLayout.tsx` (if needed)

### Adding a New API Service

1. Create `src/services/newService.ts`
2. Export functions for API calls
3. Import in components and use with stores

### Styling Custom Component

1. Use Tailwind utility classes
2. Reference colors from `tailwind.config.ts`
3. Use component layer classes like `.btn-primary`

### Adding Charts/Visualizations

Current chart libraries:
- **Recharts** - Line, Bar, Pie charts
- **Lucide React** - Icons

To add more:
```bash
npm install chartjs plotly.js framer-motion
```

## 🧪 Testing Strategy

### Manual Testing
- Test all routes and navigation
- Verify form validation
- Check responsive design on mobile
- Test data filtering and pagination

### Future Automated Testing
```bash
npm install --save-dev vitest @testing-library/react
```

## 🔒 Security Considerations

1. **API Keys**
   - Never logged to console in production
   - Stored in localStorage (can be improved with httpOnly cookies)
   - Should use HTTPS in production

2. **Token Management**
   - Tokens in Authorization header
   - 401 handling triggers re-login
   - No sensitive data in JWT payload (if using)

3. **CORS**
   - Backend must allow frontend origin
   - Use relative URLs or configure whitelist

4. **Data Validation**
   - Form validation on client (basic)
   - Backend should validate all inputs
   - Sanitize any user-generated content

## 📦 Dependency Overview

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | Core UI framework |
| react-router-dom | 6.20.0 | Client-side routing |
| axios | 1.6.2 | HTTP client |
| tailwindcss | 3.3.6 | CSS framework |
| zustand | 4.4.1 | State management |
| recharts | 2.10.3 | Charts library |
| lucide-react | 0.292.0 | Icons |
| framer-motion | 10.16.16 | Animations |
| date-fns | 2.30.0 | Date formatting |
| vite | 5.0.8 | Build tool |
| typescript | 5.2.2 | Type safety |

## 🚨 Common Issues & Solutions

### Hot Module Replacement (HMR) Not Working
```bash
# Check if .env.local has correct values
# Restart dev server
npm run dev
```

### Styles Not Updating
```bash
# Rebuild Tailwind CSS
rm -rf node_modules/.vite
npm run dev
```

### API Calls Failing
- Check VITE_API_URL in .env.local
- Verify backend is running
- Check browser console for errors
- Review CORS configuration

## 📈 Scalability

To scale this project:

1. **Large Dataset Handling**
   - Implement virtual scrolling for long lists
   - Add pagination/infinite scroll
   - Use React Query for caching

2. **More Complexity**
   - Split stores by feature
   - Add middleware/logging
   - Implement error boundaries

3. **Team Development**
   - Add pre-commit hooks (husky)
   - Set up CI/CD pipeline
   - Add more comprehensive tests
   - Create style guide

## 🎓 Learning Resources

For developers new to the stack:

- [React Hooks Guide](https://react.dev/reference/react)
- [Tailwind Utilities](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev/guide/)

---

This is a production-ready, well-structured frontend application. Happy coding! 🚀
