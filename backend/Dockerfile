FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Create a non-root user
RUN useradd -m appuser

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source
COPY . .

# Ensure uploads directory exists and is writable by the non-root user
RUN mkdir -p uploads/config && chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
