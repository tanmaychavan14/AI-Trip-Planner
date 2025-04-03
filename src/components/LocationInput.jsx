
// src/components/LocationInput.jsx
import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function LocationInput({ onChange, value }) {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsGoogleLoaded(true);
      return;
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => setIsGoogleLoaded(true);
    script.onerror = () => console.error("Google Maps script failed to load");
    
    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts during loading
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  const customStyles = {
    placeholder: (provided) => ({
      ...provided,
      color: '#844d31',
      fontWeight: 500
    })
  };

  if (!isGoogleLoaded) {
    return <div className="p-3 border rounded">Loading location search...</div>;
  }

  return (
    <GooglePlacesAutocomplete
      apiKey={apiKey}
      selectProps={{
        value,
        onChange,
        styles: customStyles,
      }}
    />
  );
}

export default LocationInput;