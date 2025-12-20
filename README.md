# EMR System (Electronic Medical Records)

## Overview
EMR System là hệ thống quản lý hồ sơ bệnh án điện tử, cho phép bác sĩ và nhân viên y tế quản lý thông tin bệnh nhân một cách an toàn và hiệu quả.

## Architecture
Hệ thống được xây dựng theo mô hình Client – Server – Database:

- **Client (Frontend)**:  
  React / NextJS  
  - Giao diện người dùng  
  - Gửi HTTP/HTTPS request (REST API)

- **API Server (Backend)**:  
  NestJS  
  - Xử lý nghiệp vụ (bệnh nhân, bệnh án, bác sĩ)  
  - Cung cấp RESTful API  
  - Xác thực & phân quyền

- **Database**:  
  MongoDB  
  - Lưu trữ dữ liệu bệnh nhân và hồ sơ bệnh án  
  - Dữ liệu dạng document (JSON-like)

## Architecture Flow
Client (Browser)  
→ HTTP/HTTPS Request  
→ NestJS API Server  
→ MongoDB  
→ HTTP/HTTPS Response (JSON)

## Tech Stack
- Frontend: React / NextJS
- Backend: NestJS
- Database: MongoDB
- Communication: RESTful API (JSON over HTTP/HTTPS)

## Notes
Dự án được xây dựng theo từng giai đoạn để phục vụ mục tiêu học tập và phát triển hệ thống EMR hoàn chỉnh.
