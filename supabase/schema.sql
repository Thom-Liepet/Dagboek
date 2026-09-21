create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  entry_date date not null,
  answer_1 text not null default '',
  answer_2 text not null default '',
  answer_3 text not null default '',
  mood text not null check (mood in ('great', 'good', 'neutral', 'low', 'bad')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entry_date)
);

alter table public.journal_entries enable row level security;

alter table public.journal_entries alter column user_id drop not null;

drop policy if exists "Users can view their own entries" on public.journal_entries;
drop policy if exists "Users can create their own entries" on public.journal_entries;
drop policy if exists "Users can update their own entries" on public.journal_entries;
drop policy if exists "Users can delete their own entries" on public.journal_entries;
drop policy if exists "Anyone can view journal entries" on public.journal_entries;
drop policy if exists "Anyone can create journal entries" on public.journal_entries;
drop policy if exists "Anyone can update journal entries" on public.journal_entries;
drop policy if exists "Anyone can delete journal entries" on public.journal_entries;

create policy "Anyone can view journal entries" on public.journal_entries for select using (true);
create policy "Anyone can create journal entries" on public.journal_entries for insert with check (true);
create policy "Anyone can update journal entries" on public.journal_entries for update using (true) with check (true);
create policy "Anyone can delete journal entries" on public.journal_entries for delete using (true);

create index if not exists journal_entries_user_date_idx on public.journal_entries (user_id, entry_date desc);