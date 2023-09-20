# Read me before use!

Our Environment and code now live in one repo - this one!
You can feel free to move your code here.

## First Steps
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
1. Install [node.js](https://nodejs.org/en). Choose the LTS version.
    - You may need to reboot after installation.
1. Make sure you can run `docker version`, `docker-compose version`, and `npm version`
1. Clone this repository.
1. `cd` into the new directory.
1. `cd` into `fronted/`
1. Run `npm install`
1. `cd` into `backend/`
1. Run `npm install`

## Do Every Time
1. `cd` into the repository.
1. Run `docker-compose up -d`
1. Be patient as React may take a few minutes to spin up. Watch the logs on the Docker dashboard. Look for `webpack compiled successfully` which will indicate successful startup of react.

## Where does my code go?
- React code goes in `frontend/src/`
- Express code goes in `backend/`

## How do I see my code?
- The frontend can be viewed at [http://localhost:3000](http://localhost:3000)
- The backend is available at [http://localhost:4000](http://localhost:4000)
- The database is available at [https://localhost](https://localhost)
    - The credentials are root/password

## How do the containers talk to each other?
- Each container is given a hostname that only the other containers are able to use to communicate with.
- They are frontend, backend, mysql, nginx, and php-fpm.
- This is necessary information to make the backend connect to the database, and the frontend connect to the backend.

## Database Info
- Before importing the database, you must create a new DB in PhpMyAdmin called 'tigeropsdata'.
- Select the database by clicking on it on the left hand side of the screen.
- Import the tables using Steven's `.sql` file provided in Discord.

## Installing Node Packages
- Run `docker-compose down`
- `cd` into `frontend/` or `backend/` and run `npm install PACKAGE_NAME`.
- Run `docker-compose build`
- Restart the containers.

## Some troubleshooting steps
- If the Docker daemon won't run (Windows), run `wsl --update`
- If the containers fail to build and there is an error with port 3306, kill the mysql service running on your host.
- If you see `react-scripts not found` or something similar, run `npm install` in `frontend/` and in `backend/`. Run `docker-compose build` afterwards.

## Optimizing the React container
- On Windows, I recommend adding a Windows Defender exclusion to the repo's folder as React will compile two times faster.
