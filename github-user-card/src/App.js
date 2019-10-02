import React from 'react';
import axios from 'axios';
import SearchForm from './components/SearchComponent/SearchForm';
import UserCard from './components/UserComponent/UserCard';
import Followers from './components/FollowersComponent/Followers';


class App extends React.Component {

  state = {
    user: '',
    userData: {},
    followers: [],
    followersData: {},
    searchTerm: '',
    dataGotten: false
  }

  componentDidUpdate(prevState) {
    if (this.state.user !== '') {
      if (this.state.user !== prevState.user) {
        const userPromise = axios.get(`https://api.github.com/users/${this.state.user}`);
        const followersPromise = axios.get(`https://api.github.com/users/${this.state.user}/followers`);

        Promise.all([userPromise, followersPromise]) 
          .then(([userPromiseRes, followersPromiseRes]) => {

            const { avatar_url, name, location, followers, following, bio } = userPromiseRes.data;
            this.setState({ 
              user: '',
              userData: {
                avatar_url: avatar_url,
                name: name,
                location: location,
                followers: followers,
                following: following,
                bio: bio
              },
              followers: [],
              followersData: followersPromiseRes.data,
              dataGotten: true
            }, () => {
              this.state.followersData.forEach(person => {
                axios.get(person.url)
                  .then(response => {
                    this.setState({
                      followers: [...this.state.followers, {
                        id: response.data.id,
                        avatar_url: response.data.avatar_url,
                        name: response.data.name,
                        location: response.data.location,
                        followers: response.data.followers,
                        following: response.data.following,
                        bio: response.data.bio
                      }]
                    }, () => {
                      console.log(this.state.followers);
                    })
                  })
              })
            })
          })
      }
    }
  }

  handleSearchInputChange = (e) => {
    this.setState({
      user: '',
      dataGotten: false,
      searchTerm: e.target.value
    })
  }

  handleSearchFormSubmit = (e) => {
    e.preventDefault();
    
    this.setState( prevState => ({ 
      user: prevState.searchTerm 
    }))
  }

  render() {
    return (
      <main className="app-wrapper">
        <SearchForm 
          searchTerm={this.state.searchTerm} 
          handleSearchInputChange={this.handleSearchInputChange}
          handleSearchFormSubmit={this.handleSearchFormSubmit}
        />

        { 
          this.state.dataGotten && <UserCard 
            avatar_url={this.state.userData.avatar_url}
            name={this.state.userData.name}
            location={this.state.userData.location}
            followers={this.state.userData.followers}
            following={this.state.userData.following}
            bio={this.state.userData.bio}
          /> 
        }
        
        {
          this.state.dataGotten && <Followers followers={this.state.followers} /> 
        }
      </main>
    )
  }
}

export default App;
