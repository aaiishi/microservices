import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function AuctionsList() {
  const [aucs,setAucs] = useState([]);
  useEffect(()=>{ api.get('/auctions').then(r=>setAucs(r.data)); }, []);

  return (
    <div>
      <h2>Enchères</h2>
      <ul>
        {aucs.map(a=>(
          <li key={a._id}>
            <Link to={`/auction/${a._id}`}>{a.title} — {a.currentPrice}€</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
