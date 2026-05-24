import {useLocation, useParams} from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {StarRating} from "../components/StarRating";
import {findGameInfo} from "../api/games";
import {getReviews, postReviews} from "../api/reviews";

/**
 *
 * @returns {React.JSX.Element}
 * @constructor
 * Data example:
 *
 * averageRating: 4.8
 * ​
 * bio: "A challenging action RPG with deep lore and punishing combat."
 * ​
 * categories: Array(3) [ "SOULS_LIKE", "THIRD_PERSON", "ADVENTURE" ]
 * ​
 * id: 1
 * ​
 * name: "Dark Souls III"
 * ​
 * picURL: "https://example.com/ds3.jpg"
 * ​
 * reviewerNumber: 1200
 * ​
 * timeAdded: "2026-03-15T19:36:43.756779"
 */

export const GamePage = () => {
    const {id: gameId } = useParams();
    console.log(gameId);

    const location = useLocation();

    const [game, setGame] = useState(location.state?.game);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getAllReviews = async () => {
            const reviews = await getReviews({id: gameId});
            console.log('get all reviews',reviews);
            if (reviews.length > 0) {
                setReviews(reviews);
            }else{
                return null;
            }
        }
        const getGame = async () => {
            console.log("in use effect")
            await getAllReviews();
        if (!game) {
            try {
                const request = await findGameInfo({id: gameId});
                console.log(request)

                setGame(request);

            } catch (e) {
                console.error(e);
            }
        }
        }
        getGame();
    }, [gameId, game]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e);
        postReviews({rating:2.5 , username: 'hardcore99' ,gameId: 16, userID: 2 })
    }

    if (!game) return <div>Loading...</div>;

    return(
    <div>
        <p>{game.name}</p>
        <p> {Object.entries(game)}</p>
        {
            Object.entries(game).map(([key, value]) => {
                return (
                    <div key={key}>
                        <strong>{key}:</strong> {value}
                    </div>
                );
            })
        }
        <div >
            {reviews.length > 0 ? (
                reviews.map((r, index) => (
                    <div key={index}>
                        <strong>{r.userID}</strong>
                        <div>Rating: {r.rating}</div>
                        <div>{r.review}</div>
                    </div>
                ))
            ) : (
                <p>Be the first to leave a review!</p>
            )}
        </div>
        <form onSubmit={(e) => {onSubmitHandler(e);
            console.log("submit")}} >
            <StarRating />
            <button type="submit">Submit</button>
        </form>
    </div>
    )

}