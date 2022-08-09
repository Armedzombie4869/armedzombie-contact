import React from 'react';
import Header from './componenets/Header'
import ContactList from './componenets/ContactList';
import AddContact from './componenets/AddContact'
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ContactDetails from './componenets/ContactDetails';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="addnew" element={<AddContact />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
