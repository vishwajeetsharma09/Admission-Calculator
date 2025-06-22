# MBA Admissions Calculator

A modern, responsive web application that calculates MBA admission chances across multiple universities based on GMAT scores and GPA. Built with React, TypeScript, and modern web technologies.

## 🎯 Features

### Core Functionality

- **GMAT Score Input**: Numeric input field with validation (200-800 range, whole numbers only)
- **GPA Input**: Decimal input field with validation (0.0-4.0 range, up to 2 decimal places)
- **Real-time Validation**: Instant feedback on input errors
- **API Integration**: Seamless communication with the MBA matcher API
- **Results Display**: Comprehensive university list with admission chances

### User Experience

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Error Handling**: User-friendly error messages with clear explanations
- **Loading States**: Visual feedback during API calls
- **Sort Functionality**: Sort results by admission chance, university name, or program statistics

### Advanced Features

- **Program Statistics**: Optional display of average GMAT, GPA, and acceptance rates
- **Visual Indicators**: Color-coded admission chances and comparison icons
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized rendering and efficient state management

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mba-admissions-calculator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── CalculatorForm.tsx    # Main input form
│   ├── ResultsSection.tsx    # Results display and sorting
│   ├── UniversityCard.tsx    # Individual university card
│   ├── InputField.tsx        # Reusable input component
│   └── ErrorAlert.tsx        # Error message component
├── services/           # API and external services
│   └── api.ts         # MBA matcher API integration
├── types/             # TypeScript type definitions
│   └── index.ts       # Application types and interfaces
├── utils/             # Utility functions
│   └── validation.ts  # Form validation logic
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── index.css          # Global styles and CSS variables
```

## 🎨 Design System

The application uses a modern design system with:

- **Color Palette**: Professional blue theme with semantic colors
- **Typography**: Inter font family for excellent readability
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable, accessible UI components
- **Animations**: Smooth transitions and micro-interactions

### CSS Variables

```css
--primary-color: #2563eb
--success-color: #10b981
--warning-color: #f59e0b
--error-color: #ef4444
--background-color: #f8fafc
--surface-color: #ffffff
```

## 🔧 API Integration

The application integrates with the MBA matcher API:

- **Endpoint**: `POST https://mba-mini-test-480449117413.us-central1.run.app/match-mba-test`
- **Request Format**: JSON with `gmat_score` and `gpa` fields
- **Response**: Array of universities with admission chances and optional statistics
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Example API Request

```json
{
  "gmat_score": 720,
  "gpa": 3.5
}
```

### Example API Response

```json
{
  "universities": [
    {
      "name": "Harvard Business School",
      "admission_chance": 85,
      "program_stats": {
        "avg_gmat": 730,
        "avg_gpa": 3.7,
        "acceptance_rate": 0.12
      }
    }
  ]
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints at:

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: > 768px

Key responsive features:

- Flexible grid layouts
- Adaptive typography
- Touch-friendly interface
- Optimized navigation

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your preferred hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Icons from Lucide React
- Fonts from Google Fonts (Inter)
- Modern CSS with CSS Grid and Flexbox

---

**Note**: This application is built for educational purposes and demonstrates modern web development practices including responsive design, API integration, and user experience optimization.
