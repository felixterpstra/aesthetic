'use client';

import { Alert, Box, Button, CircularProgress, Container, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { fetchImagesForQuery, SerpImageResult } from '@/services/serp';
import { ImageResultCard } from '@/sections/search/image-result-card';

export function SearchView() {
  const [searchText, setSearchText] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [searchResults, setSearchResults] = useState<SerpImageResult[]>([]);

  const handleSearch = async () => {
    if (searchText === '') return;

    setIsSearchError(false);
    setIsSearchLoading(true);
    setSearchResults([]);

    try {
      const res = await fetchImagesForQuery(searchText);
      setSearchResults(res);
    } catch (error) {
      setIsSearchError(true);
    } finally {
      setIsSearchLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Stack paddingY={2} direction="row" spacing={1}>
        <Box flexGrow={1}>
          <TextField
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            size="small"
            sx={{ width: '100%' }}
          />
        </Box>
        <Button onClick={handleSearch} size="small" variant="contained">
          Search
        </Button>
      </Stack>

      <Stack spacing={2}>
        {isSearchError && <Alert severity="error">Failed to search, please try again</Alert>}
        {isSearchLoading && (
          <Stack paddingTop="60px" direction="row" justifyContent="center">
            <CircularProgress size={20} />
          </Stack>
        )}

        {searchResults.length > 0 && (
          <Stack spacing={2}>
            {searchResults.slice(0, 5).map((searchResult) => (
              <ImageResultCard key={searchResult.thumbnail} imageResult={searchResult} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
