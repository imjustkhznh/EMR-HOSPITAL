"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var Role;
(function (Role) {
    Role["Doctor"] = "doctor";
    Role["Patient"] = "patient";
})(Role || (exports.Role = Role = {}));
const patients = [
    { id: "1", name: "Nguyễn Văn A", age: 30, gender: 'male', diagnosis: "Fever" },
    { id: "2", name: "Trần Thị B", age: 25, gender: 'female', diagnosis: "Flu" },
    { id: "3", name: "Lê Văn C", age: 40, gender: 'male', diagnosis: "Diabetes" }
];
exports.default = patients;
