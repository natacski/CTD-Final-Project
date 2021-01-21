import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const ProjectsPage = () => {
  const [projects, setProjects] = useState({});

  //getting data by zipcode
  const getProjectsData = async () => {
    let url = process.env.REACT_APP_NEW_PROJECT_DATA; //.env variable
    const response = await fetch(url);
    const items = await response.json();
    return items;
  };

  useEffect(() => {
    getProjectsData().then((items) => setProjects(items));
  }, []);

  return (
    <div style={{ margin: 100, marginTop: 30 }}>
      <h1>Newest Projects</h1>

      <Table responsive="sm">
        <thead style={{ background: '#735aed', color: 'white' }}>
          <tr>
            <th>Project Name</th>
            <th>Idea From</th>
            <th>Area</th>
            <th>Level</th>
          </tr>
        </thead>
        {/* maps through project items */}
        {projects.records &&
          projects.records.length > 0 &&
          projects.records.map((item) => {
            return (
              <tbody>
                <tr>
                  <td>
                    {/* Links data results with details page */}
                    <a href={'../ProjectDetails?id=' + item.id}>
                      {item.fields.projectTitle}
                    </a>
                  </td>
                  <td>
                    {' '}
                    {item.fields.firstName} {item.fields.lastName}
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
  withAuthorization(condition)(ProjectsPage),
);
