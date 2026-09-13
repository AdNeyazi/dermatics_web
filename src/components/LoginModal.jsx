import { useState } from 'react';
import { signIn, signUp } from '../api/client';

export default function LoginModal({ open, onClose, onSuccess }) {
  const [mode, setMode] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const resetForm = () => {
    setError('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const result =
        mode === 'signIn'
          ? await signIn(email.trim(), password)
          : await signUp({
              email: email.trim(),
              password,
              passwordConfirmation,
              name: name.trim(),
            });

      onSuccess(result.user, result.token);
      onClose();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    resetForm();
  };

  return (
    <div className="login-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <button type="button" className="login-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <p className="login-modal-eyebrow">Private client access</p>
        <h2 id="login-modal-title" className="login-modal-title">
          {mode === 'signIn' ? 'Sign in' : 'Create account'}
        </h2>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'signUp' && (
            <label className="login-field">
              <span>Name</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
          )}

          <label className="login-field">
            <span>Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
            />
          </label>

          {mode === 'signUp' && (
            <label className="login-field">
              <span>Confirm password</span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </label>
          )}

          {error && <p className="login-form-error">{error}</p>}

          <button type="submit" className="btn-contact login-submit" disabled={submitting}>
            {submitting ? 'Please wait…' : mode === 'signIn' ? 'Sign in' : 'Register'}
          </button>
        </form>

        <p className="login-modal-switch">
          {mode === 'signIn' ? (
            <>
              New to Dermatics?{' '}
              <button type="button" onClick={() => switchMode('signUp')}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button type="button" onClick={() => switchMode('signIn')}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
