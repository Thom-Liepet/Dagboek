export type Mood = 'great' | 'good' | 'neutral' | 'low' | 'bad'

export type JournalEntry = {
  id: string
  user_id: string
  entry_date: string
  answer_1: string
  answer_2: string
  answer_3: string
  mood: Mood
  created_at: string
  updated_at: string
}

export type EntryInput = Pick<JournalEntry, 'entry_date' | 'answer_1' | 'answer_2' | 'answer_3' | 'mood'>

export const MOODS: { value: Mood; emoji: string; label: string }[] = [
  { value: 'great', emoji: '😄', label: 'Geweldig' },
  { value: 'good', emoji: '🙂', label: 'Goed' },
  { value: 'neutral', emoji: '😐', label: 'Neutraal' },
  { value: 'low', emoji: '😕', label: 'Minder' },
  { value: 'bad', emoji: '😞', label: 'Slecht' },
]

export const QUESTIONS = [
  'Wat was vandaag een klein moment dat je eigenlijk niet wilt vergeten?',
  'Als je vandaag opnieuw kon beleven, wat zou je dan anders doen?',
  'Waar heb je vandaag meer over jezelf geleerd dan je vooraf had verwacht?',
]