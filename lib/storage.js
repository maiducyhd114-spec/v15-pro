
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function saveFile(filePath, originalName) {
  const mode = (process.env.STORAGE || 'local').toLowerCase();
  if (mode === 's3') {
    const c = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      }
    });
    const bucket = process.env.S3_BUCKET;
    const key = `uploads/${Date.now()}-${originalName.replace(/[^a-z0-9-_.]+/gi,'_')}`.toLowerCase();
    const body = fs.readFileSync(filePath);
    await c.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: 'application/pdf' }));
    return `https://${bucket}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
  } else {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const basename = `${Date.now()}-${originalName.replace(/[^a-z0-9-_.]+/gi,'_').toLowerCase()}`;
    const dest = path.join(uploadDir, basename);
    fs.copyFileSync(filePath, dest);
    return `/uploads/${basename}`;
  }
}
