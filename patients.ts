import patients from './patient-data';

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    diagnosis?: string;
}

// Create a Map 
export function createPatientMap(patientsArr: Patient[]): Map<string, Patient> {
  const map = new Map<string, Patient>();
  patientsArr.forEach(patient => {
    map.set(patient.id, patient);
  });
  return map;
}

// Add a new patient
export function addPatient(patientsArr: Patient[], newPatient: Patient): Patient[] {
  const idStr = String(newPatient.id);
  if (patientsArr.some(p => String(p.id) === idStr)) {
    throw new Error('Bệnh nhân đã tồn tại.');
  }
  return [...patientsArr, { ...newPatient, id: idStr }];
}


// Update patient information
export function updatePatient(
  patientsArr: Patient[],
  id: string,
  updates: Partial<Patient>
): Patient[] {
  const idStr = String(id);
  if (!patientsArr.some(p => String(p.id) === idStr)) {
    throw new Error('Bệnh nhân không tồn tại.');
  }
  return patientsArr.map(p => (String(p.id) === idStr ? { ...p, ...updates } : p));
}

// Delete patient - using filter
export function deletePatient(patientsArr: Patient[], id: string): Patient[] {
  const idStr = String(id);
  const filtered = patientsArr.filter(p => String(p.id) !== idStr);
  
  if (filtered.length === patientsArr.length) {
    throw new Error('Bệnh nhân không tồn tại.');
  }
  console.log('Xóa thành công bệnh nhân. Danh sách sau khi xóa:', filtered);
  return filtered;
}

// Search patient - by id or name
export function searchPatient(patientsArr: Patient[], keyword: string): Patient | undefined {
  const key = String(keyword).toLowerCase();
  return patientsArr.find(
    p => String(p.id) === key || p.name.toLowerCase().includes(key)
  );
}

// Get patient info - type-safe, returns a string
export function getPatientInfo(patient: Patient): string {
  return `ID: ${patient.id}, Tên: ${patient.name}, Tuổi: ${patient.age}, Giới tính: ${patient.gender}, Chẩn đoán: ${patient.diagnosis || 'N/A'}`;
}

// Fetch patients - simulate async
export function fetchPatients(): Promise<Patient[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (patients.length > 0) {
        resolve(patients);
      } else {
        reject(new Error('Không có dữ liệu bệnh nhân.'));
      }
    }, 1000);
  });
}

// Display patients
export async function displayPatients(): Promise<void> {
  try {
    const patientList = await fetchPatients();
    console.log('Danh sách bệnh nhân:', patientList);
    patientList.forEach(p => console.log(getPatientInfo(p)));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi khi lấy danh sách bệnh nhân:', error.message);
    }
  }
}

// Example usage
displayPatients();

// Test add
const newPatients = addPatient(patients, { id: '4', name: 'Phạm Văn D', age: 35, gender: 'male', diagnosis: 'High Blood Pressure' });
console.log('Sau khi thêm:', newPatients);

// Test update
const updated = updatePatient(newPatients, '2', { age: 26 });
console.log('Sau khi cập nhật:', updated);

// Test delete
const deleted = deletePatient(updated, '3');
console.log('Sau khi xóa:', deleted);

// Test search
const found = searchPatient(deleted, 'Phạm');
console.log('Tìm kiếm:', found ? getPatientInfo(found) : 'Không tìm thấy');

// Test Map
const patientMap = createPatientMap(deleted);
console.log('Patient Map:', patientMap);
