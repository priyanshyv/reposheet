import React, { useEffect, useState,useCallback } from 'react'
import toast from 'react-hot-toast'
import Search from './Search'
import SortRepos from "./SortRepos"
import ProfileInfo from './ProfileInfo'
import Repos from './Repos'
import Spinner from './Spinner'

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

	const [sortType, setSortType] = useState("recent");
    
    // maybe this cause a infinity loop array so ham yei kareynge ki callback function ka use kar lenge
    // const getUserProfileAndRepos = async()=>{
    //   setLoading(true);
    //   try{
    //     const userRes = await fetch('https://api.github.com/users/priyanshyv');
    //     const userProfile = await userRes.json();
    //     setUserProfile(userProfile);

    //     const repoRes = await fetch(userProfile.repos_url)
    //     const repos = await repoRes.json();
    //     setRepos(repos);
    //     setLoading(false);
    //   }
    //   catch(error){
    //     toast.error(error.message)
    //   }
    //   // study  about it(later)
    //   finally{
    //     setLoading(false);
    //   }
    // }

    // useEffect(()=>{
    //   getUserProfileAndRepos();
    // },[])

    const getUserProfileAndRepos = useCallback(async (username = "hkirat") => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const { repos, userProfile } = await res.json();
  
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
  
        setRepos(repos);
        setUserProfile(userProfile);
  
        return { userProfile, repos };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      getUserProfileAndRepos();
    }, [getUserProfileAndRepos]);
  
    const onSearch = async (e, username) => {
      e.preventDefault();
  
      setLoading(true);
      setRepos([]);
      setUserProfile(null);
  
      const { userProfile, repos } = await getUserProfileAndRepos(username);
  
      setUserProfile(userProfile);
      setRepos(repos);
      setLoading(false);
      setSortType("recent");
    };
  
    const onSort = (sortType) => {
      if (sortType === "recent") {
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
      } else if (sortType === "stars") {
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
      } else if (sortType === "forks") {
        repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
      }
      setSortType(sortType);
      setRepos([...repos]);
    };
  
    return (
      <div className='m-4'>
        <Search onSearch={onSearch} />
        {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
        <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
          {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
  
          {!loading && <Repos repos={repos} />}
          {loading && <Spinner />}
        </div>
        <div>
          <button>MY OWN GITSERVER</button>
        </div>
      </div>
    );
  };
  export default HomePage;