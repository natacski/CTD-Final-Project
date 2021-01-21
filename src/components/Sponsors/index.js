import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import Logo from '../../images/image1.png';
import { Table, Col, Row } from 'react-bootstrap';

const SponsorsPage = () => {
  const [sponsors, setSponsors] = useState({});

  //getting data by company-data
  const getSponsorsData = async () => {
    let url =
      'https://api.airtable.com/v0/appjvJEkIJyX9bcmM/company-form?api_key=keyclOytaXo7NHQ8M';
    const response = await fetch(url);
    const items = await response.json();
    return items;
  };

  useEffect(() => {
    getSponsorsData().then((items) => setSponsors(items));
  }, []);

  return (
    <div style={{ margin: 100, marginTop: 30 }}>
    <h1>Sponsors</h1>

    <Table responsive="sm">
      <thead style={{ background: '#735aed', color: 'white' }}>
        <tr>
          <th>Company Name</th>
          <th>Sponsorship Ammount</th>
          <th>Area</th>
          <th>Level</th>
        </tr>
      </thead>

      {sponsors.records &&
         sponsors.records.length > 0 &&
         sponsors.records.map((item) => {
          return (
            <tbody>
              <tr>
                <td>
                  <a href={'../CompanyDetails?id=' + item.id}>
                    {item.fields.companyName}
                  </a>
                </td>
                <td>
                {item.fields.amount}
                </td>
                <td> {item.fields.area}</td>
                <td> {item.fields.level}</td>
              </tr>
            </tbody>
          );
        })}
    </Table>
  </div>
   
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(
  withAuthorization(condition)(SponsorsPage),
);
