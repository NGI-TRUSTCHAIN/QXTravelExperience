export const BlobText = ({ text }: { text: string[] }) => {
  return new Blob([text.join(" ")], { type: "text/plain;charset=utf-8" });
};
