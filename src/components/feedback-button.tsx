import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box, Stack } from '@mui/material';

type Props = {
  type: 'like' | 'dislike';
  onClick: () => void;
};

export function FeedbackButton({ type, onClick }: Props) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
      sx={{
        width: 54,
        height: 54,
        borderRadius: 26,
        backgroundColor: type === 'like' ? 'rgb(64,231,90)' : 'rgb(250,74,41)',
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: type === 'like' ? 'rgb(105,241,126)' : 'rgb(245,130,109)',
        },
      }}
    >
      {type === 'like' && <ThumbUpIcon sx={{ color: 'white' }} />}
      {type === 'dislike' && <ThumbDownIcon sx={{ color: 'white' }} />}
    </Stack>
  );
}
