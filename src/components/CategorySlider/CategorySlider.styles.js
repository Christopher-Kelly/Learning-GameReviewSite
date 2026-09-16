import { colours } from '../../styles/colours';

export const sliderStyles = {
    root: { mb: 5 },
    heading: {
        color: colours.text,
        fontWeight: 700,
        mb: 1.5,
        letterSpacing: 0.5,
    },
    row: { display: 'flex', alignItems: 'stretch', gap: 1 },
    arrowButton: (canScroll) => ({
        color: canScroll ? colours.text : colours.inputBorder,
        backgroundColor: colours.card,
        border: `1px solid ${colours.cardBorder}`,
        borderRadius: 2,
        '&:hover': { backgroundColor: colours.buttonHover },
        flexShrink: 0,
    }),
    cardsContainer: { display: 'flex', flex: 1, gap: 1.5 },
    card: {
        flex: '1 0 0',
        cursor: 'pointer',
        p: 2,
        backgroundColor: colours.card,
        border: `1px solid ${colours.cardBorder}`,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 100,
        transition: 'transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        '&:hover': {
            transform: 'scale(1.04)',
            borderColor: 'primary.main',
            backgroundColor: colours.cardHover,
        },
    },
    cardTitle: {
        color: colours.text,
        fontWeight: 600,
        fontSize: '0.9rem',
        mb: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    cardRating: { color: colours.gold, fontSize: '0.8rem' },
};
