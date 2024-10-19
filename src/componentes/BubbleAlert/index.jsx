import React from "react";

const BubbleAlert = ({ value }) => {
  const getNumber = (n) => {
    return n < 0 ? '0' : n;
  };

  return (
    <span className="bubbleAlert">
      {getNumber(value)}
    </span>
  );
};

export default BubbleAlert;

