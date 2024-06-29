import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useStorage from '../../hooks/useStorage';

const ProgressBarComponent = ({ file, setAuction }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setAuction((prevAuction) => ({
        ...prevAuction,
        itemImage: url,
      }));
    }
  }, [url, setAuction]);

  return (
    <motion.div
      style={{ height: '5px', background: 'black' }}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
    />
  );
};

export default ProgressBarComponent;
