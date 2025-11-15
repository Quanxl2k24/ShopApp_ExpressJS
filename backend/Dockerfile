# Sử dụng Node.js 18 LTS làm base image
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json để cài dependencies trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Mở cổng 3000 để ứng dụng có thể truy cập từ ngoài
EXPOSE 3000

# Lệnh mặc định chạy ứng dụng
CMD ["npm", "start"]
