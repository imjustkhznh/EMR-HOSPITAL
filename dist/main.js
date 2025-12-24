"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAge = checkAge;
exports.addItem = addItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
const doctor_1 = require("./models/doctor");
const patient_data_1 = __importDefault(require("./patient-data"));
// Kiểm tra tuổi bệnh nhân hợp lệ (type guard cơ bản)
function checkAge(patient) {
    return typeof patient.age === 'number' && patient.age > 0;
}
// Decorator để log action
function Log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Action: ${propertyKey}, Args:`, args);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// Class quản lý bệnh nhân với decorator và Partial
class PatientManager {
    constructor() {
        this.patients = [];
    }
    addPatient(patient) {
        this.patients = addItem(this.patients, patient);
    }
    updatePatient(id, updates) {
        this.patients = updateItem(this.patients, id, updates);
    }
}
__decorate([
    Log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PatientManager.prototype, "addPatient", null);
// Array Utilities with Generics
function addItem(array, item) {
    const idStr = String(item.id);
    if (array.some(p => String(p.id) === idStr)) {
        throw new Error('Phần tử đã tồn tại.');
    }
    return [...array, Object.assign(Object.assign({}, item), { id: idStr })];
}
function updateItem(array, id, updates) {
    const idStr = String(id);
    if (!array.some(p => String(p.id) === idStr)) {
        throw new Error('Phần tử không tồn tại.');
    }
    return array.map(p => (String(p.id) === idStr ? Object.assign(Object.assign({}, p), updates) : p));
}
function deleteItem(array, id) {
    const idStr = String(id);
    const filtered = array.filter(p => String(p.id) !== idStr);
    if (filtered.length === array.length) {
        throw new Error('Phần tử không tồn tại.');
    }
    return filtered;
}
// Sử dụng với bệnh nhân
const newPatient = { id: '4', name: 'Phạm Văn D', age: 35, gender: 'male', diagnosis: 'High Blood Pressure' };
const newPatients = addItem(patient_data_1.default, newPatient);
console.log('Sau khi thêm:', newPatients);
// Sử dụng với bác sĩ
const doctors = [
    { id: 'd1', name: 'Dr. A', specialty: 'Cardiology', role: doctor_1.Role.Doctor }
];
const newDoctor = { id: 'd2', name: 'Dr. B', specialty: 'Dermatology', role: doctor_1.Role.Doctor };
const newDoctors = addItem(doctors, newDoctor);
console.log('Danh sách bác sĩ:', newDoctors);
