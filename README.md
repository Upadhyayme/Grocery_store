# Grocery 🛒Store Management Web Application 
This is a full-stack Grocery Store Management System built as a 3-tier architecture project using:
Frontend: HTML, CSS, JavaScript, Bootstrap
Backend: Python (Flask)
Database: MySQL
It allows users to manage grocery store operations such as managing products, placing and tracking orders, and handling units of measurement (UOM). The application is modular, scalable, and user-friendly.

# 📁 Project Structure

# grocery-webapp/
├── static/
│   ├── bootstrap.min.css
│   ├── bootstrap.js
│   ├── common.js
│   ├── custom.css
│   ├── dashboard.js
│   ├── juery.js
│   ├── order.js
│   ├── manage-product.js
│   ├── sidebar-menu.css
│   ├── style.css
│   └── homepage.jpeg
├── templates/
│   ├── index.html
│   ├── manage-product.html
│   └── order.html
├── server.py                  # Main Flask app
├── sql_connection.py          # MySQL connection config
├── products_dao.py             # Product data access
├── orders_dao.py               # Order data access
├── uom_dao.py                # UOM (Unit of Measurement) data access
├── README.md
└── requirements.txt          # Optional: store dependencies

# Features :
# 🛍️ Products Management
View, Add, Edit, Delete products
Add and assign Units of Measurement (UOM) like kg, liter, cubic meter
UOM addition handled via both UI (manage product.html) and backend (eom-dao.py)

# 📦 Orders Management
Place new orders with multiple items
Client-side validation: Customer name, valid product entries, positive quantity
Fixes implemented for bugs related to total update when changing quantity/price
View full details of any order using the View button

# Connector	: mysql-connector-python

# 🚀 Installation Instructions
# 📌 Prerequisites
  Python 3.7+
  MySQL Server
  pip (Python package manager)

# 🔧 Setup Steps
Install MySQL (Windows): Download MySQL Installer
# Install Python Dependencies:
pip install -r requirements.txt
# Setup MySQL Database:
Create a new database named grocery_db
Import the schema from database/schema.sql (or equivalent script)

# View Order Details:
Added View button in the order list.
Displays full item list with quantity, price, and subtotal.

# 📌 Future Improvements
User login system (Admin vs Staff)
Pagination and filtering for product/order lists
Export reports (PDF/CSV)
REST API support for mobile access





