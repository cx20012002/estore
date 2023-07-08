import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {IoMdCart} from "react-icons/io";
import {Menu, Popover, Transition} from "@headlessui/react";
import {CiLogin, CiSettings} from "react-icons/ci";
import {AiOutlineUserAdd} from "react-icons/ai";
import {useAppSelector} from "../redux/store";
import {navigation} from "../../constants/content";
import {getUserName} from "../../utils/scriptTools";
import {logout} from "../redux/services/accountApi";
import {BiUser} from "react-icons/bi";
import {GoSignOut} from "react-icons/go";
import AccountModal from "../../components/AccountModal";

function Header() {
    const {basket, user} = useAppSelector(state => state.persist);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const [isOpen, setIsOpen] = useState<{ source: string, open: boolean }>({source: "login", open: false});
    const firstFocus = useRef(null);

    const openModal = (source: string) => {
        if (source === "login") {
            setIsOpen({source, open: true});
        } else if (source === "register") {
            setIsOpen({source, open: true});
        }
    };
    const closeModal = (source: string) => {
        setIsOpen({source, open: false})
    };

    useEffect(() => {
    }, [user]);

    return (
        <header className="w-full border-b z-50">
            <AccountModal closeModal={closeModal} setIsOpen={setIsOpen} firstFocus={firstFocus} isOpen={isOpen}/>
            <nav className="flex items-center justify-between py-6 container mx-auto sm:px-0 px-5">
                <div className="flex lg:flex-1">
                    <Link to={"/"}>
                        <img
                            className="h-8 w-auto"
                            src={"/assets/logo.png"}
                            alt="logo"
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href}
                              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <div className={"relative mr-5"}>
                        <Link to={"/basket"}>
                            <IoMdCart size={25}/>
                        </Link>
                        {itemCount !== 0 &&
                            <div
                                className={"bg-primary absolute -top-3 -right-3 text-white w-[15px] h-[15px] box-content p-[1px] text-xs rounded grid place-items-center"}>
                                {itemCount}
                            </div>
                        }
                    </div>

                    {!user ?
                        <Popover className={"relative ml-5 text-sm"}>
                            <Popover.Button className={"text-sm font-semibold leading-6 text-gray-900 outline-none"}>
                                Log in / Register <span aria-hidden="true">&rarr;</span>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel
                                    className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-[200px]">
                                    <div
                                        className={"overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"}>
                                        <div className={"relative gap-8 bg-white p-4"}>
                                            <div className="flex flex-col w-full">
                                                <button onClick={
                                                    () => openModal("login")
                                                }
                                                        className={"flex gap-2 items-center hover:bg-gray-50 p-3 rounded-lg"}>
                                                    <CiLogin size={20}/> Log In
                                                </button>
                                                <button onClick={
                                                    () => openModal("register")
                                                }
                                                        className={"flex gap-2 items-center hover:bg-gray-50 p-3 rounded-lg"}>
                                                    <AiOutlineUserAdd size={20}/> Sign Up
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover> :

                        <div className={"flex gap-3 items-center text-sm"}>
                            Welcome
                            <Menu as={"div"} className={"relative inline-block text-left text-neutral-600"}>
                                <Menu.Button
                                    className={"bg-primary text-white px-3 py-1 rounded"}>{getUserName(user.email)}</Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className={"absolute flex flex-col  px-3 py-5 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg z-10"}>
                                        <Menu.Item>
                                            <Link to={"/account-settings"}
                                                  className={"flex items-center gap-2 p-2 rounded hover:text-primary hover:bg-neutral-50"}><BiUser
                                                size={18}/>My Profiles</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to={"/account-settings"}
                                                  className={"flex items-center gap-2 p-2 rounded hover:text-primary hover:bg-neutral-50"}><CiSettings
                                                size={18}/>Account settings</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <button onClick={logout}
                                                    className={"flex items-center gap-2 p-2 rounded hover:text-primary hover:bg-neutral-50"}>
                                                <GoSignOut
                                                    size={18}/>Sign out
                                            </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header;