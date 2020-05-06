/** @jsx jsx */
import React from 'react';
import { css, jsx} from '@emotion/core';
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
                contact(id: $id) {
                    email
                    firstname
                    lastname
                    photoFile
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
                            <h2>Contacts: {data.contact.firstname} {data.contact.lastname}</h2>

                            <ButtonLink as={Link}
                                to='./edit'
                            >Edit
                            </ButtonLink>

                            <FieldGroup>
                                <FieldRow>
                                    <FieldLabel>Email:</FieldLabel>
                                    <FieldValue>{data.contact.email}</FieldValue>
                                </FieldRow>
                                <FieldRow>
                                    <FieldLabel>Firstname:</FieldLabel>
                                    <FieldValue>{data.contact.firstname}</FieldValue>
                                </FieldRow>
                                <FieldRow>
                                    <FieldLabel>Lastname:</FieldLabel>
                                    <FieldValue>{data.contact.lastname}</FieldValue>
                               </FieldRow>
                               <FieldRow>
                                    <FieldLabel>Photo:</FieldLabel>
                                    <FieldValue>
                                        <img
                                            css={css`
                                                width: 150px;
                                            `}
                                            src={`http://127.0.0.1:5000/attachments/${data.contact.photoFile}`}
                                        />
                                    </FieldValue>
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
