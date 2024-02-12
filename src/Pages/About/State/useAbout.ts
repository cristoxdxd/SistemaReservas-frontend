import { useEffect, useState } from "react";
import { Activity } from "../../../models/Activity.interface";

export const useAbout = () => {
  const [listActivities, setListActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch("/api/activities/");
      const data = await response.json();

      const activities = data.data.map((activity: Activity) => {
        return { ...activity };
      });
      setListActivities(activities);
    };

    fetchActivities();
  }, []);

  return { listActivities };
};
