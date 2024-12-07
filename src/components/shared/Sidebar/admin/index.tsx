import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_SIDEBAR, AppSiderBarType } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import DropDown from '@/components/ui/Dropdown';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { convertMajorDropdown, convertTermDropdown } from '@/utils/convertDataTable';
import { useDispatch } from 'react-redux';
import { setAllTerm, setCurrentTerm } from '@/store/slice/term.slice';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { setCurrentMajor } from '@/store/slice/major.slice';
import { RoleCheck } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import TitleManager from '@/components/ui/Title';
import useSidebar from '@/hooks/ui/useSidebar';
import {
  homePageIndex,
  drawerWidth,
  hidedDrawerWidth,
  opacity__animations_out,
  opacity__animations_in,
  majorPayload,
} from '../context';

export default function SidebarManager() {
  const [currentSidebarRole, setCurrentSidebarRole] = useState<AppSiderBarType[]>([]);
  const { isOpen, handleToggleSidebar } = useSidebar();
  const { lecturerStore } = useAuth();

  useLayoutEffect(() => {
    APP_SIDEBAR.map((item: any) => {
      item.roles.forEach((role: string) => {
        if (role === lecturerStore.currentRoleRender) {
          currentSidebarRole.push(item);
          setCurrentSidebarRole(currentSidebarRole);
        }
      });
    });
  }, []);
  //Head_course
  const isAdminRole = lecturerStore.currentRoleRender === RoleCheck.ADMIN;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItemIndexes, setActiveItemIndexes] = useState<number[]>([]);
  const [currentSidebarItemIndex, setCurrentSidebarItemIndex] = useState<number>(0);

  //TODO find out route have selected
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveItemIndexes([homePageIndex]);
      setCurrentSidebarItemIndex(homePageIndex);
      return;
    }
    currentSidebarRole.forEach((item: any, itemIndex: number) => {
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

  const handleClickSidebarItem = (indexNumber: number) => {
    if (activeItemIndexes.includes(indexNumber)) {
      setActiveItemIndexes(activeItemIndexes.filter((number: number) => number !== indexNumber));
    } else {
      setActiveItemIndexes([...activeItemIndexes, indexNumber]);
    }
  };

  const dispatch = useDispatch();
  //Handle Major Dropdown
  const { majorStore } = useMajor();
  const { termStore, handleGetAllTermByMajor, handleGetCurrentTerm } = useTerm();

  //TODO -> saved term now to store and show on dropdown
  const { data: currentTerm, refetch: fetchingCurrentTerm } = handleGetCurrentTerm(
    majorStore.currentMajor.id,
  );
  const [termSelectValue, setTermSelectValue] = useState(currentTerm?.term?.id);
  const [majorSelectValue, setMajorSelectValue] = useState(majorStore.currentMajor.id);

  //TODO Handle Term dropdown
  const handleSelectTerm = (termId: string) => {
    dispatch(setCurrentTerm({}));
    setTermSelectValue(termId);
    const payload = termStore.allTerm.filter((term: any) => term.id === termId)[0];
    dispatch(setCurrentTerm(payload));
  };
  //TODO Handle Major dropdown
  const { data } = handleGetAllTermByMajor(majorSelectValue);
  const handleSelectMajor = (majorId) => {
    setMajorSelectValue(majorId);
    const payload = majorPayload(majorId, convertMajorDropdown(majorStore.allMajor));
    dispatch(setCurrentMajor(payload));
  };
  useLayoutEffect(() => {
    dispatch(setAllTerm(data?.terms));
  }, [majorSelectValue]);

  //TODO re-fetch when re-render or render component
  useEffect(() => {
    fetchingCurrentTerm();

    if (
      lecturerStore.currentRoleRender !== RoleCheck.HEAD_COURSE &&
      lecturerStore.currentRoleRender !== RoleCheck.HEAD_LECTURER
    )
      dispatch(
        setCurrentMajor({
          name: lecturerStore.me.user.majorName,
          id: lecturerStore.me.user.majorId,
        }),
      );
  }, []);

  return (
    <Box
      sx={{
        width: isOpen ? drawerWidth : hidedDrawerWidth,
        animation: `${isOpen ? opacity__animations_in : opacity__animations_out}  0.2s ease-in`,
        transition: 'width 0.7s ease forwards',
        opacity: 1,
        maxHeight: '100vh',
        height: '100%',
        position: 'fixed',
        bgcolor: 'primary.dark',
        zIndex: 1000,
        top: 0,
        borderRight: '1px solid #cddef8',
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    >
      {isOpen ? (
        <>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            sx={{
              transition: '0.3s all ease',
              transform: isOpen ? 'translateX(0)' : 'translateX(-100px)',
              opacity: isOpen ? 1 : 0,
            }}
            borderBottom={'0px solid #1467db'}
            height={240}
          >
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <img width={150} src='/images/logo_bg_white.webp' />
              <Typography
                textAlign={'center'}
                variant='body1'
                color={'grey.100'}
                fontWeight={600}
                sx={{
                  opacity: 0.7,
                  mb: 4,
                  mt: 10,
                  textTransform: 'uppercase',
                }}
              >
                Danh mục quản lý
              </Typography>
              <Box>
                {isAdminRole ? (
                  <Box width={220}>
                    <DropDown
                      fullWidth
                      onChange={(e: any) => {
                        handleSelectMajor(e.target.value);
                      }}
                      defaultValue={majorSelectValue}
                      options={convertMajorDropdown(majorStore.allMajor)}
                    />
                  </Box>
                ) : (
                  <TitleManager
                    mb={10}
                    color={'grey.400'}
                    fontWeight={500}
                    variant='h6'
                    textTransform={'uppercase'}
                    textAlign={'center'}
                  >
                    Ngành {lecturerStore.me.user.majorName}
                  </TitleManager>
                )}
              </Box>
              <Box width={220}>
                <DropDown
                  onChange={(e: any) => {
                    handleSelectTerm(e.target.value);
                  }}
                  value={termSelectValue}
                  options={convertTermDropdown(termStore.allTerm)}
                />
              </Box>
            </Box>
          </Box>
          <Drawer
            variant={'permanent'}
            open={isOpen}
            onClose={handleToggleSidebar}
            sx={{
              flexShrink: 0,
              height: 'calc(100% - 240px)',

              ['& .MuiDrawer-paper']: {
                width: '100%',
                border: 'none',
                height: 'calc(100%)',
                boxSizing: 'border-box',
                overflowX: 'hidden',
                overflowY: 'hidden',
                display: 'flex',
                position: 'revert',
                flexDirection: 'column',
                bgcolor: 'primary.dark',
                transition: 'all 0.2s',
                '&:hover': {
                  overflowY: 'auto',
                },
                '&::-webkit-scrollbar': {
                  width: 4,
                },

                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'grey.700',
                },
                '.Mui-expanded ': {
                  margin: 0,
                },
                '& .MuiTypography-root': {
                  color: 'grey.400',

                  overFlow: 'hidden',
                  '&.active': {
                    fontWeight: 600,
                    color: 'grey.00',

                    '& svg': {
                      color: 'grey.400',
                    },
                    '&:hover': {
                      fontSize: 'body2',
                    },
                  },
                },
              },
            }}
          >
            {currentSidebarRole.map((item: any, itemIndex: number) => (
              <>
                <Accordion
                  expanded={activeItemIndexes.includes(itemIndex)}
                  onChange={() => handleClickSidebarItem(itemIndex)}
                  key={itemIndex}
                  title={item.text}
                  onClick={() => {
                    if (!item.children) navigate(item.link);
                  }}
                  sx={{
                    bgcolor: 'primary.dark',
                    boxShadow: 'none',
                    mx: !isOpen ? 'auto!important' : '',
                    mt: !isOpen ? '4px!important' : '',
                    '&::before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    className={`${currentSidebarItemIndex === itemIndex ? 'active' : ''}`}
                    expandIcon={
                      <>
                        {item.children && isOpen && (
                          <Icon
                            width={20}
                            height={20}
                            color='#2471e3'
                            icon='ic:outline-keyboard-arrow-down'
                          />
                        )}
                      </>
                    }
                    sx={{
                      overflow: 'hidden',
                      height: 50,
                      px: 10,
                      '&.Mui-expanded': {
                        minHeight: 0,
                      },

                      '&:hover': {
                        bgcolor: '#0d5db6',
                        transform: 'scale(1.02)',
                        transition: '0.2s all ease-in',
                        '.MuiTypography-root': {
                          color: 'grey.400',
                        },
                        '& .MuiAccordionSummary-content': {
                          '& svg': {
                            color: 'grey.400',
                          },
                        },
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        '& svg': {
                          color: 'grey.400',
                        },
                      },
                      '& svg': {
                        color: 'grey.400',
                      },
                      '&.active': {
                        color: '#0859db',
                        bgcolor: '#06275c',
                        '& svg': {
                          color: 'grey.400',
                        },
                      },
                    }}
                  >
                    <Box
                      display='flex'
                      alignItems='flex-start'
                      justifyContent='left'
                      marginLeft={isOpen ? 0 : 4}
                      className={`${item.key && location.pathname.endsWith(item.key) ? 'active' : ''}`}
                      gap={4}
                      onClick={() => {
                        if (item.children) return;
                        navigate(item.link);
                      }}
                    >
                      <Icon onClick={handleToggleSidebar} icon={item.icon} width={20} height={20} />
                      <Typography
                        variant='body1'
                        fontWeight={400}
                        sx={{
                          flex: 1,
                          textWrap: 'nowrap',
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  {item?.children && isOpen && (
                    <AccordionDetails
                      sx={{
                        paddingY: 4,
                        cursor: 'pointer',
                        bgcolor: '#065693',
                      }}
                    >
                      {isOpen &&
                        item?.children?.map((submenuItem: any, submenuItemIndex: number) => (
                          <Box
                            display='flex'
                            alignItems='center'
                            gap={1}
                            sx={{
                              position: 'relative',
                              '::after': {
                                content: '""',
                                position: 'absolute',
                                // width: 4,
                                // height: 2,
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                transition: '0.3s all',
                              },
                              borderRadius: 2,
                              '&:hover': {
                                bgcolor: 'rgba(15, 124, 249, 0.4)',
                                transform: 'scale(1.02)',
                                transition: '0.2s all ease-in',
                                '& .MuiTypography-root': {
                                  color: 'grey.400',
                                },
                              },
                            }}
                          >
                            <Typography
                              variant='body1'
                              component='span'
                              sx={{
                                flex: 1,
                                pl: 10,
                                py: 6,
                                textWrap: 'nowrap',
                                '&.active': {
                                  bgcolor: 'rgba(15, 124, 249, 0.8)',
                                  borderRadius: 2,
                                  '& svg': {
                                    color: '#0d5db6',
                                  },
                                },
                              }}
                              key={submenuItemIndex}
                              className={`${location.pathname.endsWith(submenuItem.key) ? 'active' : ''}`}
                              onClick={() => {
                                navigate(submenuItem.link);
                              }}
                            >
                              - {submenuItem.text}
                            </Typography>
                          </Box>
                        ))}
                    </AccordionDetails>
                  )}
                </Accordion>
              </>
            ))}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant={'permanent'}
          open={isOpen}
          onClose={handleToggleSidebar}
          sx={{
            flexShrink: 0,
            mt: 70,
            height: 'calc(100% - 200px)',
            ['& .MuiDrawer-paper']: {
              width: '100%',
              border: 'none',
              height: 'calc(100%)',
              boxSizing: 'border-box',
              overflowX: 'hidden',
              overflowY: 'hidden',
              display: 'flex',
              position: 'revert',
              flexDirection: 'column',
              bgcolor: 'primary.dark',
              transition: 'all 0.2s',
              '&:hover': {
                overflowY: 'auto',
              },
              '&::-webkit-scrollbar': {
                width: 4,
              },

              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'grey.700',
              },
              '.Mui-expanded ': {
                margin: 0,
              },
              '& .MuiTypography-root': {
                color: 'grey.400',

                overFlow: 'hidden',
                '&.active': {
                  fontWeight: 600,
                  color: 'grey.400',

                  '& svg': {
                    color: 'grey.400',
                  },
                  '&:hover': {
                    fontSize: 'body2',
                  },
                },
              },
            },
          }}
        >
          {currentSidebarRole.map((item: any, itemIndex: number) => (
            <>
              <Accordion
                expanded={activeItemIndexes.includes(itemIndex)}
                onChange={() => handleClickSidebarItem(itemIndex)}
                key={itemIndex}
                onClick={() => {
                  if (!item.children) navigate(item.link);
                  else navigate(item.children[0].link);
                  handleToggleSidebar();
                }}
                sx={{
                  bgcolor: 'primary.dark',
                  boxShadow: 'none',
                  '&::before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  className={`${currentSidebarItemIndex === itemIndex ? 'active' : ''}`}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: 50,
                    '&.Mui-expanded': {
                      minHeight: 0,
                    },
                    '&:hover': {
                      bgcolor: '#0d5db6',
                      transform: 'scale(1.2)',
                      transition: '0.2s all ease-in',
                      '.MuiTypography-root': {
                        color: 'grey.400',
                      },
                      '& .MuiAccordionSummary-content': {
                        '& svg': {
                          color: 'grey.400',
                        },
                      },
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                      '& svg': {
                        color: 'grey.400',
                      },
                    },
                    '& svg': {
                      color: 'grey.400',
                    },
                    '&.active': {
                      color: '#0859db',
                      bgcolor: '#06275c',
                      '& svg': {
                        color: 'grey.400',
                      },
                    },
                  }}
                >
                  <Box
                    display='flex'
                    pl={12}
                    alignItems={'center'}
                    justifyContent='center'
                    className={`${item.key && location.pathname.endsWith(item.key) ? 'active' : ''}`}
                    gap={4}
                  >
                    <Icon icon={item.icon} width={20} height={20} />
                  </Box>
                </AccordionSummary>
              </Accordion>
            </>
          ))}
        </Drawer>
      )}
    </Box>
  );
}
