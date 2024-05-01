import styled from '@emotion/styled';
import { Dialog } from '@mui/material';

const CustomModal = styled(Dialog)`
  .MuiDialog-container {
    .MuiDialog-paper {
      align-items: center;
      width: 90%;
      max-width: 500px;
      margin: auto;

      &::-webkit-scrollbar {
        width: 8px !important;
      }

      &::-webkit-scrollbar-thumb {
        background-color: 'primary.main';
        border-radius: 10px;
      }

      //Close icon
      .modal_header {
        padding: 20px;
        .icon_close {
          margin-left: 380px;
          cursor: pointer;
        }
      }
      .modal__body {
        width: 100%;
      }
    }
  }
`;

export default CustomModal;
