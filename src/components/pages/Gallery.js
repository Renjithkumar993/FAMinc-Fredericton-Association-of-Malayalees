import React, { useState, useEffect, useCallback } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Breadcrumbs from '../Breadcrumbs';
import Loading from '../Loading'; // Ensure this is the correct path to your Loading component
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/images/galleryimages/galleryimages.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const imageList = await response.json();
        if (imageList.length === 0) {
          setError('Gallery will be updated soon');
          return;
        }
        const imageObjects = imageList.map(image => ({
          original: `${process.env.PUBLIC_URL}/images/galleryimages/${image}`,
          thumbnail: `${process.env.PUBLIC_URL}/images/galleryimages/${image}`,
          key: image,
          description: 'Gallery Image'
        }));
        setImages(imageObjects);
      } catch (error) {
        console.error('Error fetching images', error);
        setError('Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = useCallback(() => {
    console.log('Image loaded');
  }, []);

  if (loading) {
    return (
      <div className="gallery-loading-container">
        <Loading loading={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container Gallery-page">
        <div className="mt-5">
          <Breadcrumbs className="mt-5" />
        </div>
        <h1 className="event-heading">Our Gallery</h1>
        <div className="error-message-container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='container Gallery-page'>
      <div className='mt-5'>
        <Breadcrumbs className='mt-5' />
      </div>
      <h1 className='event-heading'>Our Gallery</h1>
      <ImageGallery
        items={images}
        showThumbnails={true}
        thumbnailPosition='left'
        infinite={true}
        autoPlay={true}
        onImageLoad={handleImageLoad}
        lazyLoad={true}
      />
    </div>
  );
};

export default Gallery;
