import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Mail, Send } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/Buttons';
import { FadeIn } from '@/components/ui/FadeIn';
import { SITE } from '@/data/site';

const PROJECT_TYPES = ['Web platform', 'Business system', 'E-commerce', 'Mobile app', 'Automation & AI', 'Fix & maintain'];
const BUDGETS = ['Not sure yet', 'Under $2k', '$2k – $5k', '$5k – $15k', '$15k+'];

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get('name') ?? '').trim()) errors.name = 'Please tell us your name.';
  const email = String(data.get('email') ?? '').trim();
  if (!email) errors.email = 'We need an email to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That email doesn’t look right — check for typos.';
  if (String(data.get('message') ?? '').trim().length < 10)
    errors.message = 'A sentence or two about the project helps us reply properly.';
  return errors;
}

export function Contact() {
  const socials = SITE.socials.filter((s) => s.href);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-x-clip px-5 py-24 sm:px-8 md:px-10 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-1/4 h-[60vh] w-[60vw] rounded-full bg-brand-blue/20 blur-[140px]" />
        <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_30%_40%,#000,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <FadeIn className="flex flex-col">
          <p className="eyebrow">{'{/}'} Start a project</p>
          <h2
            id="contact-title"
            className="mt-4 font-display font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 136px)' }}
          >
            <span className="hero-heading block">Let’s build</span>
            <span className="text-brand-gradient block">what’s next.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-muted md:text-lg">
            Tell us about the problem you want to solve. We’ll come back with questions, a rough plan
            and the next steps — no obligation.
          </p>

          <div className="mt-10 space-y-6 lg:mt-auto lg:pt-12">
            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-3 rounded-full text-lg text-white md:text-2xl"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-brand-cyan group-hover:text-brand-cyan">
                <Mail aria-hidden className="h-5 w-5" />
              </span>
              <span className="underline decoration-white/20 underline-offset-8 transition-colors group-hover:decoration-brand-cyan">
                {SITE.email}
              </span>
            </a>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Social profiles">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted hover:text-white"
                    >
                      {s.label}
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}

function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [types, setTypes] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      data.get('company') ? `Company: ${data.get('company')}` : '',
      types.length ? `Project type: ${types.join(', ')}` : '',
      `Budget: ${data.get('budget')}`,
      '',
      String(data.get('message')),
    ]
      .filter((line, i, arr) => line !== '' || arr[i - 1] !== '')
      .join('\n');
    const subject = `New project — ${data.get('name')}${data.get('company') ? ` (${data.get('company')})` : ''}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const onBlur = (name: Field) => (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => {
    if (!errors[name]) return; // only re-validate a field that already shows an error
    const data = new FormData(e.currentTarget.form!);
    setErrors((prev) => ({ ...prev, [name]: validate(data)[name] }));
  };

  const input =
    'w-full rounded-2xl border bg-white/[0.03] px-4 py-3.5 text-base text-white placeholder:text-ink-subtle transition-colors focus:border-brand-cyan focus:outline-none focus-visible:outline-none';
  const border = (f: Field) => (errors[f] ? 'border-red-400/70' : 'border-white/10 hover:border-white/20');

  return (
    <div className="relative rounded-[32px] border border-white/10 bg-surface-1/70 p-6 shadow-[0_40px_120px_-40px_rgba(0,75,246,0.5)] backdrop-blur-xl sm:p-8 md:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-start justify-center gap-5"
            role="status"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-gradient">
              <Check aria-hidden className="h-7 w-7 text-white" strokeWidth={3} />
            </span>
            <h3 className="font-display text-3xl font-medium uppercase text-white">Almost there</h3>
            <p className="max-w-sm leading-relaxed text-ink-muted">
              Your email app should have opened with the message ready — just hit send. Nothing opened?
              Write to us directly at{' '}
              <a href={`mailto:${SITE.email}`} className="text-brand-cyan underline underline-offset-4">
                {SITE.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted underline-offset-4 hover:text-white hover:underline"
            >
              Edit the message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -12 }} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="mb-2 block text-sm text-ink">
                  Name <span className="text-brand-cyan" aria-hidden>*</span>
                </label>
                <input
                  id="cf-name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'cf-name-error' : undefined}
                  onBlur={onBlur('name')}
                  className={`${input} ${border('name')}`}
                />
                <FieldError id="cf-name-error" message={errors.name} />
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-2 block text-sm text-ink">
                  Email <span className="text-brand-cyan" aria-hidden>*</span>
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'cf-email-error' : undefined}
                  onBlur={onBlur('email')}
                  className={`${input} ${border('email')}`}
                />
                <FieldError id="cf-email-error" message={errors.email} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-company" className="mb-2 block text-sm text-ink">
                  Company <span className="text-ink-subtle">(optional)</span>
                </label>
                <input id="cf-company" name="company" autoComplete="organization" className={`${input} border-white/10 hover:border-white/20`} />
              </div>
              <div>
                <label htmlFor="cf-budget" className="mb-2 block text-sm text-ink">
                  Budget
                </label>
                <select
                  id="cf-budget"
                  name="budget"
                  defaultValue={BUDGETS[0]}
                  className={`${input} cursor-pointer appearance-none border-white/10 bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%239AA8BA' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 hover:border-white/20`}
                >
                  {BUDGETS.map((b) => (
                    <option key={b} className="bg-surface-2">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm text-ink">What do you need?</legend>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((type) => {
                  const on = types.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTypes((t) => (on ? t.filter((x) => x !== type) : [...t, type]))}
                      className={`min-h-[40px] rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                        on
                          ? 'border-brand-blue bg-brand-blue text-white'
                          : 'border-white/10 text-ink-muted hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="cf-message" className="mb-2 block text-sm text-ink">
                About the project <span className="text-brand-cyan" aria-hidden>*</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'cf-message-error' : 'cf-message-help'}
                onBlur={onBlur('message')}
                placeholder="What are you building, who is it for, and when do you need it?"
                className={`${input} resize-y ${border('message')}`}
              />
              {errors.message ? (
                <FieldError id="cf-message-error" message={errors.message} />
              ) : (
                <p id="cf-message-help" className="mt-2 text-xs text-ink-subtle">
                  Goals, timeline, links to anything similar — all helpful.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-ink-subtle">
                <span className="text-brand-cyan">*</span> Required. Opens your email app.
              </p>
              <PrimaryButton type="submit" icon={<Send className="h-[1.05em] w-[1.05em]" strokeWidth={2.2} />}>
                Send brief
              </PrimaryButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}
