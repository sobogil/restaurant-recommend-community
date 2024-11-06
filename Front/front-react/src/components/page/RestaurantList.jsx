import React, { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../services/api';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('restaurant'); // 기본 검색어

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await fetchRestaurants(searchQuery);
        setRestaurants(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setLoading(false);
      }
    };
    getRestaurants();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Restaurant List</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <input
          type="text"
          placeholder="Search for a restaurant"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      <ul className="list-group">
        {restaurants.map((restaurant, index) => (
          <li key={index} className="list-group-item">
            <h5>{restaurant.title.replace(/<[^>]*>/g, '')}</h5>
            <p>{restaurant.address}</p>
            <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
              View Details
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
