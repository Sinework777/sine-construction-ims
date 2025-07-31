

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, TextField, Typography, Paper, Grid, InputAdornment, IconButton, Checkbox, FormControlLabel, CircularProgress, Alert, Link, Stepper, Step, StepLabel, Snackbar, useMediaQuery, Tooltip, Divider, Fade, Avatar, LinearProgress, Collapse
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, CheckCircle, Error as ErrorIcon, Brightness4, Brightness7, Google, LinkedIn, Microsoft, InfoOutlined, UploadFile, Home, SupportAgent, SaveAlt } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './SignUpTheme';
import { steps, howHeardOptions } from './SignUpSteps';
import { passwordStrengthLabels, passwordRequirements, validateField } from './SignUpValidation';
import { motion } from 'framer-motion';
import { authAPI } from '../services/authAPI';
import { createUserWithRole } from '../services/userService';
import { uploadFile } from '../services/storageService';
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from 'firebase/auth';
import { db } from '../config/firebase';

const initialForm = {
  firstName: '', lastName: '', email: '', company: '', phone: '', howHeard: '', password: '', confirmPassword: '', terms: false, logo: null, logoUrl: ''
};

// Move testimonials and trustBadges above the component to avoid TDZ errors
const testimonials = [
  { name: 'Sarah M.', company: 'Acme Builders', quote: '“SINE IMS made onboarding our team a breeze. The support is world-class!”', avatar: '/assets/testimonial1.png' },
  { name: 'James L.', company: 'Skyline Projects', quote: '“The sign-up was so fast and easy. Love the security features!”', avatar: '/assets/testimonial2.png' },
  { name: 'Priya S.', company: 'UrbanEdge', quote: '“We trust SINE IMS for all our projects. Highly recommended!”', avatar: '/assets/testimonial3.png' },
];
const trustBadges = [
  { src: '/assets/badge-iso.png', alt: 'ISO 27001 Certified' },
  { src: '/assets/badge-g2.png', alt: 'G2 Crowd High Performer' },
  { src: '/assets/badge-gdpr.png', alt: 'GDPR Compliant' },
];

