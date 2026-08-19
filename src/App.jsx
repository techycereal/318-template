import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "./components/Header";
import axios from "axios";
// Firebase Imports
import { storage } from "./firebase"; 
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import Footer from "./components/Footer";
import HlsPlayer from "./components/HlsPlayer";
// Define your hardcoded access code here
const HARDCODED_ACCESS_CODE = "31800";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [videoData, setVideoData] = useState(null); // Active video in player { title, url, embedId }
  const [liveVideoData, setLiveVideoData] = useState(null); // Permanently caches the live stream info
  const [videoError, setVideoError] = useState('');
  const [isFetchingVideo, setIsFetchingVideo] = useState(false); 
  const navigate = useNavigate();

  // --- Playlists & Archive States ---
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [isFetchingPlaylists, setIsFetchingPlaylists] = useState(false);

  // --- Contact Form State ---
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ success: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Firebase Resources State ---
  const [resources, setResources] = useState([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);

  // Fetch playlists automatically on component mount using the hardcoded backend code
  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsFetchingPlaylists(true);
      try {
        const playlistResponse = await axios.post(
          `https://church-app-back-gwhxbadse8htcabx.centralus-01.azurewebsites.net/get-playlists`, 
          { userCode: HARDCODED_ACCESS_CODE }
        );
        console.log(playlistResponse.data);
        setPlaylists(playlistResponse.data);
      } catch (err) {
        console.error("Failed to auto-load playlists:", err);
      } finally {
        setIsFetchingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, []);

  // Fetch live stream on-demand via the manual access code input
  // Fetch live stream on-demand via the manual access code input
const getVideo = async (e) => {
  if (e) e.preventDefault();
  if (!userCode.trim()) {
    setVideoError("Please enter a valid code.");
    return;
  }

  setVideoError('');
  setIsFetchingVideo(true);

  try {
    // Fetch live video data
    const liveResponse = await axios.get(
      `https://church-app-back-gwhxbadse8htcabx.centralus-01.azurewebsites.net/api/live`
    );
    
    const data = liveResponse.data;
    console.log(data);

    // Check playbackUrl (falling back to url if playbackUrl isn't present)
    const targetUrl = data?.playbackUrl || data?.url;

    if (data && targetUrl) {
      const isM3u8 = targetUrl.includes('.m3u8');
      const videoIdMatch = targetUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n]+)/);
      const embedId = videoIdMatch ? videoIdMatch[1] : null;

      const liveStreamObj = {
        title: data.title || "Live Stream",
        url: targetUrl,
        embedId: embedId,
        isM3u8: isM3u8,
        isLive: true 
      };

      setVideoData(liveStreamObj);
      setLiveVideoData(liveStreamObj); 
    } else {
      setVideoError("No live playback URL found.");
    }
  } catch(err) {
    console.error(err);
    setVideoError("Failed to fetch stream data. Verify your code.");
    setVideoData(null);
    setLiveVideoData(null);
  } finally {
    setIsFetchingVideo(false);
  }
};

  // Fetch videos inside a playlist when clicked (uses the hardcoded code)
  const handlePlaylistClick = async (playlistId) => {
    setSelectedPlaylistId(playlistId);
    setIsFetchingPlaylists(true);
    try {
      const response = await axios.post(
        `https://church-app-back-gwhxbadse8htcabx.centralus-01.azurewebsites.net/get-playlist-videos`, 
        { userCode: HARDCODED_ACCESS_CODE, playlistId }
      );
      setPlaylistVideos(response.data);
    } catch (err) {
      console.error(err);
      setVideoError("Failed to load playlist videos.");
    } finally {
      setIsFetchingPlaylists(false);
    }
  };

  // Switch player focus to an archived video
  const selectArchiveVideo = (video) => {
    setVideoData({
      title: video.title,
      url: video.url,
      embedId: video.id,
      isLive: false
    });
    document.getElementById('video-player-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reverts the player to show the live stream backup
  const switchToLiveStream = () => {
    if (liveVideoData) {
      setVideoData(liveVideoData);
    }
  };

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

  // Fetch PDFs
  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const listRef = ref(storage, "pdfs"); 
        const res = await listAll(listRef);
        
        const today = new Date();
        const currentDay = today.getDay(); // 0: Sun, 1: Mon, 2: Tue, ...
        
        // Calculate start of Monday in local time
        const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;
        const startOfMonday = new Date(today);
        startOfMonday.setDate(today.getDate() - daysSinceMonday);
        startOfMonday.setHours(0, 0, 0, 0);

        // Map day 1-5 (Mon-Fri). On weekends (0 or 6), allow all 5 days.
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

        const visibleFiles = allFiles.filter(file => {
          // Add a 12-hour buffer to startOfMonday to protect against UTC/time zone differences
          const mondayThreshold = new Date(startOfMonday.getTime() - 12 * 60 * 60 * 1000);
          
          const isThisWeek = file.timeCreated >= mondayThreshold;
          const isNotFutureDay = file.dayNumber <= maxAllowedDay;
          
          return isThisWeek && isNotFutureDay;
        });

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

      {/* RESOURCES & WATCH LIVE SECTION */}
      <section id="resources" className="py-24 bg-slate-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#7bb0e0] font-bold tracking-widest uppercase text-sm mb-3">Downloads & Guides</h2>
            <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-6">Church Resources</h3>
            
            {/* LIVE STREAM CODE INTERFACE */}
            <div className="max-w-md mx-auto bg-white p-5 sm:p-6 rounded-xl shadow-md border border-gray-100 mb-8">
              <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Live Stream Access</h4>
              <form onSubmit={getVideo} className="flex flex-col sm:flex-row gap-2.5">
                <input 
                  type="text" 
                  placeholder="Enter access code..." 
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  disabled={isFetchingVideo}
                  className="w-full flex-grow px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#7bb0e0] disabled:bg-gray-100 disabled:text-gray-400 text-sm sm:text-base"
                />
                <button 
                  type="submit" 
                  disabled={isFetchingVideo}
                  className="w-full sm:w-auto text-white bg-[#7bb0e0] hover:bg-[#5a8dbd] font-bold px-5 py-2.5 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px] text-sm sm:text-base h-11 sm:h-auto"
                >
                  {isFetchingVideo ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Load Live Stream"
                  )}
                </button>
              </form>
              {videoError && <p className="text-red-500 text-xs mt-2.5 font-medium text-left sm:text-center">{videoError}</p>}
            </div>

            {/* VIDEO PLAYER COMPONENT WITH LOADING TRANSITION */}
            {/* VIDEO PLAYER COMPONENT WITH LOADING TRANSITION */}
{/* VIDEO PLAYER COMPONENT */}
<div id="video-player-section">
  {isFetchingVideo ? (
    <div className="flex flex-col justify-center items-center h-48 max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 mb-12 px-4">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7bb0e0] mb-3"></div>
      <p className="text-sm text-gray-500 font-medium text-center">Fetching live stream broadcast...</p>
    </div>
  ) : (
    videoData && (
      <div className="max-w-5xl mx-auto bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-gray-100 mb-12 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
            {videoData.title} {videoData.isLive && <span className="ml-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-extrabold tracking-wide uppercase align-middle">Most Recent</span>}
          </h3>
          {!videoData.isLive && liveVideoData && (
            <button 
              onClick={switchToLiveStream}
              className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm self-start sm:self-center flex items-center gap-1 flex-shrink-0"
            >
              📺 Return to Most Recent
            </button>
          )}
        </div>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-inner bg-black">
          {videoData.isM3u8 ? (
            /* Render HLS Player for .m3u8 files */
            <HlsPlayer src={videoData.url} title={videoData.title} />
          ) : videoData.embedId ? (
            /* Render Youtube iframe */
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoData.embedId}`}
              title={videoData.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            /* Fallback link */
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-sm text-gray-300 mb-2">Unable to embed this stream type directly.</p>
              <a href={videoData.url} target="_blank" rel="noreferrer" className="text-blue-400 underline text-sm">
                Open stream in new tab
              </a>
            </div>
          )}
        </div>
      </div>
    )
  )}
</div>

            {/* PLAYLIST ARCHIVE BROWSING COMPONENT */}
            {playlists.length > 0 && (
              <div className="max-w-5xl mx-auto mt-12 p-6 rounded-2xl text-left">
                <div className="flex items-center justify-between mb-6">
                  {selectedPlaylistId && (
                    <button 
                      onClick={() => setSelectedPlaylistId(null)} 
                      className="text-sm font-semibold text-[#7bb0e0] hover:text-[#5a8dbd] flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      ← Back to Playlists
                    </button>
                  )}
                </div>

                {isFetchingPlaylists ? (
                  <div className="flex flex-col justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7bb0e0] mb-2"></div>
                    <p className="text-xs text-gray-400">Loading videos...</p>
                  </div>
                ) : !selectedPlaylistId ? (
                  /* Grid of Playlists */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {playlists.map((playlist) => {
                      const isJesusBetter = playlist.title === "JESUS Is Better";
                      return (
                        <div 
                          key={playlist.id} 
                          onClick={() => handlePlaylistClick(playlist.id)}
                          className={`rounded-xl overflow-hidden cursor-pointer transition-all flex flex-col ${
                            isJesusBetter 
                              ? "border-none shadow-none bg-transparent" 
                              : "border border-gray-100 shadow-sm hover:shadow-md hover:border-[#7bb0e0] bg-slate-50/50"
                          }`}
                        >
                          {(playlist.thumbnail || isJesusBetter) && (
                            <div className="overflow-hidden rounded-xl w-full aspect-video">
                              <img 
                                src={isJesusBetter ? "churchImages/JesusIsBetter.png" : playlist.thumbnail} 
                                alt={playlist.title} 
                                className={`w-full h-full object-cover transition-transform duration-300 ${
                                  isJesusBetter ? "scale-110 hover:scale-115" : ""
                                }`} 
                              />
                            </div>
                          )}
                          <div className={`flex-grow flex flex-col justify-between ${isJesusBetter ? "pt-4 px-0 pb-2" : "p-4"}`}>
                            <h4 className={`font-bold text-gray-800 line-clamp-2 ${isJesusBetter ? "text-lg" : "text-base"}`}>
                              {playlist.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">View Collection →</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* List of Videos in Selected Playlist */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {playlistVideos.map((video) => (
                      <div 
                        key={video.id}
                        onClick={() => selectArchiveVideo(video)}
                        className="flex gap-3 border border-gray-100 rounded-xl p-2 hover:border-[#7bb0e0] hover:bg-slate-50 cursor-pointer transition-all"
                      >
                        {video.thumbnail && (
                          <img src={video.thumbnail} alt={video.title} className="w-24 aspect-video object-cover rounded-md flex-shrink-0" />
                        )}
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="font-bold text-gray-800 text-xs sm:text-sm line-clamp-2 leading-tight">{video.title}</h4>
                          <span className="text-[10px] text-blue-500 font-semibold mt-1">Click to play video</span>
                        </div>
                      </div>
                    ))}
                    {playlistVideos.length === 0 && (
                      <p className="text-sm text-gray-400 italic">No videos found in this playlist.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {isLoadingResources ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7bb0e0]"></div>
            </div>
          ) : resources.length === 0 ? (
            <p className="text-center text-gray-500 italic py-8">
              No new resources have been posted for this week yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-xl hover:border-[#7bb0e0] transition-all duration-300 group min-w-0"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 mr-2">
                    <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-800 capitalize leading-snug group-hover:text-[#7bb0e0] transition-colors truncate text-sm sm:text-base">
                        {resource.name}
                      </h4>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-[#7bb0e0] transition-colors flex-shrink-0">
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
      <Footer/> 
    </div>
  );
}