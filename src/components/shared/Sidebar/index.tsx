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
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { RoleCheck } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import TitleManager from '@/components/ui/Title';
import useSidebar from '@/hooks/ui/useSidebar';
import { keyframes } from '@emotion/react';
import SidebarLecturer from './lecturer';
import SidebarManager from './admin';

const homePageIndex = 0;
const drawerWidth = '250px';
const hidedDrawerWidth = '76px';
const screen_mobile = 900;

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
const fadeOut = keyframes`
 from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-60%);
  }
`;

export default function AdminSidebar() {
  const [currentSidebarRole, setCurrentSidebarRole] = useState<AppSiderBarType[]>([]);
  const { isOpen, handleToggleSidebar } = useSidebar();
  const { lecturerStore } = useAuth();
  const role = lecturerStore.currentRoleRender;
  return role === RoleCheck.ADMIN ? <SidebarManager /> : <SidebarLecturer />;
}
