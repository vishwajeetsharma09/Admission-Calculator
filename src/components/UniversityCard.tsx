import React from 'react';
import { University } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface UniversityCardProps {
  university: University;
  userGMAT: number;
  userGPA: number;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, userGMAT, userGPA }) => {
  const { name, admission_chance, program_stats } = university;
  
  const getChanceColor = (chance: number): string => {
    if (chance >= 80) return 'var(--success-color)';
    if (chance >= 60) return 'var(--warning-color)';
    return 'var(--error-color)';
  };

  const getChanceLabel = (chance: number): string => {
    if (chance >= 80) return 'High';
    if (chance >= 60) return 'Medium';
    if (chance >= 40) return 'Low';
    return 'Very Low';
  };

  const getComparisonIcon = (userValue: number, avgValue?: number) => {
    if (!avgValue) return <Minus size={16} />;
    if (userValue > avgValue) return <TrendingUp size={16} color="var(--success-color)" />;
    if (userValue < avgValue) return <TrendingDown size={16} color="var(--error-color)" />;
    return <Minus size={16} />;
  };

  return (
    <div className="university-card card slide-up">
      <div className="card-header">
        <h3 className="university-name">{name}</h3>
        <div className="chance-badge" style={{ backgroundColor: getChanceColor(admission_chance) }}>
          <span className="chance-percentage">{admission_chance}%</span>
          <span className="chance-label">{getChanceLabel(admission_chance)}</span>
        </div>
      </div>
      
      <div className="card-content">
        <div className="chance-bar">
          <div 
            className="chance-fill" 
            style={{ 
              width: `${admission_chance}%`,
              backgroundColor: getChanceColor(admission_chance)
            }}
          />
        </div>
        
        {program_stats && (
          <div className="stats-section">
            <h4 className="stats-title">Program Statistics</h4>
            <div className="stats-grid">
              {program_stats.avg_gmat && (
                <div className="stat-item">
                  <span className="stat-label">Avg GMAT</span>
                  <div className="stat-value">
                    {program_stats.avg_gmat}
                    {getComparisonIcon(userGMAT, program_stats.avg_gmat)}
                  </div>
                </div>
              )}
              
              {program_stats.avg_gpa && (
                <div className="stat-item">
                  <span className="stat-label">Avg GPA</span>
                  <div className="stat-value">
                    {program_stats.avg_gpa.toFixed(2)}
                    {getComparisonIcon(userGPA, program_stats.avg_gpa)}
                  </div>
                </div>
              )}
              
              {program_stats.acceptance_rate && (
                <div className="stat-item">
                  <span className="stat-label">Acceptance Rate</span>
                  <div className="stat-value">
                    {(program_stats.acceptance_rate * 100).toFixed(1)}%
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityCard; 