const assert = require('assert');

function genNginxclusterConfig(clusterConfig, serverConfig) {
  //
  // If TLS is clusterConfigured, then redirect all HTTP traffic on port 80 to HTTPS.
  //
  let http80Block;
  if (clusterConfig.tls.useTls) {
    // Forward port 80 -> port 443.
    http80Block = `
#
# HTTP --> HTTPS REDIRECT FOR ALL DOMAINS ON PORT 80.
#
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  server_tokens off;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  return 301 https://$host$request_uri;
}
`;
  } else {
    // No TLS, nothing on port 80.
  }

  const allowedHttpMethods = serverConfig.Server.http.allowedMethods;
  assert(allowedHttpMethods.length, 'Must allow at least HTTP GET requests.');

  return `
#
# Upstream: baresoil-server process on port 8086
#
upstream api {
  server 127.0.0.1:8086;
}

${http80Block}

#
# Proxy Protocol HTTP server on port 8088
#
server {
  listen          8088 default_server proxy_protocol;
  listen          [::]:8088 default_server proxy_protocol;
  server_name     _;
  server_tokens   off;

  set_real_ip_from  ${clusterConfig.vpc.cidrBlock};
  real_ip_header    proxy_protocol;

  gzip             on;
  gzip_comp_level  4;
  gzip_min_length  1500;
  gzip_proxied     any;
  gzip_vary        on;
  gzip_types       text/plain text/css text/javascript text/xml application/xml application/xml+rss application/atom+xml application/xhtml+xml
                   application/json application/javascript application/x-javascript
                   image/svg+xml image/x-icon
                   font/opentype application/x-font-ttf application/vnd.ms-fontobject
                   ;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

  # Maximum POST request size
  client_max_body_size ${serverConfig.Server.http.maxBodySizeBytes};

  # Disable unsupported HTTP methods
  if ($request_method !~ ^(${allowedHttpMethods.join('|')})$ ) {
    return 444;
  }

  location / {
    proxy_http_version 1.1;
    proxy_read_timeout ${Math.floor(serverConfig.Server.websocket.maxSessionDurationMs / 1000)}s;
    proxy_send_timeout ${Math.floor(serverConfig.Server.websocket.maxSessionDurationMs / 1000)}s;

    proxy_hide_header X-Powered-By;
    proxy_set_header Upgrade          $http_upgrade;
    proxy_set_header Connection       "upgrade";
    proxy_set_header X-Real-IP        $proxy_protocol_addr;
    proxy_set_header X-Forwarded-For  $proxy_protocol_addr;
    proxy_set_header Host             $host;

    proxy_pass http://api;
  }
}

#
# Add MIME type for Woff2 compressed fonts.
#
types {
    application/font-woff2  woff2;
}
`;
}

module.exports = genNginxclusterConfig;
