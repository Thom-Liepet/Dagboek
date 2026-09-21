import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { JournalEntry } from '../types'

export function CalendarView({ entries, onSelect }: { entries: JournalEntry[]; onSelect: (entry: JournalEntry) => void }) {
  const [month, setMonth] = useState(new Date())
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const offset = (first.getDay() + 6) % 7
  const byDate = new Map(entries.map(entry => [entry.entry_date, entry]))
  return <section className="calendar-section"><div className="section-heading"><div><p className="eyebrow">GESCHIEDENIS</p><h1>Je dagen, bij elkaar.</h1></div><div className="month-nav"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}><ChevronLeft size={18} /></button><strong>{month.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}</strong><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}><ChevronRight size={18} /></button></div></div><div className="calendar"><div className="weekdays">{['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{Array.from({ length: offset + days }, (_, index) => { const day = index - offset + 1; const date = day > 0 ? `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ''; const entry = byDate.get(date); return <button className={`${entry ? 'has-entry' : ''} ${date === new Date().toISOString().slice(0, 10) ? 'today' : ''}`} key={index} disabled={!entry} onClick={() => entry && onSelect(entry)}>{day > 0 && <>{day}{entry && <i />}</>}</button> })}</div></div></section>
}