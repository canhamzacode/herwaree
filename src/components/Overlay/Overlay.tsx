import React from 'react';

interface IOverlayProps {
  onClick: () => void;
}

const Overlay = ({ onClick }: IOverlayProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 transition-opacity duration-300"
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
