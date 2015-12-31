/**
 * Will return image object
 * @param {string} src - image source
 * @param {object} Image
 */
const loadImage = (src) => {
    const img = new Image();
    img.src = src;
    return img;
};

const imageHelper = {
    loadImage: loadImage
};

export default imageHelper;
