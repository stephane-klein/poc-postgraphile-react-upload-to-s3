/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => (
    <div>
        <Global
            styles={css`
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    font-size: 16px;
                    line-height: 1.25em;
                    color: #333840;
                    background-color: white;
                    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }

                #root, #root > div {
                    height: 100%;
                }

                a {
                    color: #3272d9;
                    text-decoration: none;
                    &:active {
                        color: #1d5bbf;
                    }
                    &:hover {
                        color: #5691f0;
                        text-decoration: underline;
                    }
                    &:focus {
                        color: #3272d9;
                    }
                }
            `}
        />
        <div
            css={css`
                height: 100%;
                margin: auto;
                display: flex;
                flex-direction: row;

                aside {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    width: 120px;
                    height: 100%;
                    padding: 1em;
                    border-right: 1px solid black;
                    > ul {
                        margin: 0;
                        padding: 0;
                        list-style: none;
                    }
                }

                main {
                    margin-left: 140px;
                    padding: 2rem;
                }

                table {
                    border-collapse:collapse;

                    td, th {
                        border: 1px solid #aaa;
                        padding: 0.5em;
                        margin: 0;
                        border-spacing: 0;
                    }
                }
             `}
        >
            <aside>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/contacts/'>Contacts</NavLink></li>
                </ul>
            </aside>
            <main>
                {children}
            </main>
        </div>
    </div>
);

export default Layout;
