import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router";
import {findAllCategories, findGamesByCategory} from "../api/games";

export const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameData, setGameData] = useState({});
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await findAllCategories();

            console.log(response, "called findallcategories");
            return response;
        } catch (err) {
            console.error("Error fetching categories", err);
            return null;
        }
    };

    const fetchGamesByCategory = async (category) => {
        try {
            const response = await findGamesByCategory({name: category});

            console.log("games for", category, response.data);

            // API shape: { data: [...] }
            return response || [];
        } catch (err) {
            console.error("Error fetching games for category:", category, err);
            return [];
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            console.log("inside fetch");

            const categories = await fetchCategories();
            console.log("fetch category data", categories);

            if (!categories || categories.length === 0) {
                setIsLoading(false);
                return;
            }

            // categories loaded → stop initial loading
            setIsLoading(false);

            // fetch each category independently (progressive loading)
            for (let category of categories) {
                fetchGamesByCategory(category).then((games) => {
                    setGameData((prev) => ({
                        ...prev,
                        [category]: games
                    }));
                });
            }
        };

        fetchAll();
    }, []);

    return (
        <>
            {isLoading ? (
                <p>Loading categories...</p>
            ) : (
                <div>
                    {Object.entries(gameData).map(([category, games]) => (
                        <div key={category} style={{ marginBottom: "20px" }}>
                            <h2>{category}</h2>

                            <div
                                style={{
                                    display: "flex",
                                    overflowX: "auto",
                                    gap: "10px"
                                }}
                            >
                                {games.map((game) => (
                                    <div
                                        key={game.id}
                                        style={{
                                            minWidth: "150px",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            navigate(`../games/${game.id}`, {
                                                state: { game }
                                            })
                                        }                                    >
                                        <div><strong>{game.name}</strong></div>
                                        <div style={{ fontSize: "12px" }}>
                                            ⭐ {game?.averageRating}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};