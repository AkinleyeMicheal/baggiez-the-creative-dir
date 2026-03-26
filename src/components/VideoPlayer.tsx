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
    autoPlay = false,  // ← was true; never autoplay unless explicitly requested
    loop = true,
    muted = true,
    controls = true,   // ← was false; show controls so user can play manually
    className = "w-full h-full object-cover object-center"
}) => {
    if (!videoUrl || videoUrl === '#') {
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

    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

    if (isYouTube) {
        let videoId = '';
        if (videoUrl.includes('youtu.be/')) {
            videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else if (videoUrl.includes('watch?v=')) {
            videoId = videoUrl.split('watch?v=')[1].split('&')[0];
        } else if (videoUrl.includes('embed/')) {
            videoId = videoUrl.split('embed/')[1].split('?')[0];
        }

        // autoplay=0 always — user must press play themselves
        const embedUrl = [
            `https://www.youtube.com/embed/${videoId}`,
            `?autoplay=0`,                          // ← hardcoded off, ignoring prop
            `&mute=${muted ? 1 : 0}`,
            `&loop=${loop ? 1 : 0}`,
            `&playlist=${videoId}`,
            `&controls=${controls ? 1 : 0}`,
            `&showinfo=0&rel=0&modestbranding=1&playsinline=1`,
        ].join('');

        return (
            <iframe
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // ↑ "autoplay" removed from allow list so browser policy can't override
                allowFullScreen
                className={className}
                style={{ pointerEvents: 'auto' }} // always allow interaction
            />
        );
    }

    const isVimeo = videoUrl.includes('vimeo.com');
    if (isVimeo) {
        const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
        // background=0 so the native Vimeo player UI is shown; autoplay=0
        const embedUrl = [
            `https://player.vimeo.com/video/${videoId}`,
            `?background=0`,
            `&autoplay=0`,                          // ← hardcoded off
            `&loop=${loop ? 1 : 0}`,
            `&byline=0&title=0`,
        ].join('');

        return (
            <iframe
                src={embedUrl}
                title="Vimeo video player"
                frameBorder="0"
                allow="fullscreen; picture-in-picture"
                // ↑ "autoplay" removed from allow list
                allowFullScreen
                className={className}
                style={{ pointerEvents: 'auto' }}
            />
        );
    }

    // Native HTML5 video
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