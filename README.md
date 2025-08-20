# Microservices

## 1. User Service   - MySQL
## 2. Auth Service   - MySQL
## 3. Profile Service (Only For APPLICANT)   - MongoDB
## 4. JobPost Service   - MongoDB
## 5. JobApply Service  - MongoDB
## 6. Notification Service  
## 7. Message Service 
## 8. AI Service (For Resume Checker)




## Kafka
- I use Kafka to connect userservice and profileservice that whenever user register APPLICANT accountType Profile will be created

- To run Kafka 
```bash
docker compose up -d

```