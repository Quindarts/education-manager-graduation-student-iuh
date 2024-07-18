import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppSiderBarType } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import DropDown from '@/components/ui/Dropdown';
import { TermQueryKey, useTerm } from '@/hooks/api/useQueryTerm';
import { convertMajorDropdown, convertTermDropdown } from '@/utils/convertDataTable';
import { useDispatch } from 'react-redux';
import { setAllTerm, setCurrentTerm } from '@/store/slice/term.slice';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { setCurrentMajor } from '@/store/slice/major.slice';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import useRole from '@/hooks/author/useRole';
import { RoleCheck } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import TitleManager from '@/components/ui/Title';

interface AdminSidebarProps {
  isOpenSideBar: boolean;
  handleOpenSideBar: () => void;
  currentSidebar: AppSiderBarType[];
  role: string;
}
const homePageIndex = 0;
const drawerWidth = '250px';
const hidedDrawerWidth = '76px';
const screen_mobile = 900;

export default function AdminSidebar(props: AdminSidebarProps) {
  const { isOpenSideBar, currentSidebar, handleOpenSideBar, role } = props;

  //Head_course
  const isHeadCourseRole = role === RoleCheck.HEAD_COURSE;
  const { lecturerStore } = useAuth();
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

  const dispatch = useDispatch();

  //Handle Major Dropdown
  const { majorStore } = useMajor();

  const [majorSelectValue, setMajorSelectValue] = useState(
    majorStore.currentMajor ? majorStore.currentMajor.id : '',
  );
  useEffect(() => {
    if (majorStore.allMajor) {
      dispatch(
        setCurrentMajor(majorStore.allMajor.filter((m: any) => m.id === majorSelectValue)[0]),
      );
    }
  }, [majorSelectValue]);

  //Handle Term dropdown
  const { termStore, handleGetAllTermByMajor } = useTerm();

  const {
    data: termDataFetch,
    isLoading,
    isFetching,
  } = handleGetAllTermByMajor(
    isHeadCourseRole ? majorStore.currentMajor.id : lecturerStore.me.user.majorId,
  );

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor, majorSelectValue] });
  }, [majorSelectValue]);
  return (
    <Box
      sx={{
        width: isOpenSideBar ? drawerWidth : hidedDrawerWidth,
        transition: '0.1s all ease',
        transform: 'scaleX(1)',
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
            bgcolor: 'primary.dark',
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
        {isMobile ||
          (isOpenSideBar && (
            <Box
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
              <Box sx={{ mb: 10 }}>
                <Box sx={{ mb: 4 }}>
                  {isHeadCourseRole ? (
                    <DropDown
                      onChange={(e: any) => {
                        isHeadCourseRole && setMajorSelectValue(e.target.value);
                      }}
                      defaultValue={majorStore.currentMajor.id}
                      options={convertMajorDropdown(majorStore.allMajor)}
                    />
                  ) : (
                    <TitleManager mb={10} color={'grey.900'} fontWeight={500} textAlign={'center'}>
                      {lecturerStore.me.user.majorName}
                    </TitleManager>
                  )}
                </Box>

                {isFetching ? (
                  <></>
                ) : (
                  <DropDown
                    onChange={(e: any) => {
                      if (termStore.allTerm)
                        dispatch(
                          setCurrentTerm(
                            termStore.allTerm.filter((term: any) => term.id === e.target.value)[0],
                          ),
                        );
                      else dispatch(setCurrentTerm({}));
                    }}
                    value={termStore?.currentTerm?.id ? termStore.currentTerm.id : ''}
                    options={convertTermDropdown(termStore.allTerm)}
                  />
                )}
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
                bgcolor: 'primary.dark',
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
                    bgcolor: '#333',
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
                      color: 'white',
                    },
                  },
                  '& svg': {
                    color: 'white',
                  },
                  '&.active': {
                    color: 'white',
                    bgcolor: '#333',
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
                          '&:hover': {
                            bgcolor: 'rgba(162, 203, 251, 0.4)',
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
                              color: 'grey.600',
                              bgcolor: '#787878',
                              '& svg': {
                                color: 'white',
                              },
                            },
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
