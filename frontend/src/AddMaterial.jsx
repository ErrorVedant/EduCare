import React from "react";
import { useState } from "react";
import { Button, Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TSideBar from "./TSideBar";
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";

function AddMaterial() {

    const[uploadedFiles, setUploadedFiles] = useState([]);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const currentDate = new Date();

            const newFile = {
                name: file.name,
                date: currentDate.toLocaleDateString(),
                time: currentDate.toLocaleTimeString()
            };
          
            setUploadedFiles([...uploadedFiles, newFile]);

            Swal.fire({
                text: "File Uploaded",
                icon: "success"
            });
        }
      };
    
    return(

        <div style={{ minHeight:'600px',overflowY: 'auto',height:'auto' }}>
            <CardContent style={{padding:'0px'}}>
            <Grid container>
                <Card style={{width:'20%',minHeight:'800px',overflowY: 'auto',height:'auto',backgroundColor:'#1e1e1e'}}>
                <Grid item >
                    <TSideBar />
                </Grid>
                </Card>
               
                <Grid item style={{width:'80%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#F5F6FA'}}>
                {/* <Nav /> */}
                <Typography style={{fontSize:'210%',fontWeight:700,marginTop:'20px',textAlign:'left',marginLeft:'30px', marginBottom:'30px'}}>Add Material</Typography>

                {/* <Button style={{backgroundColor:'#ffc700',textDecoration:'none', color:'#000',display:'flex',justifyContent:'flex-start',marginLeft:'40px', marginBottom:'30px',padding:'8px'}}><Typography style={{fontWeight:600, marginRight:'10px',fontSize:'105%'}}>Add Material</Typography><AddIcon />
                <input type="file" onChange={handleUpload} inputProps={{ accept:"application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"}} style={{ display: "none" }} />
                </Button> */}
                
                <Button  name="banner" component="label"  className="buttonText1" style={{backgroundColor:'#ffc700',textDecoration:'none', color:'#000',display:'flex',justifyContent:'flex-start',marginLeft:'40px', marginBottom:'30px',padding:'8px',width:'170px'}}><Typography style={{fontWeight:600, marginRight:'10px',fontSize:'105%'}}>Add Material</Typography><AddIcon />
                  <input id="banner-upload" type="file" onChange={handleUpload} inputProps={{ accept:"application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"}}  style={{ display: 'none' }}/>
                </Button>
                  

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Material added</Typography>
                <Card style={{marginBottom:'30px', padding:'20px',paddingTop:'0px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px'}}>
                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>File Name</TableCell>
                                                <TableCell>Date Added</TableCell>
                                                <TableCell>Time Added</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {uploadedFiles.map((file, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{file.name}</TableCell>
                                                    <TableCell>{file.date}</TableCell>
                                                    <TableCell>{file.time}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                </Card>

                </Grid>
             
            </Grid>
            </CardContent>
        </div>
    );

};

export default AddMaterial;