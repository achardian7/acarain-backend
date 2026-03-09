import { v2 as cloudinary } from 'cloudinary';

import env from './env';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const toDataUrl = (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataUrl = `data:${file.mimetype};base64,${b64}`;
  return dataUrl;
};

export function extractPublicId(url: string) {
  const regex = /\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
  const match = url.match(regex);

  return match ? match[1] : '';
}

export default {
  async uploadSingle(file: Express.Multer.File) {
    const fileDataUrl = toDataUrl(file);
    const result = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: 'auto',
    });

    return result;
  },

  async uploadMultiple(files: Express.Multer.File[]) {
    const uploadBatch = files.map(file => {
      const result = this.uploadSingle(file);
      return result;
    });

    const results = await Promise.all(uploadBatch);

    return results;
  },

  async remove(fileUrl: string) {
    const publicId = extractPublicId(fileUrl);

    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  },
};
