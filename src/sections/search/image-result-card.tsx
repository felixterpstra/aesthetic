import { SerpImageResult } from '@/services/serp';
import { Box, Card, Stack, SxProps } from '@mui/material';
import { FeedbackButton } from '@/components/feedback-button';
import { useFeedback } from '@/context/feedback';
import { useSwipeable } from 'react-swipeable';
import { enqueueSnackbar } from 'notistack';

type Props = {
  imageResult: SerpImageResult;
  position: 'top' | 'left' | 'right';
  sx?: SxProps;
};

export function ImageResultCard({ imageResult, position, sx }: Props) {
  const { addFeedbackItem } = useFeedback();

  const handleDislike = () => {
    addFeedbackItem({
      feedback: 'negative',
      imageResult,
    });
    enqueueSnackbar('Disliked image', { variant: 'error' });
  };

  const handleLike = () => {
    addFeedbackItem({
      feedback: 'positive',
      imageResult,
    });
    enqueueSnackbar('Liked image', { variant: 'success' });
  };

  const swipeConfig = {
    trackTouch: true,
    trackMouse: true,
    swipeDuration: 250,
    touchEventOptions: { passive: true },
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => handleDislike(),
    onSwipedRight: () => handleLike(),
    ...swipeConfig,
  });

  return (
    <Box
      {...handlers}
      sx={{
        transition: '150ms all',
        position: 'absolute',
        top: position === 'top' ? 0 : '10px',
        left: position === 'left' ? '-10px' : 0,
        right: position === 'right' ? '-10px' : 0,
        ...sx,
      }}
    >
      <Card>
        <Stack spacing={2}>
          <img
            style={{ pointerEvents: 'none' }}
            src={imageResult.thumbnail}
            width="100%"
            alt={imageResult.title}
          />
          <Stack direction="row" justifyContent="center" spacing={3} paddingBottom={2}>
            <FeedbackButton type="dislike" onClick={handleDislike} />
            <FeedbackButton type="like" onClick={handleLike} />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
