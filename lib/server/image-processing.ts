import * as sharp from "sharp";

export const resizeImage = async (buffer: Buffer, size: number) => {
  return sharp(buffer)
    .resize(size, size, {
      fit: "contain"
    })
    .toBuffer();
};
