import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

function HlsPlayer({ src, title }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;

        // Check if hls.js is supported in current browser (Chrome, Firefox, Edge)
        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch((err) => {
                    console.warn("Autoplay blocked by browser:", err);
                });
            });

            return () => {
                hls.destroy();
            };
        }
        // Fallback for native HLS support (Safari / iOS)
        else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = src;
            video.addEventListener("loadedmetadata", () => {
                video.play().catch((err) => {
                    console.warn("Autoplay blocked by browser:", err);
                });
            });
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            playsInline
            className="w-full h-full object-contain"
            title={title}
        />
    );
}

export default HlsPlayer;