import { Box, Button, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { Page } from '../../components/Page';
import { unauthorizedStyles } from './UnauthorizedPage.styles';

export const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <Page>
            <Box sx={unauthorizedStyles.centred}>
                <LockOutlined sx={unauthorizedStyles.icon} />
                <Typography variant="h4" sx={unauthorizedStyles.heading}>
                    Unauthorized
                </Typography>
                <Typography sx={unauthorizedStyles.subtext}>
                    You need to be signed in to view this page.
                </Typography>
                <Box sx={unauthorizedStyles.buttonRow}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/login')}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/home')}
                        sx={unauthorizedStyles.outlineButton}
                    >
                        Browse Games
                    </Button>
                </Box>
            </Box>
        </Page>
    );
};
