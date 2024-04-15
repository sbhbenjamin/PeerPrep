# PeerPrep
![Code Quality Tests](https://github.com/CS3219-AY2324S1/ay2324s1-assignment-6-g38/actions/workflows/lint.yml/badge.svg)
![Functional Tests](https://github.com/CS3219-AY2324S1/ay2324s1-assignment-6-g38/actions/workflows/test.yml/badge.svg)

PeerPrep is a platform that matches developers to conduct mock technical interviews. It features real-time matching between two clients, live-chat between two connected users, and a Question-of-the-day feature to make it easy for you to get started solving problems quickly!

<table>
  <tr>
    <td>
      <img src="https://github.com/sbhbenjamin/PeerPrep/assets/34487322/e7a5073c-e134-4cbd-8d43-06de0a948cf3" alt="Landing Page" width="100%">
      <p align="center"><i>Landing Page - The main entry point for PeerPrep users, showcasing the initial interface.</i></p>
    </td>
    <td>
      <img src="https://github.com/sbhbenjamin/PeerPrep/assets/34487322/2a3d6f1f-e750-427d-9c3d-f213586e8ca6" alt="Dashboard" width="100%">
      <p align="center"><i>Dashboard - Users can view their progress, history, or get started tackling the Question of the Day</i></p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/sbhbenjamin/PeerPrep/assets/34487322/cb630abe-f6bc-47dc-87cd-222c58c251d7" alt="Matching Page" width="100%">
      <p align="center"><i>Matching Page - Where users are matched with peers for conducting mock interviews.</i></p>
    </td>
    <td>
      <img src="https://github.com/sbhbenjamin/PeerPrep/assets/34487322/e98b2bb4-d196-4b1e-8705-a7d7bf9877a6" alt="Questions Repository" width="100%">
      <p align="center"><i>Questions Repository - A repository of questions for admins to add and manage questions.</i></p>
    </td>
  </tr>
</table>



# Quick Start Guide
Our development setup revolves around Docker, where all backend services are dockerised in a single `docker-compose`. This setup allows for hot-reloading as well, as the containers are setup with volumes that point to the respective directories. This means that if a file changes in the directory, it will be reflected within the container as they are pointing to the same files. As such, we have to do the necessary setups for each service before running the containers. This setup could include installing dependencies, setting up the database clients, etc. For this, we have defined convenience scripts for the ease of setup.

The frontend does not support containerisation due to certain quirks with Next.js 13, thus you can run it standalone in your terminal.

## Setup root dependencies
The root `package.json` defines some convenience scripts that we will be using during development. To set them up, we have to install the root dependencies first.
```
npm install
```

## Setup all services
We automate `npm i` in all services through a convenience script that can be used in the root directory. This runs `npm i` in all of the microservices concurrently, and runs post-scripts i.e. `postinstall` in all of them as well to setup the databases, etc.
```
npm run install:services
```

## Setup Frontend
1. Navigate to `services/frontend`.
   
   ```
   cd frontend
   ```
2. Create a `.env` with the following attributes
    ```
   NEXT_PUBLIC_SERVICE_USER_URL=localhost:2001
   NEXT_PUBLIC_SERVICE_QUESTION_URL=localhost:5001
   NEXT_PUBLIC_SERVICE_HISTORY_URL=localhost:1001
   NEXT_PUBLIC_GITHUB_ClIENT_ID=/** fill this in */
   NEXT_PUBLIC_GITHUB_CLIENT_SECRET=/** fill this in */
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=/** fill this in */
    ```

## Start all services
The following command requires Docker (we recommend installing [Docker Desktop](https://www.docker.com/products/docker-desktop/)). This command will spin up the containers defined in the `docker-compose.dev.yml`, as well as running the frontend.
1. Run all services
```
npm run dev
```
2. Go to `http://localhost:3000` on your browser to access the frontend.
3. If you encounter any odd issues, check that all of your containers are running via Docker Desktop

# Troubleshooting
## Docker
If you encounter any issues with the containers, we have defined convenience scripts to remove the volumes, prune them, etc.
```
/** in root directory */

// stops all running containers
npm run stop

// restarts the containers
npm run restart

// removes the volumes attached to the containers and stops them
npm run cleanup
```
