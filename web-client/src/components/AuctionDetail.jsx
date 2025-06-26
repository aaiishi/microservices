import { useEffect, useState }  from 'react';
import { useParams }           from 'react-router-dom';
import api                      from '../api';
import BidForm                  from './BidForm';

export default function AuctionDetail() {
  const { id } = useParams();
  const [auc,setAuc] = useState(null);

  useEffect(()=>{
    api.get(`/auctions/${id}`).then(r=>setAuc(r.data));
  },[id]);

  if (!auc) return <p>Chargement…</p>;

  return (
    <div>
      <h2>{auc.title}</h2>
      <p>{auc.description}</p>
      <p>Prix actuel : {auc.currentPrice}€</p>
      <BidForm auctionId={id} onBid={newPrice=>setAuc(s=>({ ...s, currentPrice:newPrice }))}/>
    </div>
  );
}
