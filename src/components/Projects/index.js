import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
// import AuthUserContext from '../Session/context';

const ProjectsPage = () => {
  // const user = useContext(AuthUserContext);
  const [projects, setProjects] = useState({});

  //getting data by zipcode
  const getProjectsData = async () => {
    let url =
      'https://api.airtable.com/v0/appjvJEkIJyX9bcmM/new-project-form?api_key=keyclOytaXo7NHQ8M';
    // const response = await fetch(process.env.REACT_APP_PROJECTS_LIST);
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

        {projects.records &&
          projects.records.length > 0 &&
          projects.records.map((item) => {
            return (
              <tbody>
                <tr>
                  <td>
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
