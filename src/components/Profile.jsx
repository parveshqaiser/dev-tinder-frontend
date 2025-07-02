

import React from 'react'
import { useSelector } from 'react-redux'

import {FiMail,FiUser,FiCalendar,FiHeart,FiGlobe,FiStar} from "react-icons/fi";

const Profile = () => {
  const user = useSelector((store) => store?.user?.user)

	return (
	<main className="min-h-screen py-4 px-4">
		<section className="max-w-4xl mx-auto animate-fade-in">

			<div className="bg-gradient-to-tr from-gray-600 to-black/75 shadow-2xl rounded-2xl overflow-hidden border border-gray-700 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">

				<header className="relative bg-gradient-to-r from-purple-300 to-pink-400 h-20">
					<div className="absolute inset-0 bg-black/20"></div>
					<div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
						<div className="relative group">
							<img
								className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105"
								src={user?.photoUrl || "/placeholder.svg?height=128&width=128"}
								alt="profile"
							/>
							<div className="absolute -bottom-2 -right-2 bg-green-500 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center animate-pulse"></div>
						</div>
					</div>
				</header>


				<main className="pt-20 pb-8 px-8">
					<aside className="text-center mb-8 animate-slide-up">
						<h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
							{user?.fullName || "Your Name"}
						</h1>
						<div className="flex items-center justify-center gap-2 text-gray-300 mb-4 hover:text-white transition-colors duration-300">
							<FiMail className="w-4 h-4" />
							<span>{user?.email || "your.email@example.com"}</span>
						</div>
						<p className="text-gray-300 italic text-lg max-w-2xl mx-auto leading-relaxed hover:text-white hover:scale-105 transition-all duration-300 cursor-default">
							"{user?.bio || "Tell us about yourself..."}"
						</p>
					</aside>

					<aside className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
						<div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 rounded-xl border border-blue-500/30 backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer">
							<div className="flex items-center gap-4">
								<div className="bg-blue-500 p-3 rounded-full hover:bg-blue-400 transition-colors duration-300">
									<FiUser className="w-6 h-6 text-white" />
								</div>
								<div>
									<p className="text-gray-400 text-sm">Gender</p>
									<p className="text-white text-xl font-semibold">
									{user?.gender === "male" ? "♂️ Male" : user?.gender === "female" ? "♀️ Female" : "🌟 Other"}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-gradient-to-r from-pink-600/20 to-red-600/20 p-3 rounded-xl border border-pink-500/30 backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 cursor-pointer">
							<div className="flex items-center gap-4">
								<div className="bg-pink-500 p-3 rounded-full hover:bg-pink-400 transition-colors duration-300">
									<FiCalendar className="w-6 h-6 text-white" />
								</div>
								<div>
									<p className="text-gray-400 text-sm">Age</p>
									<p className="text-white text-xl font-semibold">{user?.age || "25"} years old</p>
								</div>
							</div>
						</div>
					</aside>

					<div className="mb-8">
					<div className="flex items-center justify-center gap-2 mb-6">
						<FiHeart className="w-6 h-6 text-pink-400 animate-bounce" />
						<h2 className="text-2xl font-bold text-white">Your Interests</h2>
						<FiHeart className="w-6 h-6 text-pink-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
					</div>
					<div className="flex flex-wrap justify-center gap-3">
						{user?.skills?.length > 0 ? (
						user.skills.map((skill, index) => (
							<span
							key={skill}
							className="px-6 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white rounded-full border border-purple-500/50 backdrop-blur-sm font-medium hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer animate-fade-in-up"
							style={{ animationDelay: `${index * 0.1}s` }}
							>
							{skill}
							</span>
						))
						) : (
						<div className="text-gray-400 text-center py-8 hover:scale-105 transition-transform duration-300">
							<FiStar className="w-12 h-12 mx-auto mb-2 text-gray-500 animate-spin-slow" />
							<p>No interests added yet</p>
						</div>
						)}
					</div>
					</div>

					{/* Languages Section */}
					<div>
					<div className="flex items-center justify-center gap-2 mb-6">
						<FiGlobe className="w-6 h-6 text-blue-400 animate-spin-slow" />
						<h2 className="text-2xl font-bold text-white">Languages Spoken</h2>
						<FiGlobe className="w-6 h-6 text-blue-400 animate-spin-slow" />
					</div>
					<div className="flex flex-wrap justify-center gap-3">
						{user?.languages?.length > 0 ? (
						user.languages.map((language, index) => (
							<span
							key={language}
							className="px-6 py-3 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-white rounded-full border border-blue-500/50 backdrop-blur-sm font-medium hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer animate-fade-in-up"
							style={{ animationDelay: `${index * 0.1}s` }}
							>
							{language}
							</span>
						))
						) : (
						<div className="text-gray-400 text-center py-8 hover:scale-105 transition-transform duration-300">
							<FiGlobe className="w-12 h-12 mx-auto mb-2 text-gray-500 animate-pulse" />
							<p>No languages added yet</p>
						</div>
						)}
					</div>
					</div>
				</main>
			</div>
		</section>
	</main>
	)
}

export default Profile

