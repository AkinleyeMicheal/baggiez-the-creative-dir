import React from 'react';

interface VideoPlayerProps {
    videoUrl?: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    videoUrl,
    poster,
    autoPlay = true,
    loop = true,
    muted = true,
    controls = false,
    className = "w-full h-full object-cover object-center"
}) => {
    if (!videoUrl || videoUrl === '#') {
        // Fallback to poster or empty video if no URL provided
        return (
            <video 
                autoPlay={autoPlay} 
                loop={loop} 
                muted={muted} 
                controls={controls}
                playsInline 
                poster={poster} 
                className={className}
            >
                <source src="#" type="video/mp4" />
            </video>
        );
    }

    // Check if it's a YouTube URL
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    
    if (isYouTube) {
        // Extract video ID
        let videoId = '';
        if (videoUrl.includes('youtu.be/')) {
            videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else if (videoUrl.includes('watch?v=')) {
            videoId = videoUrl.split('watch?v=')[1].split('&')[0];
        } else if (videoUrl.includes('embed/')) {
            videoId = videoUrl.split('embed/')[1].split('?')[0];
        }

        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${videoId}&controls=${controls ? 1 : 0}&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

        return (
            <iframe
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={className}
                style={{ pointerEvents: controls ? 'auto' : 'none' }} // Prevent iframe from stealing clicks if used as background
            ></iframe>
        );
    }

    // Check if it's a Vimeo URL
    const isVimeo = videoUrl.includes('vimeo.com');
    if (isVimeo) {
        const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
        const embedUrl = `https://player.vimeo.com/video/${videoId}?background=${controls ? 0 : 1}&autoplay=${autoPlay ? 1 : 0}&loop=${loop ? 1 : 0}&byline=0&title=0`;
        
        return (
            <iframe
                src={embedUrl}
                title="Vimeo video player"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className={className}
                style={{ pointerEvents: controls ? 'auto' : 'none' }}
            ></iframe>
        );
    }

    // Default to HTML5 video for direct links (.mp4, .webm, etc)
    return (
        <video 
            autoPlay={autoPlay} 
            loop={loop} 
            muted={muted} 
            controls={controls}
            playsInline 
            poster={poster} 
            className={className}
        >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};
