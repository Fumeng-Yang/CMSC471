import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Container } from 'react-bootstrap';

export default function CardsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  function shuffleArray(array) {
  // Fisher–Yates Shuffle
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

  useEffect(() => {
    fetch('/CMSC471-Spring25/CMSC471_Spring25_FPs.csv')
      .then((res) => res.text())
      .then((text) => {
        // console.log(text)
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            // Clean up any unexpected fields
            // console.log(results)
            const cleaned = results.data.map((row) => ({
              ID: row.ID?.trim(),
              title: row.TITLE?.trim(),
              team: row.NAME?.trim(),
              link: row.LINK?.trim(),
              tags: row.TAG?.trim().split(',')
            }));
// 
            setData(shuffleArray(cleaned));
          },
          error: (err) => {
            console.error('Parsing error:', err);
            setError('Failed to parse CSV.');
          },
        });
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load CSV.');
      });
  }, []);

  if (error) return <div>Error: {error}</div>;

  const colormaps = {
    'map': "#0398fc",
    'cool map': "#0398fc",
    'animation': "#ffc642",
    'cool stuff': "#6aba6b", 
    'interactivity': "#c77aeb", 
    'storytelling': "#e077aa",
    'insight': '#2ac7c2'
  }
  return (
    <div style={{ width: '80%', maxWidth: '1250px', margin: '1rem auto' }}>
      <p style={{ fontSize: '38px', fontWeight: "500"}}>Final Project Gallery</p>
      <p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
  This gallery showcases the final projects from <a href="https://fumeng-yang.github.io/CMSC471-Spring25/" target="_blank">CMSC471: Introduction to Information Visualization</a> at the University of Maryland, College Park, taught in <strong>Spring 2025</strong> by <a href="https://www.fmyang.com/">Fumeng Yang</a> with teaching assistants <a href="https://tracyyxchen.github.io/">Yuexi (Tracy) Chen</a> and <a href="https://www.linkedin.com/in/kzintas/">Kazi Tasnim Zinat</a>. 
  <br /><br />
  We invite you to browse these <strong>26</strong> projects that reflect each team's interests, data choices, and design decisions.   Click on any card to see the live project!
</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
        {data.map((row, idx) => (
          <div
            key={idx}
            style={{
              width: '25rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px 16px 40px 16px',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '6px 6px 10px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.1)';
            }}
            onClick={() => {
              if (row.link) window.open(row.link, '_blank', 'noopener, noreferrer');
            }}
          >
            <img
              src={`/CMSC471-Spring25/FP/${row.ID}.png`}
              alt={row.Title}
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <p style={{ fontSize: '18px', marginTop: '1rem', fontWeight: "500"}}>{row.title}</p>
            <p style={{ color: '#666' , marginTop: '-.5rem'}}>{row.team}</p>
            {row.title.includes("Fourth and Forecast") &&   <p style={{ color: '#f57842' , fontSize: '12px', marginTop: '-.5rem'}}> (takes a few minutes to warm up)</p>}
            <span style={{  position: 'absolute', bottom: '1rem'}}>{row.tags.map((tag, o)=>{
            return(<span className='tag' style={{'color': colormaps[tag.trim()], backgroundColor: colormaps[tag.trim()] + '15' }}>#{tag}</span>)
            })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
