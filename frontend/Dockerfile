FROM node:18.17.0

WORKDIR /frontend

# Copy dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# Copy rest of source code
COPY . .

EXPOSE ${PORT}
CMD ["npm", "run", "dev"]
