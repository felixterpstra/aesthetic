import { SerpImageResult } from '@/services/serp';
import { Box } from '@mui/material';
import { ImageResultCard } from '@/sections/search/image-result-card';

type Props = {
  imageResults: SerpImageResult[];
};

export function SearchResults({ imageResults }: Props) {
  return (
    <Box position="relative" width="100%" height="1200px">
      {imageResults.map((searchResult, index) => (
        <div key={index}>
          <ImageResultCard
            key={searchResult.thumbnail}
            imageResult={searchResult}
            position={index === 0 ? 'top' : searchResult.index % 2 === 0 ? 'left' : 'right'}
          />
        </div>
      ))}
    </Box>
  );
}
