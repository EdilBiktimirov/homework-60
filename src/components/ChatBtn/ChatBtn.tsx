import React from 'react';
import {Button} from "@mui/material";

interface Props {
  btnName: string;
  onBtnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ChatBtn: React.FC<Props> = ({btnName, onBtnClick}) => {
  return (
    <>
      <Button
        variant="contained" color="success"
        className="Btn"
        type="submit"
        onClick={onBtnClick}
        sx={{display: 'block', width: '150px', mx: 'auto'}}
      >
        {btnName}
      </Button>
    </>
  );
};

export default ChatBtn;