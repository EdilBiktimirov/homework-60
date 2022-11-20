import React from 'react';

interface Props {
  btnName: string;
  onBtnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ChatBtn: React.FC<Props> = ({btnName, onBtnClick}) => {
  return (
    <>
      <button
        className="Btn"
        type="submit"
        onClick={onBtnClick}
      >
        {btnName}
      </button>
    </>
  );
};

export default ChatBtn;