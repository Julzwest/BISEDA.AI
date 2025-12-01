// Google Places API helper for real-time business searches

/**
 * Search for places using Google Places API (Text Search)
 * @param {string} query - Search query (e.g., "restaurants in Tirana")
 * @param {string} location - City/location for the search
 * @param {string} apiKey - Google Places API key
 * @returns {Promise<Array>} - Array of place results
 */
export async function searchPlaces(query, location, apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Google Places API key not configured');
  }

  try {
    // Use Text Search (New) API - simpler and more accurate
    const searchQuery = `${query} in ${location}, Albania`;
    const url = `https://places.googleapis.com/v1/places:searchText`;
    
    console.log(`🔍 Searching Google Places: "${searchQuery}"`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.priceLevel,places.googleMapsUri,places.userRatingCount,places.currentOpeningHours,places.primaryType'
      },
      body: JSON.stringify({
        textQuery: searchQuery,
        languageCode: 'sq',
        maxResultCount: 10,
        locationBias: {
          circle: {
            center: getLocationCoordinates(location),
            radius: 10000.0 // 10km radius
          }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Google Places API error:', response.status, errorData);
      
      if (response.status === 403 || response.status === 401) {
        throw new Error('Google Places API key is invalid or not authorized');
      }
      
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.places || data.places.length === 0) {
      console.log('⚠️ No places found');
      return [];
    }

    console.log(`✅ Found ${data.places.length} places from Google`);
    
    // Format results to match our app structure
    const formattedPlaces = data.places.map((place) => ({
      name: place.displayName?.text || 'Unknown Place',
      description: place.primaryType ? formatPlaceType(place.primaryType) : 'Restaurant or Cafe',
      location: place.formattedAddress || `${location}, Albania`,
      rating: place.rating ? place.rating.toFixed(1) : '4.0',
      price: formatPriceLevel(place.priceLevel),
      googleMapsLink: place.googleMapsUri || '#',
      isOpen: place.currentOpeningHours?.openNow,
      reviewCount: place.userRatingCount || 0,
      type: place.primaryType
    }));

    return formattedPlaces;
    
  } catch (error) {
    console.error('❌ Google Places search error:', error.message);
    throw error;
  }
}

/**
 * Get approximate coordinates for Albanian cities
 */
function getLocationCoordinates(city) {
  const coordinates = {
    'tiranë': { latitude: 41.3275, longitude: 19.8187 },
    'tirana': { latitude: 41.3275, longitude: 19.8187 },
    'durrës': { latitude: 41.3239, longitude: 19.4565 },
    'durres': { latitude: 41.3239, longitude: 19.4565 },
    'vlorë': { latitude: 40.4686, longitude: 19.4914 },
    'vlore': { latitude: 40.4686, longitude: 19.4914 },
    'shkodër': { latitude: 42.0682, longitude: 19.5126 },
    'shkoder': { latitude: 42.0682, longitude: 19.5126 },
    'korçë': { latitude: 40.6186, longitude: 20.7809 },
    'korce': { latitude: 40.6186, longitude: 20.7809 },
    'elbasan': { latitude: 41.1125, longitude: 20.0822 },
    'fier': { latitude: 40.7239, longitude: 19.5606 },
    'gjirokastër': { latitude: 40.0758, longitude: 20.1389 },
    'gjirokaster': { latitude: 40.0758, longitude: 20.1389 },
    'berat': { latitude: 40.7058, longitude: 19.9522 },
    'kavajë': { latitude: 41.1856, longitude: 19.5575 },
    'kavaje': { latitude: 41.1856, longitude: 19.5575 },
    'lezhë': { latitude: 41.7836, longitude: 19.6436 },
    'lezhe': { latitude: 41.7836, longitude: 19.6436 },
    'pogradec': { latitude: 40.9022, longitude: 20.6525 },
    'sarandë': { latitude: 39.8753, longitude: 20.0094 },
    'sarande': { latitude: 39.8753, longitude: 20.0094 },
    'himarë': { latitude: 40.1017, longitude: 19.7447 },
    'himare': { latitude: 40.1017, longitude: 19.7447 }
  };
  
  return coordinates[city.toLowerCase()] || coordinates['tiranë'];
}

/**
 * Format Google's price level to our format
 */
function formatPriceLevel(priceLevel) {
  if (!priceLevel) return '$$';
  
  switch (priceLevel) {
    case 'PRICE_LEVEL_FREE':
      return 'Gratis';
    case 'PRICE_LEVEL_INEXPENSIVE':
      return '$';
    case 'PRICE_LEVEL_MODERATE':
      return '$$';
    case 'PRICE_LEVEL_EXPENSIVE':
      return '$$$';
    case 'PRICE_LEVEL_VERY_EXPENSIVE':
      return '$$$$';
    default:
      return '$$';
  }
}

/**
 * Format place type to Albanian description
 */
function formatPlaceType(type) {
  const typeDescriptions = {
    'restaurant': 'Restorant me atmosferë të mirë',
    'cafe': 'Kafene për biseda të rehatshme',
    'bar': 'Bar me atmosferë të këndshme',
    'night_club': 'Klub nate për argëtim',
    'movie_theater': 'Kinema për shikimin e filmave',
    'park': 'Park për shëtitje romantike',
    'museum': 'Muzeu për kulturë dhe histori',
    'art_gallery': 'Galeri arti për ekspozita',
    'bowling_alley': 'Bowling për argëtim',
    'amusement_center': 'Qendër argëtimi',
    'italian_restaurant': 'Restorant italian',
    'pizza_restaurant': 'Pizzeri',
    'seafood_restaurant': 'Restorant me peshk',
    'fine_dining_restaurant': 'Restorant elegant'
  };
  
  return typeDescriptions[type] || 'Vend i mirë për takim të parë';
}

