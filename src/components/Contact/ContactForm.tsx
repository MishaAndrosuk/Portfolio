import React, { useId, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Send, CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { CONTACTS } from '../../config/site';
import { motion } from '../../theme';

/** Назва форми має збігатися зі статичною копією в index.html. */
const FORM_NAME = 'contact';

/**
 * Тема листа-сповіщення від Netlify. Без неї приходить загальний заголовок,
 * у якому нічого не видно зі списку пошти. %{submissionId} підставляє Netlify.
 */
const SUBJECT = 'Портфоліо: нове повідомлення (%{submissionId})';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Values {
  name: string;
  email: string;
  message: string;
}

const EMPTY: Values = { name: '', email: '', message: '' };

// Навмисно проста перевірка: суворіші регулярки відкидають валідні адреси
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

/**
 * Форма на Netlify Forms: сабміт іде звичайним POST на той самий домен,
 * бекенд не потрібен. Якщо запит не пройшов, показуємо пряму адресу пошти,
 * щоб людина не лишилась без способу звʼязку.
 */
const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const id = useId();

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [status, setStatus] = useState<Status>('idle');
  // Приховане поле-пастка: люди його не бачать, боти зазвичай заповнюють
  const [botField, setBotField] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const validate = (): boolean => {
    const next: Partial<Values> = {};
    if (!values.name.trim()) next.name = t('contact.form.nameError');
    if (!EMAIL_RE.test(values.email.trim())) next.email = t('contact.form.emailError');
    if (values.message.trim().length < 10) next.message = t('contact.form.messageError');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange =
    (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      // Прибираємо помилку одразу, щойно користувач почав правити поле
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || !validate()) return;

    setStatus('submitting');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': FORM_NAME,
          subject: SUBJECT,
          'bot-field': botField,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      setValues(EMPTY);
      setStatus('success');
      setToastOpen(true);
    } catch {
      setStatus('error');
    }
  };

  // Тоаст живе поза гілками, щоб не перемонтовуватись при зміні статусу
  const toast = (
    <Snackbar
      open={toastOpen}
      autoHideDuration={5000}
      onClose={(_, reason) => {
        if (reason !== 'clickaway') setToastOpen(false);
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setToastOpen(false)}
        severity="success"
        variant="filled"
        icon={<CheckCircleOutline fontSize="inherit" />}
        sx={{ width: '100%', alignItems: 'center', borderRadius: '12px', boxShadow: 6 }}
      >
        {t('contact.form.successTitle')}
      </Alert>
    </Snackbar>
  );

  if (status === 'success') {
    return (
      <>
        {toast}
        <Box
          role="status"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 2,
            py: 3,
          }}
        >
          <CheckCircleOutline sx={{ fontSize: 40, color: 'var(--c-accent)' }} aria-hidden="true" />
          <Box>
            <Typography variant="h4" component="p" sx={{ mb: 0.5 }}>
              {t('contact.form.successTitle')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--c-ink-muted)' }}>
              {t('contact.form.successText')}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={() => setStatus('idle')}>
            {t('contact.form.sendAnother')}
          </Button>
        </Box>
      </>
    );
  }

  const submitting = status === 'submitting';

  return (
    <>
      {toast}
      <Box
        component="form"
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'grid', gap: 2.5 }}
      >
        {/* Netlify визначає форму за цим полем */}
        <input type="hidden" name="form-name" value={FORM_NAME} />
        {/* Тема листа-сповіщення; %{submissionId} підставляє Netlify */}
        <input type="hidden" name="subject" value={SUBJECT} />

        {/* Пастка для ботів — прихована від людей і від зчитувачів екрана */}
        <Box sx={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <label>
            {t('contact.form.botField')}
            <input
              tabIndex={-1}
              autoComplete="off"
              name="bot-field"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
            />
          </label>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            id={`${id}-name`}
            name="name"
            label={t('contact.form.name')}
            value={values.name}
            onChange={handleChange('name')}
            error={Boolean(errors.name)}
            helperText={errors.name ?? ' '}
            autoComplete="name"
            required
            fullWidth
            disabled={submitting}
          />
          <TextField
            id={`${id}-email`}
            name="email"
            type="email"
            label={t('contact.form.email')}
            value={values.email}
            onChange={handleChange('email')}
            error={Boolean(errors.email)}
            helperText={errors.email ?? ' '}
            autoComplete="email"
            required
            fullWidth
            disabled={submitting}
          />
        </Box>

        <TextField
          id={`${id}-message`}
          name="message"
          label={t('contact.form.message')}
          placeholder={t('contact.form.messagePlaceholder')}
          value={values.message}
          onChange={handleChange('message')}
          error={Boolean(errors.message)}
          helperText={errors.message ?? ' '}
          multiline
          minRows={4}
          required
          fullWidth
          disabled={submitting}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            startIcon={
              submitting ? (
                <CircularProgress size={18} color="inherit" aria-hidden="true" />
              ) : (
                <Send />
              )
            }
          >
            {submitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </Button>

          <Typography variant="body2" sx={{ color: 'var(--c-ink-faint)' }}>
            {t('contact.form.privacy')}
          </Typography>
        </Box>

        {/* Помилки озвучуються зчитувачем екрана, а не лише показуються */}
        <Box role="alert" aria-live="polite">
          {status === 'error' && (
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                p: 2,
                borderRadius: '12px',
                border: '1px solid var(--c-accent-alt)',
                backgroundColor: 'var(--c-accent-alt-soft)',
                transition: `opacity ${motion.base} ${motion.ease}`,
              }}
            >
              <ErrorOutline fontSize="small" sx={{ color: 'var(--c-accent-alt)', mt: '2px' }} />
              <Typography variant="body2" sx={{ color: 'var(--c-ink)' }}>
                {t('contact.form.errorText')}{' '}
                <Link href={`mailto:${CONTACTS.email}`} sx={{ fontWeight: 600 }}>
                  {CONTACTS.email}
                </Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ContactForm;
