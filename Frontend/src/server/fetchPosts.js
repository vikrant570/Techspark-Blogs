import axios from "axios";
const BASE_URL = 'http://localhost:7000/blogspot/posts'

export const fetchHomePagePosts = async (pageNo,setPosts,setisNext) =>{
    const response = await axios.get(`${BASE_URL}/explore/${pageNo}`)
    const fetchedData = response.data.posts
    setPosts(fetchedData);
    window.scrollTo({top : 0, behavior : "smooth"});

    if(fetchedData.length == 10){
        setisNext(true)
    }

    if(fetchedData.length < 10){
        setisNext(false)
    }
}

export const fetchByClick = async (id) =>{
    const response = await axios.get(`${BASE_URL}/${id}`);
    const post = response.data.post;
    return post
}

export const fetchByCategory = async (cat) =>{
    const response = await axios.get(`${BASE_URL}/categorize?category=${cat}`)
    return response.data
}

export const searchBarFunctionality = async (term) =>{
    const response = await axios.get(`${BASE_URL}/search?term=${term}`);
    return response.data
}

export const fetchByTerm = async(term) =>{
    const response = await axios.get(`${BASE_URL}/searchResults?term=${term}`);
    return response.data
}