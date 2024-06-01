import { SerpImageResult } from '@/services/serp';
import { Card } from '@mui/material';

type Props = {
  imageResult: SerpImageResult;
};

export function ImageResultCard({ imageResult }: Props) {
  return (
    <Card>
      <img src={imageResult.thumbnail} width="100%" alt={imageResult.title} />
    </Card>
  );
}
