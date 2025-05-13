import React, { useState, useRef, useEffect } from "react";
import { Edit, Camera, Save } from "lucide-react";
import apiClient from "../../api/AxiosInterceptor";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/admin/profile");
        const data = res.data.data;

        const [firstName, lastName] = (data.name || "").split(" ");
        setAdminData({
          adminId: data.admin_id,
          userId: data.user_id,
          firstName: firstName || "",
          lastName: lastName || "",
          email: data.email || "",
          phone: data.phone_number || "",
          role: data.role_name || "",
          profileImage: data.image_profile_path || "https://i.pravatar.cc/300",
        });
      } catch (err) {
        setMessage("Failed to load profile.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const toggleEditMode = async () => {
    if (isEditing) {
      try {
        const payload = {
          first_name: adminData.firstName,
          last_name: adminData.lastName,
          email: adminData.email,
          phone_number: adminData.phone,
          image_profile_path: adminData.profileImage,
        };

        await apiClient.put("/admin/profile", payload);
        setMessage("Profile updated successfully.");
      } catch (err) {
        setMessage("Failed to update profile.");
        console.error(err);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (isEditing && isHoveringImage) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAdminData((prev) => ({
          ...prev,
          profileImage: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!adminData) {
    return <div className="text-sm text-gray-500">Loading profile...</div>;
  }

  const fullName = `${adminData.firstName} ${adminData.lastName}`;

  return (
    <div className="w-full mx-auto bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-lg font-bold font-satoshi text-slate-900">
          Personal Information
        </h1>
        <button
          onClick={toggleEditMode}
          className="flex items-center gap-1 px-1.5 py-1 text-xs text-slate-500 border border-slate-200 rounded hover:bg-slate-50"
        >
          {isEditing ? <Save size={13} /> : <Edit size={13} />}
          <span>{isEditing ? "Save profile" : "Edit profile"}</span>
        </button>
      </div>

      {message && (
        <div className="text-xs text-center text-red-500 mb-2">{message}</div>
      )}

      <div className="flex items-center mb-5">
        <div
          className="relative w-24 h-24 mr-5"
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          onClick={handleImageClick}
        >
          <div className="w-full h-full rounded-full overflow-hidden border border-white border-opacity-50">
            <img
              src={adminData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isHoveringImage && isEditing && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer transition-opacity duration-200">
              <Camera size={24} className="text-white" />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold font-satoshi">{fullName}</h2>
          <span className="inline-block px-3 py-0.5 text-xs text-green-600 bg-green-50 rounded-md mt-1 font-satoshi">
            {adminData.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <LockedField label="Admin ID" value={adminData.adminId} />
        <LockedField label="User ID" value={adminData.userId} />
        <EditableField
          label="First Name"
          name="firstName"
          value={adminData.firstName}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <EditableField
          label="Last Name"
          name="lastName"
          value={adminData.lastName}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <EditableField
          label="Email"
          name="email"
          value={adminData.email}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <EditableField
          label="Phone Number"
          name="phone"
          value={adminData.phone}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const EditableField = ({ label, name, value, isEditing, onChange }) => (
  <div>
    <label className="block text-xs font-satoshi text-slate-900 mb-1">
      {label}
    </label>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded focus:outline-none focus:border-slate-300 h-[30px] font-satoshi"
      />
    ) : (
      <div className="w-full px-2 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded h-[30px] flex items-center font-satoshi">
        {value}
      </div>
    )}
  </div>
);

const LockedField = ({ label, value }) => (
  <div>
    <label className="block text-xs font-satoshi text-slate-900 mb-1">
      {label}
    </label>
    <div className="w-full px-2 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded h-[30px] flex items-center font-satoshi">
      {value}
    </div>
  </div>
);

export default AdminProfile;
