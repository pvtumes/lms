import React from "react";

const Avatar = ({ src, alt, fallback, size = "md", className = "" }) => {
  // Define size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  // Determine the size class
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`relative inline-block rounded-full overflow-hidden ${sizeClass} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold">
          {fallback}
        </div>
      )}
    </div>
  );
};

export default Avatar;