import { useState } from 'react'
import { ArrowRight, BookHeart, LoaderCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    const result = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (result.error) setMessage(result.error.message)
    else if (isSignUp) setMessage('Mooi. Controleer je e-mail om je account te bevestigen.')
  }

  return <main className="auth-shell">
    <section className="auth-panel">
      <div className="brand-mark"><BookHeart size={22} strokeWidth={1.8} /></div>
      <p className="eyebrow">MOMENT · JOUW DAGELIJKSE PAUZE</p>
      <h1>Een plek voor wat<br /><em>blijft hangen.</em></h1>
      <p className="auth-intro">Schrijf even uit wat vandaag met je deed. Klein genoeg om vol te houden, waardevol genoeg om naar terug te keren.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>E-mailadres<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jij@voorbeeld.nl" required /></label>
        <label>Wachtwoord<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimaal 6 tekens" minLength={6} required /></label>
        {message && <p className="form-message">{message}</p>}
        <button className="primary-button" disabled={loading}>{loading ? <LoaderCircle className="spin" size={18} /> : <>{isSignUp ? 'Account aanmaken' : 'Inloggen'} <ArrowRight size={18} /></>}</button>
      </form>
      <button className="text-button" onClick={() => { setIsSignUp(!isSignUp); setMessage('') }}>{isSignUp ? 'Ik heb al een account' : 'Nog geen account? Begin hier'}</button>
    </section>
    <aside className="auth-art"><span>“</span><p>De dag hoeft niet perfect te zijn om de moeite waard te zijn om te onthouden.</p><small>— Een dagelijkse gedachte</small></aside>
  </main>
}