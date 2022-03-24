import React from 'react';

import './YoutubeEmbed.css';

type Props = {
  embedId: string;
};

const YoutubeEmbed = ({ embedId }: Props): JSX.Element => (
  <div className="youtube-embed-container">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
