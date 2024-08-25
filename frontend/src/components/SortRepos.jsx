import { useNavigate } from "react-router-dom";


const SortRepos = ({onSort,sortType}) => {
	const navigate = useNavigate();
	return (
		<div className='mb-2 flex justify-center lg:justify-end'>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
				${sortType == "recent" ? "border-blue-500" : ""}`}
				onClick={()=>onSort("recent")}
			>
				Most Recent
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
				${sortType == "stars" ? "border-blue-500" : ""}`}
				onClick={()=>onSort("stars")}
			>
				Most Stars
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
				${sortType == "forks" ? "border-blue-500" : ""}`}
				onClick={()=>onSort("forks")}
			>
				Most Forks
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
				onClick={() => navigate("/git-server")}
			>
				My Own Git Server
			</button>
		</div>
	);
};
export default SortRepos;
