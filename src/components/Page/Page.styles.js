import { colours } from '../../styles/colours';

export const pageStyles = {
    root: {
        minHeight: '100vh',
        backgroundColor: colours.pageBg,
        display: 'flex',
        flexDirection: 'column',
        color: colours.text,
    },
    container: {
        flex: 1,
        py: 4,
        px: { xs: 2, sm: 3 },
    },
    title: {
        mb: 4,
        fontWeight: 700,
        color: colours.text,
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        pb: 1,
    },
};
