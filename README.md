# SimpleInventory - Veggie Store Management System

SimpleInventory is a full-stack web application designed to manage a list of vegetable products. It features a **.NET 9.0 (ASP.NET Core) Web API** backend and a simple HTML, CSS, and JavaScript frontend. This project showcases expertise in backend development with .NET, data persistence with MS-SQL (via Entity Framework Core), and considerations for cloud deployment.

## Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
  - [Backend Development (.NET Core)](#backend-development-net-core)
  - [Database (MS-SQL & EF Core)](#database-ms-sql--ef-core)
  - [Frontend Development](#frontend-development)
  - [Cloud Deployment Considerations](#cloud-deployment-considerations)
- [API Endpoint Details](#api-endpoint-details)
- [Setup and Running](#️-setup-and-running-the-application)
  - [Prerequisites](#prerequisites)
  - [Backend API Setup](#1-backend-api-setup)
  - [Frontend UI Setup](#2-frontend-ui-setup)
- [Contribution](#-contribution)

Features

*   **Product Management (CRUD Operations):**
    *   **Create:** Add new veggie products by selecting from a predefined list, and specifying price and quantity.
    *   **Read:** View a comprehensive list of all available veggie products with their details.
    *   **Update:** Modify the name, price, or quantity of existing products.
    *   **Delete:** Remove products from the inventory.
*   **Simple & Responsive UI:** A clean, intuitive, and visually appealing user interface built with HTML, CSS, and Vanilla JavaScript.
*   **API-Driven Architecture:** The frontend dynamically interacts with the backend through a well-defined RESTful API.
*   **API Documentation:** Integrated Swagger/OpenAPI documentation for easy API exploration and testing.

 Technologies Used

This project was developed to demonstrate proficiency in the following key technologies, aligning with the requirements for backend development roles:

### Backend Development (.NET Core)

*   **Framework:** **ASP.NET Core 9.0 Web API**
    *   Demonstrates building robust and scalable RESTful APIs.
    *   Utilizes `async/await` for efficient, non-blocking I/O operations.
    *   Leverages Dependency Injection for managing services like `ApplicationDbContext`.
*   **Language:** C#
*   **API Documentation:** Swagger/OpenAPI via `Swashbuckle.AspNetCore` for interactive API documentation.

### Database (MS-SQL & EF Core)

*   **ORM:** Entity Framework Core
    *   Manages data models (e.g., `Product` entity).
    *   Handles database migrations and schema management.
    *   Performs CRUD operations against the database.
*   **Database Provider:** `Microsoft.EntityFrameworkCore.SqlServer` for MS-SQL Server.
*   **Development/Testing:** `Microsoft.EntityFrameworkCore.InMemory` is used for rapid local development and testing, showcasing flexibility in database provider configuration.

### Frontend Development

*   **HTML5:** Semantic markup for structuring the web page.
*   **CSS3:** Custom styling for a modern and responsive "Veggie Store" theme.
*   **JavaScript (Vanilla JS):**
    *   Dynamic DOM manipulation to render product lists and forms.
    *   Asynchronous `fetch` API calls for communication with the backend.
    *   Client-side form handling and event listeners.

### Cloud Deployment Considerations

The application is designed with cloud-native principles, making it suitable for deployment on platforms like Azure or AWS:
*   **Azure:**
    *   Backend API: Deployable to Azure App Service.
    *   Database: Azure SQL Database can host the MS-SQL database.
*   **AWS:**
    *   Backend API: Deployable to AWS Elastic Beanstalk or as a container on ECS/EKS.
    *   Database: AWS RDS for SQL Server.
*   **Stateless API:** The API is stateless, facilitating horizontal scaling in a cloud environment.

## API Endpoint Details

The backend API provides the following endpoints under the base path `/api/Products`:

*   **`GET /api/Products`**: Retrieves a list of all products.
*   **`GET /api/Products/{id}`**: Retrieves a specific product by its ID.
*   **`POST /api/Products`**: Creates a new product.
    *   Request Body: `Product` object (e.g., `{ "name": "Carrot", "price": 1.99, "quantity": 100 }`)
*   **`PUT /api/Products/{id}`**: Updates an existing product by its ID.
    *   Request Body: `Product` object (e.g., `{ "id": 1, "name": "Organic Carrot", "price": 2.49, "quantity": 90 }`)
*   **`DELETE /api/Products/{id}`**: Deletes a product by its ID.

 Setup and Running the Application

This project consists of two main parts: the Backend API and the Frontend UI.

### Prerequisites

*   .NET 9.0 SDK (or newer)
*   A code editor like VS Code or Visual Studio.
*   (Optional) SQL Server instance if you wish to use a persistent database beyond the in-memory provider.
*   (Optional) Live Server extension for VS Code for easy frontend development.

### 1. Backend API Setup

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd SimpleInventory
    ```
2.  **Navigate to the Backend Project:**
    ```bash
    cd SimpleInventory # This is the .NET project folder
    ```
3.  **Restore Dependencies:**
    ```bash
    dotnet restore
    ```
4.  **Configure Database (Optional):**
    *   By default, the application uses an in-memory database.
    *   To use SQL Server, update the connection string in `appsettings.json` and ensure the `ApplicationDbContext` in `Program.cs` (or `Startup.cs` if applicable) is configured to use SQL Server. You might need to run EF Core migrations:
        ```bash
        dotnet ef database update
        ```
5.  **Run the Backend API:**
    ```bash
    dotnet run
    ```
    The API will typically start on `http://localhost:5181` (or a similar port specified in `launchSettings.json`).
    You can access the Swagger UI for API testing at `http://localhost:5181/swagger`.

### 2. Frontend UI Setup

1.  **Navigate to the Frontend Folder:**
    From the root `SimpleInventory` directory:
    ```bash
    cd SimpleGroceryFrontend
    ```
2.  **Update API Base URL (if necessary):**
    Open `SimpleGroceryFrontend/script.js` and ensure the `API_BASE_URL` constant points to your running backend API. The default is usually correct if the backend runs on port 5181:
    ```javascript
    const API_BASE_URL = 'http://localhost:5181/api/Products';
    ```
3.  **Open in Browser:**
    *   **Using Live Server (Recommended for development):** If you have the Live Server extension in VS Code, right-click `SimpleGroceryFrontend/index.html` and select "Open with Live Server".
    *   **Directly:** Open the `SimpleGroceryFrontend/index.html` file in your web browser.

    *Note on CORS:* The backend's `Program.cs` should be configured to allow requests from the frontend's origin (e.g., `http://127.0.0.1:5500` if using Live Server, or `null` if opening `index.html` directly as a file). The provided `ProductsController.cs` does not show explicit CORS configuration, this is typically done in `Program.cs`.

