export   const resizeImage = (
    file: File,
    targetWidth: number,
    targetHeight: number
): Promise<{ preview: string; file: File }> => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result as string;
            const img = new Image();

            img.onload = () => {
                // Create canvas for resizing
                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    // Draw resized image to canvas
                    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                    // Get resized image as data URL
                    const resizedImage = canvas.toDataURL('image/jpeg');

                    // Convert data URL to Blob/File for form value
                    fetch(resizedImage)
                        .then(res => res.blob())
                        .then(blob => {
                            const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
                            resolve({
                                preview: resizedImage,
                                file: resizedFile
                            });
                        });
                }
            };

            img.src = result;
        };

        reader.readAsDataURL(file);
    });
};