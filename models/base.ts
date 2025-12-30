// ISP: Interface Segregation Principle - Tách interfaces nhỏ
export interface IIdentifiable {
  id: string;
}

export interface IPersonInfo {
  name: string;
}

export interface ITimestamped {
  createdAt: Date;
  updatedAt: Date;
}
