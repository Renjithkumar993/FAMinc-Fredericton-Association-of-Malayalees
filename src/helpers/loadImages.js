// src/helpers/loadImages.js
const loadImages = (requireContext) => {
    let images = {};
    requireContext.keys().forEach((item) => {
      images[item.replace('./', '')] = requireContext(item);
    });
    return images;
  };
  
  export default loadImages;
  