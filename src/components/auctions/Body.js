// src/components/auctions/Body.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AddAuction } from './AddAuction';
import { Alert, ProgressBar } from 'react-bootstrap';
import { firestoreApp } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuctionCard } from './AuctionCard';

export const AuctionBody = () => {
  const [auction, setAuction] = useState(null);
  const { currentUser, globalMsg } = useContext(AuthContext);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const querySnapshot = await getDocs(collection(firestoreApp, 'auctions'));
      const docsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocs(docsArray);
    };

    fetchDocs();
  }, []);

  return (
    <div className="py-5">
      <div className="container">
        {auction && <ProgressBar auction={auction} setAuction={setAuction} />}
        {globalMsg && <Alert variant="info">{globalMsg}</Alert>}
        {currentUser && <AddAuction setAuction={setAuction} />}
        {docs && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {docs.map((doc) => (
              <AuctionCard item={doc} key={doc.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
