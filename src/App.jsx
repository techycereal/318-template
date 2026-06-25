import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "./components/Header";

// Firebase Imports
import { storage } from "./firebase"; 
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // --- Contact Form State ---
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ success: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Firebase Resources State ---
  const [resources, setResources] = useState([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);

  const heroSlides = [
    { img: 'churchImages/churchInside.webp', text: "Seeing and Savoring Jesus Christ" },
    { img: 'churchImages/churchOutside.webp', text: "Serving one another in love" },
    { img: 'churchImages/sign.webp', text: "Sharing His gospel with the world" }
  ];

  const cards = [
    {
      title: "About",
      items: ["Who We Are", "What We Believe", "Why 3:18", "Hallmarks"],
      text: 'Learn more about 318 Bible Church and our heart for the community.',
      img: 'churchImages/sign.webp',
      path: '/about'
    },
    {
      title: "What To Expect",
      items: ["Sunday Service", "Sunday Meal", "First Time Arriving"],
      text: 'Whether you’re a first-time guest or a long-time member, find everything about Sundays here.',
      img: 'churchImages/churchInside.webp',
      path: '/expect'
    },
    {
      title: "Kids",
      items: ["Worshiping Together as a Family", "Comfort for Moms & Little Ones", "Never Miss a Moment"],
      text: 'Learn how we love and serve your kids every Sunday. Jesus loves the children and so do we.',
      img: 'churchImages/Kids.webp',
      path: '/kids'
    },
  ];

  useEffect(() => {
  const fetchPDFs = async () => {
    try {
      const listRef = ref(storage, "pdfs"); 
      const res = await listAll(listRef);
      
      const today = new Date();
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
      
      // 1. Calculate how many days to look back to reach Monday
      const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;
      
      const startOfMonday = new Date(today);
      startOfMonday.setDate(today.getDate() - daysSinceMonday);
      startOfMonday.setHours(0, 0, 0, 0);

      // 2. Determine the maximum allowed day number to display today
      // If it's Saturday (6) or Sunday (0), we want to show all days (up to Day 5)
      const maxAllowedDay = (currentDay === 0 || currentDay === 6) ? 5 : currentDay;

      const filePromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        const createdDate = new Date(metadata.timeCreated);

        const nameLower = itemRef.name.toLowerCase();
        const match = nameLower.match(/day_(\d+)/);
        const dayNumber = match ? parseInt(match[1], 10) : 999; 

        const displayName = itemRef.name.replace(".pdf", "").replace(/[_-]/g, " ");

        return {
          name: displayName,
          url: url,
          timeCreated: createdDate,
          dayNumber: dayNumber
        };
      });

      const allFiles = await Promise.all(filePromises);

      // 3. Strict Filter: 
      //    - Must be uploaded on/after Monday of this week
      //    - File's day number must be less than or equal to today's weekday value
      const visibleFiles = allFiles.filter(file => {
        const isThisWeek = file.timeCreated >= startOfMonday;
        const isNotFutureDay = file.dayNumber <= maxAllowedDay;
        return isThisWeek && isNotFutureDay;
      });

      // 4. Sort numerically by Day Number
      visibleFiles.sort((a, b) => a.dayNumber - b.dayNumber);

      setResources(visibleFiles);
    } catch (error) {
      console.error("Error fetching documents from Firebase Storage:", error);
    } finally {
      setIsLoadingResources(false);
    }
  };

  fetchPDFs();
}, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ success: null, message: "" });

    const payload = {
      ...formData,
      access_key: "0a194310-46d9-4045-80c9-5b12febe3fb2", 
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({ success: true, message: "Thank you! Your message has been sent." });
        setFormData({ name: "", email: "", message: "" }); 
      } else {
        setFormStatus({ success: false, message: result.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setFormStatus({ success: false, message: "Network error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CardComponent = ({ card }) => (
    <div className="flex flex-col group h-full">
      <div className="relative rounded-2xl overflow-hidden shadow-xl flex-1 min-h-[420px] transition-all duration-500 hover:shadow-2xl cursor-pointer" onClick={() => navigate(card.path)}>
        <img
          src={card.img}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
          <h3 className="text-2xl font-bold mb-1 transform transition-transform duration-300 group-hover:-translate-y-2">
            {card.title}
          </h3>
          <div className="w-10 h-1 bg-[#99badd] mb-4 rounded-full" />
          <ul className="space-y-1 mb-2">
            {card.items.map((i) => (
              <li key={i} className="text-sm font-light opacity-80">{i}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-5 px-2 flex flex-col flex-grow">
        <p className="text-gray-600 leading-relaxed text-sm flex-grow">
          {card.text}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#7bb0e0] selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img 
                src={slide.img} 
                alt="" 
                className="w-full h-full object-cover scale-105 animate-slow-zoom" 
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <p className="uppercase tracking-[0.3em] text-sm mb-4 opacity-90 font-medium">Welcome to 318 Bible Church</p>
          <div className="h-24 md:h-32 flex items-center justify-center">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
              {heroSlides[currentSlide].text}
            </h1>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/expect')} className="bg-[#99badd] px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#99badd] transition-all duration-300 shadow-lg">
              What To Expect
            </button>
            <button onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 backdrop-blur-md border border-white/30 px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300">
              Resources
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-full max-w-4xl px-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            <div className="flex-1 p-6 text-center border-b md:border-b-0 md:border-r border-gray-100">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Service</span>
              <p className="text-lg font-bold text-gray-800">Sunday Morning • 10:30 AM</p>
            </div>
            <div className="flex-1 p-6 text-center bg-slate-50">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Fellowship</span>
              <p className="text-lg font-bold text-gray-800">Sunday Meal • 12:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <CardComponent key={index} card={card} />
          ))}
        </div>
      </section>
      {/* NEW DYNAMIC RESOURCES SECTION */}
      <section id="resources" className="py-24 bg-slate-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#7bb0e0] font-bold tracking-widest uppercase text-sm mb-3">Downloads & Guides</h2>
            <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">Church Resources</h3>
          </div>

          {isLoadingResources ? (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7bb0e0]"></div>
  </div>
) : resources.length === 0 ? (
  // This automatically displays if 0 files have been uploaded since Sunday
  <p className="text-center text-gray-500 italic py-8">
    No new resources have been posted for this week yet.
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {resources.map((resource, index) => (
      <a
        key={index}
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-xl hover:border-[#7bb0e0] transition-all duration-300 group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 capitalize leading-snug group-hover:text-[#7bb0e0] transition-colors">
              {resource.name}
            </h4>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Published {resource.timeCreated.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-gray-400 group-hover:text-[#7bb0e0] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
      </a>
    ))}
  </div>
)}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#1a1a1a] py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">Get in touch.</h2>
            <p className="text-gray-400 text-sm">
              Have questions or want to learn more? Drop us a line and someone from our church family will reach out to you shortly.
            </p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-[#7bb0e0] transition-colors" 
              placeholder="Name" 
            />
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-[#7bb0e0] transition-colors" 
              placeholder="Email Address" 
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg h-32 focus:outline-none focus:border-[#7bb0e0] transition-colors" 
              placeholder="Your Message" 
            />
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7bb0e0] py-4 rounded-lg font-bold hover:bg-[#5a8dbd] transition-all shadow-lg shadow-blue-500/10 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {formStatus.message && (
              <div className={`mt-4 p-3 rounded-lg text-sm text-center font-medium ${formStatus.success ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-300'}`}>
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}