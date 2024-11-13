import React, { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../services/api';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('restaurant');
  const [selectedRegion, setSelectedRegion] = useState('');

  // 예시로 지역을 나눔: 대분류 -> 중분류
  const regions = {
    'Seoul': ['Gangnam', 'Jongno', 'Mapo', 'Yeongdeungpo', '공릉'],
    'Busan': ['Haeundae', 'Seomyeon', 'Nampo'],
    'Incheon': ['Bupyeong', 'Songdo', 'Gyeyang']
  };

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await fetchRestaurants(`${searchQuery} ${selectedRegion}`);
        setRestaurants(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setLoading(false);
      }
    };
    getRestaurants();
  }, [searchQuery, selectedRegion]);

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
          className="form-control shadow-sm rounded"
          style={{ marginBottom: '1rem' }}
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="form-control w-25 shadow-sm"
          style={{ borderRadius: '8px' }}
        >
          <option value="">Select Region</option>
          {Object.keys(regions).map((region) => (
            <optgroup key={region} label={region}>
              {regions[region].map((subRegion) => (
                <option key={subRegion} value={subRegion}>
                  {subRegion}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button type="submit" className="btn btn-primary mt-3 shadow-sm">
          Search
        </button>
      </form>
      <ul className="list-group shadow-sm">
        {restaurants.map((restaurant, index) => (
          <li key={index} className="list-group-item shadow-sm">
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