#!/bin/bash

# buu.fun MCP Server Run Script

echo "Starting Buu MCP Server..."

# Check if the dist directory exists, if not, build the project
if [ ! -d "./dist" ]; then
    echo "Dist directory not found. Building project..."
    npm run build
fi

# Check if BUU_TEAM_API_KEY is set
if [ -z "$BUU_TEAM_API_KEY" ]; then
    # Try to load from .env file
    if [ -f ".env" ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    # Check again if BUU_TEAM_API_KEY is set
    if [ -z "$BUU_TEAM_API_KEY" ]; then
        echo "Error: BUU_TEAM_API_KEY environment variable not set."
        echo "Please set your API key using: export BUU_TEAM_API_KEY=your_api_key"
        echo "Or create a .env file with BUU_TEAM_API_KEY=your_api_key"
        exit 1
    fi
fi

# Run the server
echo "Running server..."
node dist/index.js 
