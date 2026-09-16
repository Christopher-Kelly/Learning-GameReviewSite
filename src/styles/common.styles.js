import { colours } from './colours';

// Reusable sx prop objects shared across multiple components
export const common = {
    card: {
        backgroundColor: colours.card,
        border: `1px solid ${colours.cardBorder}`,
        borderRadius: 2,
    },
    divider: {
        borderColor: colours.cardBorder,
        mb: 4,
    },
    sectionHeading: {
        color: colours.text,
        fontWeight: 700,
        mb: 2,
    },
    fullPageSpinner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2,
    },
    centredSpinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
    },
    mutedText: {
        color: colours.textMuted,
    },
};
