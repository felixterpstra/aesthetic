'use client';

import { Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { fetchImagesForQuery } from '@/services/serp';

export function SearchView() {
  const [searchText, setSearchText] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);

  const handleSearch = async () => {
    if (searchText === '') return;

    try {
      const res = await fetchImagesForQuery(searchText);
      console.log('res', res);
    } catch (error) {
      setIsSearchError(true);
    }
  };

  return (
    <Container>
      <TextField value={searchText} onChange={(event) => setSearchText(event.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
    </Container>
  );
}
