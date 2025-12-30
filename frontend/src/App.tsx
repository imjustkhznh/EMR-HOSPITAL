import React, { useState } from 'react'
import { PatientCard } from './components/PatientCard'
import { Patient } from './types/models'
import './App.css'

function App() {
  // Hard-coded 3 patients for demo
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      age: 30,
      gender: 'male',
      diagnosis: 'Fever',
      medicalRecordIds: ['mr1', 'mr2'],
    },
    {
      id: '2',
      name: 'Trần Thị B',
      age: 25,
      gender: 'female',
      diagnosis: 'Flu',
      medicalRecordIds: ['mr3'],
    },
    {
      id: '3',
      name: 'Lê Văn C',
      age: 40,
      gender: 'male',
      diagnosis: 'Diabetes',
      medicalRecordIds: ['mr4', 'mr5', 'mr6'],
    },
  ])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 EMR System - Patient Management</h1>
        <p className="subtitle">Electronic Medical Records Dashboard</p>
      </header>

      <main className="app-main">
        <section className="patients-section">
          <div className="section-header">
            <h2>Patients</h2>
            <span className="patient-count">{patients.length} patients</span>
          </div>
          
          <div className="patients-grid">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 EMR System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
