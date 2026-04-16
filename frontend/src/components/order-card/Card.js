import React from 'react';

const Card = ({ title, Icon, quantity, className, iconColor }) => {
  return (
    <div className="flex h-full group">
      <div className="flex items-center border border-gray-100 w-full rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div
          className={`flex items-center justify-center p-3 rounded-xl h-14 w-14 text-2xl text-center mr-4 transition-transform duration-300 group-hover:scale-110 ${className}`}
          style={{ backgroundColor: className.includes('bg-') ? undefined : '#f8fafc' }}
        >
          <Icon className={iconColor} />
        </div>
        <div>
          <h5 className="leading-none mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h5>
          <p className="text-3xl font-bold leading-none text-gray-900">
            {quantity || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
