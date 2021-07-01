FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*

COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]