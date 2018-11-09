FROM alphine:3.8
WORKDIR /app
COPY src .
COPY public .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .
RUN npm run build
CMD node ./build/