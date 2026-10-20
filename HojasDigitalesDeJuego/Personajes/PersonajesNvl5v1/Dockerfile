FROM nginx:alpine
COPY nginx-jugadores.conf /etc/nginx/nginx.conf
COPY .public-jugadores/ /srv/players/
USER 101:101
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
