import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * CUSTOM WOODEN SCROLLER COMPONENT
 * Uses:
 * - /assets/tampilan di rank/asset/scroller.png (Vertical Track Line)
 * - /assets/tampilan di rank/asset/button_of_scroller@4x.png (Draggable Wooden Pin Button)
 */
export default function CustomWoodenScroller({ children, className = '', containerClassName = '' }) {
  const contentRef = useRef(null);
  const trackRef = useRef(null);
  const [thumbTopPx, setThumbTopPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartYRef = useRef(0);
  const startScrollTopRef = useRef(0);

  const pinSize = 36; // Height of button_of_scroller pin in px

  // Update thumb position based on content scroll
  const updateThumbPos = useCallback(() => {
    if (!contentRef.current || !trackRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const trackHeight = trackRef.current.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - pinSize;

    if (maxScroll <= 0 || maxThumbTop <= 0) {
      setThumbTopPx(0);
    } else {
      const ratio = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setThumbTopPx(ratio * maxThumbTop);
    }
  }, [pinSize]);

  useEffect(() => {
    updateThumbPos();
    window.addEventListener('resize', updateThumbPos);
    return () => window.removeEventListener('resize', updateThumbPos);
  }, [updateThumbPos]);

  // Handle scrolling via mousewheel or touch on content area
  const handleScroll = () => {
    if (!isDragging) {
      updateThumbPos();
    }
  };

  // Dragging logic for the wooden pin thumb
  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dragStartYRef.current = clientY;
    if (contentRef.current) {
      startScrollTopRef.current = contentRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging || !contentRef.current || !trackRef.current) return;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      const deltaY = clientY - dragStartYRef.current;
      
      const trackHeight = trackRef.current.clientHeight;
      const maxThumbTop = trackHeight - pinSize;
      const { scrollHeight, clientHeight } = contentRef.current;
      const maxScroll = scrollHeight - clientHeight;

      if (maxThumbTop > 0 && maxScroll > 0) {
        const scrollDelta = (deltaY / maxThumbTop) * maxScroll;
        const newScrollTop = Math.max(0, Math.min(maxScroll, startScrollTopRef.current + scrollDelta));
        contentRef.current.scrollTop = newScrollTop;
        const ratio = newScrollTop / maxScroll;
        setThumbTopPx(ratio * maxThumbTop);
      }
    };

    const handlePointerUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, pinSize]);

  // Click anywhere on the track to jump scroll
  const handleTrackClick = (e) => {
    if (!trackRef.current || !contentRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const ratio = Math.max(0, Math.min(1, offsetY / trackHeight));
    const { scrollHeight, clientHeight } = contentRef.current;
    const maxScroll = scrollHeight - clientHeight;

    const newScrollTop = ratio * maxScroll;
    contentRef.current.scrollTop = newScrollTop;
    setThumbTopPx(ratio * (trackHeight - pinSize));
  };

  return (
    <div className={`relative flex items-stretch w-full h-full min-h-0 overflow-hidden ${containerClassName}`}>
      {/* Scrollable Content Area (Browser scrollbars hidden via no-scrollbar) */}
      <div 
        ref={contentRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto no-scrollbar space-y-2 pr-1.5 ${className}`}
      >
        {children}
      </div>

      {/* WOODEN SCROLLER TRACK & PIN THUMB BAR (RIGHT SIDE) */}
      <div className="relative flex items-stretch justify-center pl-2 py-1 select-none flex-shrink-0 z-30">
        {/* Scroller Track (scroller.png) */}
        <div 
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative w-6 sm:w-7 h-full min-h-[120px] cursor-pointer flex justify-center items-center"
          style={{
            backgroundImage: `url('/assets/tampilan di rank/asset/scroller.png')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          {/* Draggable Wooden Pin Thumb Button (button_of_scroller@4x.png) */}
          <div
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className={`absolute w-8 h-8 sm:w-10 sm:h-10 cursor-grab active:cursor-grabbing flex items-center justify-center drop-shadow-md z-40 transition-transform duration-75 ${
              isDragging ? 'scale-115' : 'hover:scale-108'
            }`}
            style={{
              top: `${thumbTopPx}px`,
              transform: 'translateX(-50%)',
              left: '50%'
            }}
          >
            <img 
              src="/assets/tampilan di rank/asset/button_of_scroller@4x.png" 
              alt="Scroller Pin Button" 
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
