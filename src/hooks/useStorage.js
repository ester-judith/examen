import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storageApp } from '../config/firebase';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    const storageRef = ref(storageApp, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUrl(downloadUrl);
        });
      }
    );

    return () => {
      uploadTask.cancel();
    };
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
