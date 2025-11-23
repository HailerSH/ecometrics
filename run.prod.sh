# 1) Install Docker + compose plugin
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER   # then log out/in

# 2) Clone repo
git clone https://github.com/HailerSH/ecometrics.git
cd ecometrics

# 3) Create .env.prod by hand on server (do NOT commit)

# 4) Build + push images from your laptop to Docker Hub (one time per change)
#    docker build -t your-dockerhub-user/ecometrics-backend ./backend
#    docker push your-dockerhub-user/ecometrics-backend
#    ... same for frontend

# 5) On server
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
