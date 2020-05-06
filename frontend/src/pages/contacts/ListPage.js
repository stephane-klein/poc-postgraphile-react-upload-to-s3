import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../../Layout';
import { ButtonLink } from '../../Styles';

const ContactsListPage = () => {
    const { data } = useQuery(
        gql`
            query MyQuery {
                allContacts(first: 20, orderBy: CREATED_AT_DESC) {
                    nodes {
                        id
                        email
                        lastname
                        firstname
                    }
                }
            }
        `
    );

    return (
        <Layout>
            <h2>Contacts list</h2>

            <ButtonLink as={Link}
                to='./new'
            >New contact
            </ButtonLink>

            {
                data
                    ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.allContacts.nodes.map((node, index) => (
                                    <tr key={index}>
                                        <td><Link to={`./${node.id}/`}>{node.email}</Link></td>
                                        <td><Link to={`./${node.id}/`}>{node.firstname}</Link></td>
                                        <td><Link to={`./${node.id}/`}>{node.lastname}</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        'loading...'
                    )
            }
        </Layout>
    );
};

export default ContactsListPage;
