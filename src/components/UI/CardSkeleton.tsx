import { Card as NextUiCard } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";

const CardSkeleton = () => {
  return (
    <NextUiCard className="relative p-4 mb-2 rounded-md bg-default-100">
      {/* Premium Button in upper-right corner */}
      <div className="absolute top-2 right-2">
        <Skeleton className="rounded-full">
          <Button variant="flat" size="sm" className="ml-2 text-blue-500">
            View Profile
          </Button>
        </Skeleton>
      </div>

      {/* Card Header with user information */}
      <div className="pb-2 border-b border-default-200">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="rounded-full">
              <Avatar size="lg" />
            </Skeleton>
            <div>
              <Skeleton className="w-20 h-4 rounded-lg">
                <div className="h-4 bg-default-200" />
              </Skeleton>
              <Skeleton className="w-32 h-3 mt-1 rounded-lg">
                <div className="h-3 bg-default-200" />
              </Skeleton>
            </div>
          </div>
        </div>

        {/* Post content */}
        <div className="py-4 border-b border-default-200">
          <Skeleton className="w-48 h-6 mb-2 rounded-lg">
            <div className="h-6 bg-default-300" />
          </Skeleton>
          <Skeleton className="w-full h-16 mb-4 rounded-lg">
            <div className="h-16 bg-default-200" />
          </Skeleton>

          {/* Placeholder image */}
          <Skeleton className="rounded-lg">
            <div className="h-60 bg-default-300" />
          </Skeleton>

          {/* Like and Comment buttons */}
          <div className="flex items-center justify-between mt-4">
            <Skeleton className="w-20 h-8 rounded-lg">
              <Button
                className="text-pink-500 hover:text-pink-600"
                variant="flat"
                size="sm"
              >
                Like
              </Button>
            </Skeleton>
            <Skeleton className="w-28 h-8 rounded-lg">
              <Button
                className="text-blue-500 hover:text-blue-600"
                variant="flat"
                size="sm"
              >
                Comment
              </Button>
            </Skeleton>
          </div>
        </div>
      </div>
    </NextUiCard>
  );
};

export default CardSkeleton;
