
import { useState } from 'react'
import { PatientList } from './components/PatientList'
import type { Patient } from './types/models'
import './App.css'

function App() {
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
          </div>
          
          <PatientList />
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 EMR System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
