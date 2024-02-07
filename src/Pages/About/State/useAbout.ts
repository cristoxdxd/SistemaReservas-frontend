import { useEffect, useState } from "react";
import { Activity } from "../../../models/Activity.interface";

export const useAbout = () => {
  const [listActivities, setListActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch("/api/activities");
      const data = await response.json();

      const activities = data.data.map(
        (activity: {
          name: string;
          description: string;
          price: number;
          duration: number;
          image: string;
        }) => {
          return {
            name: activity.name,
            description: activity.description,
            price: activity.price,
            duration: activity.duration,
            image: activity.image,
          };
        }
      );
      setListActivities(activities);
    };

    fetchActivities();
  }, []);

  return { listActivities };
};
