import React, {useState} from 'react';
import {useGetFiltersQuery, useGetProductsQuery} from "../../app/redux/services/productsApi";
import LoadingComponent from "../../components/LoadingComponent";
import ProductList from "./ProductList";
import {Disclosure, Transition} from "@headlessui/react";
import {BiMinus, BiPlus} from "react-icons/bi";
import {ProductParams} from "../../app/models/product";
import {RxReset} from "react-icons/rx";
import Pagination from "../../components/Pagination";
import {sortOptions} from "../../constants/content";


function Catalog() {
    const params: ProductParams = {
        orderBy: 'name',
        pageNumber: 1,
        pageSize: 6,
        searchTerm: '',
        brands: [],
        types: []
    }
    const getParams = (productParams: ProductParams): string => {
        const params = new URLSearchParams();
        params.append('pageNumber', productParams.pageNumber.toString());
        params.append('pageSize', productParams.pageSize.toString());
        params.append('orderBy', productParams.orderBy);
        if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
        if (productParams.types.length > 0) params.append('types', productParams.types.toString());
        if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString());
        return params.toString();
    }

    const {data: filters, isLoading: filterLoading} = useGetFiltersQuery();
    const [queryParams, setQueryParams] = useState<ProductParams>(params);
    const [searchValue, setSearchValue] = useState<string>('');
    const {data: response, isLoading, isFetching} = useGetProductsQuery(getParams(queryParams));
    
    if (isLoading || filterLoading) return <LoadingComponent logo={'/assets/logo.png'}/>;
    if (!response) return <div>No products</div>

    const {items, metaData} = response;
    const {brands, types} = filters;

    const handleSearchOnChange = (e: any) => {
        if (e.target.value.length > 1) {
            setTimeout(() => {
                setQueryParams({...queryParams, searchTerm: e.target.value, pageNumber: 1});
            }, 1000)
        }
        if (e.target.value.length === 0) {
            setQueryParams({...queryParams, searchTerm: '', pageNumber: 1});
        }
        setSearchValue(e.target.value);
    }
    
    const handleFilterOnChange = (e: any) => {
        setQueryParams({...queryParams, orderBy: e.target.value, pageNumber: 1});
    }

    const handleBrandChange = (e: any) => {
        const brandId = e.target.value;
        const brands = queryParams.brands;
        if (brands.includes(brandId)) {
            const index = brands.indexOf(brandId);
            brands.splice(index, 1);
        } else {
            brands.push(brandId);
        }
        setQueryParams({...queryParams, brands: brands, pageNumber: 1});
    }

    const handleTypeChange = (e: any) => {
        const typeId = e.target.value;
        const types = queryParams.types;
        if (types.includes(typeId)) {
            const index = types.indexOf(typeId);
            types.splice(index, 1);
        } else {
            types.push(typeId);
        }
        setQueryParams({...queryParams, types: types, pageNumber: 1});
    }

    const handlePageChange = (pageNumber: number) => {
        setQueryParams({...queryParams, pageNumber: pageNumber});
    }
    
    const handleResetFilter = () => {
        setQueryParams(params);
        setSearchValue('');
    }

    return (
        <>
            <section className={"mb-20"}>
                <img src={"/assets/shop_page_banner.png"} alt={"Shop Banner"}/>
            </section>
            <section className={"flex-row lg:flex gap-10"}>
                <div className={"lg:w-1/5 w-full lg:mb-0 mb-10"}>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                        Shop Filters
                    </h1>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchOnChange}
                        className={"border border-gray-300 rounded-md px-3 py-2 w-full mb-5 placeholder:text-sm"}
                        placeholder={"Search Products"}
                    />
                    <div role="list" className="py-3 font-medium text-gray-900 mb-5">
                        {sortOptions.map((option) => (
                            <div key={option.label}>
                                <input
                                    onChange={handleFilterOnChange}
                                    value={option.value}
                                    checked={option.value === queryParams.orderBy}
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-indigo-500"
                                />
                                <label className="ml-3 min-w-0 flex-1 text-[14px] leading-8 text-gray-500">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <Disclosure as={"div"} className="border-t border-gray-200 px-4 py-6">
                        {({open}) => (
                            <>
                                <Disclosure.Button className="flex w-full items-center justify-between py-2 mb-2">
                                    <span className={"text-gray-900 font-bold"}>Brands</span>
                                    <span className={"flex items-center"}>
                                        {open ? (
                                            <BiMinus className={"text-gray-500"}/>
                                        ) : (
                                            <BiPlus className={"text-gray-500"}/>
                                        )}
                                    </span>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    {brands.map((brand: any) => (
                                        <Disclosure.Panel key={brand} className="text-gray-500 flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={queryParams.brands.includes(brand)}
                                                onChange={handleBrandChange}
                                                value={brand}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500"
                                            />
                                            <label className="ml-3 min-w-0 flex-1 text-[14px] leading-8 text-gray-500">
                                                {brand}
                                            </label>
                                        </Disclosure.Panel>
                                    ))}

                                </Transition>
                            </>
                        )}
                    </Disclosure>
                    <Disclosure as={"div"} className="border-t border-gray-200 px-4 py-6">
                        {({open}) => (
                            <>
                                <Disclosure.Button className="flex w-full items-center justify-between py-2 mb-2">
                                    <span className={"text-gray-900 font-bold"}>Types</span>
                                    <span className={"flex items-center"}>
                                        {open ? (
                                            <BiMinus className={"text-gray-500"}/>
                                        ) : (
                                            <BiPlus className={"text-gray-500"}/>
                                        )}
                                    </span>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    {types.map((type: any) => (
                                        <Disclosure.Panel key={type} className="text-gray-500 flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={queryParams.types.includes(type)}
                                                onChange={handleTypeChange}
                                                value={type}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500"
                                            />
                                            <label className="ml-3 min-w-0 flex-1 text-[14px] leading-8 text-gray-500">
                                                {type}
                                            </label>
                                        </Disclosure.Panel>
                                    ))}
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                    <button
                        className={"text-sm flex border-neutral-300 border px-6 py-2 rounded-full items-center gap-3 text-neutral-600 hover:border-primary hover:text-primary transition-colors duration-300"}
                        onClick={handleResetFilter}
                    >
                        <RxReset/> Reset Filter
                    </button>
                </div>
                <div className={"lg:w-4/5 w-full lg:pl-8 relative"}>
                    {isFetching && <LoadingComponent partial={true}/>}
                    <ProductList products={items}/>
                    <Pagination 
                        currentPage={metaData.currentPage} 
                        pageSize={metaData.pageSize} 
                        totalItems={metaData.totalCount} 
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
        </>
    )
}

export default Catalog;