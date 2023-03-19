import { Hotel } from '@/pages/model/Hotel';
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  hotel?: Hotel;
}

const Card = ({ hotel }: CardProps) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="h-72 aspect-square mb-2 relative">
        <Image
          src={
            hotel?.photo ??
            'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80'
          }
          alt={hotel?.title ?? 'photo'}
          fill
          className="rounded-3xl"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw
              "
        />
      </div>
      <div className="card-content">
        <div className="flex justify-between items-center mb-4">
          {hotel?.superHost && (
            <p className="rounded-full border border-gray-700 uppercase text-xs px-2 py-1">
              Super Host
            </p>
          )}

          <h3 className="text-sm text-gray-400">
            {hotel?.type} {hotel?.beds ? <span>. {hotel?.beds} beds</span> : ''}
          </h3>
          <p className="text-sm">
            <FontAwesomeIcon icon={faStar} className="text-primary" />{' '}
            {hotel?.rating}
          </p>
        </div>
        <div className="card-title">
          <p className="font-bold">{hotel?.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
