# Storyo - AI Storytelling

- Welcome to **Storyo**, an AI-driven platform for generating creative stories based on user inputs.


  ![image alt](https://github.com/Adamb7rr/Storyo/blob/e765a1a348367494e9142cbaa9063447f2e247c3/frontend/src/images/Home.png)
  ![image alt](https://github.com/Adamb7rr/Storyo/blob/8327d526f18df49088e487c8d7af74b4ca3cf083/frontend/src/images/Stories.png)
  ![image alt](https://github.com/Adamb7rr/Storyo/blob/8327d526f18df49088e487c8d7af74b4ca3cf083/frontend/src/images/HowToUse.png)

- This README provides an overview of how to run and use the project,   including setup instructions for both the frontend and backend.
-------

## Technologies Used

- **Frontend**:
  - Vite (build tool)
  - React.js (UI framework)
  - Tailwind CSS (styling)
  
- **Backend**:
  - Flask (web framework)
  - MongoDB (database)
  - Hugging Face Transformers (for AI-driven story generation)

---

## Features

### Frontend Features:
1. **Story Generation**:
   - **Input Fields**: Users can enter a **story prompt**, select a **story genre** (Fantasy, Sci-Fi, Mystery, General), choose a **story length**, and set the **creativity level**.
   - **Generate Story**: Once the inputs are filled, users can click the **Generate Story** button to receive a generated story with a **title** and **body**.
   - **Buttons**:
     - **Copy**: Copy the generated story to the clipboard.
     - **New Story**: Generate a new story with updated inputs.
     - **Save Story**: Save the generated story to the database.

2. **View Saved Stories**: Users can view previously saved stories stored in the MongoDB database by clicking the **View Saved Stories** button.

3. **How to Use Storyo **: The frontend includes a section to explain how to use the platform along with **prompt examples** to help users generate interesting stories.

### Backend Features:
1. **Flask API**: 
   - Handles the story generation logic and interactions with the database.
   - Exposes RESTful endpoints for frontend communication (e.g., saving, retrieving stories).

2. **MongoDB**: 
   - Stores the generated stories, including their title, body, genre, and length.

3. **Machine Learning**:
   - Integrates with **Hugging Face's Transformers** to generate creative story content based on the user's inputs.

---

## Project Setup

### Prerequisites

Before getting started, make sure you have the following installed:
- **Node.js** (for the frontend)
- **npm** or **yarn** (for frontend dependency management)
- **Python** (for the backend)
- **MongoDB** (either locally or using a cloud service like MongoDB Atlas)
- **Flask** (for the backend)

## Backend Setup

1. **Clone the Repository**

   If you haven't cloned the project yet, start by cloning it to your local machine:

   ```bash
   git clone https://github.com/Adamb7rr/Storyo
   cd backend
   ```

2. **Create and Activate a Virtual Environment**

   It's recommended to use a virtual environment to manage dependencies.

   - For **Windows**:

   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

   - For **macOS/Linux**:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install the Required Dependencies**

   Once your virtual environment is activated, install the project dependencies from `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

   This will install all necessary libraries for the backend project.

4. **Set Up the `.env` File**

   Create a `.env` file in the `backend` directory to securely store sensitive data, such as the MongoDB URI.

   Example `.env` file content:

   ```plaintext
   DATABASE_URI=mongodb://your_username:your_password@localhost:27017/your_database
   ```

   Replace `your_username`, `your_password`, and `your_database` with your MongoDB connection details.

5. **Run the Flask Application**

   After everything is set up, you can run the Flask application. The entry point is the `index.py` file or the `wsgi.py` file.

   To run the application, execute the following command:

   ```bash
   python index.py
   ```

   Or alternatively, use `wsgi.py`:

   ```bash
   python wsgi.py
   ```

   This will start the Flask backend server, typically accessible at `http://127.0.0.1:5000`.

6. **Access the Application**

   Once the server is running, you can access the API by visiting `http://127.0.0.1:5000` or using API tools like **Postman**.

---

## Frontend Setup

1. **Clone the Repository**

   If you haven't cloned the project yet, clone it to your local machine:

   ```bash
   git clone https://github.com/Adamb7rr/Storyo
   cd frontend
   ```

2. **Install the Dependencies**

   Navigate to the **frontend** directory and install the necessary dependencies using **npm** or **yarn**:

   ```bash
   cd frontend
   npm install
   ```

3. **Configure the Backend URL**

   In the **frontend** folder, create a `.env` file to store the backend URL for the API. For example:

   ```plaintext
   VITE_API_URI=http://127.0.0.1:5000
   ```

4. **Run the Frontend**

   Start the Vite development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running at `http://localhost:3000`.

---

## API Endpoints (Backend)

Here are the main API endpoints exposed by the backend:

- **POST /generate-story**: Generates a new story based on input parameters (prompt, genre, length, creativity).
- **GET /saved-stories**: Retrieves the list of saved stories from the MongoDB database.
- **POST /save-story**: Saves a generated story to the MongoDB database.

---

## How to Use Storyo

1. **Enter Story Inputs**:
   - **Story Prompt**: Provide a brief description of what you want your story to be about.
   - **Story Genre**: Choose from Fantasy, Sci-Fi, Mystery, or General.
   - **Story Length**: Choose the desired length of the story.
   - **Creativity Level**: Set the creativity level (e.g., high, medium, low).

2. **Generate Story**: Click the **Generate Story** button to see the generated story with a **title** and **body**.

3. **Story Options**:
   - **Copy**: Copy the generated story to your clipboard.
   - **New Story**: Generate a new story based on updated inputs.
   - **Save Story**: Save the story to the MongoDB database for future reference.

4. **View Saved Stories**: Click on **View Saved Stories** to see previously saved stories in the database.

5. **How to Use Section**: Click on **How to Use Storyo AI** to see an explanation of how to interact with the platform, along with **prompt examples** to get creative story ideas.

---

## Troubleshooting

- **ModuleNotFoundError**: If you encounter errors related to missing modules, ensure all dependencies are installed by running `pip install -r requirements.txt` for the backend and `npm install` for the frontend.
- **Database Connection Issues**: Ensure your MongoDB server is running, and verify that the `DATABASE_URI` in the `.env` file is correct.

---

## Acknowledgments

- Special thanks to the open-source libraries and tools used in this project, including **Flask**, **MongoDB**, and **Hugging Face Transformers**.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---
