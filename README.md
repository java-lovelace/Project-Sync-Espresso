# Project Sync 🚀

Project Sync is a full-stack web application designed to centralize the registration, tracking, and management of organizational projects. It provides a simple and intuitive interface to perform CRUD (Create, Read, Update, Delete) operations on projects.

## Features ✨

*   **Project Management:** Create, view, edit, and delete projects. 📝
*   **Intuitive UI:** A clean and professional user interface built with Tailwind CSS. 🎨
*   **RESTful API:** A well-defined RESTful API for managing projects. 🌐

## Technologies Used 🛠️

### Backend ☕

*   **Java 17:** The core programming language for the backend. 
*   **Spring Boot:** The framework used to build the backend application. 
*   **Spring Data JPA:** For data persistence and communication with the database. 
*   **Maven:** For project dependency management. 

### Frontend 🖥️

*   **HTML5 & CSS3:** The standard markup and styling languages for the web. 
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development. 
*   **JavaScript (ES6+):** For client-side logic and interactivity. 

## Getting Started 🚀

To get a local copy up and running, follow these simple steps.

### Prerequisites ✅

*   **Java Development Kit (JDK) 17 or later**
*   **Apache Maven**
*   **A MySQL database** (or any other relational database supported by Spring Data JPA)

### Installation ⚙️

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/project-sync-espresso.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd project-sync-espresso
    ```
3.  **Configure the database:**
    Open the `src/main/resources/application.properties` file and update the database connection properties:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
    spring.datasource.username=your_database_username
    spring.datasource.password=your_database_password
    spring.jpa.hibernate.ddl-auto=update
    ```

### Running the Application ▶️

1.  **Build the project:**
    ```sh
    mvn clean install
    ```
2.  **Run the Spring Boot application:**
    ```sh
    mvn spring-boot:run
    ```
3.  **Access the application:**
    Open your web browser and navigate to `http://localhost:8080`.

## API Endpoints 🔗

The backend provides the following RESTful API endpoints for managing projects:

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| `GET`    | `/api/projects`    | Get all projects.          |
| `GET`    | `/api/projects/{id}` | Get a project by ID.       |
| `POST`   | `/api/projects`    | Create a new project.      |
| `PUT`    | `/api/projects/{id}` | Update an existing project.|
| `DELETE` | `/api/projects/{id}` | Delete a project by ID.    |

## Frontend 🌐

The frontend is built with plain HTML, CSS (Tailwind CSS), and JavaScript. It consists of a single `index.html` file that communicates with the backend API to perform CRUD operations. The JavaScript code is located in the `src/main/resources/static/js/app.js` file.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.