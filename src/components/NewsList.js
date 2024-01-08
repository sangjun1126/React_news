import styled from 'styled-components';
import { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `category=${category}&`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&${query}apiKey=97c31ab417574bd0b0e7cedb56e0db21`,
    );
  }, [category]);

  // 대기 중일 경우
  if (loading) {
    return <NewsListBlock>대기 중입니다. 잠시 기다려주세요...</NewsListBlock>;
  }

  // 에러가 발생한 경우
  if (error) {
    return (
      <NewsListBlock>에러가 발생했습니다. 다시 시도해주세요.</NewsListBlock>
    );
  }

  // response 값이 유효하지 않은 경우
  if (!response || !response.data || !response.data.articles) {
    return null;
  }

  // articles 값이 유효할 경우
  const { articles } = response.data;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
