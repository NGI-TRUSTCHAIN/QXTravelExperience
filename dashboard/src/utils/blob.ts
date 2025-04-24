export const BlobText = ({ text }: { text: string[] }) => {
  return new Blob([text.join(" ")], { type: "text/plain;charset=utf-8" });
};

export const BlobImage = ({ image }: { image: string }) => {
const mimeType = image.startsWith('/9j/') ? 'image/jpeg' : 'image/png';
return new Blob([image], { type: mimeType });
};
