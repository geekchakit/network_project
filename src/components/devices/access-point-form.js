"use client";
import React, { useEffect, useState } from "react";
import { fetchProtectedInfo } from "@/lib/api";

function AccessPointForm({ onClose, projectData }) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    location: "",
    mac: "",
    username: "",
    password: "",
    gid: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    if (name === "gid") {
      setFormData((prevData) => ({
        ...prevData,
        gid: value, // Set gid to the selected value
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = {
      type: "access-point",
      location: formData.location,
      mac: formData.mac,
      username: formData.username,
      password: formData.password,
      gid: formData.gid,
      name: formData.name,
    };

    try {
      const response = await fetchProtectedInfo(
        "/cloudnet/device/bind",
        "POST",
        apiData
      );
      console.log("access point api data", apiData);
      console.log("API Response:", response);
      alert("Device added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  //   const getProjectData = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchDashboardInfo("/project");
  //       setProjectData(data?.workgroupInfo || []);
  //     } catch (error) {
  //       console.error("Failed to fetch project data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     getProjectData();
  //   }, []);

  // Recursive component for rendering projects and their children
  const DeviceProjectHierarchy = ({ projects }) => {
    return (
      <ul className="ml-4 border-l border-gray-600 pl-4">
        {projects.map((project) => (
          <li key={project.gid} className="my-2">
            <label className="flex items-center">
              <input
                type="radio" // Changed to radio button for single selection
                name="gid"
                value={project.gid}
                checked={formData.gid === project.gid}
                onChange={handleChange}
                className="mr-2"
              />
              {project.name}
            </label>
            {project.child?.length > 0 && (
              <DeviceProjectHierarchy projects={project.child} />
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-3 items-center justify-between px-8 py-4 text-white"
    >
      {/* Input Fields */}
      <div className="w-full flex items-center justify-center">
        <label className="w-1/2 block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full text-white bg-white bg-opacity-5 border rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <label className="w-1/2 block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full text-white bg-white bg-opacity-5 border rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <label className="w-1/2 block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full text-white bg-white bg-opacity-5 border rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <label className="w-1/2 block text-sm font-medium mb-1">MAC</label>
        <input
          type="text"
          name="mac"
          value={formData.mac}
          onChange={handleChange}
          className="mt-1 block w-full text-white bg-white bg-opacity-5 border rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <label className="w-1/2 block text-sm font-medium mb-1">
          Device Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full text-white bg-white bg-opacity-5 border rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <label className="w-1/2 block text-sm font-medium mb-1">Gid</label>
        <div className="w-full max-h-28 flex flex-col items-start overflow-y-auto">
          {projectData?.length > 0 ? (
            <DeviceProjectHierarchy projects={projectData} />
          ) : (
            <p className="text-gray-400">No Projects Available</p>
          )}
        </div>
      </div>

      {/* Binding Projects */}
      {/* <div className="w-full flex items-start justify-center mt-2">
        <span className="w-1/2 block text-sm font-medium">Binding Project</span>
        <div className="w-full flex flex-col items-start">
          <div className="w-full flex items-start justify-center mt-2">
            <div className="w-full max-h-20 flex flex-col items-start overflow-y-auto">
              {loading ? (
                <p>Loading projects...</p>
              ) : projectData?.length > 0 ? (
                <ProjectHierarchy projects={projectData} />
              ) : (
                <p className="text-gray-400">No Projects Available</p>
              )}
            </div>
          </div>
        </div>
      </div> */}

      {/* Buttons */}
      <div className={`flex space-x-6 mt-4`}>
        <button
          onClick={handleCancel}
          className="min-w-32 px-4 py-2 bg-transparent border-2 border-white border-opacity-5 rounded hover:bg-white hover:bg-opacity-5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="min-w-32 px-4 py-2 bg-green-600 text-zinc-900 font-medium rounded hover:bg-green-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AccessPointForm;
