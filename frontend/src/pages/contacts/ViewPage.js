import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../../Layout';
import {
    FieldLabel,
    FieldValue,
    ButtonLink,
    FieldGroup,
    FieldRow
} from '../../Styles';

const ContactsViewPage = ({ match }) => {
    const { data } = useQuery(
        gql`
            query MyQuery($id: UUID!) {
                contactById(id: $id) {
                    email
                    firstname
                    lastname
                }
            }
        `,
        {
            variables: {
                id: match.params.contactId
            }
        }
    );

    return (
        <Layout>
            {
                data
                    ? (
                        <>
                            <h2>Contacts: {data.contactById.firstname} {data.contactById.lastname}</h2>

                            <ButtonLink as={Link}
                                to='./edit'
                            >Edit
                            </ButtonLink>

                            <FieldGroup>
                                <FieldRow>
                                    <FieldLabel>Email:</FieldLabel>
                                    <FieldValue>{data.contactById.email}</FieldValue>
                                </FieldRow>
                                <FieldRow>
                                    <FieldLabel>Firstname:</FieldLabel>
                                    <FieldValue>{data.contactById.firstname}</FieldValue>
                                </FieldRow>
                                <FieldRow>
                                    <FieldLabel>Lastname:</FieldLabel>
                                    <FieldValue>{data.contactById.lastname}</FieldValue>
                                </FieldRow>
                            </FieldGroup>
                        </>
                    ) : (
                        'loading...'
                    )
            }
        </Layout>
    );
};

export default ContactsViewPage;
