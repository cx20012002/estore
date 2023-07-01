import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {IoMdCart} from "react-icons/io";
import {Popover, Transition} from "@headlessui/react";
import {CiLogin} from "react-icons/ci";
import {AiOutlineUserAdd} from "react-icons/ai";

const navigation = [
    {name: 'Catalog', href: 'catalog'},
    {name: 'About', href: '#'},
    {name: 'Marketplace', href: '#'},
    {name: 'Contact', href: '#'},
]

function Header() {
    return (
        <header className="w-full border-b z-50">
            <nav className="flex items-center justify-between py-6 container mx-auto">
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
                    <div className={"relative"}>
                        <IoMdCart size={25}/>
                        <div className={"bg-primary absolute -top-3 -right-3 text-white w-[15px] h-[15px] box-content p-[1px] text-xs rounded grid place-items-center"}>3</div>
                    </div>
                    
                    <Popover className={"relative ml-5"}>
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
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-[200px]">
                                <div className={"overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"}>
                                    <div className={"relative gap-8 bg-white p-4"}>
                                        <div className="flex flex-col w-full">
                                            <Link to={"/"} className={"flex gap-5 items-center hover:bg-gray-50 p-3 rounded-lg"}>
                                               <CiLogin size={20}/> Log In
                                            </Link>
                                            <Link to={"/"} className={"flex gap-5 items-center hover:bg-gray-50 p-3 rounded-lg"}>
                                                <AiOutlineUserAdd size={20}/> Sign Up
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
            </nav>
        </header>
    )
}

export default Header;