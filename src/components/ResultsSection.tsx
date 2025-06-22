import React, { useState, useMemo } from 'react';
import { University, SortOption, SortDirection } from '../types';
import UniversityCard from './UniversityCard';
import { ArrowUp, ArrowDown, Download, Search } from 'lucide-react';
import { exportToCSV } from '../utils/export';

interface ResultsSectionProps {
  universities: University[];
  userGMAT: number;
  userGPA: number;
  isLoading: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  universities, 
  userGMAT, 
  userGPA, 
  isLoading 
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('chance');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedUniversities = useMemo(() => {
    const filtered = universities.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case 'chance':
          aValue = a.admission_chance;
          bValue = b.admission_chance;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'gmat':
          aValue = a.program_stats?.avg_gmat || 0;
          bValue = b.program_stats?.avg_gmat || 0;
          break;
        case 'gpa':
          aValue = a.program_stats?.avg_gpa || 0;
          bValue = b.program_stats?.avg_gpa || 0;
          break;
        case 'acceptance':
          aValue = a.program_stats?.acceptance_rate || 0;
          bValue = b.program_stats?.acceptance_rate || 0;
          break;
        default:
          aValue = a.admission_chance;
          bValue = b.admission_chance;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [universities, sortBy, sortDirection, searchQuery]);

  const handleSortByChange = (newSortBy: SortOption) => {
    if (sortBy !== newSortBy) {
        setSortBy(newSortBy);
        setSortDirection('desc');
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (isLoading) {
    return (
      <div className="results-section">
        <div className="loading-container">
          <div className="loading"></div>
          <p>Calculating your admission chances...</p>
        </div>
      </div>
    );
  }

  // Always show the section after submit, even if empty
  return (
    <div className="results-section fade-in">
      <div className="results-header">
        <div className="results-info">
          <h2 className="results-title">Your Admission Chances</h2>
          <p className="results-subtitle">
            Based on your GMAT score of {userGMAT} and GPA of {userGPA.toFixed(2)}
          </p>
        </div>
        
        <div className="results-actions">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sort-controls">
              
            <div className="sort-container">
              <select
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => handleSortByChange(e.target.value as SortOption)}
              >
                <option value="chance">Chance</option>
                <option value="name">University</option>
                <option value="gmat" disabled={universities.some(u => !u.program_stats)}>Avg GMAT</option>
                <option value="gpa" disabled={universities.some(u => !u.program_stats)}>Avg GPA</option>
                <option value="acceptance" disabled={universities.some(u => !u.program_stats)}>Acceptance Rate</option>
              </select>
              <button className="sort-direction-btn" onClick={toggleSortDirection} title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}>
                {sortDirection === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
              </button>
            </div>
          </div>
          {sortedUniversities.length > 0 && (
            <button
              className="btn btn-secondary export-btn"
              onClick={() => exportToCSV(sortedUniversities, userGMAT, userGPA)}
            >
              <Download size={18} />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {sortedUniversities.length === 0 ? (
        <div className="no-results-message">
          <p>No results found for your input. Try different GMAT or GPA values.</p>
        </div>
      ) : (
        <div className="universities-grid">
          {sortedUniversities.map((university, index) => (
            <UniversityCard
              key={`${university.name}-${index}`}
              university={university}
              userGMAT={userGMAT}
              userGPA={userGPA}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsSection; 