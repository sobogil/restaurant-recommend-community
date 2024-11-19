import React, { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../services/api';
import styled from 'styled-components';
import { colors } from '../../styles/CommonStyles';

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

  return (
    <Container>
      <Title>맛집 찾기</Title>
      
      <SearchContainer>
        <RegionSelect 
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">지역 선택</option>
          {Object.entries(regions).map(([region, districts]) => (
            <optgroup label={region} key={region}>
              {districts.map(district => (
                <option value={district} key={district}>{district}</option>
              ))}
            </optgroup>
          ))}
        </RegionSelect>

        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="레스토랑 검색..."
          />
          <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
      </SearchContainer>

      {loading ? (
        <LoadingSpinner>Loading...</LoadingSpinner>
      ) : (
        <RestaurantGrid>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index}>
              <RestaurantName>
                {restaurant.title.replace(/<[^>]*>/g, '')}
              </RestaurantName>
              <RestaurantAddress>{restaurant.address}</RestaurantAddress>
              <ViewButton 
                href={restaurant.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                상세보기
              </ViewButton>
            </RestaurantCard>
          ))}
        </RestaurantGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: ${colors.dark};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const RegionSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid ${colors.gray}30;
  border-radius: 8px;
  min-width: 200px;
  background: white;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 0.5rem;
  flex: 1;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${colors.gray}30;
  border-radius: 8px;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

const SearchButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.secondary};
  }
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const RestaurantCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const RestaurantName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${colors.dark};
  font-size: 1.25rem;
`;

const RestaurantAddress = styled.p`
  color: ${colors.gray};
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`;

const ViewButton = styled.a`
  display: inline-block;
  background: ${colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${colors.secondary};
    transform: translateY(-1px);
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${colors.gray};
  font-size: 1.2rem;
`;

export default RestaurantList;