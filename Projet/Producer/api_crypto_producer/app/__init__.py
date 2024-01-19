from flask import Flask
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)

# Importing routes
from .routes import coin_routes

# Registering blueprints
app.register_blueprint(coin_routes)

# Any other app configuration can go here
