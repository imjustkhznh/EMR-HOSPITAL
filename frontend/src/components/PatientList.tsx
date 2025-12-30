import { useState, useEffect } from 'react';
import type { Patient } from '../types/models';
import { PatientCard } from './PatientCard';
import './PatientList.css';

interface PatientListProps {
  initialPatients?: Patient[];
}

export const PatientList: React.FC<PatientListProps> = ({ initialPatients = [] }) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [showList, setShowList] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect: Fetch patients on component mount
  useEffect(() => {
    const controller = new AbortController();

    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate network delay (1.2s)
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const response = await fetch('/patients.json', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch patients: ${response.statusText}`);
        }

        const data: Patient[] = await response.json();
        setPatients(data);
        console.log(`[PatientList] Successfully loaded ${data.length} patients`);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          const errorMessage = err.message || 'Failed to load patients';
          setError(errorMessage);
          console.error('[PatientList] Fetch error:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();

    // Cleanup function: Cancel request if component unmounts
    return () => {
      controller.abort();
      console.log('[PatientList] Component unmounted, cleanup executed');
    };
  }, []); // Empty dependency array: Run once on mount

  // Simulate loading when toggling list visibility
  const handleToggleList = () => {
    setIsLoading(true);
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
            disabled={isLoading || !!error}
          />
          {searchTerm && !error && (
            <span className="search-result-count">
              {filteredPatients.length} result{filteredPatients.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {!error && (
          <button
            onClick={handleToggleList}
            className={`toggle-btn ${showList ? 'hide' : 'show'}`}
            disabled={isLoading}
          >
            {isLoading ? '⏳ Loading...' : showList ? '🙈 Hide List' : '👁️ Show List'}
          </button>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <div className="error-message">
            <p className="error-title">Failed to Load Patients</p>
            <p className="error-text">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && !error && (
        <div className="loading-spinner">Loading patients...</div>
      )}

      {/* Conditional rendering: Show list or message */}
      {showList && !isLoading && !error && (
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
      {!showList && !isLoading && !error && (
        <div className="hidden-state">
          <p>Patient list is hidden</p>
          <p>Click the button above to show the list</p>
        </div>
      )}

      {/* Stats */}
      {!error && (
        <div className="list-stats">
          <span>Total patients: <strong>{patients.length}</strong></span>
          {searchTerm && (
            <span>Filtered: <strong>{filteredPatients.length}</strong></span>
          )}
        </div>
      )}
    </div>
  );
};
