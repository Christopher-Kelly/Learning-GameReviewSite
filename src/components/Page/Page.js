import { Box, Container, Typography } from '@mui/material';
import { NavBar } from '../Navbar';
import { pageStyles } from './Page.styles';

export const Page = ({ children, title }) => {
    return (
        <Box sx={pageStyles.root}>
            <NavBar />
            <Container maxWidth="lg" component="main" sx={pageStyles.container}>
                {title && (
                    <Typography variant="h4" component="h1" sx={pageStyles.title}>
                        {title}
                    </Typography>
                )}
                {children}
            </Container>
        </Box>
    );
};