export default function SignUpForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [companyOptions, setCompanyOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // Removed error state (now using snackbar for all feedback)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailUnique, setEmailUnique] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [saving, setSaving] = useState(false);
  // Removed unused savedDraft state
  const [showLogoUpload, setShowLogoUpload] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  // Cycle testimonials every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx(idx => (idx + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  // Keyboard navigation: focus trap within form
  const trapRef = useRef();
  useEffect(() => {
    const trap = trapRef.current;
    if (!trap) return;
    const focusable = trap.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    function handleTab(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    trap.addEventListener('keydown', handleTab);
    return () => trap.removeEventListener('keydown', handleTab);
  }, [step, darkMode, highContrast]);
  const formRef = useRef();

  // Company autocomplete (simulate async fetch)
  useEffect(() => {
    setCompanyOptions([
      'Sinework Construction', 'Acme Builders', 'Global Infra', 'Skyline Projects', 'UrbanEdge', 'Other'
    ]);
  }, []);

  // Email uniqueness check (simulate async)
  useEffect(() => {
    if (!form.email) return;
    setCheckingEmail(true);
    setTimeout(() => {
      setEmailUnique(form.email !== 'test@duplicate.com');
      setCheckingEmail(false);
    }, 600);
  }, [form.email]);

  // Field validation
  useEffect(() => {
    const newErrors = {};
    for (const field of steps[step].fields) {
      newErrors[field] = validateField(field, form[field], form);
    }
    setErrors(newErrors);
  }, [form, step]);

  // Accessibility: focus first field on step change
  useEffect(() => {
    if (formRef.current) {
      const input = formRef.current.querySelector('input,select,textarea,button');
      if (input) input.focus();
    }
  }, [step]);

  // Demo Experience
  const handleDemo = () => {
    setDemoLoading(true);
    setTimeout(() => {
      setDemoLoading(false);
      window.location.href = '/sys-admin-dashboard?demo=1';
    }, 1200);
  };

  // Field change
  const handleChange = (e, valueOverride) => {
    const { name, value, type, checked, files } = e.target || {};
    let val = valueOverride !== undefined ? valueOverride : (type === 'checkbox' ? checked : value);
    if (type === 'file' && files && files[0]) {
      val = files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setForm((prev) => ({ ...prev, logoUrl: ev.target.result }));
      reader.readAsDataURL(files[0]);
    }
    setForm((prev) => ({ ...prev, [name || e.target?.id]: val }));
    setTouched((prev) => ({ ...prev, [name || e.target?.id]: true }));
    setSnackbar({ open: false, message: '', severity: 'info' });
  };
  // Save and Continue Later
  const handleSaveDraft = () => {
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem('signupDraft', JSON.stringify(form));
      setSaving(false);
      // removed setSavedDraft(true) as savedDraft state is not used
      setSnackbar({ open: true, message: 'Progress saved! You can continue later.', severity: 'success' });
    }, 800);
  };
  useEffect(() => {
    const draft = localStorage.getItem('signupDraft');
    if (draft) setForm(JSON.parse(draft));
  }, []);

  // Step navigation
  const canProceed = () => steps[step].fields.every(f => !validateField(f, form[f], form));
  const handleNext = () => {
    if (canProceed()) {
      //
      setStep((s) => s + 1);
    } else {
      setTouched((prev) => ({ ...prev, ...Object.fromEntries(steps[step].fields.map(f => [f, true])) }));
      setSnackbar({ open: true, message: 'Please fix errors before continuing.', severity: 'error' });
    }
  };
  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
    //
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbar({ open: false, message: '', severity: 'info' });
    if (!canProceed()) {
      setTouched((prev) => ({ ...prev, ...Object.fromEntries(steps[step].fields.map(f => [f, true])) }));
      setSnackbar({ open: true, message: 'Please fix errors before submitting.', severity: 'error' });
      return;
    }
    setLoading(true);
    try {
      // 1. Register user with Firebase Auth
      const { email, password, firstName, lastName, company, phone, howHeard, logo } = form;
      const regResult = await authAPI.register({ email, password });
      if (!regResult.success) throw new Error(regResult.message);
      // 2. Upload company logo if present
      let logoUrl = '';
      if (logo) {
        logoUrl = await uploadFile(`company-logos/${company}-${Date.now()}`, logo);
      }
      // 3. Create user profile in Firestore
      await createUserWithRole({
        fullName: `${firstName} ${lastName}`,
        email,
        phone,
        company,
        roles: ['User'],
        status: 'Pending System Admin',
        howHeard,
        logoUrl,
      }, regResult.user.uid);
      setSuccess(true);
      setSnackbar({ open: true, message: 'Sign-up successful! Check your email for next steps.', severity: 'success' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Sign-up failed. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Social sign-up handlers
  const handleGoogleSignUp = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: '', severity: 'info' });
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Create user profile in Firestore if new
      await createUserWithRole({
        fullName: user.displayName || '',
        email: user.email,
        phone: user.phoneNumber || '',
        company: form.company,
        roles: ['User'],
        status: 'Pending System Admin',
        howHeard: form.howHeard,
        logoUrl: form.logoUrl,
      }, user.uid);
      setSuccess(true);
      setSnackbar({ open: true, message: 'Sign-up successful! Check your email for next steps.', severity: 'success' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Google sign-up failed.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignUp = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: '', severity: 'info' });
    try {
      const provider = new OAuthProvider('microsoft.com');
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserWithRole({
        fullName: user.displayName || '',
        email: user.email,
        phone: user.phoneNumber || '',
        company: form.company,
        roles: ['User'],
        status: 'Pending System Admin',
        howHeard: form.howHeard,
        logoUrl: form.logoUrl,
      }, user.uid);
      setSuccess(true);
      setSnackbar({ open: true, message: 'Sign-up successful! Check your email for next steps.', severity: 'success' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Microsoft sign-up failed.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // LinkedIn SSO is not natively supported by Firebase, but can be added via OAuthProvider if enabled in Firebase console
  const handleLinkedInSignUp = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: '', severity: 'info' });
    try {
      const provider = new OAuthProvider('linkedin.com');
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserWithRole({
        fullName: user.displayName || '',
        email: user.email,
        phone: user.phoneNumber || '',
        company: form.company,
        roles: ['User'],
        status: 'Pending System Admin',
        howHeard: form.howHeard,
        logoUrl: form.logoUrl,
      }, user.uid);
      setSuccess(true);
      setSnackbar({ open: true, message: 'Sign-up successful! Check your email for next steps.', severity: 'success' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'LinkedIn sign-up failed.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Accessibility: font size adjustment
  const handleFontSize = (delta) => setFontSize(f => Math.max(0.8, Math.min(1.3, f + delta)));

  // Dark mode toggle
  const handleThemeToggle = () => setDarkMode(d => !d);

  // Summary panel content
  const summaryPanel = (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, minWidth: 260, mb: isMobile ? 2 : 0 }}>
      <Typography variant="h6" fontWeight={700} mb={1}>What happens next?</Typography>
      <Typography variant="body2" mb={2}>You'll receive a verification email. Your access will be set by your company admin.</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" color="text.secondary" mb={1}>
        <Lock sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
        Your information is encrypted and never shared.
      </Typography>
      <Typography variant="caption" color="text.secondary">SINE Construction IMS is trusted by leading construction firms worldwide.</Typography>
      <Box mt={2}>
        <Link href="/privacy" target="_blank" rel="noopener" underline="hover" color="primary">Privacy Policy</Link>
      </Box>
    </Box>
  );

  // Success screen
  if (success) {
    return (
      <ThemeProvider theme={{ ...theme, palette: { ...theme.palette, mode: darkMode ? 'dark' : 'light' } }}>
        <Fade in={true} timeout={600}>
          <Paper elevation={4} sx={{ maxWidth: 480, mx: 'auto', mt: 6, p: 4, borderRadius: 3, textAlign: 'center' }}>
            <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" fontWeight={700} mb={1}>Account Created!</Typography>
            <Typography variant="body1" mb={2}>Check your email for verification and next steps. Your access will be set by your company admin.</Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} onClick={() => navigate('/login')}>Go to Login</Button>
            <Button variant="outlined" color="secondary" fullWidth sx={{ mb: 1 }} onClick={handleDemo}>Try Demo</Button>
            <Button variant="text" color="primary" fullWidth onClick={() => navigate('/')}>Back to Home</Button>
          </Paper>
        </Fade>
      </ThemeProvider>
    );
  }

  // Main form
  return (
    <ThemeProvider theme={{ ...theme, palette: { ...theme.palette, mode: darkMode ? 'dark' : 'light' } }}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: highContrast
            ? '#000'
            : darkMode
            ? '#181c24'
            : 'linear-gradient(135deg, #1976d2 0%, #90caf9 100%)',
          color: highContrast ? '#fff' : undefined,
          transition: 'background 0.3s',
        }}
        role="main"
        aria-label="Sign up main content"
      >
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: 2, py: isMobile ? 2 : 6, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4, fontSize: `${fontSize}em` }}>
          <Box sx={{ flex: 1.2, minWidth: 340, maxWidth: 560, mx: 'auto' }}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 4,
                p: isMobile ? 2 : 4,
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0 8px 32px rgba(25,118,210,0.08)',
                bgcolor: highContrast ? '#111' : undefined,
                color: highContrast ? '#fff' : undefined,
              }}
              aria-label="Sign up form container"
              role="region"
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" fontWeight={800} color={highContrast ? '#fff' : 'primary.main'}>Sign Up</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}><IconButton onClick={handleThemeToggle} color="primary" aria-label="Toggle dark mode">{darkMode ? <Brightness7 /> : <Brightness4 />}</IconButton></Tooltip>
                  <Tooltip title={highContrast ? 'Normal contrast' : 'High contrast'}><IconButton onClick={() => setHighContrast(h => !h)} color={highContrast ? 'secondary' : 'primary'} aria-label="Toggle high contrast mode" tabIndex={0}>
                    <span style={{ fontWeight: 900, fontSize: 18 }}>C</span>
                  </IconButton></Tooltip>
                  <Tooltip title="Increase font size"><IconButton onClick={() => handleFontSize(0.1)} color="primary" aria-label="Increase font size">A+</IconButton></Tooltip>
                  <Tooltip title="Decrease font size"><IconButton onClick={() => handleFontSize(-0.1)} color="primary" aria-label="Decrease font size">A-</IconButton></Tooltip>
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mb: 2, fontWeight: 700, borderWidth: 2, borderStyle: 'dashed' }}
                onClick={handleDemo}
                disabled={demoLoading}
                aria-label="Try Demo Experience"
                startIcon={<Home />}
              >
                {demoLoading ? <CircularProgress size={20} color="inherit" /> : 'Try Demo Experience'}
              </Button>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'center' }}>
                <Button variant="outlined" color="primary" startIcon={<Google />} sx={{ minWidth: 0, px: 1.5, fontWeight: 700 }} aria-label="Sign up with Google" onClick={handleGoogleSignUp} disabled={loading}>Google</Button>
                <Button variant="outlined" color="primary" startIcon={<Microsoft />} sx={{ minWidth: 0, px: 1.5, fontWeight: 700 }} aria-label="Sign up with Microsoft" onClick={handleMicrosoftSignUp} disabled={loading}>Microsoft</Button>
                <Button variant="outlined" color="primary" startIcon={<LinkedIn />} sx={{ minWidth: 0, px: 1.5, fontWeight: 700 }} aria-label="Sign up with LinkedIn" onClick={handleLinkedInSignUp} disabled={loading}>LinkedIn</Button>
              </Box>
              <LinearProgress variant="determinate" value={((step + 1) / steps.length) * 100} sx={{ mb: 2, height: 8, borderRadius: 2, bgcolor: 'grey.100' }} />
              <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
                {steps.map((s) => <Step key={s.label}><StepLabel>{s.label}</StepLabel></Step>)}
              </Stepper>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                autoComplete="off"
                aria-label="Sign up form"
                style={{ outline: 'none' }}
                tabIndex={0}
                role="form"
                aria-describedby="signup-desc"
                ref={trapRef}
              >
                <Grid container spacing={2} role="group" aria-label="Sign up fields">
                  {/* Step 1: Basic Info */}
                  {step === 0 && <>
                    <Grid item xs={12} sm={6}>
                      <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} fullWidth required autoFocus inputProps={{ 'aria-label': 'First Name' }} error={!!touched.firstName && !!errors.firstName} helperText={touched.firstName && errors.firstName} aria-required="true" aria-invalid={!!errors.firstName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} fullWidth required inputProps={{ 'aria-label': 'Last Name' }} error={!!touched.lastName && !!errors.lastName} helperText={touched.lastName && errors.lastName} aria-required="true" aria-invalid={!!errors.lastName} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Email Address" name="email" value={form.email} onChange={handleChange} fullWidth required type="email"
                        error={!!touched.email && (!!errors.email || !emailUnique)}
                        helperText={touched.email && (errors.email || (!emailUnique ? 'Email already registered.' : ''))}
                        InputProps={{ endAdornment: checkingEmail && <CircularProgress size={18} /> }}
                        inputProps={{ 'aria-label': 'Email Address' }}
                        aria-required="true"
                        aria-invalid={!!errors.email || !emailUnique}
                      />
                    </Grid>
                  </>}
                  {/* Step 2: Company Info */}
                  {step === 1 && <>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Autocomplete
                          freeSolo
                          options={companyOptions}
                          value={form.company}
                          onInputChange={(_, value) => handleChange({ target: { name: 'company', value } })}
                        renderInput={(params) => <TextField {...params} label="Company" name="company" required fullWidth inputProps={{ ...params.inputProps, 'aria-label': 'Company' }} error={!!touched.company && !!errors.company} helperText={touched.company && errors.company} aria-required="true" aria-invalid={!!errors.company} />}
                        />
                        <Tooltip title="Upload your company logo (optional)"><IconButton color="primary" component="span" onClick={() => setShowLogoUpload(v => !v)}><UploadFile /></IconButton></Tooltip>
                      </Box>
                      <Collapse in={showLogoUpload}>
                        <Box sx={{ mt: 1, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button variant="outlined" component="label" startIcon={<UploadFile />} size="small">
                            Upload Logo
                            <input type="file" accept="image/*" hidden name="logo" onChange={handleChange} />
                          </Button>
                          {form.logoUrl && <Avatar src={form.logoUrl} alt="Company Logo" sx={{ width: 40, height: 40, border: '2px solid #1976d2' }} />}
                        </Box>
                      </Collapse>
                      {companyOptions.includes(form.company) && (
                        <Alert severity="info" sx={{ mt: 1, fontSize: 14 }}>
                          Your company is already on SINE Construction IMS—<Link href="#" underline="hover">request access</Link> or <Link href="#" underline="hover">create a new team</Link>?
                        </Alert>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Phone Number (optional)"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                        placeholder="e.g. +1 555 123 4567"
                        inputProps={{ pattern: '+?[0-9 -]{7,20}', 'aria-label': 'Phone Number' }}
                        helperText={touched.phone && errors.phone}
                        error={!!touched.phone && !!errors.phone}
                        InputProps={{
                          endAdornment: (
                            <Tooltip title="Why do we need this?"><IconButton size="small"><InfoOutlined fontSize="small" /></IconButton></Tooltip>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        label="How did you hear about us? (optional)"
                        name="howHeard"
                        value={form.howHeard}
                        onChange={handleChange}
                        fullWidth
                        SelectProps={{ native: true }}
                        inputProps={{ 'aria-label': 'How did you hear about us?' }}
                      >
                        <option value=""></option>
                        {howHeardOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </TextField>
                    </Grid>
                  </>}
                  {/* Step 3: Security */}
                  {step === 2 && <>
                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword((show) => !show)} edge="end" aria-label="toggle password visibility">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{ 'aria-label': 'Password', autoComplete: 'new-password' }}
                        aria-required="true"
                        aria-invalid={!!errors.password}
                        helperText={form.password && `Strength: ${passwordStrengthLabels[form.password ? Math.min(4, Math.floor(form.password.length / 4)) : 0]}`}
                        error={!!touched.password && !!errors.password}
                      />
                      {form.password && (
                        <Box sx={{ mt: 1, mb: 1 }}>
                          {passwordRequirements.map((req) => (
                            <Typography key={req.label} variant="caption" color={req.test(form.password) ? 'success.main' : 'text.secondary'} sx={{ display: 'block', pl: 1 }}>
                              {req.test(form.password) ? '✓' : '•'} {req.label}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirm((show) => !show)} edge="end" aria-label="toggle confirm password visibility">
                                {showConfirm ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{ 'aria-label': 'Confirm Password', autoComplete: 'new-password' }}
                        aria-required="true"
                        aria-invalid={!!errors.confirmPassword}
                        error={!!touched.confirmPassword && !!errors.confirmPassword}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox name="terms" checked={form.terms} onChange={handleChange} required inputProps={{ 'aria-label': 'Agree to Terms' }} aria-required="true" />}
                        label={<>
                          I agree to the <Link href="/terms" target="_blank" rel="noopener">Terms of Service</Link> and <Link href="/privacy" target="_blank" rel="noopener">Privacy Policy</Link>.
                        </>}
                      />
                      {touched.terms && errors.terms && <Typography variant="caption" color="error.main">{errors.terms}</Typography>}
                    </Grid>
                  </>}
                  {/* Step 4: Confirm */}
                  {step === 3 && (
                    <Grid item xs={12}>
                      <Alert severity="info" icon={<Lock />} sx={{ mb: 2 }}>
                        <b>Review your details before submitting.</b>
                      </Alert>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2">Name:</Typography>
                        <Typography>{form.firstName} {form.lastName}</Typography>
                        <Typography variant="subtitle2">Email:</Typography>
                        <Typography>{form.email}</Typography>
                        <Typography variant="subtitle2">Company:</Typography>
                        <Typography>{form.company}</Typography>
                        {form.phone && <><Typography variant="subtitle2">Phone:</Typography><Typography>{form.phone}</Typography></>}
                        {form.howHeard && <><Typography variant="subtitle2">How did you hear about us?</Typography><Typography>{form.howHeard}</Typography></>}
                      </Box>
                    </Grid>
                  )}
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }} role="group" aria-label="Form actions">
                  <Button variant="outlined" color="primary" disabled={step === 0} onClick={handleBack} aria-label="Back" tabIndex={0}>Back</Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Save and Continue Later"><span><Button variant="outlined" color="secondary" startIcon={<SaveAlt />} onClick={handleSaveDraft} disabled={saving}>{saving ? <CircularProgress size={18} /> : 'Save & Continue Later'}</Button></span></Tooltip>
                  </Box>
                  {step < steps.length - 1 ? (
                    <Button variant="contained" color="primary" onClick={handleNext} aria-label="Next" disabled={!canProceed() || loading} tabIndex={0}>{step === steps.length - 2 ? 'Review' : 'Next'}</Button>
                  ) : (
                    <Button type="submit" variant="contained" color="primary" disabled={loading} aria-label="Submit" tabIndex={0}>
                      {loading ? <CircularProgress size={22} color="inherit" /> : 'Create Account'}
                    </Button>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }} role="group" aria-label="Navigation links">
                  <Button variant="text" color="primary" startIcon={<Home />} onClick={() => navigate('/')} aria-label="Back to Home" tabIndex={0}>Back to Home</Button>
                  <Button variant="text" color="secondary" startIcon={<SupportAgent />} href="mailto:support@sineims.com" aria-label="Contact Support" tabIndex={0}>Contact Support</Button>
                </Box>
                <Button variant="text" color="primary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/login')} aria-label="Back to Login" tabIndex={0}>Back to Login</Button>
              </form>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Lock sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
                <Typography variant="caption" color="text.secondary">Your information is encrypted and never shared.</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
                {trustBadges.map(b => <Tooltip key={b.alt} title={b.alt}><img src={b.src} alt={b.alt} style={{ height: 32, filter: darkMode ? 'invert(1)' : 'none' }} /></Tooltip>)}
              </Box>
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                {/* Use motion for animated testimonial transitions */}
                <motion.div animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }} transition={{ duration: 6, repeat: Infinity, repeatType: 'loop' }}>
                  <Avatar src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} sx={{ mx: 'auto', width: 48, height: 48, mb: 1 }} />
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">{testimonials[testimonialIdx].quote}</Typography>
                  <Typography variant="caption" color="text.secondary">— {testimonials[testimonialIdx].name}, {testimonials[testimonialIdx].company}</Typography>
                </motion.div>
              </Box>
            </Paper>
          </Box>
          {/* Summary panel (right on desktop, below on mobile) */}
          <Box sx={{ flex: 1, minWidth: 260, maxWidth: 340, mx: 'auto', mt: isMobile ? 3 : 0 }}>{summaryPanel}</Box>
        </Box>
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }} iconMapping={{ success: <CheckCircle fontSize="inherit" />, error: <ErrorIcon fontSize="inherit" /> }}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
