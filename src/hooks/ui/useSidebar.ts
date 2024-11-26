import { RootState } from '@/store';
import { closeSidebar, openSidebar, toggleSidebar } from '@/store/slice/sidebar.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function useSidebar() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.sidebarSlice.isOpen);
    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    }
    const handleOpenSidebar = () => {
        dispatch(openSidebar());
    }
    const handleCloseSideBar = () => {
        dispatch(closeSidebar());
    }
    return { handleCloseSideBar, isOpen, handleToggleSidebar, handleOpenSidebar };
}

export default useSidebar