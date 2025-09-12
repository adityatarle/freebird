# FreBud - Travel Companion App

A mobile-first, Instagram-inspired travel app built with modern web technologies. FreBud helps travelers discover destinations, connect with fellow travelers, and plan group adventures.

## 🌟 Features

### 🏠 **Home Feed**
- Instagram-style post cards with images, captions, and likes
- Story-style horizontal scroll bar
- Interactive engagement (likes, comments, bookmarks)

### 🔍 **Explore Destinations**
- Beautiful destination grid with filtering
- Search by location, budget, and category
- Detailed destination information with ratings and activities

### 👥 **Find Travel Companions**
- Match with fellow travelers based on preferences
- Filter by destination, travel style, and budget
- Connect and send travel requests

### 🎯 **Travel Groups**
- Create and join travel groups
- Group planning with polls and decisions
- Real-time member management

### ❤️ **Wishlist**
- Save favorite destinations and posts
- Organize saved items by type
- Plan trips from wishlist items

### 👤 **Profile & Settings**
- Comprehensive user profiles
- Dark/light theme toggle
- Multi-language support
- Privacy controls

## 🚀 Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: TailwindCSS + DaisyUI
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **PWA**: Vite PWA plugin with Workbox

## 📱 Mobile-First Design

- Responsive design optimized for mobile devices
- Touch-friendly interactions
- PWA support for native-like experience
- Offline functionality
- Installable on mobile devices

## 🏗️ Architecture

```
src/
├── assets/            # Images, logos
├── components/        # Reusable UI components
├── data/              # Static JSON mock data
├── features/          # Feature-specific components
│   ├── auth/          # Authentication
│   ├── feed/          # Travel feed
│   ├── explore/       # Destination discovery
│   ├── companions/    # Travel buddy matching
│   ├── groups/        # Group planning
│   ├── wishlist/      # Saved items
│   ├── profile/       # User profiles
│   └── settings/      # App settings
├── hooks/             # Custom React hooks
├── pages/             # Route components
├── services/          # API service layer (mock)
├── state/             # Zustand stores
├── utils/             # Helper functions
├── App.jsx            # Main app component
└── main.jsx           # App entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Main brand color
- **Secondary**: Amber (#f59e0b) - Accent color
- **Success**: Green (#10b981) - Success states
- **Neutral**: Gray (#374151) - Text and borders

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive text scaling**
- **Consistent hierarchy**

### Components
- Reusable UI components with consistent styling
- Custom button variants and sizes
- Card components with hover effects
- Loading states and animations

## 📊 Mock Data

The app uses static JSON files for demonstration:

- **Posts**: Travel posts with images, captions, likes
- **Destinations**: Travel destinations with ratings, activities
- **Users**: User profiles with travel preferences
- **Stories**: Instagram-style stories
- **Companions**: Travel buddy profiles
- **Groups**: Travel group information

## 🔄 State Management

### Zustand Stores

1. **Auth Store** (`authStore.js`)
   - User authentication state
   - Login/logout functionality
   - Profile management

2. **Travel Store** (`travelStore.js`)
   - Wishlist management
   - Saved destinations
   - Group memberships
   - Recent searches

3. **UI Store** (`uiStore.js`)
   - Theme preferences
   - Modal states
   - Navigation state
   - Loading states

## 🎯 Key Features Implementation

### Instagram-Style Feed
- Infinite scroll posts
- Story bar with view tracking
- Interactive engagement buttons
- Image optimization

### Travel Companion Matching
- Preference-based filtering
- Compatibility scoring
- Connection requests
- Profile viewing

### Group Planning
- Group creation workflow
- Member management
- Polling system
- Activity planning

### PWA Capabilities
- Offline functionality
- Install prompts
- Background sync
- Push notifications (ready)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frebud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Demo Credentials

For testing the app, use these demo credentials:

- **Email**: `demo@frebud.com`
- **Password**: `password123`

Or click the "Try Demo Account" button on the login page.

## 📱 PWA Installation

### Mobile (iOS/Android)
1. Open the app in your mobile browser
2. Look for "Add to Home Screen" prompt
3. Follow the installation instructions

### Desktop (Chrome/Edge)
1. Look for the install icon in the address bar
2. Click "Install FreBud"
3. The app will open as a standalone application

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Customization

### Themes
The app supports light and dark themes with CSS custom properties:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #f59e0b;
  --color-accent: #10b981;
  /* ... more variables */
}
```

### Adding New Features
1. Create components in appropriate feature folders
2. Add routes to `App.jsx`
3. Update navigation in `BottomNavigation.jsx`
4. Add mock data if needed

## 🔧 Configuration

### Environment Variables
Create a `.env` file for custom configuration:

```env
VITE_APP_NAME=FreBud
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.frebud.com
```

### PWA Configuration
Modify `vite.config.js` for PWA settings:

```javascript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'FreBud - Travel Companion',
    short_name: 'FreBud',
    theme_color: '#3b82f6',
    // ... more manifest options
  }
})
```

## 🚧 Future Enhancements

- [ ] Real-time chat functionality
- [ ] Map integration for destinations
- [ ] Trip planning with itineraries
- [ ] Social media sharing
- [ ] Push notifications
- [ ] Multi-language content
- [ ] Currency conversion
- [ ] Weather integration
- [ ] Booking integrations
- [ ] Travel document management

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@frebud.com or create an issue on GitHub.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for beautiful travel images
- [Lucide](https://lucide.dev) for clean, consistent icons
- [TailwindCSS](https://tailwindcss.com) for utility-first styling
- [DaisyUI](https://daisyui.com) for component library
- [React](https://reactjs.org) for the amazing framework

---

**Made with ❤️ for travelers around the world**

*FreBud v1.0.0 - Your ultimate travel companion*