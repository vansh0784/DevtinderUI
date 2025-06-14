import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserHome = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user._id) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-blue-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Banner */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1500&q=80"
            alt="Coding Banner"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Welcome Message */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Welcome, {user?.firstName} 👋
          </h1>
          <p className="text-gray-600 mt-2">Explore your dashboard and code editor plans.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Info */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-4">👤 Your Profile</h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="w-20 h-20 rounded-full border"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <ul className="text-gray-700 text-sm space-y-2">
                <li><strong>Age:</strong> {user?.Age}</li>
                <li><strong>Gender:</strong> {user?.Gender}</li>
                <li><strong>About:</strong> {user?.About || "No info available"}</li>
              </ul>
            </div>
          </div>

          {/* Code Editor Subscription Plan */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4">💻 Code Editor Pro</h2>
              <img
                src="https://cdn.pixabay.com/photo/2017/08/10/03/47/laptop-2618086_1280.jpg"
                alt="Code editor"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Supports multiple languages (JS, Python, C++)</li>
                <li>Real-time collaboration & sharing</li>
                <li>Intelligent syntax highlighting</li>
                <li>Integrated AI Copilot (Beta)</li>
              </ul>
            </div>
            <div className="mt-5">
              <p className="text-xl font-bold text-slate-800 mb-2">₹199 / month</p>
              <button
                onClick={() => alert("Payment gateway opening...")}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Image Banner */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?auto=format&fit=crop&w=1500&q=80"
            alt="Banner"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
