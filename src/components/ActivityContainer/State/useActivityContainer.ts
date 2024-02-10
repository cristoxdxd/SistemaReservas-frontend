import { useEffect, useState } from "react";
import { Activity } from "../../../models/Activity.interface";

export const useActivityContainer = (listActivity: Activity[]) => {
    const [activityList, setActivity] = useState<Activity[]>(listActivity);

    useEffect(() => {
        if (listActivity.length > 0) {
            setActivity(listActivity);
        }
    }, [listActivity]);

    return { activityList };
};
