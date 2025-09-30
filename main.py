import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from src.models.user import db
from src.routes.user import user_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-string')

# Enable CORS for all routes
CORS(app)

# Initialize JWT
jwt = JWTManager(app)

from src.routes.inventory import inventory_bp
from src.routes.sales_purchases import sales_purchases_bp
from src.routes.customers_suppliers import customers_suppliers_bp
from src.routes.accounting import accounting_bp
from src.routes.users_management import users_management_bp

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(inventory_bp, url_prefix='/api')
app.register_blueprint(sales_purchases_bp, url_prefix='/api')
app.register_blueprint(customers_suppliers_bp, url_prefix='/api')
app.register_blueprint(accounting_bp, url_prefix='/api')
app.register_blueprint(users_management_bp, url_prefix='/api')

# Database configuration
database_url = os.getenv('DATABASE_URL')
if database_url:
    # Handle PostgreSQL URL format for production
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    # Fallback to SQLite for development
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)
