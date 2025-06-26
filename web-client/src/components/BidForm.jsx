import { useState } from 'react';
import api           from '../api';

export default function BidForm({ auctionId, onBid }) {
  const [amt,setAmt] = useState('');

  const submit = async e => {
    e.preventDefault();
    const { data } = await api.post('/bids', { auctionId, amount: +amt });
    onBid(data.amount);
  };

  return (
    <form onSubmit={submit}>
      <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Montant" />
      <button>Parier</button>
    </form>
  );
}
