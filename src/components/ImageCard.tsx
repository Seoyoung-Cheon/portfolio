import React from 'react';
import './ImageCard.css';

interface ImageCardProps {
  imageUrl: string;
  characterImageUrl?: string;
  name?: string;
  title?: string;
}

export default function ImageCard({ imageUrl, characterImageUrl, name, title }: ImageCardProps) {
  return (
    <div className="image-card">
      <div className="image-card-wrapper">
        <img src={imageUrl} className="image-card-cover" alt={name || 'Profile'} />
      </div>
      {name && (
        <div className="image-card-title">
          {name}
        </div>
      )}
      {characterImageUrl && (
        <img 
          src={characterImageUrl} 
          className="image-card-character" 
          alt={name || 'Character'} 
        />
      )}
      {title && !characterImageUrl && (
        <div className="image-card-character">
          {title}
        </div>
      )}
    </div>
  );
}

