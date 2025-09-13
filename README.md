# FreBud - Travel Social Network

A modern, production-ready React.js application for connecting travelers and exploring destinations together. Built with the latest web technologies and designed with a mobile-first approach.

![FreBud Logo](https://via.placeholder.com/200x80/6366f1/white?text=FreBud)

## 🌟 Features

### Core Features
- **Home Feed** - Discover travel posts, stories, and destination recommendations
- **Find Partner** - Connect with travel companions based on destinations and preferences
- **Community** - Join travel communities and share experiences
- **Messaging** - Real-time chat with travel buddies
- **Profile Management** - Customize your travel profile and showcase trips
- **Search** - Find places, people, and travel content
- **Notifications** - Stay updated with likes, comments, and friend requests

### UI/UX Features
- **Mobile-First Design** - Optimized for mobile devices with responsive layouts
- **Dark/Light Theme** - Toggle between themes with persistent preferences
- **Progressive Web App** - Installable on mobile devices with offline support
- **Toast Notifications** - User-friendly feedback for all actions
- **Loading States** - Smooth loading animations and skeleton screens

## 🛠️ Tech Stack

### Frontend
- **React 18** - Latest stable version with JSX
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful UI components for Tailwind

### State Management & Data
- **Zustand** - Lightweight state management with persistence
- **TanStack Query** - Data fetching and caching (optional)
- **Axios** - HTTP client for API calls

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

### Notifications & UI
- **Sonner** - Beautiful toast notifications
- **Lucide React** - Modern icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/frebud.git
   cd frebud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials
- **Email**: `demo@frebud.com`
- **Password**: `password123`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm test            # Run unit tests
```

### Deployment
```bash
npm run build       # Create optimized production build
npm run preview     # Preview the production build
```

## 📁 Project Structure

```
src/
├── assets/             # Static assets (images, icons)
├── components/         # Reusable UI components
│   ├── __tests__/     # Component tests
│   ├── Button.jsx     # Button component
│   ├── Card.jsx       # Card component
│   └── ...
├── pages/             # Route components
│   ├── __tests__/     # Page tests
│   ├── Feed.jsx       # Home feed page
│   ├── FindPartner.jsx # Find travel partners
│   ├── Community.jsx  # Community features
│   ├── Message.jsx    # Chat interface
│   ├── Profile.jsx    # User profiles
│   └── ...
├── state/             # Zustand stores
│   ├── authStore.js   # Authentication state
│   ├── travelStore.js # Travel-related state
│   └── uiStore.js     # UI state and preferences
├── services/          # API services and data fetching
├── data/              # Mock data (JSON files)
├── utils/             # Utility functions
├── test/              # Test configuration
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Purple (`#6366f1`)
- **Secondary**: Pink (`#ec4899`)
- **Accent**: Blue (`#3b82f6`)

### Components
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Cards**: Flexible card component with hover effects
- **Forms**: Styled inputs, selects, and textareas
- **Navigation**: Responsive sidebar and bottom navigation

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

### Running Tests
```bash
npm test                # Run all tests
npm test -- --watch    # Run tests in watch mode
npm test Button         # Run specific test file
```

### Test Coverage
- **Unit Tests**: Components and utilities
- **Integration Tests**: Page components and user flows
- **Form Validation**: Input validation and error handling

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Manual Build
```bash
npm run build
# Upload the 'dist' folder to your hosting service
```

### Environment Variables for Production
```bash
VITE_APP_TITLE="FreBud"
VITE_API_BASE_URL="https://your-api.com"
```

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- DaisyUI theme customization
- Custom color palette
- Responsive utilities

### Vite Configuration
Optimized build settings in `vite.config.js`:
- PWA plugin configuration
- Build optimization
- Development server settings

## 📱 PWA Features

### Installation
- Add to home screen on mobile devices
- Native app-like experience
- Offline functionality

### Service Worker
- Cache static assets
- Background sync (ready for implementation)
- Push notifications (ready for implementation)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use ESLint and Prettier configurations
- Follow React best practices
- Write tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern travel and social media apps
- **Icons**: Lucide React icon library
- **UI Components**: DaisyUI component library
- **Images**: Unsplash for demo images

## 📞 Support

For support and questions:
- **Email**: support@frebud.com
- **GitHub Issues**: [Create an issue](https://github.com/your-username/frebud/issues)
- **Documentation**: [Wiki](https://github.com/your-username/frebud/wiki)

---

**FreBud** - *Travel.Sleep.Travel* 🌍✈️

Made with ❤️ for travelers around the world.