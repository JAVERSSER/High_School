import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Pomodoro",
    description: "Boost your productivity using the Pomodoro timer technique.",
    link: "/pomodoro",
    color: "bg-red-100",
    icon: "⏱️",
  },
  {
    title: "Self Study",
    description: "Track your learning and study sessions efficiently.",
    link: "/study",
    color: "bg-blue-100",
    icon: "📚",
  },
  {
    title: "Random",
    description: "Generate random activities or tools for variety and fun.",
    link: "/random",
    color: "bg-yellow-100",
    icon: "🎲",
  },
  {
    title: "Game",
    description: "Relax and enjoy simple games like Snake or Tic Tac Toe.",
    link: "/game",
    color: "bg-green-100",
    icon: "🎮",
  },
  {
    title: "Calculator",
    description: "Solve math problems and practice true or false quizzes to sharpen your logic and accuracy.",
    link: "/calculator",
    color: "bg-green-100",
    icon: "🔢"
  },
  // {
  //   title: "Quiz Maker",
  //   description: "Design your own quizzes or take ones created by others to master subjects like Math, Science, English, and more.",
  //   link: "/quiz",
  //   color: "bg-yellow-200",
  //   icon: "✏️"
  // },
  // {
  //   title: "Focus Music",
  //   description: "Listen to calming music or ambient sounds to improve focus while studying.",
  //   link: "/music",
  //   color: "bg-blue-200",
  //   icon: "🎧"
  // },
  // {
  //   title: "World Facts",
  //   description: "Discover fun and interesting facts about science, history, and the world around you.",
  //   link: "/world",
  //   color: "bg-green-200",
  //   icon: "🌍"
  // },
  // {
  //   title: "Learn English",
  //   description: "Improve your English with vocabulary, grammar tips, and daily practice activities.",
  //   link: "/english",
  //   color: "bg-purple-200",
  //   icon: "📘"
  // },
  // {
  //   title: "Books",
  //   description: "Read classic literature, textbooks, and educational summaries to boost your knowledge and imagination.",
  //   link: "/books",
  //   color: "bg-orange-200",
  //   icon: "📚"
  // }
  // {
  //   title: "Group Study Room (Beta)",
  //   description: "Join virtual rooms to study with friends, share ideas, and stay motivated together.",
  //   link: "/group",
  //   color: "bg-pink-200",
  //   icon: "🤝"
  // },
  // {
  //   title: "Philosophy",
  //   description: "Explore big questions about life, ethics, and knowledge through thought-provoking lessons and discussions.",
  //   link: "/philosophy",
  //   color: "bg-indigo-200",
  //   icon: "🧠"
  // }
];

const home = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-8">
        Welcome to Your Smart Tools
      </h1>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, idx) => (
          <Link to={feature.link} key={idx}>
            <div className={`p-6 rounded-2xl shadow hover:shadow-lg transition ${feature.color}`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Two-Column Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Use This App?</h2>
          <p className="text-gray-600 mb-3">
            This app helps you stay focused and productive with tools for study,
            relaxation, and creativity.
          </p>
          <p className="text-gray-600">
            Whether you're maintaining focus, taking strategic breaks, or enjoying a quick game,
            this app supports your daily success.
          </p>
        </div>
        <img
          src="https://moeys.gov.kh/uploads/images/general-sitting/6686023ab18c5.png"
          alt="Productivity"
          className="rounded-xl shadow w-full max-w-md mx-auto p-6"
        />
      </div>

      {/* Image + Description Section */}
      <div className="text-center mb-6 max-w-full">
        <img
          src="https://scontent.fpnh2-2.fna.fbcdn.net/v/t39.30808-6/470867885_994821362671287_4902368504436590970_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGchzV_dbzDl9LM4KWJeQq726PE2zSre_jbo8TbNKt7-PNDNMgd8gSvaNFwKg60PQ4_AxABz-R2cQapOzoD4hi0&_nc_ohc=K_msYhWWb9YQ7kNvwGpQsg2&_nc_oc=AdmEMS2Q7wqQQZ6G2VTBoU9ZBJR1Z4oDSGbxgFUD7m3VU4QIxB5nh044wyTq9ku8J20&_nc_zt=23&_nc_ht=scontent.fpnh2-2.fna&_nc_gid=vxHzB2ZGBrUA9Ugts8Ysrg&oh=00_AfJi5Vrp3NdU5kY77q8X20VhgJPyp1TCThdSuhlaf97Eqw&oe=682F7DD8"
          alt="Workspace"
          className="max-w-full block mx-auto"
        />
        <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto mt-6">
          This is the MoEYS website, free and helpful for all students.
        </p>
      </div>
    </div>
  );
};

export default home;
