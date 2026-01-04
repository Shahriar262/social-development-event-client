import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { imgUpload } from "../../utils";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 🔹 Load profile
  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://social-development-event-server-mu.vercel.app/profile?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName(data.user?.name || user.displayName || "");
          setPhoto(data.user?.photoURL || user.photoURL || "");
        }
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [user]);

  // 🔹 Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = photo;

      if (e.target.image.files[0]) {
        imageUrl = await imgUpload(e.target.image.files[0]);
      }

      const res = await fetch(
        "https://social-development-event-server-mu.vercel.app/profile/update",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name,
            photoURL: imageUrl,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setPhoto(imageUrl);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Profile update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-300 p-4">
      <div className="bg-base-100 shadow-xl rounded-2xl w-full md:w-3/5 lg:w-1/2">
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-2xl" />

        <div className="flex flex-col items-center p-6 -mt-16">
          {/* Profile Image */}
          <img
            src={photo || "https://i.ibb.co/0jVpZVV/default-avatar.png"}
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
          />

          <p className="mt-2 text-sm text-gray-500">{user?.email}</p>

          {/* Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="w-full mt-6 space-y-4"
          >
            {/* Name */}
            <div>
              <label className="label font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Image */}
            <div>
              <label className="label font-medium">Profile Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <button
              disabled={updating}
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
