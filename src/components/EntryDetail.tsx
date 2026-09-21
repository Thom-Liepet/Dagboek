import { ArrowLeft, CalendarDays, Edit3, Trash2 } from 'lucide-react'
import { MOODS, QUESTIONS, type JournalEntry } from '../types'

type Props = { entry: JournalEntry; onBack: () => void; onEdit: () => void; onDelete: () => void }
export function EntryDetail({ entry, onBack, onEdit, onDelete }: Props) {
  const mood = MOODS.find(item => item.value === entry.mood)
  return <div className="detail-page"><button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Terug naar overzicht</button><header className="detail-heading"><p className="eyebrow">JOUW REFLECTIE</p><h1>{new Date(`${entry.entry_date}T12:00:00`).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}</h1><div className="detail-meta"><span><CalendarDays size={15} /> {entry.entry_date}</span><span>{mood?.emoji} {mood?.label}</span></div></header><div className="answers">{QUESTIONS.map((question, index) => <article className="answer-block" key={question}><span>0{index + 1}</span><div><h2>{question}</h2><p>{entry[`answer_${index + 1}` as 'answer_1' | 'answer_2' | 'answer_3']}</p></div></article>)}</div><div className="detail-actions"><button className="secondary-button" onClick={onEdit}><Edit3 size={16} /> Bewerken</button><button className="danger-button" onClick={onDelete}><Trash2 size={16} /> Verwijderen</button></div></div>
}