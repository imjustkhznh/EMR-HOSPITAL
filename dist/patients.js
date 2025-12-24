"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientMap = createPatientMap;
exports.addPatient = addPatient;
exports.updatePatient = updatePatient;
exports.deletePatient = deletePatient;
exports.searchPatient = searchPatient;
exports.getPatientInfo = getPatientInfo;
exports.fetchPatients = fetchPatients;
exports.displayPatients = displayPatients;
const patient_data_1 = __importDefault(require("./patient-data"));
// Create a Map 
function createPatientMap(patientsArr) {
    const map = new Map();
    patientsArr.forEach(patient => {
        map.set(patient.id, patient);
    });
    return map;
}
// Add a new patient
function addPatient(patientsArr, newPatient) {
    const idStr = String(newPatient.id);
    if (patientsArr.some(p => String(p.id) === idStr)) {
        throw new Error('Bệnh nhân đã tồn tại.');
    }
    return [...patientsArr, Object.assign(Object.assign({}, newPatient), { id: idStr })];
}
// Update patient information
function updatePatient(patientsArr, id, updates) {
    const idStr = String(id);
    if (!patientsArr.some(p => String(p.id) === idStr)) {
        throw new Error('Bệnh nhân không tồn tại.');
    }
    return patientsArr.map(p => (String(p.id) === idStr ? Object.assign(Object.assign({}, p), updates) : p));
}
// Delete patient - using filter
function deletePatient(patientsArr, id) {
    const idStr = String(id);
    const filtered = patientsArr.filter(p => String(p.id) !== idStr);
    if (filtered.length === patientsArr.length) {
        throw new Error('Bệnh nhân không tồn tại.');
    }
    console.log('Xóa thành công bệnh nhân. Danh sách sau khi xóa:', filtered);
    return filtered;
}
// Search patient - by id or name
function searchPatient(patientsArr, keyword) {
    const key = String(keyword).toLowerCase();
    return patientsArr.find(p => String(p.id) === key || p.name.toLowerCase().includes(key));
}
// Get patient info - type-safe, returns a string
function getPatientInfo(patient) {
    return `ID: ${patient.id}, Tên: ${patient.name}, Tuổi: ${patient.age}, Giới tính: ${patient.gender}, Chẩn đoán: ${patient.diagnosis || 'N/A'}`;
}
// Fetch patients - simulate async
function fetchPatients() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (patient_data_1.default.length > 0) {
                resolve(patient_data_1.default);
            }
            else {
                reject(new Error('Không có dữ liệu bệnh nhân.'));
            }
        }, 1000);
    });
}
// Display patients
function displayPatients() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patientList = yield fetchPatients();
            console.log('Danh sách bệnh nhân:', patientList);
            patientList.forEach(p => console.log(getPatientInfo(p)));
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Lỗi khi lấy danh sách bệnh nhân:', error.message);
            }
        }
    });
}
// Example usage
displayPatients();
// Test add
const newPatients = addPatient(patient_data_1.default, { id: '4', name: 'Phạm Văn D', age: 35, gender: 'male', diagnosis: 'High Blood Pressure' });
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
