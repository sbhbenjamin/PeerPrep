[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UxpU_KWG)
# ServerlessTemplate

# Quick Start Guide
Each service has to be launched on a separate Terminal instance. All commands start from the project root directory.

## Install all dependencies and setup Husky
```
pnpm i
```

## User Service
1. Navigate to `user-service`.
   
   ```
   cd services/user-service
   ```
2. Create enviroment variables.
    ```
    echo "DATABASE_URL=postgres://<username>:<password>@localhost:<port>/<db-name>?schema=public" >> .env
    echo "PORT=<user-service-port>" >> .env
    ```
3. Install dependencies.
    ```
    npm ci
    ```
4. Run databases on docker
    ```
    docker compose up --build -d
    ```

5. Run microservice.
   ```
   npm run dev
   ```

## Question Service
1. Navigate to `question-service`.
   
   ```
   cd services/question-service
   ```
2. Install dependencies.
    ```
    npm ci
    ```

4. Run microservice.
   ```
   npm run dev
   ```

## Collaboration Service
1. Navigate to `question-service`.
   
   ```
   cd services/collab-service
   ```
2. Install dependencies.
    ```
    npm ci
    ```

3. Run microservice.
   ```
   npm run dev
   ```

## Matching Service
1. Navigate to `matching-service`.
   
   ```
   cd services/matching-service
   ```
2. Install dependencies.
    ```
    npm ci
    ```
3. Run microservice.
   ```
   npm run dev
   ```

## Frontend
1. Navigate to `frontend`.
   
   ```
   cd frontend
   ```
2. Install dependencies.
    ```
    npm ci
    ```
3. Create enviroment variables.
    ```
    echo "NEXT_PUBLIC_GITHUB_CLIENT_ID=<Your GitHub OAuth client ID>" >> .env
    echo "NEXT_PUBLIC_GITHUB_CLIENT_SECRET=<Your GitHub OAuth client secret>" >> .env
    echo "NEXTAUTH_SECRET=<Generate a secret>" >> .env
    echo "NEXTAUTH_URL=http://localhost:<frontend-port>" >> .env
    echo "NEXT_PUBLIC_USERS_MICROSERVICE_URL=localhost:<user-service-port>" >> .env
    echo "NEXT_PUBLIC_QUESTION_SERVICE_ADDRESS=localhost:<questions-service-port>" >> .env
    ```

4. Run microservice.
   ```
   npm run dev
   ```
5. Go to `http://localhost:3000` on your browser to access the frontend.
