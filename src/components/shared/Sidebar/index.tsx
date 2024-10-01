import { RoleCheck } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import SidebarLecturer from './lecturer';
import SidebarManager from './admin';

export default function AdminSidebar() {
  const { lecturerStore } = useAuth();
  const role = lecturerStore.currentRoleRender;
  return role === RoleCheck.LECTURER ? <SidebarLecturer /> : <SidebarManager />;
}
