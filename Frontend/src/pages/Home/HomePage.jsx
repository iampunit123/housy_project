import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      color: '#212529',
      lineHeight: '1.6',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '6rem 5%',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: '700'
          }}>
            Find Your Sustainable Home in Kenya
          </h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: '0.9'
          }}>
            Discover eco-friendly houses, apartments, office spaces and short-term rentals across Kenya's major cities
          </p>
          
          {/* Search Box */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
          }}>
            <input
              type="text"
              placeholder="Search by city, neighborhood or property type..."
              style={{
                flex: '1',
                padding: '0.8rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <select style={{
              padding: '0.8rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}>
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office Space</option>
              <option value="short-stay">Short Stay</option>
            </select>
            <button style={{
              backgroundColor: '#2E8B57',
              color: 'white',
              padding: '0.8rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section style={{
        padding: '5rem 5%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#212529',
            marginBottom: '1rem'
          }}>
            Featured Sustainable Properties
          </h2>
          <p style={{
            color: '#6C757D',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover energy-efficient homes with our sustainability rating system
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Property 1 */}
          <div style={{
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            background: 'white'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
              alt="Modern Apartment" 
              style={{
                height: '200px',
                width: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    Green Heights Apartment
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6C757D',
                    marginBottom: '0.5rem'
                  }}>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Westlands, Nairobi</span>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2E8B57'
                }}>
                  KSh 45,000/mo
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                margin: '1rem 0',
                color: '#6C757D'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="fas fa-bed"></i>
                  3 beds
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="fas fa-bath"></i>
                  2 baths
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="fas fa-ruler-combined"></i>
                  1200 sqft
                </span>
              </div>
              <div style={{
                backgroundColor: '#2E8B57',
                color: 'white',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <i className="fas fa-leaf"></i>
                Sustainability Score: 8.5/10
              </div>
            </div>
          </div>

          {/* Property 2 */}
          <div style={{
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            background: 'white'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
              alt="Office Space" 
              style={{
                height: '200px',
                width: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    Eco-Workspace
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6C757D',
                    marginBottom: '0.5rem'
                  }}>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Kilimani, Nairobi</span>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2E8B57'
                }}>
                  KSh 80,000/mo
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                margin: '1rem 0',
                color: '#6C757D'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="fas fa-door-open"></i>
                  4 offices
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="fas fa-users"></i>
                  15 people
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="fas fa-ruler-combined"></i>
                  2000 sqft
                </span>
              </div>
              <div style={{
                backgroundColor: '#2E8B57',
                color: 'white',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <i className="fas fa-leaf"></i>
                Sustainability Score: 9.2/10
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            to="/properties"
            style={{
              backgroundColor: '#2E8B57',
              color: 'white',
              padding: '0.8rem 2rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}
          >
            View All Properties
          </Link>
        </div>
      </section>

      {/* Sustainability Features Section */}
      <section style={{
        padding: '5rem 5%',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#F8F9FA'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#212529',
            marginBottom: '1rem'
          }}>
            Sustainable Housing Features
          </h2>
          <p style={{
            color: '#6C757D',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Our properties are rated based on energy efficiency and environmental impact
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { icon: 'fa-solar-panel', title: 'Solar Energy', description: 'Properties with solar panels reduce carbon footprint and energy costs' },
            { icon: 'fa-tint', title: 'Water Harvesting', description: 'Rainwater collection systems for sustainable water usage' },
            { icon: 'fa-recycle', title: 'Waste Management', description: 'Proper recycling and waste disposal systems in place' },
            { icon: 'fa-thermometer-half', title: 'Energy Efficiency', description: 'LED lighting, energy-star appliances and proper insulation' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#2E8B57',
                marginBottom: '1rem'
              }}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                {feature.title}
              </h3>
              <p style={{ color: '#6C757D' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;