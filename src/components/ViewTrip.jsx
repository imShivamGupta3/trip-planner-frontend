import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, DollarSign, Clock, ChevronDown, ArrowLeft, Building2, Calendar, Users, Sparkles } from 'lucide-react';
import { getTripById, getPlacePhoto } from '../services/api';
import { getSmartPlaceImg } from '../services/ImageUtil';   `1
`
import Header from './Header';

const ViewTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState(1);

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = async () => {
    try {
      const response = await getTripById(id);
      setTrip(response.data);
      setTripData(JSON.parse(response.data.tripData));
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading your adventure...</p>
          </div>
        </div>
      </>
    );
  }

  if (!trip || !tripData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Trip Not Found</h2>
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Go back home</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 pb-20">
        {/* Hero Banner */}
        <div className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient" />
          <div className="absolute inset-0">
             <PhotoBackground query={trip.destination} className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white px-6 max-w-4xl">
              <motion.button initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} onClick={() => navigate('/')} className="flex items-center gap-2 text-white/80 hover:text-white mb-8 mx-auto transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to trips</span>
              </motion.button>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
                {trip.destination}
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-6 text-lg">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span>{trip.travelers}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <DollarSign className="w-5 h-5" />
                  <span>{trip.budget}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5" />
                  <span>{tripData.itinerary?.length || 0} Days</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
          {/* Hotels Section */}
          {tripData.hotels && tripData.hotels.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">Where to Stay</h2>
                  <p className="text-slate-600">Handpicked accommodations for you</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripData.hotels.map((hotel, idx) => (
                  <HotelCard key={idx} hotel={hotel} index={idx} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Itinerary Section */}
          {tripData.itinerary && tripData.itinerary.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">Daily Itinerary</h2>
                  <p className="text-slate-600">Your day-by-day adventure plan</p>
                </div>
              </div>
              <div className="space-y-4">
                {tripData.itinerary.map((day, idx) => (
                  <DayCard key={day.day} day={day} index={idx} expanded={expandedDay === day.day} onToggle={() => setExpandedDay(expandedDay === day.day ? null : day.day)} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  );
};

// --- HELPER COMPONENTS ---

const PhotoBackground = ({ query, className }) => {
    const [photoUrl, setPhotoUrl] = useState(getSmartPlaceImg(query)); // Init with smart image

    useEffect(() => {
        if(query) {
            getPlacePhoto(query).then(resp => {
                // Only update if we get a valid URL that isn't the generic backend fallback string
                if(resp.data.url && !resp.data.url.includes("1476514525535")) {
                    setPhotoUrl(resp.data.url);
                }
            });
        }
    }, [query]);

    return (
        <img 
            src={photoUrl} 
            className={className}
            onError={(e) => e.target.src=getSmartPlaceImg(query)}
        />
    )
}

const HotelCard = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState(getSmartPlaceImg(hotel?.name)); // Init with smart image

  useEffect(() => {
    if (hotel?.name) {
      getPlacePhoto(hotel.name).then(resp => {
          // Check for generic backend fallback
          if(resp.data.url && !resp.data.url.includes("1476514525535")) { 
             setPhotoUrl(resp.data.url);
          }
      });
    }
  }, [hotel]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8, scale: 1.02 }} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden border border-slate-100 transition-all">
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <img 
            src={photoUrl} 
            alt={hotel.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            onError={(e) => { e.target.src = getSmartPlaceImg(hotel.name); }} 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold text-slate-800">{hotel.rating || '4.5'}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-1">{hotel.name}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
          <span>{hotel.address}</span>
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-lg font-bold text-blue-600">{hotel.price}</span>
          <span className="text-xs text-slate-500">per night</span>
        </div>
      </div>
    </motion.div>
  );
};

const DayCard = ({ day, index, expanded, onToggle }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
    <button onClick={onToggle} className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-all group">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-2xl font-bold text-white">{day.day}</span>
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-xl font-bold text-slate-800 mb-1">Day {day.day}</h3>
          <p className="text-slate-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{day.theme}</span>
          </p>
        </div>
      </div>
      <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-white">
        <ChevronDown className="w-6 h-6 text-slate-600" />
      </motion.div>
    </button>

    <AnimatePresence>
      {expanded && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
          <div className="p-8 space-y-6 bg-slate-50/50">
            {day.plan.map((place, idx) => (
              <PlaceCard key={idx} place={place} index={idx} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const PlaceCard = ({ place, index }) => {
  const [photoUrl, setPhotoUrl] = useState(getSmartPlaceImg(place?.place_name)); // Init with smart image

  useEffect(() => {
    if (place?.place_name) {
      getPlacePhoto(place.place_name).then(resp => {
          // Check for generic backend fallback
          if(resp.data.url && !resp.data.url.includes("1476514525535")) { 
             setPhotoUrl(resp.data.url);
          }
      });
    }
  }, [place]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="flex gap-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all group">
      <div className="relative w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-slate-200">
        <img 
            src={photoUrl} 
            alt={place.place_name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            onError={(e) => { e.target.src = getSmartPlaceImg(place.place_name); }} 
        />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg text-slate-800 mb-2 flex items-start gap-2">
          <span className="w-6 h-6 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">{index + 1}</span>
          <span>{place.place_name}</span>
        </h4>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">{place.details}</p>
        <div className="flex flex-wrap gap-3">
          {place.ticket_pricing && (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{place.ticket_pricing}</span>
            </div>
          )}
          {place.time_to_travel && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">{place.time_to_travel}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ViewTrip;