
# Helpdesk Portal

Helpdesk portal is used to manage customer queries and provide support from one centralized location. With helpdesk portal, customers can get answers to their questions quicker and resolve problems with greater ease, and your business can streamline and automate support to save time and money.




## 1. Authors

- [@Nayan Yempati]()
- [@Challagundla Sitaram]()
- [@Muppalla Vijaya Kumar]()
- [@Nikhil Kongari]()


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
