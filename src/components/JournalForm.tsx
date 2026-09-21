import { useState } from 'react'
import { ArrowLeft, Check, LoaderCircle, Save } from 'lucide-react'
import { MOODS, QUESTIONS, type EntryInput, type JournalEntry, type Mood } from '../types'

type Props = { entry?: JournalEntry; onSave: (input: EntryInput, id?: string) => Promise<void>; onCancel: () => void }

export function JournalForm({ entry, onSave, onCancel }: Props) {
  const [form, setForm] = useState<EntryInput>({ entry_date: entry?.entry_date ?? new Date().toISOString().slice(0, 10), answer_1: entry?.answer_1 ?? '', answer_2: entry?.answer_2 ?? '', answer_3: entry?.answer_3 ?? '', mood: entry?.mood ?? 'good' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const update = (key: keyof EntryInput, value: string) => setForm(current => ({ ...current, [key]: value }))
  async function submit(event: React.FormEvent) { event.preventDefault(); setSaving(true); setError(''); try { await onSave(form, entry?.id) } catch (err) { setError(err instanceof Error ? err.message : 'Opslaan is niet gelukt.') } finally { setSaving(false) } }

  return <div className="editor-page">
    <button className="back-button" onClick={onCancel}><ArrowLeft size={17} /> Terug naar overzicht</button>
    <div className="editor-heading"><div><p className="eyebrow">{entry ? 'ENTRY BIJWERKEN' : 'DAGELIJKSE REFLECTIE'}</p><h1>{entry ? 'Je dag opnieuw bekijken' : 'Hoe was vandaag voor jou?'}</h1><p>Een paar minuten voor jezelf. Er hoeft niets mooi of compleet te zijn.</p></div><div className="date-pill"><span>Datum</span><input type="date" value={form.entry_date} onChange={e => update('entry_date', e.target.value)} /></div></div>
    <form onSubmit={submit}>
      <div className="question-list">{QUESTIONS.map((question, index) => <label className="question-card" key={question}><span className="question-number">0{index + 1}</span><strong>{question}</strong><textarea value={form[`answer_${index + 1}` as 'answer_1' | 'answer_2' | 'answer_3']} onChange={e => update(`answer_${index + 1}` as 'answer_1' | 'answer_2' | 'answer_3', e.target.value)} placeholder="Schrijf hier wat er in je opkomt..." required /></label>)}</div>
      <fieldset className="mood-section"><legend>Hoe voelt deze dag nu?</legend><div className="mood-options">{MOODS.map(mood => <button type="button" className={`mood-option ${form.mood === mood.value ? 'selected' : ''}`} key={mood.value} onClick={() => update('mood', mood.value as Mood)}><span>{mood.emoji}</span><small>{mood.label}</small></button>)}</div></fieldset>
      {error && <p className="error-banner">{error}</p>}
      <div className="form-actions"><button type="button" className="secondary-button" onClick={onCancel}>Annuleren</button><button className="primary-button" disabled={saving}>{saving ? <LoaderCircle className="spin" size={18} /> : entry ? <><Check size={18} /> Wijzigingen bewaren</> : <><Save size={18} /> Entry opslaan</>}</button></div>
    </form>
  </div>
}