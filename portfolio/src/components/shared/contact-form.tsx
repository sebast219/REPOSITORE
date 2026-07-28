'use client'

import { useCallback, useState } from 'react'

interface FormState {
  name: string
  email: string
  message: string
  honeypot: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const INITIAL: FormState = { name: '', email: '', message: '', honeypot: '' }

function validate({ name, email, message }: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!name.trim()) errors.name = 'Required'
  if (!email.trim()) {
    errors.email = 'Required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email'
  }
  if (!message.trim()) {
    errors.message = 'Required'
  } else if (message.length < 10) {
    errors.message = 'At least 10 characters'
  }
  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    },
    [],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const v = validate(form)
      setErrors(v)
      if (Object.keys(v).length > 0) return

      setStatus('sending')
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error()
        setStatus('success')
        setForm(INITIAL)
      } catch {
        setStatus('error')
      }
    },
    [form],
  )

  const fieldClass = (key: keyof FormErrors) =>
    `w-full bg-transparent border-b py-3 font-body text-[1.2rem] text-white outline-none placeholder:text-white/25 ${
      errors[key] ? 'border-red-400' : 'border-white/20 focus:border-white/60'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form flex flex-col gap-8"
      noValidate
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className={fieldClass('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-400 text-[0.85rem] mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          className={fieldClass('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-red-400 text-[0.85rem] mt-1">{errors.email}</p>}
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Your message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className={fieldClass('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-red-400 text-[0.85rem] mt-1">{errors.message}</p>}
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={form.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-outline-light self-start text-[0.95rem] py-3 px-6"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
      {status === 'success' && (
        <p className="text-green-400 text-[0.95rem]" role="alert" aria-live="polite">
          Message sent! I&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-[0.95rem]" role="alert" aria-live="polite">
          Something went wrong. Try again or email me directly.
        </p>
      )}
    </form>
  )
}
