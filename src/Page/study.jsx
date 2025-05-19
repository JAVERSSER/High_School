import React, { useState, useEffect } from 'react';

const study = () => {
  // Function to ensure YouTube URLs are in embed format
  const getEmbedUrl = (url) => {
    // If already embed format, return as-is
    if (url.includes('embed')) return url;

    // Convert youtu.be links
    if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Convert watch URLs
    if (url.includes('watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

  // Subjects data with topics and video links
  const subjects = {
    "Mathematics": {
      "Limits": [
        { title: "Episode 1", url: "https://youtu.be/3IY5srdz6pI?si=FVkiBWtc_HCl4_4a" },
        { title: "Episode 2", url: "https://youtu.be/hWN_9FMNdKc?si=em_PY1yDCorU9nmq" },
        { title: "Episode 3", url: "https://youtu.be/2LBI37eFwfw?si=bLvEc8113PSjwOKD" },
        { title: "Episode 4", url: "https://youtu.be/3bGg0O0JHx8?si=ARCVKfgY2PllA_W-" },
      ],
      "Derivatives": [
        { title: "Basic Differentiation", url: "https://www.youtube.com/watch?v=5yfh5cf4-0w" },
        { title: "Chain Rule", url: "https://www.youtube.com/watch?v=H-ybCx8gt-8" }
      ]
    },
    "Khmer": {
      "Grammar": [
        { title: "Sentence Structure", url: "https://www.youtube.com/watch?v=example1" },
        { title: "Verb Conjugation", url: "https://www.youtube.com/watch?v=example2" }
      ],
      "Literature": [
        { title: "Classic Khmer Poetry", url: "https://www.youtube.com/watch?v=example3" }
      ]
    },
    "Physics": {
      "Mechanics": [
        { title: "Newton's Laws", url: "https://www.youtube.com/watch?v=example4" },
        { title: "Kinematics", url: "https://www.youtube.com/watch?v=example5" }
      ],
      "Electromagnetism": [
        { title: "Coulomb's Law", url: "https://www.youtube.com/watch?v=example6" }
      ]
    },
    "Chemistry": {
      "Atomic Structure": [
        { title: "Bohr Model", url: "https://www.youtube.com/watch?v=example7" },
        { title: "Electron Configuration", url: "https://www.youtube.com/watch?v=example8" }
      ],
      "Chemical Reactions": [
        { title: "Balancing Equations", url: "https://www.youtube.com/watch?v=example9" }
      ]
    }
  };

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`mt-[70px] md:mt-[90px] min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-600 text-white'} shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">High School Study</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-700 hover:bg-blue-800'}`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Breadcrumbs */}
        <div className="flex items-center mb-6 text-sm">
          <button
            onClick={() => {
              setSelectedTopic(null);
              setSelectedSubject(null);
            }}
            className={`mr-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}
          >
            Home
          </button>
          {selectedSubject && (
            <>
              <span className="mx-2">/</span>
              <button
                onClick={() => setSelectedTopic(null)}
                className={`mr-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}
              >
                {selectedSubject}
              </button>
            </>
          )}
          {selectedTopic && (
            <>
              <span className="mx-2">/</span>
              <span>{selectedTopic}</span>
            </>
          )}
        </div>

        {/* Content Area */}
        {!selectedSubject ? (
          // Subjects Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(subjects).map((subject) => (
              <div
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'
                  }`}
              >
                <h2 className="text-xl font-bold mb-2">{subject}</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {Object.keys(subjects[subject]).length} topics available
                </p>
              </div>
            ))}
          </div>
        ) : !selectedTopic ? (
          // Topics List
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-6">{selectedSubject} Topics</h2>
            <div className="space-y-3">
              {Object.keys(subjects[selectedSubject]).map((topic) => (
                <div
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'
                    }`}
                >
                  <h3 className="font-semibold">{topic}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {subjects[selectedSubject][topic].length} video lessons
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Video Lessons
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                ←
              </button>
              <h2 className="text-2xl font-bold">
                {selectedSubject} - {selectedTopic}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subjects[selectedSubject][selectedTopic].map((video, index) => (
                <div key={index} className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden">
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{video.title}</h3>
                    <div className="flex justify-between items-center mt-3">
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        Episode {index + 1}
                      </span>
                      <button className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}>
                        Take Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`p-4 mt-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto text-center">
          <p>© 2025 High School Study - All Rights Reserved</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="hover:underline">About</button>
            <button className="hover:underline">Contact</button>
            <button className="hover:underline">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default study;


// import React, { useState, useEffect } from 'react';

// const Study = () => {
//   // Convert YouTube URLs to embed format
//   const convertToEmbedUrl = (url) => {
//     if (url.includes('youtu.be')) {
//       const videoId = url.split('youtu.be/')[1].split('?')[0];
//       return `https://www.youtube.com/embed/${videoId}`;
//     }
//     if (url.includes('youtube.com/watch')) {
//       const videoId = url.split('v=')[1].split('&')[0];
//       return `https://www.youtube.com/embed/${videoId}`;
//     }
//     return url;
//   };

//   const subjects = {
//     "Mathematics": {
//       "Limits": [
//         { title: "Episode 1", url: "https://youtu.be/3IY5srdz6pI?si=FVkiBWtc_HCl4_4a" },
//         { title: "Episode 2", url: "https://youtu.be/hWN_9FMNdKc?si=em_PY1yDCorU9nmq" },
//         { title: "Episode 3", url: "https://youtu.be/2LBI37eFwfw?si=bLvEc8113PSjwOKD" },
//         { title: "Episode 4", url: "https://youtu.be/3bGg0O0JHx8?si=ARCVKfgY2PllA_W-" },
//       ],
//       "Derivatives": [
//         { title: "Basic Differentiation", url: "https://www.youtube.com/embed/5yfh5cf4-0w" },
//         { title: "Chain Rule", url: "https://www.youtube.com/embed/H-ybCx8gt-8" }
//       ]
//     },
//     "Khmer": {
//       "Grammar": [
//         { title: "Sentence Structure", url: "https://www.youtube.com/embed/example1" },
//         { title: "Verb Conjugation", url: "https://www.youtube.com/embed/example2" }
//       ],
//       "Literature": [
//         { title: "Classic Khmer Poetry", url: "https://www.youtube.com/embed/example3" }
//       ]
//     },
//     "Physics": {
//       "Mechanics": [
//         { title: "Newton's Laws", url: "https://www.youtube.com/embed/example4" },
//         { title: "Kinematics", url: "https://www.youtube.com/embed/example5" }
//       ],
//       "Electromagnetism": [
//         { title: "Coulomb's Law", url: "https://www.youtube.com/embed/example6" }
//       ]
//     },
//     "Chemistry": {
//       "Atomic Structure": [
//         { title: "Bohr Model", url: "https://www.youtube.com/embed/example7" },
//         { title: "Electron Configuration", url: "https://www.youtube.com/embed/example8" }
//       ],
//       "Chemical Reactions": [
//         { title: "Balancing Equations", url: "https://www.youtube.com/embed/example9" }
//       ]
//     }
//   };

//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [notes, setNotes] = useState(() => {
//     const saved = localStorage.getItem('videoNotes');
//     return saved ? JSON.parse(saved) : {};
//   });

//   useEffect(() => {
//     localStorage.setItem('videoNotes', JSON.stringify(notes));
//   }, [notes]);

//   const handleNoteChange = (videoKey, text) => {
//     setNotes(prev => ({
//       ...prev,
//       [videoKey]: text
//     }));
//   };

//   return (
//     <div className={`mt-[70px] md:mt-[90px] min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       {/* Header */}
//       <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-600 text-white'} shadow-md`}>
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold">High School Study</h1>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-700 hover:bg-blue-800'}`}
//           >
//             {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto p-4">
//         {/* Breadcrumbs */}
//         <div className="flex items-center mb-6 text-sm">
//           <button
//             onClick={() => {
//               setSelectedTopic(null);
//               setSelectedSubject(null);
//             }}
//             className={`mr-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}
//           >
//             Home
//           </button>
//           {selectedSubject && (
//             <>
//               <span className="mx-2">/</span>
//               <button
//                 onClick={() => setSelectedTopic(null)}
//                 className={`mr-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}
//               >
//                 {selectedSubject}
//               </button>
//             </>
//           )}
//           {selectedTopic && (
//             <>
//               <span className="mx-2">/</span>
//               <span>{selectedTopic}</span>
//             </>
//           )}
//         </div>

//         {/* Main Content */}
//         {!selectedSubject ? (
//           // Subjects Grid
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Object.keys(subjects).map((subject) => (
//               <div
//                 key={subject}
//                 onClick={() => setSelectedSubject(subject)}
//                 className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'}`}
//               >
//                 <h2 className="text-xl font-bold mb-2">{subject}</h2>
//                 <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                   {Object.keys(subjects[subject]).length} topics available
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : !selectedTopic ? (
//           // Topics List
//           <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <h2 className="text-2xl font-bold mb-6">{selectedSubject} Topics</h2>
//             <div className="space-y-3">
//               {Object.keys(subjects[selectedSubject]).map((topic) => (
//                 <div
//                   key={topic}
//                   onClick={() => setSelectedTopic(topic)}
//                   className={`p-4 rounded-lg cursor-pointer transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'}`}
//                 >
//                   <h3 className="font-semibold">{topic}</h3>
//                   <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                     {subjects[selectedSubject][topic].length} video lessons
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           // Video Lessons with Notes
//           <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="flex items-center mb-6">
//               <button
//                 onClick={() => setSelectedTopic(null)}
//                 className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//               >
//                 ←
//               </button>
//               <h2 className="text-2xl font-bold">
//                 {selectedSubject} - {selectedTopic}
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {subjects[selectedSubject][selectedTopic].map((video, index) => {
//                 const embedUrl = convertToEmbedUrl(video.url);
//                 const noteKey = `${selectedSubject}_${selectedTopic}_${video.title}`;

//                 return (
//                   <div key={index} className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
//                     <div className="aspect-w-16 aspect-h-9">
//                       <iframe
//                         src={embedUrl}
//                         title={video.title}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                         className="w-full h-64"
//                       ></iframe>
//                     </div>
//                     <div className="p-4">
//                       <h3 className="font-semibold">{video.title}</h3>
//                       <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                         Lesson {index + 1}
//                       </span>

//                       <textarea
//                         rows={3}
//                         value={notes[noteKey] || ''}
//                         onChange={(e) => handleNoteChange(noteKey, e.target.value)}
//                         placeholder="Write your notes here..."
//                         className={`mt-2 w-full p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className={`p-4 mt-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
//         <div className="container mx-auto text-center">
//           <p>© 2023 High School Study Hub - All Rights Reserved</p>
//           <div className="flex justify-center space-x-4 mt-2">
//             <button className="hover:underline">About</button>
//             <button className="hover:underline">Contact</button>
//             <button className="hover:underline">Privacy Policy</button>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Study;
