# Infrastructure Documentation
- Currently, our application is hosted on [hostinger.com](https://hostinger.com).
- The pricing and featureset made this platform ideal for our needs. Our tech stack is fairly complicated (multiple NodeJS applications and a database), so most free services do not suffice.
- Hostinger provides a Virtual Private Server (VPS). The VPS we are usung is Ubuntu Server-based.
- Software being used:
    - MySQL (Database)
    - ReactJS (Frontend NodeJS application)
    - ExpressJS (Backend NodeJS framework. Serves RESTful API).
    - pm2 (Process manager for NodeJS. It allow running and monitoring of multiple NodeJS applications on one machine).
- Our application can be found at [tigerops.jamiesondube.com/](http://tigerops.jamiesondube.com/)

## Database
- Running MySQL Server
- Can be installed using `apt install mysql-server`
- Using default MySQL port 3306
- Database Diagram:
![Database Diagram](https://github.com/jmd2851/TigerOps/assets/22307978/0c39fd45-b9b2-4e7e-be7f-d7112bcb5c49)

## Frontend
- Our frontend is a NodeJS application using the ReactJS library to create the components that users interact with.
- This decision was made primarily because components created using ReactJS are extremely reusable.
- The frontend runs on port 3000.

## Backend
- Our backend is running ExpressJS, a NodeJS framework.
- ExpressJS provides a simple way to serve RESTful APIs.
- Our backend runs on port 4000.

## Process Management
- With multiple NodeJS applications running, it becomes increasingly complicated to manage and monitor them.
- Thankfully, a software called pm2 exists to solve this problem.
- It can be found at [pm2.io](https://pm2.io/)
- pm2 is used to run multiple Node applications and provide persistence upon restart.
- Run `pm2 l` to see status of running Node applications.
- `pm2 monit` provides a way to look more in depth at each process

## Code Repository
- Code is located under `/root/TigerOps/`
- Provided no need to install additional Node packages, simply `cd /root/TigerOps` and `git pull` to update the application. pm2 is watching the applications and will restart them automatically.

## Updating NodeJS Packages
- If you need to install additional NodeJS packages:
    - `cd /root/TigerOps`
    - `git pull`
    - `cd frontend` for frontend, or `cd backend` for backend
    - `npm i`
    - `pm2 restart all` (or specify frontend or backend)

## Miscellaneous
- Our storage usage monitoring system run via a Bash script.
    - A Cron job runs every five minutes and calls the script which updates the values in the database.
- Another cron job reboots the server nightly at 3:30 AM
