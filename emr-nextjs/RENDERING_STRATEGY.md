# EMR Hospital - Rendering Strategies

This document outlines the rendering strategies used throughout the EMR application following Next.js 14+ App Router best practices.

## Rendering Modes Overview

### 1. Server-Side Rendering (SSR)
- **What**: Render pages on each request, fetch fresh data every time
- **When**: Dynamic content that changes frequently
- **Config**: No revalidate option or `revalidate = 0`

### 2. Incremental Static Regeneration (ISR)
- **What**: Static generation at build time, then revalidate at intervals
- **When**: Content that updates occasionally
- **Config**: `export const revalidate = 60;` (revalidate every 60s)

### 3. Client-Side Rendering (CSR)
- **What**: Render on the browser with `use client`, fetch with `useEffect`
- **When**: Interactive forms, real-time updates, user-specific data
- **Config**: `"use client"` directive at top of file

---

## Pages & Components Rendering Strategy

### `/` (Home Page)
- **Mode**: SSR (Server Component)
- **Why**: Static content, doesn't need frequent updates
- **Data**: No data fetching

### `/auth/login` (Login Page)
- **Mode**: CSR (Client Component)
- **Why**: Form interaction, token storage, localStorage access
- **Files**: `src/app/(auth)/login/page.tsx`

### `/dashboard` (Dashboard)
- **Mode**: SSR (Server Component)
- **Why**: Static UI with appointment data
- **Data**: Fetched server-side
- **Files**: `src/app/(dashboard)/dashboard/page.tsx`

### `/patients` (Patients List)
- **Mode**: ISR - Server Component with 60s revalidation
- **Why**: Patient list updates occasionally, benefit from caching
- **Revalidate**: `export const revalidate = 60;`
- **Data**: Fetched from `src/data/patients.json` in server component
- **Loading UI**: `src/app/(dashboard)/patients/loading.tsx`
  - Skeleton UI with `animate-pulse` class
  - Shows while page data is fetching
  - Improves perceived performance
- **Files**: 
  - `src/app/(dashboard)/patients/page.tsx`
  - `src/app/(dashboard)/patients/loading.tsx`

### `/patients/[id]` (Patient Detail)
- **Mode**: Dynamic SSR
- **Why**: Each patient record is unique
- **Data**: Fetched from JSON
- **Files**: `src/app/(dashboard)/patients/[id]/page.tsx`

### `/medical-records` (Medical Records List)
- **Mode**: SSR (Server Component)
- **Why**: Display list of records
- **Data**: Fetched from `src/data/medical-records.json`
- **Files**: `src/app/(dashboard)/medical-records/page.tsx`

### `/medical-records/[id]` (Medical Record Detail)
- **Mode**: Dynamic SSR with generateMetadata
- **Why**: Each record is unique, SEO optimization important
- **Revalidate**: `export const revalidate = 0;` (fully dynamic)
- **Metadata**: Generated dynamically with patient name
  - Title format: `Hồ sơ bệnh án - [Patient Name]`
  - Description: Patient's visit history
- **Data**: Fetched per request in `getPatients()` and `getMedicalRecord()`
- **Error Handling**: Uses `notFound()` for missing records
- **Files**: `src/app/(dashboard)/medical-records/[id]/page.tsx`

### `/doctors` (Doctors List)
- **Mode**: SSR (Server Component)
- **Why**: Static list
- **Files**: `src/app/(dashboard)/doctors/page.tsx`

---

## Component Rendering Breakdown

### Client Components (CSR with `use client`)
These components require browser APIs, interactivity, or state management:

1. **`src/app/(auth)/login/page.tsx`**
   - Reason: Form handling, localStorage access, token management
   - Uses: React hooks (useState, useRouter)

2. **`src/app/components/PatientList.tsx`**
   - Reason: Search, filter, CRUD operations
   - Uses: useEffect for data fetching, useState for form state
   - Features: Add/Edit/Delete patients with toast notifications

3. **`src/app/components/PatientForm.tsx`**
   - Reason: Form validation, user input handling
   - Uses: useFormValidation hook, form state management

4. **`src/app/components/PatientFormModal.tsx`**
   - Reason: Modal control, conditional rendering based on state
   - Uses: useState for modal visibility

5. **`src/app/components/PatientCard.tsx`**
   - Reason: Edit/Delete button handlers
   - Uses: onClick events, state management

6. **`src/app/components/Toast.tsx`**
   - Reason: Notification display and animations
   - Uses: useState for toast visibility

