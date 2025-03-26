import CardSkeleton from "@/src/components/UI/CardSkeleton";
import Loading from "../../loading";

export default function page() {
  return (
    <div className="mx-auto mt-9 mb-7">
      <div className="mx-56">
        <Loading />
      </div>
    </div>
  );
}
