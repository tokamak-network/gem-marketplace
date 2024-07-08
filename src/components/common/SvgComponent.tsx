import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const SvgComponent = ({ url }: {url: string}) => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setSvgContent(text);
      } catch (error) {
        console.error('Error fetching the SVG:', error);
      }
    };

    fetchSvg();
  }, [url]);

  if (!svgContent) {
    return <div>Loading...</div>;
  }

  return <>{parse(svgContent)}</>;
};

export default SvgComponent;
