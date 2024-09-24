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
import { TermQueryKey, useTerm } from '@/hooks/api/useQueryTerm';
import { convertMajorDropdown, convertTermDropdown } from '@/utils/convertDataTable';
import { useDispatch } from 'react-redux';
import { setCurrentTerm } from '@/store/slice/term.slice';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { setCurrentMajor } from '@/store/slice/major.slice';
import { RoleCheck } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import TitleManager from '@/components/ui/Title';
import useSidebar from '@/hooks/ui/useSidebar';
import { keyframes } from '@emotion/react';
import { queryClient } from '@/providers/ReactQueryClientProvider';

const homePageIndex = 0;
const drawerWidth = '250px';
const hidedDrawerWidth = '76px';

const opacity__animations_out = keyframes`
  0% {
   transform: translateX(0); 
  }
  100% {
      transform: translateX(0); 
  }
`;

const opacity__animations_in = keyframes`
  0% {
   transform: translateX('0px'); 
  }
  100% {
    transform: translateX(0); 
  }
`;

const majorPayload = (majorId: string, majors: any[]) => {
  let major = {
    id: '',
    name: '',
  };
  majors.map((m: any) => {
    if (majorId === m._id) {
      major = {
        id: m._id,
        name: m.name,
      };
    }
  });
  return major;
};
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
  const { termStore, handleGetAllTermByMajor } = useTerm();
  const [majorSelectValue, setMajorSelectValue] = useState(majorStore.currentMajor.id);
  const [termSelectValue, setTermSelectValue] = useState(termStore.currentTerm.id);
  //Handle Term dropdown
  const handleSelectTerm = (termId) => {
    dispatch(setCurrentTerm({}));
    setTermSelectValue(termId);
    const payload = termStore.allTerm.filter((term: any) => term.id === termId)[0];
    dispatch(setCurrentTerm(payload));
  };
  const { data, isSuccess } = handleGetAllTermByMajor(majorSelectValue);

  const handleSelectMajor = (majorId) => {
    setMajorSelectValue(majorId);
    const payload = majorPayload(majorId, convertMajorDropdown(majorStore.allMajor));
    dispatch(setCurrentMajor(payload));
    queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor] });
  };
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
            textTransform={'uppercase'}
            flexDirection={'column'}
            sx={{
              background: 'linear-gradient(135deg, #083880, #001f3f, #00274d, #003366)',
              transition: '0.3s all ease',
              transform: isOpen ? 'translateX(0)' : 'translateX(-100px)',
              opacity: isOpen ? 1 : 0,
            }}
            borderBottom={'0px solid #1467db'}
            height={200}
          >
            <Box sx={{ mb: 10 }}>
              <Typography
                textAlign={'center'}
                variant='body1'
                color={'grey.100'}
                fontWeight={500}
                sx={{
                  opacity: 0.7,
                  mb: 10,
                }}
              >
                Danh mục quản lý
              </Typography>
              <Box sx={{ my: 10 }}>
                {isAdminRole ? (
                  <DropDown
                    onChange={(e: any) => {
                      handleSelectMajor(e.target.value);
                    }}
                    defaultValue={majorSelectValue}
                    options={convertMajorDropdown(majorStore.allMajor)}
                  />
                ) : (
                  <TitleManager mb={10} color={'grey.300'} fontWeight={500} textAlign={'center'}>
                    {lecturerStore.me.user.majorName}
                  </TitleManager>
                )}
              </Box>

              <DropDown
                onChange={(e: any) => {
                  handleSelectTerm(e.target.value);
                }}
                value={termSelectValue}
                options={convertTermDropdown(termStore.allTerm)}
              />
            </Box>
          </Box>
          <Drawer
            variant={'permanent'}
            open={isOpen}
            onClose={handleToggleSidebar}
            sx={{
              flexShrink: 0,
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
                  color: 'white',

                  overFlow: 'hidden',
                  '&.active': {
                    fontWeight: 600,
                    color: 'white',

                    '& svg': {
                      color: 'white',
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
                        bgcolor: '#333',
                        transform: 'scale(1.02)',
                        transition: '0.2s all ease-in',
                        '.MuiTypography-root': {
                          color: 'white',
                        },
                        '& .MuiAccordionSummary-content': {
                          '& svg': {
                            color: 'white',
                          },
                        },
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        '& svg': {
                          color: 'white',
                        },
                      },
                      '& svg': {
                        color: 'white',
                      },
                      '&.active': {
                        color: '#0859db',
                        bgcolor: '#06275c',
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
                        fontWeight={500}
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
                                  color: 'white',
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
                                    color: '#333',
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
                color: 'white',

                overFlow: 'hidden',
                '&.active': {
                  fontWeight: 600,
                  color: 'white',

                  '& svg': {
                    color: 'white',
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
                      bgcolor: '#333',
                      transform: 'scale(1.2)',
                      transition: '0.2s all ease-in',
                      '.MuiTypography-root': {
                        color: 'white',
                      },
                      '& .MuiAccordionSummary-content': {
                        '& svg': {
                          color: 'white',
                        },
                      },
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                      '& svg': {
                        color: 'white',
                      },
                    },
                    '& svg': {
                      color: 'white',
                    },
                    '&.active': {
                      color: '#0859db',
                      bgcolor: '#06275c',
                      '& svg': {
                        color: 'white',
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
