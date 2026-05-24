import { colours } from '../../styles/colours';

export const unauthorizedStyles = {
    centred: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
        textAlign: 'center',
    },
    icon: { fontSize: 72, color: colours.inputBorder },
    heading: { color: colours.text, fontWeight: 700 },
    subtext: { color: colours.textMuted, maxWidth: 380 },
    buttonRow: { display: 'flex', gap: 2, mt: 1 },
    outlineButton: {
        textTransform: 'none',
        fontWeight: 600,
        borderColor: colours.inputBorder,
        color: colours.textMuted,
    },
};
