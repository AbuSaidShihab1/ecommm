// components/SEO.jsx
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SEO = () => {
  const [webSettings, setWebSettings] = useState(null);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  
  useEffect(() => {
    const fetchWebSettings = async () => {
      try {
        const response = await axios.get(`${base_url}/super/admin/main-websettings`);
        if (response.data.success && response.data.data.length > 0) {
          setWebSettings(response.data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching web settings:', error);
      }
    };
    
    fetchWebSettings();
  }, []);

  if (!webSettings) return null;

  return (
    <Helmet>
      <title>{webSettings.title || 'Default Title'}</title>
      <meta name="description" content={webSettings.tagline || 'Default description'} />
      <meta name="keywords" content={`${webSettings.organizationName}, ${webSettings.businesscategory}, ${webSettings.title}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={webSettings.title || 'Default Title'} />
      <meta property="og:description" content={webSettings.tagline || 'Default description'} />
      <meta property="og:image" content={webSettings.landscapeLogo || webSettings.squareLogo || ''} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.href} />
      <meta property="twitter:title" content={webSettings.title || 'Default Title'} />
      <meta property="twitter:description" content={webSettings.tagline || 'Default description'} />
      <meta property="twitter:image" content={webSettings.landscapeLogo || webSettings.squareLogo || ''} />
      
      {/* Favicon */}
      <link rel="icon" href={webSettings.favicon || '/favicon.ico'} />
    </Helmet>
  );
};

export default SEO;