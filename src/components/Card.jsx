import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`common-card ${className}`}>
      {children}
    </div>
  );
};

export default Card;