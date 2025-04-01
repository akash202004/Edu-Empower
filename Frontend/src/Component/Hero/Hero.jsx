import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiAward, FiDollarSign, FiUsers, FiBookOpen, FiHeart, FiCheck } from 'react-icons/fi';
import CountUp from 'react-countup';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  // Add state to track navbar height for proper spacing
  const [navbarHeight, setNavbarHeight] = useState(70); // Default estimate
  
  // Handle resize events and navbar height calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Calculate navbar height dynamically
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };
    
    // Initial calculation
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values - Adjusted to make content stay visible longer during scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Reduced parallax movement
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]); // Slower fade out
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Stats data - We'll remove this section from display
  const stats = [
    { value: "5,000+", label: "Students Helped", icon: <FiUsers className="h-5 w-5 sm:h-6 sm:w-6" /> },
    { value: "₹2.5 Cr+", label: "Funds Raised", icon: <FiDollarSign className="h-5 w-5 sm:h-6 sm:w-6" /> },
    { value: "120+", label: "Partner Institutions", icon: <FiBookOpen className="h-5 w-5 sm:h-6 sm:w-6" /> },
    { value: "92%", label: "Success Rate", icon: <FiAward className="h-5 w-5 sm:h-6 sm:w-6" /> }
  ];

  // Features data
  const features = [
    "Personalized scholarship matching",
    "Simplified application process",
    "Crowdfunding opportunities",
    "Mentorship connections"
  ];

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen h-auto flex items-center overflow-hidden"
      // Dynamic padding based on navbar height with increased bottom padding
      style={{ 
        paddingTop: `calc(${navbarHeight}px + 2rem)`,
        paddingBottom: '6rem' // Increased bottom padding
      }}
    >
      {/* Background with improved gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/95 via-purple-950/90 to-gray-950/95"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
      </div>

      {/* Content with Parallax Effect */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-block px-2 sm:px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-full mb-3 sm:mb-4 border border-white/30 shadow-sm">
                EMPOWERING EDUCATION FOR ALL
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight mb-3 sm:mb-4 text-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="block text-white drop-shadow-md">Connecting Students</span>
              <motion.span 
                className="bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-md"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                & Support Systems
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-100 mb-4 sm:mb-6 max-w-xl drop-shadow-md font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Breaking down financial barriers to education through scholarships, crowdfunding, and community support. Join us in empowering the next generation.
            </motion.p>
            
            {/* Feature list */}
            <motion.ul 
              className="mb-6 sm:mb-8 space-y-1.5 sm:space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-gray-200 text-sm sm:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <FiCheck className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button 
                onClick={() => navigate('/auth/register')}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/50 transition duration-300 transform hover:-translate-y-1 flex items-center relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Get Started</span>
                <FiArrowRight className="ml-2 relative z-10" />
              </motion.button>
              
              <motion.button 
                onClick={() => navigate('/about')}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white text-sm sm:text-base font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition duration-300 shadow-md"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Learn More
              </motion.button>
            </motion.div>
            
            {/* Mobile-only image section - improved positioning and sizing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:hidden relative mb-6 mt-2 w-full"
            >
              <div className="relative w-full">
                {/* Main image with enhanced animation - adjusted height for mobile */}
                <motion.div
                  className="rounded-xl overflow-hidden shadow-xl border border-white/20 relative z-20 w-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="Students celebrating graduation" 
                    className="w-full h-[150px] xs:h-[180px] sm:h-[200px] object-cover object-center rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
                </motion.div>
                
                {/* Only show one floating card on mobile - improved positioning */}
                <motion.div
                  className="absolute -bottom-4 right-4 bg-white rounded-lg shadow-xl p-3 z-30 max-w-[180px]"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="flex items-center mb-1">
                    <div className="p-1.5 bg-indigo-100 rounded-full mr-2">
                      <FiAward className="h-4 w-4 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm">Scholarships</h4>
                  </div>
                  <p className="text-xs text-gray-600">Access to 500+ scholarships tailored to your profile</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column - Enhanced floating image with effects - Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main image with enhanced animation */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Students celebrating graduation" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
                
                {/* Animated overlay badge */}
                <motion.div 
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-1.5 animate-pulse"></span>
                    Join 12,000+ students
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Enhanced floating card 1 - adjusted for better visibility */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 z-30 max-w-[220px]"
                animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <FiAward className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Scholarships</h4>
                </div>
                <p className="text-sm text-gray-600">Access to 500+ scholarships tailored to your profile</p>
                <div className="mt-2 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img 
                        key={i}
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
                        alt="User" 
                        className="w-6 h-6 rounded-full border-2 border-white" 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">+2.5k this month</span>
                </div>
              </motion.div>
              
              {/* Enhanced floating card 2 - adjusted for better visibility */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 z-30 max-w-[220px]"
                animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <FiHeart className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Community</h4>
                </div>
                <p className="text-sm text-gray-600">Join a supportive network of students and donors</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <motion.div 
                      className="bg-purple-600 h-1.5 rounded-full" 
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">75% success rate</p>
                </div>
              </motion.div>
              
              {/* New floating card 3 - adjusted for better visibility on larger screens */}
              <motion.div
                className="absolute top-1/2 -right-8 lg:-right-12 transform -translate-y-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-xl p-4 z-30 max-w-[180px]"
                animate={{ x: [0, 5, 0], rotate: [0, 1, 0] }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.4)"
                }}
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-white/20 rounded-full mr-3">
                    <FiDollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold">Crowdfunding</h4>
                </div>
                <p className="text-sm text-white/90">Raise funds for your education goals</p>
                <motion.button 
                  className="mt-2 w-full py-1 px-2 bg-white/20 rounded text-xs font-medium"
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  Learn More →
                </motion.button>
              </motion.div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute -z-10 w-full h-full top-0 left-0">
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats section removed - This entire section is removed */}
        
      </motion.div>
      
      {/* Add custom CSS for hiding scrollbar but allowing scroll */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .text-shadow-lg {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        /* Add CSS to ensure bottom content stays visible */
        @media (max-height: 800px) {
          .stats-container {
            position: relative;
            z-index: 30;
            background: rgba(30, 27, 75, 0.7);
            backdrop-filter: blur(8px);
            margin-top: 1rem;
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
