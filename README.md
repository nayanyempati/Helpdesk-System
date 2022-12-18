
# Helpdesk Portal

Helpdesk portal is used to manage customer queries and provide support from one centralized location. With helpdesk portal, customers can get answers to their questions quicker and resolve problems with greater ease, and your business can streamline and automate support to save time and money.




## 1. Authors

- [Nayan Yempati - 10623089]
- [Challagundla Sitaram - 10629290]
- [Muppalla Vijaya Kumar - 10626643]
- [Nikhil Kongari - 10627715]


## 2. Architecture
![](https://raw.githubusercontent.com/nayanyempati/Image-Repo/main/architecture.jpg)

**Front-end Application (Angular):** - The front-end application was developed in Angular. Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and its primary purpose is to develop single-page applications. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with. It enables users to create large applications in a maintainable manner.

**Model:** - model is a class that contains the business logic of the application. It also used for accessing data from the database. 

**Controller:** - A controller is responsible for controlling the way that a user interacts with an MVC application.

**Interface:** - An interface looks like a class, but has no implementation. The only thing it contains are declarations of events, indexers, methods and/or properties. 

**Service:** - A Service is the implementation of Interface.

The front-end application is the main interface for which users can interact with it. Any request like login, create an account, forgot password, reset password etc. will interact with the back-end API services using HTTP. The API are developed using the .NET framework and it acts as an endpoint for the API calls made to it. 


The request first received to model and necessary validation are performed in the model and then the request is passed to controller.  The controller forwards the request to Interface and the interface implementation are performed in the service. In Service the database is initialized and any CRUD operations are taken places in the Service. Here CRUD operations are performed using the technology called Entity Framework (Entity Framework (EF) is an object-relational mapper that enables. NET developers to work with relational data using domain-specific objects.)


## 3. Technology Stack
The following are the technologies used for the development of Helpdesk portal.

**1. Front-end Development**
    
- Angular 15.0.0
- Tailwind 3.2.0
- Angular Material 15.0.0


**2. Back-end Development**
    
- .NET 7.0.0
- Entity Framework

**3. Database**
    
- MSSQL (Microsoft SQL Server)

**4. Version Control & Testing**
    
- Git & Postman

**5. Tools Used (IDE)**
    
- Visual Code
- Visual Studio

## 4. Database Schema
![](https://raw.githubusercontent.com/nayanyempati/Image-Repo/main/schema.jpg)

The helpdesk portal contains 1 database with 6 tables that are related to each other. The database was designed to store, update, fetch and delete data from the for the helpdesk portal. We used MSSQL as a database which is a powerful relational database and contains many advanced functionalities like cognitive services.
## API Reference

#### Account Controller

```http
POST /api/account/changepasseword

POST /api/account/requestaccount

POST /api/account/activate/{token}

POST /api/account/forgot/{email}

POST /api/account/reset/{email}/{token}

POST /api/account/login
```

#### Admin Controller

```http
GET /api/admin/listtickets

GET /api/admin/dashboardcount

POST /api/admin/assign/{token}/{userid}

GET /api/admin/viewticket/{token}

GET /api/admin/listemployees

GET /api/admin/listclient

POST /api/admin/addemployee

POST /api/admin/addclient

GET /api/admin/client/{token}

GET /api/admin/client/employees/{id}

POST /api/admin/approveuser/{token}

POST /api/admin/disableuser/{token}

POST /api/admin/enableuser/{token}
```


#### Ticket Controller

```http
GET /api/tickets/clients

GET /api/tickets/view/{token}

GET /api/tickets/commentlist/{tickettoken}

POST /api/tickets/markasresolved/{token}

POST /api/tickets/createcomment/{token}

POST /api/tickets/clients/add

POST /api/tickets/upload
```


#### User Controller

```http
GET /api/user/details
```

API References can be found at https://helpdesk-api.cygate.online/swagger/index.html
## Demo

![](https://github.com/nayanyempati/Image-Repo/blob/main/demo.png?raw=true)

Try the demo portal on https://helpdesk.cygate.online/ 


## Individual Contribution



**[Nayan Yempati 10623089]** - Front end

1. Create angular application - (using the command npm install -g @angular/cli)
1. Creating Routes - (Routes are used for navigation between the components)
2. Creating components, models, services (components: Login, signup, create ticket, view ticket - models: The received  api response is kept in the models, a model can be user a user list, tickets lists, Service: Submitting form data to back end )
3. Consume backend API developed in .Net 7 (data received from the back end )
4. Create Authentication / Authorization based Routing (Preventing users from accessing the authenticated components)
5. Create navigation based on roles (We have creating separate navigation for different roles and those will be automatically redirect to particular navigation once the user login in)
6. Used AuthGuard to prevent unauthorized access to components (Prevent users from accessing internal components without authentication)
7. Create form like Login, register, create ticket etc. 
8. Build front-end app (ng build)



**[Nikhil Kongari 10627715]** - Backend
1. Created .Net 7 Restful API (Used Visual Studio to create .net 7 application)
2. Create controllers, models, interfaces, services - (controller it acts like a mediator between user and application, Model contains definition of a request like a login form contains email and password etc, Interface acts like a mediator between controller and service, using interfaces we can change the request to that need be perform) Service: Service perform the actions like CRUD operations or any database transactions)
3. Configure database in .net for CRUD operations. (We use sql server and entity framework and scaffolding is used for generating database related class)
4. Use Entity Framework for all database transactions (We used EF, to perform transactions with database using LINQ)
5. Create Authentication and Authorization based access to the endpoints (Prevent unauthorized users accessing the API endpoints)
6. Build Application 

**[Challagundla Sitaram 10629290]**- Database and Deployment
1. Create database and tables with various data types like varchar, datetime, int etc. (Used MSSQL to create database and tables and used data types as per the requirements))
2. Design the data flow into the tables as per the requirement (create primary key and data flow sequences, which data to be insert into which tables)
3. Create a Server in AWS for hosting both front end and backend (Created windows server in AWS for hosting the front end and backend)
4. Configure IIS & database servers along with SSL  from Let's Encrypt (We used IIS for web server and MSSQL for database so installed and configured both services)
5. Deploy the build in IIS server (Build from front end and backend is published into webserver) 


**[Muppalla Vijaya Kumar 10626643]**- Testing
1. Understand the functional requirements (Understand how the functionalities should work in the application e.g login, create account, create ticket)
2. Create the test cases and test scenarios (test case is nothing but an action to need be formed on the functionalities, checking the expected behavior can be test scenario. e.g how a login should work, how a create ticket should work ..etc.)
3. Test the application as per the expected behavior (Validate the expected behavior from the functionality)
4. Find functional bugs in both front end and backend (find the issues or bugs that arises during the tests scenarios/actions. e.g if the when valid username and password is used in login form and submitting, he request. If no response is received it can be a bus which can be happened with in backend or frontend) 
5. Assist developer to fix the functional bugs (Discuss with the developer about the actions to performed to identify the bug and assist the developer in fixing the bug)


