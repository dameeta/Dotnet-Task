# Full Stack Inventory Management System
## Project Documentation & Guide

### 1. Project Overview
This is a full-stack web application designed to manage an inventory of items. It allows users to view, add, delete, and update items. The data is persisted locally using a SQLite database.

**Core Features:**
- **GraphQL API**: Efficient data fetching and manipulation.
- **Persistent Storage**: Data is saved to a local SQLite database file.
- **Modern UI**: A responsive, dark-themed React user interface.
- **Real-time Interaction**: Instant updates using Apollo Client.

---

### 2. Technology Stack

#### Backend (Server)
- **Framework**: .NET 8 (ASP.NET Core Web API)
- **Language**: C#
- **Database**: SQLite (via Entity Framework Core)
- **GraphQL Engine**: Hot Chocolate
- **Tools**: Entity Framework Core Tools (for migrations)

#### Frontend (Client)
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **GraphQL Client**: Apollo Client
- **Styling**: Modern CSS3

---

### 3. Implementation Steps & Packages

This section outlines the exact steps taken to build the project, useful for your presentation.

#### Step 1: Backend Initialization
1. **Created Project**: `dotnet new webapi -n InventoryApi`
2. **Clean Project**: Removed default WeatherForecast code and OpenAPI support to focus on GraphQL.

#### Step 2: Installed Backend Packages
We installed the following NuGet packages to enable GraphQL and Database features:
- `HotChocolate.AspNetCore`: For the GraphQL server.
- `HotChocolate.Data`: For sorting, filtering, and projections.
- `Microsoft.EntityFrameworkCore`: ORM core.
- `Microsoft.EntityFrameworkCore.Sqlite`: To use SQLite database.
- `Microsoft.EntityFrameworkCore.Design`: To run database migrations.

#### Step 3: Backend Implementation
1. **Models**: Created `Item.cs` (Id, Name, Type, Quantity).
2. **Database Context**: Created `AppDbContext.cs` inheriting from `DbContext`.
3. **GraphQL Types**:
   - `Query.cs`: Implemented `GetItems` to fetch data.
   - `Mutation.cs`: Implemented `AddItem`, `DeleteItem`, `UpdateQuantity`.
4. **Configuration (`Program.cs`)**:
   - Registered `AppDbContext` with SQLite.
   - Configured GraphQL Server with Projections, Filtering, and Sorting.
   - Enabled CORS to allow the frontend to connect.
5. **Persistence**:
   - Updated `appsettings.json` with `"Data Source=inventory.db"`.
   - Ran migrations (`dotnet ef migrations add InitialCreate`) to generate the database.

#### Step 4: Frontend Initialization
1. **Created Project**: `npm create vite@latest inventory-web -- --template react-ts`
2. **Port Configuration**: Configured `vite.config.ts` to run on port **3000**.

#### Step 5: Installed Frontend Packages
- `@apollo/client`: To communicate with the GraphQL API.
- `graphql`: Core GraphQL parsing logic.

#### Step 6: Frontend Implementation
1. **Client Setup (`client.ts`)**: Configured Apollo Client to connect to `http://localhost:5555/graphql`.
2. **Main UI (`Inventory.tsx`)**: Created a component to:
   - Display items using `useQuery`.
   - Accept input via a form.
   - Perform updates using `useMutation`.
3. **Styling (`App.css`)**: Applied a premium dark-mode aesthetic.

---

### 4. How to Run the Application

#### Prerequisites
- **.NET 8 SDK**
- **Node.js** (v18 or higher)
- **Visual Studio 2022** (Optional, but recommended for Backend)

#### Part A: Start the Backend
1. Open the folder `InventoryApi`.
2. Open the terminal (or PowerShell) in this folder.
3. Run the following command:
   ```powershell
   dotnet run
   ```
   *Alternatively, open `Inventory.sln` in Visual Studio and press **F5**.*
   
   **Status**: The backend will start on **`http://localhost:5555`**.

#### Part B: Start the Frontend
1. Open the folder `inventory-web`.
2. Open a new terminal in this folder.
3. Run:
   ```powershell
   npm run dev
   ```
   
   **Status**: The frontend will start on **`http://localhost:3000`**.

---

### 5. Testing the Application

#### 1. Using the User Interface
- Open your browser to **`http://localhost:3000`**.
- **Add Item**: Type a Name, Type, and Quantity, then click "Add Item".
- **View Items**: The item will immediately appear in the list below.
- **Update**: Click "Update Qty" to change the quantity.
- **Delete**: Click "Delete" to remove an item.
- *Test Persistence*: Stop the backend, restart it, and refresh the page. Your items should still be there!

#### 2. Using GraphQL API Directly (Banana Cake Pop)
- Open **`http://localhost:5555/graphql`**.
- Click "Create Document".
- Try a query like this:
  ```graphql
  query {
    items {
      id
      name
      quantity
    }
  }
  ```
- Click "Run" to see the raw JSON data.
