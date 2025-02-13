import React, { useState } from 'react';
import { TextField, Typography, List, ListItem, Modal, Box } from '@mui/material';

const Directory = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // List of fraternity members by year
  const members = [
    
    // Freshmen
    { name: 'Casen Lentz', major: 'Political Science', email: 'casendrake@icloud.com', phone: '602-739-9726', graduation_year: 'May 2028' },
    { name: 'Dom Warrino', major: 'Biology, pre-dental', email: 'dwarrino@gmail.com', phone: '913-293-8106', graduation_year: 'May 2028' },
    { name: 'Emmit Peters', major: 'Business Marketing', email: 'epchiefs@gmail.com', phone: '913-280-0764', graduation_year: 'May 2028' },
    { name: 'Jackson Collins', major: 'Finance', email: 'jacksoncollins1234@gmail.com', phone: '913-579-4327', graduation_year: 'May 2028' },
    { name: 'Luke Lewis', major: 'Nursing', email: 'lukelewis2024@outlook.com', phone: '785-424-5536', graduation_year: 'May 2028' },
    { name: 'Mark Schultheiss', major: 'Mechanical Engineering', email: 'markschultheiss352@gmail.com', phone: '636-346-7164', graduation_year: 'May 2028' },
    { name: 'Patrick Lester', major: 'Cybersecurity Engineering', email: 'pmlester3@icloud.com', phone: '913-530-6723', graduation_year: 'May 2028' },
    { name: 'Dylan Talcott', major: 'Finance and Accounting', email: 'talcottdylan68@gmail.com', phone: '913-484-4215', graduation_year: 'May 2028' },
    { name: 'Noah Zook', major: 'Economics', email: 'noahwzook@gmail.com', phone: '602-781-3146', graduation_year: 'May 2028' },
    { name: 'Luke Elley', major: 'Finance', email: 'Lukeryane@icloud.com', phone: '913-575-4825', graduation_year: 'May 2028' },
    { name: 'Chas Colbert', major: 'Finance with a minor in professional selling', email: 'CRColbert2006@gmail.com', phone: '573-476-3466', graduation_year: 'May 2028' },
    { name: 'Justin De La Rosa', major: 'Finance', email: 'delarosajm18@gmail.com', phone: '913-275-0118', graduation_year: 'May 2028' },
    { name: 'Jackson Ready', major: 'Finance', email: 'jacksonrready@gmail.com', phone: '317-995-9320', graduation_year: 'May 2028' },
    { name: 'Noah Adcock', major: 'Finance', email: 'noahwilliam2006@icloud.com', phone: '913-230-0425', graduation_year: 'May 2028' },
    { name: 'Jason Cooper', major: 'Business Management', email: 'jjcooper500@gmail.com', phone: '913-967-9710', graduation_year: 'May 2028' },
    { name: 'John Van Gelder', major: 'Marketing', email: 'johnvangelder424@gmail.com', phone: '402-415-3099', graduation_year: 'May 2028' },
    { name: 'Sutton Pierce', major: 'Finance', email: 'Suttondpierce@gmail.com', phone: '405-888-1465', graduation_year: 'May 2028' },
    { name: 'Cale Paden', major: 'Finance', email: 'Calepaden@gmail.com', phone: '785-550-9200', graduation_year: 'May 2028' },
    { name: 'Henry Rathsburg', major: 'Finance', email: 'hrathsburg05@gmail.com', phone: '602-622-0026', graduation_year: 'May 2028' },
    { name: 'Gabe Liston', major: 'Computer Science', email: 'gliston0@icloud.com', phone: '913-226-9294', graduation_year: 'May 2028' },
    { name: 'Colin Bangs', major: 'Finance', email: 'cnbangs@icloud.com', phone: '913-901-7922', graduation_year: 'May 2028' },
    { name: 'Jack Gaines', major: 'Finance', email: '1jackgaines1@gmail.com', phone: '913-701-4850', graduation_year: 'May 2027' },
    { name: 'Will Merz', major: 'Biology', email: 'williammerz@comcast.net', phone: '630-209-3595', graduation_year: 'May 2028' },

    // Sophomores
    { name: 'Aidan Sanders', major: 'Accounting and Finance', email: 'apsanders15@gmail.com', phone: '913-701-8439', graduation_year: 'May 2027' },
    { name: 'Andy Harling', major: 'Accounting', email: 'alharling@gmail.com', phone: '913-387-9185', graduation_year: 'May 2027' },
    { name: 'Canon Edwards', major: 'Finance', email: 'Ccedwards04@ku.edu', phone: '913-296-3460', graduation_year: 'May 2027' },
    { name: 'Carter Cate', major: 'Accounting and Finance', email: 'cartercate1@yahoo.com', phone: '913-242-4792', graduation_year: 'May 2027' },
    { name: 'Gage Comfort', major: 'Accounting', email: 'comfort_gage@hotmail.com', phone: '913-952-3274', graduation_year: 'May 2027' },
    { name: 'Max Krebsbach', major: 'Finance', email: 'maxwellkrebsbach@gmail.com', phone: '612-965-6622', graduation_year: 'May 2027' },
    { name: 'Minh Nguyen', major: 'Biology', email: 'minhnguyenn280@gmail.com', phone: '913-325-5194', graduation_year: 'May 2027' },
    { name: 'Sebastian Meriano', major: 'Biochemistry (Pre-Med)', email: 'sebastian.a.meriano@gmail.com', phone: '913-401-9918', graduation_year: 'May 2026' },
    { name: 'Walter Waxman', major: 'Biology', email: 'Wcwax01@gmail.com', phone: '913-689-8076', graduation_year: 'May 2027' },
    { name: 'Will Hadley', major: 'Finance', email: 'will.hadley4025@gmail.com', phone: '913-645-4810', graduation_year: 'May 2027' },
    { name: 'Brady Lambert', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Cole Henderson', major: 'Marketing', email: 'colehen14@gmail.com', phone: '630-605-3746', graduation_year: 'May 2026' },
    { name: 'Davis Nielson', major: 'Exercise Science, Pre-dental track', email: 'Davisnielson0@gmail.com', phone: '913-952-8424', graduation_year: 'May 2027' },
    { name: 'Jack Riker', major: 'Supply Chain Management', email: 'Jackriker05@gmail.com', phone: '630-857-6048', graduation_year: 'May 2027' },
    { name: 'Nate Wyllie', major: 'Finance', email: 'nwyllie11@gmail.com', phone: '773-782-0495', graduation_year: 'May 2027' },
    { name: 'Aidan Sullivan', major: 'Information Systems', email: 'aidansullivan08@gmail.com', phone: '913-481-2742', graduation_year: 'May 2027' },
    { name: 'Ryan Robinson', major: 'Accounting', email: 'rrobjhawk@gmail.com', phone: '913-702-6807', graduation_year: 'May 2027' },
    { name: 'Colby Keisling', major: 'Marketing', email: 'colbykiesling@gmail.com', phone: '760-707-3142', graduation_year: 'May 2027' },
    { name: 'Simon Woodbury', major: 'Information Systems', email: 'Simonw35@icloud.com', phone: '913-282-7287', graduation_year: 'May 2027' },
    { name: 'Christian Brummett', major: 'Finance', email: 'Christianbru2004@gmail.com', phone: '573-489-9843', graduation_year: 'May 2027' },
    { name: 'Jack Sykes', major: 'Sports Management', email: 'jsykes2023@gmail.com', phone: '913-274-8407', graduation_year: 'May 2027' },
    { name: 'Wes Milliken', major: 'Information Systems', email: 'Wesley@millikens.com', phone: '913-954-2724', graduation_year: 'May 2026' },
    { name: 'Macade Lewis', major: 'Civil Engineering', email: 'Maclew14@hotmail.com', phone: '785-393-5311', graduation_year: 'May 2027' },
    { name: 'Hayden Johnson', major: 'Business Administration', email: 'haydenjhawk@gmail.com', phone: '913-305-2943', graduation_year: 'May 2027' },
    { name: 'Will Leuschen', major: 'Mechanical Engineering', email: 'leuschenwill@ku.edu', phone: '785-760-2135', graduation_year: 'May 2027' },
    { name: 'Quinn Westrope', major: 'Computer Science', email: 'quinnwestrope@ku.edu', phone: '913-260-1614', graduation_year: 'May 2027' },
    { name: 'Hayden Kolb', major: 'Sports Management', email: 'haydenkolb04@gmail.com', phone: '913-229-1715', graduation_year: 'May 2027' },
    { name: 'Ben Heiman', major: 'Microbiology', email: 'bkh07@icloud.com', phone: '913-228-8140', graduation_year: 'May 2027' },
    { name: 'Matthew Angers', major: '', email: '', phone: '', graduation_year: '' },

    // Juniors
    { name: 'Andrew Pronske', major: 'Accounting, Business Analytics', email: 'andrewrpronske@gmail.com', phone: '913-957-9638', graduation_year: 'May 2026' },
    { name: 'Ben Hansen', major: 'Human Biology (Pre-Dental)', email: 'benjaminleonhansen@gmail.com', phone: '785-203-0332', graduation_year: 'May 2026' },
    { name: 'Connor Shepard', major: 'Accounting and Business Analytics', email: 'cbshepard04@gmail.com', phone: '913-333-8700', graduation_year: 'May 2026' },
    { name: 'Ethan Ching', major: 'Information Systems and Technology', email: 'ethanc2349@gmail.com', phone: '913-296-4428', graduation_year: 'May 2026' },
    { name: 'Ryan Davis', major: 'Human Biology', email: 'ryan.anthony.davis@icloud.com', phone: '913-208-6419', graduation_year: 'May 2026' },
    { name: 'Quinn Heather', major: 'Mechanical Engineering', email: 'quinnheather01@icloud.com', phone: '913-223-6622', graduation_year: 'May 2026' },
    { name: 'Bob Oppenheim', major: 'Finance', email: 'bobbyoppenheim1@gmail.com', phone: '913-961-8846', graduation_year: 'May 2026' },
    { name: 'Jeret Handley', major: 'Finance', email: 'Jerethandley@icloud.com', phone: '913-232-0838', graduation_year: 'May 2026' },
    { name: 'Andrew Cox', major: 'Accounting', email: 'andrewcox8812@gmail.com', phone: '913-223-4703', graduation_year: 'May 2026' },
    { name: 'Dane Hutchins', major: 'Finance, Pre-Law', email: 'dane.hutchins53@gmail.com', phone: '913-742-1645', graduation_year: 'May 2026' },
    { name: 'Carson Gardner', major: 'Finance', email: 'Carson.Gardner1@gmail.com', phone: '913-961-6054', graduation_year: 'May 2026' },
    { name: 'Luke Happer', major: 'Sport Management', email: 'lukehapper@gmail.com', phone: '913-626-1526', graduation_year: 'December 2025' },
    { name: 'Liam Risley', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Joe Slechta', major: 'Pharmacy', email: 'joeslechta2@gmail.com', phone: '316-833-4943', graduation_year: 'May 2026' },
    { name: 'Nick Geis', major: 'Business Administration', email: 'nickgeis@hotmail.com', phone: '913-634-6030', graduation_year: 'May 2026' },
    { name: 'Chris Scheibel', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Daxen Steinbacher', major: 'Finance', email: 'daxens24@gmail.com', phone: '913-747-5404', graduation_year: 'May 2026' },
    { name: 'Luke Namee', major: 'Finance', email: 'lukenamee1213@gmail.com', phone: '512-634-6724', graduation_year: 'May 2026' },
    { name: 'Jason Tucci', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Ethan Hoisington', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Xander Templeton', major: 'Civil Engineering', email: 'x.templeton28@gmail.com', phone: '913-333-8194', graduation_year: 'Spring 2026' },
    { name: 'Nathan Wirth', major: 'Finance', email: 'nwirth409@gmail.com', phone: '314-471-6670', graduation_year: 'May 2026' },
    { name: 'AJ Maschler', major: '', email: '', phone: '', graduation_year: '' },

    // Seniors
    { name: 'Grant Strong', major: 'Mechanical Engineering', email: 'grantstrong17@gmail.com', phone: '913-634-0650', graduation_year: 'May 2025' },
    { name: 'Josh Frerker', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Justin Hicks', major: 'Finance', email: 'justinhicks15@icloud.com', phone: '785-331-5872', graduation_year: 'May 2025' },
    { name: 'Brady Robinson', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Brock Kenagy', major: 'Business Administration', email: 'Bkenagy24@yahoo.com', phone: '913-991-3388', graduation_year: 'May 2025' },
    { name: 'Keaton Stramberg', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Brandon Luce', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Jake Roszak', major: 'Supply Chain Management', email: 'jakeroszak23@gmail.com', phone: '785-813-3895', graduation_year: 'May 2025' },
    { name: 'David Waxman', major: 'Biology', email: 'drman0521@gmail.com', phone: '913-313-8111', graduation_year: 'May 2025' },
    { name: 'Will Payne', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Grant Micaletti', major: 'Exercise Science', email: 'Grantmicaletti@gmail.com', phone: '630-277-7934', graduation_year: 'December 2025' },
    { name: 'Quintin Mason', major: 'Finance', email: 'quinten.mason24@gmail.com', phone: '913-608-1636', graduation_year: 'May 2025' },
    { name: 'Logan Komar', major: 'History', email: 'logankomar@gmail.com', phone: '708-657-0888', graduation_year: 'May 2025' },
    { name: 'Joey Foreman', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Cade Wait', major: '', email: '', phone: '', graduation_year: '' },
    { name: 'Isaiah Walker', major: 'Accounting', email: 'isaiah022803walker@gmail.com', phone: '913-220-9907', graduation_year: 'May 2025' },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query === '') {
      setResults([]); // Clear results if search box is empty
    } else {
      // Filter the members based on the search term
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

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5">Delt Directory</Typography>

      {/* Image */}
      <div style={{ marginTop: '-22px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img 
          src={`${process.env.PUBLIC_URL}/delt.png`}
          alt="Delt Background" 
          style={{ maxWidth: '50%', height: 'auto', objectFit: 'contain' }} 
        />
      </div>

      <TextField
        label="Search by name"
        value={search}
        onChange={handleSearch}
        variant="outlined"
        margin="normal"
        style={{ width: '300px', marginTop: '-22px' }}
      />
      <List>
        {results.length > 0 ? (
          results.map((member, index) => (
            <ListItem
              key={index}
              style={{ 
                cursor: 'pointer', 
                transition: 'color 0.2s', 
                color: 'black', 
                marginBottom: '20px',
              }}
              onClick={() => handleMemberClick(member)}
              onMouseEnter={(e) => (e.target.style.color = '#4682B4')} // Light blue text on hover
              onMouseLeave={(e) => (e.target.style.color = 'black')} // Revert to black when not hovering
            >
              {member.name} {/* Display only name here */}
            </ListItem>
          ))
        ) : (
          search && <Typography>No results found</Typography> // Only show "No results" if there's text in the search
        )}
      </List>

      {/* Modal for displaying member details */}
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
            maxWidth: '300px',
            width: '100%',
          }}
        >
          {selectedMember && (
            <div>
              <Typography variant="h6">{selectedMember.name}</Typography>
              <Typography>Graduation Year: {selectedMember.graduation_year}</Typography>
              <Typography>Major: {selectedMember.major}</Typography>
              <Typography>Phone: {selectedMember.phone}</Typography>
              <Typography>Email: {selectedMember.email}</Typography>
            </div>
          )}
        </Box>
      </Modal>

      <div style={{height: '70px'}}></div>

    </div>
  );
};

export default Directory;