import { Stack } from '@mui/material';

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export function TabButton({ children, isActive, onClick }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      sx={{
        borderRadius: '6px',
        padding: '10px',
        transition: '150ms all',
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'rgb(210,210,210)' },
        ...(isActive
          ? {
              backgroundColor: 'rgb(240,240,240)',
            }
          : {}),
      }}
      onClick={onClick}
    >
      {children}
    </Stack>
  );
}
