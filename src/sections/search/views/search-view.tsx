'use client';

import { Alert, Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useMemo, useState } from 'react';
import { fetchImagesForQuery, SerpImageResult } from '@/services/serp';
import { ImageResultCard } from '@/sections/search/image-result-card';
import { useFeedback } from '@/context/feedback';

export function SearchView() {
  const { feedbackItems } = useFeedback();
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

  const displayedResults = useMemo(() => {
    return searchResults.filter(
      (searchResult) =>
        !feedbackItems.some(
          (feedbackItem) => feedbackItem.imageResult.thumbnail === searchResult.thumbnail,
        ),
    );
  }, [searchResults, feedbackItems]);

  return (
    <Container maxWidth="md">
      <Typography
        paddingTop={3}
        fontSize={18}
        fontWeight={800}
        fontStyle="italic"
        color="rgb(200,200,200)"
        textAlign="center"
        paddingBottom={2}
      >
        AESTHETIC
      </Typography>

      <Stack paddingY={2} direction="row" spacing={1}>
        <Box flexGrow={1}>
          <TextField
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            size="small"
            placeholder="Search for inspiration"
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

        {searchText === '' && (
          <Stack paddingTop="60px" direction="row" justifyContent="center">
            <Typography color="rgb(100,100,100)">To get started, enter a search above</Typography>
          </Stack>
        )}
        {searchResults.length > 0 && (
          <Stack spacing={2}>
            {displayedResults.slice(0, 5).map((searchResult) => (
              <ImageResultCard key={searchResult.thumbnail} imageResult={searchResult} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
