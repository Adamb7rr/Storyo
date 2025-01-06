# Vespera-AI Python Backend Project

This is a backend project built using **Flask** and various other dependencies. The project connects to a database (MongoDB) and uses machine learning models from **Hugging Face's Transformers** library.

## Requirements

This project requires several Python packages, which are listed in the `requirements.txt` file. The `.env` file is used to securely store environment variables such as the database URI.

### Python Packages in `requirements.txt`

- `aiohappyeyeballs==2.4.4`: A package for managing async DNS resolution in Python.
- `aiohttp==3.11.11`: Asynchronous HTTP client/server framework for Python.
- `aiosignal==1.3.2`: Signal handling for asynchronous code.
- `attrs==24.3.0`: A package to manage attributes and generate code for classes.
- `blinker==1.9.0`: A fast and simple object-to-object and broadcast signaling library.
- `Brotli==1.1.0`: Brotli compression algorithm library.
- `certifi==2024.12.14`: A Python package for Mozilla’s CA Bundle.
- `charset-normalizer==3.4.1`: A library for character encoding detection.
- `click==8.1.8`: A package used for creating command-line interfaces.
- `colorama==0.4.6`: A cross-platform package to produce colored terminal text.
- `dnspython==2.7.0`: DNS toolkit for Python.
- `Flask==3.1.0`: A web framework to build the API.
- `Flask-Cors==5.0.0`: A Flask extension for handling Cross Origin Resource Sharing (CORS).
- `frozenlist==1.5.0`: A list data structure that is immutable after creation.
- `g4f==0.3.9.7`: A library for integrating with various AI services.
- `idna==3.10`: A library for handling Internationalized Domain Names (IDN).
- `itsdangerous==2.2.0`: A package for cryptographic signing of data.
- `Jinja2==3.1.5`: A templating engine for Python (used by Flask).
- `MarkupSafe==3.0.2`: A library for escaping HTML, XML, and other markup languages.
- `multidict==6.1.0`: A dictionary-like data structure that supports multiple values for each key.
- `nest-asyncio==1.6.0`: A package to allow nested use of asyncio in Python.
- `propcache==0.2.1`: A caching mechanism for property-based data.
- `pycryptodome==3.21.0`: A self-contained Python package of low-level cryptographic primitives.
- `pymongo==4.10.1`: A MongoDB client to interact with a MongoDB database.
- `python-dotenv==1.0.1`: A library to read key-value pairs from .env files.
- `requests==2.32.3`: A simple HTTP library for Python.
- `urllib3==2.3.0`: A powerful, user-friendly HTTP client for Python.
- `Werkzeug==3.1.3`: A library used by Flask for utility functions.
- `yarl==1.18.3`: Yet Another URL Library, used for working with URLs.

## Setting Up the Project

Follow the steps below to set up and run the backend project:

### 1. Clone the repository

If you haven't cloned the project yet, start by cloning it to your local machine:

```bash
git clone https://github.com/IshantSomani/Vespera-AI-backend.git
cd Vespera-AI-backend
```

### 2. Create and activate a virtual environment

It's recommended to use a virtual environment to manage dependencies.

- For Windows:

```bash
python -m venv venv
.\venv\Scripts\activate
```

- For macOS/Linux:

```bash
python -m venv venv
source venv/bin/activate
```

### 3. Install the required dependencies

Once your virtual environment is activated, install the project dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt
```

This will install the required libraries for the project.

### 4. Set up the `.env` file

Create a `.env` file in the `backend` directory to store sensitive data like the MongoDB URI.

Example `.env` file content:

```plaintext
DATABASE_URI=mongodb://your_username:your_password@localhost:27017/your_database
```

Make sure to replace the `DATABASE_URI` with your actual MongoDB URI.

### 5. Run the Flask Application

Now that everything is set up, you can run the Flask application. The entry point is the `index.py` file or the `wsgi.py` file, depending on your setup.

To run the application, execute the following command:

```bash
python index.py
```

Alternatively, you can use `wsgi.py`:

```bash
python wsgi.py
```

This will start the Flask application, and you should see output indicating that the server is running, typically on `http://127.0.0.1:5000`.

### 6. Access the Application

Once the server is running, you can access the application by visiting `http://127.0.0.1:5000` in your browser or using API tools like Postman.

### 7. Additional Notes

- Make sure your MongoDB server is running and accessible using the `DATABASE_URI` specified in the `.env` file.
- If you use any other external services or APIs (e.g., Hugging Face Transformers), ensure that you have proper API keys or authentication set up in your `.env` file.

## Project Structure Explanation

- **`app.py`**: Contains the main logic of the Flask application, including routes and database operations.
- **`wsgi.py`**: WSGI entry point for running the app with WSGI servers like Gunicorn or uWSGI.
- **`requirements.txt`**: A file that lists all the dependencies for the project.
- **`.env`**: A file to store environment variables, such as the database URI.

## Troubleshooting

- **ModuleNotFoundError**: If you encounter errors related to missing modules, try running `pip install -r requirements.txt` again to ensure all dependencies are installed.
- **Database connection issues**: Ensure your MongoDB server is running, and check that the `DATABASE_URI` in the `.env` file is correct.

---