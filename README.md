# NextRole: Job Portal Microservices

NextRole is a robust, microservices-based Job Portal application designed to connect **Applicants** and **Employers**. It utilizes a modern distributed architecture to handle authentication, job management, real-time notifications, and user profiles seamlessly.

## 🔗 Live Demo

You can explore the live application at the link below:

**[NextRole Job Portal](https://jobportalfrontend-4p43.onrender.com/)**

---

## 🏗 System Architecture

The project is composed of 11 distinct services and modules:

### Infrastructure Services

* **Eureka Server:** Service registration and discovery.
* **Config Server:** Centralized external configuration.
* **API Gateway:** Unified entry point with routing and security (Port 8080).

### Business Services

* **Auth Service:** JWT-based Authentication and Authorization.
* **User Service:** Manages user accounts and roles.
* **Profile Service:** Handles detailed user profiles.
* **Job Service:** Core logic for job categories, job postings, and offers.
* **Notification Service:** Real-time alerts via Kafka/RabbitMQ.
* **AI Service:** Intelligent job matching or data processing.
* **Message Service:** Internal communication between users.

### Storage

* **Common File Storage:** Centralized module for file/image uploads.

---

## 🛠 Tech Stack

* **Backend:** Java, Spring Boot, Spring Cloud (Gateway, Config, Eureka, Feign)
* **Frontend:** TypeScript (React/Next.js)
* **Security:** Spring Security, JWT
* **Databases:** MySQL (Relational), MongoDB (NoSQL)
* **Messaging:** Apache Kafka, RabbitMQ
* **DevOps:** Docker, Docker Compose
* **Utilities:** Lombok, ModelMapper, Validation API

---

## 🔌 API Reference

All requests should be directed to the API Gateway at `http://localhost:8080`.

### 👥 User Service (`/users/**`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/users/register` | Register a new user account. |
| `POST` | `/users/login` | Login for user verification (Returns UserDTO). |
| `POST` | `/users/changePass` | Change current user password. |
| `GET` | `/users/getUser/{id}` | Retrieve user details by unique ID. |
| `GET` | `/users/email?email=...` | Retrieve user details by email (Query Param). |
| `DELETE` | `/users/delete/{id}` | Remove a user account from the system. |

### 🔐 Auth Service (`/auth/**`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/login` | Authenticate and obtain JWT Bearer Token. |
| `POST` | `/auth/sendOtp/{email}` | Send a 6-digit OTP for account verification. |
| `GET` | `/auth/verifyOtp/{email}/{otp}` | Verify the OTP sent to the user's email. |

### 💼 Job Service (`/jobs/**`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/jobs/postJob` | Create a new job listing (Employer). |
| `GET` | `/jobs/getAllJobs` | Fetch all available job listings. |
| `GET` | `/jobs/getJob/{id}` | Get detailed info for a specific job. |
| `POST` | `/jobs/applyJob/{id}` | Submit an application for a job. |
| `GET` | `/jobs/postedBy/{id}` | Get all jobs posted by a specific user. |
| `POST` | `/jobs/changeAppStatus` | Update application status (Shortlisted/Rejected). |

### 👤 Profile Service (`/profiles/**`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/profiles/create` | Initialize profile after registration. |
| `GET` | `/profiles/get/{userId}` | Get profile data (Applicant or Employer). |
| `PUT` | `/profiles/update` | Update Applicant profile details. |
| `PUT` | `/profiles/updateEmp` | Update Employer profile details. |

---

## 🚀 Installation & Setup

1. **Start Infrastructure:** Ensure Docker is running and start databases/Kafka using `docker-compose up -d`.
2. **Eureka Server:** Start the Discovery service first.
3. **Config Server:** Start to provide configuration to other services.
4. **Business Services:** Start `authservice`, `userservice`, `jobservice`, etc.
5. **API Gateway:** Start last to route traffic to the registered services.

---

## 🛠 Troubleshooting

* **503 Service Unavailable:** Wait 30-60 seconds for Eureka to sync. Check the dashboard at `http://localhost:8761`.
* **401 Unauthorized:** Ensure the `Authorization` header is formatted as `Bearer <token>`.
* **Database Connection:** Verify MySQL (3306) and MongoDB (27017) containers are healthy.

---

