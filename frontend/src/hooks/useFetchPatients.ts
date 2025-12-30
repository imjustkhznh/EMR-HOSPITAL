import { useEffect, useState } from 'react';
import type { Patient } from '../types/models';

interface UseFetchPatientsReturn {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

export const useFetchPatients = (): UseFetchPatientsReturn => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate network delay
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call with 1.2s delay
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const response = await fetch('/patients.json', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch patients: ${response.statusText}`);
        }

        const data: Patient[] = await response.json();
        setPatients(data);
      } catch (err) {
        // Only set error if it's not an abort error
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Failed to load patients');
          console.error('Fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function: Cancel request if component unmounts
    return () => {
      controller.abort();
      console.log('[useFetchPatients] Component unmounted, cleanup executed');
    };
  }, []); // Empty dependency array: run once on mount

  return { patients, loading, error };
};
