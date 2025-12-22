
export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    diagnosis?: string;
}

export enum Role {
    Doctor = 'doctor',
    Patient = 'patient',
}

const patients: Patient[] = [
  { id: "1", name: "Nguyễn Văn A", age: 30, gender: 'male', diagnosis: "Fever" },
  { id: "2", name: "Trần Thị B", age: 25, gender: 'female', diagnosis: "Flu" },
  { id: "3", name: "Lê Văn C", age: 40, gender: 'male', diagnosis: "Diabetes" }
];

export default patients;
