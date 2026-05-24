import { Component, Suspense, use, useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { findAllCategories, findGamesByCategory } from '../../api/games';
import { CategorySlider } from '../../components/CategorySlider';
import { Page } from '../../components/Page';
import { homePageStyles } from './HomePage.styles';

const withRandomDelay = (promise) => {
    const ms = Math.floor(Math.random() * 2000) + 500;
    return new Promise((resolve, reject) =>
        setTimeout(() => promise.then(resolve).catch(reject), ms)
    );
};

class CategoryErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={homePageStyles.skeleton}>
                    <Typography variant="h6" sx={homePageStyles.skeletonHeading}>
                        {this.props.category}
                    </Typography>
                    <Box sx={homePageStyles.errorCard}>
                        <Typography sx={homePageStyles.errorText}>
                            Failed to load games for this category.
                        </Typography>
                    </Box>
                </Box>
            );
        }
        return this.props.children;
    }
}

const CategoryContent = ({ gamesPromise, category }) => {
    const games = use(gamesPromise);

    if (!games || games.length === 0) {
        return <Typography sx={homePageStyles.noGamesText}>No games found for {category}.</Typography>;
    }

    return <CategorySlider category={category} games={games} />;
};

const CategorySkeleton = ({ category }) => (
    <Box sx={homePageStyles.skeleton}>
        <Typography variant="h6" sx={homePageStyles.skeletonHeading}>{category}</Typography>
        <Box sx={homePageStyles.skeletonCard}>
            <CircularProgress size={32} />
        </Box>
    </Box>
);

const FullPageSpinner = () => (
    <Box sx={homePageStyles.fullPageSpinner}>
        <CircularProgress size={56} />
        <Typography sx={homePageStyles.loadingText}>Loading categories...</Typography>
    </Box>
);

export const HomePage = () => {
    const [categories, setCategories] = useState(null);
    const [gamePromises, setGamePromises] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const cats = await findAllCategories();
                console.log("fetch category data", cats);

                if (!cats || cats.length === 0) {
                    setIsLoading(false);
                    return;
                }

                const promises = {};
                cats.forEach(cat => {
                    promises[cat] = withRandomDelay(
                        findGamesByCategory({ name: cat }).catch(err => {
                            if (err.status === 404) return [];
                            throw err;
                        })
                    );
                });

                setCategories(cats);
                setGamePromises(promises);
            } catch (err) {
                console.error("Error fetching categories", err);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    return (
        <Page title="Browse Games">
            {isLoading ? (
                <FullPageSpinner />
            ) : !categories ? (
                <Typography sx={homePageStyles.noCategories}>No categories available.</Typography>
            ) : (
                categories.map(category => (
                    <CategoryErrorBoundary key={category} category={category}>
                        <Suspense fallback={<CategorySkeleton category={category} />}>
                            <CategoryContent
                                gamesPromise={gamePromises[category]}
                                category={category}
                            />
                        </Suspense>
                    </CategoryErrorBoundary>
                ))
            )}
        </Page>
    );
};
