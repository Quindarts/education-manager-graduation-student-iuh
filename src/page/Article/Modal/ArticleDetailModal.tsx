import Modal from '@/components/ui/Modal';
import React from 'react';

function ArticleDetailModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={'lg'}>
      ArticleDetailModal
    </Modal>
  );
}

export default ArticleDetailModal;
