[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UxpU_KWG)
# ServerlessTemplate

# Quick Start Guide
Each service has to be launched on a separate Terminal instance. All commands start from the project root directory.

## User Service
1. Navigate to `user-service`.
   
   ```
   cd services/user-service
   ```
2. Install dependencies.
    ```
    npm ci
    ```
3. Initialize Prisma Client.

	 ```
	 npx prisma generate
	 ```

4. Run microservice.
   ```
   npx run dev
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
3. Initialize Prisma Client.

	 ```
	 npx prisma generate
	 ```

4. Run microservice.
   ```
   npx run dev
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
   npx run dev
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
    echo "NEXT_PUBLIC_GITHUB_CLIENT_ID=<Your GitHub OAuth client ID>" >> .env.local
    echo "NEXT_PUBLIC_GITHUB_CLIENT_SECRET=<Your GitHub OAuth client secret>" >> .env.local
    echo "NEXT_PUBLIC_USERS_MICROSERVICE_URL=http://localhost:2000" >> .env.local
    ```

4. Run microservice.
   ```
   npx run dev
   ```
5. Go to `http://localhost:2000` on your browser to access the frontend.
