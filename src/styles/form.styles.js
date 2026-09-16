import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { colours } from './colours';

export const FormWrapper = ({ children }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: 'calc(100vh - 64px)',
            pt: { xs: 4, sm: 8 },
            px: 2,
            backgroundColor: colours.pageBg,
        }}
    >
        <Paper
            elevation={6}
            sx={{
                backgroundColor: colours.card,
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                width: '100%',
                maxWidth: 440,
                border: `1px solid ${colours.cardBorder}`,
            }}
        >
            {children}
        </Paper>
    </Box>
);

export const FormTitle = ({ children }) => (
    <Typography
        variant="h5"
        component="h1"
        sx={{
            color: colours.text,
            fontWeight: 700,
            mb: 3,
            textAlign: 'center',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1.5,
        }}
    >
        {children}
    </Typography>
);

export const FormTextField = ({ name, label, errors = {}, touched = {}, ...props }) => (
    <TextField
        name={name}
        label={label}
        fullWidth
        variant="outlined"
        error={!!(touched[name] && errors[name])}
        helperText={(touched[name] && errors[name]) || ' '}
        sx={{
            mb: 1,
            '& .MuiOutlinedInput-root': {
                color: colours.text,
                '& fieldset': { borderColor: colours.inputBorder },
                '&:hover fieldset': { borderColor: colours.inputBorderHover },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
            },
            '& .MuiInputLabel-root': { color: colours.textMuted },
            '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
            '& .MuiFormHelperText-root': { minHeight: '1.5em' },
        }}
        {...props}
    />
);

export const SubmitButton = ({ children, ...props }) => (
    <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{
            mt: 2,
            py: 1.5,
            fontWeight: 700,
            borderRadius: 2,
            fontSize: '1rem',
            textTransform: 'none',
        }}
        {...props}
    >
        {children}
    </Button>
);

export const ApiErrorAlert = ({ error }) => {
    if (!error) return null;
    return (
        <Alert
            severity="error"
            sx={{
                mb: 2,
                backgroundColor: colours.error.bg,
                color: colours.error.text,
                border: `1px solid ${colours.error.border}`,
                '& .MuiAlert-icon': { color: colours.error.text },
            }}
        >
            {error}
        </Alert>
    );
};

export const SuccessAlert = ({ message }) => {
    if (!message) return null;
    return (
        <Alert
            severity="success"
            sx={{
                mb: 2,
                backgroundColor: colours.success.bg,
                color: colours.success.text,
                border: `1px solid ${colours.success.border}`,
                '& .MuiAlert-icon': { color: colours.success.text },
            }}
        >
            {message}
        </Alert>
    );
};
