import axios from "axios";

export async function IsAtOffice(): Promise<boolean> {
  const response = await axios.get("/api/v1/Profile/attendance/isatoffice");
  return response.data.message === "You are at office";
}

export async function ArriveToOffice(): Promise<void> {
  await axios.put("/api/v1/Profile/attendance/arrive");
}

export async function LeaveOffice(): Promise<void> {
  await axios.put("/api/v1/Profile/attendance/leave");
}