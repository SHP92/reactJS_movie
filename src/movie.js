import React from 'react';
import PropTypes from 'prop-types';
import './movie.css';

function Movie({ id, year, title, summary, cover, genres }) {
    return (
        <div className='movie'>
            <img src={ cover } alt={ title } title={ title } />
            <div className='movie_data'>
                <h3 className='movie_title'> { title } </h3>
                <h4 className='movie_year'> { year } </h4>
                <ul className='movie_genres'> 
                    { genres.map((genre, index) => (
                        <li className='movie_genre' key={ index }> 
                            { genre } 
                        </li>
                    ))} 
                </ul>
                <span className='movie_summary'> { summary.slice(0, 200) }... </span>
            </div>
        </div>
    );
}

Movie.propTypes = {
    id : PropTypes.number.isRequired
    , year : PropTypes.number.isRequired
    , title : PropTypes.string.isRequired
    , summary : PropTypes.string.isRequired
    , cover : PropTypes.string.isRequired
    , genres : PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;