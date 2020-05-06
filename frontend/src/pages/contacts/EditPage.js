import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Layout from '../../Layout';
import {
    ButtonLink,
    FieldLabel,
    FieldGroup,
    FieldRow,
    FieldInput
} from '../../Styles';

const ContactsEditPage = ({ match }) => {
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

    const [updateContact] = useMutation(
        gql`mutation updateContactById ($id: UUID!, $input: ContactPatch!) {
            updateContactById(input: {id: $id, contactPatch: $input}) {
                clientMutationId
            }
        }`
    );

    return (
        <Layout>
            {
                data
                    ? (
                        <>
                            <h2>Update Contacts: {data.contactById.firstname} {data.contactById.lastname}</h2>

                            <Formik
                                initialValues={data.contactById}
                                onSubmit={(values, actions) => {
                                    delete values.__typename;
                                    updateContact({
                                        variables: {
                                            id: match.params.contactId,
                                            input: values
                                        }
                                    });
                                }}
                            >
                                <Form>
                                    <FieldGroup>
                                        <FieldRow>
                                            <FieldLabel>Email:</FieldLabel>
                                            <FieldInput
                                                as={Field}
                                                type='email'
                                                name='email'
                                                placeholder='Email'
                                            />
                                        </FieldRow>
                                        <FieldRow>
                                            <FieldLabel>Firstname:</FieldLabel>
                                            <FieldInput
                                                as={Field}
                                                name='firstname'
                                                placeholder='Firstname'
                                            />
                                        </FieldRow>
                                        <FieldRow>
                                            <FieldLabel>Lastname:</FieldLabel>
                                            <FieldInput
                                                as={Field}
                                                name='lastname'
                                                placeholder='Lastname'
                                            />
                                        </FieldRow>
                                    </FieldGroup>

                                    <ButtonLink as={Link}
                                        to='./'
                                    >Cancel
                                    </ButtonLink>
                                    <ButtonLink as='button'
                                        type='submit'
                                    >Submit
                                    </ButtonLink>
                                </Form>
                            </Formik>
                        </>
                    ) : (
                        'loading...'
                    )
            }
        </Layout>
    );
};

export default ContactsEditPage;
