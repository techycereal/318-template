import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const HARDCODED_ACCESS_CODE = "31800";

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [playlistImage, setPlaylistImage] = useState(""); // Dynamic playlist thumbnail
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      setIsFetching(true);
      setError("");
      try {
        // 1. Get playlist metadata to retrieve the overall playlist image
        const playlistRes = await axios.post(
          `https://church-app-back-gwhxbadse8htcabx.centralus-01.azurewebsites.net/get-playlists`,
          { userCode: HARDCODED_ACCESS_CODE }
        );

        const currentPlaylist = playlistRes.data.find(
          (p) => String(p.id) === String(playlistId)
        );

        // Fallback for "JESUS Is Better" or use the playlist's thumbnail URL
        const bgImg =
          currentPlaylist?.title === "JESUS Is Better"
            ? "churchImages/JesusIsBetter.png"
            : currentPlaylist?.thumbnail || "churchImages/JesusIsBetter.png";

        setPlaylistImage(bgImg);

        // 2. Fetch videos inside this playlist
        const response = await axios.post(
          `https://church-app-back-gwhxbadse8htcabx.centralus-01.azurewebsites.net/get-playlist-videos`,
          { userCode: HARDCODED_ACCESS_CODE, playlistId }
        );

        const videos = response.data;
        setPlaylistVideos(videos);

        // Auto-select first video
        if (videos && videos.length > 0) {
          setSelectedVideo(videos[0]);
        }
      } catch (err) {
        console.error("Error loading playlist videos:", err);
        setError("Failed to load videos for this playlist.");
      } finally {
        setIsFetching(false);
      }
    };

    if (playlistId) {
      fetchPlaylistVideos();
    }
  }, [playlistId]);

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    document
      .getElementById("playlist-player-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between selection:bg-[#7bb0e0] selection:text-white">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-6 text-sm font-semibold text-[#7bb0e0] hover:text-[#5a8dbd] flex items-center gap-1 bg-white border border-gray-200 px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            ← Back to All Playlists
          </button>

          {/* Loading Spinner */}
          {isFetching && (
            <div className="flex flex-col justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7bb0e0] mb-3"></div>
              <p className="text-sm text-gray-500 font-medium">Loading sermons...</p>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center text-sm font-medium">
              {error}
            </div>
          )}

          {!isFetching && !error && (
            <div className="max-w-2xl mx-auto">
              {/* VIDEO PLAYER SECTION */}
              {selectedVideo && (
                <div
                  id="playlist-player-section"
                  className="bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-gray-100 mb-8 text-left"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight mb-3 px-1">
                    {selectedVideo.title}
                  </h3>

                  {/* Pass playlistImage as overlayImg */}
                  <FadeYouTubePlayer
                    embedId={selectedVideo.id}
                    title={selectedVideo.title}
                    overlayImg={playlistImage}
                  />
                </div>
              )}

              <h3 className="text-xl font-extrabold text-gray-800 mb-4">
                Playlist Sermons ({playlistVideos.length})
              </h3>

              {/* SINGLE COLUMN SERMON LIST */}
              <div className="flex flex-col gap-3">
                {playlistVideos.map((video) => {
                  const isCurrent = selectedVideo?.id === video.id;
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleSelectVideo(video)}
                      className={`border rounded-xl p-3 cursor-pointer transition-all flex flex-col sm:flex-row gap-4 items-center ${
                        isCurrent
                          ? "bg-blue-50/60 border-[#7bb0e0] shadow-md"
                          : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-[#7bb0e0]"
                      }`}
                    >
                      {/* Show playlist thumbnail or individual video thumbnail */}
                      <img
                        src={playlistImage.startsWith("http") ? playlistImage : `/${playlistImage}`}
                        alt={video.title}
                        className="w-full sm:w-40 aspect-video object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex flex-col justify-between w-full h-full py-1">
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 leading-snug mb-2">
                          {video.title}
                        </h4>
                        <span
                          className={`text-xs font-semibold ${
                            isCurrent ? "text-blue-600" : "text-[#7bb0e0]"
                          }`}
                        >
                          {isCurrent ? "▶ Currently Playing" : "Play Sermon →"}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {playlistVideos.length === 0 && (
                  <p className="text-center text-gray-400 italic py-12">
                    No sermons found in this playlist.
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

function FadeYouTubePlayer({ embedId, title, overlayImg }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Reset overlay state whenever video/embedId changes
  useEffect(() => {
    setIsPlaying(false);
    setShowOverlay(true);
  }, [embedId]);

  const handlePlay = () => {
    setIsPlaying(true);

    const iframe = document.getElementById(`yt-playlist-player-${embedId}`);
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    }

    // Hide overlay after 1.5s fade animation completes
    setTimeout(() => {
      setShowOverlay(false);
    }, 1500);
  };

  // Ensure absolute path prefix for local relative assets
  const bgUrl = overlayImg?.startsWith("http")
    ? overlayImg
    : `/${overlayImg}`;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-inner bg-black">
      <iframe
        id={`yt-playlist-player-${embedId}`}
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${embedId}?enablejsapi=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      {showOverlay && overlayImg && (
        <div
          onClick={handlePlay}
          className={`absolute inset-0 bg-cover bg-center cursor-pointer flex items-center justify-center z-10 transition-opacity duration-[1500ms] ease-in-out ${
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          <div className="w-16 h-12 bg-black/80 hover:bg-red-600 transition-colors rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white ml-1"></div>
          </div>
        </div>
      )}
    </div>
  );
}