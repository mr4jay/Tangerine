
"use client";

import { useState, useEffect, useRef } from 'react';

// A simple hook to create a typing sound with the Web Audio API
const useTypingSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on the client-side
    // This check is important because AudioContext is a browser-only feature.
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  const play = () => {
    if (!audioContextRef.current) return;
    
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Sound properties for a "tick"
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  };

  return play;
};


export const useTypingEffect = (text: string, speed = 100, delay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const playTypingSound = useTypingSound();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    // Clear any running timers from previous renders
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setDisplayedText('');
    
    const startTyping = () => {
      let index = 0;
      intervalRef.current = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          if (text.charAt(index) !== ' ') {
            playTypingSound();
          }
          index++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, speed);
    };

    timeoutRef.current = setTimeout(startTyping, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // The playTypingSound function is stable and doesn't need to be in the dependency array.
  // Including it was causing the effect to re-run on every sound playback.
  }, [text, speed, delay]);

  return displayedText;
};
