import { useAuth } from '@/hooks/api/useAuth';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ContextReviewManagerPropsType = {
  children: React.ReactNode;
};

type ContextPayloadType = {
  topic: {
    name: string;
  };
  groupStudentId: string;
  groupMember: any[];
  lecturerSupportName: string;
  lecturerToScoreName: string;
  groupStudentName: string;
  roleOfEvaluator: string;
};

type ContextActionType = {
  handleSetContext: (data: Partial<ContextPayloadType>) => void;
  handleSetGroupStudentId: (groupstudentId: string) => void;
  onClearData: () => void;
};
const initValue = {
  groupMember: [],
  lecturerSupportName: '',
  lecturerToScoreName: '',
  roleOfEvaluator: '',
  groupStudentId: '',
  groupStudentName: '',
  topic: { name: '' },
};

type ContextReviewType = Partial<ContextPayloadType> & Partial<ContextActionType>;

export const ReviewContext = createContext<ContextReviewType>({
  ...initValue,
  handleSetContext: () => {},
  handleSetGroupStudentId: () => {},
  onClearData: () => {},
});

export const useGlobalContextReview = () => useContext(ReviewContext);

function ContextReviewManager({ children }: ContextReviewManagerPropsType) {
  const { lecturerStore } = useAuth();

  const [contextValue, setContextValue] = useState<Partial<ContextPayloadType>>({
    ...initValue,
    lecturerToScoreName: lecturerStore.me.user.fullName,
    lecturerSupportName: lecturerStore.me.user.fullName,
  });

  const onClearData = () => {
    setContextValue(initValue);
  };
  const handleSetContext = (value: Partial<ContextPayloadType>) => {
    setContextValue({
      ...value,
      lecturerToScoreName: lecturerStore.me.user.fullName,
      lecturerSupportName: lecturerStore.me.user.fullName,
    });
  };
  const handleSetGroupStudentId = useCallback((groupStudentId: string) => {
    setContextValue((pre: Partial<ContextPayloadType>) => ({
      ...pre,
      groupStudentId: groupStudentId,
      lecturerToScoreName: lecturerStore.me.user.fullName,
      lecturerSupportName: lecturerStore.me.user.fullName,
    }));
  }, []);

  useEffect(() => {
    if (contextValue?.groupStudentId === '') {
      onClearData();
    }
  }, [contextValue.groupStudentId]);

  return (
    <ReviewContext.Provider
      value={{
        ...contextValue,
        handleSetContext,
        handleSetGroupStudentId,
        onClearData,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export default ContextReviewManager;
