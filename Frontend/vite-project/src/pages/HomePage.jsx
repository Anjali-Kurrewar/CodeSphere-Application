import ProfileInfo from "../components/ProfileInfo";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


// Homepage component with search, sort, and profile/repos components.
const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setloading] = useState(false);

  const [sortType, setSortType] = useState("forks");

  const getUserProfileAndRepo = async() => {
    try {
      const userRes = await fetch('https://api.github.com/users/Anjali-Kurrewar');
      const user = await userRes.json();
      setUserProfile(userProfile);

      const repoRes = await fetch(userProfile.repo_url);
      const repos = await repoRes.json();
      setRepos(repos);
    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getUserProfileAndRepo();
  }
)
	return (
		<div className='m-4'>
			<Search />
			<SortRepos />
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				<ProfileInfo />
				<Repos />
				<Spinner />
			</div>
		</div>
	);
};

export default HomePage;
