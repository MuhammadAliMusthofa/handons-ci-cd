# --- Tahap 1: Build React App ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install PNPM
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy semua source code
COPY . .

# --- SETUP ENVIRONMENT VARIABLES ---
# PENTING: Di React, Env Var "dipanggang" (baked-in) saat build time.
# Pastikan nama variabel di bawah ini (sebelah kiri) SAMA PERSIS 
# dengan yang ada di code Anda (misal: VITE_API_URL atau REACT_APP_API_URL).

# Tangkap ARG dari GitHub Actions
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_SSO_URL
ARG NEXT_PUBLIC_MY_URL
ARG NEXT_PUBLIC_CLIENT_ID

# Set ke ENV agar terbaca saat 'pnpm build'
# Jika pakai VITE, ganti awalan env jadi VITE_...
# Jika pakai CRA, ganti awalan env jadi REACT_APP_...
# Contoh di bawah ini asumsi Anda masih pakai nama NEXT_PUBLIC_ di kodingan
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_SSO_URL=$NEXT_PUBLIC_SSO_URL
ENV NEXT_PUBLIC_MY_URL=$NEXT_PUBLIC_MY_URL
ENV NEXT_PUBLIC_CLIENT_ID=$NEXT_PUBLIC_CLIENT_ID

# Jalankan Build
RUN pnpm build
# Hasil build biasanya ada di folder 'dist' (Vite) atau 'build' (CRA)

# --- Tahap 2: Serving dengan Nginx ---
FROM nginx:alpine AS runner

# Copy konfigurasi Nginx yang kita buat tadi
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Hapus file default nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build dari tahap 1 ke folder Nginx
# PERHATIKAN: Ganti 'dist' menjadi 'build' jika Anda pakai Create React App (CRA)
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Cloud Run akan otomatis mapping ke sini)
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]