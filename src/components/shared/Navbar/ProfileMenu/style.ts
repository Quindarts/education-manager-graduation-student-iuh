const avatarStyles = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    margin: 'auto',
    position: 'relative',
};

const imgStyles = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '50%',
};

const statusStyles = {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    animation: 'border-animation 1s infinite',
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        right: '0rem',
        width: '1rem',
        height: '1rem',
        animation: 'border-animation 1s infinite',
        background: '#fafafc',
        borderRadius: '50%',
    },
};

const statusCircleStyles = {
    backgroundColor: '#1de327',
    width: 12,
    height: 12,
    position: 'absolute',
    bottom: '1px',
    right: '2px',
    borderRadius: '50%',
    transition: '1s ease-in-out',
};

const keyframes = `
    @keyframes border-animation {
      0% {
        background: #fcfafc;
      }
      25% {
        background: #d5d3d5;
      }
      50% {
        background: #a19fa1;
      }
      75% {
        background: #bab9ba;
      }
      100% {
        background: #cacaca;
      }
    }
  `;

export {
    avatarStyles,
    imgStyles,
    keyframes,
    statusCircleStyles, statusStyles,
}