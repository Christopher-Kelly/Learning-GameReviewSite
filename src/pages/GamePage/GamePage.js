import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, Divider, Paper, Rating, Tooltip, Typography } from '@mui/material';
import { StarRating } from '../../components/StarRating';
import { findGameInfo } from '../../api/games';
import { getReviews, postReviews } from '../../api/reviews';
import { Page } from '../../components/Page';
import { AuthContext } from '../../components/AuthContext';
import { gamePageStyles } from './GamePage.styles';

const RATING_MAP = {
    HALF_STAR: 0.5,
    ONE_STAR: 1,
    ONE_HALF_STARS: 1.5,
    TWO_STARS: 2,
    TWO_HALF_STARS: 2.5,
    THREE_STARS: 3,
    THREE_HALF_STARS: 3.5,
    FOUR_STARS: 4,
    FOUR_HALF_STARS: 4.5,
    FIVE_STARS: 5,
};

const toNumericRating = (rating) => {
    if (typeof rating === 'number') return rating;
    return RATING_MAP[rating] ?? 0;
};

const displayName = (r) => r.username || `User ${r.userID}`;

export const GamePage = () => {
    const { id: gameId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { isLogged } = useContext(AuthContext);

    const [game, setGame] = useState(location.state?.game);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(2);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const getAllReviews = async () => {
            const reviews = await getReviews({ id: gameId });
            console.log('get all reviews', reviews);
            if (reviews.length > 0) {
                setReviews(reviews);
            } else {
                return null;
            }
        };
        const getGame = async () => {
            console.log("in use effect");
            await getAllReviews();
            if (!game) {
                try {
                    const request = await findGameInfo({ id: gameId });
                    console.log(request);
                    setGame(request);
                } catch (e) {
                    console.error(e);
                }
            }
        };
        getGame();
    }, [gameId, game]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        postReviews({ rating, gameId: parseInt(gameId) });
    };

    if (!game) {
        return (
            <Page>
                <Box sx={gamePageStyles.loadingSpinner}>
                    <CircularProgress />
                </Box>
            </Page>
        );
    }

    return (
        <Page>
            <Box sx={gamePageStyles.header}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={gamePageStyles.backButton}>
                    Back
                </Button>

                <Typography variant="h4" sx={gamePageStyles.gameTitle}>{game.name}</Typography>

                <Box sx={gamePageStyles.ratingRow}>
                    <Rating value={toNumericRating(game.averageRating)} precision={0.5} readOnly size="small" />
                    <Typography sx={gamePageStyles.ratingText}>
                        {game.averageRating ?? '—'} ({game.reviewerNumber ?? 0} reviews)
                    </Typography>
                </Box>

                {game.categories?.length > 0 && (
                    <Box sx={gamePageStyles.categoriesRow}>
                        {game.categories.map(cat => (
                            <Chip key={cat} label={cat} size="small" sx={gamePageStyles.categoryChip} />
                        ))}
                    </Box>
                )}

                {game.bio && <Typography sx={gamePageStyles.bio}>{game.bio}</Typography>}
            </Box>

            <Divider sx={gamePageStyles.divider} />

            <Typography variant="h6" sx={gamePageStyles.sectionHeading}>Reviews</Typography>

            {reviews.length > 0 ? (
                <Box sx={gamePageStyles.reviewsContainer}>
                    {reviews.slice(0, visibleCount).map((r, index) => (
                        <Paper key={index} sx={gamePageStyles.reviewCard}>
                            <Box sx={gamePageStyles.reviewHeader}>
                                <Typography sx={gamePageStyles.reviewUsername}>{displayName(r)}</Typography>
                                <Rating value={toNumericRating(r.rating)} precision={0.5} readOnly size="small" />
                            </Box>
                            {r.review && <Typography sx={gamePageStyles.reviewText}>{r.review}</Typography>}
                        </Paper>
                    ))}
                    {visibleCount < reviews.length && (
                        <Button
                            onClick={() => setVisibleCount(prev => prev + 4)}
                            variant="outlined"
                            sx={gamePageStyles.seeMoreButton}
                        >
                            See More ({reviews.length - visibleCount} remaining)
                        </Button>
                    )}
                </Box>
            ) : (
                <Typography sx={gamePageStyles.noReviews}>Be the first to leave a review!</Typography>
            )}

            <Divider sx={gamePageStyles.divider} />

            <Typography variant="h6" sx={gamePageStyles.sectionHeading}>Leave a Review</Typography>

            <form onSubmit={onSubmitHandler}>
                <Box sx={isLogged ? gamePageStyles.starRatingOpaque : gamePageStyles.starRatingDimmed}>
                    <StarRating value={rating} onChange={setRating} />
                </Box>

                <Tooltip
                    title="You must be signed in to submit a review"
                    disableHoverListener={isLogged}
                    placement="top"
                >
                    <span>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isLogged}
                            sx={gamePageStyles.submitButton}
                        >
                            Submit Review
                        </Button>
                    </span>
                </Tooltip>

                {!isLogged && (
                    <Typography sx={gamePageStyles.signInPrompt}>
                        <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                            Sign in
                        </Link>
                        {' '}to submit a review.
                    </Typography>
                )}
            </form>
        </Page>
    );
};
