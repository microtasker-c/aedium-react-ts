import { NotePencilIcon, TrashIcon } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
    SignedIn,
    SignedOut,
    // UserAvatar,
    UserButton,
} from '@neondatabase/neon-js/auth/react';
import { Route } from "../routes/_app/_protected/editor";
import { useAtomValue, useSetAtom } from "jotai";
import { isEditorEmptyAtom, editorEmptySignalAtom, editorPublishSignalAtom } from "../atoms/editor";

function Navbar() {
    const navigate = useNavigate()

    const location = useLocation()
    const isEditorPage = location.pathname === Route.to

    // jotai
    const isEditorEmpty = useAtomValue(isEditorEmptyAtom)
    const setEditorEmptySignal = useSetAtom(editorEmptySignalAtom)
    const setEditorPublishSignal = useSetAtom(editorPublishSignalAtom)





    return (
        <nav className="max-lg:collapse bg-base-200  shadow-sm w-full rounded-md">
            <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
            <label
                htmlFor="navbar-1-toggle"
                className="fixed inset-0 hidden max-lg:peer-checked:block"
            ></label>
            <div className="collapse-title navbar bg-base-300">
                <div className="navbar-start">
                    {/* Sidebar toggle button */}
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                    >
                        {/* Sidebar toggle icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                            className="my-1.5 inline-block size-4"
                        >
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>

                    {/* Mobile toggle button */}
                    {/* <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label> */}

                    {/* Logo back to home */}
                    <button className="btn btn-ghost text-xl"
                        onClick={
                            () => navigate({
                                to: '/'
                            })
                        }>Aediem</button>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-38 lg:w-auto mr-1 rounded-xl input-md"
                    />
                </div>

                {/* Desktop menu */}
                {/* <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <button>Item 1</button>
                        </li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2 bg-base-100 w-40 z-1">
                                    <li>
                                        <button>Submenu 1</button>
                                    </li>
                                    <li>
                                        <button>Submenu 2</button>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <button>Item 3</button>
                        </li>
                    </ul>
                </div> */}

                {/* Login button */}
                <div className="navbar-end">

                    <SignedIn>
                        {!isEditorPage &&
                            <button className="btn btn-sm hidden sm:inline-flex sm:btn-md mr-1 btn-ghost"
                                onClick={() => navigate({
                                    to: '/editor'
                                })}
                            >
                                <NotePencilIcon size={24} weight="thin" />
                                Write
                            </button>
                        }
                        {isEditorPage &&

                            <>
                                {/* 发布功能 */}
                                <button className="btn btn-xs hidden sm:inline-flex sm:btn-sm  mr-2 btn-accent "
                                    disabled={isEditorEmpty}
                                    onClick={() => setEditorPublishSignal((prev) => prev + 1)}
                                >
                                    {/* <NotePencilIcon size={24} weight="thin" /> */}
                                    Publish
                                </button>


                                {/* 删除功能 */}
                                <button className="btn btn-xs hidden sm:inline-flex sm:btn-sm  mr-4 btn-error "
                                    disabled={isEditorEmpty}
                                    onClick={() => setEditorEmptySignal((prev) => prev + 1)}
                                >
                                    <TrashIcon size={24} />
                                </button>
                            </>



                        }
                    </SignedIn>

                    {/* 登录按钮 */}
                    <SignedOut>
                        <button
                            onClick={() => navigate({
                                to: '/auth/$pathname',
                                params: {
                                    pathname: 'sign-in'
                                }
                            })}
                            className="btn btn-sm sm:btn-md btn-secondary">Login</button>
                    </SignedOut>

                    {/* 已登录头像 */}

                    <SignedIn>
                        <UserButton size="icon"></UserButton>
                    </SignedIn>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="collapse-content lg:hidden z-1">
                <ul className="menu">
                    <li>
                        <button>Item 1</button>
                    </li>
                    <li>
                        <button>Parent</button>
                        <ul>
                            <li>
                                <button>Submenu 1</button>
                            </li>
                            <li>
                                <button>Submenu 2</button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button>Item 3</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;