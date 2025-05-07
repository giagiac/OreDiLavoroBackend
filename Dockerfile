# 1. Development stage: Build the application
FROM node:20-alpine AS development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the TypeScript application
RUN npm run build

# 2. Production stage: Setup the final image
FROM node:20-alpine AS production

# Set environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies and ignore scripts
# If you have Oracle dependencies requiring LD_LIBRARY_PATH, ensure the production environment or base image has them.
# Consider adding RUN apk add --no-cache libaio if Oracle Instant Client is needed and not in the base image.
RUN npm install --omit=dev --ignore-scripts

# Copy the built application from the development stage
COPY --from=development /app/dist ./dist

# Expose the port the app runs on (default 3000, but can be overridden by .env)
EXPOSE 3000

# Command to run the application
# This uses the 'start:prod' script from package.json
CMD ["npm", "run", "start:prod"]