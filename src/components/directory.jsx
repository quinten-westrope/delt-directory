import React, { useState } from 'react';
import { TextField, Typography, List, ListItem, Modal, Box, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Directory = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [membersList, setMembersList] = useState(''); // 'active' or 'alumni'

  // List of fraternity members by year
  const activeMembers = [
    
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



  // List of fraternity alumni members (2020 - 2018 for now)
  const alumniMembers = [

    { name: "Benjamin W. White", pledge_class: "2021", phone: "(314) 917-2689", email: "Benwhite861@gmail.com" },
    { name: "Giovanni O. Zamora", pledge_class: "2021", phone: "", email: "Zamora.gio1122@gmail.com" },
    { name: "Jacob T. Angers", pledge_class: "2020", phone: "(314) 954-8334", email: "jacob.angers@gmail.com" },
    { name: "Joseph M. Connor", pledge_class: "2020", phone: "(785) 220-8498", email: "joeyconnor02@gmail.com" },
    { name: "Jackson A. Daesch", pledge_class: "2020", phone: "", email: "jacksonred55@gmail.com" },
    { name: "Daniel J. Duffy", pledge_class: "2020", phone: "", email: "duffydanny247@gmail.com" },
    { name: "John R. Emerson", pledge_class: "2020", phone: "(913) 208-5501", email: "jackemerson7524@gmail.com" },
    { name: "Ryan P. Hinrichs", pledge_class: "2020", phone: "(913) 747-5199", email: "rhinrichs01@gmail.com" },
    { name: "Sean J. Hogan", pledge_class: "2020", phone: "", email: "Hogie1234567@gmail.com" },
    { name: "Jackson A. Holton", pledge_class: "2020", phone: "(913) 210-9661", email: "blondieholton@gmail.com" },
    { name: "Andrew M. Kolpin", pledge_class: "2020", phone: "(913) 940-3964", email: "dkolpin39@gmail.com" },
    { name: "Matthew L. LaTendresse", pledge_class: "2020", phone: "", email: "matthewlatendresse0803@gmail.com" },
    { name: "John C. Lindsay", pledge_class: "2020", phone: "", email: "johnclindsay18@gmail.com" },
    { name: "Dylan J. Naylor", pledge_class: "2020", phone: "(913) 747-5920", email: "dylan.naylorr@gmail.com" },
    { name: "Alexander G. Norman", pledge_class: "2020", phone: "", email: "a708n367@ku.edu" },
    { name: "McCabe R. Quast", pledge_class: "2020", phone: "(630) 528-8541", email: "macquast@gmail.com" },
    { name: "Jackson D. Redfield", pledge_class: "2020", phone: "(913) 991-8175", email: "jacksonredfield0625@gmail.com" },
    { name: "Ethan J. Sanders", pledge_class: "2020", phone: "(913) 309-8767", email: "ej15sanders@gmail.com" },
    { name: "Samuel J. Sliefert", pledge_class: "2020", phone: "", email: "samjsliefert@gmail.com" },
    { name: "Charles J. Watson", pledge_class: "2020", phone: "", email: "watsoncj46@yahoo.com" },
    { name: "Caleb J. Wirth", pledge_class: "2020", phone: "(314) 221-9160", email: "cwirth715@gmail.com" },
    { name: "Charles E. Wolff", pledge_class: "2020", phone: "(913) 488-6719", email: "Charliewolff29@gmail.com" },
    { name: "Dylan L. Aitkens", pledge_class: "2019", phone: "", email: "dylanaitkens01@gmail.com" },
    { name: "John R. Allen", pledge_class: "2019", phone: "", email: "j772a472@ku.edu" },
    { name: "Brett E. Chapple", pledge_class: "2019", phone: "", email: "b522c980@ku.edu" },
    { name: "Mitchell D. Clark", pledge_class: "2019", phone: "", email: "mclarkicloud@icloud.com" },
    { name: "Joseph P. Creighton", pledge_class: "2019", phone: "", email: "joecr8on99@gmail.com" },
    { name: "Trevor J. Ellefson", pledge_class: "2019", phone: "", email: "tellefson@ku.edu" },
    { name: "Ryan G. Holton", pledge_class: "2019", phone: "", email: "r185h262@ku.edu" },
    { name: "Maxwell R. Hughes", pledge_class: "2019", phone: "", email: "m797h743@ku.edu" },
    { name: "Dylan W. Jamison", pledge_class: "2019", phone: "", email: "dylanjamison@ku.edu" },
    { name: "Tristan S. Kenagy", pledge_class: "2019", phone: "", email: "tkenagy7@ku.edu" },
    { name: "Joseph E. Maksoud", pledge_class: "2019", phone: "", email: "j129m352@ku.edu" },
    { name: "Nathan F. Moorse", pledge_class: "2019", phone: "", email: "namoorse@gmail.com" },
    { name: "Adam P. Morse", pledge_class: "2019", phone: "", email: "apmorse@outlook.com" },
    { name: "Evan M. Mullen", pledge_class: "2019", phone: "", email: "evanmullen@ku.edu" },
    { name: "Nathan S. Munsch", pledge_class: "2019", phone: "", email: "natemunsch03@gmail.com" },
    { name: "Wiliam K. Oppenheim", pledge_class: "2019", phone: "", email: "willoppenheim@yahoo.com" },
    { name: "Koby E. Ryckman", pledge_class: "2019", phone: "", email: "k903r285@ku.edu" },
    { name: "Bradley M. Sides", pledge_class: "2019", phone: "", email: "sidesbradley19@gmail.com" },
    { name: "Ryan E. Stacey", pledge_class: "2019", phone: "", email: "r503s596@ku.edu" },
    { name: "Gavin L. Wolfmule", pledge_class: "2019", phone: "", email: "gwolfmule@yahoo.com" },
    { name: "Jesse D. Atencio", pledge_class: "2018", phone: "", email: "jesse.atencio@gmail.com" },
    { name: "Ryan M. Beaupre", pledge_class: "2018", phone: "", email: "ryanbeaupre06@gmail.com" },
    { name: "Nicholas M. Camugnaro", pledge_class: "2018", phone: "", email: "ncamugnaro@yahoo.com" },
    { name: "Daniel R. Carlson", pledge_class: "2018", phone: "", email: "dcarlson2017@gmail.com" },
    { name: "Cooper K. Cate", pledge_class: "2018", phone: "", email: "coopercate2@gmail.com" },
    { name: "Spencer L. Daesch", pledge_class: "2018", phone: "", email: "spencerdaesch@gmail.com" },
    { name: "Bradley S. Davis", pledge_class: "2018", phone: "", email: "bdavis2456@gmail.com" },
    { name: "Gerren H. Graham", pledge_class: "2018", phone: "", email: "gerren.graham@yahoo.com" },
    { name: "Eric R. Hartman", pledge_class: "2018", phone: "", email: "ehartman@ku.edu" },
    { name: "Jared T. Hicks", pledge_class: "2018", phone: "", email: "jhicks15@icloud.com" },
    { name: "Michael B. Hixson", pledge_class: "2018", phone: "", email: "hixsonblake@yahoo.com" },
    { name: "Chase W. Hofer", pledge_class: "2018", phone: "", email: "chasehofer88@gmail.com" },
    { name: "Harrison K. Hughes", pledge_class: "2018", phone: "", email: "hkhughes17@gmail.com" },
    { name: "Harrison A. Jones", pledge_class: "2018", phone: "", email: "harrison.a.jones1@gmail.com" },
    { name: "Cameron J. Kozol", pledge_class: "2018", phone: "", email: "cameronkozol2@cox.net" },
    { name: "Zachary E. Kurland", pledge_class: "2018", phone: "", email: "zkurland00@gmail.com" },
    { name: "Joesph R. Lavin", pledge_class: "2018", phone: "", email: "josephrlavin@gmail.com" },
    { name: "Nathaniel H. Lueke", pledge_class: "2018", phone: "", email: "nhlueke@gmail.com" },
    { name: "Connor M. McCartney", pledge_class: "2018", phone: "", email: "con34mac@gmail.com" },
    { name: "Ian J. McHugh", pledge_class: "2018", phone: "", email: "ian.mchugh37@gmail.com" },
    { name: "Peter G. McMonigle", pledge_class: "2018", phone: "", email: "pmcmonigle15@gmail.com" },
    { name: "Mitchell L. Midyett", pledge_class: "2018", phone: "", email: "mitch.midyett@gmail.com" },
    { name: "James R. Morton", pledge_class: "2018", phone: "", email: "jr.morton42@gmail.com" },
    { name: "Peter N. Nickel", pledge_class: "2018", phone: "", email: "pete5nickel@gmail.com" },
    { name: "Garrett C. Parks", pledge_class: "2018", phone: "", email: "garrett.parks52@gmail.com" },
    { name: "Jacob D. Peterson", pledge_class: "2018", phone: "", email: "jdpeterson924@gmail.com" },
    { name: "Cannon M. Phillips", pledge_class: "2018", phone: "", email: "CannonMPLP@ku.edu" },
    { name: "Brooks D. Rockey", pledge_class: "2018", phone: "", email: "brooksrockey@gmail.com" },
    { name: "Ryan R. Scott", pledge_class: "2018", phone: "", email: "rscotty1551@gmail.com" },
    { name: "Amir N. Shami", pledge_class: "2018", phone: "", email: "amirnader.shami@gmail.com" },
    { name: "Rudhra D. Thakur", pledge_class: "2018", phone: "", email: "Rudhra26@gmail.com" },
    { name: "Miguel A. Valrie", pledge_class: "2018", phone: "", email: "miguelxvalrie@gmail.com" },
    { name: "Noah T. Watkins", pledge_class: "2018", phone: "", email: "noah.watkins3@gmail.com" },
    { name: "Brock E. Weinfurter", pledge_class: "2018", phone: "", email: "Beweinfurter@gmail.com" },
    { name: "Burke D. Wheeler", pledge_class: "2018", phone: "", email: "burkewheeler7@gmail.com" },
    { name: "Michael A. Wood", pledge_class: "2018", phone: "", email: "mawood633@gmail.com" },
    { name: "Callum E. Yockey", pledge_class: "2018", phone: "", email: "c.yockey4@gmail.com" }
];



const handleSearch = (e) => {
  const query = e.target.value;
  setSearch(query);

  if (query === '') {
    setResults([]);
  } else {
    const filteredResults = (membersList === 'active' ? activeMembers : alumniMembers).filter((member) =>
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
          maxWidth: '300px',
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