7. **Form Components** (`src/app/components/form/`)
   - `InputField.tsx`, `SelectField.tsx`, `Button.tsx`
   - Reason: Form field interaction and validation display
   - Uses: onChange, onBlur event handlers

### Server Components (Default - No `use client`)
These components render on the server and cannot use browser APIs:

1. **`src/app/layout.tsx`** (Root Layout)
   - Features: Global metadata, font loading, static HTML structure

2. **`src/app/(dashboard)/layout.tsx`** (Dashboard Layout)
   - Features: Navigation sidebar, user session display
   - Note: Uses `useRouter` in useEffect within client code section only

3. **`src/app/(dashboard)/patients/page.tsx`** (SSR/ISR)
   - Features: Table rendering with patient data
   - No interactivity - display only
   - Revalidates every 60 seconds

4. **`src/app/(dashboard)/medical-records/[id]/page.tsx`** (Dynamic SSR)
   - Features: Dynamic metadata generation per patient
   - Fully server-rendered per request
   - Generates unique page title with patient name for SEO

---

## Data Fetching Patterns

### Pattern 1: Import JSON (File-based)
```typescript
async function getPatients() {
  const patients = await import("@/data/patients.json").then((m) => m.default);
  return patients;
}
```
**Used in**: `patients/page.tsx`, `medical-records/[id]/page.tsx`
**Advantage**: Fast, no external dependencies

### Pattern 2: API Fetch with Cache
```typescript
const response = await fetch(`/api/patients`, {
  next: { revalidate: 60 } // Cache for 60 seconds
});
```
**Used in**: Could be extended for API endpoints
**Advantage**: Control over caching, real API integration

### Pattern 3: useEffect in Client Component
```typescript
useEffect(() => {
  fetch('/api/patients')
    .then(res => res.json())
    .then(setPatients);
}, []);
```
**Used in**: `PatientList.tsx` (interactive features)
**Advantage**: Refresh on user interaction, real-time updates

---

## Loading States

### Skeleton Loading (loading.tsx)
- **File**: `src/app/(dashboard)/patients/loading.tsx`
- **Usage**: Shows skeleton UI while `patients/page.tsx` fetches data
- **Implementation**: Gray placeholder divs with `animate-pulse` class
- **UX**: Improves perceived performance

### Error Handling
- **404 Pages**: Uses `notFound()` for missing records
- **Error Boundaries**: Can add `error.tsx` files for error states
- **Toast Notifications**: Client components show error messages

---

## Performance Optimizations

1. **ISR (Incremental Static Regeneration)**
   - `/patients` revalidates every 60 seconds
   - Reduces server load while keeping data fresh

2. **Dynamic Metadata**
   - `generateMetadata()` for unique SEO per record
   - Improves search engine indexing

3. **Image Optimization**
   - Next.js `Image` component (when images added)

4. **Caching Headers**
   - Middleware controls auth-related caching

---

## Migration Reference

### From CSR (React) to SSR (Next.js)
1. Move data fetching from `useEffect` to async server functions
2. Remove browser APIs from server components
3. Use `"use client"` for interactive features only
4. Export `metadata` and `generateMetadata` for SEO

### Example Conversion
**Before (React CSR):**
```typescript
function PatientsList() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    fetch('/api/patients').then(r => r.json()).then(setPatients);
  }, []);
  return <>{patients.map(...)}</>;
}
```

**After (Next.js SSR):**
```typescript
async function getPatients() {
  const patients = await import("@/data/patients.json").then(m => m.default);
  return patients;
}
export const metadata = { title: "Patients" };
export default async function PatientsList() {
  const patients = await getPatients();
  return <>{patients.map(...)}</>;
}
```

---

## Summary Table

| Page | Mode | Revalidate | Uses generateMetadata | Loading UI |
|------|------|-----------|----------------------|-----------|
| `/` | SSR | - | ✗ | ✗ |
| `/auth/login` | CSR | - | ✗ | ✗ |
| `/dashboard` | SSR | - | ✓ | ✗ |
| `/patients` | ISR | 60s | ✓ | ✓ Skeleton |
| `/medical-records` | SSR | - | ✓ | ✗ |
| `/medical-records/[id]` | SSR | 0 (dynamic) | ✓ Dynamic | ✗ |
| `/doctors` | SSR | - | ✓ | ✗ |

---

**Last Updated**: 2026-01-04  
**Next.js Version**: 16.1.1 (Turbopack)  
**Rendering Strategy**: Hybrid (SSR + ISR + CSR)
