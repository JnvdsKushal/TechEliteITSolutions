# TechElite IT Solutions - Training Institute Website

A modern, multi-page web application for an IT training institute built with React, TypeScript, Tailwind CSS, and Motion animations. The website features a clean, professional design with blue/indigo color scheme perfect for education, responsive layouts, and comprehensive functionality for course bookings and placement information.

## 🌟 Features

### Core Functionality
- **Multi-Page Architecture**: Separate pages for different sections with React Router
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Animated UI**: Smooth animations and transitions using Motion (Framer Motion)
- **Booking System**: Comprehensive course booking form with validation
- **Course Catalog**: Detailed online and offline course listings with pricing
- **Placement Information**: Statistics, hiring partners, and success stories

### Pages
- **Home**: Landing page with animated background and key statistics
- **Services**: 8 IT training services with detailed descriptions
- **Courses**:
  - Online Courses: 6 courses with live classes and lifetime access
  - Offline Courses: 6 classroom training programs with schedules
  - Placements: Placement assistance, success stories, and hiring partners
- **About**: Company information, mission, vision, and why choose us
- **Contact**: Contact information and quick inquiry form
- **Booking**: Comprehensive course booking form

### UI/UX Features
- Sticky navigation with scroll effects
- Dropdown menu for courses
- Animated gradient background on home page
- Hover effects and micro-interactions
- Form validation and success messages
- Mobile-responsive hamburger menu
- Professional footer with quick links

## 🛠️ Tech Stack

- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **React Router DOM 7.13.1** - Client-side routing
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Motion 12.23.24** - Animation library (Framer Motion successor)
- **Lucide React** - Icon library
- **Vite 6.3.5** - Build tool and dev server

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techelite-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   # or
   npm run build
   ```

The development server will start at `http://localhost:5173`

## 📁 Project Structure

```
techelite-website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Navigation.tsx      # Main navigation with dropdown
│   │   │   └── Footer.tsx          # Footer component
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page with animated bg
│   │   │   ├── Services.tsx        # Training services page
│   │   │   ├── OnlineCourses.tsx   # Online courses catalog
│   │   │   ├── OfflineCourses.tsx  # Offline courses catalog
│   │   │   ├── Placements.tsx      # Placement information
│   │   │   ├── About.tsx           # About company page
│   │   │   ├── Contact.tsx         # Contact page
│   │   │   └── Booking.tsx         # Course booking form
│   │   └── App.tsx                 # Main app with routing
│   ├── styles/
│   │   ├── theme.css               # Theme variables
│   │   └── fonts.css               # Font imports
│   └── main.tsx                    # App entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🗺️ Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with animated background |
| `/services` | All training services |
| `/courses/online` | Online courses catalog |
| `/courses/offline` | Offline classroom courses |
| `/courses/placements` | Placement assistance details |
| `/about` | About the company |
| `/contact` | Contact information |
| `/booking` | Course booking form |

## 🎨 Design System

### Color Scheme
- **Primary**: Blue (#2563EB)
- **Secondary**: Indigo (#6366F1)
- **Background**: White with gradient accents
- **Text**: Gray scale (900 for headings, 600 for body)

### Typography
- System font stack with fallbacks
- Responsive font sizes
- Consistent spacing and line heights

### Components
- Rounded corners (xl = 12px, 2xl = 16px)
- Soft shadows for elevation
- Smooth transitions (300ms duration)
- Hover effects on interactive elements

## 💻 Usage

### Navigation
The sticky navigation automatically highlights the active page and includes a dropdown for course categories. Mobile users get a hamburger menu with the same functionality.

### Booking a Course
1. Navigate to any course page (Online/Offline)
2. Click "Enroll Now" or "Book Seat" on a course
3. Fill out the booking form with your details
4. Select preferred course, mode, date, and time
5. Submit the form to receive confirmation

### Viewing Courses
- **Online Courses**: Browse live online training programs with lifetime access
- **Offline Courses**: View classroom training with schedules and locations
- **Placements**: Check placement statistics and success stories

### Contact
Navigate to the Contact page to view all contact information including phone, email, address, and working hours. Use the quick contact form for inquiries.

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom theme variables defined in `/src/styles/theme.css`. Modify this file to customize colors, spacing, and other design tokens.

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_API_URL=your_api_url_here
```

## 🚀 Deployment

### Build
```bash
pnpm build
```

The production build will be created in the `dist/` directory.

### Deploy to Popular Platforms

**Vercel**
```bash
vercel deploy
```

**Netlify**
```bash
netlify deploy --prod
```

**GitHub Pages**
```bash
pnpm build
gh-pages -d dist
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px
- **Large Desktop**: ≥ 1280px

## 🎯 Future Enhancements

- [ ] Backend integration for form submissions
- [ ] User authentication and dashboard
- [ ] Payment gateway integration
- [ ] Course progress tracking
- [ ] Student testimonials section
- [ ] Blog section for IT articles
- [ ] Live chat support
- [ ] Email notifications
- [ ] Admin panel for course management
- [ ] Advanced search and filtering

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use Tailwind CSS utility classes
- Add comments for complex logic

## 🐛 Known Issues

- Form submissions are currently client-side only (no backend integration)
- Map placeholder needs Google Maps API integration
- Social media links are placeholders

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **TechElite IT Solutions** - Initial work

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Motion](https://motion.dev/) - Animation Library
- [Lucide](https://lucide.dev/) - Icon Library
- [Vite](https://vitejs.dev/) - Build Tool

## 📞 Support

For support, email info@techelite.com or visit our contact page.

---

**Made with ❤️ by TechElite IT Solutions**