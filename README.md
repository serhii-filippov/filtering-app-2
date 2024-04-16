## Simple filtering app

Steps to run this project:

1. Run `npm run build`;
2. Make sure you got mongoDB container running in the background for this, perform the following
option items:
(2.1) Run `docker build -t filter-app .`;
(2.2) Run `docker-compose up`;
3. Seed some data using `npm run seed`;
4. Launch the app via `npm run start`;
5. Reach the API at 'localhost:8080'.

## Security
To disable noisy 403s simply comment out @Auth decorator in the corresponding controller.