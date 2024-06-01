import axios from 'axios';

type SerpSearchResponse = {
  search_metadata: {
    id: string;
    status: string;
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    google_images_url: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters: {
    engine: string;
    q: string;
    google_domain: string;
    hl: string;
    gl: string;
    ijn: string;
    device: string;
  };
  search_information: {
    image_results_state: string;
  };
  suggested_searches: SerpSuggestedSearch[];
  images_results: SerpImageResult[];
  related_searches: SerpRelatedSearch[];
  serpapi_pagination: {
    current: number;
    next: string;
  };
};

type SerpSuggestedSearch = {
  name: string;
  link: string;
  uds: string;
  q: string;
  serpapi_link: string;
  thumbnail: string;
};

type SerpImageResult = {
  position: number;
  thumbnail: string;
  related_content_id: string;
  serpapi_related_content_link: string;
  source: string;
  source_logo: string;
  title: string;
  link: string;
  original: string;
  original_width: number;
  original_height: number;
  is_product: boolean;
};

type SerpRelatedSearch = {
  link: string;
  serpapi_link: string;
  query: string;
  highlighted_words: string[];
  thumbnail: string;
};

export async function fetchImagesForQuery(queryText: string): Promise<SerpSearchResponse> {
  try {
    const res = await axios.get<SerpSearchResponse>('/api/serp/search', {
      params: { queryText },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch image results');
  }
}
