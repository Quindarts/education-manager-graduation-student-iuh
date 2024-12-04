import Modal from '@/components/ui/Modal';
import React from 'react';
import CreateGroupLecturer from '../../Create';

function CreateGroupModal({ open, onClose }) {
  return (
    <Modal fullScreen open={open} onClose={onClose}>
      <CreateGroupLecturer />
    </Modal>
  );
}

export default CreateGroupModal;
