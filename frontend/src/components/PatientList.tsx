import { useState } from 'react';
import type { Patient } from '../types/models';
import { PatientCard } from './PatientCard';
import './PatientList.css';

interface PatientListProps {
  initialPatients: Patient[];
}

export const PatientList: React.FC<PatientListProps> = ({ initialPatients }) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [showList, setShowList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate loading when toggling list visibility
  const handleToggleList = () => {
    setIsLoading(true);
    // Simulate API call with 800ms delay
    setTimeout(() => {
      setShowList(!showList);
      setIsLoading(false);
    }, 800);
  };

  // Filter patients by name (case-insensitive)
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-list-container">
      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <span className="search-result-count">
              {filteredPatients.length} result{filteredPatients.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <button
          onClick={handleToggleList}
          className={`toggle-btn ${showList ? 'hide' : 'show'}`}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Loading...' : showList ? '🙈 Hide List' : '👁️ Show List'}
        </button>
      </div>

      {/* Loading state */}
      {isLoading && <div className="loading-spinner">Loading patients...</div>}

      {/* Conditional rendering: Show list or message */}
      {showList && !isLoading && (
        <>
          {filteredPatients.length > 0 ? (
            <div className="patients-grid">
              {filteredPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No patients found</p>
              {searchTerm && (
                <p className="empty-hint">Try searching with a different name</p>
              )}
            </div>
          )}
        </>
      )}

      {/* When list is hidden */}
      {!showList && !isLoading && (
        <div className="hidden-state">
          <p>Patient list is hidden</p>
          <p>Click the button above to show the list</p>
        </div>
      )}

      {/* Stats */}
      <div className="list-stats">
        <span>Total patients: <strong>{patients.length}</strong></span>
        {searchTerm && (
          <span>Filtered: <strong>{filteredPatients.length}</strong></span>
        )}
      </div>
    </div>
  );
};
