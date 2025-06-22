import React, { useState, useEffect } from 'react';
import { University } from './types';
import { mbaAPI } from './services/api';
import CalculatorForm from './components/CalculatorForm';
import ResultsSection from './components/ResultsSection';
import ErrorAlert from './components/ErrorAlert';
import { Sun, Moon, Github } from 'lucide-react';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<{ gmat: number; gpa: number } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Persist theme in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
  }, []);
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleFormSubmit = async (data: { gmat_score: number; gpa: number }) => {
    setIsLoading(true);
    setError(null);
    setUserInput({ gmat: data.gmat_score, gpa: data.gpa });
    setHasSubmitted(true);

    try {
      const response = await mbaAPI.getAdmissionChances(data);
      setUniversities(response.universities || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setUniversities([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUniversities([]);
    setError(null);
    setUserInput(null);
    setHasSubmitted(false);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="app-header">
        <div className="container">
          <div className="header-actions">
            <button onClick={toggleTheme} className={`theme-toggle ${theme}`} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              <Sun size={20} className="icon sun" />
              <Moon size={20} className="icon moon" />
            </button>
          </div>
          <div className="header-branding">
            <div className="logo">
              <Logo isDarkMode={theme === 'dark'} />
            </div>
            <p className="header-subtitle">
              Your AI-powered guide to MBA admissions
            </p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <CalculatorForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            onReset={handleReset}
          />
          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
          {hasSubmitted && userInput && (
            <ResultsSection 
              universities={universities} 
              userGMAT={userInput.gmat}
              userGPA={userInput.gpa}
              isLoading={isLoading} 
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 MBA Matcher. Built for educational purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default App; 