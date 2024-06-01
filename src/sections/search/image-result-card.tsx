import { SerpImageResult } from '@/services/serp';
import { Card, Stack } from '@mui/material';
import { FeedbackButton } from '@/components/feedback-button';
import { useFeedback } from '@/context/feedback';

type Props = {
  imageResult: SerpImageResult;
};

export function ImageResultCard({ imageResult }: Props) {
  const { addFeedbackItem } = useFeedback();

  const handleDislike = () => {
    addFeedbackItem({
      feedback: 'negative',
      imageResult,
    });
  };

  const handleLike = () => {
    addFeedbackItem({
      feedback: 'positive',
      imageResult,
    });
  };

  return (
    <Card>
      <Stack spacing={2}>
        <img src={imageResult.thumbnail} width="100%" alt={imageResult.title} />
        <Stack direction="row" justifyContent="center" spacing={3} paddingBottom={2}>
          <FeedbackButton type="dislike" onClick={handleDislike} />
          <FeedbackButton type="like" onClick={handleLike} />
        </Stack>
      </Stack>
    </Card>
  );
}
