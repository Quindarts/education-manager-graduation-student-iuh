import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';

export default function SplitButton(props: any) {
  const { options, handleClick, label, icon } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  useEffect(() => {
    handleClick(selectedIndex);
  }, [selectedIndex]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box width={'100%'}>
      <ButtonGroup
        sx={{
          boxShadow: '0px 0px 0px white!important',
          fontSize: 14,
        }}
        variant='contained'
        ref={anchorRef}
        aria-label='button-group'
      >
        <Button
          variant='outlined'
          sx={{
            color: 'black',
            bgcolor: 'white',
            boxShadow: '0px!important',
            border: '1px solid #E0E0E0',
            height: 36,
            fontSize: 14,
          }}
          size='small'
          onClick={handleToggle}
        >
          {icon && <Icon icon={icon} style={{ marginRight: 2 }} width={16} />}
          <Typography variant='body1' fontWeight={'600'} color='grey.700'>
            {options[selectedIndex]}
          </Typography>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
