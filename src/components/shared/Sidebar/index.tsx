import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppSiderBarType } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import DropDown from '@/components/ui/Dropdown';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { convertTermDropdown } from '@/utils/convertDataTable';
import { useDispatch } from 'react-redux';
import { setCurrentTerm } from '@/store/slice/term.slice';

interface AdminSidebarProps {
  isOpenSideBar: boolean;
  handleOpenSideBar: () => void;
  currentSidebar: AppSiderBarType[];
}
const homePageIndex = 0;
const drawerWidth = '250px';
const hidedDrawerWidth = '76px';
const screen_mobile = 900;

export default function AdminSidebar(props: AdminSidebarProps) {
  const { isOpenSideBar, currentSidebar, handleOpenSideBar } = props;

  const location = useLocation();
  const { termStore } = useTerm();

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
    currentSidebar.forEach((item: any, itemIndex: number) => {
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

  const { handleGetAllTerm } = useTerm();
  const { data, isLoading, isFetched } = handleGetAllTerm();
  const [valueDropTerm, setValueDropTerm] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      convertTermDropdown(data.terms);
      setValueDropTerm(convertTermDropdown(data.terms));
    }
  }, [data, isLoading, isFetched]);

  const dispatch = useDispatch();
  const handleSelectTerm = (termId: number) => {
    data.terms.map((term: any) => {
      if (term.id === termId) {
        dispatch(setCurrentTerm(term));
      }
    });
  };

  return (
    <Box
      sx={{
        width: isOpenSideBar ? drawerWidth : hidedDrawerWidth,
        transition: '0.1s all ease',
        transform: 'scaleX(1)',
        maxHeight: '100vh',
        height: '100%',
        position: 'fixed',
        zIndex: 1000,
        top: 0,
        borderRight: '1px solid #cddef8',
        display: {
          xs: 'none',
          md: 'block',
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
          transition: '0.2s all',
        }}
      >
        {!isOpenSideBar && !isMobile ? (
          <img width={22} height={22} src='/images/log-sm.jpg' alt='logo_app' />
        ) : (
          <Box display='flex' alignItems='center' height={35}>
            <img width={150} height={60} src='/images/logo-light.png' alt='logo_app' />
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
            overflowY: 'hidden',
            display: 'flex',
            position: 'revert',
            flexDirection: 'column',
            bgcolor: 'gray.400',
            transition: 'all 0.3s',
            '&:hover': {
              overflowY: 'auto',
            },
            '&::-webkit-scrollbar': {
              width: 4,
            },

            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'grey.400',
            },
            '.Mui-expanded ': {
              margin: 0,
            },
            '& .MuiTypography-root': {
              overFlow: 'hidden',
              '&.active': {
                fontWeight: 600,
                color: 'primary.main',

                '& svg': {
                  color: 'primary',
                },
                '&:hover': {
                  fontSize: 'body2',
                },
              },
            },
          },
        }}
      >
        {isMobile ||
          (isOpenSideBar && (
            <Box
              px={4}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              textTransform={'uppercase'}
              flexDirection={'column'}
            >
              <Typography
                variant='h6'
                fontWeight={500}
                pt={{
                  xs: 10,
                  md: 20,
                }}
                pb={{
                  xs: 0,
                  md: 8,
                }}
                sx={{
                  opacity: 0.7,
                }}
              >
                Danh mục quản lý
              </Typography>
              <Box sx={{ width: 170, mb: 10 }}>
                <DropDown
                  onChange={(e: any) => {
                    handleSelectTerm(e.target.value);
                  }}
                  defaultValue={termStore.currentTerm.id}
                  options={valueDropTerm}
                />
              </Box>
            </Box>
          ))}
        {currentSidebar.map((item: any, itemIndex: number) => (
          <>
            <Accordion
              expanded={activeItemIndexes.includes(itemIndex)}
              onChange={() => handleClickSidebarItem(itemIndex)}
              key={itemIndex}
              title={item.text}
              sx={{
                bgcolor: 'gray.400',
                boxShadow: 'none',
                mx: !isOpenSideBar ? 'auto!important' : '',
                '&::before': {
                  display: 'none',
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
                  px: 4,
                  '&.Mui-expanded': {
                    minHeight: 0,
                  },
                  '&:hover': {
                    bgcolor: 'primary.main',
                    '.MuiTypography-root': {
                      color: 'white',
                    },
                    transition: '0.2s all',
                    '& .MuiAccordionSummary-content': {
                      '& svg': {
                        color: 'white',
                      },
                    },
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                    '& svg': {
                      color: 'dark',
                    },
                  },
                  '& svg': {
                    color: 'dark',
                  },
                  '&.active': {
                    color: 'white',
                    bgcolor: 'primary.main',
                    '& svg': {
                      color: 'white',
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
                    fontWeight={500}
                    sx={{
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
                          py: 6,
                          position: 'relative',
                          '::after': {
                            content: '""',
                            position: 'absolute',
                            width: 4,
                            height: 2,
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            transition: '0.3s all',
                          },
                          '&:hover': {
                            bgcolor: 'rgba(0,82,177,0.4)',
                            '& .MuiTypography-root': {
                              color: 'white',
                            },
                          },
                        }}
                      >
                        <Typography
                          borderRadius={8}
                          variant='body1'
                          component='span'
                          sx={{
                            flex: 1,
                            ml: 8,
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
