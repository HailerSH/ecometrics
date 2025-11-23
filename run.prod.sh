# 1) Install Docker + compose plugin
sudo apt update

sudo apt install -y ca-certificates curl gnupg

install -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

docker --version
docker compose version

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
