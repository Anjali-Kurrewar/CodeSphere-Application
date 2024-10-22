import ProfileInfo from "../components/ProfileInfo";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Homepage component with search, sort, and profile/repos components.
const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepo = useCallback(async (username = 'Anjali-Kurrewar') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/profile/${username}`);
      const data = await res.json();

      if (res.ok) {
        const { repos, userProfile } = data;
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // descending, recent first

        setRepos(repos);
        setUserProfile(userProfile);
      } else {
        throw new Error(data.message || 'Failed to fetch data');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepo();
  }, [getUserProfileAndRepo]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    await getUserProfileAndRepo(username);

    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    if (repos && repos.length > 0) {
      let sortedRepos = [];
      if (sortType === "recent") {
        sortedRepos = repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // descending, recent first
      } else if (sortType === "stars") {
        sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // descending, most stars first
      } else if (sortType === "forks") {
        sortedRepos = repos.sort((a, b) => b.forks_count - a.forks_count); // descending, most forks first
      }
      setSortType(sortType);
      setRepos([...sortedRepos]);
    }
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
    </div>
  );
};

export default HomePage;
