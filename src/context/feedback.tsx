'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { SerpImageResult } from '@/services/serp';

const STORAGE_KEY = 'feedback';
const FEEDBACK_LOCAL_STORAGE_VERSION = 1;

export type FeedbackItem = {
  feedback: 'positive' | 'negative';
  imageResult: SerpImageResult;
};

export type FeedbackLocalStorage = {
  version: number;
  feedbackItems: FeedbackItem[];
};

const DEFAULT_FEEDBACK_STORAGE = { version: FEEDBACK_LOCAL_STORAGE_VERSION, feedbackItems: [] };

const getFeedbackStorage = (): FeedbackLocalStorage => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? (JSON.parse(storedData) as FeedbackLocalStorage) : DEFAULT_FEEDBACK_STORAGE;
};

const saveFeedbackStorage = (data: FeedbackLocalStorage): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

type FeedbackContextType = {
  feedbackItems: FeedbackItem[];
  addFeedbackItem: (feedbackItem: FeedbackItem) => void;
  removeFeedbackItem: (index: number) => void;
  removeAllFeedbackItems: () => void;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    setFeedbackItems(getFeedbackStorage().feedbackItems);
  }, []);

  useEffect(() => {
    if (feedbackItems.length > 0) {
      saveFeedbackStorage({ version: FEEDBACK_LOCAL_STORAGE_VERSION, feedbackItems });
    }
  }, [feedbackItems]);

  const addFeedbackItem = (feedbackItem: FeedbackItem) => {
    setFeedbackItems((prevItems) => [...prevItems, feedbackItem]);
  };

  const removeFeedbackItem = (index: number) => {
    setFeedbackItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const removeAllFeedbackItems = () => {
    saveFeedbackStorage(DEFAULT_FEEDBACK_STORAGE);
    setFeedbackItems([]);
  };

  return (
    <FeedbackContext.Provider
      value={{ feedbackItems, addFeedbackItem, removeFeedbackItem, removeAllFeedbackItems }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
