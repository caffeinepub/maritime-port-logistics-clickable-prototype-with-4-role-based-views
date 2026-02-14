import { useEffect, useRef } from 'react';

interface VesselFinderAisMapProps {
  className?: string;
}

export function VesselFinderAisMap({ className = '' }: VesselFinderAisMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptInjectedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate injection
    if (scriptInjectedRef.current) {
      return;
    }

    // Check if scripts are already in the document
    const existingConfigScript = document.getElementById('vesselfinder-config');
    const existingMapScript = document.getElementById('vesselfinder-map');

    if (existingConfigScript || existingMapScript) {
      scriptInjectedRef.current = true;
      return;
    }

    // Inject configuration script
    const configScript = document.createElement('script');
    configScript.id = 'vesselfinder-config';
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      // Map appearance
      var width="100%";
      var height="300";
      var latitude="0.00";
      var longitude="0.00";
      var zoom="3";
      var names=false;

      // Single ship tracking
      var mmsi="123456789";
      var imo="1234567";
      var show_track=false;

      // Fleet tracking
      var fleet="e48ab3d80a0e2a9bf28930f2dd08800c";
      var fleet_name="Carnival";
      var fleet_timespan="1440";
    `;

    // Inject map script
    const mapScript = document.createElement('script');
    mapScript.id = 'vesselfinder-map';
    mapScript.type = 'text/javascript';
    mapScript.src = 'https://www.vesselfinder.com/aismap.js';
    mapScript.async = true;

    // Append scripts to container
    if (containerRef.current) {
      containerRef.current.appendChild(configScript);
      containerRef.current.appendChild(mapScript);
      scriptInjectedRef.current = true;
    }

    // Cleanup function
    return () => {
      // Note: We don't remove scripts on unmount to avoid re-initialization issues
      // The guard at the top prevents duplicate injection
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {/* VesselFinder map will be injected here by the external script */}
    </div>
  );
}
