# Spring Boot Microservices Project
(Eureka Server, Config Server, API Gateway, Kafka, File Storage, JWT, Authentication, Authorization, Redis, Docker)

# About the project

<ul style="list-style-type:disc">
  <li>This project is based Spring Boot Microservices</li>
  <li>This is a Job Portal Application</li>
  <li>User can register and login through auth service by user role (APPLICANT or EMPLOYER) through api gateway</li>
  <li>User can send any request to relevant service through api gateway with its bearer token</li>
</ul>

10 services whose name are shown below have been devised within the scope of this project.

- Config Server
- Eureka Server
- API Gateway
- Auth Service
- User Service
- Profile Service
- Job-Post Service
- Job-Apply Service
- AI Service
- Notification Service
- Message Service


### Used Dependencies

* Core
    * Spring
        * Spring Boot
        * Spring Security
            * Spring Security JWT
            * Authentication
            * Authorization
        * Spring Web
            * FeignClient
        * Spring Data
            * Spring Data JPA
            * PostgreSQL
        * Spring Cloud
            * Spring Cloud Gateway Server
            * Spring Cloud Config Server
            * Spring Cloud Config Client
    * Netflix
        * Eureka Server
        * Eureka Client
* Database
    * PostgreSQL
    * MongoDB
* Kafka
* RabbitMQ
<!-- * Redis -->
* Docker 
* Validation
<!-- * File storage -->
* ModelMapper
<!-- * Openapi UI -->
* Lombok
* Slf4j









DUE


