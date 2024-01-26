#!/bin/bash
# Activate the virtual environment and start Flask app
echo "Starting Flask app..."
. venv/bin/activate
flask run --host=0.0.0.0
