#!/bin/bash -ex
#
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi

#
# Add official Docker repository in order to install Docker Engine.
#
export DEBIAN_FRONTEND=noninteractive
set -ex

# Instructions for Docker CE
# https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/
#
# Instructions for Docker EE
# https://docs.docker.com/engine/installation/linux/docker-ee/ubuntu/
#
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
apt-key fingerprint 0EBFCD88
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# General OS update
DEBIAN_FRONTEND=noninteractive apt-get update
DEBIAN_FRONTEND=noninteractive apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade

# Install required packages.
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  linux-aws linux-headers-aws linux-image-aws \
  linux-image-extra-virtual\
  aufs-tools\
  apt-transport-https \
  build-essential \
  ca-certificates \
  curl \
  docker-ce \
  nginx \
  npm \
  ntp \
  net-tools \
  software-properties-common \
  supervisor \
  update-notifier-common \
  unattended-upgrades

# Create unprivileged user
adduser --gecos 'Baresoil' --disabled-password baresoil

# Enable automatic updates.
echo 'APT::Periodic::Update-Package-Lists "1";' > /etc/apt/apt.conf.d/10periodic
echo 'APT::Periodic::Download-Upgradeable-Packages "1";' >> /etc/apt/apt.conf.d/10periodic
echo 'APT::Periodic::AutocleanInterval "7";' >> /etc/apt/apt.conf.d/10periodic
echo 'APT::Periodic::Unattended-Upgrade "1";' >> /etc/apt/apt.conf.d/10periodic
echo 'APT::Periodic::Unattended-Upgrade::Automatic-Reboot "1";' >> /etc/apt/apt.conf.d/10periodic

# Set kernel options for Docker.
echo 'GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"' >> /etc/default/grub
echo 'GRUB_DISABLE_RECOVERY="true"' >> /etc/default/grub
update-grub
modprobe aufs

# Raise system-wide ulimits
echo 'baresoil soft nofile 10000' >> /etc/security/limits.conf
echo 'baresoil hard nofile 20000' >> /etc/security/limits.conf
sysctl -w fs.file-max=65535

# Enable Docker Engine and use Google public DNS to resolve hostnames.
echo 'DOCKER_OPTS="--icc=false"' >> /etc/default/docker
service docker start
service supervisor start
systemctl enable supervisor docker
usermod -aG docker ubuntu
usermod -aG docker baresoil

#
# Download or build Docker sandbox image.
#
# NOTE: The default setup downloads the open-source sandbox iceroad/baresoil-sandbox.
# You can also modify the Dockerfile in this directory and uncomment the following
# line to build the image locally instead:

# To download image from Docker Hub, use following line:
docker pull iceroad/baresoil-sandbox-image-processing:latest

# To build image locally, uncomment following line:
# docker build -t iceroad/baresoil-sandbox .

# Install node-stable
npm install -g n npm
n stable

# Install baresoil locally with dependencies.
cd /baresoil
npm install --only=production --production \
  baresoil-plugin-docker-sandbox \
  baresoil-plugin-s3-blobstore \
  baresoil-plugin-postgres-metastore \
  baresoil-server \
  baresoil-provider-aws \
  bufferutil utf-8-validate

# Install dependencies for baresoil-server sub-components
cd /baresoil/node_modules/baresoil-server/lib/sandbox/SandboxDriver
npm install
cd /baresoil/node_modules/baresoil-server/lib/sysapp/server
npm install
cd /baresoil

# Print final config
chown -R baresoil:baresoil /baresoil
LOG=debug su -c "node --max_old_space_size=8192 node_modules/.bin/baresoil-server -c config.json -p aws config --color 256" baresoil

# Copy nginx config
rm /etc/nginx/sites-enabled/*
mv nginx.site.conf /etc/nginx/sites-enabled/default
/etc/init.d/nginx restart

# Copy supervisord config
mkdir -p /etc/supervisor/conf.d
mv supervisord.conf /etc/supervisor/conf.d/baresoil.conf
service supervisor restart

# Move SSH master keys to user ubuntu.
mkdir -p ~/.ssh
mv id_rsa.pub ~/.ssh/authorized_keys
chown -R ubuntu:ubuntu ~/.ssh

# Move AWS keys to user baresoil's home directory, where the AWS SDK expects it.
mkdir -p /home/baresoil/.aws
mv aws-cred /home/baresoil/.aws/credentials
chown -R baresoil:baresoil /home/baresoil/.aws
chmod 400 /home/baresoil/.aws/credentials


rm install.sh
echo "Build completed"
