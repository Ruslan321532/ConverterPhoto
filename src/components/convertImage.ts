// import sharp from "sharp";

// const convertImage = async (
//   file: File
// ): Promise<{ width: number; height: number; outputImage: string }> => {
//   const imageBuffer = await sharp(file.path).resize(300, 300).toBuffer();
//   const outputImage = `data:image/${sharp.format(
//     file.jpeg
//   )};base64,${imageBuffer.toString("base64")}`;

//   const { width, height } = await sharp(imageBuffer).metadata();

//   return { width, height, outputImage };
// };

// export default convertImage;
