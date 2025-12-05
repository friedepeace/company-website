#!/bin/bash

# Simple script to start the local web server

echo "Starting web server..."
echo "The website will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8000
