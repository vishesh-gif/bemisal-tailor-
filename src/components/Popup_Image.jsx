const Popup_Image = ({ image, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={image}
        alt="preview"
        className="max-h-[90%] max-w-[90%] w-[300px] rounded-lg "
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Popup_Image;
