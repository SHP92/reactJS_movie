import React from 'react';
import MyComponent from './MyComponent'; // 3. import component
import Movie from './movie';
import axios from 'axios';
import PropTypes from 'prop-types';
import './App.css';

// prop-types help to reduce mistakes by checking args' types

// function Food(props) {
//   console.log(props); // props.name = { name }
//   return (
//     <div>
//       <h1> My favorite Food is { props.name } </h1>
//       <img src={ props.pic } alt={ props.name }/>
//       {/* img element should have 'alt' prop */}
//     </div>
//   );
// }

// // type check (restricted)
// Food.propTypes = {
//   name: PropTypes.string.isRequired // isRequired = 필수
//   , pic : PropTypes.string.isRequired
//   , rating : PropTypes.number // should be 'number' or undefined
// }

// const foodILike = [
//   { 
//     id: 1
//     , name : "strawberry" 
//     , img : "https://phlabs.com/Content/Images/uploaded/Strawberry.jpg"
//     , rating : 4
//   }, { 
//     id : 2
//     , name : "macaron" 
//     , img : "https://sugargeekshow.com/wp-content/uploads/2018/01/french-macaron-recipe.jpg"
//     , rating : 3.5
//   }, { 
//     id : 3
//     , name : "mandarin"
//     , img : "http://newdia.linkfile.kr/product/essentialoil/mandarin.jpg" 
//     , rating : 4.5
//   }, { 
//     id : 4
//     , name : "grapefruit"
//     , img : "https://www.pittmandavis.com/blog/wp-content/uploads/2018/04/iStock-606020846-575x262.jpg" 
//     , rating : 5
//   }
// ];

// function App() {
//   return (
//     <div className="App">
//       <MyComponent /> {/* 4. use component */}
      
//       {/* <Food 
//         fruit="strawberry"
//         dessert="macaron"
//       /> */}

//       {/* 
//         ==Dynamic Component Generation==
//         Array.map(function) -> return array
//         like for each in js...
//         'function(args){ return }' == 'args => ()'
//       */}
//       {/* 
//         using {} if use js in middle of react
//       */}
//       {/* 
//         all react components requires unique 'key'
//         -> that's why use id
//       */}
//       { foodILike.map(function(args) {
//         return <Food key={args.id} name={args.name} pic={args.img}/>
//       }) }

//     </div>
//   );
// }

// class App extends React.Component {
//   // class component에서 화면에 표시하려면 render() 사용
//   // constructor() -> render() -> componentDidMount() -> render() -> componentDidUpdate() -> ...unmount...
//   render() {
//   return (
//     <div>
//       <h1> class component { this.state.count } </h1>
//       <button onClick={ this.add }> add </button>
//       <button onClick={ this.minus }> minus </button>
//     </div>
//   );}

//   // state : object with 'dynamic' data -> that's why use class!!!
//   // do not change state directlry : use setState()
//   state = {
//     count : 0
//   }

//  // js fuction
//  // use arrow function = () => {}
//  // or have to bind event : this.add.bind(this)
//   add = () => {
//     // setState() : update state and refresh reder()
//     // this.setState({ count : this.state.count + 1});
//     this.setState(current => ({ count : current.count + 1}));
//   }
//   minus = () => {
//     // this.setState({ count : this.state.count - 1});
//     this.setState(current => ({ count : current.count - 1}));
//   }
// }

class App extends React.Component {
  render() {
    const { isLoading, movies } = this.state;
    //const isLoading = this.state.isLoading;
    //const movies = this.state.movies;
    
    return (
      <div className='container'>
        { isLoading ? 
          <div className='loading'> "Loading" </div> : (
          <div className='movies'> {
            movies.map(movie => ( 
              <Movie 
                key={movie.id} id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                cover={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  state = {
    isLoading : true
    , movies : []
  };

  componentDidMount() {
    // setTimeout( () => {
    //   this.setState({ isLoading : false })
    // }, 3000);

    this.getMovies();
  }

  // wait! until loading... asyncronize : async - await
  async getMovies() {
    // const movies = await axios.get('https://yts.lt/api/v2/list_movies.json');
    // console.log(movies.data.data.movies);
    const { data : { data : { movies }}} = await axios.get('https://yts.lt/api/v2/list_movies.json');

    this.setState({ movies : movies, isLoading : false }) // this.setState({ movies });
  }
}

export default App;