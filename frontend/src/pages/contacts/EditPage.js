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

    const [updateContact] = useMutation(
        gql`mutation updateContact ($id: UUID!, $input: ContactPatch!) {
            updateContact(input: {id: $id, patch: $input}) {
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
                            <h2>Update Contacts: {data.contact.firstname} {data.contact.lastname}</h2>

                            <Formik
                                initialValues={data.contact}
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
                                {({ setFieldValue }) => (
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
                                            <FieldRow>
                                                <FieldLabel>Photo:</FieldLabel>
                                                <input
                                                    type='file'
                                                    name='photoFile'
                                                    accept='image/*'
                                                    onChange={(event) => {
                                                        setFieldValue('photoFile', event.target.files[0]);
                                                    }}
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
                                )}
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
