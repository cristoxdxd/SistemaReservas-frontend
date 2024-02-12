import { ActivityCard } from "../ActivityCard";
import { useActivityContainer } from "./State/useActivityContainer";
import { Activity } from "../../models/Activity.interface";

export interface IActivityContainerProps {
  listActivities: Activity[];
}

export const ActivityContainer = ({
  listActivities: listActivities,
}: IActivityContainerProps) => {
  const { activityList: activityList } = useActivityContainer(listActivities);

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {activityList.length !== 0 ? (
          <>
            {activityList.map((activity) => (
              <ActivityCard
                name={activity.name}
                description={activity.description}
                price={activity.price}
                duration={activity.duration}
                image={activity.image}
              />
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white">
              Cargando...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
