import  './Card.css'
export const Card = ({movieData})=>{
    const {Poster,imdbID} = movieData;
    return(
        <li className="Hero-container">
            <div className="main-container">
                <div className="poster-container">
                    <img src={Poster} alt={imdbID} />
                </div>
                <div className="ticket-container">
                    <div className="ticket-content">
                        <a href={`/movie/${imdbID}`}>
                            <button className="ticket-buy-button">Watch Now</button>
                        </a>

                    </div>
                </div>
            </div>
        </li>
    )
}