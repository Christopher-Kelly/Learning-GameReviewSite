import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { sliderStyles } from './CategorySlider.styles';

const CARDS_VISIBLE = 5;

export const CategorySlider = ({ category, games }) => {
    const [startIndex, setStartIndex] = useState(0);
    const navigate = useNavigate();

    const canScroll = games.length > CARDS_VISIBLE;
    const count = Math.min(CARDS_VISIBLE, games.length);
    const visibleGames = Array.from(
        { length: count },
        (_, i) => games[(startIndex + i) % games.length]
    );

    const handleNext = () => setStartIndex(prev => (prev + CARDS_VISIBLE) % games.length);
    const handlePrev = () => setStartIndex(prev => (prev - CARDS_VISIBLE + games.length) % games.length);

    return (
        <Box sx={sliderStyles.root}>
            <Typography variant="h6" sx={sliderStyles.heading}>{category}</Typography>

            <Box sx={sliderStyles.row}>
                <IconButton onClick={handlePrev} disabled={!canScroll} sx={sliderStyles.arrowButton(canScroll)}>
                    <ChevronLeft />
                </IconButton>

                <Box sx={sliderStyles.cardsContainer}>
                    {visibleGames.map((game, i) => (
                        <Box
                            key={`${game.id}-${startIndex}-${i}`}
                            onClick={() => navigate(`/games/${game.id}`, { state: { game } })}
                            sx={sliderStyles.card}
                        >
                            <Typography sx={sliderStyles.cardTitle}>{game.name}</Typography>
                            <Typography sx={sliderStyles.cardRating}>⭐ {game.averageRating ?? '—'}</Typography>
                        </Box>
                    ))}
                </Box>

                <IconButton onClick={handleNext} disabled={!canScroll} sx={sliderStyles.arrowButton(canScroll)}>
                    <ChevronRight />
                </IconButton>
            </Box>
        </Box>
    );
};
