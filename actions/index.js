import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookieFromReq } from "../helpers/utils";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout:3000
});

const setAuthHeader = (req) => {

    const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");
    //debugger;
if(token){
    return {headers : {'authorization' : `Bearer ${token}`,}};
}
return undefined;
}

const rejectPromise =(resError)=>{
    let error ={};
    if (resError && resError.response && resError.response.data) {
      error = resError.response.data;
    } else {
      error = resError;
    }
    return Promise.reject(error)
}


export const getSecretData = async (req) => {
  const url = "/secret";
  return await axiosInstance
    .get(url, setAuthHeader(req))
    .then((response) => response.data);
};

export const getPortfolios = async () => {
  const url = "/portfolios";
  return await axiosInstance.get(url).then((response) => response.data);
};

export const createPortfolios = async (portfolioData) => {
  const url = "/portfolios";
  return await axiosInstance
    .post(url, portfolioData, setAuthHeader())
    .then((response) => response.data)
    .catch(error=> rejectPromise(error));
};


export const getPortfolioById = async (id) => {
  const url = `/portfolios/${id}`;
  return await axiosInstance.get(url).then((response) => response.data);
};

export const updatePortfolios = async (portfolioData) => {
  const url = `/portfolios/${portfolioData._id}`;
  return await axiosInstance
    .patch(url, portfolioData, setAuthHeader())
    .then((response) => response.data)
    .catch((error) => rejectPromise(error));
};

export const deletePortfolio =  (id) => {
  const url = `/portfolios/${id}`;
  return axiosInstance
    .delete(url, setAuthHeader())
    .then((response) => response.data);
};


//----------------------BLOG ACTION---------------------


export const getBlogs = async (req) => {
  const url = "/blog";
  return await axiosInstance
    .get(url, setAuthHeader(req))
    .then((response) => response.data);
};




export const getUserBlogs = async (req) => {
  const url = "/blog/me";
  return await axiosInstance
    .get(url, setAuthHeader(req))
    .then((response) => response.data);
};



export const createBlog = (blogData, lockId) => {
  const url = `/blog?lockId=${lockId}`;
  return axiosInstance
    .post(url, blogData, setAuthHeader())
    .then((response) => response.data)
    .catch((error) => rejectPromise(error));
};

export const getBlogById = async (id) => {
  const url = `/blog/${id}`;
  return await axiosInstance.get(url).then((response) => response.data);
};

export const getBlogBySlug = async (slug) => {
  const url = `/blog/s/${slug}`;
  return await axiosInstance.get(url).then((response) => response.data);
};

export const updateBlog = async (blogData,blogId) => {
  const url = `/blog/${blogId}`;
  return await axiosInstance
    .patch(url, blogData, setAuthHeader())
    .then((response) => response.data)
    .catch((error) => rejectPromise(error));
};

export const deleteBlog = (id) => {
  const url = `/blog/${id}`;
  return axiosInstance
    .delete(url, setAuthHeader())
    .then((response) => response.data);
};

