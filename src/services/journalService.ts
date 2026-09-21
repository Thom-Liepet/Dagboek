import { supabase } from '../lib/supabase'
import type { EntryInput, JournalEntry } from '../types'

export async function fetchEntries(): Promise<JournalEntry[]> {
  const { data, error } = await supabase.from('journal_entries').select('*').order('entry_date', { ascending: false })
  if (error) throw error
  return (data ?? []) as JournalEntry[]
}

export async function saveEntry(input: EntryInput, id?: string): Promise<JournalEntry> {
  const query = id
    ? supabase.from('journal_entries').update({ ...input, updated_at: new Date().toISOString() }).eq('id', id).select().single()
    : supabase.from('journal_entries').insert(input).select().single()
  const { data, error } = await query
  if (error) throw error
  return data as JournalEntry
}

export async function deleteEntry(id: string): Promise<void> {
  const { error } = await supabase.from('journal_entries').delete().eq('id', id)
  if (error) throw error
}