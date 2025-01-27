import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import cheerio from 'cheerio';
import { load } from 'cheerio';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import './App.css';

const SPREADSHEET_ID = 'your_spreadsheet_id';
const SHEET_ID = 'your_sheet_id';
const CLIENT_EMAIL = 'your_service_account_email';
const PRIVATE_KEY = 'your_private_key';

const App = () => {
  const [hotels, setHotels] = useState([
    {
      name: 'Red Roof Inn Albuquerque - Midtown',
      city: 'Albuquerque',
      state: 'New Mexico',
    },
    {
      name: 'Hilton Garden Inn Albuquerque Downtown',
      city: 'Albuquerque',
      state: 'New Mexico',
    },
    {
      name: 'Days Inn by Wyndham East Albuquerque',
      city: 'Albuquerque',
      state: 'New Mexico',
    },
  ]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  //     await doc.useServiceAccountAuth({
  //       client_email: CLIENT_EMAIL,
  //       private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
  //     });
  //     await doc.loadInfo();
  //     const sheet = doc.sheetsById[SHEET_ID];
  //     const rows = await sheet.getRows();
  //     const keywordSheet = doc.sheetsByTitle['Spooky Keywords'];
  //     const keywordRows = await keywordSheet.getRows();

  //     setHotels(rows.map(row => ({
  //       name: row['Hotel Name'],
  //       city: row['City'],
  //       state: row['State'],
  //     })));

  //     setKeywords(keywordRows.map(row => row['Keyword']));
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  const analyzeReviews = async (hotel) => {
    const url = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(hotel.name + ' ' + hotel.city + ' ' + hotel.state)}`;
    const response = await axios.get(url);
    const $ = load(response.data);
    const reviews = [];
    console.log(response)
    $('.review-container').each((i, elem) => {
      reviews.push($(elem).text());
    });

    const keywordCounts = keywords.reduce((acc, keyword) => {
      acc[keyword] = reviews.reduce((count, review) => count + (review.includes(keyword) ? 1 : 0), 0);
      return acc;
    }, {});

    return keywordCounts;
  };

  const updateSheet = async (hotel, keywordCounts) => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID];
    const rows = await sheet.getRows();
    const row = rows.find(r => r['Hotel Name'] === hotel.name && r['City'] === hotel.city && r['State'] === hotel.state);

    if (row) {
      Object.keys(keywordCounts).forEach(keyword => {
        row[keyword] = keywordCounts[keyword];
      });
      await row.save();
    }
  };

  const handleAnalyze = async () => {
    for (const hotel of hotels) {
      const keywordCounts = await analyzeReviews(hotel);
      await updateSheet(hotel, keywordCounts);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Hotel Review Analyzer</h1>
      <button onClick={handleAnalyze}>Analyze Reviews</button>
    </div>
  );
};

export default App;
