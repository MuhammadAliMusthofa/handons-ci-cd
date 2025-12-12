# Menggunakan image dasar Node.js versi 20
FROM node:20

# Menentukan direktori kerja di dalam container
WORKDIR /src

# Menyalin file package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install

# Menyalin semua file aplikasi ke dalam direktori kerja
COPY . .

ARG PORT


# Mengatur variabel lingkungan dengan mendukung override dari environment
ENV PORT=${PORT}


# Build aplikasi setelah environment variables di-set
RUN npm run build

# Menentukan port yang akan diexpose menggunakan variabel PORT
EXPOSE ${PORT}

# Menjalankan aplikasi
CMD ["npm", "start"]