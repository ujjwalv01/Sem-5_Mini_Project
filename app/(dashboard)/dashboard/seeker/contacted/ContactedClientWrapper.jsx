'use client';
import { useState } from 'react';
import ContactedRowClient from './ContactedRowClient';
export default function ContactedClientWrapper({ enquiries }) {
    const [expandedId, setExpandedId] = useState(null);
    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    return (<div className="space-y-4 mt-8">
      {enquiries.map((enq) => (<ContactedRowClient key={enq.id} enquiry={enq} isExpanded={expandedId === enq.id} onToggle={() => setExpandedId(expandedId === enq.id ? null : enq.id)} formatDate={formatDate}/>))}
    </div>);
}
