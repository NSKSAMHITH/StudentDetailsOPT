import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { purple } from '@mui/material/colors';

export default function Student() {

    const paperStyle = {padding: '50px 20px', width: 750, margin: "20px auto"}

    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [visaStatus, setVisaStatus] = React.useState('');


    const [students, setStudents] = React.useState(['']);

    const handleClick = (e) => {
        e.preventDefault()
        const student = {name, address, visaStatus}

        JSON.stringify(student);

        //fetch to capture
        fetch("http://localhost:8080/student/add", 
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(student)
            }
        ).then(()=> {
            console.log("new student has been added")
        })
    }

    React.useEffect(()=> {
        fetch("http://localhost:8080/student/getAll")
        .then(response => response.json())
        .then(data => setStudents(data));
        }
    , []);



  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:purple, textAlign: 'center'}}>Enter resource details</h1>
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            >
                <TextField id="outlined-basic" label="Enter Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <TextField id="outlined-basic" label="Enter Address" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)}/>
                <TextField id="outlined-basic" label="Enter Visa Status" variant="outlined" fullWidth value={visaStatus} onChange={(e) => setVisaStatus(e.target.value)} />
                <Button variant="contained" style={{alignItems: 'center', borderRadius: '10px'}} onClick={handleClick}>Submit</Button>
            </Box>

            
        </Paper>

        <Paper>
            <h1 style={{color:purple, textAlign: 'center'}}>Student List</h1>
            {students.map(student => (
                <Paper elevation={10} style={{margin: "10px", padding:"15px", textAlign: "left", borderRadius: '10px' }} key={student.id} >
                    Id: {student.id}<br/>
                    Name: {student.name}<br />
                    Address: {student.address}< br/>
                    Visa Status: {student.visaStatus}<br/>
                </Paper>
            ) 
            )}
        </Paper>
    </Container>
    
  );
}
