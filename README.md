# Typescript Node Web Server

`Express`, `Socket-IO`, `MongoDB` & `Angular2` boilerplate written in `Typescript`.  
- Launch your own web server and serve an Angular2 front-page.
- Server/Client Authentication Ready.
- Instruction for production installation on linux (ubuntu).

## Install
```bash
# Clone the repo
git clone https://github.com/Konijima/ts-node-web-server.git

# Install Server
cd ts-node-web-server && npm install

# Install Angular
cd web && npm install
```

## Server
```bash
# Run the server in watch mode (require nodemon installed globally)
npm run watch

# Build & Run
npm run build && npm start
```

## Angular Web App
> Angular will build into `./web/dist/` and will be served by the server.
```bash
# Go into the directory
cd web

# Run the app into dev mode
ng build --watch --configuration development

# Build for production
ng build
```

## Configure
> Update the `.env` file  
> Remove the `!.env` entry from the `.gitignore` before pushing your own config.
```bash
# The host IP
HOST = 127.0.0.1

# The port
PORT = 3000

# The MongoDB connection string
DATABASE = mongodb://localhost:27017/ts-node-web-server

# The duration of a user session
SESSION_EXPIRATION = 3600

# The private JWT key use to sign session tokens
JWT_KEY = change_me
```

## Nginx Proxy
```bash
# Install nginx on linux (ubuntu)
sudo apt install nginx

# Enable nginx service
sudo systemctl enable nginx

# Copy the example config to nginx
sudo cp .nginx-config /etc/nginx/sites-enabled/ts-node-web-server.conf

# Edit the config using your editor of choice
nano /etc/nginx/sites-enabled/ts-node-web-server.conf

# Test the config for errors
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

## Run as service with PM2
```bash
# Install pm2 globally
sudo npm install -g pm2

# Start the server process
pm2 start "node -r module-alias/register ./dist/index.js"

# Set pm2 to start after reboot
pm2 startup

# Save pm2
pm2 save
```
