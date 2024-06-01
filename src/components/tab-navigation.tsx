'use client';

import { Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import { TabButton } from '@/components/tab-button';
import { usePathname, useRouter } from 'next/navigation';

export function TabNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box sx={{ backgroundColor: 'rgb(220,220,220)' }}>
      <Stack direction="row" justifyContent="stretch" padding={1} spacing={1}>
        <TabButton isActive={pathname === '/'} onClick={() => router.push('/')}>
          <SearchIcon />
        </TabButton>

        <TabButton isActive={pathname === '/my-items'} onClick={() => router.push('/my-items')}>
          <GridViewIcon />
        </TabButton>
      </Stack>
    </Box>
  );
}
