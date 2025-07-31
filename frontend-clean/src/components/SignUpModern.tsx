import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Google, LinkedIn, Microsoft, Home, SupportAgent, ArrowBack } from '@mui/icons-material';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const userId = userCredential.user.uid;
      await setDoc(doc(db, 'approvals', userId), {
        ...form,
        status: 'pending',
        signupDate: serverTimestamp(),
      });
      await setDoc(doc(db, 'kpi', 'signup'), { count: increment(1) }, { merge: true });
      setSnackbar({ open: true, message: 'Signup successful! Sent for admin approval.', severity: 'success' });
      setLoading(false);
      navigate('/pending-approval');
    } catch (err) {
      // Firestore permission error handling
      if (err.code === 'permission-denied') {
        console.error('Firestore write error:', err.code, err.message);
        alert('You do not have permission to create a user profile. Please contact support.');
      } else {
        setSnackbar({ open: true, message: err?.message || 'Signup failed. Please try again.', severity: 'error' });
      }
      setLoading(false);
    }
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import zxcvbn from 'zxcvbn';
import axios from 'axios';
import { getFirestore, doc, setDoc, increment } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Helmet from 'react-helmet';

const passwordStrengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

const SignUpModern: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [passwordScore, setPasswordScore] = useState(0);

  // Accessibility: focus management
  const firstErrorField = Object.keys(errors)[0];

  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (form.password && form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match.';
    if (!form.acceptTerms) newErrors.acceptTerms = 'You must accept the terms.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (name === 'password') {
      setPasswordScore(zxcvbn(value).score);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      // Create user in Firebase Auth
      const auth = getAuth(getApp());
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const userId = userCredential.user.uid;
      // Save approval request in Firestore
      const db = getFirestore(getApp());
      await setDoc(doc(db, 'approvals', userId), {
        userId,
        email: form.email,
        name: form.name,
        status: 'pending',
        requestedAt: Date.now()
      }, { merge: true });
      // Update KPI
      await setDoc(doc(db, 'kpi', 'signup'), { count: increment(1) }, { merge: true });
      setSnackbar({ open: true, message: 'Signup successful! Sent for admin approval.', severity: 'success' });
      setForm({ name: '', email: '', password: '', confirmPassword: '', acceptTerms: false });
      setPasswordScore(0);
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.message || 'Signup failed. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Helmet>
        <title>Sign Up | Sine Construction IMS</title>
        <meta name="description" content="Create your account for Sine Construction IMS. Modern, secure, and accessible signup." />
      </Helmet>
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
        {/* Social Login Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
          <Button variant="outlined" startIcon={<Google />} onClick={() => window.location.href = '/api/auth/google'}>Google</Button>
          <Button variant="outlined" startIcon={<Microsoft />} onClick={() => window.location.href = '/api/auth/microsoft'}>Microsoft</Button>
          <Button variant="outlined" startIcon={<LinkedIn />} onClick={() => window.location.href = '/api/auth/linkedin'}>LinkedIn</Button>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Your Account
        </Typography>
        <form onSubmit={handleSubmit} aria-label="Sign up form">
          <FormControl fullWidth margin="normal" error={!!errors.name}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              autoFocus={!!firstErrorField && firstErrorField === 'name'}
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
            {errors.name && <FormHelperText id="name-error">{errors.name}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <FormHelperText id="email-error">{errors.email}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && <FormHelperText id="password-error">{errors.password}</FormHelperText>}
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color={passwordScore < 3 ? 'error' : 'success.main'}>
                Strength: {passwordStrengthLabels[passwordScore]}
              </Typography>
            </Box>
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.confirmPassword}>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirmPassword-error"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.confirmPassword && <FormHelperText id="confirmPassword-error">{errors.confirmPassword}</FormHelperText>}
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.acceptTerms}
                onChange={handleChange}
                name="acceptTerms"
                color="primary"
                inputProps={{ 'aria-label': 'Accept terms and conditions' }}
              />
            }
            label={<Typography variant="body2">I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>.</Typography>}
          />
          {errors.acceptTerms && <FormHelperText error>{errors.acceptTerms}</FormHelperText>}
          <Box sx={{ mt: 3, position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button startIcon={<ArrowBack />} onClick={() => navigate('/login')}>Back to Login</Button>
              <Button startIcon={<Home />} onClick={() => navigate('/')}>Home</Button>
              <Button startIcon={<SupportAgent />} onClick={() => navigate('/support')}>Contact Support</Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity as any} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUpModern;
