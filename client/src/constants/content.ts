export const colors = ['bg-[#7ABDB5]', 'bg-[#D7B2BB]', 'bg-[#E2C28F]'];
export const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const footerLinks = [
    {
        title: {name: 'Product', link: '/catalog/product'},
        links: [
            {name: 'Bags', link: '/catalog/bags'},
            {name: 'Tees', link: '/catalog/tees'},
            {name: 'Objects', link: '/catalog/objects'},
            {name: 'Home Goods', link: '/catalog/home-goods'},
            {name: 'Accessories', link: '/catalog/accessories'},
        ]
    },
    {
        title: {name: 'Company', link: '/catalog/company'},
        links: [
            {name: 'Who we are', link: '/catalog/bags'},
            {name: 'Sustainability', link: '/catalog/tees'},
            {name: 'Press', link: '/catalog/press'},
            {name: 'Careers', link: '/catalog/home-goods'},
            {name: 'Terms & Conditions', link: '/catalog/terms'},
            {name: 'Privacy', link: '/catalog/privacy'},
        ]
    },
    {
        title: {name: 'Customer Service', link: '/catalog/customer-service'},
        links: [
            {name: 'Contact', link: '/catalog/bags'},
            {name: 'Shipping', link: '/catalog/tees'},
            {name: 'Returns', link: '/catalog/returns'},
            {name: 'Warranty', link: '/catalog/home-goods'},
            {name: 'Secure Payments', link: '/catalog/accessories'},
            {name: 'FAQ', link: '/catalog/faq'},
            {name: 'Find a store', link: '/catalog/find-store'},
        ]
    }
]

const content = {
    colors,
    sizes,
    footerLinks
}

export default content;