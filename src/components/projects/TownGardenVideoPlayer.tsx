import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Video,
  ShieldCheck,
} from 'lucide-react';

interface TownGardenVideoPlayerProps {
  videoUrl?: string;
  posterImage?: string;
  title?: string;
  description?: string;
}

export const TownGardenVideoPlayer: React.FC<TownGardenVideoPlayerProps> = ({
  videoUrl = '/assets/projects/town-garden/town-garden-video.mp4',
  posterImage = '/assets/projects/town-garden/hero.png',
  title = 'Experience Town Garden',
  description = 'Take a closer look at the architecture, surroundings, and vision of Town Garden, located in University Town, Peshawar.',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [hasStarted, setHasStarted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setProgress((curr / dur) * 100);
    setCurrentTime(formatTime(curr));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const target = Number(e.target.value);
    const time = (target / 100) * videoRef.current.duration;
    videoRef.current.currentTime = time;
    setProgress(target);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <section className="py-20 bg-white" id="project-video-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold uppercase tracking-wider mb-3">
            <Video className="w-3.5 h-3.5 text-[#D6A84F]" />
            <span>Exclusive Architectural Walkthrough</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#022C22] uppercase tracking-tight mb-3">
            {title}
          </h2>

          <div className="w-20 h-1 bg-[#D6A84F] mx-auto rounded-full mb-4" />

          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            {description}
          </p>
        </div>

        {/* 16:9 Video Player Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-[#D6A84F]/30 group"
        >
          {/* HTML5 Video */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterImage}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Initial Poster & Play Button Overlay */}
          {!hasStarted && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-gradient-to-t from-[#022C22]/90 via-[#022C22]/40 to-transparent flex flex-col items-center justify-center cursor-pointer p-6 transition-opacity duration-300"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D6A84F] text-[#022C22] flex items-center justify-center shadow-gold-glow hover:scale-110 active:scale-95 transition-transform duration-300">
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-[#022C22]" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping pointer-events-none" />
              </div>

              <span className="font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider text-white">
                Play Town Garden Project Video
              </span>
              <span className="text-xs text-[#ECFDF5]/80 mt-1">
                University Town, Peshawar • 1080p HD
              </span>
            </div>
          )}

          {/* Custom Video Controls Bar */}
          {hasStarted && (
            <div
              className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Progress Slider */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#D6A84F]"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#D6A84F] transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-[#D6A84F] transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <div className="text-xs font-mono text-gray-300">
                    {currentTime} / {duration}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                        setIsPlaying(true);
                      }
                    }}
                    className="p-1.5 hover:text-[#D6A84F] transition-colors text-xs flex items-center space-x-1"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Replay</span>
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-[#D6A84F] transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

