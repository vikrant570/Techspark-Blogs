import { Link } from "react-router-dom";
import SearchBarDropDown from "./SearchBarDropDown";
import { useEffect, useState } from "react";
import { searchBarFunctionality } from "../../server/fetchPosts";
import { useAppContext } from "../../Context";

const Header = ({openForm}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [term, setTerm] = useState('');
  const [dropDownList, setDropDownList] = useState();
  const {isLoggedIn} = useAppContext();
  
  const handleSearch = (e) =>{
    setTerm(e.target.value);
  }

  useEffect(()=>{
    const fetchData = async () =>{
      const data = await searchBarFunctionality(term);
      setDropDownList(data);
    }
    fetchData()
  },[term])

  return (
      <header className='flex flex-row justify-between text-lg p-6 fixed top-0 left-0 right-0 z-50 align-middle text-gray-900 bg-white shadow-black/10 shadow-md'>
        <h1 className='font-lobster text-highlight text-5xl'>Tech Spark</h1>
        <nav className='flex flex-row space-x-4 header-links py-3 align-middle'>
          <Link to='/'>Home</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/about'>About</Link>
          {isLoggedIn ? <></> : <input type="button" value="Signup/Login" className='main-button' onClick={openForm}/>}
        </nav>
        <div className="search align-middle py-2">
          <i className="fa-duotone fa-solid fa-magnifying-glass px-4 bg-gray-200 py-4 rounded-full mr-1 hover:cursor-pointer hover:text-white hover:bg-gray-900 ease-in-out duration-200"></i>
          <input type="search" name="search-bar" id="search-bar" placeholder='Search...' className='rounded-3xl px-4 outline-none py-2.5 bg-gray-900 text-white'  onChange={handleSearch} onFocus={()=>{setIsSearching(true)}}/>
          {isSearching==true && term !== undefined ? <SearchBarDropDown terms={dropDownList} setIsSearching={setIsSearching}/> : ''}
        </div>
      </header>
  );
}

export default Header;
