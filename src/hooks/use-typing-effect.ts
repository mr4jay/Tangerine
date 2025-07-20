
"use client";

import { useState, useEffect, useRef } from 'react';

// A simple hook to create a typing sound with the Web Audio API
const useTypingSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on the client-side
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
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

  useEffect(() => {
    setDisplayedText(''); // Reset on text change
    let index = 0;
    
    const startTyping = () => {
      const intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          if (text.charAt(index) !== ' ') {
            playTypingSound();
          }
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    }
    
    const timeoutId = setTimeout(startTyping, delay);

    return () => clearTimeout(timeoutId);

  }, [text, speed, delay, playTypingSound]);

  return displayedText;
};
