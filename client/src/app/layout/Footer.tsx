import React from 'react';
import {Link} from "react-router-dom";
import {footerLinks} from "../../constants/content";

function Footer() {
    return (
        <>
            <hr/>
            <footer className={"lg:flex justify-between container mx-auto py-20"}>
                <div className={"lg:basis-2/12 mb-5"}>
                    <img src={"/assets/logo.png"} className={"h-8"} alt="logo"/>
                </div>

                <div className={"lg:basis-8/12 flex lg:gap-32 gap-10 lg:justify-start justify-between mb-5"}>
                    {footerLinks.map((link, index) => (
                        <div key={index}>
                            <Link to={link.title.link}><h3 className={"text-sm font-semibold mb-2"}>{link.title.name}</h3></Link>
                            <ul className={"list-none text-sm text-gray-500"}>
                                {link.links.map((item, index) => (
                                    <Link key={index} to={item.link}><li className={"py-2"}>{item.name}</li></Link>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={"lg:basis-4/12"}>
                    <h3 className={"text-sm font-semibold mb-2"}>Sign up for our newsletter</h3>
                    <p className={"text-sm text-gray-500"}>The latest deals and savings, sent to your inbox weekly.</p>
                    <form className={"flex gap-5"}>
                        <input type="text" className={"border border-gray-300 rounded-md px-3 py-2 w-full mt-3 outline-none text-sm placeholder:text-neutral-400"} placeholder={"Enter your email address"}/>
                        <button className={"bg-primary text-white rounded-md px-3 py-2 mt-3 w-40"}>Sign up</button>
                    </form>
                </div>
            </footer>
        </>
    )
}

export default Footer;