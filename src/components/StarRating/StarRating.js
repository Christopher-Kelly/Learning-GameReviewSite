import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { starRatingStyles } from './StarRating.styles';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const StarRating = ({ value, onChange }) => {
    const [hover, setHover] = useState(-1);

    return (
        <Box sx={starRatingStyles.root}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => onChange(newValue)}
                onChangeActive={(event, newHover) => setHover(newHover)}
                emptyIcon={<StarIcon style={starRatingStyles.emptyIcon} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={starRatingStyles.label}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
};
