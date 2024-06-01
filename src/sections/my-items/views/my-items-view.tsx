'use client';

import {
  Box,
  Button,
  Card,
  Container,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useFeedback } from '@/context/feedback';
import { useMemo, useState } from 'react';

export function MyItemsView() {
  const { feedbackItems, removeAllFeedbackItems } = useFeedback();
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative'>('positive');
  console.log('feedbackType', feedbackType);

  const handleClear = () => {
    removeAllFeedbackItems();
  };

  const filteredFeedbackItems = useMemo(
    () => feedbackItems.filter((item) => item.feedback === feedbackType),
    [feedbackItems, feedbackType],
  );

  return (
    <Container maxWidth="md">
      <Stack paddingY={4} spacing={3}>
        <Typography fontSize={20} fontWeight={600}>
          My Items
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <ToggleButtonGroup
            value={feedbackType}
            exclusive
            onChange={(_, newValue) => {
              setFeedbackType(newValue);
            }}
          >
            <ToggleButton value="positive" size="small">
              Liked
            </ToggleButton>
            <ToggleButton value="negative" size="small">
              Disliked
            </ToggleButton>
          </ToggleButtonGroup>

          <Button variant="outlined" size="small" onClick={handleClear}>
            Clear My Items
          </Button>
        </Stack>

        {filteredFeedbackItems.length === 0 && (
          <Stack direction="row" justifyContent="center">
            <Typography color="rgb(100,100,100)">
              You haven&apos;t {feedbackType === 'positive' ? 'liked' : 'disliked'} any images yet.{' '}
              <Link href="/">Search for images</Link> and{' '}
              {feedbackType === 'positive' ? 'like' : 'dislike'} them, then they will appear there.
            </Typography>
          </Stack>
        )}

        {filteredFeedbackItems.length > 0 && (
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {filteredFeedbackItems.map((item) => (
              <Box key={item.imageResult.thumbnail} width="50%">
                <Card>
                  <img src={item.imageResult.thumbnail} width="100%" alt={item.imageResult.title} />
                </Card>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
