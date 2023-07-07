import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import Login from "../features/account/Login";
import Register from "../features/account/Register";

interface Props {
    closeModal: (source:string) => void;
    setIsOpen: (isOpen: {source: string, open: boolean}) => void;
    firstFocus: any;
    isOpen: {source: string, open: boolean};
}

function AccountModal({closeModal, setIsOpen, firstFocus, isOpen}: Props) {
    return (
        <Transition appear show={isOpen.open} as={Fragment}>
            <Dialog initialFocus={firstFocus} as="div" className="relative z-10" onClose={() =>closeModal(isOpen.source)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                ref={firstFocus}
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
                            >
                                {(isOpen.source === "login") ? <Login setIsOpen={setIsOpen}/> : <Register setIsOpen={setIsOpen}/>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AccountModal;