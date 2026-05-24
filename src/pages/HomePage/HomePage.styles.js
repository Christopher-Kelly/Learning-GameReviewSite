import { colours } from '../../styles/colours';

export const homePageStyles = {
    fullPageSpinner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2,
    },
    loadingText: { color: colours.textMuted },
    noCategories: {
        color: colours.textMuted,
        textAlign: 'center',
        mt: 8,
    },
    noGamesText: { color: colours.textMuted, mb: 5 },
    skeleton: { mb: 5 },
    skeletonHeading: { color: colours.text, fontWeight: 700, mb: 1.5 },
    skeletonCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 108,
        backgroundColor: colours.card,
        border: `1px solid ${colours.cardBorder}`,
        borderRadius: 2,
    },
    errorCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 108,
        backgroundColor: colours.card,
        border: `1px solid ${colours.error.border}`,
        borderRadius: 2,
    },
    errorText: { color: colours.error.text, fontSize: '0.9rem' },
};
