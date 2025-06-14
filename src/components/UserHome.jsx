import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserHome = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Welcome Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, {user?.firstName} 👋
        </h1>
        <p className="text-slate-600 mt-2">Here’s your DevTinder dashboard.</p>
      </div>

      {/* User & Code Editor Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Card */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Your Profile</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Full Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Age:</strong> {user?.Age}</p>
            <p><strong>Gender:</strong> {user?.Gender}</p>
            <p><strong>About:</strong> {user?.About || "N/A"}</p>
          </div>
        </div>

        {/* Code Editor Product Card */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-green-700">DevTinder Code Editor</h2>
            <p className="text-gray-600 mb-4">A blazing-fast, collaborative online code editor built for developers.</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Supports JS, Python, C++, Java</li>
              <li>Real-time collaboration</li>
              <li>Auto-save and syntax highlighting</li>
              <li>AI Code Suggestions (Beta)</li>
              <li>Custom themes and keybindings</li>
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-xl font-bold text-slate-900 mb-2">₹199 / month</p>
            <button
              onClick={() => alert("Dummy payment initiated!")}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition w-full"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
