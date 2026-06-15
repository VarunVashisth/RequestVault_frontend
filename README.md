# RequestVault Frontend

A production-ready API monitoring and observability dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 Real-time API request monitoring
- 📊 Detailed analytics and metrics
- 🔑 API key management
- 📈 Request trend visualization
- 🔐 Secure authentication
- 📱 Fully responsive design
- 🎨 Dark theme with professional UI
- ⚡ Fast performance with modern tooling

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Animations**: Framer Motion

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Create environment file**:
```bash
cp .env.example .env.local
```

3. **Start development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   └── ui/             # UI components
├── pages/              # Page components
├── services/           # API services
├── store/              # Zustand stores
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Pages

- **Landing Page** (`/`) - Marketing page
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Account creation
- **Dashboard** (`/dashboard`) - Main analytics dashboard
- **Requests** (`/requests`) - Request list with filters
- **Request Detail** (`/requests/:id`) - Single request details
- **API Keys** (`/api-keys`) - API key management
- **Documentation** (`/docs`) - API documentation
- **Settings** (`/settings`) - User settings

## Configuration

### Environment Variables

```bash
VITE_API_URL=http://localhost:8000/api
```

### Tailwind CSS

Custom Tailwind configuration in `tailwind.config.ts`:

- Custom dark theme colors (vault-*)
- Custom animations
- Extended spacing and typography

## API Integration

The application uses Axios for API calls with built-in:

- Request/response interceptors
- Auto token injection
- 401 error handling
- Mock data for development

API services located in `src/services/`:

- `authService.ts` - Authentication
- `requestsService.ts` - Requests API
- `apiKeysService.ts` - API keys management

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory ready for deployment.

## Deployment

### Vercel
```bash
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Static Hosting (Netlify, GitHub Pages, etc.)

The build output in `dist/` is static and can be served by any static host.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- 📧 Email: support@requestvault.io
- 💬 GitHub Issues
- 📖 Documentation: `/docs`

## Roadmap

- [ ] Dark/Light theme toggle
- [ ] Real-time WebSocket updates
- [ ] Advanced analytics
- [ ] Custom dashboards
- [ ] Team collaboration
- [ ] Advanced filtering
- [ ] Data export
- [ ] Integrations (Slack, PagerDuty, etc.)

---

Built with ❤️ for developers
