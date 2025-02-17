import React, { useState, useEffect } from 'react';
import { TextField, Typography, List, ListItem, Modal, Box, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import activeData from '../data/actives.json'; // Adjust the path as necessary
import alumniData from '../data/alumni.json'; // Adjust the path as necessary

const Directory = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [membersList, setMembersList] = useState(''); // 'active' or 'alumni'
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (membersList === 'active') {
      setMembers(activeData);
    } else if (membersList === 'alumni') {
      setMembers(alumniData);
    }
  }, [membersList]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query === '') {
      setResults([]);
    } else {
      const filteredResults = members.filter((member) =>
        member.name.toLowerCase().includes(query.toLowerCase())
      );
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
        <TextField
          label="Search by name"
          value={search}
          onChange={handleSearch}
          variant="outlined"
          margin="normal"
          style={{ width: '300px', marginTop: '-22px' }}
        />
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