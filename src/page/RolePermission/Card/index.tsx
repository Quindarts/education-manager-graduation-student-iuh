import { useRoleManager } from '@/hooks/api/useQueryRole';
import { RoleCheck } from '@/types/enum';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';

function CardRole(props: any) {
  const { roleAssigned, roleName, handleClose, lecturerId, currentRole } = props;
  const { onAssignRoleToLecturer, onUnAssignRoleToLecturer } = useRoleManager();
  const { mutate: unAssign, isSuccess: successUnAssign } = onUnAssignRoleToLecturer(lecturerId);
  const { mutate: assign, isSuccess: successAssign } = onAssignRoleToLecturer(lecturerId);
  const [isReplaceRole, setReplaceRole] = useState(true);

  useLayoutEffect(() => {
    if (
      (currentRole !== RoleCheck.ADMIN &&
        (roleAssigned?.name === RoleCheck.HEAD_LECTURER || roleAssigned?.name === RoleCheck.ADMIN)) ||
      roleAssigned?.name === RoleCheck.LECTURER
    ) {
      setReplaceRole(false);
    }
  }, [roleAssigned]);

  const handleAssign = () => {
    let data = {
      name: roleName,
      lecturerId: lecturerId,
    };
    assign(data);
  };
  const handleUnAssign = () => {
    unAssign(roleAssigned.id);
  };
  useEffect(() => {
    if (successUnAssign || successAssign) {
      handleClose();
    }
  }, [successAssign, successUnAssign]);

  return (
    <Box
      bgcolor={roleAssigned ? '#f9fcff' : 'grey.100'}
      borderRadius={2}
      border={roleAssigned ? '2px solid #c4daf7' : '2px solid #eaeaea'}
      my={2}
      py={4}
      px={10}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow:
            'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;',
          bgcolor: '#fff5dfdf',
          color: 'white',
          transition: '0.2s ease-in',
          border: '2px solid #d0963e',
        },
      }}
    >
      <Box>
        <Typography mb={4} variant='body1' color='primary.dark'>
          <Typography variant='h6' mr={4} fontWeight={'500'} component={'span'} color='grey.700'>
            {'  '}
            Tên vai trò:
          </Typography>
          {checkRoleLecturer(roleName)?.toUpperCase()}
        </Typography>
        <>
          {roleAssigned && (
            <Typography
              borderRadius={4}
              textAlign={'center'}
              width={100}
              color='success.main'
              py={2}
              px={4}
              variant='body1'
              bgcolor='#cafae5'
            >
              Có quyền
            </Typography>
          )}
        </>
      </Box>

      <Box gap={4} justifyContent={'end'} display={'flex'}>
        {isReplaceRole && (
          <>
            {roleAssigned ? (
              <Button onClick={handleUnAssign} color='error'>
                Gỡ quyền 
                <Icon icon='icomoon-free:exit' />
              </Button>
            ) : (
              <Button onClick={handleAssign} color='primary'>
                Trao quyền
                <Icon icon='typcn:tick' />
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default CardRole;
