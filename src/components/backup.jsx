import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, User, Music, Volume2, VolumeX, Upload } from 'lucide-react';

// Fun username generators
const usernamePrefixes = ['cool', 'awesome', 'funky', 'wild', 'epic', 'trendy', 'viral', 'super', 'hyper', 'mega'];
const usernameSuffixes = ['creator', 'star', 'vibes', 'genius', 'master', 'guru', 'pro', 'legend', 'king', 'queen'];

// Fun description templates
const descriptionTemplates = [
  '✨ Living my best life! {emoji} #trending #viral',
  '🎵 When the beat drops! {emoji} #music #dance',
  'This is how we do it {emoji} #fun #lifestyle',
  'Made this for you! {emoji} #creative #art',
  'Can\'t believe this worked! {emoji} #amazing',
  'POV: When you finally nail it {emoji} #perfect',
  'Day in my life {emoji} #dailyvlog #lifestyle',
  'Try this at home! {emoji} #tutorial #howto',
  'Plot twist at the end {emoji} #surprise',
  'This took forever to make {emoji} #hardwork'
];

// Fun emojis
const emojis = ['💃', '🎵', '🎉', '🌟', '🔥', '⭐', '🎸', '🎨', '🎬', '🎪'];

// Song name templates
const songTemplates = [
  '♪ Dancing in the Moonlight - Remix',
  '♪ Summer Vibes 2024',
  '♪ Epic Background Music',
  '♪ Trending Sound Original',
  '♪ Viral Beat Mix',
  '♪ Cool Kid Anthem',
  '♪ Party Mode Activated',
  '♪ Chill Beats to Relax',
  '♪ Epic Drop - DJ Mix',
  '♪ Feel Good Tune'
];

// Generate random numbers within a range
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate random username
const generateUsername = () => {
  const prefix = usernamePrefixes[Math.floor(Math.random() * usernamePrefixes.length)];
  const suffix = usernameSuffixes[Math.floor(Math.random() * usernameSuffixes.length)];
  return `@${prefix}_${suffix}${randomRange(1, 999)}`;
};

// Generate random description
const generateDescription = () => {
  const template = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return template.replace('{emoji}', emoji);
};

// Generate video data
const generateVideoData = (index) => {
  return {
    id: index + 1,
    username: generateUsername(),
    description: generateDescription(),
    likes: randomRange(100, 999999),
    comments: randomRange(10, 9999),
    shares: randomRange(5, 999),
    videoUrl: `/videos/video${index + 1}.mp4`,
    songName: songTemplates[index % songTemplates.length],
  };
};

// Generate mock data for all videos
const mockVideos = Array.from({ length: 10 }, (_, index) => generateVideoData(index));

const VideoPost = ({ video, isActive }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleVideoPress = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-screen w-full bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        onClick={handleVideoPress}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Sound control */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm"
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6 text-white" />
        ) : (
          <Volume2 className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between">
          {/* Left side - user info and description */}
          <div className="flex-1 text-white space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <User className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-lg">{video.username}</span>
            </div>
            
            <p className="text-sm leading-relaxed max-w-[80%]">{video.description}</p>
            
            <div className="flex items-center gap-2 text-sm">
              <Music className="h-4 w-4" />
              <span className="font-medium">{video.songName}</span>
            </div>
          </div>

          {/* Right side - interaction buttons */}
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={handleLike}
              className="group flex flex-col items-center"
            >
              <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60 transition-colors">
                <Heart 
                  className={`h-6 w-6 transition-all ${liked ? 'text-red-500 scale-110' : 'text-white'}`}
                  fill={liked ? 'currentColor' : 'none'}
                />
              </div>
              <span className="text-white text-xs mt-1">{likes}</span>
            </button>

            <button className="group flex flex-col items-center">
              <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60 transition-colors">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-white text-xs mt-1">{video.comments}</span>
            </button>

            <button className="group flex flex-col items-center">
              <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60 transition-colors">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-white text-xs mt-1">{video.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoUploader = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        handleVideo(file);
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      handleVideo(file);
    }
  };

  const handleVideo = (file) => {
    // Create a local URL for the video
    const videoUrl = URL.createObjectURL(file);
    onUpload({
      id: Date.now(),
      username: '@user',
      description: 'My new video',
      likes: 0,
      comments: 0,
      shares: 0,
      videoUrl,
      songName: '♪ Original Sound'
    });
  };

  return (
    <div
      className={`fixed bottom-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
        isDragging ? 'bg-blue-100' : 'bg-white'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label className="flex flex-col items-center cursor-pointer">
        <Upload className="w-6 h-6 mb-2" />
        <span className="text-sm">Upload Video</span>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </label>
    </div>
  );
};

const TikTokClone = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videos, setVideos] = useState(mockVideos);

  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollTop / window.innerHeight);
    setActiveIndex(index);
  };

  return (
    <div 
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory"
      onScroll={handleScroll}
    >
      <VideoUploader 
        onUpload={(newVideo) => {
          setVideos([newVideo, ...videos]);
        }}
      />
      {videos.map((video, index) => (
        <div key={video.id} className="snap-start h-screen">
          <VideoPost video={video} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
};

export default TikTokClone;