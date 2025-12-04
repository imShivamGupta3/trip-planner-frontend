import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Users, Sparkles, ArrowLeft, Plus, Zap } from 'lucide-react';
import { generateTrip, getUserTrips } from '../services/api';
import { getDestinationImage } from '../services/ImageUtil';
import { useAuth } from '../context/AuthContext';
import Header from './Header';

const BUDGET_OPTIONS = [
  { id: 'Cheap', label: 'Budget', icon: '💰', desc: 'Cost-conscious', gradient: 'from-green-500 to-emerald-500' },
  { id: 'Moderate', label: 'Moderate', icon: '💵', desc: 'Balanced', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'Luxury', label: 'Luxury', icon: '💎', desc: 'Premium', gradient: 'from-purple-500 to-pink-500' },
];

const TRAVELER_OPTIONS = [
  { id: 'Solo', label: 'Solo', icon: '🚶', desc: 'Just me', gradient: 'from-orange-500 to-red-500' },
  { id: 'Couple', label: 'Couple', icon: '💑', desc: 'Two travelers', gradient: 'from-pink-500 to-rose-500' },
  { id: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'With kids', gradient: 'from-blue-500 to-indigo-500' },
  { id: 'Friends', label: 'Friends', icon: '👥', desc: 'Group trip', gradient: 'from-purple-500 to-violet-500' },
];

const CreateTrip = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ destination: '', days: 3, budget: '', travelers: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadTrips();
  }, [user]);

  const loadTrips = async () => {
    try {
      const response = await getUserTrips(user.userId);
      setTrips(response.data);
    } catch (err) {
      console.error('Error loading trips:', err);
    }
  };

  const handleNext = () => {
    if (step === 1 && !formData.destination) {
      setError('Please enter a destination');
      return;
    }
    if (step === 2 && formData.days < 1) {
      setError('Please enter valid days');
      return;
    }
    if (step === 3 && !formData.budget) {
      setError('Please select a budget');
      return;
    }
    if (step === 4 && !formData.travelers) {
      setError('Please select travelers');
      return;
    }
    setError('');
    if (step < 4) setStep(step + 1);
    else handleGenerate();
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await generateTrip({ ...formData, userId: user.userId });
      navigate(`/trip/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate trip');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Crafting Your Journey
            </h2>
            <p className="text-slate-600 mb-6">Our AI is designing the perfect itinerary...</p>
            <div className="space-y-2">
              {['Analyzing destination', 'Finding best places', 'Optimizing schedule'].map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-700">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  if (!showForm && step === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Hero Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="inline-block mb-6">
                <div className="relative">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30" />
                  <div className="relative w-20 h-20 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Plan Your Dream Trip
              </h1>
              <p className="text-xl text-slate-600 mb-8">AI-powered itineraries tailored just for you</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setShowForm(true); setStep(1); }} className="bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 mx-auto group">
                <Plus className="w-6 h-6" />
                <span>Create New Trip</span>
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Previous Trips */}
            {trips.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span>Your Adventures</span>
                  <span className="text-sm font-normal bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{trips.length}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trips.map((trip, idx) => (
                    <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8, scale: 1.02 }} onClick={() => navigate(`/trip/${trip.id}`)} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-slate-100">
                      {/* UPDATED IMAGE LOGIC HERE */}
                      <div className="h-48 relative overflow-hidden bg-slate-200">
                        <img 
                          src={getDestinationImage(trip.destination)} 
                          alt={trip.destination}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-1 shadow-sm">{trip.destination}</h3>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{trip.travelers}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{trip.budget}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {trips.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center py-16">
                <div className="w-32 h-32 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-16 h-16 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No Trips Yet</h3>
                <p className="text-slate-600">Create your first trip and start exploring!</p>
              </motion.div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => { if (step > 1) setStep(step - 1); else { setShowForm(false); setStep(0); } }} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <span className="text-sm font-medium text-slate-600">Step {step} of 4</span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div className="h-full bg-linear-to-br from-blue-600 via-purple-600 to-pink-600" initial={{ width: 0 }} animate={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepContainer key="step1">
                <StepTitle icon={<MapPin className="w-10 h-10" />} title="Where to?" subtitle="Choose your dream destination" />
                <input type="text" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} placeholder="e.g., Paris, Tokyo, New York" className="w-full px-6 py-5 text-xl bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:shadow-xl transition-all" autoFocus />
              </StepContainer>
            )}

            {step === 2 && (
              <StepContainer key="step2">
                <StepTitle icon={<Calendar className="w-10 h-10" />} title="How long?" subtitle="Select trip duration" />
                <div className="flex items-center justify-center gap-8">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setFormData({ ...formData, days: Math.max(1, formData.days - 1) })} className="w-16 h-16 bg-white border-2 border-slate-300 rounded-2xl text-3xl font-bold hover:border-purple-500 hover:shadow-xl transition-all">
                    −
                  </motion.button>
                  <div className="text-8xl font-bold bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">{formData.days}</div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setFormData({ ...formData, days: formData.days + 1 })} className="w-16 h-16 bg-white border-2 border-slate-300 rounded-2xl text-3xl font-bold hover:border-purple-500 hover:shadow-xl transition-all">
                    +
                  </motion.button>
                </div>
                <p className="text-center text-slate-600 mt-6">days</p>
              </StepContainer>
            )}

            {step === 3 && (
              <StepContainer key="step3">
                <StepTitle icon={<DollarSign className="w-10 h-10" />} title="Your Budget?" subtitle="What's comfortable for you?" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BUDGET_OPTIONS.map((option) => (
                    <OptionCard key={option.id} option={option} selected={formData.budget === option.id} onClick={() => setFormData({ ...formData, budget: option.id })} />
                  ))}
                </div>
              </StepContainer>
            )}

            {step === 4 && (
              <StepContainer key="step4">
                <StepTitle icon={<Users className="w-10 h-10" />} title="Who's Going?" subtitle="Select your travel companions" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {TRAVELER_OPTIONS.map((option) => (
                    <OptionCard key={option.id} option={option} selected={formData.travelers === option.id} onClick={() => setFormData({ ...formData, travelers: option.id })} />
                  ))}
                </div>
              </StepContainer>
            )}
          </AnimatePresence>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center font-medium">
              {error}
            </motion.div>
          )}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleNext} className="w-full bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all mt-8">
            {step === 4 ? '✨ Generate My Trip' : 'Continue →'}
          </motion.button>
        </div>
      </div>
    </>
  );
};

const StepContainer = ({ children }) => (
  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-[400px] flex flex-col justify-center">
    {children}
  </motion.div>
);

const StepTitle = ({ icon, title, subtitle }) => (
  <div className="text-center mb-12">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-20 h-20 bg-linear-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600">
      {icon}
    </motion.div>
    <h2 className="text-4xl font-bold text-slate-800 mb-2">{title}</h2>
    <p className="text-slate-600">{subtitle}</p>
  </div>
);

const OptionCard = ({ option, selected, onClick }) => (
  <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} onClick={onClick} className={`relative p-6 bg-white rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${selected ? 'border-purple-500 shadow-2xl shadow-purple-500/30' : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'}`}>
    {selected && (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 w-6 h-6 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xs">✓</span>
      </motion.div>
    )}
    <div className="text-5xl mb-4">{option.icon}</div>
    <h3 className="font-bold text-slate-800 text-lg mb-1">{option.label}</h3>
    <p className="text-sm text-slate-600">{option.desc}</p>
    {option.gradient && selected && (
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-br ${option.gradient}`} />
    )}
  </motion.div>
);

export default CreateTrip;