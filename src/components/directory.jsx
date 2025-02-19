import React, { useState, useEffect } from 'react';
import { TextField, Typography, List, ListItem, Modal, Box, Button, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import activeData from '../data/actives.json'; // Adjust the path as necessary
import alumniData from '../data/alumni.json'; // Adjust the path as necessary
import useMediaQuery from '@mui/material/useMediaQuery';

const Directory = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [membersList, setMembersList] = useState(''); // 'active' or 'alumni'
  const [members, setMembers] = useState([]);
  const [searchMode, setSearchMode] = useState('name'); // 'name', 'major', or 'graduationYear'
  const [anchorEl, setAnchorEl] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    name: '',
    phone: '',
    email: '',
    major: '',
    graduationYear: ''
  });

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (membersList === 'active') {
      setMembers(activeData);
    } else if (membersList === 'alumni') {
      setMembers(alumniData);
    }
    setSearchMode('name'); // Reset search mode to 'name' when switching sections
    setSearch(''); // Clear the search field when switching sections
    setResults([]); // Clear the results when switching sections
    resetUpdateForm(); // Reset the update form when switching sections
    setShowUpdateForm(false); // Ensure the update form is closed when switching sections
  }, [membersList]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query === '') {
      setResults([]);
    } else {
      const filteredResults = members.filter((member) => {
        if (searchMode === 'name') {
          return member.name.toLowerCase().includes(query.toLowerCase());
        } else if (searchMode === 'major') {
          return member.major.toLowerCase().includes(query.toLowerCase());
        } else if (searchMode === 'graduationYear') {
          const year = member.graduation_year.toString().match(/\d{4}/);
          return year && year[0].includes(query);
        } else {
          return member.pledge_class.toLowerCase().includes(query.toLowerCase());
        }
      });
      setResults(filteredResults);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMember(null);
  };

  const handleBackClick = () => {
    setShowSearch(false);
    setSearch('');
    setResults([]);
    setMembersList(''); // Reset membersList to hide the update button
    resetUpdateForm(); // Reset the update form when going back
    setShowUpdateForm(false); // Ensure the update form is closed when going back
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (mode) => {
    setSearchMode(mode);
    setAnchorEl(null);
    setSearch('');
    setResults([]);
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(!showUpdateForm);
    if (showUpdateForm) {
      resetUpdateForm(); // Reset the update form when closing the dropdown
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async () => {
    if (updateInfo.name) {
      try {
        const endpoint = membersList === 'active' ? 'update-info' : 'update-alumni';
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateInfo),
        });
  
        if (response.ok) {
          console.log('Update Info:', updateInfo);
          resetUpdateForm(); // Reset the form fields after sending
          setShowUpdateForm(false);
        } else {
          alert('Failed to update information.');
        }
      } catch (error) {
        console.error('Error updating information:', error);
        alert('An error occurred while updating information.');
      }
    } else {
      alert('Name is required to update information.');
    }
  };

  const resetUpdateForm = () => {
    setUpdateInfo({
      name: '',
      phone: '',
      email: '',
      major: '',
      graduationYear: ''
    });
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5">Delt Directory</Typography>
      <div style={{ marginTop: '-22px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img 
          src={`${process.env.PUBLIC_URL}/delt.png`}
          alt="Delt Background" 
          style={{ maxWidth: '50%', height: 'auto', objectFit: 'contain' }} 
        />
      </div>

      {membersList && (
        isMobile ? (
          <IconButton 
            onClick={handleUpdateClick} 
            style={{ position: 'absolute', top: '10px', right: '10px', color: '#3f51b5', transform: 'scale(1.3)', marginRight: '7px', marginTop: '7px' }}
          >
            <EditIcon />
          </IconButton>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleUpdateClick} 
            style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#3f51b5', color: '#fff' }}
          >
            Update Information
          </Button>
        )
      )}

      {showUpdateForm && (
        <Paper style={{ position: 'absolute', top: isMobile ? '70px' : '52px', right: '10px', padding: '10px', zIndex: 10, width: '250px' }}>
          <Typography variant="h6">Update Information</Typography>
          <TextField
            label="Full Name"
            name="name"
            value={updateInfo.name}
            onChange={handleUpdateChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={updateInfo.phone}
            onChange={handleUpdateChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={updateInfo.email}
            onChange={handleUpdateChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          {membersList === 'active' && (
            <>
              <TextField
                label="Major"
                name="major"
                value={updateInfo.major}
                onChange={handleUpdateChange}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Graduation Year"
                name="graduationYear"
                value={updateInfo.graduationYear}
                onChange={handleUpdateChange}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </>
          )}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleUpdateSubmit} 
            style={{ marginTop: '10px', backgroundColor: '#3f51b5', color: '#fff' }}
          >
            Send
          </Button>
        </Paper>
      )}

      {showSearch && (
        <IconButton onClick={handleBackClick} style={{ position: 'absolute', top: '10px', left: '10px', color: 'black' }}>
          <ArrowBackIcon />
        </IconButton>
      )}

      {!showSearch && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '-10px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => { setShowSearch(true); setMembersList('active'); }}
            style={{ backgroundColor: '#3f51b5', color: '#fff' }}
          >
            Active Members
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => { setShowSearch(true); setMembersList('alumni'); }}
            style={{ backgroundColor: '#3f51b5', color: '#fff' }}
          >
            Alumni
          </Button>
        </div>
      )}

      {showSearch && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '-22px' }}>
          <TextField
            label={`Search by ${searchMode === 'name' ? 'name' : searchMode === 'major' ? 'major' : searchMode === 'graduationYear' ? 'graduation year' : 'pledge class'}`}
            value={search}
            onChange={handleSearch}
            variant="outlined"
            margin="normal"
            style={{ width: '300px' }}
          />
          <div>
            <IconButton onClick={handleMenuClick} style={{ color: 'black', transform: 'scale(1.5)' }}>
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {membersList === 'active' && (
                <>
                  <MenuItem onClick={() => handleMenuClose('name')}>Search by Name</MenuItem>
                  <MenuItem onClick={() => handleMenuClose('major')}>Search by Major</MenuItem>
                  <MenuItem onClick={() => handleMenuClose('graduationYear')}>Search by Graduation Year</MenuItem>
                </>
              )}
              {membersList === 'alumni' && (
                <>
                  <MenuItem onClick={() => handleMenuClose('name')}>Search by Name</MenuItem>
                  <MenuItem onClick={() => handleMenuClose('pledgeClass')}>Search by Pledge Class</MenuItem>
                </>
              )}
            </Menu>
          </div>
        </div>
      )}

      <List>
        {results.length > 0 ? (
          results.map((member, index) => (
            <ListItem
              key={index}
              style={{ cursor: 'pointer', transition: 'color 0.2s', color: 'black', marginBottom: '20px' }}
              onClick={() => handleMemberClick(member)}
              onMouseEnter={(e) => (e.target.style.color = '#4682B4')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              {member.name}
            </ListItem>
          ))
        ) : (
          search && <Typography>No results found</Typography>
        )}
      </List>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxWidth: '330px',
            width: '100%',
          }}
        >
          {selectedMember && (
            <div>
              <Typography variant="h6">{selectedMember.name}</Typography>
              {membersList === 'active' ? (
                <>
                  <Typography>Graduation Year: {selectedMember.graduation_year}</Typography>
                  <Typography>Major: {selectedMember.major}</Typography>
                  <Typography>Phone: {selectedMember.phone}</Typography>
                  <Typography>Email: {selectedMember.email}</Typography>
                </>
              ) : (
                <>
                  <Typography>Pledge Class: {selectedMember.pledge_class}</Typography>
                  <Typography>Phone: {selectedMember.phone}</Typography>
                  <Typography>Email: {selectedMember.email}</Typography>

                  {/* Check if the person is deceased and display the status */}
                  {selectedMember.status === 'Deceased' && (
                  <Typography>Status: Deceased</Typography>
                )}

                </>
              )}
            </div>
          )}
        </Box>
      </Modal>
     
      <div style={{ marginBottom: '75px' }}></div>

    </div>
  );
};

export default Directory;