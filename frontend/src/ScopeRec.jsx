import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TextField, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import SSideBar from './SSideBar';

const genAI = new GoogleGenerativeAI("AIzaSyANwaMYJWvS90eqqBb_yJ3Hij4DLYvol4Q");

async function generateContent(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
}

function ScopeReco() {
  const [subject, setSubject] = useState('');
  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    async function fetchData() {
      const generatedContent = await generateContent(`If I want to become ${subject}, how many hours of work should i put in everyday and which subjects and extra curriculars should I focus on. Give the output in a paragraph. Don't make any of the text bold.`);
      setRecommendations(generatedContent);
    }
    if (subject) {
      fetchData();
    }
  }, [subject]);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  return (
    <div style={{ overflowY: 'auto' }}>
      <CardContent style={{padding:'0px'}}>
        <Grid container>
          <Card style={{width:'20%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor: '#1e1e1e'}}>
            <Grid item>
              <SSideBar />
            </Grid>
          </Card>
         
            <Grid item style={{width:'80%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#F5F6FA'}}>
              <Typography style={{fontSize:'210%',fontWeight:700,marginTop:'20px',textAlign:'left',marginLeft:'30px', marginBottom:'30px'}}>Scope Recommendations</Typography>
              <Grid container>
                <Grid item xs={8}>
                  <TextField
                    label="Who do you Aspire to be?"
                    variant="outlined"
                    value={subject} 
                    onChange={handleSubjectChange}
                    style={{ marginBottom: '20px', marginLeft:'50%',width:'30%' }}
                  />
                  <br></br>
                  <Button variant="contained" onClick={() => setSubject(subject)} style={{marginLeft:'50%',backgroundColor:'#ffc700',color:'#000'}}>
                    Get Recommendations
                  </Button>
                  {recommendations && (
                    <div style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px', textAlign: 'left', width: 'calc(90vw - 40px)' }}>
                      <h2>Generated Content:</h2>
                      {recommendations.split('.').map((sentence, index) => {
                        // Split the sentence by words
                        const words = sentence.split(' ');
                        return (
                          <p key={index}>
                            {words.map((word, wordIndex) => {
                              // Check if the word has asterisks (*) on both sides
                              const isBold = word.startsWith('*') && word.endsWith('*');
                              // Remove asterisks and render the word inside <strong> tag if it's bold
                              const cleanedWord = word.replace(/\*/g, '');
                              return (
                                <React.Fragment key={wordIndex}>
                                  {isBold ? <strong>{cleanedWord}</strong> : cleanedWord}&nbsp;
                                </React.Fragment>
                              );
                            })}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
     
        </Grid>
      </CardContent>
    </div>
  );
}

export default ScopeReco;
