import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_SIDEBAR } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import DropDown from '@/components/ui/Dropdown';


interface AdminSidebarProps {
  isOpenSideBar: boolean;
  handleOpenSideBar: () => void;
}
const homePageIndex = 0;
const drawerWidth = 250;
const hidedDrawerWidth = 76;
const screen_mobile = 900;

export default function AdminSidebar(props: AdminSidebarProps) {
  const { isOpenSideBar, handleOpenSideBar } = props;
  const location = useLocation();
  const [activeItemIndexes, setActiveItemIndexes] = useState<number[]>([]);
  const [currentSidebarItemIndex, setCurrentSidebarItemIndex] = useState<number>(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < screen_mobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < screen_mobile);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveItemIndexes([homePageIndex]);
      setCurrentSidebarItemIndex(homePageIndex);
      return;
    }
    APP_SIDEBAR.forEach((item: any, itemIndex: number) => {
      if (item.children) {
        item.children.forEach((subItem: any) => {
          if (location.pathname.includes(subItem.link)) {
            setActiveItemIndexes([itemIndex]);
            setCurrentSidebarItemIndex(itemIndex);
          }
        });
        return;
      }

      if (location.pathname.includes(item.link)) {
        setActiveItemIndexes([itemIndex]);
        setCurrentSidebarItemIndex(itemIndex);
      }
    });
  }, [location.pathname]);
  useEffect(() => {
    if (isOpenSideBar === true) {
      setActiveItemIndexes([]);
    }
  }, [isOpenSideBar]);
  const handleClickSidebarItem = (indexNumber: number) => {
    if (activeItemIndexes.includes(indexNumber)) {
      setActiveItemIndexes(activeItemIndexes.filter((number: number) => number !== indexNumber));
    } else {
      setActiveItemIndexes([...activeItemIndexes, indexNumber]);
    }
  };
  return (
    <Box
      sx={{
        width: isOpenSideBar ? drawerWidth : hidedDrawerWidth,
        transition: '0.3s all',
        transform: 'scaleX(1)',
        maxHeight: '100vh',
        height: '100%',
        position: 'sticky',
        top: 0,
        bgcolor: 'gray.400',
        display:{
          xs:'none',
          md: 'block'
        },
      }}
    >
      <Link
        className='logo'
        height={80}
        display='flex'
        alignItems='center'
        justifyContent='center'
        alignSelf='center'
        sx={{
          transition: '0.3s all',
        }}
      >
        {!isOpenSideBar && !isMobile ? (
          <img
            width={22}
            height={22}
            src='/images/log-sm.jpg'
            alt='logo_app'
          />
        ) : (
          <Box display='flex' alignItems='center'  height={35}>
            <img
              width={150}
              height={60}
              src='/images/logo-light.png'
              alt='logo_app'
            />
          
          </Box>
        )}
      </Link>
      <Drawer
        
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isOpenSideBar}
        onClose={handleOpenSideBar}
        sx={{
          flexShrink: 0,
          height: isMobile ? '100%' : 'calc(100vh - 70px)',
          ['& .MuiDrawer-paper']: {
            width: isMobile ? 250 : '100%',
            border: 'none',
            height: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden',
            overflowY: 'auto',
            display: 'flex',
            position: 'revert',
            flexDirection: 'column',
            bgcolor: 'gray.400',
            '&::-webkit-scrollbar': {
              width: 4,
         
            },
            '.MuiPaper-root': {
              pl:8,
              pr:8,
              py:0
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 10,
              width:20,
              bgcolor: "primary.dark",
              color:'primary.dark'
            },
            '.Mui-expanded ': {
              margin:0,
            },
            '& .MuiTypography-root': {
              borderRadius: 8,
              overFlow: 'hidden',
              '&.active': {
                color: 'background.main',
                fontWeight: 500,
                '& svg': {
                  color: 'primary.main',
                },
                '&:hover': {
                  color: 'primary.main',
                },
              },
              '&:hover': {
                color: 'primary.main',
                '& svg': {
                  color: 'primary.main',
                },
              },
            },
          },
        }}
      >
        {(isOpenSideBar || isMobile) && (
          <Box px={4}  display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          textTransform={'uppercase'}
          flexDirection={'column'} >
            <Typography
            variant='h6'
            fontWeight={600}
            pt={{
              xs: 10,
              md: 20,
            }}
            pb={{
              xs:0 ,
              md: 8,
            }}
          
            sx={{
              color: 'primary.dark',
              opacity: 0.7,
              '&:hover': {
                color: 'unset',
              },
              cursor: "pointer",
            }}
          >
            Danh mục quản lý
          </Typography>
          <Box sx={{width:170}}>
          <DropDown  defaultValue={1} options={[{_id:'1', name:'HK1 2024-2025'}]} />
          </Box>

          </Box>
      
        )}
        {APP_SIDEBAR.map((item: any, itemIndex: number) => (
          <>
            <Accordion
              expanded={activeItemIndexes.includes(itemIndex)}
              onChange={() => handleClickSidebarItem(itemIndex)}
              key={itemIndex}
              title={item.text}
              sx={{
                bgcolor: 'gray.400',
                color: 'primary.main',
                boxShadow: 'none',
                paddingLeft: isOpenSideBar ? 0 : 16,
                '&::before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  my: 4,
                },
              }}
            >
              <AccordionSummary
                className={`${currentSidebarItemIndex === itemIndex ? 'active' : ''}`}
                expandIcon={
                  <>
                    {item.children && isOpenSideBar && (
                      <Icon width={20} height={20} icon='ic:outline-keyboard-arrow-down' />
                    )}
                  </>
                }
                sx={{
                  overflow: 'hidden',
                  height: 50,
                  px:4,
                  my:2,
                  '&.Mui-expanded': {
                    minHeight: 0,
                  },
                  '&:hover': {
                    color: 'primary.main',
                    
                    '& .MuiAccordionSummary-content': {
                      '& svg': {
                        color: 'primary.main',
                      },
                    },
                    '& svg': {
                      color: 'primary.main',
                    },
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                    '& svg': {
                      color: 'primary.main',
                    },
                  },
                  '& svg': {
                    color: 'primary.main',
                  },
                  '&.active': {
                    color: 'red',
                    bgcolor: "text.disabled",
                    borderRadius: 10,
                    '& svg': {
                      color: 'primary.main',
                    },
                    '&:hover': {
                      color: 'red',
                    },
                  },
                }}
              >
                <Box
                  display='flex'
                  alignItems='flex-start'
                  justifyContent='left'
                  marginLeft={isOpenSideBar ? 0 : 4}
                  className={`${item.key && location.pathname.endsWith(item.key) ? 'active' : ''}`}
                  gap={4}
                  onClick={() => {
                    if (item.children) return;
                    navigate(item.link);
                  }}
                >
                  <Icon onClick={handleOpenSideBar} icon={item.icon} width={20} height={20} />
                  <Typography
                    variant='body1'
                    fontWeight={600}
                    
                    sx={{
                      textTransform:'uppercase',
                      flex: 1,
                      textWrap: 'nowrap',
                    }}
                  >
                    {isOpenSideBar && item.text}
                  </Typography>
                </Box>
              </AccordionSummary>
              {item?.children && isOpenSideBar && (
                <AccordionDetails
                  sx={{
                    padding: 0,
                    paddingLeft: 8,
                    cursor: 'pointer',
                  }}
                >
                  {isOpenSideBar &&
                    item?.children?.map((submenuItem: any, submenuItemIndex: number) => (
                      <Box
                        display='flex'
                        alignItems='center'
                        gap={1}
                        sx={{
                          px: 3,
                          py: 6,
                          position: 'relative',
                          '::after': {
                            content: '""',
                            position: 'absolute',
                            width: 4,
                            height: 2,
                            bgcolor: 'primary.main',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            transition: '0.3s all',
                          },
                        }}
                      >
                        <Typography
                          borderRadius={8}
                          variant='body1'
                          component='span'
                          sx={{
                            flex: 1,
                            textWrap: 'nowrap',
                          }}
                          key={submenuItemIndex}
                          className={`${location.pathname.endsWith(submenuItem.key) ? 'active' : ''}`}
                          onClick={() => {
                            navigate(submenuItem.link);
                          }}
                        >
                          {submenuItem.text}
                        </Typography>
                      </Box>
                    ))}
                </AccordionDetails>
              )}
            </Accordion>
          </>
        ))}
      </Drawer>
    </Box>
  );
}
