FROM node:18

WORKDIR /app

COPY package*.json ./
COPY ./prisma prisma
COPY .env ./

RUN npm install
RUN npx prisma generate


#Harus migrate prisma dulu, baru bisa jalan didocker
#RUN npx prisma migrate dev --name init --preview-feature
#ngakalinnya harus run dlu nodenya baru nanti nembak prisma migrate/db push


COPY . .

EXPOSE 3000

CMD npm start
