import React from 'react';
import Jsondata from '../component/Jsondata';
import { useEffect } from 'react';

export default function News({ }) {
    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden';
        
        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);


    return (
       <Jsondata />
    )
}