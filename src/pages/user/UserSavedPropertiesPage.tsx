import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Trash2 } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';

export const UserSavedPropertiesPage: React.FC = () => {
  const { savedProperties, toggleSaveProperty } = useUserAuth();

  const formatPKR = (n: number) => 'PKR ' + n.toLocaleString('en-PK');

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#022C22]">Saved Properties</h1>
        <p className="text-[#64748B] mt-1">Properties you've bookmarked for later</p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-[#064E3B]" />
          </div>
          <h3 className="text-lg font-semibold text-[#022C22] mb-2">No saved properties yet</h3>
          <p className="text-[#64748B] mb-6">Start exploring and save properties you love.</p>
          <Link
            to="/properties"
            className="inline-flex items-center px-6 py-3 bg-[#064E3B] text-white rounded-xl font-semibold hover:bg-[#047857] transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.featuredImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#064E3B] text-white">
                    {property.purpose}
                  </span>
                </div>
                <button
                  onClick={() => toggleSaveProperty(property.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-red-50 transition-colors"
                  title="Remove from saved"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[#022C22] text-sm mb-1 line-clamp-1">{property.title}</h3>
                <div className="flex items-center text-[#64748B] text-xs mb-3">
                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#047857] font-bold text-sm">{formatPKR(property.pricePKR)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveProperty(property.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to={`/properties/${property.slug || property.id}`}
                      className="px-3 py-1.5 bg-[#064E3B] text-white text-xs font-semibold rounded-lg hover:bg-[#047857] transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSavedPropertiesPage;
