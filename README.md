

### Ghi chú Prisma
- Mặc định file `prisma/schema.prisma` đã để `provider = "sqlite"` cho dev.
- Nếu dùng Postgres, thay `provider` thành `"postgresql"` và đặt lại `DATABASE_URL`, hoặc dùng file mẫu `prisma/schema.postgres.prisma`.
