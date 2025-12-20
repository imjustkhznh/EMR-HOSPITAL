const patients = require('./patient-data.js');

// Add patient
function addPatient(patientsArr, newPatient) {
  const idStr = String(newPatient.id);
  if (patientsArr.some(p => String(p.id) === idStr)) {
    throw new Error('Bệnh nhân đã tồn tại.');
  }
  return [...patientsArr, { ...newPatient, id: idStr }];
}

// Update patient
const updatePatient = (patientsArr, id, updates) => {
  const idStr = String(id);
  if (!patientsArr.some(p => String(p.id) === idStr)) throw new Error('Bệnh nhân không tồn tại.');
  return patientsArr.map(p => (String(p.id) === idStr ? { ...p, ...updates } : p));
};

// Delete patient
function deletePatient(patientsArr, id) {
  const idStr = String(id);
  const filtered = patientsArr.filter(p => String(p.id) !== idStr);
  if (filtered.length === patientsArr.length) throw new Error('Bệnh nhân không tồn tại.');
  return filtered;
}

// Search patient by id or name
function searchPatient(patientsArr, keyword) {
  const key = String(keyword).toLowerCase();
  return patientsArr.find(p => String(p.id) === key || p.name.toLowerCase().includes(key));
}

// Create Map keyed by id for fast lookup
function createPatientMap(patientsArr) {
  const map = new Map();
  patientsArr.forEach(p => map.set(String(p.id), p));
  return map;
}

//
function fetchPatients() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error('Lỗi khi tải dữ liệu bệnh nhân.'));
      } else {
        resolve(require('./patient-data.js'));
      }
    }, 1000); // 1 giây
  });
}


//
async function displayPatients() {
  try {
    const patients = await fetchPatients();
    console.log("Danh sách bệnh nhân:", patients);
  } catch (error) {
    console.error('Lỗi', error.message);
  }
}


displayPatients();

//Export functions for reuse
//module.exports = { addPatient, updatePatient, deletePatient, searchPatient, createPatientMap };


