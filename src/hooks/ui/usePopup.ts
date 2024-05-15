import { useEffect, useRef, useState } from 'react';

export default function usePopup() {
  const [active, setActive] = useState(false);
  const handleActive = () => {
    setActive(!active);
  };
  const menuRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    const handleUnActive = (e: any) => {
      if (!menuRef.current.contains(e.target)) setActive(false);
    };
    document.addEventListener('mousedown', handleUnActive);
    return () => {
      document.removeEventListener('mousedown', handleUnActive);
    };
  }, []);
  return { handleActive, active, menuRef };
}
